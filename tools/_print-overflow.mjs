/* 打印媒体下的裁切实测：无依赖，用本机 Chrome。
 *
 * 用法：
 *   node tools/_print-overflow.mjs
 *
 * 为什么需要它：医药箱的表格用 `.tbl-wrap { overflow-x: auto }` + `.med-tbl { min-width: NNNpx }`
 * 做窄屏横滚。屏幕上这是对的，但**打印时没有滚动条**——纸比容器窄的话，超出的那部分
 * 不会换行也不会缩小，直接被裁掉，而且屏幕上的审计一个都看不到。
 *
 * A4 纵向的可印宽度约 21cm 减去页边距，落在 680–700px 量级（本站 print.css 的设置下）。
 * 这里把视口按打印宽度设好、媒体切成 print，然后逐页量三件事：
 *   1. .tbl-wrap 的 scrollWidth 是否超过 clientWidth（超过即被裁）；
 *   2. 整个文档的 scrollWidth 是否超过页宽（整页横向溢出）；
 *   3. .flag 与 .duo > div 的高度，用来判断红旗段会不会被迫跨页。
 *
 * 只做测量与报告，不改任何文件。
 */
import { readdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
/* A4 纵向可印区宽度（px，96dpi）。21cm = 793.7px，减去左右各约 1.3cm 的页边距。 */
const PRINT_W = 688;
const PRINT_H = 1000;

const pages = (await readdir(join(ROOT, 'pages')))
  .filter((n) => n === 'medicine-cabinet.html' || n.startsWith('med-'))
  .sort()
  .map((n) => `pages/${n}`);

await acquireChromeLease();
const profile = await mkdtemp(join(tmpdir(), 'printoverflow-'));
const port = 9500 + Math.floor(Math.random() * 400);
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
const problems = [];
const resultLines = [];
try {
  const wsUrl = await endpoint();
  ws = new WebSocket(wsUrl);
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
    }, 30000);
  });
}

/* 浏览器级地拒掉下载。命令行的 --download-restrictions 不够：check-no-downloads.mjs
   要求每个起 Chrome 的工具都显式发这一条，免得某次审计顺手把文件丢进 ~/Downloads。 */
await send('Browser.setDownloadBehavior', { behavior: 'deny' });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);
await send('Emulation.setDeviceMetricsOverride',
  { width: PRINT_W, height: PRINT_H, deviceScaleFactor: 1, mobile: false }, sessionId);
await send('Emulation.setEmulatedMedia', { media: 'print' }, sessionId);

for (const rel of pages) {
  const url = `file://${join(ROOT, rel)}`;
  await send('Page.navigate', { url }, sessionId);
  await sleep(700);
  const { result } = await send('Runtime.evaluate', {
    expression: `(() => {
      const clipped = [...document.querySelectorAll('.tbl-wrap')]
        .map((el, i) => ({ i, over: el.scrollWidth - el.clientWidth, cap: (el.querySelector('caption')||{}).textContent || '' }))
        .filter((x) => x.over > 1);
      const flags = [...document.querySelectorAll('.flag')].map((el) => Math.round(el.getBoundingClientRect().height));
      const cards = [...document.querySelectorAll('.duo > div')].map((el) => Math.round(el.getBoundingClientRect().height));
      return JSON.stringify({
        docOver: document.documentElement.scrollWidth - ${PRINT_W},
        clipped, flags, cards
      });
    })()`,
    returnByValue: true
  }, sessionId);
  const r = JSON.parse(result.value);
  const tall = [...r.flags, ...r.cards].filter((h) => h > PRINT_H).length;
  const bad = r.clipped.length || r.docOver > 1;
  if (bad) {
    problems.push(`${rel}: 文档横向溢出 ${r.docOver}px；被裁表格 ${r.clipped.length} 个`
      + r.clipped.map((c) => `\n      「${c.cap.trim().slice(0, 24)}」超出 ${c.over}px`).join(''));
  }
  const mark = bad ? '✗' : '✓';
  resultLines.push(`  ${mark} ${rel.padEnd(34)} 文档溢出 ${String(r.docOver).padStart(4)}px`
    + `｜表格 ${r.clipped.length} 个被裁｜红旗段 ${r.flags.length} 个`
    + `｜超过一页高的块 ${tall} 个`);
}
} finally {
  try {
    if (ws) ws.close();
  } finally {
    await stopChrome(chrome);
  }
}

for (const line of resultLines) console.log(line);

console.log(`\n=== ${pages.length} 页，${problems.length} 页在 A4 打印宽度（${PRINT_W}px）下有裁切 ===`);
for (const p of problems) console.log(`  ${p}`);
process.exit(problems.length ? 1 : 0);
