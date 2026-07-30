/* 少儿数理启蒙 · 共享童趣资料
   Classic script；支持 file://，不依赖 fetch、module 或第三方资源。 */
window.PLAYFUL = {
  version: 1,
  characters: [
    { id: "miao", name: "妙妙", emoji: "🐱", role: "提问伙伴", color: "#f472b6", motto: "先猜一猜，再动手看看。" },
    { id: "bo", name: "波波", emoji: "🐳", role: "观察伙伴", color: "#22d3ee", motto: "慢慢看，变化里藏着线索。" },
    { id: "guo", name: "果果", emoji: "🦊", role: "记录伙伴", color: "#fb923c", motto: "把发现画下或写下来吧。" },
    { id: "xing", name: "星星", emoji: "🐰", role: "解释伙伴", color: "#a78bfa", motto: "用自己的话讲清楚，就是新发现。" }
  ],
  ageTones: {
    "all": { label: "自然语气", lead: "试试看", detail: "说说你看见了什么。" },
    "4-6": { label: "亲子共玩", lead: "一起玩一玩", detail: "可以指一指、画一画，答案不用很长。" },
    "7-9": { label: "小小探究", lead: "先猜再验证", detail: "记录一个变化，并说出你的理由。" },
    "10-12": { label: "独立挑战", lead: "设计一次公平测试", detail: "控制变量，用证据解释结论。" }
  },
  workTypes: [
    { id: "observation", label: "观察记录", emoji: "🔎", prompt: "写下看见的变化或数据。" },
    { id: "prediction", label: "预测卡", emoji: "💭", prompt: "先写预测，再补上验证结果。" },
    { id: "drawing", label: "发现画", emoji: "🎨", prompt: "用图画标出重要部分。" },
    { id: "model", label: "模型说明", emoji: "🧩", prompt: "介绍你搭建或制作的模型。" },
    { id: "explanation", label: "我的解释", emoji: "💡", prompt: "用自己的话解释为什么。" },
    { id: "photo-note", label: "照片备注", emoji: "📷", prompt: "本站只保存照片的文字说明，不保存图片本身。" }
  ],
  pages: {
    "games/number-blocks.html": {
      companion: "miao", sticker: { id: "ten-builder", label: "凑十建筑师", emoji: "🧱" },
      surprises: ["闭上眼摸出几块积木，再猜数量。", "用两种颜色摆出 10，交换颜色再解释。", "找一个不用逐个数就能看出数量的摆法。"]
    },
    "games/fraction-lab.html": {
      companion: "guo", sticker: { id: "fraction-chef", label: "分数主厨", emoji: "🍕" },
      surprises: ["找两个看起来不同但一样大的分数。", "先遮住图形，只看数轴猜哪个分数更大。", "画一份能公平分给三个人的点心。"]
    },
    "games/pattern-machine.html": {
      companion: "xing", sticker: { id: "rule-detective", label: "规律侦探", emoji: "⚙️" },
      surprises: ["设计一条会让别人猜错一次的规则。", "只给两个例子，看看线索够不够。", "用一句话和一个算式分别描述同一条规则。"]
    },
    "games/symmetry-studio.html": {
      companion: "guo", sticker: { id: "symmetry-artist", label: "对称艺术家", emoji: "❄️" },
      surprises: ["只画一半，让伙伴补出另一半。", "找一个有不止一条对称轴的图案。", "转动画面，寻找旋转后看起来不变的时刻。"]
    },
    "games/estimation-station.html": {
      companion: "miao", sticker: { id: "estimate-eye", label: "估算慧眼", emoji: "🎯" },
      surprises: ["只看一秒就估计数量，再说说依据。", "先估一半，再用加倍的方法估全部。", "换一种分组方法，比较哪次更接近。"]
    },
    "games/turtle-geometry.html": {
      companion: "xing", sticker: { id: "turtle-coder", label: "海龟指挥家", emoji: "🐢" },
      surprises: ["只改转角，看看图形怎样变化。", "用最少的指令画一个闭合图形。", "先在纸上走一遍，再让海龟执行。"]
    },
    "games/gravity-drop.html": {
      companion: "bo", sticker: { id: "gravity-observer", label: "落体观察员", emoji: "🪶" },
      surprises: ["先预测哪一个先落地，再切换空气条件。", "让两个不同物体尽量同时落地。", "画出有空气和真空时的结果对比。"]
    },
    "games/ramp-and-roll.html": {
      companion: "miao", sticker: { id: "ramp-engineer", label: "斜坡工程师", emoji: "⛰️" },
      surprises: ["选一个落点，反过来调整斜坡让球停在那里。", "一次只改一个条件，连续做三次。", "先用手比出预测距离，再观察误差。"]
    },
    "games/light-and-shadow.html": {
      companion: "bo", sticker: { id: "shadow-director", label: "影子导演", emoji: "🔦" },
      surprises: ["不移动物体，只让影子变大。", "做出两个大小不同的影子并解释。", "找一找影子边缘最清楚的位置。"]
    },
    "games/wave-maker.html": {
      companion: "bo", sticker: { id: "wave-listener", label: "波浪倾听者", emoji: "🌊" },
      surprises: ["先造出平静时刻，再造出最高波峰。", "只改频率，观察波峰间距。", "画下两列波相遇前后的一瞬间。"]
    },
    "nature/dinosaurs.html": {
      companion: "guo", sticker: { id: "fossil-sleuth", label: "化石推理员", emoji: "🦖" },
      surprises: ["挑一条结论，把证据和猜想分开写。", "只看脚印，猜猜动物怎样移动。", "为一种恐龙设计一张证据卡。"]
    },
    "nature/space.html": {
      companion: "xing", sticker: { id: "planet-navigator", label: "行星领航员", emoji: "🪐" },
      surprises: ["选两颗行星，只用数字介绍差别。", "猜猜自己在哪颗行星上会更重。", "按大小给三颗行星排队并验证。"]
    },
    "nature/ocean.html": {
      companion: "bo", sticker: { id: "deep-sea-scout", label: "深海观察员", emoji: "🐋" },
      surprises: ["为一种深海生物设计适应环境的装备。", "沿深度变化找出光最明显的转折。", "选一个深度带，用三个词描述它。"]
    },
    "nature/insects.html": {
      companion: "miao", sticker: { id: "bug-friend", label: "昆虫好朋友", emoji: "🐞" },
      surprises: ["不碰昆虫，记录它一分钟里的动作。", "画出昆虫身体的三个主要部分。", "比较昆虫和自己的移动方式。"]
    },
    "nature/earth.html": {
      companion: "guo", sticker: { id: "earth-reader", label: "地球读图员", emoji: "🌍" },
      surprises: ["找两次震级接近但深度不同的记录。", "用手势表示地层受到挤压。", "在图上指出一条数据支持的结论。"]
    },
    "nature/weather.html": {
      companion: "bo", sticker: { id: "cloud-reporter", label: "云朵观察员", emoji: "🌦️" },
      surprises: ["隔十分钟看两次云，记录一个变化。", "不用仪器，用周围线索判断风向。", "为今天的天气画一张证据卡。"]
    },
    "nature/human-body.html": {
      companion: "xing", sticker: { id: "body-researcher", label: "身体研究员", emoji: "❤️" },
      surprises: ["安静和活动后各数一次脉搏。", "设计一种公平方法比较两次呼吸。", "画箭头表示活动后身体里的变化。"]
    }
  }
};
