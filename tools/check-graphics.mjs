/* 图形对比度审计（WCAG 1.4.11 非文本对比度，阈值 3:1）。需要本机 Chrome。
 *
 *   node tools/check-graphics.mjs                 # 全站，孩子模式
 *   node tools/check-graphics.mjs --mode parent
 *   node tools/check-graphics.mjs nature/ocean.html
 *   node tools/check-graphics.mjs --min-area 120   # 调「多小算装饰」的门槛
 *
 * 为什么单独做一个：本站的卖点是「不识字也能看懂这一页在玩什么」，对 4 岁的孩子
 * 插画就是内容本体。但 check-rendered-contrast.mjs 只量文字，
 * check-theme.mjs 只看 <style>（看不到 markup 里的 fill="…" / stroke="…" 属性）。
 * ocean 的洋流箭头当年就是 1.5:1，纯属撞巧和标签共用了同一批色值才被发现。
 *
 * 判定范围刻意收窄，避免把装饰误报成缺陷：
 *   - 只看真正上色的形状（rect/circle/ellipse/path/polygon/polyline/line），
 *     <svg> 和 <g> 的 computed fill 默认是黑色但它们并不上色。
 *   - 面积小于 --min-area（默认 64 px²）的跳过：星点、气泡、装饰碎屑。
 *   - 自身或祖先 opacity < .5 的跳过：明确画成淡影的。
 *   - fill/stroke 是渐变或图案时无法只靠 computed style 取色，单列为「未判定」，不算通过。
 *   - 底色用 elementsFromPoint 命中测试，能看到压在形状下面的兄弟形状。
 * 报告按「颜色 on 底色」聚合：系统性问题会塌成一行，好定位根因。
 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9860 + (process.pid % 60);
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

const argv = process.argv.slice(2);
function takeFlag(name, fallback) {
  const at = argv.indexOf(name);
  if (at < 0) return fallback;
  const v = argv[at + 1];
  argv.splice(at, 2);
  return v;
}
const mode = takeFlag('--mode', 'kid') === 'parent' ? 'parent' : 'kid';
const minArea = Number(takeFlag('--min-area', '64')) || 64;
const THRESHOLD = 3;

/* 由其他线程持有的文件：与其他门禁一致，单列不阻断。 */
const HELD_BY_OTHERS = new Set(['games/number-blocks.html', 'games/turtle-geometry.html']);

/* 有意为之的低对比图形，写明理由。 */
const ALLOW = new Map([]);

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
  for (const c of chromeCandidates()) {
    try { await access(c); return c; } catch { /* 继续找 */ }
  }
  throw new Error('找不到 Chrome；可通过 CHROME_PATH 指定可执行文件');
}
async function htmlPages(dir = ROOT, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'tools' || entry.name === 'node_modules') continue;
    const p = join(dir, entry.name);
    if (entry.isDirectory()) await htmlPages(p, out);
    else if (entry.name.endsWith('.html')) out.push(relative(ROOT, p).split(sep).join('/'));
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
      const m = JSON.parse(event.data);
      if (m.id && client.waiting.has(m.id)) {
        const p = client.waiting.get(m.id);
        client.waiting.delete(m.id);
        m.error ? p.fail(new Error(m.error.message)) : p.ok(m.result);
      }
    };
    ws.onclose = () => {
      for (const p of client.waiting.values()) p.fail(new Error('Chrome WebSocket 已关闭'));
      client.waiting.clear();
    };
    return client;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => {
      const timer = setTimeout(() => {
        if (this.waiting.delete(id)) fail(new Error(`${method} 超时`));
      }, 40000);
      this.waiting.set(id, {
        ok(v) { clearTimeout(timer); ok(v); },
        fail(e) { clearTimeout(timer); fail(e); }
      });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() { this.ws.close(); }
}

