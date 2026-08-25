#!/usr/bin/env node
/** Round 17: align idle labs with their stages; insert missing look blocks. No hero/stage JS. */
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
  "防止故事只剩两种可能",
  "只用一个空形容词糊弄三列",
  "指着证据说清机制",
  "对照句说完再写作品",
  "孩子手指的是哪一块结构、读数或行为",
  "哪句听起来聪明却没指向证据",
  "结合本页任务用自己的话再讲一遍",
];

const PAGES = [
  {
    rel: "games/curl-lab.html",
    mode: "full",
    lead: "同一件带刺的软皮：抽紧就收成球，刺尖转到朝外；换成硬板，再怎么抽也摊着。不是忽然多出一把图钉。",
    desc: "软皮曲率随抽紧变；刺角=90−曲率×0.7。硬板曲率恒为 0。离线即可使用。",
    teachT: "同一件刺衣：软皮抽紧成球，硬板再抽也摊着",
    teachB: [
      "先用软皮把抽紧调高，点「抽一下」，看身子收圆、刺尖朝外。再换成硬板，同样抽紧，看曲率还是 0、成不了球。",
      "刺还连在皮上。收成球，是同一张皮被一圈力抽紧，不是换了一件钉满图钉的外套。",
      "园里只远远看。不要摸真刺。本页曲率和刺角是比较尺子。",
    ],
    lookT: "同一件刺衣，先软皮抽成球，再硬板对照",
    lookIntro: [
      "舞台上比的是皮能不能被抽紧。先软皮抽一次，看曲率和刺尖朝哪。再换成硬板抽一次。",
      "完成句写「软皮抽成球」或「硬板抽不动」。不要写「忽然多出一把图钉」。",
    ],
    facts: [
      ["🧥", "软皮", "能抽紧", "一圈力把皮收圆，刺尖转到朝外。"],
      ["🪵", "硬板", "曲率钉死", "再怎么抽，刺只能竖着摊开。"],
      ["📐", "刺角", "本页尺子", "刺角等于 90 减去曲率乘 0.7。"],
      ["🧷", "刺还连着", "根在皮上", "没有掉下来，也没有新长一把。"],
      ["🚫", "多出图钉", "否决", "不是换了一件钉满钉的外套。"],
      ["⚠️", "真刺", "别摸", "园里只远远看，本页用模型。"],
    ],
    steps: [
      { b: "软皮抽紧。", t: "看曲率和刺尖朝哪。" },
      { b: "硬板再抽。", t: "曲率还是不是 0。" },
      { b: "摊开对照。", t: "抽紧调到 0，刺角回到平摊。" },
      { b: "写完成句。", t: "不是忽然多出图钉。" },
    ],
    ages: [
      "软皮一抽就收成球，刺尖朝外；硬板再抽也摊着。",
      "同一张皮被一圈力抽紧，刺跟着转到朝外。硬板不让折，曲率被钉成 0。",
      "曲率随抽紧率上升；刺角=90−曲率×0.7 是示意映射。硬板把曲率约束为 0，作阴性对照。",
    ],
    teachNote: "孩子应能对软皮抽紧和硬板各报成球或摊开，并否定「忽然多出一把图钉」。",
    miniAsk: ["软皮抽紧刺尖朝哪？", "硬板能成球吗？", "摊开时刺角怎样？", "是多出图钉吗？"],
    deepT: "刺尖朝外，是皮被抽圆以后带着转，不是刺自己会瞄准",
    deepB: [
      "抽紧率调到 0，曲率回到 0，刺角回到平摊。同一件衣，只改抽多紧。",
      "豪猪刺更长，有的会掉；犰狳靠骨板折。本页先交「软皮抽得动」。",
      "不要摸真刺。本页不是宠物课。",
      "曲率和刺角是示意尺子，不是某只刺猬的测量报告。",
    ],
    deepFacts: [
      ["🔄", "摊开", "抽紧为 0", "刺角回到平摊，球散开。"],
      ["🦔", "豪猪", "另一套", "刺更长，有的会掉，身子收不了这么圆。"],
      ["⚠️", "真刺", "别摸", "园里只远远看。"],
      ["📏", "读数", "示意", "不是某只刺猬的体检表。"],
    ],
    fieldT: "对照：软皮成球 · 硬板摊开 · 忽然多出图钉",
    fieldB: [
      "同一件刺衣，只改皮软不软、抽多紧。",
      "软皮抽紧：收成球，刺尖朝外。",
      "硬板：曲率钉成 0，成不了球。",
      "「多出图钉」整列划掉：刺还连在原来那张皮上。",
    ],
    fieldFacts: [
      ["🟢", "软皮抽紧", "成球", "刺尖转到朝外。"],
      ["🟡", "硬板", "摊开", "再抽也折不了。"],
      ["🔴", "多出图钉", "整列划掉", "没有换一件钉衣。"],
      ["🧷", "刺还连着", "根在皮上", "抽紧只改朝向。"],
    ],
    moreT: "回家只记「软皮抽成球」，不记药水口令",
    moreB: [
      "画两格：软皮收圆刺朝外，硬板摊平刺竖着。",
      "口头说「刺还连着」。多出图钉那句用来否决。",
      "不要摸真刺。热夹和烫剂不归本页。",
    ],
    moreFacts: [
      ["✏️", "两格", "球和摊", "先画下来对照。"],
      ["🗣️", "口令", "软皮抽成球", "这句话可以带走。"],
      ["🚫", "多出图钉", "否决句", "这句话整列划掉。"],
      ["⚠️", "真刺", "别摸", "园里只远远看。"],
    ],
    asks: [
      "软皮抽紧时孩子指的是身子收圆，还是「它生气了所以变成球」？",
      "硬板抽不动，哪一句能给四岁听？",
      "多出图钉为什么是错的完成句？",
      "摸真刺的红线怎么说？",
      "本页能当宠物饲养课吗？",
    ],
    whys: [
      "刺猬皮下环肌收缩，把可变形的皮肤收成近似球面，着生在皮肤上的棘随之改变朝向，尖端转向外侧。硬板把曲率约束为 0，抽紧输入无法变成宏观弯曲。棘仍附着，不是额外长出的钉。",
      "不要摸真刺。舞台是软皮与硬板示意。",
    ],
  },
  {
    rel: "games/jump-lab.html",
    mode: "insert",
    teachT: "同一只模型蛙：折几格就跳几格远，伸直弹不起来",
    teachB: [
      "先把折数调到 0，点「蹬！」，看它原地晃。再折深蹬一次，看落点往前走。本页每折 1&nbsp;格换 2&nbsp;格远。",
      "短腿蛙和长腿蛙都只折 3&nbsp;格，跳得一样远。长腿的本事是最多能折 8&nbsp;格，不是腿有魔法。",
      "不要抓真青蛙。湿皮肤很薄。本页格数是比较尺子。",
    ],
    lookT: "同一只模型蛙，先伸直蹬一次，再折深蹬一次",
    lookIntro: [
      "舞台上比的是腿折了几格。先伸直（0&nbsp;格跑道）蹬一次，再折深蹬一次，看落点。",
      "完成句写「折深跳得远」或「伸直弹不起来」。不要写「腿有魔法」。",
    ],
    facts: [
      ["🦵", "先折", "有跑道", "折起来的那几格，是蹬地加速的路。"],
      ["🚀", "再蹬", "一下子放", "腱被拉长以后，伸直就把人送出去。"],
      ["📏", "每折 1&nbsp;格", "换 2&nbsp;格远", "本页把「路越长飞越远」画成整数。"],
      ["🪵", "一直伸直", "0&nbsp;格跑道", "没有先存，就弹不起来。"],
      ["🚫", "魔法腿", "否决", "同样折 3&nbsp;格，短腿长腿一样远。"],
      ["⚠️", "真蛙", "别抓", "湿皮肤很薄，本页用模型。"],
    ],
    steps: [
      { b: "伸直蹬一次。", t: "看它是不是原地晃。" },
      { b: "折深再蹬。", t: "记下跳了几格。" },
      { b: "可换腿长。", t: "同样折 3&nbsp;格，远近一样吗。" },
      { b: "写完成句。", t: "不是腿有魔法。" },
    ],
    ages: [
      "先蹲一下再跳，就像先把弹簧压紧再松手。伸直就跳，弹不起来。",
      "折得越深，腱被拉得越长，飞得越远。同样折 3&nbsp;格，短腿和长腿一样远。",
      "弹性势能先存在被拉长的腱里，再转成动能。本页距离=折格×2 是示意。真实肌肉在过深蹲位会发不上力。",
    ],
    teachNote: "孩子应能对伸直和折深各报落点，并否定「腿有魔法」。",
    miniAsk: ["伸直落在哪？", "折深谁更远？", "同样折 3&nbsp;格呢？", "腿有魔法吗？"],
    deepT: "长腿的价值是能折得更深，不是同样折 3&nbsp;格就更远",
    deepB: [
      "短腿最多折 3&nbsp;格，长腿最多折 8&nbsp;格。要比「谁更能折」，不要比「谁看起来更大」。",
      "落地屈膝是同一根弹簧反着用：把冲击吃进去，有的还能给下一步。",
      "不要抓真青蛙。本页不是捕捉课。",
      "格数是比较尺子，不是某只蛙的跳远纪录。",
    ],
    deepFacts: [
      ["🐸", "短腿", "最多折 3", "折到底也只有 6&nbsp;格远。"],
      ["🦵", "长腿", "最多折 8", "价值是更深的跑道，不是魔法。"],
      ["⚠️", "真蛙", "别抓", "湿皮肤很薄。"],
      ["📏", "格数", "示意", "不是跳远证书。"],
    ],
    fieldT: "对照：折深跳远 · 伸直原地 · 腿有魔法",
    fieldB: [
      "同一只模型蛙，只改折几格。",
      "折深：跳得远。",
      "伸直：原地晃。",
      "「腿有魔法」整列划掉：同样折深就一样远。",
    ],
    fieldFacts: [
      ["🟢", "折深", "跳得远", "跑道更长，腱拉得更开。"],
      ["🟡", "伸直", "原地晃", "0&nbsp;格跑道，没有可放的。"],
      ["🔴", "腿有魔法", "整列划掉", "同样折 3&nbsp;格一样远。"],
      ["🧮", "折格×2", "本页尺子", "先数折了几格。"],
    ],
    moreT: "回家只记「先折再蹬」，不记捕捉口令",
    moreB: [
      "画两只蛙：伸直旁边写停，折深旁边写远。",
      "口头说「每折 1&nbsp;格换 2&nbsp;格远」。魔法腿那句用来否决。",
      "不要抓真青蛙。立定跳远可以自己试三次。",
    ],
    moreFacts: [
      ["✏️", "两只", "停和远", "先画下来对照。"],
      ["🗣️", "口令", "先折再蹬", "这句话可以带走。"],
      ["🚫", "魔法腿", "否决句", "这句话整列划掉。"],
      ["⚠️", "真蛙", "别抓", "湿皮肤很薄。"],
    ],
  },
  {
    rel: "games/water-cycle.html",
    mode: "insert",
    teachT: "同一份 20&nbsp;格水：太阳越大雨越勤，海加天永远是 20",
    teachB: [
      "先把太阳开大，等云攒到 6&nbsp;格下第一场雨。再换一档小太阳，再等一场，比两场之间等了几秒。",
      "水没有消失：海里少几格，天上就多几格，「海&nbsp;+&nbsp;天」一直是 20。把太阳关成 0，循环停摆。",
      "本页格数和秒数是比较尺子，不是某座城市的降水量。",
    ],
    lookT: "同一份水，先开大太阳等一场雨，再关小对照",
    lookIntro: [
      "舞台上比的是太阳开多大。先大太阳等一场雨，再小太阳等一场，盯住海+天是不是 20。",
      "完成句写「太阳越大雨越勤」或「水只是搬家」。不要写「云是新变出来的水」。",
    ],
    facts: [
      ["☀️", "大太阳", "蒸发快", "云更快攒到 6&nbsp;格下雨线。"],
      ["🌤️", "小太阳", "等得更久", "循环还在转，只是更慢。"],
      ["🔢", "海+天", "永远 20", "水搬家，一格都不会少。"],
      ["☁️", "云量计", "6&nbsp;格下雨", "攒够了才落，不是心情决定。"],
      ["🚫", "新变出来", "否决", "云里的水本来在海里。"],
      ["🛑", "关掉太阳", "循环停", "已有的云下完就放晴。"],
    ],
    steps: [
      { b: "开大太阳。", t: "等一场雨，记下秒数。" },
      { b: "换小太阳。", t: "再等一场，对比间隔。" },
      { b: "盯海+天。", t: "是不是一直 20&nbsp;格。" },
      { b: "写完成句。", t: "不是云新变出来。" },
    ],
    ages: [
      "太阳把水晒上天，冷了再落下来。水一直在旅行，从来没丢过。",
      "太阳开得越大，蒸发越快，雨来得越勤。海加云一直是 20&nbsp;格。",
      "循环的发动机是太阳。总量守恒；空中停留短、海里停留长。本页 20&nbsp;格和 6&nbsp;格线是示意。",
    ],
    teachNote: "孩子应能对大太阳和小太阳各报下雨快慢，并指出海+天守恒，否定「云是新变出来的」。",
    miniAsk: ["大太阳雨怎样？", "海+天是几格？", "关掉太阳云怎样？", "云是新变的吗？"],
    deepT: "关掉太阳，已有的云会下完，不会自己越长越大",
    deepB: [
      "蒸发停了，天上那份水还在。它下完或散完，天空就放晴。",
      "窗台上用热水、保鲜膜和冰块，也能看见蒸发、凝结、落下。热水只许大人倒。",
      "本页不是天气预报发布。",
      "真实大气里风会把云搬走，本页不画这条支线。",
    ],
    deepFacts: [
      ["🛑", "太阳 0", "不再蒸发", "已有的云下完就放晴。"],
      ["🥤", "冰水杯", "同族", "外面水珠来自空气里的汽。"],
      ["⚠️", "热水", "大人倒", "窗台小雨实验要看着。"],
      ["📡", "预报", "不当", "只练搬家和守恒。"],
    ],
    fieldT: "对照：大太阳雨勤 · 海+天=20 · 云是新变出来的",
    fieldB: [
      "同一份 20&nbsp;格水，只改太阳。",
      "大太阳：雨来得勤。",
      "海+天：永远 20。",
      "「新变出来」整列划掉：水只是搬家。",
    ],
    fieldFacts: [
      ["🟢", "大太阳", "雨更勤", "蒸发更快，云更快满。"],
      ["🟡", "海+天", "还是 20", "少在海就多在天。"],
      ["🔴", "新变出来", "整列划掉", "没有无中生有的水。"],
      ["☁️", "6&nbsp;格线", "才下雨", "攒够了才落下来。"],
    ],
    moreT: "回家只记「水搬家、太阳是发动机」，不记气象术语",
    moreB: [
      "画一圈：海→汽→云→雨→海，旁边写 20。",
      "口头说「海加天永远是 20」。新变出来那句用来否决。",
      "湿袜子干了，水去了空气里，不是消失。",
    ],
    moreFacts: [
      ["✏️", "一圈", "海云雨海", "旁边写同一个 20。" ],
      ["🗣️", "口令", "水只是搬家", "这句话可以带走。"],
      ["🚫", "新变出来", "否决句", "这句话整列划掉。"],
      ["🧦", "湿袜子", "水去空气", "第二天干了不是丢了。"],
    ],
  },
  { rel: "games/oil-lab.html", mode: "title", teachT: "同一根羽毛：有薄油水成珠，洗掉油就钻进去" },
  { rel: "games/sticky-lab.html", mode: "title", teachT: "同一只吸盘：密封能挂住，漏气就掉" },
  { rel: "games/denticle-lab.html", mode: "title", teachT: "同一张皮：顺着摸更滑，反过来挂；光滑两头差不多" },
  { rel: "games/holdfast-lab.html", mode: "title", teachT: "同一只爪：楔进糙缝能抓住，滑面或掀边就掉" },
  { rel: "nature/weather.html", mode: "title", teachT: "同一时刻记下云、风、气压，过一会儿再对照" },
  { rel: "nature/kangaroos.html", mode: "title", teachT: "慢走时尾巴撑地，弹起来时腱先压再还" },
];

