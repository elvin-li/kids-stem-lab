#!/usr/bin/env node
/**
 * Load the shipped resource catalog the same way the homepage does:
 * classic script → window.RESOURCES.
 * Asserts the acceptance bar: more than the pre-expansion 46, with extra
 * science/科普 entries and complete card fields.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const src = await readFile(join(ROOT, 'data', 'resources.js'), 'utf8');
const sandbox = { window: {} };
runInNewContext(src, sandbox, { filename: 'data/resources.js', timeout: 1000 });
const all = sandbox.window.RESOURCES;

assert.ok(Array.isArray(all), 'window.RESOURCES must be an array');
assert.ok(all.length > 46, 'catalog must grow past the previous 46 entries, got ' + all.length);

const fields = ['name', 'zh', 'url', 'desc', 'age', 'subject', 'cost'];
for (const item of all) {
  for (const key of fields) {
    assert.ok(String(item[key] || '').trim(), `${item.name || '(unnamed)'}: missing ${key}`);
  }
  assert.match(String(item.url), /^https:\/\//, `${item.name}: official URL must be https`);
}

const science = all.filter((item) => item.subject === 'science');
assert.ok(science.length >= 20, 'need a science-heavy increment, got ' + science.length + ' science entries');

const names = new Set(all.map((item) => item.name));
for (const must of [
  'Science Buddies',
  'NASA Climate Kids',
  'National Geographic Kids',
  'Seek by iNaturalist',
  'All About Birds (Cornell Lab)',
  'AMNH OLogy'
]) {
  assert.ok(names.has(must), 'missing well-known science/科普 project: ' + must);
}

const json = JSON.parse(await readFile(join(ROOT, 'data', 'resources.json'), 'utf8'));
assert.ok(Array.isArray(json), 'data/resources.json must be an array');
assert.equal(json.length, all.length, 'resources.js and resources.json must stay the same length');
assert.equal(all.length, 122, 'catalog is one card per institution; currently 122');
for (let i = 0; i < all.length; i++) {
  assert.equal(all[i].name, json[i].name, `name drift at ${i}`);
  assert.equal(all[i].url, json[i].url, `url drift at ${i}: ${all[i].name}`);
  assert.equal(all[i].cover, json[i].cover, `cover drift at ${i}: ${all[i].name}`);
}

const subjects = {};
for (const item of all) subjects[item.subject] = (subjects[item.subject] || 0) + 1;
console.log('RESOURCES ' + all.length + ' entries; subjects ' + JSON.stringify(subjects));
console.log('science/科普 names: ' + science.map((item) => item.name).join(' · '));
console.log('✓ shipped data/resources.js loads as classic script, matches resources.json, and meets the catalog bar');
