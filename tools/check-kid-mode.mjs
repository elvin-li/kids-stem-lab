#!/usr/bin/env node
/**
 * 孩子模式信息保全审计（需要本机 Chrome）
 *
 *   node tools/check-kid-mode.mjs
 *   node tools/check-kid-mode.mjs games/fraction-lab.html
 *
 * CONTRACT.md「孩子模式（data-mode）」一节的两条硬要求，此前没有任何工具验过：
 *   「孩子模式只改字号、配色、触控尺寸与信息密度，不得删掉任务文字、完成状态
 *     或无障碍名称。」
 *   「隐藏是纯展示层行为，不得移除节点，也不得让页面脚本因找不到节点而报错。」
 *
 * 为什么值得单独建一道门禁：孩子模式是默认值，而它靠一条
 * `html[data-mode="kid"] [data-audience="parent"] { display:none }` 大面积收内容。
 * 只要有人为了让界面清爽，顺手给任务块或状态行加上 data-audience="parent"，
 * 孩子就再也看不到「这一页要我做什么」和「我做完了没有」——而这两件事恰恰是
 * 完成语义的全部依据。这类改动在屏幕上看起来更干净，评审时很难发现。
 * 同一个陷阱刚在打印版上真实发生过一次（家长层整块不上纸，见 check-print.mjs）。
 *
 * 断言：
 *   A. 孩子模式下必须**看得见**至少一处任务陈述，和至少一处完成状态。
 *      判定取真实可见性（checkVisibility），不是节点存在。
 *   B. 切到孩子模式不得减少 DOM 节点数：隐藏只能是展示层行为。
 *   C. 孩子模式下每个可见控件都必须有非空无障碍名称，且不得比家长模式下更少。
 *   D. 两次切换（parent → kid → parent）全程不得有 console 错误或未捕获异常，
 *      也不得因为找不到节点报错。
 *
 * 切换走页面自带的共享偏好控件、不刷新页面，测的就是家长真实操作的那条路径。
 */
import { access, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9720 + (process.pid % 60);
const wait = (ms) => new Promise((done) => setTimeout(done, ms));
const argv = process.argv.slice(2).filter((a) => !a.startsWith('--'));

function chromeCandidates() {
  return [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium', '/usr/bin/chromium-browser'
  ].filter(Boolean);
}
async function findChrome() {
  for (const candidate of chromeCandidates()) {
    try { await access(candidate); return candidate; } catch { /* 继续找 */ }
  }
  throw new Error('找不到 Chrome；可通过 CHROME_PATH 指定可执行文件');
}
async function htmlPages(dir = ROOT, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'tools' || entry.name === 'node_modules') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await htmlPages(path, out);
    else if (entry.name.endsWith('.html')) out.push(relative(ROOT, path).split(sep).join('/'));
  }
  return out.sort();
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); this.onEvent = null; }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((ok, fail) => {
      ws.onopen = ok;
      ws.onerror = () => fail(new Error('Chrome WebSocket 连接失败'));
    });
    const client = new CDP(ws);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id && client.waiting.has(message.id)) {
        const pending = client.waiting.get(message.id);
        client.waiting.delete(message.id);
        message.error ? pending.fail(new Error(message.error.message)) : pending.ok(message.result);
      } else if (message.method && client.onEvent) client.onEvent(message);
    };
    /* 这个浏览器一律不许写下载文件。门禁会逐个点击页面上可见的按钮，
       其中就有「保存图片」「导出 JSON」「导出代码」这类导出控件——Chrome 的
       默认行为会把文件真的存进 ~/Downloads，跑一轮门禁就多出十几个文件
       （doodle-pad 的画、symmetry 的对称作品、足迹 JSON、评估 txt…），
       几轮下来上百个。审计只关心「点下去有没有报错、有没有请求离开设备」，
       落盘对结论没有任何贡献，纯属污染用户的下载目录。
       deny 也顺带让「点导出」这条路径本身仍然被走到，不影响判定。 */
    /* 下载禁用是安全边界：失败时必须在创建 target、点击页面之前终止。 */
    await client.send('Browser.setDownloadBehavior', { behavior: 'deny' });
    return client;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => {
      const timer = setTimeout(() => {
        if (this.waiting.delete(id)) fail(new Error(`${method} 超时`));
      }, 45000);
      this.waiting.set(id, {
        ok(v) { clearTimeout(timer); ok(v); },
        fail(e) { clearTimeout(timer); fail(e); }
      });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() { this.ws.close(); }
}

/* 页内快照：当前 data-mode 下的可见任务陈述、可见完成状态、节点数、
   以及可见控件的无障碍名称统计。 */
