/* check-raf.mjs 的变异测试：证明它拦得住永久 rAF 循环，也证明它认得出各种合法的停机写法。
 *
 *   node tools/test-check-raf.mjs
 *
 * 这道门禁管的是**电量**：孩子在平板上把球停下、手离开屏幕之后，
 * 永久循环仍会每秒重画 60 次。它此前没有自检文件。
 *
 * 不碰任何真实页面：自己写一个临时夹具页 pages/_raf-fixture.html。
 * check-raf.mjs 没有单页参数、总是全站扫，所以夹具会被一起扫到——
 * 夹具里放坏写法就足以让整轮变红，这正好够用。启动时先清残留。
 *
 * 判定是纯文本启发式（不做 JS 解析），所以「合法写法要能被认出来」和
 * 「坏写法要被拦住」同等重要：认不出合法写法就是误报，而这个工具的
 * 声明偏向是「宁可漏过也不误报」——误报会逼着大家去改本来没问题的代码。
 */
import { writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHECKER = join(ROOT, 'tools/check-raf.mjs');
const FIXTURE_REL = 'pages/_raf-fixture.html';
const FIXTURE_ABS = join(ROOT, FIXTURE_REL);

const page = (js) => `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8" /><title>rAF 审计的临时夹具</title></head>
<body>
<main><h1>rAF 审计的临时夹具</h1><canvas id="fxCanvas" width="10" height="10"></canvas></main>
<script>
${js}
</script>
</body>
</html>
`;

function run() {
  const res = spawnSync(process.execPath, [CHECKER], { cwd: ROOT, encoding: 'utf8' });
  const out = `${res.stdout || ''}${res.stderr || ''}`;
  return { code: res.status, out, named: out.includes('_raf-fixture') };
}

const CASES = [
  {
    what: '永久循环：回调里无条件排下一帧，也没有 cancel',
    block: true,
    js: `
function loop(){ draw(); requestAnimationFrame(loop); }
function draw(){}
requestAnimationFrame(loop);`
  },
  {
    what: '合法：排帧语句被条件包裹，if 写在行首（本站 7 页里 5 页只靠这一条过关）',
    block: false,
    js: `
var running = false, settle = 0, rafId = 0;
function loop(){
  draw();
  if (running || settle > 0) { rafId = requestAnimationFrame(loop); } else { rafId = 0; }
}
function draw(){}
function requestDraw(){ if (!rafId) rafId = requestAnimationFrame(loop); }
requestDraw();`
  },
  {
    /* 这一条是本会话那处修复的回归守卫。原来的正则带 ^ 锚点、要求整行以 if 开头，
       于是照工具自己的报错建议写、但把循环体压在一行里的代码会被误报成永久循环。
       本站有几页的内联脚本本来就是压缩成单行的，而 7 个含递归 rAF 的页面里
       有 5 页没有 cancelAnimationFrame、完全靠「条件排帧」这一条过关——
       锚点一旦回来，那 5 页会在耗电行为毫无变化的情况下集体变红。 */
    what: '合法：同样的条件排帧，但整个循环体压在一行里（回归守卫）',
    block: false,
    js: `
var running = false, settle = 0, rafId = 0;
function loop(){ draw(); if (running || settle > 0) { rafId = requestAnimationFrame(loop); } else { rafId = 0; } }
function draw(){}
requestAnimationFrame(loop);`
  },
  {
    what: '合法：记下 rafId 且存在 cancelAnimationFrame',
    block: false,
    js: `
var rafId = 0;
function loop(){ draw(); rafId = requestAnimationFrame(loop); }
function draw(){}
function stop(){ cancelAnimationFrame(rafId); rafId = 0; }
rafId = requestAnimationFrame(loop);
document.addEventListener('pointerup', stop);`
  },
  {
    what: '合法：单次排帧（回调里不再排下一帧）不算循环',
    block: false,
    js: `
function once(){ document.getElementById('fxCanvas').setAttribute('data-ready','1'); }
requestAnimationFrame(once);`
  },
  {
    /* 放宽条件排帧的判定之后，必须证明它没有变成「一律放过」：
       同一行上先有个跟排帧无关的 if，后面才无条件排帧——这仍是永久循环。
       判据是 if 的右括号和 rAF 之间不能出现 ; { }。 */
    what: '仍要拦住：同一行上有个与排帧无关的 if，之后无条件排帧',
    block: true,
    js: `
var ready = true;
function loop(){ if (ready) { draw(); } requestAnimationFrame(loop); }
function draw(){}
requestAnimationFrame(loop);`
  }
];

const failures = [];
let pass = 0;

if (existsSync(FIXTURE_ABS)) await unlink(FIXTURE_ABS);

try {
  /* 基线：没有夹具时全站必须是绿的，否则下面的「变红」证明不了任何事 */
  {
    const { code } = run();
    if (code === 0) { pass++; console.log('  ✓ 基线绿：现有页面的逐帧循环都能停下来'); }
    else failures.push(`基线就是红的，无法用作对照（exit ${code}）`);
  }

  for (const c of CASES) {
    await writeFile(FIXTURE_ABS, page(c.js), 'utf8');
    const { code, named } = run();
    const wantCode = c.block ? 1 : 0;
    if (code === wantCode && (!c.block || named)) {
      pass++;
      console.log(`  ✓ ${c.block ? '报警' : '不误报'}：${c.what}`);
    } else if (code !== wantCode) {
      failures.push(c.block
        ? `${c.what}\n      没被拦住（exit ${code}）—— 孩子手离开屏幕后画布仍会每秒重画 60 次`
        : `${c.what}\n      被误报成永久循环（exit ${code}）—— 这是合法的停机写法，误报会逼人去改没问题的代码`);
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
console.log('  check-raf.mjs 拦得住永久循环，也认得出条件排帧（行首和单行两种写法）、'
  + 'rafId+cancel、单次排帧这三类合法写法，且没有把「与排帧无关的 if」当成守卫');
