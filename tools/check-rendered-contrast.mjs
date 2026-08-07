/* 真实渲染对比度审计：用本机 Chrome 读 getComputedStyle，按真实层叠和 DOM 算对比度。
 *
 *   node tools/check-rendered-contrast.mjs                    # 全站
 *   node tools/check-rendered-contrast.mjs nature/ocean.html  # 指定页面
 *   node tools/check-rendered-contrast.mjs --mode kid         # 在孩子模式下审计
 *
 * 和另外两个色彩工具的分工：
 *   check-contrast.mjs        只算三套主题的 token × token 组合，看不到页面里的写法。
 *   check-theme.mjs           静态扫页面 <style>，只判「不需要知道层叠就能确定」的情形。
 *   本工具                    真浏览器里逐个文字节点算，能抓上面两个都抓不到的那一类：
 *                             文字色和背景色分别来自不同规则、由继承和层叠拼出来的组合。
 *
 * 这一类最容易出错，因为改一条规则不会提示你另一条被盖掉了。例：
 * light-and-shadow 的深色幕布上给 .theater-hero 设了浅色 color，但 base.css 的
 * `p { color: var(--ink-mid) }` 有选择器权重，段落仍然是深色 —— 只有在真实层叠里才看得出来。
 *
 * 背景取值方式：从元素自己往上走，遇到第一个不透明背景就停；半透明背景按顺序合成。
 * 有背景图/渐变的祖先无法只靠 computed style 取到准确颜色，这类元素单独列为「无法判定」，
 * 不计入失败，也不假装通过。
 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9700 + (process.pid % 200);
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

const argv = process.argv.slice(2);
let mode = 'parent';
const modeAt = argv.indexOf('--mode');
if (modeAt >= 0) {
  mode = argv[modeAt + 1] === 'kid' ? 'kid' : 'parent';
  argv.splice(modeAt, 2);
}
/* 可选的深色主题（<html data-theme="dark">）。默认不加这个属性，也就是浅色主题。 */
let theme = '';
const themeAt = argv.indexOf('--theme');
if (themeAt >= 0) {
  theme = argv[themeAt + 1] === 'dark' ? 'dark' : '';
  argv.splice(themeAt, 2);
}

function chromeCandidates() {
  return [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium', '/usr/bin/chromium-browser'
  ].filter(Boolean);
}
async function findChrome() {
  for (const candidate of chromeCandidates()) {
    try { await access(candidate); return candidate; } catch { /* 继续找 */ }
  }
  throw new Error('找不到 Chrome；可通过 CHROME_PATH 指定可执行文件');
}

async function htmlPages(dir = ROOT, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'tools' || entry.name === 'node_modules') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await htmlPages(path, out);
    else if (entry.name.endsWith('.html')) out.push(relative(ROOT, path).split(sep).join('/'));
  }
  return out.sort();
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
  static async attach(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((ok, fail) => {
      ws.onopen = ok;
      ws.onerror = () => fail(new Error('Chrome WebSocket 连接失败'));
    });
    const client = new CDP(ws);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id && client.waiting.has(message.id)) {
        const pending = client.waiting.get(message.id);
        client.waiting.delete(message.id);
        message.error ? pending.fail(new Error(message.error.message)) : pending.ok(message.result);
      }
    };
    ws.onclose = () => {
      for (const pending of client.waiting.values()) pending.fail(new Error('Chrome WebSocket 已关闭'));
      client.waiting.clear();
    };
    return client;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => {
      const timer = setTimeout(() => {
        if (this.waiting.delete(id)) fail(new Error(`${method} 超时`));
      }, 30000);
      this.waiting.set(id, {
        ok(v) { clearTimeout(timer); ok(v); },
        fail(e) { clearTimeout(timer); fail(e); }
      });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() { this.ws.close(); }
}

