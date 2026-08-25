#!/usr/bin/env node
/**
 * 门禁跑批器：按依赖分组并行
 *
 *   node tools/run-gates.mjs                    # 全部：静态并行 → 变异独占 → Chrome 受控
 *   node tools/run-gates.mjs --only static      # 只跑不需要 Chrome 的（最快，改完代码先跑这个）
 *   node tools/run-gates.mjs --only chrome
 *   node tools/run-gates.mjs --jobs 8           # 静态组并发度（默认 = CPU 核数 − 1）
 *   node tools/run-gates.mjs --chrome-jobs 1    # 兼容参数；共享 lease 会强制全局串行
 *   node tools/run-gates.mjs --retries 2        # 资源类失败重试轮数（默认 1；0 = 看原始抖动率）
 *   node tools/run-gates.mjs --list             # 只列出分组，不跑
 *
 * 为什么不是简单地全部并发——三组的约束完全不同：
 *
 *   静态组：纯 Node、只读文件，互不干扰。放开并行，几十秒跑完。
 *
 *   变异组：test-check-*.mjs 会**临时改写源文件**再还原。它们之间以及和任何
 *     其他门禁都不能重叠——两个变异测试同时跑，各自的「基线」就是对方注入的
 *     缺陷，结论全废；静态门禁如果这时候在读文件，会读到注入的缺陷并报假红。
 *     所以这一组严格独占、一个一个来。
 *
 *   Chrome 组：每个工具都要起一个 headless Chrome，check-offline 还额外带一个
 *     HTTP 服务器。并发开多个会把资源打满，报出 `Target.createTarget 超时`、
 *     `Failed to open a new tab`、`Session with given id not found`——这些看起来
 *     像页面缺陷，其实是环境问题。
 *
 *     Chrome 组始终串行。每个 standalone launcher 也必须先取得同一个工作区
 *     Chrome lease，所以从 run-gates 启动或由多个 IDE 会话分别启动都不会叠加
 *     浏览器。`--chrome-jobs` 只为旧命令兼容而保留，大于 1 的值会被明确忽略；
 *     `--retries` 仍只重试能够归因到资源抖动的失败。
 *
 * 退出码：任一门禁失败即 1。
 */
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:net';
import { availableParallelism } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const argv = process.argv.slice(2);
function takeFlag(name, fallback) {
  const at = argv.indexOf(name);
  if (at < 0) return fallback;
  const value = argv[at + 1];
  argv.splice(at, 2);
  return value;
}
const only = takeFlag('--only', '');
const jobs = Math.max(1, Number(takeFlag('--jobs', String(Math.max(1, availableParallelism() - 1)))) || 1);
/* 所有 direct launcher 都共享同一个跨进程 Chrome lease，因此并发 worker 只会
   提前堆出一批等待锁的 Node 进程，不会提高吞吐。保留参数仅兼容旧命令。 */
const requestedChromeJobs = Math.max(1, Number(takeFlag('--chrome-jobs', '1')) || 1);
const chromeJobs = 1;
if (requestedChromeJobs !== 1) {
  console.error(`--chrome-jobs ${requestedChromeJobs} 已忽略：共享 Chrome lease 强制全局串行`);
}
/* 起 Chrome 的那两组，失败后自动重试几次（只针对资源类失败，见 RETRYABLE）。
   0 = 关掉重试，想看原始抖动率时用。 */
const retries = Math.max(0, Number(takeFlag('--retries', '1')) || 0);
const listOnly = argv.includes('--list');

/* 跨 IDE 会话互斥。用本机 TCP 监听作为 OS lease：bind 是原子的，进程无论正常
   退出、收到信号还是崩溃，内核都会释放端口，不存在目录锁的半写入、ABA、PID
   复用或 stale lock 回收竞态。端口按工作区绝对路径稳定派生。 */
const lockDigest = createHash('sha256').update(`early-learning-gates\0${ROOT}`).digest();
const lockPort = 20000 + (lockDigest.readUInt16BE(0) % 20000);
let gateServer;

async function acquireGateLock() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    const onError = (error) => {
      server.removeListener('listening', onListening);
      if (error.code === 'EADDRINUSE') {
        reject(new Error(`已有门禁持有工作区 lease（127.0.0.1:${lockPort}）；本轮不启动`));
      } else reject(error);
    };
    const onListening = () => {
      server.removeListener('error', onError);
      resolve();
    };
    server.once('error', onError);
    server.once('listening', onListening);
    server.listen({ host: '127.0.0.1', port: lockPort, exclusive: true });
  });
  server.unref();
  gateServer = server;
}

