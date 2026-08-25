/* 像素证明：给「删死代码」这类应当零视觉影响的改动做前后对照。
 *
 * 为什么需要它：check-classes.mjs 能报出「有 CSS 规则但 markup 和 JS 都不用」的死代码，
 * 但它是文本扫描器——类名如果是 JS 拼出来的（'spx-' + key）它看不见，
 * 删掉那条规则会静默改变插画，而所有门禁都可能照样绿（fill 丢了未必跨过对比度阈值）。
 * 所以删之前先存一张整页截图的哈希，删完再存一张：真死代码必须逐像素相同。
 *
 * 用法:
 *   node tools/_pixel-proof.mjs save   <标签>  [页面...]   # 存基线
 *   node tools/_pixel-proof.mjs verify <标签>  [页面...]   # 和基线比
 * 不给页面就跑全部 28 页（跳过 pages/med-*.html：那是别的线程在建的在途文件）。
 * 每页在 parent 与 kid 两种模式下各拍一次，宽度 1280 和 768 各一次，共 4 张。
 *
 * 决定论处理（不做这些，同一页连拍两次就会不一样，截图就不能当证据）：
 *   - 冻结 animation / transition / SVG <animate>，并把 scroll-behavior 改掉；
 *   - Math.random 换成固定种子的确定性序列（星空、纸屑、抽签都用它）；
 *   - Date.now / new Date 钉在固定时刻（页面里有按日期算的文案）；
 *   - requestAnimationFrame 只放行有限帧后停摆，避免逐帧动画拍到不同相位；
 *   - localStorage 预置成固定的 Progress 状态，避免「看过/没看过」两种渲染。
 * 存基线前会对同一页连拍两次并比对，不稳定的页面直接标出来、不纳入证明范围——
 * 宁可说「这页证不了」，也不要给出一个假的通过。
 */