const SNAPSHOT = `(() => {
  const vis = (el) => {
    if (!el || !el.isConnected) return false;
    if (typeof el.checkVisibility === 'function') {
      return el.checkVisibility({ checkVisibilityCSS: true, contentVisibilityAuto: true });
    }
    return el.getClientRects().length > 0;
  };
  const txt = (el) => (el.textContent || '').replace(/\\s+/g, ' ').trim();

  /* 完成状态：共享层约定的 .task-status / .status。 */
  const statusNodes = [...document.querySelectorAll('.task-status, .status')].filter((el) => vis(el) && txt(el));

  /* 任务陈述不按「标题里有没有『任务』二字」判——那是嗅词汇，各页措辞本来就不同，
     而且有的页面把任务直接写在状态行里（gravity-drop 的「保持高度和重力不变，
     再完成另一种空气条件」就是任务本身）。
     改成结构化：每一处可见的状态行，都必须待在一个「有名字的分区」里，
     那个名字就是孩子看到的任务陈述。这样既不依赖用词，又能挡住真正的回归——
     一旦有人把整个任务区标成 data-audience="parent"，孩子模式下连状态行都不剩，
     下面 A1 就会红。 */
  const contexts = statusNodes.map((st) => {
    let host = st.parentElement;
    let label = '';
    while (host && host !== document.body) {
      const by = host.getAttribute('aria-labelledby');
      if (by) {
        label = by.split(/\\s+/).map((id) => { const n = document.getElementById(id); return n ? txt(n) : ''; }).join(' ').trim();
        if (label) break;
      }
      const aria = (host.getAttribute('aria-label') || '').trim();
      if (aria) { label = aria; break; }
      host = host.parentElement;
    }
    if (!label) {
      /* 兜底：往上找最近容器里第一个可见标题。 */
      let up = st.parentElement;
      while (up && up !== document.body && !label) {
        const h = up.querySelector('h1, h2, h3, h4');
        if (h && vis(h)) label = txt(h);
        up = up.parentElement;
      }
    }
    return { status: txt(st).slice(0, 40), label: label.slice(0, 44) };
  });
  const unlabelled = contexts.filter((c) => !c.label);

  /* 可见控件的无障碍名称。只看真正可操作的东西。 */
  const CONTROLS = 'button, a[href], input:not([type=hidden]), select, textarea, [role=button], [role=slider], [role=checkbox], [role=radio], [role=tab], [role=switch]';
  const named = [];
  const unnamed = [];
  for (const el of document.querySelectorAll(CONTROLS)) {
    if (!vis(el)) continue;
    const label = (el.getAttribute('aria-label') || '').trim();
    const labelledby = (el.getAttribute('aria-labelledby') || '').trim()
      .split(/\\s+/).map((id) => { const n = document.getElementById(id); return n ? txt(n) : ''; }).join(' ').trim();
    const title = (el.getAttribute('title') || '').trim();
    let forLabel = '';
    if (el.id) {
      const lab = document.querySelector('label[for="' + CSS.escape(el.id) + '"]');
      if (lab) forLabel = txt(lab);
    }
    const wrapped = el.closest('label') ? txt(el.closest('label')) : '';
    const own = txt(el);
    const value = el.tagName === 'INPUT' && /^(button|submit|reset)$/i.test(el.type || '') ? (el.value || '').trim() : '';
    const name = label || labelledby || title || forLabel || wrapped || own || value;
    const tag = el.tagName.toLowerCase() + (el.id ? '#' + el.id : (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/)[0] : ''));
    if (name) named.push(tag); else unnamed.push(tag);
  }

  return {
    mode: document.documentElement.getAttribute('data-mode'),
    nodes: document.getElementsByTagName('*').length,
    statusCount: statusNodes.length,
    contexts: contexts.slice(0, 3),
    unlabelled: unlabelled.length,
    namedCount: named.length,
    unnamed: unnamed.slice(0, 6)
  };
})()`;

const problems = [];
let chrome;
let client;
await acquireChromeLease();

