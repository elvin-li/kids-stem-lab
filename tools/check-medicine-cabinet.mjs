/* 家庭医药箱分区的内容契约：无依赖，纯静态。
 *
 * 用法：
 *   node tools/check-medicine-cabinet.mjs
 *
 * 这一册（pages/medicine-cabinet.html + pages/med-*.html）和站内其他页面共用同一份
 * 共享契约，但它是医疗内容，另有几条只属于它的硬要求。CONTRACT.md「家庭医药箱分区」
 * 一节把这些规则写下来了，这个脚本让它们变成可执行的门禁——否则那一节只是善意。
 *
 * 抓的是「不会报错、页面照样好看，但对家长有实际危害」的那一类退化：
 *
 *   1. 红旗信号段消失。这一册的全部价值在于「什么时候别在家等」。有人为了版面清爽
 *      把它挪到页面下半部分或删掉，页面看起来更干净，而最要紧的信息不见了。
 *   2. 来源被换成博客或内容农场。医学结论必须能追回官方出处；一旦混进二手来源，
 *      读者无法分辨哪一条是指南、哪一条是某人的意见。
 *   3. 免责声明被删。
 *   4. 出现具体毫克数。剂量取决于体重与药品浓度，写死的数字可能在读者手里那一瓶上
 *      就是错的。整册刻意只讲原则，把数字交给说明书和医生。
 *   5. 页面掉出离线壳或没人链接到它。医疗速查最需要「断网也能打开」，而一个没有入口
 *      的页面等于不存在。
 *   6. 被改成孩子模式。Progress 的 mode 默认是 kid，而 kid.css 会隐藏 data-audience="parent"；
 *      一旦这些页面按孩子页写，整册医疗内容会在首屏被收走。
 *   7. 没有本地急救电话。来源都是美国材料（911 / Poison Help），页面必须给出中国 120。
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
/* 官方来源白名单。按可注册域后缀匹配，子域（publications.aap.org、archive.cdc.gov）自动包含。 */
const OFFICIAL = [
  'healthychildren.org',   /* AAP 家长站 */
  'aap.org',               /* 美国儿科学会（含 publications.aap.org） */
  'merckmanuals.com',      /* 默沙东诊疗手册 */
  'cdc.gov',               /* 美国 CDC（含 archive.cdc.gov） */
  'medlineplus.gov',       /* 美国国家医学图书馆 */
  'heart.org',             /* 美国心脏协会（含 cpr./newsroom.） */
  'nih.gov',               /* NIH / NCBI */
  'who.int'                /* 世界卫生组织 */
];
const errors = [];
const notes = [];

