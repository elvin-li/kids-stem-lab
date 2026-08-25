#!/usr/bin/env node
/* 静态对比度门禁：不依赖浏览器。
   pages/design-system.html 里那张对比度表是运行时用 getComputedStyle 算的，
   这台机器没有 Chrome，等于没有任何自动校验。这个脚本把同一套 WCAG 2.1 公式
   搬到 Node 里，直接解析 base.css / kid.css 的 token 块，覆盖两套主题：
     默认浅色（:root）、孩子模式（html[data-mode="kid"]）。
   只看共享层声明的 token —— 页面局部写死的颜色不在范围内（那些是插画用色）。

   原来还有第三套 html[data-theme="dark"]。那套主题是不可达代码（全站没有任何
   HTML 或 JS 设置 data-theme，Progress 的固定偏好里也没有主题项），已从 base.css 删除。
   它被删的一个直接原因就在这个文件里：三套主题一律阻断，于是深色专属的
   --on-accent on --accent-deep = 5.01 长期是全站最紧的几组之一，
   让一套没人看得见的调色板反过来限制浅色主题能选什么颜色。 */

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

/* ---- token 解析：抓出某个选择器块里的 --name: value ---- */
function tokenBlock(css, selector) {
  const start = css.indexOf(selector + ' {');
  if (start < 0) throw new Error(`找不到选择器块：${selector}`);
  const open = css.indexOf('{', start);
  let depth = 0;
  let end = open;
  for (let i = open; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    else if (css[i] === '}') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  const body = css.slice(open + 1, end).replace(/\/\*[\s\S]*?\*\//g, '');
  const out = new Map();
  for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out.set(m[1], m[2].trim());
  return out;
}

/* ---- 颜色解析：#rgb / #rrggbb / var(--x) 链 ---- */
function resolve(theme, value, seen = 0) {
  if (seen > 8) return null;
  const v = String(value).trim();
  const varHit = v.match(/^var\(\s*(--[\w-]+)\s*\)$/);
  if (varHit) {
    const next = theme.get(varHit[1]);
    return next === undefined ? null : resolve(theme, next, seen + 1);
  }
  const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!hex) return null;
  const h = hex[1].length === 3 ? hex[1].split('').map((c) => c + c).join('') : hex[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminance([r, g, b]) {
  const lin = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/* ---- 两套主题：屏幕上真实可达的就这两套 ---- */
const base = read('assets/css/base.css');
const kid = read('assets/css/kid.css');

const light = tokenBlock(base, ':root');
const kidTheme = new Map([...light, ...tokenBlock(kid, 'html[data-mode="kid"]')]);

const themes = [
  ['默认浅色', light],
  ['孩子模式 data-mode="kid"', kidTheme]
];

/* ---- 要检查的组合。阈值按 WCAG 2.1：
       正文 4.5、大字/图形边界 3.0。
       学科色在本站只用于粗标题、徽章、图标描边和边框 —— 按大字 3.0 判；
       正文三档 ink/ink-mid/ink-dim 按 4.5 判。 ---- */
const SURFACES = ['--bg', '--bg-soft', '--surface', '--surface-2'];
const BODY_INK = ['--ink', '--ink-mid', '--ink-dim'];
const SUBJECT = ['--math', '--sci', '--phys', '--code', '--kit', '--video', '--warn', '--danger'];

const failures = [];
const rows = [];
let checked = 0;

for (const [themeName, theme] of themes) {
  const missing = [...SURFACES, ...BODY_INK, ...SUBJECT, '--on-accent', '--accent', '--accent-deep']
    .filter((t) => resolve(theme, theme.get(t)) === null);
  if (missing.length) failures.push(`${themeName}：token 解析失败 ${missing.join(' ')}`);

  for (const bgToken of SURFACES) {
    const bg = resolve(theme, theme.get(bgToken));
    if (!bg) continue;

    for (const [tokens, min, kind] of [[BODY_INK, 4.5, '正文'], [SUBJECT, 3.0, '大字/图形']]) {
      for (const fgToken of tokens) {
        const fg = resolve(theme, theme.get(fgToken));
        if (!fg) continue;
        checked += 1;
        const ratio = contrast(fg, bg);
        rows.push({ themeName, fgToken, bgToken, ratio, min, kind });
        if (ratio < min) {
          failures.push(`${themeName}：${fgToken} on ${bgToken} = ${ratio.toFixed(2)}，${kind}阈值 ${min}`);
        }
      }
    }
  }

  /* 实色按钮：--on-accent 压在 --accent / --accent-deep 上，必须过正文 4.5。 */
  for (const solidToken of ['--accent', '--accent-deep']) {
    const solid = resolve(theme, theme.get(solidToken));
    const onAccent = resolve(theme, theme.get('--on-accent'));
    if (!solid || !onAccent) continue;
    checked += 1;
    const ratio = contrast(onAccent, solid);
    rows.push({ themeName, fgToken: '--on-accent', bgToken: solidToken, ratio, min: 4.5, kind: '按钮文字' });
    if (ratio < 4.5) {
      failures.push(`${themeName}：--on-accent on ${solidToken} = ${ratio.toFixed(2)}，按钮文字阈值 4.5`);
    }
  }
}

console.log(`检查 ${themes.length} 套主题、${checked} 组前景×背景（WCAG 2.1 相对亮度公式）`);

const worst = rows.slice().sort((a, b) => (a.ratio - a.min) - (b.ratio - b.min)).slice(0, 6);
console.log('最接近阈值的 6 组：');
for (const r of worst) {
  const flag = r.ratio < r.min ? '✗' : '✓';
  console.log(`  ${flag} ${r.themeName}  ${r.fgToken} on ${r.bgToken} = ${r.ratio.toFixed(2)}（${r.kind} ≥ ${r.min}，余量 ${(r.ratio - r.min).toFixed(2)}）`);
}

if (failures.length) {
  console.log(`\n✗ ${failures.length} 组不达标：`);
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log(`\n✓ ${themes.length} 套主题的 token 组合全部达标`);
