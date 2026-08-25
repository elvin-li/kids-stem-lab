#!/usr/bin/env node
/** Batch47: why multi-wish links + incline Q3 gate + pattern Q2/Q3 + cooled amp group */
import { access, mkdtemp, readdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { acquireChromeLease } from "./chrome-lease.mjs";
import { spawnChrome, stopChrome } from "./chrome-lifecycle.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const STRIP_PAGES = [
  "pages/why.html",
  "pages/design-system.html",
  "games/incline-lab.html",
  "games/amp-lab.html",
  "games/bill-lab.html",
  "games/blend-lab.html",
  "games/bounce-lab.html",
  "games/cam-lab.html",
  "games/bead-lab.html",
  "games/jet-lab.html",
  "games/pattern-machine.html",
  "games/blubber-lab.html",
  "games/doodle-pad.html",
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
  const missingOnDisk = [...listed].filter((x) => !disk.has(x)).sort();
  const missingInCatalog = [...disk].filter((x) => !listed.has(x)).sort();
  return { listed: listed.size, disk: disk.size, missingOnDisk, missingInCatalog };
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

function revealed(t) {
  return /押对了|揭晓：/.test(t || "");
}

async function main() {
  console.log("=== CATALOG vs DISK ===");
  console.log(JSON.stringify(await catalogVsDisk(), null, 2));
  console.log("=== EMPTY FACTS / NO-RANGE ===");
  console.log(JSON.stringify(await emptyFactsAndRange(), null, 2));

  const lease = await acquireChromeLease({ timeoutMs: 240000 });
  const profile = await mkdtemp(join(tmpdir(), "b47-patrol-"));
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

    console.log("=== WHY wishes @390 kid ===");
    console.log(
      JSON.stringify(
        await withPage(browser, 390, 844, async (sessionId) => {
          await openMode(browser, sessionId, "pages/why.html", "kid");
          return evalJson(
            browser,
            sessionId,
            `(() => {
              const wish = (name) => document.querySelector('[data-kid-wish="'+name+'"]');
              const go = document.getElementById('kidWishGo');
              const more = document.getElementById('kidWishMore');
              wish('冒泡').click();
              const one = { href: go && go.getAttribute('href'), label: go && go.textContent, moreHidden: more && more.hidden, moreN: more ? more.querySelectorAll('a').length : -1 };
              wish('变色').click();
              const two = {
                href: go && go.getAttribute('href'),
                label: go && go.textContent,
                moreHidden: more && more.hidden,
                moreHrefs: more ? [...more.querySelectorAll('a')].map(a => a.getAttribute('href')) : [],
                moreLabels: more ? [...more.querySelectorAll('a')].map(a => a.textContent) : []
              };
              wish('冰块').click();
              const three = {
                href: go && go.getAttribute('href'),
                label: go && go.textContent,
                moreN: more ? more.querySelectorAll('a').length : -1,
                moreLabels: more ? [...more.querySelectorAll('a')].map(a => a.textContent) : []
              };
              wish('冰块').click();
              const back = { href: go && go.getAttribute('href'), moreN: more ? more.querySelectorAll('a').length : -1 };
              return { one, two, three, back };
            })()`
          );
        }),
        null,
        2
      )
    );

    console.log("=== WHY / DS @320 ===");
    for (const [rel, mode] of [
      ["pages/why.html", "kid"],
      ["pages/why.html", "parent"],
      ["pages/design-system.html", "parent"],
    ]) {
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

    console.log("=== INCLINE Q3 gate ===");
    console.log(
      JSON.stringify(
        await withPage(browser, 390, 844, async (sessionId) => {
          await openMode(browser, sessionId, "games/incline-lab.html", "kid");
          return evalJson(
            browser,
            sessionId,
            `(() => {
              const revealed = (t) => /押对了|揭晓：/.test(t || '');
              document.getElementById('toSteep').click();
              document.getElementById('toGentle').click();
              document.querySelector('[data-guess1]').click();
              const afterQ1pick = document.getElementById('guessOut1').textContent;
              document.getElementById('toSteep').click();
              const afterQ1stage = document.getElementById('guessOut1').innerHTML;
              document.getElementById('guessBlock3').hidden = false;
              document.querySelector('[data-guess3]').click();
              const afterQ3pick = document.getElementById('guessOut3').textContent;
              const w = document.getElementById('weight');
              w.value = '8';
              w.dispatchEvent(new Event('input', { bubbles: true }));
              const afterWeight = document.getElementById('guessOut3').innerHTML;
              return {
                afterQ1pick, q1Parked: /押好了/.test(afterQ1pick) && !revealed(afterQ1pick),
                afterQ1stage, q1Revealed: revealed(afterQ1stage),
                afterQ3pick, q3Parked: /押好了/.test(afterQ3pick) && !revealed(afterQ3pick),
                afterWeight, q3RevealedAfterWeight: revealed(afterWeight)
              };
            })()`
          );
        }),
        null,
        2
      )
    );

    console.log("=== PATTERN Q2/Q3 path ===");
    console.log(
      JSON.stringify(
        await withPage(browser, 390, 844, async (sessionId) => {
          await openMode(browser, sessionId, "games/pattern-machine.html", "kid");
          return evalJson(
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
              document.querySelector('[data-guess1]').click();
              const q1pick = document.getElementById('guessOut1').textContent;
              const s1 = solveNext();
              const q1after = document.getElementById('guessOut1').innerHTML;
              document.getElementById('nextNew').click();
              document.querySelector('[data-guess2]').click();
              const q2pick = document.getElementById('guessOut2').textContent;
              const s2 = solveNext();
              const q2after = document.getElementById('guessOut2').innerHTML;
              document.getElementById('nextNew').click();
              document.querySelector('[data-guess3]').click();
              const q3pick = document.getElementById('guessOut3').textContent;
              const s3 = solveNext();
              const q3after = document.getElementById('guessOut3').innerHTML;
              return {
                q1pick, q1Parked: /已押/.test(q1pick) && !revealed(q1pick), s1, q1Revealed: revealed(q1after),
                q2pick, q2Parked: /已押/.test(q2pick) && !revealed(q2pick), s2, q2Revealed: revealed(q2after),
                q3pick, q3Parked: /已押/.test(q3pick) && !revealed(q3pick), s3, q3Revealed: revealed(q3after)
              };
            })()`
          );
        }),
        null,
        2
      )
    );

    console.log("=== COOLED guess pick ===");
    for (const rel of [
      "games/amp-lab.html",
      "games/bill-lab.html",
      "games/blend-lab.html",
      "games/bounce-lab.html",
      "games/cam-lab.html",
      "games/bead-lab.html",
      "games/jet-lab.html",
    ]) {
      const row = await withPage(browser, 390, 844, async (sessionId) => {
        await openMode(browser, sessionId, rel, "kid");
        return evalJson(
          browser,
          sessionId,
          `(() => {
            const pick = document.querySelector('[data-guess1]');
            const out = document.getElementById('guessOut1');
            if (pick) pick.click();
            const after = (out && out.textContent) || '';
            return {
              rel: ${JSON.stringify(rel)},
              after,
              revealedOnPick: /押对了|揭晓：/.test(after),
              parked: /押好了|已押/.test(after)
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
            const strips = [...document.querySelectorAll('.kid-action-strip')].filter(el => {
              const st = getComputedStyle(el);
              return st.display !== 'none' && st.visibility !== 'hidden';
            });
            const tops = strips.map(el => Math.round(el.getBoundingClientRect().top));
            const minTop = tops.length ? Math.min(...tops) : null;
            const companion = document.querySelector('[data-playful-companion]');
            const sticker = document.querySelector('[data-playful-sticker]');
            const vis = (el) => {
              if (!el) return 'absent';
              const st = getComputedStyle(el);
              if (st.display === 'none' || st.visibility === 'hidden') return 'hidden';
              const r = el.getBoundingClientRect();
              return r.height < 2 || r.width < 2 ? 'hidden' : 'visible';
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
