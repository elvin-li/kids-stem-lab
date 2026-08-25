#!/usr/bin/env node
/* check-offline.mjs 的变异测试：证明它真的能抓住「离线能力整体失效」。
 *
 *   node tools/test-check-offline.mjs
 *
 * 注入的缺陷是契约里点名警告过的那一种：往 sw.js 的 CORE 里加一条不存在的文件。
 * install 阶段是 Promise.all 逐条 cache.add，任何一条 404 会让**整个**安装失败、
 * 缓存一条都不剩。这个故障在有网时完全看不出区别——直到孩子在车上打开它，
 * 一片空白。所以必须有人验证审计会报警。
 *
 * 跑完逐字节还原。单轮要起 Chrome 并等 Service Worker 装好，约一分钟。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = join(import.meta.dirname, '..');
const CHECKER = join(ROOT, 'tools/check-offline.mjs');
const SW = join(ROOT, 'sw.js');

function runChecker() {
  const r = spawnSync(process.execPath, [CHECKER], { cwd: ROOT, encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

let passed = 0;
let failed = 0;
const ok = (msg) => { passed += 1; console.log('  ✓ ' + msg); };
const bad = (msg) => { failed += 1; console.log('  ✗ ' + msg); };

/* ---- 0. 基线必须是绿的 ---- */
const baseline = runChecker();
if (baseline.code !== 0) {
  console.log('✗ 基线不干净，终止：check-offline.mjs 在未改动的工作区上就已经是红的');
  console.log(baseline.out.split('\n').slice(0, 18).map((l) => '    ' + l).join('\n'));
  process.exit(1);
}
console.log('✓ 基线绿：Service Worker 装得上、断网可用\n');

/* ---- 1. 往 CORE 里塞一条 404，install 应整体失败 ---- */
const original = await readFile(SW, 'utf8');
const anchor = '"./", "./index.html", "./manifest.webmanifest",';
if (original.split(anchor).length - 1 !== 1) {
  bad(`sw.js 里找不到唯一的 CORE 起始锚点，无法做精确变异`);
} else {
  const mutated = original.replace(anchor, anchor + '\n  "./assets/css/this-file-does-not-exist.css",');
  await writeFile(SW, mutated);
  let verdict;
  try {
    const r = runChecker();
    if (r.code === 0) verdict = { pass: false, why: '塞进 404 条目后审计仍然是绿的（漏报）' };
    else if (!/没进缓存|断网后|离线问题/.test(r.out)) {
      verdict = { pass: false, why: `变红了，但没说清是缓存/离线出了问题：${r.out.split('\n').filter((l) => l.includes('✗')).slice(0, 2).join(' | ')}` };
    } else verdict = { pass: true, detail: r.out.split('\n').filter((l) => l.includes('✗')).length + ' 条报错' };
  } finally {
    await writeFile(SW, original);
    const restored = await readFile(SW, 'utf8');
    if (restored !== original) {
      console.log('  ‼ sw.js 还原失败，请用 git 检查该文件');
      process.exit(2);
    }
  }
  if (verdict.pass) ok('CORE 里塞一条 404 → 审计变红（' + verdict.detail + '）');
  else bad('CORE 里塞一条 404：' + verdict.why);
}

/* ---- 2. 还原后必须重新变绿 ---- */
if (runChecker().code === 0) ok('还原后基线仍然是绿的');
else bad('还原后基线变红了，说明 sw.js 没还原干净');

console.log(`\n${failed ? '✗' : '✓'} ${passed}/${passed + failed} 通过`);
if (!failed) console.log('  check-offline.mjs 能抓住「CORE 有一条取不到 → 离线能力全失」这类静默故障');
process.exit(failed ? 1 : 0);