try {
  const chromePath = await findChrome();
  const profile = await mkdtemp(join(tmpdir(), 'kidmode-profile-'));
  chrome = await spawnChrome(chromePath, [
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    '--allow-file-access-from-files', '--mute-audio', '--window-size=430,900', 'about:blank'
  ], { cleanupPath: profile });
  let debuggerUrl;
  for (let attempt = 0; attempt < 60 && !debuggerUrl; attempt += 1) {
    await wait(200);
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      debuggerUrl = (await response.json()).webSocketDebuggerUrl;
    } catch { /* Chrome 尚未就绪 */ }
  }
  if (!debuggerUrl) throw new Error('Chrome 调试端口未就绪');
  client = await CDP.attach(debuggerUrl);

  const all = await htmlPages();
  /* 只审实验/自然详情页：任务与完成状态是详情页才有的语义。 */
  const targets = argv.length ? argv : all.filter((rel) =>
    (rel.startsWith('games/') || rel.startsWith('nature/')) && !rel.endsWith('/index.html'));

  console.log(`孩子模式信息保全审计：${targets.length} 个详情页，视口 430×900\n`);

  for (const rel of targets) {
    let targetId;
    let consoleErrors = [];
    try {
      ({ targetId } = await client.send('Target.createTarget', { url: 'about:blank' }));
      const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
      await client.send('Runtime.enable', {}, sessionId);
      await client.send('Log.enable', {}, sessionId);
      client.onEvent = (message) => {
        if (message.sessionId !== sessionId) return;
        if (message.method === 'Runtime.exceptionThrown') {
          const d = message.params.exceptionDetails;
          consoleErrors.push('未捕获异常：' + (d.exception?.description || d.text || '未知'));
        }
        if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
          consoleErrors.push('console.error：' + message.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
        }
        if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
          const t = message.params.entry.text || '';
          /* file:// 下 favicon 之类的加载噪音不算页面脚本问题。 */
          if (!/favicon/i.test(t)) consoleErrors.push('日志错误：' + t);
        }
      };
      const evaluate = async (expression) => {
        const r = await client.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
        if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
        return r.result.value;
      };
      const setMode = async (mode) => {
        await evaluate(`(() => {
          const sel = document.querySelector('[data-playful-preference="mode"]');
          if (sel) { sel.value = ${JSON.stringify(mode)}; sel.dispatchEvent(new Event('change', { bubbles: true })); return 'switch'; }
          if (window.Playful) { Playful.setPreference('mode', ${JSON.stringify(mode)}); return 'api'; }
          return 'none';
        })()`);
        await wait(700);
      };

      await client.send('Page.navigate', { url: pathToFileURL(join(ROOT, rel)).href }, sessionId);
      await wait(1600);

      /* parent → kid → parent，全程同一个页面实例，不刷新。 */
      await setMode('parent');
      const parent = await evaluate(SNAPSHOT);
      await setMode('kid');
      const kid = await evaluate(SNAPSHOT);
      await setMode('parent');
      const back = await evaluate(SNAPSHOT);

      const fail = (msg) => problems.push(`${rel}: ${msg}`);

      if (kid.mode !== 'kid') fail(`切换后 <html data-mode> 应为 kid，实际 ${kid.mode}`);

      /* A1：孩子模式必须看得见完成状态。整个任务区被标成 parent 的话这里就红。 */
      if (!kid.statusCount) fail('孩子模式下看不到完成状态（.task-status/.status）：孩子无从知道自己做完了没有');
      /* A2：每处可见状态都要待在有名字的分区里，那个名字就是孩子看到的任务陈述。 */
      if (kid.unlabelled) fail(`孩子模式下有 ${kid.unlabelled} 处状态行不在任何有名字的分区里：孩子看到进度却看不到这是什么任务`);
      if (parent.unlabelled) fail(`家长模式下有 ${parent.unlabelled} 处状态行不在任何有名字的分区里`);

      /* B：隐藏不得移除节点 */
      if (kid.nodes < parent.nodes) {
        fail(`切到孩子模式后 DOM 节点从 ${parent.nodes} 少到 ${kid.nodes}：隐藏必须是纯展示层行为，不得移除节点`);
      }
      if (back.nodes < parent.nodes) {
        fail(`切回家长模式后节点没有恢复（${parent.nodes} → ${back.nodes}）`);
      }

      /* C：无障碍名称 */
      if (kid.unnamed.length) fail(`孩子模式下有可见控件没有无障碍名称：${kid.unnamed.join('、')}`);
      if (parent.unnamed.length) fail(`家长模式下有可见控件没有无障碍名称：${parent.unnamed.join('、')}`);

      /* D：切换过程不得报错 */
      const uniqueErrors = [...new Set(consoleErrors)];
      if (uniqueErrors.length) fail(`切换模式过程中出现错误：${uniqueErrors.slice(0, 3).join(' | ')}`);

      const ok = !problems.some((p) => p.startsWith(rel + ':'));
      console.log(`${ok ? '✓' : '✗'} ${rel}（状态行 家长${parent.statusCount}/孩子${kid.statusCount}`
        + `｜可见控件 家长${parent.namedCount}/孩子${kid.namedCount}｜节点 ${parent.nodes}→${kid.nodes}）`);
      if (!ok) {
        for (const p of problems.filter((p) => p.startsWith(rel + ':'))) console.log('      ' + p.slice(rel.length + 2));
      } else if (kid.contexts.length) {
        console.log(`      孩子看到：「${kid.contexts[0].label}」→「${kid.contexts[0].status}」`);
      }
    } catch (error) {
      problems.push(`${rel}: 审计该页时出错，结论不可信：${String(error.message).slice(0, 140)}`);
      console.log(`✗ ${rel}（审计出错：${String(error.message).slice(0, 60)}）`);
    } finally {
      client.onEvent = null;
      if (targetId) await client.send('Target.closeTarget', { targetId }).catch(() => {});
    }
  }
} catch (error) {
  problems.push(`审计中断：${error.message}`);
} finally {
  if (client) client.close();
  await stopChrome(chrome);
}

console.log(`\n=== ${problems.length} 处问题 ===`);
if (problems.length) for (const p of problems) console.log(`  ✗ ${p}`);
else console.log('  ✓ 孩子模式保住了任务文字、完成状态与无障碍名称，隐藏没有移除节点，切换不报错');
process.exit(problems.length ? 1 : 0);
