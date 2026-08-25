/* 主题一致性审计：抓「浅色主题下残留的暗色主题写法」。无依赖，纯静态。
 *
 *   node tools/check-theme.mjs             # 全站
 *   node tools/check-theme.mjs nature/x.html
 *
 * 为什么需要它：check-contrast.mjs 只算两套主题的 token × token 组合，
 * 页面 <style> 里硬编码的颜色字面量它一个都看不到。本站屏幕上只有浅色主题
 * （另有 kid.css 的 html[data-mode="kid"] 童趣调色板），但页面里还留着一批
 * 当年为暗底写的字面量——那套 html[data-theme="dark"] 主题已因不可达而删除，
 * 为它写的颜色却留在各页 <style> 里。它们在浅底上会变成：
 *
 *   A. 深底 + 深字   同一条规则里既写了深色背景又写了深色文字，或者
 *                    深色背景的容器让子元素继承 --ink（深色）→ 几乎不可读。
 *   B. 深色色块      浅色页面中间突然出现一块近黑的板子，且没有配浅色文字。
 *   C. 隐形描边      rgba(238,242,255,.18) 这类近白低透明度描边，在白卡上看不见。
 *
 * 判定用 WCAG 2.1 相对亮度，背景按 alpha 合成到浅色主题的 --bg 之上。
 * 有意为之的深色舞台（影子剧场、夜空画布）写进 ALLOW 并注明理由。
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const HTML_DIRS = ['.', 'games', 'nature', 'pages'];

/* 有意为之的深色区域：key 是 `页面 选择器`，value 是理由。
   这些地方深色是内容的一部分，不是主题残留。 */
const ALLOW = new Map([
  /* ---- 影子剧场：暗房才看得见影子 ---- */
  ['games/light-and-shadow.html .stage-curtain',
    '影子剧场：幕布本身必须是暗的，孩子才看得见光斑和影子'],
  ['games/light-and-shadow.html .stage-curtain.kid-visual-stage',
    '同上，孩子模式下的同一块幕布'],
  ['games/light-and-shadow.html .theater-hero',
    '剧场台口：深色幕布是内容语义，文字已显式改为奶油色（见 .theater-hero color）'],
  ['games/light-and-shadow.html #scene',
    '影子画布：光斑与影子画在深色幕布上，画布内取色自成一套'],
  ['games/light-and-shadow.html .light-path',
    '「灯→物→影」链条图：深色小舞台，文字已显式改为 #ffe9a8'],

  /* ---- 画布类：深色是内容语义，SVG/Canvas 内部自带浅色取色 ---- */
  ['games/gravity-drop.html .canvas-shell',
    '夜空画布：落体轨迹画在深色天幕上，画布内取色自成一套'],
  ['games/wave-maker.html #scene',
    '夜航画布：波形画在深色海面上，画布内取色自成一套'],

  /* ---- 太空站：夜空是内容语义，页面里已注明「.solar 恒为深色夜空底，
         因此用固定亮色，不跟随主题的深色墨水变量」 ---- */
  /* 原来这里还有 nature/space.html .space-scene 与 .size-compare 两条豁免，
     它们对应的 CSS 规则已随死代码清理删除（两个 class 在 markup 和 JS 里都不剩，
     运行时零命中），豁免跟着失效——本工具会把匹配不到规则的 ALLOW 条目报出来提醒清理，
     就是靠那个提示发现的。 */
  ['nature/space.html .space-stage .solar',
    '太阳系轨道台：.planet .nm 用固定亮色 #cbdaf6，.sun-label 用 #ffd979'],
  ['nature/space.html .scale-visual svg',
    '比例示意图：SVG 内部自带浅色描边与浅色 <text>'],

  /* ---- 深海下潜：越深越暗是内容语义 ---- */
  ['nature/ocean.html .ocean-story',
    '下潜插画：从天蓝渐到 #07142e 深渊，图内角色是内联 SVG，标签自带浅色'],
  ['nature/ocean.html .light-svg',
    '光穿透深度图：深蓝底 + 浅色刻度线与浅色 <text>'],
  ['nature/ocean.html .oc-lift-stage',
    '深海举重舞台：深色是内容语义，台内文字自带浅色'],

  /* ---- 地球/地震示意图：深蓝底 + 浅色描边与浅色 <text> ---- */
  ['nature/earth.html .plate-viz, .wave-viz, #triMap',
    '板块与地震波示意图：SVG 内部用浅色描边和 fill="#fff"/#dbe6ff 的 <text>'],
  ['nature/earth.html .viz-svg',
    '台站定位示意图：父级 <g fill="#e6eefc"> 提供浅色文字'],
  ['nature/earth.html .strata-mini',
    '地层小图：SVG 内部自带浅色描边'],
  ['nature/earth.html .eq-stage',
    '抗震测试舞台：SVG 内部自带浅色取色'],
  ['nature/earth.html .eq-quiz-art',
    '抗震小测插图：SVG 内部自带浅色取色']
]);

