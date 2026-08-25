/* 探索足迹 v3 单元测试：Node 内置 vm + mock window/localStorage。 */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const [PROGRESS_SRC, PLAYFUL_SRC] = await Promise.all([
  readFile(`${ROOT}/assets/js/progress.js`, 'utf8'),
  readFile(`${ROOT}/data/playful.js`, 'utf8')
]);
const V1 = 'kids-stem:progress:v1';
const V2 = 'kids-stem:progress:v2';
const V3 = 'kids-stem:progress:v3';
const IDS = [
  'games/number-blocks.html', 'games/fraction-lab.html', 'games/wave-maker.html',
  'nature/ocean.html', 'nature/weather.html', 'nature/space.html'
];
const NOW = '2026-03-04T05:06:07.000Z';

function makeStore(seed = {}) {
  const map = new Map(Object.entries(seed).map(([key, value]) => [key, typeof value === 'string' ? value : JSON.stringify(value)]));
  return {
    mode: 'ok',
    getItem(key) { if (this.mode === 'dead') throw new Error('SecurityError'); return map.get(key) ?? null; },
    setItem(key, value) { if (this.mode !== 'ok') throw new Error('QuotaExceededError'); map.set(key, String(value)); },
    removeItem(key) { if (this.mode === 'dead') throw new Error('SecurityError'); map.delete(key); },
    raw(key = V3) { return map.get(key); },
    parsed(key = V3) { const value = map.get(key); return value === undefined ? undefined : JSON.parse(value); }
  };
}

function fresh({ seed, catalog = true, playful = true } = {}) {
  const store = makeStore(seed);
  const listeners = new Map();
  const events = [];
  class CustomEvent { constructor(type, options = {}) { this.type = type; this.detail = options.detail; } }
  const window = {
    localStorage: store, CustomEvent,
    addEventListener(type, fn) { listeners.set(type, fn); },
    dispatchEvent(event) { events.push(event); return true; }
  };
  const context = createContext({ window });
  if (catalog) window.EXPLORATIONS = IDS.map((id) => ({ id }));
  if (playful) runInContext(PLAYFUL_SRC, context, { filename: 'data/playful.js' });
  runInContext(PROGRESS_SRC, context, { filename: 'assets/js/progress.js' });
  assert.ok(window.Progress);
  return { P: window.Progress, store, events, storageEvent(event) { listeners.get('storage')?.(event); } };
}

function plain(value) { return JSON.parse(JSON.stringify(value)); }
function validV2(overrides = {}) {
  return { schemaVersion: 2, revision: 4, updatedAt: NOW, pages: {}, recent: [], notes: {}, completions: {}, ...overrides };
}
function validV3(overrides = {}) {
  return { schemaVersion: 3, revision: 4, updatedAt: NOW, pages: {}, recent: [], notes: {}, completions: {}, works: {}, preferences: {}, ...overrides };
}
function isISO(value) { assert.equal(new Date(value).toISOString(), value); }

const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

test('空数据返回稳定 v3 结构与默认偏好且不主动写库', () => {
  const { P, store } = fresh();
  assert.deepEqual(plain(P.all()), {
    schemaVersion: 3, revision: 0, updatedAt: null,
    pages: {}, recent: [], notes: {}, completions: {}, works: {},
    preferences: { soundEnabled: false, motion: 'system', ageGroup: 'all', mode: 'kid', onlineData: false }
  });
  assert.equal(P.count(), 0);
  assert.equal(P.getPreference('soundEnabled'), false);
  assert.equal(P.getPreference('mode'), 'kid');
  assert.equal(store.raw(), undefined);
});

