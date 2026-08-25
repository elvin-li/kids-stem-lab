#!/usr/bin/env node
/**
 * 内容与偏好契约审计（零依赖）
 *
 * 这三条都写在 CONTRACT.md 里，但此前没有任何门禁覆盖，全靠人记得。
 * 每一条都已经真实地漏过一次：
 *
 *   1. 实验页五件套缺一 —— wave-maker 把「这在教什么」写成了家长折叠块里的
 *      「学习目标」，孩子和家长在页面上都看不到这一页到底在教什么。
 *   2. 动效偏好读错来源 —— pattern-machine 在载入时取了一次 matchMedia 快照，
 *      家长在足迹页拨的「减少动效」对那一页完全无效。对动效敏感的孩子，
 *      这不是形式条款：开关拨了却照样动，家长会以为开关坏了。
 *   3. Canvas 不按 devicePixelRatio 缩放 —— 视网膜平板上整块画面发虚。
 *      这一页大半内容就是那块画布，糊了等于内容糊了。
 *
 * 断言：
 *   A. games/ 下每个实验页都要有：一句「这在教什么」、可交互画面、
 *      ≥3 条给家长的问题、简短的「背后的原理」。
 *      （CONTRACT「内容与交互要求」第 2 条。标题与唯一 h1 已由 check-headings.mjs
 *        和 check-contract.mjs 覆盖，这里不重复判。）
 *      范围只到 games/：契约那条写的是「每个实验页」，而 nature/ 是自然专题，
 *      用的是问题式表述（space.html 的「为什么不会直直掉下去？」就是它的原理段），
 *      套同一把尺子只会制造噪音。
 *   B. 任何页面的内联 JS 只要读了 prefers-reduced-motion，就必须同时读
 *      Playful.motionReduced()。（CONTRACT「无障碍」：站内偏好优先，
 *        系统媒体查询只作为共享层就绪前的兜底。）
 *   C. 任何页面只要有 <canvas>，内联 JS 里就必须出现 devicePixelRatio。
 *      （CONTRACT「内容与交互要求」第 5 条。）
 *
 * 判定只看静态 markup 与内联 <script>，不启浏览器，可以进门禁。
 * B 和 C 是「有没有读对来源」的存在性判定，不保证每个调用点都用对了；
 * 真实行为要靠浏览器验证，这里挡的是整类遗漏。
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIRS = ['.', 'pages', 'games', 'nature'];

/* 曾经这里有一个 THREAD_OWNED 豁免集（number-blocks / turtle-geometry 单列不阻断）。
   那两个线程已经收尾：去掉豁免后本工具仍然 exit 0，所以豁免过期了，28 页一视同仁。
   不要留空集合 + 死分支，也不要为了让门禁变绿往里加页面。 */

function htmlFiles() {
  const out = [];
  for (const dir of DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const name of fs.readdirSync(abs)) {
      if (name.endsWith('.html')) out.push(dir === '.' ? name : `${dir}/${name}`);
    }
  }
  return out.sort();
}

/* 去掉注释：注释里提到「这在教什么」或 devicePixelRatio 不算实现。
   check-contract.mjs 就因为不剥注释，把注释里写的一个标签名当成了真控件。 */
