/* 一次性排查工具：检查每个 canvas 的位图尺寸是否和 CSS 尺寸按 devicePixelRatio 对得上。
 * 对不上就说明画面被拉伸或压扁——最常见的成因是切换显示模式改变了布局宽度，
 * 而页面只在 window resize 时才重新 fit()。
 *
 * 用法：node tools/canvas-fit-probe.mjs [--kid] [--w=768]
 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, rm, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9600 + (process.pid % 150);
const wait = (ms) => new Promise((done) => setTimeout(done, ms));
const kid = process.argv.includes('--kid');
const mode = kid ? 'kid' : 'parent';
const width = Number((process.argv.find((a) => a.startsWith('--w=')) || '--w=1280').slice(4));

async function findChrome() {
  for (const c of [process.env.CHROME_PATH, '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean)) {
    try { await access(c); return c; } catch { /* 继续找 */ }
  }
  throw new Error('找不到 Chrome');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = () => fail(new Error('连接失败')); });
    const client = new CDP(ws);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const pending = message.id && client.waiting.get(message.id);
      if (!pending) return;
      client.waiting.delete(message.id);
      message.error ? pending.fail(new Error(message.error.message)) : pending.ok(message.result);
    };
    return client;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => {
      this.waiting.set(id, { ok, fail });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
}

const profile = await mkdtemp(join(tmpdir(), 'fitprobe-'));
const chrome = spawn(await findChrome(), [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-sandbox', '--disable-gpu', '--allow-file-access-from-files', '--hide-scrollbars'
], { stdio: 'ignore' });

const pages = [];
for (const dir of ['games', 'nature', 'pages']) {
  for (const f of await readdir(join(ROOT, dir))) if (f.endsWith('.html')) pages.push(`${dir}/${f}`);
}
pages.push('index.html');

let bad = 0;
let browser;
try {
  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await wait(250);
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) wsUrl = (await r.json()).webSocketDebuggerUrl;
    } catch { /* 尚未就绪 */ }
  }
  browser = await CDP.attach(wsUrl);

  for (const page of pages) {
    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
    await browser.send('Page.enable', {}, sessionId);
    await browser.send('Runtime.enable', {}, sessionId);
    await browser.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 900 }, sessionId);
    await browser.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `try { localStorage.setItem('kids-stem:progress:v3', JSON.stringify({
        revision: 3, pages: {}, recent: [], notes: {}, completions: {}, works: [],
        preferences: { soundEnabled: false, motion: 'system', ageGroup: 'all', mode: ${JSON.stringify(mode)} }
      })); } catch (e) {}`
    }, sessionId);
    await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
    await wait(900);
    /* 和真实用户一样：进页面后再用下拉框切换显示模式，看画布跟不跟得上。 */
    await browser.send('Runtime.evaluate', {
      expression: `(() => {
        if (window.Progress && Progress.setPreference) Progress.setPreference('mode', ${JSON.stringify(mode)});
        if (window.Playful && Playful.syncPreferences) Playful.syncPreferences();
        document.documentElement.setAttribute('data-mode', ${JSON.stringify(mode)});
      })()`
    }, sessionId);
    await wait(900);
    const res = await browser.send('Runtime.evaluate', {
      expression: `(() => {
        const out = [];
        document.querySelectorAll('canvas').forEach((c) => {
          /* 位图铺满的是内容盒，不含边框，所以量 clientWidth/clientHeight 而不是外框。 */
          const w = c.clientWidth, h = c.clientHeight;
          if (w < 4 || h < 4 || !c.width || !c.height) return;
          const sx = c.width / w, sy = c.height / h;
          const skew = Math.max(sx / sy, sy / sx);
          if (skew > 1.02) out.push((c.id || c.className || 'canvas') + ' css=' +
            w + 'x' + h + ' bmp=' + c.width + 'x' + c.height +
            ' 拉伸 ' + skew.toFixed(2) + '倍');
        });
        return out.join(' ; ');
      })()`, returnByValue: true
    }, sessionId);
    const v = res.result?.value;
    if (v) { bad++; console.log(`✗ ${page} [${mode} ${width}]  ${v}`); }
    await browser.send('Target.closeTarget', { targetId });
  }
  console.log(bad ? `\n${bad} 页画布比例不对` : `\n${pages.length} 页画布比例全部正确 [${mode} ${width}]`);
} finally {
  if (!chrome.killed) chrome.kill();
  await wait(300);
  try { await rm(profile, { recursive: true, force: true }); } catch { /* 忽略 */ }
  process.exit(bad ? 1 : 0);
}
