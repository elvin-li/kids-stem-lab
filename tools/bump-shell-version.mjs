/* 提升离线壳版本：无依赖，纯文本改写。
 *
 * 用法：
 *   node tools/bump-shell-version.mjs           # 读当前版本，+1
 *   node tools/bump-shell-version.mjs 26        # 指定目标版本
 *   node tools/bump-shell-version.mjs --check   # 只核对一致性，不改动
 *
 * 为什么需要它：改动任何共享层文件（base.css / kid.css / med.css / print.css /
 * progress.js / playful.js / pwa.js / data/*.js / app-icon.svg）之后，必须同时做
 * 两件事——提升 `sw.js` 的 `CACHE` 常量，以及把**全部 HTML 与 manifest** 里的
 * `?v=` 查询串跟上。漏做的后果是静默的：装过 Service Worker 的设备会继续从缓存
 * 里拿旧样式，而开发机上（无 SW 或强制刷新）一切正常，改动"看起来生效了"。
 *
 * 手工做这件事要改两百多个文件，漏一个 `check-contract.mjs` 才会红——
 * 那说明这本来就该是一条命令。`--check` 模式适合在提交前跑一次。
 *
 * --check 查三件事，缺一不可（语义评审 2026-08-11 第 6 条补上了后两件）：
 *   1. 已有的 ?v= 锚都等于 sw.js 的 CACHE 版本；
 *   2. 每个文件至少有一个锚（防止整页锚被误删）；
 *   3. **该有锚而没有**：VERSIONABLE 清单里的资源被引用时必须带 ?v=。
 *      此前只查前两件，print.css、data/*.js、app-icon.svg 的引用一直无人兜底——
 *      它们都在 sw.js CORE 里、都落在部署配置的 /assets/ 或 /data/ 30 天缓存下。
 * 非 --check 模式会先给缺锚的引用补上 ?v=<目标版本>，再统一改写所有已有锚。
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const explicit = args.find((a) => /^\d+$/.test(a));

/* 应带版本锚的共享资源。判据和 check-contract.mjs 的 mandatory/optional 清单同源：
   进了 sw.js CORE、又被 30 天 HTTP 缓存覆盖的文件，引用时都必须带锚。 */
const VERSIONABLE = [
  'assets/css/base.css', 'assets/css/kid.css', 'assets/css/med.css', 'assets/css/print.css',
  'assets/css/nature-species.css', 'assets/css/games-lab.css',
  'assets/js/progress.js', 'assets/js/playful.js', 'assets/js/pwa.js',
  'data/explorations.js', 'data/playful.js', 'data/resources.js', 'data/photo-hub.js',
  'assets/icons/app-icon.svg'
];
const escapeRe = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const swPath = join(ROOT, 'sw.js');
const sw = await readFile(swPath, 'utf8');
const m = sw.match(/const CACHE = "kids-stem-shell-v(\d+)";/);
if (!m) {
  console.log('✗ sw.js 里找不到 `const CACHE = "kids-stem-shell-vN";`，无法确定当前版本');
  process.exit(1);
}
const current = Number(m[1]);

/* manifest.webmanifest 也参与：它的 icons[].src 指向 30 天缓存下的 app-icon.svg。 */
const files = ['index.html', 'manifest.webmanifest'];
for (const d of ['pages', 'games', 'nature']) {
  for (const n of (await readdir(join(ROOT, d))).sort()) {
    if (n.endsWith('.html') && !n.startsWith('_')) files.push(`${d}/${n}`);
  }
}

/* 「被引用但没带锚」：资源路径后面直接跟引号（属性值或 JS 字符串的收尾），
   而不是 ?v=。正文里提到文件名的散文（后面跟空格或中文）不算引用。 */
function missingAnchors(text) {
  const misses = [];
  for (const resource of VERSIONABLE) {
    const bare = new RegExp(`${escapeRe(resource)}(["'])`, 'g');
    const count = [...text.matchAll(bare)].length;
    if (count) misses.push(`${resource} × ${count}`);
  }
  return misses;
}

/* ---- 一致性核对 ---- */
const mismatched = [];
for (const rel of files) {
  const text = await readFile(join(ROOT, rel), 'utf8');
  const versions = new Set([...text.matchAll(/\?v=(\d+)/g)].map((x) => x[1]));
  if (!versions.size) { mismatched.push(`${rel}: 没有任何 ?v= 版本锚`); continue; }
  for (const v of versions) {
    if (Number(v) !== current) mismatched.push(`${rel}: 有 ?v=${v}，而壳版本是 v${current}`);
  }
  for (const miss of missingAnchors(text)) mismatched.push(`${rel}: 引用了 ${miss} 却没带 ?v= 锚`);
}

if (checkOnly) {
  console.log(`离线壳版本一致性：sw.js CACHE = kids-stem-shell-v${current}，核对 ${files.length} 个文件`);
  if (!mismatched.length) {
    console.log('✓ 全部 ?v= 都与壳版本一致，且共享资源的引用都带锚');
    process.exit(0);
  }
  console.log(`\n✗ ${mismatched.length} 处不一致：`);
  for (const x of mismatched.slice(0, 20)) console.log(`  ${x}`);
  if (mismatched.length > 20) console.log(`  …… 另有 ${mismatched.length - 20} 处`);
  console.log('\n跑 node tools/bump-shell-version.mjs <目标版本> 统一（会顺带补上缺失的锚）。');
  process.exit(1);
}

const next = explicit ? Number(explicit) : current + 1;
if (next === current) {
  console.log(`目标版本与当前一致（v${current}），只做对齐。`);
}

let touched = 0;
let anchors = 0;
let added = 0;
for (const rel of files) {
  const path = join(ROOT, rel);
  const text = await readFile(path, 'utf8');
  let out = text;
  /* 先补缺失的锚，再统一改写已有的。 */
  for (const resource of VERSIONABLE) {
    out = out.replace(new RegExp(`${escapeRe(resource)}(["'])`, 'g'), (whole, quote) => {
      added += 1;
      return `${resource}?v=${next}${quote}`;
    });
  }
  let hits = 0;
  out = out.replace(/\?v=\d+/g, () => { hits += 1; return `?v=${next}`; });
  if (out !== text) {
    await writeFile(path, out, 'utf8');
    touched += 1;
    anchors += hits;
  }
}

const swOut = sw.replace(
  /const CACHE = "kids-stem-shell-v\d+";/,
  `const CACHE = "kids-stem-shell-v${next}";`
);
if (swOut !== sw) await writeFile(swPath, swOut, 'utf8');

console.log(`离线壳版本 v${current} → v${next}`);
console.log(`  sw.js 的 CACHE 已更新`);
console.log(`  ${touched} 个文件共 ${anchors} 处 ?v= 已同步${added ? `，另补上 ${added} 处缺失的锚` : ''}`);
console.log('\n改完共享层后请依次跑：');
console.log('  node tools/check-contract.mjs      # 版本锚一致性');
console.log('  node tools/check-offline.mjs       # 新版本能装上、CORE 全进缓存');
