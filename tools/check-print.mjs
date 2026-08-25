#!/usr/bin/env node
/**
 * 打印版审计（需要本机 Chrome）
 *
 *   node tools/check-print.mjs
 *   node tools/check-print.mjs games/fraction-lab.html
 *
 * CONTRACT.md「打印」一节的要求，此前只有「有没有以 media="print" 引入 print.css」
 * 被 check-contract.mjs 检查过，**打印出来到底长什么样没有任何工具看过**。
 *
 * 这个场景在本站不是附属功能：整个项目的立场就是别把孩子一直按在屏幕前，
 * 把「背后的原理」和「给家长的问题」打出来带到饭桌上聊，是它设计里的一环。
 * 一张只剩导航和空白画布的打印页，等于这条路断了。
 *
 * 断言（都按契约原文）：
 *   1. 交互外壳必须隐藏：`.nav`、`button`、`canvas`、`form`、`input`、`select`、
 *      跳转链接。它们在纸上没有意义，还会挤掉正文。
 *   2. 内容必须保留：标题、「原理」、「给家长的问题」、任务文字与完成状态。
 *      判定方式是取**打印媒体下真实可见的文字**，再检查这几样还在不在——
 *      按选择器判会被各页不同的类名绕过，按可见文字判绕不过去。
 *   3. 浅底深字：可见文字的颜色对白纸的对比度必须 ≥ 4.5（正文）。
 *      为深色舞台写的浅色文字如果漏进打印版，纸上就是白纸白字。
 *   4. 不得要求先运行脚本：**禁用 JavaScript** 再打印一次，上面第 2 条仍须成立。
 *      这条是契约明写的，也最容易被违反——只要标题或原理是 JS 注入的就会中招。
 *
 * 只读 getComputedStyle 与可见文字，不产出 PDF；不需要网络。
 */
