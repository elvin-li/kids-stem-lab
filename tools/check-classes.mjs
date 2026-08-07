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
  /* 单双引号（单行）和反引号（可跨行，本站用它拼 SVG 字符串）都要看。 */
  const strings = [
    ...[...js.matchAll(/(["'])((?:(?!\1)[^\\\n])*)\1/g)].map((m) => m[2]),
    ...[...js.matchAll(/`((?:[^`\\]|\\[\s\S])*)`/g)].map((m) => m[1])
  ];
  for (const raw of strings) {
    if (!raw || raw.length > 200) continue;
    /* 选择器形式：.foo / .foo.bar / div.foo */
    for (const hit of raw.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) out.add(hit[1]);
    /* 裸 class 列表形式："card collection-card album-card" */
    if (/^[\w][\w\s-]*$/.test(raw)) for (const token of raw.split(/\s+/)) if (token) out.add(token);
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

/* CSS 有规则但没人用：死代码。只在全站模式下报，单页模式噪音太大。 */
const unusedCss = [];
if (!requested.length) {
  const markupAll = new Set();
  for (const page of pages.values()) for (const name of page.markup.keys()) markupAll.add(name);
  for (const rel of allHtml) {
    for (const name of pages.get(rel).css) {
      if (markupAll.has(name) || anyJs.has(name) || ALLOW.has(name)) continue;
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
