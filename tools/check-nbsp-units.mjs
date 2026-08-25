/* 数量词组的不断行保护：无依赖，纯静态、不需要 Chrome。
 *
 * 用法：
 *   node tools/check-nbsp-units.mjs          # 检查，发现可断空格即退出码 1
 *   node tools/check-nbsp-units.mjs --fix    # 就地修复
 *
 * 守的是什么：源码里「139 万 km」「3 月龄」「28.5 吨」用的是半角 ASCII 空格，
 * 而 U+0020 在 UAX #14 里是**无条件断行机会**——浏览器一定会在那里断，于是数字停在行尾、
 * 单位孤零零跳到下一行。窄栅格里最明显，实测过 `130 万`、`384,400 km`、`24 月龄` 都被拆开。
 *
 * **CSS 侧没有任何属性能救这件事。** `text-wrap: pretty` 管的是末行长度，
 * `overflow-wrap` 管的是溢出时的应急断点，都不改变「空格处可断」这个事实。
 * 唯一的修法是换字符：U+00A0（`&nbsp;`）或把词组包进 `white-space: nowrap`。
 * 这里统一用 `&nbsp;`，因为它在源码里看得见，改动可审阅。
 *
 * 为什么要做成门禁而不是跑一次就算完：内容是持续增长的，一句新写的「满 6 月龄再加辅食」
 * 就会重新引入一处。而且实测撞到过一次——批量替换跑完之后，另一个会话又往
 * `nature/ocean.html` 里加了「超过 10000 米」，那一处就漏在网外了。
 *
 * 扫描范围只有 HTML 文本节点：
 *   - 跳过 <script> 与 <style> 整块的**文本判定**；内联 <script> 由下面单独一遍
 *     按字符串字面量扫（静态 HTML 改好了不算完——beetles 的教训是交互时 JS
 *     又把带普通空格的版本写回去，静态与动态两份必须一起改）。
 *   - 跳过 <title>：浏览器标签页的标题不参与折行，塞 NBSP 只会让不做实体解码的
 *     抓取方看到字面量（语义评审 2026-08-11 第 12 条）。
 *   - 跳过标签内部：属性值不参与排版。
 *   - 跳过注释。
 *
 * 「可断空白」不只 U+0020：源码里数字和单位之间换了行、或者夹着制表符，
 * 在浏览器里同样是一个可折叠、可断行的空白，所以按「一段可折叠空白」匹配，
 * 不能写死单个空格（语义评审 2026-08-11 第 4 条）。
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const fix = process.argv.includes('--fix');

/* 拉丁单位后面不能紧跟字母，否则 "5 g" 那条会误吃 "5 games" 这类正常写法。
   中文单位按「长的排前面」：否则「个月」被「个」先吃掉、「分钟」被「分」吃掉。 */
const UNIT = '(?:km(?![A-Za-z])|AU(?![A-Za-z])|kg(?![A-Za-z])|mL(?![A-Za-z])|IU(?![A-Za-z])'
  + '|g(?![A-Za-z])|℃|°C|个月|月龄|分钟|小时|千米|公里|地球日|万|亿|吨|天|年|岁|倍|颗|个|月|周|分|秒|米|度|次)';
/* 一段可折叠空白（空格/制表/换行），不只是单个 U+0020：换行同样是断行机会。 */
const RE = new RegExp('(\\d[\\d.,]*)[\\u0020\\t\\r\\n]+(' + UNIT + ')', 'g');

const files = ['index.html'];
for (const d of ['pages', 'games', 'nature']) {
  for (const n of (await readdir(join(ROOT, d))).sort()) {
    if (n.endsWith('.html') && !n.startsWith('_')) files.push(`${d}/${n}`);
  }
}

/* ---- JS 字符串字面量里的同类问题 ----
 * 静态 HTML 修好了不等于页面上就对：绝大多数数值是 JS 拼出来再写进 DOM 的，
 * 用户一拖滑杆就把带可断空格的版本写回去。实测这类有 500 多处，分布在 28 个文件里，
 * 而 beetles.html 更极端——同一个函数里 2926 行用了 &nbsp;，紧邻的 2928 行还是普通空格。
 *
 * JS 侧统一替换成 `\u00a0` 转义而不是 `&nbsp;`：走 textContent 时 `&nbsp;` 只会被当成
 * 六个字面字符显示出来，而 `\u00a0` 在 textContent 和 innerHTML 两条路上都正确。
 *
 * 单位表比 HTML 那份更保守，去掉了单字的「分」：JS 文案里「分之」「分母」这类词很常见
 * （fraction-lab 就有），按「数字+空格+分」匹配会误伤。「分钟」仍然保留。
 */