/* 浅色主题（base.css :root）的 token。运行时从文件解析，避免和样式表脱节。
   块的结尾用花括号配对找，不要用「下一条已知规则的选择器」当分界：
   原来这里写的是 css.indexOf('html[data-theme="dark"]')，那条深色主题规则删掉之后
   indexOf 返回 -1，就会退回 css.length，把 base.css 从 :root 到文件末尾**全部**
   当成 token 块解析——底下所有组件规则里的自定义属性都会被当成主题 token，
   静默污染整张表。配对花括号只依赖 CSS 自身结构，删改后面的规则都不会影响它。 */
async function lightTokens() {
  const css = await readFile(join(ROOT, 'assets/css/base.css'), 'utf8');
  const start = css.indexOf(':root');
  if (start < 0) throw new Error('base.css 里找不到 :root 块');
  const open = css.indexOf('{', start);
  if (open < 0) throw new Error('base.css 的 :root 后面找不到 {');
  let depth = 0;
  let end = -1;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end < 0) throw new Error('base.css 的 :root 块大括号不闭合');
  const block = css.slice(open, end + 1);
  const out = new Map();
  for (const m of block.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)[;}]/g)) {
    out.set(m[1], m[2].trim());
  }
  return out;
}
const TOKENS = await lightTokens();

/* ---------- 颜色解析 ---------- */

const NAMED = new Map([
  ['white', [255, 255, 255, 1]], ['black', [0, 0, 0, 1]],
  ['transparent', [0, 0, 0, 0]], ['red', [255, 0, 0, 1]],
  ['gold', [255, 215, 0, 1]]
]);

/* 把 var(--x) 递归展开成字面量。depth 防环。 */
function expandVars(value, depth = 0) {
  if (depth > 8 || !value.includes('var(')) return value;
  let out = '';
  let i = 0;
  while (i < value.length) {
    const at = value.indexOf('var(', i);
    if (at < 0) { out += value.slice(i); break; }
    out += value.slice(i, at);
    let depthP = 1;
    let j = at + 4;
    while (j < value.length && depthP > 0) {
      if (value[j] === '(') depthP++;
      else if (value[j] === ')') depthP--;
      if (depthP === 0) break;
      j++;
    }
    const inner = value.slice(at + 4, j);
    const comma = splitTop(inner)[0];
    const name = comma.trim();
    const fallback = splitTop(inner).slice(1).join(',').trim();
    const resolved = TOKENS.has(name) ? TOKENS.get(name) : fallback;
    out += resolved ? expandVars(resolved, depth + 1) : '';
    i = j + 1;
  }
  return out;
}

/* 按顶层逗号切分（不进括号）。 */
function splitTop(text) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of text) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out;
}

