/* check-aria.mjs 的变异测试：证明它拦得住断掉的 ARIA 引用和重复 id。
 *
 *   node tools/test-check-aria.mjs
 *
 * 这道门禁抓的是**视觉上完全看不出来**的一类缺陷：本站没有构建步骤，
 * 改名或复制模板时 aria-labelledby 很容易指向已经不存在的 id，
 * 页面照常渲染、屏幕阅读器却读不出名称；同一页出现重复 id 更糟，
 * getElementById 只拿第一个，脚本会静默操作错的节点。
 * 正因为看不出来，它静默失效的代价特别高，而它此前没有自检文件。
 *
 * 不碰任何真实页面：自己写临时夹具页 pages/_aria-fixture.html，
 * 单页模式跑，跑完删，启动时先清残留。
 */
import { writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHECKER = join(ROOT, 'tools/check-aria.mjs');
const FIXTURE_REL = 'pages/_aria-fixture.html';
const FIXTURE_ABS = join(ROOT, FIXTURE_REL);

const page = (body) => `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8" /><title>ARIA 审计的临时夹具</title></head>
<body>
<main>${body}</main>
</body>
</html>
`;

function run() {
  const res = spawnSync(process.execPath, [CHECKER, FIXTURE_REL], { cwd: ROOT, encoding: 'utf8' });
  return { code: res.status, out: `${res.stdout || ''}${res.stderr || ''}` };
}

const CASES = [
  {
    what: '同一页重复 id（getElementById 只拿第一个，脚本会操作错的节点）',
    body: '<h1 id="fxDup">标</h1><p id="fxDup">又一个</p>',
    block: true, expect: 'fxDup'
  },
  {
    what: 'aria-labelledby 指向不存在的 id（读屏读不出名称）',
    body: '<h1 id="fxT">标</h1><button aria-labelledby="fx-gone">按</button>',
    block: true, expect: 'fx-gone'
  },
  {
    what: 'aria-describedby 指向不存在的 id',
    body: '<h1 id="fxT">标</h1><button aria-describedby="fx-gone-desc">按</button>',
    block: true, expect: 'fx-gone-desc'
  },
  {
    what: 'label[for] 指向不存在的输入框（点标签不聚焦，触控目标也没变大）',
    body: '<h1 id="fxT">标</h1><label for="fx-gone-input">名</label>',
    block: true, expect: 'fx-gone-input'
  },
  {
    what: 'aria-controls 指向不存在的面板',
    body: '<h1 id="fxT">标</h1><button aria-controls="fx-gone-panel">按</button>',
    block: true, expect: 'fx-gone-panel'
  },
  {
    /* 这一条**故意不阻断**：装饰性插画整棵子树 aria-hidden 就不该有名称，
       而工具无法从静态 markup 判断某张图到底算内容还是装饰。
       两件事都要验：exit 必须是 0，但必须出现在输出里。
       只验 exit 0 的话，哪天这一整类判定被删掉也会「通过」。 */
    what: 'role="img" 的 svg 没有 <title> 也没有 aria-label（提示档，不阻断）',
    body: '<h1 id="fxT">标</h1><svg role="img" viewBox="0 0 9 9"><circle cx="4" cy="4" r="3"/></svg>',
    block: false, expect: '_aria-fixture'
  }
];

const failures = [];
let pass = 0;

if (existsSync(FIXTURE_ABS)) await unlink(FIXTURE_ABS);

try {
  /* ---- 基线：引用都接得上的夹具必须绿 ----
     同时兼任「不误报」：aria-labelledby / aria-describedby 指向真实存在的 id、
     label[for] 接到真实 input、role="img" 的 svg 带 <title> 都不该被点名。 */
  await writeFile(FIXTURE_ABS, page(
    '<h1 id="fxTitle">标题</h1><p id="fxDesc">说明</p>'
    + '<button aria-labelledby="fxTitle" aria-describedby="fxDesc">按</button>'
    + '<label for="fxInput">名字</label><input id="fxInput">'
    + '<svg role="img" viewBox="0 0 9 9" aria-labelledby="fxSvgTitle"><title id="fxSvgTitle">一个圆</title>'
    + '<circle cx="4" cy="4" r="3"/></svg>'
    + '<svg viewBox="0 0 9 9" aria-hidden="true"><circle cx="4" cy="4" r="3"/></svg>'
  ), 'utf8');
  {
    const { code, out } = run();
    if (code === 0) { pass++; console.log('  ✓ 基线绿：引用都接得上、带名称的图和 aria-hidden 的装饰图都不误报'); }
    else failures.push(`基线就是红的，无法用作对照（exit ${code}）：`
      + out.split('\n').filter((l) => l.includes('fixture')).slice(0, 3).join(' | '));
  }

  for (const c of CASES) {
    await writeFile(FIXTURE_ABS, page(c.body), 'utf8');
    const { code, out } = run();
    const named = out.includes(c.expect);
    const wantCode = c.block ? 1 : 0;
    if (code === wantCode && named) {
      pass++;
      console.log(`  ✓ ${c.block ? '报警' : '提示档'}：${c.what}`);
    } else if (code !== wantCode) {
      failures.push(c.block
        ? `${c.what}\n      没被拦住（exit ${code}）—— 这类缺陷在屏幕上完全看不出来`
        : `${c.what}\n      被当成了阻断项（exit ${code}）—— 它应当只是提示`);
    } else {
      failures.push(`${c.what}\n      分档对了但输出里找不到 ${JSON.stringify(c.expect)}，报错不点出是哪个 id 等于没法修`);
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
console.log('  check-aria.mjs 拦得住重复 id 与四种断掉的 id 引用并点名具体 id，'
  + 'role="img" 缺名只报不拦，接得上的引用不误报');
