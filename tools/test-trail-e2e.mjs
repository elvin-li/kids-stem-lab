/* 探索足迹 v2 端到端测试：无依赖 Node + 本机 Chrome/CDP。
 * 验证 file:// 跨页共享、四层语义、JSON 恢复和三档响应式布局。
 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9700 + (process.pid % 200);
const WAIT = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'
].filter(Boolean);

async function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    try { await access(candidate); return candidate; } catch { /* 继续找 */ }
  }
  throw new Error('找不到 Chrome；可用 CHROME_PATH 指定可执行文件');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); this.onEvent = null; }
  static async attach(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = () => reject(new Error('WebSocket 连接失败'));
    });
    const client = new CDP(ws);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id && client.waiting.has(message.id)) {
        const pending = client.waiting.get(message.id);
        client.waiting.delete(message.id);
        message.error ? pending.reject(new Error(message.error.message)) : pending.resolve(message.result);
      } else if (message.method && client.onEvent) client.onEvent(message);
    };
    return client;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.waiting.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
      setTimeout(() => {
        if (this.waiting.delete(id)) reject(new Error(`${method} 超时`));
      }, 30000);
    });
  }
  close() { this.ws.close(); }
}

const profile = await mkdtemp(join(tmpdir(), 'trail-v2-e2e-'));
let chrome;
let browser;
async function cleanup() {
  if (browser) browser.close();
  if (chrome && chrome.exitCode === null) chrome.kill();
  if (chrome) {
    await new Promise((resolve) => {
      if (chrome.exitCode !== null) return resolve();
      const timer = setTimeout(resolve, 3000);
      chrome.once('exit', () => { clearTimeout(timer); resolve(); });
    });
  }
  try { await rm(profile, { recursive: true, force: true }); } catch { /* 不遮盖测试结果 */ }
}

