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

/* ---- 假阳性回归：动态施加的 class 不许被当成死代码 ----
   上面 8 条验的都是「页面有缺陷 → 工具变红」。这一条验反方向：
   工具会不会把还在用的 class 误报成死代码。

   起因是一个真实的漏检。追加 class 最惯用的写法是留一个前导空格：
       row.className = "wbar" + (isMe ? " me" : "");
   而 jsClasses() 里判断「这个字符串像不像一串裸 class」的正则原本写成
   /^[\w][\w\s-]*$/，要求以字符开头，于是 " me" 直接不匹配，me 永远进不了
   「已使用」集合。后果是 .me 出现在那份 239 条的死代码清单里——照着清单删，
   就会把 space.html 里标出当前行星的 .wbar.me 样式删掉，而所有门禁照样绿
   （少一条 color 未必跨过任何对比度阈值）。
   死代码清单是给人照着删的，清单不可信比没有清单更危险，所以这条要守住。

   锚点换过一次：原来用的是 ocean.html 的 `el.className = "rmark" + (m.hi ? " hi" : "")`，
   后来那处深度标记改成了静态 markup，拼接不存在了，这条测试就报「已过期」。
   现在挂在 space.html 体重计的同形写法上——它是全站唯一一处这个形状。
   如果哪天这行也改成静态 markup，这条测试会再次报过期：那时要么找到新的同形写法，
   要么就得承认「站里已经没有这种写法」并重新设计这条断言，不要直接删掉它。

   判定方式：全站模式跑（单页模式不输出死代码清单），
   先要求 .hi 不在清单里；再把那段拼接去掉、要求它出现在清单里。
   第二步是必要的——只验第一步的话，哪天清单整个不输出了也会「通过」。 */
function deadList() {
  const res = spawnSync(process.execPath, [CHECKER], { cwd: ROOT, encoding: 'utf8' });
  return `${res.stdout || ''}${res.stderr || ''}`;
}
const FP = {
  page: 'nature/space.html',
  find: 'row.className = "wbar" + (isMe ? " me" : "");',
  replace: 'row.className = "wbar";',
  klass: 'me'
};
const fpAbs = join(ROOT, FP.page);
const fpOriginal = await readFile(fpAbs, 'utf8');
const entry = `${FP.page} → .${FP.klass}`;
if (!fpOriginal.includes(FP.find)) {
  failures.push(`假阳性回归：找不到那段拼接，测试已过期：${JSON.stringify(FP.find)}`);
} else if (deadList().includes(entry)) {
  failures.push(`假阳性回归：.${FP.klass} 明明由 " ${FP.klass}" 拼接施加，却被列进了死代码清单`);
} else {
  pass++;
  console.log(`  ✓ 不误报：" ${FP.klass}" 这种带前导空格的拼接被识别为「已使用」`);
  try {
    await writeFile(fpAbs, fpOriginal.split(FP.find).join(FP.replace), 'utf8');
    if (deadList().includes(entry)) {
      pass++;
      console.log(`  ✓ 去掉那段拼接后 .${FP.klass} 确实进入死代码清单（说明上一条不是碰巧通过）`);
    } else {
      failures.push(`假阳性回归：去掉拼接后 .${FP.klass} 仍不在清单里，这条断言证明不了任何事`);
    }
  } finally {
    await writeFile(fpAbs, fpOriginal, 'utf8');
    const restored = await readFile(fpAbs, 'utf8');
    if (restored !== fpOriginal) failures.push(`${FP.page} 还原失败，请手动检查 git diff`);
  }
}

/* ---- 假阳性回归之二：内联脚本里的转义序列不许让扫描器整行失明 ----
   比上一条严重得多。jsClasses() 提取字符串的正则原本是
       /(["'])((?:(?!\1)[^\\\n])*)\1/g
   字符串体把反斜杠排除在外，于是 "\n" 这种带转义的字符串整个匹配不上；
   匹配失败后引擎前移一格重试，会把 "\n" 的收尾引号当成下一个字符串的开引号，
   从此「字符串」和「代码」的角色整行错位。本站内联脚本都压缩成单行长句，
   所以行内早一点出现一个 "\n"，后面所有字符串里的类名就全部失明。

   真踩到的一例：pages/why.html 里 lines.join("\n") 排在
   document.body.classList.add("print-eval") 之前，于是 .print-eval 被列进死代码清单。
   照着清单删掉它，「只打印评估表」这个功能就没了，而且所有门禁照样绿——
   那条规则只在 @media print 里生效，屏幕上的审计根本看不见它。

   这条用「把转义去掉」来回滚：把 join("\n") 换成 join(" ")，
   错位的触发条件就消失，.print-eval 应当重新被认出来（清单里不该有它）；
   反过来说，只要它在当前代码下也不在清单里，就说明修复生效。
   两个方向合起来才能证明是这个转义在起作用，而不是碰巧。 */
