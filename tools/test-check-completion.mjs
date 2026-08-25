#!/usr/bin/env node
/* check-completion.mjs 的变异测试：证明它真的能抓住「打开就算做过」。
 *
 *   node tools/test-check-completion.mjs
 *
 * 两条变异各验一半：
 *   1. 注入一次载入即 Progress.complete() —— 这就是要防的那个错误。
 *      它不报异常、不改页面外观，只会让家长在足迹里看到一堆假的对勾。
 *   2. 拿掉 Progress.visit() —— 验的是审计的**自检**那一半。
 *      「完成为空」只有在「访问已记录」同时成立时才有意义，否则可能只是
 *      Progress 压根没跑起来。这条必须也会红，否则第 1 条的结论就不牢靠。
 *
 * 跑完逐字节还原。每条只审一个页面，整轮十几秒。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = join(import.meta.dirname, '..');
const CHECKER = join(ROOT, 'tools/check-completion.mjs');
const PAGE = 'games/fraction-lab.html';

const MUTATIONS = [
  /* 注入点必须排在 progress.js 之后。页面自己那段主脚本在 <head> 里就跑了，
     那时 window.Progress 还不存在（共享层在 body 末尾才加载），往那里注入
     只会抛 ReferenceError、把后半段脚本打断，并不会写下完成记录——
     第一版就是这么写的，变异没生效，看着像审计漏报。 */
  {
    what: '注入「载入即完成」：光打开页面就写下完成记录',
    find: '<script>if (window.Progress) Progress.visit("games/fraction-lab.html", "分数实验台");</script>',
    replace: '<script>if (window.Progress) Progress.visit("games/fraction-lab.html", "分数实验台");</script>\n'
      + '<script>if (window.Progress) Progress.complete("games/fraction-lab.html", "变异测试注入的自动完成");</script>',
    expect: '光打开页面就产生了完成记录'
  },
  {
    what: '拿掉 Progress.visit()：审计的自检必须发现「访问没记录」',
    find: '<script>if (window.Progress) Progress.visit("games/fraction-lab.html", "分数实验台");</script>',
    replace: '<script>/* 变异测试：临时移除 visit() */</script>',
    expect: '访问没有被记录'
  }
];

function runChecker() {
  const r = spawnSync(process.execPath, [CHECKER, PAGE], { cwd: ROOT, encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

let passed = 0;
let failed = 0;
const ok = (msg) => { passed += 1; console.log('  ✓ ' + msg); };
const bad = (msg) => { failed += 1; console.log('  ✗ ' + msg); };

const baseline = runChecker();
if (baseline.code !== 0) {
  console.log(`✗ 基线不干净，终止：check-completion.mjs 在未改动的 ${PAGE} 上就已经是红的`);
  console.log(baseline.out.split('\n').slice(0, 16).map((l) => '    ' + l).join('\n'));
  process.exit(1);
}
console.log(`✓ 基线绿：${PAGE}（访问已记录、完成为空）\n`);

const path = join(ROOT, PAGE);
for (const m of MUTATIONS) {
  const original = await readFile(path, 'utf8');
  const hits = original.split(m.find).length - 1;
  if (hits !== 1) {
    bad(`${m.what}\n      变异点出现 ${hits} 次（需要恰好 1 次），无法做精确变异`);
    continue;
  }
  await writeFile(path, original.replace(m.find, m.replace));
  let verdict;
  try {
    const r = runChecker();
    if (r.code === 0) verdict = { pass: false, why: '注入缺陷后审计仍然是绿的（漏报）' };
    else if (!r.out.includes(PAGE)) verdict = { pass: false, why: `变红了，但没点名 ${PAGE}` };
    else if (!r.out.includes(m.expect)) verdict = { pass: false, why: `点名了页面，但输出里没有「${m.expect}」` };
    else verdict = { pass: true };
  } finally {
    await writeFile(path, original);
    const restored = await readFile(path, 'utf8');
    if (restored !== original) {
      console.log(`  ‼ ${PAGE} 还原失败，请用 git 检查该文件`);
      process.exit(2);
    }
  }
  if (verdict.pass) ok('注入即变红：' + m.what);
  else bad(`${m.what}\n      ${verdict.why}`);
}

if (runChecker().code === 0) ok('全部还原后基线仍然是绿的');
else bad('全部还原后基线变红了，说明文件没还原干净');

console.log(`\n${failed ? '✗' : '✓'} ${passed}/${passed + failed} 通过`);
if (!failed) console.log('  check-completion.mjs 既能抓住「打开就算做过」，它的自检也确实在工作');
process.exit(failed ? 1 : 0);
