/* ARIA 引用与 id 唯一性审计：无依赖，纯静态。
 *
 * 用法：
 *   node tools/check-aria.mjs             # 全站
 *   node tools/check-aria.mjs pages/x.html
 *
 * 本站没有构建步骤，改名或复制模板时 aria-labelledby 很容易指向已经不存在的 id。
 * 这类缺陷在视觉上完全看不出来：屏幕阅读器会退化成读不出名称，而页面照常渲染。
 * 同一页出现重复 id 更糟 —— getElementById 只会拿到第一个，脚本会静默操作错的节点。
 *
 * 报错（exit 1）：
 *   - 同一页出现重复 id。
 *   - aria-labelledby / aria-describedby / aria-controls / aria-owns / for / list
 *     指向本页不存在的 id。
 * 只提示（exit 0）：
 *   - role="img" 的 svg 缺 <title> / aria-label（若整棵子树已 aria-hidden 则不算）。
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const HTML_DIRS = ['.', 'games', 'nature', 'pages'];

/* 指向 id 的属性。aria-activedescendant 本站未用，留着以防以后加。 */
const IDREF_ATTRS = ['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns', 'aria-activedescendant', 'list'];

function rootRel(path) { return relative(ROOT, path).split(sep).join('/'); }

/* 只看 markup：<script> 里的字符串和 <style> 里的选择器都不算。 */
function markupOnly(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ');
}

function attrValues(body, attr) {
  const re = new RegExp(`\\s${attr}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'gi');
  return [...body.matchAll(re)].map((m) => m[1] ?? m[2] ?? '');
}

/* 行号：给出问题所在位置，方便直接跳过去改。 */
function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) if (text[i] === '\n') line++;
  return line;
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

const requested = process.argv.slice(2).map((a) => rootRel(join(ROOT, a)));
const allHtml = await htmlFiles();
const targets = requested.length ? allHtml.filter((f) => requested.includes(f)) : allHtml;
if (requested.length && targets.length !== requested.length) {
  console.error(`✗ 找不到这些页面：${requested.filter((r) => !targets.includes(r)).join(', ')}`);
  process.exit(1);
}

const dupes = [];
const dangling = [];
const unnamedImg = [];
let idTotal = 0;
let refTotal = 0;

for (const rel of targets) {
  const html = await readFile(join(ROOT, rel), 'utf8');
  const body = markupOnly(html);

  /* id 计数（保留首次出现的行号，重复时报第二次的位置更有用）。 */
  const idLines = new Map();
  for (const match of body.matchAll(/\sid\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const id = (match[1] ?? match[2] ?? '').trim();
    if (!id) continue;
    idTotal++;
    if (!idLines.has(id)) idLines.set(id, []);
    idLines.get(id).push(lineOf(body, match.index));
  }
  for (const [id, lines] of idLines) {
    if (lines.length > 1) dupes.push({ rel, id, lines });
  }

  /* IDREF 属性 + label[for]（for 只在 label 上是 idref，其余元素上不是）。 */
  const refs = [];
  for (const attr of IDREF_ATTRS) {
    for (const raw of attrValues(body, attr)) {
      for (const ref of raw.trim().split(/\s+/)) if (ref) refs.push({ attr, ref });
    }
  }
  for (const match of body.matchAll(/<label\b[^>]*?\sfor\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const ref = (match[1] ?? match[2] ?? '').trim();
    if (ref) refs.push({ attr: 'label[for]', ref });
  }
  for (const { attr, ref } of refs) {
    refTotal++;
    if (!idLines.has(ref)) dangling.push({ rel, attr, ref });
  }

  /* role="img" 的 svg 应该有可访问名；祖先 aria-hidden 的装饰图不算。 */
  for (const match of body.matchAll(/<svg\b([^>]*)>([\s\S]*?)<\/svg\s*>/gi)) {
    const attrs = match[1];
    const inner = match[2];
    if (!/\brole\s*=\s*["']img["']/i.test(attrs)) continue;
    if (/\baria-hidden\s*=\s*["']true["']/i.test(attrs)) continue;
    if (/\baria-label(?:ledby)?\s*=/i.test(attrs)) continue;
    if (/<title\b/i.test(inner)) continue;
    /* 祖先是否已整体隐藏：往前找最近的 aria-hidden="true" 开标签，
       粗略但足够 —— 本站装饰图都写在 aria-hidden 的直接父节点里。 */
    const before = body.slice(0, match.index);
    const lastHidden = before.lastIndexOf('aria-hidden="true"');
    const hiddenNearby = lastHidden !== -1 && before.slice(lastHidden).split('<').length <= 3;
    if (hiddenNearby) continue;
    unnamedImg.push({ rel, line: lineOf(body, match.index) });
  }
}

console.log(`审计 ${targets.length} 个 HTML：${idTotal} 个 id、${refTotal} 处 id 引用`);

if (unnamedImg.length) {
  console.log(`\n  · ${unnamedImg.length} 个 role="img" 的 svg 没有可访问名（建议加 <title> 或改 aria-hidden）：`);
  for (const { rel, line } of unnamedImg) console.log(`      ${rel}:${line}`);
}

let failed = false;
if (dupes.length) {
  failed = true;
  console.error(`\n  ✗ ${dupes.length} 个重复 id（getElementById 只会拿到第一个）：`);
  for (const { rel, id, lines } of dupes) console.error(`      ${rel} → id="${id}"（行 ${lines.join('、')}）`);
}
if (dangling.length) {
  failed = true;
  console.error(`\n  ✗ ${dangling.length} 处 id 引用指向本页不存在的 id：`);
  for (const { rel, attr, ref } of dangling) console.error(`      ${rel} → ${attr}="${ref}"`);
  console.error('\n  屏幕阅读器会读不出名称，但页面看起来完全正常。请对齐 id 或删掉引用。');
}
if (failed) process.exit(1);
console.log('\n  ✓ id 唯一，且所有 aria/label 引用都能落到本页节点上');
