/* 抽出物种页 / 克隆工坊页里逐字节相同的外壳 CSS，页面只留独有规则。
 *
 *   node tools/_extract-shared-css.mjs --dry
 *   node tools/_extract-shared-css.mjs
 *
 * 判据：把页面 <style> 拆成顶层规则（@media 整块算一条），规范化空白后
 * 若与共享层某条完全相同就删。只有删掉的条数达到共享层的 45%，才给该页
 * 挂上共享 CSS——避免 weather / gravity-drop 这类独有大页只因 .hero 碰巧
 * 相同就被灌进一整套 .gn-* / .sk-* 覆盖。前缀变体页（.td-* 换掉 .gn-*）
 * 大约命中 18–21 条，45% 能挂上；恐龙/天气那种独有大页远低于此。
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const dry = process.argv.includes('--dry');
const VERSION = '412';

function splitTopLevelRules(css) {
  const rules = [];
  let i = 0;
  const n = css.length;
  while (i < n) {
    while (i < n && /\s/.test(css[i])) i += 1;
    if (i >= n) break;
    if (css[i] === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end < 0 ? n : end + 2;
      continue;
    }
    const start = i;
    let depth = 0;
    let seen = false;
    while (i < n) {
      const ch = css[i];
      if (ch === '{') {
        depth += 1;
        seen = true;
      } else if (ch === '}') {
        depth -= 1;
        i += 1;
        if (seen && depth === 0) break;
        continue;
      }
      i += 1;
    }
    const raw = css.slice(start, i);
    if (raw.trim()) rules.push(raw);
  }
  return rules;
}

function normalizeRule(rule) {
  return rule
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function firstStyle(html) {
  const match = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!match) return null;
  return { full: match[0], css: match[1], index: match.index };
}

function insertAfterKid(html, href) {
  const file = href.split('?')[0];
  if (html.includes(file)) return html;
  const re = /(<link\b[^>]*href="[^"]*assets\/css\/kid\.css\?v=\d+"[^>]*>)/i;
  if (!re.test(html)) throw new Error('找不到 kid.css 的 link');
  return html.replace(re, `$1\n<link rel="stylesheet" href="${href}">`);
}

async function extractFrom(sampleRel, outRel, header) {
  const html = await readFile(join(ROOT, sampleRel), 'utf8');
  const block = firstStyle(html);
  if (!block) throw new Error(`${sampleRel} 没有 <style>`);
  const css = `${header}\n${block.css.trim()}\n`;
  const rules = splitTopLevelRules(block.css);
  const set = new Set(rules.map(normalizeRule));
  if (!dry) await writeFile(join(ROOT, outRel), css, 'utf8');
  return { rules, set, count: rules.length, bytes: css.length };
}

async function processDir(dir, sharedHref, sharedSet, sharedCount) {
  const names = (await readdir(join(ROOT, dir))).filter((n) => n.endsWith('.html') && n !== 'index.html').sort();
  let linked = 0;
  let emptied = 0;
  let partial = 0;
  let skipped = 0;
  const threshold = Math.ceil(sharedCount * 0.45);
  for (const name of names) {
    const rel = `${dir}/${name}`;
    const path = join(ROOT, rel);
    let html = await readFile(path, 'utf8');
    const block = firstStyle(html);
    if (!block) {
      skipped += 1;
      continue;
    }
    const pageRules = splitTopLevelRules(block.css);
    const kept = [];
    let stripped = 0;
    for (const rule of pageRules) {
      if (sharedSet.has(normalizeRule(rule))) stripped += 1;
      else kept.push(rule);
    }
    if (stripped < threshold) {
      skipped += 1;
      continue;
    }
    let nextHtml;
    if (!kept.length) {
      nextHtml = html.slice(0, block.index) + html.slice(block.index + block.full.length);
      nextHtml = nextHtml.replace(/\n{3,}/g, '\n\n');
      emptied += 1;
    } else {
      const inner = `\n${kept.join('\n')}\n`;
      nextHtml = html.slice(0, block.index) + `<style>${inner}</style>` + html.slice(block.index + block.full.length);
      partial += 1;
    }
    nextHtml = insertAfterKid(nextHtml, sharedHref);
    linked += 1;
    if (!dry && nextHtml !== html) await writeFile(path, nextHtml, 'utf8');
  }
  return { total: names.length, linked, emptied, partial, skipped, threshold };
}

const natureHeader = `/* 自然专题详情页共用外壳（.hero .kid-hero-scene .mission-face .stage .gn-* .ask .gn-lab-panel .guess-*）。
   由 tools/_extract-shared-css.mjs 从 nature/wolves.html 抽出。页面只留独有规则。 */`;
const gamesHeader = `/* 克隆工坊页共用外壳（.hero .kid-mission .mission-face .stage .sk-* .ask .guess-*）。
   由 tools/_extract-shared-css.mjs 从 games/alarm-lab.html 抽出。页面只留独有规则。 */`;

const nature = await extractFrom(
  'nature/wolves.html',
  'assets/css/nature-species.css',
  natureHeader
);
const games = await extractFrom(
  'games/alarm-lab.html',
  'assets/css/games-lab.css',
  gamesHeader
);

const natureHref = `../assets/css/nature-species.css?v=${VERSION}`;
const gamesHref = `../assets/css/games-lab.css?v=${VERSION}`;

const natureStats = await processDir('nature', natureHref, nature.set, nature.count);
const gamesStats = await processDir('games', gamesHref, games.set, games.count);

console.log(`${dry ? '[dry] ' : ''}nature-species.css  ${nature.count} 条规则，${nature.bytes} 字节`);
console.log(`  处理 ${natureStats.total} 页：挂上 ${natureStats.linked}（清空 ${natureStats.emptied}，留独有 ${natureStats.partial}），跳过 ${natureStats.skipped}（阈值 ${natureStats.threshold}）`);
console.log(`${dry ? '[dry] ' : ''}games-lab.css       ${games.count} 条规则，${games.bytes} 字节`);
console.log(`  处理 ${gamesStats.total} 页：挂上 ${gamesStats.linked}（清空 ${gamesStats.emptied}，留独有 ${gamesStats.partial}），跳过 ${gamesStats.skipped}（阈值 ${gamesStats.threshold}）`);
