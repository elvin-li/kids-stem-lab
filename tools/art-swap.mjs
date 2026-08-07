/* 一次性替换器：把页面里「当插图用的 emoji」换成图库里的写实插画。
 * 只是批量编辑的手，规则写在 SWAPS 里，改完可以随时重跑（已换过的不再匹配）。
 *   node tools/art-swap.mjs <page.html> [--dry]
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ART } from './art-library.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const page = process.argv[2];
const dry = process.argv.includes('--dry');
if (!page) { console.error('用法: node tools/art-swap.mjs <page.html> [--dry]'); process.exit(2); }

/* 每页一份规则：[要替换的原文, 图形名]。原文必须唯一或全部同义。 */
const SWAPS = {
  'nature/insects.html': [
    ['<span class="kid-mascot" aria-hidden="true">🐞</span>', 'beetle-ladybird'],
    ['<span class="kid-meter-icon" aria-hidden="true">🐞</span>', 'beetle-ladybird'],
    ['<span class="kid-meter-icon" aria-hidden="true">🦋</span>', 'butterfly'],
    ['<span class="kid-tile-art" aria-hidden="true">🐞</span>', 'beetle-ladybird'],
    ['<span class="kid-tile-art" aria-hidden="true">🕷</span>', 'spider'],
    ['<span class="kid-tile-art" aria-hidden="true">🐜</span>', 'ant'],
    ['<span class="kid-tile-art" aria-hidden="true">🪲</span>', 'beetle-plain'],
    ['<span class="kid-tile-art" aria-hidden="true">🐝</span>', 'bee'],
    ['<span class="kid-tile-art" aria-hidden="true">🥚</span>', 'insect-eggs'],
    ['<span class="kid-tile-art" aria-hidden="true">🐛</span>', 'caterpillar'],
    ['<span class="kid-tile-art" aria-hidden="true">🟤</span>', 'pupa'],
    ['<span class="kid-tile-art" aria-hidden="true">🦋</span>', 'butterfly'],
    ['<span class="rs-art" aria-hidden="true">🐛</span>', 'caterpillar'],
    ['<span aria-hidden="true">🥚</span>卵', 'insect-eggs::卵'],
    ['<span aria-hidden="true">🐛</span>幼虫', 'caterpillar::幼虫'],
    ['<span aria-hidden="true">🟤</span>蛹', 'pupa::蛹'],
    ['<span aria-hidden="true">🦋</span>成虫', 'butterfly::成虫'],
    ['<div class="scene-chip"><span aria-hidden="true">🐜</span>小身体</div>', 'ant::CHIP小身体']
  ]
};

const rules = SWAPS[page];
if (!rules) { console.error(`没有为 ${page} 定义替换规则`); process.exit(2); }

const path = join(ROOT, page);
let html = await readFile(path, 'utf8');
let done = 0;
const skipped = [];

for (const [needle, spec] of rules) {
  const [name, tail] = String(spec).split('::');
  if (!(name in ART)) { console.error(`图库里没有 ${name}`); process.exit(1); }
  const svg = `<svg class="art" viewBox="0 0 120 120" aria-hidden="true"><use href="#art-${name}"/></svg>`;
  let replacement;
  if (tail === undefined) {
    /* 原文形如 <span class="X" aria-hidden="true">emoji</span>：保留外壳，只换里面。 */
    const cls = needle.match(/class="([^"]*)"/);
    replacement = `<span class="${cls ? cls[1] : 'kid-tile-art'}" aria-hidden="true">${svg}</span>`;
  } else if (tail.startsWith('CHIP')) {
    replacement = `<div class="scene-chip"><span aria-hidden="true">${svg}</span>${tail.slice(4)}</div>`;
  } else {
    replacement = `<span aria-hidden="true">${svg}</span>${tail}`;
  }
  const count = html.split(needle).length - 1;
  if (!count) { skipped.push(needle.slice(0, 56)); continue; }
  html = html.split(needle).join(replacement);
  done += count;
  console.log(`  ${count}x  ${needle.replace(/</g, '‹').slice(0, 66)} → #art-${name}`);
}

if (skipped.length) {
  console.log('\n  · 以下规则没有命中（可能已经换过）：');
  for (const s of skipped) console.log(`      ${s.replace(/</g, '‹')}`);
}
if (!dry) await writeFile(path, html);
console.log(`\n${dry ? '（试运行）' : ''}共替换 ${done} 处 — ${page}`);