async function releaseGateLock() {
  const server = gateServer;
  gateServer = null;
  if (!server?.listening) return;
  await new Promise((resolve) => server.close(resolve));
}

/* 静态组：纯 Node，只读，可放开并行。 */
const STATIC = [
  ['check-contract.mjs'],
  ['test-progress.mjs'],
  ['check-inline-scripts.mjs'],
  ['check-classes.mjs'],
  ['check-aria.mjs'],
  ['check-contrast.mjs'],
  ['check-headings.mjs'],
  ['check-raf.mjs'],
  ['check-render.mjs'],
  ['check-theme.mjs'],
  ['check-content.mjs'],
  ['check-medicine-cabinet.mjs'],
  ['check-nbsp-units.mjs'],
  ['check-no-downloads.mjs'],
  ['test-chrome-lifecycle.mjs'],
  ['test-resources-catalog.mjs'],
  ['test-atlas-coverage.mjs'],
  ['test-wiring-catalog.mjs']
];

/* 变异组：会临时改写源文件，必须独占串行。后三个还要 Chrome。 */
const MUTATING = [
  ['test-check-classes.mjs'],
  ['test-check-content.mjs'],
  ['test-check-medicine-cabinet.mjs'],
  ['test-check-kid-mode.mjs'],
  ['test-check-completion.mjs'],
  ['test-check-offline.mjs']
];

/* Chrome 组：每个都起浏览器，由 runner 与 standalone 共享 lease 双重保证串行。 */
const CHROME = [
  ['check-rendered-contrast.mjs', '--mode', 'kid'],
  ['check-rendered-contrast.mjs', '--mode', 'parent'],
  ['check-rendered-contrast.mjs', '--print'],
  ['check-controls.mjs'],
  ['check-controls.mjs', '--mode', 'parent', '--width', '768'],
  ['check-print.mjs'],
  ['check-kid-mode.mjs'],
  ['check-completion.mjs'],
  ['check-privacy.mjs'],
  ['check-offline.mjs'],
  ['test-playful-e2e.mjs'],
  ['test-trail-e2e.mjs'],
  ['verify.mjs']
];

const label = (cmd) => cmd.join(' ').replace(/\.mjs/, '');
const results = [];
const activeChildren = new Set();
let interruptedExitCode = 0;

/* 「机器忙」而不是「页面坏」的失败特征。
   这一类失败的共同点是：同一份代码，隔一会儿单独重跑就绿，而且报的是拿不到
   浏览器目标、拿不到调试端口、等不到 evaluate 回包——都在 CDP 这一层，跟页面
   内容无关。判定收窄到这几条精确特征，绝不做「失败就重试」：真实的内容缺陷
   必须第一次就报出来，重试只会把它藏起来、还白等一倍时间。 */
const RETRYABLE = [
  /(Target\.createTarget|Target\.attachToTarget|Runtime\.evaluate|Page\.navigate|Emulation\.[A-Za-z]+|Network\.[A-Za-z]+|Input\.[A-Za-z]+)\s*超时/,
  /审计中断：.*超时/,
  /结论不可信：.*超时/,
  /Chrome 调试端口未就绪/,
  /Chrome WebSocket 连接失败/,
  /WebSocket 连接失败/,
  /Failed to open a new tab/i,
  /Session with given id not found/i,
  /Target closed|Inspected target navigated or closed/i,
  /ECONNREFUSED|ECONNRESET|EPIPE/
];

function retryReason(out) {
  for (const re of RETRYABLE) {
    const hit = out.match(re);
    if (hit) return hit[0].trim().slice(0, 80);
  }
  return '';
}

