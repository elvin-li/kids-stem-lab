/*
 * 跨进程 Chrome lease。
 *
 * 每个直接启动 Chrome 的工具都必须在 spawn 前 await acquireChromeLease()。
 * lease 由本机 TCP bind 保证原子性：同一工作区同时只能有一个 launcher；进程
 * 正常退出、收到信号或崩溃时，内核都会自动释放端口，不产生 stale lock 文件。
 */
import { createHash } from 'node:crypto';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const digest = createHash('sha256').update(`early-learning-chrome\0${ROOT}`).digest();
const LEASE_PORT = 40000 + (digest.readUInt16BE(0) % 8000);
const WAIT_MS = 500;
const DEFAULT_TIMEOUT_MS = 15 * 60 * 1000;

let heldLease = null;
let acquiring = null;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function configuredTimeout() {
  const value = Number(process.env.CHROME_LEASE_TIMEOUT_MS);
  return Number.isFinite(value) && value >= 0 ? value : DEFAULT_TIMEOUT_MS;
}

function listenOnce() {
  const server = createServer();
  return new Promise((resolve, reject) => {
    const onError = (error) => {
      server.removeListener('listening', onListening);
      reject(error);
    };
    const onListening = () => {
      server.removeListener('error', onError);
      resolve(server);
    };
    server.once('error', onError);
    server.once('listening', onListening);
    server.listen({ host: '127.0.0.1', port: LEASE_PORT, exclusive: true });
  });
}

export function chromeLeasePort() {
  return LEASE_PORT;
}

export async function acquireChromeLease(options = {}) {
  if (heldLease) return heldLease;
  if (acquiring) return acquiring;

  acquiring = (async () => {
    const timeoutMs = options.timeoutMs ?? configuredTimeout();
    const deadline = Date.now() + timeoutMs;
    let announced = false;

    while (true) {
      try {
        const server = await listenOnce();
        server.unref();
        const lease = {
          port: LEASE_PORT,
          async release() {
            if (heldLease !== lease) return;
            heldLease = null;
            if (server.listening) {
              await new Promise((resolve) => server.close(resolve));
            }
          }
        };
        heldLease = lease;
        return lease;
      } catch (error) {
        if (error.code !== 'EADDRINUSE') throw error;
        if (Date.now() >= deadline) {
          throw new Error(`等待 Chrome lease 超时（127.0.0.1:${LEASE_PORT}）；另一个会话仍在运行浏览器工具`);
        }
        if (!announced) {
          announced = true;
          console.error(`Chrome lease 正忙（127.0.0.1:${LEASE_PORT}），等待另一个会话结束…`);
        }
        await wait(Math.min(WAIT_MS, Math.max(1, deadline - Date.now())));
      }
    }
  })();

  try {
    return await acquiring;
  } finally {
    acquiring = null;
  }
}

export async function releaseChromeLease() {
  if (heldLease) await heldLease.release();
}
