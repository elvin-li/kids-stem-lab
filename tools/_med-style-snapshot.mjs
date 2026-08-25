/* 医药箱页面的计算样式快照：无依赖，用本机 Chrome。
 *
 * 用法：
 *   node tools/_med-style-snapshot.mjs before      # 重构前存基线
 *   node tools/_med-style-snapshot.mjs after       # 重构后再存一份并逐元素比对
 *
 * 为什么需要它：把 19 个页面里重复的 <style> 抽成共享的 assets/css/med.css，
 * 是一次纯粹的「结果必须完全不变」的重构。而现有门禁**证明不了这件事**：
 *   - check-classes 只问「这个 class 有没有规则」，不问规则内容是否等价；
 *   - check-rendered-contrast 只看颜色对比，量不到 padding、gap、grid 轨道；
 *   - verify.mjs 只看三个视口有没有横向溢出。
 * 也就是说，漏掉一条 `gap` 或把 `min-width` 抽错，全部门禁照样绿，坏掉的只有排版。
 * _pixel-proof.mjs 能看出来，但它对共享层的并发改动没有免疫力（另一个会话改一次
 * base.css，每页截图都变），所以这里改成量**计算样式**：只要 CSS 等价，
 * 逐元素的 computed style 就必须逐字节相同，与别人是否在改插画无关。
 *
 * 判据是逐元素严格相等：元素顺序、标签、class 列表，以及下面 PROPS 里那一组属性。
 * 任何一处不同都会被打印出来并以非零码退出。
 */
import { readdir, mkdtemp, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = join(ROOT, 'tools', '.med-style');
const mode = process.argv[2];
if (mode !== 'before' && mode !== 'after') {
  console.log('用法：node tools/_med-style-snapshot.mjs before|after');
  process.exit(2);
}

/* 抽取重构里可能被弄坏的一切：盒模型、排版、颜色、栅格。
   有意不收 width/height 这类由布局算出来的值——它们会跟着窗口和字体渲染微小抖动，
   收了会制造噪音；真正的排版错误一定会先体现在下面这些「作者写的」属性上。 */
const PROPS = [
  'display', 'position', 'boxSizing', 'overflowX', 'overflowY',
  'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
  'borderTopStyle', 'borderLeftStyle', 'borderTopColor', 'borderLeftColor',
  'borderTopLeftRadius', 'backgroundColor', 'backgroundImage',
  'color', 'fontSize', 'fontWeight', 'lineHeight', 'fontStyle', 'fontFamily',
  'textAlign', 'verticalAlign', 'letterSpacing', 'overflowWrap',
  'minWidth', 'maxWidth', 'minHeight', 'flexDirection', 'flexGrow', 'flexBasis',
  'alignItems', 'justifyContent', 'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'listStyleType', 'textDecorationLine', 'scrollMarginTop',
  'breakInside', 'breakAfter'
];

const pages = (await readdir(join(ROOT, 'pages')))
  .filter((n) => n === 'medicine-cabinet.html' || n.startsWith('med-'))
  .sort()
  .map((n) => `pages/${n}`);

await acquireChromeLease();
const profile = await mkdtemp(join(tmpdir(), 'medstyle-'));
const port = 9100 + Math.floor(Math.random() * 300);
const chrome = await spawnChrome(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--disable-gpu',
  '--hide-scrollbars', '--force-device-scale-factor=1',
  '--disable-features=DownloadBubble', '--download-restrictions=3',
  'about:blank'
], { cleanupPath: profile });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function endpoint() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch { /* 还没起来 */ }
    await sleep(250);
  }
  throw new Error('Chrome 没有起来');
}

let ws;
const snapshot = {};
const resultLines = [];
try {
  ws = new WebSocket(await endpoint());
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  }
};
function send(method, params = {}, sessionId) {
  const id = (msgId += 1);
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
    setTimeout(() => {
      if (pending.has(id)) { pending.delete(id); reject(new Error(`${method} 超时`)); }
    }, 40000);
  });
}

await send('Browser.setDownloadBehavior', { behavior: 'deny' });
const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);