test('v1 无损迁移 pages/recent/notes 到 v3 并保留旧键', () => {
  const legacy = {
    pages: { 'games/number-blocks.html': { n: 3, first: '2026-01-02', last: '2026-01-03', title: '数感积木' } },
    recent: ['games/number-blocks.html'],
    notes: { 'games/number-blocks.html': { t: '十个一就是一个十', on: '2026-01-03' } }
  };
  const { P, store } = fresh({ seed: { [V1]: legacy } });
  const data = P.all();
  assert.equal(data.schemaVersion, 3);
  assert.equal(data.pages['games/number-blocks.html'].n, 3);
  assert.equal(data.pages['games/number-blocks.html'].first, '2026-01-02T00:00:00.000Z');
  assert.equal(data.notes['games/number-blocks.html'].t, '十个一就是一个十');
  assert.deepEqual(plain(data.recent), ['games/number-blocks.html']);
  assert.equal(store.parsed(V1).pages['games/number-blocks.html'].n, 3);
  assert.equal(store.parsed().schemaVersion, 3);
});

test('v2→v3 保留 pages/recent/notes/completions 并补齐新字段', () => {
  const v2 = validV2({
    pages: { 'nature/ocean.html': { n: 2, first: NOW, last: NOW, title: '海底世界' } },
    recent: ['nature/ocean.html'],
    notes: { 'nature/ocean.html': { t: '光会变少', on: NOW } },
    completions: { 'nature/ocean.html': { at: NOW, evidence: '解释了深度带' } }
  });
  const { P, store } = fresh({ seed: { [V2]: v2 } });
  const data = P.all();
  assert.equal(data.revision, 5);
  assert.equal(data.pages['nature/ocean.html'].n, 2);
  assert.equal(data.notes['nature/ocean.html'].t, '光会变少');
  assert.equal(data.completions['nature/ocean.html'].evidence, '解释了深度带');
  assert.deepEqual(plain(data.works), {});
  assert.deepEqual(plain(data.preferences), { soundEnabled: false, motion: 'system', ageGroup: 'all', mode: 'kid', onlineData: false });
  assert.equal(store.parsed(V2).schemaVersion, 2, '迁移不得删除或覆盖 v2');
});

test('损坏 v3 安全回退有效 v2', () => {
  const { P } = fresh({ seed: { [V3]: '{bad', [V2]: validV2({ completions: { 'nature/space.html': { at: NOW, evidence: '比较行星' } } }) } });
  assert.equal(P.getCompletion('nature/space.html').evidence, '比较行星');
});

test('visit/note/complete 独立、修订递增且输入受限', () => {
  const { P, events } = fresh();
  const page = P.visit('games/wave-maker.html', 't'.repeat(100));
  assert.equal(page.title.length, 40); isISO(page.first);
  assert.equal(P.note('games/wave-maker.html', 'n'.repeat(500)), true);
  const completion = P.complete('games/wave-maker.html', 'e'.repeat(800));
  assert.equal(completion.evidence.length, 500); isISO(completion.at);
  assert.equal(P.get('games/wave-maker.html').n, 1);
  assert.equal(P.getNote('games/wave-maker.html').t.length, 300);
  assert.equal(P.all().revision, 3);
  assert.deepEqual(events.map((event) => event.detail.source), ['visit', 'note', 'complete']);
});

test('贴纸只从 completions + PLAYFUL 派生，不写入存储并去重', () => {
  const { P, store } = fresh();
  assert.deepEqual(plain(P.getStickers()), []);
  P.complete('games/wave-maker.html', '完成干涉');
  const stickers = P.getStickers('games/wave-maker.html');
  assert.equal(stickers.length, 1);
  assert.deepEqual(Object.keys(stickers[0]).sort(), ['emoji', 'id', 'label', 'pageId', 'unlockedAt']);
  assert.equal(stickers[0].id, 'wave-listener');
  assert.equal('stickers' in store.parsed(), false);
  stickers[0].label = '篡改';
  assert.equal(P.getStickers()[0].label, '波浪倾听者');
});

