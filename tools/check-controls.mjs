/* 控件可用性审计：触控目标尺寸 + 键盘焦点可见性。需要本机 Chrome。
 *
 *   node tools/check-controls.mjs                  # 全站，375px（手机档）
 *   node tools/check-controls.mjs --width 768      # 换视口
 *   node tools/check-controls.mjs games/x.html
 *   node tools/check-controls.mjs --mode parent    # 家长模式（会露出 data-audience="parent" 的控件）
 *
 * CONTRACT.md 的无障碍一节写了两条硬要求，但此前没有任何工具验证：
 *   1. 「主要触控目标至少 44 × 44px」—— 对小孩子这不是形式条款：手指精度不够，
 *      30px 的按钮会反复点空，孩子会以为是页面坏了。
 *   2. 「页面有可见的键盘焦点」—— 焦点圈用了浅色而底也是浅色时会完全看不见
 *      （wave-maker 的 outline:4px solid #fff 就是这样，已修）。
 *
 * 焦点可见性用真实 Tab 键事件驱动，而不是 el.focus()：`:focus-visible` 只在键盘交互
 * 启发式命中时才生效，用 JS 调 focus() 常常不触发，测出来的会是假象。
 *
 * WCAG 2.5.5 对「排在正文行内的链接」有豁免，本工具把这类单独归为豁免项而不报错，
 * 否则家长指南那些正文里的引用链接会淹掉真正的问题。
 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9950 + (process.pid % 40);
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

const argv = process.argv.slice(2);
function takeFlag(name, fallback) {
  const at = argv.indexOf(name);
  if (at < 0) return fallback;
  const value = argv[at + 1];
  argv.splice(at, 2);
  return value;
}
const width = Number(takeFlag('--width', '375')) || 375;
const mode = takeFlag('--mode', 'kid') === 'parent' ? 'parent' : 'kid';
/* 键盘焦点抽样上限：逐个 Tab 很慢，kitchen-science 有 300 个控件。 */
const FOCUS_SAMPLE = Number(takeFlag('--focus-sample', '24')) || 24;
const MIN = 44;

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

/* ---------- 页内探针：触控目标尺寸 ---------- */
const SIZE_PROBE = (min) => `(() => {
  const SEL = 'a[href], button, input, select, textarea, summary, [role="button"], [tabindex]:not([tabindex="-1"])';
  const label = (el) => {
    const t = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\\s+/g, ' ');
    return t.slice(0, 26) || '(无文字)';
  };
  const path = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) return s + '#' + el.id;
    if (el.classList.length) s += '.' + [...el.classList].slice(0, 2).join('.');
    const p = el.parentElement;
    return (p ? (p.id ? p.id + ' > ' : (p.classList.length ? '.' + p.classList[0] + ' > ' : '')) : '') + s;
  };
  /* 正文行内链接：WCAG 2.5.5 的豁免条件是「目标排在一句话里」。
     按父元素标签白名单判会漏——本站页脚的来源链接直接挂在 <footer> 下、
     没有 <p> 包裹（「生物照片与学名来自 <a>iNaturalist</a>，…」），
     所以直接按条件本身判：父元素里除了这个链接还有实际文字。 */
  const inlineInText = (el) => {
    if (el.tagName !== 'A') return false;
    const p = el.parentElement;
    if (!p) return false;
    let around = '';
    for (const n of p.childNodes) {
      if (n === el) continue;
      around += (n.textContent || '');
    }
    return around.replace(/\\s/g, '').length >= 4;
  };

  /* 真正的点击区域。勾选框/单选框自身的方块只有 13–22px，但点它的 <label> 同样能激活，
     所以实际触控目标是那个 label（本站的 .space-check-row 就有 min-height:48px）。
     量错对象会把一批本来合规的表单全报成不合格。 */
  const targetRect = (el) => {
    const own = el.getBoundingClientRect();
    const type = (el.getAttribute('type') || '').toLowerCase();
    const isBox = el.tagName === 'INPUT' && (type === 'checkbox' || type === 'radio');
    if (!isBox) return own;
    let lab = el.closest('label');
    if (!lab && el.id) {
      try { lab = document.querySelector('label[for="' + CSS.escape(el.id) + '"]'); } catch (e) { lab = null; }
    }
    if (!lab) return own;
    const lr = lab.getBoundingClientRect();
    /* 取两者的并集：label 包住方块时就是 label 的盒子 */
    return {
      width: Math.max(own.width, lr.width),
      height: Math.max(own.height, lr.height),
      top: Math.min(own.top, lr.top),
      bottom: Math.max(own.bottom, lr.bottom),
      right: Math.max(own.right, lr.right)
    };
  };

  const small = [];
  const exempt = [];
  let checked = 0;
  for (const el of document.querySelectorAll(SEL)) {
    if (el.hasAttribute('hidden') || el.closest('[hidden]')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = targetRect(el);
    if (r.width < 1 && r.height < 1) continue;           /* 未渲染 */
    if (r.bottom < -400 || r.top > document.documentElement.scrollHeight + 400) continue;
    /* 视觉上移出屏幕的（.skip-link 未聚焦时 top:-100px）不算主要触控目标 */
    if (r.bottom < 0 || r.right < 0) continue;
    checked++;
    const w = Math.round(r.width);
    const h = Math.round(r.height);
    if (w >= ${min} && h >= ${min}) continue;
    const rec = { where: path(el), text: label(el), w, h };
    (inlineInText(el) ? exempt : small).push(rec);
  }
  return JSON.stringify({ small, exempt: exempt.length, checked });
})()`;

