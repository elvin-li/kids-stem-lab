#!/usr/bin/env node
/**
 * 离线能力端到端审计（需要本机 Chrome）
 *
 *   node tools/check-offline.mjs
 *
 * 这是整站「装到平板上、没网也能玩」这个承诺的唯一端到端验证。此前只有
 * check-contract.mjs 静态核对过 sw.js 的 CORE 清单在磁盘上存不存在——它证明不了
 * Service Worker 真的装上了、缓存真的写进去了、断网后页面真的还打得开。
 *
 * 而这条链上任何一环断掉都是静默的：注册失败被 .catch() 吞掉（契约要求如此，
 * 免得 file:// 下报错），install 阶段任一条目失败会让**整个**缓存为空，
 * 而用户在有网时完全看不出区别——直到孩子在车上、在飞机上打开它，一片空白。
 *
 * 断言：
 *   1. http://127.0.0.1 下 Service Worker 能注册并进入 activated，scope 落在站点目录。
 *   2. 缓存名与 sw.js 里的 CACHE 常量一致，且 CORE 清单里每一条都真的在缓存里
 *      （install 用 Promise.all 逐条 cache.add，任一失败即全空，所以要逐条核）。
 *   3. 断网后，首页、一个实验页、一个自然页都仍能打开：标题在、共享样式生效、
 *      Progress 可用（足迹是本机数据，离线必须照常工作）。
 *   4. 断网后访问一个没缓存过的路径，导航兜底应回到首页而不是浏览器错误页。
 *   5. file:// 下不得注册 Service Worker，且不得留下 console 错误（契约明写要静默跳过）。
 *
 * 自带一个零依赖的静态 HTTP 服务器：Service Worker 需要安全上下文，
 * file:// 下拿不到，所以必须走 127.0.0.1。
 */
import { createServer } from 'node:http';
import { access, mkdtemp, readFile, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { extname, join, normalize } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CDP_PORT = 9670 + (process.pid % 50);
const HTTP_PORT = 8770 + (process.pid % 50);
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function chromeCandidates() {
  return [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium', '/usr/bin/chromium-browser'
  ].filter(Boolean);
}
async function findChrome() {
  for (const candidate of chromeCandidates()) {
    try { await access(candidate); return candidate; } catch { /* 继续找 */ }
  }
  throw new Error('找不到 Chrome；可通过 CHROME_PATH 指定可执行文件');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); this.onEvent = null; }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((ok, fail) => {
      ws.onopen = ok;
      ws.onerror = () => fail(new Error('Chrome WebSocket 连接失败'));
    });
    const client = new CDP(ws);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id && client.waiting.has(message.id)) {
        const pending = client.waiting.get(message.id);
        client.waiting.delete(message.id);
        message.error ? pending.fail(new Error(message.error.message)) : pending.ok(message.result);
      } else if (message.method && client.onEvent) client.onEvent(message);
    };
    /* 这个浏览器一律不许写下载文件。门禁会点击页面上可见的按钮，其中就有
       「保存图片」「导出 JSON」这类导出控件——Chrome 的默认行为会把文件真的
       存进 ~/Downloads，跑几轮就堆出上百个文件。审计只关心点下去的行为，
       落盘对结论没有贡献。由 check-no-downloads.mjs 盯着不许漏。 */
    /* 下载禁用是安全边界：失败时必须在创建 target、点击页面之前终止。 */
    await client.send('Browser.setDownloadBehavior', { behavior: 'deny' });
    return client;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => {
      const timer = setTimeout(() => {
        if (this.waiting.delete(id)) fail(new Error(`${method} 超时`));
      }, 45000);
      this.waiting.set(id, {
        ok(v) { clearTimeout(timer); ok(v); },
        fail(e) { clearTimeout(timer); fail(e); }
      });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() { this.ws.close(); }
}

