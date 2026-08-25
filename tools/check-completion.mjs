#!/usr/bin/env node
/**
 * 完成语义审计（需要本机 Chrome）
 *
 *   node tools/check-completion.mjs
 *   node tools/check-completion.mjs games/fraction-lab.html
 *
 * CONTRACT.md「内容与交互要求」第 3 条：
 *   「完成表示孩子确实做过该任务，不等同于打开页面。」
 *   「`Progress.visit()` 只表示访问；笔记与任务完成是独立语义。」
 *
 * 这是整个足迹体系的地基。如果哪一页在载入时就顺手 complete 了自己，
 * 家长在「我的足迹」里看到的「做过」全是假的——而这种错误不会报任何异常、
 * 不会让页面变样，只会让记录慢慢变成一堆没有意义的对勾。所有实验/自然详情页各自
 * 判定完成条件，判定逻辑写在各页脚本里，没有任何工具核对过它们的触发时机。
 *
 * 断言（全新 localStorage，载入后什么都不点）：
 *   1. 完成记录必须是空的。光打开页面不算做过。
 *   2. 访问记录必须存在（Progress.visit() 该在载入时记一次）——
 *      这条反过来保证第 1 条不是因为 Progress 整个没跑起来才「碰巧」为空。
 *   3. 笔记与作品也必须是空的：它们是独立语义，不能被访问动作带出来。
 *   4. 贴纸由完成派生，所以也必须是空的。
 *
 * 第 2 条是这道审计的自检：只有「访问记好了、完成还是空的」同时成立，
 * 才能证明确实是语义分清了，而不是 Progress 压根没工作。
 */
import { access, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9610 + (process.pid % 50);
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
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
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
      }
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

const SNAPSHOT = (pageId) => `(() => {
  if (typeof window.Progress !== 'object' || typeof Progress.all !== 'function') return { noProgress: true };
  const data = Progress.all();
  const id = ${JSON.stringify(pageId)};
  const completions = Object.keys(data.completions || {});
  const notes = Object.keys(data.notes || {});
  const works = (typeof Progress.getWorks === 'function' ? Progress.getWorks() : []) || [];
  const stickers = (window.Playful && typeof Playful.getSticker === 'function')
    ? (Progress.getStickers ? (Progress.getStickers() || []) : [])
    : [];
  return {
    visited: Boolean((data.pages || {})[id]),
    visitedIds: Object.keys(data.pages || {}).length,
    completions,
    notes,
    works: works.length,
    stickers: stickers.filter((s) => s && s.earned).length,
    available: typeof Progress.available === 'function' ? Progress.available() : null
  };
})()`;

const problems = [];
let chrome;
let client;
await acquireChromeLease();

try {
  const chromePath = await findChrome();
  const profile = await mkdtemp(join(tmpdir(), 'completion-profile-'));
  chrome = await spawnChrome(chromePath, [
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    '--allow-file-access-from-files', '--mute-audio', 'about:blank'
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
  const targets = argv.length ? argv : all.filter((rel) =>
    (rel.startsWith('games/') || rel.startsWith('nature/')) && !rel.endsWith('/index.html'));

  console.log(`完成语义审计：${targets.length} 个详情页，载入后什么都不点\n`);

  for (const rel of targets) {
    let targetId;
    try {
      ({ targetId } = await client.send('Target.createTarget', { url: 'about:blank' }));
      const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
      await client.send('Runtime.enable', {}, sessionId);
      const evaluate = async (expression) => {
        const r = await client.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
        if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
        return r.result.value;
      };
      const url = pathToFileURL(join(ROOT, rel)).href;

      /* 先开一次，把 localStorage 清干净，再重新载入——保证是「全新设备第一次打开」。 */
      await client.send('Page.navigate', { url }, sessionId);
      await wait(1000);
      await evaluate('try { localStorage.clear(); } catch (e) {} true');
      await client.send('Page.navigate', { url }, sessionId);
      /* 给页面充分时间：有些页面的判定在 rAF 或 setTimeout 里，等短了会漏掉自动完成。 */
      await wait(3200);

      const snap = await evaluate(SNAPSHOT(rel));
      const fail = (msg) => problems.push(`${rel}: ${msg}`);

      if (snap.noProgress) {
        fail('页面里没有可用的 Progress，无法判定完成语义');
      } else {
        if (snap.available === false) {
          fail('Progress.available() 为 false：本机存储不可用，这一页的结论不可信');
        }
        /* 2：访问必须记下来。这条同时是本审计的自检。 */
        if (!snap.visited) {
          fail(`访问没有被记录（Progress.all().pages 里没有 ${rel}）：`
            + 'visit() 该在载入时记一次，否则下面「完成为空」可能只是 Progress 没跑起来');
        }
        /* 1：完成必须是空的。 */
        if (snap.completions.length) {
          fail(`光打开页面就产生了完成记录：${snap.completions.join('、')}`
            + '（契约：完成表示孩子确实做过该任务，不等同于打开页面）');
        }
        /* 3：笔记与作品是独立语义，不能被访问带出来。 */
        if (snap.notes.length) fail(`光打开页面就产生了笔记：${snap.notes.join('、')}`);
        if (snap.works) fail(`光打开页面就产生了 ${snap.works} 件作品`);
        /* 4：贴纸由完成派生。 */
        if (snap.stickers) fail(`光打开页面就点亮了 ${snap.stickers} 张贴纸`);
      }

      const ok = !problems.some((p) => p.startsWith(rel + ':'));
      console.log(`${ok ? '✓' : '✗'} ${rel}（访问已记录=${snap.visited ? '是' : '否'}`
        + `｜完成 ${snap.completions ? snap.completions.length : '?'}｜笔记 ${snap.notes ? snap.notes.length : '?'}`
        + `｜作品 ${snap.works ?? '?'}｜贴纸 ${snap.stickers ?? '?'}）`);
      if (!ok) for (const p of problems.filter((p) => p.startsWith(rel + ':'))) console.log('      ' + p.slice(rel.length + 2));
    } catch (error) {
      problems.push(`${rel}: 审计该页时出错，结论不可信：${String(error.message).slice(0, 140)}`);
      console.log(`✗ ${rel}（审计出错：${String(error.message).slice(0, 60)}）`);
    } finally {
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
else console.log('  ✓ 打开页面只算访问：没有任何一页自动产生完成、笔记、作品或贴纸');
process.exit(problems.length ? 1 : 0);
