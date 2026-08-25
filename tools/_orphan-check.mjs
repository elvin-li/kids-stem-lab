/* 孤儿 class 的运行时证明：在真实浏览器里数「有多少元素带这个 class」。
 *
 * 为什么需要它，而不是只看像素对照：
 *   - 像素对照（tools/_pixel-proof.mjs）证明的是「改动前后渲染一致」，但它对
 *     共享层的并发改动毫无免疫力。本机上另一个会话在改 assets/css/base.css，
 *     只要它在存基线和复验之间落一笔，每一页的截图都会变，结论就被污染。
 *   - 这里换个更直接的论断：一条 CSS 规则要生效，必须有元素带上那个 class。
 *     如果页面跑完 JS 之后 document.querySelectorAll('.x') 是 0，
 *     那条规则就匹配不到任何东西，删掉它在视觉上必然是零影响。
 *     这个结论只依赖被测页面自己，共享层怎么变都不影响它。
 *
 * 用法: node tools/_orphan-check.mjs <page.html>=<class,class,...> [更多...]
 *   例: node tools/_orphan-check.mjs "index.html=step-mark,kid-friend"
 *
 * 每页在 parent 与 kid 两种模式下各查一次（kid 模式会显示/隐藏不同的块），
 * 并且**先把页面上可见的按钮和 select 都拨一遍**再数——因为交互才会插入的节点
 * （JS 渲染的卡片、折叠块里的内容）不点开就不存在，只看载入态会把它们误判成孤儿。
 * 任何一个 class 在任何一种模式下命中 > 0，就判失败并打印命中数。
 */
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const specs = process.argv.slice(2).map((a) => {
  const at = a.indexOf('=');
  if (at < 0) { console.error(`参数要写成 page.html=class1,class2 形式：${a}`); process.exit(2); }
  return { page: a.slice(0, at), classes: a.slice(at + 1).split(',').map((s) => s.trim()).filter(Boolean) };
});
if (!specs.length) { console.error('用法: node tools/_orphan-check.mjs "index.html=step-mark,kid-friend"'); process.exit(2); }

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = () => fail(new Error('ws fail')); });
    const c = new CDP(ws);
    ws.onclose = () => { for (const p of c.waiting.values()) p.fail(new Error('Chrome WebSocket 已关闭')); c.waiting.clear(); };
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && c.waiting.has(m.id)) {
        const p = c.waiting.get(m.id); c.waiting.delete(m.id);
        m.error ? p.fail(new Error(m.error.message)) : p.ok(m.result);
      }
    };
    /* 孤儿证明会点击所有可见按钮，包括“保存图片”等导出控件。
       禁用下载若失败必须在创建页面 target 前终止，不能污染 ~/Downloads。 */
    await c.send('Browser.setDownloadBehavior', { behavior: 'deny' });
    return c;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => {
      const t = setTimeout(() => { if (this.waiting.delete(id)) fail(new Error(method + ' 超时')); }, 60000);
      this.waiting.set(id, { ok(v) { clearTimeout(t); ok(v); }, fail(e) { clearTimeout(t); fail(e); } });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() { try { this.ws.close(); } catch {} }
}

async function withChrome(fn) {
  await acquireChromeLease();
  const profile = await mkdtemp(join(tmpdir(), 'orphan-'));
  const port = 9100 + (process.pid % 90);
  const proc = await spawnChrome(CHROME, [
    `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--disable-gpu', '--hide-scrollbars',
    '--allow-file-access-from-files', 'about:blank'
  ], { cleanupPath: profile });
  try {
    let wsUrl = null;
    for (let i = 0; i < 80 && !wsUrl; i++) {
      await wait(200);
      try { const r = await fetch(`http://127.0.0.1:${port}/json/version`); if (r.ok) wsUrl = (await r.json()).webSocketDebuggerUrl; } catch {}
    }
    if (!wsUrl) throw new Error('连不上 Chrome');
    const browser = await CDP.attach(wsUrl);
    try { return await fn(browser); } finally { browser.close(); }
  } finally {
    await stopChrome(proc);
  }
}