const ESC = {
  page: 'pages/why.html',
  klass: 'print-eval',
  find: 'lines.join("\\n")',
  replace: 'lines.join(" ")'
};
const escAbs = join(ROOT, ESC.page);
const escOriginal = await readFile(escAbs, 'utf8');
const escEntry = `${ESC.page} → .${ESC.klass}`;
if (!escOriginal.includes(ESC.find)) {
  failures.push(`转义错位回归：找不到 ${JSON.stringify(ESC.find)}，测试已过期`);
} else if (deadList().includes(escEntry)) {
  failures.push(`转义错位回归：.${ESC.klass} 由 classList.add("${ESC.klass}") 施加（@media print 生效），`
    + '却被列进了死代码清单 —— 说明内联脚本的字符串扫描仍在因转义序列错位');
} else {
  pass++;
  console.log(`  ✓ 不误报：同一行有 "\\n" 转义时，后面的 classList.add("${ESC.klass}") 仍被认出`);
  try {
    /* 去掉转义，错位条件消失；此时它同样必须不在清单里。
       这一步是对照：证明上一条通过不是因为清单整个没输出。 */
    await writeFile(escAbs, escOriginal.split(ESC.find).join(ESC.replace), 'utf8');
    if (deadList().includes(escEntry)) {
      failures.push(`转义错位回归：去掉 "\\n" 之后 .${ESC.klass} 反而进了清单，判定逻辑有问题`);
    } else {
      pass++;
      console.log('  ✓ 去掉那个转义后结论不变（说明认出它靠的是字符串扫描本身，不是碰巧）');
    }
  } finally {
    await writeFile(escAbs, escOriginal, 'utf8');
    const restored = await readFile(escAbs, 'utf8');
    if (restored !== escOriginal) failures.push(`${ESC.page} 还原失败，请手动检查 git diff`);
  }
}

/* ---- 假阳性回归之三：前缀 + 变量拼出来的类名不许被当成死代码 ----
   这一类文本扫描原理上看不见，是三个假阳性里后果最重的。
   index.html:1371
       dot.className = "subj-dot d-" + r.subject;
   字符串字面量里只有 "subj-dot d-"，完整类名 d-math / d-science / d-coding /
   d-kits / d-video 一个都不出现在源码里。照着死代码清单删掉这五条，
   46 张资源卡左边的学科色圆点会集体变成没有底色的小圆——
   而这不会碰响任何一道门禁：check-contrast 只看 token 组合，
   check-rendered-contrast 量的是文字对背景，一个纯装饰的圆点没有文字。

   现在 check-classes.mjs 在**死代码那一侧**做了前缀推断：
   源码里出现 d-" + 这种形状，就不再把 d-xxx 报成死代码。
   这个放宽只用在死代码判定，没有掺进 anyJs——掺进去会让
   「markup 用了但哪里都没有规则」的真缺陷被当成 JS 钩子放过。
   回滚方式：把拼接改成写死一个类名，前缀形状消失，五条就该重新出现在清单里。 */
const CONCAT = {
  page: 'index.html',
  find: 'dot.className = "subj-dot d-" + r.subject;',
  replace: 'dot.className = "subj-dot";',
  classes: ['d-math', 'd-science', 'd-coding', 'd-kits', 'd-video']
};
const ccAbs = join(ROOT, CONCAT.page);
const ccOriginal = await readFile(ccAbs, 'utf8');
const listedNow = deadList();
const wronglyListed = CONCAT.classes.filter((k) => listedNow.includes(`${CONCAT.page} → .${k}`));
if (!ccOriginal.includes(CONCAT.find)) {
  failures.push(`前缀拼接回归：找不到 ${JSON.stringify(CONCAT.find)}，测试已过期`);
} else if (wronglyListed.length) {
  failures.push(`前缀拼接回归：${wronglyListed.map((k) => '.' + k).join('、')} 由 "subj-dot d-" + r.subject 拼出来，`
    + '却被列进死代码清单 —— 照着删会让 46 张资源卡的学科色圆点集体失色');
} else {
  pass++;
  console.log('  ✓ 不误报："subj-dot d-" + r.subject 拼出的 5 条 .d-* 没被当成死代码');
  try {
    await writeFile(ccAbs, ccOriginal.split(CONCAT.find).join(CONCAT.replace), 'utf8');
    const after = deadList();
    const back = CONCAT.classes.filter((k) => after.includes(`${CONCAT.page} → .${k}`));
    if (back.length === CONCAT.classes.length) {
      pass++;
      console.log('  ✓ 把拼接改成写死类名后，5 条 .d-* 全部重新进入清单（说明上一条不是碰巧）');
    } else {
      failures.push(`前缀拼接回归：去掉拼接后只有 ${back.length}/5 条重新进入清单，判定不可靠`);
    }
  } finally {
    await writeFile(ccAbs, ccOriginal, 'utf8');
    const restored = await readFile(ccAbs, 'utf8');
    if (restored !== ccOriginal) failures.push(`${CONCAT.page} 还原失败，请手动检查 git diff`);
  }
}

const total = baselinePages.length + MUTATIONS.length + 6;
console.log(`\n${failures.length ? '✗' : '✓'} ${pass}/${total} 通过`);
if (failures.length) {
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('  check-classes.mjs 对这 8 处缺陷都会报警且能点名具体 class；'
  + '也不会把「带前导空格拼接」「同行有转义序列」「前缀+变量拼接」的 class 误报成死代码');
