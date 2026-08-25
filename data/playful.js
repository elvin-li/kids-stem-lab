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
    "games/balance-lab.html": {
      companion: "miao", sticker: { id: "lever-balancer", label: "力矩平衡师", emoji: "⚖️" },
      card: { series: "物理实验", discovery: "平衡看的是力乘力臂，不是只比两边谁更重。", fact: "同一块砝码离支点越远，力矩越大。", next: "只用 1 格和 3 格，再找出一种新的平衡。", accent: "#b45309" },
      surprises: ["左边只放一个，右边用两个把它抬平。", "一次只改一个挂钩，看横梁往哪边沉。", "用积木或尺子在桌上搭一个真的小杠杆。"]
    },
    "games/circuit-lab.html": {
      companion: "xing", sticker: { id: "circuit-maker", label: "通路工程师", emoji: "💡" },
      card: { series: "物理实验", discovery: "灯要亮，电流必须走完一圈；串联分电压，并联各走各的路。", fact: "家里的灯大多是并联，所以一盏坏了另一盏还能亮。", next: "先预测并联会更亮还是更暗，再拨开关验证。", accent: "#6d28d9" },
      surprises: ["开关开着时接上第二盏灯，猜它会不会亮。", "只留一盏灯，和并联两盏比亮度。", "在纸上画出串联和并联两条路。"]
    },
    "games/clock-workshop.html": {
      companion: "miao", sticker: { id: "time-teller", label: "认钟小能手", emoji: "🕒" },
      card: { series: "数学建造", discovery: "短针走小时，长针每大格是 5 分钟；短针会跟着分针慢慢挪。", fact: "钟面一圈 360 度，被 12 等分，每大格 30 度。", next: "拨一个半点，看看短针是不是停在两个数字正中间。", accent: "#1d4ed8" },
      surprises: ["先只拨短针，再补长针。", "问家人现在墙上是几点，自己拨出来对一对。", "找一个整点和一个半点，比较短针的位置。"]
    },
    "games/magnet-lab.html": {
      companion: "bo", sticker: { id: "pole-watcher", label: "磁极观察员", emoji: "🧲" },
      card: { series: "物理实验", discovery: "异名磁极相吸，同名磁极相斥；指南针自己也是一块小磁铁。", fact: "指南针的红端是北极，会被附近的磁南极拉过去。", next: "把两块磁铁推远，看小针会不会慢慢回到中间。", accent: "#be123c" },
      surprises: ["红端对红端，先猜会吸还是推。", "只翻转右边，看小针转向哪一端。", "找家里一块冰箱贴，试试它吸不吸木头。"]
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
    "nature/beetles.html": {
      companion: "bo", sticker: { id: "beetle-keeper", label: "甲虫馆长", emoji: "🪲" },
      card: { series: "自然观察", discovery: "甲虫背上那层硬壳是变硬的前翅（鞘翅），飞行用的软翅折在下面。", fact: "已命名的甲虫约 40 万种，占全部已知动物物种的约四分之一。", next: "找一只甲虫，说出它的鞘翅、腿和口器分别解决了什么问题。", accent: "#7c4a12" },
      surprises: ["找一只甲虫，数一数它合起来的鞘翅中间有几条缝。", "比较两只甲虫的腿：哪一只更适合挖土，哪一只更适合抓握。", "不碰它，观察一分钟，记录它遇到影子时的反应。"]
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
    },
    "nature/plants.html": {
      companion: "guo", sticker: { id: "leaf-reader", label: "叶子读图员", emoji: "🌱" },
      card: { series: "自然观察", discovery: "叶子的形状和边缘是适应光、水和风的方案，不必先记住名字。", fact: "叶绿素吸收红光和蓝光、反射绿光，所以叶子看起来是绿的。", next: "再找一片不同的叶子，比较边缘和叶脉。", accent: "#15803d" },
      surprises: ["不摘叶子，只看向阳面和背阴面。", "找一片边缘带锯齿的叶子，数一数齿。", "把叶子的轮廓画下来，标出主叶脉。"]
    },
    "nature/birds.html": {
      companion: "bo", sticker: { id: "beak-reader", label: "喙形推理员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "喙是取食工具，脚是立足工具；先看结构，再猜名字。", fact: "城市里最常见的是短圆锥喙的麻雀，适合嗑开草籽。", next: "窗外再找一只鸟，先说喙，再说你猜它吃什么。", accent: "#0369a1" },
      surprises: ["只看喙，不看名字，猜它吃什么。", "比较两只鸟的脚：谁更适合抓树枝。", "把「看见」和「推测」分成两列写。"]
    },
    "games/chance-jar.html": {
      companion: "miao", sticker: { id: "chance-sampler", label: "抽样小侦探", emoji: "🎲" },
      card: { series: "数学建造", discovery: "抽几次不一定刚好等于罐子比例，抽得越多通常越接近。", fact: "一次抽取是随机的，很多次抽取才会靠近真实比例。", next: "换一种比例再抽十次，比较两张图。", accent: "#7c3aed" },
      surprises: ["先猜下一次会抽到什么颜色。", "只抽三次，看看会不会碰巧全是少数那种。", "把罐子改成几乎全蓝，再看样本变不变。"]
    },
    "games/measure-lab.html": {
      companion: "guo", sticker: { id: "unit-measurer", label: "单位测量员", emoji: "📏" },
      card: { series: "数学建造", discovery: "同一件东西，用更小的单位去量，数字会变大。", fact: "测量结果必须带上单位，否则数字没有意义。", next: "用第三种单位再量一次，给家人解释三个数字。", accent: "#0369a1" },
      surprises: ["先估有几个单位，再真正摆上去。", "换一件更长的东西，数字会怎样？", "用自己的拃量桌子，再让家人量一次。"]
    },
    "games/angle-lab.html": {
      companion: "xing", sticker: { id: "angle-pointer", label: "角度指针", emoji: "📐" },
      card: { series: "数学建造", discovery: "角的大小看两条边张开多少，不看边有多长。", fact: "直角是 90 度，平角是 180 度。", next: "只动一条边，从锐角走到钝角。", accent: "#1d4ed8" },
      surprises: ["先做出一个看起来像书本打开的角。", "边画得很长，角会变大吗？", "在房间里找一个直角。"]
    },
    "games/graph-lab.html": {
      companion: "miao", sticker: { id: "bar-reader", label: "读图小能手", emoji: "📊" },
      card: { series: "数学建造", discovery: "条形图把多少变成多高，先看柱子再核对数字。", fact: "同一张图上的格子必须代表同样多的票。", next: "故意投成平手，看看两根一样高该怎么说。", accent: "#2563eb" },
      surprises: ["不看数字，只凭高度说出第一名。", "让两种水果一样多。", "把票清零，再投出完全相反的结果。"]
    },
    "games/money-lab.html": {
      companion: "guo", sticker: { id: "cash-composer", label: "凑钱规划师", emoji: "🪙" },
      card: { series: "数学建造", discovery: "同一个总数，可以用不同的硬币组合出来。", fact: "10 个 1 和 1 个 10 一样多，只是拆法不同。", next: "只用 1 和 5，再凑一次同一个数。", accent: "#b45309" },
      surprises: ["用最少的硬币凑出目标。", "用最多的硬币凑出同一个数。", "先估要几枚 5，再动手验证。"]
    },
    "games/sound-box.html": {
      companion: "bo", sticker: { id: "pitch-listener", label: "音高倾听者", emoji: "🎵" },
      card: { series: "物理实验", discovery: "音高看振动有多快，响度看振动有多大，这是两件事。", fact: "弦越短或越紧，通常音越高。", next: "只改响度、不改长度，看波形哪里变了。", accent: "#7c3aed" },
      surprises: ["做出又高又轻的声音。", "做出又低又响的声音。", "闭上眼听，再猜弦是变短了还是变松了。"]
    },
    "games/heat-lab.html": {
      companion: "xing", sticker: { id: "state-watcher", label: "物态观察员", emoji: "🧊" },
      card: { series: "物理实验", discovery: "同一份水可以是冰、水和蒸汽，热让粒子动得不一样。", fact: "纯水大约在 0℃ 结冰、100℃ 沸腾。", next: "从蒸汽往回降温，看它会不会变回水。", accent: "#c2410c" },
      surprises: ["先调到结冰，再慢慢加热。", "猜冰化成水后重量会不会变。", "看锅盖上的小水珠是从哪来的。"]
    },
    "games/float-sink.html": {
      companion: "bo", sticker: { id: "buoyancy-tester", label: "浮沉试验员", emoji: "🪵" },
      card: { series: "物理实验", discovery: "沉浮不只看材料，还看它排开了多少水。", fact: "同一块黏土捏成船，能排开更多水，就比较容易浮。", next: "再试一种空心的东西，预测它会浮还是沉。", accent: "#0e7490" },
      surprises: ["先猜木头和石头谁会沉。", "把黏土捏扁，再丢进水里。", "找家里一件空盒子，猜它会不会浮。"]
    },
    "games/color-lab.html": {
      companion: "guo", sticker: { id: "color-mixer", label: "调色小画家", emoji: "🌈" },
      card: { series: "物理实验", discovery: "颜料三原色两两混合会得到间色；白是光都来了，黑几乎不反射。", fact: "颜料越混越暗；灯光的红、绿、蓝叠在一起才会变白。", next: "换一对原色，再调出另一种间色。", accent: "#c2410c" },
      surprises: ["先猜红加黄会变成什么，再倒在一起。", "只换右边那一杯，看盘子怎么变。", "问家人：手电筒的白和纸上的白一样吗？"]
    },
    "games/air-lab.html": {
      companion: "bo", sticker: { id: "air-squeezer", label: "空气挤压员", emoji: "🎈" },
      card: { series: "物理实验", discovery: "空气占地方；被挤紧时体积变小，压强变大。", fact: "温度差不多时，同一份空气体积越小，压强越大。", next: "用空塑料瓶轻轻挤一挤，感受松开时手被推开。", accent: "#0284c7" },
      surprises: ["先猜挤紧时气球会变大还是变小。", "只看针筒里的小点，它们挤在一起了吗？", "用吸管吸一口水，说说空气去哪了。"]
    },
    "games/water-cycle.html": {
      companion: "xing", sticker: { id: "cycle-walker", label: "水循环向导", emoji: "💧" },
      card: { series: "物理实验", discovery: "同一份水会蒸发、成云、落下，再流回海里。", fact: "太阳提供能量，让液态水变成水汽升上去。", next: "下雨后看路边的水流向哪，它像不像这一页的河。", accent: "#1d4ed8" },
      surprises: ["先走蒸发，再跳去下雨，中间成云可以后补。", "猜云里面是气体还是很小的水滴。", "画太阳、海、云、雨四个箭头连成一圈。"]
    },
    "games/sort-lab.html": {
      companion: "xing", sticker: { id: "order-builder", label: "排序工程师", emoji: "📶" },
      card: { series: "创意表达", discovery: "排序就是一次次比较相邻的两个，决定要不要交换。", fact: "冒泡排序每一轮会把当前最大的沉到末尾。", next: "打乱后再只走一轮，看看最大的到哪了。", accent: "#6d28d9" },
      surprises: ["只交换相邻的两根，把最高的挪到最右边。", "数一数你比较了几次。", "先自己排，再让机器走一步对比。"]
    },
    "nature/rivers.html": {
      companion: "bo", sticker: { id: "river-walker", label: "沿河观察员", emoji: "🏞️" },
      card: { series: "自然观察", discovery: "水往低处走，坡陡就搬石头，变慢就把沙子放下。", fact: "弯道外侧冲刷、内侧堆积，所以河会越来越弯。", next: "下雨后看路边的水流，它带走了什么。", accent: "#0369a1" },
      surprises: ["比较源头和入海口，水的快慢差在哪。", "猜沙子为什么堆成三角形。", "画一条弯弯的河，标出冲和淤。"]
    },
    "nature/trees.html": {
      companion: "guo", sticker: { id: "ring-counter", label: "年轮计数员", emoji: "🌳" },
      card: { series: "自然观察", discovery: "温带树木大约一年长一圈，宽圈通常更好过，窄圈更紧。", fact: "一圈里其实有浅色早材和深色晚材。", next: "去公园找一个已锯开的树桩，数一数。", accent: "#166534" },
      surprises: ["指出最宽的一圈和最窄的一圈。", "猜连续窄圈那年缺的是什么。", "说说为什么不能剥活树的皮。"]
    },
    "nature/moon.html": {
      companion: "xing", sticker: { id: "phase-reader", label: "月相读图员", emoji: "🌙" },
      card: { series: "自然观察", discovery: "月亮自己不发光，我们看见的是被太阳照亮的那一半。", fact: "月相变化一圈大约 29.5 天。", next: "今晚看看真实的月亮，对照是哪一相。", accent: "#6d28d9" },
      surprises: ["找出亮的那一侧朝哪。", "比较满月和娥眉月，被照亮的是不是同一半。", "画太阳、地球和月亮的相对位置。"]
    },
    "nature/rocks.html": {
      companion: "guo", sticker: { id: "rock-reader", label: "岩石读图员", emoji: "🪨" },
      card: { series: "自然观察", discovery: "岩石的颗粒、层理和光泽是它怎么形成的证据。", fact: "花岗岩是岩浆慢慢冷却，砂岩是颗粒被压在一起。", next: "捡一块身边的小石头，先看颗粒再猜来历。", accent: "#78716c" },
      surprises: ["找一块看起来一层一层的石头。", "比较会闪的矿物和粗糙的砂岩。", "把「看见」和「推测」分开写。"]
    },
    "nature/soil.html": {
      companion: "bo", sticker: { id: "soil-tester", label: "土壤试验员", emoji: "🟫" },
      card: { series: "自然观察", discovery: "沙子颗粒大、空隙大所以漏水，黏土颗粒细所以更保水。", fact: "表土里有枯叶和空气，植物的根最喜欢待在这里。", next: "下雨后看哪一块地积水、哪一块先干。", accent: "#92400e" },
      surprises: ["猜沙子和黏土谁先把水漏完。", "翻开枯叶层，看看下面是不是更湿。", "画四层土，标出根会住在哪一层。"]
    },
    "nature/mammals.html": {
      companion: "bo", sticker: { id: "mammal-watcher", label: "兽形观察员", emoji: "🦊" },
      card: { series: "自然观察", discovery: "同样是哺乳动物，四肢会被生活环境改造成跑、飞、游、跳的工具。", fact: "蝙蝠会飞却喂奶，是哺乳动物，不是鸟。", next: "再比一对比狗和猫的脚，谁走路更轻。", accent: "#9a3412" },
      surprises: ["只看脚，猜它住在树上、草地还是水里。", "解释蝙蝠为什么不是鸟。", "把「看见」和「推测」分成两列写。"]
    },
    "nature/stars.html": {
      companion: "xing", sticker: { id: "north-finder", label: "找北观察员", emoji: "⭐" },
      card: { series: "自然观察", discovery: "最亮的星不一定能当路标，北极星几乎不搬家所以能找北。", fact: "北斗勺子口两颗连线，能指到北极星。", next: "今晚看看真实夜空，先找勺形。", accent: "#4338ca" },
      surprises: ["先画一把勺子，再标出哪两颗指向北。", "比较天狼星和北极星谁更亮。", "说说南十字为什么在北半球看不见。"]
    },
    "nature/volcano.html": {
      companion: "guo", sticker: { id: "lava-reader", label: "熔岩读图员", emoji: "🌋" },
      card: { series: "自然观察", discovery: "熔岩稀就慢慢流，熔岩稠就容易猛喷，山的形状常常在说这件事。", fact: "间歇泉喷的是热水，不是岩浆。", next: "对照岩石页，猜玄武岩更像慢慢流还是猛喷。", accent: "#c2410c" },
      surprises: ["指出哪一座更像平底锅。", "比较熔岩流和火山灰谁走得远。", "解释温泉为什么不是火山爆发。"]
    },
    "nature/fish.html": {
      companion: "bo", sticker: { id: "fin-reader", label: "鳍形观察员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "鳍和体形是游泳工具，鳃是水里的换气工具。", fact: "鲨鱼用鳃裂换气，海马几乎直立着游。", next: "对照海底世界，猜深海里的鱼鳍会怎样。", accent: "#0e7490" },
      surprises: ["只看鳍，猜它游得快还是慢。", "比较鳃和肺，谁能在水里换气。", "把「看见」和「推测」分开写。"]
    },
    "nature/fungi.html": {
      companion: "guo", sticker: { id: "spore-reader", label: "孢子观察员", emoji: "🍄" },
      card: { series: "自然观察", discovery: "真菌不是植物，它们靠分解或合作拿到食物。", fact: "我们看见的蘑菇只是子实体，真正的身体是土里的菌丝。", next: "去土壤页看看枯叶层里有没有菌丝的位置。", accent: "#92400e" },
      surprises: ["指出哪一张更像分解者。", "解释为什么不能随便采野蘑菇吃。", "画菌丝和伞盖，标出哪一部分在土里。"]
    },
    "nature/senses.html": {
      companion: "xing", sticker: { id: "sense-mapper", label: "感官绘图员", emoji: "👁️" },
      card: { series: "自然观察", discovery: "感觉器官是探测器，各自侦测光、声、气味、味道或触碰。", fact: "平衡感主要靠内耳，不只靠眼睛。", next: "对照人体机器，找这些信号最后送到哪。", accent: "#be185d" },
      surprises: ["闭上一只眼睛，世界还看不看得清。", "捏住鼻子再尝食物，味道会怎样。", "比较皮肤侦测的冷热和痛是不是同一件事。"]
    },
    "games/lens-lab.html": {
      companion: "miao", sticker: { id: "lens-tester", label: "透镜试验员", emoji: "🔍" },
      card: { series: "物理实验", discovery: "凸透镜中间厚，常把东西放大；凹透镜中间薄，常把东西缩小。靠近和离远，花也会变。", fact: "放大镜就是一块凸透镜。", next: "靠近一次、离远一次，再换成凹透镜看花变小。", accent: "#7c3aed" },
      surprises: ["先猜凸透镜会放大还是缩小。", "找家里一副老花镜，看镜片中间厚不厚。", "把东西拿近再拿远，像会不会反过来。"]
    },
    "games/pulley-lab.html": {
      companion: "xing", sticker: { id: "pulley-hauler", label: "滑轮搬运员", emoji: "⚙️" },
      card: { series: "物理实验", discovery: "定滑轮主要改方向，动滑轮可以省力但绳子要拉更长。", fact: "两个滑轮时，拉力大约能分摊到两股绳子上。", next: "只改滑轮个数，比较拉起来是否更轻。", accent: "#b45309" },
      surprises: ["先猜两个滑轮是不是一定更省力。", "绳子拉得更长，重物升高一样多吗？", "找旗杆顶部的轮子，它是定滑轮还是动滑轮。"]
    },
    "games/mirror-lab.html": {
      companion: "bo", sticker: { id: "mirror-reader", label: "镜像观察员", emoji: "🪞" },
      card: { series: "物理实验", discovery: "平面镜左右对调，不是上下颠倒。", fact: "勺子凹面和凸面反射不一样。", next: "在镜子前举左手，看镜子里是哪一只。", accent: "#0369a1" },
      surprises: ["把字对着镜子，看哪些字母还认得。", "比较窗玻璃和镜子，谁的像更清楚。", "用勺子凹面照自己，脸会不会变形。"]
    },
    "nature/reptiles.html": {
      companion: "bo", sticker: { id: "scale-reader", label: "鳞片观察员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "爬行动物多用鳞或甲保护身体，移动方式差很多。", fact: "蛇没有脚也能走，靠腹部鳞片和身体的波浪。", next: "对照恐龙页，猜哪些近亲还留着鳞。", accent: "#3f6212" },
      surprises: ["只看脚，猜它爬树还是游泳。", "比较龟壳和鳄鱼背甲。", "说说变色龙变色是为了躲还是说话。"]
    },
    "nature/habitats.html": {
      companion: "guo", sticker: { id: "place-reader", label: "栖息地读图员", emoji: "🏕️" },
      card: { series: "自然观察", discovery: "一个地方缺水、缺热或缺食物，住在那里的身体就会不一样。", fact: "沙漠最缺的通常是水，极地最缺的通常是热。", next: "对照天气页，猜湿地的云和雨会怎样。", accent: "#166534" },
      surprises: ["指出哪个地方最缺水。", "城市算不算栖息地，谁住在那里。", "画沙漠和森林，标出谁更难找到阴凉。"]
    },
    "nature/crystals.html": {
      companion: "xing", sticker: { id: "facet-reader", label: "晶面观察员", emoji: "💎" },
      card: { series: "自然观察", discovery: "晶体是按固定秩序一块块长出来的，所以会有平整的面。", fact: "盐和雪花都是晶体，只是材料不同。", next: "对照岩石页，猜花岗岩里那些闪光的颗粒是不是晶体。", accent: "#6d28d9" },
      surprises: ["比较盐和云母，谁更像薄片。", "解释为什么不能舔来历不明的晶体。", "把糖慢慢风干，看会不会长出小晶体。"]
    },
    "games/friction-lab.html": {
      companion: "miao", sticker: { id: "slide-tester", label: "滑动试验员", emoji: "🛷" },
      card: { series: "物理实验", discovery: "表面越粗糙，摩擦力通常越大，滑得越近。", fact: "冰上几乎没有粗糙颗粒，所以滑得远。", next: "只换表面，不推得更用力，比较停在哪。", accent: "#0369a1" },
      surprises: ["先猜冰和砂纸谁让木块停得近。", "鞋底为什么要做成花纹。", "油倒在板上会怎样，先猜再看图鉴。"]
    },
    "games/spring-lab.html": {
      companion: "xing", sticker: { id: "stretch-tester", label: "拉伸试验员", emoji: "🪝" },
      card: { series: "物理实验", discovery: "弹簧被拉得越重通常越长，放开后会往回缩。", fact: "在弹性限度内，拉力大约和伸长成正比。", next: "挂轻的和重的，比较拉长了多少。", accent: "#b45309" },
      surprises: ["先猜砝码加倍，弹簧是不是也加倍长。", "取下砝码，它会不会完全回去。", "橡皮筋和弹簧是不是同一种东西。"]
    },
    "games/bounce-lab.html": {
      companion: "bo", sticker: { id: "bounce-tester", label: "回弹试验员", emoji: "🏀" },
      card: { series: "物理实验", discovery: "硬而有弹性的面能把更多运动还回去，沙子会吃掉很多。", fact: "没气的球几乎不弹，因为变形后回不来。", next: "同一颗球，只换地面，比较弹起的高度。", accent: "#c2410c" },
      surprises: ["先猜沙子和木板谁弹得高。", "给球放一点气，弹跳会怎样。", "玻璃珠掉在木板上，为什么声音更脆。"]
    },
    "nature/amphibians.html": {
      companion: "bo", sticker: { id: "tadpole-watcher", label: "蝌蚪观察员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "两栖动物小时候多半在水里，长大后能走上陆地。", fact: "蝌蚪用鳃，成蛙用肺，皮肤也能帮忙。", next: "对照爬行动物，猜谁更离不开水。", accent: "#166534" },
      surprises: ["先找水里的阶段，再找陆上的阶段。", "比较青蛙和蟾蜍的皮肤。", "说说为什么雨后更容易听见蛙叫。"]
    },
    "nature/foodweb.html": {
      companion: "guo", sticker: { id: "web-mapper", label: "食物网绘图员", emoji: "🕸️" },
      card: { series: "自然观察", discovery: "箭头表示谁把能量传给谁，起点常常是太阳和植物。", fact: "蘑菇是分解者，把枯叶变回土壤里的养分。", next: "对照植物页，猜没有叶子会怎样。", accent: "#92400e" },
      surprises: ["先点生产者，再点吃它的动物。", "如果狐狸少了，兔子会怎样。", "人在这张网里站在哪一层。"]
    },
    "nature/seasons.html": {
      companion: "xing", sticker: { id: "season-reader", label: "季节读图员", emoji: "🍂" },
      card: { series: "自然观察", discovery: "白天长短在变，叶子、候鸟和冬眠都会跟着变。", fact: "夏天白天更长，不是因为地球离太阳更近。", next: "对照树木页，看哪一季叶子还在。", accent: "#c2410c" },
      surprises: ["比较夏和冬，谁的白天更长。", "候鸟为什么要走。", "落叶是树在节省水分和养分。"]
    },
    "games/static-lab.html": {
      companion: "miao", sticker: { id: "static-rubber", label: "静电摩擦员", emoji: "🎈" },
      card: { series: "物理实验", discovery: "摩擦会让电荷搬家，于是气球能吸纸屑，两只气球也会互推。", fact: "潮湿的空气更容易把电荷漏走。", next: "先吸住，再让两只气球靠近。", accent: "#7c3aed" },
      surprises: ["先猜没摩擦的气球会不会吸纸。", "干燥天和潮湿天有什么不同。", "头发竖起来，是吸住还是推开。"]
    },
    "games/spin-lab.html": {
      companion: "xing", sticker: { id: "spin-watcher", label: "旋转观察员", emoji: "🎡" },
      card: { series: "物理实验", discovery: "转得越快，东西越想往外跑；停下就掉回来。", fact: "洗衣机用旋转把水甩出去。", next: "只改快慢，比较谁更靠外。", accent: "#0369a1" },
      surprises: ["先慢转再快转，小球在哪。", "转盘停下时会发生什么。", "坐旋转木马时身体往哪边倾。"]
    },
    "games/layer-lab.html": {
      companion: "bo", sticker: { id: "layer-pourer", label: "分层倾倒员", emoji: "🍯" },
      card: { series: "物理实验", discovery: "密度大的液体会沉到底，小的浮在上面。", fact: "油比水轻，所以浮在水面。", next: "倒两种不同的，再静置看分层。", accent: "#b45309" },
      surprises: ["先猜油和水谁在上面。", "摇匀后再等一会儿，还会分开吗。", "葡萄和软木塞会停在哪一层。"]
    },
    "nature/migration.html": {
      companion: "bo", sticker: { id: "flyway-reader", label: "迁徙读图员", emoji: "🕊️" },
      card: { series: "自然观察", discovery: "有的动物冬天要走，有的留下来，都是活下去的办法。", fact: "北极燕鸥几乎跟着夏天走遍地球。", next: "对照四季页，猜它们为什么选这个时候走。", accent: "#0369a1" },
      surprises: ["指出一只留下的鸟。", "鲑鱼是飞着走还是游着走。", "把「看见迁徙」和「猜它为什么走」分开写。"]
    },
    "nature/nests.html": {
      companion: "guo", sticker: { id: "nest-builder", label: "筑巢工程师", emoji: "🪺" },
      card: { series: "自然观察", discovery: "家是工程：有的编、有的挖、有的糊泥。", fact: "蜂巢是六边形，能用最少的蜡装最多的蜂蜜。", next: "对照虫子页，看蚂蚁的家在哪。", accent: "#92400e" },
      surprises: ["比较树上的巢和地下的洞。", "谁的家能跟着走。", "下雨时哪种家更不容易湿。"]
    },
    "nature/teeth.html": {
      companion: "xing", sticker: { id: "tooth-reader", label: "牙齿读图员", emoji: "🦷" },
      card: { series: "自然观察", discovery: "牙齿的形状在说它负责切断还是磨碎。", fact: "门牙像铲子，臼齿像磨盘。", next: "对照哺乳动物页，猜狗和马的牙差在哪。", accent: "#be185d" },
      surprises: ["用舌头摸自己的门牙和后牙。", "食草动物为什么牙面更平。", "乳牙掉了为什么还会再长。"]
    },
    "games/volume-lab.html": {
      companion: "miao", sticker: { id: "volume-pourer", label: "体积倾倒员", emoji: "🥤" },
      card: { series: "数学建造", discovery: "同样多的水，杯子高液面就高，杯子胖液面就低。", fact: "体积看装了多少，不看液面有多高。", next: "把同一杯水倒进另一种杯子。", accent: "#1d4ed8" },
      surprises: ["先猜高杯子是不是装得更多。", "倒满再倒到另一个杯子，会不会洒出来。", "用手指比一比两杯水面。"]
    },
    "games/scale-lab.html": {
      companion: "guo", sticker: { id: "pan-weigher", label: "托盘称重员", emoji: "⚖️" },
      card: { series: "数学建造", discovery: "哪一边更重，托盘就往哪边沉；一样重就平。", fact: "天平比的是两边的质量，不是盘子大小。", next: "先让一边沉，再加减到平衡。", accent: "#0369a1" },
      surprises: ["先猜苹果和木块谁更重。", "两边放一样的东西会怎样。", "拿走一个砝码，哪边会翘起来。"]
    },
    "games/echo-lab.html": {
      companion: "bo", sticker: { id: "echo-listener", label: "回声倾听者", emoji: "📢" },
      card: { series: "物理实验", discovery: "声音碰到墙会弹回来，墙越远回来越慢。", fact: "回声要够远，耳朵才分得清两次。", next: "近墙喊一次，远墙再喊一次。", accent: "#6d28d9" },
      surprises: ["先猜远墙的回声会不会更晚。", "空教室为什么特别响。", "捂住耳朵，回声还在不在空气里。"]
    },
    "nature/worms.html": {
      companion: "guo", sticker: { id: "soil-tunneler", label: "土壤工程师", emoji: "🪱" },
      card: { series: "自然观察", discovery: "蚯蚓既拆落叶，又在土里钻洞，是分解者也是土壤工程师。", fact: "沙蚕和蚂蟥是水里的亲戚，不是花园土里的蚯蚓。", next: "去土壤页看看落叶层下面松不松。", accent: "#92400e" },
      surprises: ["翻开枯叶，找一找有没有拱过的洞。", "比较蚯蚓和沙蚕，谁两边有小桨。", "解释为什么蚯蚓没有腿也能走。"]
    },
    "nature/skeleton.html": {
      companion: "xing", sticker: { id: "bone-lever", label: "杠杆读骨员", emoji: "🦴" },
      card: { series: "自然观察", discovery: "有的骨头像盒子负责保护，有的像杠杆负责活动。", fact: "昆虫把盔甲穿在外面，人的骨头在里面。", next: "对照人体机器，找这些骨头连在哪。", accent: "#6b7280" },
      surprises: ["摸自己的额头和手肘，谁更像盒子。", "抬起小臂，指出哪一段是杠杆、轴在哪。", "比较人的头骨和甲虫的硬壳。"]
    },
    "nature/coral.html": {
      companion: "bo", sticker: { id: "reef-reader", label: "礁石读图员", emoji: "🪸" },
      card: { series: "自然观察", discovery: "珊瑚是动物，礁石是它们留下的房子；活珊瑚需要光。", fact: "海水变暖时共生藻离开，珊瑚变白、会饿。", next: "对照海底世界，猜礁鱼为什么要待在浅处。", accent: "#c81769" },
      surprises: ["指出哪一张是活着的动物。", "解释枝状珊瑚为什么要待在浅海。", "说说白化以后珊瑚为什么会饿。"]
    },
    "games/area-lab.html": {
      companion: "miao", sticker: { id: "area-tiler", label: "铺格建筑师", emoji: "🟦" },
      card: { series: "数学建造", discovery: "面积是盖住了多少格，不是看起来胖不胖。", fact: "同样 6 格可以铺成矮胖长方形，也可以排成一条。", next: "再比一比谁绕一圈更长。", accent: "#1d4ed8" },
      surprises: ["先铺满 6 格，再改成 L。", "只改形状，不改格子数。", "找一个周长更长但面积一样的排法。"]
    },
    "games/compass-lab.html": {
      companion: "xing", sticker: { id: "compass-aligner", label: "对准北方员", emoji: "🧭" },
      card: { series: "物理实验", discovery: "红针自己找北，你转的是盒子，针仍指同一边。", fact: "旁边的铁会把针拉歪，没有磁性的针不会对准。", next: "对照磁铁工坊，猜红针为什么指北。", accent: "#be123c" },
      surprises: ["先猜转盒子时针会不会跟着转。", "把铁块放近，看针歪向哪边。", "换一根没有磁性的针，看它还会不会找北。"]
    },
    "games/filter-lab.html": {
      companion: "bo", sticker: { id: "mud-filter", label: "泥水过滤员", emoji: "🫗" },
      card: { series: "物理实验", discovery: "孔越小，拦住的细泥越多，下面的水越清。", fact: "过滤只分开大小不同的颗粒，不会把脏东西变没。", next: "对照土壤页，猜雨水怎么穿过沙和黏土。", accent: "#b45309" },
      surprises: ["先猜筛子下面是清水还是浑水。", "沙子层和布，谁更清。", "倒掉重来，只换一种滤法。"]
    },
    "games/siphon-lab.html": {
      companion: "miao", sticker: { id: "hose-starter", label: "虹吸启动员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "管子装满、出口比水面低，水就会自己往低处流。", fact: "管子里进了气泡，虹吸常常会停。", next: "对照水循环页，猜雨水为什么往低处走。", accent: "#0369a1" },
      surprises: ["先猜出口抬高以后还会不会流。", "故意放进一个气泡，看水流停不停。", "用两只杯子和一根管子在水槽里试一次。"]
    },
    "nature/seeds.html": {
      companion: "guo", sticker: { id: "seed-traveler", label: "种子旅行员", emoji: "🌱" },
      card: { series: "自然观察", discovery: "种子先离开老家，才不会挤在一起抢光抢水。", fact: "蒲公英坐风走，苍耳钩住毛，椰子会漂。", next: "对照植物页，猜发芽时谁先往下长。", accent: "#15803d" },
      surprises: ["捡一颗带钩的种子，猜它会挂在哪。", "吹一吹蒲公英，看谁飞得远。", "把豆子夹在湿纸巾里，看谁先发芽。"]
    },
    "nature/eyes.html": {
      companion: "xing", sticker: { id: "pupil-reader", label: "瞳孔读图员", emoji: "👁️" },
      card: { series: "自然观察", discovery: "瞳孔让光进来，晶状体把它聚到后面。", fact: "猫的瞳孔能缩成一条缝，夜里也能看。", next: "对照透镜工坊，猜晶状体更像凸透镜还是凹透镜。", accent: "#1d4ed8" },
      surprises: ["对着镜子看亮处和暗处，瞳孔谁更大。", "比较猫眼和人眼，谁更适合夜里。", "找一只昆虫，猜它的眼睛是不是许多小透镜。"]
    },
    "nature/maps.html": {
      companion: "guo", sticker: { id: "legend-reader", label: "图例读图员", emoji: "🗺️" },
      card: { series: "自然观察", discovery: "地图是缩小的模型，符号必须对照图例才读得懂。", fact: "指北针告诉你纸的哪一边是北，比例尺告诉你远近。", next: "对照河流页，在地图上找一条弯弯的蓝线。", accent: "#185d82" },
      surprises: ["先找北，再找图例。", "用手指量一段比例尺，猜真实有多远。", "给自己的房间画一张平面图。"]
    },
    "games/code-cards.html": {
      companion: "xing", sticker: { id: "card-coder", label: "指令编排员", emoji: "🃏" },
      card: { series: "创意表达", discovery: "计算机一次只做一张卡片上的事，顺序错了就会走错。", fact: "重复是把同一组步骤做许多遍。", next: "走到目标后，故意改一张卡片看它偏到哪。", accent: "#6d28d9" },
      surprises: ["先只放向前，看它能不能到。", "加一张左转，路径会怎样。", "用重复代替很多张向前。"]
    },
    "games/thermo-lab.html": {
      companion: "miao", sticker: { id: "column-reader", label: "液柱读数员", emoji: "🌡️" },
      card: { series: "物理实验", discovery: "热了液柱升高，冷了液柱下降，读的是刻度不是颜色。", fact: "液体受热会膨胀，所以柱子变长。", next: "对照冷热工坊，猜冰水和开水各在哪一段。", accent: "#c2410c" },
      surprises: ["先调到偏低，再调到偏高。", "室内温度大概在哪一格。", "这不是体温计，生病要问大人。"]
    },
    "nature/digestion.html": {
      companion: "xing", sticker: { id: "gut-walker", label: "消化道向导", emoji: "🍽️" },
      card: { series: "自然观察", discovery: "食物要走完一条路，每一站做的事不一样。", fact: "小肠才是吸收养分的主要地方。", next: "对照牙齿页，猜第一站靠什么弄碎。", accent: "#be185d" },
      surprises: ["先点口，再点小肠，比谁更靠后。", "肝脏不装食物，它在帮忙做什么。", "这不是看病，肚子痛要告诉大人。"]
    },
    "games/incline-lab.html": {
      companion: "miao", sticker: { id: "ramp-lifter", label: "斜面搬运员", emoji: "📐" },
      card: { series: "物理实验", discovery: "同样高，坡越缓越省力，但路更长。", fact: "斜面是一种简单机械，用距离换力气。", next: "对照滑轮页，猜省力时是不是都要多走一段。", accent: "#b45309" },
      surprises: ["先走陡坡，再走缓坡。", "箱子到同一高度，哪一次推得更轻。", "直提上去和走斜面，差在哪。"]
    },
    "nature/clouds.html": {
      companion: "bo", sticker: { id: "cloud-reader", label: "云层读图员", emoji: "☁️" },
      card: { series: "自然观察", discovery: "云住在不同高度：雾贴地，卷云最高，有的会下雨。", fact: "云是水汽变冷后聚成的小水滴或小冰晶。", next: "对照水循环页，猜云里的水从哪里来。", accent: "#0369a1" },
      surprises: ["先找一朵棉花糖云，再找一朵毯子云。", "雾和云有什么一样。", "飞机后面那条白线是不是云。"]
    },
    "games/pendulum-lab.html": {
      companion: "miao", sticker: { id: "swing-timer", label: "摆针计时员", emoji: "🕰️" },
      card: { series: "物理实验", discovery: "绳子越长，来回一次越慢；锤子轻重几乎不改快慢。", fact: "摆钟用稳定的来回给时间计数。", next: "对照钟表页，猜把锤子往上移，一天会走快还是走慢。", accent: "#4338ca" },
      surprises: ["先猜换重锤会不会更快。", "短绳和长绳，谁来回一次更久。", "家里的秋千更像长摆还是短摆。"]
    },
    "nature/fossils.html": {
      companion: "guo", sticker: { id: "fossil-reader", label: "化石读图员", emoji: "🦴" },
      card: { series: "自然观察", discovery: "化石分身体和痕迹：脚印记下活动，骨头留下身体。", fact: "硬的壳、牙、骨头更容易变成石头。", next: "对照恐龙页，猜脚印和骨头谁更能告诉你它怎么走。", accent: "#92400e" },
      surprises: ["先找一块痕迹化石。", "三叶虫更像住在海里还是陆上。", "公园里的化石为什么不要捡走。"]
    },
    "games/gear-lab.html": {
      companion: "miao", sticker: { id: "tooth-mesher", label: "咬合传动员", emoji: "⚙️" },
      card: { series: "物理实验", discovery: "齿轮咬合后方向相反；大带小更快，小带大更有力。", fact: "中间再加一只轮，最边上的方向会再翻一次。", next: "对照滑轮页，猜省力的时候是不是都要换一种运动。", accent: "#4338ca" },
      surprises: ["先猜两只齿轮会不会同向转。", "自行车后轮为什么比脚蹬转得快。", "加上中间轮，最右边朝哪边。"]
    },
    "nature/bees.html": {
      companion: "bo", sticker: { id: "pollen-carrier", label: "花粉搬运员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "工蜂和熊蜂身上会沾花粉，下一朵花才能结种子。", fact: "黄蜂更瘦、更爱捉虫子，不是蜜蜂。", next: "对照种子页，猜花得到花粉以后会结出什么。", accent: "#ca8a04" },
      surprises: ["先找一只工蜂，再找一只黄蜂。", "蜂王为什么不太去花上。", "看见蜂不要拍，慢慢走开。"]
    },
    "games/capillary-lab.html": {
      companion: "miao", sticker: { id: "climb-reader", label: "爬升读数员", emoji: "💧" },
      card: { series: "物理实验", discovery: "管子越细，水爬得越高。肥皂会让爬升变矮。", fact: "这不是虹吸，不需要先把管子装满。", next: "对照虹吸页，猜这两种流水差在哪。", accent: "#0284c7" },
      surprises: ["先猜细管会不会爬得更高。", "餐巾纸一边沾水，水往哪走。", "加点肥皂以后，水柱变高还是变矮。"]
    },
    "nature/tides.html": {
      companion: "bo", sticker: { id: "tide-watcher", label: "潮位守望员", emoji: "🌊" },
      card: { series: "自然观察", discovery: "高潮涨上来，低潮退下去。大潮差更大，风浪不是潮。", fact: "主要是月亮在拉海水，太阳也会帮一点。", next: "对照月亮页，猜新月满月时常常是大潮还是小潮。", accent: "#0369a1" },
      surprises: ["先分清潮和浪。", "低潮时礁石为什么露出来。", "去海边前为什么要问退潮时间。"]
    },
    "games/pressure-lab.html": {
      companion: "miao", sticker: { id: "squeeze-reader", label: "压强读数员", emoji: "🔘" },
      card: { series: "物理实验", discovery: "同一份空气，体积越小压强越大。", fact: "打开盖子，空气跑掉，指针几乎不动。", next: "对照空气工坊，猜占地方和压强是不是一件事的两面。", accent: "#4338ca" },
      surprises: ["先猜压紧以后指针往哪边。", "打开盖子再压，指针还动吗。", "捏瘪一块没扎孔的气球，手指更硬还是更软。"]
    },
    "nature/lungs.html": {
      companion: "bo", sticker: { id: "breath-reader", label: "换气读图员", emoji: "🫁" },
      card: { series: "自然观察", discovery: "吸气时膈肌往下、肺变大；呼气时肺变小。", fact: "鱼用鳃在水里换气，人用肺。", next: "对照消化页，猜气和食物是不是同一条路。", accent: "#0e7490" },
      surprises: ["先点吸气，看肺会不会变大。", "手放肚子上，吸气时手往哪边。", "人有鳃吗？"]
    },
    "nature/caves.html": {
      companion: "guo", sticker: { id: "ceiling-dripper", label: "洞顶读图员", emoji: "🦇" },
      card: { series: "自然观察", discovery: "石钟乳从洞顶往下长，石笋从洞底往上长。", fact: "一滴水同时给上面和下面留下矿物质。", next: "对照岩石页，猜石灰岩为什么会被水慢慢溶掉。", accent: "#92400e" },
      surprises: ["先找石钟乳，再找石笋。", "蝙蝠挂在洞顶还是洞底。", "进洞不要摸石钟乳。"]
    },
    "games/convection-lab.html": {
      companion: "miao", sticker: { id: "loop-watcher", label: "环流观察员", emoji: "♨️" },
      card: { series: "物理实验", discovery: "热水变轻往上走，冷水变重往下沉，连成一圈。", fact: "导热是挨着传，对流是物质自己搬家。", next: "对照热工坊，猜固体里热是怎么走的。", accent: "#c2410c" },
      surprises: ["先猜锅底热了水往哪走。", "暖气为什么装在窗下。", "几乎不热时圈还转吗。"]
    },
    "nature/glaciers.html": {
      companion: "bo", sticker: { id: "ice-walker", label: "冰舌守望员", emoji: "🧊" },
      card: { series: "自然观察", discovery: "冰川是厚冰在慢慢往下走，冰碛只是它放下的石头。", fact: "雪要压实成冰，才会像极慢的蜂蜜一样流动。", next: "对照岩石页，猜U形谷是谁刨出来的。", accent: "#0369a1" },
      surprises: ["先找冰川，再找冰碛。", "冰山是从哪断下来的。", "真冰川为什么不能走上去。"]
    },
    "games/insulation-lab.html": {
      companion: "miao", sticker: { id: "wrap-keeper", label: "外套守温员", emoji: "🧣" },
      card: { series: "物理实验", discovery: "包得厚，热进来慢，冰化得慢。", fact: "保温常常是困住不流动的空气。", next: "对照对流页，猜为什么不让空气流起来会更暖。", accent: "#b45309" },
      surprises: ["先猜毛衣会让冰化得更快还是更慢。", "金属盘上的冰会怎样。", "保温杯里藏着什么。"]
    },
    "nature/shells.html": {
      companion: "bo", sticker: { id: "shell-reader", label: "硬房读图员", emoji: "🐚" },
      card: { series: "自然观察", discovery: "螺是一只转壳，蛤蜊是两扇壳。空壳往往主人已经不在。", fact: "寄居蟹借别人的房子，壳不是它盖的。", next: "对照潮汐页，猜空壳为什么堆在潮线上。", accent: "#0e7490" },
      surprises: ["先数这只房子是一扇还是两扇。", "寄居蟹的壳是它自己盖的吗。", "壳里还在动，该怎么办。"]
    },
    "games/wheel-lab.html": {
      companion: "miao", sticker: { id: "well-turner", label: "辘轳摇轮员", emoji: "🎡" },
      card: { series: "物理实验", discovery: "大轮更省力，手要走更远；圈数和轴一样。", fact: "轮轴把斜面的那条路弯成一圈。", next: "对照齿轮页，猜大带小是不是也在换力和路程。", accent: "#b45309" },
      surprises: ["先猜轮子更大提桶会不会更轻。", "方向盘为什么要做成大圆。", "门把手比直接拧轴省在哪。"]
    },
    "nature/feathers.html": {
      companion: "xing", sticker: { id: "plume-sorter", label: "飞暖分辨员", emoji: "🪶" },
      card: { series: "自然观察", discovery: "飞羽扇空气，绒羽困住空气来保暖。", fact: "羽枝上的小钩把飞羽钩成一整片。", next: "对照保温页，猜羽绒服里装的是哪一种羽。", accent: "#15803d" },
      surprises: ["先摸一根硬羽和一根蓬松的。", "企鹅的短羽毛更像飞还是暖。", "不要拔活鸟的羽毛。"]
    },
    "games/screw-lab.html": {
      companion: "miao", sticker: { id: "thread-winder", label: "螺纹绕坡员", emoji: "🔩" },
      card: { series: "物理实验", discovery: "密螺纹更省力，要转更多圈。", fact: "螺丝钉是绕在圆柱上的斜面。", next: "对照斜面页，猜密螺纹更像缓坡还是陡坡。", accent: "#b45309" },
      surprises: ["先猜螺纹更密会不会更省力。", "用纸条斜着绕铅笔，拆开看。", "瓶盖也是螺旋吗。"]
    },
    "nature/moss.html": {
      companion: "bo", sticker: { id: "cushion-sorter", label: "青苔读图员", emoji: "🌿" },
      card: { series: "自然观察", discovery: "苔藓是小小的植物，地衣是真菌加藻类的伙伴。", fact: "地衣不是一棵树，驯鹿苔也不是苔藓。", next: "对照真菌页，猜地衣里谁在挡风、谁在做食物。", accent: "#2f6b32" },
      surprises: ["先摸软绒绒还是薄壳。", "干苔藓浇一点水会怎样。", "不要把地衣揭下来。"]
    },
    "games/hydraulic-lab.html": {
      companion: "miao", sticker: { id: "piston-pusher", label: "针筒传力员", emoji: "🧴" },
      card: { series: "物理实验", discovery: "推细针筒，粗的那边力更大、走得更短。", fact: "密闭液体里压强到处差不多。", next: "对照压强页，猜水和空气谁更不容易被挤小。", accent: "#b45309" },
      surprises: ["先猜推细的那边粗的会不会更有力。", "千斤顶哪一边是细活塞。", "管子进了空气会怎样。"]
    },
    "games/dissolve-lab.html": {
      companion: "miao", sticker: { id: "salt-dissolver", label: "溶盐观察员", emoji: "🧂" },
      card: { series: "物理实验", discovery: "盐会散开看不见，沙子只会沉底。", fact: "溶解不是消失，是拆成很小很小、均匀散开。", next: "对照过滤页，猜盐水倒过滤纸还咸不咸。", accent: "#0e7490" },
      surprises: ["先猜盐看不见了还在不在杯子里。", "糖会不会像盐一样溶开。", "不要尝不明粉末。"]
    },
    "nature/ants.html": {
      companion: "bo", sticker: { id: "trail-reader", label: "蚁路读图员", emoji: "🐜" },
      card: { series: "自然观察", discovery: "工蚁搬东西，兵蚁护巢，地上那条细线是气味路。", fact: "白蚁没有细腰，不是蚂蚁。", next: "对照蜜蜂页，猜谁也用气味和舞蹈认路。", accent: "#b45309" },
      surprises: ["先看地上那条细线会不会绕回来。", "白白胖胖没细腰的是不是蚂蚁。", "不要浇开水进蚁巢。"]
    },
    "games/wedge-lab.html": {
      companion: "miao", sticker: { id: "edge-splitter", label: "尖刃劈缝员", emoji: "🪓" },
      card: { series: "物理实验", discovery: "尖楔子更省力，要推得更深。", fact: "楔子是两面斜坡对在一起。", next: "对照斜面页，猜尖楔子更像缓坡还是陡坡。", accent: "#b45309" },
      surprises: ["先猜刀刃更尖会不会更省力。", "门挡为什么要做成斜的。", "真刀斧请大人拿。"]
    },
    "nature/spiders.html": {
      companion: "bo", sticker: { id: "silk-sorter", label: "织网读图员", emoji: "🕷️" },
      card: { series: "自然观察", discovery: "圆网是陷阱，跳蛛几乎不织猎网，自己跳过去抓。", fact: "保险丝和卵袋也是丝，但不是猎网。", next: "对照昆虫页，再数一次腿：蜘蛛是八条。", accent: "#5a3a28" },
      surprises: ["先找网中间有没有主人。", "跳蛛的大眼睛像猎人还是像坐等。", "不要拆网，也不要抓蜘蛛。"]
    },
    "games/prism-lab.html": {
      companion: "miao", sticker: { id: "beam-bender", label: "分光试验员", emoji: "🔺" },
      card: { series: "物理实验", discovery: "棱镜把白光拆成彩虹，滤色片只留下一种颜色。", fact: "白光里本来就藏着许多颜色。", next: "对照透镜页，猜聚光和拆色是不是一回事。", accent: "#7c3aed" },
      surprises: ["先猜彩虹是棱镜染上去的吗。", "橙色玻璃为什么没有整条彩虹。", "不要拿棱镜对着太阳看。"]
    },
    "nature/rainbow.html": {
      companion: "xing", sticker: { id: "spectrum-reader", label: "虹彩读图员", emoji: "🌈" },
      card: { series: "自然观察", discovery: "小水滴把白光掰弯、拆开，红在外、紫在内。", fact: "要背对太阳，站在雨的这一边。", next: "对照棱镜页，猜水滴和玻璃是不是同一件事。", accent: "#2586c4" },
      surprises: ["先站到太阳背后看喷雾。", "主虹最外面是不是红的。", "不要盯着太阳看。"]
    },
    "games/cam-lab.html": {
      companion: "miao", sticker: { id: "lobe-lifter", label: "鼓包抬杆员", emoji: "⚙️" },
      card: { series: "物理实验", discovery: "鼓包越大，杆子抬得越高。圆轮几乎不抬。", fact: "凸轮把转圈变成上下。", next: "对照齿轮页，猜转圈还能变成什么。", accent: "#b45309" },
      surprises: ["先猜鼓包更高杆子会不会更高。", "发条玩具怎么点头。", "不要拆发动机。"]
    },
    "nature/snow.html": {
      companion: "xing", sticker: { id: "flake-reader", label: "六角读雪员", emoji: "❄️" },
      card: { series: "自然观察", discovery: "雪是云里结成的六角冰晶，不是冻硬的雨。", fact: "霜贴在地上，冰雹是一层层冻硬的球。", next: "对照云朵页，猜雪花从哪一层云里来。", accent: "#4a90b0" },
      surprises: ["黑手套接一片，数数是不是六只角。", "窗上的白是霜还是雪。", "路边的雪不要吃。"]
    },
    "games/rust-lab.html": {
      companion: "miao", sticker: { id: "rust-watcher", label: "锈斑观察员", emoji: "🧱" },
      card: { series: "物理实验", discovery: "湿的裸铁容易锈，漆把水和空气挡住。", fact: "锈是铁变成的脆皮，不是颜料掉色。", next: "对照溶解页，猜锈是溶开了还是变成新东西。", accent: "#b45309" },
      surprises: ["先猜哪一根会先出现黄褐斑。", "自行车链条为什么要抹油。", "不要尝锈。"]
    },
    "nature/frost.html": {
      companion: "xing", sticker: { id: "rime-reader", label: "霜花读图员", emoji: "❄️" },
      card: { series: "自然观察", discovery: "霜是水汽在冷东西上直接结成的冰花。", fact: "露水还是水珠，雪花是从云里落下的。", next: "对照雪页，猜窗上的白是霜还是雪。", accent: "#7aa0b8" },
      surprises: ["先摸窗上的白花会不会化成水。", "草上亮晶晶的是露还是霜。", "不要舔金属窗框。"]
    },
    "nature/dew.html": {
      companion: "bo", sticker: { id: "dew-reader", label: "晨露读图员", emoji: "💧" },
      card: { series: "自然观察", discovery: "露是水汽在冷叶子上结成的小水珠，不是雨。", fact: "冷杯子外壁出汗，和露是一件事。", next: "对照凝结页，猜杯子漏了没有。", accent: "#0e7490" },
      surprises: ["先摸草是湿的，头发呢。", "冰箱杯子外壁的水从哪来。", "早上石头桥可能很滑。"]
    },
    "games/condense-lab.html": {
      companion: "miao", sticker: { id: "glass-cooler", label: "冷壁结珠员", emoji: "🧊" },
      card: { series: "物理实验", discovery: "冷杯子外壁出汗，热杯子几乎不结珠。", fact: "这些水来自空气，杯子没有漏。", next: "对照露水页，猜草上的珠是不是同一件事。", accent: "#0e7490" },
      surprises: ["先猜冷杯子的水是漏出来的吗。", "呵一口气镜子为什么模糊。", "热水请大人拿。"]
    },
    "nature/owls.html": {
      companion: "xing", sticker: { id: "silent-winger", label: "静翅夜猎员", emoji: "🦉" },
      card: { series: "自然观察", discovery: "锯齿飞羽让猫头鹰飞得更静，面盘把声音收进耳朵。", fact: "头上耳簇不是真耳朵。蝙蝠靠回声，不是静翼。", next: "对照共振页，猜杯子自己唱是不是回声。", accent: "#3d4a6b" },
      surprises: ["先听乌鸦翅膀响不响。", "头上两撮毛是耳朵吗。", "不要拿手电直射树洞。"]
    },
    "games/resonance-lab.html": {
      companion: "miao", sticker: { id: "glass-ringer", label: "合拍振杯员", emoji: "🎻" },
      card: { series: "物理实验", discovery: "酒杯沿和紧弦会自己唱，松弦几乎不唱。", fact: "推对了喜欢的速度，振动会变大。", next: "对照猫头鹰页，猜静翼和共振是不是一件事。", accent: "#7c3aed" },
      surprises: ["先猜杯子是漏气还是壁在抖。", "松橡皮筋拨得响吗。", "真玻璃杯请大人拿。"]
    },
    "nature/bats.html": {
      companion: "bo", sticker: { id: "click-mapper", label: "回声绘路员", emoji: "🦇" },
      card: { series: "自然观察", discovery: "蝙蝠用超声波回声认路，翅膀是皮膜，不是羽毛。", fact: "它是哺乳动物。大多数不吸血。", next: "对照回声页，猜弹回来的时间告诉它什么。", accent: "#5a4030" },
      surprises: ["先想我们为什么听不见它叫。", "夜里飞的一定是蝙蝠吗。", "不要拿手电长时间照洞顶。"]
    },
    "games/doppler-lab.html": {
      companion: "miao", sticker: { id: "siren-shifter", label: "警笛变调员", emoji: "🚑" },
      card: { series: "物理实验", discovery: "开来更尖，开走更低。喇叭自己没换调。", fact: "波在你前面被挤紧，在后面被拉开。", next: "对照回声页，猜弹回和声源在动是不是一回事。", accent: "#b45309" },
      surprises: ["先猜车上的人听不听得到变调。", "火车经过是不是也先尖后低。", "真急救车请让路。"]
    },
    "nature/fireflies.html": {
      companion: "xing", sticker: { id: "lantern-reader", label: "尾灯读图员", emoji: "✨" },
      card: { series: "自然观察", discovery: "萤火虫尾巴几乎不烫，闪光是找同伴的暗号。", fact: "它是甲虫。蜡烛会烫，那是热光。", next: "对照冷光页，猜荧光棒和虫子是不是亲戚。", accent: "#65a30d" },
      surprises: ["先数闪光节奏一样不一样。", "手靠近蜡烛和虫子，哪个烫。", "不要装进瓶子。"]
    },
    "games/chemilum-lab.html": {
      companion: "miao", sticker: { id: "cold-glower", label: "冷棒点光员", emoji: "🧪" },
      card: { series: "物理实验", discovery: "荧光棒几乎不烫，蜡烛会烫。", fact: "冷光把能量多变成光，热光很多变成热。", next: "对照萤火虫页，猜活灯是不是同一类事。", accent: "#65a30d" },
      surprises: ["先猜荧光棒摸起来会不会烫。", "两种液体分开亮不亮。", "不要剪开荧光棒。"]
    },
    "nature/jellyfish.html": {
      companion: "bo", sticker: { id: "bell-reader", label: "软伞读图员", emoji: "🪼" },
      card: { series: "自然观察", discovery: "水母没有骨头，伞一缩就把水往后推。", fact: "触手有的会蜇。它不是鱼。", next: "对照脉冲页，猜挤袋子是不是同一件事。", accent: "#c81769" },
      surprises: ["先看它是摆尾巴还是整把伞一缩。", "沙滩上搁浅的也不要摸。", "塑料袋别留在海里。"]
    },
    "games/pulse-lab.html": {
      companion: "miao", sticker: { id: "jet-squirter", label: "喷水反推员", emoji: "💧" },
      card: { series: "物理实验", discovery: "挤的时候水往后、袋子往前。张开是在装满。", fact: "你推水，水也推你，同时发生。", next: "对照水母页，猜伞一缩水往哪去。", accent: "#0e7490" },
      surprises: ["先猜挤袋子时袋子往前还是往后。", "放气气球为什么会飞。", "不要对着人脸喷。"]
    },
    "nature/anemones.html": {
      companion: "bo", sticker: { id: "disc-clinger", label: "盘足贴岩员", emoji: "🪸" },
      card: { series: "自然观察", discovery: "海葵是动物：触手会抓，盘足贴在石头上。", fact: "它看起来像花，却没有根和叶子。", next: "对照卡扣页，猜触手轻轻一碰打开的是什么。", accent: "#c2410c" },
      surprises: ["先看它脚下是根还是圆盘。", "潮池里缩成一团的是花吗。", "不要伸手去试软不软。"]
    },
    "games/latch-lab.html": {
      companion: "miao", sticker: { id: "hair-snapper", label: "触须扳机员", emoji: "🪤" },
      card: { series: "物理实验", discovery: "拨扳机时小针飞出，慢慢压只是把弹簧压短。", fact: "卡扣先把力存住，再一下子放出来。", next: "对照海葵页，猜刺细胞是不是活卡扣。", accent: "#b45309" },
      surprises: ["先猜轻轻碰销钉会不会射。", "衣夹捏开是慢压还是卡扣。", "不要对着眼睛弹。"]
    },
    "nature/octopuses.html": {
      companion: "xing", sticker: { id: "ink-squirter", label: "墨幕逃走员", emoji: "🐙" },
      card: { series: "自然观察", discovery: "章鱼没有骨头，吸盘抽走水就能抓住。", fact: "它是软体动物。受惊会喷墨。", next: "对照吸盘页，猜挂钩是不是同一件事。", accent: "#c45a7a" },
      surprises: ["先数胳膊是八条还是十条。", "它能从多小的缝挤过去。", "不要把手伸进石缝。"]
    },
    "games/suction-lab.html": {
      companion: "miao", sticker: { id: "cup-sealer", label: "压差贴盘员", emoji: "🔘" },
      card: { series: "物理实验", discovery: "按紧能挂住，漏气就掉。外面的空气在出力。", fact: "因为里面气少、外面空气把它压住，所以按紧能挂住，漏气就掉。", next: "对照章鱼页，猜腕上的小圆圈在做什么。", accent: "#0e7490" },
      surprises: ["先猜吸盘是胶水还是气压。", "瓷砖和砂纸哪个贴得住。", "真玻璃请大人拿。"]
    },
    "nature/starfish.html": {
      companion: "bo", sticker: { id: "arm-walker", label: "管足走路员", emoji: "⭐" },
      card: { series: "自然观察", discovery: "海星用管足走路，嘴在肚子下面。", fact: "它不是鱼。断臂还能再长。", next: "对照水囊页，猜管足里是不是也装满水。", accent: "#ea580c" },
      surprises: ["先翻过来找嘴。", "脚底有没有密密的小管。", "不要从石头上撕下来。"]
    },
    "games/hydrostat-lab.html": {
      companion: "miao", sticker: { id: "bag-stiffener", label: "水囊变硬员", emoji: "💧" },
      card: { series: "物理实验", discovery: "捏一头变硬，漏水就软。水几乎压不扁。", fact: "软皮加水也能当骨架。", next: "对照海星页，猜管足伸长时水去了哪。", accent: "#0e7490" },
      surprises: ["先猜捏一头另一头会瘪还是鼓。", "装气和装水手感一样吗。", "漏水请在水槽里做。"]
    },
    "nature/seahorses.html": {
      companion: "xing", sticker: { id: "curl-parker", label: "卷尾泊位员", emoji: "🐠" },
      card: { series: "自然观察", discovery: "海马是鱼：背鳍让它立着走，尾巴会卷住海草。", fact: "爸爸口袋里装着宝宝。它不是马。", next: "对照贴力页，猜卷尾是粘住还是钩住。", accent: "#d97706" },
      surprises: ["先看它是立着还是横着。", "尾巴是甩水还是卷住草。", "不要当宠物买回家。"]
    },
    "games/sticky-lab.html": {
      companion: "miao", sticker: { id: "cling-sorter", label: "贴力分拣员", emoji: "📎" },
      card: { series: "物理实验", discovery: "密封时空气从外面按住，盒子挂着。漏气就掉。胶带、壁虎、魔术贴是别的贴法。", fact: "贴住有好几路，气压只是其中一条。", next: "对照吸盘工坊或章鱼页，猜它们靠的是封口还是细毛。", accent: "#0369a1" },
      surprises: ["先猜密封和漏气哪边会掉。", "壁虎脚是吸盘吗。", "真玻璃请大人拿。"]
    },
    "games/grip-lab.html": {
      companion: "miao", sticker: { id: "tail-wrapper", label: "卷尾抓杆员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "卷紧能挂住，松开就滑。摩擦力在出力。", fact: "因为绕住才有足够摩擦，所以卷紧能挂住，松开就滑。", next: "对照海马页，猜尾巴卷海草是不是同一件事。", accent: "#d97706" },
      surprises: ["先猜绳子绕铅笔是胶水还是摩擦。", "光滑筷子和粗糙树枝谁更容易卷住。", "真玻璃棒请大人拿。"]
    },
    "nature/crabs.html": {
      companion: "bo", sticker: { id: "side-walker", label: "横行换壳员", emoji: "🦀" },
      card: { series: "自然观察", discovery: "螃蟹有硬壳和钳子，常常横着走。", fact: "长大要换壳。它不是昆虫。", next: "对照钳子页，猜两片合上是不是杠杆。", accent: "#c2410c" },
      surprises: ["先数前面是不是一对钳子。", "沙滩上的空壳会不会只是旧衣服。", "不要把手伸到钳子前面。"]
    },
    "games/pinch-lab.html": {
      companion: "miao", sticker: { id: "tong-pincher", label: "夹口合上员", emoji: "🦀" },
      card: { series: "物理实验", discovery: "合上能夹住，张开就掉。杠杆在换方向。", fact: "交叉点是支点。不是胶水。", next: "对照螃蟹页，猜钳子两片怎么合上。", accent: "#b45309" },
      surprises: ["先猜捏手柄夹口会开还是合。", "手柄更长会不会更省力。", "真剪刀请大人拿。"]
    },
    "nature/penguins.html": {
      companion: "xing", sticker: { id: "huddle-stander", label: "挤团守温员", emoji: "🐧" },
      card: { series: "自然观察", discovery: "企鹅用翅膀当桨，羽毛上有油。", fact: "它是鸟，不是鱼。", next: "对照油膜页，猜水为什么滚成珠子。", accent: "#1f2937" },
      surprises: ["先看翅膀是软的还是硬的。", "它会飞吗。", "不要靠近野生巢。"]
    },
    "nature/flamingos.html": {
      companion: "xing", sticker: { id: "one-leg-warmer", label: "单腿保温员", emoji: "🦩" },
      card: { series: "自然观察", discovery: "火烈鸟一只腿站直，弯喙倒过来滤浅水。", fact: "单脚是省力调温，粉色只是食谱收据。", next: "对照锁膝工坊，猜两膝都弯为什么会晃。", accent: "#c45a7a" },
      surprises: ["先看它一只腿是不是几乎伸直。", "头有没有倒过来刮水。", "只远远看，不要拍手逗它。"]
    },
    "games/oil-lab.html": {
      companion: "miao", sticker: { id: "oil-beader", label: "水珠滚走员", emoji: "🪶" },
      card: { series: "物理实验", discovery: "有油水滚走，洗掉就湿。油膜隔开水和羽毛。", fact: "肥皂能把油拆开带走。", next: "对照企鹅页，猜它每天用嘴抹什么。", accent: "#0e7490" },
      surprises: ["先猜蜡纸上的水会摊开还是缩成珠。", "肥皂洗过的羽毛还挡水吗。", "不要拔活鸟的羽毛。"]
    },
    "nature/snails.html": {
      companion: "bo", sticker: { id: "spiral-crawler", label: "螺旋爬行员", emoji: "🐌" },
      card: { series: "自然观察", discovery: "蜗牛用肚子当脚，背上有自己长的螺旋壳。", fact: "黏液是先铺的路。它不是戴帽子的虫子。", next: "对照黏液页，猜干路为什么走不动。", accent: "#4a7a32" },
      surprises: ["先找路上有没有银线。", "壳是戴上去的吗。", "不要撒盐。"]
    },
    "games/slime-lab.html": {
      companion: "miao", sticker: { id: "trail-slicker", label: "湿路铺垫员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "湿路能走，干路粘住。黏液在垫平尖刺。", fact: "因为黏液垫平尖刺才能走湿路，所以干了只剩银线，并不是普通胶水。", next: "对照蜗牛页，猜叶子上的亮线是什么。", accent: "#0e7490" },
      surprises: ["先猜湿海绵和干海绵谁更容易过砂纸。", "竖直玻璃上为什么掉不下来。", "不要对蜗牛撒盐。"]
    },
    "nature/lightning.html": {
      companion: "xing", sticker: { id: "fork-flasher", label: "分叉闪光员", emoji: "⚡" },
      card: { series: "自然观察", discovery: "闪电是云和地之间一下子跳过去的大火花。", fact: "雷声是热空气胀大。它不是烟花。", next: "对照火花页，猜缝远了为什么不跳。", accent: "#f0c14a" },
      surprises: ["先听：先闪还是先响。", "大树下面安全吗。", "雷雨请进屋。"]
    },
    "games/spark-lab.html": {
      companion: "miao", sticker: { id: "gap-jumper", label: "跳缝闪光员", emoji: "✨" },
      card: { series: "物理实验", discovery: "小缝会闪，贴住只亮灯。电荷在跳缝。", fact: "闪电是放大的同一跳。空气平时是墙。", next: "对照闪电页，猜云和地之间跳的是什么。", accent: "#b45309" },
      surprises: ["先猜贴住还会不会闪。", "门把手上的小小一跳算吗。", "插座不要碰。"]
    },
    "nature/hail.html": {
      companion: "xing", sticker: { id: "onion-pelter", label: "洋葱冰球员", emoji: "🧊" },
      card: { series: "自然观察", discovery: "冰雹是雷雨云里一层层冻起来的硬冰球。", fact: "它不是雪，也不是冰箱冰块。", next: "对照冻结页，猜上下一趟为什么多一层。", accent: "#4a5a78" },
      surprises: ["先听屋顶是沙沙还是叮叮。", "切开会不会像洋葱。", "下雹请进屋。"]
    },
    "games/freeze-lab.html": {
      companion: "miao", sticker: { id: "heat-leaver", label: "热走开结冰员", emoji: "🧊" },
      card: { series: "物理实验", discovery: "冷处冻出一圈，暖处还是水。热量在出走。", fact: "冰雹一层层就是反复送进冷处。", next: "对照冰雹页，猜云里为什么会多一圈。", accent: "#0e7490" },
      surprises: ["先猜窗台阴处和暖气旁哪里先结薄冰。", "手里冰块变小是冰跑了还是热进去了。", "不要舔金属。"]
    },
    "nature/whales.html": {
      companion: "bo", sticker: { id: "spout-breather", label: "头顶换气员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "鲸鱼用肺呼吸，头顶有喷气孔。", fact: "它是哺乳动物。白柱多半是热气遇冷。", next: "对照喷气孔页，猜孔封住还会不会喷。", accent: "#0d6b8a" },
      surprises: ["先找鼻子在头顶还是嘴边。", "尾巴是上下摆还是左右摆。", "观鲸请保持距离。"]
    },
    "games/blowhole-lab.html": {
      companion: "miao", sticker: { id: "hole-spouter", label: "细孔喷柱员", emoji: "💨" },
      card: { series: "物理实验", discovery: "孔开着喷成柱，封住不喷。气在找出路。", fact: "细孔把气聚成一股。", next: "对照鲸鱼页，猜头顶那个孔打开时气往哪冲。", accent: "#0e7490" },
      surprises: ["先猜气球细缝放气是散开还是成一股。", "白雾是水还是气。", "不要对着脸喷。"]
    },
    "nature/beavers.html": {
      companion: "guo", sticker: { id: "lodge-stacker", label: "拦河筑屋员", emoji: "🦫" },
      card: { series: "自然观察", discovery: "河狸用树枝和泥拦河，家是水上小屋。", fact: "它是兽。扁尾巴拍水面是报警。", next: "对照水坝页，猜开口以后池塘会怎样。", accent: "#6b4328" },
      surprises: ["先找尾巴是扁的还是圆的。", "树桩是不是尖得像铅笔。", "不要拆人家的坝。"]
    },
    "games/dam-lab.html": {
      companion: "miao", sticker: { id: "pond-holder", label: "堵路堆水员", emoji: "🪵" },
      card: { series: "物理实验", discovery: "堵住堆高，开口就流走。水在找更低的路。", fact: "坝要够沉才推不走。泥是用来封缝的。", next: "对照河狸页，猜它为什么还要填泥。", accent: "#0e7490" },
      surprises: ["先猜沙坑里挡一块板，水会翻过去还是堆住。", "留一条缝会怎样。", "不要在真泄洪口玩。"]
    },
    "nature/dragonflies.html": {
      companion: "xing", sticker: { id: "four-winger", label: "四翅悬停员", emoji: "🐉" },
      card: { series: "自然观察", discovery: "蜻蜓有两对能分开扇的翅膀，能停在空中。", fact: "小时候住在水里。停下来翅膀多半平摊。", next: "对照翅膀页，猜绑成一对还能不能停。", accent: "#3a7a48" },
      surprises: ["先数停下来翅膀是平摊还是合拢。", "水里爬出来的壳是谁的。", "不要用网猛扑。"]
    },
    "games/wing-lab.html": {
      companion: "miao", sticker: { id: "hover-splitter", label: "错开停空员", emoji: "🪽" },
      card: { series: "物理实验", discovery: "两对能停，一对要往前。错开扇才能托住。", fact: "空气被推走以后会反过来推翅膀。", next: "对照蜻蜓页，猜前后两对是不是在错开。", accent: "#0e7490" },
      surprises: ["先猜两把扇子错开扇和一起扇谁更能托住纸片。", "软布条扇得动空气吗。", "不要粘住活昆虫的翅膀。"]
    },
    "nature/butterflies.html": {
      companion: "xing", sticker: { id: "dust-scaler", label: "鳞粉竖翅员", emoji: "🦋" },
      card: { series: "自然观察", discovery: "蝴蝶先是毛毛虫，再进蛹，出来才有鳞粉翅膀。", fact: "停下来翅膀常常竖起。它不是鸟。", next: "对照展翅页，猜刚出蛹为什么不能飞。", accent: "#c45a7a" },
      surprises: ["先看停下来翅膀是竖着还是平摊。", "叶子背面有没有小点。", "不要摸翅膀，也不要剥蛹。"]
    },
    "games/chrysalis-lab.html": {
      companion: "miao", sticker: { id: "bag-pumper", label: "翅脉打满员", emoji: "🦋" },
      card: { series: "物理实验", discovery: "皱着飞不了，打满晾干才能扇。是打气不是魔法。", fact: "体液进翅脉，口袋撑开再变硬。", next: "对照蝴蝶页，猜刚出蛹的那几分钟在干什么。", accent: "#0e7490" },
      surprises: ["先猜皱纸巾和摊平的纸谁更能扇风。", "气球不打气能鼓起来吗。", "不要帮蝴蝶撕蛹。"]
    },
    "nature/seagrass.html": {
      companion: "bo", sticker: { id: "meadow-planter", label: "海底开花员", emoji: "🌿" },
      card: { series: "自然观察", discovery: "海草会开花、有根，有光时冒氧气泡。", fact: "它是植物。海带是藻，不开花。", next: "对照气泡页，猜蒙黑以后还会不会冒。", accent: "#4a7a32" },
      surprises: ["先找叶子底下有没有根。", "有没有小气泡往上冒。", "不要拔一把带走。"]
    },
    "games/bubble-lab.html": {
      companion: "miao", sticker: { id: "sun-bubbler", label: "见光冒泡员", emoji: "💧" },
      card: { series: "物理实验", discovery: "见光冒泡，蒙黑就停。光在让叶子做糖。", fact: "泡里主要是氧气，不是开水或肥皂。", next: "对照海草页，猜浅海里叶子上的小泡是什么。", accent: "#0e7490" },
      surprises: ["先猜窗台和抽屉哪里更容易看见小泡。", "汽水泡是同一件事吗。", "不要密封加热。"]
    },
    "nature/cicadas.html": {
      companion: "xing", sticker: { id: "year-singer", label: "旧壳歌鼓员", emoji: "🦗" },
      card: { series: "自然观察", discovery: "蝉在土里长大，爬上树把旧壳脱掉再唱歌。", fact: "空壳不是死蝉。公蝉用肚子上的鼓。", next: "对照蜕壳页，猜背上那条缝是干什么的。", accent: "#6b4328" },
      surprises: ["先翻空壳背上有没有缝。", "它是用嘴叫的吗。", "不要把活蝉关进瓶子。"]
    },
    "games/molt-lab.html": {
      companion: "miao", sticker: { id: "husk-leaver", label: "裂缝退壳员", emoji: "🪲" },
      card: { series: "物理实验", discovery: "裂开能出来，卡住就换不了号。硬壳不能跟着长。", fact: "背上有预定的缝。新壳先软后硬。", next: "对照蝉页，猜树上那只空衣服是怎么留下的。", accent: "#0e7490" },
      surprises: ["先猜小一号硬纸盒不拆胶带人出得来吗。", "拉链为什么要有一条缝。", "不要撕正在蜕皮的活虫。"]
    },
    "nature/mangroves.html": {
      companion: "bo", sticker: { id: "knee-breather", label: "膝根换气员", emoji: "🌳" },
      card: { series: "自然观察", discovery: "红树长在咸水淤泥里，根会伸出水面换气。", fact: "它是树。海草是草，松树根不露头。", next: "对照通气管页，猜开口没入还会不会通气。", accent: "#2f6b4a" },
      surprises: ["先找有没有短根露出泥面。", "叶子上有没有一层白霜。", "不要折呼吸根。"]
    },
    "games/snorkel-lab.html": {
      companion: "miao", sticker: { id: "pipe-opener", label: "露头通气员", emoji: "🪵" },
      card: { series: "物理实验", discovery: "露头能换气，没入就断。开口必须通到空气。", fact: "泥里泡满水，跟把管子按进水里一样。", next: "对照红树页，猜那些短根尖为什么要露出泥面。", accent: "#0e7490" },
      surprises: ["先猜吸管上端露出水面时吹气会怎样。", "上端也按进去呢。", "不要把头没进水里。"]
    },
    "nature/kelp.html": {
      companion: "bo", sticker: { id: "blade-clinger", label: "石爪漂叶员", emoji: "🥬" },
      card: { series: "自然观察", discovery: "海带是藻，用固着器抓住礁石，气囊帮它漂起来。", fact: "它没有花。底下那一团不是树根。", next: "对照固着页，猜从边上掀开还会不会住。", accent: "#6b8f3a" },
      surprises: ["先摸底下是爪子还是细根。", "叶子上有没有鼓起来的小泡。", "不要整丛拔。"]
    },
    "games/holdfast-lab.html": {
      companion: "miao", sticker: { id: "crack-wedger", label: "缝里卡爪员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "按进糙缝抓得住，掀开或换光滑面就掉。", fact: "很多小钩楔进缝里。不是吸盘，也不是树根。", next: "对照海带页，猜底下那一团为什么像爪子。", accent: "#0e7490" },
      surprises: ["先猜尼龙搭扣按毛巾和按玻璃哪里更难掀。", "从边上掀和直着拔哪个容易。", "不要整丛拔海带。"]
    },
    "nature/dandelions.html": {
      companion: "xing", sticker: { id: "clock-sailor", label: "绒球出航员", emoji: "🌼" },
      card: { series: "自然观察", discovery: "蒲公英种子顶着绒毛伞，风一吹就慢慢飘。", fact: "先黄后白。绒毛不是羽毛。", next: "对照降落伞页，猜捏扁以后还会不会飘。", accent: "#f0c14a" },
      surprises: ["先看每一根是不是连着一颗种子。", "黄花和白球是不是同一棵。", "不要对着人脸猛吹。"]
    },
    "games/parachute-lab.html": {
      companion: "miao", sticker: { id: "canopy-dragger", label: "张伞慢降员", emoji: "🪂" },
      card: { series: "物理实验", discovery: "张开慢降，捏扁快掉。空气在托伞。", fact: "挡风的面越大，掉得越慢。不是变轻。", next: "对照蒲公英页，猜淋湿的绒毛还会不会飘远。", accent: "#0e7490" },
      surprises: ["先猜餐巾纸摊开和揉团谁先落地。", "手张开和捏拳哪个更能挡风。", "不要从高楼往下扔。"]
    },
    "nature/otters.html": {
      companion: "bo", sticker: { id: "pelt-floater", label: "毛气漂筏员", emoji: "🦦" },
      card: { series: "自然观察", discovery: "海獭用密毛把空气藏住保暖，还会拿石头砸开贝壳。", fact: "它是兽。几乎没有厚脂肪。", next: "对照毛气页，猜挤湿以后热会不会快走。", accent: "#7a4a28" },
      surprises: ["先看毛是蓬松还是贴成一条。", "身边有没有缠着的海带。", "不要喂，也不要靠近。"]
    },
    "games/fur-air.html": {
      companion: "miao", sticker: { id: "fluff-trapper", label: "蓬松拦热员", emoji: "🧥" },
      card: { series: "物理实验", discovery: "蓬松热走得慢，挤湿就快。空气在拦热。", fact: "不动的空气导热差。水会把气室填满。", next: "对照海獭页，猜它梳毛是在干什么。", accent: "#0e7490" },
      surprises: ["先猜干羽绒服和湿羽绒服哪件更暖。", "洗洁精冲到毛上会怎样。", "不要往海里倒油。"]
    },
    "nature/turtles.html": {
      companion: "bo", sticker: { id: "vault-hider", label: "圆顶藏头员", emoji: "🐢" },
      card: { series: "自然观察", discovery: "龟背是圆顶骨房，力会传到边上，头能往里缩。", fact: "壳跟骨头连着。不是会脱掉的盒子。", next: "对照圆顶页，猜压扁以后中间还会不会住。", accent: "#3a7a48" },
      surprises: ["先看壳是鼓的还是扁盒子。", "头能缩进去吗。", "不要把活龟翻过来。"]
    },
    "games/dome-shell.html": {
      companion: "miao", sticker: { id: "rim-spreader", label: "沿边卸力员", emoji: "🏛️" },
      card: { series: "物理实验", discovery: "圆顶能托住，压扁中间先弯。力会沿着弧走。", fact: "拱把力送到支座。平板受弯。", next: "对照龟页，猜背上那间房为什么鼓起来。", accent: "#0e7490" },
      surprises: ["先猜扑克拱成桥和平铺谁更扛棋子。", "整圈握鸡蛋和从中间对折哪个先破。", "不要压活龟的壳。"]
    },
    "nature/seals.html": {
      companion: "bo", sticker: { id: "fat-hauler", label: "厚脂上岸员", emoji: "🦭" },
      card: { series: "自然观察", discovery: "海豹靠皮下厚脂肪保暖，毛短而贴，会爬上岸。", fact: "它是兽。海獭走密毛夹气那条路。", next: "对照脂肪页，猜包油脂以后凉来得快不快。", accent: "#6b6a66" },
      surprises: ["先看毛是贴着还是蓬松鼓气。", "后脚还能分开走路吗。", "不要靠近岸上晒太阳的海豹。"]
    },
    "games/blubber-lab.html": {
      companion: "miao", sticker: { id: "grease-waller", label: "油脂挡凉员", emoji: "🧈" },
      card: { series: "物理实验", discovery: "包油脂凉来得慢，光着手一下子到。脂肪是墙。", fact: "脂肪导热慢。它不会自己发热。", next: "对照海豹页，猜短毛贴身时谁在隔冷。", accent: "#0e7490" },
      surprises: ["先猜涂油套袋和只套袋哪只手先冷。", "薄薄一层和厚厚一层差在哪。", "油腻请在水槽洗，不要涂眼睛。"]
    },
    "nature/geckos.html": {
      companion: "bo", sticker: { id: "pad-walker", label: "干垫爬墙员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "壁虎用干刚毛贴玻璃，沾水或油就滑。", fact: "它不是胶水，也不是雨蛙那种湿吸盘。", next: "对照刚毛页，猜沾湿以后还会不会挂住。", accent: "#65a30d" },
      surprises: ["先看脚趾是宽垫还是尖爪。", "玻璃上有没有湿印。", "不要抓，更不要拔尾巴。"]
    },
    "games/setae-lab.html": {
      companion: "miao", sticker: { id: "dry-hanger", label: "干毛挂钩员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "擦干能挂住，沾湿就滑。毛尖要贴得很近。", fact: "因为毛尖要贴得很近才挂得住，所以沾湿或沾油就会滑，并不是胶水也不是吸盘。", next: "对照壁虎页，猜它抬脚为什么像揭胶带。", accent: "#0e7490" },
      surprises: ["先猜湿手和干手谁更能贴光滑桌。", "胶带从边上揭和直着拔哪个容易。", "不要抓野生壁虎。"]
    },
    "nature/plankton.html": {
      companion: "bo", sticker: { id: "sun-drifter", label: "随波小厨房", emoji: "🔬" },
      card: { series: "自然观察", discovery: "浮游生物很小，几乎不会自己游远，靠水带着走。", fact: "有的见光做糖。鱼会自己游。", next: "对照漂流页，猜摊开为什么掉得慢。", accent: "#0d6b8a" },
      surprises: ["先问它是自己游远还是水带走。", "要用放大镜才看得见吗。", "不要舀一桶回家养。"]
    },
    "games/drift-lab.html": {
      companion: "miao", sticker: { id: "crumple-dropper", label: "摊开慢降员", emoji: "📄" },
      card: { series: "物理实验", discovery: "摊开掉得慢，揉团沉得快。不是纸变轻。", fact: "挡板大，水或空气托得住。", next: "对照浮游页，猜硅藻为什么常常是扁的。", accent: "#0e7490" },
      surprises: ["先猜同一张纸摊开和揉团谁先落地。", "放到一杯静水里呢。", "不要从高楼往下扔。"]
    },
    "nature/lotus.html": {
      companion: "xing", sticker: { id: "wax-beader", label: "蜡突滚珠员", emoji: "🪷" },
      card: { series: "自然观察", discovery: "荷叶上有蜡突，水会缩成珠子把泥带走。", fact: "它挺出水面。睡莲多贴着漂。", next: "对照滚珠页，猜把蜡擦掉水还会不会成珠。", accent: "#2f7a3e" },
      surprises: ["先看叶子是挺出水面还是贴着。", "水是珠子还是摊开的。", "不要折公园荷叶。"]
    },
    "games/bead-lab.html": {
      companion: "miao", sticker: { id: "drop-roller", label: "水珠自洁员", emoji: "💧" },
      card: { series: "物理实验", discovery: "涂蜡水成珠，擦掉就摊开。蜡在挡水。", fact: "水和蜡不亲。肥皂会破坏蜡。", next: "对照荷叶页，猜泥为什么跟着珠子走。", accent: "#0e7490" },
      surprises: ["先猜雨衣和毛巾谁让水成珠。", "洗洁精浇到荷叶上会怎样。", "不要把洗洁精倒进池塘。"]
    },
    "nature/pinecones.html": {
      companion: "xing", sticker: { id: "scale-hinge", label: "干张湿合员", emoji: "🌲" },
      card: { series: "自然观察", discovery: "松果鳞片干了张开，湿了合拢。", fact: "它不是花。橡子不会一张一合。", next: "对照干湿页，猜烘干以后缝会不会变大。", accent: "#8a5a28" },
      surprises: ["先看鳞片是张开还是合拢。", "缝里有没有带翅的种子。", "只捡掉在地上的。"]
    },
    "games/humidity-lab.html": {
      companion: "miao", sticker: { id: "humid-closer", label: "两面弯片员", emoji: "🌰" },
      card: { series: "物理实验", discovery: "烘干张开，沾湿合拢。它自己弯。", fact: "两面吸水不一样。没有马达。", next: "对照松果页，猜种子为什么等天干才出门。", accent: "#0e7490" },
      surprises: ["先猜暖气片上的松果缝会变大还是变小。", "头发湿了也会变吗。", "不要掰活枝。"]
    },
    "nature/tidepools.html": {
      companion: "bo", sticker: { id: "pool-zoner", label: "干湿分带员", emoji: "🪨" },
      card: { series: "自然观察", discovery: "潮池是退潮留在礁石缝里的小海，高处干、低处湿。", fact: "因为潮水每天涨退把生物筛到不同高度，所以礁石上会看见干湿色带，并不是一场雨留下的水洼。", next: "对照分区页，猜高处为什么更咸。", accent: "#0d6b8a" },
      surprises: ["先找石头上有没有一层一层的颜色。", "这一汪是淡水还是带咸味。", "不要翻石头。"]
    },
    "games/zone-lab.html": {
      companion: "miao", sticker: { id: "dry-higher", label: "高处先干员", emoji: "📶" },
      card: { series: "物理实验", discovery: "高处干热咸，低处潮凉稳。带子是日子筛出来的。", fact: "比的是一天里湿多久。没有人涂色。", next: "对照潮池页，猜藤壶为什么住得偏高。", accent: "#0e7490" },
      surprises: ["先猜湿海绵放窗台和碗底哪边先干。", "盐会留在哪边。", "涨潮请离开礁石。"]
    },
    "nature/sharks.html": {
      companion: "bo", sticker: { id: "denticle-slicker", label: "盾鳞滑水员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "鲨鱼皮铺着朝后的小齿鳞，从头摸到尾顺，反过来糙。", fact: "它是鱼。海豚皮光滑，用肺。", next: "对照盾鳞页，猜沟槽为什么让水少打转。", accent: "#0d4d78" },
      surprises: ["先看皮是单向糙还是光滑。", "鳃裂在哪一边。", "不要摸活鲨鱼。"]
    },
    "games/denticle-lab.html": {
      companion: "miao", sticker: { id: "grain-slider", label: "顺鳞滑过员", emoji: "🛡️" },
      card: { series: "物理实验", discovery: "装上盾鳞水贴着走，换成光滑皮后面更乱。", fact: "沟槽减少乱流。不是胶水。", next: "对照鲨鱼页，猜为什么只能顺着摸。", accent: "#0e7490" },
      surprises: ["先猜泳衣上细沟和光滑哪件更快。", "砂纸和盾鳞差在哪。", "不要摸活鲨鱼。"]
    },
    "nature/eels.html": {
      companion: "bo", sticker: { id: "cell-stacker", label: "电堆放电员", emoji: "⚡" },
      card: { series: "自然观察", discovery: "电鳗肚子里叠着电细胞，会放电探路或打猎。", fact: "它不是真鳗。真鳗肚子里没有电堆。", next: "对照电堆页，猜片数多了脉冲会怎样。", accent: "#c4a06a" },
      surprises: ["先看身子里有没有一叠薄片。", "它住浑水还是海里。", "不要摸，隔着玻璃看。"]
    },
    "games/amp-lab.html": {
      companion: "miao", sticker: { id: "volt-adder", label: "叠片加高员", emoji: "🔋" },
      card: { series: "物理实验", discovery: "少几片弱，叠很多强。电压顺着串联相加。", fact: "因为电压只在串联时一片片相加，所以并排放加不高，并不是换了一种电。", next: "对照电鳗页，猜打猎为什么要叠很多。", accent: "#0e7490" },
      surprises: ["先猜手电筒一节电池和两节哪边更亮。", "电线自己会加电压吗。", "不要拆插座。"]
    },
    "nature/cacti.html": {
      companion: "xing", sticker: { id: "spine-saver", label: "刺叶藏水员", emoji: "🌵" },
      card: { series: "自然观察", discovery: "仙人掌用肉茎藏水，刺是叶子变的。", fact: "它不是树。多肉把水藏在厚叶子里。", next: "对照储水页，猜挤干以后还能不能过干季。", accent: "#2f7a3e" },
      surprises: ["先看绿的是鼓茎还是细树干。", "刺是从一小撮垫子里长出来的吗。", "不要摸，也不要挤。"]
    },
    "games/store-lab.html": {
      companion: "miao", sticker: { id: "juice-cellar", label: "茎里仓库员", emoji: "💧" },
      card: { series: "物理实验", discovery: "灌满鼓着，挤干就瘪。水藏在格子里。", fact: "因为水藏在茎里的格子里、外面的蜡少漏水，所以灌满会鼓、挤干会瘪，并不是一块海绵。", next: "对照仙人掌页，猜一场雨以后茎为什么更圆。", accent: "#0e7490" },
      surprises: ["先猜鼓着的多肉和薄叶子谁先蔫。", "洗洁精浇上去会怎样。", "不要挤盆栽。"]
    },
    "nature/crows.html": {
      companion: "xing", sticker: { id: "wire-bender", label: "弯丝钓环员", emoji: "🐦‍⬛" },
      card: { series: "自然观察", discovery: "乌鸦会把铁丝弯成钩，把杯子里的小环钓上来。", fact: "它不是不吉利。鸽子很少这样做。", next: "对照弯钩页，猜直着为什么钩不住。", accent: "#1f2937" },
      surprises: ["先看它是乱啄还是先改一下工具。", "路上有没有被车碾开的坚果。", "不要投喂，不要掏巢。"]
    },
    "games/hook-lab.html": {
      companion: "miao", sticker: { id: "ring-fisher", label: "弯头兜环员", emoji: "🪝" },
      card: { series: "物理实验", discovery: "弯钩钓得上来，直着只会推。改形状就是做工具。", fact: "钩把力拐一个弯。没有魔法。", next: "对照乌鸦页，猜它弯一下是在干什么。", accent: "#0e7490" },
      surprises: ["先猜吸管直着和折一个小弯谁先掏出橡皮筋。", "衣架为什么要有钩。", "不要用真正的鱼钩。"]
    },
    "nature/hummingbirds.html": {
      companion: "xing", sticker: { id: "sip-hoverer", label: "停花吸蜜员", emoji: "🌺" },
      card: { series: "自然观察", discovery: "蜂鸟翅膀走八字，来回都推风，能停在花前。", fact: "它不是直升机。鸽子要一直往前飞。", next: "对照悬停页，猜只往前飞为什么一停就掉。", accent: "#c2410c" },
      surprises: ["先看它是钉在花前还是必须往前冲。", "翅膀是上下扇还是走出扁八字。", "不要抓，只看花丛。"]
    },
    "games/hover-lab.html": {
      companion: "miao", sticker: { id: "fig8-beater", label: "八字拍风员", emoji: "🪽" },
      card: { series: "物理实验", discovery: "八字停得住，只往前飞一停就掉。是拍法在推风。", fact: "因为翅膀来回都往下推风，所以八字停得住，并不是换成更大的鸟。", next: "对照蜂鸟页，猜它为什么能对准花管。", accent: "#0e7490" },
      surprises: ["先猜自行车一停为什么会倒。", "纸飞机一停会怎样。", "不要靠近旋翼。"]
    },
    "nature/woodpeckers.html": {
      companion: "bo", sticker: { id: "chisel-tapper", label: "凿嘴卸震员", emoji: "🪵" },
      card: { series: "自然观察", discovery: "啄木鸟用凿子嘴敲树，舌头绕头当安全带。", fact: "它不是电钻。鸽子不会这样敲。", next: "对照减震页，猜没垫时震会不会直穿。", accent: "#c45a7a" },
      surprises: ["先看它是竖着趴树还是站地上。", "嘴是直凿还是弯钩。", "不要掏它凿的洞。"]
    },
    "games/shock-lab.html": {
      companion: "miao", sticker: { id: "skull-spring", label: "软垫散力员", emoji: "🛡️" },
      card: { series: "物理实验", discovery: "有垫震散开，没垫直穿。软的在拆力。", fact: "因为软垫把震动拆散，所以有垫时力散开、没垫时直穿，并不是头更硬；头盔也是这件事。", next: "对照啄木鸟页，猜舌骨带在勒什么。", accent: "#0e7490" },
      surprises: ["先猜赤脚跳和厚底鞋谁更震。", "泡沫头盔里的洞是干什么的。", "不要用头撞树。"]
    },
    "nature/salmons.html": {
      companion: "bo", sticker: { id: "natal-climber", label: "回河变身员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "鲑鱼会逆着河往上爬，身子会变红、下巴会翘。", fact: "它不是待在水塘里的鱼。鲤鱼、金鱼多半待着。", next: "对照逆流页，猜顺着流为什么上不去。", accent: "#c2410c" },
      surprises: ["先看它是对着水往上，还是待在一个塘里。", "身子是银亮的还是变红了。", "不要捉，也不要把金鱼放进河里。"]
    },
    "games/current-lab.html": {
      companion: "miao", sticker: { id: "nose-into-flow", label: "顶水上行员", emoji: "🔼" },
      card: { series: "物理实验", discovery: "顺着被带走，逆着才能往上。是朝向和用力在比水。", fact: "因为水一直往下走，所以顺着被带走，逆着才能往上，并不是换成更大的鱼。", next: "对照鲑鱼页，猜它为什么把头转过来。", accent: "#0e7490" },
      surprises: ["先猜洗手时泡沫为什么往下走。", "树叶会不会自己往上。", "涨水请离开河边。"]
    },
    "nature/chameleons.html": {
      companion: "xing", sticker: { id: "crystal-shifter", label: "晶格换色员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "变色龙皮下有一层小格子，挤紧偏绿，拉开偏橙。", fact: "它不是倒油漆。壁虎贴墙，不换这层格子。", next: "对照鳞缝页，猜缝宽为什么会挑光。", accent: "#16a34a" },
      surprises: ["先看它是慢慢换一层光，还是像倒油漆。", "两只眼睛是不是各看一边。", "不要抓，也不要涂颜料。"]
    },
    "games/chroma-lab.html": {
      companion: "miao", sticker: { id: "gap-tuner", label: "缝宽换色员", emoji: "💠" },
      card: { series: "物理实验", discovery: "挤紧偏绿，拉开偏橙。是缝宽在挑光。", fact: "因为缝宽在挑哪些光留下来，所以挤紧偏绿、拉开偏橙，并不是换了一桶漆；肥皂泡也是这件事。", next: "对照变色龙页，猜它为什么不是刷漆。", accent: "#0e7490" },
      surprises: ["先猜肥皂泡一变薄为什么换颜色。", "光盘斜着看会怎样。", "不要给宠物涂颜料。"]
    },
    "games/blend-lab.html": {
      companion: "miao", sticker: { id: "spot-spreader", label: "格子铺开员", emoji: "🎨" },
      card: { series: "物理实验", discovery: "张开变深，收拢变浅。是格子挡住或露出下层。", fact: "因为格子张开露出下层、收拢挡住下层，所以颜色变深或变浅，并不是复印壁纸。", next: "对照变色龙页，猜它趴在花裙子上会不会变成每一朵花。", accent: "#0e7490" },
      surprises: ["先猜浅纸上摊开和揉成团的玻璃纸哪边更深。", "一层颜料能自己变浅吗。", "不要抓活变色龙。"]
    },
    "nature/porcupines.html": {
      companion: "bo", sticker: { id: "hollow-lifter", label: "空心扛刺员", emoji: "🦔" },
      card: { series: "自然观察", discovery: "豪猪的刺是空心的毛，碰一下才会掉，不是飞镖。", fact: "它是兽。仙人掌的刺是叶子变的。", next: "对照空心刺页，猜实心的同样长为什么更沉。", accent: "#6b5344" },
      surprises: ["先看刺是一根一根竖着，还是从肉茎里长出来。", "它会不会先抖一下。", "不要摸，把狗牵好。"]
    },
    "games/quill-lab.html": {
      companion: "miao", sticker: { id: "core-lighter", label: "去芯减重员", emoji: "🪶" },
      card: { series: "物理实验", discovery: "空心轻，实心沉。背上要扛很多根，空心才划得来。", fact: "中间少了材料。外壳还能撑。", next: "对照豪猪页，猜它为什么不用实心木头当刺。", accent: "#0e7490" },
      surprises: ["先猜吸管和同样长的实心橡皮泥谁先压下天平。", "自行车架为什么是管子。", "尖物收好，不要当飞镖扔。"]
    },
    "nature/pandas.html": {
      companion: "bo", sticker: { id: "thumb-holder", label: "籽骨握竹员", emoji: "🐼" },
      card: { series: "自然观察", discovery: "熊猫前掌多一块籽骨当钩，才能握住竹子。", fact: "它是熊。肠子短，所以要吃很多。", next: "对照握竹页，猜没钩时竹子会不会滑。", accent: "#1f2937" },
      surprises: ["先看前掌内侧有没有小鼓包。", "它是坐着剥还是四脚撕。", "不要敲玻璃，也不要扔零食。"]
    },
    "games/bamboo-lab.html": {
      companion: "miao", sticker: { id: "bamboo-gripper", label: "对夹止滚员", emoji: "🎋" },
      card: { series: "物理实验", discovery: "有钩卡住，没钩滑走。钩在对夹。", fact: "圆棍子会滚。不是胶水。", next: "对照熊猫页，猜那根钩是手指还是籽骨。", accent: "#0e7490" },
      surprises: ["先猜光掌心握铅笔和拇指对握谁不容易掉。", "筷子是两根还是一根钩。", "不要拔竹林。"]
    },
    "nature/skunks.html": {
      companion: "bo", sticker: { id: "last-sprayer", label: "末招喷雾员", emoji: "🦨" },
      card: { series: "自然观察", discovery: "臭鼬先跺脚、竖尾巴，喷雾是最后一招。", fact: "黑白条是警告色。不是浇花水管一直开着。", next: "对照喷雾页，猜细孔为什么比敞口喷得远。", accent: "#1f2937" },
      surprises: ["先看它是跺脚竖尾，还是一上来就喷。", "背上是黑白条还是一身刺。", "看见竖尾巴请把狗牵远。"]
    },
    "games/spray-lab.html": {
      companion: "miao", sticker: { id: "pore-faster", label: "细孔加速员", emoji: "🧴" },
      card: { series: "物理实验", discovery: "细孔远，敞口淌。同样一挤，口变窄水才跑得快。", fact: "因为同样一挤、口变窄水才跑得快，所以细孔喷得远，敞口只会淌下来。", next: "对照臭鼬页，猜它要喷到远处，口该大还是该小。", accent: "#0e7490" },
      surprises: ["先猜拧上细嘴和拔掉盖子哪边更远。", "拇指按住水管口会怎样。", "只喷清水，不要对人。"]
    },
    "nature/albatross.html": {
      companion: "bo", sticker: { id: "lock-soarer", label: "锁翅滑海员", emoji: "🕊️" },
      card: { series: "自然观察", discovery: "信天翁翅膀又长又窄，肩上能锁住，靠两层风滑。", fact: "海鸥要拍很多下。蜂鸟反过来一直拍。", next: "对照借风页，猜拿掉锁、风也不分层会怎样。", accent: "#1d4e89" },
      surprises: ["先看翅膀是尺子还是短桨。", "它是几乎不动地滑，还是一下一下拍。", "只远远看，不要追。"]
    },
    "games/soar-lab.html": {
      companion: "miao", sticker: { id: "shear-rider", label: "风切借力员", emoji: "🌬️" },
      card: { series: "物理实验", discovery: "锁住滑得远，狂拍就掉。差在借不借两层风。", fact: "因为翅膀锁住才能借两层风的速度差往前滑，所以狂拍翅膀反而会掉下去。", next: "对照信天翁页，猜那把锁是骨头还是肌腱。", accent: "#0e7490" },
      surprises: ["先猜纸飞机从楼上扔和没风的屋里扔哪边更远。", "自行车下坡要不要一直蹬。", "不要追海鸟。"]
    },
    "nature/camels.html": {
      companion: "bo", sticker: { id: "hump-larder", label: "峰上粮仓员", emoji: "🐪" },
      card: { series: "自然观察", discovery: "驼峰里装的是脂肪，不是一罐水。", fact: "渴了用的水在血和细胞里。", next: "对照驼峰页，猜没草时该选干粮还是饮料。", accent: "#c4a06a" },
      surprises: ["先看峰是软鼓鼓的油，还是会晃的水。", "它是一座峰还是两座。", "不要喂，也不要把水倒进沙堆。"]
    },
    "games/hump-lab.html": {
      companion: "miao", sticker: { id: "dry-rationer", label: "干粮对照员", emoji: "🎒" },
      card: { series: "物理实验", discovery: "脂肪是干粮，水是饮料。没吃的时候干粮更能扛。", fact: "同样沉的一包，里面不一样，用处就不一样。", next: "对照骆驼页，猜峰该是干粮还是水箱。", accent: "#0e7490" },
      surprises: ["先猜一瓶油和一瓶水哪瓶更能当饭。", "渴了该打开哪一包。", "油别洒，不要喝。"]
    },
    "nature/squids.html": {
      companion: "bo", sticker: { id: "recoil-swimmer", label: "反冲滑水员", emoji: "🦑" },
      card: { series: "自然观察", discovery: "乌贼把水从漏斗喷出去，身子往反方向走。", fact: "鱼靠尾巴摆。喷墨是烟幕，不是发动机。", next: "对照反冲页，猜扎紧口的气球为什么不飞。", accent: "#c45a7a" },
      surprises: ["先看水从哪一个口喷出去。", "身子往哪边走。", "不要捉岸边的枪乌贼。"]
    },
    "games/jet-lab.html": {
      companion: "miao", sticker: { id: "jet-backer", label: "放气反冲员", emoji: "🎈" },
      card: { series: "物理实验", discovery: "气往后，球往前。扎紧就掉下来。", fact: "因为气往后喷时球会被反推向前，所以气口扎紧、气喷不出去，球就掉下来。", next: "对照乌贼页，猜漏斗该朝哪边才能往右走。", accent: "#0e7490" },
      surprises: ["先猜松手的气球和扎紧的气球谁会窜。", "没握稳的水管为什么往后坐。", "不要对着脸放气。"]
    },
    "nature/kingfishers.html": {
      companion: "xing", sticker: { id: "splash-diver", label: "尖头扎水员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "翠鸟从树枝上尖头扎进水里抓鱼。", fact: "它不是鸭子。苍鹭站着等。", next: "对照入水页，猜圆头为什么溅得更高。", accent: "#2586c4" },
      surprises: ["先看它是停在树枝上还是浮在水面。", "嘴是尖的还是扁的。", "不要扔石头赶它。"]
    },
    "games/dive-lab.html": {
      companion: "miao", sticker: { id: "beak-spear", label: "尖端破缝员", emoji: "💧" },
      card: { series: "物理实验", discovery: "尖头花小，圆头花大。谁先破开水面，花就不一样。", fact: "因为尖头先破开的空腔小、圆头空腔大，所以溅起的水花不一样。", next: "对照翠鸟页，猜它为什么要把嘴叠成一条线。", accent: "#0e7490" },
      surprises: ["先猜铅笔尖朝下和橡皮头朝下哪边溅得高。", "高铁头为什么是尖的。", "不要从岸上往河里跳。"]
    },
    "nature/foxes.html": {
      companion: "bo", sticker: { id: "snow-pouncer", label: "雪地跳扑员", emoji: "🦊" },
      card: { series: "自然观察", discovery: "狐狸先听，再蹲，后腿一伸跳出去。", fact: "它不是飞。狼更会跑远路追。", next: "对照弹跳页，猜站直为什么跳不起来。", accent: "#c47a3a" },
      surprises: ["先看它是蹲着还是站直飞。", "耳朵是尖的还是垂的。", "不要喂，也不要追。"]
    },
    "games/pounce-lab.html": {
      companion: "miao", sticker: { id: "coil-jumper", label: "先压再弹员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "先蹲高，站直低。弹簧要先压紧。", fact: "因为跳之前要把腿当弹簧先压紧，所以站直起跳会矮一截。", next: "对照狐狸页，猜后腿该先收短还是先绷直。", accent: "#0e7490" },
      surprises: ["先猜地毯上蹲跳和站直跳谁更高。", "袋鼠为什么也要先蹲。", "只在软地上跳。"]
    },
    "nature/frogs.html": {
      companion: "bo", sticker: { id: "fold-hopper", label: "折腿弹跳员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "青蛙后腿先折起来再弹出去。蝌蚪还没有腿。", fact: "它不是蜥蜴。蟾蜍腿短，更爱走。", next: "对照起跳页，猜一直伸直为什么弹不远。", accent: "#4a7a32" },
      surprises: ["先看后腿是叠着还是一直伸直。", "身边有没有还在游的小蝌蚪。", "不要用肥皂洗它。"]
    },
    "games/jump-lab.html": {
      companion: "miao", sticker: { id: "tendon-snapper", label: "腱条回弹员", emoji: "🦿" },
      card: { series: "物理实验", discovery: "先折再蹬弹得远，一直伸直弹不起来。", fact: "腱像橡皮筋，要先拉长。", next: "对照青蛙页，猜它为什么先蹲着。", accent: "#0e7490" },
      surprises: ["先猜立定跳远要不要先蹲。", "橡皮筋不拉会飞吗。", "不要抓真青蛙。"]
    },
    "nature/giraffes.html": {
      companion: "bo", sticker: { id: "long-segmenter", label: "七节拉长员", emoji: "🦒" },
      card: { series: "自然观察", discovery: "长颈鹿的脖子也是七节，每一节特别长。", fact: "因为长颈鹿和人一样是七节颈椎、只是每一节特别长，所以脖子够得着高叶子，并不是多了一种新骨头。", next: "对照长颈页，猜整根硬棒为什么够不着旁边。", accent: "#d97706" },
      surprises: ["先摸摸自己的脖子，数得出节吗。", "头上那两根包不包皮。", "不要伸手喂树叶。"]
    },
    "games/neck-lab.html": {
      companion: "miao", sticker: { id: "bend-linker", label: "接头转弯员", emoji: "🦴" },
      card: { series: "物理实验", discovery: "分段能弯，整根是直的。要有能转的接头。", fact: "因为只有接头能转整根才会拐弯，所以一根没剪开的吸管还是直的。", next: "对照长颈鹿页，猜它为什么还要七节而不是一根水管。", accent: "#0e7490" },
      surprises: ["先猜剪成七段的吸管和一根没剪的谁更好弯。", "火车为什么要分车厢。", "尖物收好。"]
    },
    "nature/peacocks.html": {
      companion: "bo", sticker: { id: "train-fanner", label: "开屏展斑员", emoji: "🦚" },
      card: { series: "自然观察", discovery: "孔雀打开背上的尾屏，眼斑对着你。", fact: "它不是火鸡。纸扇是人做的。", next: "对照开屏页，猜合上为什么点子看不见。", accent: "#0f766e" },
      surprises: ["先看背后是大扇子还是尖尾巴。", "眼斑是对着你还是藏着。", "不要拔它的毛。"]
    },
    "games/fan-lab.html": {
      companion: "miao", sticker: { id: "fan-widener", label: "扇面铺开员", emoji: "🪭" },
      card: { series: "物理实验", discovery: "打开面积大，合上点子藏住。同一把屏。", fact: "因为同一把屏打开面积才变大，所以合上时点子藏住，并没有换成更大的尾巴。", next: "对照孔雀页，猜尾屏是覆羽还是飞羽。", accent: "#0e7490" },
      surprises: ["先猜折扇打开和合上谁更容易看见上面的画。", "同一张报纸摊开和卷起来差在哪。", "不要拔真毛。"]
    },
    "nature/armadillos.html": {
      companion: "bo", sticker: { id: "shell-curler", label: "骨板蜷球员", emoji: "🛡️" },
      card: { series: "自然观察", discovery: "犰狳背上是能折的骨板，有的能蜷成球。", fact: "乌龟壳黏在脊椎上。刺猬靠刺。", next: "对照蜷球页，猜一整块硬壳为什么蜷不动。", accent: "#8a6a40" },
      surprises: ["先看背上是一块一块的板，还是一整块壳。", "它有没有把头脚收回去。", "不要翻它。"]
    },
    "games/roll-lab.html": {
      companion: "miao", sticker: { id: "plate-roller", label: "板缝折球员", emoji: "🟡" },
      card: { series: "物理实验", discovery: "有缝能蜷成球，一整块就蜷不动。", fact: "因为板和板之间有缝才能折，所以一整块硬壳蜷不成球。", next: "对照犰狳页，猜骨板之间那条缝在干什么。", accent: "#0e7490" },
      surprises: ["先猜折尺和木板谁能弯成圈。", "书为什么能合上。", "不要翻真犰狳。"]
    },
    "nature/elephants.html": {
      companion: "bo", sticker: { id: "trunk-gripper", label: "肌肉卷物员", emoji: "🐘" },
      card: { series: "自然观察", discovery: "大象鼻子是一捆能卷的肌肉，不是空心吸管。", fact: "水先装进鼻子，再倒进嘴里。", next: "对照长鼻页，猜空管子为什么卷不住。", accent: "#8a857c" },
      surprises: ["先看鼻子是软的一捆，还是硬的一根骨头。", "喝水是一直吸，还是先装再倒。", "不要伸手喂园里的大象。"]
    },
    "games/trunk-lab.html": {
      companion: "miao", sticker: { id: "hose-lifter", label: "装满再卷员", emoji: "🌀" },
      card: { series: "物理实验", discovery: "软管装满才能卷住，空着就瘪。", fact: "因为软管要先装满才有劲去卷东西，所以空管子会瘪，卷不住。", next: "对照大象页，猜鼻子里装的是骨头还是肌肉。", accent: "#0e7490" },
      surprises: ["先猜空袜子和装满米的袜子谁更好抓。", "消防水管为什么要先充满水。", "不要拿真象鼻子试。"]
    },
    "nature/hedgehogs.html": {
      companion: "bo", sticker: { id: "spine-curler", label: "毛刺蜷球员", emoji: "🦔" },
      card: { series: "自然观察", discovery: "刺猬的刺是变硬的毛，能蜷成球，一般不掉。", fact: "豪猪刺更长会掉。犰狳靠骨板。", next: "对照蜷刺页，猜皮不缩为什么包不住。", accent: "#6b5344" },
      surprises: ["先看刺是短而密，还是又长又会掉。", "它有没有把头脚收回去。", "不要摸刺。"]
    },
    "games/curl-lab.html": {
      companion: "miao", sticker: { id: "hair-baller", label: "缩皮包球员", emoji: "🧥" },
      card: { series: "物理实验", discovery: "皮一缩就包住，摊开肚皮还在。", fact: "因为刺还连在同一张皮上、皮一缩才把头脚包住，所以摊开时并没有多出一把图钉。", next: "对照刺猬页，猜刺还连不连在皮上。", accent: "#0e7490" },
      surprises: ["先猜帽子戴上和掀开哪边把头包得更严。", "外套松和绷紧哪边更好缩。", "不要摸真刺。"]
    },
    "nature/kangaroos.html": {
      companion: "bo", sticker: { id: "tendon-bouncer", label: "腱条回弹员", emoji: "🦘" },
      card: { series: "自然观察", discovery: "袋鼠落地把腱拉长，再弹起来。不是每次重新蹲完。", fact: "兔子也会跳，可不能一路弹着省力跑。", next: "对照回弹页，猜不拉皮筋为什么球不动。", accent: "#c4a06a" },
      surprises: ["先看落地之后是弹起来，还是完全停住再蹲。", "尾巴有没有撑地。", "不要追，袋子里可能有宝宝。"]
    },
    "games/hop-lab.html": {
      companion: "miao", sticker: { id: "snap-returner", label: "先拉再还员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "先拉远，不拉停。力要先存进去。", fact: "因为皮筋要先被拉长才能把力还回去，所以松着的皮筋弹不走纸团。", next: "对照袋鼠页，猜落地那一下在干什么。", accent: "#0e7490" },
      surprises: ["先猜拉长的皮筋和松着的皮筋谁能把纸团送远。", "弹跳杆落地为什么能再把人送上去。", "不要对人弹。"]
    },
    "nature/rhinos.html": {
      companion: "bo", sticker: { id: "keratin-stacker", label: "角质堆角员", emoji: "🦏" },
      card: { series: "自然观察", discovery: "犀牛角是一层层压实的角质，不是骨头，也不是牙。", fact: "鹿角是骨头。牛角里面有骨芯。", next: "对照角质页，猜松开为什么变软。", accent: "#8a857c" },
      surprises: ["先看角是坐在鼻子上，还是头顶分叉。", "它会不会整根脱掉。", "不要摸，也不要收集。"]
    },
    "games/horn-lab.html": {
      companion: "miao", sticker: { id: "horn-layer", label: "压实变硬员", emoji: "🟤" },
      card: { series: "物理实验", discovery: "压实就硬，松开就软。还是同一把纤维。", fact: "因为同一把纤维压实才变硬，所以松开以后摸起来还是软的，并没有变成骨头。", next: "对照犀牛页，猜角该是实心还是空心。", accent: "#0e7490" },
      surprises: ["先猜头发松着和编成辫哪边更硬。", "一张纸和一叠纸板谁更硬。", "不要摸真角。"]
    },
    "nature/hippos.html": {
      companion: "bo", sticker: { id: "bottom-walker", label: "水底走路员", emoji: "🦛" },
      card: { series: "自然观察", discovery: "河马身子沉，眼耳鼻长在头顶。不是鸭子那样漂着。", fact: "它多半在水底走路，不是游泳圈。", next: "对照沉底页，猜空瓶子为什么漂得高。", accent: "#6b6a66" },
      surprises: ["先看水面上看得到整个背，还是只看得到眼睛。", "它是在走还是在漂。", "不要靠近水面。"]
    },
    "games/sink-lab.html": {
      companion: "miao", sticker: { id: "cap-sinker", label: "只露盖子员", emoji: "🍾" },
      card: { series: "物理实验", discovery: "同一只瓶。装满只露盖子，空着整瓶漂高。", fact: "因为同一只瓶装满才沉、空着才漂，所以水面上看得到的只剩盖子。", next: "对照河马页，猜它为什么只露出眼睛。", accent: "#0e7490" },
      surprises: ["先猜装满水和空着的同一只瓶谁坐得低。", "盖子像不像河马露出来的眼睛。", "在水槽边做。"]
    },
    "nature/sloths.html": {
      companion: "bo", sticker: { id: "hook-hanger", label: "钩爪悬挂员", emoji: "🦥" },
      card: { series: "自然观察", discovery: "树懒用弯钩爪子挂在树枝上，不是胶水，也不是吸盘。", fact: "猴子是握住。壁虎是细毛贴住。", next: "对照挂钩页，猜不钩为什么会掉。", accent: "#6b8f3a" },
      surprises: ["先看爪子是钩在枝上，还是手指握住。", "它有没有一直使劲捏。", "不要摇树，不要抱。"]
    },
    "games/hang-lab.html": {
      companion: "miao", sticker: { id: "coat-hooker", label: "衣架钩住员", emoji: "🪝" },
      card: { series: "物理实验", discovery: "钩住挂，贴着掉。还是同一只衣架。", fact: "因为钩住才能把重量交给横杆，所以把衣架掰直贴上去就会掉。", next: "对照树懒页，猜爪子为什么弯。", accent: "#0e7490" },
      surprises: ["先猜衣架钩住和掰直贴着哪边掉。", "壁虎贴玻璃是不是同一件事。", "不要把自己挂上去。"]
    },
    "nature/platypuses.html": {
      companion: "bo", sticker: { id: "bill-feeler", label: "电喙探路员", emoji: "🦆" },
      card: { series: "自然观察", discovery: "鸭嘴兽的喙能感到猎物肌肉的一点点电，不是普通鸭子嘴。", fact: "潜水时闭上眼。会下蛋，又喂奶。", next: "对照电喙页，猜只看浑水为什么找不到。", accent: "#5a4030" },
      surprises: ["先看它找吃时眼睛是睁着还是闭着。", "喙上有没有密密的小点。", "不要抓，雄兽有毒距。"]
    },
    "games/bill-lab.html": {
      companion: "miao", sticker: { id: "pulse-finder", label: "浑水探虾员", emoji: "📡" },
      card: { series: "物理实验", discovery: "开探测器找得到，只看找不到。还是同一张喙。", fact: "因为浑水里眼睛看不见、要靠喙上的探测器，所以只盯着水面找不到藏着的东西。", next: "对照鸭嘴兽页，猜它闭着眼在干什么。", accent: "#0e7490" },
      surprises: ["先猜浑水碗里伸手和只看哪边找得到积木。", "回声定位是不是同一件事。", "不要抓野生鸭嘴兽。"]
    },
    "nature/pangolins.html": {
      companion: "bo", sticker: { id: "tile-scaler", label: "角质叠瓦员", emoji: "🐾" },
      card: { series: "自然观察", discovery: "穿山甲身上是一层层角质鳞，像屋顶的瓦。", fact: "犰狳是骨板。它会喝奶，不是蜥蜴。", next: "对照叠瓦页，猜一整块为什么会裂。", accent: "#a16207" },
      surprises: ["先看身上是一片压一片，还是一排骨板。", "它有没有蜷成球。", "不要揭鳞。"]
    },
    "games/keratin-lab.html": {
      companion: "miao", sticker: { id: "overlap-bender", label: "错开能弯员", emoji: "🧱" },
      card: { series: "物理实验", discovery: "叠瓦能弯，整板就裂。还是同一叠片子。", fact: "因为片子叠着才能弯、粘成整板就会裂，所以弯得动不是因为材料变软了。", next: "对照穿山甲页，猜鳞该叠着还是粘死。", accent: "#0e7490" },
      surprises: ["先猜扑克牌叠着弯和胶成一块再弯哪边会裂。", "屋顶瓦为什么一片压一片。", "不要揭真鳞。"]
    },
    "nature/meerkats.html": {
      companion: "bo", sticker: { id: "lookout-stander", label: "轮班看天员", emoji: "👀" },
      card: { series: "自然观察", discovery: "狐獴一群里总有一只站起来当哨，别人才能低头挖。", fact: "会换班。不是摆造型。", next: "对照哨兵页，猜全都低头为什么看不见鹰。", accent: "#c4a06a" },
      surprises: ["先看有没有一只站直看天。", "其他的头是不是埋在沙里。", "不要拍手逗它站起来。"]
    },
    "games/sentry-lab.html": {
      companion: "miao", sticker: { id: "one-watcher", label: "留一只看员", emoji: "🗼" },
      card: { series: "物理实验", discovery: "留哨看得见，全低头看不见。还是同一群。", fact: "因为总要留一只眼睛看天空，所以全员低头挖的时候，鹰飞过来也看不见。", next: "对照狐獴页，猜那只站直的在干什么。", accent: "#0e7490" },
      surprises: ["先猜四个人找豆子，留不留人看门。", "狐狸先蹲再扑是不是同一件事。", "不要逗园里的狐獴。"]
    },
    "nature/anteaters.html": {
      companion: "bo", sticker: { id: "sticky-reacher", label: "湿舌探穴员", emoji: "🐜" },
      card: { series: "自然观察", discovery: "食蚁兽的舌头又长又黏，伸进蚁穴把蚂蚁粘出来。", fact: "没有牙。不是象鼻，也不是吸尘器。", next: "对照长舌页，猜短干为什么粘不到。", accent: "#8a6a40" },
      surprises: ["先看伸进去的是舌头还是鼻子。", "舌头是湿的还是干的。", "不要掏蚁穴。"]
    },
    "games/tongue-lab.html": {
      companion: "miao", sticker: { id: "wet-extender", label: "长湿能粘员", emoji: "👅" },
      card: { series: "物理实验", discovery: "长湿粘得到，短干粘不到。还是同一根舌头。", fact: "因为舌头要又长又湿才能粘到蚂蚁，所以短而干的那一根粘不到。", next: "对照食蚁兽页，猜管子嘴会不会卷。", accent: "#0e7490" },
      surprises: ["先猜湿筷子和干筷子谁夹得住芝麻。", "象鼻去卷是不是同一件事。", "不要伸手进蚁丘。"]
    },
    "games/stand-lab.html": {
      companion: "miao", sticker: { id: "knee-locker", label: "锁膝省力员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "锁住一膝站得稳，两膝都弯会晃。还是同一条腿。", fact: "因为膝盖锁直骨头才叠成柱子，所以两膝都弯就要一直用力。", next: "对照火烈鸟页，猜那只站直的腿在干什么。", accent: "#0e7490" },
      surprises: ["先猜一条腿伸直和两条都弯谁站得久。", "开屏和滤水杯是不是同一件事。", "膝疼就停下，不要比谁站得久。"]
    },
    "nature/wombats.html": {
      companion: "bo", sticker: { id: "cube-stacker", label: "方块堆坡员", emoji: "🐻" },
      card: { series: "自然观察", discovery: "袋熊的便便是方块，能堆在石头上不滚走。", fact: "口袋朝后。不是模具印的，也不是袋鼠那种朝前的袋。", next: "对照方便页，猜圆球为什么滚下山。", accent: "#8a6a40" },
      surprises: ["先看便便是方的还是圆的。", "口袋朝前还是朝后。", "不要翻真便便。"]
    },
    "games/dig-lab.html": {
      companion: "miao", sticker: { id: "slope-holder", label: "棱角卡住员", emoji: "🟫" },
      card: { series: "物理实验", discovery: "方块堆得住，圆球会滚走。还是同一块泥。", fact: "因为棱角卡住石头才停得住，所以搓圆以后就会滚下山。", next: "对照袋熊页，猜方块记号为什么留得住。", accent: "#0e7490" },
      surprises: ["先猜方积木和弹珠谁停在坡上。", "犰狳蜷成球是不是同一件事。", "不要翻真便便。"]
    },
    "nature/tapirs.html": {
      companion: "bo", sticker: { id: "short-wrapper", label: "短吻卷枝员", emoji: "🐽" },
      card: { series: "自然观察", discovery: "貘的短吻是软肉，能卷住近处细枝。", fact: "不是大象长鼻子，也不是猪的拱土圆盘。", next: "对照短吻页，猜硬棍为什么卷不住。", accent: "#6b5344" },
      surprises: ["先看吻是短软还是又长又垂。", "它在卷叶子还是在拱土。", "不要伸手摸吻。"]
    },
    "games/snout-lab.html": {
      companion: "miao", sticker: { id: "wrap-bender", label: "软弯能卷员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "软卷抓得住，硬戳会滑开。还是同一段短吻。", fact: "因为软肉弯一圈才裹得住，所以硬棍直着戳叶子会滑开。", next: "对照貘页，猜短吻和象鼻差在哪。", accent: "#0e7490" },
      surprises: ["先猜软布条和筷子谁卷得住纸叶。", "象鼻灌水再抬是不是同一件事。", "不要戳园里的貘。"]
    },
    "nature/narwhals.html": {
      companion: "bo", sticker: { id: "tube-feeler", label: "细管感水员", emoji: "🦄" },
      card: { series: "自然观察", discovery: "独角鲸额头伸出的是一颗左犬齿，细管能感到水。", fact: "不是犀牛角，也不是独角兽。", next: "对照牙尖页，猜封住为什么感不到。", accent: "#0d6b8a" },
      surprises: ["先看它是牙还是角。", "细管开着还是封住。", "不要摸、不要买象牙。"]
    },
    "games/tusk-lab.html": {
      companion: "miao", sticker: { id: "wax-sealer", label: "开管能感员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "开管能感到，封管感不到。还是同一根牙。", fact: "因为细管通到水才感到变化，所以蜡封住以后什么也感不到。", next: "对照独角鲸页，猜这根从哪长出来。", accent: "#0e7490" },
      surprises: ["先猜开着的吸管和封住的吸管谁感到热水。", "犀牛角是不是同一件事。", "不要摸真牙。"]
    },
    "nature/aye-ayes.html": {
      companion: "bo", sticker: { id: "tap-listener", label: "先敲再听员", emoji: "👆" },
      card: { series: "自然观察", discovery: "指狐猴先敲木头再听空心，再用细中指捞虫。", fact: "不是啄木鸟。细指不是用来指路。", next: "对照敲听页，猜不听为什么找不到。", accent: "#3a2a18" },
      surprises: ["先看它是先敲还是先戳。", "它是狐猴还是鸟。", "不要伸手戳树洞。"]
    },
    "games/tap-lab.html": {
      companion: "miao", sticker: { id: "skinny-fisher", label: "听完再捞员", emoji: "👂" },
      card: { series: "物理实验", discovery: "敲听找得到，不听硬戳会错过。还是同一块板。", fact: "因为空心回声不一样，所以捂住耳朵去戳就找不到虫子。", next: "对照指狐猴页，猜细指先干什么。", accent: "#0e7490" },
      surprises: ["先猜敲西瓜听空心和闭眼戳哪个找得到。", "啄木鸟减震是不是同一件事。", "不要敲活树找虫。"]
    },
    "nature/okapis.html": {
      companion: "bo", sticker: { id: "rump-breaker", label: "后纹拆影员", emoji: "🟤" },
      card: { series: "自然观察", discovery: "霍加狓巧克力身子，白纹只在后腿，林影里把轮廓拆开。", fact: "不是斑马全身纹，也不是孔雀开屏。", next: "对照后纹页，猜全身纹为什么露边。", accent: "#5a4030" },
      surprises: ["先看白纹画在后腿还是全身。", "它是长颈鹿亲戚还是小斑马。", "不要伸手摸后腿。"]
    },
    "games/stripe-lab.html": {
      companion: "miao", sticker: { id: "outline-splitter", label: "拆边藏影员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "后纹拆得开，全身纹会露边。还是同一只纸兽。", fact: "因为后纹才把边拆开，所以画满全身整块还在。", next: "对照霍加狓页，猜纹该画在哪。", accent: "#0e7490" },
      surprises: ["先猜只画后腿和画满全身谁藏得住。", "孔雀开屏是不是同一件事。", "不要摸园里的兽。"]
    },
    "nature/axolotls.html": {
      companion: "bo", sticker: { id: "gill-stayer", label: "外鳃留下员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "美西螈长大了鳃还在，腿断了还能再长。", fact: "不是青蛙上岸。也不是蝉蜕壳。", next: "对照再长页，猜封口为什么长不回。", accent: "#f472b6" },
      surprises: ["先看头上还有没有鳃。", "断口是软芽还是硬壳。", "不要剪、不要捞。"]
    },
    "games/regen-lab.html": {
      companion: "miao", sticker: { id: "stump-grower", label: "软芽再长员", emoji: "🌱" },
      card: { series: "物理实验", discovery: "软芽能再长，封口就没了。还是同一条腿。", fact: "因为断口那一团软组织才会重新长，所以封死以后什么也不长。", next: "对照美西螈页，猜外鳃还在不在。", accent: "#0e7490" },
      surprises: ["先猜留下橡皮泥芽和用胶带封口谁能再长。", "蝉蜕壳是不是同一件事。", "不要剪活体。"]
    },
    "nature/cassowaries.html": {
      companion: "bo", sticker: { id: "crown-leaf-parter", label: "头顶拨叶员", emoji: "🪖" },
      card: { series: "自然观察", discovery: "鹤鸵盔长在头顶，把叶子拨开，眼睛还能看路。", fact: "不是犀牛鼻子角，也不是长颈鹿皮角。", next: "对照盔突页，猜错到鼻子为什么挡住。", accent: "#1f2937" },
      surprises: ["先看盔长在头顶还是鼻子。", "它是鸟还是小犀牛。", "不要伸手摸盔。"]
    },
    "games/casque-lab.html": {
      companion: "miao", sticker: { id: "helm-path-seer", label: "盔下看路员", emoji: "🪖" },
      card: { series: "物理实验", discovery: "头顶拨得开，鼻子会挡住。还是同一只纸盔。", fact: "因为盔在头顶才先碰到叶子，所以挪到鼻子眼前就糊了。", next: "对照鹤鸵页，猜盔该长在哪。", accent: "#0e7490" },
      surprises: ["先猜戴在头顶和挪到鼻子谁看得清。", "犀牛角是不是同一件事。", "不要摸园里的鸟。"]
    },
    "nature/capybaras.html": {
      companion: "bo", sticker: { id: "wet-bank-sitter", label: "湿岸散热员", emoji: "🐹" },
      card: { series: "自然观察", discovery: "水豚毛稀，身子湿着把热散掉，鼻子还露在水面上。", fact: "不是海獭毛里藏气，也不是河马沉在水底。", next: "对照湿岸页，猜擦干为什么热散不走。", accent: "#6b8f3a" },
      surprises: ["先看毛是湿的还是鼓着气。", "它是最大的啮齿还是小河马。", "不要伸手摸湿毛。"]
    },
    "games/wet-lab.html": {
      companion: "miao", sticker: { id: "waterline-hider", label: "水线藏影员", emoji: "💧" },
      card: { series: "物理实验", discovery: "湿身散热藏得住，擦干会露边。还是同一只纸兽。", fact: "因为稀毛沾水才把热带走，所以擦干以后整块还在岸上。", next: "对照水豚页，猜毛该湿还是该鼓气。", accent: "#0e7490" },
      surprises: ["先猜打湿和擦干谁热散得走。", "海獭毛里藏气是不是同一件事。", "不要摸园里的兽。"]
    }    ,
    "nature/manatees.html": {
      companion: "bo", sticker: { id: "gut-floater", label: "肠气沉浮员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "海牛用肠子里的气调节沉浮。", fact: "不是鱼鳔。也不是海豹厚脂肪。", next: "对照压载页，猜气少为什么沉。", accent: "#0d6b8a" },
      surprises: ["先看它漂还是沉。","它是鱼还是兽。","不要摸肚皮。"]
    }    ,
    "games/ballast-lab.html": {
      companion: "miao", sticker: { id: "gas-sinker", label: "气少下沉员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "气多就浮，气少就沉。还是同一只纸兽。", fact: "因为肠气才改沉浮，所以气少就沉下去。", next: "对照海牛页，猜气该多还是该少。", accent: "#0e7490" },
      surprises: ["先猜气多和气少谁浮。","鱼鳔是不是同一件事。","不要摸园里的兽。"]
    }    ,
    "nature/kiwis.html": {
      companion: "bo", sticker: { id: "tip-sniffer", label: "喙尖闻土员", emoji: "🥝" },
      card: { series: "自然观察", discovery: "几维鸟鼻孔开在喙尖，夜里插进土里闻蚯蚓。", fact: "不是猫头鹰脸盘听声。也不是翠鸟盯水再扎。", next: "对照喙尖页，猜鼻孔挪到根部为什么闻不到。", accent: "#6b4328" },
      surprises: ["先看鼻孔在尖上还是根部。","它会飞吗。","不要拔喙。"]
    }    ,
    "games/nare-lab.html": {
      companion: "miao", sticker: { id: "root-misser", label: "根部闻不到员", emoji: "👃" },
      card: { series: "物理实验", discovery: "尖上闻得到，根部闻不到。还是同一根喙。", fact: "因为鼻孔在尖上才伸进土里，所以挪到根部就闻不到。", next: "对照几维鸟页，猜鼻孔该开在哪。", accent: "#0e7490" },
      surprises: ["先猜尖上和根部谁闻得到。","猫头鹰听声是不是同一件事。","不要拔喙。"]
    }    ,
    "nature/tuataras.html": {
      companion: "bo", sticker: { id: "sky-sensor", label: "顶眼感光员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "楔齿蜥头顶有顶眼，能感到亮和暗。", fact: "不是第三只能成像的相机。也不是变色龙转眼珠。", next: "对照顶眼页，猜封住为什么分不清白天。", accent: "#365314" },
      surprises: ["先看头顶那一点。","它是普通蜥蜴吗。","不要拨开头皮。"]
    }    ,
    "games/parietal-lab.html": {
      companion: "miao", sticker: { id: "sealed-blind", label: "封窗分不清员", emoji: "☀️" },
      card: { series: "物理实验", discovery: "窗开着感到亮暗，封住就分不清。还是同一块窗。", fact: "因为顶眼只感到亮暗，所以封住就分不清白天。", next: "对照楔齿蜥页，猜顶眼在哪。", accent: "#0e7490" },
      surprises: ["先猜开窗和封住谁分得清。","变色龙转眼是不是同一件事。","不要拨开头皮。"]
    }    ,
    "nature/puffins.html": {
      companion: "bo", sticker: { id: "spine-holder", label: "刺卡住员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "海鹦嘴里能同时叼好几条小鱼，靠刺卡住。", fact: "不是嘴更大。也不是会飞的企鹅。", next: "对照叼鱼页，猜刺少为什么只剩一条。", accent: "#e11d48" },
      surprises: ["先数嘴里几条鱼。","它是企鹅吗。","不要掏嘴。"]
    }    ,
    "nature/walrus.html": {
      companion: "bo", sticker: { id: "mud-feeler", label: "浑水摸壳员", emoji: "🦭" },
      card: { series: "自然观察", discovery: "海象用密须在浑水里摸蛤蜊。", fact: "不是独角鲸那种传感牙。也不是只靠眼睛。", next: "对照触须页，猜拔光为什么瞎戳。", accent: "#c47a5a" },
      surprises: ["先看须还是牙。","它是海豹吗。","不要拔须。"]
    }    ,
    "nature/lyrebirds.html": {
      companion: "bo", sticker: { id: "sound-copier", label: "学声员", emoji: "🎵" },
      card: { series: "自然观察", discovery: "琴鸟能模仿链锯和别的鸟，靠鸣管肌肉。", fact: "不是乌鸦钩食物。也不是回声定位。", next: "对照学声页，猜听不够为什么学不像。", accent: "#6b5344" },
      surprises: ["先听它学的是谁。", "尾巴像琴是主课吗。", "不要逼它学人话。"]
    }    ,
    "games/mimic-lab.html": {
      companion: "miao", sticker: { id: "own-caller", label: "自己叫员", emoji: "🎤" },
      card: { series: "物理实验", discovery: "听得够才学像，听不够只剩自己叫。还是同一条嗓子。", fact: "因为听进去才会学，所以听不够学不像。", next: "对照琴鸟页，猜它学的是声还是回声。", accent: "#0e7490" },
      surprises: ["先猜听够和听不够谁学得像。", "回声是不是同一件事。", "不要逼鸟学人话。"]
    }    ,
    "games/carry-lab.html": {
      companion: "miao", sticker: { id: "one-fish-dropper", label: "刺少掉鱼员", emoji: "🐟" },
      card: { series: "物理实验", discovery: "刺够卡住好几条，刺少只剩一条。还是同一张嘴。", fact: "因为上腭的刺才卡住，所以刺少就掉。", next: "对照海鹦页，猜刺该多还是该少。", accent: "#0e7490" },
      surprises: ["先猜刺够和刺少谁叼得住。", "换一张大嘴是不是同一件事。", "不要掏嘴。"]
    }    ,
    "games/whisker-lab.html": {
      companion: "miao", sticker: { id: "bare-poker", label: "拔光瞎戳员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "须密摸得到，拔光就瞎戳。还是同一排须。", fact: "因为密须才摸到壳，所以拔光就瞎戳。", next: "对照海象页，猜该用须还是牙。", accent: "#0e7490" },
      surprises: ["先猜须密和拔光谁摸得到。", "长牙探路是不是同一件事。", "不要拔须。"]
    }    ,
    "nature/muskoxen.html": {
      companion: "bo", sticker: { id: "circle-blocker", label: "挤圈挡风员", emoji: "🐂" },
      card: { series: "自然观察", discovery: "麝牛遇风挤成圈，肩贴肩把风挡住。", fact: "不是毛衣够厚就不用挤。也不是野牛散开吃草。", next: "对照挤圈页，猜散开为什么漏风。", accent: "#6b5344" },
      surprises: ["先看它们挤不挤。", "毛衣够厚就不用挤吗。", "不要钻进圈里。"]
    }    ,
    "games/huddle-lab.html": {
      companion: "miao", sticker: { id: "gap-leaker", label: "散开漏风员", emoji: "⭕" },
      card: { series: "物理实验", discovery: "挤圈挡得住，散开会漏风。还是同一群纸兽。", fact: "因为肩贴上才补缝，所以散开风就钻进来。", next: "对照麝牛页，猜该挤还是该散。", accent: "#0e7490" },
      surprises: ["先猜挤圈和散开谁挡风。", "毛衣够厚是不是同一件事。", "不要追真兽。"]
    }
    ,
    "nature/numbats.html": {
      companion: "bo", sticker: { id: "day-tonguer", label: "白天细舌员", emoji: "👅" },
      card: { series: "自然观察", discovery: "袋食蚁兽白天用细长舌伸进白蚁冢，不拆整座门。", fact: "不是夜里挖开。也不是穿山甲卷鳞。", next: "对照细舌页，猜又粗又短为什么够不着。", accent: "#6b5344" },
      surprises: ["先看它是白天还是夜里。", "细舌和挖开是不是同一件事。", "不要掏真冢。"]
    }    ,
    "games/termite-lab.html": {
      companion: "miao", sticker: { id: "stub-misser", label: "粗舌够不着员", emoji: "🕳️" },
      card: { series: "物理实验", discovery: "够细够长才伸进蚁道，又粗又短就够不着。还是同一条纸舌。", fact: "因为蚁道口很窄，所以粗舌停在门口。", next: "对照袋食蚁兽页，猜该细伸还是该挖开。", accent: "#0e7490" },
      surprises: ["先猜细舌和粗舌谁伸得进。", "换大爪子是不是同一件事。", "不要掏真冢。"]
    }
    ,
    "nature/moose.html": {
      companion: "bo", sticker: { id: "palm-shedder", label: "扁掌换角员", emoji: "🫎" },
      card: { series: "自然观察", discovery: "驼鹿扁掌骨角每年脱落再长，材料是骨头。", fact: "不是犀牛那种不脱的角蛋白。也不是长颈鹿皮包骨突。", next: "对照换角页，猜焊死为什么掉不下来。", accent: "#6b5344" },
      surprises: ["先看角是扁掌还是尖柱。", "每年脱掉是不是焊死。", "不要扳真角。"]
    }    ,
    "games/antler-lab.html": {
      companion: "miao", sticker: { id: "weld-holder", label: "焊死钉角员", emoji: "🦴" },
      card: { series: "物理实验", discovery: "能脱就脱落，焊死就掉不下来。还是同一对骨角。", fact: "因为根部松开整副才掉，所以焊死就钉住。", next: "对照驼鹿页，猜该脱还是该焊。", accent: "#0e7490" },
      surprises: ["先猜能脱和焊死谁会掉。", "角蛋白是不是同一件事。", "不要扳真角。"]
    }    ,
    "nature/secretary-birds.html": {
      companion: "bo", sticker: { id: "straight-stomp-stander", label: "长腿直踩员", emoji: "🪶" },
      card: { series: "自然观察", discovery: "秘书鸟用又长又直的腿把蛇踩住。", fact: "不是鹰那种俯冲抓。也不是鹤鸵刀爪踢。", next: "对照踩工坊，猜腿弯为什么踩空。", accent: "#6b6a66" },
      surprises: ["先看它走着踩还是飞着抓。","腿直不直。","不要靠近蛇。"]
    }    ,
    "games/stomp-lab.html": {
      companion: "miao", sticker: { id: "bent-miss-stomper", label: "弯腿踩空员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "直腿踩得住，弯腿踩空。还是同一条长腿。", fact: "因为脚掌往下才按住，所以腿弯就踩空。", next: "对照秘书鸟页，猜该直踩还是俯冲。", accent: "#0e7490" },
      surprises: ["先猜直腿和弯腿谁踩得住。","俯冲抓是不是同一件事。","不要踩真蛇。"]
    }
    ,
    "nature/flying-squirrels.html": {
      companion: "bo", sticker: { id: "membrane-rider", label: "皮膜滑行员", emoji: "🪂" },
      card: { series: "自然观察", discovery: "飞鼠张开皮膜往下滑，不是拍翅膀飞上去。", fact: "不是鸟的飞。也不是袋鼠那种跳。", next: "对照皮膜滑页，猜膜收起来为什么掉。", accent: "#6b5344" },
      surprises: ["先看它是滑还是拍翅。", "皮膜和翅膀是不是同一件事。", "不要抓真飞鼠。"]
    }    ,
    "games/glide-lab.html": {
      companion: "miao", sticker: { id: "fold-dropper", label: "收膜掉下去员", emoji: "🪁" },
      card: { series: "物理实验", discovery: "膜张开才滑得远，收起来就掉下去。还是同一张皮膜。", fact: "因为张开才有面积托住，所以一收就掉。", next: "对照飞鼠页，猜该张还是该收。", accent: "#0e7490" },
      surprises: ["先猜张开和收起谁滑得远。", "拍翅膀是不是同一件事。", "不要从高处往下跳。"]
    }
    ,
    "nature/weaver-birds.html": {
      companion: "bo", sticker: { id: "knot-hanger", label: "打结吊巢员", emoji: "🪺" },
      card: { series: "自然观察", discovery: "织巢鸟把草打结编成吊巢，不是堆成一摊。", fact: "不是随便堆草。也不是园丁鸟的展示道。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是随便堆草。", "不要去碰真的。"]
    }    ,
    "games/weave-lab.html": {
      companion: "miao", sticker: { id: "loose-dropper", label: "松堆掉巢员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "编紧才吊得住，松堆会掉下来。还是同一把草。", fact: "因为结才受力，所以松堆就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/parrotfish.html": {
      companion: "bo", sticker: { id: "sand-grinder", label: "磨沙员", emoji: "🪸" },
      card: { series: "自然观察", discovery: "鹦鹉鱼愈合喙把珊瑚磨成沙。", fact: "不是整块吞下去。也不要去刮礁。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是整块吞下去。", "不要去碰真的。"]
    }    ,
    "games/grind-lab.html": {
      companion: "miao", sticker: { id: "chunk-swallower", label: "整块吞员", emoji: "🧂" },
      card: { series: "物理实验", discovery: "磨够变成沙，磨不够留下整块。还是同一张喙。", fact: "因为要磨碎，所以不磨就还是块。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/archerfish.html": {
      companion: "bo", sticker: { id: "jet-knocker", label: "水柱打虫员", emoji: "💦" },
      card: { series: "自然观察", discovery: "射水鱼用水柱把虫打下水面。", fact: "不是跳上去咬。也不朝真虫喷水。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是跳上去咬。", "不要去碰真的。"]
    }    ,
    "games/spit-lab.html": {
      companion: "miao", sticker: { id: "short-faller", label: "喷不够掉半路员", emoji: "🎯" },
      card: { series: "物理实验", discovery: "喷够虫才掉下水，喷不够水柱够不着。还是同一张嘴。", fact: "因为水柱要送到，所以喷不够就够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pistol-shrimp.html": {
      companion: "bo", sticker: { id: "bubble-snapper", label: "空泡弹螯员", emoji: "💥" },
      card: { series: "自然观察", discovery: "手枪虾弹螯打出空泡再炸开。", fact: "不是蟹钳夹碎。也不养真虾当玩具。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是蟹钳夹碎。", "不要去碰真的。"]
    }    ,
    "games/snap-lab.html": {
      companion: "miao", sticker: { id: "slow-pincher", label: "轻捏无泡员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "弹得快空泡炸开，轻捏没有泡。还是同一只钳。", fact: "因为要够快才出空泡，所以轻捏没有泡。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pufferfish.html": {
      companion: "bo", sticker: { id: "ball-sweller", label: "吞水鼓球员", emoji: "🐡" },
      card: { series: "自然观察", discovery: "河豚吞水鼓成球，刺立起来。", fact: "不是一直这么圆。也不要去戳。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是一直这么圆。", "不要去碰真的。"]
    }    ,
    "games/inflate-lab.html": {
      companion: "miao", sticker: { id: "slim-swimmer", label: "瘦身游走员", emoji: "⚪" },
      card: { series: "物理实验", discovery: "吞水鼓成球，瘦了才能游走。还是同一条鱼。", fact: "因为水灌进肚子才圆，所以不灌就瘦。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/basilisks.html": {
      companion: "bo", sticker: { id: "film-dasher", label: "拍水快跑员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "双嵴蜥拍得快才踩得住水面。", fact: "不是水黾那种站住。也不追真蜥。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是水黾那种站住。", "不要去碰真的。"]
    }    ,
    "games/dash-lab.html": {
      companion: "miao", sticker: { id: "slow-sinker", label: "拍慢下沉员", emoji: "🏃" },
      card: { series: "物理实验", discovery: "拍得快踩得住，拍得慢就沉。还是同一双脚。", fact: "因为要拍得够快，所以一慢就沉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/jacanas.html": {
      companion: "bo", sticker: { id: "lily-toe-walker", label: "长趾走叶员", emoji: "🪷" },
      card: { series: "自然观察", discovery: "水雉长趾把重量摊在荷叶上。", fact: "不是水黾站水膜。也不踩真荷叶。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是水黾站水膜。", "不要去碰真的。"]
    }    ,
    "games/lily-lab.html": {
      companion: "miao", sticker: { id: "pad-puncher", label: "短趾踩穿员", emoji: "👣" },
      card: { series: "物理实验", discovery: "长趾走得住，短趾会踩穿。还是同一双脚。", fact: "因为面积大压强小，所以短趾踩穿。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bowerbirds.html": {
      companion: "bo", sticker: { id: "avenue-decorator", label: "展示道装饰员", emoji: "🎨" },
      card: { series: "自然观察", discovery: "园丁鸟搭展示道给看，蛋不生在这里。", fact: "不是织巢鸟的吊巢。也不偷装饰。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是织巢鸟的吊巢。", "不要去碰真的。"]
    }    ,
    "games/bower-lab.html": {
      companion: "miao", sticker: { id: "cup-nester", label: "乱杯垒巢员", emoji: "🎀" },
      card: { series: "物理实验", discovery: "装饰够是两道墙，装饰少是乱杯。还是同一堆棍。", fact: "因为展示道要两道墙，所以乱杯不是。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/water-striders.html": {
      companion: "bo", sticker: { id: "film-stander", label: "水膜站住员", emoji: "〰️" },
      card: { series: "自然观察", discovery: "水黾疏水脚站在水膜上。", fact: "不是拍水快跑。也不往池塘倒肥皂。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是拍水快跑。", "不要去碰真的。"]
    }    ,
    "games/film-lab.html": {
      companion: "miao", sticker: { id: "film-breaker", label: "破膜下沉员", emoji: "💧" },
      card: { series: "物理实验", discovery: "膜够站住，膜破就沉。还是同一双脚。", fact: "因为要靠水膜，所以膜破就沉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/leafcutter-ants.html": {
      companion: "bo", sticker: { id: "fungus-farmer", label: "种菌员", emoji: "🍄" },
      card: { series: "自然观察", discovery: "切叶蚁剪叶子去种菌，吃的是菌。", fact: "不是细舌伸进冢。也不挖真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是细舌伸进冢。", "不要去碰真的。"]
    }    ,
    "games/farm-lab.html": {
      companion: "miao", sticker: { id: "leaf-chewer", label: "生嚼叶子员", emoji: "🍃" },
      card: { series: "物理实验", discovery: "种够才长出菌园，不够只剩生叶堆。还是同一队蚂蚁。", fact: "因为吃的是菌，所以生嚼叶子没饭。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/fennec-foxes.html": {
      companion: "bo", sticker: { id: "heat-eared", label: "大耳散热器", emoji: "🦊" },
      card: { series: "自然观察", discovery: "耳廓狐大耳朵把热散掉。", fact: "不是只为了好看。也不抓真狐耳。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是只为了好看。", "不要去碰真的。"]
    }    ,
    "games/ear-lab.html": {
      companion: "miao", sticker: { id: "stew-eared", label: "小耳闷热员", emoji: "👂" },
      card: { series: "物理实验", discovery: "耳朵大才把热散掉，耳朵小就闷热。还是同一对耳朵。", fact: "因为面积大才散热，所以耳小闷热。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tardigrades.html": {
      companion: "bo", sticker: { id: "tun-shrinker", label: "缩成桶员", emoji: "🐻" },
      card: { series: "自然观察", discovery: "水熊干了缩成桶，暂停再醒。", fact: "不是永远不死。苔藓只看不吃。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是永远不死。", "不要去碰真的。"]
    }    ,
    "games/tun-lab.html": {
      companion: "miao", sticker: { id: "wet-walker", label: "还湿走着员", emoji: "🪣" },
      card: { series: "物理实验", discovery: "干得够才缩成桶，还湿着就继续走。还是同一只。", fact: "因为要失水才成桶，所以还湿就还在走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pelicans.html": {
      companion: "bo", sticker: { id: "pouch-scooper", label: "喉囊兜网员", emoji: "🪿" },
      card: { series: "自然观察", discovery: "鹈鹕喉囊胀开兜水和鱼，再滤水吞鱼。", fact: "不是尖喙戳一条。也不投喂野鹈鹕。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是尖喙戳一条。", "不要去碰真的。"]
    }    ,
    "games/pouch-lab.html": {
      companion: "miao", sticker: { id: "spear-misser", label: "尖喙戳不中员", emoji: "👜" },
      card: { series: "物理实验", discovery: "胀袋兜成网，尖喙戳不中。还是同一张嘴。", fact: "因为袋子才成网，所以尖喙戳不中。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/nautilus.html": {
      companion: "bo", sticker: { id: "chamber-floater", label: "隔间上浮员", emoji: "🐚" },
      card: { series: "自然观察", discovery: "鹦鹉螺隔间换气才沉浮。", fact: "不是乌贼喷水。也不捡活螺。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是乌贼喷水。", "不要去碰真的。"]
    }    ,
    "games/chamber-lab.html": {
      companion: "miao", sticker: { id: "chamber-sinker", label: "隔间下沉员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "隔间气多就浮，气少就沉。还是同一只壳。", fact: "因为气室调浮力，所以气少就沉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/snowshoe-hares.html": {
      companion: "bo", sticker: { id: "snow-spreader", label: "大脚走雪员", emoji: "🐇" },
      card: { series: "自然观察", discovery: "雪鞋兔大脚把重量摊在雪上。", fact: "不是跳得更高。也不追野兔。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是跳得更高。", "不要去碰真的。"]
    }    ,
    "games/shoe-lab.html": {
      companion: "miao", sticker: { id: "snow-sinker", label: "细脚陷雪员", emoji: "🐾" },
      card: { series: "物理实验", discovery: "大脚摊得住，细脚会陷进去。还是同一双掌。", fact: "因为面积大压强小，所以细脚陷进去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/howler-monkeys.html": {
      companion: "bo", sticker: { id: "hyoid-boomer", label: "舌骨吼远员", emoji: "📣" },
      card: { series: "自然观察", discovery: "吼猴空心舌骨碗把吼放大。", fact: "不是学声。也不对园里的猴吼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不是学声。", "不要去碰真的。"]
    }    ,
    "games/hyoid-lab.html": {
      companion: "miao", sticker: { id: "thin-squeaker", label: "小碗细声员", emoji: "🔊" },
      card: { series: "物理实验", discovery: "大碗吼得远，小碗只剩细声。还是同一只碗。", fact: "因为碗才放大，所以小碗细声。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/thorny-devils.html": {
      companion: "bo", sticker: { id: "groove-wicker", label: "沟槽导露员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "刺蜥背上细沟把露送到嘴。", fact: "不是吸管喝。也不是仙人掌把水藏在茎里。", next: "对照导露工坊，猜沟堵为什么到不了嘴。", accent: "#b45309" },
      surprises: ["先看水是沿沟走还是用吸管。", "它是仙人掌吗。", "不要抓真蜥。"]
    }    ,
    "games/wick-lab.html": {
      companion: "miao", sticker: { id: "groove-blocker", label: "沟堵停背员", emoji: "💧" },
      card: { series: "物理实验", discovery: "沟通了露到嘴，沟堵了停在背。还是同一只纸刺蜥。", fact: "因为沟才把露送到嘴，所以一堵就停在背上。", next: "对照刺蜥页，猜该通还是该堵。", accent: "#0e7490" },
      surprises: ["先猜沟通和沟堵谁到嘴。", "吸管喝是不是同一件事。", "不要抓真蜥。"]
    }
    ,
    "nature/mudskippers.html": {
      companion: "bo", sticker: { id: "mud-crawler", label: "胸鳍走泥员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "弹涂鱼用胸鳍撑在泥上走。", fact: "不是只会游。也不是青蛙后腿跳。", next: "对照泥走工坊，猜只会游为什么困在洼。", accent: "#4d7c0f" },
      surprises: ["先看它是撑着走还是只会游。", "它是青蛙吗。", "不要抓真鱼。"]
    }    ,
    "games/crawl-lab.html": {
      companion: "miao", sticker: { id: "fin-flopper", label: "只会游困洼员", emoji: "🐾" },
      card: { series: "物理实验", discovery: "撑稳了走上岸，只会游困在洼。还是同一只纸鱼。", fact: "因为胸鳍才撑得住，所以不撑就困在水洼。", next: "对照弹涂鱼页，猜该撑还是该游。", accent: "#0e7490" },
      surprises: ["先猜撑走和只会游谁上岸。", "后腿跳是不是同一件事。", "不要抓真鱼。"]
    }
    ,
    "nature/click-beetles.html": {
      companion: "bo", sticker: { id: "hinge-flipper", label: "弹跳翻身员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "叩甲仰面时胸腹一弹才翻过来。", fact: "不是腿更有劲。也不要把真虫翻来翻去。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/click-lab.html": {
      companion: "miao", sticker: { id: "belly-stuck", label: "仰面躺员", emoji: "⚡" },
      card: { series: "物理实验", discovery: "扣上才翻过来，不扣就仰面躺。还是同一只纸虫。", fact: "因为铰链突然解锁才弹，所以不扣就躺着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lungfish.html": {
      companion: "bo", sticker: { id: "mud-cocooner", label: "结茧等雨员", emoji: "🫧" },
      card: { series: "自然观察", discovery: "肺鱼塘干了结茧等雨。", fact: "不是变成另一条鱼。也不要把真鱼弄干。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cocoon-lab.html": {
      companion: "miao", sticker: { id: "dry-goner", label: "塘干了员", emoji: "🪹" },
      card: { series: "物理实验", discovery: "结茧才能等雨，不结茧塘干就完。还是同一条纸鱼。", fact: "因为黏液茧才降低代谢，所以不结就过不了干塘。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/trapjaw-ants.html": {
      companion: "bo", sticker: { id: "jaw-jumper", label: "弹颌跳开员", emoji: "🐜" },
      card: { series: "自然观察", discovery: "巨颚蚁大颚一弹才跳开。", fact: "不是腿更长。也不是手枪虾那种空泡。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/snapjaw-lab.html": {
      companion: "miao", sticker: { id: "slow-closer", label: "慢合走不掉员", emoji: "💥" },
      card: { series: "物理实验", discovery: "快弹才跳开，慢合就走不掉。还是同一对大颚。", fact: "因为颌扣得够快才有反冲，所以慢合走不掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }    ,
    "nature/chuckwallas.html": {
      companion: "bo", sticker: { id: "rock-wedger", label: "鼓身卡缝员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "石缝鬣蜥把身子鼓圆，卡在缝里。", fact: "不是河豚在水里鼓球。也不抓真蜥。", next: "对照石缝工坊，猜瘦了为什么滑出。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/rock-lab.html": {
      companion: "miao", sticker: { id: "slim-slider", label: "瘦了滑出员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "鼓身卡住，瘦了滑出。还是同一只纸蜥。", fact: "因为鼓圆才顶住石头，所以一瘦就滑。", next: "对照石缝鬣蜥页，猜该鼓还是该瘦。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dippers.html": {
      companion: "bo", sticker: { id: "bone-wader", label: "沉骨走底员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "河乌骨头沉，才走得了河床。", fact: "不是鸭子浮着划。也不追真鸟。", next: "对照走底工坊，猜浮着为什么走不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/wade-lab.html": {
      companion: "miao", sticker: { id: "foam-floater", label: "浮面走不成员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "沉下去走上河床，浮在水面走不成。还是同一只。", fact: "因为要够沉才踩得住底，所以一浮就走不成。", next: "对照河乌页，猜该沉还是该浮。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/diving-bell-spiders.html": {
      companion: "bo", sticker: { id: "bell-weaver", label: "水下气钟员", emoji: "🕷️" },
      card: { series: "自然观察", discovery: "水蛛在水下织气钟，把空气带下去。", fact: "不是到水面换气。也不捞真蛛。", next: "对照气钟工坊，猜气少为什么没家。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/bell-lab.html": {
      companion: "miao", sticker: { id: "dry-webber", label: "气少没泡员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "气够才成家，气少没泡。还是同一只。", fact: "因为泡里才有气，所以气少就没家。", next: "对照水蛛页，猜该补气还是该空着。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/frilled-lizards.html": {
      companion: "bo", sticker: { id: "frill-flasher", label: "开领吓退员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "伞蜥脖子上的皮领一下子撑开，看起来变大。", fact: "不是孔雀羽毛开屏。也不抓真蜥。", next: "对照开领工坊，猜收着为什么看不出大。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/frill-lab.html": {
      companion: "miao", sticker: { id: "collar-folder", label: "收领看小员", emoji: "🪭" },
      card: { series: "物理实验", discovery: "领开了吓退，领收着看不出大。还是同一只纸蜥。", fact: "因为皮领撑开才变大，所以一收就看不出大。", next: "对照伞蜥页，猜该开还是该收。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gerenuks.html": {
      companion: "bo", sticker: { id: "tiptoe-browser", label: "踮脚够叶员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "长颈羚后腿踮起，才够到高处叶子。", fact: "不是长颈鹿那种长脖子主课。也不追真羊。", next: "对照踮脚工坊，猜四脚为什么只吃矮草。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/tiptoe-lab.html": {
      companion: "miao", sticker: { id: "flat-grazer", label: "四脚矮草员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "后腿踮起够得到，四脚只能吃矮草。还是同一只。", fact: "因为要踮才够高，所以四脚只剩矮草。", next: "对照长颈羚页，猜该踮还是该趴。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gibbons.html": {
      companion: "bo", sticker: { id: "arm-swinger", label: "长臂荡枝员", emoji: "🐒" },
      card: { series: "自然观察", discovery: "长臂猿用长臂吊在枝下荡过去。", fact: "不是在枝上走。也不学它荡。", next: "对照荡枝工坊，猜走枝为什么滑掉。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/swing-lab.html": {
      companion: "miao", sticker: { id: "branch-walker", label: "走枝滑掉员", emoji: "🌲" },
      card: { series: "物理实验", discovery: "长臂荡过去，走枝会滑掉。还是同一只。", fact: "因为吊着荡才过去，所以走枝会滑。", next: "对照长臂猿页，猜该荡还是该走。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hornbills.html": {
      companion: "bo", sticker: { id: "mud-sealer", label: "泥封留缝员", emoji: "🦜" },
      card: { series: "自然观察", discovery: "犀鸟用泥封住巢洞，只留一条缝。", fact: "不是洞开着进出。也不去封真巢。", next: "对照封泥工坊，猜洞开着为什么会钻进来。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/mud-lab.html": {
      companion: "miao", sticker: { id: "hole-opener", label: "洞开钻进员", emoji: "🧱" },
      card: { series: "物理实验", discovery: "泥封只剩缝挡得住，洞开着会钻进来。还是同一只巢。", fact: "因为泥墙才挡住，所以洞开就钻进来。", next: "对照犀鸟页，猜该封还是该开。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/prairie-dogs.html": {
      companion: "bo", sticker: { id: "mound-venter", label: "土丘烟囱员", emoji: "🦫" },
      card: { series: "自然观察", discovery: "草原犬鼠把土堆成烟囱，才抽得动洞里的气。", fact: "不是洞口平着。也不灌真洞。", next: "对照通风工坊，猜铲平为什么闷气。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/vent-lab.html": {
      companion: "miao", sticker: { id: "flat-stuffer", label: "铲平闷气员", emoji: "🌬️" },
      card: { series: "物理实验", discovery: "堆丘才通风，铲平就闷气。还是同一座丘。", fact: "因为高低口才抽气，所以铲平就闷。", next: "对照草原犬鼠页，猜该堆还是该铲。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/rattlesnakes.html": {
      companion: "bo", sticker: { id: "pit-feeler", label: "颊窝感热员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "响尾蛇用颊窝在夜里感到热。", fact: "不是回声定位。也不靠近真蛇。", next: "对照颊窝工坊，猜封住为什么错过。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/pit-lab.html": {
      companion: "miao", sticker: { id: "pit-blocker", label: "颊窝封住员", emoji: "🌡️" },
      card: { series: "物理实验", discovery: "窝开夜里找得到热，封住就错过。还是同一只窝。", fact: "因为窝才感到热，所以一封就错过。", next: "对照响尾蛇页，猜该开还是该封。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/remoras.html": {
      companion: "bo", sticker: { id: "disc-hitcher", label: "吸盘搭车员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "印鱼头顶吸盘吸着大鱼搭车。", fact: "不是并排游。也不抓真鱼。", next: "对照吸盘工坊，猜并排为什么滑掉。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/disc-lab.html": {
      companion: "miao", sticker: { id: "side-slipper", label: "并排滑掉员", emoji: "🧲" },
      card: { series: "物理实验", discovery: "吸着才挂得住，并排游会滑掉。还是同一只。", fact: "因为吸盘才挂住，所以并排会滑。", next: "对照印鱼页，猜该吸还是该游。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/saigas.html": {
      companion: "bo", sticker: { id: "nose-filter", label: "鼓鼻挡土员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "高鼻羚羊鼓鼻子，把土挡在外面。", fact: "不是为了好看。也不追真羊。", next: "对照滤尘工坊，猜扁鼻为什么呛灰。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/dust-lab.html": {
      companion: "miao", sticker: { id: "flat-choker", label: "扁鼻呛灰员", emoji: "💨" },
      card: { series: "物理实验", discovery: "鼓鼻挡住土，扁鼻就呛灰。还是同一只鼻子。", fact: "因为鼓腔才滤土，所以扁了就呛。", next: "对照高鼻羚羊页，猜该鼓还是该扁。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sidewinders.html": {
      companion: "bo", sticker: { id: "side-winder", label: "横甩不陷员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "侧行响尾蛇横甩一圈，才不陷进沙。", fact: "不是直线往前。也不靠近真蛇。", next: "对照沙波工坊，猜贴肚为什么陷进去。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/sandwave-lab.html": {
      companion: "miao", sticker: { id: "straight-sinker", label: "贴肚陷沙员", emoji: "🏜️" },
      card: { series: "物理实验", discovery: "横甩浮得住，贴肚会陷进去。还是同一条。", fact: "因为只有几点着沙，所以贴肚就陷。", next: "对照侧行响尾蛇页，猜该甩还是该贴。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/toucans.html": {
      companion: "bo", sticker: { id: "bill-cooler", label: "大嘴散热员", emoji: "🦜" },
      card: { series: "自然观察", discovery: "巨嘴鸟大嘴把热散掉。", fact: "不是只为了夹果子。也不追真鸟。", next: "对照散热工坊，猜小嘴为什么闷热。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/rad-lab.html": {
      companion: "miao", sticker: { id: "smallbill-hot", label: "小嘴闷热员", emoji: "🌡️" },
      card: { series: "物理实验", discovery: "大嘴才把热散掉，小嘴就闷热。还是同一张嘴。", fact: "因为面积大才散得快，所以小嘴闷热。", next: "对照巨嘴鸟页，猜该大还是该小。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/velvet-worms.html": {
      companion: "bo", sticker: { id: "goo-netter", label: "喷胶结网员", emoji: "🐛" },
      card: { series: "自然观察", discovery: "栉蚕喷出黏胶，网住猎物。", fact: "不是跑去咬。也不碰真虫。", next: "对照喷胶工坊，猜空跑为什么漏掉。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/goo-lab.html": {
      companion: "miao", sticker: { id: "empty-runner", label: "空跑漏掉员", emoji: "🧴" },
      card: { series: "物理实验", discovery: "喷胶网得住，空跑会漏掉。还是同一只。", fact: "因为胶丝才成网，所以空跑会漏。", next: "对照栉蚕页，猜该喷还是该跑。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }

    ,
    "nature/mantis-shrimps.html": {
      companion: "bo", sticker: { id: "club-smasher", label: "锤臂砸击员", emoji: "🦐" },
      card: { series: "自然观察", discovery: "虾蛄锤臂砸得够快才打出空泡。", fact: "不是普通钳子。也不是手枪虾那种空泡弹。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/smash-lab.html": {
      companion: "miao", sticker: { id: "soft-tapper", label: "慢捏没声员", emoji: "🔨" },
      card: { series: "物理实验", discovery: "锤够快才砸得动，慢捏就没声。还是同一只纸虾。", fact: "因为锤够快水里才空化，所以慢捏没声。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/anglerfish.html": {
      companion: "bo", sticker: { id: "lure-dangler", label: "垂饵等候员", emoji: "🎣" },
      card: { series: "自然观察", discovery: "鮟鱇把诱饵垂着，猎物自己过来。", fact: "不是追着咬。也不要把深海鱼捞上来玩。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lure-lab.html": {
      companion: "miao", sticker: { id: "chase-misser", label: "追着就跑员", emoji: "💡" },
      card: { series: "物理实验", discovery: "钓着才来，追着就跑。还是同一条纸鱼。", fact: "因为诱饵才让猎物靠近，所以一追就跑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cuttlefish.html": {
      companion: "bo", sticker: { id: "skin-shifter", label: "活皮换色员", emoji: "🦑" },
      card: { series: "自然观察", discovery: "乌贼活皮肤才会换色。", fact: "不是章鱼那种袋身。也不是画上去的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/skin-lab.html": {
      companion: "miao", sticker: { id: "paint-stucker", label: "画色不改员", emoji: "🎨" },
      card: { series: "物理实验", discovery: "活皮才换，画上去就不改。还是同一只纸乌贼。", fact: "因为色素细胞在活皮肤里，所以画上去不会改。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bombardier-beetles.html": {
      companion: "bo", sticker: { id: "chamber-popper", label: "两室喷雾员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "喷炮甲两室混合才喷热雾。", fact: "不是黄鼠狼喷臭。也不要去惹真虫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pop-lab.html": {
      companion: "miao", sticker: { id: "mix-failer", label: "单室滴出员", emoji: "💥" },
      card: { series: "物理实验", discovery: "两室兑上才喷，单室就滴出来。还是同一只纸虫。", fact: "因为两室在腹端才反应，所以单室只滴。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/caddisflies.html": {
      companion: "bo", sticker: { id: "stone-caser", label: "粘石壳员", emoji: "🪰" },
      card: { series: "自然观察", discovery: "石蛾幼虫自己粘石壳才站得住。", fact: "不是寄居蟹借壳。也不要捞真幼虫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/case-lab.html": {
      companion: "miao", sticker: { id: "bare-drifter", label: "光身冲走员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "粘壳才站得住，光身子会被冲走。还是同一条纸虫。", fact: "因为石壳加重又护身，所以光身会被冲走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/fleas.html": {
      companion: "bo", sticker: { id: "pad-launcher", label: "弹垫发射员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "跳蚤弹垫攒力才跳得高。", fact: "不是腿更有劲。也不要抓真跳蚤。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/resilin-lab.html": {
      companion: "miao", sticker: { id: "pad-flabber", label: "软垫蹲着员", emoji: "🦘" },
      card: { series: "物理实验", discovery: "垫够弹才射出去，软垫就蹲着。还是同一只纸蚤。", fact: "因为弹垫先存力再放，所以软垫蹲着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/paper-wasps.html": {
      companion: "bo", sticker: { id: "wood-pulper", label: "嚼木成纸员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "纸巢蜂嚼木头拌唾液才成纸。", fact: "不是蜜蜂蜡房。也不要捅真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pulp-lab.html": {
      companion: "miao", sticker: { id: "dry-chewer", label: "干嚼粉碎员", emoji: "📄" },
      card: { series: "物理实验", discovery: "湿浆摊得开，干嚼就碎。还是同一只纸蜂。", fact: "因为唾液才把木纤维粘成纸，所以干嚼碎。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/moray-eels.html": {
      companion: "bo", sticker: { id: "body-knotter", label: "打结吞食员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "海鳝身子打结才扯得动猎物。", fact: "不是普通吞。也不要把手伸进石缝。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/knot-lab.html": {
      companion: "miao", sticker: { id: "slip-swallower", label: "打滑掉了员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "结往前推才吞进，打滑就掉。还是同一条纸鳝。", fact: "因为结当把手才拉得动，所以打滑就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/goblin-sharks.html": {
      companion: "bo", sticker: { id: "jaw-slinger", label: "整嘴弹出员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "幽灵鲨整张嘴弹出去才咬到。", fact: "不是巨颚蚁那种跳。也不是牙床钉死的鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sling-lab.html": {
      companion: "miao", sticker: { id: "fixed-biter", label: "钉死够不着员", emoji: "🎯" },
      card: { series: "物理实验", discovery: "颌甩得出去才咬到，钉死就够不着。还是同一条纸鲨。", fact: "因为整套颌能甩出去，所以钉死够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/leafy-seadragons.html": {
      companion: "bo", sticker: { id: "weed-hider", label: "海草隐身员", emoji: "🐉" },
      card: { series: "自然观察", discovery: "叶海龙的叶子是伪装不是桨。", fact: "不是海马卷尾巴。也不要捞真海龙。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/camou-lab.html": {
      companion: "miao", sticker: { id: "open-swimmer", label: "空地被看见员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "藏进海草才看不见，游到空地就被发现。还是同一条纸龙。", fact: "因为叶子长得像海草，所以空地就露馅。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/horned-lizards.html": {
      companion: "bo", sticker: { id: "eye-squirter", label: "眼眶喷红员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "角蜥眼眶喷红水才吓退。", fact: "不是毒液。更不要挤真蜥的眼睛。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/blood-lab.html": {
      companion: "miao", sticker: { id: "dry-bluffer", label: "干瞪没戏员", emoji: "💧" },
      card: { series: "物理实验", discovery: "眼眶有压才喷得出，干瞪眼就没戏。还是同一只纸蜥。", fact: "因为眼窦加压才喷，所以干瞪没戏。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/glass-frogs.html": {
      companion: "bo", sticker: { id: "belly-shower", label: "透腹贴叶员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "玻璃蛙肚子近乎透明才贴得住叶。", fact: "不是箭毒蛙那种警告色。也不要翻真蛙。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/belly-lab.html": {
      companion: "miao", sticker: { id: "opaque-hider", label: "不透被看见员", emoji: "🍃" },
      card: { series: "物理实验", discovery: "透腹才融进叶子，不透就被看见。还是同一只纸蛙。", fact: "因为光穿过肚子，所以不透就从叶子上跳出来。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/antlions.html": {
      companion: "bo", sticker: { id: "pit-digger", label: "漏斗坑员", emoji: "🪱" },
      card: { series: "自然观察", discovery: "蚁狮挖漏斗坑，猎物才滑下来。", fact: "不是蜘蛛网。也不要挖真坑里的虫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pitfall-lab.html": {
      companion: "miao", sticker: { id: "flat-waiter", label: "摊平走掉员", emoji: "🕳️" },
      card: { series: "物理实验", discovery: "坑够陡才滑，摊平就走掉。还是同一只纸虫。", fact: "因为沙坡一塌才滑，所以摊平走得掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/springtails.html": {
      companion: "bo", sticker: { id: "fork-flicker", label: "弹器跳开员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "跳虫腹下叉子一弹才跳。", fact: "不是叩甲铰链。也不是跳蚤那种弹垫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flick-lab.html": {
      companion: "miao", sticker: { id: "fork-stuck", label: "叉子锁住员", emoji: "🍴" },
      card: { series: "物理实验", discovery: "叉子松开才弹，锁住就趴着。还是同一只纸虫。", fact: "因为弹器扣住再放才射，所以锁住就趴着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/four-eyed-fish.html": {
      companion: "bo", sticker: { id: "split-watcher", label: "裂瞳两边员", emoji: "👀" },
      card: { series: "自然观察", discovery: "四眼鱼一只眼分成水上水下。", fact: "不是真的长了四只眼。也不要捞真鱼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/split-lab.html": {
      companion: "miao", sticker: { id: "one-worlder", label: "瞎一边员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "瞳对上水面才两边都看见，整只眼就瞎一边。还是同一条纸鱼。", fact: "因为一只眼分成两半，所以不对水面就瞎一边。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sawfish.html": {
      companion: "bo", sticker: { id: "rostrum-slicer", label: "扁吻切开员", emoji: "🪚" },
      card: { series: "自然观察", discovery: "锯鳐扁吻两边有齿才切开。", fact: "不是剑鱼那种圆矛。也不要摸真锯吻。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/saw-lab.html": {
      companion: "miao", sticker: { id: "blunt-noser", label: "钝吻只撞员", emoji: "➖" },
      card: { series: "物理实验", discovery: "带齿扁吻才切得动，钝鼻子就撞一下。还是同一条纸鳐。", fact: "因为两侧齿才是刀，所以钝吻只撞。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cleaner-wrasses.html": {
      companion: "bo", sticker: { id: "station-pecker", label: "清洁站啄员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "裂唇鱼开清洁站，大鱼才停下来。", fact: "不是在咬大鱼。也不是印鱼吸着搭车。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/station-lab.html": {
      companion: "miao", sticker: { id: "chase-biter", label: "追咬吓跑员", emoji: "🧼" },
      card: { series: "物理实验", discovery: "停着啄才清得掉，追着咬就吓跑。还是同一条纸鱼。", fact: "因为大鱼是来排队的，所以一追就跑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/frogfish.html": {
      companion: "bo", sticker: { id: "sponge-waiter", label: "海绵等候员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "躄鱼长得像海绵才等得到。", fact: "不是深海发光鮟鱇。也不要捞真鱼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/gulp-lab.html": {
      companion: "miao", sticker: { id: "gulp-chaser", label: "追着就跑员", emoji: "😮" },
      card: { series: "物理实验", discovery: "嘴一张才吞进，去追就跑。还是同一条纸鱼。", fact: "因为突然张嘴才形成吸力，所以去追就跑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/triggerfish.html": {
      companion: "bo", sticker: { id: "spine-locker", label: "背棘锁死员", emoji: "🐡" },
      card: { series: "自然观察", discovery: "鳞鲀背棘锁死才卡得住。", fact: "不是河豚鼓气。也不是鬣蜥鼓身。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lock-lab.html": {
      companion: "miao", sticker: { id: "slip-spiner", label: "不锁滑出员", emoji: "🔒" },
      card: { series: "物理实验", discovery: "棘锁上才卡住，不锁就滑出。还是同一条纸鱼。", fact: "因为第一根棘会锁死，所以不锁就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/army-ants.html": {
      companion: "bo", sticker: { id: "body-bridger", label: "身体搭桥员", emoji: "🐜" },
      card: { series: "自然观察", discovery: "行军蚁用身体搭桥才过得去。", fact: "不是切叶蚁运叶子。也不要扒真蚁桥。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bridge-lab.html": {
      companion: "miao", sticker: { id: "solo-faller", label: "各走掉下员", emoji: "🌉" },
      card: { series: "物理实验", discovery: "钩在一起才过沟，各走各的会掉。还是同一队纸蚁。", fact: "因为身体钩成桥面，所以各走会掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/weaver-ants.html": {
      companion: "bo", sticker: { id: "larva-sewer", label: "幼虫缝叶员", emoji: "🐜" },
      card: { series: "自然观察", discovery: "织叶蚁用幼虫吐丝才缝得拢。", fact: "不是嚼木头成纸。也不要拆真叶巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/silk-lab.html": {
      companion: "miao", sticker: { id: "dry-tearer", label: "干拽撕开员", emoji: "🧵" },
      card: { series: "物理实验", discovery: "有丝才拉得拢，干拽就撕开。还是同一队纸蚁。", fact: "因为幼虫丝才是胶水，所以干拽撕开。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/praying-mantises.html": {
      companion: "bo", sticker: { id: "arm-striker", label: "折叠弹臂员", emoji: "🦗" },
      card: { series: "自然观察", discovery: "螳螂折叠的手臂弹出去才抓住。", fact: "不是舌头弹出去。也不要抓真螳螂。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/strike-lab.html": {
      companion: "miao", sticker: { id: "slow-reacher", label: "慢伸够不着员", emoji: "⚡" },
      card: { series: "物理实验", discovery: "先折再弹才抓到，慢伸就够不着。还是同一只纸螳螂。", fact: "因为先折叠才蓄力，所以慢伸够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/net-casting-spiders.html": {
      companion: "bo", sticker: { id: "net-caster", label: "手里投网员", emoji: "🕷️" },
      card: { series: "自然观察", discovery: "投网蛛把网抓在手里才罩得住。", fact: "不是圆网坐等。也不是甩一滴黏球。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/net-lab.html": {
      companion: "miao", sticker: { id: "orb-waiter", label: "挂网漏掉员", emoji: "🥅" },
      card: { series: "物理实验", discovery: "往下罩才网住，挂着等就漏掉。还是同一只纸蛛。", fact: "因为网是扔出去的，所以挂着等会漏。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/flying-frogs.html": {
      companion: "bo", sticker: { id: "web-glider", label: "张蹼滑翔员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "飞蛙指间蹼张开才滑得动。", fact: "不是拍翅膀。也不是飞鼠那张皮。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flap-lab.html": {
      companion: "miao", sticker: { id: "closed-dropper", label: "收蹼掉下员", emoji: "🪂" },
      card: { series: "物理实验", discovery: "蹼张开才滑，收起来就掉。还是同一只纸蛙。", fact: "因为蹼是帆，所以一收就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/vinegaroons.html": {
      companion: "bo", sticker: { id: "tail-sprayer", label: "尾喷酸雾员", emoji: "🦂" },
      card: { series: "自然观察", discovery: "鞭蝎尾巴喷酸雾才吓退。", fact: "不是毒针。也不是喷炮甲那种热雾。不要去惹。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/acid-lab.html": {
      companion: "miao", sticker: { id: "dry-whipper", label: "干甩没戏员", emoji: "🌫️" },
      card: { series: "物理实验", discovery: "尾巴有压才喷得出，干甩就没戏。还是同一只纸蝎。", fact: "因为尾腺加压才喷，所以干甩没戏。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bolas-spiders.html": {
      companion: "bo", sticker: { id: "drop-swinger", label: "黏球甩中员", emoji: "🕷️" },
      card: { series: "自然观察", discovery: "流星球蛛一根丝一滴黏球才甩得中。", fact: "不是圆网。也不是整张小网罩下去。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bolas-lab.html": {
      companion: "miao", sticker: { id: "empty-liner", label: "空绳挥空员", emoji: "⚪" },
      card: { series: "物理实验", discovery: "丝端有球才粘住，空绳子就挥空。还是同一只纸蛛。", fact: "因为黏球才是捕捉器，所以空绳挥空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/spittlebugs.html": {
      companion: "bo", sticker: { id: "foam-hider", label: "泡沫藏身员", emoji: "🫧" },
      card: { series: "自然观察", discovery: "沫蝉吹出泡沫房子才藏得住。", fact: "不是露水。也不是鸟吐的。更不要挤真泡沫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/foam-lab.html": {
      companion: "miao", sticker: { id: "bare-sitter", label: "光身被看见员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "吹出泡才挡住，光身子就被看见。还是同一只纸虫。", fact: "因为泡沫又湿又挡视线，所以光身就被看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/mole-crickets.html": {
      companion: "bo", sticker: { id: "shovel-digger", label: "铲足挖土员", emoji: "🦗" },
      card: { series: "自然观察", discovery: "蝼蛄铲子前足才挖得动。", fact: "不是哺乳类鼹鼠。也不要挖草坪抓虫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/burrow-lab.html": {
      companion: "miao", sticker: { id: "thin-slipper", label: "细腿打滑员", emoji: "⛏️" },
      card: { series: "物理实验", discovery: "铲子足才挖进，细腿就打滑。还是同一只纸虫。", fact: "因为前足是铲，所以细腿打滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/namib-beetles.html": {
      companion: "bo", sticker: { id: "bump-catcher", label: "凸点接雾员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "雾甲头朝下，背上凸点才把雾接到嘴里。", fact: "不是荷叶滚走水。也不要捡真虫。", next: "对照接雾工坊，猜光背为什么被吹走。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "对照不要并进第一句。", "不要去碰真的。"]
    }
    ,
    "games/fog-lab.html": {
      companion: "miao", sticker: { id: "slick-blower", label: "光背吹走员", emoji: "🌫️" },
      card: { series: "物理实验", discovery: "凸点才到嘴，光背就被吹走。还是同一只纸甲。", fact: "因为凸点才把雾停住，所以光背会被吹走。", next: "对照雾甲页，猜该凸还是该光。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/inchworms.html": {
      companion: "bo", sticker: { id: "loop-walker", label: "弓步往前员", emoji: "🐛" },
      card: { series: "自然观察", discovery: "尺蠖身子弓成一圈才往前。", fact: "不是蛇那种游。也不是跳着走。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/loop-lab.html": {
      companion: "miao", sticker: { id: "stretch-slider", label: "绷直滑掉员", emoji: "⌒" },
      card: { series: "物理实验", discovery: "后脚跟上才走，绷直就滑。还是同一条纸虫。", fact: "因为后脚跟上才有下一步，所以绷直会滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bagworms.html": {
      companion: "bo", sticker: { id: "bag-hanger", label: "背袋挂住员", emoji: "👜" },
      card: { series: "自然观察", discovery: "袋蛾自己背着房子才挂得住。", fact: "不是水里石蛾那种石壳。也不要摘真袋。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bag-lab.html": {
      companion: "miao", sticker: { id: "naked-dropper", label: "光身掉下员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "有袋才挂住，光身子就掉。还是同一条纸虫。", fact: "因为袋子吊在丝上，所以光身会掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/leaf-insects.html": {
      companion: "bo", sticker: { id: "leaf-faker", label: "叶子伪装员", emoji: "🍃" },
      card: { series: "自然观察", discovery: "叶䗛身子就是一片叶子。", fact: "不是竹节虫那种树枝。也不是叶海龙。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hide-lab.html": {
      companion: "miao", sticker: { id: "bare-spotted", label: "光枝被看见员", emoji: "👁️" },
      card: { series: "物理实验", discovery: "贴在叶上才看不见，站在光枝就被发现。还是同一只纸虫。", fact: "因为身子像叶子，所以离开叶子就露馅。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/stick-insects.html": {
      companion: "bo", sticker: { id: "twig-faker", label: "假枝瞒过员", emoji: "🪵" },
      card: { series: "自然观察", discovery: "竹节虫长得像树枝才瞒得过。", fact: "不是一片叶子。也不要抓真虫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/twig-lab.html": {
      companion: "miao", sticker: { id: "wave-spotted", label: "乱晃被看见员", emoji: "👀" },
      card: { series: "物理实验", discovery: "贴着树枝才看不见，乱晃就被发现。还是同一只纸虫。", fact: "因为静止才像树枝，所以乱晃露馅。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sundews.html": {
      companion: "bo", sticker: { id: "dew-sticker", label: "黏珠粘住员", emoji: "💧" },
      card: { series: "自然观察", discovery: "茅膏菜叶毛上的黏珠才粘得住。", fact: "不是普通露水。也不是瓶子草那种坑。不要摸。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dewtrap-lab.html": {
      companion: "miao", sticker: { id: "dry-slider", label: "干毛滑掉员", emoji: "🪴" },
      card: { series: "物理实验", discovery: "珠够黏才粘住，干毛就滑掉。还是同一片纸叶。", fact: "因为珠是黏的，所以干毛粘不住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pitcher-plants.html": {
      companion: "bo", sticker: { id: "rim-dropper", label: "滑口掉进员", emoji: "🫙" },
      card: { series: "自然观察", discovery: "瓶子草滑边的坑才掉得进去。", fact: "不是茅膏菜黏毛。也不是蚁狮沙坑。不要伸手。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pitcher-lab.html": {
      companion: "miao", sticker: { id: "climb-outer", label: "干边爬出员", emoji: "🕳️" },
      card: { series: "物理实验", discovery: "瓶口够滑才掉，干边就爬出来。还是同一个纸瓶。", fact: "因为瓶口又滑又陡，所以干边爬得出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lithops.html": {
      companion: "bo", sticker: { id: "pebble-faker", label: "卵石伪装员", emoji: "🪨" },
      card: { series: "自然观察", discovery: "生石花长得像石头才瞒得过。", fact: "不是仙人掌那种刺。也不要挖野生的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pebble-lab.html": {
      companion: "miao", sticker: { id: "sand-spotted", label: "光沙被看见员", emoji: "🌵" },
      card: { series: "物理实验", discovery: "混在石子里才看不见，放在光沙就被发现。还是同一株纸花。", fact: "因为身子像卵石，所以离开石子就露馅。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/peacock-spiders.html": {
      companion: "bo", sticker: { id: "flap-dancer", label: "腹瓣开屏员", emoji: "🕷️" },
      card: { series: "自然观察", discovery: "孔雀蛛腹瓣张开才看得见颜色。", fact: "不是孔雀那种羽毛。也不要抓真蛛。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dance-lab.html": {
      companion: "miao", sticker: { id: "fold-hider", label: "收瓣看不出员", emoji: "🎨" },
      card: { series: "物理实验", discovery: "瓣张开才亮，收着就看不出。还是同一只纸蛛。", fact: "因为颜色画在瓣里面，所以一收就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/whirligigs.html": {
      companion: "bo", sticker: { id: "film-splitter", label: "水面裂眼员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "豉甲眼睛分成水上水下。", fact: "不是四眼鱼。也不是水黾站膜。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/twineye-lab.html": {
      companion: "miao", sticker: { id: "one-film-eye", label: "瞎一边员", emoji: "👁️" },
      card: { series: "物理实验", discovery: "瞳对上水面才两边都看见，整只眼就瞎一边。还是同一只纸虫。", fact: "因为一只眼分成两半，所以不对水面就瞎一边。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gliding-ants.html": {
      companion: "bo", sticker: { id: "trunk-steerer", label: "拐回树干员", emoji: "🐜" },
      card: { series: "自然观察", discovery: "滑翔蚁掉下去还能拐回树干。", fact: "不是飞鼠那张皮。也不要从树上拨真蚁。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fall-lab.html": {
      companion: "miao", sticker: { id: "straight-dropper", label: "直掉砸地员", emoji: "🪂" },
      card: { series: "物理实验", discovery: "身子一扭才拐回，直掉就砸地。还是同一只纸蚁。", fact: "因为腿和头能当舵，所以直掉到不了树。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/fig-wasps.html": {
      companion: "bo", sticker: { id: "fig-crawler", label: "钻果传粉员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "榕小蜂钻进果里才传得上粉。", fact: "不是檐下纸巢那种蜂。也不要剖开真果找蜂。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fig-lab.html": {
      companion: "miao", sticker: { id: "sealed-misser", label: "封死传不上员", emoji: "🍈" },
      card: { series: "物理实验", discovery: "孔开着才进得去，封死就传不上。还是同一个纸果。", fact: "因为花藏在果里，所以封死进不去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/venus-flytraps.html": {
      companion: "bo", sticker: { id: "two-snapper", label: "点两次合上员", emoji: "🪴" },
      card: { series: "自然观察", discovery: "捕蝇草触毛点两次才合上。", fact: "不是茅膏菜黏珠。也不要摸真夹子。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/snaptrap-lab.html": {
      companion: "miao", sticker: { id: "one-opener", label: "点一次还开员", emoji: "🪤" },
      card: { series: "物理实验", discovery: "点两次才合，点一次还开着。还是同一片纸叶。", fact: "因为要确认不是雨点，所以一次不够。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sensitive-plants.html": {
      companion: "bo", sticker: { id: "touch-folder", label: "一碰合叶员", emoji: "🌿" },
      card: { series: "自然观察", discovery: "含羞草一碰小叶才合上。", fact: "不是缺水才蔫。也不要猛拍真叶。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fold-lab.html": {
      companion: "miao", sticker: { id: "still-opener", label: "不碰还开员", emoji: "👋" },
      card: { series: "物理实验", discovery: "碰一下才合，不碰就开着。还是同一株纸草。", fact: "因为叶枕里的水一下子撤走，所以一碰才合。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/portia-spiders.html": {
      companion: "bo", sticker: { id: "route-planner", label: "绕路摸到员", emoji: "🕷️" },
      card: { series: "自然观察", discovery: "拟态跳蛛先绕路才摸得上去。", fact: "不是网上坐等。也不是整张网罩下去。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/plan-lab.html": {
      companion: "miao", sticker: { id: "web-charger", label: "直冲粘住员", emoji: "🗺️" },
      card: { series: "物理实验", discovery: "绕远路才摸到，直冲就会粘住。还是同一只纸蛛。", fact: "因为对面是别人的网，所以直冲会粘。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hoatzins.html": {
      companion: "bo", sticker: { id: "wing-climber", label: "翅爪爬回员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "麝雉雏鸟翅膀上的爪子才爬得回巢。", fact: "不是蝙蝠翅膀。长大了爪子会褪。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/claw-lab.html": {
      companion: "miao", sticker: { id: "bare-slipper", label: "没爪滑掉员", emoji: "🪝" },
      card: { series: "物理实验", discovery: "有爪才爬回，没爪就滑掉。还是同一只纸鸟。", fact: "因为翅爪能抓住枝，所以没爪滑掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/water-boatmen.html": {
      companion: "bo", sticker: { id: "oar-rower", label: "后足划桨员", emoji: "🛶" },
      card: { series: "自然观察", discovery: "划蝽后足像桨才划得动。", fact: "不是仰着游的那种。也不是水黾站膜。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/oar-lab.html": {
      companion: "miao", sticker: { id: "stub-spinner", label: "短腿打转员", emoji: "🚣" },
      card: { series: "物理实验", discovery: "桨够长才划走，短腿就原地转。还是同一只纸虫。", fact: "因为后足是桨，所以短了划不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sunbitterns.html": {
      companion: "bo", sticker: { id: "sun-flasher", label: "展翅太阳员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "日鳽翅膀一展才亮出太阳纹。", fact: "不是孔雀蛛那种腹瓣。合上就藏起来。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flash-lab.html": {
      companion: "miao", sticker: { id: "fold-camo", label: "合翅看不见员", emoji: "☀️" },
      card: { series: "物理实验", discovery: "翅张开才吓退，合上就看不见。还是同一只纸鸟。", fact: "因为花纹在翅膀里面，所以一合就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/harvestmen.html": {
      companion: "bo", sticker: { id: "stilt-stepper", label: "长腿跨缝员", emoji: "🕷️" },
      card: { series: "自然观察", discovery: "盲蛛腿特别长、身子是一整块。", fact: "不是会织网的蜘蛛。身体也不分成两段。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/longleg-lab.html": {
      companion: "miao", sticker: { id: "gap-faller", label: "短腿掉缝员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "长腿才跨得过，短腿就掉进缝。还是同一只纸虫。", fact: "因为腿是高跷，所以短了跨不过缝。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lacewings.html": {
      companion: "bo", sticker: { id: "jaw-hunter", label: "幼虫捕蚜员", emoji: "🦋" },
      card: { series: "自然观察", discovery: "草蛉幼虫才是捕蚜的。", fact: "不是那只漂亮成虫。也不是瓢虫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/aphid-lab.html": {
      companion: "miao", sticker: { id: "pretty-misser", label: "没颚够不着员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "有颚才吸得到，没颚就够不着。还是同一只纸虫。", fact: "因为捕蚜靠的是颚，所以没颚吸不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bladderworts.html": {
      companion: "bo", sticker: { id: "vacuum-sucker", label: "瘪囊吸入员", emoji: "🫧" },
      card: { series: "自然观察", discovery: "狸藻水下小囊一吸才进去。", fact: "不是瓶子草那种坑。也不是捕蝇草那种夹。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/suck-lab.html": {
      companion: "miao", sticker: { id: "limp-bagger", label: "鼓囊吸不进员", emoji: "💨" },
      card: { series: "物理实验", discovery: "囊瘪着才吸得动，鼓着就吸不进。还是同一个纸囊。", fact: "因为真空才吸，所以鼓着吸不进。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/shoebills.html": {
      companion: "bo", sticker: { id: "statue-striker", label: "静站啄中员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鲸头鹳先站成雕塑才啄得到。", fact: "不是一直走来走去找。嘴是鞋状大喙。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/still-lab.html": {
      companion: "miao", sticker: { id: "fidget-misser", label: "乱动错过员", emoji: "🗿" },
      card: { series: "物理实验", discovery: "站够久才啄中，乱动就错过。还是同一只纸鸟。", fact: "因为猎物怕动，所以乱动就错过。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/honeyguides.html": {
      companion: "bo", sticker: { id: "hive-guider", label: "带路找蜡员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "响蜜䴕带着人找到蜂巢才吃得到蜡。", fact: "它自己不会酿蜜。也不要跟去掏真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wax-lab.html": {
      companion: "miao", sticker: { id: "lost-wanderer", label: "乱飞没蜡员", emoji: "🍯" },
      card: { series: "物理实验", discovery: "带着走才找得到，自己乱飞就没有蜡。还是同一只纸鸟。", fact: "因为它靠带路换蜡渣，所以乱飞没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/kakapos.html": {
      companion: "bo", sticker: { id: "bowl-boomer", label: "土碗低鸣员", emoji: "🦜" },
      card: { series: "自然观察", discovery: "鸮鹦鹉在土碗里低鸣才传得远。", fact: "它几乎不会飞。也不是吼猴那种喉骨碗。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/boom-lab.html": {
      companion: "miao", sticker: { id: "flat-quieter", label: "平地听不远员", emoji: "📢" },
      card: { series: "物理实验", discovery: "碗够深才传远，平地就听不远。还是同一只纸鸟。", fact: "因为土碗帮着把声音送出去，所以平地传不远。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/frogmouths.html": {
      companion: "bo", sticker: { id: "branch-gaper", label: "断枝张嘴员", emoji: "🦉" },
      card: { series: "自然观察", discovery: "蟆口鸱先装成断枝再张大嘴。", fact: "不是鹈鹕那种喉袋。也不一直张着嘴等。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/gape-lab.html": {
      companion: "miao", sticker: { id: "thin-leaker", label: "小嘴漏掉员", emoji: "😮" },
      card: { series: "物理实验", discovery: "嘴张够大才兜住，小嘴就漏掉。还是同一只纸鸟。", fact: "因为嘴是一张网，所以小了会漏。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sandgrouse.html": {
      companion: "bo", sticker: { id: "belly-soaker", label: "浸腹带回员", emoji: "🪶" },
      card: { series: "自然观察", discovery: "沙鸡肚皮浸湿才带回水。", fact: "不是油羽把水珠滚走。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/soak-lab.html": {
      companion: "miao", sticker: { id: "dry-thirster", label: "油羽滚走员", emoji: "💧" },
      card: { series: "物理实验", discovery: "肚皮够湿才带回，油羽就滚走。还是同一只纸鸟。", fact: "因为腹羽细丝吸水，所以一油就滚走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/riflebirds.html": {
      companion: "bo", sticker: { id: "cape-opener", label: "披风张开员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "风鸟把披风张开才看得见那块蓝。", fact: "不是孔雀蛛那种腹瓣。也不要抓真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cape-lab.html": {
      companion: "miao", sticker: { id: "cape-folder", label: "收着看不出员", emoji: "🧥" },
      card: { series: "物理实验", discovery: "披风张开才亮，收着就看不出。还是同一只纸鸟。", fact: "因为蓝在披风里面，所以一收就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/potoos.html": {
      companion: "bo", sticker: { id: "still-poser", label: "装枝瞒过员", emoji: "🦉" },
      card: { series: "自然观察", discovery: "林鸱先装成断枝才瞒得过。", fact: "不是蟆口鸱那种先张大嘴。也不要抓真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pose-lab.html": {
      companion: "miao", sticker: { id: "move-spotted", label: "一动被看见员", emoji: "🪵" },
      card: { series: "物理实验", discovery: "贴着树枝才看不见，一动就被发现。还是同一只纸鸟。", fact: "因为静止才像树枝，所以一动就露馅。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/oilbirds.html": {
      companion: "bo", sticker: { id: "cave-clicker", label: "洞里点击员", emoji: "🦇" },
      card: { series: "自然观察", discovery: "油鸱在洞里靠点击回声才飞得动。", fact: "不是蝙蝠那种超声那么尖。也不要进真洞追鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/caveclick-lab.html": {
      companion: "miao", sticker: { id: "mute-bumper", label: "不响撞墙员", emoji: "🔊" },
      card: { series: "物理实验", discovery: "点击够才找得到路，不响就撞墙。还是同一只纸鸟。", fact: "因为回声才画出洞壁，所以不响会撞。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/echidnas.html": {
      companion: "bo", sticker: { id: "spike-raiser", label: "竖刺防身员", emoji: "🦔" },
      card: { series: "自然观察", discovery: "针鼹背上的刺竖起来才防得住。", fact: "它会下蛋。不是刺猬那种胎生。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/spike-lab.html": {
      companion: "miao", sticker: { id: "flat-spiker", label: "倒伏挡不住员", emoji: "📌" },
      card: { series: "物理实验", discovery: "刺竖起才防得住，倒伏就挡不住。还是同一只纸兽。", fact: "因为刺要竖成墙，所以倒伏挡不住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/fruit-bats.html": {
      companion: "bo", sticker: { id: "pollen-dipper", label: "伸舌沾粉员", emoji: "🦇" },
      card: { series: "自然观察", discovery: "果蝠用舌头伸进花里才带得走花粉。", fact: "不是吸血。也不要抓真蝠。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pollen-lab.html": {
      companion: "miao", sticker: { id: "shut-misser", label: "闭嘴带不走员", emoji: "🌸" },
      card: { series: "物理实验", discovery: "舌伸进才沾上粉，闭嘴就带不走。还是同一只纸蝠。", fact: "因为花粉沾在舌头上，所以闭嘴带不走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ospreys.html": {
      companion: "bo", sticker: { id: "toe-reverser", label: "转趾抓鱼员", emoji: "🦅" },
      card: { series: "自然观察", discovery: "鹗外趾能转到后面，才抓得住滑鱼。", fact: "不是普通鹰那种固定三前一后。也不要靠近真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/revers-lab.html": {
      companion: "miao", sticker: { id: "slick-dropper", label: "不转滑掉员", emoji: "🔄" },
      card: { series: "物理实验", discovery: "外趾转到后面才抓得住，不转就滑掉。还是同一只纸鸟。", fact: "因为两前两后才夹得紧，所以不转会滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/spoonbills.html": {
      companion: "bo", sticker: { id: "bill-sweeper", label: "扁嘴横扫员", emoji: "🦩" },
      card: { series: "自然观察", discovery: "琵鹭扁嘴左右扫才捞得到。", fact: "不是尖喙去戳。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sweep-lab.html": {
      companion: "miao", sticker: { id: "poke-misser", label: "尖喙戳不中员", emoji: "🥄" },
      card: { series: "物理实验", discovery: "扁嘴左右扫才捞到，尖喙戳不中。还是同一只纸鸟。", fact: "因为勺子要横着舀，所以直戳捞不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/anhingas.html": {
      companion: "bo", sticker: { id: "wet-diver", label: "湿翅深潜员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "蛇鹈羽毛会湿透才潜得深。", fact: "不是鸭子那种防水油。上岸要晾干。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/drywing-lab.html": {
      companion: "miao", sticker: { id: "oiled-floater", label: "涂油浮面员", emoji: "☀️" },
      card: { series: "物理实验", discovery: "翅湿透才潜得深，涂油就浮在面。还是同一只纸鸟。", fact: "因为湿了才沉得下，所以涂油会浮。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gannets.html": {
      companion: "bo", sticker: { id: "plunge-folder", label: "贴翅冲水员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鲣鸟翅贴身冲下去才进得了水。", fact: "不是张开拍水。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/plunge-lab.html": {
      companion: "miao", sticker: { id: "belly-flopper", label: "张开拍面员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "翅贴紧才进得了水，张开就拍在面上。还是同一只纸鸟。", fact: "因为翅膀一张就拍在水面，所以要贴紧才插得进。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/horseshoe-crabs.html": {
      companion: "bo", sticker: { id: "book-paddler", label: "书鳃划水员", emoji: "🦀" },
      card: { series: "自然观察", discovery: "鲎书鳃扇起来才划得动。", fact: "不是螃蟹那种鳃。也不要翻真鲎。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bookgills-lab.html": {
      companion: "miao", sticker: { id: "fold-sinker", label: "合死划不动员", emoji: "📖" },
      card: { series: "物理实验", discovery: "书鳃扇开才划得动，合死就划不动。还是同一只纸鲎。", fact: "因为书鳃一层层当桨，所以一合就划不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/skimmers.html": {
      companion: "bo", sticker: { id: "skim-cutter", label: "下喙刮水员", emoji: "✂️" },
      card: { series: "自然观察", discovery: "剪嘴鸥下喙更长贴着水面刮才捞得到。", fact: "不是翠鸟那种扎水。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/skim-lab.html": {
      companion: "miao", sticker: { id: "high-misser", label: "抬高漏掉员", emoji: "🐦" },
      card: { series: "物理实验", discovery: "下喙贴水刮才捞得到，抬高去啄就漏掉。还是同一只纸鸟。", fact: "因为下喙比上喙长，所以抬高就刮不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/avocets.html": {
      companion: "bo", sticker: { id: "curve-sweeper", label: "上弯扫水员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "反嘴鹬上弯的细嘴左右扫才捞得到。", fact: "不是鹭那种直喙。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/upsweep-lab.html": {
      companion: "miao", sticker: { id: "straight-misser", label: "直戳漏掉员", emoji: "⤴️" },
      card: { series: "物理实验", discovery: "上弯细嘴左右扫才捞得到，直戳就漏掉。还是同一只纸鸟。", fact: "因为嘴向上弯，所以直戳对不准。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/oystercatchers.html": {
      companion: "bo", sticker: { id: "pry-opener", label: "刀嘴撬缝员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "蛎鹬刀一样的红嘴才撬得开贝壳。", fact: "不是虾蛄那种锤砸。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pry-lab.html": {
      companion: "miao", sticker: { id: "stab-misser", label: "去砸撬不开员", emoji: "🔪" },
      card: { series: "物理实验", discovery: "刀嘴撬进缝才开得了，去砸就撬不开。还是同一只纸鸟。", fact: "因为嘴是扁刀，所以砸打不开缝。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tropicbirds.html": {
      companion: "bo", sticker: { id: "tail-streamer", label: "飘带信号员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹲两根飘带尾才看得见信号。", fact: "不是军舰鸟叉尾。也不要抓真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/streamer-lab.html": {
      companion: "miao", sticker: { id: "short-staller", label: "剪短认不出员", emoji: "🎀" },
      card: { series: "物理实验", discovery: "两根飘带才看得见信号，剪短就认不出。还是同一只纸鸟。", fact: "因为飘带够长对面才认得出，所以一剪就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }    ,
    "nature/fulmars.html": {
      companion: "bo", sticker: { id: "oil-spitter", label: "管鼻排盐员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "暴风鹱管鼻才排得出多余的盐。", fact: "不是普通鸥那种光喙。也不要抓真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tube-lab.html": {
      companion: "miao", sticker: { id: "dry-gulper", label: "管子堵住员", emoji: "🧂" },
      card: { series: "物理实验", discovery: "管子通了才排得出盐，堵住就咸着。还是同一只纸鸟。", fact: "因为盐从小管流出去，所以一堵就咸着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/storm-petrels.html": {
      companion: "bo", sticker: { id: "patter-dabber", label: "飞着点水员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "海燕飞着脚点水面才捞得到。", fact: "不是水黾站住靠膜。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/patter-lab.html": {
      companion: "miao", sticker: { id: "sink-dropper", label: "停翅沉下去员", emoji: "👣" },
      card: { series: "物理实验", discovery: "飞着脚点水面才捞得到，翅膀一停就沉。还是同一只纸鸟。", fact: "因为要一边飞一边点，所以翅膀一停就沉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }    ,
    "nature/boobies.html": {
      companion: "bo", sticker: { id: "foot-lifter", label: "蓝脚抬起员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "蓝脚抬起来才看得见信号。", fact: "不是冲进水。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mask-lab.html": {
      companion: "miao", sticker: { id: "foot-hider", label: "蓝脚收着员", emoji: "💙" },
      card: { series: "物理实验", discovery: "蓝脚抬起来才看得见信号，收着就藏住。还是同一只纸鸟。", fact: "因为蓝画在脚面上，所以一收就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/frigatebirds.html": {
      companion: "bo", sticker: { id: "gular-blower", label: "红囊鼓起员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "军舰鸟红喉囊鼓起来才看得见信号。", fact: "不是河豚鼓身。也不要靠近真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/gular-lab.html": {
      companion: "miao", sticker: { id: "flat-hider", label: "瘪囊看不出员", emoji: "🎈" },
      card: { series: "物理实验", discovery: "红喉囊鼓起来才看得见信号，瘪着就看不出。还是同一只纸鸟。", fact: "因为红画在囊面上，所以一瘪就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/platypus.html": {
      companion: "bo", sticker: { id: "electro-sniffer", label: "张喙摸电员", emoji: "🦫" },
      card: { series: "自然观察", discovery: "鸭嘴兽闭着眼用喙摸电场才找得到虾。", fact: "不是用眼睛看。也不要抓真兽。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/electro-lab.html": {
      companion: "miao", sticker: { id: "closed-biller", label: "闭喙摸空员", emoji: "⚡" },
      card: { series: "物理实验", discovery: "喙张开摸电才找得到，闭上喙就摸空。还是同一只纸兽。", fact: "因为电在水里，所以喙一闭就摸不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/star-nosed-moles.html": {
      companion: "bo", sticker: { id: "star-feeler", label: "星瓣摸路员", emoji: "⭐" },
      card: { series: "自然观察", discovery: "星鼻鼹鼻子上的肉瓣星才摸得到路。", fact: "不是用眼睛看。也不要挖真鼹。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/star-lab.html": {
      companion: "miao", sticker: { id: "bare-noser", label: "光鼻撞墙员", emoji: "👃" },
      card: { series: "物理实验", discovery: "肉瓣张开才摸得到，光鼻子就撞墙。还是同一只纸鼹。", fact: "因为路是摸出来的，所以光鼻子会撞。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/peregrines.html": {
      companion: "bo", sticker: { id: "stoop-folder", label: "贴翅俯冲员", emoji: "🦅" },
      card: { series: "自然观察", discovery: "游隼翅贴身俯冲才收得住速度。", fact: "不是张开拍风。也不要追真隼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/stoop-lab.html": {
      companion: "miao", sticker: { id: "spread-dragger", label: "张翅拖住员", emoji: "⬇️" },
      card: { series: "物理实验", discovery: "翅贴紧才冲得快，张开就拖住。还是同一只纸隼。", fact: "因为张开会兜风，所以一开就慢。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/barn-owls.html": {
      companion: "bo", sticker: { id: "comb-glider", label: "细齿静滑员", emoji: "🦉" },
      card: { series: "自然观察", discovery: "仓鸮翅前缘细齿才滑得静。", fact: "不是眼睛更大那种主课。也不要掏真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/silent-lab.html": {
      companion: "miao", sticker: { id: "noisy-flapper", label: "光翅呼呼员", emoji: "🤫" },
      card: { series: "物理实验", discovery: "前缘有齿才静，光滑就呼呼响。还是同一只纸鸮。", fact: "因为齿把风撕碎，所以一滑就没声。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/godwits.html": {
      companion: "bo", sticker: { id: "bill-prober", label: "长喙探泥员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "塍鹬长喙探进泥里才够得到。", fact: "不是在水面啄。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/probe-lab.html": {
      companion: "miao", sticker: { id: "short-pecker", label: "短喙够不着员", emoji: "🪡" },
      card: { series: "物理实验", discovery: "喙够长才探得到，短喙就够不着。还是同一只纸鸟。", fact: "因为虫在泥深处，所以短了够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/turnstones.html": {
      companion: "bo", sticker: { id: "stone-flipper", label: "掀石找食员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "翻石鹬短喙掀石头才找得到。", fact: "不是只在面上啄。也不要翻滩上的鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flip-lab.html": {
      companion: "miao", sticker: { id: "peck-misser", label: "不掀啄空员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "掀开石头才找得到，不掀就啄空。还是同一只纸鸟。", fact: "因为虫在石头底下，所以不掀就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/shearwaters.html": {
      companion: "bo", sticker: { id: "slope-soarer", label: "贴浪滑行员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹱硬翅贴着浪坡滑才飞得远。", fact: "不是猛扇才快。也不要追海鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dynamic-lab.html": {
      companion: "miao", sticker: { id: "flap-tirer", label: "猛扇就累员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "翅硬贴浪才滑得远，猛扇就累。还是同一只纸鸟。", fact: "因为浪坡有风，所以贴着滑比扇更远。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/swifts.html": {
      companion: "bo", sticker: { id: "saliva-gluer", label: "唾液粘巢员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "雨燕唾液把巢粘在墙上才掉不下来。", fact: "不是用泥垒。也不要掏真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/glue-lab.html": {
      companion: "miao", sticker: { id: "dry-faller", label: "干了就掉员", emoji: "🪺" },
      card: { series: "物理实验", discovery: "唾液够湿才粘得住，干了就掉。还是同一只纸鸟。", fact: "因为粘靠湿唾液，所以一干就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bitterns.html": {
      companion: "bo", sticker: { id: "reed-poser", label: "藏进芦苇员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "苇鳽把脖子伸直藏进芦苇才看不见。", fact: "不是苍鹭那种缩颈打猎。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/reed-lab.html": {
      companion: "miao", sticker: { id: "reed-stander", label: "走到空地员", emoji: "🌾" },
      card: { series: "物理实验", discovery: "藏进芦苇才看不见，走到空地就被看见。还是同一只纸鸟。", fact: "因为芦苇挡住身子，所以一走到空地就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hoopoes.html": {
      companion: "bo", sticker: { id: "crest-fanner", label: "冠羽张开员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "戴胜把冠羽张开才看得见信号。", fact: "不是帽子好看那种主课。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/crest-lab.html": {
      companion: "miao", sticker: { id: "crest-folder", label: "收冠认不出员", emoji: "👑" },
      card: { series: "物理实验", discovery: "冠羽张开才看得见，收着就认不出。还是同一只纸鸟。", fact: "因为信号在那一扇冠上，所以一收就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/oxpeckers.html": {
      companion: "bo", sticker: { id: "tick-picker", label: "站背啄蜱员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "牛椋鸟站在背上啄蜱才找得到。", fact: "不是清洁鱼那种站台。也不要碰真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tick-lab.html": {
      companion: "miao", sticker: { id: "perch-pecker", label: "追着咬空员", emoji: "🪲" },
      card: { series: "物理实验", discovery: "站着啄蜱才找得到，追着咬就找不到。还是同一只纸鸟。", fact: "因为蜱贴在皮上，所以一追就啄空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/weaverbirds.html": {
      companion: "bo", sticker: { id: "knot-weaver", label: "打紧织巢员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "织巢鸟把结打紧巢才挂得住。", fact: "不是家燕那种泥垒。也不要掏真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/nest-lab.html": {
      companion: "miao", sticker: { id: "slack-nester", label: "松开就掉员", emoji: "🪺" },
      card: { series: "物理实验", discovery: "结打紧才挂得住，松了就掉。还是同一只纸鸟。", fact: "因为吊巢靠结，所以一松就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/roadrunners.html": {
      companion: "bo", sticker: { id: "ground-sprinter", label: "贴地快跑员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "走鹃贴地快跑才追得到。", fact: "不是动画片那种。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sprint-lab.html": {
      companion: "miao", sticker: { id: "fly-waster", label: "乱飞浪费员", emoji: "🏃" },
      card: { series: "物理实验", discovery: "贴地跑才追得到，乱飞就浪费。还是同一只纸鸟。", fact: "因为腿才是快的零件，所以一飞就慢。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cuckoos.html": {
      companion: "bo", sticker: { id: "egg-slyer", label: "寄巢放蛋员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "杜鹃把蛋放进别人的巢才有人孵。", fact: "不是布谷钟。也不要掏巢拿蛋。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/brood-lab.html": {
      companion: "miao", sticker: { id: "nest-sitter", label: "自己坐着员", emoji: "🥚" },
      card: { series: "物理实验", discovery: "蛋放进别人巢才有人孵，自己坐着就没人帮。还是同一只纸鸟。", fact: "因为杜鹃自己不孵，所以不放进去就没人帮。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ibises.html": {
      companion: "bo", sticker: { id: "curve-prober", label: "弯喙探泥员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹮下弯的长嘴探进泥里才够得到。", fact: "不是琵鹭那种横扫。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/curve-lab.html": {
      companion: "miao", sticker: { id: "straight-pecker", label: "直啄够不着员", emoji: "🪝" },
      card: { series: "物理实验", discovery: "弯喙探泥才够得到，直啄就够不着。还是同一只纸鸟。", fact: "因为虫在弯弯的泥洞里，所以直啄够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/egrets.html": {
      companion: "bo", sticker: { id: "plume-shower", label: "蓑羽披开员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "白鹭把背上蓑羽披开才看得见信号。", fact: "不是只比谁更白。也不要拔真羽毛。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/plume-lab.html": {
      companion: "miao", sticker: { id: "fold-plumer", label: "收羽认不出员", emoji: "🪶" },
      card: { series: "物理实验", discovery: "蓑羽披开才看得见，收着就认不出。还是同一只纸鸟。", fact: "因为信号在那些细羽上，所以一收就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/herons.html": {
      companion: "bo", sticker: { id: "coil-striker", label: "先缩再打员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "苍鹭先把脖子缩成 S 形再弹出才打得到。", fact: "不是苇鳽那种藏。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/coil-lab.html": {
      companion: "miao", sticker: { id: "stretch-misser", label: "直伸跑鱼员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "先缩再打才打得到，一直伸着鱼就跑。还是同一只纸鸟。", fact: "因为弹出去才够快，所以一直伸着会吓跑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bee-eaters.html": {
      companion: "bo", sticker: { id: "sting-rubber", label: "先搓掉刺员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "蜂虎先把刺搓掉才吃得成。", fact: "不是雨燕那种主课。也不要抓真蜂。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sting-lab.html": {
      companion: "miao", sticker: { id: "swallow-stinger", label: "整吞被蛰员", emoji: "🐝" },
      card: { series: "物理实验", discovery: "先搓掉刺才吃得成，整只吞就被蛰。还是同一只纸鸟。", fact: "因为刺还在，所以整吞会被蛰。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/nightjars.html": {
      companion: "bo", sticker: { id: "ground-sitter", label: "贴地藏住员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "夜鹰贴地不动，枯叶纹才藏得住。", fact: "不是仓鸮那种静滑。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/churr-lab.html": {
      companion: "miao", sticker: { id: "walk-flusher", label: "走动被看见员", emoji: "🪵" },
      card: { series: "物理实验", discovery: "贴地不动才藏得住，走来走去就被看见。还是同一只纸鸟。", fact: "因为纹要贴着地才像叶子，所以一走就露。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/motmots.html": {
      companion: "bo", sticker: { id: "racket-shower", label: "球拍尾晃员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "翠鴗把球拍尾晃着才看得见信号。", fact: "不是鹲那种飘带。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/racket-lab.html": {
      companion: "miao", sticker: { id: "stump-tailer", label: "齐尾认不出员", emoji: "🎾" },
      card: { series: "物理实验", discovery: "球拍尾晃着才看得见，齐尾就认不出。还是同一只纸鸟。", fact: "因为信号在那只拍上，所以一齐就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/swallows.html": {
      companion: "bo", sticker: { id: "mud-pelletor", label: "湿泥贴巢员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "家燕用湿泥一口一口贴上墙，巢才贴得住。", fact: "不是雨燕那种唾液巢。也不要掏真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mudnest-lab.html": {
      companion: "miao", sticker: { id: "dry-crumble", label: "干泥掉块员", emoji: "🧱" },
      card: { series: "物理实验", discovery: "泥够湿才贴得住，太干泥块就掉。还是同一只纸鸟。", fact: "因为泥要湿才粘，所以一干就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/phalaropes.html": {
      companion: "bo", sticker: { id: "whirl-stirrer", label: "转圈搅涡员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "瓣蹼鹬转圈搅涡才把小虫旋上来。", fact: "不是反嘴鹬横扫。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/whirl-lab.html": {
      companion: "miao", sticker: { id: "still-floater", label: "站住沉底员", emoji: "🌀" },
      card: { series: "物理实验", discovery: "转圈搅涡才旋得上，站着不动虫沉底。还是同一只纸鸟。", fact: "因为涡才把虫旋上来，所以一停就沉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ostriches.html": {
      companion: "bo", sticker: { id: "kick-runner", label: "长腿踢跑员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鸵鸟用长腿跑和踢才跑得掉。", fact: "不是把头埋进沙。也不要靠近真鸵鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/kick-lab.html": {
      companion: "miao", sticker: { id: "flap-waster", label: "扇翅飞不起来员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "长腿踢跑才跑得掉，扇翅膀飞不起来。还是同一只纸鸟。", fact: "因为翅太小托不住，所以一扇还是飞不起来。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/curlews.html": {
      companion: "bo", sticker: { id: "sickle-prober", label: "镰喙探洞员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "杓鹬镰刀一样的长喙探进弯洞才够得到。", fact: "不是塍鹬那种略直长喙。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sickle-lab.html": {
      companion: "miao", sticker: { id: "short-shorer", label: "短直够不着员", emoji: "🌙" },
      card: { series: "物理实验", discovery: "镰喙探洞才够得到，短直喙就够不着。还是同一只纸鸟。", fact: "因为洞是弯的，所以直的短的都够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/crossbills.html": {
      companion: "bo", sticker: { id: "bill-twister", label: "交叉撬籽员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "交嘴雀交叉的嘴才撬得开松果。", fact: "不是直喙去戳。也不要抓真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/twist-lab.html": {
      companion: "miao", sticker: { id: "straight-seedless", label: "直喙戳不进员", emoji: "🔀" },
      card: { series: "物理实验", discovery: "交叉喙才撬得开，直喙就戳不进。还是同一只纸鸟。", fact: "因为喙左右交叉，所以直的伸不进鳞片缝。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sandpipers.html": {
      companion: "bo", sticker: { id: "sew-prober", label: "细嘴点走员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹬细嘴点着走才啄得到。", fact: "不是苍鹭那种缩打。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sew-lab.html": {
      companion: "miao", sticker: { id: "stomp-pecker", label: "大啄啄空员", emoji: "🪡" },
      card: { series: "物理实验", discovery: "细嘴点着走才啄得到，站着大啄就啄空。还是同一只纸鸟。", fact: "因为虫在泥面上，所以大啄会啄空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sanderlings.html": {
      companion: "bo", sticker: { id: "surf-chaser", label: "追浪啄食员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "三趾鹬跟着退浪跑才啄得到。", fact: "不是普通鹬那种来回点。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/surf-lab.html": {
      companion: "miao", sticker: { id: "wave-stander", label: "站浪被打员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "跟着退浪跑才啄得到，站在浪里就被打走。还是同一只纸鸟。", fact: "因为虫在刚露出的湿沙里，所以一站进浪就被打走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/rollers.html": {
      companion: "bo", sticker: { id: "tumble-roller", label: "翻飞亮蓝员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "佛法僧一边飞一边翻才看得见蓝。", fact: "不是雨燕那种主课。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tumble-lab.html": {
      companion: "miao", sticker: { id: "flat-flier", label: "平飞认不出员", emoji: "🔄" },
      card: { series: "物理实验", discovery: "一边飞一边翻才看得见，平着飞就认不出。还是同一只纸鸟。", fact: "因为蓝要翻着才闪，所以一平就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/rheas.html": {
      companion: "bo", sticker: { id: "lope-runner", label: "三趾快跑员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "美洲鸵三趾着地跑才跑得掉。", fact: "不是非洲鸵鸟那种两趾踢。也不要靠近。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lope-lab.html": {
      companion: "miao", sticker: { id: "wing-waster", label: "扇翅飞不起来员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "三趾快跑才跑得掉，扇翅膀飞不起来。还是同一只纸鸟。", fact: "因为翅托不住，所以一扇还是飞不起来。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/arctic-terns.html": {
      companion: "bo", sticker: { id: "pole-flier", label: "接着飞两极员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "北极燕鸥一站接一站飞才两边夏天都赶上。", fact: "不是家燕那种泥巢。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pole-lab.html": {
      companion: "miao", sticker: { id: "stay-coaster", label: "停住过冬员", emoji: "🧭" },
      card: { series: "物理实验", discovery: "接着飞才赶得上，停住冬天就到了。还是同一只纸鸟。", fact: "因为夏天在两头，所以一停就碰上冬天。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cormorants.html": {
      companion: "bo", sticker: { id: "hang-dryer", label: "上岸晾翅员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鸬鹚上岸把翅膀张开晾干，下一次才飞得动。", fact: "不是蛇鹈那种几乎没油。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hangdry-lab.html": {
      companion: "miao", sticker: { id: "wet-folder", label: "收湿翅沉员", emoji: "🧥" },
      card: { series: "物理实验", discovery: "上岸晾翅才飞得动，收着湿翅就沉。还是同一只纸鸟。", fact: "因为油比较少，所以不晾就飞不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/emus.html": {
      companion: "bo", sticker: { id: "shag-runner", label: "粗毛腿跑员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鸸鹋靠粗毛腿跑才跑得远。", fact: "不是美洲鸵，也不是非洲鸵鸟。也不要靠近。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pace-lab.html": {
      companion: "miao", sticker: { id: "fluff-flier", label: "扇翅飞不起来员", emoji: "🪶" },
      card: { series: "物理实验", discovery: "粗毛腿跑才跑得远，扇翅膀飞不起来。还是同一只纸鸟。", fact: "因为翅托不住，所以一扇还是飞不起来。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/knots.html": {
      companion: "bo", sticker: { id: "flock-packer", label: "挤进大群员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "红腹滨鹬挤在大群里才不那么容易被看见。", fact: "不是普通鹬那种点走主课。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flock-lab.html": {
      companion: "miao", sticker: { id: "solo-spotted", label: "单独被看见员", emoji: "🟠" },
      card: { series: "物理实验", discovery: "挤在大群里才躲得过，一只单独站就被看见。还是同一只纸鸟。", fact: "因为一只太显眼，所以不挤进去就会被看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/woodcocks.html": {
      companion: "bo", sticker: { id: "spiral-peenter", label: "螺旋飞叫员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "丘鹬先叫再螺旋飞才看得见。", fact: "不是夜鹰那种贴地藏。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/peent-lab.html": {
      companion: "miao", sticker: { id: "sit-misser", label: "趴着没人知员", emoji: "🌀" },
      card: { series: "物理实验", discovery: "先叫再螺旋飞才看得见，趴着不出声就没人知道。还是同一只纸鸟。", fact: "因为信号在那一飞里，所以一趴就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/plovers.html": {
      companion: "bo", sticker: { id: "limp-lurer", label: "垂翅装瘸员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鸻把一只翅膀垂地装瘸，才把危险从巢边引走。", fact: "不是真的瘸了。也不要摸真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fake-lab.html": {
      companion: "miao", sticker: { id: "run-awayer", label: "直跑露巢员", emoji: "🩹" },
      card: { series: "物理实验", discovery: "装瘸才引得走，直着跑开巢就被看见。还是同一只纸鸟。", fact: "因为危险跟着装瘸的走，所以一直跑巢还在。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/snipes.html": {
      companion: "bo", sticker: { id: "tail-hummer", label: "尾羽嗡嗡员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "沙锥俯冲时尾羽迎风振才听得见嗡嗡。", fact: "不是用嗓子唱。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/winnow-lab.html": {
      companion: "miao", sticker: { id: "silent-diver", label: "收尾没声员", emoji: "🎐" },
      card: { series: "物理实验", discovery: "尾羽迎风振才听得见，收着尾就没有声音。还是同一只纸鸟。", fact: "因为嗡是风振出来的，所以一收就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/stilts.html": {
      companion: "bo", sticker: { id: "stilt-wader", label: "长腿走深员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "长脚鹬那对粉红长腿才走得进深一点的水。", fact: "不是普通鹬浅泥点。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/stilt-lab.html": {
      companion: "miao", sticker: { id: "stub-sinker", label: "短腿湿身员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "腿够长才走得进，太短身子就湿了。还是同一只纸鸟。", fact: "因为水更深，所以短腿走不了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dunlins.html": {
      companion: "bo", sticker: { id: "ripple-flocker", label: "跟群翻面员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "黑腹滨鹬跟着大群翻面才一下子换颜色。", fact: "不是只挤着躲。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/ripple-lab.html": {
      companion: "miao", sticker: { id: "solo-scatter", label: "乱飞被看见员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "跟着大群翻面才换得了色，自己乱飞就被看见。还是同一只纸鸟。", fact: "因为色是一起翻出来的，所以一离开就单独。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bustards.html": {
      companion: "bo", sticker: { id: "pouch-shower", label: "白囊鼓起员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鸨把喉囊鼓起来，白才看得见。", fact: "不是军舰鸟那种红囊。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/balloon-lab.html": {
      companion: "miao", sticker: { id: "pouch-folder", label: "瘪囊看不出员", emoji: "🎈" },
      card: { series: "物理实验", discovery: "喉囊鼓起来才看得见，瘪着就看不出。还是同一只纸鸟。", fact: "因为白在囊面上，所以一瘪就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/nighthawks.html": {
      companion: "bo", sticker: { id: "dive-boomer", label: "俯冲轰鸣员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "美洲夜鹰俯冲时风过翅才听得见轰的一声。", fact: "不是用嗓子叫。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/diveboom-lab.html": {
      companion: "miao", sticker: { id: "level-quieter", label: "平飞没轰员", emoji: "💥" },
      card: { series: "物理实验", discovery: "俯冲让风过翅才听得见，平着飞就没有轰声。还是同一只纸鸟。", fact: "因为轰是风振翅膀，所以一平就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/redshanks.html": {
      companion: "bo", sticker: { id: "alarm-yeller", label: "先叫再飞员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "红脚鹬先大叫再飞，旁边的鸟才听见。", fact: "不是普通鹬点泥。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/alarm-lab.html": {
      companion: "miao", sticker: { id: "mute-stander", label: "闷走没人知员", emoji: "📢" },
      card: { series: "物理实验", discovery: "先叫再飞旁边才听见，闷着飞走谁也不知道。还是同一只纸鸟。", fact: "因为警报在那一声里，所以一闷谁也不知道。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/yellowlegs.html": {
      companion: "bo", sticker: { id: "teeter-bobber", label: "点头看清员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "黄脚鹬身子一点一点才看得清浅水。", fact: "不是红脚鹬那种先叫。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/teeter-lab.html": {
      companion: "miao", sticker: { id: "still-stander", label: "站住看不清员", emoji: "↕️" },
      card: { series: "物理实验", discovery: "身子一点一点才看得清，站着不动就看不清。还是同一只纸鸟。", fact: "因为一点才换角度看，所以一停就看不清。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pratincoles.html": {
      companion: "bo", sticker: { id: "air-hawker", label: "空中捉虫员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "燕鸻飞到空中捉虫才捉得到。", fact: "不是家燕那种泥巢。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hawkfly-lab.html": {
      companion: "miao", sticker: { id: "mud-pecker", label: "泥里啄空员", emoji: "🦟" },
      card: { series: "物理实验", discovery: "飞到空中捉才捉得到，在泥里啄就啄空。还是同一只纸鸟。", fact: "因为虫在天上飞，所以在泥里啄会空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/coursers.html": {
      companion: "bo", sticker: { id: "dry-chaser", label: "干地跑捉员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "走鸻在干地上跑着捉才追得到。", fact: "不是鸻那种装瘸。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cursor-lab.html": {
      companion: "miao", sticker: { id: "still-waiter", label: "站着等空员", emoji: "🏃" },
      card: { series: "物理实验", discovery: "干地上跑着捉才追得到，站着等虫就跑了。还是同一只纸鸟。", fact: "因为虫会跑，所以一站着就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/thick-knees.html": {
      companion: "bo", sticker: { id: "glare-watcher", label: "大眼夜看员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "石鸻黄昏把大眼睛睁着才看得见夜虫。", fact: "不是仓鸮那种静滑。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/glare-lab.html": {
      companion: "miao", sticker: { id: "day-blinker", label: "眯眼看不清员", emoji: "👀" },
      card: { series: "物理实验", discovery: "大眼睛睁着才看得见，眯成缝就看不清。还是同一只纸鸟。", fact: "因为夜虫要靠大眼，所以一眯就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/whimbrels.html": {
      companion: "bo", sticker: { id: "stripe-crowner", label: "头顶纹员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "中杓鹬头顶两条纹才认得出。", fact: "不是大杓鹬那种更长镰喙单独比。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/headstripe-lab.html": {
      companion: "miao", sticker: { id: "plain-header", label: "光顶认不出员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "头顶两条纹才认得出，光顶就认不出。还是同一只纸鸟。", fact: "因为纹在头上，所以一光就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dowitchers.html": {
      companion: "bo", sticker: { id: "stitch-prober", label: "密点探到员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "半蹼鹬细嘴密点才啄得到深水虫。", fact: "不是塍鹬那种慢慢探。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/stitch-lab.html": {
      companion: "miao", sticker: { id: "slow-pecker", label: "慢啄够不着员", emoji: "🧵" },
      card: { series: "物理实验", discovery: "细嘴密点才啄得到，慢啄就够不着。还是同一只纸鸟。", fact: "因为虫在深处，所以慢了就够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ruffs.html": {
      companion: "bo", sticker: { id: "ruff-puffer", label: "颈裙撑开员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "流苏鹬把颈裙撑开才看得见信号。", fact: "不是鸨那种喉囊。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lek-lab.html": {
      companion: "miao", sticker: { id: "ruff-folder", label: "收裙认不出员", emoji: "🧣" },
      card: { series: "物理实验", discovery: "颈裙撑开才看得见，收着就认不出。还是同一只纸鸟。", fact: "因为信号在那圈领子上，所以一收就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/shelducks.html": {
      companion: "bo", sticker: { id: "hole-nester", label: "洞里藏蛋员", emoji: "🦆" },
      card: { series: "自然观察", discovery: "麻鸭把蛋放进洞里才藏得住。", fact: "不是草原犬鼠那种烟囱。也不要把手伸进真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/burrownest-lab.html": {
      companion: "miao", sticker: { id: "open-sitter", label: "空地被看见员", emoji: "🕳️" },
      card: { series: "物理实验", discovery: "蛋放进洞里才藏得住，放在空地上就被看见。还是同一只纸鸟。", fact: "因为洞挡住看的人，所以一放外面就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/scallops.html": {
      companion: "bo", sticker: { id: "shell-clapper", label: "拍壳游走员", emoji: "🐚" },
      card: { series: "自然观察", discovery: "扇贝两扇壳拍紧，水喷出去才游得走。", fact: "不是贻贝那种足丝粘住。也不要撬真贝。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/clap-lab.html": {
      companion: "miao", sticker: { id: "shut-sunker", label: "闭壳粘住员", emoji: "👏" },
      card: { series: "物理实验", discovery: "两扇壳拍紧才游得走，闭着不动就粘在原地。还是同一只纸贝。", fact: "因为水要从铰链喷出去，所以一闭就游不走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/willets.html": {
      companion: "bo", sticker: { id: "flash-winger", label: "亮出翅带员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "威氏鹬翅膀张开才看得见黑白带。", fact: "不是黄脚鹬那种点头。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wingflash-lab.html": {
      companion: "miao", sticker: { id: "fold-misser", label: "收翅看不出员", emoji: "⬛" },
      card: { series: "物理实验", discovery: "翅膀张开才看得见黑白带，收着就看不出。还是同一只纸鸟。", fact: "因为带子在翅膀上，所以一收就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tattlers.html": {
      companion: "bo", sticker: { id: "rock-bobber", label: "礁上点头员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "灰鹬在浪打的石头上点才啄得到礁缝。", fact: "不是黄脚鹬浅水点。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bob-lab.html": {
      companion: "miao", sticker: { id: "inland-stander", label: "内陆没虫员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "在浪打的石头上点才啄得到，站到内陆就没有。还是同一只纸鸟。", fact: "因为虫在礁缝里，所以一离开浪就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/surfbirds.html": {
      companion: "bo", sticker: { id: "ledge-picker", label: "岩架捡食员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "冲浪鸟在浪洗过的岩架上捡才捡得到。", fact: "不是黑腹滨鹬那种翻面。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/ledge-lab.html": {
      companion: "miao", sticker: { id: "mud-prober", label: "泥滩没有员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "在岩架上捡才捡得到，去泥滩探就没有。还是同一只纸鸟。", fact: "因为食物在岩架上，所以一去泥里就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/greenshanks.html": {
      companion: "bo", sticker: { id: "early-lifter", label: "老远就飞员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "青脚鹬老远就飞才先离开危险。", fact: "不是沙锥贴地藏。也不要追滩鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/alert-lab.html": {
      companion: "miao", sticker: { id: "stay-snipe", label: "还站遇险员", emoji: "🛫" },
      card: { series: "物理实验", discovery: "老远就飞才先离开，还站着危险就到了身边。还是同一只纸鸟。", fact: "因为危险先到近处，所以不早飞就晚了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/wolves.html": {
      companion: "bo", sticker: { id: "pack-chaser", label: "一起围猎员", emoji: "🐺" },
      card: { series: "自然观察", discovery: "狼几只一起围才堵得住。", fact: "不是狐狸那种单独捉。也不要靠近真狼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pack-lab.html": {
      companion: "miao", sticker: { id: "solo-misser", label: "单独冲空员", emoji: "🫂" },
      card: { series: "物理实验", discovery: "几只一起围才堵得住，一只单独冲猎物就跑了。还是同一只纸狼。", fact: "因为路要堵住，所以一单独就跑了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hyenas.html": {
      companion: "bo", sticker: { id: "bone-crusher", label: "硬牙咬开员", emoji: "🦴" },
      card: { series: "自然观察", discovery: "鬣狗牙够硬才咬得开骨头。", fact: "不是狼那种围猎主课。也不要靠近。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/crush-lab.html": {
      companion: "miao", sticker: { id: "gum-chewer", label: "软牙咬不动员", emoji: "💪" },
      card: { series: "物理实验", discovery: "牙够硬才咬得开，太软就咬不动。还是同一只纸兽。", fact: "因为骨头要硬牙，所以一软就咬不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/raccoons.html": {
      companion: "bo", sticker: { id: "douse-washer", label: "浸水摸到员", emoji: "🦝" },
      card: { series: "自然观察", discovery: "浣熊把爪子浸进水里摸才摸得到。", fact: "不是洗手讲究。也不要喂真浣熊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/douse-lab.html": {
      companion: "miao", sticker: { id: "dry-grabber", label: "干抓抓空员", emoji: "💧" },
      card: { series: "物理实验", discovery: "爪子浸进水里才摸得到，干着抓就抓空。还是同一只纸兽。", fact: "因为要靠水里摸，所以一干就抓空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/mongooses.html": {
      companion: "bo", sticker: { id: "snake-dodger", label: "先躲开再咬员", emoji: "🦦" },
      card: { series: "自然观察", discovery: "獴先躲开再咬才躲得开。", fact: "不是响尾蛇那种热坑。也不要让真獴去碰蛇。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dodge-lab.html": {
      companion: "miao", sticker: { id: "freeze-biter", label: "硬撞被咬员", emoji: "🐍" },
      card: { series: "物理实验", discovery: "先躲开再咬才躲得开，迎面硬撞会被咬到。还是同一只纸兽。", fact: "因为要先让过，所以一硬撞就挨咬。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/badgers.html": {
      companion: "bo", sticker: { id: "sett-digger", label: "往下深挖员", emoji: "🦡" },
      card: { series: "自然观察", discovery: "獾爪子宽，往下挖才挖得出洞。", fact: "不是草原犬鼠那种烟囱。也不要挖真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sett-lab.html": {
      companion: "miao", sticker: { id: "surface-scratcher", label: "只抓破皮员", emoji: "🕳️" },
      card: { series: "物理实验", discovery: "爪够宽往下挖才挖得出，在地面抓只抓破皮。还是同一只纸兽。", fact: "因为洞在地下，所以只抓皮挖不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/wolverines.html": {
      companion: "bo", sticker: { id: "freeze-cacher", label: "冻土埋住员", emoji: "🐻" },
      card: { series: "自然观察", discovery: "狼獾把吃剩的埋进冻土才存得住。", fact: "不是狼那种围猎主课。也不要靠近。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cache-lab.html": {
      companion: "miao", sticker: { id: "thaw-rotter", label: "暖处坏掉员", emoji: "❄️" },
      card: { series: "物理实验", discovery: "埋进冻土才存得住，放在暖处就坏掉。还是同一只纸兽。", fact: "因为冻住才存得住，所以一暖就坏。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/weasels.html": {
      companion: "bo", sticker: { id: "slim-tunneler", label: "细身钻进员", emoji: "🦡" },
      card: { series: "自然观察", discovery: "黄鼠狼身子细才钻得进洞。", fact: "不是浣熊那种浸水摸。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tunnel-lab.html": {
      companion: "miao", sticker: { id: "fat-stucker", label: "圆身卡住员", emoji: "🕳️" },
      card: { series: "物理实验", discovery: "身子够细才钻得进，太圆就卡在洞口。还是同一只纸兽。", fact: "因为洞口细，所以一圆就卡住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/murres.html": {
      companion: "bo", sticker: { id: "cliff-egger", label: "梨形留崖员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "海鸦的梨形蛋滚一圈还在崖上。", fact: "不是鲣鸟那种冲水。也不要靠近真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pear-lab.html": {
      companion: "miao", sticker: { id: "roll-egger", label: "圆蛋滚下员", emoji: "🥚" },
      card: { series: "物理实验", discovery: "蛋是梨形才留在崖上，圆的就滚下去。还是同一只纸鸟。", fact: "因为梨形会转圈，所以一圆就滚下去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dingoes.html": {
      companion: "bo", sticker: { id: "long-trotter", label: "稳步长跑员", emoji: "🐕" },
      card: { series: "自然观察", discovery: "澳洲野犬步子稳着跑才跑得远。", fact: "不是狼那种围猎。也不要靠近真野犬。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/trot-lab.html": {
      companion: "miao", sticker: { id: "short-sprinter", label: "乱蹦就累员", emoji: "🏃" },
      card: { series: "物理实验", discovery: "步子稳着跑才跑得远，一步一蹦一会儿就累。还是同一只纸兽。", fact: "因为远路要稳，所以一蹦就累。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/coyotes.html": {
      companion: "bo", sticker: { id: "yip-caller", label: "短叫传位员", emoji: "🐺" },
      card: { series: "自然观察", discovery: "郊狼短叫连着传，同伴才听得见在哪。", fact: "不是狼那种一起嚎。也不要靠近真郊狼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/yip-lab.html": {
      companion: "miao", sticker: { id: "silent-loper", label: "长嚎听不出员", emoji: "📣" },
      card: { series: "物理实验", discovery: "短叫连着传才听得见在哪，一声长嚎听不出远近。还是同一只纸兽。", fact: "因为短叫才好定位，所以一长就糊。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/jackals.html": {
      companion: "bo", sticker: { id: "scavenge-trotter", label: "跟后捡食员", emoji: "🐕" },
      card: { series: "自然观察", discovery: "胡狼跟在大兽后面捡剩的才捡得到。", fact: "不是鬣狗那种咬骨主课。也不要靠近。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/scavenge-lab.html": {
      companion: "miao", sticker: { id: "hunt-waster", label: "硬抢挨打员", emoji: "🍖" },
      card: { series: "物理实验", discovery: "跟在后面捡才捡得到，自己去硬抢抢不到还挨打。还是同一只纸兽。", fact: "因为剩的在后面，所以一抢就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/razorbills.html": {
      companion: "bo", sticker: { id: "fly-diver", label: "先飞再扎员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "刀嘴海雀先飞再扎进水才潜得进。", fact: "不是海鸦那种梨形蛋主课。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flydive-lab.html": {
      companion: "miao", sticker: { id: "flap-sinker", label: "拍面进不去员", emoji: "⬇️" },
      card: { series: "物理实验", discovery: "先飞再扎才潜得进，只会拍面就进不去。还是同一只纸鸟。", fact: "因为要先有速度，所以一拍面就进不去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/auklets.html": {
      companion: "bo", sticker: { id: "rictal-feeler", label: "张须夜捞员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "海雀夜里把嘴边须张开才捞得到。", fact: "不是海鸦那种站崖。也不要抓真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rictal-lab.html": {
      companion: "miao", sticker: { id: "bare-gaper", label: "收须捞空员", emoji: "🌾" },
      card: { series: "物理实验", discovery: "嘴边须张开才捞得到，收着就捞空。还是同一只纸鸟。", fact: "因为须才捞得着，所以一收就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/coatis.html": {
      companion: "bo", sticker: { id: "root-snuffler", label: "拱土摸虫员", emoji: "🦝" },
      card: { series: "自然观察", discovery: "长鼻浣熊把鼻子往土里拱才拱得到虫。", fact: "不是浣熊那种浸水摸。也不要喂真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/root-lab.html": {
      companion: "miao", sticker: { id: "glance-misser", label: "干看看不见员", emoji: "👃" },
      card: { series: "物理实验", discovery: "鼻子往土里拱才拱得到，只用眼睛看就看不见。还是同一只纸兽。", fact: "因为虫在土里，所以一看就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/kinkajous.html": {
      companion: "bo", sticker: { id: "hang-tailer", label: "卷尾挂住员", emoji: "🐻" },
      card: { series: "自然观察", discovery: "蜜熊把尾巴卷住树枝才挂得住。", fact: "不是浣熊那种浸水摸。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hangtail-lab.html": {
      companion: "miao", sticker: { id: "drop-faller", label: "垂尾掉下员", emoji: "🌙" },
      card: { series: "物理实验", discovery: "尾巴卷住才挂得住，垂着就掉下去。还是同一只纸兽。", fact: "因为挂靠尾巴，所以一垂就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/mink.html": {
      companion: "bo", sticker: { id: "slide-diver", label: "滑进水里员", emoji: "🦦" },
      card: { series: "自然观察", discovery: "水貂从岸上滑进水才追得到鱼。", fact: "不是水獭那种更会游。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/slide-lab.html": {
      companion: "miao", sticker: { id: "dry-walker", label: "干追跑鱼员", emoji: "💦" },
      card: { series: "物理实验", discovery: "从岸上滑进水才追得到，在干地上追鱼就跑了。还是同一只纸兽。", fact: "因为鱼在水里，所以一干追就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/guillemots.html": {
      companion: "bo", sticker: { id: "white-patcher", label: "亮出白斑员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "海鸠翅膀亮出白斑才认得出。", fact: "不是海鸦那种梨形蛋。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/patch-lab.html": {
      companion: "miao", sticker: { id: "dark-winger", label: "全黑认不出员", emoji: "⬜" },
      card: { series: "物理实验", discovery: "翅膀亮出白斑才认得出，全黑就认不出。还是同一只纸鸟。", fact: "因为斑在翅膀上，所以一黑就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/martens.html": {
      companion: "bo", sticker: { id: "pine-hopper", label: "沿树爬到员", emoji: "🦡" },
      card: { series: "自然观察", discovery: "貂沿着树干爬才够得到树上的。", fact: "不是黄鼠狼那种钻洞。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pine-lab.html": {
      companion: "miao", sticker: { id: "ground-misser", label: "跑地够不着员", emoji: "🌲" },
      card: { series: "物理实验", discovery: "沿着树干爬才够得到，只在地面跑就够不着。还是同一只纸兽。", fact: "因为东西在树上，所以一跑地就够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/stoats.html": {
      companion: "bo", sticker: { id: "ermine-whiter", label: "换白雪地员", emoji: "🐹" },
      card: { series: "自然观察", discovery: "白鼬冬天换成白毛才在雪地里看不见。", fact: "不是黄鼠狼那种钻洞主课。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/ermine-lab.html": {
      companion: "miao", sticker: { id: "brown-spotted", label: "棕色被看见员", emoji: "❄️" },
      card: { series: "物理实验", discovery: "冬天换成白毛才看不见，一直棕色一下子被看见。还是同一只纸兽。", fact: "因为雪是白的，所以一棕就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/civets.html": {
      companion: "bo", sticker: { id: "musk-marker", label: "留香认路员", emoji: "🐱" },
      card: { series: "自然观察", discovery: "灵猫在树上留下气味才认得出路。", fact: "不是獴那种躲开。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/musk-lab.html": {
      companion: "miao", sticker: { id: "clean-misser", label: "空白迷路员", emoji: "🧴" },
      card: { series: "物理实验", discovery: "留下气味才认得出路，什么也不留就迷路。还是同一只纸兽。", fact: "因为路要靠气味，所以一空白就迷路。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/fossas.html": {
      companion: "bo", sticker: { id: "tree-leaper", label: "树间跳跃员", emoji: "🐆" },
      card: { series: "自然观察", discovery: "隐臀猫从这棵树跳到那棵才追得到。", fact: "不是獴那种躲开。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/leap-lab.html": {
      companion: "miao", sticker: { id: "ground-slipper", label: "下地跑丢员", emoji: "🌳" },
      card: { series: "物理实验", discovery: "从树上跳过去才追得到，下到地上跑猎物就跑了。还是同一只纸兽。", fact: "因为猎物在树上，所以一下地就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/genets.html": {
      companion: "bo", sticker: { id: "spot-stalker", label: "斑点隐身员", emoji: "🐱" },
      card: { series: "自然观察", discovery: "獛身上斑点散开才在树影里看不见。", fact: "不是灵猫那种留香主课。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/genet-lab.html": {
      companion: "miao", sticker: { id: "plain-gaper", label: "一块色被看见员", emoji: "🔘" },
      card: { series: "物理实验", discovery: "斑点散开才看不见，一块颜色一下子被看见。还是同一只纸兽。", fact: "因为影是碎的，所以一块色就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/fishers.html": {
      companion: "bo", sticker: { id: "down-climber", label: "头朝下爬员", emoji: "🦡" },
      card: { series: "自然观察", discovery: "渔貂头朝下爬下来才从树上下得来。", fact: "不是普通貂那种只会上。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fisher-lab.html": {
      companion: "miao", sticker: { id: "up-stucker", label: "只会往上员", emoji: "⬇️" },
      card: { series: "物理实验", discovery: "头朝下爬下来才下得来，只会往上爬就卡在树上。还是同一只纸兽。", fact: "因为要下来，所以只会往上就卡住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/binturongs.html": {
      companion: "bo", sticker: { id: "fruit-hanger", label: "卷尾摘到员", emoji: "🐻" },
      card: { series: "自然观察", discovery: "熊狸尾巴卷住再摘才够得到果子。", fact: "不是蜜熊那种只挂着。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fruit-lab.html": {
      companion: "miao", sticker: { id: "drop-walker", label: "松手掉下员", emoji: "🍇" },
      card: { series: "物理实验", discovery: "尾巴卷住再摘才够得到，松手去够就掉下去。还是同一只纸兽。", fact: "因为先要挂住，所以一松手就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/chitons.html": {
      companion: "bo", sticker: { id: "plate-scraper", label: "八板刮藻员", emoji: "🐚" },
      card: { series: "自然观察", discovery: "石鳖用锉舌一下一下刮，才刮得下绿藻。", fact: "不是蜗牛那种黏液滑。也不要抠真石鳖。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/radula-lab.html": {
      companion: "miao", sticker: { id: "radula-rasper", label: "光滑刮不下员", emoji: "🪥" },
      card: { series: "物理实验", discovery: "锉舌一下一下刮才刮得下，光贴着滑藻还在。还是同一只纸贝。", fact: "因为藻要刮才下来，所以一滑就还在。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hornets.html": {
      companion: "bo", sticker: { id: "nest-wrapper", label: "一层纸包员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "胡蜂把纸巢一层一层包起来才挡得住雨。", fact: "不是纸巢蜂只做格子。也不要捅真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/envelope-lab.html": {
      companion: "miao", sticker: { id: "open-comber", label: "敞巢漏雨员", emoji: "📦" },
      card: { series: "物理实验", discovery: "一层一层包起来才挡得住雨，巢敞着雨会漏进去。还是同一只纸蜂。", fact: "因为要挡雨，所以一敞就漏。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/yellowjackets.html": {
      companion: "bo", sticker: { id: "ground-nester", label: "地下藏巢员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "黄蜂常把巢做在地下才藏得住。", fact: "不是胡蜂那种大纸包。也不要往洞里灌水。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/groundnest-lab.html": {
      companion: "miao", sticker: { id: "tree-hanger", label: "挂树被看见员", emoji: "🕳️" },
      card: { series: "物理实验", discovery: "巢做在地下才藏得住，挂在树上一下子被看见。还是同一只纸蜂。", fact: "因为地下挡住看的人，所以一挂出来就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/potter-wasps.html": {
      companion: "bo", sticker: { id: "pot-builder", label: "和泥成罐员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "陶蜂把泥和成一个小罐才立得住。", fact: "不是家燕那种泥巢贴墙。也不要拆真泥罐。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/potter-lab.html": {
      companion: "miao", sticker: { id: "loose-mudder", label: "干泥散掉员", emoji: "🏺" },
      card: { series: "物理实验", discovery: "泥巴和成罐才立得住，泥太干就散掉。还是同一只纸蜂。", fact: "因为罐要和湿，所以一干就散。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/mason-bees.html": {
      companion: "bo", sticker: { id: "hole-masons", label: "泥隔分间员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "壁蜂用泥把洞隔成一间一间才分得清。", fact: "不是熊蜂那种挤一团。也不要掏真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mason-lab.html": {
      companion: "miao", sticker: { id: "scatter-pollen", label: "乱堆糊一块员", emoji: "🧱" },
      card: { series: "物理实验", discovery: "用泥把洞隔开才分得清，花粉乱堆就全糊在一起。还是同一只纸蜂。", fact: "因为要一间一间，所以一乱堆就糊。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/carpenter-bees.html": {
      companion: "bo", sticker: { id: "wood-driller", label: "钻木藏巢员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "木蜂在木头里钻洞巢才藏得住。", fact: "不是熊蜂那种地面团巢。也不要捅真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/carpenter-lab.html": {
      companion: "miao", sticker: { id: "surface-sitter", label: "停面被看见员", emoji: "🪵" },
      card: { series: "物理实验", discovery: "在木头里钻洞才藏得住，只停在表面上一下子被看见。还是同一只纸蜂。", fact: "因为巢在洞里，所以一停外面就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/leafcutter-bees.html": {
      companion: "bo", sticker: { id: "leaf-liner", label: "圆叶垫巢员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "切叶蜂剪圆叶片垫巢卵才躺得稳。", fact: "不是壁蜂那种泥隔。也不要摘走它的叶片。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/leafcut-lab.html": {
      companion: "miao", sticker: { id: "bare-celler", label: "空巢卵滚员", emoji: "🍃" },
      card: { series: "物理实验", discovery: "剪圆叶片垫巢才躺得稳，什么也不垫卵会滚来滚去。还是同一只纸蜂。", fact: "因为要垫软，所以一空就滚。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bumblebees.html": {
      companion: "bo", sticker: { id: "buzz-warmer", label: "振翅暖身员", emoji: "🐝" },
      card: { series: "自然观察", discovery: "熊蜂翅膀振得够快身子才暖起来。", fact: "不是胡蜂那种纸包。也不要抓真蜂。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/buzz-lab.html": {
      companion: "miao", sticker: { id: "still-cooler", label: "慢振还凉员", emoji: "🌡️" },
      card: { series: "物理实验", discovery: "翅膀振得够快才暖起来，不怎么动还是凉的。还是同一只纸蜂。", fact: "因为振才会热，所以一慢就凉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/auks.html": {
      companion: "bo", sticker: { id: "flock-diver", label: "挤群飞潜员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "小海雀挤在大群里飞才不容易被盯住。", fact: "不是海鸦那种站崖。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dovekie-lab.html": {
      companion: "miao", sticker: { id: "solo-floater", label: "单漂被看见员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "挤在大群里才不容易被盯住，一只单独漂一下子被看见。还是同一只纸鸟。", fact: "因为一只太显眼，所以一离开群就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/damselflies.html": {
      companion: "bo", sticker: { id: "wing-folder", label: "收翅贴背员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "豆娘停下时翅膀收拢贴背才认得出。", fact: "不是蜻蜓那种平摊。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/foldwing-lab.html": {
      companion: "miao", sticker: { id: "wing-spreader", label: "平摊认错员", emoji: "🦋" },
      card: { series: "物理实验", discovery: "翅膀收拢贴背才认得出，平摊着就认成蜻蜓。还是同一只纸虫。", fact: "因为收拢才是豆娘，所以一平摊就认错。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/mayflies.html": {
      companion: "bo", sticker: { id: "dun-hatcher", label: "再蜕成虫员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "蜉蝣出水后再蜕一次翅才真正透明。", fact: "不是石蝇那种一次就完。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dun-lab.html": {
      companion: "miao", sticker: { id: "nymph-stayer", label: "一次未蜕员", emoji: "🧥" },
      card: { series: "物理实验", discovery: "再蜕一次才是成虫，第一次出来就算完还包着灰衣。还是同一只纸虫。", fact: "因为还有一层衣，所以不蜕第二次就不透。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/stoneflies.html": {
      companion: "bo", sticker: { id: "two-tailer", label: "双尾爬石员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "石蝇两根尾巴在石头上爬才认得出。", fact: "不是蜉蝣那种三尾游。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/naiad-lab.html": {
      companion: "miao", sticker: { id: "three-misser", label: "三尾认错员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "两根尾巴在石头上爬才认得出，三根尾巴在水里游就认成蜉蝣。还是同一只纸虫。", fact: "因为尾巴数不一样，所以一游三尾就认错。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/midges.html": {
      companion: "bo", sticker: { id: "swarm-dancer", label: "挤团飞舞员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "摇蚊挤在空中一团飞才找得到同伴。", fact: "不是蚊子那种停着叮。也不要拍真的一团。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/swarm-lab.html": {
      companion: "miao", sticker: { id: "solo-midge", label: "单停看不见员", emoji: "🌀" },
      card: { series: "物理实验", discovery: "挤在空中一团飞才找得到同伴，一只单独停谁也看不见谁。还是同一只纸虫。", fact: "因为要靠一团，所以一单独就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dobsonflies.html": {
      companion: "bo", sticker: { id: "jaw-larva", label: "大颚夹住员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "齿蛉幼虫大颚夹住才抓得住。", fact: "不是蜉蝣那种细尾巴。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hellgram-lab.html": {
      companion: "miao", sticker: { id: "soft-mouth", label: "软嘴抓不住员", emoji: "钳" },
      card: { series: "物理实验", discovery: "幼虫大颚夹住才抓得住，嘴软软的就抓不住。还是同一只纸虫。", fact: "因为要夹住，所以一软就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/scorpionflies.html": {
      companion: "bo", sticker: { id: "hang-gifter", label: "先挂一份员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "蝎蛉先挂一份再靠近才靠得近。", fact: "不是胡蜂那种纸包。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hangfly-lab.html": {
      companion: "miao", sticker: { id: "chase-gifter", label: "空手被赶员", emoji: "🎁" },
      card: { series: "物理实验", discovery: "先挂一份再靠近才靠得近，空手追上去会被赶走。还是同一只纸虫。", fact: "因为要先放下，所以一空手就赶走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ticks.html": {
      companion: "bo", sticker: { id: "grass-quester", label: "草尖伸等员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "蜱在草尖伸腿等才等得到经过的。", fact: "不是跳蚤那种弹垫跳。也不要抓真蜱，户外回来看衣服。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/quest-lab.html": {
      companion: "miao", sticker: { id: "path-chaser", label: "路上追不上员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "在草尖伸腿等才等得到，在路上追追不上。还是同一只纸虫。", fact: "因为它等着过路的，所以一追就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/craneflies.html": {
      companion: "bo", sticker: { id: "longleg-sitter", label: "长腿不叮员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "大蚊腿又细又长、停着不叮人才认得出。", fact: "不是蚊子，也不是摇蚊舞群。也不要拍真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/crane-lab.html": {
      companion: "miao", sticker: { id: "short-biter", label: "短腿认错员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "腿又细又长才认得出不叮人，腿短短的去叮人就认成蚊子。还是同一只纸虫。", fact: "因为大蚊不叮，所以一短腿去叮就认错。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tree-frogs.html": {
      companion: "bo", sticker: { id: "pad-clinger", label: "趾垫贴住员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "树蛙趾垫贴住叶子才挂得住。", fact: "不是玻璃蛙那种透腹。也不要抓真蛙。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/toepad-lab.html": {
      companion: "miao", sticker: { id: "slip-dropper", label: "滑溜掉下员", emoji: "🍃" },
      card: { series: "物理实验", discovery: "趾垫贴住才挂得住，趾头滑溜溜就滑下去。还是同一只纸蛙。", fact: "因为挂靠趾垫，所以一滑就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/poison-dart-frogs.html": {
      companion: "bo", sticker: { id: "warn-bright", label: "亮色别碰员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "箭毒蛙颜色又亮才一眼被看见别碰。", fact: "不是树蛙那种绿藏。也不要碰真蛙。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/warn-lab.html": {
      companion: "miao", sticker: { id: "hide-green", label: "藏绿没人注意员", emoji: "⚠️" },
      card: { series: "物理实验", discovery: "颜色又亮才一眼被看见别碰，绿绿藏起来谁也注意不到。还是同一只纸蛙。", fact: "因为要先被看见，所以一绿藏就没警告。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bullfrogs.html": {
      companion: "bo", sticker: { id: "boom-croaker", label: "鼓囊远叫员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "牛蛙喉囊鼓起来叫才听得见很远。", fact: "不是蟾蜍那种疙瘩。也不要抓真蛙，不要放生。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/croak-lab.html": {
      companion: "miao", sticker: { id: "silent-gulper", label: "闭嘴听不见员", emoji: "📣" },
      card: { series: "物理实验", discovery: "喉囊鼓起来才听得见很远，嘴闭着不鼓谁也听不见。还是同一只纸蛙。", fact: "因为声音靠鼓囊，所以一闭就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/toads.html": {
      companion: "bo", sticker: { id: "bump-toader", label: "耳后鼓团员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "蟾蜍耳后鼓起两团才认得出。", fact: "不是牛蛙那种鼓鸣。也不要抓、不要挤。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/parotid-lab.html": {
      companion: "miao", sticker: { id: "smooth-froger", label: "光皮认错员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "耳后鼓起两团才认得出，皮肤光光的就认成普通蛙。还是同一只纸蛙。", fact: "因为标志在耳后，所以一光就认错。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/salamanders.html": {
      companion: "bo", sticker: { id: "wet-breather", label: "湿皮换气员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "蝾螈皮肤湿着才透得过气。", fact: "不是蜥蜴那种干鳞。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wetskin-lab.html": {
      companion: "miao", sticker: { id: "dry-cracker", label: "干皮透不过员", emoji: "💧" },
      card: { series: "物理实验", discovery: "皮肤湿着才透得过气，皮肤干了就透不过。还是同一只纸兽。", fact: "因为气从湿皮过，所以一干就过不去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/newts.html": {
      companion: "bo", sticker: { id: "eft-walker", label: "上岸走一段员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "有的水螈幼年会上岸走一段再回水。", fact: "不是只比湿皮。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/eft-lab.html": {
      companion: "miao", sticker: { id: "water-stayer", label: "一直在水员", emoji: "🚶" },
      card: { series: "物理实验", discovery: "陆上走一段再回水才认得出这段路，一直待在水里就少了一段。还是同一只纸兽。", fact: "因为有一段在岸上，所以一直水就少了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/caecilians.html": {
      companion: "bo", sticker: { id: "ring-crawler", label: "环纹两栖员", emoji: "🪱" },
      card: { series: "自然观察", discovery: "蚓螈身上一环一环才认得出是两栖。", fact: "不是蛇，也不是蚯蚓。也不要挖真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/ring-lab.html": {
      companion: "miao", sticker: { id: "snake-faker", label: "光滑认错员", emoji: "⭕" },
      card: { series: "物理实验", discovery: "身上一环一环才认得出是两栖，光滑像蛇就认成蛇。还是同一只纸兽。", fact: "因为环才是它的标志，所以一光滑就认错。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tadpoles.html": {
      companion: "bo", sticker: { id: "tail-swimmer", label: "摆尾游走员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "蝌蚪用扁尾巴摆着游才游得走。", fact: "不是成蛙那种跳。也不要捞回家养太久。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tail-lab.html": {
      companion: "miao", sticker: { id: "leg-walker", label: "用腿沉底员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "用尾巴摆着游才游得走，用腿走会沉在水底。还是同一只纸蝌蚪。", fact: "因为还没有好用的腿，所以一改用腿就沉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/barnacles.html": {
      companion: "bo", sticker: { id: "head-gluer", label: "头胶粘住员", emoji: "🐚" },
      card: { series: "自然观察", discovery: "藤壶把头上的胶水涂在石头上才待得住。", fact: "不是用脚站着。也不要铲真藤壶。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cement-lab.html": {
      companion: "miao", sticker: { id: "wave-washer", label: "没胶被冲员", emoji: "🧴" },
      card: { series: "物理实验", discovery: "把头胶住才待得住，没胶住就被浪冲走。还是同一只纸藤壶。", fact: "因为胶在头上，所以一没胶就被冲走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hammerheads.html": {
      companion: "bo", sticker: { id: "wide-seer", label: "横头两边看员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "双髻鲨头横着眼睛分开才两边都看得见。", fact: "不是幽灵鲨那种弹嘴。也不要靠近真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hammer-lab.html": {
      companion: "miao", sticker: { id: "close-misser", label: "挤眼看不见员", emoji: "🔨" },
      card: { series: "物理实验", discovery: "头横着眼睛分开才两边都看得见，挤在一起有一边看不见。还是同一只纸鲨。", fact: "因为眼要分开，所以一挤就少一边。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/threshers.html": {
      companion: "bo", sticker: { id: "tail-slapper", label: "长尾甩到员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "长尾鲨那根长尾巴甩一下才打晕小鱼。", fact: "不是双髻鲨那种横头。也不要靠近真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/thresh-lab.html": {
      companion: "miao", sticker: { id: "nose-biter", label: "撞鼻落空员", emoji: "➰" },
      card: { series: "物理实验", discovery: "长尾巴甩一下才打得着，用鼻子去撞会撞空。还是同一只纸鲨。", fact: "因为打靠尾巴，所以一改鼻子就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/whale-sharks.html": {
      companion: "bo", sticker: { id: "ram-filter", label: "张嘴游滤员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "鲸鲨嘴张着往前游才滤到小虾。", fact: "不是去咬一条大鱼。也不要靠近真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/ramfeed-lab.html": {
      companion: "miao", sticker: { id: "chase-snapper", label: "闭追追不上员", emoji: "🍽️" },
      card: { series: "物理实验", discovery: "嘴张着往前游才滤得到，闭嘴去追一条也追不上。还是同一只纸鲨。", fact: "因为吃的是滤，所以一追就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/basking-sharks.html": {
      companion: "bo", sticker: { id: "surface-gaper", label: "水面张圆员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "姥鲨在水面把嘴张圆才滤到浮游。", fact: "不是去追一条大鱼。也不要靠近真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bask-lab.html": {
      companion: "miao", sticker: { id: "deep-closer", label: "深闭滤不到员", emoji: "⭕" },
      card: { series: "物理实验", discovery: "在水面把嘴张圆才滤得到，潜到深处闭嘴就滤不到。还是同一只纸鲨。", fact: "因为浮游在水面，所以一潜闭就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/megamouths.html": {
      companion: "bo", sticker: { id: "lamp-gaper", label: "口灯引来员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "巨口鲨嘴里亮着小鱼才自己游进来。", fact: "不是灯笼鱼那种外挂灯。也不要追真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lamp-lab.html": {
      companion: "miao", sticker: { id: "dark-mouth", label: "口黑不来员", emoji: "💡" },
      card: { series: "物理实验", discovery: "嘴里亮着才引得来，嘴里黑着什么也不来。还是同一只纸鲨。", fact: "因为灯在嘴里，所以一黑就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cookiecutters.html": {
      companion: "bo", sticker: { id: "plug-biter", label: "转圈咬下员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "饼干鲨吸住转一圈才咬下一小块。", fact: "不是鲸鲨那种张嘴滤。也不要追真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cookie-lab.html": {
      companion: "miao", sticker: { id: "skim-licker", label: "轻舔舔不到员", emoji: "🍪" },
      card: { series: "物理实验", discovery: "吸住转一圈才咬得下，在表面舔舔不到。还是同一只纸鲨。", fact: "因为要转着咬，所以一舔就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/wobbegongs.html": {
      companion: "bo", sticker: { id: "carpet-hider", label: "贴石藏住员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "须鲨贴在石头上不动才藏得住。", fact: "不是护士鲨那种吸一口。也不要踩礁石上的真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/carpet-lab.html": {
      companion: "miao", sticker: { id: "open-sand", label: "空沙被看见员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "贴在石头上不动才藏得住，在空沙上游一下子被看见。还是同一只纸鲨。", fact: "因为要像地毯，所以一游开就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/nurse-sharks.html": {
      companion: "bo", sticker: { id: "slurp-sucker", label: "一口吸到员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "护士鲨嘴一吸才吸得到洞里的。", fact: "不是须鲨那种贴着藏。也不要靠近真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/slurp-lab.html": {
      companion: "miao", sticker: { id: "bite-chaser", label: "追咬追不上员", emoji: "🥤" },
      card: { series: "物理实验", discovery: "嘴一吸才吸得到，去追着咬追不上。还是同一只纸鲨。", fact: "因为在洞里，所以一追就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/electric-eels.html": {
      companion: "bo", sticker: { id: "volt-stuner", label: "先放电再近员", emoji: "⚡" },
      card: { series: "自然观察", discovery: "电鳗先放电再靠近对方才先软了。", fact: "不是海鳝那种打结。也不要碰真电鳗。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/volt-lab.html": {
      companion: "miao", sticker: { id: "limp-wiggler", label: "直接去咬员", emoji: "🔋" },
      card: { series: "物理实验", discovery: "先放电再靠近才用得上，直接去咬自己会被撞开。还是同一只纸鳗。", fact: "因为要先放，所以一咬就撞开。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/garden-eels.html": {
      companion: "bo", sticker: { id: "sand-waver", label: "半截伸沙员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "花园鳗半截身子伸出沙才捞得到漂过的。", fact: "不是海鳝那种石缝。也不要挖真沙田。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/garden-lab.html": {
      companion: "miao", sticker: { id: "swim-chaser", label: "游走丢洞员", emoji: "🌱" },
      card: { series: "物理实验", discovery: "半截身子伸出沙才捞得到，整条游出去追洞就丢了。还是同一只纸鳗。", fact: "因为洞在沙里，所以一游走就丢。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/wolf-eels.html": {
      companion: "bo", sticker: { id: "jaw-crusher", label: "硬牙咬开员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "狼鳗牙够硬才咬得开壳。", fact: "不是海鳝那种打结。也不要把手伸进石缝。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bitebone-lab.html": {
      companion: "miao", sticker: { id: "soft-jaw", label: "软牙咬不动员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "牙够硬才咬得开，牙软软的就咬不动。还是同一只纸鳗。", fact: "因为壳要硬牙，所以一软就咬不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ribbon-eels.html": {
      companion: "bo", sticker: { id: "flare-noser", label: "鼻瓣张开员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "丝带鳗鼻瓣张开才看得见信号。", fact: "不是花园鳗那种伸沙。也不要把手伸进石缝。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flare-lab.html": {
      companion: "miao", sticker: { id: "shut-noser", label: "收瓣认不出员", emoji: "🎀" },
      card: { series: "物理实验", discovery: "鼻瓣张开才看得见，收着就认不出。还是同一只纸鳗。", fact: "因为信号在鼻瓣上，所以一收就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/conger-eels.html": {
      companion: "bo", sticker: { id: "night-roamer", label: "夜里出来员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "康吉鳗夜里出来才找得到吃的。", fact: "不是海鳝那种白天守洞。也不要把手伸进洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/night-lab.html": {
      companion: "miao", sticker: { id: "day-hider", label: "白天被看见员", emoji: "🌙" },
      card: { series: "物理实验", discovery: "夜里出来才找得到，大白天游自己被看见。还是同一只纸鳗。", fact: "因为夜里才安全，所以一白天就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hagfish.html": {
      companion: "bo", sticker: { id: "slime-sliper", label: "挤黏滑掉员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "盲鳗黏液挤出来才滑得抓不住。", fact: "不是海鳝那种打结吞。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/slimeknot-lab.html": {
      companion: "miao", sticker: { id: "dry-tugger", label: "干着被抓员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "黏液挤出来才滑得掉，身上干着会被抓住。还是同一只纸鳗。", fact: "因为滑靠黏液，所以一干就被抓住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lampreys.html": {
      companion: "bo", sticker: { id: "rasp-sucker", label: "圆嘴吸锉员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "七鳃鳗圆嘴吸住再锉才吸得住。", fact: "不是鲟鱼那种须探。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rasphole-lab.html": {
      companion: "miao", sticker: { id: "bite-misser", label: "咬一口滑掉员", emoji: "⭕" },
      card: { series: "物理实验", discovery: "圆嘴吸住再锉才吸得住，用牙去咬一口会咬滑。还是同一只纸鱼。", fact: "因为要先吸住，所以一咬就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sturgeons.html": {
      companion: "bo", sticker: { id: "barbel-feeler", label: "须探泥底员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "鲟把须伸进泥里探才探得到底栖。", fact: "不是七鳃鳗那种圆嘴吸。也不要抓真鲟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/barbel-lab.html": {
      companion: "miao", sticker: { id: "blind-rooter", label: "眼看看不见员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "须在泥里探才探得到，用眼睛看看不见。还是同一只纸鱼。", fact: "因为吃的在泥里，所以一看就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/crocodiles.html": {
      companion: "bo", sticker: { id: "palate-sealer", label: "口阀关上员", emoji: "🐊" },
      card: { series: "自然观察", discovery: "鳄把喉咙门口那一层皮关上，张着嘴也能喘气。", fact: "不是通气管那种往上伸管子。也不要摸真鳄。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/valve-lab.html": {
      companion: "miao", sticker: { id: "throat-flooder", label: "阀开灌水员", emoji: "🚪" },
      card: { series: "物理实验", discovery: "口盖阀关上才喘得上，阀开着水就灌进喉咙。还是同一条纸鳄。", fact: "因为阀要关上，所以一开就灌。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/boxfish.html": {
      companion: "bo", sticker: { id: "box-armor", label: "硬盒咬不动员", emoji: "📦" },
      card: { series: "自然观察", discovery: "箱鲀身子像硬盒子才咬不动。", fact: "不是河豚那种鼓成球。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rigidbox-lab.html": {
      companion: "miao", sticker: { id: "squash-body", label: "软身被咬扁员", emoji: "📦" },
      card: { series: "物理实验", discovery: "身子像硬盒子才咬不动，软软的就一下就被咬扁。还是同一只纸鱼。", fact: "因为壳是硬盒，所以一软就被扁。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/jawfish.html": {
      companion: "bo", sticker: { id: "mouth-holder", label: "嘴里含蛋员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "颌鱼把蛋含在嘴里才守得住。", fact: "不是海马那种育儿袋。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mouthhold-lab.html": {
      companion: "miao", sticker: { id: "spit-loser", label: "吐出就丢员", emoji: "🥚" },
      card: { series: "物理实验", discovery: "蛋含在嘴里才守得住，吐出来就丢了。还是同一只纸鱼。", fact: "因为蛋在嘴里，所以一吐就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/clownfish.html": {
      companion: "bo", sticker: { id: "mucus-hoster", label: "黏液进葵员", emoji: "🐠" },
      card: { series: "自然观察", discovery: "小丑鱼身上有一层黏液才进得了海葵。", fact: "不是花园鳗那种伸沙。也不要伸手进海葵。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/host-lab.html": {
      companion: "miao", sticker: { id: "bare-stunger", label: "没黏被蜇员", emoji: "🌸" },
      card: { series: "物理实验", discovery: "身上有一层黏液才进得了海葵，没有黏液会被蜇。还是同一只纸鱼。", fact: "因为海葵会蜇，所以一没黏就进不去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/electric-rays.html": {
      companion: "bo", sticker: { id: "disc-stuner", label: "圆盘放电员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "电鳐圆盘里放电才先软了对方。", fact: "不是电鳗那种长条放电。也不要碰真电鳐。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/discstun-lab.html": {
      companion: "miao", sticker: { id: "snap-shocker", label: "去咬被撞员", emoji: "⚡" },
      card: { series: "物理实验", discovery: "圆盘里放电才先软了对方，去咬一口自己被撞开。还是同一只纸鳐。", fact: "因为电在圆盘里，所以一咬就撞开。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/honey-badgers.html": {
      companion: "bo", sticker: { id: "loose-hider", label: "松皮蜇不进员", emoji: "🦡" },
      card: { series: "自然观察", discovery: "蜜獾皮厚又松才蜇不进。", fact: "不是獾那种挖洞。也不要靠近真蜜獾。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/raider-lab.html": {
      companion: "miao", sticker: { id: "tight-stung", label: "紧皮被蜇员", emoji: "🍯" },
      card: { series: "物理实验", discovery: "皮厚又松才蜇不进，皮紧就蜇进。还是同一只纸蜜獾。", fact: "因为皮是松的，所以一紧就蜇进。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/skates.html": {
      companion: "bo", sticker: { id: "purse-layer", label: "埋袋守住员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "鳐把角质蛋袋埋在沙里才守得住。", fact: "不是魟那种胎生。也不要捡真蛋袋回家玩。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mermaid-lab.html": {
      companion: "miao", sticker: { id: "loose-spawner", label: "散产冲走员", emoji: "👛" },
      card: { series: "物理实验", discovery: "把蛋袋埋进沙里才守得住，散着产就冲走。还是同一只纸鳐。", fact: "因为浪会冲，所以一散就丢。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lionfish.html": {
      companion: "bo", sticker: { id: "fan-warner", label: "扇鳍警告员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "狮子鱼胸鳍张开像扇子才看得见警告。", fact: "不是石鱼那种坐等。也不要摸真刺。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lionfan-lab.html": {
      companion: "miao", sticker: { id: "fan-folder", label: "收鳍认不出员", emoji: "🪭" },
      card: { series: "物理实验", discovery: "胸鳍张开像扇子才看得见，收着就认不出。还是同一只纸鱼。", fact: "因为条纹在张开的鳍上，所以一收就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/red-pandas.html": {
      companion: "bo", sticker: { id: "false-thumber", label: "假拇指抓住员", emoji: "🐼" },
      card: { series: "自然观察", discovery: "小熊猫前爪内侧的假拇指才抓得住竹子。", fact: "不是大熊猫那种真拇指垫。也不要喂真小熊猫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/facewash-lab.html": {
      companion: "miao", sticker: { id: "slip-bamboo", label: "没垫滑掉员", emoji: "🎋" },
      card: { series: "物理实验", discovery: "前爪内侧的假拇指才抓得住，没有就滑掉。还是同一只纸小熊猫。", fact: "因为竹子是圆的，所以一没垫就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tarsiers.html": {
      companion: "bo", sticker: { id: "huge-eyer", label: "大眼夜看见员", emoji: "🐒" },
      card: { series: "自然观察", discovery: "眼镜猴眼睛特别大才看得见夜里的虫。", fact: "不是夜猴那种。也不要用闪光灯照真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hugeeye-lab.html": {
      companion: "miao", sticker: { id: "small-misser", label: "小眼看不见员", emoji: "👀" },
      card: { series: "物理实验", discovery: "眼睛特别大才看得见，小眼睛就看不见。还是同一只纸猴。", fact: "因为夜里光很少，所以一眼小就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dugongs.html": {
      companion: "bo", sticker: { id: "down-grazer", label: "唇下翻拔起草员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "儒艮嘴唇下翻才拔得起海草。", fact: "不是海牛那种圆吻。也不要靠近真儒艮。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/graze-lab.html": {
      companion: "miao", sticker: { id: "up-misser", label: "唇上翻拔不起员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "嘴唇下翻才拔得起，上翻就拔不起。还是同一只纸儒艮。", fact: "因为草在底下，所以一上翻就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/belugas.html": {
      companion: "bo", sticker: { id: "melon-shaper", label: "额瓜变形员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "白鲸额头那团瓜先变形才发出不同的声。", fact: "不是海豚那种固定额。也不要靠近真白鲸。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/melon-lab.html": {
      companion: "miao", sticker: { id: "stiff-melon", label: "额硬一种声员", emoji: "🍈" },
      card: { series: "物理实验", discovery: "额头那团瓜先变形才发出不同的声，硬着就一种声。还是同一只纸鲸。", fact: "因为声靠额瓜形状，所以一硬就一种。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dung-beetles.html": {
      companion: "bo", sticker: { id: "ball-roller", label: "推球滚回员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "蜣螂把粪球推着走才滚得回洞。", fact: "不是独角仙那种顶。也不要玩真粪球。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dungball-lab.html": {
      companion: "miao", sticker: { id: "hug-stucker", label: "抱着搬不动员", emoji: "🟤" },
      card: { series: "物理实验", discovery: "球推着走才滚得回洞，抱着搬就搬不动。还是同一只纸甲虫。", fact: "因为球要滚，所以一抱就不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sailfish.html": {
      companion: "bo", sticker: { id: "sail-herder", label: "竖帆围住员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "旗鱼背鳍竖起来像旗才围得住小鱼。", fact: "不是剑鱼那种刺一根。也不要靠近真旗鱼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dorsail-lab.html": {
      companion: "miao", sticker: { id: "folded-sail", label: "收帆散开员", emoji: "🎏" },
      card: { series: "物理实验", discovery: "背鳍竖起来像旗才围得住，收着就散了。还是同一只纸鱼。", fact: "因为旗是墙，所以一收就散。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/stonefish.html": {
      companion: "bo", sticker: { id: "rock-sitter", label: "坐石藏住员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "石鱼坐在石头上不动才藏得住。", fact: "不是狮子鱼那种扇鳍。也不要踩礁石上的真石鱼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sitwait-lab.html": {
      companion: "miao", sticker: { id: "swim-shower", label: "游走被看见员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "坐在石头上不动才藏得住，游起来一下子被看见。还是同一只纸鱼。", fact: "因为要像石头，所以一游就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/paddlefish.html": {
      companion: "bo", sticker: { id: "paddle-siever", label: "长吻浑水滤员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "匙吻鲟把扁平长吻伸进浑水里滤才滤得到浮游。", fact: "不是鲟那种须探。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/paddle-lab.html": {
      companion: "miao", sticker: { id: "eye-guesser", label: "眼找看不见员", emoji: "🥄" },
      card: { series: "物理实验", discovery: "长吻伸进浑水里滤才滤得到，用眼睛去找看不见。还是同一只纸鱼。", fact: "因为水是浑的，所以一看就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/guitarfish.html": {
      companion: "bo", sticker: { id: "flat-crusher", label: "平贴碾开员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "吉他鱼身子平贴沙才碾得开壳。", fact: "不是扁鲨那种埋起来弹。也不要踩沙上的真鱼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/guitar-lab.html": {
      companion: "miao", sticker: { id: "high-swimmer", label: "立游碾不到员", emoji: "🎸" },
      card: { series: "物理实验", discovery: "身子平贴沙才碾得开，立起来游就碾不到。还是同一只纸鱼。", fact: "因为壳在沙上，所以一立就碾不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/angel-sharks.html": {
      companion: "bo", sticker: { id: "sand-lurker", label: "埋沙再弹员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "扁鲨埋进沙里再弹才咬得到经过的。", fact: "不是吉他鱼那种平躺碾。也不要踩沙上的真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sandflat-lab.html": {
      companion: "miao", sticker: { id: "open-chaser", label: "水里追不上员", emoji: "🏖️" },
      card: { series: "物理实验", discovery: "埋进沙里再弹才咬得到，在水里追追不上。还是同一只纸鲨。", fact: "因为要等经过的，所以一追就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/stingrays.html": {
      companion: "bo", sticker: { id: "tail-stinger", label: "尾刺竖着员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "魟尾巴上的刺竖着对方才先让开。", fact: "不是蝠鲼那种翻滚滤。也不要踩沙上的真魟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/stingtail-lab.html": {
      companion: "miao", sticker: { id: "mouth-chomper", label: "嘴咬咬不着员", emoji: "📍" },
      card: { series: "物理实验", discovery: "尾巴上的刺竖着才让开，用嘴去咬咬不着。还是同一只纸魟。", fact: "因为刺在尾巴上，所以一改嘴就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/manta-rays.html": {
      companion: "bo", sticker: { id: "barrel-feeder", label: "翻滚滤一圈员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "蝠鲼翻一个跟头滤才滤到一圈的。", fact: "不是魟那种尾刺。也不要靠近真蝠鲼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/barrel-lab.html": {
      companion: "miao", sticker: { id: "straight-ram", label: "直冲一条线员", emoji: "🔄" },
      card: { series: "物理实验", discovery: "翻一个跟头滤才滤到一圈，直着张嘴冲只滤到一条线。还是同一只纸蝠鲼。", fact: "因为要转一圈，所以一直冲就少。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/flounders.html": {
      companion: "bo", sticker: { id: "eye-walker", label: "两眼搬一边员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "比目鱼两只眼睛搬到同一边躺着也看得见。", fact: "不是扁鲨那种埋起来。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/eyewalk-lab.html": {
      companion: "miao", sticker: { id: "split-eyer", label: "一边一只埋员", emoji: "👀" },
      card: { series: "物理实验", discovery: "两只眼睛搬到同一边才看得见，一边一只就有一边埋住。还是同一只纸鱼。", fact: "因为躺着，所以另一边会被埋住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/flying-fish.html": {
      companion: "bo", sticker: { id: "taxi-glider", label: "水面助跑滑员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "飞鱼先在水面拍着跑才滑得起来。", fact: "不是皇带鱼那种竖着挂。也不要追真飞鱼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/taxi-lab.html": {
      companion: "miao", sticker: { id: "stand-jumper", label: "原地掉回员", emoji: "🛫" },
      card: { series: "物理实验", discovery: "先在水面拍着跑才滑得起来，原地往上跳会掉回水里。还是同一只纸鱼。", fact: "因为要先加速，所以一原地就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/oarfish.html": {
      companion: "bo", sticker: { id: "vert-hanger", label: "身子竖着挂员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "皇带鱼身子竖着挂才省力待在那一层。", fact: "不是飞鱼那种助跑滑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hangvert-lab.html": {
      companion: "miao", sticker: { id: "side-floater", label: "横游往下掉员", emoji: "🎏" },
      card: { series: "物理实验", discovery: "身子竖着挂才省力，横着游自己往下掉。还是同一只纸鱼。", fact: "因为要待在那一层，所以一横就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/blobfish.html": {
      companion: "bo", sticker: { id: "pressure-shaper", label: "深压有形员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "水滴鱼在深水压着才有形。", fact: "不是皇带鱼那种竖着挂。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/jellybone-lab.html": {
      companion: "miao", sticker: { id: "surface-melter", label: "上浮塌摊员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "深水压着才有形，拿到水面就塌成一摊。还是同一只纸鱼。", fact: "因为要靠水压，所以一上浮就塌。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/viperfish.html": {
      companion: "bo", sticker: { id: "fang-gaper", label: "长牙合不上员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "蝰鱼牙太长合不上才咬得住大的。", fact: "不是闪光鱼那种眼下灯。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fanggap-lab.html": {
      companion: "miao", sticker: { id: "short-slipper", label: "短牙滑掉员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "牙太长合不上才咬得住，牙短短的会滑掉。还是同一只纸鱼。", fact: "因为要卡住大的，所以一短就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hatchetfish.html": {
      companion: "bo", sticker: { id: "belly-mirror", label: "腹亮看不见员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "斧头鱼肚子朝上发亮从下面才看不见。", fact: "不是蝰鱼那种长牙。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/uplook-lab.html": {
      companion: "miao", sticker: { id: "back-shiner", label: "背亮被看见员", emoji: "🪞" },
      card: { series: "物理实验", discovery: "肚子朝上发亮才看不见，背朝上发亮自己被看见。还是同一只纸鱼。", fact: "因为光从上面来，所以一背亮就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/flashlight-fish.html": {
      companion: "bo", sticker: { id: "cheek-lamper", label: "眼灯找伴员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "闪光鱼眼下那盏灯亮着才找得到伴。", fact: "不是斧头鱼那种腹镜。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/blink-lab.html": {
      companion: "miao", sticker: { id: "lid-closer", label: "盖灯看不见员", emoji: "🔦" },
      card: { series: "物理实验", discovery: "眼下那盏灯亮着才找得到，灯盖上对面看不见。还是同一只纸鱼。", fact: "因为灯在眼下，所以一盖就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pearlfish.html": {
      companion: "bo", sticker: { id: "tail-first", label: "尾先钻进员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "珍珠鱼尾巴先钻进海参才藏得进去。", fact: "不是虾鱼那种倒立。也不要剖真海参。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cucumber-lab.html": {
      companion: "miao", sticker: { id: "head-stuck", label: "头先卡住员", emoji: "🥒" },
      card: { series: "物理实验", discovery: "尾巴先钻进海参才藏得进，头先钻会卡住。还是同一只纸鱼。", fact: "因为口小，所以一头先就卡。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/shrimpfish.html": {
      companion: "bo", sticker: { id: "head-stander", label: "头朝下站员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "虾鱼头朝下站在海草里才藏得住。", fact: "不是喇叭鱼那种竖着藏。也不要拔真海草。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/headstand-lab.html": {
      companion: "miao", sticker: { id: "head-upper", label: "头朝上被看见员", emoji: "🙃" },
      card: { series: "物理实验", discovery: "头朝下站在海草里才藏得住，头朝上游一下子被看见。还是同一只纸鱼。", fact: "因为海草是竖的，所以一正游就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/trumpetfish.html": {
      companion: "bo", sticker: { id: "whip-hanger", label: "竖贴海鞭员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "喇叭鱼身子贴着海鞭竖着才藏得住。", fact: "不是虾鱼那种倒立。也不要折真珊瑚。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hangstill-lab.html": {
      companion: "miao", sticker: { id: "cross-swimmer", label: "横游被看见员", emoji: "🎺" },
      card: { series: "物理实验", discovery: "身子贴着海鞭竖着才藏得住，横着游开自己被看见。还是同一只纸鱼。", fact: "因为海鞭是竖的，所以一横就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/leaf-fish.html": {
      companion: "bo", sticker: { id: "leaf-drifter", label: "侧漂落叶员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "叶鱼身子侧着像一片落叶才漂到跟前。", fact: "不是喇叭鱼那种竖藏。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/leaflure-lab.html": {
      companion: "miao", sticker: { id: "upright-shower", label: "正游被看见员", emoji: "🍃" },
      card: { series: "物理实验", discovery: "身子侧着像一片落叶才漂到跟前，正着游一下子被看见。还是同一只纸鱼。", fact: "因为要像叶子，所以一正就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/koalas.html": {
      companion: "bo", sticker: { id: "long-cecum", label: "长盲肠消化员", emoji: "🐨" },
      card: { series: "自然观察", discovery: "考拉盲肠很长才消化得了桉叶。", fact: "不是树袋熊睡觉。也不要喂真考拉。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/poucheuc-lab.html": {
      companion: "miao", sticker: { id: "short-gut", label: "短肠消化不了员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "盲肠很长才消化得了，短了就消化不了。还是同一只纸考拉。", fact: "因为桉叶难消化，所以一短就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lemurs.html": {
      companion: "bo", sticker: { id: "belly-basker", label: "晒肚暖得快员", emoji: "🐒" },
      card: { series: "自然观察", discovery: "狐猴把肚皮对着太阳才暖得快。", fact: "不是眼镜猴那种大眼。也不要追真狐猴。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sunbath-lab.html": {
      companion: "miao", sticker: { id: "back-chiller", label: "晒背暖得慢员", emoji: "☀️" },
      card: { series: "物理实验", discovery: "肚皮对着太阳才暖得快，背对着就暖得慢。还是同一只纸狐猴。", fact: "因为黑皮吸热，所以一背对就慢。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lantern-sharks.html": {
      companion: "bo", sticker: { id: "belly-glower", label: "腹灯引来员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "灯笼鲨肚子上的小灯亮着才引得来小虾。", fact: "不是巨口鲨那种口灯。也不要追真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/glowdot-lab.html": {
      companion: "miao", sticker: { id: "dark-belly", label: "腹黑不来员", emoji: "💡" },
      card: { series: "物理实验", discovery: "肚子上的小灯亮着才引得来，黑着什么也不来。还是同一只纸鲨。", fact: "因为灯在肚子上，所以一黑就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/catsharks.html": {
      companion: "bo", sticker: { id: "weed-tier", label: "绑藻冲不走员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "猫鲨把蛋袋绑在海藻上才冲不走。", fact: "不是鳐那种埋沙袋。也不要捡真蛋袋。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/weedpurse-lab.html": {
      companion: "miao", sticker: { id: "free-drifter", label: "散产冲走员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "蛋袋绑在海藻上才冲不走，散着产就冲走。还是同一只纸鲨。", fact: "因为浪会冲，所以一散就丢。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sea-lions.html": {
      companion: "bo", sticker: { id: "rotate-walker", label: "转脚走上岸员", emoji: "🦭" },
      card: { series: "自然观察", discovery: "海狮后脚能转到下面才走得了岸。", fact: "不是海豹那种直脚爬。也不要靠近真海狮。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/walkfin-lab.html": {
      companion: "miao", sticker: { id: "drag-crawler", label: "直脚只能爬员", emoji: "🚶" },
      card: { series: "物理实验", discovery: "后脚能转到下面才走得了岸，直着就只能爬。还是同一只纸海狮。", fact: "因为走靠转脚，所以一直就只能爬。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/barreleyes.html": {
      companion: "bo", sticker: { id: "up-tuber", label: "管眼朝上员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "管眼鱼管子眼朝上才看得见头上的影子。", fact: "不是普通鱼眼朝前。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tubeeye-lab.html": {
      companion: "miao", sticker: { id: "front-tuber", label: "管眼朝前看不见员", emoji: "🔭" },
      card: { series: "物理实验", discovery: "管子眼朝上才看得见，朝前就看不见。还是同一只纸鱼。", fact: "因为影子在头上，所以一朝前就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gulper-eels.html": {
      companion: "bo", sticker: { id: "bag-mouther", label: "袋嘴装下员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "袋口鳗嘴张成一个大袋子才装得下比自己大的。", fact: "不是龙鱼那种须灯。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bagmouth-lab.html": {
      companion: "miao", sticker: { id: "tiny-mouther", label: "小嘴装不下员", emoji: "👜" },
      card: { series: "物理实验", discovery: "嘴张成一个大袋子才装得下，嘴小小的装不下。还是同一只纸鳗。", fact: "因为要装大的，所以一小就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dragonfish.html": {
      companion: "bo", sticker: { id: "barbel-lamper", label: "须灯引来员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "龙鱼下巴那根须亮着小鱼才自己游过来。", fact: "不是袋口鳗那种袋嘴。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/barbelglow-lab.html": {
      companion: "miao", sticker: { id: "dark-barbel", label: "须黑不来员", emoji: "💡" },
      card: { series: "物理实验", discovery: "下巴那根须亮着才引得来，须黑着什么也不来。还是同一只纸鱼。", fact: "因为灯在须上，所以一黑就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pinecone-fish.html": {
      companion: "bo", sticker: { id: "plate-armorer", label: "甲片咬不进员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "松球鱼身上一块块硬甲才咬不进。", fact: "不是兔子鱼那种毒棘。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/armorplate-lab.html": {
      companion: "miao", sticker: { id: "soft-skinned", label: "软皮被咬穿员", emoji: "🛡️" },
      card: { series: "物理实验", discovery: "身上一块块硬甲才咬不进，皮软软的一下被咬穿。还是同一只纸鱼。", fact: "因为要硬甲，所以一软就被穿。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/rabbitfish.html": {
      companion: "bo", sticker: { id: "venom-riser", label: "竖棘让开员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "兔子鱼背棘竖着对方才先让开。", fact: "不是松球鱼那种甲片。也不要摸真刺。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/venomspine-lab.html": {
      companion: "miao", sticker: { id: "spine-folder", label: "倒棘被咬员", emoji: "🌵" },
      card: { series: "物理实验", discovery: "背棘竖着才让开，倒着自己被咬。还是同一只纸鱼。", fact: "因为棘要竖着，所以一倒就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ratfish.html": {
      companion: "bo", sticker: { id: "plate-grinder", label: "牙板磨开员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "银鲛牙板磨着才磨得开壳。", fact: "不是格陵兰鲨那种慢游。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/grindplate-lab.html": {
      companion: "miao", sticker: { id: "point-biter", label: "尖咬咬不动员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "牙板磨着才磨得开，尖牙去咬咬不动。还是同一只纸鱼。", fact: "因为壳要磨，所以一尖就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/greenland-sharks.html": {
      companion: "bo", sticker: { id: "slow-cold", label: "慢游待得住员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "格陵兰鲨游得很慢才在冷水里待得住。", fact: "不是银鲛那种磨板。也不要靠近真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/coldslow-lab.html": {
      companion: "miao", sticker: { id: "fast-burner", label: "快游累垮员", emoji: "🧊" },
      card: { series: "物理实验", discovery: "游得很慢才待得住，游得很快自己先累垮。还是同一只纸鲨。", fact: "因为水很冷，所以一快就累。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/batfishes.html": {
      companion: "bo", sticker: { id: "pect-walker", label: "胸鳍臂走员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "蝙蝠鱼胸鳍当胳膊走才在沙上走得动。", fact: "不是黏鱼那种软身挤缝。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/armwalk-lab.html": {
      companion: "miao", sticker: { id: "tail-slider", label: "摆尾走不了员", emoji: "🦾" },
      card: { series: "物理实验", discovery: "胸鳍当胳膊走才走得动，用尾巴摆着游滑来滑去走不了。还是同一只纸鱼。", fact: "因为沙上要走，所以一摆尾就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/snailfish.html": {
      companion: "bo", sticker: { id: "gel-squeezer", label: "软身挤进员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "黏鱼身子软得像冻才挤得进石缝。", fact: "不是蝙蝠鱼那种臂走。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/gelbody-lab.html": {
      companion: "miao", sticker: { id: "stiff-blocker", label: "硬身挤不进员", emoji: "🍮" },
      card: { series: "物理实验", discovery: "身子软得像冻才挤得进，硬邦邦挤不进。还是同一只纸鱼。", fact: "因为缝很窄，所以一硬就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/orcas.html": {
      companion: "bo", sticker: { id: "wave-pusher", label: "一起推浪员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "虎鲸几头一起推浪才把冰上的冲下来。", fact: "不是白鲸那种额瓜。也不要靠近真虎鲸。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wavewash-lab.html": {
      companion: "miao", sticker: { id: "solo-shover", label: "一头推不动员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "几头一起推浪才冲得下来，一头推推不动。还是同一群纸鲸。", fact: "因为冰很重，所以一单独就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ladybugs.html": {
      companion: "bo", sticker: { id: "yellow-bleeder", label: "渗黄被放下员", emoji: "🐞" },
      card: { series: "自然观察", discovery: "瓢虫腿关节渗出黄水才被放下。", fact: "不是蜣螂那种滚球。也不要捏真瓢虫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/reflexbleed-lab.html": {
      companion: "miao", sticker: { id: "dry-joint", label: "干着被吃员", emoji: "💧" },
      card: { series: "物理实验", discovery: "腿关节渗出黄水才被放下，没有黄水就被吃。还是同一只纸瓢虫。", fact: "因为黄水难吃，所以一干就被吃。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/colugos.html": {
      companion: "bo", sticker: { id: "skin-glider", label: "张皮滑得远员", emoji: "🦇" },
      card: { series: "自然观察", discovery: "鼯猴从脖子到尾巴那一层皮张开才滑得远。", fact: "不是小熊猫那种假拇指。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/skinwing-lab.html": {
      companion: "miao", sticker: { id: "fold-faller", label: "收皮掉下去员", emoji: "🪂" },
      card: { series: "物理实验", discovery: "从脖子到尾巴那一层皮张开才滑得远，收着就掉下去。还是同一只纸鼯猴。", fact: "因为滑靠那一层皮，所以一收就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lorises.html": {
      companion: "bo", sticker: { id: "slow-hider", label: "慢走藏住员", emoji: "🐒" },
      card: { series: "自然观察", discovery: "懒猴慢慢走才不被看见。", fact: "不是眼镜猴那种大眼跳。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/slowgrip-lab.html": {
      companion: "miao", sticker: { id: "rush-shower", label: "快跑被发现员", emoji: "🐢" },
      card: { series: "物理实验", discovery: "慢慢走才不被看见，快跑自己被发现。还是同一只纸懒猴。", fact: "因为要藏，所以一快跑就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/frilled-sharks.html": {
      companion: "bo", sticker: { id: "eel-shaper", label: "细弯进缝员", emoji: "🦈" },
      card: { series: "自然观察", discovery: "皱鳃鲨身子细得像鳗才弯得进深缝。", fact: "不是康吉鳗那种夜出。也不要靠近真鲨。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/eelform-lab.html": {
      companion: "miao", sticker: { id: "stout-blocker", label: "粗直进不去员", emoji: "🐍" },
      card: { series: "物理实验", discovery: "身子细得像鳗才弯得进，粗直就进不去。还是同一只纸鲨。", fact: "因为缝很窄，所以一粗就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/filefish.html": {
      companion: "bo", sticker: { id: "rasp-locker", label: "竖棘卡住员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "单角鲀第一根背棘竖着卡住才吐不出来。", fact: "不是箱鲀那种硬盒。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/raspfin-lab.html": {
      companion: "miao", sticker: { id: "loose-spine", label: "倒棘滑掉员", emoji: "📌" },
      card: { series: "物理实验", discovery: "第一根背棘竖着卡住才吐不出来，倒下就滑掉。还是同一只纸鱼。", fact: "因为要卡住，所以一倒就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/porcupinefish.html": {
      companion: "bo", sticker: { id: "spine-riser", label: "竖刺咬不进员", emoji: "🐡" },
      card: { series: "自然观察", discovery: "二齿鲀刺竖起来才咬不进。", fact: "不是箱鲀那种硬盒。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/spineball-lab.html": {
      companion: "miao", sticker: { id: "flat-spine", label: "贴刺被咬员", emoji: "📌" },
      card: { series: "物理实验", discovery: "刺竖起来才咬不进，刺贴着就被咬。还是同一只纸鱼。", fact: "因为刺要竖，所以一贴就被咬。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cowfish.html": {
      companion: "bo", sticker: { id: "horn-turner", label: "头角顶开员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "牛鱼头上两只角先顶开才转得过缝。", fact: "不是箱鲀那种纯盒子。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hornbox-lab.html": {
      companion: "miao", sticker: { id: "stuck-box", label: "没角卡住员", emoji: "📦" },
      card: { series: "物理实验", discovery: "头上两只角先顶开才转得过缝，没角就卡住。还是同一只纸鱼。", fact: "因为缝要先顶开，所以一没角就卡。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tree-kangaroos.html": {
      companion: "bo", sticker: { id: "pad-climber", label: "脚垫爬上员", emoji: "🦘" },
      card: { series: "自然观察", discovery: "树袋鼠脚底有垫才抓得住树。", fact: "不是沙袋鼠那种后跳。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/climbfoot-lab.html": {
      companion: "miao", sticker: { id: "slip-footer", label: "滑脚掉下员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "脚底有垫才爬得上去，脚底滑滑的就滑下来。还是同一只纸袋鼠。", fact: "因为树皮要抓，所以一滑就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/wallabies.html": {
      companion: "bo", sticker: { id: "hind-hopper", label: "后腿齐跳员", emoji: "🦘" },
      card: { series: "自然观察", discovery: "沙袋鼠后腿一齐往后跳才一下跳得远。", fact: "不是树袋鼠那种爬树。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/boxhop-lab.html": {
      companion: "miao", sticker: { id: "four-trotter", label: "四脚碎步员", emoji: "⏭️" },
      card: { series: "物理实验", discovery: "后腿一齐往后跳才跳得远，四脚轮流跑步子碎。还是同一只纸袋鼠。", fact: "因为要齐跳，所以一轮流就碎。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tasmanian-devils.html": {
      companion: "bo", sticker: { id: "wide-gaper", label: "大张咬动员", emoji: "😈" },
      card: { series: "自然观察", discovery: "袋獾嘴张得特别开才咬得动骨头。", fact: "不是袋鼬那种夜扑。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bonegape-lab.html": {
      companion: "miao", sticker: { id: "small-gaper", label: "小张咬不动员", emoji: "🦴" },
      card: { series: "物理实验", discovery: "嘴张得特别开才咬得动，张一点点就咬不动。还是同一只纸袋獾。", fact: "因为骨头要大张，所以一小就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/quolls.html": {
      companion: "bo", sticker: { id: "night-pouncer", label: "夜扑扑到员", emoji: "🐾" },
      card: { series: "自然观察", discovery: "袋鼬夜里先看准再扑才扑得到。", fact: "不是袋獾那种张骨。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/spotpounce-lab.html": {
      companion: "miao", sticker: { id: "day-runner", label: "日跑被看见员", emoji: "🌙" },
      card: { series: "物理实验", discovery: "夜里先看准再扑才扑得到，白天乱跑自己被看见。还是同一只纸袋鼬。", fact: "因为要藏着等，所以一白天就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bilbies.html": {
      companion: "bo", sticker: { id: "ear-digger", label: "长耳听挖员", emoji: "🐰" },
      card: { series: "自然观察", discovery: "兔耳袋狸大耳朵听着再挖才挖得到虫。", fact: "不是鼠袋鼠那种拱菌。也不要挖真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/eardig-lab.html": {
      companion: "miao", sticker: { id: "blind-digger", label: "闭耳挖空员", emoji: "👂" },
      card: { series: "物理实验", discovery: "大耳朵听着再挖才挖得到，闭着耳乱挖会挖空。还是同一只纸袋狸。", fact: "因为虫在土里响，所以一闭耳就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/potoroos.html": {
      companion: "bo", sticker: { id: "fungus-rooter", label: "拱到菌才停员", emoji: "🦘" },
      card: { series: "自然观察", discovery: "鼠袋鼠鼻子拱到菌才停才找得到地下菌。", fact: "不是兔耳袋狸那种听挖。也不要挖真菌。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fungusdig-lab.html": {
      companion: "miao", sticker: { id: "empty-rooter", label: "乱拱拱空员", emoji: "🍄" },
      card: { series: "物理实验", discovery: "鼻子拱到菌才停才找得到，随便拱一下会拱空。还是同一只纸鼠袋鼠。", fact: "因为菌在定点，所以一乱就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/possums.html": {
      companion: "bo", sticker: { id: "tail-hooker", label: "卷尾掉不下去员", emoji: "🐭" },
      card: { series: "自然观察", discovery: "负鼠尾巴卷住树枝才掉不下去。", fact: "不是树袋鼠那种脚垫。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tailhook-lab.html": {
      companion: "miao", sticker: { id: "tail-dangler", label: "垂尾掉下去员", emoji: "🪝" },
      card: { series: "物理实验", discovery: "尾巴卷住树枝才掉不下去，尾巴垂着自己掉下去。还是同一只纸负鼠。", fact: "因为挂靠尾巴，所以一垂就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/stargazers.html": {
      companion: "bo", sticker: { id: "face-burier", label: "埋脸朝上员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "瞻星鱼脸埋在沙里眼睛朝上才等得到经过的。", fact: "不是扁鲨那种埋起来弹。也不要踩沙上的真鱼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/buryface-lab.html": {
      companion: "miao", sticker: { id: "sand-floater", label: "浮沙被看见员", emoji: "⭐" },
      card: { series: "物理实验", discovery: "脸埋在沙里眼睛朝上才等得到，浮在沙上一下子被看见。还是同一只纸鱼。", fact: "因为要等经过的，所以一浮就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/opahs.html": {
      companion: "bo", sticker: { id: "warm-blood", label: "暖血游得动员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "月鱼心里的血先暖着才游得动冷水。", fact: "不是金枪鱼那种红肉。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/heatblood-lab.html": {
      companion: "miao", sticker: { id: "cold-blood", label: "冷血游不动员", emoji: "❤️" },
      card: { series: "物理实验", discovery: "心里的血先暖着才游得动，血冷就游不动。还是同一只纸鱼。", fact: "因为水很冷，所以一血冷就停。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/aardvarks.html": {
      companion: "bo", sticker: { id: "long-noser", label: "长鼻舔到员", emoji: "🐜" },
      card: { series: "自然观察", discovery: "土豚鼻子长长伸进蚁丘才舔得到。", fact: "不是食蚁兽那种爪挖。也不要挖真蚁丘。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/antcone-lab.html": {
      companion: "miao", sticker: { id: "short-licker", label: "短鼻舔不到员", emoji: "👃" },
      card: { series: "物理实验", discovery: "鼻子长长伸进蚁丘才舔得到，短鼻舔不到。还是同一只纸土豚。", fact: "因为蚁在丘里，所以一短就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/quokkas.html": {
      companion: "bo", sticker: { id: "hind-lander", label: "后脚先落员", emoji: "🦘" },
      card: { series: "自然观察", discovery: "短尾袋鼠后脚先落地才在岛上跳得稳。", fact: "不是袋鼠那种长尾。也不要喂真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/islandhop-lab.html": {
      companion: "miao", sticker: { id: "front-faller", label: "前脚栽倒员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "后脚先落地才跳得稳，前脚先落地就栽。还是同一只纸短尾袋鼠。", fact: "因为跳靠后脚，所以一前脚就栽。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bandicoots.html": {
      companion: "bo", sticker: { id: "soil-snuffler", label: "拱土找到员", emoji: "🐽" },
      card: { series: "自然观察", discovery: "袋狸鼻子拱进土里才找得到虫。", fact: "不是土豚那种长鼻。也不要挖真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/snuffle-lab.html": {
      companion: "miao", sticker: { id: "eye-searcher", label: "眼看看不见员", emoji: "🕳️" },
      card: { series: "物理实验", discovery: "鼻子拱进土里才找得到，用眼睛看看不见。还是同一只纸袋狸。", fact: "因为虫在土里，所以一看就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/scorpions.html": {
      companion: "bo", sticker: { id: "uv-glower", label: "紫光发亮员", emoji: "🦂" },
      card: { series: "自然观察", discovery: "蝎壳被紫光照上才亮起来。", fact: "不是毒刺那一套。也不要抓真蝎。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/uv-lab.html": {
      companion: "miao", sticker: { id: "plain-hider", label: "白光看不见员", emoji: "💜" },
      card: { series: "物理实验", discovery: "紫光照上才亮起来，普通光照看不见。还是同一只纸蝎。", fact: "因为壳要紫光，所以一白光就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sifakas.html": {
      companion: "bo", sticker: { id: "side-hopper", label: "侧跳过空地员", emoji: "🐒" },
      card: { series: "自然观察", discovery: "跳狐猴两条后腿一齐侧跳才过得了空地。", fact: "不是懒猴那种慢走。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sidehop-lab.html": {
      companion: "miao", sticker: { id: "four-crawler", label: "四爬过得慢员", emoji: "↔️" },
      card: { series: "物理实验", discovery: "两条后腿一齐侧跳才过得了空地，四脚爬就慢。还是同一只纸狐猴。", fact: "因为空地要跳，所以一爬就慢。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/galagos.html": {
      companion: "bo", sticker: { id: "tendon-hopper", label: "攒弹跳得远员", emoji: "🐒" },
      card: { series: "自然观察", discovery: "丛猴后腿肌腱先攒着再弹才跳得远。", fact: "不是眼镜猴那种大眼看。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tendonhop-lab.html": {
      companion: "miao", sticker: { id: "slow-extender", label: "慢伸跳不远员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "后腿肌腱先攒着再弹才跳得远，慢慢伸就跳不远。还是同一只纸丛猴。", fact: "因为要先攒，所以一慢伸就近。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/marine-iguanas.html": {
      companion: "bo", sticker: { id: "salt-sneezer", label: "喷嚏排盐员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "海鬣蜥盐腺打个喷嚏才把海里的盐喷出去。", fact: "不是臭鼬那种喷雾。也不要摸真鬣蜥。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sneeze-lab.html": {
      companion: "miao", sticker: { id: "dry-noser", label: "憋盐结霜员", emoji: "🤧" },
      card: { series: "物理实验", discovery: "盐腺打个喷嚏才把盐喷出去，憋着盐脸上就结白霜。还是同一只纸鬣蜥。", fact: "因为盐在鼻子里，所以一憋就结霜。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cheetahs.html": {
      companion: "bo", sticker: { id: "tail-rudder", label: "甩尾当舵员", emoji: "🐆" },
      card: { series: "自然观察", discovery: "猎豹转弯时把长尾巴甩开当舵，才拐得过弯。", fact: "不是再跑快一点。也不要摸真猎豹。", next: "对照工坊，猜另一头为什么不成。", accent: "#d97706" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rudder-lab.html": {
      companion: "miao", sticker: { id: "tuck-skidder", label: "夹尾冲过头员", emoji: "↩️" },
      card: { series: "物理实验", discovery: "尾巴甩开当舵才拐得过，夹着尾巴就冲过头。还是同一只纸猎豹。", fact: "因为要当舵，所以一夹就冲过头。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }

    ,
    "nature/dolphins.html": {
      companion: "bo", sticker: { id: "fluke-pusher", label: "尾叶上下拍员", emoji: "🐬" },
      card: { series: "自然观察", discovery: "海豚尾巴上下拍才推得动水。", fact: "不是金枪鱼那种左右摆。也不要追真海豚。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fluke-lab.html": {
      companion: "miao", sticker: { id: "side-wiggler", label: "左右摆不动员", emoji: "🐟" },
      card: { series: "物理实验", discovery: "尾巴上下拍才推得动，尾巴左右摆就推不动。还是同一只纸海豚。", fact: "因为尾叶是横的，所以一左右就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hyraxes.html": {
      companion: "bo", sticker: { id: "moist-padder", label: "湿垫贴住员", emoji: "🪨" },
      card: { series: "自然观察", discovery: "蹄兔脚底湿湿的肉垫才贴得住石头。", fact: "不是土拨鼠那种爪子挖。也不要抓真蹄兔。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/moistpad-lab.html": {
      companion: "miao", sticker: { id: "hard-clawer", label: "干爪滑下员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "肉垫湿湿的才贴得住，爪子干硬就滑下去。还是同一只纸蹄兔。", fact: "因为石头要贴，所以一干就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/springboks.html": {
      companion: "bo", sticker: { id: "pronk-bouncer", label: "四腿直蹦员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "跳羚四腿伸直往上蹦对面才看得见信号。", fact: "不是赛加羚羊那种平跑。也不要追真跳羚。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pronk-lab.html": {
      companion: "miao", sticker: { id: "flat-runner", label: "贴地看不出员", emoji: "⬆️" },
      card: { series: "物理实验", discovery: "四腿伸直蹦才看得见，贴地往前跑就看不出。还是同一只纸跳羚。", fact: "因为信号在蹦上，所以一平跑就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/leatherbacks.html": {
      companion: "bo", sticker: { id: "flex-diver", label: "软甲潜深员", emoji: "🐢" },
      card: { series: "自然观察", discovery: "棱皮龟软的革质甲有脊才潜得深。", fact: "不是绿海龟那种硬盾片。也不要摸真海龟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flexshell-lab.html": {
      companion: "miao", sticker: { id: "hard-sheller", label: "硬甲潜不深员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "甲是软的有脊才潜得深，甲是硬格子就潜不深。还是同一只纸龟。", fact: "因为深水要压，所以一硬就潜不深。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sun-bears.html": {
      companion: "bo", sticker: { id: "honey-lapper", label: "长舌舔到员", emoji: "🐻" },
      card: { series: "自然观察", discovery: "马来熊舌头伸进蜂窝才舔得到蜜。", fact: "不是普通熊那种短舌。也不要靠近真熊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/honeylap-lab.html": {
      companion: "miao", sticker: { id: "short-tonguer", label: "短舌舔不到员", emoji: "🍯" },
      card: { series: "物理实验", discovery: "舌头伸进窝才舔得到，舌头短短的就舔不到。还是同一只纸熊。", fact: "因为蜜在窝里，所以一短就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/weeverfish.html": {
      companion: "bo", sticker: { id: "bury-spiner", label: "埋沙露棘员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "龙膁埋进沙只露黑背棘，踩到的才躲开。", fact: "不是比目鱼那种躺沙面。也不要踩浅沙里的真鱼。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/buryfin-lab.html": {
      companion: "miao", sticker: { id: "free-floater", label: "游沙被看见员", emoji: "⚠️" },
      card: { series: "物理实验", discovery: "埋进沙只露棘才等得到，整条游在沙上一下子被看见。还是同一只纸鱼。", fact: "因为要等人踩，所以一游就被看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/komodo-dragons.html": {
      companion: "bo", sticker: { id: "fork-taster", label: "叉舌舔气味员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "科莫多龙叉子舌头舔空气才找得到气味。", fact: "不是海鬣蜥那种打喷嚏。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/forktaste-lab.html": {
      companion: "miao", sticker: { id: "closed-sniffer", label: "闭嘴找不到员", emoji: "👅" },
      card: { series: "物理实验", discovery: "叉子舌头舔空气才找得到，嘴闭着闻就找不到。还是同一只纸龙。", fact: "因为气味在空气里，所以一闭就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ibex.html": {
      companion: "bo", sticker: { id: "cliff-hoofer", label: "分蹄卡住员", emoji: "🐐" },
      card: { series: "自然观察", discovery: "北山羊分开的蹄子卡住岩石才爬得上去。", fact: "不是跳羚那种直蹦。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cliffhoof-lab.html": {
      companion: "miao", sticker: { id: "slip-hoofer", label: "并蹄滑下员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "蹄分开卡住才爬得上去，蹄并着就滑下去。还是同一只纸羊。", fact: "因为岩石要卡，所以一并就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gharials.html": {
      companion: "bo", sticker: { id: "narrow-snapper", label: "细嘴夹住员", emoji: "🐊" },
      card: { series: "自然观察", discovery: "恒河鳄又细又长的嘴才夹得住鱼。", fact: "不是鳄鱼那种宽嘴咬大块。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/narrowjaw-lab.html": {
      companion: "miao", sticker: { id: "wide-misser", label: "宽嘴夹不住员", emoji: "🎣" },
      card: { series: "物理实验", discovery: "细长嘴夹鱼才夹得住，宽嘴去咬就夹不住。还是同一只纸鳄。", fact: "因为鱼要细夹，所以一宽就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cone-snails.html": {
      companion: "bo", sticker: { id: "harpoon-shooter", label: "齿矛射出员", emoji: "🐚" },
      card: { series: "自然观察", discovery: "芋螺弹出齿舌做成的小矛才射得到。", fact: "不是普通蜗牛刮藻。也不要碰真芋螺。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/harpoon-lab.html": {
      companion: "miao", sticker: { id: "shell-bumper", label: "撞壳射不到员", emoji: "🎯" },
      card: { series: "物理实验", discovery: "弹出齿矛才射得到，用壳去撞就射不到。还是同一只纸螺。", fact: "因为要弹出去，所以一撞就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/oryx.html": {
      companion: "bo", sticker: { id: "heat-keeper", label: "白天蓄热员", emoji: "🦄" },
      card: { series: "自然观察", discovery: "大羚羊白天让身体热一点，晚上才散得掉。", fact: "不是骆驼驼峰存水。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/heatkeep-lab.html": {
      companion: "miao", sticker: { id: "water-waster", label: "散热耗水员", emoji: "🌡️" },
      card: { series: "物理实验", discovery: "身体先热着水还在，拼命散热水就耗光。还是同一只纸羚。", fact: "因为水要省，所以一散就光。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pronghorns.html": {
      companion: "bo", sticker: { id: "sheath-shedder", label: "角鞘脱掉员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "叉角羚每年脱掉角外面那层鞘才长得出新的。", fact: "不是鹿那种整支角脱掉。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hornshed-lab.html": {
      companion: "miao", sticker: { id: "stuck-sheather", label: "套着长不出员", emoji: "🦴" },
      card: { series: "物理实验", discovery: "角鞘脱掉才长得出新的，鞘一直套着就长不出。还是同一只纸羚。", fact: "因为新的要从里面长，所以一套就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sea-urchins.html": {
      companion: "bo", sticker: { id: "tube-walker", label: "管足吸走员", emoji: "⚪" },
      card: { series: "自然观察", discovery: "海胆用管足吸住再走才走得动。", fact: "不是海星那种翻过来。也不要踩真海胆。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/urchinwalk-lab.html": {
      companion: "miao", sticker: { id: "spine-stander", label: "刺撑走不动员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "管足吸住走才走得动，只靠刺撑着走不动。还是同一只纸胆。", fact: "因为要吸住，所以一撑就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/storks.html": {
      companion: "bo", sticker: { id: "wait-stabber", label: "站住再刺员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹳先站着不动等鱼游近再刺才刺得到。", fact: "不是鹭那种慢慢走着踩。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/waitstab-lab.html": {
      companion: "miao", sticker: { id: "chase-mudder", label: "追啄搅浑员", emoji: "📍" },
      card: { series: "物理实验", discovery: "站住再刺才刺得到，追着啄就搅浑水。还是同一只纸鹳。", fact: "因为鱼怕晃，所以一追就浑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/zebras.html": {
      companion: "bo", sticker: { id: "dazzle-runner", label: "条纹晃动员", emoji: "🦓" },
      card: { series: "自然观察", discovery: "斑马成群跑时条纹晃在一起，咬人的苍蝇才落不准。", fact: "本页主课是条纹晃动让蝇下口不准。也不要追真斑马。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dazzle-lab.html": {
      companion: "miao", sticker: { id: "plain-stander", label: "一块色落准员", emoji: "🦓" },
      card: { series: "物理实验", discovery: "条纹一起晃蝇才落不准，身上一块色就落得准。还是同一只纸马。", fact: "因为蝇要看准，所以一晃就落不准。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cranes.html": {
      companion: "bo", sticker: { id: "unison-dancer", label: "两只齐跳员", emoji: "🦢" },
      card: { series: "自然观察", discovery: "两只鹤一起跳、一起叫才对得上舞伴。", fact: "不是鹳那种静站刺鱼。也不要追真鹤。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/unison-lab.html": {
      companion: "miao", sticker: { id: "solo-jumper", label: "单跳不理员", emoji: "💃" },
      card: { series: "物理实验", discovery: "两只一起跳才对得上，一只自己跳对面不理。还是同一对纸鹤。", fact: "因为要对上，所以一单就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/flying-gurnards.html": {
      companion: "bo", sticker: { id: "pect-spreader", label: "胸鳍张开员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "飞鲂把大大的胸鳍张开才滑得出一小段。", fact: "不是飞鱼那种滑很远。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pectspread-lab.html": {
      companion: "miao", sticker: { id: "fin-sinker", label: "收鳍沉下去员", emoji: "🪭" },
      card: { series: "物理实验", discovery: "胸鳍张开才滑得出，胸鳍收着只会沉。还是同一只纸鱼。", fact: "因为扇要张开，所以一收就沉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/giant-clams.html": {
      companion: "bo", sticker: { id: "mantle-opener", label: "外套朝阳员", emoji: "🐚" },
      card: { series: "自然观察", discovery: "砗磲把外套膜张开对着太阳，里面的小藻才造得出糖。", fact: "不是普通蛤蜊滤水。也不要捞真砗磲。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/clamsun-lab.html": {
      companion: "miao", sticker: { id: "shut-starver", label: "闭壳饿着员", emoji: "☀️" },
      card: { series: "物理实验", discovery: "外套膜张开朝阳才造得出糖，壳一直闭着藻就饿着。还是同一只纸蛤。", fact: "因为藻要阳光，所以一闭就饿。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/nudibranchs.html": {
      companion: "bo", sticker: { id: "cerata-keeper", label: "背丛扎住人员", emoji: "🌈" },
      card: { series: "自然观察", discovery: "海蛞蝓把刺细胞放到背上的丛里才扎得人。", fact: "不是章鱼喷墨。也不要摸真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cerata-lab.html": {
      companion: "miao", sticker: { id: "bare-backer", label: "光背扎不了员", emoji: "🌵" },
      card: { series: "物理实验", discovery: "背上有刺丛才扎得住人，背上光光就扎不了。还是同一只纸蛞蝓。", fact: "因为刺在丛里，所以一光就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sea-cucumbers.html": {
      companion: "bo", sticker: { id: "gut-shooter", label: "喷肠粘住员", emoji: "🥒" },
      card: { series: "自然观察", discovery: "海参把身体里的管子喷出去，对方才先被粘住。", fact: "不是海蛞蝓背上的刺丛。也不要捏真海参。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/gutshoot-lab.html": {
      companion: "miao", sticker: { id: "gut-keeper", label: "留着挡不住员", emoji: "💥" },
      card: { series: "物理实验", discovery: "管子喷出去对方才被粘住，管子留在肚里就挡不住。还是同一只纸参。", fact: "因为要先喷，所以一留就挡不住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/coelacanths.html": {
      companion: "bo", sticker: { id: "lobe-walker", label: "肉鳍撑走员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "腔棘鱼肉质鳍像腿一样撑着，才在底上走得动。", fact: "不是普通鱼摆尾游。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lobefin-lab.html": {
      companion: "miao", sticker: { id: "ray-slipper", label: "薄鳍撑不住员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "肉鳍撑着走才走得动，薄鳍条就撑不住。还是同一只纸鱼。", fact: "因为底要撑，所以一薄就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/polar-bears.html": {
      companion: "bo", sticker: { id: "paw-padder", label: "毛垫走冰员", emoji: "🐻" },
      card: { series: "自然观察", discovery: "北极熊脚底有毛垫才走得了冰。", fact: "不是马来熊那种长舌。也不要靠近真熊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pawpad-lab.html": {
      companion: "miao", sticker: { id: "bare-slider", label: "光脚打滑员", emoji: "🧊" },
      card: { series: "物理实验", discovery: "脚底有毛垫才走得了冰，脚底光光的就打滑。还是同一只纸熊。", fact: "因为冰要抓，所以一光就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/snow-leopards.html": {
      companion: "bo", sticker: { id: "tail-balancer", label: "粗尾搭着员", emoji: "🐆" },
      card: { series: "自然观察", discovery: "比较雪豹和细尾垂着的。雪豹把粗尾搭着走，才掉不下去。", fact: "不是猎豹那种甩尾拐弯。也不要摸真雪豹。", next: "对照工坊，猜另一头为什么不成。", accent: "#64748b" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/tailbal-lab.html": {
      companion: "miao", sticker: { id: "thin-dangler", label: "细尾垂掉员", emoji: "🪶" },
      card: { series: "物理实验", discovery: "同一只纸雪豹。粗尾搭着走才掉不下去；细尾垂着就掉下去。", fact: "因为要搭着，所以一垂就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }

    ,
    "nature/bison.html": {
      companion: "bo", sticker: { id: "head-sweeper", label: "头拱开雪员", emoji: "🦬" },
      card: { series: "自然观察", discovery: "美洲野牛用头把雪拱开才吃得到草。", fact: "不是麝牛那种站着挡风。也不要靠近真野牛。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/headsnow-lab.html": {
      companion: "miao", sticker: { id: "snow-noser", label: "闻雪吃不到员", emoji: "❄️" },
      card: { series: "物理实验", discovery: "头拱开雪才吃得到草，鼻子去闻就吃不到。还是同一只纸牛。", fact: "因为草在雪下，所以一闻就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/warthogs.html": {
      companion: "bo", sticker: { id: "knee-digger", label: "跪垫挖到员", emoji: "🐗" },
      card: { series: "自然观察", discovery: "疣猪膝盖有垫，跪下来挖才挖得到根。", fact: "不是土豚那种用爪挖。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/kneel-lab.html": {
      companion: "miao", sticker: { id: "stand-rooter", label: "站着够不着员", emoji: "🧎" },
      card: { series: "物理实验", discovery: "跪下来挖才挖得到根，站着拱就够不着。还是同一只纸猪。", fact: "因为根在低处，所以一站就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sloth-bears.html": {
      companion: "bo", sticker: { id: "dirt-blower", label: "先吹再舔员", emoji: "🐻" },
      card: { series: "自然观察", discovery: "懒熊先把土吹开再舔才舔得到白蚁。", fact: "不是马来熊那种长舌舔蜜。也不要靠近真熊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dirtblow-lab.html": {
      companion: "miao", sticker: { id: "dry-slurper", label: "直舔一堆土员", emoji: "💨" },
      card: { series: "物理实验", discovery: "先把土吹开再舔才舔得到，直接去舔土嘴里一堆土。还是同一只纸熊。", fact: "因为蚁在土下，所以一直舔就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/vampire-bats.html": {
      companion: "bo", sticker: { id: "warm-finder", label: "摸到温点员", emoji: "🦇" },
      card: { series: "自然观察", discovery: "吸血蝠鼻子先摸到温热的地方才找得到血。", fact: "不是果蝠吃果子。也不要抓真蝙蝠。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/warmspot-lab.html": {
      companion: "miao", sticker: { id: "cold-biter", label: "乱咬咬空员", emoji: "🌡️" },
      card: { series: "物理实验", discovery: "先摸到温热的地方才找得到，随便咬一口会咬空。还是同一只纸蝠。", fact: "因为血在温处，所以一乱就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/maned-wolves.html": {
      companion: "bo", sticker: { id: "grass-stilter", label: "长腿高出草员", emoji: "🐺" },
      card: { series: "自然观察", discovery: "鬃狼腿特别长，高出草才看得见前方。", fact: "不是灰狼那种贴地跑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/grassstilt-lab.html": {
      companion: "miao", sticker: { id: "short-wader", label: "短腿被挡住员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "长腿高出草才看得见，腿短短的会被草挡住。还是同一只纸狼。", fact: "因为草很高，所以一短就挡。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/aardwolves.html": {
      companion: "bo", sticker: { id: "soft-licker", label: "软牙舔到员", emoji: "🐺" },
      card: { series: "自然观察", discovery: "土狼牙又细又软，去舔白蚁才舔得到。", fact: "不是鬣狗那种咬骨头。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/softlick-lab.html": {
      companion: "miao", sticker: { id: "hard-biter", label: "硬咬咬空员", emoji: "🐜" },
      card: { series: "物理实验", discovery: "软牙去舔蚁才舔得到，硬牙去咬会咬空。还是同一只纸狼。", fact: "因为蚁要舔，所以一咬就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/surgeonfish.html": {
      companion: "bo", sticker: { id: "knife-flicker", label: "尾刀弹开员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "刺尾鱼尾柄那片刀弹开，对方才躲开。", fact: "不是金枪鱼那种摆尾游。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/knifetail-lab.html": {
      companion: "miao", sticker: { id: "soft-tailer", label: "收刀被咬员", emoji: "🔪" },
      card: { series: "物理实验", discovery: "尾柄那片刀弹开对方才躲开，刀收着会被咬住。还是同一只纸鱼。", fact: "因为要弹开，所以一收就被咬。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/vultures.html": {
      companion: "bo", sticker: { id: "thermal-rider", label: "踩热气升高员", emoji: "🦅" },
      card: { series: "自然观察", discovery: "秃鹫翅膀张开踩着热空气才不费力升高。", fact: "不是鹳那种站住刺鱼。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/thermal-lab.html": {
      companion: "miao", sticker: { id: "flap-flapper", label: "扑打掉下去员", emoji: "♨️" },
      card: { series: "物理实验", discovery: "翅膀张开踩热气才不费力升高，翅膀扑打会掉下去。还是同一只纸鹫。", fact: "因为热气往上，所以一扑就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/arapaima.html": {
      companion: "bo", sticker: { id: "air-gulper", label: "水面吸气员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "巨骨舌鱼把头伸出水面吸一口空气才喘得过。", fact: "不是肺鱼那种夏眠。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mouthair-lab.html": {
      companion: "miao", sticker: { id: "gill-choker", label: "靠鳃闷着员", emoji: "💨" },
      card: { series: "物理实验", discovery: "伸出水面吸气才喘得过，只靠鳃会闷着。还是同一只纸鱼。", fact: "因为水里气少，所以一靠鳃就闷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/fiddler-crabs.html": {
      companion: "bo", sticker: { id: "claw-waver", label: "大螯举起员", emoji: "🦀" },
      card: { series: "自然观察", discovery: "招潮蟹把特别大的螯举起来晃，对面才看得见信号。", fact: "不是普通蟹两只螯夹东西。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bigclaw-lab.html": {
      companion: "miao", sticker: { id: "even-clawer", label: "一样大认不出员", emoji: "👋" },
      card: { series: "物理实验", discovery: "大螯举起来晃才看得见，两只一样大就认不出。还是同一只纸蟹。", fact: "因为信号在大螯上，所以一一样大就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/condors.html": {
      companion: "bo", sticker: { id: "bone-solvent", label: "强酸化骨员", emoji: "🦅" },
      card: { series: "自然观察", discovery: "神鹫胃酸特别强，骨头才化得掉。", fact: "不是秃鹫那种踩热气。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bonesolve-lab.html": {
      companion: "miao", sticker: { id: "bone-stucker", label: "淡酸卡着员", emoji: "🦴" },
      card: { series: "物理实验", discovery: "胃酸够强骨头才化得掉，胃酸淡淡骨头就卡着。还是同一只纸鹫。", fact: "因为骨头要化，所以一淡就卡。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gila-monsters.html": {
      companion: "bo", sticker: { id: "tail-fatter", label: "尾脂撑住员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "希拉毒蜥把脂肪存在尾巴里，好久不吃也撑得住。", fact: "不是科莫多龙伸叉舌。也不要碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tailfat-lab.html": {
      companion: "miao", sticker: { id: "thin-hungerer", label: "细尾撑不住员", emoji: "🧈" },
      card: { series: "物理实验", discovery: "尾巴存着脂肪才撑得住，尾巴细细的就撑不住。还是同一只纸蜥。", fact: "因为要存着，所以一细就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/anoles.html": {
      companion: "bo", sticker: { id: "dewlap-flasher", label: "喉扇撑开员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "安乐蜥把喉下那片彩扇撑开，对面才看得见信号。", fact: "不是变色龙那种慢慢变色。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dewlap-lab.html": {
      companion: "miao", sticker: { id: "dewlap-folder", label: "收扇认不出员", emoji: "🎏" },
      card: { series: "物理实验", discovery: "喉扇撑开才看得见，扇收着就认不出。还是同一只纸蜥。", fact: "因为信号在扇上，所以一收就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hermit-crabs.html": {
      companion: "bo", sticker: { id: "shell-swapper", label: "换成大壳员", emoji: "🦀" },
      card: { series: "自然观察", discovery: "寄居蟹长大了换一个更大的空螺壳才装得下。", fact: "不是普通蟹自己长壳。也不要把真寄居蟹从壳里拽出来。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/shellswap-lab.html": {
      companion: "miao", sticker: { id: "tight-squeezer", label: "旧壳挤着员", emoji: "🐚" },
      card: { series: "物理实验", discovery: "换成大空壳才装得下，旧壳一直套着就挤着。还是同一只纸蟹。", fact: "因为身子在长，所以一套就挤。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/coconut-crabs.html": {
      companion: "bo", sticker: { id: "nut-climber", label: "夹住爬上员", emoji: "🦀" },
      card: { series: "自然观察", discovery: "椰子蟹大螯夹住树皮再爬才爬得上椰子树。", fact: "不是招潮蟹那种举螯。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/climbnut-lab.html": {
      companion: "miao", sticker: { id: "claw-dropper", label: "不夹掉下员", emoji: "🥥" },
      card: { series: "物理实验", discovery: "大螯夹住再爬才爬得上，螯不夹就掉下来。还是同一只纸蟹。", fact: "因为树要夹，所以一不夹就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/peccaries.html": {
      companion: "bo", sticker: { id: "scent-marker", label: "擦味跟上员", emoji: "🐗" },
      card: { series: "自然观察", discovery: "西貒背上的味腺擦一下才跟得上同伴。", fact: "不是疣猪那种跪着挖。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/herdscent-lab.html": {
      companion: "miao", sticker: { id: "lone-roamer", label: "乱跑跟丢员", emoji: "👃" },
      card: { series: "物理实验", discovery: "背上的味腺擦一下才跟得上，自己乱跑会跟丢。还是同一只纸猪。", fact: "因为要靠气味，所以一乱跑就丢。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/matamata.html": {
      companion: "bo", sticker: { id: "head-sucker", label: "突然吸进员", emoji: "🐢" },
      card: { series: "自然观察", discovery: "玛塔龟头突然张开一吸，鱼才进来。", fact: "不是绿海龟那种硬盾片。也不要捞真龟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/headsuck-lab.html": {
      companion: "miao", sticker: { id: "snap-misser", label: "咬一口跑了员", emoji: "🌀" },
      card: { series: "物理实验", discovery: "头突然张开吸才吸得进，去咬一口鱼就跑了。还是同一只纸龟。", fact: "因为要吸，所以一咬就跑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gars.html": {
      companion: "bo", sticker: { id: "long-clamper", label: "长嘴夹住员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "雀鳝嘴又细又长，夹住才夹得住鱼。", fact: "不是金枪鱼那种摆尾游。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/longjaw-lab.html": {
      companion: "miao", sticker: { id: "short-snapper", label: "短嘴咬空员", emoji: "📏" },
      card: { series: "物理实验", discovery: "长嘴夹住才夹得住，短嘴去咬会咬空。还是同一只纸鱼。", fact: "因为鱼要细夹，所以一短就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/addax.html": {
      companion: "bo", sticker: { id: "wide-hoofer", label: "宽蹄不陷员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "旋角羚蹄子又宽又平，沙子上才陷不下去。", fact: "不是大羚羊那种白天蓄热。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/widehoof-lab.html": {
      companion: "miao", sticker: { id: "thin-sinker", label: "窄蹄陷进去员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "宽蹄走沙才陷不下去，窄蹄就陷进去。还是同一只纸羚。", fact: "因为沙要摊开，所以一窄就陷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pythons.html": {
      companion: "bo", sticker: { id: "wrap-squeezer", label: "缠紧动不了员", emoji: "🐍" },
      card: { series: "自然观察", discovery: "蟒用身子一圈圈缠紧，对方才动不了。", fact: "不是毒蛇那一口毒。也不要靠近真蟒。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wrapstill-lab.html": {
      companion: "miao", sticker: { id: "bite-slipper", label: "咬一口滑掉员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "身子缠紧对方才动不了，只咬一口会滑掉。还是同一只纸蟒。", fact: "因为要缠，所以一咬就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/kookaburras.html": {
      companion: "bo", sticker: { id: "chorus-caller", label: "一家齐叫员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "一家笑翠鸟一起叫，领地才守得住。", fact: "不是翠鸟那种冲进水。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/laugh-lab.html": {
      companion: "miao", sticker: { id: "solo-caller", label: "单叫不理员", emoji: "😂" },
      card: { series: "物理实验", discovery: "一家一起叫才守得住，一只自己叫对面不理。还是同一家纸鸟。", fact: "因为要对上，所以一单就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/snapping-turtles.html": {
      companion: "bo", sticker: { id: "tongue-lurer", label: "舌虫晃来员", emoji: "🐢" },
      card: { series: "自然观察", discovery: "鳄龟舌头上那条粉虫子晃，鱼才游过来。", fact: "不是棱皮龟那种软甲。也不要把手伸近真鳄龟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wormtongue-lab.html": {
      companion: "miao", sticker: { id: "still-tonguer", label: "舌头停着员", emoji: "🪱" },
      card: { series: "物理实验", discovery: "舌虫晃着鱼才游过来，舌头停着就等不来。还是同一只纸龟。", fact: "因为鱼要来咬，所以一停就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sugar-gliders.html": {
      companion: "bo", sticker: { id: "sugar-glider", label: "皮膜张开员", emoji: "🐿️" },
      card: { series: "自然观察", discovery: "蜜袋鼯把身侧那层皮张开才滑得远。", fact: "不是鼯猴那种从脖子到尾巴的整张皮。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sugarglide-lab.html": {
      companion: "miao", sticker: { id: "membrane-folder", label: "收皮掉下员", emoji: "🪁" },
      card: { series: "物理实验", discovery: "皮膜张开才滑得远，皮收着就掉下去。还是同一只纸鼯。", fact: "因为滑靠那层皮，所以一收就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bighorns.html": {
      companion: "bo", sticker: { id: "horn-clasher", label: "两角撞上员", emoji: "🐏" },
      card: { series: "自然观察", discovery: "大角羊两只角撞在一起，力才散得开。", fact: "不是北山羊那种分蹄爬山。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hornclash-lab.html": {
      companion: "miao", sticker: { id: "skull-bumper", label: "头去撞晕员", emoji: "💥" },
      card: { series: "物理实验", discovery: "两角撞上力才散得开，头去撞会晕。还是同一只纸羊。", fact: "因为力要散开，所以一头就晕。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/swordfish.html": {
      companion: "bo", sticker: { id: "bill-sworder", label: "长剑劈开员", emoji: "🗡️" },
      card: { series: "自然观察", discovery: "剑鱼扁平的长剑先劈开，鱼群才散开。", fact: "不是旗鱼那种背帆。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/swordbill-lab.html": {
      companion: "miao", sticker: { id: "side-biter", label: "用嘴扑空员", emoji: "⚔️" },
      card: { series: "物理实验", discovery: "长剑先劈开鱼群才散开，用嘴去咬会扑空。还是同一只纸鱼。", fact: "因为要先劈，所以一咬就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tarpons.html": {
      companion: "bo", sticker: { id: "surf-roller", label: "翻出吸气员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "大海鲢滚出水面吸一口空气才喘得过。", fact: "不是金枪鱼那种摆尾游。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/surfroll-lab.html": {
      companion: "miao", sticker: { id: "deep-choker", label: "沉着闷着员", emoji: "🔄" },
      card: { series: "物理实验", discovery: "滚出水面吸气才喘得过，一直沉着会闷着。还是同一只纸鱼。", fact: "因为要吸气，所以一沉就闷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/stag-beetles.html": {
      companion: "bo", sticker: { id: "jaw-wrestler", label: "大颚顶开员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "锹甲两片大颚顶住，才把对方推开。", fact: "不是独角仙那种头角。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/jawwrestle-lab.html": {
      companion: "miao", sticker: { id: "soft-pusher", label: "撞头摔倒员", emoji: "🦌" },
      card: { series: "物理实验", discovery: "大颚顶住才推得开，头去撞自己会摔倒。还是同一只纸甲。", fact: "因为要顶，所以一撞就倒。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/centipedes.html": {
      companion: "bo", sticker: { id: "fang-forcer", label: "前脚当牙员", emoji: "🐛" },
      card: { series: "自然观察", discovery: "蜈蚣最前面那一对脚变成牙，才抓得住。", fact: "不是天牛那种长角。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/forcipule-lab.html": {
      companion: "miao", sticker: { id: "bare-feeler", label: "后脚踩空员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "第一对脚当牙才抓得住，后面的脚去踩会踩空。还是同一只纸蚣。", fact: "因为牙在最前，所以一后就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/weevils.html": {
      companion: "bo", sticker: { id: "seed-driller", label: "长吻钻进员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "象甲长吻钻进去，才钻得进籽。", fact: "不是天牛那种啃树皮。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/drillseed-lab.html": {
      companion: "miao", sticker: { id: "blunt-bumper", label: "咬一口滑掉员", emoji: "🌰" },
      card: { series: "物理实验", discovery: "长吻钻进去才钻得进，用牙咬一口会咬滑。还是同一只纸甲。", fact: "因为要钻，所以一咬就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/glowworms.html": {
      companion: "bo", sticker: { id: "silk-glower", label: "丝上亮着员", emoji: "✨" },
      card: { series: "自然观察", discovery: "发光虫吊在洞顶的丝上亮着，飞虫才自己来。", fact: "不是萤火虫那种飞着亮。也不要摸真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/ceilglow-lab.html": {
      companion: "miao", sticker: { id: "dark-hanger", label: "灯关没人来员", emoji: "🧵" },
      card: { series: "物理实验", discovery: "丝上亮着飞虫才自己来，灯关着就没人来。还是同一只纸虫。", fact: "因为要亮，所以一关就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/chinchillas.html": {
      companion: "bo", sticker: { id: "dust-roller", label: "滚灰干得快员", emoji: "🐭" },
      card: { series: "自然观察", discovery: "龙猫在细灰里打滚，毛才干得快。", fact: "不是土拨鼠那种挖洞。也不要抓真龙猫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dustroll-lab.html": {
      companion: "miao", sticker: { id: "wet-skipper", label: "湿着粘着员", emoji: "🌫️" },
      card: { series: "物理实验", discovery: "在灰里打滚毛才干得快，毛湿着不滚会粘着。还是同一只纸猫。", fact: "因为灰能带走湿，所以一不滚就粘。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bichirs.html": {
      companion: "bo", sticker: { id: "hole-breather", label: "喷孔吸气员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "多鳍鱼把头伸出水面，喷孔吸一口空气才喘得过。", fact: "不是巨骨舌鱼那种大嘴吸气。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/spiracle-lab.html": {
      companion: "miao", sticker: { id: "gill-puffer", label: "靠鳃闷着员", emoji: "💨" },
      card: { series: "物理实验", discovery: "喷孔吸气才喘得过，只靠鳃会闷着。还是同一只纸鱼。", fact: "因为浅水气少，所以一靠鳃就闷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/quetzals.html": {
      companion: "bo", sticker: { id: "train-shower", label: "长尾展开员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "凤尾绿咬鹃尾巴又长又弯，飞的时候才看得见信号。", fact: "不是孔雀开屏。也不要追真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tailtrain-lab.html": {
      companion: "miao", sticker: { id: "tail-folder", label: "卷尾认不出员", emoji: "🎀" },
      card: { series: "物理实验", discovery: "长尾展开飞才看得见，尾巴卷着就认不出。还是同一只纸鸟。", fact: "因为信号在长尾上，所以一卷就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/dustbath-lab.html": {
      companion: "miao", sticker: { id: "mat-furred", label: "浇水贴缕员", emoji: "🌫️" },
      card: { series: "物理实验", discovery: "同一只纸龙猫。灰里打个滚毛才干松；水一浇就贴成缕。", fact: "因为要滚灰，所以一浇水就贴。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/marlins.html": {
      companion: "bo", sticker: { id: "bill-slasher", label: "长吻打散员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "枪鱼用长吻把鱼群打散才吃得到。", fact: "不是旗鱼那种背帆立起来。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rostrum-lab.html": {
      companion: "miao", sticker: { id: "mouth-misser", label: "用嘴扑空员", emoji: "🗡️" },
      card: { series: "物理实验", discovery: "长吻打散才吃得到，用嘴去咬会扑空。还是同一只纸鱼。", fact: "因为要先打散，所以一咬就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/caracaras.html": {
      companion: "bo", sticker: { id: "walk-hunter", label: "地上走找员", emoji: "🦅" },
      card: { series: "自然观察", discovery: "卡拉卡拉在地上走着找，才找得到腐肉。", fact: "不是秃鹫那种踩热气。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/walkhunt-lab.html": {
      companion: "miao", sticker: { id: "soar-misser", label: "天盯错过员", emoji: "🚶" },
      card: { series: "物理实验", discovery: "地上走着找才找得到，停在天上盯会错过。还是同一只纸鸟。", fact: "因为腐肉在地上，所以一盯天就错过。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pikes.html": {
      companion: "bo", sticker: { id: "lie-waiter", label: "躺着等冲员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "狗鱼身子笔直躺在水草里等，鱼游近才冲得出去。", fact: "不是雀鳝那种长嘴夹。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/liewait-lab.html": {
      companion: "miao", sticker: { id: "chase-stirrer", label: "去追搅浑员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "躺着等才冲得出去，自己去追会把水搅浑。还是同一只纸鱼。", fact: "因为要等近，所以一追就浑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/olm.html": {
      companion: "bo", sticker: { id: "skin-feeler", label: "皮肤听振员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "洞螈靠皮肤和水里的振动才找得到路。", fact: "不是油鸱那种洞里咔咔叫。也不要进真洞摸它。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cavesense-lab.html": {
      companion: "miao", sticker: { id: "eye-bumper", label: "眼看撞墙员", emoji: "👂" },
      card: { series: "物理实验", discovery: "皮肤听振动才找得到路，靠眼睛看会撞墙。还是同一只纸螈。", fact: "因为洞里没光，所以一看就撞。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/millipedes.html": {
      companion: "bo", sticker: { id: "coil-armer", label: "卷球挡住员", emoji: "🐛" },
      card: { series: "自然观察", discovery: "马陆身子卷成球，甲才挡得住。", fact: "不是蜈蚣那种前脚当牙。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/coilplate-lab.html": {
      companion: "miao", sticker: { id: "cyan-leaker", label: "摊开被啄员", emoji: "🛡️" },
      card: { series: "物理实验", discovery: "身子卷成球才挡得住，身子摊开会被啄到。还是同一只纸陆。", fact: "因为甲要合上，所以一摊就被啄。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/diving-beetles.html": {
      companion: "bo", sticker: { id: "bubble-taker", label: "带气喘过员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "龙虱屁股带着气泡，才在水下喘得过。", fact: "不是萤火虫那种发光。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/underair-lab.html": {
      companion: "miao", sticker: { id: "dry-sinker", label: "放气闷着员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "屁股带气泡才喘得过，气泡放掉会闷着。还是同一只纸虱。", fact: "因为气在泡里，所以一放就闷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bowfins.html": {
      companion: "bo", sticker: { id: "air-poucher", label: "鳔当肺吸员", emoji: "🐟" },
      card: { series: "自然观察", discovery: "弓鳍鱼把鳔当肺吸气，浑水里才喘得过。", fact: "不是雀鳝那种长嘴。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lungpouch-lab.html": {
      companion: "miao", sticker: { id: "gill-only", label: "靠鳃闷着员", emoji: "🫁" },
      card: { series: "物理实验", discovery: "鳔当肺吸气才喘得过，只靠鳃会闷着。还是同一只纸鱼。", fact: "因为水浑，所以一靠鳃就闷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/trapdoor-spiders.html": {
      companion: "bo", sticker: { id: "lid-waiter", label: "虚掩等扑员", emoji: "🕷️" },
      card: { series: "自然观察", discovery: "活板门蛛把盖子虚掩着等，才扑得到。", fact: "不是幽灵蛛那种算路。也不要挖真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lidwait-lab.html": {
      companion: "miao", sticker: { id: "open-ambusher", label: "大开被看见员", emoji: "🚪" },
      card: { series: "物理实验", discovery: "盖子虚掩等才扑得到，盖子大开会被看见。还是同一只纸蛛。", fact: "因为要藏着，所以一大开就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pillbugs.html": {
      companion: "bo", sticker: { id: "pill-roller", label: "卷球啄不动员", emoji: "🪨" },
      card: { series: "自然观察", discovery: "鼠妇卷成小球，才啄不动。", fact: "不是蜈蚣那种前脚当牙。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pillroll-lab.html": {
      companion: "miao", sticker: { id: "long-slider", label: "摊开被啄员", emoji: "⚪" },
      card: { series: "物理实验", discovery: "卷成小球才啄不动，身子摊开会被啄到。还是同一只纸妇。", fact: "因为甲要合上，所以一摊就被啄。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sponges.html": {
      companion: "bo", sticker: { id: "pore-pumper", label: "泵孔滤到员", emoji: "🧽" },
      card: { series: "自然观察", discovery: "海绵小孔吸水、大孔喷出去，才滤得到吃的。", fact: "不是扇贝那种拍壳。也不要采真海绵。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/porepump-lab.html": {
      companion: "miao", sticker: { id: "solid-blocker", label: "堵孔饿着员", emoji: "💧" },
      card: { series: "物理实验", discovery: "小孔吸大孔喷才滤得到，孔堵住会饿着。还是同一块纸绵。", fact: "因为要泵，所以一堵就饿。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/comb-jellies.html": {
      companion: "bo", sticker: { id: "comb-rower", label: "栉条划动员", emoji: "🪼" },
      card: { series: "自然观察", discovery: "栉水母八排栉条划水，才游得动。", fact: "不是海星那种翻腕。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rowcomb-lab.html": {
      companion: "miao", sticker: { id: "flap-drifter", label: "乱抖原地转员", emoji: "🌈" },
      card: { series: "物理实验", discovery: "栉条划水才游得动，身子乱抖会原地转。还是同一只纸母。", fact: "因为要划，所以一抖就转。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bromeliads.html": {
      companion: "bo", sticker: { id: "tank-holder", label: "叶池存住员", emoji: "🌿" },
      card: { series: "自然观察", discovery: "凤梨科叶子抱成小池，才存得住水。", fact: "不是猪笼草那种滑壁。也不要掰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tankwater-lab.html": {
      companion: "miao", sticker: { id: "drip-loser", label: "摊开流走员", emoji: "🥣" },
      card: { series: "物理实验", discovery: "叶子抱成小池才存得住，叶子摊开水流走。还是同一株纸科。", fact: "因为水要抱着，所以一摊就走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/assassin-bugs.html": {
      companion: "bo", sticker: { id: "beak-stabber", label: "喙扎吸到员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "猎蝽把喙扎进去吸，才吸得到。", fact: "不是天牛那种啃树皮。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/beakstab-lab.html": {
      companion: "miao", sticker: { id: "empty-poker", label: "咬一口滑掉员", emoji: "💉" },
      card: { series: "物理实验", discovery: "喙扎进去吸才吸得到，用牙咬一口会咬滑。还是同一只纸蝽。", fact: "因为要扎吸，所以一咬就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/backswimmers.html": {
      companion: "bo", sticker: { id: "belly-rower", label: "仰划划快员", emoji: "🐛" },
      card: { series: "自然观察", discovery: "仰泳蝽肚皮朝上划，才划得快。", fact: "不是划蝽那种肚皮朝下。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bellyup-lab.html": {
      companion: "miao", sticker: { id: "back-sinker", label: "俯划划不动员", emoji: "🔄" },
      card: { series: "物理实验", discovery: "肚皮朝上划才划得快，背朝上划会划不动。还是同一只纸蝽。", fact: "因为桨在上面，所以一俯就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/decorator-crabs.html": {
      companion: "bo", sticker: { id: "garden-backer", label: "背上贴藻员", emoji: "🦀" },
      card: { series: "自然观察", discovery: "装饰蟹把海藻海绵贴在背上，才认不出来。", fact: "不是招潮蟹那种举大螯。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/decoback-lab.html": {
      companion: "miao", sticker: { id: "bare-crab", label: "光背被看见员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "背上贴海藻才认不出，背上光光一下子被看见。还是同一只纸蟹。", fact: "因为要伪装，所以一光就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/rafflesias.html": {
      companion: "bo", sticker: { id: "fly-stinker", label: "腐臭引来员", emoji: "🌺" },
      card: { series: "自然观察", discovery: "大花草花心发出腐臭，苍蝇才自己来。", fact: "不是猪笼草那种滑壁。也不要采真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flystink-lab.html": {
      companion: "miao", sticker: { id: "sweet-bloom", label: "没味没人来员", emoji: "🪰" },
      card: { series: "物理实验", discovery: "花心发出腐臭才引得来，花心没味就没人来。还是同一朵纸花。", fact: "因为蝇要闻臭，所以一没味就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/welwitschia.html": {
      companion: "bo", sticker: { id: "two-leafer", label: "两叶一直长员", emoji: "🌿" },
      card: { series: "自然观察", discovery: "百岁兰一辈子就两片叶子一直长，才一直遮得住。", fact: "不是松树那种很多针。也不要掰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/twoleaf-lab.html": {
      companion: "miao", sticker: { id: "many-leafer", label: "掉叶晒干员", emoji: "🍃" },
      card: { series: "物理实验", discovery: "就两片叶子一直长才遮得住，叶子一片片掉会晒干。还是同一株纸兰。", fact: "因为就这两片，所以一掉就晒干。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/baobabs.html": {
      companion: "bo", sticker: { id: "fat-storer", label: "肥干存水员", emoji: "🌳" },
      card: { series: "自然观察", discovery: "猴面包树树干又肥又能存水，旱季才撑得住。", fact: "不是松树那种细干。也不要剥真树皮。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fatstore-lab.html": {
      companion: "miao", sticker: { id: "thin-thirster", label: "细干撑不住员", emoji: "💧" },
      card: { series: "物理实验", discovery: "树干存着水才撑得住，树干细细的撑不住。还是同一棵纸树。", fact: "因为水在干里，所以一细就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/christmas-tree-worms.html": {
      companion: "bo", sticker: { id: "double-hider", label: "双树缩进员", emoji: "🎄" },
      card: { series: "自然观察", discovery: "圣诞树虫两棵树一缩进管子，才躲得过。", fact: "不是海绵那种泵孔。也不要抠真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/doubletree-lab.html": {
      companion: "miao", sticker: { id: "bare-tube", label: "留着被咬员", emoji: "🕳️" },
      card: { series: "物理实验", discovery: "两棵树一缩进管才躲得过，树留在外面会被咬到。还是同一只纸虫。", fact: "因为要藏进管，所以一留就被咬。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sequoias.html": {
      companion: "bo", sticker: { id: "fog-drinker", label: "叶子接雾员", emoji: "🌲" },
      card: { series: "自然观察", discovery: "巨杉叶子从雾里接水，树顶才喝得到。", fact: "不是纳米布甲虫那种背上凸点。也不要剥真树皮。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tallxylem-lab.html": {
      companion: "miao", sticker: { id: "root-thirster", label: "只靠根喝不到员", emoji: "🌫️" },
      card: { series: "物理实验", discovery: "叶子从雾里接水树顶才喝得到，只靠根吸到不了那么高。还是同一棵纸杉。", fact: "因为太高了，所以一靠根就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/spadefoot-toads.html": {
      companion: "bo", sticker: { id: "rain-burster", label: "下雨才出员", emoji: "🐸" },
      card: { series: "自然观察", discovery: "锄足蟾下雨才从沙里出来产卵，小蝌蚪才赶得及。", fact: "不是普通蟾蜍那种天天出来。也不要挖真沙。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rainburst-lab.html": {
      companion: "miao", sticker: { id: "dry-waiter", label: "干出干死员", emoji: "🌧️" },
      card: { series: "物理实验", discovery: "下雨才出来才赶得及，天干着出来会干死。还是同一只纸蟾。", fact: "因为水塘很短，所以一干就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/brittlestars.html": {
      companion: "bo", sticker: { id: "arm-dropper", label: "丢腕逃掉员", emoji: "⭐" },
      card: { series: "自然观察", discovery: "蛇尾被抓住时先丢掉那条腕才逃得掉。", fact: "不是海星那种翻腕走。也不要掰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/armdrop-lab.html": {
      companion: "miao", sticker: { id: "held-dragger", label: "连着被拖员", emoji: "✂️" },
      card: { series: "物理实验", discovery: "丢掉那条腕才逃得掉，腕连着不放会被拖走。还是同一只纸尾。", fact: "因为要先丢，所以一连就被拖。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lobsters.html": {
      companion: "bo", sticker: { id: "tail-kicker", label: "弹尾逃开员", emoji: "🦞" },
      card: { series: "自然观察", discovery: "龙虾尾巴往下一弹才倒着逃得开。", fact: "不是螃蟹横着走。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/kicktail-lab.html": {
      companion: "miao", sticker: { id: "stuck-walker", label: "不弹逃不掉员", emoji: "↩️" },
      card: { series: "物理实验", discovery: "尾巴往下一弹才逃得开，尾巴不弹就逃不掉。还是同一只纸虾。", fact: "因为要弹水，所以一不弹就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/orchid-mantises.html": {
      companion: "bo", sticker: { id: "petal-waiter", label: "展瓣等到员", emoji: "🌸" },
      card: { series: "自然观察", discovery: "兰花螳螂把腿展成花瓣才等得到。", fact: "不是普通螳螂那种挥臂打。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/petalwait-lab.html": {
      companion: "miao", sticker: { id: "bug-spotted", label: "收腿被看见员", emoji: "🪴" },
      card: { series: "物理实验", discovery: "腿展成花瓣才等得到，腿收着像虫子会被看见。还是同一只纸螂。", fact: "因为要像花，所以一收就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/box-jellies.html": {
      companion: "bo", sticker: { id: "cube-steerer", label: "方伞垂须员", emoji: "🪼" },
      card: { series: "自然观察", discovery: "比较箱水母和圆伞乱漂的。箱水母方伞四角垂须，才游得准去扎。", fact: "真箱水母会蜇，不要去碰。", next: "对照工坊，猜另一头为什么不成。", accent: "#0e7490" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/cubesting-lab.html": {
      companion: "miao", sticker: { id: "round-drifter", label: "圆伞乱漂员", emoji: "◻️" },
      card: { series: "物理实验", discovery: "同一只纸箱水母。方伞四角垂须才游得准去扎；圆伞乱漂就扎不准。", fact: "因为要方伞，所以一圆就漂。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hellbenders.html": {
      companion: "bo", sticker: { id: "wrinkle-breather", label: "皱皮喘过员", emoji: "🦎" },
      card: { series: "自然观察", discovery: "大鲵皮肤皱皱的、水流过才喘得过。", fact: "不是普通蝾螈那种湿皮。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wrinkleskin-lab.html": {
      companion: "miao", sticker: { id: "smooth-choker", label: "光滑闷着员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "皮肤皱皱的水流过才喘得过，皮肤光滑就闷着。还是同一只纸鲵。", fact: "因为褶皱能过水，所以一光就闷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/titan-arums.html": {
      companion: "bo", sticker: { id: "heat-stinker", label: "花心发热员", emoji: "🌺" },
      card: { series: "自然观察", discovery: "巨花魔芋花心先热起来，臭味才散得远。", fact: "不是大花草那种整朵发臭。也不要采真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/giantbloom-lab.html": {
      companion: "miao", sticker: { id: "cold-quiet", label: "凉心闻不到员", emoji: "♨️" },
      card: { series: "物理实验", discovery: "花心先热起来臭味才散得远，花心凉着虫子闻不到。还是同一株纸芋。", fact: "因为热能带味，所以一凉就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/jumping-spiders.html": {
      companion: "bo", sticker: { id: "range-jumper", label: "测距跳准员", emoji: "🕷️" },
      card: { series: "自然观察", discovery: "跳蛛先用两只大眼测距再跳，才跳得准。", fact: "不是孔雀蛛那种开屏。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pouncejump-lab.html": {
      companion: "miao", sticker: { id: "blind-leaper", label: "乱跳跳空员", emoji: "📏" },
      card: { series: "物理实验", discovery: "先测距再跳才跳得准，闭着眼乱跳会跳空。还是同一只纸蛛。", fact: "因为要先看准，所以一闭眼就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/man-of-war.html": {
      companion: "bo", sticker: { id: "gas-floater", label: "气囊漂住员", emoji: "⛵" },
      card: { series: "自然观察", discovery: "僧帽水母上面那个气囊鼓着才漂在面上。", fact: "不是栉水母那种栉条划。也不要碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/gasfloat-lab.html": {
      companion: "miao", sticker: { id: "sack-sinker", label: "瘪囊沉下去员", emoji: "🎈" },
      card: { series: "物理实验", discovery: "气囊鼓着才漂在面上，气囊瘪了就沉。还是同一只纸母。", fact: "因为气在囊里，所以一瘪就沉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/resurrection-plants.html": {
      companion: "bo", sticker: { id: "wet-opener", label: "浇水打开员", emoji: "🌿" },
      card: { series: "自然观察", discovery: "复苏卷柏一浇水叶子打开，又能做糖。", fact: "不是生石花那种装石头。也不要拔真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rehydrate-lab.html": {
      companion: "miao", sticker: { id: "dry-curler", label: "干着停着员", emoji: "💧" },
      card: { series: "物理实验", discovery: "一浇水叶子打开才又能做糖，一直卷着就停着。还是同一株纸柏。", fact: "因为要湿，所以一干就停。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/strangler-figs.html": {
      companion: "bo", sticker: { id: "fig-wraper", label: "气根围筒员", emoji: "🌳" },
      card: { series: "自然观察", discovery: "绞杀榕气根围成筒，才自己站得住。", fact: "不是松树那种自己长。也不要砍真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/figstrangle-lab.html": {
      companion: "miao", sticker: { id: "free-stem", label: "垂着靠别人员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "气根围成筒才自己站得住，气根垂着不围就还靠别人。还是同一棵纸榕。", fact: "因为要围成筒，所以一垂就靠别人。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lichens.html": {
      companion: "bo", sticker: { id: "two-lifer", label: "菌藻在一起员", emoji: "🪨" },
      card: { series: "自然观察", discovery: "地衣是真菌和藻类在一起，石头上也能活。", fact: "不是仙人掌那种自己存水。也不要刮真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/twolife-lab.html": {
      companion: "miao", sticker: { id: "solo-cruster", label: "只有一边活不成员", emoji: "🤝" },
      card: { series: "物理实验", discovery: "菌和藻在一起才活得成，只有一边就活不成。还是同一块纸衣。", fact: "因为要两家，所以一分开就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/earwigs.html": {
      companion: "bo", sticker: { id: "pincer-gripper", label: "尾钳张开员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "蠼螋尾巴那对钳子张开护着，才挡得住。", fact: "不是天牛那种长角。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pincertail-lab.html": {
      companion: "miao", sticker: { id: "loose-tailer", label: "垂钳被啄员", emoji: "✂️" },
      card: { series: "物理实验", discovery: "尾钳张开护着才挡得住，尾钳垂着会被啄到。还是同一只纸螋。", fact: "因为要张开，所以一垂就被啄。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/katydids.html": {
      companion: "bo", sticker: { id: "leaf-singer", label: "翅摩擦声员", emoji: "🦗" },
      card: { series: "自然观察", discovery: "螽斯翅膀摩擦出声，对面才听得见。", fact: "不是叶䗛那种装叶子。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/leafsong-lab.html": {
      companion: "miao", sticker: { id: "green-spotted", label: "翅不动没声员", emoji: "🎵" },
      card: { series: "物理实验", discovery: "翅膀摩擦出声才听得见，翅膀不动就没声。还是同一只纸斯。", fact: "因为声在翅上，所以一不动就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/treehoppers.html": {
      companion: "bo", sticker: { id: "thorn-faker", label: "背上像刺员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "角蝉背上那块长得像刺，才认成刺。", fact: "不是叶䗛那种装叶子。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/thornfake-lab.html": {
      companion: "miao", sticker: { id: "smooth-hopper", label: "光背被看见员", emoji: "🌵" },
      card: { series: "物理实验", discovery: "背上那块像刺才认成刺，背上光光会被看见。还是同一只纸蝉。", fact: "因为要像刺，所以一光就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/vampire-squid.html": {
      companion: "bo", sticker: { id: "ear-finner", label: "耳鳍轻划员", emoji: "🦑" },
      card: { series: "自然观察", discovery: "幽灵蛸头上那对耳鳍轻轻划，才省力游。", fact: "不是鱿鱼那种喷水。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/earfins-lab.html": {
      companion: "miao", sticker: { id: "jet-sinker", label: "乱喷累着员", emoji: "👂" },
      card: { series: "物理实验", discovery: "耳鳍轻轻划才省力游，整身乱喷会累着。还是同一只纸蛸。", fact: "因为深海要省，所以一喷就累。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dumbo-octopuses.html": {
      companion: "bo", sticker: { id: "ear-swimmer", label: "耳鳍扇稳员", emoji: "🐙" },
      card: { series: "自然观察", discovery: "小飞象章鱼耳鳍上下扇，才游得稳。", fact: "不是章鱼那种腕爬。也不要捞真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/earswim-lab.html": {
      companion: "miao", sticker: { id: "arm-sinker", label: "腕划翻着员", emoji: "👂" },
      card: { series: "物理实验", discovery: "耳鳍上下扇才游得稳，腕去划会翻来翻去。还是同一只纸鱼。", fact: "因为耳鳍像翅膀，所以一用腕就翻。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/honeypot-ants.html": {
      companion: "bo", sticker: { id: "honey-gutter", label: "胀腹存蜜员", emoji: "🐜" },
      card: { series: "自然观察", discovery: "蜜罐蚁有的工蚁肚子胀成蜜罐，旱季同伴才舔得到。", fact: "不是普通蚁搬叶子。也不要挖真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/honeygut-lab.html": {
      companion: "miao", sticker: { id: "empty-gaster", label: "瘪腹没得存员", emoji: "🍯" },
      card: { series: "物理实验", discovery: "肚子胀成蜜罐才存得住，肚子瘪着就没得存。还是同一只纸蚁。", fact: "因为蜜在肚子里，所以一瘪就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/water-scorpions.html": {
      companion: "bo", sticker: { id: "tail-siphoner", label: "尾管伸出员", emoji: "🦂" },
      card: { series: "自然观察", discovery: "比较水蝎和管子缩着的。水蝎把尾巴管子伸出水面，才喘得过。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#0e7490" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/tailsiphon-lab.html": {
      companion: "miao", sticker: { id: "dunk-choker", label: "管子缩闷员", emoji: "🥤" },
      card: { series: "物理实验", discovery: "同一只纸水蝎。尾巴管子伸出水面才喘得过；管子缩着就闷着。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/giant-tube-worms.html": {
      companion: "bo", sticker: { id: "bacteria-feeder", label: "管内细菌员", emoji: "🪱" },
      card: { series: "自然观察", discovery: "比较巨型管虫和管子里没有细菌的。管虫靠管内细菌把硫变成糖，才活得下去。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#0e7490" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/nomouth-lab.html": {
      companion: "miao", sticker: { id: "empty-tuber", label: "管内没菌员", emoji: "🧪" },
      card: { series: "物理实验", discovery: "同一根纸管虫。管子里有细菌才把硫变成糖；没有细菌就饿着。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/giant-water-bugs.html": {
      companion: "bo", sticker: { id: "juice-injector", label: "扎进再注入员", emoji: "🪲" },
      card: { series: "自然观察", discovery: "比较负子蝽和只抱着不扎的。负子蝽喙扎进再注入，猎物才软了。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#0e7490" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/toeinject-lab.html": {
      companion: "miao", sticker: { id: "hug-escaper", label: "只抱挣开员", emoji: "💉" },
      card: { series: "物理实验", discovery: "同一只纸负子蝽。喙扎进再注入才软了；只抱着不扎就挣开了。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/jerboas.html": {
      companion: "bo", sticker: { id: "long-bounder", label: "后腿一蹦员", emoji: "🐭" },
      card: { series: "自然观察", discovery: "比较跳鼠和四脚跑的。跳鼠后腿一下蹦出去，才逃得掉。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#0e7490" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/nightbound-lab.html": {
      companion: "miao", sticker: { id: "four-caught", label: "四脚被抓员", emoji: "🌙" },
      card: { series: "物理实验", discovery: "同一只纸跳鼠。后腿一下蹦出去才逃得掉；四脚跑就给抓住。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/naked-mole-rats.html": {
      companion: "bo", sticker: { id: "out-toother", label: "门牙露外员", emoji: "🐀" },
      card: { series: "自然观察", discovery: "比较裸鼹鼠和牙在嘴里的。裸鼹鼠门牙在嘴唇外面，才不会把土吃进去。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#44403c" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/incisordig-lab.html": {
      companion: "miao", sticker: { id: "mouth-filler", label: "牙在嘴里塞土员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "同一只纸裸鼹鼠。门牙在嘴唇外面才不会把土吃进去；牙在嘴里就塞满土。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/slime-molds.html": {
      companion: "bo", sticker: { id: "net-finder", label: "连网找燕麦员", emoji: "🟡" },
      card: { series: "自然观察", discovery: "比较黏菌和分成小点的。黏菌连成一片网，才找得到燕麦。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#44403c" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/creepfan-lab.html": {
      companion: "miao", sticker: { id: "split-loster", label: "分点找不到员", emoji: "🕸️" },
      card: { series: "物理实验", discovery: "同一摊纸黏菌。连成一片网才找得到燕麦；分成小点就找不到。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/saiga.html": {
      companion: "bo", sticker: { id: "balloon-noser", label: "鼻子鼓口袋员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "赛加羚羊鼻子鼓成口袋，才滤得了沙。", fact: "不是跳羚那种直蹦。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/nosefan-lab.html": {
      companion: "miao", sticker: { id: "flat-noser", label: "扁鼻呛着员", emoji: "👃" },
      card: { series: "物理实验", discovery: "鼻子鼓成口袋才滤得了沙，鼻子扁扁的就呛着。还是同一只纸羊。", fact: "因为沙要从口袋滤，所以一扁就呛。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/markhor.html": {
      companion: "bo", sticker: { id: "twist-horner", label: "角拧螺旋员", emoji: "🐐" },
      card: { series: "自然观察", discovery: "马克霍尔羊角拧成螺旋，才顶得住。", fact: "不是大角羊那种对撞。也不要靠近真野羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/twisthorn-lab.html": {
      companion: "miao", sticker: { id: "straight-butter", label: "直角滑开员", emoji: "🌀" },
      card: { series: "物理实验", discovery: "角拧成螺旋才顶得住，角直直的会滑开。还是同一只纸羊。", fact: "因为螺旋才咬得住，所以一直就滑开。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/solenodons.html": {
      companion: "bo", sticker: { id: "groove-biter", label: "沟牙送毒员", emoji: "🦔" },
      card: { series: "自然观察", discovery: "沟齿鼩牙上那道沟把毒送进去，猎物才软了。", fact: "不是草原犬鼠那种堆烟囱。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/groovevenom-lab.html": {
      companion: "miao", sticker: { id: "blunt-chewer", label: "没沟咬不住员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "牙上那道沟把毒送进去才软了，牙上没沟就咬不住。还是同一只纸鼩。", fact: "因为毒走那道沟，所以一没沟就送不进去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sitatunga.html": {
      companion: "bo", sticker: { id: "splay-wader", label: "蹄子张开员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "林羚蹄子张开，才踩得住沼泽。", fact: "不是弯角剑羚那种宽蹄走沙。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/swamptoe-lab.html": {
      companion: "miao", sticker: { id: "sink-hoofer", label: "并蹄陷下去员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "蹄子张开才踩得住沼泽，蹄子并着就陷下去。还是同一只纸羚。", fact: "因为要张开，所以一并就陷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/chevrotains.html": {
      companion: "bo", sticker: { id: "fang-deerer", label: "长牙戳出去员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "鼷鹿那对长牙戳出去，才挡住。", fact: "不是蹄兔那种湿垫。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fangdeer-lab.html": {
      companion: "miao", sticker: { id: "gum-browser", label: "没牙被咬员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "那对长牙戳出去才挡住，没有长牙会被咬。还是同一只纸鹿。", fact: "因为没有角，所以一没牙就挡不住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/clouded-leopards.html": {
      companion: "bo", sticker: { id: "cloud-gaper", label: "嘴张特别大员", emoji: "🐆" },
      card: { series: "自然观察", discovery: "云豹嘴张得特别大，才咬得动。", fact: "不是雪豹那种粗尾巴。也不要靠近真豹。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/widegape-lab.html": {
      companion: "miao", sticker: { id: "shut-biter", label: "张不大咬不动员", emoji: "😮" },
      card: { series: "物理实验", discovery: "嘴张得特别大才咬得动，嘴张不大就咬不动。还是同一只纸豹。", fact: "因为要张得大，所以一小张就咬不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/klipspringers.html": {
      companion: "bo", sticker: { id: "point-stander", label: "蹄尖立石员", emoji: "🐐" },
      card: { series: "自然观察", discovery: "岩羚蹄尖立在石头上，才站得住。", fact: "不是北山羊那种悬崖蹄。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hoofpoint-lab.html": {
      companion: "miao", sticker: { id: "pad-slider", label: "平放滑下去员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "蹄尖立在石头上才站得住，蹄掌平放会滑下去。还是同一只纸羚。", fact: "因为要立尖，所以一平放就滑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bobtail-squids.html": {
      companion: "bo", sticker: { id: "vent-glower", label: "腹光跟月员", emoji: "🦑" },
      card: { series: "自然观察", discovery: "比较耳乌贼和灯关着的。耳乌贼肚子朝下发光，从下面看才跟月光一样。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#0e7490" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/ventglow-lab.html": {
      companion: "miao", sticker: { id: "dark-spotted", label: "灯关被看见员", emoji: "💡" },
      card: { series: "物理实验", discovery: "同一只纸耳乌贼。肚子朝下发光才从下面看跟月光一样；灯关着就会被看见。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cockroaches.html": {
      companion: "bo", sticker: { id: "cerci-feeler", label: "尾须感风员", emoji: "🪳" },
      card: { series: "自然观察", discovery: "比较蟑螂和尾须没了的。蟑螂尾须先感到风，才逃得掉。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#0e7490" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/feelair-lab.html": {
      companion: "miao", sticker: { id: "no-cerci", label: "没尾须被按员", emoji: "💨" },
      card: { series: "物理实验", discovery: "同一只纸蟑螂。尾须先感到风才逃得掉；尾须没了就给按住。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/fireworms.html": {
      companion: "bo", sticker: { id: "bristle-burner", label: "刚毛竖扎员", emoji: "🔥" },
      card: { series: "自然观察", discovery: "比较火刺虫和刚毛躺着的。火刺虫刚毛竖起来，才扎得人。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#0e7490" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/bristleburn-lab.html": {
      companion: "miao", sticker: { id: "flat-bristler", label: "刚毛躺着员", emoji: "📌" },
      card: { series: "物理实验", discovery: "同一只纸火刺虫。刚毛竖起来才扎得人；躺着就扎不了。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/kangaroo-rats.html": {
      companion: "bo", sticker: { id: "dry-seeder", label: "干籽够水员", emoji: "🐹" },
      card: { series: "自然观察", discovery: "比较袋鼠鼠和去找水坑的。袋鼠鼠靠种子里的水，才够用。", fact: "不要去碰真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#0e7490" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/dryseed-lab.html": {
      companion: "miao", sticker: { id: "puddle-runner", label: "找水坑暴露员", emoji: "🌱" },
      card: { series: "物理实验", discovery: "同一只纸袋鼠鼠。种子里的水才够用；去找水坑就会暴露。", fact: "因为差在这一件，所以另一头不成。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bongos.html": {
      companion: "bo", sticker: { id: "stripe-hider", label: "白条藏树影员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "邦戈羚身上白条跟着树影，才认成树。", fact: "不是弯角剑羚那种宽蹄走沙。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/stripehide-lab.html": {
      companion: "miao", sticker: { id: "plain-shower", label: "一块色被看见员", emoji: "🌲" },
      card: { series: "物理实验", discovery: "身上白条跟着树影才认成树，身上一块色就被看见。还是同一只纸羚。", fact: "因为条要跟着影，所以一变成一块色就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/servals.html": {
      companion: "bo", sticker: { id: "ear-tufter", label: "耳簇竖着听员", emoji: "🐱" },
      card: { series: "自然观察", discovery: "薮猫耳朵上那撮毛竖着听，才听得到草里的。", fact: "不是猎豹那种甩尾。也不要靠近真猫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/eartuft-lab.html": {
      companion: "miao", sticker: { id: "round-earer", label: "平耳听不见员", emoji: "👂" },
      card: { series: "物理实验", discovery: "耳朵上那撮毛竖着听才听得到，耳朵平贴就听不见。还是同一只纸猫。", fact: "因为要竖着听，所以一平贴就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/takins.html": {
      companion: "bo", sticker: { id: "oil-wooller", label: "油毛挡雨员", emoji: "🐮" },
      card: { series: "自然观察", discovery: "羚牛毛上那层油挡住雨，才淋不湿。", fact: "不是大角羊那种对撞。也不要靠近真牛。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/oilwool-lab.html": {
      companion: "miao", sticker: { id: "dry-coater", label: "干毛湿透员", emoji: "🌧️" },
      card: { series: "物理实验", discovery: "毛上那层油挡住雨才淋不湿，毛干干的就湿透。还是同一只纸牛。", fact: "因为油挡雨，所以一干就湿透。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/elands.html": {
      companion: "bo", sticker: { id: "spiral-twister", label: "拧角碰上员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "大羚羊角轻轻拧着碰上，才分得清谁大。", fact: "不是弯角剑羚那种宽蹄。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/spiralhorn-lab.html": {
      companion: "miao", sticker: { id: "ram-hurter", label: "直撞顶伤员", emoji: "🌀" },
      card: { series: "物理实验", discovery: "角轻轻拧着碰上才分得清谁大，角直着撞会顶伤。还是同一只纸羊。", fact: "因为要轻轻拧，所以一直撞就顶伤。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/jaguars.html": {
      companion: "bo", sticker: { id: "rosette-pouncer", label: "玫瑰斑藏影员", emoji: "🐆" },
      card: { series: "自然观察", discovery: "美洲豹身上玫瑰斑藏在影里，才扑得到。", fact: "不是猎豹那种甩尾。也不要靠近真豹。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rosettepounce-lab.html": {
      companion: "miao", sticker: { id: "open-sprinter", label: "光身被看见员", emoji: "🌸" },
      card: { series: "物理实验", discovery: "身上玫瑰斑藏在影里才扑得到，身上光光的就被看见。还是同一只纸豹。", fact: "因为斑要藏进影，所以一光就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ocelots.html": {
      companion: "bo", sticker: { id: "dusk-roamer", label: "黄昏才出来员", emoji: "🐱" },
      card: { series: "自然观察", discovery: "豹猫黄昏才出来走，才不被看见。", fact: "不是灵猫那种斑点跑。也不要抓真猫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/duskroam-lab.html": {
      companion: "miao", sticker: { id: "day-misser", label: "白天被看见员", emoji: "🌅" },
      card: { series: "物理实验", discovery: "黄昏才出来走才不被看见，大白天跑就一下子被看见。还是同一只纸猫。", fact: "因为要等黄昏，所以一白天就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/kudu.html": {
      companion: "bo", sticker: { id: "white-chevroner", label: "脖子白人字员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "大捻角羚脖子那道白人字，对面才认得出自己人。", fact: "不是弯角剑羚那种宽蹄。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/whitechevron-lab.html": {
      companion: "miao", sticker: { id: "blank-flanker", label: "光脖认不出员", emoji: "🤍" },
      card: { series: "物理实验", discovery: "脖子那道白人字让对面认出才认得出自己人，脖子光光的就认不出。还是同一只纸羚。", fact: "因为要那道白人字，所以一光就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/caracals.html": {
      companion: "bo", sticker: { id: "tuft-turner", label: "耳尖毛跟着转员", emoji: "🐱" },
      card: { series: "自然观察", discovery: "狞猫耳尖那撮毛跟着转，才听得清方向。", fact: "不是猎豹那种甩尾。也不要靠近真猫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tuftturn-lab.html": {
      companion: "miao", sticker: { id: "flat-earer", label: "光耳听不清员", emoji: "👂" },
      card: { series: "物理实验", discovery: "耳尖那撮毛跟着转才听得清方向，耳尖光光的就听不清。还是同一只纸猫。", fact: "因为要跟着转，所以一光就听不清。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/nyala.html": {
      companion: "bo", sticker: { id: "curl-striper", label: "白条卷着藏员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "尼亚拉身上白条卷着藏，才认成树影。", fact: "不是弯角剑羚那种宽蹄。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/stripecurl-lab.html": {
      companion: "miao", sticker: { id: "plain-nyala", label: "一块色被看见员", emoji: "🌲" },
      card: { series: "物理实验", discovery: "身上白条卷着藏才认成树影，身上一块色就被看见。还是同一只纸羚。", fact: "因为条要卷着藏，所以一变成一块色就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dikdiks.html": {
      companion: "bo", sticker: { id: "snort-alarmer", label: "鼻子一喷警报员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "迪氏羚鼻子一喷发出警报，对面才听得见。", fact: "不是跳羚那种直蹦。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/snortalarm-lab.html": {
      companion: "miao", sticker: { id: "silent-dikdik", label: "不喷听不见员", emoji: "💨" },
      card: { series: "物理实验", discovery: "鼻子一喷发出警报才听得见，鼻子不喷就听不见。还是同一只纸羚。", fact: "因为警报在喷里，所以一不喷就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/muntjacs.html": {
      companion: "bo", sticker: { id: "bark-fanger", label: "叫一声再戳牙员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "麂叫一声再把牙戳出去，才挡住。", fact: "不是鼷鹿那种只戳牙。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/barkfang-lab.html": {
      companion: "miao", sticker: { id: "quiet-munt", label: "闷着被咬员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "叫一声再把牙戳出去才挡住，不叫也不戳牙会被咬。还是同一只纸麂。", fact: "因为要先叫再戳，所以一闷着就挡不住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gorals.html": {
      companion: "bo", sticker: { id: "wool-cliffer", label: "厚毛贴崖员", emoji: "🐐" },
      card: { series: "自然观察", discovery: "斑羚毛厚厚的贴着崖，才冻不住。", fact: "不是北山羊那种悬崖蹄。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cliffwool-lab.html": {
      companion: "miao", sticker: { id: "slick-goral", label: "薄毛冻着员", emoji: "🧥" },
      card: { series: "物理实验", discovery: "毛厚厚的贴着崖才冻不住，毛薄薄的就冻着。还是同一只纸羚。", fact: "因为要厚毛，所以一薄就冻。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/serows.html": {
      companion: "bo", sticker: { id: "mane-blocker", label: "竖鬃挡刺员", emoji: "🐐" },
      card: { series: "自然观察", discovery: "鬣羚脖子那道鬃挡住刺，刺才进不去。", fact: "不是大角羊那种对撞。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/maneblock-lab.html": {
      companion: "miao", sticker: { id: "bare-serow", label: "光脖刺进去员", emoji: "🛡️" },
      card: { series: "物理实验", discovery: "脖子那道鬃挡住刺才进不去，脖子光光的刺会进去。还是同一只纸羚。", fact: "因为鬃挡刺，所以一光就进去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lynxes.html": {
      companion: "bo", sticker: { id: "side-spoter", label: "脸侧毛刷员", emoji: "🐱" },
      card: { series: "自然观察", discovery: "猞猁脸两侧那撮毛刷着，才听得清两边。", fact: "不是薮猫那种耳簇。也不要靠近真猫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sidespot-lab.html": {
      companion: "miao", sticker: { id: "round-lynx", label: "光脸听不清员", emoji: "👂" },
      card: { series: "物理实验", discovery: "脸两侧那撮毛刷着才听得清两边，脸两侧光光的就听不清。还是同一只纸猫。", fact: "因为要两侧刷着，所以一光就听不清。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bobcats.html": {
      companion: "bo", sticker: { id: "stub-tailer", label: "短尾当舵员", emoji: "🐱" },
      card: { series: "自然观察", discovery: "短尾猫尾巴短短的当舵，灌木里才拐得过。", fact: "不是美洲狮那种长尾。也不要靠近真猫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/stubtail-lab.html": {
      companion: "miao", sticker: { id: "long-bob", label: "长尾缠住员", emoji: "✂️" },
      card: { series: "物理实验", discovery: "尾巴短短的当舵才拐得过，尾巴拖得长会缠住。还是同一只纸猫。", fact: "因为灌木要短尾，所以一长就缠住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pumas.html": {
      companion: "bo", sticker: { id: "hind-screamer", label: "后头尖叫员", emoji: "🦁" },
      card: { series: "自然观察", discovery: "美洲狮后头发出尖叫，对面才听得见。", fact: "不是猎豹那种甩尾。也不要靠近真狮。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hindscream-lab.html": {
      companion: "miao", sticker: { id: "roar-faker", label: "学吼吼不出员", emoji: "📢" },
      card: { series: "物理实验", discovery: "后头发出尖叫才听得见，学着吼吼不出来。还是同一只纸狮。", fact: "因为吼不出来，所以一学吼就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/impala.html": {
      companion: "bo", sticker: { id: "stripe-flasher", label: "侧边黑线闪员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "黑斑羚侧边那道黑线闪一下，对面才看得见。", fact: "不是跳羚那种直蹦。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sideflash-lab.html": {
      companion: "miao", sticker: { id: "dull-impala", label: "一块色看不见员", emoji: "⚡" },
      card: { series: "物理实验", discovery: "侧边那道黑线闪一下才看得见，侧边一块色就看不见。还是同一只纸羚。", fact: "因为要闪那道线，所以一变成一块色就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/wildebeest.html": {
      companion: "bo", sticker: { id: "line-crosser", label: "排队过河员", emoji: "🐃" },
      card: { series: "自然观察", discovery: "牛羚排成一列过河，才过得去。", fact: "不是弯角剑羚那种宽蹄。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/gnuwheel-lab.html": {
      companion: "miao", sticker: { id: "mill-drowner", label: "乱冲冲散员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "排成一列过河才过得去，各自乱冲会冲散。还是同一只纸羚。", fact: "因为要排队，所以一乱冲就冲散。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hartebeest.html": {
      companion: "bo", sticker: { id: "high-wither", label: "肩膀特别高员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "狷羚肩膀特别高，才看得见草那边。", fact: "不是大羚羊那种拧角。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/highwithers-lab.html": {
      companion: "miao", sticker: { id: "low-grazer", label: "矮肩看不见员", emoji: "📐" },
      card: { series: "物理实验", discovery: "肩膀特别高才看得见草那边，肩膀矮矮的就看不见。还是同一只纸羚。", fact: "因为肩要高，所以一矮就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gazelles.html": {
      companion: "bo", sticker: { id: "rum-flasher", label: "白臀闪一下员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "瞪羚白臀闪一下，对面才看得见信号。", fact: "不是跳羚那种直蹦。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rumflash-lab.html": {
      companion: "miao", sticker: { id: "hide-rump", label: "臀藏看不见员", emoji: "✨" },
      card: { series: "物理实验", discovery: "白臀闪一下才看得见信号，白臀藏着就看不见。还是同一只纸羚。", fact: "因为要闪，所以一藏就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gerenuk.html": {
      companion: "bo", sticker: { id: "neck-stander", label: "后腿站伸员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "长颈羚后腿站起来伸脖子，才够得到叶子。", fact: "不是迪氏羚那种喷鼻。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/neckstretch-lab.html": {
      companion: "miao", sticker: { id: "four-browser", label: "四脚够不到员", emoji: "🦒" },
      card: { series: "物理实验", discovery: "后腿站起来伸脖子才够得到，四脚够叶子就够不到。还是同一只纸羚。", fact: "因为叶子在高处，所以一四脚就够不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lechwes.html": {
      companion: "bo", sticker: { id: "flood-kneer", label: "长腿踩洪水员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "驴羚膝盖以上的长腿踩进洪水，才走得动。", fact: "不是林羚那种张蹄。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/floodknee-lab.html": {
      companion: "miao", sticker: { id: "short-sinker", label: "短腿陷住员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "膝盖以上的长腿踩进洪水才走得动，腿短短的就陷住。还是同一只纸羚。", fact: "因为水有那么深，所以一短就陷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/viscachas.html": {
      companion: "bo", sticker: { id: "burrow-whistler", label: "洞口一声哨员", emoji: "🐭" },
      card: { series: "自然观察", discovery: "兔鼠洞口一声哨，对面才听得见。", fact: "不是毛丝鼠那种滚尘。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/whistleburrow-lab.html": {
      companion: "miao", sticker: { id: "mute-viscacha", label: "不叫听不见员", emoji: "🎵" },
      card: { series: "物理实验", discovery: "洞口一声哨才听得见，不叫就听不见。还是同一只纸鼠。", fact: "因为哨在洞口，所以一不叫就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/giant-pandas.html": {
      companion: "bo", sticker: { id: "pad-thumber", label: "垫卡住竹子员", emoji: "🐼" },
      card: { series: "自然观察", discovery: "大熊猫第六指那块垫卡住竹子，才拿得住。", fact: "不是马来熊那种长舌。也不要靠近真熊猫。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/padthumb-lab.html": {
      companion: "miao", sticker: { id: "no-thumber", label: "没垫拿不住员", emoji: "🎋" },
      card: { series: "物理实验", discovery: "第六指那块垫卡住竹子才拿得住，没有垫就拿不住。还是同一只纸熊。", fact: "因为竹子要卡住，所以一没垫就拿不住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cuscus.html": {
      companion: "bo", sticker: { id: "tail-clasper", label: "尾巴卷住枝员", emoji: "🐾" },
      card: { series: "自然观察", discovery: "袋貂尾巴卷住树枝，才掉不下去。", fact: "不是蜜袋鼯那种滑翔。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pouchclimb-lab.html": {
      companion: "miao", sticker: { id: "hang-dropper", label: "垂尾掉下去员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "尾巴卷住树枝才掉不下去，尾巴垂着会掉下去。还是同一只纸貂。", fact: "因为要卷住，所以一垂就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/slow-lorises.html": {
      companion: "bo", sticker: { id: "arm-licker", label: "舔槽才有毒员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "懒猴胳膊那道槽舔过才有毒，咬一下会麻。", fact: "有毒，不要摸真的。也不是眼镜猴那种跳。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/slowlick-lab.html": {
      companion: "miao", sticker: { id: "dry-armer", label: "不舔没毒员", emoji: "👅" },
      card: { series: "物理实验", discovery: "胳膊那道槽舔过才有毒，胳膊不舔就没有毒。还是同一只纸猴。", fact: "因为毒在槽里，所以一不舔就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tenrecs.html": {
      companion: "bo", sticker: { id: "tenrec-baller", label: "卷成刺球员", emoji: "🦔" },
      card: { series: "自然观察", discovery: "马岛猬卷成刺球，才咬不进去。", fact: "不是潮虫那种卷球。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tenrecball-lab.html": {
      companion: "miao", sticker: { id: "flat-tenrec", label: "摊开被咬员", emoji: "🟠" },
      card: { series: "物理实验", discovery: "卷成刺球才咬不进去，身子摊开会被咬到。还是同一只纸猬。", fact: "因为刺要卷在外，所以一摊开就被咬。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/waterbucks.html": {
      companion: "bo", sticker: { id: "scent-ringer", label: "油腺抹圈员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "水羚脖子那圈油腺抹开，自己人才闻得出。", fact: "不是弯角剑羚那种宽蹄。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/scentring-lab.html": {
      companion: "miao", sticker: { id: "dry-necker", label: "干脖闻不出员", emoji: "⭕" },
      card: { series: "物理实验", discovery: "脖子那圈油腺抹开才闻得出，脖子干干的就闻不出。还是同一只纸羚。", fact: "因为圈在脖子上，所以一干就闻不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/thylacines.html": {
      companion: "bo", sticker: { id: "gape-hunter", label: "嘴张特别大员", emoji: "🐺" },
      card: { series: "自然观察", discovery: "袋狼嘴张得特别大才咬得住。已经没有活着的了，只看标本和图。", fact: "已经没有活着的了。不要说还能抓到。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["已经没有活着的了。", "只看标本和图。", "先猜再试。"]
    }    ,
    "games/gapehunt-lab.html": {
      companion: "miao", sticker: { id: "shut-thylacine", label: "张不大咬不住员", emoji: "😮" },
      card: { series: "物理实验", discovery: "嘴张得特别大才咬得住，嘴张不大就咬不住。还是同一只纸狼。", fact: "因为要张得大，所以一小张就咬不住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "已经没有活着的了。", "不要去碰标本。"]
    }
    ,
    "nature/agoutis.html": {
      companion: "bo", sticker: { id: "seed-scatter", label: "种子埋远员", emoji: "🐿️" },
      card: { series: "自然观察", discovery: "刺豚鼠把种子埋远一点再忘，明年才还能发芽。", fact: "不是水豚那种泡水。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/scatterseed-lab.html": {
      companion: "miao", sticker: { id: "seed-hoarder", label: "全堆一个洞员", emoji: "🌱" },
      card: { series: "物理实验", discovery: "种子埋远一点再忘才明年还能发芽，全堆在一个洞会被挖走。还是同一只纸鼠。", fact: "因为要散开，所以一堆在一处就被挖走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pacas.html": {
      companion: "bo", sticker: { id: "cheek-spoter", label: "脸颊白斑员", emoji: "🐾" },
      card: { series: "自然观察", discovery: "无尾刺豚鼠脸颊那块白斑对着对面，才认得出自己人。", fact: "不是水豚那种泡水。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cheekspot-lab.html": {
      companion: "miao", sticker: { id: "plain-paca", label: "一块色认不出员", emoji: "⚪" },
      card: { series: "物理实验", discovery: "脸颊那块白斑对着对面才认得出，脸颊一块色就认不出。还是同一只纸鼠。", fact: "因为要那块白斑，所以一变成一块色就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/muskrats.html": {
      companion: "bo", sticker: { id: "musk-caster", label: "麝香抹开员", emoji: "🐭" },
      card: { series: "自然观察", discovery: "麝鼠屁股那点麝香抹开，自己人才闻得出。", fact: "不是河狸那种咬树。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/muskcastor-lab.html": {
      companion: "miao", sticker: { id: "scent-misser", label: "不抹闻不出员", emoji: "🧴" },
      card: { series: "物理实验", discovery: "屁股那点麝香抹开才闻得出，不抹就闻不出。还是同一只纸鼠。", fact: "因为香要抹开，所以一不抹就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/oribi.html": {
      companion: "bo", sticker: { id: "oribi-bounder", label: "四腿直蹦员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "侏羚四腿伸直蹦一下，对面才看得见信号。", fact: "不是跳羚那种白臀扇。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/oribibound-lab.html": {
      companion: "miao", sticker: { id: "flat-oribi", label: "平跑看不出员", emoji: "⬆️" },
      card: { series: "物理实验", discovery: "四腿伸直蹦一下才看得见信号，贴地往前跑就看不出。还是同一只纸羚。", fact: "因为要直蹦，所以一平跑就看不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/reedbucks.html": {
      companion: "bo", sticker: { id: "reed-hider", label: "身子埋进芦苇员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "芦羚身子埋进芦苇，才认不成。", fact: "不是林羚那种张蹄。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/reedhide-lab.html": {
      companion: "miao", sticker: { id: "open-reed", label: "空地被看见员", emoji: "🌾" },
      card: { series: "物理实验", discovery: "身子埋进芦苇才认不成，站在空地上就被看见。还是同一只纸羚。", fact: "因为要埋进芦苇，所以一站空地就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/groundhogs.html": {
      companion: "bo", sticker: { id: "ground-whistler", label: "洞口一声哨员", emoji: "🐿️" },
      card: { series: "自然观察", discovery: "土拨鼠洞口一声哨，对面才听得见。", fact: "不是草原犬鼠那种堆烟囱。也不要挖真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/groundwhistle-lab.html": {
      companion: "miao", sticker: { id: "mute-hog", label: "不叫听不见员", emoji: "🎵" },
      card: { series: "物理实验", discovery: "洞口一声哨才听得见，不叫就听不见。还是同一只纸鼠。", fact: "因为哨在洞口，所以一不叫就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pikas.html": {
      companion: "bo", sticker: { id: "hay-piler", label: "草晒干再堆员", emoji: "🐰" },
      card: { series: "自然观察", discovery: "鼠兔把草晒干再堆起来，冬天才还有。", fact: "不是毛丝鼠那种滚尘。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/haypile-lab.html": {
      companion: "miao", sticker: { id: "fresh-pika", label: "新鲜会烂员", emoji: "🌾" },
      card: { series: "物理实验", discovery: "草晒干再堆起来才冬天还有，堆新鲜的会烂掉。还是同一只纸兔。", fact: "因为要干，所以一新鲜就烂。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sperm-whales.html": {
      companion: "bo", sticker: { id: "melon-clicker", label: "额隆点击员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "抹香鲸额头那块隆点击一下，才听得见回声。", fact: "不是蓝鲸那种滤食。也不要追真鲸。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/melonclick-lab.html": {
      companion: "miao", sticker: { id: "no-melon", label: "扁额听不见员", emoji: "🔊" },
      card: { series: "物理实验", discovery: "额头那块隆点击一下才听得见回声，额头扁扁的就听不见。还是同一只纸鲸。", fact: "因为回声走那块隆，所以一扁就听不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hamsters.html": {
      companion: "bo", sticker: { id: "pouch-storer", label: "颊囊装满员", emoji: "🐹" },
      card: { series: "自然观察", discovery: "仓鼠颊囊装满带回洞，才存得住。", fact: "不是小鼠那种四脚窜。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hamstercache-lab.html": {
      companion: "miao", sticker: { id: "mouth-snacker", label: "就地吃存不住员", emoji: "🌰" },
      card: { series: "物理实验", discovery: "颊囊装满带回洞才存得住，嘴里含着就地吃就存不住。还是同一只纸鼠。", fact: "因为要装回去，所以一就地吃就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/uakaris.html": {
      companion: "bo", sticker: { id: "face-flusher", label: "血涨脸红员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "秃猴血涨上来脸才红，对面才看得见。", fact: "不是吼猴那种叫。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flush-lab.html": {
      companion: "miao", sticker: { id: "pale-hider", label: "发白看不见员", emoji: "🔴" },
      card: { series: "物理实验", discovery: "血涨上来脸才红才看得见，脸发白就看不见。还是同一只纸猴。", fact: "因为红在血里，所以一发白就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/humpbacks.html": {
      companion: "bo", sticker: { id: "bubble-netter", label: "气泡围成圈员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "座头鲸气泡围成一圈，才把鱼赶在一起。", fact: "不是海豚那种上下拍尾。也不要追真鲸。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bubblehunt-lab.html": {
      companion: "miao", sticker: { id: "spray-scatter", label: "乱喷鱼散了员", emoji: "🫧" },
      card: { series: "物理实验", discovery: "气泡围成一圈才围得住，气泡乱喷鱼就散了。还是同一只纸鲸。", fact: "因为要围成圈，所以一乱喷就散。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/marmots.html": {
      companion: "bo", sticker: { id: "marmot-whistler", label: "洞口一声哨员", emoji: "🐿️" },
      card: { series: "自然观察", discovery: "旱獭洞口一声哨，对面才听得见。", fact: "不是土拨鼠那种洞哨另开一页。也不要挖真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/marmotwhistle-lab.html": {
      companion: "miao", sticker: { id: "mute-marmot", label: "不叫听不见员", emoji: "🎵" },
      card: { series: "物理实验", discovery: "洞口一声哨才听得见，不叫就听不见。还是同一只纸獭。", fact: "因为哨在洞口，所以一不叫就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/moles.html": {
      companion: "bo", sticker: { id: "shovel-pawner", label: "前掌像铲子员", emoji: "🐭" },
      card: { series: "自然观察", discovery: "鼹鼠前掌像铲子往前挖，才挖得动。", fact: "不是草原犬鼠那种堆烟囱。也不要挖真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/moletunnel-lab.html": {
      companion: "miao", sticker: { id: "thin-digger", label: "细掌挖不动员", emoji: "⛏️" },
      card: { series: "物理实验", discovery: "前掌像铲子往前挖才挖得动，前掌细细的就挖不动。还是同一只纸鼠。", fact: "因为掌要像铲，所以一细就挖不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/shrews.html": {
      companion: "bo", sticker: { id: "burn-eater", label: "一直吃才烧员", emoji: "🐭" },
      card: { series: "自然观察", discovery: "鼩鼱一直吃才烧得动，才还醒着。", fact: "不是小鼠那种四脚窜。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/shrewburn-lab.html": {
      companion: "miao", sticker: { id: "still-stopper", label: "停着就停住员", emoji: "🔥" },
      card: { series: "物理实验", discovery: "一直吃才烧得动还醒着，停着不吃就停住。还是同一只纸鼩。", fact: "因为烧得快，所以一停吃就停住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lemmings.html": {
      companion: "bo", sticker: { id: "swim-lemming", label: "遇上水会游员", emoji: "🐭" },
      card: { series: "自然观察", discovery: "旅鼠遇上水会游过去，才过得去。", fact: "不是去跳悬崖。那是人编的。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lemmingswim-lab.html": {
      companion: "miao", sticker: { id: "drown-rusher", label: "硬冲冲散员", emoji: "🏊" },
      card: { series: "物理实验", discovery: "遇上水会游过去才过得去，不会游硬冲就冲散。还是同一只纸鼠。", fact: "因为会游，所以一硬冲就冲散。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/siamangs.html": {
      companion: "bo", sticker: { id: "boom-sac", label: "喉囊鼓起来员", emoji: "🦧" },
      card: { series: "自然观察", discovery: "合趾猿喉囊鼓起来，对面才听得见。", fact: "不是长臂猿那种荡过去。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/siamangboom-lab.html": {
      companion: "miao", sticker: { id: "quiet-siamang", label: "瘪着听不见员", emoji: "📣" },
      card: { series: "物理实验", discovery: "喉囊鼓起来才听得见，喉囊瘪着就听不见。还是同一只纸猿。", fact: "因为声在囊里，所以一瘪就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/colobus.html": {
      companion: "bo", sticker: { id: "leap-colobus", label: "长臂荡过去员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "疣猴长臂荡过去，才过得去。", fact: "不是吼猴那种叫。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/colobusleap-lab.html": {
      companion: "miao", sticker: { id: "run-colobus", label: "用腿跑掉下去员", emoji: "🤸" },
      card: { series: "物理实验", discovery: "长臂荡过去才过得去，用腿跑会掉下去。还是同一只纸猴。", fact: "因为要荡，所以一跑就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/langurs.html": {
      companion: "bo", sticker: { id: "leaf-langur", label: "分胃化叶子员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "叶猴胃分好几间慢慢化叶子，才化得了。", fact: "不是吼猴那种叫。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/langurleaf-lab.html": {
      companion: "miao", sticker: { id: "fruit-langur", label: "当水果化不了员", emoji: "🍃" },
      card: { series: "物理实验", discovery: "胃分好几间慢慢化叶子才化得了，当水果一下子咽就化不了。还是同一只纸猴。", fact: "因为叶子要慢慢化，所以一当水果就化不了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pottos.html": {
      companion: "bo", sticker: { id: "hold-potto", label: "手脚抓紧员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "树熊猴手脚抓紧不放，才掉不下去。", fact: "不是懒猴那种舔槽。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pottohold-lab.html": {
      companion: "miao", sticker: { id: "drop-potto", label: "松手掉下去员", emoji: "✊" },
      card: { series: "物理实验", discovery: "手脚抓紧不放才掉不下去，松手会掉下去。还是同一只纸猴。", fact: "因为要抓紧，所以一松就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/proboscis.html": {
      companion: "bo", sticker: { id: "nose-proboscis", label: "大鼻子对着员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "长鼻猴大鼻子对着对面，才听得见。", fact: "不是吼猴那种叫。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/proboscisnose-lab.html": {
      companion: "miao", sticker: { id: "flat-proboscis", label: "扁鼻听不见员", emoji: "👃" },
      card: { series: "物理实验", discovery: "大鼻子对着对面才听得见，鼻子扁扁的就听不见。还是同一只纸猴。", fact: "因为声走鼻子，所以一扁就听不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/macaques.html": {
      companion: "bo", sticker: { id: "cheek-macaque", label: "颊囊装满员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "猕猴颊囊装满带回，才存得住。", fact: "不是吼猴那种叫。也不要喂真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/macaquecheek-lab.html": {
      companion: "miao", sticker: { id: "empty-macaque", label: "就地吃存不住员", emoji: "🌰" },
      card: { series: "物理实验", discovery: "颊囊装满带回才存得住，就地吃就存不住。还是同一只纸猴。", fact: "因为要装回去，所以一就地吃就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/capuchins.html": {
      companion: "bo", sticker: { id: "hammer-capuchin", label: "石头砸开员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "卷尾猴石头砸开，才吃得到。", fact: "不是眼镜猴那种跳。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/capuchinhammer-lab.html": {
      companion: "miao", sticker: { id: "hand-misser", label: "空手掰不到员", emoji: "🪨" },
      card: { series: "物理实验", discovery: "石头砸开才吃得到，空手掰就吃不到。还是同一只纸猴。", fact: "因为壳太硬，所以一空手就吃不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/marmosets.html": {
      companion: "bo", sticker: { id: "gum-marmoset", label: "牙刮树皮出胶员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "狨牙刮树皮才出胶，才吃得到。", fact: "不是眼镜猴那种跳。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/marmosetgum-lab.html": {
      companion: "miao", sticker: { id: "bite-marmoset", label: "咬果没胶员", emoji: "🌳" },
      card: { series: "物理实验", discovery: "牙刮树皮才出胶才吃得到，用牙咬果就吃不到胶。还是同一只纸狨。", fact: "因为胶在树皮里，所以一咬果就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }    ,
    "nature/gerbils.html": {
      companion: "bo", sticker: { id: "hind-kicker", label: "后腿一蹬员", emoji: "🐹" },
      card: { series: "自然观察", discovery: "沙鼠后腿一下蹬出去，才进得了洞。", fact: "不是小鼠那种四脚刨。也不要挖真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/gerbildig-lab.html": {
      companion: "miao", sticker: { id: "four-digger", label: "四脚刨被抓员", emoji: "🐾" },
      card: { series: "物理实验", discovery: "后腿一下蹬出去才进得了洞，四脚刨沙就被抓住。还是同一只纸鼠。", fact: "因为要后腿蹬，所以一四脚刨就被抓住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "不要去碰真的。", "先猜再试。"]
    }

    ,
    "nature/mandrills.html": {
      companion: "bo", sticker: { id: "color-noser", label: "蓝红鼻子员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "山魈鼻子那道蓝红对着对面，才认得出谁大。", fact: "不是狒狒那种普通脸。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mandrillnose-lab.html": {
      companion: "miao", sticker: { id: "plain-mandrill", label: "一块色认不出员", emoji: "🎨" },
      card: { series: "物理实验", discovery: "鼻子那道蓝红对着对面才认得出谁大，鼻子一块色就认不出。还是同一只纸魈。", fact: "因为颜色在鼻子上，所以一变成一块色就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/right-whales.html": {
      companion: "bo", sticker: { id: "skim-plater", label: "水面张开滤员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "露脊鲸嘴张开贴着水面滤，才滤得到。", fact: "不是蓝鲸那种张开吞一大口。也不要追真鲸。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/rightskim-lab.html": {
      companion: "miao", sticker: { id: "gulp-misser", label: "乱吞滤不到员", emoji: "🌊" },
      card: { series: "物理实验", discovery: "嘴张开贴着水面滤才滤得到，潜下去乱吞就滤不到。还是同一只纸鲸。", fact: "因为要贴水面滤，所以一乱吞就滤不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }    ,
    "nature/bowheads.html": {
      companion: "bo", sticker: { id: "huge-filter", label: "巨口须板滤员", emoji: "🐋" },
      card: { series: "自然观察", discovery: "弓头鲸嘴张得特别大把须板张开滤，才滤得到。", fact: "不是蓝鲸那种一口吞。也不要追真鲸。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/bowheadfilter-lab.html": {
      companion: "miao", sticker: { id: "tight-bowmouth", label: "小张滤不到员", emoji: "😮" },
      card: { series: "物理实验", discovery: "嘴张得特别大把须板张开滤才滤得到，嘴张不大就滤不到。还是同一只纸鲸。", fact: "因为口要张得大，所以一小张就滤不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "不要去碰真的。", "先猜再试。"]
    }

    ,
    "nature/voles.html": {
      companion: "bo", sticker: { id: "vole-tunneler", label: "草下挖道员", emoji: "🐭" },
      card: { series: "自然观察", discovery: "田鼠草下面挖出一条道，鹰才看不见。", fact: "不是小鼠那种四脚窜。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/voletunnel-lab.html": {
      companion: "miao", sticker: { id: "open-vole", label: "草上被看见员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "草下面挖出一条道才鹰看不见，在草上面跑一下子被看见。还是同一只纸鼠。", fact: "因为要在草下，所以一跑到草上就看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }    ,
    "nature/geladas.html": {
      companion: "bo", sticker: { id: "lip-flipper", label: "上唇翻起员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "狮尾狒上唇翻上去露出牙龈，对面才看得见信号。", fact: "不是狒狒那种一块色鼻子。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }
    ,
    "games/geladagum-lab.html": {
      companion: "miao", sticker: { id: "shut-gelada", label: "闭嘴看不见员", emoji: "😬" },
      card: { series: "物理实验", discovery: "上唇翻上去露出牙龈才对面看得见信号，嘴闭着就看不见。还是同一只纸狒。", fact: "因为信号在牙龈上，所以一闭嘴就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "不要去碰真的。", "先猜再试。"]
    }

    ,
    "nature/sakis.html": {
      companion: "bo", sticker: { id: "seed-saki", label: "牙咬开硬籽员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "僧面猴牙把硬籽咬开，才吃得到。", fact: "不是卷尾猴那种砸石。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sakiseed-lab.html": {
      companion: "miao", sticker: { id: "soft-saki", label: "牙软吃不到员", emoji: "🥜" },
      card: { series: "物理实验", discovery: "牙把硬籽咬开才吃得到，牙软软的就吃不到。还是同一只纸猴。", fact: "因为籽太硬，所以一牙软就吃不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/titis.html": {
      companion: "bo", sticker: { id: "duo-titi", label: "两只对着唱员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "伶猴两只对着唱，对面才听得见自己人。", fact: "不是吼猴那种叫。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/titiduos-lab.html": {
      companion: "miao", sticker: { id: "solo-titi", label: "独唱听不见员", emoji: "🎵" },
      card: { series: "物理实验", discovery: "两只对着唱才听得见自己人，一只自己叫就听不见。还是同一对纸猴。", fact: "因为要两只对上，所以一独唱就听不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/guenons.html": {
      companion: "bo", sticker: { id: "spot-guenon", label: "脸上彩斑员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "长尾猴脸上那块彩斑对着对面，才认得出自己人。", fact: "不是猕猴那种颊囊。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/guenonspot-lab.html": {
      companion: "miao", sticker: { id: "plain-guenon", label: "一块色认不出员", emoji: "🎨" },
      card: { series: "物理实验", discovery: "脸上那块彩斑对着对面才认得出，脸上一块色就认不出。还是同一只纸猴。", fact: "因为要那块彩斑，所以一变成一块色就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/squirrel-monkeys.html": {
      companion: "bo", sticker: { id: "leap-squirrel", label: "后腿一蹬跳员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "松鼠猴后腿一蹬跳过去，才过得去。", fact: "不是卷尾猴那种砸石。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/squirrelleap-lab.html": {
      companion: "miao", sticker: { id: "crawl-squirrel", label: "慢慢爬过不去员", emoji: "⬆️" },
      card: { series: "物理实验", discovery: "后腿一蹬跳过去才过得去，慢慢爬就过不去。还是同一只纸猴。", fact: "因为空档太大，所以一爬就过不去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/beira.html": {
      companion: "bo", sticker: { id: "nose-beira", label: "大耳竖着听员", emoji: "🦌" },
      card: { series: "自然观察", discovery: "贝氏羚大耳朵竖着听，才听得见。", fact: "不是迪氏羚那种喷鼻。也不要追真羚羊。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/beiranose-lab.html": {
      companion: "miao", sticker: { id: "droop-beira", label: "垂耳听不见员", emoji: "👂" },
      card: { series: "物理实验", discovery: "大耳朵竖着听才听得见，耳朵垂着就听不见。还是同一只纸羚。", fact: "因为要竖着听，所以一垂就听不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/drills.html": {
      companion: "bo", sticker: { id: "face-drill", label: "黑脸对着员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "鬼狒黑脸上那块对着对面，才认得出谁大。", fact: "不是山魈那种彩鼻。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/drillface-lab.html": {
      companion: "miao", sticker: { id: "plain-drill", label: "一块色认不出员", emoji: "⬛" },
      card: { series: "物理实验", discovery: "黑脸上那块对着对面才认得出谁大，脸上一块色就认不出。还是同一只纸狒。", fact: "因为要那块黑脸，所以一变成一块色就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/patas.html": {
      companion: "bo", sticker: { id: "run-patas", label: "长腿贴地跑员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "赤猴长腿贴地跑，才跑得过。", fact: "不是猕猴那种颊囊。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/patasrun-lab.html": {
      companion: "miao", sticker: { id: "climb-patas", label: "爬树跑不过员", emoji: "🏃" },
      card: { series: "物理实验", discovery: "长腿贴地跑才跑得过，往树上爬就跑不过。还是同一只纸猴。", fact: "因为要贴地跑，所以一爬树就跑不过。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ring-tailed-lemurs.html": {
      companion: "bo", sticker: { id: "ring-lemur", label: "环尾竖起来员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "环尾狐猴尾巴竖起来那一圈一圈对着对面，才看得见信号。", fact: "不是普通狐猴那种藏尾。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/lemurring-lab.html": {
      companion: "miao", sticker: { id: "hang-lemur", label: "垂尾看不见员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "尾巴竖起来那一圈一圈对着对面才看得见信号，尾巴垂着就看不见。还是同一只纸猴。", fact: "因为圈要竖着给人看，所以一垂就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/baboons.html": {
      companion: "bo", sticker: { id: "canine-baboon", label: "长牙露出来员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "狒狒那对长牙露出来，对面才看得见。", fact: "不是猕猴那种颊囊。也不要靠近真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/babooncanine-lab.html": {
      companion: "miao", sticker: { id: "hide-canine", label: "牙藏看不见员", emoji: "🦷" },
      card: { series: "物理实验", discovery: "那对长牙露出来才看得见，牙藏着就看不见。还是同一只纸狒。", fact: "因为要露出来，所以一藏就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/sifakadance-lab.html": {
      companion: "miao", sticker: { id: "four-sifaka", label: "四脚跑过不去员", emoji: "↔️" },
      card: { series: "物理实验", discovery: "两条后腿侧着跳才过得去，四脚跑就过不去。还是同一只纸狐猴。", fact: "因为空地要侧跳，所以一四脚就过不去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/snub-noses.html": {
      companion: "bo", sticker: { id: "cold-snub", label: "鼻子朝天员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "金丝猴鼻子朝天不进雪，才呛不着。", fact: "不是长鼻猴那种大鼻子。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/snubcold-lab.html": {
      companion: "miao", sticker: { id: "down-snub", label: "朝下呛着员", emoji: "👃" },
      card: { series: "物理实验", discovery: "鼻子朝天不进雪才呛不着，鼻子朝下就呛着。还是同一只纸猴。", fact: "因为雪要从朝天滑走，所以一朝下就呛。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/indris.html": {
      companion: "bo", sticker: { id: "leap-indri", label: "后腿一蹬跳员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "大狐猴后腿一蹬跳到下一棵，才过得去。", fact: "不是普通狐猴那种走。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/indrileap-lab.html": {
      companion: "miao", sticker: { id: "climb-indri", label: "爬树过不去员", emoji: "🌳" },
      card: { series: "物理实验", discovery: "后腿一蹬跳到下一棵才过得去，沿着树干爬就过不去。还是同一只纸猴。", fact: "因为空档太大，所以一爬就过不去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tamarins.html": {
      companion: "bo", sticker: { id: "claw-tamarin", label: "爪子钩住员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "柽柳猴爪子钩住树枝，才掉不下去。", fact: "不是狨那种刮胶。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tamarinclaw-lab.html": {
      companion: "miao", sticker: { id: "flat-tamarin", label: "平放掉下去员", emoji: "🪝" },
      card: { series: "物理实验", discovery: "爪子钩住树枝才掉不下去，爪子平放会掉下去。还是同一只纸猴。", fact: "因为要钩住，所以一平放就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/vervets.html": {
      companion: "bo", sticker: { id: "alarm-vervet", label: "三种警报员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "黑长尾猴不同叫声对应不同危险，对面才知道往哪躲。", fact: "不是吼猴那种叫。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/vervetalarm-lab.html": {
      companion: "miao", sticker: { id: "one-call", label: "乱叫不知道员", emoji: "📢" },
      card: { series: "物理实验", discovery: "不同叫声对应不同危险才知道往哪躲，一种叫声乱叫就不知道。还是同一只纸猴。", fact: "因为危险不一样，所以一乱叫就不知道。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tinamous.html": {
      companion: "bo", sticker: { id: "egg-tinamou", label: "蛋壳亮得像釉员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "䳍蛋壳亮得像上过釉，才认成叶子上的水珠。", fact: "不是鸸鹋那种双羽。也不要掏真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tinamouegg-lab.html": {
      companion: "miao", sticker: { id: "plain-tinamou", label: "毛蛋被看见员", emoji: "🥚" },
      card: { series: "物理实验", discovery: "蛋壳亮得像上过釉才认成水珠，蛋壳毛毛的就被看见。还是同一只纸鸟。", fact: "因为要亮，所以一毛就被看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/seriemas.html": {
      companion: "bo", sticker: { id: "kill-seriema", label: "叼起来甩打员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "叫鹤叼起来往地上甩打，才弄得动。", fact: "不是鹤那种立着等。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/seriemakill-lab.html": {
      companion: "miao", sticker: { id: "peck-seriema", label: "只啄弄不动员", emoji: "💥" },
      card: { series: "物理实验", discovery: "叼起来往地上甩打才弄得动，只用嘴啄就弄不动。还是同一只纸鸟。", fact: "因为要甩打，所以一只啄就弄不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/hamerkops.html": {
      companion: "bo", sticker: { id: "nest-hamerkop", label: "巢封顶挡雨员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "锤头鹳巢堆得又大又封顶，才挡得住雨。", fact: "不是鹳那种平台巢。也不要拆真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/hamerkopnest-lab.html": {
      companion: "miao", sticker: { id: "open-nester", label: "没顶淋湿员", emoji: "🏠" },
      card: { series: "物理实验", discovery: "巢堆得又大又封顶才挡得住雨，巢摊开没顶就淋湿。还是同一只纸鸟。", fact: "因为要封顶，所以一摊开就淋湿。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/mouse-lemurs.html": {
      companion: "bo", sticker: { id: "torpor-mouse", label: "蜷起来少烧员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "鼠狐猴冷的时候蜷起来少烧，糖才还够用。", fact: "不是眼镜猴那种跳。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mousetorpor-lab.html": {
      companion: "miao", sticker: { id: "awake-mouse", label: "一直醒糖用完员", emoji: "😴" },
      card: { series: "物理实验", discovery: "冷的时候蜷起来少烧才糖还够用，一直醒着跑糖会用完。还是同一只纸猴。", fact: "因为糖有限，所以一一直醒就用完。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bamboo-lemurs.html": {
      companion: "bo", sticker: { id: "cyano-bamboo", label: "胃里化氰员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "竹狐猴胃里那套把氰化掉，才吃得下。", fact: "不是普通狐猴那种吃果。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bamboocyan-lab.html": {
      companion: "miao", sticker: { id: "sweet-bamboo", label: "当甜竹吃不下员", emoji: "🎋" },
      card: { series: "物理实验", discovery: "胃里那套把氰化掉才吃得下，当甜竹一下子咽就吃不下。还是同一只纸猴。", fact: "因为竹里有氰，所以一当甜的咽就吃不下。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/olingos.html": {
      companion: "bo", sticker: { id: "tail-olingo", label: "尾巴卷住枝员", emoji: "🦝" },
      card: { series: "自然观察", discovery: "尖吻浣熊尾巴卷住树枝，才掉不下去。", fact: "不是蜜熊那种另开一页。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/olingotail-lab.html": {
      companion: "miao", sticker: { id: "drop-olingo", label: "垂尾掉下去员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "尾巴卷住树枝才掉不下去，尾巴垂着会掉下去。还是同一只纸熊。", fact: "因为要卷住，所以一垂就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cacomistles.html": {
      companion: "bo", sticker: { id: "ring-cacomistle", label: "环尾竖着当舵员", emoji: "🦝" },
      card: { series: "自然观察", discovery: "蓬尾浣熊尾巴那一圈一圈竖着当舵，才拐得过。", fact: "不是浣熊那种洗手。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cacomistlering-lab.html": {
      companion: "miao", sticker: { id: "lose-cacomistle", label: "夹尾冲过头员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "尾巴那一圈一圈竖着当舵才拐得过，尾巴夹着会冲过头。还是同一只纸熊。", fact: "因为要当舵，所以一夹就冲过头。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/angwantibos.html": {
      companion: "bo", sticker: { id: "grip-angwantibo", label: "手指扣成圈员", emoji: "🐵" },
      card: { series: "自然观察", discovery: "金熊猴手指扣成一个圈抓紧，才掉不下去。", fact: "不是懒猴那种舔槽。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/angwantibogrip-lab.html": {
      companion: "miao", sticker: { id: "drop-angwantibo", label: "张开掉下去员", emoji: "✊" },
      card: { series: "物理实验", discovery: "手指扣成一个圈抓紧才掉不下去，手指张开会掉下去。还是同一只纸猴。", fact: "因为要扣成圈，所以一张开就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/secretarybirds.html": {
      companion: "bo", sticker: { id: "kick-secretary", label: "长腿一下子踩员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "蛇鹫长腿一下子踩下去，才踩得住。", fact: "不是鹤那种立着等。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/snakekick-lab.html": {
      companion: "miao", sticker: { id: "kick-pecker", label: "用嘴啄踩不住员", emoji: "🦵" },
      card: { series: "物理实验", discovery: "长腿一下子踩下去才踩得住，用嘴去啄就踩不住。还是同一只纸鸟。", fact: "因为要踩，所以一啄就踩不住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/emufeather-lab.html": {
      companion: "miao", sticker: { id: "single-feather", label: "单羽晒着员", emoji: "🪶" },
      card: { series: "物理实验", discovery: "一根羽轴上长两片才挡得住晒，一根一根的就晒着。还是同一只纸鸟。", fact: "因为要两片，所以一单根就晒着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/rheatrot-lab.html": {
      companion: "miao", sticker: { id: "two-toer", label: "两趾滑倒员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "三个脚趾扒住跑才拐得过，两个脚趾就滑倒。还是同一只纸鸟。", fact: "因为要三趾，所以一两趾就滑倒。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/shoebillwait-lab.html": {
      companion: "miao", sticker: { id: "walk-misser", label: "走动鱼跑了员", emoji: "⏳" },
      card: { series: "物理实验", discovery: "一动不动等鱼游近才咬得到，走来走去鱼就跑了。还是同一只纸鸟。", fact: "因为要等，所以一走动鱼就跑。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/skuas.html": {
      companion: "bo", sticker: { id: "sneak-skua", label: "盯着去追抢员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "贼鸥盯着别的鸟嘴里那一口去追，才抢得到。", fact: "不是鸥那种自己捞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/skuasneak-lab.html": {
      companion: "miao", sticker: { id: "honest-skua", label: "自捞抢不到员", emoji: "🎯" },
      card: { series: "物理实验", discovery: "盯着别的鸟嘴里那一口去追才抢得到，自己去水面捞就抢不到。还是同一只纸鸟。", fact: "因为吃的在别人嘴里，所以一自捞就抢不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/terns.html": {
      companion: "bo", sticker: { id: "dive-tern", label: "悬停再扎下员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "燕鸥先悬在空中再一头扎下去，才啄得到。", fact: "不是鸥那种水面捞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/terndive-lab.html": {
      companion: "miao", sticker: { id: "hover-tern", label: "扫水啄空员", emoji: "⬇️" },
      card: { series: "物理实验", discovery: "先悬在空中再一头扎下去才啄得到，贴着水面扫就啄空。还是同一只纸鸟。", fact: "因为要先看准，所以一扫就啄空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/rails.html": {
      companion: "bo", sticker: { id: "side-rail", label: "身子侧过去挤员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "秧鸡身子侧过去从芦苇缝挤，才挤得过。", fact: "不是水雉那种长趾。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/railside-lab.html": {
      companion: "miao", sticker: { id: "open-rail", label: "正走卡住员", emoji: "🌾" },
      card: { series: "物理实验", discovery: "身子侧过去从芦苇缝挤才挤得过，身子正着走会卡住。还是同一只纸鸟。", fact: "因为缝很窄，所以一正走就卡住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/dovekies.html": {
      companion: "bo", sticker: { id: "dive-dovekie", label: "翅膀水里划员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "小海雀翅膀在水里划，才潜得下。", fact: "不是海鹦那种叼鱼。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/dovekiedive-lab.html": {
      companion: "miao", sticker: { id: "float-dovekie", label: "收翅浮着员", emoji: "🏊" },
      card: { series: "物理实验", discovery: "翅膀在水里划才潜得下，翅膀收着就浮着。还是同一只纸鸟。", fact: "因为水下用翅划，所以一收就浮着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/moorhens.html": {
      companion: "bo", sticker: { id: "nod-moorhen", label: "走一步点一下员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "黑水鸡走一步头点一下，才走得稳。", fact: "不是水雉那种长趾。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/moorhennod-lab.html": {
      companion: "miao", sticker: { id: "still-moorhen", label: "冲着栽下去员", emoji: "⬇️" },
      card: { series: "物理实验", discovery: "走一步头点一下才走得稳，头不动往前冲会栽下去。还是同一只纸鸡。", fact: "因为要配步，所以一冲就栽。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/prions.html": {
      companion: "bo", sticker: { id: "filter-prion", label: "嘴里梳子滤员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹱燕嘴里那排梳子把小虾滤住，才滤得到。", fact: "不是暴风鹱那种吐油。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/prionfilter-lab.html": {
      companion: "miao", sticker: { id: "gulp-prion", label: "整吞滤不到员", emoji: "🪥" },
      card: { series: "物理实验", discovery: "嘴里那排梳子把小虾滤住才滤得到，整口吞就滤不到。还是同一只纸鸟。", fact: "因为虾太小，所以一整吞就滤不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/gulls.html": {
      companion: "bo", sticker: { id: "hover-gull", label: "迎风停空中员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鸥迎着风停在空中看，才看得见水面。", fact: "不是燕鸥那种扎下去。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/gullhover-lab.html": {
      companion: "miao", sticker: { id: "sit-gull", label: "前飞看不清员", emoji: "💨" },
      card: { series: "物理实验", discovery: "迎着风停在空中看才看得见水面，一直往前飞就看不清。还是同一只纸鸟。", fact: "因为要停着看，所以一往前飞就看不清。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/crakes.html": {
      companion: "bo", sticker: { id: "side-crake", label: "身子竖着走员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "田鸡身子竖着从缝里走，才挤得过。", fact: "不是水雉那种长趾。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/crakeside-lab.html": {
      companion: "miao", sticker: { id: "run-crake", label: "横跑卡住员", emoji: "🌿" },
      card: { series: "物理实验", discovery: "身子竖着从缝里走才挤得过，身子横着跑会卡住。还是同一只纸鸡。", fact: "因为缝很窄，所以一横跑就卡住。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/grebes.html": {
      companion: "bo", sticker: { id: "dive-grebe", label: "挤气再潜员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鸊鷉把气挤出去再潜，才潜得下。", fact: "不是鸭子那种浮着。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/grebedive-lab.html": {
      companion: "miao", sticker: { id: "float-grebe", label: "鼓着浮着员", emoji: "⬇️" },
      card: { series: "物理实验", discovery: "把气挤出去再潜才潜得下，气还鼓着就浮着。还是同一只纸鸟。", fact: "因为气会把身子托住，所以一鼓着就浮着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/loons.html": {
      companion: "bo", sticker: { id: "dive-loon", label: "脚在最后面员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "潜鸟脚长在身子最后面才划得深，才潜得深。", fact: "不是鸭子那种浮着。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/loondive-lab.html": {
      companion: "miao", sticker: { id: "mid-loon", label: "脚在中间潜不深员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "脚长在身子最后面才划得深，脚长在中间就潜不深。还是同一只纸鸟。", fact: "因为脚要当桨，所以一长在中间就潜不深。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/anhingadry-lab.html": {
      companion: "miao", sticker: { id: "wet-anhinga", label: "湿着飞不起来员", emoji: "🪶" },
      card: { series: "物理实验", discovery: "翅膀张开晾干才飞得起来，翅膀一直湿着就飞不起来。还是同一只纸鸟。", fact: "因为翅要干，所以一湿就飞不起来。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/phalaropespin-lab.html": {
      companion: "miao", sticker: { id: "still-phalarope", label: "站着旋不上来员", emoji: "🌀" },
      card: { series: "物理实验", discovery: "在水上打转转把吃的旋上来才旋得上来，站着等就旋不上来。还是同一只纸鸟。", fact: "因为要旋，所以一站着就没有。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/clawwing-lab.html": {
      companion: "miao", sticker: { id: "fall-chick", label: "没爪掉下去员", emoji: "🪝" },
      card: { series: "物理实验", discovery: "翅膀上那两个爪子抓住树枝才掉不下去，爪子没有会掉下去。还是同一只纸鸟。", fact: "因为要钩住，所以一没爪就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/coots.html": {
      companion: "bo", sticker: { id: "lobe-coot", label: "瓣蹼张开划员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "白骨顶脚趾两边那层皮张开划，才划得动。", fact: "不是鸭子那种整片蹼。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cootlobe-lab.html": {
      companion: "miao", sticker: { id: "web-coot", label: "光趾划不动员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "脚趾两边那层皮张开划才划得动，脚趾光光的就划不动。还是同一只纸鸟。", fact: "因为要那层皮，所以一光就划不动。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/jacanawalk-lab.html": {
      companion: "miao", sticker: { id: "sink-jacana", label: "短趾陷下去员", emoji: "🦶" },
      card: { series: "物理实验", discovery: "脚趾特别长摊在荷叶上才走得住，脚趾短短的就陷下去。还是同一只纸鸟。", fact: "因为要摊开，所以一短就陷。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ptarmigans.html": {
      companion: "bo", sticker: { id: "snow-cloaker", label: "换上白羽员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "岩雷鸟冬天换上白羽，才藏进雪里。", fact: "不是雪兔那种换毛。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/snowcloak-lab.html": {
      companion: "miao", sticker: { id: "brown-in-snow", label: "褐羽被看见员", emoji: "❄️" },
      card: { series: "物理实验", discovery: "换上白羽才藏进雪里，褐羽留着就被看见。还是同一只纸鸟。", fact: "因为要对上雪，所以一留褐羽就被看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/nuthatches.html": {
      companion: "bo", sticker: { id: "down-nuthatch", label: "头朝下倒走员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "䴓头朝下顺着树走，才吃得到下面的。", fact: "不是旋木雀那种只往上。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/nuthatchwalk-lab.html": {
      companion: "miao", sticker: { id: "up-only", label: "只能往上员", emoji: "🌳" },
      card: { series: "物理实验", discovery: "头朝下顺着树走才吃得到下面的，只能往上爬就吃不到。还是同一只纸鸟。", fact: "因为要倒走，所以一只能往上就吃不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/shrikes.html": {
      companion: "bo", sticker: { id: "pin-shrike", label: "钉在刺上员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "伯劳把吃的钉在刺上，才存得住。", fact: "不是松鸦那种叼着走。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/shrikebush-lab.html": {
      companion: "miao", sticker: { id: "drop-shrike", label: "叼着掉下去员", emoji: "📌" },
      card: { series: "物理实验", discovery: "把吃的钉在刺上才存得住，叼着不放就掉下去。还是同一只纸鸟。", fact: "因为要钉住，所以一叼着就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/beeeatercatch-lab.html": {
      companion: "miao", sticker: { id: "gulp-bee", label: "直吞还扎着员", emoji: "🐝" },
      card: { series: "物理实验", discovery: "先把蜂摔几下再吞才刺就没了，直接吞就还扎着。还是同一只纸鸟。", fact: "因为要先摔，所以一直吞就还扎。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/hornbillcasque-lab.html": {
      companion: "miao", sticker: { id: "bare-hornbill", label: "没盔认不出员", emoji: "🪖" },
      card: { series: "物理实验", discovery: "嘴上那块盔对着对面才认得出，盔没有就认不出。还是同一只纸鸟。", fact: "因为盔是记号，所以一没盔就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/kingfisherdive-lab.html": {
      companion: "miao", sticker: { id: "miss-kingfisher", label: "乱扎啄空员", emoji: "🎯" },
      card: { series: "物理实验", discovery: "先停着看准再扎下去才啄得到，乱扎就啄空。还是同一只纸鸟。", fact: "因为要看准，所以一乱扎就空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/swiftglue-lab.html": {
      companion: "miao", sticker: { id: "drop-swift", label: "巢不粘掉下去员", emoji: "🪺" },
      card: { series: "物理实验", discovery: "用唾液把巢粘在岩壁上才掉不下去，巢不粘就掉下去。还是同一只纸鸟。", fact: "因为要粘住，所以一不粘就掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }

    ,
    "nature/barbets.html": {
      companion: "bo", sticker: { id: "tap-barbet", label: "一下一下凿洞员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "拟啄木嘴一下一下凿树洞，洞才够深。", fact: "不是巨嘴鸟那种夹果。也不要掏真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/barbettap-lab.html": {
      companion: "miao", sticker: { id: "silent-barbet", label: "啄虫洞太浅员", emoji: "🔨" },
      card: { series: "物理实验", discovery: "嘴一下一下凿树洞才够深，嘴去啄虫子洞太浅。还是同一只纸鸟。", fact: "因为要凿，所以一啄虫就太浅。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/wrynecks.html": {
      companion: "bo", sticker: { id: "twist-wryneck", label: "脖子扭进洞员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "蚁䴕脖子扭过去伸进洞，才够得到蚁。", fact: "不是啄木鸟那种凿。也不要掏真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wrynecktwist-lab.html": {
      companion: "miao", sticker: { id: "stiff-wryneck", label: "直颈够不到员", emoji: "↩️" },
      card: { series: "物理实验", discovery: "脖子扭过去伸进洞才够得到蚁，脖子直直的就够不到。还是同一只纸鸟。", fact: "因为洞是弯的，所以一直就够不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/larks.html": {
      companion: "bo", sticker: { id: "hover-lark", label: "停空中唱员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "百灵停在空中唱，对面才听得见。", fact: "不是燕那种贴地飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/larkhover-lab.html": {
      companion: "miao", sticker: { id: "sit-lark", label: "地上唱听不见员", emoji: "🎵" },
      card: { series: "物理实验", discovery: "停在空中唱才听得见，站在地上唱就听不见。还是同一只纸鸟。", fact: "因为要让对面听见，所以一站地上就听不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/jays.html": {
      companion: "bo", sticker: { id: "cache-jay", label: "籽埋远再忘员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "松鸦籽埋远一点再忘，明年才还能发芽。", fact: "不是乌鸦那种钩东西。也不要掏真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/jaycache-lab.html": {
      companion: "miao", sticker: { id: "drop-jay", label: "堆洞被挖走员", emoji: "🌰" },
      card: { series: "物理实验", discovery: "籽埋远一点再忘才明年还能发芽，全堆在一个洞会被挖走。还是同一只纸鸟。", fact: "因为要散开，所以一堆在一处就被挖走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/magpies.html": {
      companion: "bo", sticker: { id: "flash-magpie", label: "翅膀蓝闪一下员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "喜鹊翅膀那块蓝闪一下，对面才看得见。", fact: "不是乌鸦那种全黑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/magpieflash-lab.html": {
      companion: "miao", sticker: { id: "hide-magpie", label: "夹翅看不见员", emoji: "✨" },
      card: { series: "物理实验", discovery: "翅膀那块蓝闪一下才看得见，翅膀夹着就看不见。还是同一只纸鸟。", fact: "因为蓝要闪，所以一夹就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/starlings.html": {
      companion: "bo", sticker: { id: "irides-starling", label: "羽毛转一下闪员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "椋鸟羽毛转一下才闪出颜色，对面才看得见。", fact: "不是乌鸦那种全黑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/starlingirides-lab.html": {
      companion: "miao", sticker: { id: "dull-starling", label: "不动看不见员", emoji: "🌈" },
      card: { series: "物理实验", discovery: "羽毛转一下才闪出颜色才看得见，羽毛不动就看不见。还是同一只纸鸟。", fact: "因为颜色要转出来，所以一不动就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/wagtails.html": {
      companion: "bo", sticker: { id: "yap-wagtail", label: "尾巴上下摇员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹡鸰尾巴上下摇，对面才看得见。", fact: "不是燕那种贴地飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wagtailyap-lab.html": {
      companion: "miao", sticker: { id: "still-wagtail", label: "尾不动看不见员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "尾巴上下摇才看得见，尾巴不动就看不见。还是同一只纸鸟。", fact: "因为要摇给人看，所以一停就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/wrens.html": {
      companion: "bo", sticker: { id: "cavity-wren", label: "圆巢有门员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹪鹩巢做成圆圆的有门，才藏得住。", fact: "不是啄木鸟那种凿洞。也不要拆真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/wrencavity-lab.html": {
      companion: "miao", sticker: { id: "open-wren", label: "摊开被看见员", emoji: "🏠" },
      card: { series: "物理实验", discovery: "巢做成圆圆的有门才藏得住，巢摊开没顶会被看见。还是同一只纸鸟。", fact: "因为要有门，所以一摊开就被看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tits.html": {
      companion: "bo", sticker: { id: "scatter-tit", label: "籽藏好几个地方员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "山雀籽藏好几个地方，明年才还找得到。", fact: "不是乌鸦那种钩东西。也不要掏真洞。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/titcache-lab.html": {
      companion: "miao", sticker: { id: "heap-tit", label: "堆洞被挖走员", emoji: "🌰" },
      card: { series: "物理实验", discovery: "籽藏好几个地方才明年还找得到，全堆在一个洞会被挖走。还是同一只纸鸟。", fact: "因为要散开，所以一堆在一处就被挖走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/chickadees.html": {
      companion: "bo", sticker: { id: "bark-stuffer", label: "籽塞进树皮缝员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "黑帽山雀籽塞进树皮缝，才还找得到。", fact: "不是啄木鸟那种凿。也不要掏真缝。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/chickadeehide-lab.html": {
      companion: "miao", sticker: { id: "ground-dropper", label: "丢地被吃掉员", emoji: "🪵" },
      card: { series: "物理实验", discovery: "籽塞进树皮缝才还找得到，籽丢在地上会被别的吃掉。还是同一只纸鸟。", fact: "因为要塞进缝，所以一丢地上就被吃掉。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/robins.html": {
      companion: "bo", sticker: { id: "two-foot-hopper", label: "两脚并着跳员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "知更两只脚并着跳，才停得住看虫。", fact: "不是乌鸦那种走着找。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/robinhop-lab.html": {
      companion: "miao", sticker: { id: "stride-walker", label: "轮流走看不清员", emoji: "🦘" },
      card: { series: "物理实验", discovery: "两只脚并着跳才停得住看虫，两只脚轮流走就看不清。还是同一只纸鸟。", fact: "因为要停住看，所以一轮走就看不清。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/martins.html": {
      companion: "bo", sticker: { id: "wing-slider", label: "翅膀张开滑员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "毛脚燕翅膀张开滑，才飞得远。", fact: "不是家燕那种贴地飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/martinglide-lab.html": {
      companion: "miao", sticker: { id: "beat-flapper", label: "一直扇就累员", emoji: "🪁" },
      card: { series: "物理实验", discovery: "翅膀张开滑才飞得远，翅膀一直扇一会儿就累。还是同一只纸鸟。", fact: "因为要滑，所以一直扇就累。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pipits.html": {
      companion: "bo", sticker: { id: "ground-walker", label: "地上走着找员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹨在地上走着找，才找得到籽。", fact: "不是百灵那种停空中唱。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pipitwalk-lab.html": {
      companion: "miao", sticker: { id: "bounce-hopper", label: "并跳看不清员", emoji: "🚶" },
      card: { series: "物理实验", discovery: "在地上走着找才找得到籽，两只脚并着跳就看不清。还是同一只纸鸟。", fact: "因为要走着看，所以一并跳就看不清。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/treecreepers.html": {
      companion: "bo", sticker: { id: "spiral-upper", label: "绕树只往上员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "旋木雀绕着树只往上爬，才吃得到缝里的。", fact: "不是䴓那种头朝下。也不要掏真缝。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/treecreepup-lab.html": {
      companion: "miao", sticker: { id: "head-downer", label: "朝下抓不稳员", emoji: "🪵" },
      card: { series: "物理实验", discovery: "绕着树只往上爬才吃得到缝里的，头朝下往下走会抓不稳。还是同一只纸鸟。", fact: "因为爪子只适合往上，所以一朝下就抓不稳。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/flycatchers.html": {
      companion: "bo", sticker: { id: "perch-sally", label: "飞出去再回员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹟飞出去捉再飞回来，才捉得到。", fact: "不是燕那种贴地飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/flycatchsally-lab.html": {
      companion: "miao", sticker: { id: "wild-chaser", label: "一路追捉空员", emoji: "🪰" },
      card: { series: "物理实验", discovery: "飞出去捉再飞回来才捉得到，一路追着飞就捉空。还是同一只纸鸟。", fact: "因为要回枝头看，所以一路追就捉空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/orioles.html": {
      companion: "bo", sticker: { id: "pouch-hanger", label: "巢吊在枝头员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "黄鹂巢吊在枝头，风才吹不掉。", fact: "不是乌鸦那种棍巢。也不要拆真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/oriolehang-lab.html": {
      companion: "miao", sticker: { id: "platform-sitter", label: "摊巢被吹走员", emoji: "🪺" },
      card: { series: "物理实验", discovery: "巢吊在枝头才风吹不掉，巢摊在枝上会被吹走。还是同一只纸鸟。", fact: "因为要吊着，所以一摊开就被吹走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/vireos.html": {
      companion: "bo", sticker: { id: "hook-vireo", label: "钩嘴撕叶员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "绿鹃钩嘴把叶撕开，才找得到虫。", fact: "不是啄木鸟那种凿。也不要撕真叶子。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/vireohook-lab.html": {
      companion: "miao", sticker: { id: "stab-vireo", label: "尖嘴去戳员", emoji: "🍃" },
      card: { series: "物理实验", discovery: "钩嘴把叶撕开才找得到虫，尖嘴去戳就找不到。还是同一只纸鸟。", fact: "因为要撕开，所以一去戳就找不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/nightingales.html": {
      companion: "bo", sticker: { id: "night-singer", label: "夜里唱员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "夜莺夜里唱，对面才听得见。", fact: "不是燕那种贴地飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/nightingalesong-lab.html": {
      companion: "miao", sticker: { id: "day-whisper", label: "白天小声员", emoji: "🌙" },
      card: { series: "物理实验", discovery: "夜里唱才听得见，大白天小声唱就听不见。还是同一只纸鸟。", fact: "因为要对面听见，所以一白天小声就听不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/goldfinches.html": {
      companion: "bo", sticker: { id: "wave-goldfinch", label: "一起一伏飞员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "金翅飞的时候一起一伏，对面才跟得上。", fact: "不是燕那种贴地飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/goldfinchwave-lab.html": {
      companion: "miao", sticker: { id: "straight-goldfinch", label: "直线看不见员", emoji: "〰️" },
      card: { series: "物理实验", discovery: "飞的时候一起一伏才跟得上，直线飞就看不见。还是同一只纸鸟。", fact: "因为要起伏，所以一直线就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cardinals.html": {
      companion: "bo", sticker: { id: "cone-crusher", label: "厚嘴碾籽员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "主红雀又厚又短的嘴碾开籽，才吃得到仁。", fact: "不是乌鸦那种钩东西。也不要抓真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cardinalcone-lab.html": {
      companion: "miao", sticker: { id: "gap-pecker", label: "尖嘴碾不开员", emoji: "🌰" },
      card: { series: "物理实验", discovery: "又厚又短的嘴碾开籽才吃得到仁，尖嘴去啄就碾不开。还是同一只纸鸟。", fact: "因为嘴要厚，所以一尖就碾不开。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/mockingbirds.html": {
      companion: "bo", sticker: { id: "copy-mocker", label: "学几段拼起来员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "嘲鸫把别人的声音学几段拼起来，对面才听得出。", fact: "不是乌鸦那种全黑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mockingcopy-lab.html": {
      companion: "miao", sticker: { id: "one-note-mocker", label: "只一种认不出员", emoji: "🎵" },
      card: { series: "物理实验", discovery: "学几段拼起来才听得出，只叫一种就认不出。还是同一只纸鸟。", fact: "因为要拼几段，所以一只有一种就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/thrushes.html": {
      companion: "bo", sticker: { id: "run-thrush", label: "地上跑着找员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鸫在地上跑着找，才找得到虫。", fact: "不是乌鸦那种钩东西。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/thrushrun-lab.html": {
      companion: "miao", sticker: { id: "stand-thrush", label: "站着等不到员", emoji: "🏃" },
      card: { series: "物理实验", discovery: "在地上跑着找才找得到虫，站着等就找不到。还是同一只纸鸟。", fact: "因为要跑着翻，所以一站着就找不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/waxwings.html": {
      companion: "bo", sticker: { id: "pass-waxwing", label: "果子传给下一位员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "太平鸟果子传给下一位，大家都吃得到。", fact: "不是乌鸦那种钩东西。也不要采真果。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/waxwingpass-lab.html": {
      companion: "miao", sticker: { id: "hog-waxwing", label: "自己吞光员", emoji: "🍇" },
      card: { series: "物理实验", discovery: "果子传给下一位大家都吃得到，自己吞光别人就没了。还是同一只纸鸟。", fact: "因为要传下去，所以一独吞别人就没了。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "games/weaverknot-lab.html": {
      companion: "miao", sticker: { id: "drape-weaver", label: "打结巢不散员", emoji: "🪢" },
      card: { series: "物理实验", discovery: "把草打结才巢不散，草只搭着不打结就会散。还是同一只纸鸟。", fact: "因为要打结，所以一只搭着就会散。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/tanagers.html": {
      companion: "bo", sticker: { id: "flash-tanager", label: "羽毛转一下闪员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "唐纳雀羽毛转一下才闪出颜色，对面才看得见。", fact: "不是乌鸦那种全黑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/tanagerflash-lab.html": {
      companion: "miao", sticker: { id: "dull-tanager", label: "不动看不见员", emoji: "🌈" },
      card: { series: "物理实验", discovery: "羽毛转一下才闪出颜色才看得见，羽毛不动就看不见。还是同一只纸鸟。", fact: "因为颜色要转出来，所以一不动就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/warblers.html": {
      companion: "bo", sticker: { id: "flit-warbler", label: "停一下再飞员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "林莺停一下再飞出去，才捉得到虫。", fact: "不是燕那种贴地飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/warblerflit-lab.html": {
      companion: "miao", sticker: { id: "chase-warbler", label: "一路追捉空员", emoji: "🪲" },
      card: { series: "物理实验", discovery: "停一下再飞出去才捉得到虫，一路追着飞就捉空。还是同一只纸鸟。", fact: "因为要先看清，所以一路追就捉空。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sparrows.html": {
      companion: "bo", sticker: { id: "dust-sparrow", label: "干土里扑几下员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "麻雀在干土里扑几下，身上小虫才掉。", fact: "不是百灵那种停空中唱。也不要抓真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sparrowdust-lab.html": {
      companion: "miao", sticker: { id: "wet-sparrow", label: "只水洗不干净员", emoji: "🏜️" },
      card: { series: "物理实验", discovery: "在干土里扑几下身上小虫才掉，只用水洗就掉不干净。还是同一只纸鸟。", fact: "因为要干土，所以一只用水就掉不干净。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/kinglets.html": {
      companion: "bo", sticker: { id: "flare-kinglet", label: "头顶竖冠员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "戴菊头顶那撮黄绿竖起来，对面才看得见。", fact: "不是林莺那种停再飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/kingletflare-lab.html": {
      companion: "miao", sticker: { id: "flat-kinglet", label: "贴冠看不见员", emoji: "👑" },
      card: { series: "物理实验", discovery: "头顶那撮黄绿竖起来才看得见，冠贴着就看不见。还是同一只纸鸟。", fact: "因为要竖起来，所以一贴着就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/towhees.html": {
      companion: "bo", sticker: { id: "scratch-towhee", label: "两脚往后刨员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "红眼雀两只脚同时往后刨，才翻得到叶子下面的。", fact: "不是乌鸦那种钩。也不要抓真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/towheescratch-lab.html": {
      companion: "miao", sticker: { id: "peck-towhee", label: "只啄翻不到员", emoji: "🍂" },
      card: { series: "物理实验", discovery: "两只脚同时往后刨才翻得到，只用嘴啄就翻不到。还是同一只纸鸟。", fact: "因为要两脚刨，所以一只啄就翻不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/trogons.html": {
      companion: "bo", sticker: { id: "sit-trogon", label: "倒挂静等员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "咬鹃倒挂着静等果子，才够得到。", fact: "不是巨嘴鸟那种夹果。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/trogonsit-lab.html": {
      companion: "miao", sticker: { id: "chase-trogon", label: "追飞够不着员", emoji: "🍒" },
      card: { series: "物理实验", discovery: "倒挂着静等果子才够得到，追着飞就够不着。还是同一只纸鸟。", fact: "因为要等果够着，所以一追飞就够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/sunbirds.html": {
      companion: "bo", sticker: { id: "hover-sunbird", label: "停空中吸蜜员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "太阳鸟停在空中对着花，才吸得到蜜。", fact: "不是燕那种贴地飞。也不要采真花。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/sunbirdhover-lab.html": {
      companion: "miao", sticker: { id: "perch-sunbird", label: "停枝够不着员", emoji: "🌸" },
      card: { series: "物理实验", discovery: "停在空中对着花才吸得到蜜，停在枝上就够不着。还是同一只纸鸟。", fact: "因为花在空中，所以一停枝就够不着。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/catbirds.html": {
      companion: "bo", sticker: { id: "mew-catbird", label: "叫得像猫员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "猫鹊叫得像猫，对面才听得出。", fact: "不是乌鸦那种全黑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/catbirdmew-lab.html": {
      companion: "miao", sticker: { id: "silent-catbird", label: "一种认不出员", emoji: "🐱" },
      card: { series: "物理实验", discovery: "叫得像猫才听得出，只叫一种鸟声就认不出。还是同一只纸鸟。", fact: "因为要学猫，所以一只有一种就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/bulbuls.html": {
      companion: "bo", sticker: { id: "ear-bulbul", label: "耳后那撮红员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "鹎耳后那撮红对着对面，才认得出。", fact: "不是鹪鹩那种圆巢。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bulbulcrest-lab.html": {
      companion: "miao", sticker: { id: "pale-bulbul", label: "没红认不出员", emoji: "🔴" },
      card: { series: "物理实验", discovery: "耳后那撮红对着对面才认得出，耳后没有红就认不出。还是同一只纸鸟。", fact: "因为要那撮红，所以一没有就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/drongos.html": {
      companion: "bo", sticker: { id: "fork-drongo", label: "尾巴叉开转员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "卷尾尾巴叉开，才转得过来捉虫。", fact: "不是燕那种贴地飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/drongofork-lab.html": {
      companion: "miao", sticker: { id: "fan-drongo", label: "圆尾转不过来员", emoji: "✂️" },
      card: { series: "物理实验", discovery: "尾巴叉开才转得过来，尾巴圆圆的就转不过来。还是同一只纸鸟。", fact: "因为要叉开当舵，所以一圆就转不过来。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/mynas.html": {
      companion: "bo", sticker: { id: "walk-myna", label: "跟着人走员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "八哥跟着人走，才捡得到虫。", fact: "不是乌鸦那种钩东西。也不要喂真鸟。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/mynawalk-lab.html": {
      companion: "miao", sticker: { id: "hide-myna", label: "躲林捡不到员", emoji: "🚶" },
      card: { series: "物理实验", discovery: "跟着人走才捡得到虫，躲进林子就捡不到。还是同一只纸鸟。", fact: "因为人走过草被翻开，所以一躲林就捡不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/grackles.html": {
      companion: "bo", sticker: { id: "keel-grackle", label: "尾巴竖成龙骨员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "拟八哥尾巴竖成龙骨，才走得稳。", fact: "不是乌鸦那种全黑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/gracklekeel-lab.html": {
      companion: "miao", sticker: { id: "round-grackle", label: "摊开会晃员", emoji: "🛶" },
      card: { series: "物理实验", discovery: "尾巴竖成龙骨才走得稳，尾巴摊开会晃。还是同一只纸鸟。", fact: "因为龙骨当舵，所以一摊开会晃。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/meadowlarks.html": {
      companion: "bo", sticker: { id: "v-meadowlark", label: "胸口黑V员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "草地鹨胸口那道黑V，对面才认得出。", fact: "不是百灵那种停空中唱。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/meadowlarkv-lab.html": {
      companion: "miao", sticker: { id: "plain-meadowlark", label: "光胸认不出员", emoji: "⬛" },
      card: { series: "物理实验", discovery: "胸口那道黑V才认得出，胸口光光的就认不出。还是同一只纸鸟。", fact: "因为要那道V，所以一光就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/oropendolas.html": {
      companion: "bo", sticker: { id: "woven-oropendola", label: "袋巢吊着员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "拟椋鸟巢织成袋子吊着，风才吹不掉。", fact: "不是黄鹂那种吊巢。也不要拆真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/oropendolawoven-lab.html": {
      companion: "miao", sticker: { id: "cup-oropendola", label: "杯巢被吹走员", emoji: "👜" },
      card: { series: "物理实验", discovery: "巢织成袋子吊着才吹不掉，巢做成杯子会被吹走。还是同一只纸鸟。", fact: "因为袋子深，所以一杯形就被吹走。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/pittas.html": {
      companion: "bo", sticker: { id: "hop-pitta", label: "落叶里双脚跳员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "八色鸫在落叶里双脚跳，才找得到虫。", fact: "不是鸫那种跑着找。也不要翻真落叶。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/pittahop-lab.html": {
      companion: "miao", sticker: { id: "run-pitta", label: "走着找不到员", emoji: "🍃" },
      card: { series: "物理实验", discovery: "在落叶里双脚跳才找得到虫，在落叶上走就找不到。还是同一只纸鸟。", fact: "因为跳才翻得开叶子，所以一走就找不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/lammergeiers.html": {
      companion: "bo", sticker: { id: "bone-dropper", label: "高处摔骨员", emoji: "🦅" },
      card: { series: "自然观察", discovery: "胡兀鹫把骨头从高处摔下去，才摔得开。", fact: "不是秃鹫那种踩热气。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/bonedrop-lab.html": {
      companion: "miao", sticker: { id: "low-dropper", label: "轻轻放摔不开员", emoji: "🦴" },
      card: { series: "物理实验", discovery: "骨头从高处摔下去才摔得开，轻轻放地上就摔不开。还是同一只纸鸟。", fact: "因为要摔得够高，所以一放低就摔不开。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/buntings.html": {
      companion: "bo", sticker: { id: "color-bunting", label: "繁殖亮羽员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "彩鹀繁殖时那身蓝红，对面才认得出。", fact: "不是麻雀那种尘浴。也不要抓真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }


    ,
    "games/buntingcolor-lab.html": {
      companion: "miao", sticker: { id: "plain-bunting", label: "灰身认不出员", emoji: "💙" },
      card: { series: "物理实验", discovery: "繁殖时那身蓝才认得出，一身灰就认不出。还是同一只纸鸟。", fact: "因为要那身蓝，所以一灰就认不出。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/honeyeaters.html": {
      companion: "bo", sticker: { id: "brush-honeyeater", label: "舌头像刷子员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "吸蜜鸟舌头像刷子，才刷得到花蜜。", fact: "不是太阳鸟那种悬停。也不要采真花。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/honeyeaterbrush-lab.html": {
      companion: "miao", sticker: { id: "tube-honeyeater", label: "管吸吸不到员", emoji: "🌸" },
      card: { series: "物理实验", discovery: "舌头像刷子才刷得到花蜜，管子去吸就吸不到。还是同一只纸鸟。", fact: "因为要刷，所以一管吸就吸不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/cotingas.html": {
      companion: "bo", sticker: { id: "boom-cotinga", label: "空口袋鼓起来员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "伞鸟气管那个空口袋鼓起来，才叫得远。", fact: "不是乌鸦那种全黑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/cotingaboom-lab.html": {
      companion: "miao", sticker: { id: "whisper-cotinga", label: "瘪囊叫不远员", emoji: "📣" },
      card: { series: "物理实验", discovery: "空口袋鼓起来才叫得远，口袋瘪着就叫不远。还是同一只纸鸟。", fact: "因为要鼓起来，所以一瘪就叫不远。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/ovenbirds.html": {
      companion: "bo", sticker: { id: "dome-ovenbird", label: "泥炉有门员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "灶鸟巢做成泥炉有门，才藏得住。", fact: "不是鹪鹩那种圆草巢。也不要拆真巢。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/ovenbirddome-lab.html": {
      companion: "miao", sticker: { id: "open-ovenbird", label: "摊开被看见员", emoji: "🏠" },
      card: { series: "物理实验", discovery: "巢做成泥炉有门才藏得住，巢摊开没顶会被看见。还是同一只纸鸟。", fact: "因为要有门，所以一摊开就被看见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/woodcreepers.html": {
      companion: "bo", sticker: { id: "brace-woodcreep", label: "尾巴撑树干员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "砍林鸟尾巴撑在树干上，才爬得稳。", fact: "不是旋木雀那种绕上。也不要掏真缝。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/woodcreepbrace-lab.html": {
      companion: "miao", sticker: { id: "free-woodcreep", label: "不撑滑下去员", emoji: "🪵" },
      card: { series: "物理实验", discovery: "尾巴撑在树干上才爬得稳，尾巴不撑就滑下去。还是同一只纸鸟。", fact: "因为尾巴当支架，所以一不撑就滑下去。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/fairy-wrens.html": {
      companion: "bo", sticker: { id: "flash-fairywren", label: "一身亮蓝员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "细尾鹩莺繁殖时那身亮蓝，对面才看得见。", fact: "不是鹪鹩那种圆巢。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/fairywrenflash-lab.html": {
      companion: "miao", sticker: { id: "dull-fairywren", label: "褐身看不见员", emoji: "💙" },
      card: { series: "物理实验", discovery: "繁殖时那身亮蓝才看得见，一身褐就看不见。还是同一只纸鸟。", fact: "因为要那身蓝，所以一褐就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/antbirds.html": {
      companion: "bo", sticker: { id: "follow-antbird", label: "跟在蚁后员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "蚁鸟跟在行军蚁后面，才捡得到吓跑的虫。", fact: "不是鸫那种跑着找。也不要碰真蚁。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/antbirdfollow-lab.html": {
      companion: "miao", sticker: { id: "solo-antbird", label: "乱找不到员", emoji: "🐜" },
      card: { series: "物理实验", discovery: "跟在行军蚁后面才捡得到，自己乱找就找不到。还是同一只纸鸟。", fact: "因为蚁把虫吓出来，所以一乱找就找不到。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/manakins.html": {
      companion: "bo", sticker: { id: "snap-manakin", label: "翅膀拍一下员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "娇鹟翅膀拍一下，才发出响。", fact: "不是林莺那种停再飞。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/manakinsnap-lab.html": {
      companion: "miao", sticker: { id: "silent-manakin", label: "不拍没声员", emoji: "👏" },
      card: { series: "物理实验", discovery: "翅膀拍一下才发出响，翅膀不拍就没声。还是同一只纸鸟。", fact: "因为翅膀要拍出响，所以一不拍就没声。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }
    ,
    "nature/birds-of-paradise.html": {
      companion: "bo", sticker: { id: "wire-paradise", label: "两根长丝员", emoji: "🐦" },
      card: { series: "自然观察", discovery: "极乐鸟把两根长丝张开，对面才看得见。", fact: "不是乌鸦那种全黑。也不要追真的。", next: "对照工坊，猜另一头为什么不成。", accent: "#6b5344" },
      surprises: ["先看它靠的是哪一件。", "不要去碰真的。", "先猜再试。"]
    }    ,
    "games/paradisewire-lab.html": {
      companion: "miao", sticker: { id: "fold-paradise", label: "丝收看不见员", emoji: "✨" },
      card: { series: "物理实验", discovery: "两根长丝张开对面才看得见，丝收着就看不见。还是同一只纸鸟。", fact: "因为要张开，所以一收就看不见。", next: "对照观察站，猜该用哪一头。", accent: "#0e7490" },
      surprises: ["先猜两头谁成立。", "换一种动物是不是同一件事。", "不要去碰真的。"]
    }

  }
};
