/* 全站静态契约检查：无依赖，适用于 file:// 静态站。 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { runInNewContext } from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const EXPECTED_NAV = [
  ['资源库', 'index.html'],
  ['学习路径', 'pages/paths.html'],
  ['互动实验', 'games/index.html'],
  ['探索', 'nature/index.html'],
  ['我的足迹', 'pages/progress.html'],
  ['家长指南', 'pages/parents.html']
];
/* Progress v3 允许的六种作品类型，data/playful.js 与页面表单共用这一份定义。 */
const WORK_TYPES = ['observation', 'prediction', 'drawing', 'model', 'explanation', 'photo-note'];
const errors = [];
const sourceCache = new Map();

async function collect(dir = ROOT, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'tools') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await collect(path, out);
    else if (entry.name.endsWith('.html')) out.push(path);
  }
  return out.sort();
}

function attrs(source) {
  const out = Object.create(null);
  const open = source.match(/^<\s*[^\s/>]+([\s\S]*?)(?:\/?>|$)/)?.[1] || '';
  for (const match of open.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    out[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return out;
}

function plainText(source) {
  return source.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<img\b[^>]*\balt=["']([^"']*)["'][^>]*>/gi, ' $1 ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&(?:amp|#38);/gi, '&')
    .replace(/&(?:lt|#60);/gi, '<')
    .replace(/&(?:gt|#62);/gi, '>')
    .replace(/&(?:quot|#34);/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ').trim();
}

function escapeRe(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function hasClass(a, name) { return String(a.class || '').split(/\s+/).includes(name); }
function rootRelative(path) { return relative(ROOT, path).split(sep).join('/'); }
function localTarget(from, ref) {
  const raw = ref.split('#')[0].split('?')[0];
  let decoded;
  try { decoded = decodeURIComponent(raw); } catch { decoded = raw; }
  return resolve(dirname(from), decoded || '.');
}
async function isFile(path) {
  try { return (await stat(path)).isFile(); } catch { return false; }
}
async function source(path) {
  if (!sourceCache.has(path)) sourceCache.set(path, await readFile(path, 'utf8'));
  return sourceCache.get(path);
}

function labelRanges(html) {
  return [...html.matchAll(/<label\b[^>]*>[\s\S]*?<\/label\s*>/gi)].map((match) => ({
    start: match.index,
    end: match.index + match[0].length,
    text: plainText(match[0])
  }));
}

function accessibleName(match, html, ids, labels) {
  const tag = match[1].toLowerCase();
  const markup = match[0];
  const a = attrs(markup);
  if (String(a['aria-label'] || '').trim() || String(a.title || '').trim()) return true;
  if (a['aria-labelledby']) {
    const refs = a['aria-labelledby'].trim().split(/\s+/);
    if (refs.length && refs.every((id) => ids.has(id))) return true;
  }
  if (tag === 'input' && String(a.type || '').toLowerCase() === 'hidden') return true;
  if (tag === 'input' && /^(button|submit|reset)$/.test(String(a.type || '').toLowerCase()) && String(a.value || '').trim()) return true;
  if ((tag === 'button' || tag === 'a' || a.role) && plainText(markup)) return true;
  if (a.id && new RegExp(`<label\\b[^>]*\\bfor=["']${escapeRe(a.id)}["']`, 'i').test(html)) return true;
  if (labels.some((label) => match.index > label.start && match.index < label.end && label.text)) return true;
  return false;
}

function checkIdReferences(html, ids, fail) {
  for (const match of html.matchAll(/\b(aria-labelledby|aria-describedby|aria-controls|for)=["']([^"']+)["']/gi)) {
    for (const id of match[2].trim().split(/\s+/)) {
      if (id && !ids.has(id)) fail(`${match[1]} 引用了不存在的 #${id}`);
    }
  }
}

function allResourceRefs(html) {
  const refs = [];
  for (const match of html.matchAll(/<([a-z][\w:-]*)\b[^>]*>/gi)) {
    const tag = match[1].toLowerCase();
    const a = attrs(match[0]);
    const fields = [];
    if (['a', 'link'].includes(tag)) fields.push('href');
    if (['script', 'img', 'iframe', 'audio', 'video', 'source', 'track', 'embed', 'input'].includes(tag)) fields.push('src');
    if (tag === 'video') fields.push('poster');
    if (tag === 'object') fields.push('data');
    if (tag === 'form') fields.push('action');
    for (const field of fields) if (a[field]) refs.push({ tag, field, ref: a[field], markup: match[0] });
    if (a.srcset) {
      for (const candidate of a.srcset.split(',')) {
        const ref = candidate.trim().split(/\s+/)[0];
        if (ref) refs.push({ tag, field: 'srcset', ref, markup: match[0] });
      }
    }
  }
  return refs;
}

function scriptSources(html, path) {
  return [...html.matchAll(/<script\b[^>]*>/gi)].map((match) => {
    const a = attrs(match[0]);
    return a.src ? rootRelative(localTarget(path, a.src)) : null;
  });
}

const catalogPath = join(ROOT, 'data', 'explorations.js');
let catalog = [];
try {
  const sandbox = { window: {} };
  runInNewContext(await source(catalogPath), sandbox, { filename: 'data/explorations.js', timeout: 1000 });
  catalog = Array.isArray(sandbox.window.EXPLORATIONS) ? sandbox.window.EXPLORATIONS : [];
} catch (error) {
  errors.push(`data/explorations.js: 无法作为 classic script 载入: ${error.message}`);
}

const catalogById = new Map();
for (const [index, item] of catalog.entries()) {
  const where = `data/explorations.js[${index}]`;
  if (!item || typeof item !== 'object') { errors.push(`${where}: 条目必须是对象`); continue; }
  const id = String(item.id || '');
  if (!/^(games|nature)\/[a-z0-9][a-z0-9._-]*\.html$/i.test(id)) errors.push(`${where}: 非法 id: ${id || '(空)'}`);
  if (catalogById.has(id)) errors.push(`${where}: 重复 id: ${id}`);
  else catalogById.set(id, item);
  const expectedType = id.startsWith('games/') ? 'experiment' : id.startsWith('nature/') ? 'nature' : '';
  if (expectedType && item.type !== expectedType) errors.push(`${where}: ${id} 的 type 应为 ${expectedType}`);
  if (item.file !== id.split('/').at(-1)) errors.push(`${where}: file 与 id 不一致`);
  for (const key of ['title', 'description', 'task', 'age']) {
    if (!String(item[key] || '').trim()) errors.push(`${where}: 缺少 ${key}`);
  }
  if (item.ready !== true) errors.push(`${where}: ready 应明确为 true`);
  if (id && !(await isFile(join(ROOT, id)))) errors.push(`${where}: 页面不存在: ${id}`);
}

const playfulDataPath = join(ROOT, 'data', 'playful.js');
let playful = null;
try {
  const sandbox = { window: {} };
  runInNewContext(await source(playfulDataPath), sandbox, { filename: 'data/playful.js', timeout: 1000 });
  playful = sandbox.window.PLAYFUL;
} catch (error) {
  errors.push(`data/playful.js: 无法作为 classic script 载入: ${error.message}`);
}
if (!playful || typeof playful !== 'object' || Array.isArray(playful)) {
  errors.push('data/playful.js: 必须暴露 window.PLAYFUL 对象');
} else {
  const characters = Array.isArray(playful.characters) ? playful.characters : [];
  if (characters.length !== 4) errors.push(`data/playful.js: characters 应恰好 4 个，实际 ${characters.length}`);
  const characterIds = new Set();
  characters.forEach((character, index) => {
    const where = `data/playful.js characters[${index}]`;
    if (!character || typeof character !== 'object') { errors.push(`${where}: 必须是对象`); return; }
    const id = String(character.id || '');
    if (!/^[a-z][a-z0-9_-]{0,31}$/.test(id) || characterIds.has(id)) errors.push(`${where}: id 非法或重复: ${id || '(空)'}`);
    characterIds.add(id);
    for (const key of ['name', 'emoji', 'role', 'motto']) if (!String(character[key] || '').trim()) errors.push(`${where}: 缺少 ${key}`);
  });

  const tones = playful.ageTones && typeof playful.ageTones === 'object' ? playful.ageTones : {};
  for (const age of ['all', '4-6', '7-9', '10-12']) {
    if (!tones[age] || !String(tones[age].lead || '').trim() || !String(tones[age].detail || '').trim()) errors.push(`data/playful.js: ageTones 缺少完整 ${age} 语气`);
  }
  const workTypes = Array.isArray(playful.workTypes) ? playful.workTypes : [];
  if (workTypes.map((item) => item && item.id).join('|') !== WORK_TYPES.join('|')) errors.push('data/playful.js: workTypes 类型或顺序不符合 Progress v3 契约');

  const playfulPages = playful.pages && typeof playful.pages === 'object' && !Array.isArray(playful.pages) ? playful.pages : {};
  const playfulIds = Object.keys(playfulPages);
  if (playfulIds.length !== 17) errors.push(`data/playful.js: pages 应恰好 17 项，实际 ${playfulIds.length}`);
  for (const id of catalogById.keys()) {
    const item = playfulPages[id];
    const where = `data/playful.js pages[${JSON.stringify(id)}]`;
    if (!item || typeof item !== 'object') { errors.push(`${where}: 缺少目录对应项`); continue; }
    if (!characterIds.has(item.companion)) errors.push(`${where}: companion 不在 4 个角色中`);
    const sticker = item.sticker;
    if (!sticker || !/^[a-z0-9][a-z0-9_-]{0,63}$/.test(String(sticker.id || '')) || !String(sticker.label || '').trim() || !String(sticker.emoji || '').trim()) errors.push(`${where}: sticker 不完整`);
    if (!Array.isArray(item.surprises) || item.surprises.length < 2 || item.surprises.length > 4 || item.surprises.some((task) => !String(task || '').trim())) errors.push(`${where}: surprises 必须是 2–4 条非空任务`);
  }
  for (const id of playfulIds) if (!catalogById.has(id)) errors.push(`data/playful.js: pages 含目录外 id: ${id}`);
  if (/金币|排行|连胜|倒计时|\b(?:coin|leaderboard|streak|countdown)s?\b/i.test(JSON.stringify(playful))) errors.push('data/playful.js: 不得包含金币、排行、连胜或倒计时机制');
}

const playfulRuntime = await source(join(ROOT, 'assets', 'js', 'playful.js'));
try {
  const sandbox = { window: { PLAYFUL: playful, addEventListener() {} } };
  runInNewContext(playfulRuntime, sandbox, { filename: 'assets/js/playful.js', timeout: 1000 });
  const api = sandbox.window.Playful;
  for (const name of ['init', 'page', 'companion', 'tone', 'randomTask', 'getSticker', 'completionFeedback', 'saveWork', 'validateWork', 'getPreference', 'setPreference', 'motionReduced']) {
    if (!api || typeof api[name] !== 'function') errors.push(`assets/js/playful.js: 缺少 Playful.${name}()`);
  }
} catch (error) {
  errors.push(`assets/js/playful.js: 无 DOM 时载入失败: ${error.message}`);
}

const WORK_TYPE_VALUES = ['observation', 'prediction', 'drawing', 'model', 'explanation', 'photo-note'];
const DEPRECATED_CLASSES = ['playful-work-form', 'playful-work-fields', 'playful-work-status'];

const baseCss = await source(join(ROOT, 'assets', 'css', 'base.css'));
if (!/:focus-visible|:focus\b/.test(baseCss)) errors.push('assets/css/base.css: 缺少共享键盘焦点样式');
if (!/@media\s*\([^)]*prefers-reduced-motion\s*:\s*reduce/i.test(baseCss)) errors.push('assets/css/base.css: 缺少 prefers-reduced-motion: reduce');
for (const token of [
  'playful-companion', 'playful-sticker', 'task-map', 'playful-confetti',
  'work-card', 'work-card-title', 'work-card-meta', 'work-card-content',
  'work-card-form', 'work-card-fields', 'work-card-status'
]) {
  if (!baseCss.includes(`.${token}`)) errors.push(`assets/css/base.css: 缺少 .${token} 共享样式`);
}

/* 阶段 2：孩子模式主题层必须存在，且规则都挂在 html[data-mode] 下。 */
const kidCssPath = join(ROOT, 'assets', 'css', 'kid.css');
if (!(await isFile(kidCssPath))) {
  errors.push('assets/css/kid.css: 孩子模式主题层缺失');
} else {
  const kidCss = await source(kidCssPath);
  if (!/html\[data-mode=["']kid["']\]/.test(kidCss)) errors.push('assets/css/kid.css: 必须用 html[data-mode="kid"] 作用域，不得无条件覆盖家长模式');
  if (!/\[data-audience=["']parent["']\]/.test(kidCss)) errors.push('assets/css/kid.css: 缺少孩子模式隐藏 data-audience="parent" 的规则');
  for (const token of DEPRECATED_CLASSES) {
    if (kidCss.includes(`.${token}`)) errors.push(`assets/css/kid.css: 仍引用已废弃类名 .${token}，应改用 .work-card 家族`);
  }
}

/* 阶段 2：废弃的 .playful-work-* 类名不得残留在任何共享 CSS / JS 里。 */
for (const rel of ['assets/css/base.css', 'assets/css/print.css', 'assets/js/playful.js', 'assets/js/progress.js']) {
  const path = join(ROOT, ...rel.split('/'));
  if (!(await isFile(path))) continue;
  const text = await source(path);
  for (const token of DEPRECATED_CLASSES) {
    /* data-playful-work-status 是接入点属性名，不是类名；只在 . 或 class 语境下判违规。 */
    if (new RegExp(`\\.${escapeRe(token)}\\b|class=["'][^"']*\\b${escapeRe(token)}\\b`).test(text)) {
      errors.push(`${rel}: 仍引用已废弃类名 ${token}，应改用 .work-card 家族`);
    }
  }
}

/* 阶段 2：pwa.js 必须只在 https/localhost 注册 SW，file:// 下静默跳过。 */
const pwaPath = join(ROOT, 'assets', 'js', 'pwa.js');
if (!(await isFile(pwaPath))) {
  errors.push('assets/js/pwa.js: 缺失，26 个页面都引用它');
} else {
  const pwaJs = await source(pwaPath);
  if (!/https:/.test(pwaJs) || !/localhost/.test(pwaJs)) errors.push('assets/js/pwa.js: 必须显式判断 https:/localhost，file:// 下不得注册 Service Worker');
  if (!/serviceWorker/.test(pwaJs)) errors.push('assets/js/pwa.js: 缺少 serviceWorker 注册逻辑');
  if (!/\.catch\s*\(/.test(pwaJs)) errors.push('assets/js/pwa.js: 注册失败必须被捕获，不得留下未处理异常');
}

/* 阶段 2：manifest 必须是可解析 JSON 且只用相对路径。 */
const manifestPath = join(ROOT, 'manifest.webmanifest');
if (!(await isFile(manifestPath))) {
  errors.push('manifest.webmanifest: 缺失，26 个页面都引用它');
} else {
  let manifest = null;
  try { manifest = JSON.parse(await source(manifestPath)); } catch (error) {
    errors.push(`manifest.webmanifest: 不是合法 JSON: ${error.message}`);
  }
  if (manifest) {
    for (const key of ['name', 'short_name', 'start_url', 'scope', 'icons']) {
      if (!manifest[key]) errors.push(`manifest.webmanifest: 缺少 ${key}`);
    }
    for (const [key, value] of [['start_url', manifest.start_url], ['scope', manifest.scope]]) {
      if (typeof value === 'string' && value.startsWith('/')) errors.push(`manifest.webmanifest: ${key} 不得使用根路径: ${value}`);
    }
    for (const [index, icon] of (Array.isArray(manifest.icons) ? manifest.icons : []).entries()) {
      const src = icon && typeof icon.src === 'string' ? icon.src : '';
      if (!src) { errors.push(`manifest.webmanifest: icons[${index}] 缺少 src`); continue; }
      if (src.startsWith('/')) { errors.push(`manifest.webmanifest: icons[${index}].src 不得使用根路径: ${src}`); continue; }
      if (!(await isFile(resolve(ROOT, src)))) errors.push(`manifest.webmanifest: icons[${index}].src 在磁盘上不存在: ${src}`);
    }
  }
}

/* 阶段 2：sw.js 的 CORE 清单任一条目 404 会让 install 整体失败，必须逐个核对磁盘。 */
const swPath = join(ROOT, 'sw.js');
if (!(await isFile(swPath))) {
  errors.push('sw.js: 缺失，pwa.js 会注册不到 Service Worker');
} else {
  const swJs = await source(swPath);
  const coreMatch = swJs.match(/\bCORE\s*=\s*\[([\s\S]*?)\]/);
  if (!coreMatch) {
    errors.push('sw.js: 找不到 CORE 数组');
  } else {
    const corePaths = [...coreMatch[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map((match) => match[1]);
    if (!corePaths.length) errors.push('sw.js: CORE 数组为空');
    const seen = new Set();
    for (const ref of corePaths) {
      if (seen.has(ref)) { errors.push(`sw.js: CORE 重复条目: ${ref}`); continue; }
      seen.add(ref);
      if (ref.startsWith('/') || /^[a-z]+:/i.test(ref)) { errors.push(`sw.js: CORE 条目必须是相对路径: ${ref}`); continue; }
      /* "./" 是导航兜底入口，对应 index.html，不是磁盘文件。 */
      if (ref === './' || ref === '.') continue;
      const target = resolve(ROOT, ref);
      const outside = relative(ROOT, target).startsWith(`..${sep}`);
      if (outside || !(await isFile(target))) errors.push(`sw.js: CORE 列出的文件在磁盘上不存在: ${ref}（addAll 任一 404 会让 install 整体失败）`);
    }
    for (const required of ['./assets/css/base.css', './assets/css/kid.css', './assets/css/print.css', './assets/js/pwa.js', './manifest.webmanifest']) {
      if (!corePaths.includes(required)) errors.push(`sw.js: CORE 缺少必需的共享文件: ${required}`);
    }
    if (!/\bCACHE\s*=\s*["'][^"']*v(\d+)["']/.test(swJs)) errors.push('sw.js: CACHE 名称必须带版本号，改动 CORE 后要升版本');
  }
}

const files = await collect();
for (const path of files) {
  const rel = rootRelative(path);
  const html = await source(path);
  const fail = (message) => errors.push(`${rel}: ${message}`);

  if (!/^\s*<!doctype\s+html>/i.test(html)) fail('缺少 HTML5 doctype');
  if (!/<html\b[^>]*\blang=["']zh-CN["']/i.test(html)) fail('缺少 html lang="zh-CN"');
  if (!/<meta\b[^>]*\bcharset=["']?utf-8/i.test(html)) fail('缺少 UTF-8 charset');
  if (!/<meta\b[^>]*\bname=["']viewport["'][^>]*\bcontent=["'][^"']*width=device-width/i.test(html)) fail('缺少移动端 viewport');
  if (!/<title>\s*[^<]+\s*<\/title>/i.test(html)) fail('缺少非空 title');
  if ((html.match(/<h1\b/gi) || []).length !== 1) fail(`h1 应恰好 1 个，实际 ${(html.match(/<h1\b/gi) || []).length}`);
  if (!/<main\b/i.test(html)) fail('缺少 main landmark');
  // 只在可执行位置检查阻塞式弹窗：<script> 体与内联 on* 属性。
  // 文档正文里提到 alert() 是说明文字，不是调用。
  const executable = [
    ...[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)].map((m) => m[1]),
    ...[...html.matchAll(/\bon[a-z]+\s*=\s*"([^"]*)"/gi)].map((m) => m[1]),
    ...[...html.matchAll(/\bon[a-z]+\s*=\s*'([^']*)'/gi)].map((m) => m[1])
  ].join('\n');
  if (/\balert\s*\(/.test(executable)) fail('禁止使用 alert()');
  if (/\bconfirm\s*\(/.test(executable)) fail('禁止使用 confirm()');
  if (/<script\b[^>]*\btype=["']module["']/i.test(html)) fail('file:// 页面禁止 module script');

  const idList = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const ids = new Set(idList);
  const duplicateIds = [...new Set(idList.filter((id, index) => idList.indexOf(id) !== index))];
  if (duplicateIds.length) fail(`重复 id: ${duplicateIds.join(', ')}`);
  checkIdReferences(html, ids, fail);

  const skip = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi)].find((match) => hasClass(attrs(match[0]), 'skip-link'));
  if (!skip) fail('缺少跳到主要内容链接');
  else {
    const href = attrs(skip[0]).href || '';
    if (!/^#[^#]+$/.test(href) || !ids.has(href.slice(1))) fail('跳到主要内容链接未指向本页现有 id');
  }

  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => attrs(match[0]));
  const baseIndex = links.findIndex((a) => /(?:^|\/)assets\/css\/base\.css(?:[?#]|$)/i.test(a.href || ''));
  const kidIndex = links.findIndex((a) => /(?:^|\/)assets\/css\/kid\.css(?:[?#]|$)/i.test(a.href || ''));
  const printIndex = links.findIndex((a) => /(?:^|\/)assets\/css\/print\.css(?:[?#]|$)/i.test(a.href || ''));
  if (baseIndex < 0) fail('未加载 base.css');
  if (printIndex < 0) fail('未加载 print.css');
  else if (String(links[printIndex].media || '').toLowerCase() !== 'print') fail('print.css 必须使用 media="print"');
  if (baseIndex >= 0 && printIndex >= 0 && printIndex < baseIndex) fail('print.css 必须在 base.css 之后加载');
  /* 阶段 2：孩子模式主题层必须每页接入，且夹在 base.css 与 print.css 之间。 */
  if (kidIndex < 0) fail('未加载 assets/css/kid.css，孩子模式在本页会失效');
  else {
    if (String(links[kidIndex].media || '').toLowerCase() === 'print') fail('kid.css 不得使用 media="print"，它是屏幕主题层');
    if (baseIndex >= 0 && kidIndex < baseIndex) fail('kid.css 必须在 base.css 之后加载，否则覆盖不到共享变量');
    if (printIndex >= 0 && kidIndex > printIndex) fail('kid.css 必须在 print.css 之前加载（顺序应为 base.css → kid.css → print.css）');
  }

  /* 阶段 2：PWA 接线必须每页齐全，缺一页就会掉出离线壳。 */
  const manifestLink = links.find((a) => /(?:^|\/)manifest\.webmanifest(?:[?#]|$)/i.test(a.href || ''));
  if (!manifestLink) fail('未加载 manifest.webmanifest');
  else if (!/\bmanifest\b/i.test(String(manifestLink.rel || ''))) fail('manifest.webmanifest 必须用 rel="manifest" 引用');
  const pageScriptsAll = scriptSources(html, path);
  if (!pageScriptsAll.includes('assets/js/pwa.js')) fail('未加载 assets/js/pwa.js，本页无法进入离线应用');

  /* 阶段 2：已废弃的 .playful-work-* 类名不得在页面 class 或页内 <style> 里复活。 */
  for (const token of DEPRECATED_CLASSES) {
    const inClass = [...html.matchAll(/\bclass=["']([^"']*)["']/gi)].some((match) => match[1].split(/\s+/).includes(token));
    const inStyle = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)].some((match) => new RegExp(`\\.${escapeRe(token)}\\b`).test(match[1]));
    if (inClass || inStyle) fail(`使用了已废弃类名 ${token}，作品表单必须统一到 .work-card 家族`);
  }
  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)) {
    if (/^\s*\.work-card[\w-]*\s*(?:,|\{)/m.test(match[1])) fail('页面 <style> 不得重复定义 .work-card* 共享类，样式应只在 base.css 中');
  }

  const navBlocks = [...html.matchAll(/<nav\b[^>]*>[\s\S]*?<\/nav\s*>/gi)];
  const nav = navBlocks.find((match) => hasClass(attrs(match[0]), 'nav'));
  if (!nav) fail('缺少主导航 .nav');
  else {
    const navLinks = [...nav[0].matchAll(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi)]
      .filter((match) => hasClass(attrs(match[0]), 'nav-link'));
    const labels = navLinks.map((match) => plainText(match[0]));
    if (labels.join('|') !== EXPECTED_NAV.map((item) => item[0]).join('|')) fail(`导航应为固定六项，实际: ${labels.join(' / ')}`);
    navLinks.forEach((match, index) => {
      if (!EXPECTED_NAV[index]) return;
      const href = attrs(match[0]).href || '';
      if (/^(?:\/|[a-z]+:)/i.test(href) || localTarget(path, href) !== join(ROOT, EXPECTED_NAV[index][1])) {
        fail(`导航“${EXPECTED_NAV[index][0]}”链接错误: ${href || '(空)'}`);
      }
    });
    const current = navLinks.filter((match) => attrs(match[0])['aria-current'] === 'page').length;
    if (current !== 1) fail(`主导航 aria-current 应恰好 1 个，实际 ${current}`);
  }

  const labels = labelRanges(html);
  const interactive = /<(button|a)\b[^>]*>[\s\S]*?<\/\1\s*>|<(input|select|textarea|canvas)\b[^>]*>|<([a-z][\w:-]*)\b[^>]*\brole=["'](?:button|link|tab|checkbox|radio|switch|slider)["'][^>]*>[\s\S]*?<\/\3\s*>/gi;
  for (const match of html.matchAll(interactive)) {
    const tag = (match[1] || match[2] || match[3]).toLowerCase();
    const a = attrs(match[0]);
    if (tag === 'a' && !a.href && !a.role) continue;
    if (!accessibleName({ 0: match[0], 1: tag, index: match.index }, html, ids, labels)) {
      fail(`控件缺少可访问名称${a.id ? ` (#${a.id})` : ''}`);
    }
    const customControlRole = /^(button|link|tab|checkbox|radio|switch|slider)$/i.test(a.role || '');
    if (customControlRole && !['button', 'a', 'input', 'select', 'textarea'].includes(tag) && !('tabindex' in a)) {
      fail(`自制 ${a.role} 控件缺少 tabindex${a.id ? ` (#${a.id})` : ''}`);
    }
  }
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const a = attrs(match[0]);
    if (!('alt' in a)) fail(`图片缺少 alt${a.id ? ` (#${a.id})` : ''}`);
  }

  for (const { tag, field, ref } of allResourceRefs(html)) {
    if (/^javascript:/i.test(ref)) { fail(`禁止 javascript: 引用: ${ref}`); continue; }
    if (/^(?:https?:)?\/\//i.test(ref)) {
      if (tag === 'script' || (tag === 'link' && /stylesheet/i.test(attrs(`<x ${field}="${ref}">`).rel || 'stylesheet'))) {
        fail(`禁止远程脚本或样式依赖: ${ref}`);
      }
      continue;
    }
    if (/^(?:data:|blob:|mailto:|tel:)/i.test(ref)) continue;
    if (ref.startsWith('/')) { fail(`站内引用不得使用根路径: ${ref}`); continue; }
    if (ref.startsWith('#')) {
      if (!ids.has(ref.slice(1))) fail(`页内链接不存在: ${ref}`);
      continue;
    }
    const target = localTarget(path, ref);
    const outside = relative(ROOT, target).startsWith(`..${sep}`) || relative(ROOT, target) === '..';
    if (outside || !(await isFile(target))) fail(`站内资源不存在: ${ref}`);
  }

  for (const match of html.matchAll(/\bfetch\s*\(\s*(["'])(.*?)\1/gi)) {
    if (!/^(?:https?:)?\/\//i.test(match[2]) && !/^(?:data:|blob:)/i.test(match[2])) fail(`禁止用 fetch() 读取站内文件: ${match[2]}`);
  }

  /* 阶段 1 兼容：不要求页面立即接入；只校验已选择接入的页面。 */
  const pageScripts = scriptSources(html, path);
  const playfulIndex = pageScripts.indexOf('assets/js/playful.js');
  if (playfulIndex >= 0) {
    const playfulDataIndex = pageScripts.indexOf('data/playful.js');
    const progressIndex = pageScripts.indexOf('assets/js/progress.js');
    if (playfulDataIndex < 0) fail('加载 playful.js 时必须先加载 data/playful.js');
    else if (playfulDataIndex > playfulIndex) fail('data/playful.js 必须先于 playful.js 加载');
    if (progressIndex >= 0 && progressIndex > playfulIndex) fail('已加载 progress.js 时必须先于 playful.js 加载');
  }

  const top = rel.split('/')[0];
  const detail = (top === 'games' || top === 'nature') && !rel.endsWith('/index.html');
  if (detail) {
    if (!catalogById.has(rel)) fail('详情页不在唯一探索目录中');
    const scripts = scriptSources(html, path);
    const catalogIndex = scripts.indexOf('data/explorations.js');
    const progressIndex = scripts.indexOf('assets/js/progress.js');
    const playfulDataIndex = scripts.indexOf('data/playful.js');
    const playfulUiIndex = scripts.indexOf('assets/js/playful.js');
    if (catalogIndex < 0) fail('详情页未加载唯一探索目录 data/explorations.js');
    if (progressIndex < 0) fail('详情页未加载 progress.js');
    if (playfulDataIndex < 0) fail('详情页未加载童趣资料 data/playful.js');
    if (playfulUiIndex < 0) fail('详情页未加载童趣组件 playful.js');
    if (catalogIndex >= 0 && progressIndex >= 0 && catalogIndex > progressIndex) fail('explorations.js 必须先于 progress.js 加载');
    if (progressIndex >= 0 && playfulDataIndex >= 0 && progressIndex > playfulDataIndex) fail('progress.js 必须先于 data/playful.js 加载');
    if (playfulDataIndex >= 0 && playfulUiIndex >= 0 && playfulDataIndex > playfulUiIndex) fail('data/playful.js 必须先于 playful.js 加载');
    if (!/data-playful-page\s*=/.test(html)) fail('详情页缺少 data-playful-page 页面标识');
    if (!/data-playful-companion(?:\s|=|>)/.test(html)) fail('详情页缺少探索伙伴接入点');
    if (!/data-playful-sticker(?:\s|=|>)/.test(html)) fail('详情页缺少贴纸接入点');
    if (!/data-playful-random-task(?:\s|=|>)/.test(html)) fail('详情页缺少随机探索任务入口');

    /* 阶段 2：作品表单必须真的接线，不只是长得像表单。 */
    const workForms = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form\s*>/gi)]
      .filter((match) => /data-playful-work-form(?:\s|=|>|\/)/.test(match[0].match(/^<form\b[^>]*>/i)?.[0] || ''));
    if (!workForms.length) fail('详情页缺少作品表单接入点 data-playful-work-form');
    else if (workForms.length > 1) fail(`详情页应恰好 1 个 data-playful-work-form，实际 ${workForms.length} 个`);
    for (const form of workForms) {
      const body = form[0];
      for (const field of ['type', 'title', 'content']) {
        if (!new RegExp(`\\bname=["']${field}["']`, 'i').test(body)) fail(`作品表单缺少 name="${field}" 字段，playful.js 无法读取该值`);
      }
      if (!/data-playful-work-status(?:\s|=|>|\/)/.test(body)) fail('作品表单缺少 data-playful-work-status 状态行，保存结果无法用文字宣告');
      else {
        const status = body.match(/<([a-z][\w-]*)\b[^>]*\bdata-playful-work-status\b[^>]*>/i);
        const statusAttrs = status ? attrs(status[0]) : {};
        if (String(statusAttrs.role || '').toLowerCase() !== 'status' && !statusAttrs['aria-live']) {
          fail('作品表单状态行必须带 role="status" 或 aria-live，保存结果才会被宣告');
        }
      }
      /* type 可以是让孩子选的 <select>，也可以是页面自动生成快照时钉死的 hidden input；
         两种写法都必须只产出 6 种合法作品类型。 */
      const typeSelect = body.match(/<select\b[^>]*\bname=["']type["'][^>]*>[\s\S]*?<\/select\s*>/i);
      const typeInput = body.match(/<input\b[^>]*\bname=["']type["'][^>]*>/i);
      if (typeSelect) {
        const options = [...typeSelect[0].matchAll(/<option\b[^>]*\bvalue=["']([^"']*)["']/gi)].map((match) => match[1]);
        if (!options.length) fail('作品表单 type 下拉没有任何 option value');
        for (const value of options) {
          if (!WORK_TYPES.includes(value)) fail(`作品表单 type 的 option value "${value}" 不是合法作品类型，只能取 ${WORK_TYPES.join(' / ')}`);
        }
      } else if (typeInput) {
        const value = attrs(typeInput[0]).value || '';
        if (!WORK_TYPES.includes(value)) fail(`作品表单固定的 type 值 "${value || '(空)'}" 不是合法作品类型，只能取 ${WORK_TYPES.join(' / ')}`);
      } else {
        fail('作品表单的 name="type" 必须是 <select> 或钉死合法类型的 <input>，否则保存时类型会被清洗掉');
      }
      if (/\bProgress\s*\.\s*saveWork\b|\bPlayful\s*\.\s*saveWork\b/.test(body)) fail('作品表单内不得自写保存逻辑，交给 playful.js 的 bindWorkForm()');
    }
    if (!new RegExp(`Progress\\.visit\\(\\s*["']${escapeRe(rel)}["']`).test(html)) fail('详情页未以自身目录 id 调用 Progress.visit()');
    if (!new RegExp(`Progress\\.complete\\(\\s*["']${escapeRe(rel)}["']`).test(html)) fail('详情页没有用 Progress.complete() 记录独立任务完成');
    if (/kids-stem:progress:/.test(html)) fail('详情页仍包含复制的存储 key');
    if (/连胜|当前连对|\bstreak\b/i.test(html)) fail('详情页不得实现连胜、连对归零或 streak 状态');
  }
  if (top === 'games' && detail) {
    for (const phrase of ['这在教什么', '给家长', '背后的原理']) if (!html.includes(phrase)) fail(`实验页缺少“${phrase}”`);
  }
}

for (const id of catalogById.keys()) {
  if (!files.some((path) => rootRelative(path) === id)) errors.push(`data/explorations.js: 目录 id 没有对应 HTML: ${id}`);
}

console.log(`检查 ${files.length} 个 HTML、${catalog.length} 个探索目录条目`);
if (errors.length) {
  for (const error of errors) console.error(`  ✗ ${error}`);
  console.error(`\n${errors.length} 项契约错误`);
  process.exit(1);
}
console.log('  ✓ 静态契约全部通过');