function runOne(cmd, note = '') {
  return new Promise((resolve) => {
    const started = Date.now();
    let child;
    let out = '';
    let settled = false;

    const finish = (code, signal = '') => {
      if (settled) return;
      settled = true;
      if (child) activeChildren.delete(child);
      const seconds = ((Date.now() - started) / 1000).toFixed(1);
      const exitCode = Number.isInteger(code) ? code : 1;
      const record = { cmd, name: label(cmd), code: exitCode, signal, seconds, out, attempts: 1, flaky: '' };
      const summary = out.split('\n').filter((l) => /^(===|✓ |✗ |\d+\/\d+ 通过)/.test(l.trim())).slice(-1)[0] || '';
      console.log(`  ${exitCode === 0 ? '✓' : '✗'} ${(label(cmd) + note).padEnd(42)} ${seconds}s  ${summary.trim().slice(0, 72)}`);
      resolve(record);
    };

    /* 统一的 cancellation gate：收到信号后绝不再 spawn。没有这一条时，被终止
       child 的 close 会让 pool worker 立刻取队列下一项启动，随后又被停机流程
       SIGKILL 或随父进程退出而遗留（语义评审 2026-08-11 Chrome launcher 第 1 条）。 */
    if (interruptedExitCode) {
      out = '已取消：门禁跑批收到停止信号，不再启动新的门禁';
      finish(interruptedExitCode);
      return;
    }

    try {
      child = spawn(process.execPath, [join(ROOT, 'tools', cmd[0]), ...cmd.slice(1)], {
        cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe']
      });
    } catch (error) {
      out = `启动门禁失败：${error.message}`;
      finish(1);
      return;
    }

    activeChildren.add(child);
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { out += d; });
    child.once('error', (error) => {
      out += `${out ? '\n' : ''}启动门禁失败：${error.message}`;
      finish(1);
    });
    child.once('close', (code, signal) => finish(code, signal || ''));
  });
}

const aliveChildren = () => [...activeChildren].filter((child) => child.exitCode === null && child.signalCode === null);

async function waitForChildren(timeoutMs) {
  const children = aliveChildren();
  if (!children.length) return;
  await Promise.race([
    Promise.all(children.map((child) => new Promise((resolve) => child.once('close', resolve)))),
    wait(timeoutMs)
  ]);
}

/* 停机协议（语义评审 2026-08-11 Chrome launcher 第 1、2 条）：
 *
 * 第一次信号：置 cancellation 状态（spawn 前、取队列前、retry 前、group 边界
 * 都会检查它），SIGTERM 停机开始时登记的 child，然后**等到它们真实 close 为止**。
 * chrome-lifecycle 保证 launcher 在 close 时 Chrome 已真实 exit、profile 已删；
 * 原先固定 6 秒预算会 SIGKILL 仍在清理的 launcher——唯一持有 Chrome handle 与
 * cleanup path 的进程被杀，TCP lease 随本进程退出释放，下一轮会在 orphan
 * Chrome/profile 仍存在时进场。
 *
 * 第二次信号：人工明确表示不等了，SIGKILL 兜底并退出（此时可能留下孤儿
 * Chrome/profile，输出里会说明）。上限交给人，而不是交给一个猜出来的数字。 */
async function stopOnSignal(exitCode) {
  if (interruptedExitCode) {
    console.error('\n收到第二次停止信号：放弃等待，SIGKILL 兜底（可能留下孤儿 Chrome/profile，见 CONTRACT.md 门禁一节的清理命令）');
    for (const child of aliveChildren()) child.kill('SIGKILL');
    await waitForChildren(1000);
    await releaseGateLock();
    process.exit(exitCode);
  }
  interruptedExitCode = exitCode;
  const held = aliveChildren();
  for (const child of held) child.kill('SIGTERM');
  let waited = 0;
  while (aliveChildren().length) {
    await waitForChildren(10000);
    waited += 10;
    const still = aliveChildren().length;
    if (still) {
      console.error(`  仍在等待 ${still} 个门禁完成清理（已等 ${waited}s；Chrome 真实 exit + profile 删除后才会释放）。再发一次信号可放弃等待。`);
    }
  }
  await releaseGateLock();
  process.exit(exitCode);
}
process.on('SIGINT', () => { void stopOnSignal(130); });
process.on('SIGTERM', () => { void stopOnSignal(143); });

/* 不得全局 pkill remote-debugging-port：同一工作区可能有其他会话正在跑
   verify、截图或 Chrome 门禁。各工具使用独立端口/profile，并负责清理自己的子进程；
   某个工具遗留进程时也只能按它记录的精确 PID 处理。保留这个异步边界，避免改变
   分组执行时序。 */
function killStrayChrome() {
  return Promise.resolve();
}

async function runPool(list, concurrency) {
  const queue = [...list];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    /* 取队列前检查 cancellation：被终止 child 的 close 会 resolve runOne，
       没有这一条 worker 会立刻启动队列下一项。 */
    while (queue.length && !interruptedExitCode) {
      const cmd = queue.shift();
      results.push(await runOne(cmd));
    }
  });
  await Promise.all(workers);
}

const wait = (ms) => new Promise((done) => setTimeout(done, ms));

/* 资源类失败的重试放在整组跑完之后、而不是原地立刻重试：
   原地重试时并行的同伴还在占着 CPU 和内存，大概率再超时一次，白等一轮。
   等整组结束、机器空下来，再一个一个串行重跑，才有意义。
   重试成功的项会被标成「抖动」，在汇总里单独列出——不能让一次抖动后的通过
   看起来和一次干净通过一样。 */
