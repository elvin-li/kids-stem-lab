/* 一次性检查：本站经 nginx 提供时，Service Worker 能否装上并在断网后照常打开。
   有意把 nginx 整个停掉再验证，排除「其实还是走了网络」的假通过。跑完即删。 */
import { spawn, spawnSync } from 'node:child_process';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = '/Users/a0000/Services/早教';
/* 医药箱的页面清单从 sw.js 的 CORE 里读出来，不在这里硬编码——
   分区一直在增页，写死的列表会悄悄漏掉新页面而看起来仍然全绿。 */
const CORE_SRC = await readFile(join(ROOT, 'sw.js'), 'utf8');
const MED_PAGES = [...CORE_SRC.matchAll(/\.\/pages\/(medicine-cabinet|med-[a-z-]+)\.html/g)].map((m) => m[1]);

const CONF = '/Users/a0000/Services/早教/deploy/nginx.conf';
const BASE = 'http://127.0.0.1:8088';
const PORT = 9911;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const nginx = (...args) => spawnSync('nginx', [...args, '-c', CONF], { encoding: 'utf8' });
const problems = [];
const ok = [];

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('WS 连接失败')); });
    const c = new CDP(ws);
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && c.waiting.has(m.id)) {
        const p = c.waiting.get(m.id); c.waiting.delete(m.id);
        m.error ? p.rej(new Error(m.error.message)) : p.res(m.result);
      }
    };
    return c;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((res, rej) => {
      const t = setTimeout(() => { if (this.waiting.delete(id)) rej(new Error(`${method} 超时`)); }, 30000);
      this.waiting.set(id, { res: (v) => { clearTimeout(t); res(v); }, rej: (e) => { clearTimeout(t); rej(e); } });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
}

const profile = await mkdtemp(join(tmpdir(), 'nginx-sw-'));
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--headless=new', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', '--mute-audio', 'about:blank'
], { stdio: 'ignore' });

