/* check-contrast.mjs 的变异测试：证明它真的会报警，也证明它的分档没有退化成一刀切。
 *
 *   node tools/test-check-contrast.mjs
 *
 * 契约里写着「一个检查脚本如果没人验证过它会报警，等于没有」。
 * check-contrast.mjs 长期没有这个文件，而本会话刚把它从三套主题改成两套
 * （删掉了不可达的 html[data-theme="dark"]，138 组 → 92 组），
 * 改完没有任何东西验证过它还拦得住原来拦得住的东西。
 *
 * 做法：**完全不碰仓库里的任何文件**。
 * check-contrast.mjs 的 ROOT 是按「脚本所在目录的上一级」算的，
 * 所以把它复制到系统临时目录的 <tmp>/tools/ 下，再在 <tmp>/assets/css/ 放夹具
 * base.css / kid.css，它就会去读夹具。本机上另一个会话正在改真的 base.css，
 * 走临时目录可以彻底避开「变异窗口里对方写了同一个文件」这类事故。
 *
 * 夹具的 :root 直接抄真实 base.css 的那一段，保证基线必绿；
 * 每个用例只改其中一个 token，这样「变红」是一个有意义的增量，
 * 而不是「夹具本来就不合格」。
 */
import { readFile, writeFile, mkdtemp, mkdir, rm, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');

/* 从真实 base.css 里按花括号配对取出 :root 块的内容（不含大括号） */
function rootBody(css) {
  const start = css.indexOf(':root');
  const open = css.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i);
  }
  throw new Error('真实 base.css 的 :root 块大括号不闭合');
}

const realBase = await readFile(join(ROOT, 'assets/css/base.css'), 'utf8');
const BASE_TOKENS = rootBody(realBase);

const sandbox = await mkdtemp(join(tmpdir(), 'contrast-fixture-'));
const failures = [];
let pass = 0;

/* 把 token 覆盖写进 :root 尾部（后写的赢），并可选地给 kid 主题加覆盖 */
async function build({ baseOverride = '', kidOverride = '', dropToken = '' } = {}) {
  let tokens = BASE_TOKENS;
  if (dropToken) {
    tokens = tokens.split('\n').filter((l) => !new RegExp(`(^|\\s)${dropToken}\\s*:`).test(l)).join('\n');
  }
  await writeFile(join(sandbox, 'assets/css/base.css'),
    `:root {\n${tokens}\n${baseOverride}\n}\n`, 'utf8');
  await writeFile(join(sandbox, 'assets/css/kid.css'),
    `html[data-mode="kid"] {\n${kidOverride}\n}\n`, 'utf8');
}
function run() {
  const res = spawnSync(process.execPath, [join(sandbox, 'tools/check-contrast.mjs')],
    { cwd: sandbox, encoding: 'utf8' });
  return { code: res.status, out: `${res.stdout || ''}${res.stderr || ''}` };
}

