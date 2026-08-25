/* check-inline-scripts.mjs 的变异测试：证明它拦得住语法错误和 classic script 违规。
 *
 *   node tools/test-check-inline-scripts.mjs
 *
 * 本站所有交互都写在页面内联 <script> 里，没有构建步骤、没有打包器会替我们解析。
 * 一个漏掉的括号在打开页面之前完全没有反馈，而且只会**静默毁掉那一页的全部交互**——
 * 页面照常渲染，按钮全部不响应。这道门禁是唯一的防线，此前没有自检文件。
 *
 * 不碰任何真实页面：自己写临时夹具页 pages/_inline-fixture.html，单页模式跑，
 * 跑完删，启动时先清残留。
 *
 * 这道门禁的实现方式值得记一下：它用 node:vm 的 Script 只编译不执行，
 * 所以 import / export / 顶层 await 都是被**真正的解析器**判出来的，不是正则猜的。
 * 好处是下面那两条区分度用例天然成立——async 函数体内的 await 和 for await
 * 是合法的 classic script，正则很容易误伤，真解析器不会。
 */
import { writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHECKER = join(ROOT, 'tools/check-inline-scripts.mjs');
const FIXTURE_REL = 'pages/_inline-fixture.html';
const FIXTURE_ABS = join(ROOT, FIXTURE_REL);

const page = (js) => `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8" /><title>内联脚本审计的临时夹具</title></head>
<body>
<main><h1>内联脚本审计的临时夹具</h1></main>
<script>
${js}
</script>
</body>
</html>
`;

function run() {
  const res = spawnSync(process.execPath, [CHECKER, FIXTURE_REL], { cwd: ROOT, encoding: 'utf8' });
  return { code: res.status, out: `${res.stdout || ''}${res.stderr || ''}` };
}

const CASES = [
  {
    what: '语法错误：函数少一个右花括号（整页交互静默全废）',
    js: 'function f(){ return 1;\nf();',
    block: true, expect: 'Unexpected end of input'
  },
  {
    what: 'import 语句（页面用的是全局变量协议，不是 module）',
    js: 'import x from "./y.js"; console.log(x);',
    block: true, expect: 'import'
  },
  {
    what: 'export 语句',
    js: 'var a = 1; export { a };',
    block: true, expect: 'export'
  },
  {
    what: '顶层 await（classic script 不支持，整块失效）',
    js: 'var r = await Promise.resolve(1); console.log(r);',
    block: true, expect: 'await'
  },
  {
    /* 区分度用例：async 函数体内的 await 是合法的 classic script。
       用正则找 await 的实现会误伤它，而本站好几页的联网逻辑正是这么写的
       （nature/dinosaurs、earth、insects 的可选联网都在 async 函数里 await fetch）。
       误报会逼人把这些函数改写成 .then 链，白改。 */
    what: '不误报：async 函数体内的 await',
    js: 'async function go(){ var r = await Promise.resolve(1); return r; } go();',
    block: false
  },
  {
    what: '不误报：async 函数体内的 for await',
    js: 'async function go(){ for await (const x of []) { console.log(x); } } go();',
    block: false
  }
];

const failures = [];
let pass = 0;

if (existsSync(FIXTURE_ABS)) await unlink(FIXTURE_ABS);

try {
  /* 基线：一段普通的合法脚本必须绿 */
  await writeFile(FIXTURE_ABS, page('var a = 1; function f(){ return a + 1; } f();'), 'utf8');
  {
    const { code, out } = run();
    if (code === 0) { pass++; console.log('  ✓ 基线绿：普通合法脚本不报警'); }
    else failures.push(`基线就是红的，无法用作对照（exit ${code}）：${out.split('\n').filter((l) => l.includes('fixture')).join(' | ')}`);
  }

  for (const c of CASES) {
    await writeFile(FIXTURE_ABS, page(c.js), 'utf8');
    const { code, out } = run();
    const wantCode = c.block ? 1 : 0;
    const named = !c.expect || out.includes(c.expect);
    if (code === wantCode && named) {
      pass++;
      console.log(`  ✓ ${c.block ? '报警' : '不误报'}：${c.what}`);
    } else if (code !== wantCode) {
      failures.push(c.block
        ? `${c.what}\n      没被拦住（exit ${code}）—— 这一页的全部交互会静默失效，页面却照常渲染`
        : `${c.what}\n      被误报（exit ${code}）—— 这是合法的 classic script 写法`);
    } else {
      failures.push(`${c.what}\n      变红了但输出里找不到 ${JSON.stringify(c.expect)}，报错不说清是什么问题等于没法修`);
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
console.log('  check-inline-scripts.mjs 拦得住语法错误、import/export 与顶层 await，'
  + '且不误伤 async 函数体内的 await');
