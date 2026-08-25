/* check-contract.mjs 的变异测试：证明这道最承重的门禁真的会报警。
 *
 *   node tools/test-check-contract.mjs
 *
 * check-contract.mjs 是门禁清单里的第一条，管的是全站一致性：六项导航的文字与
 * 目标、跳到主要内容的链接、当前页的 aria-current、共享层脚本样式的加载顺序与
 * ?v= 版本号、作品类型白名单。这些错了不会让页面崩，只会让站变得不一致
 * ——某一页导航少一项、某一页拿到旧版缓存的 CSS——所以特别需要机器把关。
 * 它此前没有自检文件。
 *
 * 不碰任何真实页面：自己写临时夹具页 pages/_contract-fixture.html。
 * check-contract.mjs 没有单页参数、总是全站扫，夹具会被一起扫到，
 * 夹具里放坏写法就足以让整轮变红。启动时先清残留。
 *
 * 夹具的版本号从 sw.js 的 CACHE 名里动态读——和 check-contract.mjs 自己
 * 取 shellVersion 的来源完全一致。写死版本号的话，别人一提缓存版本这个测试就废了。
 *
 * 顺带记一下这个最小夹具，它就是「一个合规页面的最低要求」：
 *   六项导航（文字和 href 都要对）、skip-link、恰好一个 aria-current、
 *   base/kid/print 三个样式表、manifest、
 *   data/playful.js 必须排在 assets/js/playful.js 之前，
 *   progress.js / playful.js / pwa.js 三个脚本都要有，且都带 ?v=<壳版本>。
 */
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHECKER = join(ROOT, 'tools/check-contract.mjs');
const FIXTURE_REL = 'pages/_contract-fixture.html';
const FIXTURE_ABS = join(ROOT, FIXTURE_REL);

const sw = await readFile(join(ROOT, 'sw.js'), 'utf8');
const V = (sw.match(/\bCACHE\s*=\s*["'][^"']*v(\d+)["']/) || [])[1];
if (!V) {
  console.error('✗ 读不到 sw.js 的 CACHE 版本号，无法构造夹具');
  process.exit(1);
}

/* 导航六项…七项…以后可能更多，所以**从 check-contract.mjs 自己的 EXPECTED_NAV 解析**，
   不在这里写死。第一版把六项抄进夹具，结果对方给站里加了「医药箱」第七项，
   基线立刻变红——测试跟着契约走才不会隔一天就废。
   EXPECTED_NAV 里的 href 是相对仓库根的，夹具在 pages/ 下，所以要换算成相对路径。 */
const checkerSrc = await readFile(CHECKER, 'utf8');
const navBlock = checkerSrc.match(/const EXPECTED_NAV\s*=\s*\[([\s\S]*?)\];/);
if (!navBlock) {
  console.error('✗ 读不到 check-contract.mjs 的 EXPECTED_NAV，无法构造夹具');
  process.exit(1);
}
const NAV = [...navBlock[1].matchAll(/\[\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\]/g)]
  .map(([, label, href]) => ({ label, href }));
if (!NAV.length) {
  console.error('✗ EXPECTED_NAV 解析出 0 项，无法构造夹具');
  process.exit(1);
}
/* 从 pages/ 看过去的相对路径：pages/x.html → x.html，其他一律加 ../ */
const relFromPages = (href) => (href.startsWith('pages/') ? href.slice('pages/'.length) : `../${href}`);

/* 合规夹具的各个部件，拆开是为了让每个变异只替换其中一块 */
const parts = {
  head: `<link rel="stylesheet" href="../assets/css/base.css?v=${V}">
<link rel="stylesheet" href="../assets/css/kid.css?v=${V}">
<link rel="stylesheet" href="../assets/css/print.css?v=${V}" media="print">
<link rel="manifest" href="../manifest.webmanifest">`,
  skip: '<a class="skip-link" href="#main">跳到主要内容</a>',
  /* 恰好一个 aria-current：钉在第一项上，位置无关紧要，数量才是被检查的 */
  nav: `<nav class="nav" aria-label="主导航">\n`
    + NAV.map((item, i) => `<a class="nav-link" href="${relFromPages(item.href)}"`
      + `${i === 0 ? ' aria-current="page"' : ''}>${item.label}</a>`).join('\n')
    + `\n</nav>`,
  main: '<main id="main"><h1>契约审计的临时夹具</h1><p>x</p></main>',
  scripts: `<script src="../data/playful.js?v=${V}"></script>
<script src="../assets/js/progress.js?v=${V}"></script>
<script src="../assets/js/playful.js?v=${V}"></script>
<script src="../assets/js/pwa.js?v=${V}"></script>`
};

const page = (p) => `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>契约审计的临时夹具</title>
${p.head}
</head>
<body>
${p.skip}
${p.nav}
${p.main}
${p.scripts}
</body>
</html>
`;

function run() {
  const res = spawnSync(process.execPath, [CHECKER], { cwd: ROOT, encoding: 'utf8' });
  const out = `${res.stdout || ''}${res.stderr || ''}`;
  return { code: res.status, out, mine: out.split('\n').filter((l) => l.includes('_contract-fixture')).join(' ') };
}

