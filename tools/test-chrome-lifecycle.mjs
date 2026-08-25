/* chrome-lifecycle.mjs 的行为级回归用例：无依赖，不需要 Chrome。
 *
 * 用法：
 *   node tools/test-chrome-lifecycle.mjs
 *
 * 为什么需要它：check-no-downloads.mjs 是词法检查，只能证明「lease / deny /
 * stopChrome 这些文本存在且顺序对」，防不住行为回归——删掉 cleanupPath、把
 * stopChrome 从 finally 里挪走、破坏幂等或信号协议，词法检查照样绿（语义评审
 * 2026-08-11 Chrome launcher 第 5 条）。这里把生命周期合同逐条跑真子进程验证：
 *
 *   1. 自然退出后 stop 仍能清理 profile；
 *   2. spawn error（可执行文件不存在）不留下 cleanupPath；
 *   3. 并发 stop 复用同一次清理，不重复不报错；
 *   4. 清理完成后再次 stop 幂等返回（墓碑），未登记的 child 仍然拒绝；
 *   5. 无视 SIGTERM 的 child 会被升级 SIGKILL，且删目录只发生在真实 exit 之后；
 *   6. 信号落在「已建临时目录、Chrome 还没接管」的窗口时，预登记路径一并被删；
 *   7. records 为空时收到信号，不得抢走 launcher 自己注册的 signal handler
 *      的清理机会（check-privacy 的 requestStop 就是这条路径）。
 *
 * 每条用例都在独立子进程里 import 一份新的 chrome-lifecycle（signal handler 与
 * stopping 状态是模块级的，进程内没法复位），「Chrome」一律用 node 假扮，
 * 临时目录都建在系统临时目录下，不碰工作区。
 */
import { spawn } from 'node:child_process';
import { mkdtemp, stat, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const TOOLS = fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');
const LIFECYCLE = pathToFileURL(join(TOOLS, 'chrome-lifecycle.mjs')).href;

function runScript(body, { timeoutMs = 20000 } = {}) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ['--input-type=module', '-e', body], {
      stdio: ['ignore', 'pipe', 'pipe']
    });
    let out = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { out += d; });
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      resolve({ code: null, out: `${out}\n[测试父进程判定：子进程 ${timeoutMs}ms 未退出，SIGKILL]` });
    }, timeoutMs);
    child.once('close', (code) => { clearTimeout(timer); resolve({ code, out }); });
  });
}

const exists = async (path) => {
  try { await stat(path); return true; } catch { return false; }
};

/* 子进程脚本的公共头：import 生命周期模块。 */
const HEAD = `import { spawnChrome, stopChrome, registerOwnedPath } from ${JSON.stringify(LIFECYCLE)};\n`
  + `const NODE = ${JSON.stringify(process.execPath)};\n`;

let failures = 0;
const report = (ok, name, detail = '') => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : `\n      ${detail.trim().split('\n').slice(-6).join('\n      ')}`}`);
  if (!ok) failures += 1;
};

console.log('chrome-lifecycle 行为级回归：7 条，全部在子进程里跑真进程\n');

/* ---- 1. 自然退出后 stop 仍清理 profile ---- */
{
  const dir = await mkdtemp(join(tmpdir(), 'lifecycle-test-'));
  const { code, out } = await runScript(HEAD + `
const child = await spawnChrome(NODE, ['-e', 'setTimeout(() => {}, 30)'], { cleanupPath: ${JSON.stringify(dir)} });
await new Promise((done) => child.once('close', done));
await stopChrome(child);
`);
  const gone = !(await exists(dir));
  report(code === 0 && gone, '自然退出后 stopChrome 清理 cleanupPath', `exit=${code} 目录仍在=${!gone}\n${out}`);
  await rm(dir, { recursive: true, force: true });
}

/* ---- 2. spawn error 不留下 cleanupPath ---- */
{
  const dir = await mkdtemp(join(tmpdir(), 'lifecycle-test-'));
  const { code, out } = await runScript(HEAD + `
try {
  await spawnChrome('/nonexistent-chrome-binary-for-test', [], { cleanupPath: ${JSON.stringify(dir)} });
  console.error('spawnChrome 居然成功了');
  process.exit(1);
} catch {
  process.exit(0);
}
`);
  const gone = !(await exists(dir));
  report(code === 0 && gone, 'spawn error（ENOENT）时 cleanupPath 被删除', `exit=${code} 目录仍在=${!gone}\n${out}`);
  await rm(dir, { recursive: true, force: true });
}

/* ---- 3. 并发 stop 复用同一次清理 ---- */
{
  const dir = await mkdtemp(join(tmpdir(), 'lifecycle-test-'));
  const { code, out } = await runScript(HEAD + `
const child = await spawnChrome(NODE, ['-e', 'setInterval(() => {}, 1000)'], { cleanupPath: ${JSON.stringify(dir)} });
await Promise.all([stopChrome(child), stopChrome(child), stopChrome(child)]);
`);
  const gone = !(await exists(dir));
  report(code === 0 && gone, '并发 stopChrome 不报错、目录只删一次', `exit=${code} 目录仍在=${!gone}\n${out}`);
  await rm(dir, { recursive: true, force: true });
}

/* ---- 4. 清理完成后再次 stop 幂等；未登记的仍拒绝 ---- */
{
  const dir = await mkdtemp(join(tmpdir(), 'lifecycle-test-'));
  const { code, out } = await runScript(HEAD + `
