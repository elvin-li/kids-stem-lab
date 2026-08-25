#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");

const HEADINGS = {
  "nature/clouds.html": "看得见云，不等于马上会下雨",
  "nature/hummingbirds.html": "悬停耗能高，花蜜要及时补",
  "nature/woodpeckers.html": "头能敲，是因为有缓冲，不是骨头更硬",
  "nature/squids.html": "水往后喷，身子才往前走",
  "nature/soil.html": "土是活的层，挖完要填回去",
  "nature/owls.html": "脸盘把声音收进来，不是为了好看",
  "nature/otters.html": "毛里的空气比脂肪更先保暖",
  "nature/frost.html": "霜长在物体上，不是从天上掉下来",
  "nature/fireflies.html": "冷光几乎不发热，手电筒会盖住它",
  "nature/albatross.html": "远洋滑翔靠借风，落地才显得笨",
  "games/screw-lab.html": "转圈是为了把力换成前进",
  "games/incline-lab.html": "坡越缓，同样高度要走更长的路",
};

const REPLACES = [
  ["nature/hail.html", "    <p>「30&nbsp;秒」用不间断空格。</p>", "    <p>看三十秒就够：先找掩体，再谈冰雹怎么一层层冻。</p>"],
  ["nature/hail.html", "<p class=\"kid-figure-fact\">「30&nbsp;秒」用不间断空格。</p>", "<p class=\"kid-figure-fact\">命比样本重要：遇雹先躲，不要蹲着捡冰雹。</p>"],
  ["nature/hummingbirds.html", "    <p>记录「2&nbsp;分钟」「2–3&nbsp;天」用不间断空格。</p>", "    <p>看两分钟悬停；喂食器若要换水，隔两三天一次，不要加染料。</p>"],
  ["nature/hummingbirds.html", "<p class=\"kid-figure-fact\">染料：记录「2&nbsp;分钟」「2–3&nbsp;天」用不间断空格。</p>", "<p class=\"kid-figure-fact\">糖水不要加食用色素，鸟喝下去，人却只是为了好看。</p>"],
  ["nature/mangroves.html", "    <p>记录里写「3&nbsp;分钟」用不间断空格，并附「涨/落」标签。</p>", "    <p>看三分钟，并记下此刻是涨潮还是落潮。</p>"],
  ["nature/moss.html", "    <p>记录「2&nbsp;分钟」用不间断空格，附「阴/干」标签。</p>", "    <p>看两分钟，并记下这里是阴湿还是已经干了。</p>"],
  ["nature/moss.html", "<p class=\"kid-figure-fact\">记录「2&nbsp;分钟」用不间断空格，附「阴/干」标签。</p>", "<p class=\"kid-figure-fact\">青苔地滑，成人陪同；看完记下阴湿还是干，不要撕走。</p>"],
  ["nature/woodpeckers.html", "    <p>「90&nbsp;秒」用不间断空格写入日志。</p>", "    <p>听大约九十秒，把短促连击和较长凿击分开数。</p>"],
  ["nature/woodpeckers.html", "<p class=\"kid-figure-fact\">「90&nbsp;秒」用不间断空格写入日志。</p>", "<p class=\"kid-figure-fact\">九十秒只听两类敲击，不要回放录音去逗它。</p>"],
  ["nature/trees.html", "    <p>不环剥活树；「5&nbsp;分钟」「1&nbsp;处」用不间断空格。</p>", "    <p>不环剥活树。五分钟里只标一处宽轮、一处窄轮。</p>"],
  ["nature/squids.html", "    <p>「30&nbsp;秒」用不间断空格写入观察笔记。</p>", "    <p>看三十秒视频，数喷流次数，记下漏斗朝哪。</p>"],
  ["nature/squids.html", "<p class=\"kid-figure-fact\">「30&nbsp;秒」用不间断空格写入观察笔记。</p>", "<p class=\"kid-figure-fact\">三十秒只数喷水，不要把墨汁当成写字墨。</p>"],
  ["nature/soil.html", "    <p>「5&nbsp;分钟」「10&nbsp;厘米」用不间断空格。</p>", "    <p>只挖大约十厘米，看五分钟，填回并压实。</p>"],
  ["nature/soil.html", "<p class=\"kid-figure-fact\">5&nbsp;分钟：「5&nbsp;分钟」「10 厘米」用不间断空格。</p>", "<p class=\"kid-figure-fact\">五分钟只看这一小坑，看完填回，不要装走当纪念品。</p>"],
  ["nature/skunks.html", "    <p>「60&nbsp;秒」用不间断空格，强调冷静时长而非精确计时。</p>", "    <p>先停大约一分钟再退，重点是冷静，不是掐秒表。</p>"],
  ["nature/skunks.html", "<p class=\"kid-figure-fact\">「60&nbsp;秒」用不间断空格，强调冷静时长而非精确计时。</p>", "<p class=\"kid-figure-fact\">家里四步卡：停、退、侧身、关门。先冷静，再计时。</p>"],
  ["nature/rivers.html", "    <p>笔记写「5&nbsp;分钟」用不间断空格；连漂移实验页只借「相对流」直觉。</p>", "    <p>岸上看五分钟漂浮物怎么走；真河里不要投东西测流。</p>"],
  ["nature/rivers.html", "<p class=\"kid-figure-fact\">笔记写「5&nbsp;分钟」用不间断空格。</p>", "<p class=\"kid-figure-fact\">真河里不投瓶、不投叶测流，只在岸上看谁漂得快。</p>"],
  ["nature/pinecones.html", "    <p>树脂粘手洗手即可，勿抹眼鼻；「1&nbsp;句红线」用不间断空格。</p>", "    <p>树脂粘手就洗手，不要抹眼鼻。红线只写一句：不采活枝。</p>"],
  ["nature/owls.html", "    <p>笔记写「60&nbsp;秒」「3&nbsp;次」均用不间断空格。</p>", "    <p>听一分钟，记下三次转头：它在用脸盘对准声音。</p>"],
  ["nature/owls.html", "<p class=\"kid-figure-fact\">笔记写「60&nbsp;秒」「3&nbsp;次」均用不间断空格。</p>", "<p class=\"kid-figure-fact\">一分钟里看三次转头就够，不要播放叫声逗它。</p>"],
  ["nature/otters.html", "    <p>「90&nbsp;秒」用不间断空格。</p>", "    <p>看九十秒：它是在搓毛，还是在用石头开壳。</p>"],
  ["nature/otters.html", "<p class=\"kid-figure-fact\">「90&nbsp;秒」用不间断空格。</p>", "<p class=\"kid-figure-fact\">九十秒只看一件事：搓毛保暖，还是石头当工具。</p>"],
  ["nature/otters.html", "<p class=\"kid-figure-fact\">投喂：「90&nbsp;秒」用不间断空格。</p>", "<p class=\"kid-figure-fact\">岸边不投喂。食物会改它靠近人的习惯。</p>"],
  ["nature/octopuses.html", "    <p>笔记写「90&nbsp;秒」「2&nbsp;次」均用不间断空格；连乌贼页对照喷流。</p>", "    <p>看九十秒，记下两次吸盘贴住：靠压差，不是胶水。</p>"],
  ["nature/octopuses.html", "<p class=\"kid-figure-fact\">笔记写「90&nbsp;秒」「2&nbsp;次」均用不间断空格。</p>", "<p class=\"kid-figure-fact\">吸盘靠压差贴住，不是胶水。乌贼页的喷流是另一件事。</p>"],
  ["nature/fireflies.html", "    <p>「2&nbsp;分钟」用不间断空格。</p>", "    <p>看两分钟闪光，并记下日期和大概温度。</p>"],
  ["nature/fireflies.html", "<p class=\"kid-figure-fact\">「2&nbsp;分钟」用不间断空格。</p>", "<p class=\"kid-figure-fact\">闪光和当天冷热有关，记下日期，不要用手电对着扫。</p>"],
  ["nature/feathers.html", "    <p>「5&nbsp;分钟」「1&nbsp;例」用不间断空格；连鸟飞行页对照升力。</p>", "    <p>五分钟画一根羽轴和两侧羽片；升力去鸟飞行页对照。</p>"],
  ["nature/feathers.html", "<p class=\"kid-figure-fact\">「5&nbsp;分钟」「1 例」用不间断空格。</p>", "<p class=\"kid-figure-fact\">只画一例：中间羽轴、两边羽片，不要画成一根毛。</p>"],
  ["nature/elephants.html", "    <p>不投喂、不敲栏；笔记写「4&nbsp;分钟」「1&nbsp;次」用不间断空格。</p>", "    <p>不投喂、不敲栏。四分钟里卷、吸、推各记一次。</p>"],
  ["nature/dragonflies.html", "    <p>笔记写「3&nbsp;分钟」用不间断空格；成人陪同防滑。</p>", "    <p>水边看三分钟，成人陪同防滑；成虫和幼虫分开记。</p>"],
  ["nature/dragonflies.html", "<p class=\"kid-figure-fact\">笔记写「3&nbsp;分钟」用不间断空格。</p>", "<p class=\"kid-figure-fact\">成虫在空中停，幼虫在水里猎，三分钟里分开写，不要混成一只。</p>"],
  ["nature/chameleons.html", "    <p>笔记写「2&nbsp;分钟」用不间断空格；连扑击/弹出实验页只借「储能释放」。</p>", "    <p>看两分钟变色：是情绪还是温度，先猜再核对。</p>"],
  ["nature/chameleons.html", "<p class=\"kid-figure-fact\">社会色：笔记写「2&nbsp;分钟」用不间断空格。</p>", "<p class=\"kid-figure-fact\">有的颜色是给同伴看的信号，不是为了躲进树叶。</p>"],
  ["nature/albatross.html", "    <p>「4&nbsp;分钟」「3&nbsp;项」用不间断空格。</p>", "    <p>四分钟写出三项减塑：少袋、少吸管、海边带走垃圾。</p>"],
  ["games/prism-lab.html", "    <p>光源保持弱；「2&nbsp;句」「1&nbsp;个」用不间断空格。</p>", "    <p>光源保持弱。两句话、一次只改一个参数。</p>"],
  ["games/drift-lab.html", "    <p>「≥3&nbsp;次」用不间断空格写进记录表头。</p>", "    <p>至少重复三次再谈分布，一次落下说明不了风。</p>"],
  ["games/code-cards.html", "    <p>每轮写&nbsp;2&nbsp;句「预测—结果」；「3&nbsp;轮」「1&nbsp;张」「2&nbsp;句」用不间断空格。</p>", "    <p>三轮里每轮只改一张卡，并写两句：预测和结果。</p>"],
];

let n = 0;
for (const [rel, title] of Object.entries(HEADINGS)) {
  const file = `${ROOT}/${rel}`;
  let html = readFileSync(file, "utf8");
  const next = html.replace(/>加厚：专属机制补充</g, `>${title}<`);
  if (next !== html) {
    writeFileSync(file, next);
    n += 1;
  }
}
for (const [rel, from, to] of REPLACES) {
  const file = `${ROOT}/${rel}`;
  let html = readFileSync(file, "utf8");
  if (!html.includes(from)) {
    console.log("miss", rel, from.slice(0, 40));
    continue;
  }
  writeFileSync(file, html.replace(from, to));
  n += 1;
}
console.log("patched", n);
