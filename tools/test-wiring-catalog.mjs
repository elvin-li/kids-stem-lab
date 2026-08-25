#!/usr/bin/env node
/**
 * Every games/nature detail page on disk must be in EXPLORATIONS, sw.js CORE,
 * and pages/paths.html, and must visit on load without completing on load.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');

async function listDetails(dir) {
  const names = await readdir(join(ROOT, dir));
  return names.filter((name) => name.endsWith('.html') && name !== 'index.html').map((name) => `${dir}/${name}`).sort();
}

const games = await listDetails('games');
const nature = await listDetails('nature');
const disk = games.concat(nature);

const expSrc = await readFile(join(ROOT, 'data', 'explorations.js'), 'utf8');
const box = { window: {} };
runInNewContext(expSrc, box, { filename: 'data/explorations.js', timeout: 1000 });
const catalog = box.window.EXPLORATIONS;
assert.ok(Array.isArray(catalog), 'EXPLORATIONS must load as classic script');
const ids = new Set(catalog.map((item) => item.id));

const sw = await readFile(join(ROOT, 'sw.js'), 'utf8');
const core = new Set([...sw.matchAll(/"\.\/((?:games|nature)\/[^"]+\.html)"/g)].map((m) => m[1]));
const pathsHtml = await readFile(join(ROOT, 'pages', 'paths.html'), 'utf8');
const pathLinks = new Set([...pathsHtml.matchAll(/href="\.\.\/((?:games|nature)\/[^"]+\.html)"/g)].map((m) => m[1]));

const rows = [];
for (const rel of disk) {
  const html = await readFile(join(ROOT, rel), 'utf8');
  const visit = new RegExp(`Progress\\.visit\\(\\s*["']${rel}["']`).test(html);
  const complete = new RegExp(`Progress\\.complete\\(\\s*["']${rel}["']`).test(html);
  const loadComplete = /<script>[\s\S]*Progress\.complete[\s\S]*<\/script>\s*<script>if \(window\.Progress\) Progress\.visit/.test(html)
    && !/addEventListener|click|if \(/.test(html.slice(html.lastIndexOf('Progress.complete') - 80, html.lastIndexOf('Progress.complete')));
  rows.push({ rel, catalog: ids.has(rel), core: core.has(rel), paths: pathLinks.has(rel), visit, complete });
  assert.ok(ids.has(rel), rel + ' missing from data/explorations.js');
  assert.ok(core.has(rel), rel + ' missing from sw.js CORE');
  assert.ok(pathLinks.has(rel), rel + ' missing from pages/paths.html');
  assert.ok(visit, rel + ' missing Progress.visit with own id');
  assert.ok(complete, rel + ' missing Progress.complete with own id');
}

for (const rel of disk) {
  const html = await readFile(join(ROOT, rel), 'utf8');
  const visitAt = html.search(/Progress\.visit\s*\(/);
  const firstComplete = html.search(/Progress\.complete\s*\(/);
  assert.ok(visitAt >= 0 && firstComplete >= 0, rel + ' must call visit and complete');
  const around = html.slice(Math.max(0, firstComplete - 200), firstComplete + 80);
  assert.ok(
    /function|addEventListener|click|if\s*\(|&&|\|\||=>/.test(around),
    rel + ' Progress.complete must sit behind a handler or condition, not a bare load'
  );
}

console.log(rows.map((row) => `${row.rel}\tcatalog=${row.catalog}\tCORE=${row.core}\tpaths=${row.paths}\tvisit=${row.visit}\tcomplete=${row.complete}`).join('\n'));
console.log('✓ ' + disk.length + ' detail pages are wired (catalog + CORE + paths + visit≠complete-on-load)');
