#!/usr/bin/env node
/**
 * check-raf.mjs —— 逐帧循环必须能停下来
 *
 * 背景：本站是给 4~13 岁孩子在平板上用的，永久 requestAnimationFrame 循环
 * （球停了、没人操作，画布每秒仍重画 60 次）会持续吃 CPU 和电量。
 *
 * 规则：一个页面里如果存在「递归排帧」的 rAF（即 rAF 出现在被它调度的同名函数体内），
 * 那么这一页必须同时具备停机手段之一：
 *   1) rAF 的返回值被记下来（rafId = requestAnimationFrame(...)），且存在
 *      cancelAnimationFrame，或者
 *   2) 排帧语句被条件包裹（if (running || settle > 0) { rafId = requestAnimationFrame(...) }）
 *
 * 单次排帧（回调里不再排下一帧，例如只为了下一帧改个 attribute）不算循环，放过。
 *
 * 零依赖，纯文本启发式：不做 JS 解析，只看排帧语句的写法。
 * 误判方向是「宁可漏过也不误报」——真正要防的是有人把条件去掉退回永久循环。
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

/* 项目路径含中文（早教），URL.pathname 会给出 %E6%97%A9… 的百分号编码，
   fs 拿它当字面路径会 ENOENT。其余工具用的都是 import.meta.dirname，这里保持一致。 */
const ROOT = resolve(import.meta.dirname, '..');

/* 曾经这里有一个 THREAD_OWNED 豁免集（number-blocks / turtle-geometry 报告但不阻断）。
   那两个线程已经收尾：去掉豁免后本工具仍然 exit 0，所以豁免过期了，28 页一视同仁。
   rAF 空转是电量问题，不该有任何页面长期挂在豁免名单上。 */

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const RAF = /(?:window\s*\.\s*)?requestAnimationFrame\s*\(\s*([A-Za-z_$][\w$]*)?/;

const files = walk(ROOT).sort();
const problems = [];
let loopPages = 0;
let guarded = 0;

for (const file of files) {
  const rel = relative(ROOT, file);
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');

  /* 收集所有排帧点及其调度的函数名 */
  const sites = [];
  lines.forEach((line, i) => {
    const m = line.match(RAF);
    if (m) sites.push({ line: i + 1, fn: m[1] || null, text: line.trim() });
  });
  if (!sites.length) continue;

  /* 递归排帧：某个 rAF 调度的函数名 fn，同时存在 `function fn(` 定义，
     且这个排帧点位于该函数体内（用「下一个顶层 function 之前」粗略界定）。
     简化判定：同一页里同一个 fn 被 rAF 排帧 ≥2 次，或排帧点所在行缩进 ≥4 空格
     且该 fn 有函数定义 —— 两者都指向「回调自己又排了下一帧」。 */
  const recursive = sites.filter((s) => {
    if (!s.fn) return false;                       // rAF(function(){...}) 匿名单次
    if (!new RegExp(`function\\s+${s.fn}\\s*\\(`).test(text)) return false;
    const sameFn = sites.filter((o) => o.fn === s.fn);
    return sameFn.length >= 2;                     // 定义处排一次 + 循环内排一次
  });
  if (!recursive.length) continue;

  loopPages++;

  const hasCancel = /cancelAnimationFrame\s*\(/.test(text);
  const storesId = sites.some((s) => /=\s*(?:window\s*\.\s*)?requestAnimationFrame\s*\(/.test(s.text));
  /* 条件排帧：同一行上 `if (...)` 出现在 requestAnimationFrame 之前，
     且两者之间没有 ; { }（否则 `if (x) { foo(); } rAF(loop);` 这种
     「if 和排帧无关」的写法会被误当成有守卫）。

     原来这里写的是 /^\s*if\s*\(.+\)\s*\{?.*requestAnimationFrame\s*\(/，
     带 ^ 锚点，要求这一行**以 if 开头**。于是照本工具自己的报错建议写、
     但把循环体放在一行里的代码会被误报成永久循环：
         function loop(){ draw(); if (running || settle > 0) { rafId = rAF(loop); } else { rafId = 0; } }
     这与本文件开头声明的偏向（「宁可漏过也不误报」）正好相反。
     更要紧的是，7 个含递归 rAF 的页面里有 5 页 cancelAnimationFrame 都没有、
     完全靠这一条过关，所以谁把循环体重排成一行（本站有几页的内联脚本本来就是
     压缩成单行的），这 5 页会立刻集体变红——而它们的耗电行为一点没变。
     去掉锚点后，这 7 页的判定与改动前逐页一致（已逐页比对过）。 */
  const conditional = sites.some((s) => /if\s*\([^{};]*\)\s*\{?[^;{}]*requestAnimationFrame\s*\(/.test(s.text));

  if ((storesId && hasCancel) || conditional) { guarded++; continue; }

  problems.push({
    rel,
    detail: recursive.map((s) => `行 ${s.line}：${s.text}`),
  });
}

console.log(`审计 ${files.length} 个 HTML：${loopPages} 页含递归 rAF 循环，${guarded} 页有停机手段`);

if (!problems.length) {
  console.log('✓ 逐帧循环都能停下来（记录 rafId + cancel，或条件排帧）');
} else {
  console.log(`\n✗ ${problems.length} 页存在永久 rAF 循环（空闲时仍每秒重画 60 次）：`);
  for (const p of problems) {
    console.log(`  ${p.rel}`);
    p.detail.forEach((d) => console.log(`    ${d}`));
  }
  console.log('\n修法参考 games/gravity-drop.html / wave-maker.html：');
  console.log('  循环末尾改成 if (运行中 || settle > 0) { rafId = rAF(loop); } else { rafId = 0; }');
  console.log('  再用捕获阶段的 document 事件委托 requestDraw() 唤醒。');
}

process.exit(problems.length ? 1 : 0);