/* 在页面里执行的审计函数。返回 { fails, unknown, checked }。 */
const PROBE = `((wantMode) => {
  /* data-mode 由 addScriptToEvaluateOnNewDocument 里的钉子从头压住，这里只兜一次底。 */
  if (document.documentElement.getAttribute('data-mode') !== wantMode) {
    document.documentElement.setAttribute('data-mode', wantMode);
  }
  const parse = (s) => {
    const m = String(s).match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
    if (p.length < 3 || p.some((n) => !Number.isFinite(n))) return null;
    return [p[0], p[1], p[2], p[3] === undefined ? 1 : p[3]];
  };
  const f = (v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = (c) => 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat([1]);
  const ratio = (a, b) => {
    const la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };
  const path = (el) => {
    const bits = [];
    for (let n = el; n && n.nodeType === 1 && bits.length < 4; n = n.parentElement) {
      let s = n.tagName.toLowerCase();
      if (n.id) { bits.unshift(s + '#' + n.id); break; }
      if (n.classList.length) s += '.' + [...n.classList].slice(0, 2).join('.');
      bits.unshift(s);
    }
    return bits.join(' > ');
  };

  /* 一个元素自己画出的底色。SVG 图形用 fill，HTML 用 background-color；
     有 background-image（渐变/图）时返回 unknown。 */
  /* 只有这些 SVG 元素真的会把区域涂上颜色。<svg> 和 <g> 的 computed fill 默认是
     rgb(0,0,0)，但它们并不上色，当成底色会把一切都算成压在黑色上。 */
  const SVG_SHAPES = new Set(['rect', 'circle', 'ellipse', 'path', 'polygon', 'polyline', 'line']);
  const paintOf = (n) => {
    const cs = getComputedStyle(n);
    if (n.namespaceURI === 'http://www.w3.org/2000/svg') {
      /* <svg> 自身可以有 CSS 背景色，按 HTML 规则处理；其余非形状元素不上色。 */
      if (n.tagName === 'svg') {
        if (cs.backgroundImage && cs.backgroundImage !== 'none') {
          return { unknown: cs.backgroundImage.slice(0, 42) };
        }
        const bg = parse(cs.backgroundColor);
        return bg && bg[3] > 0 ? { color: bg } : null;
      }
      if (!SVG_SHAPES.has(n.tagName)) return null;
      const fill = cs.fill;
      if (!fill || fill === 'none') return null;
      if (/gradient|url\\(/i.test(fill)) return { unknown: fill.slice(0, 42) };
      const c = parse(fill);
      if (!c || c[3] === 0) return null;
      const op = parseFloat(cs.fillOpacity);
      if (Number.isFinite(op) && op < 1) c[3] *= op;
      return { color: c };
    }
    if (cs.backgroundImage && cs.backgroundImage !== 'none') {
      return { unknown: cs.backgroundImage.slice(0, 42) };
    }
    const c = parse(cs.backgroundColor);
    if (!c || c[3] === 0) return null;
    return { color: c };
  };

  /* 有效背景：优先用真实命中测试（elementsFromPoint）——它能看到 SVG 里
     压在文字下面的兄弟 <rect>/<path>，这是 CSS 祖先遍历看不到的。
     命中测试拿不到（元素在视口外）时退回祖先遍历。 */
  const effectiveBg = (el) => {
    /* 取第一个 client rect，而不是整体 bounding box：行内元素（<code>、<b>）换行后
       bounding box 会横跨多行，中心点常常落在行间空隙或旁边的图形上，量到的不是
       文字真正压着的底色。再把取样点往左偏一点，尽量落在字面上。 */
    const rects = el.getClientRects();
    const r = (rects && rects.length) ? rects[0] : el.getBoundingClientRect();
    const x = r.left + Math.min(r.width * 0.25, 20);
    const y = r.top + r.height / 2;
    let stack = null;
    if (x >= 0 && y >= 0 && x < innerWidth && y < innerHeight) {
      const hit = document.elementsFromPoint(x, y);
      const at = hit ? hit.indexOf(el) : -1;
      /* 命中栈里必须真的有这个元素，否则说明取样点没落在它身上（被别的元素盖住、
         或行内元素换行导致点落到空隙），这时整条栈都与它无关，只能退回祖先遍历。
         从元素自己开始切：它自己的背景就在自己的文字后面。 */
      stack = at >= 0 ? hit.slice(at) : null;
    }
    const chain = (stack && stack.length) ? stack : (() => {
      const up = [];
      for (let n = el; n; n = n.parentElement) up.push(n);
      return up;
    })();

    /* 从上往下按 source-over 累积（预乘）。
       不能简单地对相邻两层反复调 over()：over() 会把下层当成不透明并把结果 alpha 置为 1，
       于是「12% 绿叠在 8% 绿上」会算成纯饱和绿，而不是继续往下合成到白色卡片底，
       量出来的对比度会假性偏低。 */
    let accC = [0, 0, 0];
    let accA = 0;
    for (const n of chain) {
      const p = paintOf(n);
      if (!p) continue;
      if (p.unknown) return { unknown: p.unknown };
      const w = p.color[3] * (1 - accA);
      if (w <= 0) continue;
      accC = [0, 1, 2].map((i) => accC[i] + p.color[i] * w);
      accA += w;
      if (accA >= 0.999) break;
    }
    /* 剩下的透明度落到画布白底上 */
    const rest = 1 - accA;
    return { color: [0, 1, 2].map((i) => accC[i] + 255 * rest).concat([1]) };
  };

  const fails = [];
  const unknown = [];
  let checked = 0;

  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('[hidden]') || el.hasAttribute('hidden')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.1) continue;
    /* 只看直接包含可见文字的元素 */
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ').trim();
    if (!text) continue;
    /* 纯 emoji/符号不受 color/fill 控制（彩色字形自带颜色），量对比度没有意义。 */
    if (!/[\\p{L}\\p{N}]/u.test(text)) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;

    /* SVG 文字由 fill 上色，不是 color。本站的 SVG 标签（如 ocean 的 .oc-cap）
       就是靠 fill 给浅色的，读 color 会拿到无关的继承值并误报。 */
    const isSvgText = el.namespaceURI === 'http://www.w3.org/2000/svg';
    let paint = cs.color;
    if (isSvgText) {
      const fill = cs.fill;
      if (!fill || fill === 'none') continue;
      paint = /currentcolor/i.test(fill) ? cs.color : fill;
    }
    const fg = parse(paint);
    if (!fg || fg[3] === 0) continue;
    const bg = effectiveBg(el);
    if (bg.unknown) {
      unknown.push({ where: path(el), text: text.slice(0, 24), bg: bg.unknown });
      continue;
    }
    const px = parseFloat(cs.fontSize) || 16;
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const need = (px >= 24 || (px >= 18.66 && weight >= 700)) ? 3 : 4.5;
    const r = ratio(over(fg, bg.color), bg.color);
    checked++;
    if (r < need) {
      fails.push({
        where: path(el), text: text.slice(0, 28),
        color: (isSvgText ? 'fill ' : '') + paint,
        bg: 'rgb(' + bg.color.slice(0, 3).map(Math.round).join(',') + ')',
        px: Math.round(px), weight, ratio: Number(r.toFixed(2)), need
      });
    }
  }
  /* 把真实生效的 mode 报出来：页面在 <html> 上静态写死 data-mode，
     偏好注入不一定盖得过它，不报出来就说不清测的到底是哪一套配色。 */
  return JSON.stringify({
    fails, unknown: unknown.length, checked,
    mode: document.documentElement.getAttribute('data-mode') || '(未设置)',
    bg: getComputedStyle(document.body).backgroundColor
  });
})(MODE_PLACEHOLDER)`;

