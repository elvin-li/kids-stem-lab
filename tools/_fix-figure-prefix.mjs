#!/usr/bin/env node
/** 去掉「X对上「Y」：」前缀，只留后面的观察句。 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const PREFIX = /^[^<]{1,24}对上「[^」]{1,16}」：/;

function walk(dir, acc = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (name.name.startsWith(".") || name.name === "node_modules" || name.name === "deploy" || name.name === "semantic-review") continue;
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p, acc);
    else if (name.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

let files = 0;
let n = 0;
for (const file of walk(ROOT)) {
  let html = readFileSync(file, "utf8");
  const next = html.replace(/<p class="kid-figure-fact">([\s\S]*?)<\/p>/g, (all, fact) => {
    if (!PREFIX.test(fact)) return all;
    let rest = fact.replace(PREFIX, "").trim();
    if (rest.length < 6) return all;
    if (!/[。！？]$/.test(rest)) rest += "。";
    n += 1;
    return `<p class="kid-figure-fact">${rest}</p>`;
  });
  if (next !== html) {
    writeFileSync(file, next);
    files += 1;
  }
}
console.log(`updated ${files} files, stripped ${n} prefixes`);
