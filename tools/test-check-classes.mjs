/* check-classes.mjs 的变异测试：证明它真的能抓住已修的缺陷。
 *
 *   node tools/test-check-classes.mjs
 *
 * 做法：对每一处已修复的位置，临时把改动回滚（写回旧写法），
 * 单页跑一次 check-classes，要求它变红（exit 1）并点名那个 class，
 * 然后立刻还原文件并逐字节校验还原成功。
 *
 * 一个检查脚本如果没人验证过它会报警，等于没有。这个文件就是它的验证。
 * 注意：会临时改动源文件，跑完自动还原；请在工作区干净时运行。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHECKER = join(ROOT, 'tools/check-classes.mjs');

/* 每条 = 一处已修复的缺陷。find→replace 是「把修复回滚」的最小改动，
   expect 是回滚后 markup 里应该变成孤儿的 class 名。 */
const MUTATIONS = [
  {
    what: 'doodle-pad：CSS 选择器与 markup 脱节（.studio-know / studio-knowledge）',
    page: 'games/doodle-pad.html',
    find: '.studio-knowledge',
    replace: '.studio-know',
    expect: 'studio-knowledge'
  },
  {
    what: 'fraction-lab：CSS 选择器与 markup 脱节（.kid-challenge / kid-predict-card）',
    page: 'games/fraction-lab.html',
    find: '.kid-predict-card',
    replace: '.kid-challenge',
    expect: 'kid-predict-card'
  },
  {
    what: 'fraction-lab：.fl-slice-read 缺规则（网格列会被大号分数撑爆）',
    page: 'games/fraction-lab.html',
    find: '  .fl-slice-read { min-width:0; }\n',
    replace: '',
    expect: 'fl-slice-read'
  },
  {
    what: 'light-and-shadow：.stage-stack 缺规则（舞台与按钮排没有间距）',
    page: 'games/light-and-shadow.html',
    find: '  .stage-stack { display: grid; gap: 10px; min-width: 0; }\n',
    replace: '',
    expect: 'stage-stack'
  },
  {
    what: 'wave-maker：.wave-kid-shell 缺规则',
    page: 'games/wave-maker.html',
    find: '  .wave-kid-shell { display:block; margin:0; min-width:0; }\n',
    replace: '',
    expect: 'wave-kid-shell'
  },
  {
    what: 'weather：5 个折叠块用了本页没有规则的 .qa（没有 44px 触控目标）',
    page: 'nature/weather.html',
    find: 'class="fold parent-deep-dive"',
    replace: 'class="qa parent-deep-dive"',
    expect: 'qa'
  },
  {
    what: 'estimation-station：.layer-age 年龄徽章缺规则',
    page: 'games/estimation-station.html',
    find: '  .learning-layers .layer-age {',
    replace: '  .learning-layers .layer-age-REMOVED {',
    expect: 'layer-age'
  },
  {
    what: 'symmetry-studio：half-svg 是无规则的死 class',
    page: 'games/symmetry-studio.html',
    find: '<svg id="halfSvg" ',
    replace: '<svg id="halfSvg" class="half-svg" ',
    expect: 'half-svg'
  }
];

function runChecker(page) {
  const res = spawnSync(process.execPath, [CHECKER, page], { cwd: ROOT, encoding: 'utf8' });
  return { code: res.status, out: `${res.stdout || ''}${res.stderr || ''}` };
}

let pass = 0;
const failures = [];

/* 先确认基线：每个被测页面现在都必须是绿的，否则「变红」证明不了任何事。 */
const baselinePages = [...new Set(MUTATIONS.map((m) => m.page))];
for (const page of baselinePages) {
  const { code } = runChecker(page);
  if (code === 0) { pass++; console.log(`  ✓ 基线绿：${page}`); }
  else failures.push(`基线就是红的，无法用作对照：${page}（exit ${code}）`);
}

if (failures.length) {
  console.error('\n✗ 基线不干净，终止：');
  for (const f of failures) console.error(`    ${f}`);
  process.exit(1);
}

for (const m of MUTATIONS) {
  const abs = join(ROOT, m.page);
  const original = await readFile(abs, 'utf8');

  if (!original.includes(m.find)) {
    failures.push(`${m.what}\n      找不到要回滚的片段，测试本身已过期：${JSON.stringify(m.find)}`);
    continue;
  }

  try {
    await writeFile(abs, original.split(m.find).join(m.replace), 'utf8');
    const { code, out } = runChecker(m.page);
    const named = out.includes(`.${m.expect}（`);
    if (code === 1 && named) {
      pass++;
      console.log(`  ✓ 回滚即变红：${m.what}`);
    } else if (code === 1) {
      failures.push(`${m.what}\n      变红了但没点名 .${m.expect}，定位信息不可用`);
    } else {
      failures.push(`${m.what}\n      回滚后仍然是绿的（exit ${code}）—— 这个缺陷没有被守住`);
    }
  } finally {
    await writeFile(abs, original, 'utf8');
    const restored = await readFile(abs, 'utf8');
    if (restored !== original) failures.push(`${m.page} 还原失败，请手动检查 git diff`);
  }
}

console.log(`\n${failures.length ? '✗' : '✓'} ${pass}/${baselinePages.length + MUTATIONS.length} 通过`);
if (failures.length) {
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('  check-classes.mjs 对这 8 处缺陷都会报警，且能点名具体 class');
