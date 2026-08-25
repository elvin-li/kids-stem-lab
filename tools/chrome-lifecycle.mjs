/*
 * 直接 Chrome launcher 的进程/profile 生命周期。
 *
 * 共享 lease 只在 launcher Node 存活时成立；如果 Node 收到定向 SIGTERM 后直接
 * 退出，Chrome 不会自动收到同一信号，lease 却会被内核释放。这个模块为每个自己
 * 启动的 Chrome 保存精确 ChildProcess handle，并统一保证：
 *
 *   SIGTERM -> 等待 -> SIGKILL -> 确认真实 exit -> 删除自己的临时目录
 *
 * 只操作登记过的 child/path，绝不扫描或误杀其他会话。SIGKILL 后也不把超时当作
 * 成功：没有观察到 exit 就继续持有进程和 lease，避免放行下一轮 Chrome。
 *
 * 语义评审 2026-08-11（Chrome launcher 生命周期）修掉的三个缺口：
 *   - spawnChrome 之前就存在的临时资源（mkdtemp 出来的 profile、写了一半的
 *     fixture 树）以前不在本模块视野内，信号到达时会整棵留下。launcher 现在
 *     用 registerOwnedPath() 预登记，信号路径会把它们一并删掉；spawnChrome
 *     接管同一路径后自动移交所有权，不会删两次。
 *   - records 为空时全局 signal handler 直接 process.exit，会抢走**之后注册的**
 *     其他 signal handler（check-privacy 的「只请求停止、由 finally 清理」）的
 *     清理机会。现在只有当本模块是该信号唯一的监听者时才代为退出，否则设好
 *     exitCode 后把控制权交还。
 *   - stopChrome 清理成功后第二次调用会抛「未登记进程」。已清理的 owned child
 *     留有墓碑（WeakMap，不阻止 GC），重复 stop 返回第一次的结果；从未登记的
 *     child 照样拒绝。
 */
import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';

const TERM_GRACE_MS = 2500;
const REMOVE_RETRIES = 3;
const records = new Map();
/* 已清理完成的 owned child 的墓碑：stopChrome 幂等的依据。WeakMap 不延长
   ChildProcess 的生命期，也就不会随长跑进程累积。 */
const completedStops = new WeakMap();
/* spawnChrome 之前就创建的临时目录：launcher 预登记，信号路径统一删除。 */
const ownedPaths = new Set();
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let stopping = false;
let signalExitCode = 0;
let shutdownPromise = null;
let safetyHold = null;

function hasExited(record) {
  return record.exited
    || record.child.exitCode !== null
    || record.child.signalCode !== null;
}

async function removeOwnedPath(path) {
  if (!path) return;
  let lastError;
  for (let attempt = 1; attempt <= REMOVE_RETRIES; attempt += 1) {
    try {
      await rm(path, { recursive: true, force: true });
      return;
    } catch (error) {
      lastError = error;
      if (attempt < REMOVE_RETRIES) await wait(100 * attempt);
    }
  }
  throw new Error(`Chrome 已退出，但临时目录清理失败：${path}（${lastError?.message || '未知错误'}）`);
}

/* 在 spawnChrome 之前创建的临时资源（profile、fixture 树）用这个预登记：
   信号到达时它们也会被删除，不再依赖「spawnChrome 已经接管」这个时序假设。
   spawnChrome 拿到同一路径作 cleanupPath 时自动移交所有权。 */
export function registerOwnedPath(path) {
  if (path) ownedPaths.add(path);
}

export function releaseOwnedPath(path) {
  ownedPaths.delete(path);
}

function register(child, cleanupPath) {
  let resolveExit;
  let resolveSpawn;
  let rejectSpawn;
  const record = {
    child,
    cleanupPath,
    exited: false,
    stopPromise: null,
    exitPromise: new Promise((resolve) => { resolveExit = resolve; }),
    spawnPromise: new Promise((resolve, reject) => {
      resolveSpawn = resolve;
      rejectSpawn = reject;
    })
  };

  const markExited = () => {
    if (record.exited) return;
    record.exited = true;
    resolveExit();
  };
  child.once('spawn', resolveSpawn);
  child.once('exit', markExited);
  child.once('close', markExited);
  child.once('error', (error) => {
    rejectSpawn(error);
    /* spawn 自身失败时没有 OS 进程，也不会总有 exit 事件。 */
    if (!child.pid) markExited();
  });
  if (child.exitCode !== null || child.signalCode !== null) markExited();
  records.set(child, record);
  return record;
}

