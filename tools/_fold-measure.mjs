/* 临时诊断：量指定页面在 375×812 下的首屏布局分解。
 * 只读页面、只输出 JSON 行；复用仓库的 chrome-lease / chrome-lifecycle 合同。
 * 用法: node tools/_fold-measure.mjs games/tongue-lab.html nature/moon.html ...
 */
import { access, mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9700 + (process.pid % 200);
const WAIT = (ms) => new Promise((r) => setTimeout(r, ms));
const argv = process.argv.slice(2);
const SEED = argv.includes('--seed');
const DESKTOP_FIRST = argv.includes('--desktop-first');
const prefixArg = argv.find((a) => a.startsWith('--catalog-prefix='));
const CATALOG_PREFIX = prefixArg ? Number(prefixArg.split('=')[1]) : 0;
const NO_OVERRIDE = argv.includes('--no-override');
const PAGES = argv.filter((a) => !a.startsWith('--'));
if (!PAGES.length) { console.error('用法: node tools/_fold-measure.mjs [--seed] [--desktop-first] [--catalog-prefix=N] <页面...>'); process.exit(2); }

const CANDIDATES = [process.env.CHROME_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
async function findChrome() {
  for (const c of CANDIDATES) { try { await access(c); return c; } catch { /* 继续找 */ } }
  throw new Error('找不到 Chrome');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('WebSocket 连接失败')); });
    const c = new CDP(ws);
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && c.waiting.has(m.id)) {
        const p = c.waiting.get(m.id); c.waiting.delete(m.id);
        m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result);
      }
    };
    /* 下载禁用是安全边界：失败时必须在创建 target 之前终止。 */
    await c.send('Browser.setDownloadBehavior', { behavior: 'deny' });
    return c;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.waiting.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
      setTimeout(() => { if (this.waiting.delete(id)) reject(new Error(`${method} 超时`)); }, 30000);
    });
  }
  close() { this.ws.close(); }
}

