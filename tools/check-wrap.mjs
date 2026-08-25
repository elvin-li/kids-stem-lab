/* 中文排版的断行审计：无依赖，用本机 Chrome 实测每一行真实落在哪里。
 *
 * 用法：
 *   node tools/check-wrap.mjs                    # 全站，三个视口
 *   node tools/check-wrap.mjs nature/space.html  # 指定页面
 *
 * 抓的是「不报错、门禁全绿、但读起来就是别扭」的一类缺陷。这一类此前没有任何工具看过：
 * `verify.mjs` 只问有没有横向溢出，`check-rendered-contrast.mjs` 只量颜色，
 * `check-print.mjs` 只看纸上有没有丢内容——**断行落在哪个字之间，谁都没看**。
 *
 * 三类判定，都是用 Range 逐行量出真实行盒，不靠猜：
 *
 *   1. 数量词组被拆开（split-unit）。源码里「139 万 km」「-180 ℃」「88 天」用的是
 *      半角 ASCII 空格，而 U+0020 在 UAX #14 里是**无条件断行机会**，浏览器一定会
 *      在那里断。于是数字留在行尾、单位孤零零跳到下一行。窄格子里最明显。
 *      修法只有两条：换成 U+00A0，或者把词组包进 white-space:nowrap。
 *
 *   2. 末行孤字（orphan-char）。中文每字之间都可断，所以标题末行只剩 1 个字完全合法。
 *      `print.css` 里的 orphans/widows 管不到它——那两个属性管的是跨页时首末页留几行，
 *      不是一行里留几个字。CSS 侧的解药是 text-wrap: balance / pretty。
 *
 *   3. 一字一行（one-char-line）。`overflow-wrap: anywhere` 会让应急断点**参与
 *      min-content 计算**，元素的最小宽度变成「最宽的那个字」，于是在
 *      `minmax(min(262px,100%),1fr)` 这类由内容定宽的栅格里，列可以塌到一字宽。
 *      `break-word` 不参与内在尺寸计算，这就是两者的真实差别。
 *
 * 这一条**不进 run-gates**：它要 Chrome，而且判定带审美成分，适合改排版时手动跑、对比前后。
 */
import { readdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const WIDTHS = [375, 768, 1280];

const argPages = process.argv.slice(2).filter((a) => !a.startsWith('--'));
let pages = argPages;
if (!pages.length) {
  const dirs = ['pages', 'games', 'nature'];
  pages = ['index.html'];
  for (const d of dirs) {
    for (const n of (await readdir(join(ROOT, d))).sort()) {
      if (n.endsWith('.html') && !n.startsWith('_')) pages.push(`${d}/${n}`);
    }
  }
}

await acquireChromeLease();
const profile = await mkdtemp(join(tmpdir(), 'wrapaudit-'));
const port = 9700 + Math.floor(Math.random() * 250);
const chrome = await spawnChrome(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--disable-gpu',
  '--hide-scrollbars', '--force-device-scale-factor=1',
  '--disable-features=DownloadBubble', '--download-restrictions=3',
  'about:blank'
], { cleanupPath: profile });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function endpoint() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch { /* 还没起来 */ }
    await sleep(250);
  }
  throw new Error('Chrome 没有起来');
}
let ws;
let totalSplit = 0;
let totalOrphan = 0;
let totalOneChar = 0;
const detail = [];
const resultLines = [];
try {
  ws = new WebSocket(await endpoint());
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  }
};
function send(method, params = {}, sessionId) {
  const id = (msgId += 1);
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
    setTimeout(() => {
      if (pending.has(id)) { pending.delete(id); reject(new Error(`${method} 超时`)); }
    }, 40000);
  });
}

await send('Browser.setDownloadBehavior', { behavior: 'deny' });
const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);