test('收藏卡从 completions 派生且不写入 v3 存储', () => {
  const { P, store } = fresh();
  const initial = P.getCards();
  assert.equal(initial.length, IDS.length);
  assert.equal(initial.filter((card) => card.unlocked).length, 0);
  assert.equal(P.getCards('games/wave-maker.html')[0].label, '波浪倾听者');
  assert.deepEqual(plain(P.getCards('games/not-listed.html')), []);

  P.complete('games/wave-maker.html', '完成干涉');
  const card = P.getCards('games/wave-maker.html')[0];
  assert.equal(card.unlocked, true);
  isISO(card.unlockedAt);
  assert.equal(card.unlockedAt, P.getCompletion('games/wave-maker.html').at);
  assert.equal(card.series, '物理实验');
  assert.match(card.discovery, /叠加/);
  assert.equal('cards' in store.parsed(), false);
  assert.equal('milestones' in store.parsed(), false);

  card.label = '篡改';
  assert.equal(P.getCards('games/wave-maker.html')[0].label, '波浪倾听者');
  const exported = JSON.parse(P.exportJSON());
  assert.equal('cards' in exported, false);
  assert.equal('milestones' in exported, false);
});

test('收藏卡里程碑按完成数量即时派生', () => {
  const { P } = fresh();
  assert.deepEqual(plain(P.getMilestones().map((item) => item.unlocked)), [false, false, false, false]);
  ['games/number-blocks.html', 'games/fraction-lab.html', 'games/wave-maker.html'].forEach((id) => P.complete(id, '完成'));
  const milestones = P.getMilestones();
  assert.equal(milestones[0].unlocked, true);
  assert.equal(milestones[0].count, 3);
  assert.equal(milestones[0].companion.name, '妙妙');
  assert.equal(milestones[1].unlocked, false);
  milestones[0].title = '篡改';
  assert.equal(P.getMilestones()[0].title, '好奇心起步');
});

test('PLAYFUL 未加载时贴纸与收藏卡安全为空，完成数据仍保留', () => {
  const { P } = fresh({ playful: false });
  P.complete('nature/ocean.html', '完成');
  assert.deepEqual(plain(P.getStickers()), []);
  assert.deepEqual(plain(P.getCards()), []);
  assert.deepEqual(plain(P.getMilestones()), []);
  assert.equal(P.getCompletion('nature/ocean.html').evidence, '完成');
});

test('validateWork 返回清洗后的真实 UTF-8 字节与稳定错误码', () => {
  const { P } = fresh();
  const valid = P.validateWork('nature/ocean.html', { type: 'observation', title: ' 海水 ', content: '越深越暗' });
  assert.equal(valid.ok, true);
  assert.equal(valid.code, 'ok');
  assert.ok(valid.bytes > Buffer.byteLength('海水越深越暗'));
  assert.equal(valid.maxBytes, 12 * 1024);
  assert.equal(valid.maxTotalBytes, 96 * 1024);
  assert.equal(valid.maxCount, 60);
  const oversize = P.validateWork('nature/ocean.html', { type: 'observation', title: '中文记录', content: '文'.repeat(5000) });
  assert.equal(oversize.ok, false);
  assert.equal(oversize.code, 'item-bytes');
  assert.ok(oversize.bytes > oversize.maxBytes);
  assert.equal(P.getWorks().length, 0, '只读校验不得写入作品');
  assert.equal(P.validateWork('nature/ocean.html', { type: 'video', title: '坏类型' }).code, 'type');
  assert.equal(P.validateWork('games/not-listed.html', { type: 'drawing', title: '坏页面' }).code, 'page');
});

test('works 新增、分页读取、更新、删除与防御性副本', () => {
  const { P } = fresh();
  const first = P.saveWork('games/number-blocks.html', { type: 'drawing', title: '十格阵', content: '两种凑十' });
  assert.match(first.id, /^work-/); isISO(first.createdAt);
  const second = P.saveWork({ pageId: 'nature/ocean.html', type: 'observation', title: '光线', content: '越深越暗' });
  assert.equal(P.getWorks().length, 2);
  assert.equal(P.getWorks('nature/ocean.html')[0].id, second.id);
  first.title = '外部篡改';
  assert.equal(P.getWorks('games/number-blocks.html')[0].title, '十格阵');
  const updated = P.saveWork('games/number-blocks.html', { id: first.id, type: 'explanation', title: '凑十解释', content: '5 加 5' });
  assert.equal(updated.id, first.id);
  assert.equal(P.getWorks().length, 2);
  assert.equal(P.deleteWork(second.id), true);
  assert.equal(P.deleteWork(second.id), false);
  assert.equal(P.getWorks().length, 1);
});