let fatal;
try {
  const chromePath = await findChrome();
  chrome = spawn(chromePath, [
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--hide-scrollbars', '--mute-audio',
    '--allow-file-access-from-files', '--window-size=1280,900', 'about:blank'
  ], { stdio: 'ignore' });

  let wsUrl;
  for (let attempt = 0; attempt < 60 && !wsUrl; attempt++) {
    await WAIT(250);
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      wsUrl = (await response.json()).webSocketDebuggerUrl;
    } catch { /* Chrome 尚未就绪 */ }
  }
  if (!wsUrl) throw new Error('Chrome 调试端口未就绪');

  browser = await CDP.attach(wsUrl);
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
  await Promise.all([
    browser.send('Runtime.enable', {}, sessionId),
    browser.send('Page.enable', {}, sessionId),
    browser.send('Network.enable', {}, sessionId)
  ]);

  const pageProblems = [];
  const requests = new Map();
  browser.onEvent = (message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === 'Network.requestWillBeSent') {
      requests.set(message.params.requestId, message.params.request.url);
    } else if (message.method === 'Network.loadingFailed') {
      const url = requests.get(message.params.requestId) || '';
      if (url.startsWith('file:')) pageProblems.push(`本地资源失败: ${url} (${message.params.errorText})`);
    } else if (message.method === 'Network.responseReceived') {
      const response = message.params.response;
      if (response.url.startsWith('file:') && response.status >= 400) {
        pageProblems.push(`本地资源 HTTP ${response.status}: ${response.url}`);
      }
    } else if (message.method === 'Runtime.exceptionThrown') {
      const detail = message.params.exceptionDetails;
      pageProblems.push('未捕获异常: ' + (detail.exception?.description || detail.text || '未知异常'));
    } else if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      const value = message.params.args.map((arg) => arg.value ?? arg.description ?? '').join(' ');
      if (!/https?:\/\//i.test(value) && !/CORS|ERR_(?:FAILED|BLOCKED|INTERNET|NAME_NOT_RESOLVED|CONNECTION)/i.test(value)) {
        pageProblems.push('console.error: ' + value);
      }
    }
  };

  async function go(relativePath) {
    await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, relativePath)).href }, sessionId);
    await WAIT(1000);
  }
  async function evaluate(expression) {
    const result = await browser.send('Runtime.evaluate', {
      expression: `(() => { ${expression} })()`, returnByValue: true, awaitPromise: true
    }, sessionId);
    if (result.exceptionDetails) {
      const detail = result.exceptionDetails;
      throw new Error(detail.exception?.description || detail.text || '页面执行失败');
    }
    return result.result.value;
  }

  const results = [];
  let current = '';
  const step = (name) => { current = name; };
  const check = (condition, message) => results.push({ ok: Boolean(condition), name: `${current} → ${message}` });

  try {
    step('干净状态');
    await go('pages/progress.html');
    check(await evaluate('return window.Progress && Progress.count() === 0;'), 'v3 初始访问数为 0');
    check(await evaluate('return document.querySelectorAll("[data-view]").length === 3 && document.getElementById("viewTitle").textContent === "贴纸册";'), '足迹页提供贴纸、笔记、作品三视图');
    check(await evaluate('return document.getElementById("stickersTab").tabIndex === 0 && document.getElementById("notesTab").tabIndex === -1 && document.getElementById("collectionPanel").getAttribute("aria-labelledby") === "stickersTab";'), '标签页使用单一可聚焦项并正确标注面板');
    check(await evaluate('document.getElementById("stickersTab").focus(); document.getElementById("stickersTab").dispatchEvent(new KeyboardEvent("keydown", {key:"ArrowRight", bubbles:true})); return document.activeElement === document.getElementById("notesTab") && document.getElementById("notesTab").getAttribute("aria-selected") === "true" && document.getElementById("viewTitle").textContent === "田野笔记";'), '方向键切换视图并移动焦点');
    check(await evaluate('return ["visitedCount","stickerCount","noteCount","workCount"].every(id => document.getElementById(id).textContent === "0");'), '四项统计均为 0');
    check(await evaluate('return document.getElementById("storageNotice").hidden;'), 'localStorage 可用时不显示降级提示');

    step('跨页面访问');
    await go('games/wave-maker.html');
    check(await evaluate('return Progress.count() === 1 && !!Progress.get("games/wave-maker.html");'), '实验页写入访问记录');
    await go('nature/ocean.html');
    check(await evaluate('return Progress.count() === 2 && !!Progress.get("games/wave-maker.html");'), 'file:// 换页后仍能读取前页记录');
    check(await evaluate('return Progress.get("nature/ocean.html").n === 1;'), '专题访问次数独立记录');

    step('完成、贴纸与作品语义');
    const completion = await evaluate('return Progress.complete("games/wave-maker.html", "造出增强与抵消两种干涉");');
    check(completion?.evidence === '造出增强与抵消两种干涉', '保存任务完成证据');
    const work = await evaluate(`return Progress.saveWork("games/wave-maker.html", {
      type: "observation", title: "干涉记录", content: "波峰相遇增强，波峰与波谷接近抵消。"
    });`);
    check(work?.title === '干涉记录', '保存独立结构化作品');
    check(await evaluate('return Progress.count() === 2;'), '完成任务和保存作品都不增加访问数');

    step('足迹页三视图统计');
    await go('pages/progress.html');
    check(await evaluate('return document.getElementById("visitedCount").textContent === "2";'), '访问过为 2');
    check(await evaluate('return document.getElementById("stickerCount").textContent === "1";'), '正式完成派生 1 张贴纸');
    check(await evaluate('return document.getElementById("workCount").textContent === "1";'), '结构化作品为 1');
    check(await evaluate('return [...document.querySelectorAll(".collection-card")].some(card => /波浪倾听者/.test(card.textContent) && /造波机/.test(card.textContent) && /造出增强与抵消两种干涉/.test(card.textContent));'), '贴纸册显示概念贴纸、来源和完成证据');
    check(await evaluate('document.getElementById("worksTab").click(); return [...document.querySelectorAll(".collection-card")].some(card => /干涉记录/.test(card.textContent));'), '作品册显示保存的作品');

    step('田野笔记持久化');
    const saved = await evaluate(`
      document.getElementById('notesTab').click();
      const cards = [...document.querySelectorAll('.collection-card')];
      const card = cards.find(node => /造波机/.test(node.textContent));
      const area = card && card.querySelector('textarea');
      const button = card && card.querySelector('button');
      if (!area || !button) return false;
      area.value = '我发现波峰相遇会增强。';
      area.dispatchEvent(new Event('input', { bubbles: true }));
      button.click();
      return true;
    `);
    check(saved, '通过真实笔记视图保存发现');
    await WAIT(150);
    check(await evaluate('const status = document.getElementById("viewStatus"); return status.getAttribute("aria-live") === "polite" && /田野笔记已保存/.test(status.textContent);'), '重绘后仍保留可宣告的保存反馈');
    await go('pages/progress.html');
    check(await evaluate('return document.getElementById("noteCount").textContent === "1";'), '田野笔记统计为 1');
    check(await evaluate('document.getElementById("notesTab").click(); return [...document.querySelectorAll("textarea")].some(area => /波峰相遇/.test(area.value));'), '刷新后田野笔记仍在');

    step('JSON 清空与恢复');
    const exported = await evaluate('return Progress.exportJSON();');
    const parsed = JSON.parse(exported);
    check(parsed.schemaVersion === 3 && parsed.revision >= 5, '导出为带 revision 的 progress v3');
    check(Boolean(parsed.completions['games/wave-maker.html']?.evidence), '导出包含任务证据');
    check(Object.values(parsed.works).length === 1 && Object.values(parsed.works)[0].title === '干涉记录', '导出包含结构化作品');
    await evaluate('document.getElementById("clearData").click(); document.getElementById("clearData").click(); return true;');
    await WAIT(150);
    check(await evaluate('return Progress.count() === 0 && document.getElementById("visitedCount").textContent === "0";'), '二次确认后清空并立即刷新');
    const imported = await evaluate(`
      document.getElementById('jsonData').value = ${JSON.stringify(exported)};
      document.getElementById('importJson').click();
      return Progress.count();
    `);
    check(imported === 2, '从下框导入恢复两条访问记录');
    check(await evaluate('return document.getElementById("stickerCount").textContent === "1" && document.getElementById("noteCount").textContent === "1" && document.getElementById("workCount").textContent === "1";'), '贴纸、笔记和作品均恢复');

    step('删除作品不撤销完成');
    const deleted = await evaluate(`
      document.getElementById('worksTab').click();
      const button = document.querySelector('.work-card button.danger');
      if (!button) return false;
      button.click();
      button.click();
      return true;
    `);
    check(deleted, '通过二次确认删除作品');
    await WAIT(100);
    check(await evaluate('return Progress.getWorks().length === 0 && document.getElementById("workCount").textContent === "0" && /任务完成和贴纸不受影响/.test(document.getElementById("viewStatus").textContent);'), '删除后计数刷新且稳定反馈说明语义边界');
    check(await evaluate('return Boolean(Progress.getCompletion("games/wave-maker.html")) && Progress.getStickers("games/wave-maker.html").length === 1;'), '删除作品不撤销任务完成或贴纸');

    step('首页汇总');
    await go('index.html');
    const trailText = await evaluate('return document.getElementById("trail-go").textContent;');
    check(/已访问\s*2\s*\/\s*17/.test(trailText), `首页显示 2 / 17（实际“${trailText}”）`);

    step('三档响应式');
    for (const width of [375, 768, 1280]) {
      await browser.send('Emulation.setDeviceMetricsOverride', {
        width, height: width === 375 ? 750 : 900, deviceScaleFactor: width === 375 ? 2 : 1, mobile: width === 375
      }, sessionId);
      await go('pages/progress.html');
      const layout = await evaluate(`
        const root = document.documentElement;
        const main = document.getElementById('main').getBoundingClientRect();
        const focusables = [...document.querySelectorAll('a[href],button:not([disabled]),select,textarea,input:not([type=hidden])')]
          .filter(el => getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none');
        return {
          overflow: root.scrollWidth - root.clientWidth,
          clippedMain: main.left < -1 || main.right > innerWidth + 1,
          unnamed: focusables.filter(el => !(el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.labels?.length || el.textContent.trim() || el.title)).length
        };
      `);
      check(layout.overflow <= 1 && !layout.clippedMain, `${width}px 无页面级横向溢出（${layout.overflow}px）`);
      check(layout.unnamed === 0, `${width}px 可聚焦控件均有名称`);
    }
    await browser.send('Emulation.clearDeviceMetricsOverride', {}, sessionId);
  } catch (error) {
    results.push({ ok: false, name: `${current} → 流程中断`, error });
  }

  for (const problem of [...new Set(pageProblems)]) results.push({ ok: false, name: `页面运行 → ${problem}` });
  let failed = 0;
  for (const result of results) {
    if (result.ok) console.log(`  \x1b[32m✓\x1b[0m ${result.name}`);
    else {
      failed++;
      console.log(`  \x1b[31m✗\x1b[0m ${result.name}`);
      if (result.error) console.log('      ' + String(result.error.stack || result.error).split('\n').slice(0, 2).join('\n      '));
    }
  }
  console.log(`\n${results.length - failed}/${results.length} 通过`);
  if (failed) fatal = new Error(`${failed} 项 E2E 失败`);
} catch (error) {
  fatal = error;
} finally {
  await cleanup();
}

if (fatal) {
  console.error(fatal.message || fatal);
  process.exit(1);
}
