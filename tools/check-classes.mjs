/* 类名双向审计：无依赖，纯静态。
 *
 * 用法：
 *   node tools/check-classes.mjs           # 全站
 *   node tools/check-classes.mjs games/x.html
 *
 * 本站没有构建步骤，改名时 CSS 与 markup 很容易脱节：
 * markup 写 .studio-knowledge、CSS 还留着 .studio-know，页面就退化成裸结构，
 * 而且不会有任何报错。这个脚本把两边对起来，专抓这一类缺陷。
 *
 * 报错（exit 1）：markup 用了某个 class，但全站 CSS 没有任何规则命中它，
 *                 且没有任何 JS 引用它 —— 那它既不控制外观也不控制行为，是真缺陷。
 * 只提示（exit 0）：
 *   - 纯 JS 钩子：无 CSS 规则但被 querySelector / classList / 字符串引用，属正常写法。
 *   - 无人使用的 CSS：有规则但 markup 和 JS 都不用，属死代码，值得清理但不阻断。
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const HTML_DIRS = ['.', 'games', 'nature', 'pages'];

/* 由框架 / 浏览器约定产生、不需要本站 CSS 或 JS 的 class。 */
const ALLOW = new Set([
  'no-print'  /* print.css 里定义，但按 media="print" 加载，扫描器已能看到，这里只做兜底 */
]);

function rootRel(path) { return relative(ROOT, path).split(sep).join('/'); }

/* markup 里的 class 属性。忽略 <script> / <style> 内部，避免把 JS 字符串当成 markup。 */
function markupClasses(html) {
  const body = html
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ');
  const out = new Map();
  for (const match of body.matchAll(/\sclass\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    for (const token of (match[1] ?? match[2] ?? '').split(/\s+/)) {
      if (token) out.set(token, (out.get(token) || 0) + 1);
    }
  }
  return out;
}

/* CSS 选择器里出现的 class。只取 .foo 形式，属性选择器和 tag 不算。 */
function cssClasses(css) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const out = new Set();
  /* 去掉声明块，只在选择器区域找 class，避免把 content:".foo" 之类算进来。 */
  const selectorArea = stripped.replace(/\{[^{}]*\}/g, '{}');
  for (const match of selectorArea.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) out.add(match[1]);
  return out;
}

function styleBlocks(html) {
  return [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)].map((m) => m[1]).join('\n');
}

function inlineScripts(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
    .filter((m) => !/\bsrc\s*=/i.test(m[1]))
    .map((m) => m[2]).join('\n');
}

/* JS 里以字符串出现的 class 名。classList.add("x")、el("div","a b")、
   querySelector(".x")、'class="x"' 拼串等写法都能覆盖。 */
