#!/usr/bin/env node
/** Complementary batch: 320 overflow + strip + med print probe via chrome-lease. */
import { access, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { acquireChromeLease } from "./chrome-lease.mjs";
import { spawnChrome, stopChrome } from "./chrome-lifecycle.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const OVER_PAGES = [
  "pages/medicine-cabinet.html",
  "pages/med-fever.html",
  "pages/med-dosing.html",
  "pages/med-safety.html",
  "pages/med-bone-injury.html",
  "pages/med-caregiver.html",
  "pages/kitchen-science.html",
  "pages/paths.html",
  "pages/parents.html",
  "index.html",
];

const STRIP_PAGES = [
  "nature/space.html",
  "nature/human-body.html",
  "nature/weather.html",
  "nature/ocean.html",
];

const PRINT_PAGES = [
  "pages/medicine-cabinet.html",
  "pages/med-fever.html",
  "pages/med-firstaid.html",
  "pages/med-dosing.html",
  "pages/kitchen-science.html",
  "pages/paths.html",
  "nature/space.html",
  "nature/weather.html",
];

async function findChrome() {
  for (const c of [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ].filter(Boolean)) {
    try {
      await access(c);
      return c;
    } catch {}
  }
  throw new Error("Chrome not found");
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.waiting = new Map();
  }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((ok, fail) => {
      ws.onopen = ok;
      ws.onerror = () => fail(new Error("ws fail"));
    });
    const c = new CDP(ws);
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && c.waiting.has(m.id)) {
        const p = c.waiting.get(m.id);
        c.waiting.delete(m.id);
        m.error ? p.fail(new Error(m.error.message)) : p.ok(m.result);
      }
    };
    return c;
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, fail) => {
      const t = setTimeout(() => {
        if (this.waiting.delete(id)) fail(new Error(method + " timeout"));
      }, 90000);
      this.waiting.set(id, {
        ok(v) {
          clearTimeout(t);
          ok(v);
        },
        fail(e) {
          clearTimeout(t);
          fail(e);
        },
      });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() {
    try {
      this.ws.close();
    } catch {}
  }
}

async function withPage(browser, width, height, fn) {
  const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await browser.send("Target.attachToTarget", { targetId, flatten: true });
  await browser.send(
    "Emulation.setDeviceMetricsOverride",
    { width, height, deviceScaleFactor: 2, mobile: width < 800 },
    sessionId
  );
  try {
    return await fn(sessionId);
  } finally {
    await browser.send("Target.closeTarget", { targetId }).catch(() => {});
  }
}

async function evalJson(browser, sessionId, expression) {
  const r = await browser.send(
    "Runtime.evaluate",
    { expression, returnByValue: true, awaitPromise: true },
    sessionId
  );
  if (r.exceptionDetails) {
    throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  }
  return r.result.value;
}

async function openMode(browser, sessionId, rel, mode) {
  const url = pathToFileURL(join(ROOT, rel)).href;
  await browser.send("Page.navigate", { url }, sessionId);
  await wait(800);
  await browser.send(
    "Runtime.evaluate",
    { expression: `document.documentElement.setAttribute('data-mode',${JSON.stringify(mode)});` },
    sessionId
  );
  await wait(200);
}

const OVER_EXPR = `(() => {
  const inner = window.innerWidth;
  const docW = document.documentElement.scrollWidth;
  const h1 = document.querySelector('h1');
  const hr = h1 ? h1.getBoundingClientRect() : null;
  const cs = h1 ? getComputedStyle(h1) : null;
  const grids = [...document.querySelectorAll('.xgrid,.pth-grid,.story-hero,.toc,.swatches,.med-grid,.bands,.duo,.cond')]
    .slice(0, 8)
    .map((el) => ({
      cls: el.className.toString().split(/\\s+/)[0],
      w: Math.round(el.getBoundingClientRect().width),
      cols: getComputedStyle(el).gridTemplateColumns
    }));
  return {
    inner, docW, overflow: docW > inner + 2,
    mode: document.documentElement.getAttribute('data-mode'),
    h1: h1 ? (h1.textContent || '').replace(/\\s+/g, ' ').trim() : '',
    h1w: hr ? Math.round(hr.width) : null,
    h1max: cs ? cs.maxWidth : null,
    h1lines: h1 ? Math.round((hr.height / (parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.12))) : null,
    grids
  };
})()`;

const STRIP_EXPR = `(() => {
  const strip = document.querySelector('.kid-play, .play-strip, [data-play-strip], .ctrl-strip, .stage-controls');
  const candidates = ['.kid-play', '.play-strip', '.ctrl', '.controls', '.stage-bar', '.toolbar'];
  let hit = null;
  for (const sel of candidates) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.height > 20 && r.width > 40) { hit = { sel, top: Math.round(r.bottom), h: Math.round(r.height) }; break; }
  }
  const companion = document.querySelector('.playful-companion');
  const sticker = document.querySelector('.playful-sticker');
  const vis = (el) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 2 && r.height > 2 && cs.display !== 'none' && cs.visibility !== 'hidden';
  };
  return {
    stripBottom: hit ? hit.top : null,
    stripSel: hit ? hit.sel : null,
    companion: vis(companion),
    sticker: vis(sticker),
    inner: window.innerWidth,
    docW: document.documentElement.scrollWidth
  };
})()`;

