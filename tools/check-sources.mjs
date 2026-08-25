/* 医药箱来源链接的可达性检查：无依赖，需要联网。
 *
 * 用法：
 *   node tools/check-sources.mjs            # 全部来源链接
 *   node tools/check-sources.mjs --list     # 只列出链接，不发请求
 *
 * 为什么单独一条：这一册的立论基础是「每条医学结论都能追回官方出处」。
 * `check-medicine-cabinet.mjs` 已经守住了「域名在白名单里」和「必须 https」，
 * 但它是纯静态的——**一条拼错路径、或者对方改版之后失效的链接，它一样放过**。
 * 而一个 404 的来源比没有来源更糟：读者点过去发现打不开，会开始怀疑整页的可信度，
 * 却无法判断到底是哪一条结论没有依据。
 *
 * 这条**不进 run-gates**，因为它要联网：没网的机器上会整片红，那种门禁很快就会被忽略。
 * 改完来源、或者隔一段时间体检时手动跑。
 *
 * 判定分四档，分得清才有用：
 *   ✓ 可达        —— 最终状态码 2xx，且路径没有被重定向改写
 *   ⚠ 需人工确认  —— 2xx 但**重定向后路径变了**。一条拼错的路径被站点 301 到
 *                    栏目首页或站点根、再回 200，正是这条门禁要抓的那类缺陷，
 *                    不能因为最终状态码是 200 就当成「可达」（语义评审 2026-08-11
 *                    第 7 条）。只换域名写法（www、大小写）或补尾斜杠的不算。
 *                    落到站点根或搜索页的会单独标注「疑似失效」。
 *   ✗ 已失效      —— 404 / 410，**这是真缺陷，退出码非零**
 *   ? 无法验证    —— 403 / 429 / 5xx / 超时 / DNS 失败
 *
 * 「无法验证」必须单独列，不能算失败：healthychildren.org 与 merckmanuals.com 都有反爬，
 * 对无头请求经常直接回 403，而同一个地址在浏览器里完全正常。
 * 把 403 当成死链去「修」，只会把本来正确的官方链接改坏。
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const listOnly = process.argv.includes('--list');
/* 并发压到 6，且**同一主机永远串行**、相邻两次请求之间空出 HOST_DELAY_MS——
   别把对方站点当压测目标。第一版只写了这句注释、没写实现（语义评审 2026-08-11
   第 8 条），6 路 worker 会同时砸向同一个域；现在按主机分片，礼让才是真的。 */
const CONCURRENCY = 6;
const HOST_DELAY_MS = 600;
const TIMEOUT_MS = 20000;
/* 用真实浏览器的 UA。不是为了绕过什么，而是很多站点对空 UA 直接回 403，
   那会让整份报告变成一片「无法验证」，失去区分度。 */
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
  + '(KHTML, like Gecko) Chrome/122.0 Safari/537.36';

const pagesDir = join(ROOT, 'pages');
const files = (await readdir(pagesDir))
  .filter((n) => n === 'medicine-cabinet.html' || n.startsWith('med-'))
  .sort();

/* 只收 .srcs 列表里的链接：那是「本页来源」，也是契约要求可追回的部分。
   正文里的官方链接不在此列——它们是补充阅读，失效不影响结论的可追溯性。 */