const CASES = [
  {
    what: `导航某一项文字写错（把「${NAV[1].label}」改成别的字）`,
    patch: { nav: parts.nav.replace(`>${NAV[1].label}<`, '>完全不对的名字<') },
    expect: '导航'
  },
  {
    what: '导航某一项 href 指错（指向另一个确实存在的站内页，所以只有导航那条会响）',
    patch: { nav: parts.nav.replace(`href="${relFromPages(NAV[1].href)}"`, 'href="why.html"') },
    expect: '导航'
  },
  {
    what: '共享样式表的 ?v= 与离线壳版本不一致（用户会拿到旧缓存）',
    patch: { head: parts.head.replace(`base.css?v=${V}`, `base.css?v=${Number(V) - 1}`) },
    expect: 'base.css'
  },
  {
    what: '没有加载 pwa.js（这一页进不了离线应用）',
    patch: { scripts: parts.scripts.split('\n').filter((l) => !l.includes('pwa.js')).join('\n') },
    expect: 'pwa.js'
  },
  {
    what: '缺少「跳到主要内容」链接（键盘用户每页都要先 Tab 过整条导航）',
    patch: { skip: '' },
    expect: '跳到主要内容'
  },
  {
    what: 'aria-current 有两个（读屏会报两个「当前页」）',
    patch: {
      nav: parts.nav.replace(`href="${relFromPages(NAV[1].href)}"`,
        `href="${relFromPages(NAV[1].href)}" aria-current="page"`)
    },
    expect: 'aria-current'
  },
  {
    what: 'assets/js/playful.js 排在 data/playful.js 之前（共享层拿不到数据）',
    patch: {
      scripts: `<script src="../assets/js/progress.js?v=${V}"></script>
<script src="../assets/js/playful.js?v=${V}"></script>
<script src="../data/playful.js?v=${V}"></script>
<script src="../assets/js/pwa.js?v=${V}"></script>`
    },
    expect: 'data/playful.js'
  },
  {
    what: '控件没有可访问名称（读屏念不出这是什么输入框）',
    patch: {
      main: `<main id="main"><h1>契约审计的临时夹具</h1>
<select name="fxPick"><option value="a">甲</option></select></main>`
    },
    expect: '可访问名称'
  }
];

/* ---- 已知未覆盖：作品表单那一组断言 ----
   check-contract.mjs 里的 WORK_TYPES 白名单、`data-playful-work-status` 状态行、
   「不得自写 saveWork」这些判定都在**详情页**分支里，只对 games/ 和 nature/ 下的页面生效。
   要测到它们，夹具得放进 games/ 并同时满足详情页的全套要求（以自身 id 调
   Progress.visit() 与 Progress.complete()、实验页五件套、不含 streak…），
   夹具会重到不好维护，而且和 check-content.mjs 的要求纠缠在一起。
   这里**如实标注为未覆盖**，不要以为已经守住了。
   真要补的话，比堆夹具更省的办法是把详情页那一段判定抽成可单独调用的函数，
   或者给 check-contract.mjs 加一个「把指定路径当详情页判定」的测试钩子。 */

const failures = [];
let pass = 0;

if (existsSync(FIXTURE_ABS)) await unlink(FIXTURE_ABS);

try {
  /* ---- 基线：最小合规夹具必须绿 ----
     没有这一条，下面 8 条「变红」证明不了任何事：
     可能只是夹具本身哪里不合规，而不是变异生效了。 */
  await writeFile(FIXTURE_ABS, page(parts), 'utf8');
  {
    const { code, mine } = run();
    if (code === 0) { pass++; console.log(`  ✓ 基线绿：最小合规夹具（壳版本 v=${V}）不报警`); }
    else failures.push(`基线就是红的，无法用作对照（exit ${code}）：${mine || '（错误不在夹具上，可能是别处已经红了）'}`);
  }

  for (const c of CASES) {
    await writeFile(FIXTURE_ABS, page({ ...parts, ...c.patch }), 'utf8');
    const { code, mine } = run();
    if (code === 1 && mine.includes(c.expect)) {
      pass++;
      console.log(`  ✓ 报警：${c.what}`);
    } else if (code !== 1) {
      failures.push(`${c.what}\n      没被拦住（exit ${code}）—— 这类不一致不会让页面崩，只会让站悄悄变得不一致`);
    } else {
      failures.push(`${c.what}\n      变红了但夹具那一行里找不到 ${JSON.stringify(c.expect)}，实际报的是：${mine || '（不是夹具的错）'}`);
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
console.log('  check-contract.mjs 拦得住导航文字与目标写错、共享层版本号不一致、缺 pwa.js、'
  + '缺 skip-link、aria-current 数量不对、共享层加载顺序颠倒、控件缺可访问名称');
console.log('  （作品表单那一组断言只对详情页生效，本文件未覆盖，原因见源码里的说明）');
