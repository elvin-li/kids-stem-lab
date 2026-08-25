/* check-render.mjs 的变异测试：证明它 9 类断言真的都会报警，且分档没有乱。
 *
 *   node tools/test-check-render.mjs
 *
 * 契约里写着「一个检查脚本如果没人验证过它会报警，等于没有」。
 * check-render.mjs 抓的是「浏览器会静默吞掉、但孩子一眼看得出不对」那一类，
 * 是本站唯一看得见「少一个 </div>」「多一个 }」「未定义 var()」的门禁——
 * 它静默失效的话，页面已经错位了也没人知道。它此前没有这个文件。
 *
 * 和 test-check-classes.mjs 那种「改真文件再还原」不同，这里**不碰任何真实页面**：
 * 自己写一个临时夹具页 pages/_render-fixture.html，每种坏写法往里写一遍、
 * 单页模式跑一次、跑完删掉，启动时也先清残留。理由是本机上另一个会话在全站巡回改页面，
 * 一秒钟的变异窗口里如果对方写了同一个文件，「还原」就会把对方的改动抹掉。
 *
 * 夹具引 base.css 是必要的：未定义 var() 那一条要拿共享层已定义的变量集合作参照，
 * 不引的话页面里所有 var() 都会被报成未定义，基线就不可能绿。
 */
import { writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHECKER = join(ROOT, 'tools/check-render.mjs');
const FIXTURE_REL = 'pages/_render-fixture.html';
const FIXTURE_ABS = join(ROOT, FIXTURE_REL);

const page = (head, body) => `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<title>渲染审计的临时夹具</title>
<link rel="stylesheet" href="../assets/css/base.css">
${head}
</head>
<body>
<main><h1 id="fxTitle">渲染审计的临时夹具</h1>${body}</main>
</body>
</html>
`;

function run() {
  const res = spawnSync(process.execPath, [CHECKER, FIXTURE_REL], { cwd: ROOT, encoding: 'utf8' });
  return { code: res.status, out: `${res.stdout || ''}${res.stderr || ''}` };
}

/* 每条 = 一类缺陷。block 表示它该不该让门禁变红，expect 是报错里必须出现的关键词
   （只验「变红了」不够——报错不点出问题在哪，等于没法修）。 */
const CASES = [
  {
    what: '未定义 var() 且无回退值（整条声明在计算值阶段失效，元素退回默认外观）',
    head: '<style>.fx { color: var(--nope-not-defined); }</style>', body: '<p class="fx">x</p>',
    block: true, expect: '--nope-not-defined'
  },
  {
    what: '容器不闭合（少一个 </div>，后面整块被吸进上一个容器）',
    head: '', body: '<div class="fx"><p>x</p></main>',
    block: true, expect: '未闭合'
  },
  {
    what: '同元素重复属性（class 写两次，浏览器只认第一个）',
    head: '', body: '<p class="fx" class="fx2">x</p>',
    block: true, expect: 'class 属性出现 2 次'
  },
  {
    what: '站内链接指向不存在的文件（点了 404）',
    head: '', body: '<p><a href="no-such-page.html">去</a></p>',
    block: true, expect: 'no-such-page.html'
  },
  {
    what: '锚点指向本页不存在的 id（点了不跳转）',
    head: '', body: '<p><a href="#no-such-anchor">去</a></p>',
    block: true, expect: 'no-such-anchor'
  },
  {
    what: 'img src 指向不存在的文件（碎图标）',
    head: '', body: '<p><img src="no-such.png" alt="x"></p>',
    block: true, expect: 'no-such.png'
  },
  {
    what: 'CSS url() 指向不存在的文件',
    head: '<style>.fx { background: url(no-such.svg); }</style>', body: '<p class="fx">x</p>',
    block: true, expect: 'no-such.svg'
  },
  {
    what: 'SVG <use href="#x"> 找不到目标（图形整块不显示）',
    head: '', body: '<svg viewBox="0 0 10 10"><use href="#nope-no-target"/></svg>',
    block: true, expect: 'nope-no-target'
  },
  {
    what: 'img 缺 alt（加载失败没有替代文字，读屏也念不出来）',
    head: '', body: '<p><img src="../assets/icons/app-icon.svg"></p>',
    block: true, expect: 'alt'
  },
  {
    what: 'CSS 大括号不平衡（多一个 }，后面的规则整段被丢弃）',
    head: '<style>.fx { color: var(--ink); } }</style>', body: '<p class="fx">x</p>',
    block: true, expect: '多出一个 }'
  },
  {
    /* 这一条**故意不阻断**：塌成 0 高只是「容易」发生，不是必然——
       外层给了固定高度的 svg 没有 viewBox 也能正常显示。
       所以两件事都要验：exit 必须是 0，但必须出现在输出里。
       只验 exit 0 的话，哪天这一整类判定被删掉也会「通过」。 */
    what: 'svg 既无 viewBox 也无 width+height（提示档，不阻断）',
    head: '', body: '<svg><circle cx="5" cy="5" r="3"/></svg>',
    block: false, expect: '既无 viewBox'
  }
];

const failures = [];
let pass = 0;

if (existsSync(FIXTURE_ABS)) await unlink(FIXTURE_ABS);

try {
  /* ---- 基线：一个各方面都合法的夹具必须是绿的 ----
     没有这一条，下面 11 条「变红」证明不了任何事；
     而且它顺带验了「不误报」：定义过的 var()、带回退值的 var()、
     存在的站内文件、本页真实存在的锚点、带 alt 的 img、有 viewBox 的 svg
     都不该被点名。 */
  await writeFile(FIXTURE_ABS, page(
    '<style>.fx { color: var(--ink); background: var(--surface); border-color: var(--totally-made-up, #ccc); }</style>',
    '<p class="fx"><a href="#fxTitle">回到标题</a> <a href="why.html">已存在的站内页</a>'
    + ' <img src="../assets/icons/app-icon.svg" alt="图标"></p>'
    + '<svg viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="3"/></svg>'
  ), 'utf8');
  {
    const { code, out } = run();
    if (code === 0) { pass++; console.log('  ✓ 基线绿：合法写法一个都不误报（含带回退值的未定义 var()）'); }
    else failures.push(`基线就是红的，无法用作对照（exit ${code}）：`
      + out.split('\n').filter((l) => l.includes('fixture')).slice(0, 3).join(' | '));
  }

  for (const c of CASES) {
    await writeFile(FIXTURE_ABS, page(c.head, c.body), 'utf8');
    const { code, out } = run();
    const named = out.includes(c.expect);
    const wantCode = c.block ? 1 : 0;
    if (code === wantCode && named) {
      pass++;
      console.log(`  ✓ ${c.block ? '报警' : '提示档'}：${c.what}`);
    } else if (code !== wantCode) {
      failures.push(c.block
        ? `${c.what}\n      没被拦住（exit ${code}）—— 这一类缺陷会让页面显示错掉而没人知道`
        : `${c.what}\n      被当成了阻断项（exit ${code}）—— 它应当只是提示`);
    } else {
      failures.push(`${c.what}\n      分档对了但输出里找不到关键词 ${JSON.stringify(c.expect)}，报错不点出问题在哪等于没法修`);
    }
  }
} finally {
  if (existsSync(FIXTURE_ABS)) await unlink(FIXTURE_ABS);
  if (existsSync(FIXTURE_ABS)) failures.push(`临时夹具没删掉：${FIXTURE_REL}，请手动删除`);
}

const total = CASES.length + 1;
console.log(`\n${failures.length ? '✗' : '✓'} ${pass}/${total} 通过`);
if (failures.length) {
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('  check-render.mjs 对这 10 类会让页面显示错掉的缺陷都会变红并点名位置，'
  + 'svg 缺尺寸这一类只报不拦，合法写法不误报');