const found = new Map();   /* url -> Set(页面) */
for (const name of files) {
  const html = await readFile(join(pagesDir, name), 'utf8');
  const blocks = [...html.matchAll(/<ul\b[^>]*\bclass=["'][^"']*\bsrcs\b[^"']*["'][^>]*>([\s\S]*?)<\/ul\s*>/gi)];
  for (const block of blocks) {
    for (const m of block[1].matchAll(/href=["'](https:\/\/[^"']+)["']/gi)) {
      if (!found.has(m[1])) found.set(m[1], new Set());
      found.get(m[1]).add(`pages/${name}`);
    }
  }
}

const urls = [...found.keys()].sort();
console.log(`医药箱来源可达性：${files.length} 个页面，.srcs 里共 ${urls.length} 条去重外链`);

if (listOnly) {
  for (const u of urls) console.log(`  ${u}\n      ← ${[...found.get(u)].join('、')}`);
  process.exit(0);
}

/* 重定向的定性：只换 scheme/域名写法或补尾斜杠的不改变「这是同一个页面」的结论；
   路径真的变了就要人看——尤其是落到站点根或搜索页的，多半是原路径已不存在。 */
function classifyRedirect(fromUrl, toUrl) {
  let from;
  let to;
  try {
    from = new URL(fromUrl);
    to = new URL(toUrl);
  } catch {
    return { pathChanged: true, suspicious: false };
  }
  const norm = (p) => decodeURIComponent(p.replace(/\/+$/, '') || '/').toLowerCase();
  const pathChanged = norm(from.pathname) !== norm(to.pathname);
  const suspicious = pathChanged
    && (norm(to.pathname) === '/' || /(?:^|\/)(?:search|home|index)(?:[/.]|$)/.test(norm(to.pathname)));
  return { pathChanged, suspicious };
}

async function probe(url) {
  const control = new AbortController();
  const timer = setTimeout(() => control.abort(), TIMEOUT_MS);
  try {
    /* 先 GET 而不是 HEAD：不少站点对 HEAD 返回 405 或 403，结论没有意义。
       redirect: 'follow' 是默认，这里显式写出来是因为「是否被重定向」要报出来。 */
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: control.signal,
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*' }
    });
    const redirected = res.url && res.url !== url;
    if (res.ok) {
      if (redirected) {
        const { pathChanged, suspicious } = classifyRedirect(url, res.url);
        if (pathChanged) return { kind: 'review', status: res.status, finalUrl: res.url, suspicious };
        return { kind: 'ok', status: res.status, finalUrl: res.url };
      }
      return { kind: 'ok', status: res.status, finalUrl: null };
    }
    if (res.status === 404 || res.status === 410) return { kind: 'dead', status: res.status };
    return { kind: 'unknown', status: res.status };
  } catch (err) {
    return { kind: 'unknown', status: err.name === 'AbortError' ? '超时' : (err.cause?.code || err.name) };
  } finally {
    clearTimeout(timer);
  }
}

/* 按主机分片：worker 每次领走一整个主机的队列串行跑，同主机相邻请求之间退让。
   不同主机之间仍然并行（最多 CONCURRENCY 路）。 */
const byHost = new Map();
for (const url of urls) {
  const host = new URL(url).host;
  if (!byHost.has(host)) byHost.set(host, []);
  byHost.get(host).push(url);
}
const hostQueues = [...byHost.values()];
const results = new Map();
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
async function worker() {
  while (hostQueues.length) {
    const queue = hostQueues.shift();
    for (let i = 0; i < queue.length; i += 1) {
      if (i) await sleep(HOST_DELAY_MS);
      results.set(queue[i], await probe(queue[i]));
    }
  }
}
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, hostQueues.length) }, worker));

const dead = [];
const unknown = [];
const review = [];
const redirects = [];
for (const url of urls) {
  const r = results.get(url);
  if (r.kind === 'dead') dead.push({ url, r });
  else if (r.kind === 'unknown') unknown.push({ url, r });
  else if (r.kind === 'review') review.push({ url, r });
  else if (r.finalUrl) redirects.push({ url, r });
}

console.log(`  ✓ 可达 ${urls.length - dead.length - unknown.length - review.length} 条`
  + `｜⚠ 需人工确认 ${review.length} 条｜✗ 已失效 ${dead.length} 条｜? 无法验证 ${unknown.length} 条`);

if (review.length) {
  console.log(`\n⚠ ${review.length} 条重定向后路径变了，需要人工在浏览器里确认落点还是不是原来那篇：`);
  for (const { url, r } of review) {
    console.log(`    ${url}\n      → ${r.finalUrl}${r.suspicious ? '　（落到站点根/搜索页，疑似原路径已失效）' : ''}`);
    console.log(`      被引用于：${[...found.get(url)].join('、')}`);
  }
}

if (redirects.length) {
  console.log(`\n· ${redirects.length} 条被重定向但路径未变（域名写法/尾斜杠，不算错，值得改成最终地址）：`);
  for (const { url, r } of redirects.slice(0, 12)) {
    console.log(`    ${url}\n      → ${r.finalUrl}`);
  }
  if (redirects.length > 12) console.log(`    …… 另有 ${redirects.length - 12} 条`);
}

if (unknown.length) {
  console.log(`\n? ${unknown.length} 条无法验证（多为反爬拦截，浏览器里通常正常；不判为失败）：`);
  const byStatus = new Map();
  for (const { url, r } of unknown) {
    if (!byStatus.has(r.status)) byStatus.set(r.status, []);
    byStatus.get(r.status).push(url);
  }
  for (const [status, list] of byStatus) {
    console.log(`    [${status}] ${list.length} 条`);
    for (const u of list.slice(0, 4)) console.log(`      ${u}`);
    if (list.length > 4) console.log(`      …… 另有 ${list.length - 4} 条`);
  }
}

if (dead.length) {
  console.log(`\n✗ ${dead.length} 条已失效，必须换成真实存在的官方页面：`);
  for (const { url, r } of dead) {
    console.log(`    [${r.status}] ${url}`);
    console.log(`      被引用于：${[...found.get(url)].join('、')}`);
  }
} else {
  console.log('\n✓ 没有 404／410 的死链');
}
process.exit(dead.length ? 1 : 0);