try {
  await mkdir(join(sandbox, 'tools'), { recursive: true });
  await mkdir(join(sandbox, 'assets/css'), { recursive: true });
  await copyFile(join(ROOT, 'tools/check-contrast.mjs'), join(sandbox, 'tools/check-contrast.mjs'));

  /* ---- 0. 基线：抄真实 token，必须绿，且必须报「2 套主题、92 组」 ----
     组数写死是有意的：4 个底色 ×（3 档正文 + 8 个学科色）+ 2 个按钮 = 46 组/主题。
     哪天有人往 SURFACES / BODY_INK / SUBJECT 里加减 token 而没想清楚，
     这条会先响一声。 */
  await build();
  {
    const { code, out } = run();
    const two = /检查 2 套主题、92 组/.test(out);
    if (code === 0 && two) { pass++; console.log('  ✓ 基线绿：2 套主题、92 组，全部达标'); }
    else if (code !== 0) failures.push(`基线就是红的，无法用作对照（exit ${code}）：${out.split('\n').filter((l) => l.includes('：')).slice(0, 3).join(' | ')}`);
    else failures.push(`基线绿了但组合数不对，期望「2 套主题、92 组」，实际：${(out.match(/检查[^（]*/) || [''])[0]}`);
  }

  /* ---- 1. 正文档：--ink-mid 调浅到读不出来，必须按 4.5 拦下 ---- */
  await build({ baseOverride: '--ink-mid: #c8c8c8;' });
  {
    const { code, out } = run();
    if (code === 1 && out.includes('--ink-mid')) { pass++; console.log('  ✓ 报警：正文色 --ink-mid 调成浅灰（按 4.5 判）'); }
    else if (code === 1) failures.push('正文档变红了但没点名 --ink-mid');
    else failures.push(`正文色浅到读不出来也没被拦（exit ${code}）—— 4.5 这一档可能失效了`);
  }

  /* ---- 2. 按钮文字：--on-accent 和 --accent 同色，必须按 4.5 拦下 ----
     这一条单独存在的理由：按钮文字压的是实色色块，不在 SURFACES 循环里，
     漏掉它的话「深底白字」变成「深底深字」都不会响。 */
  await build({ baseOverride: '--on-accent: var(--accent);' });
  {
    const { code, out } = run();
    if (code === 1 && out.includes('--on-accent')) { pass++; console.log('  ✓ 报警：--on-accent 与 --accent 同色（按钮文字 4.5）'); }
    else if (code === 1) failures.push('按钮档变红了但没点名 --on-accent');
    else failures.push(`--on-accent 和 --accent 同色也没被拦（exit ${code}）—— 按钮上的字会完全看不见`);
  }

  /* ---- 3. 分档没有退化成一刀切：学科色按大字 3.0 判，不是 4.5 ----
     #858585 压在本站几个近白底色上大约 3.4–3.7:1 —— 过 3.0、不过 4.5。
     它必须是**绿**的。如果哪天有人把阈值统一提到 4.5，这条会立刻变红，
     提醒他：学科色在本站只用于粗标题、徽章、图标描边和边框，
     按正文 4.5 判会逼着把整套品牌色改暗。
     反过来，如果有人把学科色的阈值降到 3.0 以下，第 4 条会响。

     用 --sci 而不是 --math：base.css 里 `--accent: var(--math)`，
     动 --math 会连带把按钮底色也调浅，于是「--on-accent on --accent」
     那一组按 4.5 判先红了，这一条就测不到自己想测的东西。
     （工具能报出这个连带影响是对的——它说明改一个学科色会波及按钮，
     这正是 token 别名容易踩的坑；只是不适合放在这条用例里。）
     --sci / --phys / --code / --kit / --video / --warn / --danger 都没有别名。 */
  await build({ baseOverride: '--sci: #858585;' });
  {
    const { code, out } = run();
    if (code === 0) { pass++; console.log('  ✓ 分档正确：学科色 3.4:1 过大字 3.0（没有被 4.5 一刀切）'); }
    else failures.push(`学科色 3.4:1 被判成不达标（exit ${code}）—— 大字/图形那一档 3.0 可能被误提到 4.5：`
      + out.split('\n').filter((l) => l.includes('--sci')).join(' '));
  }

  /* ---- 4. 3.0 这一档本身也要拦得住：学科色再浅一点就必须红 ---- */
  await build({ baseOverride: '--sci: #d0d0d0;' });
  {
    const { code, out } = run();
    if (code === 1 && out.includes('--sci')) { pass++; console.log('  ✓ 报警：学科色浅到连大字 3.0 都不过'); }
    else failures.push(`学科色浅到 1.x:1 也没被拦（exit ${code}）—— 大字那一档等于没判`);
  }

  /* ---- 5. token 缺失要当成错误，不能静默跳过 ----
     工具内部对取不到的 token 有 `continue`，如果缺失不单独报错，
     少写一个 token 会让那一整组组合凭空消失、结果照样绿。 */
  await build({ dropToken: '--accent-deep' });
  {
    const { code, out } = run();
    if (code === 1 && out.includes('token 解析失败') && out.includes('--accent-deep')) {
      pass++; console.log('  ✓ 报警：token 缺失（--accent-deep）不会被静默跳过');
    } else failures.push(`删掉 --accent-deep 之后没有报「token 解析失败」（exit ${code}）—— 缺 token 会让整组组合凭空消失`);
  }

  /* ---- 6. 孩子模式的覆盖确实叠在 :root 之上并被检查 ----
     kid.css 只覆盖一部分 token，其余继承 :root。只在 kid 里放一个坏值，
     必须由「孩子模式」那一套报出来。这条同时证明了两件事：
     覆盖层生效了，而且第二套主题真的参与判定（不是只算浅色那套）。 */
  await build({ kidOverride: '--ink: #eeeeee;' });
  {
    const { code, out } = run();
    const named = out.includes('孩子模式') && out.includes('--ink');
    if (code === 1 && named) { pass++; console.log('  ✓ 覆盖层生效：只坏在 kid.css 的 token 由「孩子模式」那一套报出'); }
    else if (code === 1) failures.push(`变红了但没归给孩子模式，覆盖层可能没叠上：${out.split('\n').filter((l) => l.includes('--ink')).slice(0, 2).join(' | ')}`);
    else failures.push(`只坏在 kid.css 的 token 没被发现（exit ${code}）—— 第二套主题可能没参与判定`);
  }
} finally {
  try { await rm(sandbox, { recursive: true, force: true }); } catch {}
}

const total = 7;
console.log(`\n${failures.length ? '✗' : '✓'} ${pass}/${total} 通过`);
if (failures.length) {
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('  check-contrast.mjs 拦得住正文、按钮文字和大字三档的不达标，'
  + 'token 缺失不会静默跳过，孩子模式的覆盖层确实参与判定');