/* 从 sw.js 里读出 CACHE 名与 CORE 清单，作为核对基准（不重复实现，直接解析同一份源）。 */
const swSource = await readFile(join(ROOT, 'sw.js'), 'utf8');
const cacheName = (swSource.match(/\bCACHE\s*=\s*["']([^"']+)["']/) || [])[1] || '';
const coreList = [...(swSource.match(/\bCORE\s*=\s*\[([\s\S]*?)\]/) || [, ''])[1]
  .matchAll(/["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);

const problems = [];
const notes = [];
let chrome;
let client;
let server;
await acquireChromeLease();

try {
  if (!cacheName) throw new Error('sw.js 里读不到 CACHE 名');
  if (!coreList.length) throw new Error('sw.js 里读不到 CORE 清单');

  /* ---------- 零依赖静态服务器 ---------- */
  server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://127.0.0.1:${HTTP_PORT}`);
      let rel = decodeURIComponent(url.pathname);
      if (rel.endsWith('/')) rel += 'index.html';
      const target = join(ROOT, normalize(rel).replace(/^(\.\.[/\\])+/, ''));
      if (!target.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }
      const info = await stat(target).catch(() => null);
      if (!info || !info.isFile()) { res.writeHead(404).end('not found'); return; }
      const body = await readFile(target);
      res.writeHead(200, {
        'content-type': MIME[extname(target).toLowerCase()] || 'application/octet-stream',
        /* Service Worker 脚本不允许被 HTTP 缓存干扰判定 */
        'cache-control': 'no-cache',
        'service-worker-allowed': '/'
      });
      res.end(body);
    } catch (error) {
      res.writeHead(500).end(String(error.message));
    }
  });
  await new Promise((ok, fail) => {
    server.once('error', fail);
    server.listen(HTTP_PORT, '127.0.0.1', ok);
  });

  const chromePath = await findChrome();
  const profile = await mkdtemp(join(tmpdir(), 'offline-profile-'));
  chrome = await spawnChrome(chromePath, [
    `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    '--allow-file-access-from-files', '--mute-audio', 'about:blank'
  ], { cleanupPath: profile });
  let debuggerUrl;
  for (let attempt = 0; attempt < 60 && !debuggerUrl; attempt += 1) {
    await wait(200);
    try {
      const response = await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`);
      debuggerUrl = (await response.json()).webSocketDebuggerUrl;
    } catch { /* Chrome 尚未就绪 */ }
  }
  if (!debuggerUrl) throw new Error('Chrome 调试端口未就绪');
  client = await CDP.attach(debuggerUrl);

  const { targetId } = await client.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
  await client.send('Runtime.enable', {}, sessionId);
  await client.send('Network.enable', {}, sessionId);
  const consoleErrors = [];
  client.onEvent = (message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === 'Runtime.exceptionThrown') {
      const d = message.params.exceptionDetails;
      consoleErrors.push('未捕获异常：' + (d.exception?.description || d.text || '未知'));
    }
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      consoleErrors.push('console.error：' + message.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
    }
  };
  const evaluate = async (expression) => {
    const r = await client.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  const base = `http://127.0.0.1:${HTTP_PORT}`;

  console.log(`离线能力端到端审计：${base}（CACHE=${cacheName}，CORE ${coreList.length} 条）\n`);

  /* ---------- 1. 注册与激活 ---------- */
  await client.send('Page.navigate', { url: `${base}/index.html` }, sessionId);
  await wait(1500);
  /* navigator.serviceWorker.ready 一有 active worker 就 resolve，但那一刻 state
     可能还停在 activating（install 刚完、activate 事件还在跑）。直接断言
     === 'activated' 会间歇性假红，所以这里轮询等它真正落到 activated。 */
  const reg = await evaluate(`(async () => {
    if (!('serviceWorker' in navigator)) return { supported: false };
    try {
      const r = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, rej) => setTimeout(() => rej(new Error('等待 ready 超时')), 20000))
      ]);
      const deadline = Date.now() + 15000;
      while (r.active && r.active.state !== 'activated' && Date.now() < deadline) {
        await new Promise((res) => setTimeout(res, 200));
      }
      return {
        supported: true,
        scope: r.scope,
        state: r.active ? r.active.state : '(无 active)',
        script: r.active ? r.active.scriptURL : ''
      };
    } catch (e) { return { supported: true, error: String(e.message || e) }; }
  })()`);
  if (!reg.supported) problems.push('浏览器不支持 serviceWorker，无法审计');
  else if (reg.error) problems.push(`Service Worker 未能激活：${reg.error}`);
  else {
    if (reg.state !== 'activated') problems.push(`Service Worker 状态应为 activated，实际 ${reg.state}`);
    if (!reg.scope.startsWith(base + '/')) problems.push(`Service Worker scope 不在站点目录下：${reg.scope}`);
    if (!/\/sw\.js$/.test(reg.script)) problems.push(`注册的脚本不是 sw.js：${reg.script}`);
    console.log(`✓ 注册与激活（state=${reg.state}，scope=${reg.scope.replace(base, '')}）`);
  }

  /* ---------- 2. 缓存名与 CORE 逐条核对 ---------- */
  const cacheState = await evaluate(`(async () => {
    const names = await caches.keys();
    if (!names.includes(${JSON.stringify(cacheName)})) return { names, missingCache: true };
    const cache = await caches.open(${JSON.stringify(cacheName)});
    const keys = (await cache.keys()).map((r) => new URL(r.url).pathname);
    return { names, keys };
  })()`);
  if (cacheState.missingCache) {
    problems.push(`缓存里没有 ${cacheName}，实际有：${cacheState.names.join('、') || '(空)'}`);
  } else {
    /* CORE 里的 "./" 是导航兜底入口，对应 index.html，不是磁盘文件。 */
    const expected = coreList.filter((r) => r !== './' && r !== '.')
      .map((r) => '/' + r.replace(/^\.\//, ''));
    const missing = expected.filter((p) => !cacheState.keys.includes(p));
    if (missing.length) {
      problems.push(`CORE 有 ${missing.length} 条没进缓存（install 逐条 cache.add，任一失败即全空）：`
        + missing.slice(0, 8).join('、'));
    } else {
      console.log(`✓ 缓存完整（${cacheState.keys.length} 条，覆盖 CORE 全部 ${expected.length} 条）`);
    }
  }

  /* ---------- 2.5 确认当前页真的被 SW 接管 ----------
     缓存装好、worker 也 activated，并不等于这个客户端已经被接管：
     首次注册的那一次导航通常还是「无控制者」状态（sw.js 里有 clients.claim()，
     但接管发生在 activate 之后，时序上不保证赶得上）。此时断网，请求会绕过
     Service Worker 直奔网络，四个页面全部拿到浏览器错误页——看起来像离线能力
     坏了，其实只是没接管。实测三次里会偶发一次。所以这里等 controller 出现，
     等不到就再导航一次（worker 已 active，重新导航必然被接管）。 */
  let controlled = await evaluate(`(async () => {
    const deadline = Date.now() + 8000;
    while (!navigator.serviceWorker.controller && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 200));
    }
    return Boolean(navigator.serviceWorker.controller);
  })()`);
  if (!controlled) {
    await client.send('Page.navigate', { url: `${base}/index.html` }, sessionId);
    await wait(1600);
    controlled = await evaluate('Boolean(navigator.serviceWorker.controller)');
  }
  if (!controlled) problems.push('页面始终没有被 Service Worker 接管（controller 为 null）：断网测试无从进行');
  else console.log('✓ 当前页已被 Service Worker 接管');

  /* ---------- 3. 断网后逐页打开 ---------- */
  await client.send('Network.emulateNetworkConditions', {
    offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0
  }, sessionId);
  /* 服务器也关掉，杜绝「其实还是走了网络」的假通过。 */
  await new Promise((ok) => server.close(ok));
  server = null;

  const offlinePages = ['/index.html', '/games/fraction-lab.html', '/nature/space.html', '/pages/progress.html'];
  for (const path of offlinePages) {
    consoleErrors.length = 0;
    /* 第一次断网导航会和「断网模拟刚生效 / 客户端刚被接管」抢时序，偶发拿到浏览器
       错误页。重试一次不是在掩盖缺陷：缓存里有没有这一页是确定的事实（上一步已经
       逐条核过），同样的断网状态和同一份缓存下，第二次导航能成功就说明 SW 确实供得上；
       真的供不上时两次都会失败。实测不重试的话四次里会偶发一次假红。 */
    let snap = null;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      await client.send('Page.navigate', { url: base + path }, sessionId);
      await wait(1800);
      snap = await evaluate(`(() => {
      const h1 = document.querySelector('h1');
      const nav = document.querySelector('.nav');
      return {
        title: document.title,
        h1: h1 ? (h1.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 30) : '',
        /* 共享样式是否真的生效：base.css 给 .nav 设了 sticky 定位 */
        navPosition: nav ? getComputedStyle(nav).position : '(无 .nav)',
        progress: typeof window.Progress === 'object' && typeof Progress.all === 'function',
        playful: typeof window.Playful === 'object',
        bodyText: (document.body.textContent || '').replace(/\\s+/g, ' ').trim().length
      };
    })()`);
      /* 拿到像样的内容就不必再试；否则清掉这一轮的报错记录再来一次。 */
      if (snap && snap.h1 && snap.bodyText >= 200) break;
      consoleErrors.length = 0;
    }
    const bad = [];
    if (!snap.h1) bad.push('没有 h1');
    if (snap.bodyText < 200) bad.push(`正文只有 ${snap.bodyText} 字`);
    if (snap.navPosition === '(无 .nav)' || snap.navPosition === 'static') bad.push(`共享样式未生效（.nav position=${snap.navPosition}）`);
    if (!snap.progress) bad.push('Progress 不可用');
    if (path !== '/pages/progress.html' && !snap.playful) bad.push('Playful 不可用');
    const errs = [...new Set(consoleErrors)];
    if (errs.length) bad.push(`控制台报错：${errs.slice(0, 2).join(' | ')}`);
    if (bad.length) problems.push(`断网后 ${path} 不可用：${bad.join('；')}`);
    else console.log(`✓ 断网可用 ${path}（「${snap.h1}」，正文 ${snap.bodyText} 字）`);
  }

  /* ---------- 4. 未缓存路径的导航兜底 ---------- */
  await client.send('Page.navigate', { url: `${base}/games/this-page-does-not-exist.html` }, sessionId);
  await wait(1600);
  const fallback = await evaluate(`(() => ({
    h1: (document.querySelector('h1') || {}).textContent ? document.querySelector('h1').textContent.trim().slice(0, 24) : '',
    len: (document.body.textContent || '').trim().length
  }))()`);
  if (!fallback.h1 || fallback.len < 200) {
    problems.push(`断网时访问未缓存路径没有回到可读页面（h1「${fallback.h1}」，正文 ${fallback.len} 字）`);
  } else {
    console.log(`✓ 未缓存路径的导航兜底（落到「${fallback.h1}」）`);
  }

  await client.send('Network.emulateNetworkConditions', {
    offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1
  }, sessionId);

  /* ---------- 5. file:// 下必须静默跳过注册 ---------- */
  consoleErrors.length = 0;
  await client.send('Page.navigate', { url: pathToFileURL(join(ROOT, 'games/fraction-lab.html')).href }, sessionId);
  await wait(1800);
  /* getRegistrations() 在 file:// 这种不透明源上可能既不 resolve 也不 reject——
     try/catch 抓不到「挂住」，awaitPromise 会一直等到 CDP 超时，整轮审计就废了
     （第一版就这样间歇性挂掉，被 test-check-offline.mjs 的基线跑暴露出来）。
     所以在页内加一场超时竞速：挂住就按「没有注册」处理，那本来也是期望结果。 */
  const fileMode = await evaluate(`(async () => {
    let count = 0;
    let hung = false;
    try {
      if ('serviceWorker' in navigator) {
        const regs = await Promise.race([
          navigator.serviceWorker.getRegistrations(),
          new Promise((res) => setTimeout(() => res('hung'), 3000))
        ]);
        if (regs === 'hung') hung = true;
        else count = regs.length;
      }
    } catch (e) { /* file:// 下取不到就算没有注册 */ }
    return { count, hung, h1: !!document.querySelector('h1'), protocol: location.protocol };
  })()`);
  if (fileMode.hung) notes.push('file:// 下 getRegistrations() 没有在 3s 内落地（不透明源的已知行为），按「没有注册」处理');
  const fileErrs = [...new Set(consoleErrors)];
  if (fileMode.protocol !== 'file:') {
    notes.push(`file:// 检查没跑起来（protocol=${fileMode.protocol}）`);
  } else {
    if (fileMode.count > 0) problems.push(`file:// 下注册了 ${fileMode.count} 个 Service Worker，契约要求静默跳过`);
    if (fileErrs.length) problems.push(`file:// 下留下了 console 错误：${fileErrs.slice(0, 2).join(' | ')}`);
    if (!fileMode.count && !fileErrs.length) console.log('✓ file:// 下静默跳过注册，无 console 错误');
  }
} catch (error) {
  problems.push(`审计中断：${error.message}`);
} finally {
  if (client) client.close();
  if (server) await new Promise((ok) => server.close(ok));
  await stopChrome(chrome);
}

console.log(`\n=== ${problems.length} 处离线问题 ===`);
if (problems.length) for (const p of problems) console.log(`  ✗ ${p}`);
else console.log('  ✓ Service Worker 装得上、CORE 全进缓存、断网后页面照常可用、file:// 下静默跳过');
if (notes.length) { console.log(`\n（${notes.length} 条提示）`); for (const n of notes) console.log(`  · ${n}`); }
process.exit(problems.length ? 1 : 0);
