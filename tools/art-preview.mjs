/* 插画预览：把图库渲成一张联系表 PNG，用来肉眼确认「认不认得出」。
 * 只是开发辅助，站点运行不依赖它。
 *   node tools/art-preview.mjs                 # 全部
 *   node tools/art-preview.mjs beetle          # 只看名字里含 beetle 的
 * 输出 tools/tmp-art-preview.png（同时给出 44px 小图和 150px 大图两档）
 */
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ART, VIEWBOX } from './art-library.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const filter = process.argv[2] || '';
/* 逗号分隔时按精确名字取，否则按子串筛。 */
const names = filter.includes(',')
  ? filter.split(',').map((n) => n.trim()).filter((n) => n in ART)
  : Object.keys(ART).filter((n) => n.includes(filter));
if (!names.length) { console.error('没有匹配的图形'); process.exit(1); }

const BIG = 150, SMALL = 44, PAD = 16, LABEL = 18;
const COLS = Math.min(5, names.length);
const CELL_W = BIG + PAD * 2;
const CELL_H = BIG + SMALL + PAD * 3 + LABEL;
const rows = Math.ceil(names.length / COLS);
const W = COLS * CELL_W;
const H = rows * CELL_H;

const cells = names.map((name, i) => {
  const cx = (i % COLS) * CELL_W;
  const cy = Math.floor(i / COLS) * CELL_H;
  return `
  <g transform="translate(${cx},${cy})">
    <rect x="4" y="4" width="${CELL_W - 8}" height="${CELL_H - 8}" rx="10" fill="#fffdf7" stroke="#e2d6bd"/>
    <svg x="${PAD}" y="${PAD}" width="${BIG}" height="${BIG}" viewBox="${VIEWBOX}">${ART[name]}</svg>
    <svg x="${PAD}" y="${PAD + BIG + 6}" width="${SMALL}" height="${SMALL}" viewBox="${VIEWBOX}">${ART[name]}</svg>
    <text x="${PAD + SMALL + 10}" y="${PAD + BIG + 30}" font-family="Helvetica" font-size="12" fill="#4a3a1c">${name}</text>
    <text x="${PAD + SMALL + 10}" y="${PAD + BIG + 46}" font-family="Helvetica" font-size="10" fill="#8a7550">左下=44px 实际图标尺寸</text>
  </g>`;
}).join('');

/* 每个 cell 各自内嵌一份图形，id 会重复。渲染器按文档顺序解析，
   同名 gradient 只会取第一个 —— 对预览来说颜色仍然正确，因为同名即同定义。 */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#f6efdf"/>${cells}</svg>`;

const svgPath = join(ROOT, 'tools', 'tmp-art-preview.svg');
const pngPath = join(ROOT, 'tools', 'tmp-art-preview.png');
writeFileSync(svgPath, svg);
execFileSync('rsvg-convert', ['-o', pngPath, svgPath]);
console.log(`已渲染 ${names.length} 个图形 → tools/tmp-art-preview.png`);