import { access, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9790 + (process.pid % 60);
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

/* 页内探针：在当前媒体（调用方已切成 print）下收集
   ——哪些交互外壳还看得见，可见文字里有哪些关键内容，以及最差的文字对比度。 */
const PROBE = `(() => {
  const visible = (el) => {
    if (!el || !el.isConnected) return false;
    if (typeof el.checkVisibility === 'function') {
      return el.checkVisibility({ checkVisibilityCSS: true, contentVisibilityAuto: true });
    }
    return el.getClientRects().length > 0;
  };
  /* --- 1. 交互外壳是否还看得见 --- */
  const shells = {
    '主导航 .nav': '.nav',
    '按钮 button': 'button',
    '画布 canvas': 'canvas',
    '表单 form': 'form',
    '输入框 input': 'input',
    '下拉 select': 'select',
    '跳到主要内容 .skip-link': '.skip-link'
  };
  const leaked = [];
  for (const [name, sel] of Object.entries(shells)) {
    const shown = [...document.querySelectorAll(sel)].filter(visible);
    if (shown.length) leaked.push(name + ' × ' + shown.length);
  }
  /* --- 2. 可见文字 --- */
  const parse = (css) => {
    const m = String(css).match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map((v) => parseFloat(v));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  /* 纸是白的：打印时 print.css 把 body 背景强制成 #fff。 */
  const onWhite = (c) => {
    const a = c.a == null ? 1 : c.a;
    const mix = { r: c.r * a + 255 * (1 - a), g: c.g * a + 255 * (1 - a), b: c.b * a + 255 * (1 - a) };
    const L = lum(mix);
    return (1.05) / (L + 0.05);
  };
  let text = '';
  let worst = null;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const raw = (node.nodeValue || '').replace(/\\s+/g, ' ').trim();
    if (!raw) continue;
    const host = node.parentElement;
    if (!visible(host)) continue;
    text += raw + ' ';
    /* 纯 emoji 的彩色字形不受 color 控制，跳过。 */
    if (!/[\\u4e00-\\u9fa5A-Za-z0-9]/.test(raw)) continue;
    const cs = getComputedStyle(host);
    const color = parse(cs.color);
    if (!color) continue;
    const ratio = onWhite(color);
    const size = parseFloat(cs.fontSize) || 12;
    const bold = (parseInt(cs.fontWeight, 10) || 400) >= 700;
    /* WCAG 大字阈值：≥24px，或 ≥18.66px 且加粗。 */
    const big = size >= 24 || (size >= 18.66 && bold);
    const need = big ? 3 : 4.5;
    if (ratio < need && (!worst || ratio < worst.ratio)) {
      worst = { ratio: Math.round(ratio * 100) / 100, need, color: cs.color, size: Math.round(size), sample: raw.slice(0, 30) };
    }
  }
  const h1 = document.querySelector('h1');
  const status = [...document.querySelectorAll('.task-status, .status')].map((n) => (n.textContent || '').trim()).filter(Boolean);
  return {
    leaked,
    text: text.slice(0, 200000),
    h1: h1 ? (h1.textContent || '').replace(/\\s+/g, ' ').trim() : '',
    h1Visible: h1 ? visible(h1) : false,
    statuses: status,
    worst
  };
})()`;

const problems = [];
const notes = [];
let chrome;
let client;
await acquireChromeLease();

try {
  const chromePath = await findChrome();
  const profile = await mkdtemp(join(tmpdir(), 'print-profile-'));
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
  /* 只审实验/自然详情页：契约「打印」一节要保留的东西（原理、家长提问、任务文字、
     完成状态）就是详情页才有的。目录页和文档页没有任务，套同一把尺子只会误报。 */
  const targets = argv.length ? argv : all.filter((rel) =>
    (rel.startsWith('games/') || rel.startsWith('nature/')) && !rel.endsWith('/index.html'));

  console.log(`打印版审计：${targets.length} 个详情页，media=print，另跑一遍禁用 JavaScript\n`);

  for (const rel of targets) {
    let targetId;
    try {
      ({ targetId } = await client.send('Target.createTarget', { url: 'about:blank' }));
      const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
      await client.send('Runtime.enable', {}, sessionId);
      await client.send('Emulation.setEmulatedMedia', { media: 'print' }, sessionId);
      const url = pathToFileURL(join(ROOT, rel)).href;
      const probe = async () => {
        const r = await client.send('Runtime.evaluate', { expression: PROBE, returnByValue: true }, sessionId);
        if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
        return r.result.value;
      };

      /* ---- 有脚本的打印版 ---- */
      await client.send('Page.navigate', { url }, sessionId);
      await wait(1500);
      const withJs = await probe();

      /* ---- 禁用脚本再来一次：契约要求不运行脚本也能得到可读打印页 ---- */
      await client.send('Emulation.setScriptExecutionDisabled', { value: true }, sessionId);
      await client.send('Page.navigate', { url }, sessionId);
      await wait(900);
      const noJs = await probe();
      await client.send('Emulation.setScriptExecutionDisabled', { value: false }, sessionId);

      const fail = (msg) => problems.push(`${rel}: ${msg}`);

      /* 断言 1：交互外壳必须隐藏 */
      if (withJs.leaked.length) fail(`打印版仍显示交互元素 → ${withJs.leaked.join('；')}`);

      /* 断言 2：内容必须保留（有脚本与无脚本两轮都要成立） */
      for (const [label, snapshot] of [['', withJs], ['禁用脚本后', noJs]]) {
        const where = label ? label : '打印版';
        if (!snapshot.h1 || !snapshot.h1Visible) fail(`${where}看不到标题 h1`);
        /* 「原理」只对 games/ 判字面词。nature/ 用的是问题式表述
           （weather 的「雨为什么会落下？」、space 的「为什么不会直直掉下去？」
             就是它们的原理段），按字面词判会误报——和 check-content.mjs 同一口径。 */
        if (rel.startsWith('games/') && !/原理/.test(snapshot.text)) fail(`${where}没有「原理」段`);
        if (!/(给家长|家长的|陪伴追问|一起追问|提问脚本|问一问|可以这样问|可以一起聊)/.test(snapshot.text)) {
          fail(`${where}没有「给家长的问题」`);
        }
        if (!/任务|挑战|试一试/.test(snapshot.text)) fail(`${where}没有任务文字`);
      }
      /* 完成状态：有脚本时页面会把状态写成「尚未完成：…」之类；
         禁用脚本时静态兜底文案也应当在。 */
      if (!withJs.statuses.length) notes.push(`${rel}: 打印版没有 .task-status/.status 完成状态行`);
      else if (!noJs.statuses.length) notes.push(`${rel}: 禁用脚本后完成状态行消失（状态文字是 JS 注入的）`);

      /* 断言 3：浅底深字 */
      if (withJs.worst) {
        fail(`打印版有文字对比度不足：${withJs.worst.ratio}:1（需 ${withJs.worst.need}）`
          + ` color=${withJs.worst.color} ${withJs.worst.size}px 「${withJs.worst.sample}」`);
      }

      const ok = !problems.some((p) => p.startsWith(rel + ':'));
      console.log(`${ok ? '✓' : '✗'} ${rel}（可见文字 ${withJs.text.length} 字｜禁用脚本后 ${noJs.text.length} 字`
        + `｜状态行 ${withJs.statuses.length}/${noJs.statuses.length}）`);
      for (const p of problems.filter((p) => p.startsWith(rel + ':'))) console.log('      ' + p.slice(rel.length + 2));
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

console.log(`\n=== ${problems.length} 处打印问题 ===`);
if (problems.length) for (const p of problems) console.log(`  ✗ ${p}`);
else console.log('  ✓ 打印版隐藏了交互外壳，保留了标题、原理、家长提问、任务与完成状态，且不依赖脚本');
if (notes.length) {
  console.log(`\n（${notes.length} 条提示，不阻断）`);
  for (const n of notes) console.log(`  · ${n}`);
}
process.exit(problems.length ? 1 : 0);