async function retryFlaky(groupTitle) {
  if (!retries) return;
  for (let round = 1; round <= retries; round++) {
    if (interruptedExitCode) return;
    const shaky = results.filter((r) => r.code !== 0 && retryReason(r.out));
    if (!shaky.length) return;
    console.log(`\n  ${groupTitle} 第 ${round} 轮重试（${shaky.length} 项疑似资源问题，串行重跑）`);
    await wait(6000);
    for (const old of shaky) {
      if (interruptedExitCode) return;
      const reason = retryReason(old.out);
      const fresh = await runOne(old.cmd, ' ↻');
      const at = results.indexOf(old);
      fresh.attempts = old.attempts + 1;
      fresh.flaky = fresh.code === 0 ? reason : '';
      fresh.firstFailure = old.firstFailure || reason;
      results[at] = fresh;
      await wait(3000);
    }
  }
}

const groups = [
  { key: 'static', title: `静态门禁（并行 ${jobs}）`, list: STATIC, concurrency: jobs, chrome: false },
  { key: 'mutating', title: '变异测试（独占串行：会临时改写源文件）', list: MUTATING, concurrency: 1, chrome: true },
  {
    key: 'chrome',
    title: 'Chrome 审计（共享 lease，全局串行）',
    list: CHROME,
    concurrency: chromeJobs,
    chrome: true
  }
];
const selected = only ? groups.filter((g) => g.key === only) : groups;
if (!selected.length) {
  console.error(`--only 只能是 static / mutating / chrome，收到 ${JSON.stringify(only)}`);
  process.exit(2);
}

if (listOnly) {
  for (const g of selected) {
    console.log(`\n${g.title}`);
    for (const cmd of g.list) console.log('  node tools/' + cmd.join(' '));
  }
  process.exit(0);
}

try {
  await acquireGateLock();
} catch (error) {
  console.error(`门禁未启动：${error.message}`);
  process.exit(2);
}

const wallStart = Date.now();
for (const g of selected) {
  if (interruptedExitCode) break;
  console.log(`\n${g.title}`);
  if (g.chrome) await killStrayChrome();
  await runPool(g.list, g.concurrency);
  /* 只有起 Chrome 的组会有资源类抖动；静态组纯 Node 只读，失败一定是真缺陷。 */
  if (g.chrome) await retryFlaky(g.title);
}
const wall = ((Date.now() - wallStart) / 1000).toFixed(1);

const failed = results.filter((r) => r.code !== 0);
const flaky = results.filter((r) => r.code === 0 && r.flaky);
console.log(`\n${'='.repeat(72)}`);
console.log(`${results.length - failed.length}/${results.length} 通过，墙钟 ${wall}s`);

/* 抖动必须显式报出来：一次超时后重跑才绿，和一次就绿不是一回事。
   连续几次跑都在同几条上抖，说明这台机器上的并发度该降了，或者有别的会话
   在同时跑 Chrome——那是环境问题，但需要人知道，不能被静默吞掉。 */
if (flaky.length) {
  console.log(`\n${flaky.length} 项是重跑后才通过的（首次失败于资源问题，不是页面缺陷）：`);
  for (const r of flaky) console.log(`  ↻ ${r.name.padEnd(42)} 第 ${r.attempts} 次通过　首次：${r.flaky}`);
  console.log('      同几条反复抖动 → 确认没有别的会话占用 Chrome lease，并检查机器负载。');
}
if (failed.length) {
  console.log('\n失败的门禁（完整输出末 20 行）：');
  for (const r of failed) {
    const tried = r.attempts > 1 ? `，已重试 ${r.attempts - 1} 次仍失败` : '';
    console.log(`\n--- ${r.name}（exit ${r.code}${tried}） ---`);
    console.log(r.out.split('\n').slice(-20).map((l) => '  ' + l).join('\n'));
  }
  console.log('\n提示：Chrome 组整片失败、或报 Target.createTarget 超时 / Failed to open a new tab，');
  console.log('      基本是资源问题而不是页面缺陷。上面标注「已重试」的说明自动重跑过仍不过，');
  console.log('      这时更可能是真缺陷或机器一直忙；--retries 0 可以看原始抖动率。');
  console.log('      单页缺陷但节点数/字数和上次对不上，可能是读到了正在被改写的文件。');
}
await releaseGateLock();
process.exit(interruptedExitCode || (failed.length ? 1 : 0));
