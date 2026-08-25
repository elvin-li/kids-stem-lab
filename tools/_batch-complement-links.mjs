#!/usr/bin/env node
/** Complementary batch: relative href / src / catalog orphans. Read-only. */
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const HTML_DIRS = [".", "games", "nature", "pages"];

async function htmlFiles() {
  const out = [];
  for (const dir of HTML_DIRS) {
    const full = dir === "." ? ROOT : join(ROOT, dir);
    for (const name of (await readdir(full)).sort()) {
      if (name.endsWith(".html")) out.push(dir === "." ? name : `${dir}/${name}`);
    }
  }
  return out;
}

function strip(html) {
  return html.replace(/<script\b[\s\S]*?<\/script\s*>/gi, " ").replace(/<style\b[\s\S]*?<\/style\s*>/gi, " ");
}

function resolveRel(fromRel, href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean) return null;
  if (/^(https?:|mailto:|tel:|javascript:|data:)/i.test(clean)) return { kind: "ext", href };
  if (clean.startsWith("/")) return { kind: "root", href: clean };
  const base = dirname(fromRel);
  const resolved = normalize(base === "." ? clean : join(base, clean)).split("\\").join("/");
  return { kind: "rel", href: resolved };
}

const pages = await htmlFiles();
const disk = new Set(pages);
const broken = [];
const rootPaths = [];
const inbound = new Map(pages.map((p) => [p, 0]));

for (const rel of pages) {
  const html = strip(await readFile(join(ROOT, rel), "utf8"));
  for (const m of html.matchAll(/\b(?:href|src)\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)) {
    const raw = m[1] ?? m[2];
    const got = resolveRel(rel, raw);
    if (!got) continue;
    if (got.kind === "root") rootPaths.push({ rel, href: got.href });
    if (got.kind !== "rel") continue;
    if (!/\.(html|css|js|webmanifest|svg|png|jpg|jpeg|webp|json)$/i.test(got.href)) continue;
    try {
      await stat(join(ROOT, got.href));
      if (got.href.endsWith(".html") && inbound.has(got.href)) inbound.set(got.href, inbound.get(got.href) + 1);
    } catch {
      broken.push({ rel, raw, resolved: got.href });
    }
  }
}

const expl = await readFile(join(ROOT, "data/explorations.js"), "utf8");
const listed = new Set();
for (const m of expl.matchAll(/\bid:\s*"(games|nature)\/([^"]+\.html)"/g)) listed.add(`${m[1]}/${m[2]}`);
const detail = pages.filter((p) => /^(games|nature)\//.test(p) && !p.endsWith("/index.html"));
const missingOnDisk = [...listed].filter((x) => !detail.includes(x)).sort();
const missingInCatalog = detail.filter((x) => !listed.has(x)).sort();

const med = pages.filter((p) => p === "pages/medicine-cabinet.html" || /^pages\/med-/.test(p));
const medOrphans = med.filter((p) => p !== "pages/medicine-cabinet.html" && inbound.get(p) === 0);

const pageOrphans = pages.filter((p) => {
  if (p.endsWith("/index.html") || p === "index.html") return false;
  if (p.startsWith("pages/_")) return false;
  return inbound.get(p) === 0;
});

console.log(JSON.stringify({
  pages: pages.length,
  broken,
  rootPaths,
  catalog: { listed: listed.size, disk: detail.length, missingOnDisk, missingInCatalog },
  medOrphans,
  pageOrphans
}, null, 2));
if (broken.length || missingOnDisk.length) process.exit(1);
