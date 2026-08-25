#!/usr/bin/env node
/**
 * 默认不联网审计（需要本机 Chrome）
 *
 *   node tools/check-privacy.mjs                 # 全部会联网的页面
 *   node tools/check-privacy.mjs nature/space.html
 *   node tools/check-privacy.mjs --clicks 60     # 每页最多点多少个按钮
 *
 * CONTRACT.md 写着一条硬要求：`onlineData` 默认关闭，未开启时页面「不得向 USGS、
 * NASA、iNaturalist、PaleoBioDB 等外部主机发起任何请求」，必须直接使用内置数据。
 *
 * 这是儿童软件的隐私底线：孩子点开一个页面，不该在家长没同意的情况下让第三方
 * 主机看到这台设备的存在。而 check-contract.mjs 只能静态确认页面里出现了
 * `Playful.onlineAllowed()` 和那个开关——它没法知道**每一条** fetch 路径都真的
 * 走了门禁。少一个分支就会真的把请求发出去，静态检查看不见。
 *
 * 所以这里用真实浏览器判：
 *   1. 全新 profile（onlineData 取默认值）→ 断言 `Playful.getPreference("onlineData")`
 *      确实是 false。默认值本身错了，后面都不用谈。
 *   2. 关闭态下载入页面，并**逐个点击页面上的按钮**——多数联网路径是交互触发的
 *      （space 的照片墙要先点一颗行星，dinosaurs 的化石列表要先选一种恐龙），
 *      只 load 不点会漏掉它们。全程监听 Network.requestWillBeSent，
 *      任何非 file:// 的请求都算违规。
 *   3. 再把 onlineData 打开、重复同样的交互，把这一轮的外部请求数报出来。
 *      这一步只报告不判定：机器可能本来就没网，而 requestWillBeSent 在请求
 *      发起时就会触发，所以数字为 0 也可能只是我没点到那个控件。它的作用是
 *      让人看到「开关拨上去以后确实有东西想出去」，不至于把功能写死成永久离线
 *      还以为自己合规。
 *
 * 判定只针对第 1、2 步。图片也算请求：外部主机的 <img src> 一样会暴露设备。
 */
import { access, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9860 + (process.pid % 60);
const wait = (ms) => new Promise((done) => setTimeout(done, ms));
const argv = process.argv.slice(2);
function takeFlag(name, fallback) {
  const at = argv.indexOf(name);
  if (at < 0) return fallback;
  const value = argv[at + 1];
  argv.splice(at, 2);
  return value;
}
const MAX_CLICKS = Number(takeFlag('--clicks', '48')) || 48;

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
async function htmlPages(dir = ROOT, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'tools' || entry.name === 'node_modules') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await htmlPages(path, out);
    else if (entry.name.endsWith('.html')) out.push(relative(ROOT, path).split(sep).join('/'));
  }
  return out.sort();
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
    ws.onclose = () => {
      for (const pending of client.waiting.values()) pending.fail(new Error('Chrome WebSocket 已关闭'));
      client.waiting.clear();
    };
    /* 这个浏览器一律不许写下载文件。门禁会逐个点击页面上可见的按钮，
       其中就有「保存图片」「导出 JSON」「导出代码」这类导出控件——Chrome 的
       默认行为会把文件真的存进 ~/Downloads，跑一轮门禁就多出十几个文件
       （doodle-pad 的画、symmetry 的对称作品、足迹 JSON、评估 txt…），
       几轮下来上百个。审计只关心「点下去有没有报错、有没有请求离开设备」，
       落盘对结论没有任何贡献，纯属污染用户的下载目录。
       deny 也顺带让「点导出」这条路径本身仍然被走到，不影响判定。 */
    /* 下载禁用是安全边界：失败时必须在创建 target、点击页面之前终止。 */
    await client.send('Browser.setDownloadBehavior', { behavior: 'deny' });
    return client;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => {
      if (this.ws.readyState !== WebSocket.OPEN) {
        fail(new Error('Chrome WebSocket 已关闭'));
        return;
      }
      /* 60s：遍历点击一页上的几十个控件本身要一两秒，但个别控件会触发
         原生 <dialog> 的 showModal() 或一段动画链，实测 30s 会误判成超时。 */
      const timer = setTimeout(() => {
        if (this.waiting.delete(id)) fail(new Error(`${method} 超时`));
      }, 60000);
      this.waiting.set(id, {
        ok(v) { clearTimeout(timer); ok(v); },
        fail(e) { clearTimeout(timer); fail(e); }
      });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() { this.ws.close(); }
}

/* 逐个点击页面上可见的 <button>。
   不点 <a>：那会导航走，后面的观察就换了页面。
   不点带 data-skip-privacy-click 的控件（目前没有，留给将来确实不能点的东西）。 */
