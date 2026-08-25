#!/usr/bin/env node
import { access, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { acquireChromeLease } from "./chrome-lease.mjs";
import { spawnChrome, stopChrome } from "./chrome-lifecycle.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function findChrome() {
  for (const c of [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ]) {
    try { await access(c); return c; } catch {}
  }
  throw new Error("Chrome not found");
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
  static async attach(url) {
    const ws = new WebSocket(url);
    await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = () => fail(new Error("ws fail")); });
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
      const t = setTimeout(() => { if (this.waiting.delete(id)) fail(new Error(method + " timeout")); }, 60000);
      this.waiting.set(id, { ok(v) { clearTimeout(t); ok(v); }, fail(e) { clearTimeout(t); fail(e); } });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  close() { try { this.ws.close(); } catch {} }
}

async function main() {
  const lease = await acquireChromeLease({ timeoutMs: 120000 });
  const profile = await mkdtemp(join(tmpdir(), "b46-gidx-"));
  const port = 9910 + (process.pid % 50);
  const chrome = await spawnChrome(await findChrome(), [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--headless=new", "--no-first-run", "--no-default-browser-check",
    "--disable-gpu", "--hide-scrollbars", "--mute-audio", "--disable-extensions",
    "--allow-file-access-from-files", "about:blank",
  ], { cleanupPath: profile });
  let browser;
  try {
    await wait(500);
    const version = await fetch(`http://127.0.0.1:${port}/json/version`).then((r) => r.json());
    browser = await CDP.attach(version.webSocketDebuggerUrl);
    await browser.send("Browser.setDownloadBehavior", { behavior: "deny" });
    for (const mode of ["parent", "kid"]) {
      const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
      const { sessionId } = await browser.send("Target.attachToTarget", { targetId, flatten: true });
      await browser.send("Emulation.setDeviceMetricsOverride", { width: 320, height: 720, deviceScaleFactor: 2, mobile: true }, sessionId);
      await browser.send("Page.navigate", { url: pathToFileURL(join(ROOT, "games/index.html")).href }, sessionId);
      await wait(900);
      await browser.send("Runtime.evaluate", { expression: `document.documentElement.setAttribute('data-mode',${JSON.stringify(mode)});` }, sessionId);
      await wait(250);
      const { result } = await browser.send("Runtime.evaluate", {
        expression: `(() => {
          const inner = window.innerWidth;
          const docW = document.documentElement.scrollWidth;
          const grid = document.querySelector('.lab-grid');
          return {
            mode: document.documentElement.getAttribute('data-mode'),
            inner, docW, overflow: docW > inner + 2,
            gridW: grid ? Math.round(grid.getBoundingClientRect().width) : null,
            cols: grid ? getComputedStyle(grid).gridTemplateColumns : ''
          };
        })()`,
        returnByValue: true
      }, sessionId);
      console.log(JSON.stringify(result.value));
      await browser.send("Target.closeTarget", { targetId });
    }
  } finally {
    if (browser) browser.close();
    await stopChrome(chrome);
    await lease.release();
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