/* 页内脚本：用 Range 把每个文字节点切成「真实行」，然后判三类问题。 */
const PROBE = `(() => {
  const UNITS = ['km','AU','kg','g','℃','°C','天','年','岁','倍','颗','个','万','亿',
                 '小时','分钟','分','秒','米','公里','千米','月龄','月','周','人','度'];
  const isHan = (ch) => /[\\u4e00-\\u9fff]/.test(ch);
  const out = { splitUnit: [], orphan: [], oneChar: [] };
  const seen = new Set();

  /* 把一个块里的全部文字（跨内联标签）按真实行盒切开。
     做法是收集块内所有文字节点，拼成一条连续的字符序列，再用 Range 逐字符量 top。
     这样 <b>、<a> 造成的节点边界不会被误当成行边界。 */
  function linesOfElement(el) {
    const chars = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walk.nextNode())) {
      if (!n.nodeValue) continue;
      for (let i = 0; i < n.nodeValue.length; i += 1) chars.push({ node: n, i });
    }
    if (!chars.length) return null;
    const range = document.createRange();
    const lines = [];
    let cur = null;
    let prevLeft = null;
    for (const c of chars) {
      range.setStart(c.node, c.i);
      range.setEnd(c.node, c.i + 1);
      const r = range.getClientRects()[0];
      if (!r) continue;
      /* 换行信号用 **x 坐标回退**，不用 top 变化。
         按 top 分组会被基线对齐骗到：<strong class="lift-big">28.5<small>吨</small></strong>
         里那个 .9rem 的「吨」待在 2.5rem 的行盒里，top 天然和大字不同，
         于是「同一行的两种字号」被误判成两行，报出一个根本不存在的孤字。
         而文字换行时 x 一定回到行首（居中、右对齐也一样会回退），这个信号对字号差异免疫。 */
      const wrapped = prevLeft !== null && r.left + 0.5 < prevLeft;
      if (!cur || wrapped) {
        cur = { chars: [] };
        lines.push(cur);
      }
      cur.chars.push(c.node.nodeValue[c.i]);
      prevLeft = r.left;
    }
    range.detach();
    return lines.map((l) => l.chars.join(''));
  }

  /* 按「块容器」遍历，不按文字节点。
     断行的真实单位是块：一个段落里夹着 <b>、<a> 时，文字被切成好几个节点，
     而它们同属一个行盒序列。第一版按文字节点量，于是「，比如每年 8 月的」这种
     被内联标签切出来的中间片段，其最后一行被当成了整段的末行 —— 报出一堆
     根本不存在的孤字。会对正当内容喊狼来了的审计比没有审计更糟，所以改成量块。 */
  const BLOCKISH = new Set(['block', 'flow-root', 'list-item', 'table-cell', 'grid', 'flex']);
  const blocks = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
    if (el.closest('[hidden], [aria-hidden="true"], .sr-only, .skip-link')) continue;
    if (el.matches('script, style, svg, svg *')) continue;
    if (!BLOCKISH.has(cs.display)) continue;
    /* 只要「自己直接拥有文字」的块，避免父块把子块的文字重复统计一遍。 */
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim().length);
    if (!own) continue;
    /* 块里若还嵌着别的块，行盒会被子块打断，量出来的行没有意义，跳过。 */
    const hasBlockChild = [...el.children].some((c) => {
      const d = getComputedStyle(c).display;
      return d !== 'none' && !['inline', 'inline-block', 'inline-flex', 'contents'].includes(d);
    });
    if (hasBlockChild) continue;
    /* 宽度守卫：容器窄到放不下两个字时，「每行一个字」是必然结果，报出来没有意义——
       这类多半是还没布局完、被折叠、或本来就 0 宽的元素（游戏页有不少由 JS later 撑开的面板）。
       把它们算成缺陷会让报告里混进一批改不动的条目，而清单里混进噪音就会训练人忽略它。
       阈值取 40px：正文最小字号约 .68rem≈11px，40px 放得下两个汉字还有余量。 */
    if (el.getBoundingClientRect().width < 40) continue;
    blocks.push(el);
  }

  for (const el of blocks) {
    const raw = el.textContent;
    if (!raw || raw.trim().length < 2) continue;

    const lines = linesOfElement(el);
    if (!lines || lines.length < 2) {
      /* 单行也要查一字一行的极端情况：整块只有一行、且只有一个字符时不算问题。 */
      continue;
    }

    const where = el.tagName.toLowerCase()
      + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '');
    const snippet = raw.trim().replace(/\\s+/g, ' ').slice(0, 46);
    const isHeading = /^h[1-6]$/.test(el.tagName.toLowerCase());

    /* ---- 1. 数量词组被拆开：某行以数字结尾，下一行以单位开头 ---- */
    for (let i = 0; i < lines.length - 1; i += 1) {
      const endsNum = /[0-9][0-9.,]*\\s*$/.test(lines[i]);
      if (!endsNum) continue;
      const next = lines[i + 1].replace(/^\\s+/, '');
      const unit = UNITS.find((u) => next.startsWith(u));
      if (!unit) continue;
      const tailNum = (lines[i].match(/[0-9][0-9.,]*\\s*$/) || [''])[0].trim();
      const key = 'S' + where + tailNum + unit;
      if (seen.has(key)) continue;
      seen.add(key);
      out.splitUnit.push({ where, snippet, pair: tailNum + ' ' + unit });
    }

    /* ---- 2. 末行孤字：只对标题与短句判，正文段落末行本来就可能很短 ---- */
    const last = lines[lines.length - 1].trim();
    const short = raw.trim().length <= 40;
    if ((isHeading || short) && last.length === 1 && isHan(last)) {
      const key = 'O' + where + snippet;
      if (!seen.has(key)) { seen.add(key); out.orphan.push({ where, snippet, last }); }
    }

    /* ---- 3. 一字一行：连续两行都只有一个汉字 ---- */
    let run = 0;
    for (const line of lines) {
      run = line.trim().length === 1 && isHan(line.trim()) ? run + 1 : 0;
      if (run >= 2) {
        const key = 'C' + where;
        if (!seen.has(key)) { seen.add(key); out.oneChar.push({ where, snippet, lines: lines.length }); }
        break;
      }
    }
  }
  return JSON.stringify(out);
})()`;

