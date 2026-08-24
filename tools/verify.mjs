/* 全站真浏览器验证器：无依赖，只用 Node 内置 WebSocket + 本机 Chrome。
 *
 * 用法：
 *   node tools/verify.mjs              # 验证全部页面
 *   node tools/verify.mjs games/x.html # 只验证指定页面
 *
 * 每页检查 file:// 加载、站内资源、运行时异常、控件交互、基础键盘可达性，
 * 并在 375 / 768 / 1280 三档视口检查横向溢出。
 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const PORT = 9400 + (process.pid % 300);
const VIEWPORTS = [
  { width: 375, height: 750, mobile: true },
  { width: 768, height: 900, mobile: true },
  { width: 1280, height: 900, mobile: false }
];
const ROOT_URL = pathToFileURL(ROOT + sep).href;
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

function chromeCandidates() {
  return [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'
  ].filter(Boolean);
}
async function findChrome() {
  for (const candidate of chromeCandidates()) {
    try { await access(candidate); return candidate; } catch { /* 继续找 */ }
  }
  throw new Error('找不到 Chrome；可通过 CHROME_PATH 指定可执行文件');
}

async function pages(dir = ROOT, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'tools' || entry.name === 'node_modules') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await pages(path, out);
    else if (entry.name.endsWith('.html')) out.push(relative(ROOT, path).split(sep).join('/'));
  }
  return out.sort();
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.waiting = new Map();
    this.onEvent = null;
  }
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
      } else if (message.method && client.onEvent) client.onEvent(message);
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
        ok(value) { clearTimeout(timer); ok(value); },
        fail(error) { clearTimeout(timer); fail(error); }
      });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() { this.ws.close(); }
}

function isLocal(url) { return url.startsWith(ROOT_URL); }
function shortUrl(url) {
  if (!isLocal(url)) return url;
  try { return decodeURIComponent(url.slice(ROOT_URL.length)); } catch { return url.slice(ROOT_URL.length); }
}
function runtimeIgnorable(text) {
  /* 可选远程增强在 file:// 下可因 CORS/断网失败；Network 域会单独、严格地抓本站资源。 */
  return /blocked by CORS|ERR_BLOCKED_BY_CLIENT|net::ERR_(?:FAILED|NAME_NOT_RESOLVED|INTERNET_DISCONNECTED|CONNECTION)/i.test(text)
    || /^Failed to load resource(?::|$)/i.test(text.trim());
}
function unique(items) { return [...new Set(items)]; }

const only = process.argv.slice(2);
const list = only.length ? only.map((arg) => {
  const absolute = resolve(ROOT, arg);
  const rel = relative(ROOT, absolute);
  if (isAbsolute(arg) || rel === '..' || rel.startsWith(`..${sep}`) || !arg.endsWith('.html')) {
    throw new Error(`页面参数必须是站内相对 HTML 路径: ${arg}`);
  }
  return rel.split(sep).join('/');
}) : await pages();

const chromePath = await findChrome();
const profile = await mkdtemp(join(tmpdir(), 'verify-chrome-'));
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
  try { await rm(profile, { recursive: true, force: true }); } catch { /* 不遮盖测试结果 */ }
}

