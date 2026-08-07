/* 插画核对用截图器：用本机 Chrome（CDP，零依赖）把页面或页面里某个元素截成 PNG，
 * 好在改完插画后真的看一眼，而不是凭想象。不进门禁；没装 Chrome 时直接报错退出。
 *
 *   node tools/art-shot.mjs nature/beetles.html
 *   node tools/art-shot.mjs nature/beetles.html ".bgrid" 1100 kid /tmp/a.png
 *   node tools/art-shot.mjs nature/beetles.html ".beetle-svg" 900 kid /tmp/b.png "#wingToggle"
 *
 * 参数：页面 [选择器|-] [视口宽=1100] [kid|parent|-] [输出路径] [截图前依次点击的选择器…]
 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, basename } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9500 + (process.pid % 200);
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

const page = process.argv[2];
const selector = process.argv[3] && process.argv[3] !== '-' ? process.argv[3] : null;
const vw = Number(process.argv[4] || 1100);
const mode = process.argv[5] && process.argv[5] !== '-' ? process.argv[5] : '';
const out = process.argv[6] || join('/tmp/art-shots', `${basename(page || 'page', '.html')}-${vw}${mode ? '-' + mode : ''}.png`);
const clicks = process.argv.slice(7);
if (!page) {
  console.error('用法: node tools/art-shot.mjs <page.html> [selector|-] [width] [kid|parent|-] [out.png] [click...]');
  process.exit(2);
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = () => fail(new Error('CDP 连接失败')); });
    const c = new CDP(ws);
    ws.onmessage = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && c.waiting.has(m.id)) {
        const p = c.waiting.get(m.id); c.waiting.delete(m.id);
        m.error ? p.fail(new Error(m.error.message)) : p.ok(m.result);
      }
    };
    return c;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => {
      const t = setTimeout(() => { if (this.waiting.delete(id)) fail(new Error(method + ' 超时')); }, 30000);
      this.waiting.set(id, { ok(v) { clearTimeout(t); ok(v); }, fail(e) { clearTimeout(t); fail(e); } });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() { this.ws.close(); }
}

async function findChrome() {
  const list = [process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium'].filter(Boolean);
  for (const c of list) { try { await access(c); return c; } catch { /* 下一个 */ } }
  throw new Error('找不到 Chrome，这个工具只能在装了 Chrome 的机器上跑');
}

const profile = await mkdtemp(join(tmpdir(), 'art-shot-'));
const chrome = spawn(await findChrome(), [
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--headless=new',
  '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
  '--mute-audio', '--disable-extensions', '--allow-file-access-from-files',
  '--force-color-profile=srgb', 'about:blank'
], { stdio: 'ignore' });

let browser;
try {
  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await wait(250);
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) wsUrl = (await r.json()).webSocketDebuggerUrl;
    } catch { /* 等 Chrome 起来 */ }
  }
  if (!wsUrl) throw new Error('Chrome 调试端口未就绪');
  browser = await CDP.attach(wsUrl);
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
  await browser.send('Page.enable', {}, sessionId);
  await browser.send('Runtime.enable', {}, sessionId);
  await browser.send('Emulation.setDeviceMetricsOverride',
    { width: vw, height: vw < 700 ? 780 : 900, deviceScaleFactor: 2, mobile: vw < 700 }, sessionId);
  await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
  await wait(1400);

  const errors = [];
  if (mode) {
    await browser.send('Runtime.evaluate', {
      expression: `(() => { try { if (window.Progress) Progress.setPreference('mode', ${JSON.stringify(mode)}); } catch (e) {}
        document.documentElement.setAttribute('data-mode', ${JSON.stringify(mode)});
        dispatchEvent(new Event('resize')); })()`
    }, sessionId);
    await wait(600);
  }
  for (const sel of clicks) {
    const r = await browser.send('Runtime.evaluate', {
      expression: `(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'MISS'; el.click(); return 'OK'; })()`,
      returnByValue: true
    }, sessionId);
    console.log(`  click ${sel} → ${r.result.value}`);
    if (r.result.value === 'MISS') errors.push(`点不到 ${sel}`);
    await wait(650);
  }

  let clip;
  if (selector) {
    const r = await browser.send('Runtime.evaluate', {
      expression: `(() => { const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) return null; el.scrollIntoView({ block: 'center' });
        const b = el.getBoundingClientRect();
        return JSON.stringify({ x: b.left + scrollX, y: b.top + scrollY, w: b.width, h: b.height }); })()`,
      returnByValue: true
    }, sessionId);
    if (!r.result.value) throw new Error('找不到元素: ' + selector);
    const b = JSON.parse(r.result.value);
    await wait(350);
    clip = { x: Math.max(0, b.x - 6), y: Math.max(0, b.y - 6), width: b.w + 12, height: b.h + 12, scale: 1 };
  }
  const shot = await browser.send('Page.captureScreenshot',
    Object.assign({ format: 'png', captureBeyondViewport: Boolean(clip) }, clip ? { clip } : {}), sessionId);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, Buffer.from(shot.data, 'base64'));
  console.log('✓ ' + out);
  if (errors.length) { console.error('  · ' + errors.join('；')); process.exitCode = 1; }
} catch (e) {
  console.error('✗ ' + e.message);
  process.exitCode = 1;
} finally {
  if (browser) browser.close();
  if (!chrome.killed) chrome.kill();
  await wait(300);
  try { await rm(profile, { recursive: true, force: true }); } catch { /* 忽略 */ }
}