export async function spawnChrome(executable, args, { cleanupPath = '', spawnOptions = {} } = {}) {
  if (stopping) {
    releaseOwnedPath(cleanupPath);
    await removeOwnedPath(cleanupPath);
    throw new Error('Chrome launcher 已收到停止信号，不再启动浏览器');
  }

  let child;
  try {
    child = spawn(executable, args, { stdio: 'ignore', ...spawnOptions });
  } catch (error) {
    releaseOwnedPath(cleanupPath);
    await removeOwnedPath(cleanupPath);
    throw new Error(`Chrome 启动失败：${error.message}`, { cause: error });
  }

  const record = register(child, cleanupPath);
  /* record 从这里开始拥有 cleanupPath；预登记的那份所有权移交，避免删两次。 */
  releaseOwnedPath(cleanupPath);
  try {
    await record.spawnPromise;
    return child;
  } catch (error) {
    await stopChrome(child);
    throw new Error(`Chrome 启动失败：${error.message}`, { cause: error });
  }
}

export async function stopChrome(child) {
  if (!child) return undefined;
  const record = records.get(child);
  if (!record) {
    /* 已清理完成的 owned child：幂等返回第一次的结果。从未登记的照样拒绝——
       那可能是别的会话的进程，删它的 profile、发它信号都不该发生在这里。 */
    const done = completedStops.get(child);
    if (done) return done;
    throw new Error('拒绝清理未由 chrome-lifecycle 登记的进程');
  }
  if (record.stopPromise) return record.stopPromise;

  record.stopPromise = (async () => {
    if (!hasExited(record)) {
      child.kill('SIGTERM');
      const exitedInGrace = await Promise.race([
        record.exitPromise.then(() => true),
        wait(TERM_GRACE_MS).then(() => false)
      ]);
      if (!exitedInGrace && !hasExited(record)) child.kill('SIGKILL');
    }

    /* 这里故意没有第二个 timeout。SIGKILL 后只有真实 exit 才能证明可以删 profile
       并释放 lease；把等待超时当成功会重新制造 orphan Chrome 竞态。 */
    await record.exitPromise;
    await removeOwnedPath(record.cleanupPath);
    records.delete(child);
  })();

  /* 墓碑要在清理**成功**后才可作为幂等结果返回；失败的 stopPromise 留在 record 上，
     重复调用拿到同一个 rejection，不会被误当成「已经清理干净」。 */
  record.stopPromise.then(() => { completedStops.set(child, record.stopPromise); }, () => {});
  return record.stopPromise;
}

export function chromeShutdownRequested() {
  return stopping;
}

export function chromeSignalExitCode() {
  return signalExitCode;
}

/* 本模块自己的 signal handler 集合：判断「除了我还有没有别人在监听这个信号」。 */
const ownHandlers = new Set();

function othersListening(signalName) {
  return process.listeners(signalName).some((listener) => !ownHandlers.has(listener));
}

async function stopOnSignal(exitCode, signalName) {
  if (shutdownPromise) return shutdownPromise;
  stopping = true;
  signalExitCode = exitCode;
  shutdownPromise = (async () => {
    try {
      while (records.size) {
        const owned = [...records.keys()];
        const results = await Promise.allSettled(owned.map((child) => stopChrome(child)));
        const failed = results.find((result) => result.status === 'rejected');
        if (failed) throw failed.reason;
      }
      /* 预登记但还没被任何 Chrome 接管的临时资源（mkdtemp 之后、spawnChrome
         之前的窗口）也要删干净。 */
      for (const path of [...ownedPaths]) {
        await removeOwnedPath(path);
        ownedPaths.delete(path);
      }
      /* 只有当本模块是该信号唯一的监听者时才代为退出。launcher 自己注册了
         handler（如 check-privacy 的 requestStop）时，退出的时机由它决定——
         这里 process.exit 会抢走它的清理机会。 */
      if (othersListening(signalName)) {
        process.exitCode = exitCode;
        return;
      }
      process.exit(exitCode);
    } catch (error) {
      console.error(`${signalName} 清理失败；为避免释放 lease 后留下孤儿 Chrome，进程将保持：${error.message}`);
      process.exitCode = exitCode;
      /* server.unref() 本身不保活；清理失败时显式保活，直到人工处理或 SIGKILL。 */
      safetyHold ??= setInterval(() => {}, 0x7fffffff);
    }
  })();
  return shutdownPromise;
}

const onSigint = () => { void stopOnSignal(130, 'SIGINT'); };
const onSigterm = () => { void stopOnSignal(143, 'SIGTERM'); };
ownHandlers.add(onSigint);
ownHandlers.add(onSigterm);
process.on('SIGINT', onSigint);
process.on('SIGTERM', onSigterm);