let browser;
try {
  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await wait(250);
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) wsUrl = (await r.json()).webSocketDebuggerUrl;
    } catch { /* 还没起来 */ }
  }
  if (!wsUrl) throw new Error('Chrome 调试端口未就绪');
  browser = await CDP.attach(wsUrl);
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
  await browser.send('Runtime.enable', {}, sessionId);
  await browser.send('Page.enable', {}, sessionId);
  await browser.send('Network.enable', {}, sessionId);

  /* 断网后连续导航时 Runtime.evaluate 偶发超时（渲染器还在结算上一次导航），
     重试一次即可，不要把它当成页面缺陷。 */
  const evaluate = async (expression, tries = 3) => {
    let last;
    for (let i = 0; i < tries; i++) {
      try {
        const r = await browser.send('Runtime.evaluate',
          { expression, returnByValue: true, awaitPromise: true }, sessionId);
        if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
        return r.result.value;
      } catch (e) { last = e; await wait(1200); }
    }
    throw last;
  };

  /* ---- 1. 经 nginx 打开首页，等 Service Worker 激活 ---- */
  await browser.send('Page.navigate', { url: `${BASE}/index.html` }, sessionId);
  await wait(1200);
  const reg = await evaluate(`(async () => {
    const r = await navigator.serviceWorker.register('./sw.js');
    for (let i = 0; i < 80; i++) {
      const w = r.active || r.installing || r.waiting;
      if (r.active && r.active.state === 'activated') break;
      await new Promise((d) => setTimeout(d, 250));
    }
    return { state: r.active ? r.active.state : '(无 active)', scope: r.scope,
             script: (r.active || r.installing || {}).scriptURL || '' };
  })()`);
  if (reg.state === 'activated') ok.push(`Service Worker 激活（scope=${reg.scope}）`);
  else problems.push(`Service Worker 未激活：state=${reg.state}`);
  if (!reg.script.endsWith('/sw.js')) problems.push(`注册的脚本不是 sw.js：${reg.script}`);

  /* ---- 2. 缓存里必须有 CORE 登记的每一个医药箱页面 ---- */
  const cached = await evaluate(`(async () => {
    const keys = await caches.keys();
    const name = keys.find((k) => k.startsWith('kids-stem-shell-'));
    if (!name) return { name: null };
    const cache = await caches.open(name);
    const want = ${JSON.stringify(MED_PAGES)};
    const missing = [];
    for (const w of want) {
      const hit = await cache.match('${BASE}/pages/' + w + '.html', { ignoreSearch: true });
      if (!hit) missing.push(w);
    }
    return { name, total: (await cache.keys()).length, missing };
  })()`);
  if (!cached.name) problems.push('没有找到 kids-stem-shell-* 缓存');
  else if (cached.missing.length) problems.push(`缓存缺少医药箱页面：${cached.missing.join('、')}`);
  /* 页数从 MED_PAGES 实时算，不写死：写死的数字在加页之后会静默变成谎报——
     实测这里曾长期显示「医药箱 8 页全在」，而当时 CORE 里已经有 19 页。 */
  else ok.push(`缓存完整（${cached.name}，共 ${cached.total} 条，医药箱 ${MED_PAGES.length} 页全在）`);

  /* ---- 3. 把 nginx 整个停掉，再叠上离线模拟 ---- */
  nginx('-s', 'stop');
  await wait(800);
  const stillUp = spawnSync('bash', ['-lc',
    'curl -s -o /dev/null -w "%{http_code}" --max-time 2 http://127.0.0.1:8088/ || true'],
    { encoding: 'utf8' }).stdout.trim();
  if (stillUp === '200') problems.push('nginx 没停掉，断网验证不可信');
  else ok.push(`nginx 已停止（curl 返回 "${stillUp || '连接失败'}"）`);
  await browser.send('Network.emulateNetworkConditions',
    { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 }, sessionId);

  /* ---- 4. 断网 + 服务器已停：医药箱页面必须照常打开 ---- */
  for (const page of ['pages/med-firstaid.html', 'pages/medicine-cabinet.html']) {
    await browser.send('Page.navigate', { url: `${BASE}/${page}` }, sessionId);
    await wait(2400);
    const probe = await evaluate(`(() => {
      const h1 = document.querySelector('h1');
      const nav = document.querySelector('.nav');
      return {
        h1: h1 ? h1.textContent.trim().slice(0, 24) : '',
        chars: (document.body.innerText || '').replace(/\\s+/g, '').length,
        navPos: nav ? getComputedStyle(nav).position : '(无 .nav)',
        flags: document.querySelectorAll('.flag').length
      };
    })()`);
    if (!probe.h1 || probe.chars < 1000) {
      problems.push(`断网后 ${page} 打不开（h1「${probe.h1}」，正文 ${probe.chars} 字）`);
    } else if (probe.navPos === 'static' || probe.navPos === '(无 .nav)') {
      problems.push(`断网后 ${page} 共享样式未生效（.nav position=${probe.navPos}）`);
    } else {
      ok.push(`断网可用 /${page}（「${probe.h1}」，正文 ${probe.chars} 字，${probe.flags} 个红旗段，样式生效）`);
    }
  }

  /* ---- 5. 未缓存路径的导航兜底 ---- */
  await browser.send('Page.navigate', { url: `${BASE}/pages/not-cached-xyz.html` }, sessionId);
  await wait(1200);
  const fallback = await evaluate(`(() => {
    const h1 = document.querySelector('h1');
    return h1 ? h1.textContent.trim().slice(0, 20) : '';
  })()`);
  if (fallback) ok.push(`未缓存路径兜底到「${fallback}」`);
  else problems.push('未缓存路径没有兜底到可读页面');
} catch (error) {
  problems.push(`检查流程失败：${error.message}`);
} finally {
  if (browser) browser.ws.close();
  if (!chrome.killed) chrome.kill();
  await wait(500);
  await rm(profile, { recursive: true, force: true }).catch(() => {});
  nginx();  /* 把 nginx 重新拉起来 */
  await wait(600);
}

console.log('经 nginx 的离线端到端检查：');
for (const line of ok) console.log(`  ✓ ${line}`);
for (const line of problems) console.log(`  ✗ ${line}`);
const back = spawnSync('bash', ['-lc',
  'curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8088/'], { encoding: 'utf8' }).stdout.trim();
console.log(`\n=== ${problems.length} 处问题；nginx 已恢复（/ 返回 ${back}）===`);
process.exit(problems.length ? 1 : 0);