let browser;
let bad = 0;
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

  for (const page of list) {
    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
    const problems = [];
    const requests = new Map();
    let stat = { clicked: 0, ranges: 0, tabbable: 0 };

    browser.onEvent = (message) => {
      if (message.sessionId !== sessionId) return;
      const params = message.params || {};
      if (message.method === 'Network.requestWillBeSent') requests.set(params.requestId, params.request?.url || '');
      if (message.method === 'Network.responseReceived') {
        const response = params.response || {};
        if (isLocal(response.url || '') && response.status >= 400) {
          problems.push(`站内资源 HTTP ${response.status}: ${shortUrl(response.url)}`);
        }
      }
      if (message.method === 'Network.loadingFailed') {
        const url = requests.get(params.requestId) || '';
        if (isLocal(url)) problems.push(`站内资源加载失败: ${shortUrl(url)} (${params.errorText || '未知错误'})`);
      }
      if (message.method === 'Runtime.exceptionThrown') {
        const detail = params.exceptionDetails || {};
        const text = detail.exception?.description || detail.text || '未知异常';
        if (!runtimeIgnorable(text)) problems.push(`未捕获异常: ${text.split('\n').slice(0, 3).join('\n    ')}`);
      }
      if (message.method === 'Runtime.consoleAPICalled' && params.type === 'error') {
        const text = (params.args || []).map((arg) => arg.value ?? arg.description ?? '').join(' ');
        if (!runtimeIgnorable(text)) problems.push(`console.error: ${text.slice(0, 240)}`);
      }
    };

    try {
      await Promise.all([
        browser.send('Runtime.enable', {}, sessionId),
        browser.send('Page.enable', {}, sessionId),
        browser.send('Network.enable', {}, sessionId)
      ]);

      for (const viewport of VIEWPORTS) {
        await browser.send('Emulation.setDeviceMetricsOverride', {
          width: viewport.width,
          height: viewport.height,
          deviceScaleFactor: viewport.mobile ? 2 : 1,
          mobile: viewport.mobile
        }, sessionId);
        await browser.send('Page.navigate', { url: pathToFileURL(join(ROOT, page)).href }, sessionId);
        await wait(700);

        const audit = await browser.send('Runtime.evaluate', {
          expression: `(() => {
            const root = document.documentElement;
            const width = root.clientWidth;
            const overflow = Math.max(0, root.scrollWidth - width);
            const visible = (el) => {
              const cs = getComputedStyle(el), r = el.getBoundingClientRect();
              return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0;
            };
            const ownsScroller = (el) => {
              for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
                const cs = getComputedStyle(p);
                if (/(auto|scroll)/.test(cs.overflowX) && p.scrollWidth > p.clientWidth + 1) return true;
              }
              return false;
            };
            const offenders = [];
            if (overflow > 1) {
              for (const el of document.body.querySelectorAll('*')) {
                if (!visible(el) || ownsScroller(el)) continue;
                const r = el.getBoundingClientRect();
                if (r.right > width + 1 || r.left < -1) {
                  offenders.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : el.classList.length ? '.' + [...el.classList].slice(0, 2).join('.') : ''));
                  if (offenders.length === 4) break;
                }
              }
            }
            return { overflow, offenders };
          })()`,
          returnByValue: true
        }, sessionId);
        const layout = audit.result?.value || { overflow: 0, offenders: [] };
        if (layout.overflow > 1) {
          problems.push(`${viewport.width}px 横向溢出 ${layout.overflow}px${layout.offenders.length ? `（${layout.offenders.join(', ')}）` : ''}`);
        }

        /* 画布位图和显示尺寸必须同比，否则整幅画面被拉伸：
           圆画成椭圆、直角画成钝角，物理和几何页面显示的就是错的。
           孩子模式单独再查一遍——切模式会改布局宽度，却不触发 window resize，
           只听 resize 的页面就会停在旧尺寸上。 */
        for (const mode of [null, 'kid']) {
          if (mode) {
            await browser.send('Runtime.evaluate', {
              expression: `document.documentElement.setAttribute('data-mode', ${JSON.stringify(mode)})`
            }, sessionId);
            await wait(450);
          }
          const fit = await browser.send('Runtime.evaluate', {
            expression: `(() => {
              const out = [];
              for (const c of document.querySelectorAll('canvas')) {
                const w = c.clientWidth, h = c.clientHeight;
                if (w < 4 || h < 4 || !c.width || !c.height) continue;
                const skew = Math.max((c.width / w) / (c.height / h), (c.height / h) / (c.width / w));
                if (skew > 1.02) out.push((c.id ? '#' + c.id : 'canvas') +
                  ' ' + w + 'x' + h + ' 位图 ' + c.width + 'x' + c.height + ' 拉伸 ' + skew.toFixed(2) + ' 倍');
              }
              return out.join('；');
            })()`,
            returnByValue: true
          }, sessionId);
          if (fit.result?.value) {
            problems.push(`${viewport.width}px${mode ? ' 孩子模式' : ''} 画布比例: ${fit.result.value}`);
          }
        }

        /* 只需一档做键盘/交互；每档导航仍会捕获该尺寸下的初始化异常和资源失败。 */
        if (viewport.width !== 1280) continue;

        const keyboard = await browser.send('Runtime.evaluate', {
          expression: `(() => {
            const visible = (el) => {
              const cs = getComputedStyle(el), r = el.getBoundingClientRect();
              return cs.display !== 'none' && cs.visibility !== 'hidden' && !el.hidden && r.width > 0 && r.height > 0;
            };
            const selector = 'a[href],button,input:not([type=hidden]),select,textarea,[tabindex],[role=button],[role=link],[role=tab],[role=checkbox],[role=radio],[role=switch],[role=slider]';
            const controls = [...document.querySelectorAll(selector)].filter((el) => visible(el) && !el.disabled && el.getAttribute('aria-disabled') !== 'true');
            const issues = [];

            /* roving tabindex：tablist / radiogroup / listbox 里只有当选项可 Tab 进入，
               其余为 -1，靠方向键切换。这是 ARIA 标准做法，不是「不可聚焦」。
               但要求整组恰好有一个可聚焦成员，否则整组真的进不去，仍然报错。 */
            const ROVING = { tab: 'tablist', radio: 'radiogroup', option: 'listbox' };
            const rovingOk = (el) => {
              const role = el.getAttribute('role');
              const owner = ROVING[role];
              if (!owner) return false;
              const group = el.closest('[role=' + owner + ']');
              if (!group) return false;
              const peers = [...group.querySelectorAll('[role=' + role + ']')].filter(visible);
              return peers.filter((p) => p.tabIndex >= 0).length === 1;
            };

            for (const el of controls) {
              const role = el.getAttribute('role');
              const native = /^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName);
              if (el.tabIndex < 0 && !(native && el.tagName === 'A' && !el.hasAttribute('href')) && !rovingOk(el)) issues.push('不可聚焦 ' + el.tagName.toLowerCase() + (el.id ? '#' + el.id : ''));
              if (!native && role && !el.hasAttribute('tabindex')) issues.push('自制 ' + role + ' 缺少 tabindex' + (el.id ? ' #' + el.id : ''));
              if (el.tabIndex > 0) issues.push('使用正数 tabindex' + (el.id ? ' #' + el.id : ''));
            }
            const sample = controls.filter((el) => el.tabIndex >= 0).slice(0, 5);
            for (const el of sample) {
              try { el.focus({ preventScroll: true }); } catch { el.focus(); }
              if (document.activeElement !== el) issues.push('focus() 失败 ' + el.tagName.toLowerCase() + (el.id ? '#' + el.id : ''));
            }
            if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
            return { tabbable: controls.filter((el) => el.tabIndex >= 0).length, issues: [...new Set(issues)].slice(0, 6) };
          })()`,
          returnByValue: true
        }, sessionId);
        const keyAudit = keyboard.result?.value || { tabbable: 0, issues: ['键盘审计无结果'] };
        stat.tabbable = keyAudit.tabbable;
        for (const issue of keyAudit.issues) problems.push(`键盘: ${issue}`);

        await browser.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }, sessionId);
        await browser.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }, sessionId);
        const tabResult = await browser.send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.activeElement;
            return { ok: !!el && el !== document.body && el !== document.documentElement,
              target: el ? el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') : 'none' };
          })()`, returnByValue: true
        }, sessionId);
        if (!tabResult.result?.value?.ok && keyAudit.tabbable > 0) problems.push(`键盘: Tab 未进入页面控件（${tabResult.result?.value?.target || 'none'}）`);

        const poke = await browser.send('Runtime.evaluate', {
          expression: `(() => {
            const out = { clicked: 0, ranges: 0 };
            for (const button of document.querySelectorAll('button:not([disabled]):not([data-verify-skip])')) {
              if (button.hidden || getComputedStyle(button).display === 'none') continue;
              try { button.click(); out.clicked++; } catch (error) { /* 运行时异常会由 CDP 捕获 */ }
            }
            for (const range of document.querySelectorAll('input[type=range]:not([disabled])')) {
              try {
                const low = Number.isFinite(+range.min) ? +range.min : 0;
                const high = Number.isFinite(+range.max) ? +range.max : 100;
                for (const value of [low, (low + high) / 2, high]) {
                  range.value = String(value);
                  range.dispatchEvent(new Event('input', { bubbles: true }));
                  range.dispatchEvent(new Event('change', { bubbles: true }));
                }
                out.ranges++;
              } catch (error) { /* 运行时异常会由 CDP 捕获 */ }
            }
            return out;
          })()`,
          returnByValue: true
        }, sessionId);
        stat = { ...stat, ...(poke.result?.value || {}) };
        await wait(800);
      }
    } catch (error) {
      problems.push(`验证流程失败: ${error.message}`);
    } finally {
      browser.onEvent = null;
      try { await browser.send('Target.closeTarget', { targetId }); } catch { /* 继续报告 */ }
    }

    const found = unique(problems);
    if (found.length) {
      bad++;
      console.log(`\n✗ ${page}（${stat.tabbable} 个键盘控件，点 ${stat.clicked}，拖 ${stat.ranges}）`);
      for (const problem of found.slice(0, 12)) console.log(`   ${problem}`);
      if (found.length > 12) console.log(`   …另有 ${found.length - 12} 项`);
    } else {
      console.log(`✓ ${page}（375/768/1280，无溢出；${stat.tabbable} 个键盘控件；点 ${stat.clicked}，拖 ${stat.ranges}）`);
    }
  }
} catch (error) {
  bad++;
  console.error(`验证器失败: ${error.message}`);
} finally {
  if (browser) browser.close();
  await cleanup();
}

console.log(`\n=== ${list.length} 页，${bad} 页有问题 ===`);
process.exit(bad ? 1 : 0);