import { mkdtemp, writeFile, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9300 + (process.pid % 80);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const [cmd, label, ...pageArgs] = process.argv.slice(2);
if (cmd !== 'save' && cmd !== 'verify') {
  console.error('用法: node tools/_pixel-proof.mjs save|verify <标签> [页面...]');
  process.exit(2);
}
if (!label) { console.error('缺少标签'); process.exit(2); }

const ALL_PAGES = [
  'index.html',
  'games/index.html', 'games/doodle-pad.html', 'games/estimation-station.html',
  'games/fraction-lab.html', 'games/gravity-drop.html', 'games/light-and-shadow.html',
  'games/number-blocks.html', 'games/pattern-machine.html', 'games/ramp-and-roll.html',
  'games/symmetry-studio.html', 'games/turtle-geometry.html', 'games/wave-maker.html',
  'nature/index.html', 'nature/beetles.html', 'nature/dinosaurs.html', 'nature/earth.html',
  'nature/human-body.html', 'nature/insects.html', 'nature/ocean.html', 'nature/space.html',
  'nature/weather.html',
  'pages/design-system.html', 'pages/kitchen-science.html', 'pages/parents.html',
  'pages/paths.html', 'pages/progress.html', 'pages/why.html'
];
const pages = (pageArgs.length ? pageArgs : ALL_PAGES).filter((p) => existsSync(join(ROOT, p)));
/* 两种调色板各拍一次就够：本工具是给「删死代码」这类改动做零视觉影响证明的，
   而死代码与视口宽度无关，跟 data-mode 有关（kid.css 会换掉一整套 token）。
   之前四组（再叠加 1280/768）在本机上跑不完——整页截图这些页面本来就重，
   另一个会话还在并发跑浏览器工具。要查响应式布局请用 verify.mjs 和
   check-controls.mjs，它们本来就按 375/768/1280 跑。
   加宽度可以设 PIXEL_PROOF_WIDTHS=1280,768。 */
const WIDTHS = (process.env.PIXEL_PROOF_WIDTHS || '1280').split(',').map((n) => +n.trim()).filter(Boolean);
const SHOTS = WIDTHS.flatMap((width) => [
  { mode: 'parent', width },
  { mode: 'kid', width }
]);
const STORE = join(ROOT, 'tools', '.pixel-proof');

/* 注入到每个新文档最前面：先钉死所有不确定来源，再让页面脚本跑。 */
const DETERMINISM = (mode) => `
(function () {
  try {
    /* 固定 Progress 状态：否则「去过 / 没去过」会渲染出两种样子 */
    localStorage.setItem('kids-stem:progress:v3', JSON.stringify({
      preferences: { mode: ${JSON.stringify(mode)}, motionReduced: false, onlineData: false, sound: false, bigText: false }
    }));
  } catch (e) {}
  /* 确定性随机：mulberry32，固定种子。星空、纸屑、随机抽签都走 Math.random */
  var s = 0x9e3779b9;
  Math.random = function () {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    var t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  /* 时间钉死 */
  var FIXED = 1767225600000; /* 2026-01-01T00:00:00Z */
  var RealDate = Date;
  Date = function (a, b, c, d, e, f, g) {
    if (!(this instanceof Date)) return new RealDate(FIXED).toString();
    return arguments.length === 0 ? new RealDate(FIXED)
      : arguments.length === 1 ? new RealDate(a)
      : new RealDate(a, b, c, d || 0, e || 0, f || 0, g || 0);
  };
  Date.prototype = RealDate.prototype;
  Date.now = function () { return FIXED; };
  Date.parse = RealDate.parse; Date.UTC = RealDate.UTC;
  performance.now = function () { return 0; };
  /* rAF：只放行前若干帧就停摆，逐帧动画才不会拍到不同相位。
     完全不放行不行——很多页面首帧才把画布画出来。 */
  var frames = 0, rAF = window.requestAnimationFrame;
  window.requestAnimationFrame = function (cb) {
    if (frames++ > 90) return 0;
    return rAF(function () { cb(16 * frames); });
  };
})();`;

const FREEZE_CSS = `
*, *::before, *::after {
  animation-play-state: paused !important;
  animation-delay: 0s !important;
  animation-duration: 0s !important;
  transition: none !important;
  caret-color: transparent !important;
  scroll-behavior: auto !important;
}`;

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
    /* 这个浏览器一律不许写下载文件。像素基线只需要 CDP 抓屏，浏览器下载对它没用；
       但它会注入并执行页面脚本，碰到「保存图片」「导出 JSON」这类控件时，Chrome
       默认行为会把文件真的写进 ~/Downloads（豁免期间实测出现过一张 doodle-pad 的图）。
       必须在 attach 里、任何 Target.createTarget 之前生效，且不用 try/catch 吞错：
       下载禁用是安全边界，失败就该停在这里。 */
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

async function shoot(browser, page, mode, width) {
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
  try {
    await browser.send('Page.enable', {}, sessionId);
    await browser.send('Runtime.enable', {}, sessionId);
    await browser.send('Emulation.setDeviceMetricsOverride',
      { width, height: 1400, deviceScaleFactor: 1, mobile: false }, sessionId);
    await browser.send('Page.addScriptToEvaluateOnNewDocument', { source: DETERMINISM(mode) }, sessionId);
    await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
    await wait(1100);
    /* 强制 data-mode，并冻结动画。放在导航之后，避免被页面脚本覆盖。 */
    await browser.send('Runtime.evaluate', {
      expression: `(function(){
        document.documentElement.setAttribute('data-mode', ${JSON.stringify(mode)});
        var st = document.createElement('style');
        st.textContent = ${JSON.stringify(FREEZE_CSS)};
        document.head.appendChild(st);
        document.querySelectorAll('animate,animateTransform,animateMotion,set')
          .forEach(function(n){ try { n.remove(); } catch(e){} });
        window.scrollTo(0, 0);
        return 1;
      })()`
    }, sessionId);
    await wait(500);
    const { data } = await browser.send('Page.captureScreenshot',
      { format: 'png', captureBeyondViewport: true }, sessionId);
    return createHash('sha256').update(Buffer.from(data, 'base64')).digest('hex');
  } finally {
    try { await browser.send('Target.closeTarget', { targetId }); } catch {}
  }
}

/* 每页起一个新的 Chrome，而不是全程共用一个。
   共用一个的话，只要它中途死一次（本机上另一个会话也在跑浏览器工具抢资源，
   实测会先 Runtime.evaluate 超时、随后所有 Target.createTarget 全部超时），
   后面每一页都会被判成「不稳定」，整轮 0/24 可证明。
   每页重启慢一些，但在争用下拿得到结果。 */
let chromePort = 9300 + (process.pid % 80);
async function withChrome(fn) {
  await acquireChromeLease();
  const profile = await mkdtemp(join(tmpdir(), 'pixelproof-'));
  chromePort = 9300 + ((chromePort - 9300 + 1) % 80);
  const proc = await spawnChrome(CHROME, [
    `--remote-debugging-port=${chromePort}`, `--user-data-dir=${profile}`,
    '--headless=new', '--no-first-run', '--disable-gpu', '--hide-scrollbars',
    '--allow-file-access-from-files', '--force-device-scale-factor=1',
    '--disable-lcd-text', '--font-render-hinting=none',
    '--deterministic-mode', '--disable-partial-raster', '--disable-skia-runtime-opts',
    'about:blank'
  ], { cleanupPath: profile });
  try {
    let wsUrl = null;
    for (let i = 0; i < 80 && !wsUrl; i++) {
      await wait(200);
      try { const r = await fetch(`http://127.0.0.1:${chromePort}/json/version`); if (r.ok) wsUrl = (await r.json()).webSocketDebuggerUrl; } catch {}
    }
    if (!wsUrl) throw new Error('连不上 Chrome');
    const browser = await CDP.attach(wsUrl);
    try { return await fn(browser); } finally { browser.close(); }
  } finally {
    await stopChrome(proc);
  }
}

/* 一页一个 Chrome：某页整体失败只影响那一页，不会把后面全部带成「不稳定」。
   每页最多重试两轮，因为在争用下超时是常态而不是结论。 */
async function perPage(page, take) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await withChrome(async (browser) => {
        const got = {};
        for (const { mode, width } of SHOTS) got[`${mode}@${width}`] = await take(browser, page, mode, width);
        return got;
      });
    } catch (e) {
      if (attempt === 2) return { __error: e.message };
    }
  }
}

