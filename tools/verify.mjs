/* 全站验证器 —— 无依赖，只用 Node 内置 WebSocket + 本机 Chrome
 *
 * 用法：
 *   node tools/verify.mjs              # 验证全部页面
 *   node tools/verify.mjs games/x.html # 只验证指定页面
 *
 * 做三件事：
 *  1. 用 file:// 打开每一页（和孩子双击打开的方式一致）
 *  2. 抓 console 报错 + 未捕获异常
 *  3. 点一遍页面上所有 button / 拖一遍 range 滑块，再抓一次报错
 *     —— 静态读代码抓不到「点了才崩」的 bug，必须真点。
 *
 * 退出码非 0 表示有页面有问题，可直接用在 pre-commit 里。
 */
import { spawn } from 'node:child_process';
import { readdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/* 用 fileURLToPath 而不是 .pathname：目录名含中文时 pathname 是 percent-encoded 的，
   直接拿去 readdir 会 ENOENT。 */
const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9400 + (process.pid % 300);          // 避开可能已占用的固定端口
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/* file:// 下 NASA / iNaturalist 等跨域接口必然被拦，这是设计好的降级路径，不算 bug */
const IGNORE = [
  /blocked by CORS policy/i,
  /Failed to load resource/i,
  /net::ERR_(FAILED|BLOCKED|NAME_NOT_RESOLVED|INTERNET_DISCONNECTED|CONNECTION)/i,
  /ERR_BLOCKED_BY_CLIENT/i,
];
const ignorable = (t) => IGNORE.some((re) => re.test(t));

/* ---------- 收集页面 ---------- */
async function pages(dir = ROOT, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'tools' || e.name === 'node_modules') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) await pages(p, acc);
    else if (e.name.endsWith('.html')) acc.push(relative(ROOT, p));
  }
  return acc.sort();
}

/* ---------- 极简 CDP 客户端 ---------- */
class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); this.onEvent = null; }
  static async attach(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((ok, no) => { ws.onopen = ok; ws.onerror = () => no(new Error('ws 连接失败')); });
    const c = new CDP(ws);
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data);
      if (msg.id && c.waiting.has(msg.id)) {
        const { ok, no } = c.waiting.get(msg.id); c.waiting.delete(msg.id);
        msg.error ? no(new Error(msg.error.message)) : ok(msg.result);
      } else if (msg.method && c.onEvent) c.onEvent(msg);
    };
    return c;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, no) => {
      this.waiting.set(id, { ok, no });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
      setTimeout(() => { if (this.waiting.delete(id)) no(new Error(method + ' 超时')); }, 30000);
    });
  }
  close() { this.ws.close(); }
}

/* ---------- 主流程 ---------- */
const only = process.argv.slice(2);
const list = only.length ? only : await pages();

const profile = await mkdtemp(join(tmpdir(), 'verify-chrome-'));
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--headless=new', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', '--hide-scrollbars', '--mute-audio',
  '--allow-file-access-from-files', '--window-size=1280,900',
  'about:blank',
], { stdio: 'ignore' });

/* 等调试端口就绪（上次失败就是没等） */
let wsUrl = null;
for (let i = 0; i < 60 && !wsUrl; i++) {
  await new Promise((r) => setTimeout(r, 250));
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    wsUrl = (await r.json()).webSocketDebuggerUrl;
  } catch { /* 还没起来，继续等 */ }
}
if (!wsUrl) { chrome.kill(); await rm(profile, { recursive: true, force: true }); console.error('Chrome 调试端口未就绪'); process.exit(1); }

const browser = await CDP.attach(wsUrl);
let bad = 0;

for (const page of list) {
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });

  const problems = [];
  browser.onEvent = (m) => {
    if (m.sessionId !== sessionId) return;
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      const t = d.exception?.description || d.text || '未知异常';
      if (!ignorable(t)) problems.push('未捕获异常: ' + t.split('\n').slice(0, 3).join('\n    '));
    }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      const t = m.params.args.map((a) => a.value ?? a.description ?? '').join(' ');
      if (!ignorable(t)) problems.push('console.error: ' + t.slice(0, 200));
    }
  };

  await browser.send('Runtime.enable', {}, sessionId);
  await browser.send('Page.enable', {}, sessionId);
  await browser.send('Page.navigate', { url: 'file://' + join(ROOT, page) }, sessionId);
  await new Promise((r) => setTimeout(r, 1400));           // 等首屏渲染 + 降级数据画完

  /* 点一遍所有控件：这是抓「点了才崩」的关键 */
  const poke = `(() => {
    const out = { clicked: 0, ranges: 0 };
    for (const b of document.querySelectorAll('button:not([disabled])')) {
      try { b.click(); out.clicked++; } catch (e) {}
    }
    for (const r of document.querySelectorAll('input[type=range]')) {
      try {
        const lo = +r.min || 0, hi = +r.max || 100;
        for (const v of [lo, (lo + hi) / 2, hi]) {
          r.value = v;
          r.dispatchEvent(new Event('input',  { bubbles: true }));
          r.dispatchEvent(new Event('change', { bubbles: true }));
        }
        out.ranges++;
      } catch (e) {}
    }
    return JSON.stringify(out);
  })()`;
  let stat = { clicked: 0, ranges: 0 };
  try {
    const r = await browser.send('Runtime.evaluate', { expression: poke, returnByValue: true }, sessionId);
    if (r.result?.value) stat = JSON.parse(r.result.value);
  } catch (e) { problems.push('控件遍历失败: ' + e.message); }

  await new Promise((r) => setTimeout(r, 900));             // 等点击引发的动画/定时器把异常抛出来
  await browser.send('Target.closeTarget', { targetId });

  const n = stat.clicked + stat.ranges;
  if (problems.length) {
    bad++;
    console.log(`\n✗ ${page}  (点了 ${stat.clicked} 个按钮，拖了 ${stat.ranges} 个滑块)`);
    for (const p of [...new Set(problems)].slice(0, 6)) console.log('   ' + p);
  } else {
    console.log(`✓ ${page}  (${n} 个控件，无报错)`);
  }
}

browser.close();

// Chrome 退出时还在写 profile，必须等它真的退出再删，否则 rmdir 撞上
// ENOTEMPTY。清理失败不应该盖掉真实的测试结果，所以整段吞掉异常。
chrome.kill();
await new Promise((res) => {
  const t = setTimeout(res, 3000);
  chrome.once('exit', () => { clearTimeout(t); res(); });
});
try {
  await rm(profile, { recursive: true, force: true });
} catch { /* 临时目录留给系统清理，不影响结论 */ }

console.log(`\n=== ${list.length} 页，${bad} 页有问题 ===`);
process.exit(bad ? 1 : 0);
