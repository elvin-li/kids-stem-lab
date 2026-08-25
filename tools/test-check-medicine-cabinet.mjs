/* check-medicine-cabinet.mjs 的回滚验证：无依赖。
 *
 * 用法：
 *   node tools/test-check-medicine-cabinet.mjs
 *
 * 一条从没见过它变红的门禁是不可信的——它可能因为选择器写错而永远通过，
 * 而那种「永远绿」比没有门禁更糟：它会让人以为这些规则被守住了。
 * 这里逐条把断言反向验证一次：临时在真实文件里注入一处缺陷，确认审计变红
 * 并点名到具体页面和原因，然后逐字节还原并用 md5 核对。
 *
 * 变异点只落在 pages/med-*.html 与 pages/medicine-cabinet.html——本册自己的文件。
 * 有意不碰 sw.js：它的 CACHE 版本号会被全站版本同步改动，注入期间一旦有人改它，
 * 还原就会把对方的改动一起抹掉。CORE 登记那一条改由「文件在不在 CORE 里」的
 * 静态阅读来保证，不做变异。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const AUDIT = join(ROOT, 'tools', 'check-medicine-cabinet.mjs');
const md5 = (text) => createHash('md5').update(text).digest('hex');

/* ---- 信号期还原 ----
 * 多点变异把「工作区里躺着注入缺陷」的窗口从一个文件扩到两个真实内容页；
 * 没有信号处理时，跑到一半按下 Ctrl-C 会把注入的缺陷留在真实页面里
 * （语义评审 2026-08-11 第 11 条）。这里维护一份「当前已写入变异、还没还原」
 * 的原文快照，收到 SIGINT/SIGTERM 时用同步写把它们全部还原再退出——
 * 信号处理器里不能 await，只能走 writeFileSync。 */
const pendingRestores = new Map();
let signalled = false;
function restoreOnSignal(code, name) {
  if (signalled) return;
  signalled = true;
  let restored = 0;
  for (const [path, original] of pendingRestores) {
    try {
      writeFileSync(path, original, 'utf8');
      restored += 1;
    } catch (error) {
      console.error(`✗ ${name}：${relative(ROOT, path)} 还原失败（${error.message}），请立刻人工检查该文件`);
    }
  }
  if (pendingRestores.size) console.error(`\n${name}：已还原 ${restored}/${pendingRestores.size} 个被变异的文件，退出`);
  process.exit(code);
}
process.on('SIGINT', () => restoreOnSignal(130, 'SIGINT'));
process.on('SIGTERM', () => restoreOnSignal(143, 'SIGTERM'));

function runAudit() {
  const result = spawnSync(process.execPath, [AUDIT], { cwd: ROOT, encoding: 'utf8' });
  return { code: result.status, out: `${result.stdout || ''}${result.stderr || ''}` };
}

