/* 共享童趣层 E2E：不修改站点 HTML，在临时 fixture 中动态接入 classic scripts。 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9900 + (process.pid % 80);
const WAIT = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'
].filter(Boolean);

async function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    try { await access(candidate); return candidate; } catch { /* 继续寻找 */ }
  }
  throw new Error('找不到 Chrome；可用 CHROME_PATH 指定可执行文件');
}

class CDP {
  constructor(socket) { this.socket = socket; this.id = 0; this.pending = new Map(); this.onEvent = null; }
  static async connect(url) {
    const socket = new WebSocket(url);
    await new Promise((resolve, reject) => {
      socket.onopen = resolve;
      socket.onerror = () => reject(new Error('WebSocket 连接失败'));
    });
    const client = new CDP(socket);
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id && client.pending.has(message.id)) {
        const waiter = client.pending.get(message.id);
        client.pending.delete(message.id);
        message.error ? waiter.reject(new Error(message.error.message)) : waiter.resolve(message.result);
      } else if (message.method && client.onEvent) client.onEvent(message);
    };
    return client;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params, sessionId }));
      setTimeout(() => {
        if (this.pending.delete(id)) reject(new Error(`${method} 超时`));
      }, 30000);
    });
  }
  close() { this.socket.close(); }
}

const temp = await mkdtemp(join(tmpdir(), 'playful-e2e-'));
const profile = join(temp, 'profile');
const fixture = join(temp, 'fixture.html');
const script = (relative) => pathToFileURL(join(ROOT, relative)).href;
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>童趣共享层 fixture</title></head>
<body><main data-playful-page="games/wave-maker.html">
  <div id="companion" data-playful-companion></div>
  <div id="sticker" data-playful-sticker></div>
  <div id="feedback" data-playful-feedback></div>
  <button id="surprise" type="button" data-playful-random-task="#task-output">随机惊喜</button>
  <p id="task-output" data-playful-task-output></p>
  <form id="work-form" data-playful-work-form>
    <select name="type"><option value="drawing">发现画</option></select>
    <input name="title" value="波浪发现画">
    <textarea name="content">波峰相遇变高</textarea>
    <button type="submit">保存作品</button>
    <p id="work-status" data-playful-work-status></p>
  </form>
  <label>年龄<select id="age" data-playful-preference="ageGroup">
    <option value="all">自然</option><option value="4-6">4-6</option><option value="7-9">7-9</option><option value="10-12">10-12</option>
  </select></label>
  <label>声音<input id="sound" type="checkbox" data-playful-preference="soundEnabled"></label>
  <label>动效<select id="motion" data-playful-preference="motion">
    <option value="system">系统</option><option value="full">完整</option><option value="reduced">减少</option>
  </select></label>
