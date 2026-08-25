/* check-theme.mjs 的变异测试：证明它真的会报警，而不是恰好一直是绿的。
 *
 *   node tools/test-check-theme.mjs
 *
 * 契约里写着「一个检查脚本如果没人验证过它会报警，等于没有」。
 * check-theme.mjs 长期没有这个文件，而它是本站唯一一道看得见
 * 「页面 <style> 里写死的暗色主题颜色」的门禁——check-contrast.mjs 只算
 * token × token，check-rendered-contrast.mjs 要真浏览器。它静默失效的话，
 * 谁都不会发现。
 *
 * 做法上和 test-check-classes.mjs 有一处刻意的区别：**不改任何真实页面**。
 * 那些测试是临时把真文件回滚再还原；本机上另一个会话正在全站巡回改页面，
 * 一秒钟的变异窗口里如果对方写了同一个文件，我的「还原」就会把对方的改动抹掉。
 * 所以这里自己造一个临时夹具页（pages/_theme-fixture.html），
 * 每种写法往夹具里写一遍、单页模式跑一次、跑完删掉。
 * 最坏情况只是残留一个临时文件（启动时会先清理），绝不会丢别人的工作。
 */
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHECKER = join(ROOT, 'tools/check-theme.mjs');
const FIXTURE_REL = 'pages/_theme-fixture.html';
const FIXTURE_ABS = join(ROOT, FIXTURE_REL);

const page = (css) => `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<title>主题审计的临时夹具</title>
<style>
  ${css}
</style>
</head>
<body>
<main><h1>主题审计的临时夹具</h1><p>由 tools/test-check-theme.mjs 生成，跑完即删。</p></main>
</body>
</html>
`;

function run() {
  const res = spawnSync(process.execPath, [CHECKER, FIXTURE_REL], { cwd: ROOT, encoding: 'utf8' });
  return { code: res.status, out: `${res.stdout || ''}${res.stderr || ''}` };
}

const failures = [];
let pass = 0;

/* 启动先清理上一轮可能残留的夹具，否则全站门禁会把它算进去 */
if (existsSync(FIXTURE_ABS)) await unlink(FIXTURE_ABS);

