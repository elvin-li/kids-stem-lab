/* 临时冒烟：验证新加的「清空重选」按钮在真实浏览器里可用。
 * 流程：点一张图鉴卡 → 断言 aria-pressed 有 true → 点 comparePickReset →
 * 断言全部恢复 false、无未捕获异常。
 * 用法: node tools/_smoke-reset.mjs nature/albatross.html nature/bees.html nature/seeds.html
 */
import { access, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9700 + (process.pid % 200);
const WAIT = (ms) => new Promise((r) => setTimeout(r, ms));
const PAGES = process.argv.slice(2);
if (!PAGES.length) { console.error('用法: node tools/_smoke-reset.mjs <页面...>'); process.exit(2); }

const CANDIDATES = [process.env.CHROME_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
async function findChrome() {
  for (const c of CANDIDATES) { try { await access(c); return c; } catch { /* 继续找 */ } }
  throw new Error('找不到 Chrome');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); this.onEvent = null; }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('WebSocket 连接失败')); });
    const c = new CDP(ws);
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && c.waiting.has(m.id)) {
        const p = c.waiting.get(m.id); c.waiting.delete(m.id);
        m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result);
      } else if (m.method && c.onEvent) c.onEvent(m);
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
const profile = await mkdtemp(join(tmpdir(), 'smoke-reset-'));
let chrome; let browser; let failed = 0;
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
  await browser.send('Runtime.enable', {}, sessionId);
  const errors = [];
  browser.onEvent = (m) => {
    if (m.sessionId === sessionId && m.method === 'Runtime.exceptionThrown') {
      errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    }
  };

  for (const page of PAGES) {
    errors.length = 0;
    await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
    await WAIT(1000);
    const { result, exceptionDetails } = await browser.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const cards = [...document.querySelectorAll('.kid-figure')];
        if (cards.length < 2) return { ok: false, why: '图鉴卡不足' };
        cards[0].click();
        cards[1].click();
        const pressedBefore = document.querySelectorAll('.kid-figure[aria-pressed="true"]').length;
        const reset = document.getElementById('comparePickReset');
        if (!reset) return { ok: false, why: '找不到 comparePickReset' };
        reset.click();
        const pressedAfter = document.querySelectorAll('[aria-pressed="true"]').length;
        return { ok: pressedBefore > 0 && pressedAfter === 0, pressedBefore, pressedAfter };
      })()`
    }, sessionId);
    const value = exceptionDetails ? { ok: false, why: exceptionDetails.text } : result.value;
    const clean = errors.length === 0;
    const pass = value.ok && clean;
    if (!pass) failed++;
    console.log(`${pass ? '✓' : '✗'} ${page} 点选=${value.pressedBefore ?? '-'} 清空后=${value.pressedAfter ?? '-'}${value.why ? ' ' + value.why : ''}${clean ? '' : ' 异常: ' + errors[0]}`);
  }
} finally {
  if (browser) browser.close();
  await stopChrome(chrome);
}
if (failed) process.exit(1);