const PRINT_EXPR = `(() => {
  const visible = (el) => {
    if (!el || !el.isConnected) return false;
    if (typeof el.checkVisibility === 'function') {
      return el.checkVisibility({ checkVisibilityCSS: true, contentVisibilityAuto: true });
    }
    return el.getClientRects().length > 0;
  };
  const leaked = [];
  for (const [name, sel] of Object.entries({
    nav: '.nav', button: 'button', form: 'form', skip: '.skip-link'
  })) {
    const n = [...document.querySelectorAll(sel)].filter(visible).length;
    if (n) leaked.push(name + '×' + n);
  }
  const h1 = document.querySelector('h1');
  const flag = document.querySelector('.flag');
  const parse = (css) => {
    const m = String(css).match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map((v) => parseFloat(v));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const onWhite = (c) => {
    const a = c.a == null ? 1 : c.a;
    const mix = { r: c.r * a + 255 * (1 - a), g: c.g * a + 255 * (1 - a), b: c.b * a + 255 * (1 - a) };
    return 1.05 / (lum(mix) + 0.05);
  };
  let worst = null;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const raw = (node.nodeValue || '').replace(/\\s+/g, ' ').trim();
    if (!raw || !/[\\u4e00-\\u9fa5A-Za-z0-9]/.test(raw)) continue;
    const host = node.parentElement;
    if (!visible(host)) continue;
    const color = parse(getComputedStyle(host).color);
    if (!color) continue;
    const ratio = onWhite(color);
    if (ratio < 4.5 && (!worst || ratio < worst.ratio)) {
      worst = { ratio: Math.round(ratio * 100) / 100, sample: raw.slice(0, 24), color: getComputedStyle(host).color };
    }
  }
  return {
    leaked,
    h1: h1 ? visible(h1) : false,
    h1text: h1 ? (h1.textContent || '').replace(/\\s+/g, ' ').trim() : '',
    flag: flag ? visible(flag) : null,
    worst
  };
})()`;

const lease = await acquireChromeLease({ timeoutMs: 240000 });
const profile = await mkdtemp(join(tmpdir(), "bcomp-patrol-"));
const chromePath = await findChrome();
const port = 9880 + (process.pid % 70);
const chrome = await spawnChrome(
  chromePath,
  [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--headless=new",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--hide-scrollbars",
    "--mute-audio",
    "--disable-extensions",
    "--allow-file-access-from-files",
    "--window-size=1280,900",
    "about:blank",
  ],
  { cleanupPath: profile }
);

let browser;
try {
  let wsUrl;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await wait(250);
    try {
      wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl;
    } catch {}
  }
  if (!wsUrl) throw new Error("Chrome 调试端口未就绪");
  browser = await CDP.attach(wsUrl);
  await browser.send("Browser.setDownloadBehavior", { behavior: "deny" });

  console.log("=== 320 OVERFLOW ===");
  for (const rel of OVER_PAGES) {
    for (const mode of ["parent", "kid"]) {
      const row = await withPage(browser, 320, 720, async (sessionId) => {
        await openMode(browser, sessionId, rel, mode);
        return evalJson(browser, sessionId, OVER_EXPR);
      });
      console.log(JSON.stringify({ rel, ...row }));
    }
  }

  console.log("=== STRIP @375 kid ===");
  for (const rel of STRIP_PAGES) {
    const row = await withPage(browser, 375, 812, async (sessionId) => {
      await openMode(browser, sessionId, rel, "kid");
      return evalJson(browser, sessionId, STRIP_EXPR);
    });
    console.log(JSON.stringify({ rel, ...row }));
  }

  console.log("=== KITCHEN HASH ===");
  const hashRow = await withPage(browser, 390, 844, async (sessionId) => {
    const url = pathToFileURL(join(ROOT, "pages/kitchen-science.html")).href + "#kitchen-experiment-10";
    await browser.send("Page.navigate", { url }, sessionId);
    await wait(1600);
    await browser.send(
      "Runtime.evaluate",
      { expression: `document.documentElement.setAttribute('data-mode','parent');` },
      sessionId
    );
    await wait(700);
    return evalJson(
      browser,
      sessionId,
      `(() => {
        const el = document.getElementById('kitchen-experiment-10');
        if (!el) return { found: false };
        const r = el.getBoundingClientRect();
        return {
          found: true,
          focus: el.getAttribute('data-hash-focus'),
          top: Math.round(r.top),
          h1: (el.querySelector('h3') || {}).textContent || ''
        };
      })()`
    );
  });
  console.log(JSON.stringify(hashRow));

  console.log("=== PRINT PROBE ===");
  for (const rel of PRINT_PAGES) {
    const row = await withPage(browser, 800, 1100, async (sessionId) => {
      await browser.send("Emulation.setEmulatedMedia", { media: "print" }, sessionId);
      await openMode(browser, sessionId, rel, "parent");
      return evalJson(browser, sessionId, PRINT_EXPR);
    });
    console.log(JSON.stringify({ rel, ...row }));
  }
} finally {
  if (browser) browser.close();
  await stopChrome(chrome);
  await lease.release();
}