try {
  /* ---- 0. 基线：干净夹具必须是绿的。没有这一条，下面的「变红」证明不了任何事 ---- */
  await writeFile(FIXTURE_ABS, page('.fx-plain { color: var(--ink); background: var(--surface); }'), 'utf8');
  {
    const { code } = run();
    if (code === 0) { pass++; console.log('  ✓ 基线绿：只用 token 的规则不报警'); }
    else failures.push(`基线就是红的，无法用作对照（exit ${code}）`);
  }

  /* ---- 1. A 类：同一条规则里深底 + 深字 ----
     这是最直接的不可读组合。判定要求「合成到纯白和纯黑上两种极端都不达标」
     才算错，只有一种不达标会降级成提示（结论依赖祖先底色）。
     #16202e 压在 #0b0f1a 上无论祖先是什么都读不出来，所以必须阻断。 */
  await writeFile(FIXTURE_ABS, page('.fx-dark-on-dark { color: #16202e; background: #0b0f1a; }'), 'utf8');
  {
    const { code, out } = run();
    if (code === 1 && out.includes('fx-dark-on-dark')) { pass++; console.log('  ✓ 报警：深底 + 深字（#16202e on #0b0f1a）'); }
    else if (code === 1) failures.push('A 类变红了但没点名 .fx-dark-on-dark，定位信息不可用');
    else failures.push(`A 类（深底+深字）没被拦住（exit ${code}）—— 浅色主题下这是读不出来的文字`);
  }

  /* ---- 2. B 类：写死的暗色画布色当背景 ----
     浅色页面中间突然出现一块近黑的板子。判别用「低饱和 + 很暗」，
     alpha ≥ .5 时算错（此时祖先底色已经无关）。
     用 #121829 而不是 --math #1b64c8 这类高饱和品牌色：后者是正常填充色，
     被这条规则误伤才是问题。 */
  await writeFile(FIXTURE_ABS, page('.fx-slab { background: #121829; padding: 10px; }'), 'utf8');
  {
    const { code, out } = run();
    if (code === 1 && out.includes('fx-slab')) { pass++; console.log('  ✓ 报警：写死的暗色画布色当背景（#121829）'); }
    else if (code === 1) failures.push('B 类变红了但没点名 .fx-slab');
    else failures.push(`B 类（暗色色块）没被拦住（exit ${code}）`);
  }

  /* ---- 3. 反向：高饱和品牌色不该被 B 类误伤 ----
     没有这一条，B 类可以靠「把所有深色背景都报错」通过，那样噪音会大到没人看。 */
  await writeFile(FIXTURE_ABS, page('.fx-brand { background: var(--math); color: var(--on-accent); }'), 'utf8');
  {
    const { code, out } = run();
    if (code === 0) { pass++; console.log('  ✓ 不误伤：高饱和品牌色 var(--math) 配 --on-accent 不报警'); }
    else failures.push(`把正常的品牌色块判成了暗色残留（exit ${code}）：${out.split('\n').filter((l) => l.includes('fx-brand')).join(' ')}`);
  }

  /* ---- 4. C 类：隐形描边是提示、不阻断 ----
     为暗底写的近白高光描边，在白卡上等于没画。这一类**故意不阻断**，
     因为有些地方确实压在 JS 写的深色分区上（ocean 的 .zone .who span）。
     所以两件事都要验：exit 必须是 0，但必须出现在提示清单里并给出对比度。
     只验 exit 0 的话，哪天这一整类判定被删掉也会「通过」。 */
  await writeFile(FIXTURE_ABS, page('.fx-ghost { border: 1px solid rgba(238,242,255,.18); background: #ffffff; }'), 'utf8');
  {
    const { code, out } = run();
    const named = out.includes('fx-ghost') && out.includes('等于没画');
    if (code === 0 && named) { pass++; console.log('  ✓ 分档正确：隐形描边只进提示清单、不阻断'); }
    else if (code !== 0) failures.push(`隐形描边被当成阻断项（exit ${code}）—— 它应当只是提示`);
    else failures.push('隐形描边没有出现在提示清单里，这一类判定可能已失效');
  }

  /* ---- 5. :root 块的结束分界（本会话改过的那处，此前无任何测试） ----
     原来的写法是 css.indexOf('html[data-theme="dark"]') —— 拿「下一条已知规则的
     选择器」当分界。那条深色主题规则已经删除，indexOf 会返回 -1 并退回 css.length，
     于是 base.css 从 :root 到文件末尾**全部**被当成 token 块解析，
     底下所有组件规则里的自定义属性都会混进主题 token 表，静默污染整张表
     （污染之后背景合成基准就不对了，A/B 两类的判定会跟着错）。
     现在改成花括号配对。这里独立再实现一遍配对来交叉验证，只读 base.css、不改它。
     同时断言「:root 里的自定义属性数」严格小于「base.css 里自定义属性总数」——
     否则这条断言本身没有区分度（两者相等时，分界坏了也看不出来）。 */
  {
    const css = await readFile(join(ROOT, 'assets/css/base.css'), 'utf8');
    const start = css.indexOf(':root');
    const open = css.indexOf('{', start);
    let depth = 0, end = -1;
    for (let i = open; i < css.length; i++) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}' && --depth === 0) { end = i; break; }
    }
    const rootBlock = css.slice(open, end + 1);
    const countDecls = (text) => new Set([...text.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1])).size;
    const inRoot = countDecls(rootBlock);
    const inWholeFile = countDecls(css);
    const { out } = run();
    const reported = Number((out.match(/浅色 token (\d+) 个/) || [])[1]);
    if (!(inWholeFile > inRoot)) {
      failures.push(`:root 分界断言失去区分度：base.css 全文自定义属性数 ${inWholeFile} 没有多于 :root 内的 ${inRoot}，`
        + '这条测试无法再区分「配对正确」和「吃到文件末尾」');
    } else if (reported === inRoot) {
      pass++;
      console.log(`  ✓ :root 分界正确：token ${reported} 个 = 独立配对算出的 ${inRoot} 个`
        + `（全文共 ${inWholeFile} 个，分界若坏掉会涨到接近这个数）`);
    } else {
      failures.push(`:root 分界不对：工具报 ${reported} 个 token，独立花括号配对算出 ${inRoot} 个`
        + `（base.css 全文 ${inWholeFile} 个）。分界吃过头会把组件规则里的自定义属性当成主题 token。`);
    }
  }
} finally {
  if (existsSync(FIXTURE_ABS)) await unlink(FIXTURE_ABS);
  if (existsSync(FIXTURE_ABS)) failures.push(`临时夹具没删掉：${FIXTURE_REL}，请手动删除`);
}

const total = 6;
console.log(`\n${failures.length ? '✗' : '✓'} ${pass}/${total} 通过`);
if (failures.length) {
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('  check-theme.mjs 会拦住深底深字与写死的暗色色块，不误伤品牌色，'
  + '隐形描边只报不拦，:root token 块的边界也是按花括号配对算的');