const requested = argv.map((arg) => {
  const absolute = resolve(ROOT, arg);
  const rel = relative(ROOT, absolute);
  if (isAbsolute(arg) || rel === '..' || rel.startsWith(`..${sep}`) || !arg.endsWith('.html')) {
    throw new Error(`页面参数必须是站内相对 HTML 路径: ${arg}`);
  }
  return rel.split(sep).join('/');
});
const list = requested.length ? requested : await htmlPages();

const chromePath = await findChrome();
const profile = await mkdtemp(join(tmpdir(), 'contrast-chrome-'));
const chrome = spawn(chromePath, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--headless=new', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--disable-extensions',
  '--allow-file-access-from-files', '--window-size=1280,900',
  'about:blank'
], { stdio: 'ignore' });

async function cleanup() {
  if (!chrome.killed) chrome.kill();
  await new Promise((done) => {
    if (chrome.exitCode !== null || chrome.signalCode !== null) return done();
    const timer = setTimeout(done, 3000);
    chrome.once('exit', () => { clearTimeout(timer); done(); });
  });
  try { await rm(profile, { recursive: true, force: true }); } catch { /* 不遮盖结果 */ }
}

let browser;
let badPages = 0;
let totalChecked = 0;
let totalUnknown = 0;
const modesSeen = new Map();
const mismatched = [];
try {
  let wsUrl = null;
  for (let attempt = 0; attempt < 60 && !wsUrl; attempt++) {
    await wait(250);
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (response.ok) wsUrl = (await response.json()).webSocketDebuggerUrl;
    } catch { /* Chrome 尚未就绪 */ }
  }
  if (!wsUrl) throw new Error('Chrome 调试端口未就绪');
  browser = await CDP.attach(wsUrl);

  console.log(`真实渲染对比度审计：${list.length} 个页面，mode=${mode}` +
    `，theme=${theme || '默认浅色'}（Chrome headless）`);

  for (const page of list) {
    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
    try {
      await browser.send('Runtime.enable', {}, sessionId);
      await browser.send('Page.enable', {}, sessionId);
      /* 从页面脚本执行之前就把 data-mode 钉住，并持续压制后续改动。
         为什么不用 localStorage 注入偏好：file:// 下拿不稳，而且 playful.js 在 body 末尾
         才按偏好写 data-mode。更关键的是，页面里有 JS 在加载时用 getComputedStyle 读
         --canvas-ink 之类的 token 并写成 SVG/Canvas 的固定颜色 —— 如果等渲染完再翻模式，
         这些颜色就是上一套主题的，会量出一堆假的「深底深字」。 */
      await browser.send('Page.addScriptToEvaluateOnNewDocument', {
        source: `(function () {
          var want = ${JSON.stringify(mode)};
          var wantTheme = ${JSON.stringify(theme)};
          function force() {
            var html = document.documentElement;
            if (!html) return;
            if (html.getAttribute('data-mode') !== want) html.setAttribute('data-mode', want);
            if (wantTheme) {
              if (html.getAttribute('data-theme') !== wantTheme) html.setAttribute('data-theme', wantTheme);
            }
          }
          force();
          var tries = 0;
          var timer = setInterval(function () { force(); if (++tries > 200) clearInterval(timer); }, 5);
          document.addEventListener('DOMContentLoaded', force, true);
          window.addEventListener('load', function () { force(); clearInterval(timer); }, true);
        })();`
      }, sessionId);
      /* 视口开得很高：命中测试只对视口内的点有效，页面越完整地落在视口里，
         能用真实命中测试判定的文字就越多（否则退回祖先遍历，准确度低）。 */
      await browser.send('Emulation.setDeviceMetricsOverride', {
        width: 1280, height: 9000, deviceScaleFactor: 1, mobile: false
      }, sessionId);
      await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
      await wait(900);

      const result = await browser.send('Runtime.evaluate', {
        expression: PROBE.replace('MODE_PLACEHOLDER', JSON.stringify(mode)),
        returnByValue: true, awaitPromise: false
      }, sessionId);
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || '探针执行失败');
      const { fails, unknown, checked, mode: actualMode, bg } = JSON.parse(result.result.value);
      totalChecked += checked;
      totalUnknown += unknown;
      modesSeen.set(actualMode, (modesSeen.get(actualMode) || 0) + 1);
      if (actualMode !== mode) mismatched.push(`${page}（要求 ${mode}，实际 ${actualMode}，body 底色 ${bg}）`);

      if (fails.length) {
        badPages++;
        console.error(`✗ ${page}（检查 ${checked} 个文字节点，${fails.length} 处不达标）`);
        /* 全部列出：截断会让聚合统计漏掉问题，修的时候容易以为已经清干净了。 */
        for (const d of fails) {
          console.error(`    ${d.where}  「${d.text}」`);
          console.error(`      ${d.color} on ${d.bg} = ${d.ratio}（${d.px}px/${d.weight} 需 ≥ ${d.need}）`);
        }
      } else {
        console.log(`✓ ${page}（${checked} 个文字节点全部达标${unknown ? `，${unknown} 个压在渐变/图片上未判定` : ''}）`);
      }
    } catch (error) {
      badPages++;
      console.error(`✗ ${page}: ${error.message}`);
    } finally {
      await browser.send('Target.closeTarget', { targetId }).catch(() => {});
    }
  }
} finally {
  if (browser) browser.close();
  await cleanup();
}

console.log(`\n=== ${list.length} 页，共判定 ${totalChecked} 个文字节点，` +
  `${totalUnknown} 个压在渐变/图片上无法只靠 computed style 判定，${badPages} 页有问题 ===`);
console.log(`实际生效的 data-mode：${[...modesSeen.entries()].map(([m, n]) => `${m}×${n}`).join('、')}`);
if (mismatched.length) {
  console.log(`（下面这些页面没有切到要求的 mode —— 页面在 <html> 上静态写死了 data-mode，` +
    `偏好注入盖不过它；要测另一套配色需要按页确认）：`);
  for (const m of mismatched.slice(0, 6)) console.log(`  ${m}`);
  if (mismatched.length > 6) console.log(`  …共 ${mismatched.length} 页`);
}
if (totalUnknown) {
  console.log('（压在渐变或背景图上的文字取不到准确底色，本工具不假装通过；' +
    '这类请用 check-theme.mjs 的静态判定或人工核对。）');
}
process.exit(badPages ? 1 : 0);