/* ---------- 页内探针：收集可 Tab 到的控件 ---------- */
const TABBABLE_PROBE = `(() => {
  const SEL = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  let n = 0;
  for (const el of document.querySelectorAll(SEL)) {
    if (el.hasAttribute('hidden') || el.closest('[hidden]')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    n++;
  }
  return n;
})()`;

/* ---------- 页内探针：读当前焦点元素的焦点样式 ---------- */
const FOCUS_PROBE = `(() => {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return JSON.stringify({ none: true });
  const cs = getComputedStyle(el);
  const path = (() => {
    let s = el.tagName.toLowerCase();
    if (el.id) return s + '#' + el.id;
    if (el.classList.length) s += '.' + [...el.classList].slice(0, 2).join('.');
    return s;
  })();
  const outlineW = parseFloat(cs.outlineWidth) || 0;
  const hasOutline = cs.outlineStyle !== 'none' && outlineW > 0;
  const hasShadow = cs.boxShadow && cs.boxShadow !== 'none';
  return JSON.stringify({
    where: path,
    text: ((el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\\s+/g, ' ')).slice(0, 24),
    hasOutline, hasShadow,
    outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor,
    /* 焦点圈颜色与它压着的底色的对比度，用于判断「画了但看不见」 */
    outlineColor: cs.outlineColor,
    matchesFocusVisible: (function () { try { return el.matches(':focus-visible'); } catch (e) { return null; } })()
  });
})()`;

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
const profile = await mkdtemp(join(tmpdir(), 'controls-chrome-'));
const chrome = spawn(chromePath, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--headless=new', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--disable-extensions',
  '--allow-file-access-from-files', `--window-size=${width},900`,
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

/* 由其他线程持有的文件：和 check-headings / check-raf / check-theme 一样单列不阻断。
   见 CONTRACT.md「门禁」一节。 */
const HELD_BY_OTHERS = new Set([
  'games/number-blocks.html',
  'games/turtle-geometry.html'
]);

let browser;
let badPages = 0;
let totalChecked = 0;
let totalExempt = 0;
let focusChecked = 0;
const held = [];
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

  console.log(`控件审计：${list.length} 个页面，视口 ${width}px，mode=${mode}，` +
    `触控目标下限 ${MIN}×${MIN}，每页抽 ${FOCUS_SAMPLE} 个控件验证键盘焦点`);

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
            var html = document.documentElement;
            if (html && html.getAttribute('data-mode') !== want) html.setAttribute('data-mode', want);
          }
          force();
          var tries = 0;
          var timer = setInterval(function () { force(); if (++tries > 200) clearInterval(timer); }, 5);
          window.addEventListener('load', function () { force(); clearInterval(timer); }, true);
        })();`
      }, sessionId);
      await browser.send('Emulation.setDeviceMetricsOverride', {
        width, height: 900, deviceScaleFactor: 2, mobile: true
      }, sessionId);
      await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
      await wait(900);

      const sizeRes = await browser.send('Runtime.evaluate', {
        expression: SIZE_PROBE(MIN), returnByValue: true
      }, sessionId);
      if (sizeRes.exceptionDetails) throw new Error(sizeRes.exceptionDetails.text || '尺寸探针失败');
      const { small, exempt, checked } = JSON.parse(sizeRes.result.value);
      totalChecked += checked;
      totalExempt += exempt;

      /* ---- 键盘焦点：发真实 Tab 键，抽样检查焦点圈是否画了 ---- */
      const tabRes = await browser.send('Runtime.evaluate', {
        expression: TABBABLE_PROBE, returnByValue: true
      }, sessionId);
      const tabbable = tabRes.result?.value || 0;
      const rounds = Math.min(FOCUS_SAMPLE, tabbable);
      const noRing = [];
      for (let i = 0; i < rounds; i++) {
        await browser.send('Input.dispatchKeyEvent', {
          type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9
        }, sessionId);
        await browser.send('Input.dispatchKeyEvent', {
          type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9
        }, sessionId);
        const fRes = await browser.send('Runtime.evaluate', {
          expression: FOCUS_PROBE, returnByValue: true
        }, sessionId);
        const f = JSON.parse(fRes.result?.value || '{"none":true}');
        if (f.none) continue;
        focusChecked++;
        /* 只要求「有可见的焦点指示」：outline 或 box-shadow 至少有一个。
           颜色是否够显眼由 check-rendered-contrast 那套色彩工具和人工共同把关。 */
        if (!f.hasOutline && !f.hasShadow) {
          noRing.push(`${f.where}「${f.text}」（outline: ${f.outline}，无 box-shadow）`);
        }
      }

      const problems = [];
      if (small.length) {
        problems.push(`${small.length} 个触控目标小于 ${MIN}×${MIN}`);
      }
      if (noRing.length) problems.push(`${noRing.length} 个控件键盘聚焦后没有可见焦点指示`);

      if (problems.length && HELD_BY_OTHERS.has(page)) {
        for (const d of small) held.push(`${page}: ${d.where}「${d.text}」 ${d.w}×${d.h}`);
        for (const d of noRing) held.push(`${page}: 焦点不可见：${d}`);
        console.log(`· ${page}（其他线程持有，单列不阻断：${problems.join('、')}）`);
      } else if (problems.length) {
        badPages++;
        console.error(`✗ ${page}（${checked} 个控件${exempt ? `，${exempt} 个正文行内链接已豁免` : ''}）`);
        for (const d of small) {
          console.error(`    ${d.where}  「${d.text}」  ${d.w}×${d.h}`);
        }
        for (const d of noRing) console.error(`    焦点不可见：${d}`);
      } else {
        console.log(`✓ ${page}（${checked} 个控件全部 ≥ ${MIN}×${MIN}` +
          `${exempt ? `，${exempt} 个正文行内链接已豁免` : ''}；抽查 ${rounds} 个焦点圈均可见）`);
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

console.log(`\n=== ${list.length} 页，共检查 ${totalChecked} 个控件` +
  `（${totalExempt} 个正文行内链接按 WCAG 2.5.5 豁免），` +
  `抽查 ${focusChecked} 个键盘焦点，${badPages} 页有问题 ===`);
if (held.length) {
  console.log('（另有其他线程持有的文件，本工具不阻断，等对方收尾）');
  for (const h of held) console.log(`  ${h}`);
}
process.exit(badPages ? 1 : 0);