/* 两种 data-mode 各量一遍：kid.css 的覆盖层只在孩子模式下生效，
   只量 parent 会让「抽取时漏掉一条 kid 覆盖」逃掉。 */
const MODES = ['parent', 'kid'];
const WIDTHS = [375, 768, 1280];

for (const rel of pages) {
  snapshot[rel] = {};
  for (const width of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride',
      { width, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
    for (const modeName of MODES) {
      await send('Page.navigate', { url: `file://${join(ROOT, rel)}` }, sessionId);
      await sleep(500);
      const { result } = await send('Runtime.evaluate', {
        expression: `(() => {
          document.documentElement.setAttribute('data-mode', ${JSON.stringify(modeName)});
          const props = ${JSON.stringify(PROPS)};
          const out = [];
          for (const el of document.querySelectorAll('body *')) {
            const cs = getComputedStyle(el);
            const row = [el.tagName, el.className || ''];
            for (const p of props) row.push(cs[p]);
            out.push(row.join('|'));
          }
          return out.join('\\n');
        })()`,
        returnByValue: true
      }, sessionId);
      snapshot[rel][`${width}-${modeName}`] = result.value;
    }
  }
  resultLines.push(`  · ${rel} 已采样（3 视口 × 2 模式）`);
}
} finally {
  try {
    if (ws) ws.close();
  } finally {
    await stopChrome(chrome);
  }
}

for (const line of resultLines) console.log(line);

/* 只建目录，**不要清空**：after 模式清空目录会把 before.json 一起删掉，
   而基线是不可再生的（页面已经改了）。第一版就是这么把基线弄丢的。 */
const { mkdir } = await import('node:fs/promises');
await mkdir(OUT, { recursive: true });
const file = join(OUT, `${mode}.json`);
await writeFile(file, JSON.stringify(snapshot), 'utf8');
console.log(`\n快照已写入 ${file.replace(ROOT + '/', '')}`);

if (mode === 'before') {
  console.log('基线就绪。改完之后跑 node tools/_med-style-snapshot.mjs after 比对。');
  process.exit(0);
}

/* ---- after：逐元素比对 ---- */
let baseline;
try {
  baseline = JSON.parse(await readFile(join(OUT, 'before.json'), 'utf8'));
} catch {
  console.log('✗ 找不到 before.json，先跑一次 before');
  process.exit(1);
}

const diffs = [];
for (const rel of pages) {
  for (const key of Object.keys(snapshot[rel])) {
    const a = (baseline[rel] || {})[key];
    const b = snapshot[rel][key];
    if (a === undefined) { diffs.push(`${rel} [${key}]: 基线里没有这一组`); continue; }
    if (a === b) continue;
    const la = a.split('\n');
    const lb = b.split('\n');
    if (la.length !== lb.length) {
      diffs.push(`${rel} [${key}]: 元素数量变了 ${la.length} → ${lb.length}`);
      continue;
    }
    let shown = 0;
    for (let i = 0; i < la.length && shown < 3; i += 1) {
      if (la[i] === lb[i]) continue;
      const pa = la[i].split('|');
      const pb = lb[i].split('|');
      const changed = [];
      for (let j = 2; j < pa.length; j += 1) {
        if (pa[j] !== pb[j]) changed.push(`${PROPS[j - 2]}: ${pa[j]} → ${pb[j]}`);
      }
      diffs.push(`${rel} [${key}] 第 ${i} 个元素 <${pa[0].toLowerCase()} class="${pa[1]}">：${changed.join('；')}`);
      shown += 1;
    }
  }
}

console.log(`\n=== ${pages.length} 页 × 3 视口 × 2 模式，${diffs.length} 处计算样式差异 ===`);
for (const d of diffs.slice(0, 40)) console.log(`  ${d}`);
if (diffs.length > 40) console.log(`  …… 另有 ${diffs.length - 40} 处`);
if (!diffs.length) console.log('  ✓ 抽取共享 CSS 后，每个元素的计算样式逐字节不变');
process.exit(diffs.length ? 1 : 0);
