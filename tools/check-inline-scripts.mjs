/* 内联脚本语法门禁：无依赖，纯静态。
 *
 * 用法：
 *   node tools/check-inline-scripts.mjs           # 全站
 *   node tools/check-inline-scripts.mjs index.html
 *
 * 本站所有交互都写在页面内联 <script> 里，没有构建步骤，也没有打包器会替我们解析。
 * 一个漏掉的括号在打开页面之前完全没有反馈，而且只会静默毁掉那一页的全部交互。
 * 这里用 Node 的 vm.Script 只做编译、不执行，把语法错误挡在提交之前。
 *
 * 同时检查两条本站硬约束：
 *   - 内联脚本必须是 classic script（不能出现 import / export，页面用的是全局变量协议）。
 *   - 不能出现顶层 await（classic script 不支持，会整块失效）。
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const HTML_DIRS = ['.', 'games', 'nature', 'pages'];

function rootRel(path) { return relative(ROOT, path).split(sep).join('/'); }

async function htmlFiles() {
  const out = [];
  for (const dir of HTML_DIRS) {
    const full = dir === '.' ? ROOT : join(ROOT, dir);
    for (const name of (await readdir(full)).sort()) {
      if (name.endsWith('.html')) out.push(dir === '.' ? name : `${dir}/${name}`);
    }
  }
  return out;
}

const requested = process.argv.slice(2).map((a) => rootRel(join(ROOT, a)));
const all = await htmlFiles();
const targets = requested.length ? all.filter((f) => requested.includes(f)) : all;
if (requested.length && targets.length !== requested.length) {
  console.error(`✗ 找不到这些页面：${requested.filter((r) => !targets.includes(r)).join(', ')}`);
  process.exit(1);
}

const errors = [];
let blocks = 0;
for (const rel of targets) {
  const html = await readFile(join(ROOT, rel), 'utf8');
  const inline = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
    .filter((m) => !/\bsrc\s*=/i.test(m[1]))
    .map((m) => ({ attrs: m[1], code: m[2] }));

  inline.forEach(({ attrs, code }, index) => {
    blocks += 1;
    const where = `${rel} 第 ${index + 1} 个内联脚本`;
    const isModule = /\btype\s*=\s*["']module["']/i.test(attrs);
    try {
      new Script(code, { filename: `${rel}#inline${index}` });
    } catch (error) {
      errors.push(`${where}: ${error.message}`);
      return;
    }
    if (isModule) {
      errors.push(`${where}: 内联脚本不得用 type="module"，本站按 classic script 顺序加载共享全局变量`);
    }
    /* 只在语句起始位置找 import / export，避免误伤 importScripts 或 obj.export。 */
    if (/(?:^|[\n;{}])\s*(?:import\s+[\w{*'"]|export\s+(?:default|const|let|var|function|class|\{))/m.test(code)) {
      errors.push(`${where}: 出现 ES module 语法（import / export），classic script 会整块报错`);
    }
  });
}

console.log(`校验 ${targets.length} 个 HTML、${blocks} 个内联脚本`);
if (errors.length) {
  for (const error of errors) console.error(`  ✗ ${error}`);
  console.error(`\n${errors.length} 项内联脚本错误`);
  process.exit(1);
}
console.log('  ✓ 内联脚本全部通过语法与 classic script 约束');
