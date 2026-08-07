/* 渲染层静态审计：专抓「页面显示不对」这一类缺陷。无依赖，纯静态。
 *
 *   node tools/check-render.mjs            # 全站
 *   node tools/check-render.mjs games/x.html
 *
 * 现有门禁管的是契约、类名、对比度、标题层级和 rAF。这个脚本补的是
 * 「浏览器会静默吞掉、但孩子一眼就看得出不对」的那一类问题：
 *
 *   1. 未定义 CSS 变量        var(--x) 里 --x 没人定义又没写回退值 →
 *                             整条声明在计算值阶段失效，元素退回默认外观。
 *   2. 容器标签不闭合/错嵌套  少一个 </div> 会把后面整块内容吸进上一个容器，
 *                             布局整体错位。这是最严重的一类显示错误。
 *   3. 同元素重复属性         class 写了两次，浏览器只认第一个，第二组样式静默丢失。
 *   4. 站内链接与锚点         href 指向不存在的文件或本页不存在的 id → 点了没反应／404。
 *   5. 本地资源引用           img src、CSS url() 指向磁盘上不存在的文件 → 碎图标。
 *   6. SVG <use> 目标         href="#x" 找不到对应 id → 图形整块不显示。
 *   7. img 缺 alt             加载失败时没有替代文字，且读屏念不出来。
 *   8. CSS 大括号平衡         多一个 } 会让后面的规则全部被丢弃。
 *   9. SVG 尺寸               既无 viewBox 又无 width/height 的内联 svg 容易塌成 0 高。
 */
import { readFile, readdir, access } from 'node:fs/promises';
import { join, dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const HTML_DIRS = ['.', 'games', 'nature', 'pages'];
const SHARED_CSS = ['assets/css/base.css', 'assets/css/kid.css', 'assets/css/print.css'];

/* HTML 空元素：没有闭合标签，不进嵌套栈。 */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
  'meta', 'param', 'source', 'track', 'wbr']);

/* 只对「必须显式闭合、少一个就会毁掉布局」的容器做嵌套校验。
   p / li / td / option 这类允许省略闭合标签，不参与，避免误报。 */
const STRICT = new Set(['html', 'head', 'body', 'div', 'section', 'main', 'header', 'footer',
  'nav', 'article', 'aside', 'ul', 'ol', 'table', 'form', 'button', 'label', 'select',
  'fieldset', 'details', 'summary', 'figure', 'figcaption', 'svg', 'g', 'defs',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'textarea', 'canvas', 'template']);

const errors = [];
const warns = [];
function err(rel, msg) { errors.push(`${rel}: ${msg}`); }
function warn(rel, msg) { warns.push(`${rel}: ${msg}`); }

function lineOf(text, index) { return text.slice(0, index).split('\n').length; }

/* ---------- 通用切分 ---------- */

function stripComments(html) {
  /* 注释内容整体换成等长空白，保持字符偏移不变，行号才准。 */
  return html.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
}

function blankOut(html, tag) {
  const re = new RegExp(`(<${tag}\\b[^>]*>)([\\s\\S]*?)(</${tag}\\s*>)`, 'gi');
  return html.replace(re, (m, open, body, close) =>
    open + body.replace(/[^\n]/g, ' ') + close);
}

function styleBlocks(html) {
  return [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)];
}

function inlineScriptText(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
    .filter((m) => !/\bsrc\s*=/i.test(m[1])).map((m) => m[2]).join('\n');
}

/* ---------- 1. CSS 变量 ---------- */

function definedVars(css) {
  const out = new Set();
  for (const m of css.matchAll(/(--[\w-]+)\s*:/g)) out.add(m[1]);
  return out;
}

/* var(--x) 且括号内没有逗号回退。手写扫描以正确处理嵌套括号。 */
function varsWithoutFallback(css) {
  const out = [];
  const re = /var\(\s*(--[\w-]+)/g;
  let m;
  while ((m = re.exec(css))) {
    let depth = 1;
    let i = re.lastIndex;
    let hasFallback = false;
    while (i < css.length && depth > 0) {
      const ch = css[i];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 1) { hasFallback = true; break; }
      i++;
    }
    if (!hasFallback) out.push({ name: m[1], index: m.index });
  }
  return out;
}

/* ---------- 2/3/6/7/9 标签级检查 ---------- */