for (const rel of pages) {
  const url = `file://${join(ROOT, rel)}`;
  const perPage = { rel, split: 0, orphan: 0, oneChar: 0, samples: [] };
  for (const width of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride',
      { width, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
    await send('Page.navigate', { url }, sessionId);
    await sleep(650);
    const { result } = await send('Runtime.evaluate',
      { expression: PROBE, returnByValue: true }, sessionId);
    let r;
    try { r = JSON.parse(result.value); } catch { continue; }
    perPage.split += r.splitUnit.length;
    perPage.orphan += r.orphan.length;
    perPage.oneChar += r.oneChar.length;
    for (const s of r.splitUnit.slice(0, 3)) perPage.samples.push(`${width}px 拆开「${s.pair}」 @ ${s.where}`);
    for (const s of r.orphan.slice(0, 3)) perPage.samples.push(`${width}px 末行孤字「${s.last}」 @ ${s.where} —— ${s.snippet}`);
    for (const s of r.oneChar.slice(0, 2)) perPage.samples.push(`${width}px 一字一行（${s.lines} 行）@ ${s.where} —— ${s.snippet}`);
  }
  totalSplit += perPage.split;
  totalOrphan += perPage.orphan;
  totalOneChar += perPage.oneChar;
  const bad = perPage.split + perPage.orphan + perPage.oneChar;
  resultLines.push(`  ${bad ? '·' : '✓'} ${rel.padEnd(34)} 拆词 ${String(perPage.split).padStart(3)}`
    + `｜孤字 ${String(perPage.orphan).padStart(3)}｜一字一行 ${String(perPage.oneChar).padStart(2)}`);
  if (bad) detail.push(perPage);
}
} finally {
  try {
    if (ws) ws.close();
  } finally {
    await stopChrome(chrome);
  }
}

for (const line of resultLines) console.log(line);

console.log(`\n=== ${pages.length} 页 × ${WIDTHS.length} 视口：`
  + `数量词组被拆 ${totalSplit} 处｜末行孤字 ${totalOrphan} 处｜一字一行 ${totalOneChar} 处 ===`);
for (const p of detail.slice(0, 12)) {
  console.log(`\n  ${p.rel}`);
  for (const s of p.samples.slice(0, 6)) console.log(`      ${s}`);
}
if (detail.length > 12) console.log(`\n  …… 另有 ${detail.length - 12} 个页面有问题`);
