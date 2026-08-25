#!/usr/bin/env node
/** Batch46: index/games 320 + pattern live + cooled guess gates + strip via chrome-lease */
import { access, mkdtemp, readdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { acquireChromeLease } from "./chrome-lease.mjs";
import { spawnChrome, stopChrome } from "./chrome-lifecycle.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const STRIP_PAGES = [
  "index.html",
  "games/index.html",
  "games/pattern-machine.html",
  "games/wave-maker.html",
  "pages/medicine-cabinet.html",
  "games/heat-lab.html",
  "games/pulley-lab.html",
  "games/gear-lab.html",
  "games/prism-lab.html",
  "games/oil-lab.html",
  "games/hang-lab.html",
  "games/estimation-station.html",
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

function overflowExpr(extra = "") {
  return `(() => {
    const inner = window.innerWidth;
    const docW = document.documentElement.scrollWidth;
    const origin = [...document.querySelectorAll('.origin')].map(el => {
      const r = el.getBoundingClientRect();
      return {
        text: (el.textContent || '').trim(),
        w: Math.round(r.width),
        sw: el.scrollWidth,
        overflow: el.scrollWidth > el.clientWidth + 1
      };
    }).filter(x => x.text).sort((a,b) => b.text.length - a.text.length).slice(0, 3);
    ${extra}
    return {
      inner, docW, overflow: docW > inner + 2,
      originTop: origin,
      mode: document.documentElement.getAttribute('data-mode')
    };
  })()`;
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

async function main() {
  console.log("=== CATALOG vs DISK ===");
  console.log(JSON.stringify(await catalogVsDisk(), null, 2));
  console.log("=== EMPTY FACTS / NO-RANGE ===");
  console.log(JSON.stringify(await emptyFactsAndRange(), null, 2));

  const lease = await acquireChromeLease({ timeoutMs: 240000 });
  const profile = await mkdtemp(join(tmpdir(), "b46-patrol-"));
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

    console.log("=== INDEX @320 parent ===");
    console.log(
      JSON.stringify(
        await withPage(browser, 320, 720, async (sessionId) => {
          await openMode(browser, sessionId, "index.html", "parent");
          return evalJson(browser, sessionId, overflowExpr(`
            const grid = document.querySelector('.rgrid');
            var gridW = grid ? Math.round(grid.getBoundingClientRect().width) : null;
          `).replace("return {", "return { gridW,"));
        }),
        null,
        2
      )
    );

    console.log("=== INDEX @320 kid ===");
    console.log(
      JSON.stringify(
        await withPage(browser, 320, 720, async (sessionId) => {
          await openMode(browser, sessionId, "index.html", "kid");
          return evalJson(
            browser,
            sessionId,
            `(() => {
              const inner = window.innerWidth;
              const docW = document.documentElement.scrollWidth;
              const band = document.querySelector('.kid-band');
              const today = document.querySelector('.today-pick');
              return {
                inner, docW, overflow: docW > inner + 2,
                bandW: band ? Math.round(band.getBoundingClientRect().width) : null,
                todayW: today ? Math.round(today.getBoundingClientRect().width) : null,
                mode: document.documentElement.getAttribute('data-mode')
              };
            })()`
          );
        }),
        null,
        2
      )
    );

    console.log("=== GAMES INDEX @320 parent+kid ===");
    for (const mode of ["parent", "kid"]) {
      const row = await withPage(browser, 320, 720, async (sessionId) => {
        await openMode(browser, sessionId, "games/index.html", mode);
        return evalJson(
          browser,
          sessionId,
          `(() => {
            const inner = window.innerWidth;
            const docW = document.documentElement.scrollWidth;
            const grid = document.querySelector('.lab-grid');
            const cols = grid ? getComputedStyle(grid).gridTemplateColumns : '';
            return {
              mode: ${JSON.stringify(mode)},
              inner, docW, overflow: docW > inner + 2,
              gridW: grid ? Math.round(grid.getBoundingClientRect().width) : null,
              cols
            };
          })()`
        );
      });
      console.log(JSON.stringify(row));
    }

    console.log("=== MED CABINET @320 parent ===");
    console.log(
      JSON.stringify(
        await withPage(browser, 320, 720, async (sessionId) => {
          await openMode(browser, sessionId, "pages/medicine-cabinet.html", "parent");
          return evalJson(
            browser,
            sessionId,
            `(() => {
              const inner = window.innerWidth;
              const docW = document.documentElement.scrollWidth;
              const cards = [...document.querySelectorAll('.med-card p')].slice(0, 3).map(el => ({
                w: Math.round(el.getBoundingClientRect().width),
                sample: (el.textContent || '').trim().slice(0, 24)
              }));
              const wraps = [...document.querySelectorAll('.tbl-wrap')].map(el => ({
                overflowX: getComputedStyle(el).overflowX,
                w: Math.round(el.getBoundingClientRect().width)
              }));
              return { inner, docW, overflow: docW > inner + 2, cards, wraps };
            })()`
          );
        }),
        null,
        2
      )
    );

    console.log("=== PATTERN live + guess ===");
    console.log(
      JSON.stringify(
        await withPage(browser, 390, 844, async (sessionId) => {
          await openMode(browser, sessionId, "games/pattern-machine.html", "kid");
          return evalJson(
            browser,
            sessionId,
            `(() => {
              const live = document.getElementById('live');
              const out1 = document.getElementById('guessOut1');
              const revealed = (t) => /押对了|揭晓：/.test(t || '');
              document.querySelector('[data-guess1]').click();
              const afterPick = (out1 && out1.textContent) || '';
              const newRule = document.getElementById('newRule');
              if (newRule) newRule.click();
              const afterNew = (live && live.textContent) || '';
              const mGrow = document.getElementById('mGrow');
              if (mGrow) mGrow.click();
              const growReset = document.getElementById('growReset');
              if (growReset) growReset.click();
              const afterReset = (live && live.textContent) || '';
              const ask = document.getElementById('askSel');
              if (ask) {
                ask.value = '8';
                ask.dispatchEvent(new Event('input', { bubbles: true }));
              }
              const afterAsk = (live && live.textContent) || '';
              return {
                afterPick, revealedOnPick: revealed(afterPick),
                afterNew, newAnnounced: /新机器/.test(afterNew),
                afterReset, resetAnnounced: /重置/.test(afterReset),
                afterAsk, askAnnounced: /预测第/.test(afterAsk),
                askOut: (document.getElementById('askOut') || {}).textContent
              };
            })()`
          );
        }),
        null,
        2
      )
    );

    console.log("=== WAVE predict pick ===");
    console.log(
      JSON.stringify(
        await withPage(browser, 390, 844, async (sessionId) => {
          await openMode(browser, sessionId, "games/wave-maker.html", "kid");
          return evalJson(
            browser,
            sessionId,
            `(() => {
              const pick = document.querySelector('[data-kid-choice]');
              const ans = document.querySelector('[data-kid-predict-answer]');
              const before = (ans && ans.textContent) || '';
              if (pick) pick.click();
              const afterPick = (ans && ans.textContent) || '';
              const go = document.querySelector('[data-kid-predict-verify]');
              if (go) go.click();
              const afterGo = (ans && ans.textContent) || '';
              return {
                before,
                afterPick,
                revealedOnPick: /押对|揭晓|正确答案|加大振幅/.test(afterPick) && afterPick !== before,
                afterGo,
                revealedAfterGo: /加大振幅|振幅/.test(afterGo)
              };
            })()`
          );
        }),
        null,
        2
      )
    );

    console.log("=== COOLED guess pick (heat/pulley/gear/prism) ===");
    for (const rel of [
      "games/heat-lab.html",
      "games/pulley-lab.html",
      "games/gear-lab.html",
      "games/prism-lab.html",
    ]) {
      const row = await withPage(browser, 390, 844, async (sessionId) => {
        await openMode(browser, sessionId, rel, "kid");
        return evalJson(
          browser,
          sessionId,
          `(() => {
            const pick = document.querySelector('[data-guess1]');
            const out = document.getElementById('guessOut1');
            const before = (out && out.textContent) || '';
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
