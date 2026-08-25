/* check-headings.mjs 的变异测试：证明它三条断言都会报警。
 *
 *   node tools/test-check-headings.mjs
 *
 * 屏幕阅读器用户是靠标题列表浏览页面的，层级一跳（h1 → h3）中间那一级
 * 的结构就凭空消失了，读者无法判断 h3 是谁的子节。这道门禁此前没有自检文件。
 *
 * 不碰任何真实页面：自己写临时夹具页 pages/_headings-fixture.html。
 * check-headings.mjs 没有单页参数、总是全站扫，所以夹具会被一起扫到——
 * 夹具里放坏写法就足以让整轮变红，这正好够用。启动时先清残留。
 */
import { writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHECKER = join(ROOT, 'tools/check-headings.mjs');
const FIXTURE_REL = 'pages/_headings-fixture.html';
const FIXTURE_ABS = join(ROOT, FIXTURE_REL);

const page = (body) => `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8" /><title>标题层级审计的临时夹具</title></head>
<body>
<main>${body}</main>
</body>
</html>
`;

function run() {
  const res = spawnSync(process.execPath, [CHECKER], { cwd: ROOT, encoding: 'utf8' });
  const out = `${res.stdout || ''}${res.stderr || ''}`;
  return { code: res.status, out, named: out.includes('_headings-fixture') };
}

const CASES = [
  { what: '一个 h1 都没有（读屏拿不到页面主标题）', body: '<h2>二级</h2>', block: true },
  { what: '两个 h1（页面有两个「主」标题，浏览列表失去主干）', body: '<h1>一</h1><h1>又一</h1>', block: true },
  {
    /* 视觉顺序可以用 CSS order 调，但源码顺序决定辅助技术看到的顺序。
       human-body 的 hero 就是这样处理的：排版上 h1 在后，源码里仍在前。 */
    what: 'h1 不是源码里第一个标题（视觉可以调，源码顺序不能让步）',
    body: '<h2>二在前</h2><h1>一</h1>', block: true
  },
  { what: '跳级 h1 → h3（中间那一级的结构凭空消失）', body: '<h1>一</h1><h3>三</h3>', block: true },
  { what: '跳级 h2 → h4', body: '<h1>一</h1><h2>二</h2><h4>四</h4>', block: true },
  {
    /* 往回跳任意级都是正常收尾，不该报。没有这一条，
       这道门禁可以靠「层级只准递增」通过，那会逼着每个章节结尾造假标题。 */
    what: '不误报：往回跳（h3 → h2）是正常收尾',
    body: '<h1>一</h1><h2>二</h2><h3>三</h3><h2>又二</h2><h3>又三</h3>', block: false
  }
];

const failures = [];
let pass = 0;

if (existsSync(FIXTURE_ABS)) await unlink(FIXTURE_ABS);

try {
  /* 基线：没有夹具时全站必须绿，否则下面的「变红」证明不了任何事 */
  {
    const { code } = run();
    if (code === 0) { pass++; console.log('  ✓ 基线绿：现有页面的标题层级都合规'); }
    else failures.push(`基线就是红的，无法用作对照（exit ${code}）`);
  }

  for (const c of CASES) {
    await writeFile(FIXTURE_ABS, page(c.body), 'utf8');
    const { code, named } = run();
    const wantCode = c.block ? 1 : 0;
    if (code === wantCode && (!c.block || named)) {
      pass++;
      console.log(`  ✓ ${c.block ? '报警' : '不误报'}：${c.what}`);
    } else if (code !== wantCode) {
      failures.push(c.block
        ? `${c.what}\n      没被拦住（exit ${code}）—— 读屏用户的浏览列表会缺一层结构`
        : `${c.what}\n      被误报（exit ${code}）—— 往回跳是正常收尾，报它会逼人造假标题`);
    } else {
      failures.push(`${c.what}\n      变红了但没点名夹具页，定位信息不可用`);
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
console.log('  check-headings.mjs 拦得住缺 h1、多个 h1、h1 不在最前和向下跳级，'
  + '往回跳不误报');