function insertAfterTeach(t, blocks) {
  const re = /<section\b[^>]*aria-labelledby="teachWhatTitle"[^>]*>[\s\S]*?<\/section>/m;
  const m = t.match(re);
  if (!m) throw new Error("no teach to insert after");
  return t.replace(re, m[0] + "\n\n" + blocks);
}

function nchars(s) {
  return s.replace(/[。、，]/g, "").length;
}

for (const d of PAGES) {
  const file = path.join(ROOT, d.rel);
  let t = fs.readFileSync(file, "utf8");
  const orig = t.length;
  if (d.lead) {
    t = t.replace(/<p class="lead">[\s\S]*?<\/p>/, `<p class="lead">${d.lead}</p>`);
  }
  if (d.desc) {
    t = t.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${d.desc}">`);
  }
  if (d.mode === "title") {
    t = t.replace(/<h2 id="teachWhatTitle">[^<]*<\/h2>/, `<h2 id="teachWhatTitle">${d.teachT}</h2>`);
  } else if (d.mode === "insert") {
    t = replaceSection(t, "teachWhatTitle", teach(d));
    if (!t.includes('id="lookTitle"')) {
      t = insertAfterTeach(t, [look(d), deep(d), field(d), more(d)].join("\n\n"));
    } else {
      for (const [id, make] of [
        ["lookTitle", look],
        ["deepTitle", deep],
        ["fieldTitle", field],
        ["moreTitle", more],
      ]) {
        if (t.includes(`aria-labelledby="${id}"`) || t.includes(`id="${id}"`)) t = replaceSection(t, id, make(d));
      }
    }
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
  if (/kid-figure-art"[^>]*>[①②③]/.test(t)) console.warn("WARN circled", d.rel);
  const facts = [...t.matchAll(/kid-figure-fact">([^<]*)<\/p>/g)].map((m) => m[1]);
  const short = facts.filter((f) => f && (!f.endsWith("。") || nchars(f) < 5));
  if (short.length) console.warn("WARN short-fact", d.rel, short.slice(0, 6));
  fs.writeFileSync(file, t);
  console.log("OK", d.mode, d.rel, "delta", t.length - orig);
}
console.log("done", PAGES.length);