</main>
<script>try { localStorage.clear(); } catch (error) { /* fixture 安全降级 */ }</script>
<script src="${script('data/explorations.js')}"></script>
<script src="${script('data/playful.js')}"></script>
<script src="${script('assets/js/progress.js')}"></script>
<script src="${script('assets/js/playful.js')}"></script>
</body></html>`;
await writeFile(fixture, html, 'utf8');

let chrome;
let browser;
let fatal;
async function cleanup() {
  if (browser) browser.close();
  if (chrome && chrome.exitCode === null) chrome.kill();
  if (chrome) {
    await new Promise((resolve) => {
      if (chrome.exitCode !== null) return resolve();
      const timer = setTimeout(resolve, 2500);
      chrome.once('exit', () => { clearTimeout(timer); resolve(); });
    });
  }
  await rm(temp, { recursive: true, force: true }).catch(() => {});
}

try {
  const chromePath = await findChrome();
  chrome = spawn(chromePath, [
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    '--allow-file-access-from-files', '--mute-audio', 'about:blank'
  ], { stdio: 'ignore' });

  let debuggerUrl;
  for (let attempt = 0; attempt < 60 && !debuggerUrl; attempt++) {
    await WAIT(200);
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      debuggerUrl = (await response.json()).webSocketDebuggerUrl;
    } catch { /* Chrome 尚未就绪 */ }
  }
  if (!debuggerUrl) throw new Error('Chrome 调试端口未就绪');

  browser = await CDP.connect(debuggerUrl);
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
  await Promise.all([
    browser.send('Runtime.enable', {}, sessionId),
    browser.send('Page.enable', {}, sessionId),
    browser.send('Network.enable', {}, sessionId)
  ]);
  await browser.send('Emulation.setEmulatedMedia', {
    media: '', features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
  }, sessionId);

  const problems = [];
  const requests = new Map();
  browser.onEvent = (message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === 'Network.requestWillBeSent') requests.set(message.params.requestId, message.params.request.url);
    if (message.method === 'Network.loadingFailed') {
      const url = requests.get(message.params.requestId) || '';
      if (url.startsWith('file:')) problems.push(`本地资源失败：${url} (${message.params.errorText})`);
    }
    if (message.method === 'Runtime.exceptionThrown') {
      const detail = message.params.exceptionDetails;
      problems.push(`未捕获异常：${detail.exception?.description || detail.text || '未知异常'}`);
    }
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      problems.push(`console.error：${message.params.args.map((arg) => arg.value ?? arg.description ?? '').join(' ')}`);
    }
  };

  await browser.send('Page.navigate', { url: pathToFileURL(fixture).href }, sessionId);
  for (let attempt = 0; attempt < 40; attempt++) {
    await WAIT(100);
    const ready = await browser.send('Runtime.evaluate', {
      expression: 'document.readyState === "complete" && Boolean(window.Playful && window.Progress)', returnByValue: true
    }, sessionId);
    if (ready.result.value) break;
    if (attempt === 39) throw new Error('fixture 未完成加载');
  }

  async function evaluate(expression) {
    const result = await browser.send('Runtime.evaluate', {
      expression: `(() => { ${expression} })()`, returnByValue: true, awaitPromise: true
    }, sessionId);
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  }

  const checks = [];
  const check = (condition, name) => checks.push({ ok: Boolean(condition), name });

  check(await evaluate('return PLAYFUL.characters.length === 4 && Object.keys(PLAYFUL.pages).length === 17;'), '共享资料含 4 个角色和 17 项页面配置');
  check(await evaluate('return Object.values(PLAYFUL.pages).every(item => item.surprises.length >= 2 && item.surprises.length <= 4);'), '每页含 2–4 项惊喜任务');
  check(await evaluate('return /波波/.test(document.getElementById("companion").textContent);'), '声明式伙伴提示自动增强');
  check(await evaluate('return document.getElementById("sticker").dataset.earned === "false";'), '未完成时贴纸显示为未获得');
  check(await evaluate('const task = Playful.randomTask("games/wave-maker.html", () => 0); return task && task.text === PLAYFUL.pages[task.pageId].surprises[0];'), '随机任务 API 可确定性注入随机源');
  check(await evaluate('document.getElementById("surprise").click(); return document.getElementById("task-output").textContent.length > 5;'), '随机任务按钮写入可宣告文字反馈');
  check(await evaluate('return Progress.getPreference("soundEnabled") === false && document.getElementById("sound").checked === false;'), '声音默认关闭');
  check(await evaluate('return Progress.getPreference("motion") === "system" && Playful.motionReduced() === true && document.documentElement.dataset.playfulMotionPreference === "system" && document.documentElement.dataset.playfulMotion === "reduced";'), '默认动效与根状态跟随 reduced-motion');
  check(await evaluate('const motion = document.getElementById("motion"); motion.value = "full"; motion.dispatchEvent(new Event("change", { bubbles: true })); return Progress.getPreference("motion") === "full" && Playful.motionReduced() === false && document.documentElement.dataset.playfulMotion === "full";'), '强制完整动效即时更新根状态');
  check(await evaluate('const motion = document.getElementById("motion"); motion.value = "reduced"; motion.dispatchEvent(new Event("change", { bubbles: true })); return Progress.getPreference("motion") === "reduced" && Playful.motionReduced() === true && document.documentElement.dataset.playfulMotion === "reduced";'), '强制减少动效即时更新根状态');
  check(await evaluate('const data = JSON.parse(Progress.exportJSON()); data.preferences.motion = "full"; data.preferences.ageGroup = "10-12"; const imported = Progress.importJSON(JSON.stringify(data)); return imported && document.getElementById("motion").value === "full" && document.getElementById("age").value === "10-12" && document.documentElement.dataset.playfulMotion === "full" && document.documentElement.dataset.playfulAge === "10-12";'), '导入偏好后控件与根状态自动同步');
  check(await evaluate('const reset = Progress.reset(); return reset && document.getElementById("motion").value === "system" && document.getElementById("age").value === "all" && document.documentElement.dataset.playfulMotion === "reduced" && document.documentElement.dataset.playfulAge === "all";'), '重置后控件恢复默认并重新跟随系统');

  const earned = await evaluate('return Progress.complete("games/wave-maker.html", "造出增强与抵消");');
  check(Boolean(earned?.evidence), '页面仍由 Progress.complete() 判定完成');
  check(await evaluate('return document.getElementById("sticker").dataset.earned === "true" && /波浪倾听者/.test(document.getElementById("sticker").textContent);'), '完成事件即时解锁派生贴纸');
  check(await evaluate('const node = document.getElementById("feedback"); return /新贴纸/.test(node.textContent) && !node.querySelector(".playful-confetti");'), '减少动效时保留文字反馈且不生成纸屑');

  check(await evaluate('document.getElementById("work-form").requestSubmit(); return Progress.getWorks("games/wave-maker.html").length === 1;'), '作品表单通过共享辅助保存');
  check(await evaluate('document.querySelector("[name=title]").value = "更新后的波浪发现画"; document.getElementById("work-form").requestSubmit(); const works = Progress.getWorks("games/wave-maker.html"); return works.length === 1 && works[0].title === "更新后的波浪发现画" && Boolean(document.getElementById("work-form").dataset.playfulWorkId);'), '同一表单重复提交更新原作品而不新增副本');
  check(await evaluate('const form = document.getElementById("work-form"), before = Progress.getWorks("games/wave-maker.html")[0]; form.querySelector("[name=content]").value = "文".repeat(5000); const checked = Playful.validateWork("games/wave-maker.html", { id: form.dataset.playfulWorkId, type: "drawing", title: "中文超长记录", content: "文".repeat(5000) }); form.requestSubmit(); const after = Progress.getWorks("games/wave-maker.html"); return !checked.ok && checked.code === "item-bytes" && checked.bytes > checked.maxBytes && after.length === 1 && after[0].id === before.id && after[0].content === before.content && /约\\s*\\d+(?:\\.\\d+)?\\s*KiB/.test(document.getElementById("work-status").textContent) && /超过单项\\s*12\\s*KiB/.test(document.getElementById("work-status").textContent);'), '多字节作品超限时报告真实 KiB 且不覆盖原作品');
  check(await evaluate('return document.getElementById("work-status").getAttribute("aria-live") === "polite";'), '作品保存结果可被读屏宣告');
  check(await evaluate('const age = document.getElementById("age"); age.value = "4-6"; age.dispatchEvent(new Event("change", { bubbles: true })); return Progress.getPreference("ageGroup") === "4-6" && document.documentElement.dataset.playfulAge === "4-6" && /指一指、画一画/.test(document.getElementById("companion").textContent);'), '年龄偏好持久化并重绘伙伴语气');
  check(await evaluate('const age = document.getElementById("age"), original = Progress.setPreference; let detail = null; age.addEventListener("playful:preference", event => { detail = event.detail; }, { once: true }); Progress.setPreference = () => false; age.value = "7-9"; age.dispatchEvent(new Event("change", { bubbles: true })); Progress.setPreference = original; return age.value === "4-6" && Progress.getPreference("ageGroup") === "4-6" && detail && detail.saved === false && detail.name === "ageGroup";'), '偏好写入失败时还原控件并报告失败');
  check(await evaluate('document.querySelector("main").replaceChildren(); return Playful.init(document) === true;'), '无声明式接入点时重复初始化保持静默');

  for (const problem of [...new Set(problems)]) checks.push({ ok: false, name: problem });
  const failed = checks.filter((item) => !item.ok);
  for (const item of checks) console.log(`  ${item.ok ? '✓' : '✗'} ${item.name}`);
  console.log(`\n${checks.length - failed.length}/${checks.length} 通过`);
  if (failed.length) fatal = new Error(`${failed.length} 项童趣 E2E 失败`);
} catch (error) {
  fatal = error;
} finally {
  await cleanup();
}

if (fatal) {
  console.error(fatal.message || fatal);
  process.exit(1);
}