const JS_UNIT = '(?:km(?![A-Za-z])|AU(?![A-Za-z])|kg(?![A-Za-z])|mL(?![A-Za-z])|IU(?![A-Za-z])'
  + '|g(?![A-Za-z])|℃|°C|个月|月龄|分钟|小时|千米|公里|地球日|千克|厘米|万|亿|吨|天|年|岁|倍|颗|个|月|周|秒|米|度|次|步|升)';
const JS_RE = new RegExp('(\\d[\\d.,]*)[\\u0020\\t]+(' + JS_UNIT + ')', 'g');
/* 本站最常见的写法是 `times + " 次"`——**单位和数字不在同一个字符串字面量里**，
   上面那条按「数字+空格+单位」找的正则一个都抓不到，而它恰恰是绝大多数动态数值的形状。
   这一条专门认「以一个空格加单位开头」的字面量，并且要求它前面紧跟字符串拼接（`+`），
   因为那意味着左边确实拼着一个值。只把开头那个空格换掉，字面量其余部分不动。 */
const JS_SUFFIX_RE = new RegExp('^[\\u0020\\t]+(?=' + JS_UNIT + ')');
const CONCAT_BEFORE = /\+\s*$/;

/* 有意跳过的字符串：改了会出别的问题，理由逐条写清。 */
function jsLiteralExempt(body, before) {
  /* 1. 只进无障碍名称的文案。屏幕阅读器不做换行，塞 NBSP 只是噪音。 */
  if (/aria-[a-z]+["']?\s*,\s*$/i.test(before) || /aria-[a-z]+["']\s*,\s*$/i.test(before)) return true;
  if (/\.(?:ariaLabel|ariaValueText)\s*=\s*$/.test(before)) return true;
  /* 2. turtle-geometry 写进 <textarea> 的 DSL 程序源码：那里的空格是**语法分隔符**，
        换成 NBSP 会让 tokenize() 认不出记号，直接把示例程序变成语法错误。 */
  if (/(?:重复|前进|右转|左转|抬笔|落笔)/.test(body) && /\n/.test(body)) return true;
  return false;
}

/* 扫一段 JS，对每个字符串字面量的**内容**调用 onLiteral(body, before) 并用返回值替换。
   要处理注释、三种引号、转义，以及正则字面量——正则里的引号不能当字符串开头。 */
function walkJsStrings(js, onLiteral) {
  let out = '';
  let i = 0;
  /* 判断此处的 '/' 是正则开头还是除号：看前一个有意义的字符。 */
  const regexAllowedAfter = new Set(['(', ',', '=', ':', '[', '!', '&', '|', '?', '{', '}', ';', '+', '-', '*', '%', '<', '>', '~', '^']);
  let lastMeaningful = '';
  while (i < js.length) {
    const ch = js[i];
    if (ch === '/' && js[i + 1] === '/') {
      const end = js.indexOf('\n', i);
      const stop = end === -1 ? js.length : end;
      out += js.slice(i, stop); i = stop; continue;
    }
    if (ch === '/' && js[i + 1] === '*') {
      const end = js.indexOf('*/', i);
      const stop = end === -1 ? js.length : end + 2;
      out += js.slice(i, stop); i = stop; continue;
    }
    if (ch === '/' && (lastMeaningful === '' || regexAllowedAfter.has(lastMeaningful))) {
      /* 正则字面量：原样透传到未转义的收尾 '/'。 */
      let j = i + 1;
      let inClass = false;
      while (j < js.length) {
        if (js[j] === '\\') { j += 2; continue; }
        if (js[j] === '[') inClass = true;
        else if (js[j] === ']') inClass = false;
        else if (js[j] === '/' && !inClass) break;
        else if (js[j] === '\n') break;
        j += 1;
      }
      out += js.slice(i, Math.min(j + 1, js.length));
      i = Math.min(j + 1, js.length);
      lastMeaningful = '/';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      let j = i + 1;
      let body = '';
      while (j < js.length) {
        if (js[j] === '\\') { body += js.slice(j, j + 2); j += 2; continue; }
        if (js[j] === quote) break;
        body += js[j]; j += 1;
      }
      const before = out.slice(-90);
      out += quote + onLiteral(body, before) + (js[j] === quote ? quote : '');
      i = j + 1;
      lastMeaningful = quote;
      continue;
    }
    out += ch;
    if (!/\s/.test(ch)) lastMeaningful = ch;
    i += 1;
  }
  return out;
}

/* 遍历所有内联 <script>（带 src 的外部脚本不动），对脚本体调用 fn。 */
function walkInlineScripts(src, fn) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const open = src.toLowerCase().indexOf('<script', i);
    if (open === -1) { out += src.slice(i); break; }
    const openEnd = src.indexOf('>', open);
    if (openEnd === -1) { out += src.slice(i); break; }
    const tag = src.slice(open, openEnd + 1);
    const close = src.toLowerCase().indexOf('</script', openEnd);
    const bodyEnd = close === -1 ? src.length : close;
    out += src.slice(i, openEnd + 1);
    const body = src.slice(openEnd + 1, bodyEnd);
    out += /\bsrc\s*=/i.test(tag) ? body : fn(body);
    out += src.slice(bodyEnd, close === -1 ? src.length : src.indexOf('>', close) + 1);
    i = close === -1 ? src.length : src.indexOf('>', close) + 1;
  }
  return out;
}