test('works 严格清洗字段、类型、页面、控制字符和长度', () => {
  const { P } = fresh();
  assert.equal(P.saveWork('games/not-listed.html', { type: 'drawing', title: 'x' }), null);
  assert.equal(P.saveWork('nature/ocean.html', { type: 'video', title: 'x' }), null);
  assert.equal(P.saveWork('nature/ocean.html', { type: 'drawing', title: ' ', content: '' }), null);
  const work = P.saveWork('nature/ocean.html', { type: 'drawing', title: '\x00' + '题'.repeat(100), content: 'x'.repeat(9000), extra: '不得保留' });
  assert.equal(work.title.length, 80);
  assert.equal(work.content.length, 8000);
  assert.equal('extra' in work, false);
  assert.equal(P.saveWork('nature/ocean.html', { type: 'drawing', title: '超出单项字节', content: '文'.repeat(8000) }), null);
  assert.equal(P.saveWork('nature/space.html', { id: work.id, type: 'drawing', title: '跨页篡改' }), null);
  assert.equal(P.saveWork('nature/ocean.html', { id: 'unknown', type: 'drawing', title: '伪造更新' }), null);
});

test('works 数量上限 60 且导入执行单项 12KiB/总量 96KiB 限制', () => {
  const { P } = fresh({ catalog: false });
  for (let i = 0; i < 60; i++) assert.ok(P.saveWork('games/page.html', { type: 'observation', title: `作品${i}`, content: 'x' }));
  assert.equal(P.saveWork('games/page.html', { type: 'drawing', title: '第61项' }), null);
  assert.equal(P.getWorks().length, 60);

  const works = {};
  for (let i = 0; i < 45; i++) works[`item-${i}`] = {
    id: `ignored-${i}`, pageId: 'games/page.html', type: 'observation', title: `作品${i}`,
    content: 'x'.repeat(3000), createdAt: NOW, updatedAt: NOW
  };
  works.oversize = {
    pageId: 'games/page.html', type: 'observation', title: '超大项',
    content: '文'.repeat(6000), createdAt: NOW, updatedAt: NOW
  };
  const target = fresh({ catalog: false });
  const input = JSON.stringify(validV3({ works }));
  assert.ok(input.length < 1024 * 1024, '测试输入应在导入入口上限内');
  assert.equal(target.P.importJSON(input), true);
  const imported = target.P.getWorks();
  assert.ok(imported.length > 0 && imported.length < 45, `总量限制后实际 ${imported.length}`);
  assert.equal(imported.some((work) => work.id === 'oversize'), false, '单项超限应被丢弃');
  assert.ok(Buffer.byteLength(JSON.stringify(imported)) <= 96 * 1024 + 2000);
});

test('preferences 有固定默认值和值域，写入失败不伪报成功', () => {
  const { P, store } = fresh();
  assert.equal(P.setPreference('soundEnabled', true), true);
  assert.equal(P.setPreference('motion', 'reduced'), true);
  assert.equal(P.setPreference('ageGroup', '7-9'), true);
  assert.equal(P.getPreference('soundEnabled'), true);
  assert.equal(P.getPreference('motion'), 'reduced');
  assert.equal(P.setPreference('motion', 'spin'), false);
  assert.equal(P.setPreference('unknown', true), false);
  assert.equal(P.getPreference('unknown'), null);
  assert.equal(P.getPreference('mode'), 'kid', '新设备 mode 默认孩子模式');
  assert.equal(P.setPreference('mode', 'kid'), true);
  assert.equal(P.getPreference('mode'), 'kid');
  assert.equal(P.setPreference('mode', 'adult'), false, '非法 mode 不得写入');
  assert.equal(P.setPreference('mode', true), false, '非字符串 mode 不得写入');
  assert.equal(P.getPreference('mode'), 'kid', '非法写入不得改变已存值');
  assert.equal(P.setPreference('mode', 'parent'), true);
  assert.equal(P.getPreference('mode'), 'parent');
  store.mode = 'readonly';
  assert.equal(P.setPreference('soundEnabled', false), false);
  assert.equal(P.setPreference('mode', 'kid'), false, '写入失败不得伪报成功');
});

