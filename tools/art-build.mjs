/* 把 tools/art-library.mjs 里的图形注入到各页面。
 *
 *   node tools/art-build.mjs            # 全站同步
 *   node tools/art-build.mjs --check    # 只检查是否已同步（可进门禁）
 *   node tools/art-build.mjs nature/beetles.html
 *
 * 工作方式：扫描页面里出现的 href="#art-xxx"（markup 与内联 JS 字符串都算），
 * 只把用到的 <symbol> 写进该页 <!-- ART:START --> / <!-- ART:END --> 之间。
 * 没有标记但用到了图形时，自动插到 <body> 开标签之后。
 * 一个引用都没有时，把整块删掉，页面不留死重量。
 *
 * 为什么不做成共享 SVG 文件：file:// 下 <use href="other.svg#id"> 会被当跨源拒绝，
 * 图形必须与使用点在同一份文档里。这个脚本就是「同一份文档」的维护手段。
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ART, VIEWBOX } from './art-library.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const HTML_DIRS = ['.', 'games', 'nature', 'pages'];
const START = '<!-- ART:START 插画图库由 tools/art-build.mjs 生成，请改 tools/art-library.mjs -->';
const END = '<!-- ART:END -->';

function rootRel(path) { return relative(ROOT, path).split(sep).join('/'); }

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

/* 去掉已生成的图库块再找引用，否则 <symbol id="art-x"> 自己会被算成一次引用。 */
function stripSprite(html) {
  const from = html.indexOf(START);
  if (from < 0) return html;
  const to = html.indexOf(END, from);
  if (to < 0) return html;
  return html.slice(0, from) + html.slice(to + END.length);
}

function usedNames(html) {
  const body = stripSprite(html);
  const found = new Set();
  for (const m of body.matchAll(/["']#art-([a-z0-9-]+)["']/g)) found.add(m[1]);
  return [...found].sort();
}

function buildSprite(names, indent = '') {
  const symbols = names.map((name) =>
    `${indent}  <symbol id="art-${name}" viewBox="${VIEWBOX}">${ART[name].replace(/\n\s*/g, '\n    ').trimEnd()}\n${indent}  </symbol>`
  ).join('\n');
  return `${indent}${START}\n${indent}<svg class="art-sprite" aria-hidden="true" focusable="false" width="0" height="0" viewBox="0 0 0 0">\n${symbols}\n${indent}</svg>\n${indent}${END}`;
}

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const requested = args.filter((a) => !a.startsWith('--')).map((a) => rootRel(join(ROOT, a)));
const all = await htmlFiles();
const targets = requested.length ? all.filter((f) => requested.includes(f)) : all;
if (requested.length && targets.length !== requested.length) {
  console.error(`✗ 找不到这些页面：${requested.filter((r) => !targets.includes(r)).join(', ')}`);
  process.exit(1);
}

const missing = [];
const stale = [];
let changed = 0;
let totalSymbols = 0;

for (const rel of targets) {
  const path = join(ROOT, rel);
  const html = await readFile(path, 'utf8');
  const names = usedNames(html);
  for (const name of names) if (!(name in ART)) missing.push(`${rel} → #art-${name}`);
  const known = names.filter((name) => name in ART);
  totalSymbols += known.length;

  const hasBlock = html.includes(START);
  let next;
  if (!known.length) {
    if (!hasBlock) continue;
    next = html.replace(new RegExp(`\\n?[ \\t]*${START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END}\\n?`), '\n');
  } else if (hasBlock) {
    const from = html.indexOf(START);
    const to = html.indexOf(END, from) + END.length;
    const lineStart = html.lastIndexOf('\n', from) + 1;
    const indent = html.slice(lineStart, from);
    next = html.slice(0, from) + buildSprite(known, indent).slice(indent.length) + html.slice(to);
  } else {
    const bodyOpen = html.match(/<body\b[^>]*>/i);
    if (!bodyOpen) { missing.push(`${rel} → 没有 <body> 开标签，无法插入图库`); continue; }
    const at = bodyOpen.index + bodyOpen[0].length;
    next = html.slice(0, at) + '\n' + buildSprite(known) + html.slice(at);
  }

  if (next === html) continue;
  if (checkOnly) { stale.push(rel); continue; }
  await writeFile(path, next);
  changed++;
  console.log(`  ✓ ${rel} — ${known.length} 个图形`);
}

if (missing.length) {
  console.error('\n  ✗ 引用了图库里不存在的图形：');
  for (const line of missing) console.error(`      ${line}`);
  process.exit(1);
}
if (checkOnly) {
  if (stale.length) {
    console.error(`\n  ✗ ${stale.length} 个页面的插画图库与 tools/art-library.mjs 不一致，请跑 node tools/art-build.mjs：`);
    for (const rel of stale) console.error(`      ${rel}`);
    process.exit(1);
  }
  console.log(`插画图库检查：${targets.length} 个页面、共 ${totalSymbols} 处图形引用，全部同步`);
} else {
  console.log(`\n插画图库：更新 ${changed} 个页面、共 ${totalSymbols} 处图形引用（图库共 ${Object.keys(ART).length} 个图形）`);
}