function tagScan(rel, html) {
  /* 去掉注释、script 与 style 内容，避免 JS 字符串里的 "<div>" 进入嵌套栈。 */
  let doc = stripComments(html);
  doc = blankOut(doc, 'script');
  doc = blankOut(doc, 'style');

  const stack = [];
  const ids = new Set();
  const useRefs = [];
  const tagRe = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
  let m;
  while ((m = tagRe.exec(doc))) {
    const [full, slash, rawName, attrs, selfClose] = m;
    const name = rawName.toLowerCase();
    const line = lineOf(doc, m.index);

    if (!slash) {
      /* --- 3. 重复属性 --- */
      const seen = new Map();
      for (const a of attrs.matchAll(/(^|\s)([a-zA-Z_:][\w:.-]*)\s*=/g)) {
        const key = a[2].toLowerCase();
        seen.set(key, (seen.get(key) || 0) + 1);
      }
      for (const [key, n] of seen) {
        if (n > 1) {
          err(rel, `行 ${line} <${name}> 上 ${key} 属性出现 ${n} 次，浏览器只认第一个，其余静默失效`);
        }
      }

      const idAttr = attrs.match(/\sid\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
      if (idAttr) ids.add(idAttr[1] ?? idAttr[2]);

      /* --- 6. SVG <use> --- */
      if (name === 'use') {
        const href = attrs.match(/\s(?:xlink:href|href)\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
        const val = href ? (href[1] ?? href[2]) : '';
        if (val.startsWith('#')) useRefs.push({ id: val.slice(1), line });
      }

      /* --- 7. img alt --- */
      if (name === 'img' && !/\salt\s*=/i.test(attrs)) {
        err(rel, `行 ${line} <img> 缺 alt：加载失败时既没有替代文字，读屏也念不出来`);
      }

      /* --- 9. svg 尺寸 --- */
      if (name === 'svg') {
        const hasBox = /\sviewBox\s*=/i.test(attrs);
        const hasW = /\swidth\s*=/i.test(attrs);
        const hasH = /\sheight\s*=/i.test(attrs);
        if (!hasBox && !(hasW && hasH)) {
          warn(rel, `行 ${line} <svg> 既无 viewBox 也无 width+height，容易塌成 0 高`);
        }
      }

      if (!VOID.has(name) && !selfClose && STRICT.has(name)) stack.push({ name, line });
    } else if (STRICT.has(name)) {
      /* --- 2. 闭合与嵌套 --- */
      if (!stack.length) {
        err(rel, `行 ${line} 多出一个 </${name}>，前面没有对应的开标签`);
      } else if (stack[stack.length - 1].name === name) {
        stack.pop();
      } else {
        const at = [...stack].reverse().findIndex((t) => t.name === name);
        if (at < 0) {
          err(rel, `行 ${line} 多出一个 </${name}>，前面没有对应的开标签`);
        } else {
          const unclosed = stack.splice(stack.length - 1 - at)
            .filter((t) => t.name !== name)
            .map((t) => `<${t.name}>(行 ${t.line})`);
          err(rel, `行 ${line} </${name}> 之前有未闭合的容器：${unclosed.join('、')}` +
            ` —— 后面的内容会被吸进上一个容器，整块布局错位`);
        }
      }
    }
  }
  for (const t of stack) {
    err(rel, `<${t.name}>(行 ${t.line}) 一直没有闭合 —— 缺 </${t.name}>`);
  }

  for (const { id, line } of useRefs) {
    if (!ids.has(id)) {
      err(rel, `行 ${line} <use href="#${id}"> 在本页找不到这个 id，图形整块不会显示`);
    }
  }
  return ids;
}

/* ---------- 4/5 引用检查 ---------- */

const existsCache = new Map();
async function fileExists(abs) {
  if (existsCache.has(abs)) return existsCache.get(abs);
  let ok = true;
  try { await access(abs); } catch { ok = false; }
  existsCache.set(abs, ok);
  return ok;
}

async function refScan(rel, html, ids, pageIds) {
  const doc = blankOut(blankOut(stripComments(html), 'script'), 'style');
  const dir = dirname(join(ROOT, rel));

  /* --- 4. href --- */
  for (const m of doc.matchAll(/\shref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const raw = (m[1] ?? m[2] ?? '').trim();
    const line = lineOf(doc, m.index);
    if (!raw || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(raw)) continue;
    if (raw.startsWith('/')) {
      err(rel, `行 ${line} href="${raw}" 用了根路径，file:// 下会指到磁盘根目录`);
      continue;
    }
    if (raw.startsWith('#')) {
      const anchor = decodeURIComponent(raw.slice(1));
      if (anchor && !ids.has(anchor)) {
        err(rel, `行 ${line} href="${raw}" 指向本页不存在的 id，点了不会跳转`);
      }
      continue;
    }
    const [pathWithQuery, hash] = raw.split('#');
    /* 查询串在 file:// 下也会被当成路径的一部分丢掉，但站内链接普遍用 ?v= 做缓存戳、
       用 ?kind= 传筛选参数，这是正常写法：只校验去掉查询串后的真实文件。 */
    const path = pathWithQuery.split('?')[0];
    if (!path) continue;
    const abs = resolve(dir, decodeURIComponent(path));
    if (!(await fileExists(abs))) {
      err(rel, `行 ${line} href="${raw}" 指向的文件不存在：${relative(ROOT, abs).split(sep).join('/')}`);
      continue;
    }
    if (hash) {
      const target = relative(ROOT, abs).split(sep).join('/');
      const targetIds = pageIds.get(target);
      if (targetIds && !targetIds.has(decodeURIComponent(hash))) {
        err(rel, `行 ${line} href="${raw}" 的锚点在目标页里不存在`);
      }
    }
  }

  /* --- 5. src / CSS url() --- */
  for (const m of doc.matchAll(/\ssrc\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const raw = (m[1] ?? m[2] ?? '').trim();
    const line = lineOf(doc, m.index);
    if (!raw || /^(https?:|data:|blob:)/i.test(raw)) continue;
    if (raw.startsWith('/')) {
      err(rel, `行 ${line} src="${raw}" 用了根路径，file:// 下取不到`);
      continue;
    }
    if (!(await fileExists(resolve(dir, decodeURIComponent(raw.split('?')[0]))))) {
      err(rel, `行 ${line} src="${raw}" 指向的文件不存在`);
    }
  }
  for (const m of doc.matchAll(/<link\b[^>]*\srel\s*=\s*(?:"|')?(?:manifest|icon|apple-touch-icon)/gi)) {
    const tag = doc.slice(m.index, doc.indexOf('>', m.index) + 1);
    const href = tag.match(/\shref\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    const raw = href ? (href[1] ?? href[2]).trim() : '';
    if (!raw || /^(https?:|data:)/i.test(raw)) continue;
    if (!(await fileExists(resolve(dir, decodeURIComponent(raw.split('?')[0]))))) {
      err(rel, `行 ${lineOf(doc, m.index)} <link> href="${raw}" 指向的文件不存在`);
    }
  }
}

async function urlScan(rel, css, baseDir, offsetText) {
  for (const m of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"]*))\s*\)/gi)) {
    const raw = (m[1] ?? m[2] ?? m[3] ?? '').trim();
    if (!raw || /^(https?:|data:|#)/i.test(raw)) continue;
    if (raw.startsWith('/')) { err(rel, `CSS url(${raw}) 用了根路径`); continue; }
    if (!(await fileExists(resolve(baseDir, decodeURIComponent(raw.split('?')[0]))))) {
      err(rel, `CSS url(${raw}) 指向的文件不存在`);
    }
  }
}

/* ---------- 8. 大括号平衡 ---------- */

function braceBalance(rel, label, css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/'(?:\\.|[^'\\])*'/g, "''");
  let depth = 0;
  for (let i = 0; i < clean.length; i++) {
    if (clean[i] === '{') depth++;
    else if (clean[i] === '}') {
      depth--;
      if (depth < 0) {
        err(rel, `${label} 第 ${lineOf(clean, i)} 行多出一个 }，后面的规则会被整段丢弃`);
        return;
      }
    }
  }
  if (depth > 0) err(rel, `${label} 少 ${depth} 个 }，最后的规则不会生效`);
}

/* ---------- 主流程 ---------- */

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

const allHtml = await htmlFiles();
const requested = process.argv.slice(2).map((a) => relative(ROOT, join(ROOT, a)).split(sep).join('/'));
const targets = requested.length ? allHtml.filter((f) => requested.includes(f)) : allHtml;
if (requested.length && targets.length !== requested.length) {
  console.error(`✗ 找不到这些页面：${requested.filter((r) => !targets.includes(r)).join(', ')}`);
  process.exit(1);
}

/* 共享层变量 + 大括号 + url() */
let sharedCss = '';
for (const rel of SHARED_CSS) {
  const css = await readFile(join(ROOT, rel), 'utf8');
  sharedCss += css + '\n';
  braceBalance(rel, '样式表', css);
  await urlScan(rel, css, join(ROOT, 'assets/css'));
}
const sharedVars = definedVars(sharedCss);

/* 共享 JS 在运行时写的自定义属性（--i 给纸屑错帧、--fill 给进度条）也算已定义。 */
const sharedRuntimeVars = new Set();
for (const rel of ['assets/js/playful.js', 'assets/js/progress.js', 'assets/js/pwa.js']) {
  const js = await readFile(join(ROOT, rel), 'utf8');
  for (const m of js.matchAll(/setProperty\(\s*["'](--[\w-]+)["']/g)) sharedRuntimeVars.add(m[1]);
}

/* 先收集每页 id，供跨页锚点校验 */
const pageIds = new Map();
const pageHtml = new Map();
for (const rel of allHtml) {
  const html = await readFile(join(ROOT, rel), 'utf8');
  pageHtml.set(rel, html);
  const doc = blankOut(blankOut(stripComments(html), 'script'), 'style');
  const ids = new Set();
  for (const m of doc.matchAll(/\sid\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) ids.add(m[1] ?? m[2]);
  pageIds.set(rel, ids);
}

let varMiss = 0;
for (const rel of targets) {
  const html = pageHtml.get(rel);
  const ids = tagScan(rel, html);
  await refScan(rel, html, pageIds.get(rel) ?? ids, pageIds);

  /* 本页 <style> 与 style 属性。记录每块在文件里的起始偏移，
     报错行号才能直接对上编辑器里的行，而不是块内相对行。 */
  const blocks = styleBlocks(html).map((m) => ({
    css: m[1],
    offset: m.index + m[0].indexOf(m[1])
  }));
  const localCss = blocks.map((b) => b.css).join('\n');
  for (const b of blocks) braceBalance(rel, '内联 <style>', b.css);
  await urlScan(rel, localCss, dirname(join(ROOT, rel)));

  /* 变量：共享层 + 本页任何位置定义的（含 style 属性里的自定义属性） */
  const local = new Set([...sharedVars, ...sharedRuntimeVars]);
  for (const v of definedVars(html)) local.add(v);
  /* JS 里 setProperty("--x", ...) 也算定义 */
  const js = inlineScriptText(html);
  for (const m of js.matchAll(/setProperty\(\s*["'](--[\w-]+)["']/g)) local.add(m[1]);

  const seenMissing = new Set();
  /* fileOffset：text 在整个 HTML 里的起始位置，用来换算真实行号。 */
  const check = (text, label, fileOffset) => {
    for (const { name, index } of varsWithoutFallback(text)) {
      if (local.has(name) || seenMissing.has(name)) continue;
      seenMissing.add(name);
      varMiss++;
      err(rel, `行 ${lineOf(html, fileOffset + index)} ${label} 用了未定义的 var(${name})` +
        ` 且没有回退值，整条声明会在计算值阶段失效`);
    }
  };
  for (const b of blocks) check(b.css, '内联 <style>', b.offset);
  for (const m of html.matchAll(/\sstyle\s*=\s*"([^"]*)"/g)) {
    check(m[1], '内联 style 属性', m.index + m[0].indexOf(m[1]));
  }
}

/* 共享层自身的变量引用。共享层允许消费「由页面在元素 style 属性上设置」的变量
   （本站用 style="--i:3" 给动画错帧），所以判定要带上全站 HTML 里定义过的名字。 */
{
  const seen = new Set();
  const anyDefined = new Set(sharedVars);
  for (const html of pageHtml.values()) {
    for (const v of definedVars(html)) anyDefined.add(v);
  }
  for (const v of sharedRuntimeVars) anyDefined.add(v);
  for (const { name, index } of varsWithoutFallback(sharedCss)) {
    if (anyDefined.has(name) || seen.has(name)) continue;
    seen.add(name);
    varMiss++;
    err('assets/css', `共享层用了未定义的 var(${name}) 且没有回退值（合并后第 ${lineOf(sharedCss, index)} 行）`);
  }
}

console.log(`渲染审计：${targets.length} 个 HTML、${SHARED_CSS.length} 个共享样式表、${sharedVars.size} 个 CSS 变量`);
if (warns.length) {
  console.log(`\n  · ${warns.length} 条提示（不阻断）：`);
  for (const w of warns) console.log(`      ${w}`);
}
if (errors.length) {
  console.error(`\n  ✗ ${errors.length} 处渲染缺陷：`);
  for (const e of errors) console.error(`      ${e}`);
  process.exit(1);
}
console.log('\n  ✓ 标签闭合、属性、站内引用、CSS 变量与大括号都没问题');
