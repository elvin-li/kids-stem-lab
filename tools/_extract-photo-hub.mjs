/* 把 nature/index.html 内联的 PHOTO_HUB 与 mode() 超长正则抽到 data/photo-hub.js。
 *
 *   node tools/_extract-photo-hub.mjs --dry
 *   node tools/_extract-photo-hub.mjs
 *
 * 抽出后用 EXPLORATIONS 里每条自然专题核对：新旧 mode() 对「公开数据 / 本地观察」
 * 的判定必须逐条一致，不一致就中止、不改文件。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const dry = process.argv.includes('--dry');
const VERSION = '412';

function extractBalanced(src, needle) {
  const start = src.indexOf(needle);
  if (start < 0) throw new Error(`找不到 ${needle}`);
  const objStart = src.indexOf('{', start);
  if (objStart < 0) throw new Error(`${needle} 后面没有 {`);
  let depth = 0;
  for (let i = objStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return { start, end: i + 1, text: src.slice(objStart, i + 1) };
    }
  }
  throw new Error(`${needle} 对象未闭合`);
}

const indexPath = join(ROOT, 'nature/index.html');
let html = await readFile(indexPath, 'utf8');

const hub = extractBalanced(html, 'var PHOTO_HUB=');
const PHOTO_HUB = runInNewContext(`(${hub.text})`);
const keys = Object.keys(PHOTO_HUB);
if (keys.length < 600) throw new Error(`PHOTO_HUB 只有 ${keys.length} 键，像是截断了`);

const modeMatch = html.match(/function mode\(x\)\{return \/([^/]+)\/\.test\(x\.id\)\?"offline":"live";\}/);
if (!modeMatch) throw new Error('找不到 mode() 超长正则');
const slugs = modeMatch[1].split('|');
if (slugs.length < 600) throw new Error(`本地观察 slug 只有 ${slugs.length} 个，像是截断了`);

const explSrc = await readFile(join(ROOT, 'data/explorations.js'), 'utf8');
const sandbox = { window: {} };
runInNewContext(explSrc, sandbox, { filename: 'data/explorations.js' });
const items = (sandbox.window.EXPLORATIONS || []).filter((x) => x.type === 'nature');
const oldRe = new RegExp(modeMatch[1]);
const newRe = new RegExp(slugs.join('|'));
const mismatches = [];
for (const x of items) {
  const oldMode = oldRe.test(x.id) ? 'offline' : 'live';
  const nextMode = newRe.test(x.id) ? 'offline' : 'live';
  if (oldMode !== nextMode) mismatches.push(`${x.id}: ${oldMode} → ${nextMode}`);
}
if (mismatches.length) {
  console.error('mode() 新旧判定不一致：');
  for (const line of mismatches.slice(0, 20)) console.error('  ' + line);
  process.exit(1);
}

const js = `/* 探索总览真图对照，以及「本地观察为主」专题 slug。
   classic script，暴露 window.PHOTO_HUB 与 window.NATURE_LOCAL_SLUGS。
   nature/index.html 故意不加载已删除的 assets/art-hub.svg。 */
(function () {
  "use strict";
  window.PHOTO_HUB = ${JSON.stringify(PHOTO_HUB)};
  window.NATURE_LOCAL_SLUGS = ${JSON.stringify(slugs)};
})();
`;

const assignment = html.slice(hub.start, html.indexOf(';', hub.end) + 1);
if (!assignment.startsWith('var PHOTO_HUB=')) throw new Error('PHOTO_HUB 赋值切片异常');

let next = html;
if (!next.includes('data/photo-hub.js')) {
  next = next.replace(
    /(<script src="\.\.\/assets\/js\/playful\.js\?v=\d+"><\/script>)/,
    `$1<script src="../data/photo-hub.js?v=${VERSION}"></script>`
  );
  if (!next.includes('data/photo-hub.js')) throw new Error('没能插入 photo-hub.js 的 script 标签');
}
next = next.replace(assignment, 'var PHOTO_HUB=window.PHOTO_HUB||{};');
next = next.replace(
  modeMatch[0],
  'var localRe=(function(){var slugs=window.NATURE_LOCAL_SLUGS||[];return slugs.length?new RegExp(slugs.join("|")):/$^/;})();function mode(x){return localRe.test(x.id)?"offline":"live";}'
);
next = next.replace(
  '/* 总览页不拉 assets/art-hub.svg：整库约 1.4MB，解析会卡住首屏。有实物照片走 PHOTO_HUB；其余用本页轻量场景。 */',
  '/* 总览页不拉图库 SVG。有实物照片走 data/photo-hub.js 的 PHOTO_HUB；其余用本页轻量场景。 */'
);

if (dry) {
  console.log(`[dry] PHOTO_HUB ${keys.length} 键，本地观察 slug ${slugs.length} 个，自然专题 ${items.length} 条 mode() 一致`);
  console.log(`[dry] photo-hub.js ${js.length} 字节；index 将少 ${html.length - next.length} 字节`);
} else {
  await writeFile(join(ROOT, 'data/photo-hub.js'), js, 'utf8');
  await writeFile(indexPath, next, 'utf8');
  console.log(`PHOTO_HUB ${keys.length} 键，本地观察 slug ${slugs.length} 个，自然专题 ${items.length} 条 mode() 一致`);
  console.log(`已写 data/photo-hub.js（${js.length} 字节），nature/index.html ${html.length} → ${next.length}`);
}
