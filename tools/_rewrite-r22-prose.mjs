#!/usr/bin/env node
/** Round 22: align spark-lab with gap/volt stage; unique leftover titles. */
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
const boost = (d) => `  <section class="card" aria-labelledby="boostTitle">
    <h2 id="boostTitle">${d.boostT}</h2>
${P(d.boostB)}
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

const BANNED = ["机制如何工作", "找出少了哪一环", "结合本页任务用自己的话再讲一遍", "碰真电", "完成句必须"];

const PAGES = [
  {
    rel: "games/spark-lab.html",
    mode: "full",
    lead: "两根棒中间留缝，电池格数够了才会跳过空气闪一下。干燥时门槛约等于缝的毫米数：4&nbsp;毫米要 4 格。点「空气潮湿」，门槛加倍，更难跳。贴住（缝 0）电流走金属，灯亮却不闪。不接墙上插座，不拆电池做真火花。",
    predictExplain: "有缝且格数够才跳过空气；贴住（缝 0）走金属，灯亮却不闪。潮湿时门槛加倍。只用本页教具，不接墙上插座。",
    teachT: "有缝才跳，贴住只亮灯；潮湿门槛加倍",
    teachB: [
      "先点「留 2&nbsp;毫米小缝」再「通电试一下」，看会不会闪。再点「两头贴住」通电，看灯亮却不闪。",
      "本页尺子：干燥时门槛 ≈ 缝的毫米数。4&nbsp;毫米要 4 格，再少一格就跳不过。点「空气潮湿」，门槛变成两倍。",
      "火花不是「电多的奖品」。贴住时电流走金属。不接墙上插座，不收集粉尘玩火花。",
    ],
    lookT: "同一组棒，先留缝通电，再贴住通电",
    lookIntro: [
      "舞台上比的是缝宽和电池格数。先留一条缝通电，再把两头贴住通电。",
      "完成句写「有缝才跳」或「贴住只亮灯」。不要写「电越多一定一直冒火花」。",
    ],
    facts: [
      ["✨", "小缝", "够格才闪", "空气被撕开成临时的路，才会闪一下。"],
      ["💡", "贴住", "灯亮不闪", "缝是 0，电流走金属，看不见火花。"],
      ["📏", "门槛", "约等于缝的毫米", "4&nbsp;毫米要 4 格，再少一格就跳不过。"],
      ["💧", "潮湿", "门槛×2", "电荷沿水膜漏走，同样缝更难跳。"],
      ["🎆", "烟花", "另一套", "火药燃烧，不是电荷跳缝。"],
      ["🚫", "插座", "红线", "真高压，本页禁止接。"],
    ],
    steps: [
      { b: "留小缝。", t: "通电会不会闪。" },
      { b: "两头贴住。", t: "灯亮却不闪没有。" },
      { b: "缝大格少。", t: "是不是跳不过。" },
      { b: "潮湿再试。", t: "门槛有没有加倍。" },
    ],
    ages: [
      "中间留一条缝，电够了才会闪一下。两头贴住，灯会亮，可是不闪。",
      "干燥时几毫米缝就要几格电池。潮湿时门槛加倍。贴住走金属，不跳空气。",
      "尖端放电、地毯摩擦是静电工坊的课。本页先交「有缝对比贴住」。不接插座。",
    ],
    teachNote: "孩子应能对有缝和贴住各报闪或不闪，并否定「电越多一定一直冒火花」和「去接插座」。",
    miniAsk: ["小缝会闪吗？", "贴住会怎样？", "潮湿门槛怎样？", "能接插座吗？"],
    deepT: "潮湿让门槛加倍；尖端摩擦是隔壁页",
    deepB: [
      "点「空气潮湿」，同样 4&nbsp;毫米缝要 8 格才跳。不是「湿空气更好打火」。",
      "缝太大、格数不够：不闪，灯也不亮。闪电是同一件事，只是缝大得多，本页不模仿。",
      "尖端比钝端先跳、地毯摩擦起电，写在静电工坊。本页棒端形状不能调。",
      "不接墙上插座。不拆电池做真火花。不收集粉尘。",
    ],
    deepFacts: [
      ["💧", "潮湿", "门槛×2", "电荷沿水膜漏走，更难跳。"],
      ["🪨", "缝太大", "跳不过", "格数不够就什么也没有。"],
      ["⚡", "闪电", "尺度差很远", "同一家族，本页不模仿。"],
      ["🚫", "插座", "红线", "不接墙上的孔，不拆电池。"],
    ],
    fieldT: "对照：小缝闪一下 · 贴住只亮灯 · 电越多一定一直冒火花",
    fieldB: [
      "同一组棒，只改缝宽、格数和干湿。",
      "小缝、格数够：闪一下。",
      "贴住：灯亮，不闪。",
      "「电越多一定闪」整列划掉：贴住格数拉满也不闪。",
    ],
    fieldFacts: [
      ["🟢", "小缝够格", "闪一下", "空气被撕开成临时的路。"],
      ["🟡", "贴住", "灯亮不闪", "电流走金属。"],
      ["🔴", "电越多必闪", "整列划掉", "贴住拉满也不闪。"],
      ["💧", "潮湿", "更难跳", "门槛变成两倍。"],
    ],
    moreT: "回家只记「有缝才跳、贴住只亮灯」，不记插座实验",
    moreB: [
      "画两格：中间有缝在闪，两头贴住只亮灯。",
      "口头说「几毫米缝就要几格」。电越多必闪那句用来否决。",
      "不接墙上插座。不拆电池。不收集粉尘。",
    ],
    moreFacts: [
      ["✏️", "两格", "缝和贴", "先画下来对照。"],
      ["🗣️", "口令", "有缝才跳", "贴住只亮灯。"],
      ["🚫", "电越多必闪", "否决句", "这句话整列划掉。"],
      ["⚠️", "插座", "红线", "真高压，本页禁止接。"],
    ],
    boostT: "干燥门槛约等于缝的毫米数；潮湿加倍；贴住不闪",
    boostB: [
      "干燥时格数 ≥ 缝的毫米数才跳火。潮湿时门槛加倍，更难跳——不是湿空气更好打火。",
      "缝是 0：没有空气要跳，电流走金属，灯亮不闪。火花不是电多的奖品。",
      "不接墙上插座，不拆电池做真火花，不收集粉尘。闪电尺度差很远，本页不模仿。",
    ],
    asks: [
      "贴住拉满 10 格仍不闪，孩子说的是走金属，还是「这组电池坏了」？",
      "4&nbsp;毫米缝为什么要 4 格？潮湿后为什么变成 8 格？",
      "尖端放电、地毯摩擦为什么不能当本页第一完成句？",
      "不接插座、不拆电池，红线怎么说？",
      "本页能当避雷针课吗？",
    ],
    whys: [
      "空气是绝缘体。缝在、电压够，局部场强把空气电离成临时通路，才看见火花。本页用「门槛 ≈ 缝的毫米数」当比较尺子；潮湿时表面漏电路径增加，门槛加倍。缝为 0 则电流走金属，不击穿空气。",
      "不接市电。舞台是示意棒和灯，不是真电弧。",
    ],
  },
  { rel: "games/light-and-shadow.html", mode: "title", lookT: "灯靠近，影子常常变大；手一比，轮廓会改" },
  { rel: "games/chemilum-lab.html", mode: "title", lookT: "同一张桌：先看冷光亮不烫，再看热光红柱爬" },
  { rel: "games/bamboo-lab.html", mode: "title", lookT: "同一根竹，先加深钩握一次，再去掉钩握一次" },
  { rel: "games/blubber-lab.html", mode: "title", teachT: "脂肪像墙：越厚凉来得越慢，不是自己在发热" },
  { rel: "games/code-cards.html", mode: "title", teachT: "只改一张卡，后面全会走偏；先找第一处差异" },
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
    if (d.lookT) t = t.replace(/<h2 id="lookTitle">[^<]*<\/h2>/, `<h2 id="lookTitle">${d.lookT}</h2>`);
    if (d.teachT) t = t.replace(/<h2 id="teachWhatTitle">[^<]*<\/h2>/, `<h2 id="teachWhatTitle">${d.teachT}</h2>`);
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
    if (d.boostT) t = replaceSection(t, "boostTitle", boost(d));
  }
  for (const b of BANNED) if (t.includes(b)) console.warn("WARN", b, d.rel);
  const facts = [...t.matchAll(/kid-figure-fact">([^<]*)<\/p>/g)].map((m) => m[1]);
  const short = facts.filter((f) => f && (!f.endsWith("。") || nchars(f) < 5));
  if (short.length) console.warn("WARN short-fact", d.rel, short.slice(0, 6));
  fs.writeFileSync(file, t);
  console.log("OK", d.mode, d.rel, "delta", t.length - orig);
}
console.log("done", PAGES.length);