/* 按「标签 / 文本 / 注释 / script / style」切开，只在文本段上做替换。 */
function walkText(src, onText) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    if (src.startsWith('<!--', i)) {
      const end = src.indexOf('-->', i);
      const stop = end === -1 ? src.length : end + 3;
      out += src.slice(i, stop); i = stop; continue;
    }
    const head = src.slice(i, i + 8).toLowerCase();
    for (const tag of ['script', 'style', 'title']) {
      if (head.startsWith(`<${tag}`)) {
        const end = src.toLowerCase().indexOf(`</${tag}`, i);
        const stop = end === -1 ? src.length : src.indexOf('>', end) + 1;
        out += src.slice(i, stop); i = stop;
        break;
      }
    }
    if (i >= src.length) break;
    const head2 = src.slice(i, i + 8).toLowerCase();
    if (head2.startsWith('<script') || head2.startsWith('<style') || head2.startsWith('<title')) continue;
    if (src[i] === '<') {
      const end = src.indexOf('>', i);
      const stop = end === -1 ? src.length : end + 1;
      out += src.slice(i, stop); i = stop; continue;
    }
    const next = src.indexOf('<', i);
    const stop = next === -1 ? src.length : next;
    out += onText(src.slice(i, stop));
    i = stop;
  }
  return out;
}

const offenders = [];
let fixedCount = 0;

for (const rel of files) {
  const path = join(ROOT, rel);
  const src = await readFile(path, 'utf8');
  const found = [];
  /* 第一遍：HTML 文本节点，替换成 &nbsp;（源码里看得见，改动可审阅）。 */
  let out = walkText(src, (chunk) => chunk.replace(RE, (m, num, unit) => {
    found.push(m.trim());
    return `${num}&nbsp;${unit}`;
  }));
  /* 第二遍：内联 JS 的字符串字面量，替换成 \u00a0（textContent 与 innerHTML 都正确）。 */
  out = walkInlineScripts(out, (body) => walkJsStrings(body, (lit, before) => {
    if (jsLiteralExempt(lit, before)) return lit;
    let next = lit.replace(JS_RE, (m, num, unit) => {
      found.push(m.trim());
      return `${num}\\u00a0${unit}`;
    });
    if (CONCAT_BEFORE.test(before) && JS_SUFFIX_RE.test(next)) {
      found.push(`+"${next.slice(0, 4).trim()}…"`);
      next = next.replace(JS_SUFFIX_RE, '\\u00a0');
    }
    return next;
  }));
  if (!found.length) continue;
  if (fix) {
    await writeFile(path, out, 'utf8');
    fixedCount += found.length;
    console.log(`  ✎ ${rel}：修复 ${found.length} 处`);
  } else {
    offenders.push({ rel, found });
  }
}

if (fix) {
  console.log(`\n共修复 ${fixedCount} 处。`);
  process.exit(0);
}

const total = offenders.reduce((n, o) => n + o.found.length, 0);
console.log(`数量词组的不断行保护：扫描 ${files.length} 个 HTML 的文本节点`);
if (!total) {
  console.log('✓ 数字与单位之间没有可断的半角空格，不会出现「数字留行尾、单位跳下一行」');
  process.exit(0);
}
console.log(`\n✗ ${total} 处「数字 + 半角空格 + 单位」会被断行拆开，跑 --fix 可自动修：`);
for (const o of offenders) {
  const sample = [...new Set(o.found)].slice(0, 6).join('、');
  console.log(`  ${o.rel}（${o.found.length} 处）：${sample}${o.found.length > 6 ? ' …' : ''}`);
}
process.exit(1);
