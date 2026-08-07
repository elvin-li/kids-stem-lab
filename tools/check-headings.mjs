#!/usr/bin/env node
/**
 * 标题层级审计（零依赖）
 *
 * 屏幕阅读器用户是靠标题列表浏览页面的。层级一跳（h1 → h3），
 * 中间那一级的结构就凭空消失了，读者无法判断 h3 是谁的子节。
 *
 * 断言：
 *   1. 每页恰好一个 <h1>。
 *   2. <h1> 必须是源码里第一个标题（视觉顺序可以用 CSS order 调，
 *      但源码顺序决定辅助技术看到的顺序）。
 *   3. 相邻标题的层级只能 +1，不能 +2 及以上（h2 → h4 不行；
 *      往回跳任意级都可以，那是正常收尾）。
 *
 * 判定只看 markup 里静态写出的标题。JS 动态插入的标题不在范围内。
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIRS = ['.', 'pages', 'games', 'nature'];

/* 这些是别的线程正在改的文件，本工具照实报告，但单独列出来，
   方便区分「我引入的回归」和「等对方线程收尾的存量问题」。 */
const THREAD_OWNED = new Set(['games/number-blocks.html']);

function htmlFiles() {
  const out = [];
  for (const dir of DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const name of fs.readdirSync(abs)) {
      if (!name.endsWith('.html')) continue;
      out.push(dir === '.' ? name : `${dir}/${name}`);
    }
  }
  return out.sort();
}

/* 去掉 <script>/<style>/注释，避免把 JS 字符串或 CSS 选择器里的 h2 当成标题。 */
function stripNonMarkup(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function headings(html) {
  const clean = stripNonMarkup(html);
  const out = [];
  for (const m of clean.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    /* 行号：按命中位置之前的换行数算，报错时能直接跳过去。 */
    const line = clean.slice(0, m.index).split('\n').length;
    out.push({ level: Number(m[1]), text, line });
  }
  return out;
}

const problems = [];
const files = htmlFiles();

for (const rel of files) {
  const html = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const list = headings(html);
  const h1s = list.filter((h) => h.level === 1);

  if (h1s.length === 0) problems.push({ rel, msg: '没有 <h1>' });
  else if (h1s.length > 1) {
    problems.push({ rel, msg: `有 ${h1s.length} 个 <h1>（行 ${h1s.map((h) => h.line).join(', ')}）` });
  }

  if (list.length && list[0].level !== 1) {
    problems.push({
      rel,
      msg: `第一个标题是 h${list[0].level}「${list[0].text.slice(0, 24)}」（行 ${list[0].line}），h1 在行 ${h1s[0] ? h1s[0].line : '—'}`
    });
  }

  for (let i = 1; i < list.length; i += 1) {
    const prev = list[i - 1];
    const cur = list[i];
    if (cur.level - prev.level > 1) {
      problems.push({
        rel,
        msg: `h${prev.level} → h${cur.level} 跳级：「${cur.text.slice(0, 24)}」（行 ${cur.line}，上一个标题在行 ${prev.line}）`
      });
    }
  }
}

const mine = problems.filter((p) => !THREAD_OWNED.has(p.rel));
const owned = problems.filter((p) => THREAD_OWNED.has(p.rel));

console.log(`审计 ${files.length} 个 HTML 的标题层级`);

if (mine.length) {
  console.log(`\n✗ ${mine.length} 处层级问题：`);
  for (const p of mine) console.log(`  ${p.rel}  ${p.msg}`);
} else {
  console.log('✓ 每页一个 h1、h1 在最前、无跳级');
}

if (owned.length) {
  console.log(`\n（另有 ${owned.length} 处在其他线程持有的文件里，本工具不阻断，等对方收尾）`);
  for (const p of owned) console.log(`  ${p.rel}  ${p.msg}`);
}

process.exit(mine.length ? 1 : 0);