/* 每条变异都必须在目标文件里恰好命中 1 次，否则报「无法做精确变异」而不是悄悄改错地方。 */
const CASES = [
  {
    /* 用只有一个 .flag 的页面，才能验到「缺少」这一支；med-fever 有两个
       （发热红旗 + 高热惊厥红旗），删掉第一个只会命中「排得太后」那一支。 */
    name: '红旗信号段被删',
    file: 'pages/med-rash-illness.html',
    find: '<section class="flag" aria-labelledby="rashFlagTitle">',
    into: '<section aria-labelledby="rashFlagTitle">',
    expect: /med-rash-illness\.html: 缺少 \.flag 红旗信号段/
  },
  {
    name: '红旗段被挪到页面末尾之后（靠前性判定）',
    file: 'pages/med-tummy.html',
    find: '<section class="flag" aria-labelledby="tummyFlagTitle">',
    into: '<section class="flagX" aria-labelledby="tummyFlagTitle">',
    expect: /med-tummy\.html: (?:缺少 \.flag|第一个 \.flag)/
  },
  {
    name: '来源被换成非官方站点',
    file: 'pages/med-skin.html',
    find: 'https://www.healthychildren.org/english/ages-stages/baby/diapers-clothing/pages/diaper-rash.aspx">https',
    into: 'https://some-parenting-blog.example.com/diaper-rash">https',
    expect: /med-skin\.html: 来源不在官方白名单里/
  },
  {
    name: '免责声明被删',
    file: 'pages/med-breathing.html',
    find: '<b>免责声明。</b>本页是公开指南的中文整理，<b>不构成医疗建议，不能用于诊断</b>',
    into: '<b>说明。</b>本页是公开指南的中文整理',
    expect: /med-breathing\.html: \.disc 免责声明里必须出现/
  },
  {
    name: '写进了具体毫克数',
    file: 'pages/med-dosing.html',
    find: '<b>③ 体重。</b>',
    into: '<b>③ 体重。</b>每次给 250 毫克。',
    expect: /med-dosing\.html: 出现具体毫克数/
  },
  {
    name: '写进了按体重的剂量公式',
    file: 'pages/med-fever.html',
    find: '<b>剂量按体重，不按年龄。</b>',
    into: '<b>剂量按体重，不按年龄（15 mg/kg）。</b>',
    expect: /med-fever\.html: 出现(?:具体毫克数|按体重的剂量写法)/
  },
  {
    name: '被改成孩子模式',
    file: 'pages/med-firstaid.html',
    find: '<html lang="zh-CN" data-mode="parent">',
    into: '<html lang="zh-CN" data-mode="kid">',
    expect: /med-firstaid\.html: <html data-mode> 应为 "parent"/
  },
  {
    name: '专题页从总览页掉了链接（入口消失）',
    file: 'pages/medicine-cabinet.html',
    find: '<a class="go" href="med-firstaid.html">打开急救速查 →</a>',
    into: '<a class="go" href="medicine-cabinet.html">打开急救速查 →</a>',
    expect: /没有链接到 med-firstaid\.html/
  },
  {
    /* 必须选一个整页只出现一次「120」的页面，否则改掉一处、另一处还在，
       审计照样通过，看起来像断言是死的——第一版就用了有两处 120 的 med-breathing，
       被这条回滚验证自己抓了出来。med-skin 全页只有免责声明里那一处。 */
    name: '本地急救电话被去掉',
    file: 'pages/med-skin.html',
    find: '<p>紧急情况请直接联系急救（中国 120）或就近儿科急诊。</p>',
    into: '<p>紧急情况请直接联系当地急救或就近儿科急诊。</p>',
    expect: /med-skin\.html: 正文里没有出现急救电话 120/
  },
  /* ---- 导航第七项的三条断言（固定七项导航那一节） ----
     这几条是加导航标签时补的，必须一起验：一条死掉就意味着有人删了入口、
     改错了标签或挪走了 aria-current，而门禁照样绿。 */
  {
    name: '导航里的医药箱入口被指到别处（入口消失）',
    file: 'pages/med-newborn.html',
    find: 'href="../pages/medicine-cabinet.html" aria-current="page">医药箱</a>',
    into: 'href="../pages/parents.html" aria-current="page">医药箱</a>',
    expect: /med-newborn\.html: 主导航里没有医药箱入口/
  },
  {
    name: '导航第七项的文字被改掉',
    file: 'pages/med-sleep.html',
    find: 'aria-current="page">医药箱</a>',
    into: 'aria-current="page">家庭医药箱</a>',
    expect: /med-sleep\.html: 导航第七项文字应为「医药箱」/
  },
  {
    name: '分区页的 aria-current 被从医药箱挪走',
    file: 'pages/med-nutrition.html',
    find: 'href="../pages/medicine-cabinet.html" aria-current="page">医药箱</a>',
    into: 'href="../pages/medicine-cabinet.html">医药箱</a>',
    expect: /med-nutrition\.html: 本页属于医药箱分区，aria-current 应落在导航的「医药箱」项上/
  },
  /* ---- 后一批专题页（湿疹、泌尿、骨骼外伤、发育行为、皮肤感染叮咬）的覆盖 ----
     加页时如果只靠前面那些用例，新页可以整页缺来源、缺免责声明而门禁照样绿——
     因为那些用例的变异点都落在旧文件上。每加一批页就要把断言重新分派到新页上一次。 */
  {
    /* med-eczema 全页只有一个 .flag，才验得到「缺少」这一支。 */
    name: '湿疹页红旗信号段被删',
    file: 'pages/med-eczema.html',
    find: '<section class="flag" aria-labelledby="eczFlagTitle">',
    into: '<section aria-labelledby="eczFlagTitle">',
    expect: /med-eczema\.html: 缺少 \.flag 红旗信号段/
  },
  {
    name: '泌尿页来源被换成非官方站点',
    file: 'pages/med-urinary.html',
    find: 'https://medlineplus.gov/urinarytractinfections.html">https',
    into: 'https://some-parenting-blog.example.com/uti">https',
    expect: /med-urinary\.html: 来源不在官方白名单里/
  },
  {
    name: '骨骼外伤页写进了具体毫克数',
    file: 'pages/med-bone-injury.html',
    find: '<b>① 受伤机制</b>',
    into: '<b>① 受伤机制</b>止痛先给 200 毫克。',
    expect: /med-bone-injury\.html: 出现具体毫克数/
  },
  {
    name: '发育行为页被改成孩子模式',
    file: 'pages/med-development.html',
    find: '<html lang="zh-CN" data-mode="parent">',
    into: '<html lang="zh-CN" data-mode="kid">',
    expect: /med-development\.html: <html data-mode> 应为 "parent"/
  },
  {
    name: '皮肤感染叮咬页从总览页掉了链接（入口消失）',
    file: 'pages/medicine-cabinet.html',
    find: '<a class="go" href="med-infection-bites.html">打开感染叮咬速查 →</a>',
    into: '<a class="go" href="medicine-cabinet.html">打开感染叮咬速查 →</a>',
    expect: /没有链接到 med-infection-bites\.html/
  },
  {
    name: '湿疹页免责声明被删',
    file: 'pages/med-eczema.html',
    find: '<b>免责声明。</b>本页是公开指南的中文整理，<b>不构成医疗建议，不能用于诊断</b>',
    into: '<b>说明。</b>本页是公开指南的中文整理',
    expect: /med-eczema\.html: \.disc 免责声明里必须出现/
  },
  {
    /* 这一条本来想验「120 被去掉」，但 med-safety 全页有两处 120（红旗标题＋免责声明），
       删掉一处另一处还在，审计照样通过——回滚验证当场把它标成死断言。
       这正是 CONTRACT.md 记下的那个陷阱：变异点必须落在目标特征全页只出现一次的文件上。
       改成验这一页独有的东西：它讲预防、通篇不该出现剂量。 */
    name: '居家安全页写进了具体毫克数',
    file: 'pages/med-safety.html',
    find: '<b>① 到底是什么东西</b>',
    into: '<b>① 到底是什么东西</b>先喂了 100 毫克。',
    expect: /med-safety\.html: 出现具体毫克数/
  },
  {
    name: '照护者页来源被换成非官方站点',
    file: 'pages/med-caregiver.html',
    find: 'https://medlineplus.gov/postpartumdepression.html">https',
    into: 'https://some-parenting-blog.example.com/ppd">https',
    expect: /med-caregiver\.html: 来源不在官方白名单里/
  },
  {
    name: '照护者页红旗信号段被删',
    file: 'pages/med-caregiver.html',
    find: '<section class="flag" aria-labelledby="cgFlagTitle">',
    into: '<section aria-labelledby="cgFlagTitle">',
    expect: /med-caregiver\.html: 缺少 \.flag 红旗信号段/
  },
  {
    name: '居家安全页从总览页掉了链接（入口消失）',
    file: 'pages/medicine-cabinet.html',
    find: '<a class="go" href="med-safety.html">打开安全速查 →</a>',
    into: '<a class="go" href="medicine-cabinet.html">打开安全速查 →</a>',
    expect: /没有链接到 med-safety\.html/
  },
  {
    /* 入链断言：med-vaccine 的同册入链恰好是 med-fever 和 med-rash-illness 两条，
       两条一起掐掉才会真的只剩总览页可达。这是本文件里第一条需要多点变异的用例。 */
    name: '专题页失去全部同册入链（只剩总览页可达）',
    edits: [
      {
        file: 'pages/med-fever.html',
        find: '<a class="btn btn-ghost" href="med-vaccine.html">接种后发热正常吗？</a>',
        into: '<a class="btn btn-ghost" href="medicine-cabinet.html">接种后发热正常吗？</a>'
      },
      {
        file: 'pages/med-rash-illness.html',
        find: '<a class="btn btn-ghost" href="med-vaccine.html">麻疹 · 猩红热 · 疫苗</a>',
        into: '<a class="btn btn-ghost" href="medicine-cabinet.html">麻疹 · 猩红热 · 疫苗</a>'
      }
    ],
    expect: /med-vaccine\.html: 没有任何其他专题页链到它/
  },
  {
    name: '专题页被塞进主导航',
    file: 'pages/med-vaccine.html',
    find: '    <a class="nav-link" href="../pages/medicine-cabinet.html" aria-current="page">医药箱</a>',
    into: '    <a class="nav-link" href="../pages/medicine-cabinet.html" aria-current="page">医药箱</a>\n    <a class="nav-link" href="../pages/med-fever.html">发热</a>',
    expect: /med-vaccine\.html: 专题页不该进主导航/
  }
];

