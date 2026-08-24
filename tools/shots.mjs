/* 页面截图工具：无依赖，只用 Node 内置 WebSocket + 本机 Chrome。
 *
 * 用法：
 *   node tools/shots.mjs games/gravity-drop.html            # 整页截图（家长模式）
 *   node tools/shots.mjs --kid games/gravity-drop.html      # 孩子模式
 *   node tools/shots.mjs --w=375 nature/ocean.html          # 指定视口宽度
 *   node tools/shots.mjs --sel="#stage" games/wave-maker.html
 *   node tools/shots.mjs --click="#btn-run" --wait=1500 games/ramp-and-roll.html
 *
 * 输出写到 /tmp/shots/<page>-<mode>-<width>.png，只用于开发期人工核对视觉。
 */
import { spawn } from 'node:child_process';
import { access, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9800 + (process.pid % 150);
const OUT = process.env.SHOTS_DIR || '/tmp/shots';
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

const args = process.argv.slice(2);
const flags = {};
const list = [];
for (const arg of args) {
  const match = /^--([a-z]+)(?:=(.*))?$/.exec(arg);
  if (match) flags[match[1]] = match[2] === undefined ? true : match[2];
  else list.push(arg);
}
const width = Number(flags.w || 1280);
const height = Number(flags.h || 900);
const mode = flags.kid ? 'kid' : 'parent';
const settle = Number(flags.wait || 900);

async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium', '/usr/bin/chromium-browser'
  ].filter(Boolean);
  for (const candidate of candidates) {
    try { await access(candidate); return candidate; } catch { /* 继续找 */ }
  }
  throw new Error('找不到 Chrome；可通过 CHROME_PATH 指定可执行文件');
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
      const timer = setTimeout(() => { if (this.waiting.delete(id)) fail(new Error(method + ' 超时')); }, 30000);
      this.waiting.set(id, {
        ok(value) { clearTimeout(timer); ok(value); },
        fail(error) { clearTimeout(timer); fail(error); }
      });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
}

const chromePath = await findChrome();
const profile = await mkdtemp(join(tmpdir(), 'shots-chrome-'));
const chrome = spawn(chromePath, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--headless=new', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--disable-extensions',
  '--allow-file-access-from-files', `--window-size=${width},${height}`,
  'about:blank'
], { stdio: 'ignore' });

await mkdir(OUT, { recursive: true });
let browser;
try {
  let wsUrl = null;
  for (let attempt = 0; attempt < 60 && !wsUrl; attempt++) {
    await wait(250);
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (response.ok) wsUrl = (await response.json()).webSocketDebuggerUrl;
    } catch { /* Chrome 尚未就绪 */ }
  }
  if (!wsUrl) throw new Error('Chrome 调试端口未就绪');
  browser = await CDP.attach(wsUrl);

  for (const page of list) {
    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
    await browser.send('Page.enable', {}, sessionId);
    await browser.send('Runtime.enable', {}, sessionId);
    await browser.send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: 1, mobile: width < 900
    }, sessionId);
    await browser.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `try { localStorage.setItem('kids-stem:progress:v3', JSON.stringify({
        revision: 3, pages: {}, recent: [], notes: {}, completions: {}, works: [],
        preferences: { soundEnabled: false, motion: 'system', ageGroup: 'all', mode: ${JSON.stringify(mode)} }
      })); } catch (e) {}`
    }, sessionId);
    await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
    await wait(settle);
    await browser.send('Runtime.evaluate', {
      expression: `(() => {
        if (window.Progress && Progress.setPreference) Progress.setPreference('mode', ${JSON.stringify(mode)});
        if (window.Playful && Playful.syncPreferences) Playful.syncPreferences();
        document.documentElement.setAttribute('data-mode', ${JSON.stringify(mode)});
      })()`
    }, sessionId);
    await wait(400);
    if (flags.click) {
      await browser.send('Runtime.evaluate', {
        expression: `document.querySelectorAll(${JSON.stringify(flags.click)}).forEach((el) => el.click())`
      }, sessionId);
      await wait(Number(flags.after || 1200));
    }
    if (flags.eval) {
      var res = await browser.send('Runtime.evaluate', { expression: String(flags.eval), returnByValue: true }, sessionId);
      console.log('eval:', JSON.stringify(res.result?.value ?? res.result?.description ?? res.exceptionDetails?.text ?? null));
      await wait(Number(flags.after || 800));
    }

    let clip;
    if (flags.sel) {
      const box = await browser.send('Runtime.evaluate', {
        expression: `(() => { const el = document.querySelector(${JSON.stringify(flags.sel)});
          if (!el) return null; const r = el.getBoundingClientRect();
          return JSON.stringify({ x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }); })()`,
        returnByValue: true
      }, sessionId);
      if (box.result?.value) clip = { ...JSON.parse(box.result.value), scale: Number(flags.scale || 1) };
    }
    const shot = await browser.send('Page.captureScreenshot',
      clip ? { format: 'png', clip, captureBeyondViewport: true }
           : { format: 'png', captureBeyondViewport: true }, sessionId);
    const tag = page.replace(/[\/.]/g, '_');
    const file = join(OUT, `${tag}-${mode}-${width}${flags.sel ? '-sel' : ''}.png`);
    await writeFile(file, Buffer.from(shot.data, 'base64'));
    console.log(file);
    await browser.send('Target.closeTarget', { targetId });
  }
} finally {
  if (!chrome.killed) chrome.kill();
  await wait(400);
  try { await rm(profile, { recursive: true, force: true }); } catch { /* 忽略 */ }
  process.exit(0);
}