function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}
/* 只取内联脚本体（带 src 的外链共享层不算页面自己的实现）。 */
function inlineJs(html) {
  return [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1]).join('\n');
}
function textOf(fragment) {
  return fragment.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/* ---- 断言 A 的四项探针 ---- */

function hasTeachLine(html) {
  return /这在教什么/.test(html);
}

/* 可交互画面：<canvas>，或带 viewBox / role="img" 的 <svg>。
   契约要的是「可交互画面」，本站的实现要么是 canvas，要么是脚本驱动的内联 SVG。 */
function hasStage(html) {
  if (/<canvas\b/i.test(html)) return true;
  return /<svg\b[^>]*(?:viewBox|role\s*=\s*["']img["'])/i.test(html);
}

function hasPrinciple(html) {
  return /背后的原理|科学原理/.test(html);
}

/* 给家长的问题：先找像「给家长…」「陪伴追问」「提问脚本」这类标签，
   再数它后面最近那个列表里的 <li>，取全页最大值。
   标签写法各页差别很大（给家长的 3 个问题 / 陪伴追问 / 陪玩时可以这样问 …），
   所以按关键词族匹配，而不是写死某一个标题。 */
function parentQuestionCount(html) {
  const LABEL = /(?:给家长|家长的|陪伴追问|一起追问|提问脚本|问一问|可以这样问|可以一起聊|聊一聊)/;
  let best = 0;
  let bestLabel = '';
  const labels = [
    ...html.matchAll(/<(h[2-6])\b[^>]*>([\s\S]*?)<\/\1>/gi),
    ...html.matchAll(/<(b|strong)\b[^>]*>([\s\S]*?)<\/\1>/gi)
  ];
  for (const m of labels) {
    const label = textOf(m[2]);
    if (!LABEL.test(label)) continue;
    /* 往后找最近的一个列表；3500 字符足够跨过中间的一两段说明。 */
    const after = html.slice(m.index, m.index + 3500);
    const list = after.match(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/i);
    if (!list) continue;
    const n = (list[2].match(/<li\b/gi) || []).length;
    if (n > best) { best = n; bestLabel = label.slice(0, 26); }
  }
  return { count: best, label: bestLabel };
}

/* ---- 跑 ---- */

const files = htmlFiles();
const problems = [];
let labChecked = 0;
let motionChecked = 0;
let canvasChecked = 0;

for (const rel of files) {
  const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const html = stripComments(raw);
  const js = inlineJs(html);
  const fail = (msg) => problems.push({ rel, msg });

  /* --- A：只判 games/ 下的实验详情页 --- */
  const isLab = rel.startsWith('games/') && rel !== 'games/index.html';
  if (isLab) {
    labChecked += 1;
    if (!hasTeachLine(html)) fail('缺一句「这在教什么」（契约要求每个实验页都有）');
    if (!hasStage(html)) fail('缺可交互画面（canvas 或带 viewBox 的内联 svg）');
    if (!hasPrinciple(html)) fail('缺「背后的原理」段');
    const q = parentQuestionCount(html);
    if (q.count < 3) {
      fail(q.count === 0
        ? '找不到「给家长的问题」列表（契约要求 3 条）'
        : `给家长的问题只有 ${q.count} 条（要求 3 条，标签「${q.label}」）`);
    }
  }

  /* --- B：读了系统媒体查询就必须也读站内偏好 --- */
  if (/prefers-reduced-motion/.test(js)) {
    motionChecked += 1;
    if (!/Playful\s*\.\s*motionReduced/.test(js)) {
      fail('内联 JS 只读 prefers-reduced-motion，没读 Playful.motionReduced()：'
        + '家长在足迹页设的「减少动效」对本页无效（站内偏好必须优先，媒体查询只作兜底）');
    }
  }

  /* --- C：有画布就必须按 dPR 缩放 --- */
  if (/<canvas\b/i.test(html)) {
    canvasChecked += 1;
    if (!/devicePixelRatio/.test(js)) {
      fail('有 <canvas> 但内联 JS 里没有 devicePixelRatio：视网膜屏上整块画面会发虚');
    }
  }
}

console.log(`审计 ${files.length} 个 HTML：${labChecked} 个实验页的五件套、`
  + `${motionChecked} 个页面的动效偏好来源、${canvasChecked} 个页面的画布 dPR`);

if (problems.length) {
  console.log(`\n✗ ${problems.length} 处契约问题：`);
  for (const p of problems) console.log(`  ${p.rel}\n      ${p.msg}`);
} else {
  console.log('✓ 实验页五件套齐全；动效偏好都以站内设置为准；有画布的页面都按 dPR 缩放');
}

process.exit(problems.length ? 1 : 0);