import { spawn } from 'node:child_process';
const child = await spawnChrome(NODE, ['-e', 'setInterval(() => {}, 1000)'], { cleanupPath: ${JSON.stringify(dir)} });
await stopChrome(child);
/* 完成后的第二、三次调用必须幂等返回，不得抛「未登记进程」。 */
await stopChrome(child);
await stopChrome(child);
/* 从未登记的 child 照样必须拒绝——那可能是别的会话的进程。 */
const stranger = spawn(NODE, ['-e', 'setTimeout(() => {}, 50)']);
let rejected = false;
try { await stopChrome(stranger); } catch { rejected = true; }
await new Promise((done) => stranger.once('close', done));
if (!rejected) { console.error('未登记的 child 没有被拒绝'); process.exit(1); }
`);
  const gone = !(await exists(dir));
  report(code === 0 && gone, '完成后再次 stop 幂等（墓碑），未登记进程仍被拒绝', `exit=${code} 目录仍在=${!gone}\n${out}`);
  await rm(dir, { recursive: true, force: true });
}

/* ---- 5. 无视 SIGTERM 的 child 被升级 SIGKILL，真实 exit 后才删目录 ---- */
{
  const dir = await mkdtemp(join(tmpdir(), 'lifecycle-test-'));
  /* spawnChrome 在 OS 进程出现（'spawn' 事件）时就返回，那一刻子 Node 还没执行
     到 process.on("SIGTERM")——立刻 stop 会让 SIGTERM 按默认动作生效，测不到
     升级路径。所以让 child 装好 handler 后写一个 ready 文件，等到它再 stop。 */
  const ready = join(tmpdir(), `lifecycle-ready-${process.pid}-${Date.now()}`);
  const { code, out } = await runScript(HEAD + `
import { stat } from 'node:fs/promises';
const READY = ${JSON.stringify(ready)};
const childScript = 'process.on("SIGTERM", () => {}); require("node:fs").writeFileSync(' + JSON.stringify(READY) + ', "1"); setInterval(() => {}, 1000)';
const child = await spawnChrome(NODE, ['-e', childScript], { cleanupPath: ${JSON.stringify(dir)} });
for (let i = 0; i < 200; i += 1) {
  try { await stat(READY); break; } catch { await new Promise((r) => setTimeout(r, 25)); }
}
const started = Date.now();
await stopChrome(child);
if (child.signalCode !== 'SIGKILL') { console.error('顽固 child 未被 SIGKILL，signal=' + child.signalCode); process.exit(1); }
if (Date.now() - started < 2000) { console.error('没等 TERM 宽限期就升级了'); process.exit(1); }
`, { timeoutMs: 25000 });
  await rm(ready, { force: true });
  const gone = !(await exists(dir));
  report(code === 0 && gone, '无视 SIGTERM 的 child 在宽限期后被 SIGKILL 并清理', `exit=${code} 目录仍在=${!gone}\n${out}`);
  await rm(dir, { recursive: true, force: true });
}

/* ---- 6. 信号落在预登记窗口：owned path 一并被删 ---- */
{
  const dir = await mkdtemp(join(tmpdir(), 'lifecycle-test-'));
  const { code, out } = await runScript(HEAD + `
registerOwnedPath(${JSON.stringify(dir)});
/* 模拟 mkdtemp 之后、spawnChrome 之前的异步准备窗口：此刻信号到达。 */
process.kill(process.pid, 'SIGTERM');
setInterval(() => {}, 1000); /* 保活，等 handler 决定退出 */
`);
  const gone = !(await exists(dir));
  report(code === 143 && gone, '信号落在「已建目录、Chrome 未接管」窗口时预登记路径被删', `exit=${code}（应为 143） 目录仍在=${!gone}\n${out}`);
  await rm(dir, { recursive: true, force: true });
}

/* ---- 7. 零登记 + launcher 自己的 signal handler：不得被抢走清理机会 ---- */
{
  const marker = join(await mkdtemp(join(tmpdir(), 'lifecycle-test-')), 'cleanup-ran.txt');
  const { code, out } = await runScript(HEAD + `
import { writeFileSync } from 'node:fs';
/* 模拟 check-privacy 的「只请求停止、由自己的清理路径退出」handler。
   它注册在 lifecycle 之后；lifecycle 在零登记时直接 process.exit 的话，
   这个 handler 永远没机会跑。 */
process.on('SIGTERM', () => {
  writeFileSync(${JSON.stringify(marker)}, 'ran', 'utf8');
  process.exit(7);
});
process.kill(process.pid, 'SIGTERM');
setInterval(() => {}, 1000);
`);
  const ran = await exists(marker);
  report(code === 7 && ran, '零登记时不抢走 launcher 自己的 signal handler', `exit=${code}（应为 7） marker 存在=${ran}\n${out}`);
  await rm(join(marker, '..'), { recursive: true, force: true });
}

console.log(`\n=== 7 条行为用例，${failures} 条不通过 ===`);
if (!failures) console.log('  ✓ 生命周期合同（清理、幂等、信号协议）全部由真子进程验证通过');
process.exit(failures ? 1 : 0);
