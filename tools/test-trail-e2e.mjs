/* 探索足迹 v2 端到端测试：无依赖 Node + 本机 Chrome/CDP。
 * 验证 file:// 跨页共享、四层语义、JSON 恢复和三档响应式布局。
 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9700 + (process.pid % 200);
const WAIT = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'
].filter(Boolean);
/* 详情页清单从唯一探索目录推导，不再手写。
   以前这里写死 18 页，新增探索页时会被静默漏掉，等于新页从不进儿童首屏审计。 */
const catalogSandbox = { window: {} };
runInNewContext(await readFile(join(ROOT, 'data', 'explorations.js'), 'utf8'), catalogSandbox, {
  filename: 'data/explorations.js', timeout: 1000
});
const DETAIL_PAGES = (catalogSandbox.window.EXPLORATIONS || [])
  .filter((x) => x && x.ready)
  .map((x) => String(x.id));
if (!DETAIL_PAGES.length) throw new Error('data/explorations.js 没有可用条目，无法推导详情页清单');

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
    check(await evaluate('return Progress.getPreference("mode") === "kid" && document.documentElement.getAttribute("data-mode") === "kid";'), '新设备默认进入孩子模式');
    check(await evaluate(`
      const control = document.querySelector('[data-playful-preference="mode"]');
      if (!control) return false;
      control.value = 'parent';
      control.dispatchEvent(new Event('change', { bubbles: true }));
      const parentSaved = Progress.getPreference('mode') === 'parent' && document.documentElement.getAttribute('data-mode') === 'parent';
      control.value = 'kid';
      control.dispatchEvent(new Event('change', { bubbles: true }));
      return parentSaved && Progress.getPreference('mode') === 'kid' && document.documentElement.getAttribute('data-mode') === 'kid';
    `), '孩子与家长模式可切换并保存');
    check(await evaluate('return document.querySelectorAll("[data-view]").length === 3 && document.getElementById("viewTitle").textContent === "收藏卡册";'), '足迹页提供收藏卡、笔记、作品三视图');
    check(await evaluate('return document.getElementById("stickersTab").tabIndex === 0 && document.getElementById("notesTab").tabIndex === -1 && document.getElementById("collectionPanel").getAttribute("aria-labelledby") === "stickersTab";'), '标签页使用单一可聚焦项并正确标注面板');
    check(await evaluate('document.getElementById("stickersTab").focus(); document.getElementById("stickersTab").dispatchEvent(new KeyboardEvent("keydown", {key:"ArrowLeft", bubbles:true})); return document.activeElement === document.getElementById("notesTab") && document.getElementById("notesTab").getAttribute("aria-selected") === "true" && document.getElementById("viewTitle").textContent === "田野笔记";'), '方向键切换视图并移动焦点');
    /* 卡册槽位数跟着探索目录走，不写死。断言里不再嵌正则字面量：
       '\/' 在普通字符串里会塌成 '/'，注入页面后正则提前收尾并抛 SyntaxError，
       整条流程会在这里中断，后面的断言其实从未跑过。改用 includes()。 */
    const cardTotal = await evaluate('return Progress.getCards().length;');
    check(cardTotal === DETAIL_PAGES.length, `卡册槽位与探索目录一致（${cardTotal} / ${DETAIL_PAGES.length}）`);
    check(await evaluate(`document.getElementById("stickersTab").click(); return document.querySelectorAll(".album-card").length === ${cardTotal} && document.querySelectorAll(".album-card[data-unlocked=false]").length === ${cardTotal} && document.getElementById("milestones").children.length === 4;`), `干净状态显示 ${cardTotal} 个锁定卡槽和 4 个里程碑`);
    check(await evaluate(`return ["visitedCount","stickerCount","noteCount","workCount"].every(id => document.getElementById(id).textContent === "0") && document.getElementById("albumCount").textContent.includes("0 / ${cardTotal}");`), '四项统计和卡册进度均为 0');
    check(await evaluate('return document.getElementById("storageNotice").hidden;'), 'localStorage 可用时不显示降级提示');

    step('跨页面访问');
    await go('games/wave-maker.html');
    check(await evaluate('return Progress.count() === 1 && !!Progress.get("games/wave-maker.html");'), '实验页写入访问记录');
    await go('nature/ocean.html');
    check(await evaluate('return Progress.count() === 2 && !!Progress.get("games/wave-maker.html");'), 'file:// 换页后仍能读取前页记录');
    check(await evaluate('return Progress.get("nature/ocean.html").n === 1;'), '专题访问次数独立记录');

    step('首次完成解锁收藏卡');
    await go('games/wave-maker.html');
    const completion = await evaluate(`
      const probe = document.createElement('button');
      probe.id = 'rewardFocusProbe';
      probe.textContent = '焦点测试';
      document.body.appendChild(probe);
      probe.focus();
      const saved = Progress.complete('games/wave-maker.html', '造出增强与抵消两种干涉');
      const dialog = document.getElementById('playfulRewardDialog');
      return {
        saved,
        opened: Boolean(dialog && (dialog.open || dialog.dataset.open === 'true')),
        title: dialog && dialog.querySelector('#rewardDialogTitle').textContent
      };
    `);
    check(completion?.saved?.evidence === '造出增强与抵消两种干涉', '保存任务完成证据');
    check(completion?.opened && completion.title === '波浪倾听者', '首次完成自动打开对应收藏卡');
    check(await evaluate(`
      const dialog = document.getElementById('playfulRewardDialog');
      dialog.querySelector('.reward-close').click();
      return !dialog.open && !dialog.hasAttribute('data-open') && document.activeElement.id === 'rewardFocusProbe';
    `), '关闭收藏卡后恢复触发前焦点');
    check(await evaluate(`
      Progress.complete('games/wave-maker.html', '造出增强与抵消两种干涉');
      const dialog = document.getElementById('playfulRewardDialog');
      return !dialog.open && !dialog.hasAttribute('data-open');
    `), '重复完成同一任务不会再次自动弹卡');
    check(await evaluate(`
      const badge = document.querySelector('[data-playful-sticker]');
      badge.click();
      const dialog = document.getElementById('playfulRewardDialog');
      const opened = Boolean(dialog && (dialog.open || dialog.dataset.open === 'true'));
      dialog.querySelector('.reward-close').click();
      return opened && badge.getAttribute('role') === 'button' && badge.tabIndex === 0;
    `), '已解锁徽章可用键盘语义重新打开收藏卡');
    const work = await evaluate(`return Progress.saveWork("games/wave-maker.html", {
      type: "observation", title: "干涉记录", content: "波峰相遇增强，波峰与波谷接近抵消。"
    });`);
    check(work?.title === '干涉记录', '保存独立结构化作品');
    check(await evaluate('return Progress.count() === 2;'), '完成任务和保存作品都不增加访问数');
    await go('games/wave-maker.html');
    check(await evaluate('const dialog=document.getElementById("playfulRewardDialog"); return !dialog || (!dialog.open && !dialog.hasAttribute("data-open"));'), '刷新页面不会重放已解锁卡片');

    step('收藏卡册与里程碑');
    await go('pages/progress.html');
    check(await evaluate('return document.getElementById("visitedCount").textContent === "2";'), '访问过为 2');
    check(await evaluate(`return document.getElementById("stickerCount").textContent === "1" && document.getElementById("albumCount").textContent.includes("1 / ${cardTotal}");`), '正式完成派生 1 张收藏卡');
    check(await evaluate(`return document.querySelectorAll(".album-card").length === ${cardTotal} && document.querySelectorAll(".album-card[data-unlocked=true]").length === 1 && document.querySelectorAll(".album-card[data-unlocked=false]").length === ${cardTotal - 1};`), `卡册保留全部 ${cardTotal} 个锁定与解锁位置`);
    check(await evaluate('return [...document.querySelectorAll(".album-card[data-unlocked=true]")].some(card => /波浪倾听者/.test(card.textContent) && /造波机/.test(card.textContent) && /造出增强与抵消两种干涉/.test(card.textContent) && /知识小卡/.test(card.textContent));'), '解锁卡显示来源、发现、知识和完成证据');
    check(await evaluate('return [...document.querySelectorAll(".album-card[data-unlocked=false]")].every(card => !/我的发现|知识小卡|下一次试试/.test(card.textContent));'), '锁定卡不提前揭晓卡片内容');
    check(await evaluate('return document.getElementById("workCount").textContent === "1";'), '结构化作品为 1');
    const oneCardBackup = await evaluate('return Progress.exportJSON();');
    await evaluate(`
      Progress.complete('games/pattern-machine.html', '找出重复单元');
      Progress.complete('games/gravity-drop.html', '比较两次下落');
      const dialog = document.getElementById('playfulRewardDialog');
      if (dialog && (dialog.open || dialog.dataset.open === 'true')) dialog.querySelector('.reward-close').click();
      return true;
    `);
    check(await evaluate(`return document.getElementById("albumCount").textContent.includes("3 / ${cardTotal}") && document.querySelectorAll(".milestone-card[data-unlocked=true]").length === 1;`), '收集 3 张时点亮首个反思里程碑');
    check(await evaluate(`
      const ok = Progress.importJSON(${JSON.stringify(oneCardBackup)});
      const dialog = document.getElementById('playfulRewardDialog');
      return ok && document.getElementById('albumCount').textContent.includes('1 / ${cardTotal}') && (!dialog || (!dialog.open && !dialog.hasAttribute('data-open')));
    `), '导入既有记录同步卡册但不制造新解锁弹窗');
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
    check(!Object.hasOwn(parsed, 'cards') && !Object.hasOwn(parsed, 'milestones'), '导出不重复存储派生卡片与里程碑');
    check(Boolean(parsed.completions['games/wave-maker.html']?.evidence), '导出包含任务证据');
    check(Object.values(parsed.works).length === 1 && Object.values(parsed.works)[0].title === '干涉记录', '导出包含结构化作品');
    await evaluate('document.getElementById("clearData").click(); document.getElementById("clearData").click(); return true;');
    await WAIT(150);
    check(await evaluate('return Progress.count() === 0 && document.getElementById("visitedCount").textContent === "0" && document.querySelectorAll(".album-card[data-unlocked=true]").length === 0;'), '二次确认后清空访问与卡片并立即刷新');
    check(await evaluate(`
      Progress.complete('games/wave-maker.html', '清空后重新完成');
      const dialog = document.getElementById('playfulRewardDialog');
      const opened = Boolean(dialog && (dialog.open || dialog.dataset.open === 'true'));
      if (opened) dialog.querySelector('.reward-close').click();
      Progress.reset();
      return opened;
    `), '清空后重新完成同一卡片会再次触发解锁反馈');
    const imported = await evaluate(`
      document.getElementById('jsonData').value = ${JSON.stringify(exported)};
      document.getElementById('importJson').click();
      const dialog = document.getElementById('playfulRewardDialog');
      return { count: Progress.count(), popup: Boolean(dialog && (dialog.open || dialog.dataset.open === 'true')) };
    `);
    check(imported?.count === 2 && !imported.popup, '从下框导入恢复记录且不误弹奖励');
    check(await evaluate('return document.getElementById("stickerCount").textContent === "1" && document.getElementById("noteCount").textContent === "1" && document.getElementById("workCount").textContent === "1";'), '收藏卡、笔记和作品均恢复');

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
    check(await evaluate('return Progress.getWorks().length === 0 && document.getElementById("workCount").textContent === "0" && /任务完成和收藏卡不受影响/.test(document.getElementById("viewStatus").textContent);'), '删除后计数刷新且稳定反馈说明语义边界');
    check(await evaluate('return Boolean(Progress.getCompletion("games/wave-maker.html")) && Progress.getCards("games/wave-maker.html")[0].unlocked;'), '删除作品不撤销任务完成或收藏卡');

    step('首页汇总');
    await go('index.html');
    const trailText = await evaluate('return document.getElementById("trail-go").textContent;');
    check(new RegExp(`已访问\\s*2\\s*/\\s*${cardTotal}`).test(trailText), `首页显示 2 / ${cardTotal}（实际“${trailText}”）`);
    check(await evaluate(`return document.getElementById("recentCardSummary").textContent.includes("已收集 1 / ${cardTotal}") && /波浪倾听者/.test(document.getElementById("recentCards").textContent);`), '首页显示收藏卡总数和最近解锁卡');

    step(`${DETAIL_PAGES.length} 页儿童首屏`);
    await browser.send('Emulation.setDeviceMetricsOverride', {
      width: 375, height: 812, deviceScaleFactor: 2, mobile: true
    }, sessionId);
    for (const page of DETAIL_PAGES) {
      await go(page);
      const childView = await evaluate(`
        const root = document.documentElement;
        /* 一页可以有多个舞台，也可以有家长版 + 孩子版两条操作条。
           以前这里直接取 querySelector 的第一个，于是量到的常常是首个舞台
           和孩子模式下 display:none 的家长操作条，结论跟实际布局无关。
           现在只取真正可见的那条操作条，并跟它自己所属的舞台比距离。 */
        const shown = (el) => {
          if (!el) return false;
          const s = getComputedStyle(el);
          if (s.display === 'none' || s.visibility === 'hidden') return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        const stages = [...document.querySelectorAll('.kid-hero-scene,.kid-visual-stage')].filter(shown);
        const stage = stages[0] || null;
        const action = [...document.querySelectorAll('.kid-action-strip')].find(shown) || null;
        const deep = document.querySelector('.parent-deep-dive');
        const focusables = [...document.querySelectorAll('a[href],button:not([disabled]),select,textarea,input:not([type=hidden]),[tabindex]:not([tabindex="-1"])')]
          .filter(el => getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none');
        const actionControl = action && action.querySelector('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),[role="button"]');
        const stageRect = stage && stage.getBoundingClientRect();
        const actionRect = action && action.getBoundingClientRect();
        /* 操作条到各个可见舞台底部的距离。负值表示两者并排或操作条在舞台上方
           （hero 左右分栏就是这种情况），同样算“贴着舞台”。 */
        const gaps = actionRect
          ? stages.map((el) => Math.round(actionRect.top - el.getBoundingClientRect().bottom))
          : [];
        const visibleLongText = [...document.querySelectorAll('p,li')].filter(el => {
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.top < innerHeight && rect.bottom > 0 && el.textContent.trim().length > 70;
        }).length;
        return {
          mode: root.getAttribute('data-mode'),
          stageVisible: Boolean(stageRect && stageRect.width > 0 && stageRect.height > 180),
          stageArea: stageRect ? Math.round(stageRect.width * Math.min(stageRect.height, innerHeight)) : 0,
          stageHeight: stageRect ? Math.round(stageRect.height) : 0,
          viewportArea: innerWidth * innerHeight,
          visibleLongText,
          actionVisible: Boolean(actionRect && actionRect.width > 0 && actionRect.height > 0 && actionControl),
          /* 拆成两项：贴不贴舞台，和够不够得着。混在一条里看不出是哪个问题。 */
          actionNearStage: gaps.some((g) => g <= 240),
          actionGap: gaps.length ? gaps.reduce((a, b) => (Math.abs(b) < Math.abs(a) ? b : a)) : null,
          actionTop: actionRect ? Math.round(actionRect.top) : null,
          actionAboveFold: Boolean(actionRect && actionRect.top < innerHeight),
          parentHidden: Boolean(deep && getComputedStyle(deep).display === 'none'),
          overflow: root.scrollWidth - root.clientWidth,
          unnamed: focusables.filter(el => !(el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.labels?.length || el.textContent.trim() || el.title)).length
        };
      `);
      check(childView.mode === 'kid', `${page} 保持孩子模式`);
      check(childView.stageVisible, `${page} 图形舞台可见`);
      check(childView.stageArea >= childView.viewportArea * .24, `${page} 图形舞台占据足够首屏面积`);
      check(childView.stageHeight <= 650, `${page} 图形舞台不过度拉成长卷（${childView.stageHeight}px）`);
      check(childView.visibleLongText <= 1, `${page} 首屏没有文字墙（长段落 ${childView.visibleLongText} 个）`);
      check(childView.actionVisible, `${page} 首要操作可用`);
      check(childView.actionNearStage, `${page} 主操作紧邻舞台（最近间距 ${childView.actionGap}px）`);
      check(childView.actionAboveFold, `${page} 主操作首屏可触达（top ${childView.actionTop ?? '?'}px）`);
      check(childView.parentHidden, `${page} 家长深读不占孩子首屏`);
      check(childView.overflow <= 1, `${page} 375px 无页面级横向溢出（${childView.overflow}px）`);
      check(childView.unnamed === 0, `${page} 可聚焦控件均有名称`);
    }
    await browser.send('Emulation.clearDeviceMetricsOverride', {}, sessionId);

    step('减少动效与三档响应式');
    check(await evaluate('Progress.setPreference("motion", "reduced"); return document.documentElement.getAttribute("data-playful-motion") === "reduced";'), '减少动效偏好即时生效');
    await evaluate('Progress.setPreference("motion", "system"); return true;');
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
          cards: document.querySelectorAll('.album-card').length,
          unnamed: focusables.filter(el => !(el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.labels?.length || el.textContent.trim() || el.title)).length
        };
      `);
      check(layout.overflow <= 1 && !layout.clippedMain, `${width}px 无页面级横向溢出（${layout.overflow}px）`);
      check(layout.cards === cardTotal, `${width}px 保留完整 ${cardTotal} 槽卡册`);
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