test('v3 JSON 完整往返 pages/notes/completions/works/preferences', () => {
  const source = fresh();
  source.P.visit('games/number-blocks.html', '数感积木');
  source.P.note('games/number-blocks.html', '发现凑十');
  source.P.complete('games/number-blocks.html', '摆出两种十');
  source.P.saveWork('games/number-blocks.html', { type: 'drawing', title: '我的十格阵', content: '蓝5红5' });
  source.P.setPreference('ageGroup', '7-9');
  source.P.setPreference('mode', 'kid');
  const exported = source.P.exportJSON();
  const target = fresh();
  assert.equal(target.P.importJSON(exported), true);
  const data = target.P.all();
  assert.equal(data.schemaVersion, 3);
  assert.equal(data.pages['games/number-blocks.html'].title, '数感积木');
  assert.equal(data.notes['games/number-blocks.html'].t, '发现凑十');
  assert.equal(data.completions['games/number-blocks.html'].evidence, '摆出两种十');
  assert.equal(target.P.getWorks()[0].title, '我的十格阵');
  assert.equal(target.P.getPreference('ageGroup'), '7-9');
  assert.equal(target.P.getPreference('mode'), 'kid', 'mode 必须完整往返');
  assert.match(target.P.exportText(), /我的作品/);
});

test('已有 v3 家长模式偏好不会被新默认值覆盖', () => {
  const saved = validV3({ preferences: { soundEnabled: false, motion: 'system', ageGroup: 'all', mode: 'parent', onlineData: false } });
  const { P, store } = fresh({ seed: { [V3]: saved } });
  assert.equal(P.getPreference('mode'), 'parent');
  assert.equal(P.all().preferences.mode, 'parent');
  assert.equal(store.parsed().preferences.mode, 'parent');
});

test('导入严格清洗非法 works/preferences 且忽略外部 revision', () => {
  const { P, events } = fresh();
  P.visit('games/wave-maker.html', '造波机');
  const dirty = validV3({
    revision: 2147483647,
    works: {
      ok: { pageId: 'nature/ocean.html', type: 'observation', title: '  海水\x00  ', content: '记录', createdAt: NOW, updatedAt: NOW, evil: true },
      badtype: { pageId: 'nature/ocean.html', type: 'script', title: '坏', content: '坏', createdAt: NOW, updatedAt: NOW },
      baddate: { pageId: 'nature/ocean.html', type: 'drawing', title: '坏日期', content: '', createdAt: 'today', updatedAt: NOW }
    },
    preferences: { soundEnabled: 'yes', motion: 'wild', ageGroup: '99', mode: 'adult', onlineData: 'sure' }
  });
  assert.equal(P.importJSON(dirty), true);
  assert.equal(P.all().revision, 2);
  assert.deepEqual(plain(P.getWorks().map((work) => work.id)), ['ok']);
  assert.equal(P.getWorks()[0].title, '海水');
  assert.equal('evil' in P.getWorks()[0], false);
  assert.deepEqual(plain(P.all().preferences), { soundEnabled: false, motion: 'system', ageGroup: 'all', mode: 'kid', onlineData: false });
  assert.equal(events.at(-1).detail.source, 'import');
  dirty.works.ok.title = '外部篡改';
  assert.equal(P.getWorks()[0].title, '海水');
});

test('导入拒绝 v1/v2、损坏和超大 JSON，原数据不变', () => {
  const { P } = fresh();
  P.visit('games/wave-maker.html', '造波机');
  const revision = P.all().revision;
  assert.equal(P.importJSON('{bad'), false);
  assert.equal(P.importJSON(validV2()), false);
  assert.equal(P.importJSON('x'.repeat(1024 * 1024 + 1)), false);
  assert.equal(P.all().revision, revision);
});

