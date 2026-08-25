#!/usr/bin/env node
/* check-content.mjs 的变异测试：证明它真的能抓住已修的缺陷。
 *
 *   node tools/test-check-content.mjs
 *
 * 做法：对每一处已修复的位置，临时把改动回滚（写回旧写法），跑一次 check-content，
 * 要求它变红（exit 1）并在输出里点名那个页面和那条断言，然后立刻还原文件
 * 并逐字节校验还原成功。
 *
 * 一个检查脚本如果没人验证过它会报警，等于没有。这个文件就是它的验证。
 * 前两条变异是真实漏过的缺陷（wave-maker 缺「这在教什么」、pattern-machine 的
 * 动效偏好快照），后三条是同类断言的等价回归。
 *
 * 注意：会临时改动源文件，跑完自动还原；请在工作区干净时运行。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = join(import.meta.dirname, '..');
const CHECKER = join(ROOT, 'tools/check-content.mjs');

/* 每条 = 一处缺陷。find→replace 是「把修复回滚」的最小改动；
   page 是应被点名的文件，expect 是输出里必须出现的关键词。 */
const MUTATIONS = [
  {
    what: 'wave-maker：缺一句「这在教什么」（真实漏过：原先只写成家长折叠块里的「学习目标」）',
    page: 'games/wave-maker.html',
    /* 后来各页在家长备注里也写了「这在教什么：」。只改 h2 时，check-content 的
       全文探针仍会命中备注，测例会假绿。把页内所有出现一起换掉，才是「整句消失」。 */
    mutate: (html) => html.replaceAll('这在教什么', '学习目标'),
    expect: '这在教什么'
  },
  {
    what: 'pattern-machine：动效偏好只读系统媒体查询（真实漏过：站内「减少动效」对该页无效）',
    page: 'games/pattern-machine.html',
    find: `  function reduceMotion() {
    if (window.Playful && typeof Playful.motionReduced === 'function') {
      try { return Playful.motionReduced(); } catch (e) { /* 共享层异常时退回媒体查询 */ }
    }
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }`,
    replace: `  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { reduceMotion = false; }`,
    expect: 'prefers-reduced-motion'
  },
  {
    what: 'doodle-pad：画布不按 devicePixelRatio 缩放（视网膜屏上整块画面发虚）',
    page: 'games/doodle-pad.html',
    find: 'devicePixelRatio',
    replace: '1',
    expect: 'devicePixelRatio'
  },
  {
    what: 'symmetry-studio：缺「背后的原理」段',
    page: 'games/symmetry-studio.html',
    find: '背后的原理',
    replace: '原理小记',
    expect: '背后的原理'
  },
  {
    what: 'doodle-pad：给家长的问题少于 3 条',
    page: 'games/doodle-pad.html',
    find: '<li>“镜像打开后，哪里让你吃惊？”</li>',
    replace: '',
    expect: '只有 2 条'
  }
];

function runChecker() {
  const r = spawnSync(process.execPath, [CHECKER], { cwd: ROOT, encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

let passed = 0;
let failed = 0;
const ok = (msg) => { passed += 1; console.log('  ✓ ' + msg); };
const bad = (msg) => { failed += 1; console.log('  ✗ ' + msg); };

/* ---- 0. 基线必须是绿的，否则没法用作对照 ---- */
const baseline = runChecker();
if (baseline.code !== 0) {
  console.log('✗ 基线不干净，终止：check-content.mjs 在未改动的工作区上就已经是红的');
  console.log(baseline.out.split('\n').slice(0, 20).map((l) => '    ' + l).join('\n'));
  process.exit(1);
}
console.log('✓ 基线绿：check-content.mjs 在当前工作区通过\n');

/* ---- 1. 逐条回滚 → 必须变红且点名 ---- */
for (const m of MUTATIONS) {
  const path = join(ROOT, m.page);
  const original = await readFile(path, 'utf8');

  let next;
  if (typeof m.mutate === 'function') {
    next = m.mutate(original);
    if (next === original) {
      bad(`${m.what}\n      mutate 没有改动 ${m.page}，无法做精确变异`);
      continue;
    }
  } else {
    const hits = original.split(m.find).length - 1;
    if (hits !== 1) {
      bad(`${m.what}\n      变异点在 ${m.page} 里出现 ${hits} 次（需要恰好 1 次），无法做精确变异`);
      continue;
    }
    next = original.replace(m.find, m.replace);
  }

  await writeFile(path, next);
  let verdict;
  try {
    const r = runChecker();
    const named = r.out.includes(m.page);
    const said = r.out.includes(m.expect);
    if (r.code === 0) verdict = { pass: false, why: '回滚后 check-content 仍然是绿的（漏报）' };
    else if (!named) verdict = { pass: false, why: `变红了，但没点名 ${m.page}` };
    else if (!said) verdict = { pass: false, why: `点名了页面，但输出里没有「${m.expect}」` };
    else verdict = { pass: true };
  } finally {
    /* 无论判定结果如何都要还原，并逐字节确认。 */
    await writeFile(path, original);
    const restored = await readFile(path, 'utf8');
    if (restored !== original) {
      console.log(`  ‼ ${m.page} 还原失败，请用 git 检查该文件`);
      process.exit(2);
    }
  }
  if (verdict.pass) ok('回滚即变红：' + m.what);
  else bad(`${m.what}\n      ${verdict.why}`);
}

/* ---- 2. 还原后基线必须还是绿的 ---- */
const after = runChecker();
if (after.code === 0) ok('全部还原后基线仍然是绿的');
else bad('全部还原后基线变红了，说明有文件没还原干净');

console.log(`\n${failed ? '✗' : '✓'} ${passed}/${passed + failed} 通过`);
if (!failed) console.log('  check-content.mjs 对这 ' + MUTATIONS.length + ' 类缺陷都会报警，且能点名具体页面');
process.exit(failed ? 1 : 0);
