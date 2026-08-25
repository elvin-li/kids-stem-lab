#!/usr/bin/env node
/**
 * 清掉加厚脚本留下的套话与一字事实。
 * 只改 .kid-figure-fact / 明显英文残词，不动舞台按钮文案。
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const SUFFIX = /——结合本页任务用自己的话再讲一遍。?/g;
const META = /数字和单位写一起。/;

const BY_CAP = {
  "≠看见": "鸭嘴在浑水里靠电感觉找虾，不是靠眼睛盯着看。",
  "通道": "电感觉和视觉走两条路：浑了还能探，亮了才用眼。",
  "反照": "新雪孔隙多，阳光被来回散射，所以刺眼地亮。",
  "气隙": "孔隙里的空气导热差，地热散得慢，雪像一层毯子。",
  "分开写": "亮和暖是两件事：踩实后孔隙少，两套效果都会变。",
  "保温页": "脂肪页也是空气夹层在隔热，材料不同、道理同类。",
  "久躺雪": "在雪里躺太久会失温，看完就起来，不要当床。",
  "冰面": "不知道多厚的冰面不要踩、不要当滑梯。",
  "雪": "雪晶主要在空中生长，落下时常常带着六枝。",
  "霜": "霜贴在窗、草、土上直接凝华，不是从云里掉下来。",
  "雹": "冰雹在强对流云里反复升降，外壳硬，会砸伤人。",
  "在哪": "各写一句：雪在空中、霜在物体表面、雹在雷雨云里。",
  "雹砸人": "遇雹先找屋顶或车内，不要仰头看热闹。",
  "路径": "外形跟着生长路径走，不是三种冰随便换装。",
  "黑布": "黑绒布反差大，六枝才看得清。",
  "2\u00a0分钟": "接雪大约两分钟就够，看完六枝就进屋。",
  "放大": "放大镜认六枝，不要把雪捏化了再看。",
  "无雪": "没下雪就看可靠显微照片，同样能认六枝。",
  "陪同": "成人陪同、戴手套、靠边站，不要为拍照停在车道。",
  "车道": "车道中央为了看雪停步很危险。",
  "换安全": "哨兵换岗，大家轮流抬头，不是一只猫永远站岗。",
  "保护+能动": "甲片能挡咬，关节还能让它跑和蜷，不是一块死铁。",
  "≠立刻死": "白化是虫被赶跑，珊瑚还活着，但饿得很快。",
  "次声": "有些声音人耳听不到，象群仍能用它协调走动。",
  "足迹": "脚印和粪便能读方向、数量，不必靠近野象。",
  "三词": "象鼻、人臂、犀角各写：材料、有没有骨、主要干什么。",
  "实例": "记下卷、吸、推各一次，再说哪次更像手、哪次更像鼻子。",
  "4\u00a0分钟": "看四分钟就停：只记象鼻三种动作，不追整部片子。",
  "海域": "信天翁多在远洋，海鸥多在近岸，各写一句遇见的地方。",
  "差异点": "两套卡片从哪一步开始分叉，先圈出那一张。",
  "只改一": "一次只换一张卡，否则分不清是顺序错还是方向错。",
  "预测": "先写下尖端和钝端谁先亮，再摩擦对照。",
  "示踪词": "叶、纸、泡沫各写一个词：跟水走、跟风走、还是乱跳。",
  "完成句": "用自己的话写完机制，不要只抄标题。",
  "动词": "每张对照卡只留一个动作词，方便以后复查。",
  "昆虫": "舌头弹出去的时机，要对上昆虫停在哪。",
  "海洋页": "潮池是小尺度的海，机制和大海页能对上。",
  "变态": "尾巴缩短、四肢长出，同一只蛙换呼吸和行动方式。",
  "弹簧": "后腿先压再弹，能量先存后放。",
  "季节": "年轮宽窄跟着那年的水热走，不是装饰花纹。",
  "绒羽": "绒羽留空气保暖，不负责把鸟托起来。",
  "功能": "飞羽、绒羽、正羽各写一个用途，不要混成「都是毛」。",
  "尺度": "溪、河、河口各写一个能看见的差别。",
  "线索": "每张对照卡留一个能复查的词，下次还能对上。",
  "支撑": "尾羽当撑杆，爪扣树皮，头才能安心敲。",
  "幼/食": "幼虫在水里吃什么、成虫在空中吃什么，分开写。",
  "幼/动": "蝌蚪怎么游、成蛙怎么跳，各写一个动作。",
  "食/胁": "吃什么、怕什么，各写一句，不要并成一句糊。",
  "教训句": "靠近臭鼬时先停、再退，用自己的话写一条。",
  "材料词": "翼膜是皮，不是羽毛；各写一个材料词。",
  "呼吸/手": "鳃和肺怎么换、手能不能探水，分开写。",
  "不确定": "没看清就写「不确定」，不要猜成肯定句。",
  "工具词": "舌头、脖子、心脏各写一个「用来干什么」。",
  "动作词": "竖刺、转身、倒退各写一个，不要写成「会自卫」。",
  "加粗": "年轮、导管、叶片各圈一个词，下次还能指认。",
  "纲足": "蟹是十足目：步足走路，螯足夹，不要数成昆虫六足。",
  "贡献": "落叶、根、蚯蚓各写一句：给土壤留下什么。",
};

const BY_PAGE_CAP = {
  "nature/elephants.html|投喂": "栏外不喂，野象更不能喂，食物会改它找人的习惯。",
  "nature/elephants.html|哺乳": "象是胎生哺乳，和鸟下蛋养法不同。",
  "nature/elephants.html|来源": "纪录片要看拍摄说明，摆拍不能当成野外唯一样子。",
  "nature/elephants.html|象鼻": "上唇和鼻子长在一起，里面没有骨头，却能卷、吸、推。",
  "nature/elephants.html|人臂": "骨头加关节，精细动作靠手指对握。",
  "nature/elephants.html|犀角": "犀角是角蛋白，不是门齿，和象牙材料完全不同。",
  "nature/elephants.html|混": "先问材料，再比形状，避免把三种「长东西」说成一种。",
  "nature/elephants.html|象牙": "象牙是门齿一直在长，不是角，更不是装饰品。",
  "nature/elephants.html|各1\u00a0次": "卷、吸、推各记一次，三次都看见才算看完。",
  "nature/elephants.html|鼻手": "哪一次更像手在干活，哪一次更像鼻子在闻。",
  "nature/elephants.html|感官": "嗅和触在同一条鼻子上会合，感官页可以对照。",
  "nature/albatross.html|锯齿": "鸟在风梯度里升高再俯冲，轨迹像锯齿，是在借风。",
  "nature/albatross.html|交换": "高度换成速度，速度再换成高度，能量来自风不是凭空变多。",
  "nature/albatross.html|风场": "季节一变，风路就变，觅食路线跟着改。",
  "nature/albatross.html|洋": "海面垃圾也会进鲸的肚子，减塑是两页的共同作业。",
  "nature/albatross.html|能量": "借风不是违反守恒，是把环境里的风能拿走一部分。",
  "nature/albatross.html|信天": "长窄翼适合远洋滑翔，少拍翅也能飞很远。",
  "nature/albatross.html|海鸥": "翼更短更宽，常在近岸捡机会，繁殖也更快。",
  "nature/albatross.html|投喂": "海边垃圾会改海鸥的习惯，信天翁也会误食塑料。",
  "nature/albatross.html|翼形": "先比长窄还是短宽，再谈谁更能借风。",
  "nature/albatross.html|减塑": "少把塑料带进海里，雏鸟胃里才不会装满却饿死。",
  "nature/albatross.html|清单": "家里减塑写三项：少袋、少吸管、海边带走垃圾。",
  "nature/albatross.html|一句": "塑料怎么从岸边进到海鸟胃里，用自己的话写一句。",
  "nature/albatross.html|喂鸥": "喂海鸥会让它追人、抢食，也不是在帮信天翁。",
  "nature/albatross.html|捡垃圾": "戴手套、成人看着，只捡安全的干垃圾。",
  "nature/albatross.html|海洋": "海洋页讲的塑料路径，和这页雏鸟误食是同一条链。",
};

const STUBS = new Set([
  "写。", "连。", "表头。", "整段。", "协调。", "监测。", "完成。", "迁移", "迁移。",
  "nbsp。", "记录。", "栏。", "分工。", "嗅触。", "胎生。", "健康。", "多功能。",
  "对握。", "非牙。", "先材料。", "再强调。", "借风。", "句/图。", "变。", "塑料。",
  "不违背。", "滑翔。", "机会。", "垃圾。", "关键。", "共享。", "减塑。", "海鸟。",
  "活动。", "监督。", "切。", "改一。", "跑前。", "不混。", "实体。", "调试。",
  "难复现。", "另课。", "先语义。", "本页。", "修。", "安全。", "固定。",
]);

function expandFromCap(cap, sub, page) {
  const key = `${page}|${cap}`;
  if (BY_PAGE_CAP[key]) return BY_PAGE_CAP[key];
  if (BY_CAP[cap]) return BY_CAP[cap];
  const plain = cap.replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ");
  if (/分钟|秒|日/.test(plain)) {
    return `用这段时间只看一件和「${sub || cap}」有关的事，看完用自己的话记下。`;
  }
  if (/次/.test(plain)) {
    return `做满次数再比较，数字和「次」写在同一格。`;
  }
  if (/厘米|毫米|米/.test(plain)) {
    return `量到这个长度就停，数字贴着单位，中间不要断开。`;
  }
  if (sub && sub.length >= 2 && sub !== "计时" && sub !== "完成" && sub !== "各一") {
    return `${cap}要落到「${sub}」上，用自己的话写成一句完整观察。`;
  }
  return `${cap}用自己的话写成一句完整观察，不要只留一个词。`;
}

function patchFact(fact, cap, sub, page) {
  let text = fact.replace(SUFFIX, "").trim();
  if (!text || text === "一句" || text === "两句" || text === "气层" || text === "失温" || text === "不玩"
    || text === "生长" || text === "凝华" || text === "硬" || text === "完成" || text === "躲"
    || text === "外形" || text === "看" || text === "限" || text === "认" || text === "可"
    || text === "安全" || text === "站" || /^[\u4e00-\u9fff]{1,2}$/.test(text)) {
    return expandFromCap(cap, sub, page);
  }
  if (META.test(text) || text === "数字和单位写一起。") {
    return expandFromCap(cap, sub, page);
  }
  if (STUBS.has(text) || STUBS.has(text + "。") || text.length <= 3) {
    return expandFromCap(cap, sub, page);
  }
  if (!text.endsWith("。") && !text.endsWith("！") && !text.endsWith("？")) text += "。";
  return text;
}

const FIGURE_RE = /<div class="kid-figure">([\s\S]*?)<\/div>/g;

function patchHtml(html, page) {
  return html.replace(FIGURE_RE, (block) => {
    const cap = (block.match(/kid-figure-cap">([\s\S]*?)<\//) || [])[1];
    const sub = (block.match(/kid-figure-sub">([\s\S]*?)<\//) || [])[1];
    return block.replace(/<p class="kid-figure-fact">([\s\S]*?)<\/p>/, (_, fact) => {
      if (!cap) return _;
      const next = patchFact(fact, cap.replace(/<[^>]+>/g, ""), (sub || "").replace(/<[^>]+>/g, ""), page);
      return `<p class="kid-figure-fact">${next}</p>`;
    });
  });
}

const ENGLISH = [
  [/动态 soaring/g, "动态滑翔"],
  [/谈 soaring。/g, "谈滑翔。"],
  [/starvation with full stomach/g, "胃里装满塑料却饿死"],
  [/飞行 energetics/g, "飞行能量"],
  [/拒 souvenir 式采集/g, "不要当纪念品挖走"],
  [/避 predator/g, "躲开捕食者"],
  [/干扰 predator 嗅觉/g, "干扰捕食者嗅觉"],
  [/暴露于 predator/g, "暴露给捕食者"],
  [/告诉 predator/g, "告诉捕食者"],
  [/dirty feeder/g, "脏喂食器"],
];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (name.name.startsWith(".") || name.name === "node_modules" || name.name === "deploy") continue;
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p, acc);
    else if (name.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

let files = 0;
let facts = 0;
for (const file of walk(ROOT)) {
  const rel = file.slice(ROOT.length + 1);
  if (rel.startsWith("semantic-review/")) continue;
  let html = readFileSync(file, "utf8");
  const before = html;
  html = patchHtml(html, rel);
  for (const [re, to] of ENGLISH) html = html.replace(re, to);
  if (html !== before) {
    writeFileSync(file, html);
    files += 1;
    facts += (before.match(/结合本页任务|数字和单位写一起|kid-figure-fact">(?:写|连|完成|协调|监测)。/g) || []).length;
  }
}
console.log(`updated ${files} files`);