test('v3 清洗 pages/recent/notes/completions 数量和日期', () => {
  const pages = {}, notes = {}, completions = {}, recent = [];
  for (let i = 0; i < 1700; i++) {
    const id = `games/page-${String(i).padStart(4, '0')}.html`;
    pages[id] = { n: i ? 1 : 999999999, first: NOW, last: NOW, title: `页面${i}` };
    notes[id] = { t: `笔记${i}`, on: NOW };
    completions[id] = { at: NOW, evidence: `证据${i}` };
    recent.push(id, id);
  }
  const { P } = fresh({ catalog: false, seed: { [V3]: validV3({ revision: -1, updatedAt: 'bad', pages, notes, completions, recent }) } });
  const data = P.all();
  assert.equal(Object.keys(data.pages).length, 1600);
  assert.equal(Object.keys(data.notes).length, 1600);
  assert.equal(Object.keys(data.completions).length, 1600);
  assert.equal(data.recent.length, 12);
  assert.equal(data.pages['games/page-0000.html'].n, 1000000);
  assert.equal(data.revision, 0);
  assert.equal(data.updatedAt, null);
});

test('localStorage 读写失败时所有新增 API 安全降级', () => {
  const { P, store } = fresh();
  store.mode = 'readonly';
  assert.equal(P.visit('games/wave-maker.html', '造波机'), null);
  assert.equal(P.complete('games/wave-maker.html', '完成'), null);
  assert.equal(P.saveWork('games/wave-maker.html', { type: 'drawing', title: '作品' }), null);
  assert.equal(P.deleteWork('missing'), false);
  assert.equal(P.importJSON(validV3()), false);
  assert.equal(P.available(), false);
  store.mode = 'dead';
  assert.doesNotThrow(() => P.all());
  assert.deepEqual(plain(P.getWorks()), []);
  assert.deepEqual(plain(P.getStickers()), []);
  assert.equal(P.getPreference('motion'), 'system');
  assert.equal(P.reset(), false);
});

test('storage 监听 v1/v2/v3，reset 清理三代 key', () => {
  const { P, store, events, storageEvent } = fresh({ seed: { [V1]: {}, [V2]: validV2() } });
  P.all();
  const before = events.length;
  storageEvent({ key: 'other' });
  assert.equal(events.length, before);
  storageEvent({ key: V3 });
  assert.equal(events.at(-1).detail.source, 'storage');
  assert.equal(P.reset(), true);
  assert.equal(store.raw(V1), undefined);
  assert.equal(store.raw(V2), undefined);
  assert.equal(store.raw(V3), undefined);
});

test('all/get/getCompletion/getWorks 均为防御性副本', () => {
  const { P } = fresh();
  P.visit('games/number-blocks.html', '数感积木');
  P.complete('games/number-blocks.html', '原始证据');
  P.saveWork('games/number-blocks.html', { type: 'model', title: '原始作品' });
  const all = P.all();
  all.pages['games/number-blocks.html'].title = '篡改';
  all.preferences.motion = 'full';
  const page = P.get('games/number-blocks.html'); page.title = '再篡改';
  const completion = P.getCompletion('games/number-blocks.html'); completion.evidence = '篡改';
  const works = P.getWorks(); works[0].title = '篡改';
  assert.equal(P.get('games/number-blocks.html').title, '数感积木');
  assert.equal(P.getCompletion('games/number-blocks.html').evidence, '原始证据');
  assert.equal(P.getWorks()[0].title, '原始作品');
  assert.equal(P.getPreference('motion'), 'system');
});

let failed = 0;
for (const { name, fn } of tests) {
  try { await fn(); console.log(`  ✓ ${name}`); }
  catch (error) {
    failed++;
    console.error(`  ✗ ${name}`);
    console.error(`      ${String(error?.stack || error).split('\n').join('\n      ')}`);
  }
}
console.log(`\n${tests.length - failed}/${tests.length} 通过`);
if (failed) process.exit(1);