function jsClasses(js) {
  const out = new Set();
  /* 单双引号（单行）和反引号（可跨行，本站用它拼 SVG 字符串）都要看。
     字符串体里必须放行转义序列（\\. 那一支）。原来写的是 (?!\1)[^\\\n]，
     把反斜杠排除在外，于是 "\n" 这种带转义的字符串整个匹配不上；匹配失败后
     正则引擎前移一格重试，会把 "\n" 的**收尾引号**当成下一个字符串的开引号，
     从这里开始「字符串」和「代码」的角色整行错位。
     本站的内联脚本都压缩成单行长句，所以只要行内早一点出现一个 "\n"，
     该脚本后面所有字符串里的类名就全部失明。真踩到的一例：
     pages/why.html 里 lines.join("\n") 排在 classList.add("print-eval") 前面，
     于是 .print-eval 被列进死代码清单——照着删就会拆掉「只打印评估表」这个功能，
     而且门禁全绿（那条规则只在 @media print 里生效，屏幕上的审计根本看不见）。
     错位是双向危害：既造成死代码假阳性，也会把「只在 JS 里引用」的 class
     误判成「markup 用了但没有任何规则」的硬错误。 */
  const strings = [
    ...[...js.matchAll(/(["'])((?:\\.|(?!\1)[^\\\n])*)\1/g)].map((m) => m[2]),
    ...[...js.matchAll(/`((?:[^`\\]|\\[\s\S])*)`/g)].map((m) => m[1])
  ];
  for (const raw of strings) {
    if (!raw || raw.length > 200) continue;
    /* 选择器形式：.foo / .foo.bar / div.foo */
    for (const hit of raw.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) out.add(hit[1]);
    /* 裸 class 列表形式："card collection-card album-card"。
       必须先 trim 再判：追加 class 最惯用的写法是留一个前导空格
       （ocean.html 的 el.className = "rmark" + (m.hi ? " hi" : "")），
       而原来的 /^[\w]…/ 要求以字符开头，" hi" 直接不匹配，hi 就永远进不了
       「已使用」集合。后果是双向的：死代码清单里出现假阳性（.hi 明明是活的），
       本该算「JS 钩子」的类也可能被误判成硬错误。
       只容忍首尾空白、不放宽字符集——放宽会让这个集合过度收集，
       反过来把「markup 用了但没有任何规则」的真缺陷掩盖成钩子。 */
    const bare = raw.trim();
    if (/^[\w][\w\s-]*$/.test(bare)) for (const token of bare.split(/\s+/)) if (token) out.add(token);
    /* 拼接的 class 属性：'class="foo bar"' */
    for (const hit of raw.matchAll(/class\s*=\s*\\?["']?([\w\s-]+)/g)) {
      for (const token of hit[1].split(/\s+/)) if (token) out.add(token);
    }
  }
  return out;
}

async function htmlFiles() {
  const out = [];
  for (const dir of HTML_DIRS) {
    const full = dir === '.' ? ROOT : join(ROOT, dir);
    for (const name of (await readdir(full)).sort()) {
      if (name.endsWith('.html')) out.push(dir === '.' ? name : `${dir}/${name}`);
    }
  }
  return out;
}

async function sharedCssFiles() {
  const dir = join(ROOT, 'assets/css');
  return (await readdir(dir)).filter((n) => n.endsWith('.css')).sort().map((n) => `assets/css/${n}`);
}

async function sharedJsFiles() {
  const out = [];
  for (const dir of ['assets/js', 'data']) {
    for (const name of (await readdir(join(ROOT, dir))).sort()) {
      if (name.endsWith('.js')) out.push(`${dir}/${name}`);
    }
  }
  return out;
}

const requested = process.argv.slice(2).map((a) => rootRel(join(ROOT, a)));
const allHtml = await htmlFiles();
const targets = requested.length ? allHtml.filter((f) => requested.includes(f)) : allHtml;
if (requested.length && targets.length !== requested.length) {
  console.error(`✗ 找不到这些页面：${requested.filter((r) => !targets.includes(r)).join(', ')}`);
  process.exit(1);
}

/* 全站 CSS：共享层 + 每一页的 <style>。局部 style 也算「命中」，
   因为它确实会给那个页面上色 —— 我们要抓的是「哪里都没有」。 */
const sharedCss = new Set();
for (const rel of await sharedCssFiles()) {
  for (const name of cssClasses(await readFile(join(ROOT, rel), 'utf8'))) sharedCss.add(name);
}
const sharedJs = new Set();
for (const rel of await sharedJsFiles()) {
  for (const name of jsClasses(await readFile(join(ROOT, rel), 'utf8'))) sharedJs.add(name);
}

const pages = new Map();
for (const rel of allHtml) {
  const html = await readFile(join(ROOT, rel), 'utf8');
  pages.set(rel, {
    markup: markupClasses(html),
    css: cssClasses(styleBlocks(html)),
    js: jsClasses(inlineScripts(html))
  });
}

/* 判定必须按「这一页实际生效的层」来算，不能全站取并集。
   nature/weather.html 曾经用 .qa，而 .qa 只写在 fraction-lab 和 dinosaurs 的
   局部 <style> 里 —— 全站并集会放过它，但那 5 个折叠块在 weather 上确实是裸的。
   所以每页的生效样式 = 共享层 + 这一页自己的 <style>。JS 引用同理。 */
const anyJs = new Set(sharedJs);
for (const page of pages.values()) for (const name of page.js) anyJs.add(name);

const broken = [];   /* 本页既无 CSS 规则也无 JS 引用：真缺陷 */
const hooks = [];    /* 无 CSS 但有 JS：正常钩子 */
for (const rel of targets) {
  const page = pages.get(rel);
  const pageJs = new Set([...sharedJs, ...page.js]);
  for (const [name, count] of page.markup) {
    if (ALLOW.has(name) || sharedCss.has(name) || page.css.has(name)) continue;
    /* 本页 JS 引用 → 钩子；只有别页 JS 引用 → 仍算缺陷，但归到钩子里提示，
       避免把跨页复制的模板误判成硬错误。 */
    (pageJs.has(name) || anyJs.has(name) ? hooks : broken).push({ rel, name, count });
  }
}

/* CSS 有规则但没人用：死代码。只在全站模式下报，单页模式噪音太大。
 *
 * 这一侧的判定要**故意放宽**，和上面「markup 用了却没规则」那一侧相反：
 *   - 死代码漏报很便宜：只是少清理一条规则，页面照样对；
 *   - 死代码误报很贵：这份清单是给人照着删的，删掉还在用的规则是静默破坏，
 *     少一条 color 或 fill 未必跨过任何对比度阈值，门禁会全绿。
 * 所以下面的前缀推断只用在这里，不掺进 anyJs —— 掺进去会让
 * 「markup 用了但哪里都没有规则」的真缺陷被当成 JS 钩子放过。
 *
 * 要挡的是文本扫描原理上看不见的一类：前缀 + 变量拼出来的类名。
 * 真实例子 index.html:1371
 *     dot.className = "subj-dot d-" + r.subject;
 * 字符串字面量里只有 "subj-dot d-"，所以 .d-math / .d-science / .d-coding /
 * .d-kits / .d-video 五条都会被当成死代码；照着删，46 张资源卡的学科色圆点
 * 会集体失色。判据是「某个 JS 字符串以这个 class 的某个前缀结尾，且紧跟 +」，
 * 也就是源码里出现 d-" + 这种形状。 */
const unusedCss = [];
if (!requested.length) {
  const markupAll = new Set();
  for (const page of pages.values()) for (const name of page.markup.keys()) markupAll.add(name);
  /* 收集所有「以 xxx- 结尾并紧跟 + 」的前缀。反向的 + "xxx- 也算。 */
  const concatPrefixes = new Set();
  const collectPrefixes = (src) => {
    for (const hit of src.matchAll(/([\w-]*[\w])-["'`]\s*\+/g)) concatPrefixes.add(`${hit[1]}-`);
    for (const hit of src.matchAll(/\+\s*["'`]([\w-]*[\w])-/g)) concatPrefixes.add(`${hit[1]}-`);
  };
  for (const rel of await sharedJsFiles()) collectPrefixes(await readFile(join(ROOT, rel), 'utf8'));
  for (const rel of allHtml) collectPrefixes(inlineScripts(await readFile(join(ROOT, rel), 'utf8')));
  /* 前缀可能只是完整类名的尾段（"subj-dot d-" 里能取到的是 d-），
     所以对每个候选逐段截短去比。 */
  const builtByConcat = (name) => {
    for (let cut = name.lastIndexOf('-'); cut > 0; cut = name.lastIndexOf('-', cut - 1)) {
      if (concatPrefixes.has(name.slice(0, cut + 1))) return true;
    }
    return false;
  };
  for (const rel of allHtml) {
    for (const name of pages.get(rel).css) {
      if (markupAll.has(name) || anyJs.has(name) || ALLOW.has(name)) continue;
      if (builtByConcat(name)) continue;
      unusedCss.push({ rel, name });
    }
  }
}

console.log(`审计 ${targets.length} 个 HTML、${(await sharedCssFiles()).length} 个共享样式表`);

if (hooks.length) {
  console.log(`\n  · ${hooks.length} 个纯 JS 钩子 class（无样式规则，属正常写法）：`);
  for (const { rel, name } of hooks) console.log(`      ${rel} → .${name}`);
}
if (unusedCss.length) {
  console.log(`\n  · ${unusedCss.length} 条无人使用的局部 CSS class（死代码，建议清理）：`);
  for (const { rel, name } of unusedCss) console.log(`      ${rel} → .${name}`);
}

if (broken.length) {
  console.error(`\n  ✗ ${broken.length} 个 class 在 markup 里使用，但全站既无 CSS 规则也无 JS 引用：`);
  for (const { rel, name, count } of broken) {
    console.error(`      ${rel} → .${name}（用了 ${count} 次）`);
  }
  console.error('\n  这通常是改名后只改了一边。请把 CSS 选择器与 markup 对齐，或删掉多余的 class。');
  process.exit(1);
}
console.log('\n  ✓ markup 里每个 class 都有样式规则或 JS 引用');
