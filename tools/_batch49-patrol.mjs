#!/usr/bin/env node
/** Batch49: why/ds/parents 320 belts + tongue-group guess/strip via chrome-lease */
import { access, mkdtemp, readdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { acquireChromeLease } from "./chrome-lease.mjs";
import { spawnChrome, stopChrome } from "./chrome-lifecycle.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const OVERFLOW_PAGES = [
  ["pages/why.html", "kid"],
  ["pages/why.html", "parent"],
  ["pages/design-system.html", "parent"],
  ["pages/parents.html", "kid"],
  ["pages/parents.html", "parent"],
];
const GUESS_PAGES = [
  "games/trunk-lab.html",
  "games/quill-lab.html",
  "games/sink-lab.html",
  "games/snorkel-lab.html",
  "games/static-lab.html",
  "games/store-lab.html",
];
const STRIP_PAGES = [
  "pages/why.html",
  "pages/design-system.html",
  "pages/parents.html",
  "games/heat-lab.html",
  "games/spark-lab.html",
  "games/drift-lab.html",
  "games/trunk-lab.html",
  "games/quill-lab.html",
  "games/sink-lab.html",
  "games/snorkel-lab.html",
  "games/blubber-lab.html",
];

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
    await browser.send("Target.closeTarget", { targetId });
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

async function openMode(browser, sessionId, rel, mode) {
  const url = pathToFileURL(join(ROOT, rel)).href;
  await browser.send("Page.navigate", { url }, sessionId);
  await wait(900);
  await browser.send(
    "Runtime.evaluate",
    { expression: `document.documentElement.setAttribute('data-mode',${JSON.stringify(mode)});` },
    sessionId
  );
  await wait(250);
}

async function catalogVsDisk() {
  const expl = await readFile(join(ROOT, "data/explorations.js"), "utf8");
  const listed = new Set();
  for (const m of expl.matchAll(/\bid:\s*"(games|nature)\/([^"]+\.html)"/g)) {
    listed.add(`${m[1]}/${m[2]}`);
  }
  const disk = new Set();
  for (const dir of ["games", "nature"]) {
    for (const name of await readdir(join(ROOT, dir))) {
      if (name.endsWith(".html") && name !== "index.html") disk.add(`${dir}/${name}`);
    }
  }
  const sw = await readFile(join(ROOT, "sw.js"), "utf8");
  const core = new Set();
  for (const m of sw.matchAll(/\.\.\/(games|nature)\/([a-z0-9-]+\.html)/g)) {
    core.add(`${m[1]}/${m[2]}`);
  }
  for (const m of sw.matchAll(/"\.\/(games|nature)\/([a-z0-9-]+\.html)"/g)) {
    core.add(`${m[1]}/${m[2]}`);
  }
  return {
    listed: listed.size,
    disk: disk.size,
    core: core.size,
    missingOnDisk: [...listed].filter((x) => !disk.has(x)).sort(),
    missingInCatalog: [...disk].filter((x) => !listed.has(x)).sort(),
    diskNotCore: [...disk].filter((x) => !core.has(x)).sort(),
    coreNotDisk: [...core].filter((x) => !disk.has(x)).sort(),
  };
}

async function emptyFactsAndRange() {
  const empty = [];
  const noRange = [];
  for (const dir of ["games", "nature"]) {
    for (const name of await readdir(join(ROOT, dir))) {
      if (!name.endsWith(".html")) continue;
      const rel = `${dir}/${name}`;
      const html = await readFile(join(ROOT, rel), "utf8");
      const facts = [...html.matchAll(/class="kid-figure-fact"[^>]*>([^<]*)</g)];
      const n = facts.filter((m) => {
        const t = m[1].replace(/&nbsp;/g, " ").trim();
        return t === "." || t === "。" || t === "";
      }).length;
      if (n) empty.push({ rel, n });
      if (dir === "games" && name !== "index.html" && !/<input[^>]*type=["']range["']/i.test(html)) {
        noRange.push(rel);
      }
    }
  }
  return { empty, noRange };
}

async function main() {
  console.log("=== CATALOG vs DISK ===");
  console.log(JSON.stringify(await catalogVsDisk(), null, 2));
  console.log("=== EMPTY FACTS / NO-RANGE ===");
  console.log(JSON.stringify(await emptyFactsAndRange(), null, 2));

  const lease = await acquireChromeLease({ timeoutMs: 20 * 60 * 1000 });
  const profile = await mkdtemp(join(tmpdir(), "b49-patrol-"));
  const chromePath = await findChrome();
  const port = 9890 + (process.pid % 70);
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

    console.log("=== 320 overflow ===");
    for (const [rel, mode] of OVERFLOW_PAGES) {
      const row = await withPage(browser, 320, 720, async (sessionId) => {
        await openMode(browser, sessionId, rel, mode);
        return evalJson(
          browser,
          sessionId,
          `(() => {
            const inner = window.innerWidth;
            const docW = document.documentElement.scrollWidth;
            return { rel: ${JSON.stringify(rel)}, mode: ${JSON.stringify(mode)}, inner, docW, overflow: docW > inner + 2 };
          })()`
        );
      });
      console.log(JSON.stringify(row));
    }

    console.log("=== GUESS pick ===");
    for (const rel of GUESS_PAGES) {
      const row = await withPage(browser, 390, 844, async (sessionId) => {
        await openMode(browser, sessionId, rel, "kid");
        return evalJson(
          browser,
          sessionId,
          `(() => {
            const out = (id) => (document.getElementById(id) && document.getElementById(id).textContent) || "";
            const click = (sel) => { const el = document.querySelector(sel); if (el) el.click(); };
            click("[data-guess1]");
            const q1 = out("guessOut1");
            const b2 = document.getElementById("guessBlock2");
            if (b2) b2.hidden = false;
            click("[data-guess2]");
            const q2 = out("guessOut2");
            const b3 = document.getElementById("guessBlock3");
            if (b3) b3.hidden = false;
            click("[data-guess3]");
            const q3 = out("guessOut3");
            const revealed = (t) => /押对了|揭晓：/.test(t || "");
            return {
              rel: ${JSON.stringify(rel)},
              q1, q1Reveal: revealed(q1),
              q2, q2Reveal: revealed(q2),
              q3, q3Reveal: revealed(q3)
            };
          })()`
        );
      });
      console.log(JSON.stringify(row));
    }

    console.log("=== STRIP @375 kid ===");
    for (const rel of STRIP_PAGES) {
      const row = await withPage(browser, 375, 812, async (sessionId) => {
        await openMode(browser, sessionId, rel, "kid");
        return evalJson(
          browser,
          sessionId,
          `(() => {
            const strips = [...document.querySelectorAll(".kid-action-strip")].filter((el) => {
              const st = getComputedStyle(el);
              return st.display !== "none" && st.visibility !== "hidden";
            });
            const tops = strips.map((el) => Math.round(el.getBoundingClientRect().top));
            const minTop = tops.length ? Math.min(...tops) : null;
            const companion = document.querySelector("[data-playful-companion]");
            const sticker = document.querySelector("[data-playful-sticker]");
            const vis = (el) => {
              if (!el) return "absent";
              const st = getComputedStyle(el);
              if (st.display === "none" || st.visibility === "hidden") return "hidden";
              const r = el.getBoundingClientRect();
              return r.height < 2 || r.width < 2 ? "hidden" : "visible";
            };
            return { rel: ${JSON.stringify(rel)}, minTop, tops, companion: vis(companion), sticker: vis(sticker) };
          })()`
        );
      });
      console.log(JSON.stringify(row));
    }
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