/* 解析单个颜色字面量 → [r,g,b,a]，无法识别返回 null。 */
function parseColor(raw) {
  const s = expandVars(String(raw).trim(), 0).trim();
  if (!s) return null;
  const lower = s.toLowerCase();
  if (NAMED.has(lower)) return NAMED.get(lower).slice();

  let m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    const h = m[1];
    if (h.length === 3 || h.length === 4) {
      const p = [...h].map((c) => parseInt(c + c, 16));
      return [p[0], p[1], p[2], h.length === 4 ? p[3] / 255 : 1];
    }
    if (h.length === 6 || h.length === 8) {
      const p = [];
      for (let i = 0; i < h.length; i += 2) p.push(parseInt(h.slice(i, i + 2), 16));
      return [p[0], p[1], p[2], h.length === 8 ? p[3] / 255 : 1];
    }
    return null;
  }

  m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const parts = m[1].split(/[,\s/]+/).filter(Boolean).map((x) => x.trim());
    if (parts.length < 3) return null;
    const num = (t) => (t.endsWith('%') ? parseFloat(t) * 2.55 : parseFloat(t));
    const a = parts[3] === undefined ? 1
      : (parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]));
    const v = [num(parts[0]), num(parts[1]), num(parts[2]), a];
    return v.every((x) => Number.isFinite(x)) ? v : null;
  }

  /* color-mix(in srgb, A p%, B) —— 本站大量使用 */
  m = s.match(/^color-mix\(\s*in\s+srgb\s*,([\s\S]+)\)$/i);
  if (m) {
    const args = splitTop(m[1]).map((x) => x.trim());
    if (args.length < 2) return null;
    const readPart = (t) => {
      const pct = t.match(/(-?[\d.]+)%\s*$/);
      const color = pct ? t.slice(0, pct.index).trim() : t.trim();
      return { color: parseColor(color), pct: pct ? parseFloat(pct[1]) / 100 : null };
    };
    const a = readPart(args[0]);
    const b = readPart(args[1]);
    if (!a.color || !b.color) return null;
    let wa = a.pct;
    let wb = b.pct;
    if (wa === null && wb === null) { wa = 0.5; wb = 0.5; }
    else if (wa === null) wa = 1 - wb;
    else if (wb === null) wb = 1 - wa;
    const sum = wa + wb || 1;
    wa /= sum; wb /= sum;
    return [0, 1, 2].map((i) => a.color[i] * wa + b.color[i] * wb)
      .concat([a.color[3] * wa + b.color[3] * wb]);
  }
  return null;
}

/* alpha 合成到 backdrop 之上 */
function over(fg, bg) {
  const a = fg[3];
  return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat([1]);
}

function luminance([r, g, b]) {
  const f = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const BG = parseColor(TOKENS.get('--bg') || '#f7f9fc');
const SURFACE = parseColor(TOKENS.get('--surface') || '#ffffff');
const INK = parseColor(TOKENS.get('--ink') || '#16202e');

/* ---------- CSS 规则切分 ---------- */

/* 只取「选择器 { 声明 }」这一层，@media 等外层由 stripAtRuleHeaders 摊平。 */
function rules(css) {
  /* 注释换成等长空白（保留换行），字符偏移不变，报出来的行号才准。 */
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  const out = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(clean))) {
    const sel = m[1].split(/\n/).pop().trim().replace(/\s+/g, ' ');
    if (!sel || sel.startsWith('@')) continue;
    /* m.index 落在上一条规则的 } 之后，含换行和缩进；往前推到选择器真正开始的位置，
       报出来的行号才和编辑器一致。 */
    const selStart = m.index + m[1].length - m[1].replace(/^[\s\S]*\n/, '').length;
    const decls = new Map();
    for (const part of m[2].split(';')) {
      const at = part.indexOf(':');
      if (at < 0) continue;
      const prop = part.slice(0, at).trim().toLowerCase();
      const val = part.slice(at + 1).trim();
      if (prop && val) decls.set(prop, val);
    }
    if (decls.size) out.push({ sel, decls, index: selStart });
  }
  return out;
}

