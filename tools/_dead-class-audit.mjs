/* 死代码候选的逐个复核：check-classes.mjs 报出「有 CSS 规则但没人用」之后，
 * 照着清单删之前先过这一道。
 *
 * 为什么不能直接照清单删：那份清单是文本扫描的结果，会漏掉两类还活着的用法——
 *   1. 带前导空格的拼接  el.className = "rmark" + (m.hi ? " hi" : "")
 *      （这一类已在 check-classes.mjs 修掉，并有 test-check-classes.mjs 守着）
 *   2. 前缀 + 变量拼接    el.className = "d-" + r.subject
 *      这一类文本扫描原理上就看不见，只能靠人看。
 * 删错的后果是静默的：少一条 fill 或 color 未必跨过任何对比度阈值，门禁照样全绿，
 * 坏掉的只有孩子看到的那张图。
 *
 * 用法: node tools/_dead-class-audit.mjs <page.html> [更多页面...]
 *
 * 输出把候选分三档：
 *   安全   —— 全仓库只在这一页的 CSS 选择器里出现过，别处零踪迹
 *   要人看 —— 别处还有踪迹（JS 字符串、其他页面、或疑似前缀拼接）
 *   状态类 —— 名字形如 -on / -lit / -win / -locked / is-* / has-*，
 *             通常由 JS 在交互时施加，整页截图证明不了它，必须人工确认
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const pages = process.argv.slice(2);
if (!pages.length) {
  console.error('用法: node tools/_dead-class-audit.mjs <page.html> [更多页面...]');
  process.exit(2);
}

/* 从 check-classes.mjs 的全站输出里取死代码清单。
   必须**认小节**：它的输出里有两段格式一模一样的 `页面 → .class` 列表——
   「纯 JS 钩子（无样式规则，属正常写法）」和「无人使用的局部 CSS（死代码）」。
   第一版只按行格式匹配，把钩子那一段也吞了进来，于是 .space-check（space.html 里
   真实存在的复选框，JS 用 querySelectorAll(".space-check:checked") 数它）
   被当成了待删候选。钩子本来就没有 CSS 规则、删无可删，但清单里混进活的类名
   会误导人，也会虚报数量。所以只收「无人使用」那一段。 */
const res = spawnSync(process.execPath, [join(ROOT, 'tools/check-classes.mjs')], { cwd: ROOT, encoding: 'utf8' });
const listed = new Map();
let inDeadSection = false;
for (const line of `${res.stdout || ''}`.split('\n')) {
  if (/^\s*·\s/.test(line)) inDeadSection = /无人使用的局部 CSS/.test(line);
  if (!inDeadSection) continue;
  const m = line.match(/^\s+([\w./-]+\.html) → \.([\w-]+)\s*$/);
  if (m) {
    if (!listed.has(m[1])) listed.set(m[1], []);
    listed.get(m[1]).push(m[2]);
  }
}

/* 收集全仓库要扫的文本文件 */
async function walk(dir, out = []) {
  for (const name of await readdir(dir, { withFileTypes: true })) {
    if (name.name === '.git' || name.name === 'node_modules' || name.name === '.pixel-proof') continue;
    const p = join(dir, name.name);
    if (name.isDirectory()) await walk(p, out);
    else if (/\.(html|js|mjs|css|json|md)$/.test(name.name)) out.push(p);
  }
  return out;
}
const files = await walk(ROOT);
const texts = new Map();
for (const abs of files) texts.set(relative(ROOT, abs), await readFile(abs, 'utf8'));

const STATE = /(^is-|^has-|-on$|-off$|-lit$|-win$|-lost$|-locked$|-open$|-active$|-done$|-hi$|^hi$)/;

let nSafe = 0, nReview = 0, nState = 0;
for (const page of pages) {
  const rel = page.replace(/^\.\//, '');
  const names = listed.get(rel) || [];
  console.log(`\n########## ${rel}（清单里 ${names.length} 条）##########`);
  if (!names.length) { console.log('  （这一页当前没有死代码候选）'); continue; }
  const pageText = texts.get(rel) || '';
  for (const name of names) {
    const notes = [];
    /* 1. 状态类命名 */
    if (STATE.test(name)) notes.push('命名像交互状态类，整页截图证明不了');
    /* 2. 前缀拼接嫌疑。这是最危险的一类，也最容易漏判——
       真实写法是 dot.className = "subj-dot d-" + r.subject（index.html:1371），
       前缀 "d-" 并不独占整个字符串，而是贴在字符串的**末尾**。
       所以不能只找 "d-" + ，必须找「前缀紧贴收尾引号、后面跟 +」，
       也就是 d-" + 这种形状；反向的 + "d- 也要找（前缀在被追加的那一段开头）。
       第一版只写了前者，把 .d-math/.d-science/.d-coding/.d-kits/.d-video 全判成了安全——
       照着删会让 46 张资源卡的学科色圆点集体失色，而所有门禁照样绿。
       逐段截短前缀（d-math → d- → 空）是为了 .oc-cr-whale 这种多段命名，
       它可能由 "oc-cr-" + kind 拼出来。 */
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (let cut = name.lastIndexOf('-'); cut > 0; cut = name.lastIndexOf('-', cut - 1)) {
      const prefix = name.slice(0, cut + 1);
      const concat = new RegExp(`${esc(prefix)}["'\`]\\s*\\+|\\+\\s*["'\`]${esc(prefix)}`);
      if (concat.test(pageText)) { notes.push(`疑似前缀拼接 "…${prefix}" + 变量`); break; }
    }
    /* 3. 全仓库踪迹：排除「本页 CSS 选择器」这一种出现 */
    const traces = [];
    for (const [f, text] of texts) {
      const hits = [...text.matchAll(new RegExp(`[\\w-]*\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\\\$&')}\\b[\\w-]*`, 'g'))]
        .filter((h) => h[0] === name);
      if (!hits.length) continue;
      if (f === rel) {
        /* 本页里除了 .name 选择器之外还有别的出现吗 */
        const asSelector = (text.match(new RegExp(`\\.${name}\\b`, 'g')) || []).length;
        if (hits.length > asSelector) traces.push(`${f}(非选择器出现 ${hits.length - asSelector} 次)`);
      } else traces.push(f);
    }
    if (traces.length) notes.push(`别处有踪迹: ${traces.slice(0, 4).join('、')}`);

    if (!notes.length) { nSafe++; console.log(`  安全    .${name}`); }
    else if (STATE.test(name)) { nState++; console.log(`  状态类  .${name} —— ${notes.join('；')}`); }
    else { nReview++; console.log(`  要人看  .${name} —— ${notes.join('；')}`); }
  }
}
console.log(`\n=== 安全 ${nSafe} 条、要人看 ${nReview} 条、状态类 ${nState} 条 ===`);
console.log('只有「安全」那一档可以直接删，删完仍要跑 _pixel-proof.mjs 与全部门禁。');