const PROBE = (minAreaPx, threshold) => `(() => {
  const parse = (s) => {
    const m = String(s).match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
    if (p.length < 3 || p.some((n) => !Number.isFinite(n))) return null;
    return [p[0], p[1], p[2], p[3] === undefined ? 1 : p[3]];
  };
  const f = (v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = (c) => 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  const ratio = (a, b) => {
    const la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };
  const SHAPES = new Set(['rect','circle','ellipse','path','polygon','polyline','line']);

  /* 元素真正涂出来的底色。SVG 形状用 fill，HTML 用 background-color。 */
  const paintOf = (n) => {
    const cs = getComputedStyle(n);
    if (n.namespaceURI === 'http://www.w3.org/2000/svg') {
      if (n.tagName === 'svg') {
        if (cs.backgroundImage && cs.backgroundImage !== 'none') return { unknown: 1 };
        const bg = parse(cs.backgroundColor);
        return bg && bg[3] > 0 ? { color: bg } : null;
      }
      if (!SHAPES.has(n.tagName)) return null;
      const fill = cs.fill;
      if (!fill || fill === 'none') return null;
      if (/gradient|url\\(/i.test(fill)) return { unknown: 1 };
      const c = parse(fill);
      if (!c || c[3] === 0) return null;
      const op = parseFloat(cs.fillOpacity);
      if (Number.isFinite(op) && op < 1) c[3] *= op;
      return { color: c };
    }
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return { unknown: 1 };
    const c = parse(cs.backgroundColor);
    return c && c[3] > 0 ? { color: c } : null;
  };

  /* 累计不透明度：祖先 opacity 会乘上来 */
  const effOpacity = (el) => {
    let o = 1;
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const v = parseFloat(getComputedStyle(n).opacity);
      if (Number.isFinite(v)) o *= v;
      if (o < 0.05) break;
    }
    return o;
  };

  /* 形状下面的底色。从命中栈里跳过自己，往下找第一层不透明的。 */
  const backdropAt = (el, x, y) => {
    const hit = document.elementsFromPoint(x, y);
    const at = hit ? hit.indexOf(el) : -1;
    const chain = at >= 0 ? hit.slice(at + 1) : null;
    if (!chain) return { unknown: 1 };
    let accC = [0, 0, 0], accA = 0;
    for (const n of chain) {
      const p = paintOf(n);
      if (!p) continue;
      if (p.unknown) return { unknown: 1 };
      const w = p.color[3] * (1 - accA);
      if (w <= 0) continue;
      accC = [0, 1, 2].map((i) => accC[i] + p.color[i] * w);
      accA += w;
      if (accA >= 0.999) break;
    }
    const rest = 1 - accA;
    return { color: [0, 1, 2].map((i) => accC[i] + 255 * rest).concat([1]) };
  };

  const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat([1]);
  const path = (el) => {
    const svg = el.ownerSVGElement;
    const tag = (svg && (svg.id ? '#' + svg.id : (svg.classList.length ? '.' + svg.classList[0] : 'svg'))) || 'svg';
    let s = el.tagName;
    if (el.classList.length) s += '.' + [...el.classList].slice(0, 2).join('.');
    return tag + ' > ' + s;
  };

  const fails = [];
  let unknown = 0, checked = 0;

  for (const el of document.querySelectorAll('svg rect, svg circle, svg ellipse, svg path, svg polygon, svg polyline, svg line')) {
    if (el.closest('[hidden]') || el.closest('defs') || el.closest('clipPath') || el.closest('mask')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    if (effOpacity(el) < 0.5) continue;              /* 明确画淡的装饰 */
    let r;
    try { r = el.getBoundingClientRect(); } catch (e) { continue; }
    if (!r || r.width < 1 || r.height < 1) continue;
    if (r.width * r.height < ${minAreaPx}) continue;  /* 太小：星点、气泡、碎屑 */
    if (r.bottom < 0 || r.right < 0 || r.left > innerWidth || r.top > innerHeight) continue;

    /* 取形状自己的颜色：优先 fill，其次 stroke（线条图形 fill 常是 none） */
    let paint = null, kind = '';
    const fill = cs.fill;
    if (fill && fill !== 'none') {
      if (/gradient|url\\(/i.test(fill)) { unknown++; continue; }
      paint = parse(fill); kind = 'fill';
      const fo = parseFloat(cs.fillOpacity);
      if (paint && Number.isFinite(fo) && fo < 1) paint[3] *= fo;
    }
    if (!paint || paint[3] === 0) {
      const stroke = cs.stroke;
      if (!stroke || stroke === 'none') continue;
      if (/gradient|url\\(/i.test(stroke)) { unknown++; continue; }
      paint = parse(stroke); kind = 'stroke';
      const so = parseFloat(cs.strokeOpacity);
      if (paint && Number.isFinite(so) && so < 1) paint[3] *= so;
      /* 细线条的可见性更依赖对比度，但 <1px 的发丝线属装饰 */
      if ((parseFloat(cs.strokeWidth) || 0) < 1) continue;
    }
    if (!paint || paint[3] < 0.15) continue;

    /* 取样点：形状包围盒中心；线条取中点更可能落在线上 */
    const x = Math.round(r.left + r.width / 2);
    const y = Math.round(r.top + r.height / 2);
    if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
    const bd = backdropAt(el, x, y);
    if (bd.unknown) { unknown++; continue; }

    checked++;
    const seen = over(paint, bd.color);
    const cr = ratio(seen, bd.color);
    if (cr < ${threshold}) {
      fails.push({
        where: path(el), kind,
        color: kind === 'fill' ? cs.fill : cs.stroke,
        bg: 'rgb(' + bd.color.slice(0, 3).map(Math.round).join(',') + ')',
        area: Math.round(r.width * r.height),
        ratio: Number(cr.toFixed(2))
      });
    }
  }
  return JSON.stringify({ fails, unknown, checked });
})()`;