const COLOR_RE = /(#[0-9a-fA-F]{3,8}\b|rgba?\([^()]*\)|color-mix\((?:[^()]|\([^()]*\))*\)|\b(?:white|black|gold)\b)/g;

/* 从一个属性值里挑出所有颜色（含渐变色标）。
   raw 保留源码写法，rgba 是解析后的值，literal 表示「源码里就是写死的颜色」——
   token（var(--x)）会随主题自动换色，写死的不会，这正是暗色残留的判别依据。 */
function colorsIn(value) {
  const found = [];
  /* 先在原始值上找：这里出现的 hex / rgb / rgba 都是写死的。 */
  for (const m of value.matchAll(COLOR_RE)) {
    const c = parseColor(m[1]);
    if (!c) continue;
    /* color-mix 的参数可能是 token，那它会随主题走，不算写死。 */
    const literal = !/^color-mix/i.test(m[1]) || !/var\(/.test(m[1]);
    found.push({ raw: m[1], rgba: c, literal });
  }
  /* 再补上 token 展开后才出现的颜色，供对比度计算用（不算写死）。 */
  if (value.includes('var(')) {
    for (const m of expandVars(value, 0).matchAll(COLOR_RE)) {
      const c = parseColor(m[1]);
      if (!c) continue;
      if (found.some((f) => f.raw === m[1])) continue;
      found.push({ raw: m[1], rgba: c, literal: false });
    }
  }
  return found;
}

/* 暗色主题的画布色：低饱和 + 很暗。#0b0f1a #121829 #161d33 #1d2540 #08101f 都在此列，
   而 --math #1b64c8、--sci #0b7a45 这类高饱和品牌色不在（它们是浅色主题的正常填充色）。 */
function isDarkCanvas([r, g, b]) {
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return luminance([r, g, b]) < 0.06 && chroma <= 48;
}

const INVISIBLE = 1.22;     /* 与所在表面对比度低于此值算「看不见」 */

/* WCAG「大字」阈值：≥24px，或 ≥18.66px 且 ≥700 字重 → 3.0，否则 4.5。 */
function textThreshold(decls) {
  const size = decls.get('font-size') || '';
  const weight = decls.get('font-weight') || decls.get('font') || '';
  const rem = size.match(/([\d.]+)rem/);
  const px = size.match(/([\d.]+)px/);
  const clampMin = size.match(/clamp\(\s*([\d.]+)(rem|px)/);
  let pxSize = null;
  if (rem) pxSize = parseFloat(rem[1]) * 16;
  else if (px) pxSize = parseFloat(px[1]);
  else if (clampMin) pxSize = parseFloat(clampMin[1]) * (clampMin[2] === 'rem' ? 16 : 1);
  const bold = /\b(bold|[7-9]\d0)\b/.test(weight);
  if (pxSize !== null && (pxSize >= 24 || (pxSize >= 18.66 && bold))) return 3.0;
  return 4.5;
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

/* 曾经这里有一个 HELD_BY_OTHERS 豁免集（number-blocks / turtle-geometry 单列不阻断）。
   那两个线程已经收尾：去掉豁免后本工具仍然 exit 0，所以豁免过期了，28 页一视同仁。
   见 CONTRACT.md「门禁」一节。 */

const errors = [];
const notes = [];
const usedAllow = new Set();
let ruleCount = 0;

function lineOf(text, index) { return text.slice(0, index).split('\n').length; }

/* 把选择器切成后代层级的 compound 列表：".zone .who span" → [".zone", ".who", "span"]。
   只按空白切分，> + ~ 也当层级分隔；伪类/伪元素去掉。 */
function compounds(sel) {
  return sel.split(',')[0]
    .replace(/\s*[>+~]\s*/g, ' ')
    .trim()
    .split(/\s+/)
    .map((c) => c.replace(/::?[\w-]+(\([^)]*\))?/g, '').trim())
    .filter(Boolean);
}

/* 背景解析成「合成到某个 backdrop 之上的最终色」。 */
function resolveBg(bgValue, backdrop) {
  const colors = colorsIn(bgValue).filter((c) => c.rgba[3] > 0.02);
  if (!colors.length) return null;
  return colors.map((c) => ({ ...c, rgb: over(c.rgba, backdrop) }));
}

/* 近乎不透明的深色：backdrop 怎么变都还是深色，可以确定判定。 */
const OPAQUE = 0.5;

/* 判定范围有意收窄到「不需要知道层叠和 DOM 就能确定」的情形：
   没有浏览器就拿不到真实 backdrop，猜祖先只会制造噪音（一条把 .card 涂蓝的局部规则
   会污染全部 .card 后代）。所以：
     A 只看同一条规则里同时声明的 color + background；
     B 只看写死的暗色画布色，且 alpha ≥ .5 时才算错（此时 backdrop 无关）；
     C 只在同一条规则声明了浅色背景时才判描边。
   剩下的交给真实浏览器审计（tools/verify.mjs），本工具不猜。 */
for (const rel of targets) {
  const html = await readFile(join(ROOT, rel), 'utf8');
  const allRules = [];
  for (const block of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)) {
    const css = block[1];
    const cssOffset = block.index + block[0].indexOf(css);
    for (const rule of rules(css)) {
      allRules.push({ ...rule, line: lineOf(html, cssOffset + rule.index) });
    }
  }
  ruleCount += allRules.length;

  for (const rule of allRules) {
    const line = rule.line;
    const key = `${rel} ${rule.sel}`;
    const allowed = ALLOW.has(key);
    if (allowed) usedAllow.add(key);

    const bgValue = rule.decls.get('background') || rule.decls.get('background-color');
    const fgValue = rule.decls.get('color');
    const fgColor = fgValue ? parseColor(fgValue) : null;
    /* 背景先按最坏情况合成到页面底色上 */
    const composited = bgValue ? (resolveBg(bgValue, BG) || []) : [];

    /* --- A. 同一条规则里 color 压在自己声明的 background 上 ---
       color:transparent 是 background-clip:text 渐变字的正常写法，跳过。

       半透明背景的最终颜色取决于祖先，而祖先静态推断不出来
       （ocean 的 .zone 由 JS 写内联深色渐变，.zone .who span 的 10% 白底
       在那上面其实是深色，白字完全可读）。所以判定要求「结论与 backdrop 无关」：
       分别把背景合成到纯白和纯黑上，两种极端都不达标才算错；
       只有一种不达标说明结论依赖祖先，降级为提示。 */
    if (fgColor && fgColor[3] > 0.05 && bgValue) {
      const need = textThreshold(rule.decls);
      const judge = (base) => {
        const stops = resolveBg(bgValue, base) || [];
        if (!stops.length) return null;
        const darkest = stops.reduce((a, b) => (luminance(a.rgb) <= luminance(b.rgb) ? a : b));
        return { raw: darkest.raw, ratio: contrast(over(fgColor, darkest.rgb), darkest.rgb) };
      };
      const onWhite = judge([255, 255, 255, 1]);
      const onBlack = judge([0, 0, 0, 1]);
      if (onWhite && onBlack) {
        const worst = onWhite.ratio <= onBlack.ratio ? onWhite : onBlack;
        if (onWhite.ratio < need && onBlack.ratio < need) {
          errors.push(`${rel}: 行 ${line} ${rule.sel} —— 文字 ${fgValue} 压在同一条规则的背景 ` +
            `${worst.raw} 上，对比度只有 ${worst.ratio.toFixed(2)}（需 ≥ ${need}）`);
        } else if (worst.ratio < need) {
          notes.push(`${rel}: 行 ${line} ${rule.sel} —— 文字 ${fgValue} 压在半透明背景 ` +
            `${worst.raw} 上，最终对比度取决于祖先底色（浅底 ${onWhite.ratio.toFixed(2)}、` +
            `深底 ${onBlack.ratio.toFixed(2)}，需 ≥ ${need}）：请确认它落在哪一侧`);
        }
      }
    }

    /* --- B. 写死的暗色画布色当背景 --- */
    if (!allowed && composited.length) {
      const stale = composited.filter((c) => c.literal && isDarkCanvas(c.rgba));
      if (stale.length) {
        const worst = stale.reduce((a, b) => (a.rgba[3] >= b.rgba[3] ? a : b));
        const seen = worst.rgb;
        const selfOk = fgColor && contrast(fgColor, seen) >= 4.5;
        if (!selfOk && worst.rgba[3] >= OPAQUE) {
          errors.push(`${rel}: 行 ${line} ${rule.sel} —— 背景写死了暗色主题的画布色 ` +
            `${stale.map((c) => c.raw).join(' / ')}，浅色主题下仍是深板 ` +
            `rgb(${seen.slice(0, 3).map((v) => Math.round(v)).join(',')})，` +
            `继承的 --ink 对比度仅 ${contrast(INK, seen).toFixed(2)}。` +
            `深色场景请配浅色文字，并把选择器写进 ALLOW 注明理由`);
        } else if (!selfOk) {
          /* 低透明度暗色层：在暗底上是「压深一点」，在浅底上变成灰蒙版。
             可读性通常还行，但视觉意图是反的。 */
          notes.push(`${rel}: 行 ${line} ${rule.sel} —— ${stale.map((c) => c.raw).join(' / ')} ` +
            `原本是暗底上的压深层，浅底上变成灰蒙版 ` +
            `rgb(${seen.slice(0, 3).map((v) => Math.round(v)).join(',')})，建议换成浅色 token`);
        }
      }
    }

    /* --- D. 近白文字（提示）：只有压在深底上才成立。
       本站默认浅色，所以每一条都值得人工确认；但「祖先是不是深色场景」这件事
       静态推断不可靠，所以只列出来供人工核对，不阻断。 --- */
    if (fgColor && fgColor[3] > 0.05 && luminance(fgColor) > 0.7) {
      const darkOwn = composited.some((c) => luminance(c.rgb) < 0.35);
      if (!darkOwn) {
        notes.push(`${rel}: 行 ${line} ${rule.sel} —— 文字 ${fgValue} 是近白色，` +
          `本规则没有声明深色背景：请确认它确实压在深色场景里，否则在浅底上看不见`);
      }
    }

    /* --- C. 隐形描边 / 高光（提示）：只在同一条规则声明了浅色背景时判。
       要求「所有可解析的色标都是浅色」才算浅底：星空那种
       `radial-gradient(#fff 0 1px, transparent 2px), #081126` 里有白色星点，
       只看有没有浅色标会把深色场景误判成浅底。 --- */
    const ownLight = composited.length && composited.every((c) => luminance(c.rgb) > 0.6)
      ? composited.reduce((a, b) => (luminance(a.rgb) <= luminance(b.rgb) ? a : b))
      : null;
    if (ownLight) {
      for (const prop of ['border', 'border-color', 'border-top', 'border-bottom',
        'border-left', 'border-right', 'outline']) {
        const v = rule.decls.get(prop);
        if (!v) continue;
        for (const c of colorsIn(v)) {
          if (!c.literal || c.rgba[3] === 0) continue;
          const seen = over(c.rgba, ownLight.rgb);
          const ratio = contrast(seen, ownLight.rgb);
          if (ratio < INVISIBLE && luminance(seen) > 0.6) {
            notes.push(`${rel}: 行 ${line} ${rule.sel} —— ${prop}: ${c.raw} ` +
              `压在自己的浅色背景上对比度仅 ${ratio.toFixed(2)}，等于没画（为暗底写的高光描边）`);
          }
        }
      }
    }
  }
}

console.log(`主题审计：${targets.length} 个 HTML、${ruleCount} 条内联规则、` +
  `浅色 token ${TOKENS.size} 个（背景合成基准 --bg=${TOKENS.get('--bg')}）`);

const staleAllow = [...ALLOW.keys()].filter((k) =>
  !usedAllow.has(k) && targets.includes(k.split(' ')[0]));
if (staleAllow.length) {
  console.log(`\n  · ALLOW 里这些条目已经匹配不到规则，可以删了：`);
  for (const k of staleAllow) console.log(`      ${k}`);
}
if (notes.length) {
  console.log(`\n  · ${notes.length} 处隐形描边/高光（不阻断，但等于没画）：`);
  for (const n of notes) console.log(`      ${n}`);
}
if (errors.length) {
  console.error(`\n  ✗ ${errors.length} 处暗色主题残留：`);
  for (const e of errors) console.error(`      ${e}`);
  console.error('\n  默认主题是浅色。请改用 --surface / --surface-2 / --bg-soft 等 token，' +
    '或用 color-mix 在浅底上调色；确实需要深色的舞台请写进 ALLOW 并注明理由。');
  process.exit(1);
}
console.log('\n  ✓ 内联样式里的硬编码颜色在浅色主题下都成立');