const CLICK_ALL = (max) => `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const buttons = [...document.querySelectorAll('button:not([disabled]):not([data-skip-privacy-click])')]
    .filter((b) => {
      const cs = getComputedStyle(b);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      const box = b.getBoundingClientRect();
      return box.width > 4 && box.height > 4;
    })
    .slice(0, ${max});
  let clicked = 0;
  for (const b of buttons) {
    try { b.click(); clicked += 1; } catch (e) { /* 单个控件报错不影响审计 */ }
    await sleep(35);
  }
  /* select 和 range 也可能触发数据加载：各拨一次。 */
  for (const sel of [...document.querySelectorAll('select')].slice(0, 12)) {
    try {
      if (sel.options.length > 1) {
        sel.selectedIndex = Math.min(1, sel.options.length - 1);
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } catch (e) { /* 忽略 */ }
    await sleep(35);
  }
  return clicked;
})()`;

const requested = [];   /* 本轮观察到的外部请求 */
let recording = false;

function isExternal(url) {
  return !/^(?:file:|data:|blob:|about:)/i.test(url);
}

const problems = [];
const report = [];
let chrome;
let client;
let interruptedExitCode = 0;
await acquireChromeLease();

/* 信号只请求停止；资源清理统一交给主流程 finally。这样既不会留下孤儿 Chrome，
   也不会让异步 signal handler 与末尾 process.exit(1) 竞争。 */
function requestStop(exitCode) {
  if (interruptedExitCode) return;
  interruptedExitCode = exitCode;
  recording = false;
  try { if (client) client.close(); } catch { /* 已断开的 WebSocket 无需重复处理 */ }
}
process.on('SIGINT', () => { requestStop(130); });
process.on('SIGTERM', () => { requestStop(143); });