/* 先把页面上能点的都拨一遍，再数命中。不点的话，交互才插入的节点看不见。 */
const EXERCISE = `(function () {
  var seen = 0;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('button:not([disabled])'));
  buttons.forEach(function (b) {
    var r = b.getBoundingClientRect();
    if (!r.width || !r.height) return;
    try { b.click(); seen++; } catch (e) {}
  });
  Array.prototype.forEach.call(document.querySelectorAll('select'), function (s) {
    for (var i = 0; i < s.options.length; i++) {
      s.selectedIndex = i;
      try { s.dispatchEvent(new Event('change', { bubbles: true })); } catch (e) {}
      try { s.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {}
    }
  });
  Array.prototype.forEach.call(document.querySelectorAll('details'), function (d) { d.open = true; });
  return seen;
})()`;

let bad = 0, checked = 0;
await withChrome(async (browser) => {
  for (const { page, classes } of specs) {
    console.log(`\n########## ${page} ##########`);
    for (const mode of ['parent', 'kid']) {
      const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
      try {
        await browser.send('Page.enable', {}, sessionId);
        await browser.send('Runtime.enable', {}, sessionId);
        await browser.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1400, deviceScaleFactor: 1, mobile: false }, sessionId);
        await browser.send('Page.addScriptToEvaluateOnNewDocument', {
          source: `try{localStorage.setItem('kids-stem:progress:v3', JSON.stringify({preferences:{mode:'${mode}'}}))}catch(e){}`
        }, sessionId);
        await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
        await wait(1100);
        const countExpr = `JSON.stringify({
          total: document.querySelectorAll('*').length,
          hits: ${JSON.stringify(classes)}.map(function(c){ return [c, document.querySelectorAll('.' + c).length]; })
        })`;
        const readCounts = async () => {
          const { result } = await browser.send('Runtime.evaluate', { expression: countExpr, returnByValue: true }, sessionId);
          return JSON.parse(result.value);
        };
        /* 先数载入态。这一次最可信：DOM 完整、没有被交互破坏过。 */
        const atLoad = await readCounts();
        /* 再把能点的都拨一遍，数第二次。交互才插入的节点（JS 渲染的卡片、
           折叠块里的内容）不点开就不存在，只看载入态会把它们误判成孤儿。
           但点击本身也可能把页面点坏——点到重置或跳转，DOM 会被清空，
           那一次的 0 命中毫无意义。所以两次都数，逐个 class 取最大值，
           并且用节点总数判断交互后 DOM 是否塌了（塌了就只认载入态）。 */
        const ex = await browser.send('Runtime.evaluate', { expression: EXERCISE, returnByValue: true }, sessionId);
        await wait(600);
        const afterClick = await readCounts();
        const collapsed = afterClick.total < atLoad.total * 0.6;
        const rows = classes.map((c, i) => {
          const a = atLoad.hits[i][1];
          const b = collapsed ? 0 : afterClick.hits[i][1];
          return [c, Math.max(a, b)];
        });
        const hits = rows.filter(([, n]) => n > 0);
        checked += rows.length;
        const how = `载入 ${atLoad.total} 节点，点了 ${ex.result.value} 个按钮后 ${afterClick.total} 节点`
          + (collapsed ? '——DOM 明显塌了，只认载入态' : '');
        if (hits.length) {
          bad += hits.length;
          console.log(`  ✗ ${mode}（${how}）仍有元素带这些 class：`);
          for (const [c, n] of hits) console.log(`      .${c} → ${n} 个元素`);
        } else {
          console.log(`  ✓ ${mode}（${how}）${rows.length} 个 class 全部零命中`);
        }
      } finally {
        try { await browser.send('Target.closeTarget', { targetId }); } catch {}
      }
    }
  }
});

console.log(`\n=== 查了 ${checked} 组（class × 模式），${bad} 组仍有元素命中 ===`);
if (bad) {
  console.log('这些 class 还活着，对应的 CSS 规则不是死代码，不能删。');
  process.exit(1);
}
console.log('  ✓ 全部零命中：这些 class 在两种模式下、把可见按钮都拨过之后都没有元素带它们，');
console.log('    对应的 CSS 规则匹配不到任何元素，删除在视觉上是零影响。');
