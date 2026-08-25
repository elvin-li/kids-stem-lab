/* 临时截图助手：导航到页面，执行一段 DOM 操作，再整页截图。仅用于本地人工核对。
 * 用法: node tools/_shot.mjs <page.html> <out.png> "<js to run before shot>" [width] [height] [mode]
 */
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const [page, out, action = '', width = '900', height = '1600', mode = 'kid'] = process.argv.slice(2);
const PORT = 9700 + (process.pid % 200);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = () => fail(new Error('ws fail')); });
    const c = new CDP(ws);
    ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && c.waiting.has(m.id)) { const p = c.waiting.get(m.id); c.waiting.delete(m.id); m.error ? p.fail(new Error(m.error.message)) : p.ok(m.result); } };
    return c;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => { const t = setTimeout(() => { if (this.waiting.delete(id)) fail(new Error(method + ' timeout')); }, 30000); this.waiting.set(id, { ok(v) { clearTimeout(t); ok(v); }, fail(e) { clearTimeout(t); fail(e); } }); this.ws.send(JSON.stringify({ id, method, params, sessionId })); });
  }
  close() { this.ws.close(); }
}

await acquireChromeLease();
const profile = await mkdtemp(join(tmpdir(), 'shot-'));
const chrome = await spawnChrome(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--headless=new', '--no-first-run', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', `--window-size=${width},${height}`, 'about:blank'], { cleanupPath: profile });
let browser;
try {
  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) { await wait(200); try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) wsUrl = (await r.json()).webSocketDebuggerUrl; } catch {} }
  browser = await CDP.attach(wsUrl);
  /* 这个浏览器一律不许写下载文件。截图靠 CDP 抓屏、结果由本工具自己写到显式路径，
     浏览器下载对它没有用处；但本工具会执行页面 JS（_shot 的 action 参数、art-shot 的
     点击参数），一旦碰到「保存图片」「导出 JSON」这类控件，Chrome 默认行为就会把文件
     真的写进 ~/Downloads。实测确实出现过一张 doodle-pad 导出的图。
     由 check-no-downloads.mjs 盯着，不再给截图工具开豁免。 */
  /* 下载禁用是安全边界：失败时必须在导航、注入脚本、点击之前终止，
     不能用 try/catch 吞掉再继续跑。 */
  await browser.send('Browser.setDownloadBehavior', { behavior: 'deny' });
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
  await browser.send('Page.enable', {}, sessionId);
  await browser.send('Runtime.enable', {}, sessionId);
  await browser.send('Emulation.setDeviceMetricsOverride', { width: +width, height: +height, deviceScaleFactor: 1, mobile: false }, sessionId);
  // 预设 mode 偏好
  await browser.send('Page.addScriptToEvaluateOnNewDocument', { source: `try{localStorage.setItem('kids-stem:progress:v3', JSON.stringify({preferences:{mode:'${mode}'}}))}catch(e){}` }, sessionId);
  await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
  await wait(900);
  if (action) { await browser.send('Runtime.evaluate', { expression: action, awaitPromise: true }, sessionId); await wait(700); }
  const { data } = await browser.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: undefined }, sessionId);
  await writeFile(out, Buffer.from(data, 'base64'));
  console.log('shot ok:', out);
} finally {
  try {
    if (browser) browser.close();
  } finally {
    await stopChrome(chrome);
  }
}