const requested = argv.map((arg) => {
  const abs = resolve(ROOT, arg);
  const rel = relative(ROOT, abs);
  if (isAbsolute(arg) || rel === '..' || rel.startsWith(`..${sep}`) || !arg.endsWith('.html')) {
    throw new Error(`页面参数必须是站内相对 HTML 路径: ${arg}`);
  }
  return rel.split(sep).join('/');
});
const list = requested.length ? requested : await htmlPages();

const chromePath = await findChrome();
const profile = await mkdtemp(join(tmpdir(), 'graphics-chrome-'));
const chrome = spawn(chromePath, [
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--headless=new', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--disable-extensions',
  '--allow-file-access-from-files', '--window-size=1280,900', 'about:blank'
], { stdio: 'ignore' });

async function cleanup() {
  if (!chrome.killed) chrome.kill();
  await new Promise((done) => {
    if (chrome.exitCode !== null || chrome.signalCode !== null) return done();
    const t = setTimeout(done, 3000);
    chrome.once('exit', () => { clearTimeout(t); done(); });
  });
  try { await rm(profile, { recursive: true, force: true }); } catch { /* 不遮盖结果 */ }
}

let browser;
let badPages = 0, totalChecked = 0, totalUnknown = 0;
const held = [];
const pairs = new Map();
try {
  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await wait(250);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) wsUrl = (await res.json()).webSocketDebuggerUrl;
    } catch { /* 尚未就绪 */ }
  }
  if (!wsUrl) throw new Error('Chrome 调试端口未就绪');
  browser = await CDP.attach(wsUrl);

  console.log(`图形对比度审计：${list.length} 个页面，mode=${mode}，阈值 ${THRESHOLD}:1，` +
    `忽略面积 < ${minArea}px² 与不透明度 < .5 的装饰`);

  for (const page of list) {
    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
    try {
      await browser.send('Runtime.enable', {}, sessionId);
      await browser.send('Page.enable', {}, sessionId);
      await browser.send('Page.addScriptToEvaluateOnNewDocument', {
        source: `(function () {
          var want = ${JSON.stringify(mode)};
          function force() {
            var h = document.documentElement;
            if (h && h.getAttribute('data-mode') !== want) h.setAttribute('data-mode', want);
          }
          force();
          var n = 0, t = setInterval(function () { force(); if (++n > 200) clearInterval(t); }, 5);
          window.addEventListener('load', function () { force(); clearInterval(t); }, true);
        })();`
      }, sessionId);
      await browser.send('Emulation.setDeviceMetricsOverride', {
        width: 1280, height: 9000, deviceScaleFactor: 1, mobile: false
      }, sessionId);
      await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
      await wait(900);

      const res = await browser.send('Runtime.evaluate', {
        expression: PROBE(minArea, THRESHOLD), returnByValue: true
      }, sessionId);
      if (res.exceptionDetails) throw new Error(res.exceptionDetails.text || '探针执行失败');
      const { fails, unknown, checked } = JSON.parse(res.result.value);
      totalChecked += checked;
      totalUnknown += unknown;

      const real = fails.filter((d) => !ALLOW.has(`${page} ${d.where}`));
      for (const d of real) {
        const key = `${d.color} on ${d.bg} = ${d.ratio}`;
        pairs.set(key, (pairs.get(key) || 0) + 1);
      }

      if (real.length && HELD_BY_OTHERS.has(page)) {
        for (const d of real) held.push(`${page}: ${d.where} ${d.kind}:${d.color} on ${d.bg} = ${d.ratio}`);
        console.log(`· ${page}（其他线程持有，单列不阻断：${real.length} 处）`);
      } else if (real.length) {
        badPages++;
        console.error(`✗ ${page}（检查 ${checked} 个图形，${real.length} 处低于 ${THRESHOLD}:1）`);
        for (const d of real) {
          console.error(`    ${d.where}  ${d.kind}: ${d.color} on ${d.bg} = ${d.ratio}（${d.area}px²）`);
        }
      } else {
        console.log(`✓ ${page}（${checked} 个图形全部 ≥ ${THRESHOLD}:1` +
          `${unknown ? `，${unknown} 个用渐变/图案填充未判定` : ''}）`);
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

console.log(`\n=== ${list.length} 页，共判定 ${totalChecked} 个图形，` +
  `${totalUnknown} 个渐变/图案填充无法只靠 computed style 判定，${badPages} 页有问题 ===`);
if (pairs.size) {
  console.log('\n按「颜色 on 底色」聚合（同一根因会塌成一行）：');
  for (const [k, n] of [...pairs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
    console.log(`  ${String(n).padStart(4)}  ${k}`);
  }
}
if (held.length) {
  console.log('（另有其他线程持有的文件，本工具不阻断，等对方收尾）');
  for (const h of held.slice(0, 10)) console.log(`  ${h}`);
}
process.exit(badPages ? 1 : 0);