let exitCode = 0;
try {
  await mkdir(STORE, { recursive: true });
  const file = join(STORE, `${label}.json`);

  if (cmd === 'save') {
    console.log(`存像素基线「${label}」：${pages.length} 页 × ${SHOTS.length} 组（每组连拍两次验稳定性）`);
    const out = {};
    const flaky = [];
    for (const page of pages) {
      const got = await perPage(page, async (browser, p, mode, width) => {
        const a = await shoot(browser, p, mode, width);
        const b = await shoot(browser, p, mode, width);
        return a === b ? a : null;   /* 两次不同 → 这一组不确定，不纳入证明 */
      });
      if (got.__error) {
        out[page] = {};
        for (const { mode, width } of SHOTS) out[page][`${mode}@${width}`] = null;
        flaky.push(`${page}: 整页失败（${got.__error}）`);
        console.log(`  ~ ${page}（整页失败，不纳入证明：${got.__error}）`);
        continue;
      }
      out[page] = got;
      const bad = Object.entries(got).filter(([, v]) => !v).map(([k]) => k);
      if (bad.length) { flaky.push(`${page}: ${bad.join('、')}`); console.log(`  ~ ${page}（${bad.length}/${SHOTS.length} 组不稳定，不纳入证明）`); }
      else console.log(`  ✓ ${page}`);
    }
    await writeFile(file, JSON.stringify(out, null, 2));
    const stable = Object.values(out).reduce((n, m) => n + Object.values(m).filter(Boolean).length, 0);
    console.log(`\n基线已存：${stable}/${pages.length * SHOTS.length} 组可用于证明`);
    if (flaky.length) {
      console.log(`（${flaky.length} 页有不稳定组，这些组证不了，改完需人工看）`);
      for (const f of flaky) console.log(`  ${f}`);
    }
    if (!stable) exitCode = 1;   /* 一组都证不了就别假装存了基线 */
  } else {
    const base = JSON.parse(await readFile(file, 'utf8'));
    console.log(`比对像素基线「${label}」`);
    const diffs = [];
    let compared = 0, skipped = 0;
    for (const page of pages) {
      if (!base[page]) { console.log(`  ? ${page}（基线里没有）`); continue; }
      const wanted = SHOTS.filter(({ mode, width }) => base[page][`${mode}@${width}`]);
      skipped += SHOTS.length - wanted.length;
      if (!wanted.length) { console.log(`  - ${page}（基线里没有可证明的组，跳过）`); continue; }
      const got = await perPage(page, (browser, p, mode, width) => shoot(browser, p, mode, width));
      if (got.__error) { diffs.push(`${page}: 整页失败（${got.__error}）`); console.log(`  ✗ ${page}（整页失败：${got.__error}）`); continue; }
      const bad = [];
      for (const { mode, width } of wanted) {
        const key = `${mode}@${width}`;
        compared++;
        if (got[key] !== base[page][key]) bad.push(key);
      }
      if (bad.length) { diffs.push(`${page}: ${bad.join('、')}`); console.log(`  ✗ ${page}（${bad.join('、')} 渲染变了）`); }
      else console.log(`  ✓ ${page}`);
    }
    console.log(`\n=== 比了 ${compared} 组，跳过 ${skipped} 组（基线不稳定），${diffs.length} 页渲染有变化 ===`);
    if (diffs.length) {
      console.log('这些页面的改动不是零视觉影响，请逐一确认是不是删掉了还在用的规则：');
      for (const d of diffs) console.log(`  ${d}`);
      exitCode = 1;
    } else if (!compared) {
      console.log('  ✗ 一组都没比到，这次运行证明不了任何事');
      exitCode = 1;
    } else {
      console.log('  ✓ 所有可证明的组渲染逐像素相同：改动确实是零视觉影响');
    }
  }
} catch (e) {
  console.error('像素证明失败:', e.message);
  exitCode = 1;
}
process.exit(exitCode);
