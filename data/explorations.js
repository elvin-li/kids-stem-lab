/* 少儿数理启蒙 · 本站探索目录
   Classic script；支持 file://，不依赖 fetch、module 或第三方资源。 */
window.EXPLORATIONS = [
  {
    id: "games/number-blocks.html", file: "number-blocks.html", title: "数感积木",
    type: "experiment", subject: "math", age: "4–8", icon: "🧱", ready: true,
    description: "用十格阵和积木看见数量、凑十与位值。",
    task: "不用逐个数，摆出两种不同的 10，并说说你是怎么一眼看出来的。"
  },
  {
    id: "games/fraction-lab.html", file: "fraction-lab.html", title: "分数实验台",
    type: "experiment", subject: "math", age: "7–11", icon: "🍕", ready: true,
    description: "在面积模型和数轴上比较分数，不靠死记公式。",
    task: "选两个分母不同的分数，先猜大小，再用图形或数轴解释答案。"
  },
  {
    id: "games/pattern-machine.html", file: "pattern-machine.html", title: "规律机器",
    type: "experiment", subject: "math", age: "6–12", icon: "⚙️", ready: true,
    description: "从输入和输出反推隐藏规则，建立函数直觉。",
    task: "只看三组输入输出猜出规则，再用一个新数字检验你的猜想。"
  },
  {
    id: "games/symmetry-studio.html", file: "symmetry-studio.html", title: "对称工作室",
    type: "experiment", subject: "math", age: "5–11", icon: "❄️", ready: true,
    description: "用画笔观察镜像对称与旋转对称。",
    task: "画一个同时包含直线和曲线的图案，找出它的对称轴或旋转中心。"
  },
  {
    id: "games/estimation-station.html", file: "estimation-station.html", title: "估算站",
    type: "experiment", subject: "math", age: "5–10", icon: "🎯", ready: true,
    description: "先估后数，练习数量感和合理范围判断。",
    task: "连续完成三次估算，并说出哪一种分组方法让你猜得更接近。"
  },
  {
    id: "games/turtle-geometry.html", file: "turtle-geometry.html", title: "海龟几何",
    type: "experiment", subject: "code", age: "7–12", icon: "🐢", ready: true,
    description: "用移动、转向和循环把代码变成几何图形。",
    task: "让海龟画出一个闭合图形，并解释每次转角为什么能回到起点。"
  },
  {
    id: "games/gravity-drop.html", file: "gravity-drop.html", title: "自由落体",
    type: "experiment", subject: "physics", age: "6–12", icon: "🪶", ready: true,
    description: "比较重力与空气阻力对下落运动的影响。",
    task: "分别在有空气和真空条件下落下两个物体，记录并解释结果为什么不同。"
  },
  {
    id: "games/ramp-and-roll.html", file: "ramp-and-roll.html", title: "斜坡滚球",
    type: "experiment", subject: "physics", age: "7–12", icon: "⛰️", ready: true,
    description: "改变斜坡条件，观察势能、速度和距离的关系。",
    task: "一次只改变一个变量，预测球会停在哪里，再比较预测与结果。"
  },
  {
    id: "games/light-and-shadow.html", file: "light-and-shadow.html", title: "光与影",
    type: "experiment", subject: "physics", age: "5–10", icon: "🔦", ready: true,
    description: "移动光源与物体，观察影子的大小和形状。",
    task: "让影子先变大再变小，并用“光沿直线传播”解释你的操作。"
  },
  {
    id: "games/wave-maker.html", file: "wave-maker.html", title: "造波机",
    type: "experiment", subject: "physics", age: "7–12", icon: "🌊", ready: true,
    description: "调节振幅与频率，观察波的传播和干涉。",
    task: "制造一次明显增强和一次接近抵消的干涉，并描述两列波相遇时发生了什么。"
  },
  {
    id: "nature/dinosaurs.html", file: "dinosaurs.html", title: "恐龙与化石",
    type: "nature", subject: "science", age: "5–12", icon: "🦖", ready: true,
    description: "从化石证据推断恐龙的体形、体重与生活方式。",
    task: "挑一条恐龙结论，指出支持它的证据，并区分“知道”与“推测”。"
  },
  {
    id: "nature/space.html", file: "space.html", title: "太空站",
    type: "nature", subject: "space", age: "5–12", icon: "🪐", ready: true,
    description: "按真实数据比较行星的大小、重力与公转自转。",
    task: "选两颗行星，用至少两个数字说明它们最明显的不同。"
  },
  {
    id: "nature/ocean.html", file: "ocean.html", title: "海底世界",
    type: "nature", subject: "science", age: "5–12", icon: "🐋", ready: true,
    description: "沿海洋深度观察光、压力与生命的变化。",
    task: "选择一个深度带，解释那里有多少光、压力怎样，以及生物如何适应。"
  },
  {
    id: "nature/insects.html", file: "insects.html", title: "虫子放大镜",
    type: "nature", subject: "biology", age: "4–11", icon: "🐞", ready: true,
    description: "从尺度、力量和身体结构认识身边的昆虫。",
    task: "在不伤害昆虫的前提下观察一种虫，记录它的身体结构或一种行为。"
  },
  {
    id: "nature/earth.html", file: "earth.html", title: "地球与地震",
    type: "nature", subject: "earth", age: "6–12", icon: "🌍", ready: true,
    description: "用地层和真实地震数据理解不断变化的地球。",
    task: "找一次地震记录，读出震级和深度，并说明这两个数字分别表示什么。"
  },
  {
    id: "nature/weather.html", file: "weather.html", title: "天气工坊",
    type: "nature", subject: "earth", age: "5–11", icon: "🌦️", ready: true,
    description: "从云、雨、风和雷声观察大气中的能量与水循环。",
    task: "连续观察一次天气变化，记录云、风或降水的两个可见证据。"
  },
  {
    id: "nature/human-body.html", file: "human-body.html", title: "人体机器",
    type: "nature", subject: "biology", age: "5–12", icon: "❤️", ready: true,
    description: "用自己的脉搏、呼吸和骨骼探索人体系统。",
    task: "比较安静时和活动后的脉搏或呼吸，记录数字并解释变化。"
  }
];
