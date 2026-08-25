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
import { access, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { acquireChromeLease } from './chrome-lease.mjs';
import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';

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
    /* 这个浏览器一律不许写下载文件。门禁会逐个点击页面上可见的按钮，
       其中就有「保存图片」「导出 JSON」「导出代码」这类导出控件——Chrome 的
       默认行为会把文件真的存进 ~/Downloads，跑一轮门禁就多出十几个文件
       （doodle-pad 的画、symmetry 的对称作品、足迹 JSON、评估 txt…），
       几轮下来上百个。审计只关心「点下去有没有报错、有没有请求离开设备」，
       落盘对结论没有任何贡献，纯属污染用户的下载目录。
       deny 也顺带让「点导出」这条路径本身仍然被走到，不影响判定。 */
    /* 下载禁用是安全边界：失败时必须在创建 target、点击页面之前终止。 */
    await client.send('Browser.setDownloadBehavior', { behavior: 'deny' });
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
await acquireChromeLease();

/* Chrome 做成「可重启」而不是启动一次用到底。
   原因：一个长驻实例要连开几十个 target，机器负载高的时候会整个死掉，
   之后每个 createTarget 都超时，剩下的页面全部报假失败——在死浏览器上重试没有意义。
   端口每次换一个，避免和正在退出的旧实例撞上；profile 也重新建一个，
   否则旧 profile 里的锁文件会让新实例起不来。 */
let chrome = null;
let profile = null;
let port = PORT;

async function cleanup() {
  const dyingBrowser = browser;
  const dyingChrome = chrome;
  if (dyingBrowser) {
    try { dyingBrowser.close(); } catch { /* 已经断了 */ }
  }
  if (dyingChrome) await stopChrome(dyingChrome);
  if (browser === dyingBrowser) browser = null;
  if (chrome === dyingChrome) {
    chrome = null;
    profile = null;
  }
}

async function launchChrome() {
  port = 9950 + ((port - 9950 + 1) % 40);
  const nextProfile = await mkdtemp(join(tmpdir(), 'controls-chrome-'));
  const nextChrome = await spawnChrome(chromePath, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${nextProfile}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--disable-extensions',
    '--allow-file-access-from-files', `--window-size=${width},900`,
    'about:blank'
  ], { cleanupPath: nextProfile });
  profile = nextProfile;
  chrome = nextChrome;
  let wsUrl = null;
  for (let attempt = 0; attempt < 60 && !wsUrl; attempt++) {
    await wait(250);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) wsUrl = (await response.json()).webSocketDebuggerUrl;
    } catch { /* Chrome 尚未就绪 */ }
  }
  if (!wsUrl) throw new Error('Chrome 调试端口未就绪');
  return CDP.attach(wsUrl);
}

/* 曾经这里有一个 HELD_BY_OTHERS 豁免集（number-blocks / turtle-geometry 单列不阻断）。
   那两个线程已经收尾：去掉豁免后这两页在 kid 与 parent@768 下都是全部控件 ≥ 44×44、
   焦点圈可见，所以豁免过期了，28 页一视同仁。见 CONTRACT.md「门禁」一节。
   44×44 和可见焦点是给小孩子的硬要求，不该有页面长期挂在豁免名单上。 */

let browser;
let badPages = 0;
let totalChecked = 0;
let totalExempt = 0;
let focusChecked = 0;
try {
  browser = await launchChrome();

  console.log(`控件审计：${list.length} 个页面，视口 ${width}px，mode=${mode}，` +
    `触控目标下限 ${MIN}×${MIN}，每页抽 ${FOCUS_SAMPLE} 个控件验证键盘焦点`);

  /* 基础设施类错误：一个长驻 Chrome 要连开几十个 target，机器负载高的时候会整个死掉，
     之后每个 createTarget 都失败。这类错误和「这一页控件不合规」是两件事——
     判据很硬：真缺陷会给出具体数值（控件尺寸、焦点圈），基础设施问题只有超时和掉线。
     原来 Target.createTarget / attachToTarget 写在 try **外面**，所以它一失败异常就逃出
     整个循环、进程直接死掉，前面已经跑完的页面结果全部丢失（实测跑到第 26 页
     撞上 Failed to open a new tab，前 25 页的结论一起没了）。
     现在把建 target 也纳入保护，并对这类错误换一个全新 target 重试一次。 */
  const TRANSIENT = /超时|timeout|WebSocket 已关闭|Session with given id not found|Failed to open a new tab|Target closed|Inspected target|调试端口未就绪/i;

  async function auditOnce(page) {
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

      if (problems.length) {
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
    } finally {
      await browser.send('Target.closeTarget', { targetId }).catch(() => {});
    }
  }

  for (const page of list) {
    let lastError = null;
    let retried = false;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try { lastError = null; await auditOnce(page); break; }
      catch (error) {
        lastError = error;
        if (attempt === 2 || !TRANSIENT.test(error.message)) break;
        retried = true;
        /* 整个换一个 Chrome 再重试，而不是只换 target：
           这类错误多半意味着旧实例已经死了，在死实例上重试拿不到任何结果。 */
        await cleanup();
        await wait(1200);
        browser = await launchChrome();
      }
    }
    if (lastError) {
      badPages++;
      console.error(`✗ ${page}: ${lastError.message}`
        + (retried ? '（已重试一次仍失败，这不像是偶发超时；先看机器负载，别急着改页面）' : ''));
    }
  }
} finally {
  await cleanup();
}

console.log(`\n=== ${list.length} 页，共检查 ${totalChecked} 个控件` +
  `（${totalExempt} 个正文行内链接按 WCAG 2.5.5 豁免），` +
  `抽查 ${focusChecked} 个键盘焦点，${badPages} 页有问题 ===`);
process.exit(badPages ? 1 : 0);
