#!/usr/bin/env node
/**
 * 第二遍：把「用自己的话写成一句」这类回退句，换成邻近正文里的专属观察。
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");

const GENERIC = /用自己的话写成一句完整观察|用这段时间只看一件|做满次数再比较|数字贴着单位|要落到「/;

function strip(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstClause(text) {
  const t = strip(text).replace(/^(完成：|连.{0,8}页：)/, "");
  const part = t.split(/[。；！？]/)[0] || t;
  return part.slice(0, 42).replace(/[，、]$/, "");
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (name.name.startsWith(".") || name.name === "node_modules" || name.name === "deploy" || name.name === "semantic-review") continue;
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p, acc);
    else if (name.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function nearby(html, at) {
  const before = html.slice(Math.max(0, at - 1600), at);
  const h2m = before.match(/<h2[^>]*>([\s\S]*?)<\/h2>/g);
  const title = strip((h2m && h2m[h2m.length - 1]) || "");
  const paras = [...before.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)]
    .map((m) => strip(m[1]))
    .filter((p) => p.length >= 8 && !/作品表单|只保存文字/.test(p));
  return { title, paras: paras.slice(-4) };
}

function uniqueFact(cap, sub, ctx, used) {
  const pool = ctx.paras.filter((p) => !/自己的话|数字和单位|完成：/.test(p));
  let hook = pool.find((p) => {
    const key = cap.replace(/\s/g, "").slice(0, 2);
    return key && p.includes(key);
  });
  if (!hook) hook = pool.find((p) => !used.has(p)) || pool[0] || ctx.title;
  if (hook) used.add(hook);
  const clause = firstClause(hook);
  const subOk = sub && !["计时", "完成", "各一", "禁", "连", "观察", "记录"].includes(sub);
  if (clause && clause.length >= 6) {
    if (subOk && !clause.includes(sub)) return `${cap}对上「${sub}」：${clause}。`;
    if (!clause.includes(cap.replace(/\s/g, "").slice(0, 2))) return `${cap}：${clause}。`;
    return `${clause}。`;
  }
  if (subOk) return `${cap}要能指到「${sub}」，不要只留下一个词。`;
  return `${cap}用这一节能看见的差别写成一句。`;
}

const FIGURE_RE = /<div class="kid-figure">([\s\S]*?)<\/div>/g;
let files = 0;
let changedFacts = 0;

for (const file of walk(ROOT)) {
  let html = readFileSync(file, "utf8");
  const used = new Set();
  let hits = 0;
  const next = html.replace(FIGURE_RE, (block, _inner, offset) => {
    const cap = strip((block.match(/kid-figure-cap">([\s\S]*?)<\//) || [])[1] || "");
    const sub = strip((block.match(/kid-figure-sub">([\s\S]*?)<\//) || [])[1] || "");
    return block.replace(/<p class="kid-figure-fact">([\s\S]*?)<\/p>/, (all, fact) => {
      const text = strip(fact);
      if (!GENERIC.test(text)) return all;
      const ctx = nearby(html, offset);
      const rewritten = uniqueFact(cap, sub, ctx, used);
      hits += 1;
      return `<p class="kid-figure-fact">${rewritten}</p>`;
    });
  });
  if (next !== html) {
    writeFileSync(file, next);
    files += 1;
    changedFacts += hits;
  }
}
console.log(`updated ${files} files, ${changedFacts} facts`);
