/* 少儿数理启蒙 · 共享童趣资料
   Classic script；支持 file://，不依赖 fetch、module 或第三方资源。 */
window.PLAYFUL = {
  version: 2,
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
  milestones: [
    { count: 3, companion: "miao", title: "好奇心起步", message: "你已经完成三次先猜再验证。挑一张卡，说说哪次结果最意外。" },
    { count: 6, companion: "bo", title: "线索收集员", message: "六张卡里藏着不少变化。找两张卡，比较它们用到的证据。" },
    { count: 12, companion: "guo", title: "发现记录家", message: "你已经走过很多不同的探索。选一张旧卡，补画或补写一个新发现。" },
    { count: 18, companion: "xing", title: "小小解释家", message: "整套探索卡都亮起来了。选最喜欢的一张，用自己的话教给家人。" }
  ],
  pages: {
    "games/number-blocks.html": {
      companion: "miao", sticker: { id: "ten-builder", label: "凑十建筑师", emoji: "🧱" },
      card: { series: "数学建造", discovery: "十个一可以合成一个十，空格也能告诉我们还差多少。", fact: "把数量按五个或十个分组，通常比逐个数更快。", next: "不用逐个数，再摆一种能一眼看出 10 的样子。", accent: "#d97706" },
      surprises: ["闭上眼摸出几块积木，再猜数量。", "用两种颜色摆出 10，交换颜色再解释。", "找一个不用逐个数就能看出数量的摆法。"]
    },
    "games/fraction-lab.html": {
      companion: "guo", sticker: { id: "fraction-chef", label: "分数主厨", emoji: "🍕" },
      card: { series: "数学建造", discovery: "分母不同的分数，也能用同一块面积或同一条数轴比较。", fact: "分数表示整体被等分后取了多少份，整体必须先约定相同。", next: "找两个写法不同但大小相同的分数，并画出来。", accent: "#dc2626" },
      surprises: ["找两个看起来不同但一样大的分数。", "先遮住图形，只看数轴猜哪个分数更大。", "画一份能公平分给三个人的点心。"]
    },
    "games/pattern-machine.html": {
      companion: "xing", sticker: { id: "rule-detective", label: "规律侦探", emoji: "⚙️" },
      card: { series: "数学建造", discovery: "规律不是猜一个答案，而是找到对所有输入都成立的规则。", fact: "一个反例就能证明某条猜想并不总是成立。", next: "设计一条规则，只给家人三个例子让他来猜。", accent: "#7c3aed" },
      surprises: ["设计一条会让别人猜错一次的规则。", "只给两个例子，看看线索够不够。", "用一句话和一个算式分别描述同一条规则。"]
    },
    "games/symmetry-studio.html": {
      companion: "guo", sticker: { id: "symmetry-artist", label: "对称艺术家", emoji: "❄️" },
      card: { series: "创意表达", discovery: "镜像会把每一个点复制到对称轴另一边的对应位置。", fact: "有些图形有多条对称轴，有些旋转一定角度后也保持不变。", next: "画半只新动物，再用镜像把它补完整。", accent: "#2563eb" },
      surprises: ["只画一半，让伙伴补出另一半。", "找一个有不止一条对称轴的图案。", "转动画面，寻找旋转后看起来不变的时刻。"]
    },
    "games/estimation-station.html": {
      companion: "miao", sticker: { id: "estimate-eye", label: "估算慧眼", emoji: "🎯" },
      card: { series: "数学建造", discovery: "先分组再估计，能让猜测更有根据，也更容易修正。", fact: "好的估算不必等于准确答案，但要落在合理范围里。", next: "换一种分组方法，再估同一批物品并比较误差。", accent: "#db2777" },
      surprises: ["只看一秒就估计数量，再说说依据。", "先估一半，再用加倍的方法估全部。", "换一种分组方法，比较哪次更接近。"]
    },
    "games/turtle-geometry.html": {
      companion: "xing", sticker: { id: "turtle-coder", label: "海龟指挥家", emoji: "🐢" },
      card: { series: "创意表达", discovery: "重复移动和转向，可以把简短指令变成完整几何图形。", fact: "正多边形每次转过的外角加起来是 360 度。", next: "只改转角，不改步数，看看会出现什么新图形。", accent: "#059669" },
      surprises: ["只改转角，看看图形怎样变化。", "用最少的指令画一个闭合图形。", "先在纸上走一遍，再让海龟执行。"]
    },
    "games/doodle-pad.html": {
      companion: "guo", sticker: { id: "rainbow-artist", label: "彩虹故事家", emoji: "🎨" },
      card: { series: "创意表达", discovery: "点连起来成为线，颜色、粗细和镜像会改变画面的感觉。", fact: "数码画布会把连续移动的位置记录成许多很近的点。", next: "请家人添一笔，再把那一笔变成故事里的角色。", accent: "#be185d" },
      surprises: ["闭上眼画一个形状，再把它变成小动物。", "只用圆点和直线画一座奇怪城市。", "打开四面镜像，画一只从没见过的花。", "请家人添一笔，你再把它变成故事。"]
    },
    "games/gravity-drop.html": {
      companion: "bo", sticker: { id: "gravity-observer", label: "落体观察员", emoji: "🪶" },
      card: { series: "物理实验", discovery: "真空里没有空气阻力，不同物体会以相同的重力加速度下落。", fact: "在地球表面附近，重力加速度约为每秒平方 9.8 米。", next: "设计两种形状不同但质量相近的物体，预测空气中的结果。", accent: "#6366f1" },
      surprises: ["先预测哪一个先落地，再切换空气条件。", "让两个不同物体尽量同时落地。", "画出有空气和真空时的结果对比。"]
    },
    "games/ramp-and-roll.html": {
      companion: "miao", sticker: { id: "ramp-engineer", label: "斜坡工程师", emoji: "⛰️" },
      card: { series: "物理实验", discovery: "斜坡越高，球开始时拥有的重力势能通常越多。", fact: "公平比较时一次只改变一个变量，才能知道是谁造成差别。", next: "先指定一个落点，再反过来调斜坡让球尽量停在那里。", accent: "#b45309" },
      surprises: ["选一个落点，反过来调整斜坡让球停在那里。", "一次只改一个条件，连续做三次。", "先用手比出预测距离，再观察误差。"]
    },
    "games/light-and-shadow.html": {
      companion: "bo", sticker: { id: "shadow-director", label: "影子导演", emoji: "🔦" },
      card: { series: "物理实验", discovery: "光沿直线传播；物体挡住光后，后方就形成影子。", fact: "物体靠近光源时通常会挡住更大的光束，影子也更大。", next: "不移动物体，只移动光源做出一大一小两个影子。", accent: "#ca8a04" },
      surprises: ["不移动物体，只让影子变大。", "做出两个大小不同的影子并解释。", "找一找影子边缘最清楚的位置。"]
    },
    "games/wave-maker.html": {
      companion: "bo", sticker: { id: "wave-listener", label: "波浪倾听者", emoji: "🌊" },
      card: { series: "物理实验", discovery: "两列波相遇时会暂时叠加，可能增强，也可能接近抵消。", fact: "波传递能量，但介质里的小部分通常只在原位置附近振动。", next: "只改变一列波的频率，寻找最明显的相长和相消时刻。", accent: "#0891b2" },
      surprises: ["先造出平静时刻，再造出最高波峰。", "只改频率，观察波峰间距。", "画下两列波相遇前后的一瞬间。"]
    },
    "nature/dinosaurs.html": {
      companion: "guo", sticker: { id: "fossil-sleuth", label: "化石推理员", emoji: "🦖" },
      card: { series: "自然观察", discovery: "化石是证据；关于恐龙生活方式的结论需要由多条证据支持。", fact: "脚印化石能留下步幅、方向和群体移动等线索。", next: "挑一条恐龙结论，把观察到的证据和推测分开写。", accent: "#15803d" },
      surprises: ["挑一条结论，把证据和猜想分开写。", "只看脚印，猜猜动物怎样移动。", "为一种恐龙设计一张证据卡。"]
    },
    "nature/space.html": {
      companion: "xing", sticker: { id: "planet-navigator", label: "行星领航员", emoji: "🪐" },
      card: { series: "自然观察", discovery: "行星的大小、轨道和表面重力不同，需要用同一单位公平比较。", fact: "质量和半径都会影响一颗行星表面的重力强弱。", next: "再选两颗行星，用两个数字介绍它们最明显的不同。", accent: "#6d28d9" },
      surprises: ["选两颗行星，只用数字介绍差别。", "猜猜自己在哪颗行星上会更重。", "按大小给三颗行星排队并验证。"]
    },
    "nature/ocean.html": {
      companion: "bo", sticker: { id: "deep-sea-scout", label: "深海观察员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "海水越深，光越少、压力越大，生物也发展出不同适应方式。", fact: "海水压力大约每下降 10 米增加一个大气压。", next: "选另一个深度带，为那里的生物设计一种适应装备。", accent: "#0369a1" },
      surprises: ["为一种深海生物设计适应环境的装备。", "沿深度变化找出光最明显的转折。", "选一个深度带，用三个词描述它。"]
    },
    "nature/insects.html": {
      companion: "miao", sticker: { id: "bug-friend", label: "昆虫好朋友", emoji: "🐞" },
      card: { series: "自然观察", discovery: "昆虫有头、胸、腹三个主要部分，六条腿连接在胸部。", fact: "小动物的表面积相对体积更大，这会影响散热和身体强度。", next: "不碰昆虫，观察一分钟并画下它重复最多的动作。", accent: "#ea580c" },
      surprises: ["不碰昆虫，记录它一分钟里的动作。", "画出昆虫身体的三个主要部分。", "比较昆虫和自己的移动方式。"]
    },
    "nature/earth.html": {
      companion: "guo", sticker: { id: "earth-reader", label: "地球读图员", emoji: "🌍" },
      card: { series: "自然观察", discovery: "震级、深度和位置描述地震的不同方面，不能互相替代。", fact: "震级每增加 1，记录到的振幅约增加 10 倍。", next: "找两次震级接近但深度不同的地震，比较它们。", accent: "#0f766e" },
      surprises: ["找两次震级接近但深度不同的记录。", "用手势表示地层受到挤压。", "在图上指出一条数据支持的结论。"]
    },
    "nature/weather.html": {
      companion: "bo", sticker: { id: "cloud-reporter", label: "云朵观察员", emoji: "🌦️" },
      card: { series: "自然观察", discovery: "天气判断要结合云、风、温度等多条证据，而不是只看一个现象。", fact: "雷声比闪电晚到，是因为声音传播速度远小于光。", next: "隔十分钟看两次天空，记录一处能证明天气变化的线索。", accent: "#0284c7" },
      surprises: ["隔十分钟看两次云，记录一个变化。", "不用仪器，用周围线索判断风向。", "为今天的天气画一张证据卡。"]
    },
    "nature/human-body.html": {
      companion: "xing", sticker: { id: "body-researcher", label: "身体研究员", emoji: "❤️" },
      card: { series: "自然观察", discovery: "活动时肌肉需要更多氧气，心跳和呼吸会随之改变。", fact: "测量身体变化要用相同时间和相同方法，结果才容易比较。", next: "设计一次公平测试，比较两种短活动后的身体反应。", accent: "#e11d48" },
      surprises: ["安静和活动后各数一次脉搏。", "设计一种公平方法比较两次呼吸。", "画箭头表示活动后身体里的变化。"]
    }
  }
};
