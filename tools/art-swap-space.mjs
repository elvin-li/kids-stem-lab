/* 一次性改写 nature/space.html 的太阳系图鉴：
 * 把每张卡里「纯色圆 + 几条直线」的星球换成图库里的写实星球，
 * 保留卡片自己的夜空底（.spx-space）和星点（.spx-star）。
 *   node tools/art-swap-space.mjs [--dry]
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ART } from './art-library.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const page = 'nature/space.html';
const dry = process.argv.includes('--dry');
const path = join(ROOT, page);
let html = await readFile(path, 'utf8');

/* 每张卡是 <div class="kid-figure" ... data-spx-art="NAME"> … <svg …>…</svg> … */
const cardRe = /(data-spx-art="([a-z]+)"[\s\S]*?)(<svg viewBox="0 0 120 120" focusable="false">)([\s\S]*?)(<\/svg>)/g;
let changed = 0;
html = html.replace(cardRe, (all, head, name, open, body, close) => {
  if (!(name in ART)) { console.error(`图库缺少 ${name}`); process.exit(1); }
  if (body.includes('#art-')) return all;               /* 已经换过 */
  const stars = (body.match(/<circle class="spx-star"[^/]*\/>/g) || []).join('\n              ');
  changed++;
  return head + open + `
              <rect class="spx-space" x="0" y="0" width="120" height="120" rx="10"/>
              ${stars}
              <use href="#art-${name}"/>
            ` + close;
});

if (!changed) { console.log('没有需要改写的卡片（可能已经换过）'); process.exit(0); }
if (!dry) await writeFile(path, html);
console.log(`${dry ? '（试运行）' : ''}改写 ${changed} 张星球卡 — ${page}`);
