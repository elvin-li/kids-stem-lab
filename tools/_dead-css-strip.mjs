/* 按 check-classes.mjs 的死代码清单删掉整行 CSS 规则，只删证明得了的那些。
 *
 * 用法:
 *   node tools/_dead-css-strip.mjs --dry <page.html> [更多页面...]   # 只报告，不改
 *   node tools/_dead-css-strip.mjs --write <page.html> [更多页面...] # 真删
 *
 * 为什么要有这个而不是手删：146 条规则散在四个大文件里，手删就是一百多次编辑，
 * 每次都有可能多删一个字符。但自动删更要小心，所以这里的判据故意收得很紧，
 * **一行只有同时满足下面全部条件才会被删**：
 *   1. 这一行在 <style> 块内（不碰 markup、不碰内联 JS）；
 *   2. 这一行里出现的每一个 class 选择器都在死名单里——只要混进一个活的就跳过。
 *      这一条挡住的是 `.week-list, .task-map { … }` 这种「死活写在同一条选择器里」
 *      的情况：那种必须人工只摘掉死的那一半（paths.html 就踩过）；
 *   3. 这一行的大括号自平衡（`{` 和 `}` 数量相等且以 `}` 收尾），
 *      也就是它是一条完整的单行规则。跨行规则、@media 的开头、
 *      只有选择器没有声明体的行，一律跳过；
 *   4. 这一行不含 `@`（不碰 @media / @keyframes / @supports 的开头）。
 * 判不准的一律留下来报出去，宁可少删。
 *
 * 死名单只取 check-classes 输出里「无人使用的局部 CSS」那一段——
 * 它上面还有一段格式一模一样的「纯 JS 钩子」，那些是活的（见 _dead-class-audit.mjs 的注释）。
 *
 * 删完必须跑：check-classes（会立刻报出误删——markup 用了却没规则）、
 * check-render（大括号平衡）、_orphan-check.mjs（证明这些 class 真的没有元素带着）、
 * 以及全部门禁。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const argv = process.argv.slice(2);
const write = argv.includes('--write');
const pages = argv.filter((a) => !a.startsWith('--'));
if (!pages.length || (!write && !argv.includes('--dry'))) {
  console.error('用法: node tools/_dead-css-strip.mjs --dry|--write <page.html> [...]');
  process.exit(2);
}

/* 死名单：只认「无人使用的局部 CSS」那一段 */
const res = spawnSync(process.execPath, [join(ROOT, 'tools/check-classes.mjs')], { cwd: ROOT, encoding: 'utf8' });
const dead = new Map();
let inDead = false;
for (const line of `${res.stdout || ''}`.split('\n')) {
  if (/^\s*·\s/.test(line)) inDead = /无人使用的局部 CSS/.test(line);
  if (!inDead) continue;
  const m = line.match(/^\s+([\w./-]+\.html) → \.([\w-]+)\s*$/);
  if (m) {
    if (!dead.has(m[1])) dead.set(m[1], new Set());
    dead.get(m[1]).add(m[2]);
  }
}

/* 标出每一行是否落在 <style> 块内 */
function styleLineFlags(text) {
  const lines = text.split('\n');
  const flags = new Array(lines.length).fill(false);
  let inStyle = false;
  lines.forEach((line, i) => {
    const lower = line.toLowerCase();
    const opens = (lower.match(/<style\b/g) || []).length;
    const closes = (lower.match(/<\/style\s*>/g) || []).length;
    if (inStyle) flags[i] = true;
    if (opens > closes) inStyle = true;
    else if (closes > opens) { flags[i] = true; inStyle = false; }
    else if (opens && closes) flags[i] = true;   /* 同一行开合 */
  });
  return flags;
}

let totalRemoved = 0, totalKept = 0;
for (const page of pages) {
  const names = dead.get(page);
  if (!names || !names.size) { console.log(`\n${page}：清单里没有死类，跳过`); continue; }
  const abs = join(ROOT, page);
  const text = await readFile(abs, 'utf8');
  const lines = text.split('\n');
  const inStyle = styleLineFlags(text);

  const removed = [];
  const kept = [];
  const out = [];
  lines.forEach((line, i) => {
    const classes = [...line.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1]);
    const touches = classes.some((c) => names.has(c));
    if (!touches) { out.push(line); return; }

    const why = [];
    if (!inStyle[i]) why.push('不在 <style> 块内');
    if (line.includes('@')) why.push('含 @ 规则');
    const live = classes.filter((c) => !names.has(c));
    if (live.length) why.push(`同一行还有活的 class: ${live.map((c) => '.' + c).join(' ')}`);
    const open = (line.match(/\{/g) || []).length;
    const close = (line.match(/\}/g) || []).length;
    if (!(open > 0 && open === close && line.trimEnd().endsWith('}'))) why.push('不是自平衡的单行规则');

    if (why.length) { kept.push({ n: i + 1, line: line.trim().slice(0, 100), why }); out.push(line); }
    else removed.push({ n: i + 1, line: line.trim().slice(0, 100) });
  });

  console.log(`\n########## ${page} ##########`);
  console.log(`  可安全整行删除 ${removed.length} 行，需人工处理 ${kept.length} 行`);
  for (const k of kept) console.log(`  留下  行 ${k.n}：${k.why.join('；')}\n        ${k.line}`);
  totalRemoved += removed.length;
  totalKept += kept.length;

  if (write && removed.length) {
    const drop = new Set(removed.map((r) => r.n - 1));
    await writeFile(abs, lines.filter((_, i) => !drop.has(i)).join('\n'), 'utf8');
    console.log(`  已写入：删掉 ${removed.length} 行`);
  }
}
console.log(`\n=== 合计：可整行删除 ${totalRemoved} 行，需人工处理 ${totalKept} 行 ===`);
if (!write) console.log('（这是 --dry，什么都没改。确认无误后用 --write）');
else console.log('现在去跑 check-classes / check-render / _orphan-check.mjs 与全部门禁');