/* ---- 先跑基线：树本身必须是绿的，否则变异结论没有意义 ---- */
const baseline = runAudit();
if (baseline.code !== 0) {
  console.log('✗ 基线就不是绿的，先修好 check-medicine-cabinet.mjs 报的问题再跑本测试：');
  console.log(baseline.out.split('\n').slice(-14).join('\n'));
  process.exit(1);
}
console.log(`基线通过（exit 0）。开始逐条回滚验证，共 ${CASES.length} 条。\n`);

let failures = 0;
for (const item of CASES) {
  /* 一条用例可以同时改多个文件：有些断言单点改不出来。
     入链那一条就是——要验「一个专题页失去全部同册入链」，而入链最少的页面也有两条，
     只掐掉一条审计当然不该报警（它确实还能从别的专题页走到）。
     早先那版只支持单点替换，于是那条断言注入后审计照样通过，被这套回滚验证自己标成了死断言。 */
  const edits = item.edits || [{ file: item.file, find: item.find, into: item.into }];
  const originals = new Map();
  let precise = true;

  for (const edit of edits) {
    const path = join(ROOT, edit.file);
    const original = await readFile(path, 'utf8');
    originals.set(path, original);
    const hits = original.split(edit.find).length - 1;
    if (hits !== 1) {
      console.log(`✗ ${item.name}：无法做精确变异——「${edit.find.slice(0, 46)}…」在 ${edit.file} 里出现 ${hits} 次（要求恰好 1 次）`);
      precise = false;
      break;
    }
  }
  if (!precise) { failures += 1; continue; }

  const digests = new Map([...originals].map(([p, text]) => [p, md5(text)]));
  /* 先登记再落笔：信号可能在任意一次写之后到达，快照必须先就位。 */
  for (const [path, original] of originals) pendingRestores.set(path, original);
  for (const edit of edits) {
    const path = join(ROOT, edit.file);
    /* 逐条改：同一个文件被改两次时要基于上一次的结果，不能各自从原文出发。 */
    const current = await readFile(path, 'utf8');
    await writeFile(path, current.replace(edit.find, edit.into), 'utf8');
  }

  let verdict;
  try {
    const mutated = runAudit();
    if (mutated.code === 0) {
      verdict = `✗ ${item.name}：注入缺陷后审计仍然通过——这条断言是死的`;
      failures += 1;
    } else if (!item.expect.test(mutated.out)) {
      verdict = `✗ ${item.name}：审计变红了，但没有点名预期原因（应匹配 ${item.expect}）\n     实际：`
        + mutated.out.split('\n').filter((l) => l.trim().startsWith('pages/') || l.includes('sw.js:')).slice(0, 3).join(' / ');
      failures += 1;
    } else {
      verdict = `✓ ${item.name}：审计变红并点名到位`;
    }
  } finally {
    /* 无论断言结果如何都必须还原，否则会把注入的缺陷留在工作区里。 */
    for (const [path, original] of originals) await writeFile(path, original, 'utf8');
    pendingRestores.clear();
  }

  for (const [path, digest] of digests) {
    const restored = await readFile(path, 'utf8');
    if (md5(restored) !== digest) {
      console.log(`✗ ${item.name}：${relative(ROOT, path)} 未能逐字节还原（md5 不符），请立刻人工检查该文件`);
      failures += 1;
    }
  }
  console.log(`  ${verdict}`);
}

/* ---- 收尾再跑一次基线：确认所有变异都已还原 ---- */
const after = runAudit();
if (after.code !== 0) {
  console.log('\n✗ 收尾基线不是绿的：有变异没有还原干净，请检查 git diff');
  failures += 1;
}

console.log(`\n=== ${CASES.length} 条变异，${failures} 条不通过 ===`);
if (!failures) {
  console.log('  ✓ 每条断言都能真的变红并点名具体页面；所有变异已逐字节还原，收尾基线为绿');
}
process.exit(failures ? 1 : 0);
