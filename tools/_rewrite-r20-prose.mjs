#!/usr/bin/env node
/** Round 20: align wing-lab with two-pair stage; unique leftover titles. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const P = (xs) => (Array.isArray(xs) ? xs : [xs]).map((p) => `    <p>${p}</p>`).join("\n");
const F = (icon, cap, sub, fact) =>
  `      <div class="kid-figure"><span class="kid-figure-art" aria-hidden="true">${icon}</span><span class="kid-figure-cap">${cap}</span><span class="kid-figure-sub">${sub}</span><p class="kid-figure-fact">${fact}</p></div>`;
const grid = (label, facts) =>
  `    <div class="kid-figure-grid" role="group" aria-label="${label}">\n${facts.map((f) => F(...f)).join("\n")}\n    </div>`;
const stepsHtml = (items) =>
  `    <ol class="kid-story-steps">\n${items.map((s, i) => `      <li data-step="${i + 1}"><b>${s.b}</b>${s.t}</li>`).join("\n")}\n    </ol>`;
const agesHtml = (kid, mid, adv) => `    <div class="age-tiers" aria-label="按年龄分层的解释">
      <div class="age-tier tier-kid"><b>4–6&nbsp;岁 · 一句话</b><p>${kid}</p></div>
      <div class="age-tier tier-mid"><b>7–9&nbsp;岁</b><p>${mid}</p></div>
      <div class="age-tier tier-adv"><b>10–12&nbsp;岁 · 进阶</b><p>${adv}</p></div>
    </div>`;
function replaceSection(t, id, neu) {
  const re = new RegExp(`<section\\b[^>]*aria-labelledby="${id}"[^>]*>[\\s\\S]*?<\\/section>`, "m");
  if (!re.test(t)) throw new Error("MISS " + id);
  return t.replace(re, neu);
}
const look = (d) => `  <section class="card" aria-labelledby="lookTitle">
    <h2 id="lookTitle">${d.lookT}</h2>
${P(d.lookIntro)}
${grid("主题细节", d.facts)}
${stepsHtml(d.steps)}
${agesHtml(...d.ages)}
    <p class="teach-note" data-audience="parent"><b>这在教什么：</b>${d.teachNote}</p>
    <ul class="ask-list">${d.miniAsk.map((x) => `\n      <li>${x}</li>`).join("")}
    </ul>
  </section>`;
const teach = (d) => `  <section class="card" aria-labelledby="teachWhatTitle">
    <h2 id="teachWhatTitle">${d.teachT}</h2>
${P(d.teachB)}
  </section>`;
const deep = (d) => `  <section class="card" aria-labelledby="deepTitle">
    <h2 id="deepTitle">${d.deepT}</h2>
${P(d.deepB)}
${grid("再挖一层的事实", d.deepFacts)}
  </section>`;
const field = (d) => `  <section class="card" aria-labelledby="fieldTitle">
    <h2 id="fieldTitle">${d.fieldT}</h2>
${P(d.fieldB)}
${grid("三列对照", d.fieldFacts)}
  </section>`;
const more = (d) => `  <section class="card" aria-labelledby="moreTitle">
    <h2 id="moreTitle">${d.moreT}</h2>
${P(d.moreB)}
${grid("记录与带走", d.moreFacts)}
  </section>`;
const ask = (d) => `  <section class="card parent-deep-dive" data-audience="parent" aria-labelledby="askTitle">
    <h2 id="askTitle">给家长的问题</h2>
    <ul class="ask">${d.asks.map((x) => `\n      <li>${x}</li>`).join("")}
    </ul>
  </section>`;
const why = (d) => `  <section class="card parent-deep-dive" data-audience="parent" aria-labelledby="whyTitle">
    <h2 id="whyTitle">背后的原理</h2>
${P(d.whys)}
  </section>`;

const BANNED = [
  "机制如何工作",
  "找出少了哪一环",
  "结合本页任务用自己的话再讲一遍",
];

const PAGES = [
  {
    rel: "games/wing-lab.html",
    mode: "full",
    lead: "两对翅能各自扇，身子可以停在空中；一对翅多半要往前扑才掉不下去。翅膀完全停住，常常会往下掉。本页用对×振×8 当比较尺子，不是真飞机手册。",
    predictExplain: "两对翅可把前后的力错开、对消，身子更容易停住；一对翅多半要往前扑，才有气流托住。完全停住就掉。蜂鸟一对翅也能停，那是另一套，不抢本页对照。",
    teachT: "两对翅能停在空中，一对翅多半要往前扑",
    teachB: [
      "先点「两对快振停住」，看蜻蜓身子几乎不动。再点「一对慢振往前」，看小鸟要往前冲。再点「停住就掉」。",
      "本页尺子：升力=对×振×8，满 40 算停得住。两对、振得快，更容易够线；一对、振得慢，常常不够，只能往前飞。",
      "不要抓真蜻蜓，也不要粘住活昆虫的翅膀。本页不是航模课。",
    ],
    lookT: "同一只模型，先两对停住，再一对往前扑",
    lookIntro: [
      "舞台上比的是几对翅、扇多快。先两对快振看停不停，再一对慢振看要不要往前冲。",
      "完成句写「两对能停」或「一对要往前」。不要写「翅膀有升力魔法」。",
    ],
    facts: [
      ["🪲", "两对翅", "能各自扇", "前后两对可以错开，身子更容易停住。"],
      ["🐦", "一对翅", "多半要往前", "左右一起扑，常常要冲着飞才托得住。"],
      ["📏", "对×振×8", "本页尺子", "满 40 算停得住，不是真实牛顿。"],
      ["🛑", "完全停住", "会掉", "一对翅若完全停，常常往下掉。"],
      ["🚫", "升力魔法", "否决", "不是翅膀自己会吸住天空。"],
      ["⚠️", "真虫", "别抓", "不要粘住活昆虫的翅膀。"],
    ],
    steps: [
      { b: "两对快振。", t: "身子停没停。" },
      { b: "一对慢振。", t: "要不要往前冲。" },
      { b: "停住一次。", t: "会不会往下掉。" },
      { b: "写完成句。", t: "不是翅膀有魔法。" },
    ],
    ages: [
      "四只翅膀的蜻蜓能停在空中；两只翅膀的小鸟多半要往前飞。",
      "两对翅可以错开扇，前后的力对消，身子就停得住。一对翅多半要往前扑。",
      "本页升力=对×振×8 是比较尺子。蜂鸟一对翅也能悬停，是另一套高频机制，不抢完成句。",
    ],
    teachNote: "孩子应能对两对停住和一对往前各指一次，并否定「翅膀有升力魔法」。",
    miniAsk: ["两对停得住吗？", "一对要往前吗？", "停住会怎样？", "是魔法吗？"],
    deepT: "直升机转一圈当翅膀，是另一套，不抢两对对照",
    deepB: [
      "旋翼把转圈当成连续的翅膀，也能停，但零件和昆虫不是同一套。",
      "蜂鸟一对翅也能停，靠的是极快地扇和转腕。本页先交「两对比一对」。",
      "不要抓真蜻蜓。纸飞机不朝人脸扔。",
      "读数是示意，不是适航手册。",
    ],
    deepFacts: [
      ["🚁", "旋翼", "另一套", "转一圈当翅膀，不是四只膜翅。"],
      ["🐦", "蜂鸟", "另一套", "一对翅也能停，不抢本页对照。"],
      ["⚠️", "真虫", "别抓", "也不要粘住活翅膀。"],
      ["📏", "≥40", "停得住", "本页尺子，不是牛顿公式。"],
    ],
    fieldT: "对照：两对停住 · 一对往前 · 翅膀有升力魔法",
    fieldB: [
      "同一只模型，只改几对翅、扇多快。",
      "两对快振：身子停得住。",
      "一对慢振：要往前冲。",
      "「升力魔法」整列划掉：空气被推走，才会反过来托住。",
    ],
    fieldFacts: [
      ["🟢", "两对快振", "停得住", "前后力可以错开。"],
      ["🟡", "一对慢振", "要往前", "常常不够停在原地。"],
      ["🔴", "升力魔法", "整列划掉", "不是吸住天空。"],
      ["🛑", "完全停住", "会掉", "一对翅停了就掉。"],
    ],
    moreT: "回家只记「两对能停、一对要往前」，不记航校口令",
    moreB: [
      "画两格：四翅停着，两翅往前冲。",
      "口头说「停住就掉」。升力魔法那句用来否决。",
      "不要抓真蜻蜓。纸飞机不朝人脸扔。",
    ],
    moreFacts: [
      ["✏️", "两格", "停和冲", "先画下来对照。"],
      ["🗣️", "口令", "两对能停", "一对要往前。"],
      ["🚫", "升力魔法", "否决句", "这句话整列划掉。"],
      ["⚠️", "真虫", "别抓", "不要粘住活翅膀。"],
    ],
    asks: [
      "两对那一次，孩子指的是身子停住，还是「蜻蜓比较聪明」？",
      "一对要往前冲，哪一句能给四岁听？",
      "蜂鸟一对翅也能停，为什么不能当本页第一完成句？",
      "抓真蜻蜓、朝人脸扔的红线怎么说？",
      "本页能当航校作业吗？",
    ],
    whys: [
      "两对独立挥动的翅可以把前后方向的力分量错开甚至对消，净水平力接近零时就能悬停。一对翅的扑打通常同时产生升力与推力，机体要往前才维持绕流。完全停拍则升力消失。本页对×振×8 是比较尺子。",
      "不要抓真虫。舞台是蜻蜓与小鸟示意。",
    ],
  },
  { rel: "games/light-and-shadow.html", mode: "title", teachT: "灯靠近，影子常常变大；挡住光才留下暗区" },
  { rel: "games/static-lab.html", mode: "boost", boostT: "同一只气球：先吸住纸屑，再推开另一只气球" },
  { rel: "games/denticle-lab.html", mode: "boost", boostT: "顺着摸更滑，反过来挂；不是随机砂纸" },
  { rel: "games/spring-lab.html", mode: "boost", boostT: "轻的挂一次，重的再挂一次，比伸长" },
  { rel: "nature/lotus.html", mode: "boost", boostT: "乳突加蜡让水成珠，珠一滚就把泥带走" },
  { rel: "nature/birds.html", mode: "boost", boostT: "飞羽推空气，绒羽把空气锁住" },
  { rel: "nature/geckos.html", mode: "boost", boostT: "刚毛贴墙，不是脚上涂了胶水" },
  { rel: "nature/pandas.html", mode: "boost", boostT: "伪拇指握竹，肚子靠量取胜" },
  { rel: "nature/rocks.html", mode: "boost", boostT: "先看纹理，再猜它从哪一站来" },
  { rel: "nature/shells.html", mode: "boost", boostT: "壳缘还在长，壳口比较新" },
  { rel: "nature/spiders.html", mode: "boost", boostT: "八条腿，丝有好几种用法" },
  { rel: "nature/teeth.html", mode: "boost", boostT: "门切、犬撕、臼磨；釉质怕酸" },
];

function nchars(s) {
  return s.replace(/[。、，]/g, "").length;
}

for (const d of PAGES) {
  const file = path.join(ROOT, d.rel);
  let t = fs.readFileSync(file, "utf8");
  const orig = t.length;
  if (d.lead) t = t.replace(/<p class="lead">[\s\S]*?<\/p>/, `<p class="lead">${d.lead}</p>`);
  if (d.predictExplain) {
    t = t.replace(/data-kid-predict-explain="[^"]*"/, `data-kid-predict-explain="${d.predictExplain}"`);
  }
  if (d.mode === "title") {
    t = t.replace(/<h2 id="teachWhatTitle">[^<]*<\/h2>/, `<h2 id="teachWhatTitle">${d.teachT}</h2>`);
  } else if (d.mode === "boost") {
    t = t.replace(/<h2 id="boostTitle">[^<]*<\/h2>/, `<h2 id="boostTitle">${d.boostT}</h2>`);
  } else {
    for (const [id, make] of [
      ["teachWhatTitle", teach],
      ["lookTitle", look],
      ["deepTitle", deep],
      ["fieldTitle", field],
      ["moreTitle", more],
      ["askTitle", ask],
      ["whyTitle", why],
    ]) {
      if (!t.includes(`aria-labelledby="${id}"`) && !t.includes(`id="${id}"`)) {
        console.warn("SKIP", id, d.rel);
        continue;
      }
      t = replaceSection(t, id, make(d));
    }
  }
  for (const b of BANNED) if (t.includes(b)) console.warn("WARN", b, d.rel);
  const facts = [...t.matchAll(/kid-figure-fact">([^<]*)<\/p>/g)].map((m) => m[1]);
  const short = facts.filter((f) => f && (!f.endsWith("。") || nchars(f) < 5));
  if (short.length) console.warn("WARN short-fact", d.rel, short.slice(0, 4));
  fs.writeFileSync(file, t);
  console.log("OK", d.mode, d.rel, "delta", t.length - orig);
}
console.log("done", PAGES.length);
