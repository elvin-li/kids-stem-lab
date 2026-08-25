#!/usr/bin/env node
/** Batch47: pattern Q2/Q3 reveal path with microtask/turn waits */
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

async function evalJson(browser, sessionId, expression) {
  const { result } = await browser.send(
    "Runtime.evaluate",
    { expression, returnByValue: true, awaitPromise: true },
    sessionId
  );
  return result.value;
}

async function main() {
  const lease = await acquireChromeLease({ timeoutMs: 180000 });
  const profile = await mkdtemp(join(tmpdir(), "b47-pattern-"));
  const chromePath = await findChrome();
  const port = 9910 + (process.pid % 50);
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
      "--window-size=390,844",
      "about:blank",
    ],
    { cleanupPath: profile }
  );
  let browser;
  try {
    await wait(500);
    const version = await fetch(`http://127.0.0.1:${port}/json/version`).then((r) => r.json());
    browser = await CDP.attach(version.webSocketDebuggerUrl);
    await browser.send("Browser.setDownloadBehavior", { behavior: "deny" });
    const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await browser.send("Target.attachToTarget", { targetId, flatten: true });
    await browser.send(
      "Emulation.setDeviceMetricsOverride",
      { width: 390, height: 844, deviceScaleFactor: 2, mobile: true },
      sessionId
    );
    await browser.send("Page.navigate", { url: pathToFileURL(join(ROOT, "games/pattern-machine.html")).href }, sessionId);
    await wait(1000);
    await browser.send(
      "Runtime.evaluate",
      { expression: "document.documentElement.setAttribute('data-mode','kid');" },
      sessionId
    );
    await wait(300);

    const row = await evalJson(
      browser,
      sessionId,
      `(() => {
        const revealed = (t) => /押对了|揭晓：/.test(t || '');
        function solveNext() {
          const before = parseInt(document.getElementById('nextScore').textContent, 10) || 0;
          const picks = [...document.querySelectorAll('#nextPicks .pick-tile')];
          for (const b of picks) {
            b.click();
            const after = parseInt(document.getElementById('nextScore').textContent, 10) || 0;
            if (after > before) return true;
          }
          return false;
        }
        function tick() { return new Promise((r) => setTimeout(r, 40)); }
        return (async () => {
          document.querySelector('[data-guess1]').click();
          const q1pick = document.getElementById('guessOut1').textContent;
          const s1 = solveNext();
          await tick();
          const q1after = document.getElementById('guessOut1').innerHTML;
          document.getElementById('nextNew').click();
          await tick();
          document.querySelector('[data-guess2]').click();
          const q2pick = document.getElementById('guessOut2').textContent;
          const s2 = solveNext();
          await tick();
          const q2after = document.getElementById('guessOut2').innerHTML;
          document.getElementById('nextNew').click();
          await tick();
          document.querySelector('[data-guess3]').click();
          const q3pick = document.getElementById('guessOut3').textContent;
          const s3 = solveNext();
          await tick();
          const q3after = document.getElementById('guessOut3').innerHTML;
          return {
            q1pick, q1Parked: /已押/.test(q1pick) && !revealed(q1pick), s1, q1Revealed: revealed(q1after), q1after,
            q2pick, q2Parked: /已押/.test(q2pick) && !revealed(q2pick), s2, q2Revealed: revealed(q2after), q2after,
            q3pick, q3Parked: /已押/.test(q3pick) && !revealed(q3pick), s3, q3Revealed: revealed(q3after), q3after
          };
        })();
      })()`
    );
    console.log(JSON.stringify(row, null, 2));
    await browser.send("Target.closeTarget", { targetId });
  } finally {
    if (browser) browser.close();
    await stopChrome(chrome);
    await lease.release();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