await acquireChromeLease();
const chromePath = await findChrome();
const profile = await mkdtemp(join(tmpdir(), 'measure-fold-'));
let chrome; let browser;
try {
  chrome = await spawnChrome(chromePath, [
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--hide-scrollbars', '--mute-audio',
    '--allow-file-access-from-files', '--window-size=1280,900', 'about:blank'
  ], { cleanupPath: profile });
  let wsUrl;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await WAIT(250);
    try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch { /* 未就绪 */ }
  }
  if (!wsUrl) throw new Error('Chrome 调试端口未就绪');
  browser = await CDP.attach(wsUrl);
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
  await browser.send('Page.enable', {}, sessionId);
  await browser.send('Runtime.enable', {}, sessionId);
  if (DESKTOP_FIRST) {
    /* 复现 trail E2E 的前置：进入 375px 视口前，这个 tab 先以 1280×900 桌面
       尺寸真实访问过若干页面（progress/wave-maker/ocean/index）。 */
    for (const pre of ['pages/progress.html', 'games/wave-maker.html', 'nature/ocean.html', 'index.html']) {
      await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, pre)).href }, sessionId);
      await WAIT(1000);
    }
  }
  if (!NO_OVERRIDE) {
    await browser.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true }, sessionId);
  }

  if (CATALOG_PREFIX > 0) {
    /* 复现 E2E 236 页循环：先按探索目录顺序访问目标页之前的 N 页（375px 视口）。 */
    const sb = { window: {} };
    runInNewContext(await readFile(join(ROOT, 'data', 'explorations.js'), 'utf8'), sb, { timeout: 1000 });
    const catalog = (sb.window.EXPLORATIONS || []).filter((x) => x && x.ready).map((x) => String(x.id));
    const stop = catalog.indexOf(PAGES[0]);
    const prefix = catalog.slice(Math.max(0, stop - CATALOG_PREFIX), Math.max(0, stop));
    console.error(`按目录顺序预访问 ${prefix.length} 页…`);
    for (const pre of prefix) {
      await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, pre)).href }, sessionId);
      await WAIT(1000);
    }
  }

  if (SEED) {
    /* 复现 trail E2E 到 236 页循环时的 localStorage 状态：2 次访问、1 个完成、1 条笔记。 */
    await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, 'pages/progress.html')).href }, sessionId);
    await WAIT(1000);
    const seeded = await browser.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        Progress.visit('games/wave-maker.html', '造波机');
        Progress.visit('nature/ocean.html', '海洋观察站');
        Progress.complete('games/wave-maker.html', '造出增强与抵消两种干涉');
        Progress.note('games/wave-maker.html', '我发现波峰相遇会增强。');
        const dialog = document.getElementById('playfulRewardDialog');
        if (dialog && (dialog.open || dialog.dataset.open === 'true')) dialog.querySelector('.reward-close').click();
        return Progress.count();
      })()`
    }, sessionId);
    console.log(JSON.stringify({ seeded: seeded.result.value ?? String(seeded.exceptionDetails?.text) }));
  }

  for (const page of PAGES) {
    await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
    await WAIT(1200);
    const { result, exceptionDetails } = await browser.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const shown = (el) => {
          if (!el) return false;
          const s = getComputedStyle(el);
          if (s.display === 'none' || s.visibility === 'hidden') return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        const R = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { top: Math.round(r.top), h: Math.round(r.height) }; };
        const Q = (sel) => R(document.querySelector(sel));
        const strips = [...document.querySelectorAll('.kid-action-strip')].map((el) => ({
          label: el.getAttribute('aria-label'), shown: shown(el),
          top: Math.round(el.getBoundingClientRect().top),
          enabled: Boolean(el.querySelector('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),[role="button"]')),
          display: getComputedStyle(el).display, w: Math.round(el.getBoundingClientRect().width)
        }));
        const stages = [...document.querySelectorAll('.kid-hero-scene,.kid-visual-stage')].filter(shown).map(R);
        const firstStrip = [...document.querySelectorAll('.kid-action-strip')].find(shown);
        const stripTop = firstStrip ? firstStrip.getBoundingClientRect().top : Infinity;
        const blocks = [...document.querySelectorAll('main > *')]
          .filter((el) => el.getBoundingClientRect().top < stripTop + 1)
          .map((el) => ({ t: el.tagName.toLowerCase(), c: (el.getAttribute('class') || '').split(/\\s+/).slice(0, 2).join('.'), ...(R(el) || {}) }));
        const h1el = document.querySelector('.hero h1');
        const svgel = document.querySelector('.kid-visual-stage svg');
        return {
          nav: Q('.nav'), hero: Q('.kid-hero-scene'),
          pills: Q('.hero .row'), h1: Q('.hero h1'), lead: Q('.lead'),
          comp: Q('.playful-companion'), sticker: Q('.playful-sticker'),
          stage: Q('.kid-visual-stage'), stageH2: Q('.kid-visual-stage h2'),
          stageSvg: Q('.kid-visual-stage svg'), stageLive: Q('.kid-visual-stage .live-text'),
          readout: Q('.readout'), stages, strips, blocks,
          diag: {
            h1Font: h1el ? getComputedStyle(h1el).fontSize : null,
            svgW: svgel ? Math.round(svgel.getBoundingClientRect().width) : null,
            sheets: document.styleSheets.length,
            fonts: document.fonts.status,
            ready: document.readyState,
            innerW: innerWidth, innerH: innerHeight, dpr: devicePixelRatio,
            url: location.pathname.split('/').slice(-2).join('/')
          }
        };
      })()`
    }, sessionId);
    if (exceptionDetails) { console.log(JSON.stringify({ page, error: exceptionDetails.text })); continue; }
    console.log(JSON.stringify({ page, ...result.value }));
  }
} finally {
  if (browser) browser.close();
  await stopChrome(chrome);
}