function rootRel(path) { return relative(ROOT, path).split(sep).join('/'); }
function stripComments(html) { return html.replace(/<!--[\s\S]*?-->/g, ' '); }
function plainText(html) {
  return stripComments(html)
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function hostOf(url) {
  const m = url.match(/^https?:\/\/([^/?#]+)/i);
  return m ? m[1].toLowerCase() : '';
}
function isOfficial(host) {
  return OFFICIAL.some((d) => host === d || host.endsWith(`.${d}`));
}

const pagesDir = join(ROOT, 'pages');
const all = (await readdir(pagesDir)).filter((n) => n.endsWith('.html')).sort();
const section = all
  .filter((n) => n === 'medicine-cabinet.html' || n.startsWith('med-'))
  .map((n) => `pages/${n}`);
const HUB = 'pages/medicine-cabinet.html';

if (!section.includes(HUB)) {
  errors.push(`${HUB}: 总览页缺失，这一册没有入口`);
}
if (section.length < 2) {
  errors.push('pages/: 找不到 med-*.html 专题页，分区看起来被整体删掉了');
}

const source = new Map();
for (const rel of section) source.set(rel, await readFile(join(ROOT, rel), 'utf8'));
const swJs = await readFile(join(ROOT, 'sw.js'), 'utf8');
const indexHtml = await readFile(join(ROOT, 'index.html'), 'utf8');
const parentsHtml = await readFile(join(ROOT, 'pages', 'parents.html'), 'utf8');
const hubHtml = source.get(HUB) || '';

for (const rel of section) {
  const html = source.get(rel);
  const text = plainText(html);
  const fail = (msg) => errors.push(`${rel}: ${msg}`);

  /* 1. 红旗信号必须存在，而且要在页面靠前的位置——慌乱中是扫读，排在末尾等于没有。 */
  const flags = [...html.matchAll(/<(section|div)\b[^>]*\bclass=["'][^"']*\bflag\b[^"']*["'][^>]*>/gi)];
  if (!flags.length) {
    fail('缺少 .flag 红旗信号段：这一册的全部价值在于「什么时候别在家等」');
  } else if (flags[0].index / html.length > 0.5) {
    fail('第一个 .flag 红旗段排在页面后半部分，应该放在正文最前面');
  }

  /* 2. 来源列表：必须有，且每条外链都要能追回官方出处。 */
  const srcBlocks = [...html.matchAll(/<ul\b[^>]*\bclass=["'][^"']*\bsrcs\b[^"']*["'][^>]*>([\s\S]*?)<\/ul\s*>/gi)];
  if (!srcBlocks.length) {
    fail('缺少 .srcs 来源列表：医学结论必须能追回官方出处');
  } else {
    const links = srcBlocks.flatMap((b) => [...b[1].matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)].map((m) => m[1]));
    if (links.length < 3) fail(`来源列表只有 ${links.length} 条外链，至少要 3 条`);
    for (const link of links) {
      const host = hostOf(link);
      if (!isOfficial(host)) fail(`来源不在官方白名单里: ${host}（只接受 ${OFFICIAL.join(' / ')}）`);
      if (!/^https:/i.test(link)) fail(`来源必须用 https: ${link}`);
    }
  }

  /* 3. 免责声明。 */
  /* 必须在 .disc 区块「里面」找，不能全页搜关键词：页脚也写着「不构成医疗建议」，
     按全页判会让删掉整段免责声明的改动照样通过——回滚验证正是这样抓到这条断言是死的。 */
  const disc = stripComments(html).match(/<div\b[^>]*\bclass=["'][^"']*\bdisc\b[^"']*["'][^>]*>([\s\S]*?)<\/div\s*>/i);
  if (!disc) fail('缺少 .disc 免责声明区块');
  else if (!plainText(disc[1]).includes('不构成医疗建议')) fail('.disc 免责声明里必须出现「不构成医疗建议」');

  /* 4. 不得出现具体毫克数：剂量按体重与浓度算，写死的数字会害人。
        毫升是容量（补液 5–10 mL、蜂蜜 2.5–5 mL、单位换算表），不在此列。 */
  /* \b 只能贴在拉丁字母的 mg 后面。写成 /(mg|毫克)\b/ 会永远匹配不到中文：
     \b 按 [A-Za-z0-9_] 判边界，「毫克」后面跟句号时两侧都不是词字符，边界不成立，
     于是「250 毫克」被静默放过——回滚验证抓到的第二条死断言就是这个。 */
  /* `(?:\s|&nbsp;)*` 里的 `&nbsp;` 不是多余的：数量词组的可断空格已经被批量换成 `&nbsp;`
     （见 CONTRACT.md「断行与中文排版」），而 plainText() 只剥标签、不解码实体，
     所以文本里留下的是字面量 `&nbsp;`。只写 `\s*` 的话，「250&nbsp;毫克」会被静默放过——
     这条断言会因为一次纯排版改动而失效，而失效是看不见的。 */
  for (const m of text.matchAll(/(\d[\d.,]*)(?:\s|&nbsp;)*(?:mg\b|毫克)/gi)) {
    fail(`出现具体毫克数「${m[0].trim()}」：剂量必须交给药品说明书或医生，本册只讲原则`);
  }
  for (const m of text.matchAll(/(mg|毫克)(?:\s|&nbsp;)*\/(?:\s|&nbsp;)*(kg|公斤|千克)/gi)) {
    fail(`出现按体重的剂量写法「${m[0].trim()}」：本册不提供剂量公式`);
  }

  /* 5. 必须进离线壳，而且必须有人链接到它。 */
  if (!new RegExp(`["']\\./${rel.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}["']`).test(swJs)) {
    errors.push(`sw.js: CORE 缺少 ./${rel}，断网时打不开——医疗速查最需要离线可用`);
  }
  if (rel !== HUB) {
    const file = rel.split('/').at(-1);
    if (!new RegExp(`href=["']${file}["']`).test(hubHtml)) {
      errors.push(`${HUB}: 没有链接到 ${file}，这一页没有入口等于不存在`);
    }
  }

  /* 6. 必须是家长模式的文档页，不得接入童趣层。 */
  const mode = html.match(/<html\b[^>]*\bdata-mode\s*=\s*["']([^"']*)["']/i);
  if (!mode || mode[1] !== 'parent') {
    fail(`<html data-mode> 应为 "parent"，实际 ${mode ? `"${mode[1]}"` : '(缺失)'}——`
      + '孩子模式会把整册医疗内容在首屏收走');
  }
  if (/<script\b[^>]*\bsrc=["'][^"']*assets\/js\/playful\.js/i.test(html)) {
    fail('不应加载 playful.js：它会按 Progress 的 mode 偏好（默认 kid）改写 data-mode');
  }
  if (/\bdata-audience\s*=/.test(html)) {
    fail('不应使用 data-audience：整页都是给家长看的，分层只会带来被隐藏的风险');
  }

  /* 7. 来源都是美国材料，页面必须给出本地急救电话。 */
  if (!/\b120\b/.test(text)) fail('正文里没有出现急救电话 120：来源以美国环境为背景，必须给本地号码');

  /* 8. 内容不得依赖脚本：正文字数在剥掉 <script> 后仍要足够。 */
  if (text.length < 1200) {
    fail(`剥掉脚本后正文只有 ${text.length} 字，内容可能依赖 JS 渲染——医疗页必须静态可读、可打印`);
  }
}

/* 分区入口：总览页必须能从首页和家长指南到达。 */
if (!/href=["']pages\/medicine-cabinet\.html["']/.test(indexHtml)) {
  errors.push('index.html: 没有链接到 pages/medicine-cabinet.html，这一册在首页没有入口');
}
if (!/href=["']medicine-cabinet\.html["']/.test(parentsHtml)) {
  errors.push('pages/parents.html: 没有链接到 medicine-cabinet.html');
}
/* 导航第七项就是这一册的入口（见 CONTRACT.md「固定七项导航」）。这里守三条：
   入口必须在且文字是「医药箱」；专题页不得挤进导航（导航只放总览页）；
   分区页的 aria-current 必须落在医药箱那一项上，否则家长看不出自己在哪一册。 */
for (const rel of section) {
  const html = source.get(rel);
  const nav = html.match(/<nav\b[^>]*\bclass=["'][^"']*\bnav\b[^"']*["'][^>]*>[\s\S]*?<\/nav\s*>/i);
  if (!nav) { errors.push(`${rel}: 找不到主导航 .nav`); continue; }
  const links = [...nav[0].matchAll(/<a\b[^>]*\bclass=["'][^"']*\bnav-link\b[^"']*["'][^>]*>([\s\S]*?)<\/a\s*>/gi)];
  const hub = links.find((m) => /pages\/medicine-cabinet\.html/.test(m[0]));
  if (!hub) {
    errors.push(`${rel}: 主导航里没有医药箱入口——它是固定七项的第七项`);
  } else {
    const label = plainText(hub[1]);
    if (label !== '医药箱') errors.push(`${rel}: 导航第七项文字应为「医药箱」，实际「${label}」`);
    if (!/aria-current\s*=\s*["']page["']/i.test(hub[0])) {
      errors.push(`${rel}: 本页属于医药箱分区，aria-current 应落在导航的「医药箱」项上`);
    }
  }
  const topic = links.find((m) => /pages\/med-[a-z-]+\.html/.test(m[0]));
  if (topic) errors.push(`${rel}: 专题页不该进主导航，导航只放总览页入口：「${plainText(topic[1])}」`);
}
/* 入链：每个专题页除总览页之外，至少要有一个**别的专题页**链到它。
 *
 * 为什么单独守这一条：上面第 5 条只保证「总览页链到了它」，那只是「不算孤儿」的最低线。
 * 但家长的真实路径往往不经过总览页——他在皮肤页看到湿疹那张卡、在发热页查月龄门槛，
 * 然后需要就地跳到相邻主题。实测这条很容易退化：新加五页时，除总览页外
 * **零个旧页链到它们**，皮肤页上看着湿疹卡的家长走不到湿疹专页；同一次统计还发现
 * med-vaccine 从加进来起入链就是 0。两次都是手工 grep 才发现的，所以固化成门禁。
 *
 * 判定刻意只要求「≥1 条」而不是某个更大的数：分流链接要按临床相关性加，
 * 不是凑数量。把阈值定高会逼着人加无意义的链接，那比没有链接更糟。 */
const topics = section.filter((rel) => rel !== HUB);
for (const rel of topics) {
  const file = rel.split('/').at(-1);
  const inbound = topics.filter((other) => other !== rel
    && new RegExp(`href=["']${file.replace(/\./g, '\\.')}["']`).test(source.get(other) || ''));
  if (!inbound.length) {
    errors.push(`${rel}: 没有任何其他专题页链到它，只能从总览页进——`
      + '家长的实际路径常常不经过总览页，请在相邻主题的分流按钮里加一条');
  }
}

if (section.length) {
  notes.push(`分区共 ${section.length} 页：${section.map((r) => r.split('/').at(-1)).join('、')}`);
}

console.log(`家庭医药箱内容契约：${section.length} 个页面，红旗段／官方来源／免责声明／无毫克数／`
  + `离线登记／入口可达／家长模式／静态可读`);
for (const note of notes) console.log(`  · ${note}`);
if (errors.length) {
  console.log(`\n✗ ${errors.length} 处问题：`);
  for (const e of errors) console.log(`  ${e}`);
} else {
  console.log('✓ 每页都有靠前的红旗信号、可追回的官方来源、免责声明；没有具体毫克数；'
    + '全部进了离线壳且有入口；都是家长模式的静态文档');
}
process.exit(errors.length ? 1 : 0);
