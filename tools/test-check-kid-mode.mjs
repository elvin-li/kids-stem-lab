#!/usr/bin/env node
/* check-kid-mode.mjs 的变异测试：证明它真的能抓住「孩子模式丢内容」这类回归。
 *
 *   node tools/test-check-kid-mode.mjs
 *
 * 做法：临时给任务区加上 data-audience="parent"——这是最现实的一种误改：
 * 有人为了让孩子界面清爽，顺手把整块任务收进家长层，屏幕上看起来更干净，
 * 而孩子从此看不到「我做完了没有」。审计必须变红并点名该页。
 * 跑完逐字节还原。
 *
 * 每条变异只审那一个页面（把页面路径传给审计脚本），所以整轮只要十几秒。
 * 注意：会临时改动源文件，跑完自动还原；请在工作区干净时运行。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = join(import.meta.dirname, '..');
const CHECKER = join(ROOT, 'tools/check-kid-mode.mjs');

/* find→replace 是注入缺陷的最小改动；expect 是输出里必须出现的关键词。 */
const MUTATIONS = [
  {
    what: 'fraction-lab：把正式任务区整块收进家长层，孩子看不到完成状态',
    page: 'games/fraction-lab.html',
    find: '<section class="task mission" aria-labelledby="fractionMissionTitle">',
    replace: '<section class="task mission" data-audience="parent" aria-labelledby="fractionMissionTitle">',
    expect: '看不到完成状态'
  },
  /* 换一种页面结构再验一次（自然专题页，任务区是 .mission.task）。
     注意不能拿 wave-maker 做这条：它孩子模式下有两处状态行，藏掉一处另一处还在，
     孩子仍然看得到进度——审计不报警是对的，不是漏报。 */
  {
    what: 'space：把行星护照任务区整块收进家长层，孩子看不到完成状态',
    page: 'nature/space.html',
    find: '<section class="mission task" aria-labelledby="spaceMissionTitle">',
    replace: '<section class="mission task" data-audience="parent" aria-labelledby="spaceMissionTitle">',
    expect: '看不到完成状态'
  }
];

function runChecker(page) {
  const r = spawnSync(process.execPath, [CHECKER, page], { cwd: ROOT, encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

let passed = 0;
let failed = 0;
const ok = (msg) => { passed += 1; console.log('  ✓ ' + msg); };
const bad = (msg) => { failed += 1; console.log('  ✗ ' + msg); };

/* ---- 0. 基线必须是绿的 ---- */
for (const page of [...new Set(MUTATIONS.map((m) => m.page))]) {
  const baseline = runChecker(page);
  if (baseline.code !== 0) {
    console.log(`✗ 基线不干净，终止：check-kid-mode.mjs 在未改动的 ${page} 上就已经是红的`);
    console.log(baseline.out.split('\n').slice(0, 16).map((l) => '    ' + l).join('\n'));
    process.exit(1);
  }
  console.log(`✓ 基线绿：${page}`);
}
console.log('');

/* ---- 1. 逐条注入 → 必须变红且点名 ---- */
for (const m of MUTATIONS) {
  const path = join(ROOT, m.page);
  const original = await readFile(path, 'utf8');

  const hits = original.split(m.find).length - 1;
  if (hits !== 1) {
    bad(`${m.what}\n      变异点在 ${m.page} 里出现 ${hits} 次（需要恰好 1 次），无法做精确变异`);
    continue;
  }

  await writeFile(path, original.replace(m.find, m.replace));
  let verdict;
  try {
    const r = runChecker(m.page);
    if (r.code === 0) verdict = { pass: false, why: '注入缺陷后审计仍然是绿的（漏报）' };
    else if (!r.out.includes(m.page)) verdict = { pass: false, why: `变红了，但没点名 ${m.page}` };
    else if (!r.out.includes(m.expect)) verdict = { pass: false, why: `点名了页面，但输出里没有「${m.expect}」` };
    else verdict = { pass: true };
  } finally {
    await writeFile(path, original);
    const restored = await readFile(path, 'utf8');
    if (restored !== original) {
      console.log(`  ‼ ${m.page} 还原失败，请用 git 检查该文件`);
      process.exit(2);
    }
  }
  if (verdict.pass) ok('注入即变红：' + m.what);
  else bad(`${m.what}\n      ${verdict.why}`);
}

/* ---- 2. 还原后必须重新变绿 ---- */
let allGreen = true;
for (const page of [...new Set(MUTATIONS.map((m) => m.page))]) {
  if (runChecker(page).code !== 0) allGreen = false;
}
if (allGreen) ok('全部还原后基线仍然是绿的');
else bad('全部还原后基线变红了，说明有文件没还原干净');

console.log(`\n${failed ? '✗' : '✓'} ${passed}/${passed + failed} 通过`);
if (!failed) console.log('  check-kid-mode.mjs 对「把任务区收进家长层」这类回归会报警，且能点名具体页面');
process.exit(failed ? 1 : 0);