try {
  const chromePath = await findChrome();
  if (interruptedExitCode) throw new Error('审计已中断');
  const profile = await mkdtemp(join(tmpdir(), 'privacy-profile-'));
  chrome = await spawnChrome(chromePath, [
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    '--allow-file-access-from-files', '--mute-audio', 'about:blank'
  ], { cleanupPath: profile });

  let debuggerUrl;
  for (let attempt = 0; attempt < 60 && !debuggerUrl && !interruptedExitCode; attempt += 1) {
    await wait(200);
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      debuggerUrl = (await response.json()).webSocketDebuggerUrl;
    } catch { /* Chrome 尚未就绪 */ }
  }
  if (interruptedExitCode) throw new Error('审计已中断');
  if (!debuggerUrl) throw new Error('Chrome 调试端口未就绪');
  client = await CDP.attach(debuggerUrl);
  client.onEvent = (message) => {
    if (!recording) return;
    if (message.method !== 'Network.requestWillBeSent') return;
    const url = message.params?.request?.url || '';
    if (isExternal(url)) requested.push(url);
  };

  const all = await htmlPages();
  const explicit = argv.filter((a) => !a.startsWith('--'));
  /* 默认审全部页面。「关闭态零外部请求」这条对每一页都成立才有意义：
     一张外部主机的 <img>、一个远程字体，都会让第三方看到这台设备。
     只审带 fetch( 的页面会漏掉这类。 */
  const { readFile } = await import('node:fs/promises');
  const targets = explicit.length ? explicit : all;
  /* 只有加载了共享层的页面才谈得上 onlineData 默认值；
     只有真的写了 fetch( 的页面才值得做「打开开关」那一步。 */
  const fetches = new Set();
  for (const rel of targets) {
    if (/\bfetch\s*\(/.test(await readFile(join(ROOT, rel), 'utf8'))) fetches.add(rel);
  }

  console.log(`默认不联网审计：${targets.length} 个页面（其中 ${fetches.size} 个会联网），每页最多点 ${MAX_CLICKS} 个按钮`);
  console.log('（判定：onlineData 默认必须是关的，且关闭时不得有任何请求离开设备）\n');

  for (const rel of targets) {
   if (interruptedExitCode) break;
   /* 每页开一个独立 target，并把整页的审计包在 try 里：
      某一页卡住（点到一个会导航或长时间占住主线程的控件）只该让那一页
      标成「结论不可信」，绝不能中断整轮——那会静默跳过后面所有页面，
      最后打印出来像是全绿。 */
   let targetId;
   try {
    ({ targetId } = await client.send('Target.createTarget', { url: 'about:blank' }));
    const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
    await client.send('Runtime.enable', {}, sessionId);
    await client.send('Network.enable', {}, sessionId);
    const evaluate = async (expression) => {
      const result = await client.send('Runtime.evaluate', {
        expression, returnByValue: true, awaitPromise: true
      }, sessionId);
      if (result.exceptionDetails) {
        throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
      }
      return result.result.value;
    };
    /* 单页里某个控件点出异常，不该让整轮审计中断——那会静默跳过后面所有页面，
       看起来像「全绿」。出错就记下来，继续往下审。 */
    const safeEvaluate = async (expression, fallback) => {
      try { return await evaluate(expression); } catch (error) {
        if (interruptedExitCode) throw error;
        problems.push(`${rel}: 页内求值出错（该页结论不可信）：${String(error.message).slice(0, 120)}`);
        return fallback;
      }
    };
    const url = pathToFileURL(join(ROOT, rel)).href;

    /* --- 第 1 步：全新状态，确认默认值是关的 --- */
    await client.send('Page.navigate', { url }, sessionId);
    await wait(1200);
    await safeEvaluate('try { localStorage.clear(); } catch (e) {} true', true);
    /* 清掉 localStorage 后重载：避免上一页写的缓存让本页走「读缓存不发请求」的捷径，
       那样即使门禁漏了也测不出来。 */
    requested.length = 0;
    recording = true;
    await client.send('Page.navigate', { url }, sessionId);
    await wait(1500);

    /* 没加载共享层的页面（比如若干纯文档页）本来就没有偏好可读，跳过这一项，
       但下面「关闭态零外部请求」照样要判——那条对每一页都成立。 */
    const pref = await safeEvaluate('(() => (window.Playful && Playful.getPreference) ? Playful.getPreference("onlineData") : "无共享层")()', '无共享层');
    const hasShared = pref !== '无共享层';
    if (hasShared && pref !== false) {
      problems.push(`${rel}: onlineData 默认值应为 false，实际是 ${JSON.stringify(pref)}`);
    }

    /* --- 第 2 步：关闭态下遍历交互 --- */
    const clicked = await safeEvaluate(CLICK_ALL(MAX_CLICKS), 0);
    await wait(1800);
    recording = false;
    const offHits = [...new Set(requested)];

    if (offHits.length) {
      const hosts = [...new Set(offHits.map((u) => { try { return new URL(u).host; } catch { return u; } }))];
      problems.push(`${rel}: onlineData 关闭时仍向外部主机发起了 ${offHits.length} 个请求 → ${hosts.join(', ')}`);
    }

    /* --- 第 3 步：打开开关，看有没有东西想出去（只报告，不判定） ---
       只对真的写了 fetch( 且有共享层的页面做，其余页面这一步没有意义。 */
    let onHits = [];
    let onHosts = [];
    let probed = false;
    if (hasShared && fetches.has(rel)) {
      probed = true;
      requested.length = 0;
      recording = true;
      /* setPreference 写失败也不该让整轮审计崩掉。 */
      await safeEvaluate('(() => { try { return Playful.setPreference("onlineData", true); } catch (e) { return false; } })()', false);
      await client.send('Page.navigate', { url }, sessionId);
      await wait(1500);
      await safeEvaluate(CLICK_ALL(MAX_CLICKS), 0);
      await wait(2000);
      recording = false;
      onHits = [...new Set(requested)];
      onHosts = [...new Set(onHits.map((u) => { try { return new URL(u).host; } catch { return u; } }))];
    }

    report.push({ rel, clicked, off: offHits.length, on: onHits.length, onHosts, probed });
    const flag = offHits.length ? '✗' : '✓';
    const tail = probed
      ? `｜开启后 ${onHits.length}${onHosts.length ? ' → ' + onHosts.join(', ') : ''}`
      : '｜本页不联网';
    console.log(`${flag} ${rel}（点了 ${clicked} 个按钮｜关闭态外部请求 ${offHits.length}${tail}）`);
    if (offHits.length) for (const u of offHits.slice(0, 6)) console.log(`      泄漏：${u.slice(0, 120)}`);
   } catch (error) {
     recording = false;
     if (interruptedExitCode) break;
     problems.push(`${rel}: 审计该页时出错，结论不可信：${String(error.message).slice(0, 140)}`);
     console.log(`✗ ${rel}（审计出错：${String(error.message).slice(0, 60)}）`);
   } finally {
     recording = false;
     if (targetId && !interruptedExitCode) await client.send('Target.closeTarget', { targetId }).catch(() => {});
   }
  }
} catch (error) {
  if (!interruptedExitCode) problems.push(`审计中断：${error.message}`);
} finally {
  try { if (client) client.close(); } catch { /* 信号路径可能已经关闭 */ }
  await stopChrome(chrome);
}

if (interruptedExitCode) {
  console.log('\n审计已中断；Chrome 与临时 profile 已清理');
  process.exit(interruptedExitCode);
}

const neverTried = report.filter((r) => r.probed && r.on === 0);
console.log(`\n=== ${report.length} 个页面，${problems.length} 处违规 ===`);
if (problems.length) {
  for (const p of problems) console.log(`  ✗ ${p}`);
} else {
  console.log('  ✓ onlineData 默认关闭，且关闭时没有任何请求离开这台设备');
}
if (neverTried.length) {
  console.log(`\n（${neverTried.length} 个页面开启开关后也没观察到外部请求：可能这台机器没网、`
    + `或者触发那条路径的控件没被点到。这一项不判定，但如果某页永远发不出请求，`
    + `说明联网功能已经写死成离线，值得人工确认：${neverTried.map((r) => r.rel).join('、')}）`);
}
process.exit(problems.length ? 1 : 0);
