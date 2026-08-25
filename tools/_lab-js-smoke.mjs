/* Smoke: open pages, poke controls, report console errors. */
import { access, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9700 + (process.pid % 200);
const WAIT = (ms) => new Promise((r) => setTimeout(r, ms));
const PAGES = process.argv.slice(2);
if (!PAGES.length) {
  console.error('用法: node tools/_lab-js-smoke.mjs <page...>');
  process.exit(2);
}

async function findChrome() {
  const c = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  await access(c);
  return c;
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

const lease = await acquireChromeLease();
const chromePath = await findChrome();
const profile = await mkdtemp(join(tmpdir(), 'lab-js-smoke-'));
let chrome; let browser; let failed = 0;
try {
  chrome = await spawnChrome(chromePath, [
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--mute-audio', '--allow-file-access-from-files',
    '--window-size=1280,900', 'about:blank'
  ], { cleanupPath: profile });
  let wsUrl;
  for (let i = 0; i < 80 && !wsUrl; i++) {
    await WAIT(250);
    try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch { /* */ }
  }
  if (!wsUrl) throw new Error('Chrome 调试端口未就绪');
  browser = await CDP.attach(wsUrl);
  for (const page of PAGES) {
    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
    await browser.send('Runtime.enable', {}, sessionId);
    await browser.send('Page.enable', {}, sessionId);
    const errs = [];
    browser.ws.addEventListener('message', (ev) => {
      const m = JSON.parse(ev.data);
      if (m.method === 'Runtime.exceptionThrown' && m.sessionId === sessionId) {
        const d = m.params?.exceptionDetails;
        errs.push(String(d?.exception?.description || d?.text || 'exception'));
      }
    });
    await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
    await WAIT(1200);
    const poke = await browser.send('Runtime.evaluate', {
      expression: `(() => {
        const clicks = ['useOne','useTwo','toPrism','toFilter','toMirror','toEgg','toRound','moveLeft','moveRight','confirmSwap'];
        for (const id of clicks) { const el = document.getElementById(id); if (el) el.click(); }
        for (const id of ['load','pull','angle','bump','rpm','dist']) {
          const el = document.getElementById(id);
          if (el) { el.value = String(Number(el.min || 0) + 12); el.dispatchEvent(new Event('input', { bubbles: true })); }
        }
        const stage = document.querySelector('.kid-visual-stage, .kid-hero-scene');
        const r = stage && stage.getBoundingClientRect();
        return {
          live: (document.getElementById('live') || {}).textContent || '',
          status: (document.getElementById('taskStatus') || {}).textContent || '',
          toolOut: (document.getElementById('toolOut') || {}).textContent || null,
          onceOut: (document.getElementById('onceOut') || {}).textContent || null,
          stageH: r ? Math.round(r.height) : 0,
          stageTop: r ? Math.round(r.top) : null
        };
      })()`,
      returnByValue: true
    }, sessionId);
    const val = poke.result?.value ?? poke.result?.result?.value ?? {};
    if (errs.length) failed += 1;
    console.log(JSON.stringify({ page, errs, ...val }));
    await browser.send('Target.closeTarget', { targetId });
  }
} finally {
  if (browser) browser.close();
  if (chrome) await stopChrome(chrome);
  await lease.release();
}
process.exit(failed ? 1 : 0);
