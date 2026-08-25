/* 少儿数理启蒙 · 本站探索目录
   Classic script；支持 file://，不依赖 fetch、module 或第三方资源。
   权威名单：每个 games/ 与 nature/ 下的非 index 详情页都必须有一条，且 id 等于相对仓库根的路径。
   条数不要抄到别的文件里写死，以本数组为准。 */
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
    description: "因为一条规则必须对所有输入都成立，所以用一个新数字就能检验猜想对不对。",
    task: "只看三组输入输出猜出规则，再用一个新数字检验你的猜想。"
  },
  {
    id: "games/symmetry-studio.html", file: "symmetry-studio.html", title: "对称工作室",
    type: "experiment", subject: "math", age: "5–11", icon: "❄️", ready: true,
    description: "因为镜像会把每个点复制到轴另一边的对应位置，所以只画一半也能补出完整图案。",
    task: "画一个同时包含直线和曲线的图案，找出它的对称轴或旋转中心。"
  },
  {
    id: "games/estimation-station.html", file: "estimation-station.html", title: "估算站",
    type: "experiment", subject: "math", age: "5–10", icon: "🎯", ready: true,
    description: "因为先分组再估计更有根据，所以换一种分组，就能看出哪次猜得更接近。",
    task: "连续完成三次估算，并说出哪一种分组方法让你猜得更接近。"
  },
  {
    id: "games/turtle-geometry.html", file: "turtle-geometry.html", title: "海龟几何",
    type: "experiment", subject: "code", age: "7–12", icon: "🐢", ready: true,
    description: "因为正多边形每次转过的外角加起来是一圈，所以重复同样的步数和转角就能回到起点、画出闭合图形。",
    task: "让海龟画出一个闭合图形，并解释每次转角为什么能回到起点。"
  },
  {
    id: "games/doodle-pad.html", file: "doodle-pad.html", title: "彩虹小画室",
    type: "experiment", subject: "art", age: "4–10", icon: "🎨", ready: true,
    description: "因为点连起来成为线、镜像会把笔画复制到另一边，所以颜色、粗细和印章都会改变画面。",
    task: "用至少 3 种颜色画 3 笔，再盖 1 个印章，给作品讲一个小故事。"
  },
  {
    id: "games/gravity-drop.html", file: "gravity-drop.html", title: "自由落体",
    type: "experiment", subject: "physics", age: "6–12", icon: "🪶", ready: true,
    description: "因为真空里没有空气阻力，所以轻重不同的东西会一起落到地上。",
    task: "分别在有空气和真空条件下落下两个物体，记录并解释结果为什么不同。"
  },
  {
    id: "games/ramp-and-roll.html", file: "ramp-and-roll.html", title: "斜坡滚球",
    type: "experiment", subject: "physics", age: "7–12", icon: "⛰️", ready: true,
    description: "因为斜坡越高球开始时的重力势能通常越多，所以一次只改一个条件，才能看出是谁让球滚得更远。",
    task: "一次只改变一个变量，预测球会停在哪里，再比较预测与结果。"
  },
  {
    id: "games/light-and-shadow.html", file: "light-and-shadow.html", title: "光与影",
    type: "experiment", subject: "physics", age: "5–10", icon: "🔦", ready: true,
    description: "因为光沿直线走、挡住光才会在后方成影，所以只挪灯就能让影子变大或变小。",
    task: "让影子先变大再变小，并用“光沿直线传播”解释你的操作。"
  },
  {
    id: "games/wave-maker.html", file: "wave-maker.html", title: "造波机",
    type: "experiment", subject: "physics", age: "7–12", icon: "🌊", ready: true,
    description: "因为两列波相遇会暂时叠在一起，所以能看见一次明显变高、一次几乎抵消。",
    task: "制造一次明显增强和一次接近抵消的干涉，并描述两列波相遇时发生了什么。"
  },
  {
    id: "games/balance-lab.html", file: "balance-lab.html", title: "杠杆天平",
    type: "experiment", subject: "physics", age: "5–10", icon: "⚖️", ready: true,
    description: "因为平衡看的是力乘力臂而不是谁更重，所以同一块砝码离支点越远，越容易把另一边抬起。",
    task: "找出两种不同的摆法，让天平两边力矩相等并保持平衡。"
  },
  {
    id: "games/circuit-lab.html", file: "circuit-lab.html", title: "电路工坊",
    type: "experiment", subject: "physics", age: "7–12", icon: "💡", ready: true,
    description: "因为灯要亮电流必须走完一圈，并联时各走各的路，所以一盏坏了另一盏还能亮。",
    task: "让一盏灯亮起来，再比较串联双灯和并联双灯有什么不同。"
  },
  {
    id: "games/clock-workshop.html", file: "clock-workshop.html", title: "时钟工坊",
    type: "experiment", subject: "math", age: "5–8", icon: "🕒", ready: true,
    description: "因为短针走小时、长针每大格是五分钟，所以半点时短针会停在两个数字正中间。",
    task: "连续对上三个时刻，并说出短针和长针各管什么。"
  },
  {
    id: "games/magnet-lab.html", file: "magnet-lab.html", title: "磁铁工坊",
    type: "experiment", subject: "physics", age: "5–10", icon: "🧲", ready: true,
    description: "因为异名磁极相吸、同名磁极相斥，所以翻转一端就能从吸住变成互相推开。",
    task: "先让两块磁铁吸住，再翻转一端让它们互相推开。"
  },
  {
    id: "games/chance-jar.html", file: "chance-jar.html", title: "概率罐子",
    type: "experiment", subject: "math", age: "6–11", icon: "🎲", ready: true,
    description: "因为抽几次不一定刚好等于罐子里的比例，所以抽得越多，样本通常越接近真实比例。",
    task: "至少抽 10 次，说说样本看起来像不像罐子里的真实比例。"
  },
  {
    id: "games/measure-lab.html", file: "measure-lab.html", title: "测量工坊",
    type: "experiment", subject: "math", age: "5–9", icon: "📏", ready: true,
    description: "因为同一件东西用更小的单位去量数字会变大，所以必须带上单位，三个数字才能对上同一根尺子。",
    task: "用两种不同的单位量同一件物品，并解释数字为什么不一样。"
  },
  {
    id: "games/angle-lab.html", file: "angle-lab.html", title: "角度工坊",
    type: "experiment", subject: "math", age: "7–11", icon: "📐", ready: true,
    description: "因为角的大小看两条边张开多少、不看边有多长，所以边再画长，直角还是直角。",
    task: "做出一个直角和一个钝角，并说出它们差在哪里。"
  },
  {
    id: "games/graph-lab.html", file: "graph-lab.html", title: "条形统计台",
    type: "experiment", subject: "math", age: "6–10", icon: "📊", ready: true,
    description: "因为条形图把票数变成柱子的高度，所以先看谁最高，再核对数字，就能说出哪一种最多。",
    task: "投满 8 票，再看图说出哪一种最多。"
  },
  {
    id: "games/money-lab.html", file: "money-lab.html", title: "钱币凑整",
    type: "experiment", subject: "math", age: "6–10", icon: "🪙", ready: true,
    description: "因为十个 1 和一个 10 一样多，所以同一个总数可以用不同的硬币组合出来。",
    task: "用两种不同的硬币组合，凑出同一个目标金额。"
  },
  {
    id: "games/sound-box.html", file: "sound-box.html", title: "声音盒子",
    type: "experiment", subject: "physics", age: "5–10", icon: "🎵", ready: true,
    description: "因为音高看振动有多快、响度看振动有多大，所以能做出又高又轻和又低又响两种声音。",
    task: "做出一次又高又轻、一次又低又响，并说明音高不等于音量。"
  },
  {
    id: "games/heat-lab.html", file: "heat-lab.html", title: "冷热工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧊", ready: true,
    description: "因为热让同一份水的粒子动得不一样，所以它能变成冰、水和蒸汽三种样子。",
    task: "让同一份水走过结冰、液态和冒蒸汽三种样子。"
  },
  {
    id: "games/float-sink.html", file: "float-sink.html", title: "浮沉实验室",
    type: "experiment", subject: "physics", age: "5–10", icon: "🪵", ready: true,
    description: "因为沉浮还看排开了多少水，所以同一块黏土捏成船，就能浮起来。",
    task: "让同一块黏土先沉下去，再浮起来，并说出你改了什么。"
  },
  {
    id: "games/color-lab.html", file: "color-lab.html", title: "调色工坊",
    type: "experiment", subject: "physics", age: "5–9", icon: "🌈", ready: true,
    description: "因为颜料三原色两两叠在一起会变成间色，所以红加黄得到橙，红加蓝得到紫。",
    task: "选出两种三原色，调出橙、绿或紫中的一种。"
  },
  {
    id: "games/air-lab.html", file: "air-lab.html", title: "空气工坊",
    type: "experiment", subject: "physics", age: "5–9", icon: "🎈", ready: true,
    description: "因为空气占地方、被挤紧时体积变小压强变大，所以推针筒会觉得越来越难推，松开又会弹回来。",
    task: "把空气挤紧一次，再松开一次，说说体积和压强。"
  },
  {
    id: "games/water-cycle.html", file: "water-cycle.html", title: "水循环工坊",
    type: "experiment", subject: "physics", age: "5–10", icon: "💧", ready: true,
    description: "因为太阳把水变成水汽升上去，冷却后又落下，所以同一份水会再流回海里。",
    task: "走过蒸发和下雨，确认同一份水会再回来。"
  },
  {
    id: "games/sort-lab.html", file: "sort-lab.html", title: "排序小工厂",
    type: "experiment", subject: "code", age: "7–12", icon: "📶", ready: true,
    description: "因为排序就是一次次比较相邻的两根、决定要不要交换，所以走完一轮，当前最高的会沉到末尾。",
    task: "把一组柱子全部排好，并说出你比较过哪些相邻的两根。"
  },
  {
    id: "nature/dinosaurs.html", file: "dinosaurs.html", title: "恐龙与化石",
    type: "nature", subject: "science", age: "5–12", icon: "🦖", ready: true,
    description: "因为化石是留下来的证据、不是故事本身，所以一条脚印能告诉你怎么走，却不能单独证明它吃什么。",
    task: "挑一条恐龙结论，指出支持它的证据，并区分“知道”与“推测”。"
  },
  {
    id: "nature/space.html", file: "space.html", title: "太空站",
    type: "nature", subject: "space", age: "5–12", icon: "🪐", ready: true,
    description: "因为质量和半径都会改变表面重力，所以要用同一单位比两颗行星，才能看出谁会把你拉得更重。",
    task: "选两颗行星，用至少两个数字说明它们最明显的不同。"
  },
  {
    id: "nature/ocean.html", file: "ocean.html", title: "海底世界",
    type: "nature", subject: "science", age: "5–12", icon: "🐋", ready: true,
    description: "因为海水越深光越少、压力越大，所以浅处和深处住着完全不同的身体。",
    task: "选择一个深度带，解释那里有多少光、压力怎样，以及生物如何适应。"
  },
  {
    id: "nature/insects.html", file: "insects.html", title: "虫子放大镜",
    type: "nature", subject: "biology", age: "4–11", icon: "🐞", ready: true,
    description: "因为昆虫的六条腿都长在胸部，所以数清头、胸、腹，就能把它和蜘蛛分开。",
    task: "在不伤害昆虫的前提下观察一种虫，记录它的身体结构或一种行为。"
  },
  {
    id: "nature/beetles.html", file: "beetles.html", title: "甲虫图鉴馆",
    type: "nature", subject: "biology", age: "4–12", icon: "🪲", ready: true,
    description: "因为背上那层硬壳是变硬的前翅，软翅折在下面，所以先掀开鞘翅，才能看见它怎么飞。",
    task: "挑一只甲虫，说出它的鞘翅、腿和口器各自解决了什么问题。"
  },
  {
    id: "nature/earth.html", file: "earth.html", title: "地球与地震",
    type: "nature", subject: "earth", age: "6–12", icon: "🌍", ready: true,
    description: "因为震级、深度和位置说的是不同的事，所以两次数字接近，晃得却可能完全不一样。",
    task: "找一次地震记录，读出震级和深度，并说明这两个数字分别表示什么。"
  },
  {
    id: "nature/weather.html", file: "weather.html", title: "天气工坊",
    type: "nature", subject: "earth", age: "5–11", icon: "🌦️", ready: true,
    description: "因为声音比光慢得多，所以先看见闪电、后听见雷，中间隔几秒就能估云有多远。",
    task: "连续观察一次天气变化，记录云、风或降水的两个可见证据。"
  },
  {
    id: "nature/human-body.html", file: "human-body.html", title: "人体机器",
    type: "nature", subject: "biology", age: "5–12", icon: "❤️", ready: true,
    description: "因为活动时肌肉需要更多氧气，所以跑完后心跳和呼吸都会变快，安静时又会慢下来。",
    task: "比较安静时和活动后的脉搏或呼吸，记录数字并解释变化。"
  },
  {
    id: "nature/plants.html", file: "plants.html", title: "植物观察站",
    type: "nature", subject: "biology", age: "4–11", icon: "🌱", ready: true,
    description: "因为叶子的形状和边缘是适应光、水和风的方案，所以先看边缘和叶脉，不必先记住名字。",
    task: "对照图鉴认一片身边的叶子，说出它的形状和边缘。"
  },
  {
    id: "nature/birds.html", file: "birds.html", title: "鸟类观察站",
    type: "nature", subject: "biology", age: "5–12", icon: "🐦", ready: true,
    description: "从喙和脚推断鸟吃什么、站在哪里，而不是先背名字。",
    task: "选一只鸟，说出它的喙在解决什么取食问题。"
  },
  {
    id: "nature/rivers.html", file: "rivers.html", title: "河流观察站",
    type: "nature", subject: "earth", age: "5–11", icon: "🏞️", ready: true,
    description: "因为水往低处走，坡陡就搬石头、变慢就把沙子放下，所以弯道外侧被冲、内侧堆沙，河会越来越弯。",
    task: "点开至少两站，说出当前这一站的水在做什么。"
  },
  {
    id: "nature/trees.html", file: "trees.html", title: "树木观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌳", ready: true,
    description: "因为温带树木大约一年长一圈，宽圈通常更好过、窄圈更紧，所以数完圈就能指出哪一年过得宽裕。",
    task: "数完一圈圈年轮，指出一圈宽的和一圈窄的。"
  },
  {
    id: "nature/moon.html", file: "moon.html", title: "月亮观察站",
    type: "nature", subject: "space", age: "5–12", icon: "🌙", ready: true,
    description: "拨动月相，看我们看见的是被太阳照亮的那一半的多少。",
    task: "比较至少两种月相，说出亮的那一侧朝向太阳。"
  },
  {
    id: "nature/rocks.html", file: "rocks.html", title: "岩石与矿物",
    type: "nature", subject: "earth", age: "6–12", icon: "🪨", ready: true,
    description: "比较颗粒、层理和光泽，推断岩石是堆出来的、压出来的还是冷下来的。",
    task: "挑一块岩石，说出它更像颗粒堆成、一层层压成，还是熔岩冷成。"
  },
  {
    id: "nature/soil.html", file: "soil.html", title: "土壤观察站",
    type: "nature", subject: "earth", age: "5–11", icon: "🟫", ready: true,
    description: "因为沙子颗粒大、空隙大所以漏水，黏土颗粒细所以更保水，所以同一场雨后能看出哪一层先干。",
    task: "指出哪一层更保水、哪一层更容易漏水，并说出证据。"
  },
  {
    id: "nature/mammals.html", file: "mammals.html", title: "哺乳动物观察站",
    type: "nature", subject: "biology", age: "4–11", icon: "🦊", ready: true,
    description: "因为四肢会被生活环境改造成跑、飞、游的工具，所以蝙蝠会飞却仍喂奶，是哺乳动物不是鸟。",
    task: "点两只不一样的动物，说出它们各靠什么移动。"
  },
  {
    id: "nature/stars.html", file: "stars.html", title: "星空观察站",
    type: "nature", subject: "space", age: "5–12", icon: "⭐", ready: true,
    description: "认北斗、猎户和北极星，区分「最亮」和「能找北」。",
    task: "找出北极星，再拿另一颗对比，说出谁能当路标。"
  },
  {
    id: "nature/volcano.html", file: "volcano.html", title: "火山观察站",
    type: "nature", subject: "earth", age: "6–12", icon: "🌋", ready: true,
    description: "比较盾状火山和层状火山，分清慢慢流和猛地喷。",
    task: "点两张脾气不一样的图鉴，说出哪一个更温和。"
  },
  {
    id: "nature/fish.html", file: "fish.html", title: "鱼类观察站",
    type: "nature", subject: "biology", age: "4–11", icon: "🐟", ready: true,
    description: "因为鳍和体形是游泳工具、鳃是水里的换气工具，所以换一种鳍形，游法和呼吸都会不一样。",
    task: "点两条不一样的鱼，说出它们游或呼吸差在哪。"
  },
  {
    id: "nature/fungi.html", file: "fungi.html", title: "真菌观察站",
    type: "nature", subject: "biology", age: "6–12", icon: "🍄", ready: true,
    description: "因为真菌不是植物，靠分解或合作拿到食物，所以看见的蘑菇只是子实体，真正的身体在土里的菌丝。",
    task: "点两张图鉴，说出谁更像分解者，谁更像伙伴。"
  },
  {
    id: "nature/senses.html", file: "senses.html", title: "五感观察站",
    type: "nature", subject: "biology", age: "4–10", icon: "👁️", ready: true,
    description: "因为每种感觉器官只侦测一种信号，所以眼睛看光、耳朵听声，不能互相替代。",
    task: "点两种感觉，说出它们各自侦测什么。"
  },
  {
    id: "games/lens-lab.html", file: "lens-lab.html", title: "透镜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔍", ready: true,
    description: "因为凸透镜中间厚常把东西放大，凹透镜中间薄常把东西缩小，所以靠近和离远，花也会变。",
    task: "靠近焦点看一次，再离远看一次，说出花怎么变。"
  },
  {
    id: "games/pulley-lab.html", file: "pulley-lab.html", title: "滑轮工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚙️", ready: true,
    description: "因为定滑轮主要改方向，动滑轮把力分到两股绳子上，所以两个滑轮拉起来更轻，但绳子要拉更长。",
    task: "两种滑轮都试一次，比较拉起来是否更省力。"
  },
  {
    id: "games/mirror-lab.html", file: "mirror-lab.html", title: "镜子工坊",
    type: "experiment", subject: "physics", age: "5–10", icon: "🪞", ready: true,
    description: "因为平面镜左右对调、不是上下颠倒，所以对着镜子举左手，镜子里看起来像右手。",
    task: "做出一次左右对调，并确认镜子里的字反了。"
  },
  {
    id: "nature/reptiles.html", file: "reptiles.html", title: "爬行动物观察站",
    type: "nature", subject: "biology", age: "4–11", icon: "🦎", ready: true,
    description: "因为爬行动物多用鳞或甲保护身体，移动方式差很多，所以蛇没有脚也能靠腹部鳞片和身体的波浪往前走。",
    task: "点两只不一样的爬行动物，说出它们怎么移动。"
  },
  {
    id: "nature/habitats.html", file: "habitats.html", title: "栖息地观察站",
    type: "nature", subject: "science", age: "5–11", icon: "🏕️", ready: true,
    description: "因为一个地方缺水、缺热或缺食物，住在那里的身体就会不一样，所以沙漠最缺水、极地最缺热，能从身体猜出它住哪。",
    task: "点两个栖息地，说出哪里更缺水、热或食物。"
  },
  {
    id: "nature/crystals.html", file: "crystals.html", title: "晶体观察站",
    type: "nature", subject: "earth", age: "6–12", icon: "💎", ready: true,
    description: "因为晶体是按固定秩序一块块长出来的，所以会有平整的面，盐和雪花都是晶体只是材料不同。",
    task: "点两块晶体，说出谁更像叠盒子，谁更像薄片。"
  },
  {
    id: "games/friction-lab.html", file: "friction-lab.html", title: "摩擦工坊",
    type: "experiment", subject: "physics", age: "5–10", icon: "🧊", ready: true,
    description: "因为表面越粗糙摩擦力通常越大，所以同一块木块在冰上滑得远，在砂纸上很快停下。",
    task: "在光滑面和粗糙面上各滑一次，比较停得远近。"
  },
  {
    id: "games/spring-lab.html", file: "spring-lab.html", title: "弹簧工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪝", ready: true,
    description: "因为弹簧被拉得越重通常越长，放开后会往回缩，所以挂上重砝码会拉长，取下后又弹回去。",
    task: "挂一次轻的、一次重的，或加重后再取下看它恢复。"
  },
  {
    id: "games/bounce-lab.html", file: "bounce-lab.html", title: "弹性工坊",
    type: "experiment", subject: "physics", age: "5–10", icon: "🏀", ready: true,
    description: "因为硬而有弹性的面能把更多运动还回去，沙子会吃掉很多，所以同一颗球在木板上弹得高，在沙子上几乎不弹。",
    task: "在硬面和软面上各落一次，比较谁弹得高。"
  },
  {
    id: "nature/amphibians.html", file: "amphibians.html", title: "两栖动物观察站",
    type: "nature", subject: "biology", age: "4–11", icon: "🐸", ready: true,
    description: "因为蝌蚪用鳃、成蛙用肺，皮肤也能帮忙，所以小时候多半在水里，长大后才能走上陆地。",
    task: "点两个阶段或两种两栖动物，说出谁更靠水、谁更能上陆地。"
  },
  {
    id: "nature/foodweb.html", file: "foodweb.html", title: "食物网观察站",
    type: "nature", subject: "science", age: "6–12", icon: "🕸️", ready: true,
    description: "因为箭头表示谁把能量传给谁，起点常常是太阳和植物，所以没有草，后面的动物就没有可传的能量。",
    task: "点一个生产者和一个消费者，说出箭头该怎么画。"
  },
  {
    id: "nature/seasons.html", file: "seasons.html", title: "四季观察站",
    type: "nature", subject: "earth", age: "4–10", icon: "🍂", ready: true,
    description: "因为夏天白天更长不是因为地球离太阳更近，所以叶子、候鸟和冬眠会跟着白天长短变，而不是跟着远近变。",
    task: "点两个季节，说出哪一个白天更长。"
  },
  {
    id: "games/static-lab.html", file: "static-lab.html", title: "静电工坊",
    type: "experiment", subject: "physics", age: "5–10", icon: "⚡", ready: true,
    description: "因为摩擦会让电荷搬家，所以气球能吸起纸屑，两只带电的气球还会互相推开。",
    task: "先让气球吸住纸屑，再让两只带电气球互相推开。"
  },
  {
    id: "games/spin-lab.html", file: "spin-lab.html", title: "旋转工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎡", ready: true,
    description: "因为转得越快东西越想往外跑，所以快转时更靠外，一停下来就掉回来。",
    task: "做一次慢转和一次快转，比较谁更往外。"
  },
  {
    id: "games/layer-lab.html", file: "layer-lab.html", title: "分层工坊",
    type: "experiment", subject: "physics", age: "5–11", icon: "🍯", ready: true,
    description: "因为密度大的液体会沉到底、小的浮在上面，所以油浮在水面，蜂蜜沉在杯底。",
    task: "倒进两种不同液体，再静置，看谁沉底谁浮在上面。"
  },
  {
    id: "nature/migration.html", file: "migration.html", title: "迁徙观察站",
    type: "nature", subject: "biology", age: "5–12", icon: "🕊️", ready: true,
    description: "因为走和留下都是活下去的办法，所以冬天缺食时有的飞走，有的换一身厚毛留下来。",
    task: "点一个会迁徙的和一个留下的，说出为什么有的要走。"
  },
  {
    id: "nature/nests.html", file: "nests.html", title: "巢穴观察站",
    type: "nature", subject: "biology", age: "4–11", icon: "🪺", ready: true,
    description: "因为家是工程，有的编、有的挖、有的糊泥，所以蜂巢用六边形能用最少的蜡装最多的蜂蜜。",
    task: "点两个家，说出谁在地上、谁在地下或树上。"
  },
  {
    id: "nature/teeth.html", file: "teeth.html", title: "牙齿观察站",
    type: "nature", subject: "biology", age: "4–10", icon: "🦷", ready: true,
    description: "因为牙齿的形状在说它负责切断还是磨碎，所以门牙像铲子切断，臼齿像磨盘磨碎。",
    task: "点两种牙齿，说出谁负责切断、谁负责磨碎。"
  },
  {
    id: "games/volume-lab.html", file: "volume-lab.html", title: "体积工坊",
    type: "experiment", subject: "math", age: "5–10", icon: "🥤", ready: true,
    description: "因为体积看装了多少、不看液面有多高，所以同样多的水，杯子高液面就高，杯子胖液面就低。",
    task: "用两种不同形状装同样多的水，比较液面高低。"
  },
  {
    id: "games/scale-lab.html", file: "scale-lab.html", title: "天平称重",
    type: "experiment", subject: "math", age: "5–9", icon: "⚖️", ready: true,
    description: "因为哪一边更重托盘就往哪边沉，所以加减到两边一样重，横梁就会平。",
    task: "先让一边沉下去，再调到两边平衡。"
  },
  {
    id: "games/echo-lab.html", file: "echo-lab.html", title: "回声工坊",
    type: "experiment", subject: "physics", age: "5–11", icon: "📢", ready: true,
    description: "因为声音碰到墙会弹回来、墙越远回来越慢，所以对着远墙喊，回声会晚一拍才到。",
    task: "听一次近的回声和一次远的回声，比较快慢。"
  },
  {
    id: "nature/worms.html", file: "worms.html", title: "蚯蚓观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪱", ready: true,
    description: "因为蚯蚓既拆落叶又在土里钻洞，所以它是分解者也是土壤工程师，沙蚕和蚂蟥则是水里的亲戚。",
    task: "点两张图鉴，说出谁住在土里、谁住在水里。"
  },
  {
    id: "nature/skeleton.html", file: "skeleton.html", title: "骨骼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦴", ready: true,
    description: "因为有的骨头像盒子负责保护，有的像杠杆负责活动，所以头骨护脑，四肢能撑起来走路。",
    task: "点两块骨头，说出谁更像保护、谁更像活动。"
  },
  {
    id: "nature/coral.html", file: "coral.html", title: "珊瑚观察站",
    type: "nature", subject: "biology", age: "6–12", icon: "🪸", ready: true,
    description: "认识珊瑚是动物不是石头，它需要光，水太热会白化。",
    task: "点一张活珊瑚和礁石，说出谁是动物、谁是房子。"
  },
  {
    id: "games/area-lab.html", file: "area-lab.html", title: "面积工坊",
    type: "experiment", subject: "math", age: "5–9", icon: "🟦", ready: true,
    description: "用单位正方形铺满图形，再改成另一种形状，比较面积和周长。",
    task: "做出两个格子数相同、形状不同的图形。"
  },
  {
    id: "games/compass-lab.html", file: "compass-lab.html", title: "指南针工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧭", ready: true,
    description: "因为红针自己找北、你转的是盒子，所以转开罗盘盒，针仍指同一边。",
    task: "先对准北方，再转开，然后再转回来找回北。"
  },
  {
    id: "games/filter-lab.html", file: "filter-lab.html", title: "过滤工坊",
    type: "experiment", subject: "physics", age: "5–10", icon: "🫗", ready: true,
    description: "因为孔越小拦住的细泥越多，所以细孔下面的水更清，过滤只分开大小，不会把脏东西变没。",
    task: "细孔倒一次，再粗孔倒一次，比较杯子是清还是浑。"
  },
  {
    id: "games/siphon-lab.html", file: "siphon-lab.html", title: "虹吸工坊",
    type: "experiment", subject: "physics", age: "6–10", icon: "🫧", ready: true,
    description: "两只杯子一根软管：出口更低且管子装满时，水会自己往低处流。",
    task: "先让虹吸开始，再让它停下来。"
  },
  {
    id: "nature/seeds.html", file: "seeds.html", title: "种子观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌱", ready: true,
    description: "因为种子先离开老家才不会挤在一起抢光抢水，所以蒲公英坐风走，苍耳钩住毛，椰子会漂。",
    task: "点两颗不一样的种子，说出它们怎么走。"
  },
  {
    id: "nature/eyes.html", file: "eyes.html", title: "眼睛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "👁️", ready: true,
    description: "因为瞳孔让光进来、晶状体把它聚到后面，所以猫的瞳孔能缩成一条缝，夜里也能看。",
    task: "点两张图鉴，说出白天、夜里或透镜个数。"
  },
  {
    id: "nature/maps.html", file: "maps.html", title: "地图观察站",
    type: "nature", subject: "earth", age: "6–12", icon: "🗺️", ready: true,
    description: "因为地图是缩小的模型，符号必须对照图例才读得懂，所以蓝线常常是河，比例尺告诉你有多远。",
    task: "点两个地图符号，说出它们各代表什么。"
  },
  {
    id: "games/code-cards.html", file: "code-cards.html", title: "不插电指令",
    type: "experiment", subject: "code", age: "6–11", icon: "🃏", ready: true,
    description: "因为一次只做一张卡片上的事，所以顺序错了就会走错，改一张卡片就能看出偏到哪。",
    task: "先走到目标，再改一张卡片，看它怎样走错或修好。"
  },
  {
    id: "games/thermo-lab.html", file: "thermo-lab.html", title: "温度工坊",
    type: "experiment", subject: "physics", age: "5–10", icon: "🌡️", ready: true,
    description: "因为液体受热会膨胀，所以热了液柱升高、冷了下降，读的是刻度不是颜色。",
    task: "调出一次偏低的读数和一次偏高的读数。"
  },
  {
    id: "nature/digestion.html", file: "digestion.html", title: "消化观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🍽️", ready: true,
    description: "因为每一站做的事不一样，小肠才是吸收养分的主要地方，所以食物要走完这条路，养分才会进身体。",
    task: "点两个站点，说出谁更靠前、谁更靠后。"
  },
  {
    id: "games/incline-lab.html", file: "incline-lab.html", title: "斜面工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📐", ready: true,
    description: "同样高的箱子，陡坡和缓坡比谁更省力、谁路更长。",
    task: "试一次陡坡和一次缓坡，比较推起来费不费力。"
  },
  {
    id: "nature/clouds.html", file: "clouds.html", title: "云朵观察站",
    type: "nature", subject: "earth", age: "5–11", icon: "☁️", ready: true,
    description: "因为云是水汽变冷后聚成的小水滴或小冰晶，所以卷云住得最高，雨云更低、更厚才会下雨。",
    task: "点两朵不一样的云，说出哪一朵住得更高。"
  },
  {
    id: "games/pendulum-lab.html", file: "pendulum-lab.html", title: "摆钟工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕰️", ready: true,
    description: "同一重力下，绳子越长来回越慢；锤子轻重几乎不改快慢。",
    task: "试一次短绳和一次长绳，比较来回谁更慢。"
  },
  {
    id: "nature/fossils.html", file: "fossils.html", title: "化石观察站",
    type: "nature", subject: "science", age: "6–11", icon: "🦴", ready: true,
    description: "因为脚印只记下活动、骨头才留下身体，所以一块脚印能告诉你怎么走，却不是它的身体变成了石头。",
    task: "点两块不一样的化石，说出哪一块是身体化石。"
  },
  {
    id: "games/gear-lab.html", file: "gear-lab.html", title: "齿轮工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚙️", ready: true,
    description: "咬合的齿轮方向相反。大带小更快更轻，小带大更慢更有力。",
    task: "试一次大带小和一次小带大，比较快慢和力气。"
  },
  {
    id: "nature/bees.html", file: "bees.html", title: "蜜蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "因为工蜂和熊蜂身上会沾花粉，下一朵花才能结种子，所以黄蜂更瘦、更爱捉虫子，不是蜜蜂。",
    task: "点两张不一样的卡，说出谁更会传粉。"
  },
  {
    id: "games/capillary-lab.html", file: "capillary-lab.html", title: "毛细工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "管子越细，水爬得越高。餐巾纸和植物茎里也有细缝。",
    task: "试一次细管和一次粗管，比较水爬多高。"
  },
  {
    id: "nature/tides.html", file: "tides.html", title: "潮汐观察站",
    type: "nature", subject: "earth", age: "6–11", icon: "🌊", ready: true,
    description: "比较高潮、低潮和大潮小潮。潮汐是月亮拉海水，不是风浪。",
    task: "点两次不一样的潮位，说出哪一次水更高。"
  },
  {
    id: "games/pressure-lab.html", file: "pressure-lab.html", title: "压强工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔘", ready: true,
    description: "同一份空气，体积越小压强越大。开口针筒不会这样。",
    task: "试一次压紧和一次松开，再说哪一次压强更大。"
  },
  {
    id: "nature/lungs.html", file: "lungs.html", title: "肺与呼吸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🫁", ready: true,
    description: "吸气时膈肌往下、肺变大；呼气时肺变小。比较谁在换气。",
    task: "点一次吸气、一次呼气，再说肺在哪一次更大。"
  },
  {
    id: "nature/caves.html", file: "caves.html", title: "洞穴观察站",
    type: "nature", subject: "earth", age: "6–11", icon: "🦇", ready: true,
    description: "比较石钟乳、石笋和滴水。洞顶往下长的是石钟乳。",
    task: "点两张不一样的卡，说出谁更靠洞顶。"
  },
  {
    id: "games/convection-lab.html", file: "convection-lab.html", title: "对流动工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "♨️", ready: true,
    description: "热水变轻往上走，冷水变重往下沉，于是转成一圈。",
    task: "试一次很热和一次几乎不热，比较环流。"
  },
  {
    id: "nature/glaciers.html", file: "glaciers.html", title: "冰川观察站",
    type: "nature", subject: "earth", age: "6–11", icon: "🧊", ready: true,
    description: "比较冰川、冰山和冰碛。冰川是厚冰在慢慢往下走。",
    task: "点两张不一样的卡，说出谁更像会走路的冰。"
  },
  {
    id: "games/insulation-lab.html", file: "insulation-lab.html", title: "保温工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧣", ready: true,
    description: "同一块冰，包得越厚化得越慢。空气层让热走慢。",
    task: "试一次很厚和一次几乎不包，比较水洼大小。"
  },
  {
    id: "nature/shells.html", file: "shells.html", title: "贝壳观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐚", ready: true,
    description: "比较螺、双壳和寄居蟹。贝壳是动物盖的硬房子。",
    task: "点两张不一样的卡，说出谁更像自己盖的房子。"
  },
  {
    id: "games/wheel-lab.html", file: "wheel-lab.html", title: "轮轴工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎡", ready: true,
    description: "大轮子转一圈，小轴也转一圈；手走得更远，提桶更省力。",
    task: "试一次大轮和一次小轮，比较力和路程。"
  },
  {
    id: "nature/feathers.html", file: "feathers.html", title: "羽毛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪶", ready: true,
    description: "比较飞羽和绒羽。有的帮忙飞，有的把空气困住保暖。",
    task: "点两张不一样的卡，说出谁更会帮忙飞。"
  },
  {
    id: "games/screw-lab.html", file: "screw-lab.html", title: "螺旋工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔩", ready: true,
    description: "螺丝钉是绕起来的斜面。螺纹越密越省力，但要转更多圈。",
    task: "试一次密螺纹和一次疏螺纹，比较力和圈数。"
  },
  {
    id: "nature/moss.html", file: "moss.html", title: "苔藓地衣观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌿", ready: true,
    description: "比较苔藓和地衣。苔藓是小小的植物，地衣是真菌加藻类的伙伴。",
    task: "点两张不一样的卡，说出谁更像一小株植物。"
  },
  {
    id: "games/hydraulic-lab.html", file: "hydraulic-lab.html", title: "液压工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧴", ready: true,
    description: "两只相连的针筒：细的那边用力，粗的那边力更大、走得更短。",
    task: "试一次细针筒推、一次粗针筒推，比较力和路程。"
  },
  {
    id: "games/dissolve-lab.html", file: "dissolve-lab.html", title: "溶解工坊",
    type: "experiment", subject: "physics", age: "5–11", icon: "🧂", ready: true,
    description: "盐放进水里会看不见，沙子只会沉底。溶解不是消失，是拆成很小很小。",
    task: "试一次盐、一次沙，比较谁会溶开、谁会沉底。"
  },
  {
    id: "nature/ants.html", file: "ants.html", title: "蚂蚁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐜", ready: true,
    description: "比较工蚁、兵蚁和白蚁。蚂蚁是小队，地上那条细线是信息素小路。",
    task: "点两张不一样的卡，说出谁更像蚂蚁这种会分工的昆虫。"
  },
  {
    id: "games/wedge-lab.html", file: "wedge-lab.html", title: "楔子工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪓", ready: true,
    description: "楔子是两面斜坡对在一起。越尖越省力，但要推得更深。",
    task: "试一次尖楔子和一次钝楔子，比较力和深度。"
  },
  {
    id: "nature/spiders.html", file: "spiders.html", title: "蜘蛛丝观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕷️", ready: true,
    description: "比较织网蛛和跳蛛。有的用丝做成陷阱，有的自己跳过去抓。",
    task: "点两张不一样的卡，说出谁更像用丝做陷阱。"
  },
  {
    id: "games/prism-lab.html", file: "prism-lab.html", title: "棱镜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔺", ready: true,
    description: "白光穿过三棱镜会拆成彩虹色。滤色片只放行一种颜色。",
    task: "试一次棱镜、一次滤色片，比较谁会把白光拆开。"
  },
  {
    id: "nature/rainbow.html", file: "rainbow.html", title: "彩虹观察站",
    type: "nature", subject: "earth", age: "5–11", icon: "🌈", ready: true,
    description: "比较水滴、阳光和霓虹灯。彩虹是小水滴把白光掰弯、拆开。",
    task: "点两张不一样的卡，说出谁更像真正让彩虹出现的条件。"
  },
  {
    id: "games/cam-lab.html", file: "cam-lab.html", title: "凸轮工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚙️", ready: true,
    description: "凸轮一边鼓出来。转一圈，杆子上下动一次。鼓得越高，抬得越高。",
    task: "试一次蛋形凸轮和一次圆轮，比较杆子抬多高。"
  },
  {
    id: "nature/snow.html", file: "snow.html", title: "雪观察站",
    type: "nature", subject: "earth", age: "5–11", icon: "❄️", ready: true,
    description: "比较雪花、霜和冰雹。雪是云里结成的六角冰晶，不是冻硬的雨。",
    task: "点两张不一样的卡，说出谁更像从云里落下的雪。"
  },
  {
    id: "games/rust-lab.html", file: "rust-lab.html", title: "锈蚀工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧱", ready: true,
    description: "铁钉生锈需要铁、水和空气。涂漆会挡住，干着会慢很多。",
    task: "试一次湿的裸铁钉、一次涂了漆的钉，比较谁更容易锈。"
  },
  {
    id: "nature/frost.html", file: "frost.html", title: "霜雪观察站",
    type: "nature", subject: "earth", age: "5–11", icon: "❄️", ready: true,
    description: "比较霜、雪、露水和冰雹。霜是水汽在冷东西上直接结成的冰花。",
    task: "点两张不一样的卡，说出谁更像贴在冷处开出来的霜。"
  },
  {
    id: "nature/dew.html", file: "dew.html", title: "露水观察站",
    type: "nature", subject: "earth", age: "5–11", icon: "💧", ready: true,
    description: "比较露、霜、雾和雨。露是水汽在冷叶子上结成的小水珠。",
    task: "点两张不一样的卡，说出谁更像贴在叶子上的露。"
  },
  {
    id: "games/condense-lab.html", file: "condense-lab.html", title: "凝结工坊",
    type: "experiment", subject: "physics", age: "5–11", icon: "🧊", ready: true,
    description: "热气碰到冷杯子会变成小水珠。杯子越冷，外壁越容易出汗。",
    task: "试一次冷杯子和一次热杯子，比较谁会出汗。"
  },
  {
    id: "nature/owls.html", file: "owls.html", title: "猫头鹰观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦉", ready: true,
    description: "比较静翼、面盘和乌鸦翅膀。猫头鹰靠锯齿飞羽静飞，用夜眼找路。",
    task: "点两张不一样的卡，说出谁更像夜里静飞的猫头鹰。"
  },
  {
    id: "games/resonance-lab.html", file: "resonance-lab.html", title: "共振工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎻", ready: true,
    description: "酒杯沿和弦都有自己喜欢的振动速度。推得对，声音会变大。",
    task: "试一次酒杯沿和一次绷紧的弦，比较谁会自己唱。"
  },
  {
    id: "nature/bats.html", file: "bats.html", title: "蝙蝠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦇", ready: true,
    description: "比较蝙蝠、猫头鹰和飞鸟。蝙蝠用回声认路，是会飞的哺乳动物。",
    task: "点两张不一样的卡，说出谁更像用回声认路的蝙蝠。"
  },
  {
    id: "games/doppler-lab.html", file: "doppler-lab.html", title: "多普勒工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🚑", ready: true,
    description: "救护车开来更尖，开走更低。喇叭没换调，是波被挤紧或拉开。",
    task: "试一次开来和一次开走，比较音调。"
  },
  {
    id: "nature/fireflies.html", file: "fireflies.html", title: "萤火虫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "✨", ready: true,
    description: "比较萤火虫、蜡烛和电灯。萤火虫尾巴几乎不烫，是活着的冷光。",
    task: "点两张不一样的卡，说出谁更像几乎不烫的活灯。"
  },
  {
    id: "games/chemilum-lab.html", file: "chemilum-lab.html", title: "冷光工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧪", ready: true,
    description: "荧光棒掰一下会亮，几乎不烫。蜡烛会烫。冷光把能量多变成光。",
    task: "试一次荧光棒和一次蜡烛，比较谁会烫手。"
  },
  {
    id: "nature/jellyfish.html", file: "jellyfish.html", title: "水母观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪼", ready: true,
    description: "比较水母、鱼和珊瑚。水母没有骨头，伞一缩就把水往后推。",
    task: "点两张不一样的卡，说出谁更像没有骨头的软伞。"
  },
  {
    id: "games/pulse-lab.html", file: "pulse-lab.html", title: "脉冲工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "袋子一挤，水往后喷，袋子往前走。张开只是重新装满。",
    task: "试一次挤和一次张开，比较水和袋子往哪。"
  },
  {
    id: "nature/anemones.html", file: "anemones.html", title: "海葵观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪸", ready: true,
    description: "比较海葵、花和珊瑚。海葵是动物：触手会抓，盘足贴在石头上。",
    task: "点两张不一样的卡，说出谁更像触手加盘足的海葵。"
  },
  {
    id: "games/latch-lab.html", file: "latch-lab.html", title: "卡扣工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪤", ready: true,
    description: "上了弦的卡扣轻轻一碰就弹。慢慢压同一根弹簧只会缩短。",
    task: "试一次拨扳机和一次慢慢压，比较小针会不会飞。"
  },
  {
    id: "nature/octopuses.html", file: "octopuses.html", title: "章鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐙", ready: true,
    description: "比较章鱼、鱿鱼和鱼。章鱼没有骨头，用吸盘抓住东西。",
    task: "点两张不一样的卡，说出谁更像八条胳膊的章鱼。"
  },
  {
    id: "games/suction-lab.html", file: "suction-lab.html", title: "吸盘工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔘", ready: true,
    description: "吸盘贴紧时外面的空气把它压住。漏气就掉，不是胶水。",
    task: "试一次按紧和一次漏气，比较会不会掉。"
  },
  {
    id: "nature/starfish.html", file: "starfish.html", title: "海星观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "⭐", ready: true,
    description: "比较海星、海胆和鱼。海星用管足走路，嘴在肚子下面。",
    task: "点两张不一样的卡，说出谁更像五条胳膊的海星。"
  },
  {
    id: "games/hydrostat-lab.html", file: "hydrostat-lab.html", title: "水囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "装满水的软袋子，捏一头会变硬。漏水就软，不是骨头。",
    task: "试一次捏一头和一次漏水，比较硬还是软。"
  },
  {
    id: "nature/seahorses.html", file: "seahorses.html", title: "海马观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐠", ready: true,
    description: "比较海马、普通鱼和马。海马是鱼：背鳍让它立着走，尾巴会卷住海草。",
    task: "点两张不一样的卡，说出谁更像立着游的海马。"
  },
  {
    id: "games/sticky-lab.html", file: "sticky-lab.html", title: "贴力工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📎", ready: true,
    description: "吸盘要先封口，再靠外面的空气压住。漏气就掉。胶带、壁虎、魔术贴是别的贴法。",
    task: "密封挂一次，再漏气挂一次，比较谁挂得住。"
  },
  {
    id: "games/grip-lab.html", file: "grip-lab.html", title: "卷尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "软尾巴绕住杆子就能挂住。松开或太滑，立刻掉下来。",
    task: "试一次卷紧和一次松开，比较会不会掉。"
  },
  {
    id: "nature/crabs.html", file: "crabs.html", title: "螃蟹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦀", ready: true,
    description: "比较螃蟹、昆虫和虾。螃蟹有硬壳和钳子，长大要换壳。",
    task: "点两张不一样的卡，说出谁更像横着走的螃蟹。"
  },
  {
    id: "games/pinch-lab.html", file: "pinch-lab.html", title: "钳子工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦀", ready: true,
    description: "两根杆交叉，捏手柄夹口合上。张开就掉，不是胶水。",
    task: "试一次合上和一次张开，比较能不能夹住。"
  },
  {
    id: "nature/penguins.html", file: "penguins.html", title: "企鹅观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐧", ready: true,
    description: "比较企鹅、飞鸟和鱼。企鹅用翅膀当桨，羽毛上有油。",
    task: "点两张不一样的卡，说出谁更像翅膀当桨的企鹅。"
  },
  {
    id: "nature/flamingos.html", file: "flamingos.html", title: "火烈鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦩", ready: true,
    description: "比较火烈鸟、企鹅和鸭子。火烈鸟一只腿站直，弯喙倒过来滤浅水，不只是粉色。",
    task: "点两张不一样的卡，说出谁更像一只腿站直、弯喙滤水的火烈鸟。"
  },
  {
    id: "games/oil-lab.html", file: "oil-lab.html", title: "油膜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪶", ready: true,
    description: "羽毛上有油，水会滚走。油被洗掉，水就钻进去。",
    task: "试一次涂油和一次洗油，比较水是滚走还是钻进去。"
  },
  {
    id: "nature/snails.html", file: "snails.html", title: "蜗牛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐌", ready: true,
    description: "比较蜗牛、蛞蝓和蚯蚓。蜗牛用肚子当脚，背上有螺旋壳。",
    task: "点两张不一样的卡，说出谁更像肚子当脚的蜗牛。"
  },
  {
    id: "games/slime-lab.html", file: "slime-lab.html", title: "黏液工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫧", ready: true,
    description: "湿黏液让软脚滑过粗糙面。干路会粘住、走不动。",
    task: "试一次湿路和一次干路，比较走不走得动。"
  },
  {
    id: "nature/lightning.html", file: "lightning.html", title: "闪电观察站",
    type: "nature", subject: "earth", age: "5–11", icon: "⚡", ready: true,
    description: "比较闪电、烟花和灯。闪电是云和地之间一下子跳过去的大火花。",
    task: "点两张不一样的卡，说出谁更像云地之间的闪电。"
  },
  {
    id: "games/spark-lab.html", file: "spark-lab.html", title: "火花工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✨", ready: true,
    description: "中间留小缝，电荷会跳过去闪一下。两头贴住，电流悄悄走。",
    task: "试一次小缝和一次贴住，比较会不会闪。"
  },
  {
    id: "nature/hail.html", file: "hail.html", title: "冰雹观察站",
    type: "nature", subject: "earth", age: "5–11", icon: "🧊", ready: true,
    description: "比较冰雹、雪和雨。冰雹是雷雨云里一层层冻起来的硬冰球。",
    task: "点两张不一样的卡，说出谁更像一层层冻起来的冰雹。"
  },
  {
    id: "games/freeze-lab.html", file: "freeze-lab.html", title: "冻结工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧊", ready: true,
    description: "同一滴水，送进冷处冻出新圈。留在暖处还是液体。",
    task: "试一次冷处和一次暖处，比较会不会冻出新圈。"
  },
  {
    id: "nature/whales.html", file: "whales.html", title: "鲸鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐋", ready: true,
    description: "比较鲸鱼、鱼和海豚。鲸鱼用肺呼吸，头顶有喷气孔。",
    task: "点两张不一样的卡，说出谁更像头顶喷气的鲸鱼。"
  },
  {
    id: "games/blowhole-lab.html", file: "blowhole-lab.html", title: "喷气孔工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💨", ready: true,
    description: "细孔开着，气会喷成一柱。孔封住，气出不来。",
    task: "试一次打开和一次封住，比较会不会喷成柱。"
  },
  {
    id: "nature/beavers.html", file: "beavers.html", title: "河狸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦫", ready: true,
    description: "比较河狸、水獭和鱼。河狸用树枝和泥拦河，住水上小屋。",
    task: "点两张不一样的卡，说出谁更像会拦河的河狸。"
  },
  {
    id: "games/dam-lab.html", file: "dam-lab.html", title: "水坝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪵", ready: true,
    description: "坝把路堵住，水就堆高。开一个口，水就流走。",
    task: "试一次堵住和一次开口，比较水会不会堆高。"
  },
  {
    id: "nature/dragonflies.html", file: "dragonflies.html", title: "蜻蜓观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐉", ready: true,
    description: "比较蜻蜓、豆娘和蝴蝶。蜻蜓有两对能分开扇的翅膀，能停在空中。",
    task: "点两张不一样的卡，说出谁更像四翅能停住的蜻蜓。"
  },
  {
    id: "games/wing-lab.html", file: "wing-lab.html", title: "翅膀工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪽", ready: true,
    description: "两对翅膀能各自扇，就可以悬停。一对翅膀多半要往前扑。",
    task: "试一次两对悬停和一次一对扑打，比较能不能停住。"
  },
  {
    id: "nature/butterflies.html", file: "butterflies.html", title: "蝴蝶观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦋", ready: true,
    description: "比较蝴蝶、蛾和蜻蜓。蝴蝶先是毛毛虫，再进蛹，出来才有鳞粉翅膀。",
    task: "点两张不一样的卡，说出谁更像会做蛹的蝴蝶。"
  },
  {
    id: "games/chrysalis-lab.html", file: "chrysalis-lab.html", title: "展翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦋", ready: true,
    description: "刚出蛹的翅膀皱着飞不了。体液打满再晾干，才能扇风。",
    task: "试一次皱着和一次打满，比较能不能扇风。"
  },
  {
    id: "nature/seagrass.html", file: "seagrass.html", title: "海草观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌿", ready: true,
    description: "比较海草、海藻和陆上的草。海草会开花、有根，有光时冒氧气泡。",
    task: "点两张不一样的卡，说出谁更像水下开花的海草。"
  },
  {
    id: "games/bubble-lab.html", file: "bubble-lab.html", title: "气泡工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一株水草，见光冒泡，蒙黑就停。泡是叶子放出的氧气。",
    task: "试一次见光和一次蒙黑，比较会不会冒泡。"
  },
  {
    id: "nature/cicadas.html", file: "cicadas.html", title: "蝉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦗", ready: true,
    description: "比较蝉、蝗虫和蟋蟀。蝉在土里长大，爬上树把旧壳脱掉再唱歌。",
    task: "点两张不一样的卡，说出谁更像会蜕壳唱歌的蝉。"
  },
  {
    id: "games/molt-lab.html", file: "molt-lab.html", title: "蜕壳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪲", ready: true,
    description: "硬壳不能跟着长。背上裂开才能换号，卡住就出不去。",
    task: "试一次裂开和一次卡住，比较出不出得来。"
  },
  {
    id: "nature/mangroves.html", file: "mangroves.html", title: "红树观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌳", ready: true,
    description: "比较红树、海草和松树。红树长在咸水淤泥里，根会伸出水面换气。",
    task: "点两张不一样的卡，说出谁更像会露头换气的红树。"
  },
  {
    id: "games/snorkel-lab.html", file: "snorkel-lab.html", title: "通气管工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪵", ready: true,
    description: "管子露头能换气，没入水里就断气。开口必须通到空气。",
    task: "试一次露头和一次没入，比较空气走不走得通。"
  },
  {
    id: "nature/kelp.html", file: "kelp.html", title: "海带观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🥬", ready: true,
    description: "比较海带、海草和树。海带是藻，用固着器抓住礁石，气囊帮它漂起来。",
    task: "点两张不一样的卡，说出谁更像抓住礁石的海带。"
  },
  {
    id: "games/holdfast-lab.html", file: "holdfast-lab.html", title: "固着工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "爪子按进糙石缝里就抓得住。从边上掀开，或换光滑面，立刻掉。",
    task: "试一次按进和一次掀开，比较抓不抓得住。"
  },
  {
    id: "nature/dandelions.html", file: "dandelions.html", title: "蒲公英观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌼", ready: true,
    description: "比较蒲公英、枫翅和鸟。蒲公英种子顶着绒毛伞，风一吹就慢慢飘。",
    task: "点两张不一样的卡，说出谁更像带着降落伞的蒲公英。"
  },
  {
    id: "games/parachute-lab.html", file: "parachute-lab.html", title: "降落伞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪂", ready: true,
    description: "绒毛张开掉得慢，捏扁掉得快。空气在托伞，不是种子变轻。",
    task: "试一次张开和一次捏扁，比较掉得快慢。"
  },
  {
    id: "nature/otters.html", file: "otters.html", title: "海獭观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦦", ready: true,
    description: "比较海獭、海豹和河狸。海獭用密毛把空气藏住保暖，还会拿石头砸开贝壳。",
    task: "点两张不一样的卡，说出谁更像密毛藏气的海獭。"
  },
  {
    id: "games/fur-air.html", file: "fur-air.html", title: "毛气工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧥", ready: true,
    description: "毛蓬松时空气藏在里面，热走得慢。挤湿以后气室塌了，热走得快。",
    task: "试一次蓬松和一次挤湿，比较热走得快不快。"
  },
  {
    id: "nature/turtles.html", file: "turtles.html", title: "龟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐢", ready: true,
    description: "比较海龟、陆龟和蛇。龟背是圆顶骨房，力会传到边上，头能往里缩。",
    task: "点两张不一样的卡，说出谁更像带着圆顶壳的龟。"
  },
  {
    id: "games/dome-shell.html", file: "dome-shell.html", title: "圆顶壳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏛️", ready: true,
    description: "壳鼓成圆顶，力走到边上；压扁成板，中间先弯。",
    task: "试一次圆顶和一次压扁，比较中间塌不塌。"
  },
  {
    id: "nature/seals.html", file: "seals.html", title: "海豹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦭", ready: true,
    description: "比较海豹、海獭和鱼。海豹靠皮下厚脂肪保暖，毛短而贴，会爬上岸。",
    task: "点两张不一样的卡，说出谁更像厚脂肪的海豹。"
  },
  {
    id: "games/blubber-lab.html", file: "blubber-lab.html", title: "脂肪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧈", ready: true,
    description: "包一层油脂，凉来得慢。光着手伸进冷水，凉一下子到。",
    task: "试一次包油脂和一次光着手，比较凉来得快不快。"
  },
  {
    id: "nature/geckos.html", file: "geckos.html", title: "壁虎观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较壁虎、光滑蜥蜴和雨蛙。壁虎用干刚毛贴玻璃，沾水或油就滑。",
    task: "点两张不一样的卡，说出谁更像干脚趾贴墙的壁虎。"
  },
  {
    id: "games/setae-lab.html", file: "setae-lab.html", title: "刚毛工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "脚趾擦干能贴住玻璃。沾水或油，毛尖被隔开，立刻滑。",
    task: "试一次擦干和一次沾湿，比较还贴不贴得住。"
  },
  {
    id: "nature/plankton.html", file: "plankton.html", title: "浮游观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🔬", ready: true,
    description: "比较浮游生物、海蜇和鱼。浮游生物很小，几乎不会自己游远，靠水带着走。",
    task: "点两张不一样的卡，说出谁更像跟着水走的浮游生物。"
  },
  {
    id: "games/drift-lab.html", file: "drift-lab.html", title: "漂流工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📄", ready: true,
    description: "同一张纸，摊开掉得慢，揉成团掉得快。面积大，水或空气托得住。",
    task: "试一次摊开和一次揉团，比较掉得快慢。"
  },
  {
    id: "nature/lotus.html", file: "lotus.html", title: "荷花观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪷", ready: true,
    description: "比较荷叶、睡莲和毛巾。荷叶上有蜡突，水会缩成珠子把泥带走。",
    task: "点两张不一样的卡，说出谁更像水珠会滚的荷叶。"
  },
  {
    id: "games/bead-lab.html", file: "bead-lab.html", title: "滚珠工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "叶子涂蜡，水缩成珠会滚。把蜡擦掉，水就摊开。",
    task: "试一次涂蜡和一次擦掉，比较水是珠子还是摊开。"
  },
  {
    id: "nature/pinecones.html", file: "pinecones.html", title: "松果观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌲", ready: true,
    description: "比较松果、橡子和花。松果鳞片干了张开，湿了合拢。",
    task: "点两张不一样的卡，说出谁更像干张湿合的松果。"
  },
  {
    id: "games/humidity-lab.html", file: "humidity-lab.html", title: "干湿工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌰", ready: true,
    description: "同一颗松果，烘干鳞片张开，沾湿鳞片合拢。它自己弯。",
    task: "试一次烘干和一次沾湿，比较鳞片张不张开。"
  },
  {
    id: "nature/tidepools.html", file: "tidepools.html", title: "潮池观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪨", ready: true,
    description: "比较潮池、雨洼和大海。潮池是退潮留在礁石缝里的小海，高处干、低处湿。",
    task: "点两张不一样的卡，说出谁更像退潮留下的潮池。"
  },
  {
    id: "games/zone-lab.html", file: "zone-lab.html", title: "分区工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📶", ready: true,
    description: "同一块石头，高处晒干，低处泡着。干湿日子不同，邻居也不同。",
    task: "试一次高处和一次低处，比较两种日子。"
  },
  {
    id: "nature/sharks.html", file: "sharks.html", title: "鲨鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较鲨鱼、硬骨鱼和海豚。鲨鱼皮铺着朝后的小齿鳞，从头摸到尾顺。",
    task: "点两张不一样的卡，说出谁更像铺着朝后小齿鳞的鲨鱼。"
  },
  {
    id: "games/denticle-lab.html", file: "denticle-lab.html", title: "盾鳞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一条鱼，装上盾鳞水贴着走，换成光滑皮后面更乱。",
    task: "试一次装上盾鳞和一次换成光滑皮，比较水是贴着走还是打转。"
  },
  {
    id: "nature/eels.html", file: "eels.html", title: "电鳗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "⚡", ready: true,
    description: "比较电鳗、真鳗和普通鱼。电鳗肚子里叠着电细胞，会放电探路或打猎。",
    task: "点两张不一样的卡，说出谁更像叠着电细胞的电鳗。"
  },
  {
    id: "games/amp-lab.html", file: "amp-lab.html", title: "电堆工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔋", ready: true,
    description: "同一叠电片，少几片脉冲弱，叠很多脉冲强。电压顺着串联相加。",
    task: "试一次少几片和一次叠很多，比较脉冲强弱。"
  },
  {
    id: "nature/cacti.html", file: "cacti.html", title: "仙人掌观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌵", ready: true,
    description: "比较仙人掌、多肉和树。仙人掌用肉茎藏水，刺是叶子变的。",
    task: "点两张不一样的卡，说出谁更像肉茎藏水的仙人掌。"
  },
  {
    id: "games/store-lab.html", file: "store-lab.html", title: "储水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一根肉茎，灌满就鼓着，挤干就瘪下去。",
    task: "试一次灌满和一次挤干，比较茎鼓不鼓。"
  },
  {
    id: "nature/crows.html", file: "crows.html", title: "乌鸦观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦‍⬛", ready: true,
    description: "比较乌鸦、鸽子和鹦鹉。乌鸦会把铁丝弯成钩，把杯子里的小环钓上来。",
    task: "点两张不一样的卡，说出谁更像会弯钩的乌鸦。"
  },
  {
    id: "games/hook-lab.html", file: "hook-lab.html", title: "弯钩工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪝", ready: true,
    description: "同一根铁丝，直着钩不住。弯一下成钩，就能把环钓上来。",
    task: "试一次弯钩和一次直着，比较钓不钓得上来。"
  },
  {
    id: "nature/hummingbirds.html", file: "hummingbirds.html", title: "蜂鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌺", ready: true,
    description: "比较蜂鸟、鸽子和飞机。蜂鸟翅膀走八字，能停在花前面。",
    task: "点两张不一样的卡，说出谁更像能停在花前的蜂鸟。"
  },
  {
    id: "games/hover-lab.html", file: "hover-lab.html", title: "悬停工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪽", ready: true,
    description: "同一对翅膀，走出八字就能停在花前；只往前飞，一停就掉。",
    task: "试一次八字停空和一次只往前飞，比较停不停得住。"
  },
  {
    id: "nature/woodpeckers.html", file: "woodpeckers.html", title: "啄木鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪵", ready: true,
    description: "比较啄木鸟、鸽子和锤子。啄木鸟用凿子嘴敲树，舌头绕头当安全带。",
    task: "点两张不一样的卡，说出谁更像凿子嘴敲树的啄木鸟。"
  },
  {
    id: "games/shock-lab.html", file: "shock-lab.html", title: "减震工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🛡️", ready: true,
    description: "同一记敲，中间有软垫震就散开；没垫就直穿到头。",
    task: "试一次有垫和一次没垫，比较震走不走得到头。"
  },
  {
    id: "nature/salmons.html", file: "salmons.html", title: "鲑鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较鲑鱼、鲤鱼和金鱼。鲑鱼会逆着河往上爬，身子会变，不是待在水塘里的鱼。",
    task: "点两张不一样的卡，说出谁更像会逆流、会变身的鲑鱼。"
  },
  {
    id: "games/current-lab.html", file: "current-lab.html", title: "逆流工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔼", ready: true,
    description: "同一条鱼，顺着流会被带走，逆着游才能往上。",
    task: "试一次顺着流和一次逆着游，比较被带走还是往上顶。"
  },
  {
    id: "nature/chameleons.html", file: "chameleons.html", title: "变色龙观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较变色龙、壁虎和颜料桶。变色龙皮下有小格子，挤紧和拉开会换色。",
    task: "点两张不一样的卡，说出谁更像皮下有格子会换色的变色龙。"
  },
  {
    id: "games/chroma-lab.html", file: "chroma-lab.html", title: "鳞缝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💠", ready: true,
    description: "同一层小瓦，挤紧缝多半反蓝绿，拉开缝多半反黄红。",
    task: "试一次挤紧格子和一次拉开格子，比较弹回来的光。"
  },
  {
    id: "games/blend-lab.html", file: "blend-lab.html", title: "叠色工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎨", ready: true,
    description: "同一层颜色格子，张开就深，收拢就浅。不是把身子涂成花壁纸。",
    task: "试一次格子张开和一次格子收拢，比较身子深浅。"
  },
  {
    id: "nature/porcupines.html", file: "porcupines.html", title: "豪猪观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦔", ready: true,
    description: "比较豪猪、刺猬和仙人掌。豪猪的刺是空心的毛，碰一下才会掉，不是飞镖。",
    task: "点两张不一样的卡，说出谁更像背上长空心刺的豪猪。"
  },
  {
    id: "games/quill-lab.html", file: "quill-lab.html", title: "空心刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪶", ready: true,
    description: "同一根刺，空心就轻，实心就沉。背上要扛很多根，空心才划得来。",
    task: "试一次空心和一次实心，比较谁更轻。"
  },
  {
    id: "nature/pandas.html", file: "pandas.html", title: "熊猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐼", ready: true,
    description: "比较熊猫、棕熊和浣熊。熊猫前掌多一块籽骨当钩，才能握住竹子。",
    task: "点两张不一样的卡，说出谁更像多一根钩握竹子的熊猫。"
  },
  {
    id: "games/bamboo-lab.html", file: "bamboo-lab.html", title: "握竹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎋", ready: true,
    description: "同一根竹子，有钩能卡住；没有钩就滑掉。",
    task: "试一次有钩和一次没钩，比较竹子滑不滑。"
  },
  {
    id: "nature/skunks.html", file: "skunks.html", title: "臭鼬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦨", ready: true,
    description: "比较臭鼬、家猫和豪猪。臭鼬先跺脚、竖尾巴警告，喷雾是最后一招。",
    task: "点两张不一样的卡，说出谁更像先警告、最后才喷的臭鼬。"
  },
  {
    id: "games/spray-lab.html", file: "spray-lab.html", title: "喷雾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧴", ready: true,
    description: "同一瓶水，细孔喷得远，敞口流下来。出口变窄，同样一挤就更快。",
    task: "试一次细孔和一次敞口，比较谁喷得远。"
  },
  {
    id: "nature/albatross.html", file: "albatross.html", title: "信天翁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕊️", ready: true,
    description: "比较信天翁、海鸥和蜂鸟。信天翁翅膀又长又窄，肩上能锁住，靠两层风滑。",
    task: "点两张不一样的卡，说出谁更像锁住长翅、去借海风的信天翁。"
  },
  {
    id: "games/soar-lab.html", file: "soar-lab.html", title: "借风工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌬️", ready: true,
    description: "同一对长翅膀。锁上肩、钻进两层风就能滑远；拿掉锁狂拍就掉。",
    task: "试一次锁翅借风和一次拿掉锁狂拍，比较谁滑得远。"
  },
  {
    id: "nature/camels.html", file: "camels.html", title: "骆驼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐪", ready: true,
    description: "比较骆驼、马和水箱。驼峰里装的是脂肪，不是一罐水。",
    task: "点两张不一样的卡，说出谁更像背上驮着脂肪粮仓的骆驼。"
  },
  {
    id: "games/hump-lab.html", file: "hump-lab.html", title: "驼峰工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎒", ready: true,
    description: "同一包东西，脂肪是干粮，水是饮料。没吃的时候脂肪更能扛。",
    task: "试一次脂肪和一次水，比较谁更能当干粮。"
  },
  {
    id: "nature/squids.html", file: "squids.html", title: "乌贼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦑", ready: true,
    description: "比较乌贼、鱼和气球。乌贼把水从漏斗喷出去，身子往反方向走。",
    task: "点两张不一样的卡，说出谁更像把水往后喷、身子往前走的乌贼。"
  },
  {
    id: "games/jet-lab.html", file: "jet-lab.html", title: "反冲工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎈", ready: true,
    description: "同一只气球，细口放气往反方向飞；不开口只掉下来。",
    task: "试一次放气和一次扎紧，比较谁会往前飞。"
  },
  {
    id: "nature/kingfishers.html", file: "kingfishers.html", title: "翠鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较翠鸟、苍鹭和鸭子。翠鸟从树枝上尖头扎进水里抓鱼。",
    task: "点两张不一样的卡，说出谁更像尖头扎水的翠鸟。"
  },
  {
    id: "games/dive-lab.html", file: "dive-lab.html", title: "入水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一个速度，尖头入水花小；圆头入水花大。",
    task: "试一次尖头和一次圆头，比较水花大小。"
  },
  {
    id: "nature/foxes.html", file: "foxes.html", title: "狐狸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦊", ready: true,
    description: "比较狐狸、猫和狼。狐狸先听雪下的老鼠，蹲下去再伸直后腿跳出去。",
    task: "点两张不一样的卡，说出谁更像先听再蹲、后腿一伸跳出去的狐狸。"
  },
  {
    id: "games/pounce-lab.html", file: "pounce-lab.html", title: "弹跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一条腿，先蹲再伸直跳得高；站直跳几乎不起来。",
    task: "试一次蹲跳和一次站直，比较谁跳得高。"
  },
  {
    id: "nature/frogs.html", file: "frogs.html", title: "青蛙观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较青蛙、蟾蜍和蜥蜴。青蛙后腿先折起来再弹出去。蝌蚪还没有腿。",
    task: "点两张不一样的卡，说出谁更像先蹲再弹的青蛙。"
  },
  {
    id: "games/jump-lab.html", file: "jump-lab.html", title: "起跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦿", ready: true,
    description: "同一双后腿，先折起来再蹬直就能弹远；一直伸直就弹不起来。",
    task: "试一次先折再蹬和一次一直伸直，比较谁弹得远。"
  },
  {
    id: "nature/giraffes.html", file: "giraffes.html", title: "长颈鹿观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦒", ready: true,
    description: "比较长颈鹿、人和蛇。长颈鹿的脖子也是七节颈椎，每一节特别长。",
    task: "点两张不一样的卡，说出谁更像七节拉长椎骨的长颈鹿。"
  },
  {
    id: "games/neck-lab.html", file: "neck-lab.html", title: "长颈工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦴", ready: true,
    description: "同一条管子，分成好几节就能弯；一整根就硬。",
    task: "试一次分段和一次整根，比较谁能弯过去够叶子。"
  },
  {
    id: "nature/peacocks.html", file: "peacocks.html", title: "孔雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦚", ready: true,
    description: "比较孔雀、火鸡和雉鸡。孔雀把背上的尾屏打开，像扇子，眼斑对着你。",
    task: "点两张不一样的卡，说出谁更像打开尾屏给人看的孔雀。"
  },
  {
    id: "games/fan-lab.html", file: "fan-lab.html", title: "开屏工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪭", ready: true,
    description: "同一把尾屏。打开像扇子，面积大、眼斑看得见；合上就藏住。",
    task: "试一次打开和一次合上，比较面积和眼斑。"
  },
  {
    id: "nature/armadillos.html", file: "armadillos.html", title: "犰狳观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🛡️", ready: true,
    description: "比较犰狳、乌龟和刺猬。犰狳背上是能折的骨板，有的能蜷成球。",
    task: "点两张不一样的卡，说出谁更像背上有活动骨板的犰狳。"
  },
  {
    id: "games/roll-lab.html", file: "roll-lab.html", title: "蜷球工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🟡", ready: true,
    description: "同一排骨板，缝能折就能蜷成球；一整块就蜷不动。",
    task: "试一次蜷成球和一次摊开，比较谁能包住自己。"
  },
  {
    id: "nature/elephants.html", file: "elephants.html", title: "大象观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐘", ready: true,
    description: "比较大象、吸管和水管。大象鼻子是一捆能卷的肌肉，不是空心吸管。",
    task: "点两张不一样的卡，说出谁更像用肌肉鼻子卷东西的大象。"
  },
  {
    id: "games/trunk-lab.html", file: "trunk-lab.html", title: "长鼻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌀", ready: true,
    description: "同一条软管，装满才能弯过去卷住；空着就瘪掉。",
    task: "试一次装满和一次空管，比较谁卷得住。"
  },
  {
    id: "nature/hedgehogs.html", file: "hedgehogs.html", title: "刺猬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦔", ready: true,
    description: "比较刺猬、豪猪和犰狳。刺猬的刺是变硬的毛，能蜷成球，一般不掉。",
    task: "点两张不一样的卡，说出谁更像刺是毛、能蜷成球的刺猬。"
  },
  {
    id: "games/curl-lab.html", file: "curl-lab.html", title: "蜷刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦔", ready: true,
    description: "同一件带刺外套，皮肤一缩就能包成球；绷紧摊平就包不住。",
    task: "试一次缩成刺球和一次摊开，比较肚皮藏不藏得住。"
  },
  {
    id: "nature/kangaroos.html", file: "kangaroos.html", title: "袋鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦘", ready: true,
    description: "比较袋鼠、兔子和马。袋鼠后腿的腱像弹簧，落地再弹起来。",
    task: "点两张不一样的卡，说出谁更像落地压紧腱、再弹起来的袋鼠。"
  },
  {
    id: "games/hop-lab.html", file: "hop-lab.html", title: "回弹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "同一根皮筋，先拉长再松手就弹得远；不拉只松手几乎不动。",
    task: "试一次拉长和一次不拉，比较谁弹得远。"
  },
  {
    id: "nature/rhinos.html", file: "rhinos.html", title: "犀牛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦏", ready: true,
    description: "比较犀牛、鹿和牛。犀牛角是一层层压实的角质，不是骨头，也不是牙。",
    task: "点两张不一样的卡，说出谁更像角是压实角质的犀牛。"
  },
  {
    id: "games/horn-lab.html", file: "horn-lab.html", title: "角质工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🟤", ready: true,
    description: "同一把角质纤维，压实就硬得像角；松开就软得像头发。",
    task: "试一次压实和一次松开，比较软硬。"
  },
  {
    id: "nature/hippos.html", file: "hippos.html", title: "河马观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦛", ready: true,
    description: "比较河马、鸭子和鳄鱼。河马身子沉，眼耳鼻长在头顶，多半在水底走路。",
    task: "点两张不一样的卡，说出谁更像身子沉、只露眼睛的河马。"
  },
  {
    id: "games/sink-lab.html", file: "sink-lab.html", title: "沉底工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍾", ready: true,
    description: "同一只瓶子。装满水只露出盖子；空着整瓶漂在面上。",
    task: "试一次装满和一次空着，比较谁坐得低。"
  },
  {
    id: "nature/sloths.html", file: "sloths.html", title: "树懒观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦥", ready: true,
    description: "比较树懒、猴子和壁虎。树懒用弯钩一样的爪子挂在树枝上，不是胶水。",
    task: "点两张不一样的卡，说出谁更像钩爪挂住树枝的树懒。"
  },
  {
    id: "games/hang-lab.html", file: "hang-lab.html", title: "挂钩工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪝", ready: true,
    description: "同一只衣架，钩住横杆就挂得住；光滑贴着不钩就会掉。",
    task: "试一次钩住和一次贴着，比较谁挂得住。"
  },
  {
    id: "nature/platypuses.html", file: "platypuses.html", title: "鸭嘴兽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦆", ready: true,
    description: "比较鸭嘴兽、鸭子和河狸。鸭嘴兽的喙能感到猎物的微弱电信号，不是普通鸭子嘴。",
    task: "点两张不一样的卡，说出谁更像喙能感到颤的鸭嘴兽。"
  },
  {
    id: "games/bill-lab.html", file: "bill-lab.html", title: "电喙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📡", ready: true,
    description: "同一张喙，打开探测器就能感到藏着的小虾；只看浑水什么也看不见。",
    task: "试一次探测器和一次只看，比较谁找得到。"
  },
  {
    id: "nature/pangolins.html", file: "pangolins.html", title: "穿山甲观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐾", ready: true,
    description: "比较穿山甲、犰狳和蜥蜴。穿山甲身上是一层层角质鳞，像屋顶的瓦。",
    task: "点两张不一样的卡，说出谁更像角质鳞叠成瓦的穿山甲。"
  },
  {
    id: "games/keratin-lab.html", file: "keratin-lab.html", title: "叠瓦工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧱", ready: true,
    description: "同一叠角质片，叠成瓦就能弯；铺成一整块就裂。",
    task: "试一次叠瓦和一次整板，比较谁能弯、谁会裂。"
  },
  {
    id: "nature/meerkats.html", file: "meerkats.html", title: "狐獴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "👀", ready: true,
    description: "比较狐獴、狐狸和单独的獴。狐獴一群里总有一只站起来当哨。",
    task: "点两张不一样的卡，说出谁更像有人抬头当哨的狐獴。"
  },
  {
    id: "games/sentry-lab.html", file: "sentry-lab.html", title: "哨兵工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🗼", ready: true,
    description: "同一群，留一只抬头看就看得见鹰；大家都低头就看不见。",
    task: "试一次留哨和一次全低头，比较谁看得见鹰。"
  },
  {
    id: "nature/anteaters.html", file: "anteaters.html", title: "食蚁兽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐜", ready: true,
    description: "比较食蚁兽、大象和穿山甲。食蚁兽的舌头又长又黏，不是象鼻，也不是吸尘器。",
    task: "点两张不一样的卡，说出谁更像长舌头黏蚂蚁的食蚁兽。"
  },
  {
    id: "games/tongue-lab.html", file: "tongue-lab.html", title: "长舌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👅", ready: true,
    description: "同一根舌头，又长又湿就能粘到洞底；又短又干只能戳到洞口。",
    task: "试一次长湿和一次短干，比较谁粘得到。"
  },
  {
    id: "games/stand-lab.html", file: "stand-lab.html", title: "锁膝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一条腿。膝盖锁直就站得稳；两膝都弯就会晃。",
    task: "试一次锁住一膝和一次两膝都弯，比较谁更稳。"
  },
  {
    id: "nature/wombats.html", file: "wombats.html", title: "袋熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐻", ready: true,
    description: "比较袋熊、袋鼠和兔子。袋熊的便便是方块，能堆在石头上不滚走。",
    task: "点两张不一样的卡，说出谁更像方块能堆住的袋熊。"
  },
  {
    id: "games/dig-lab.html", file: "dig-lab.html", title: "方圆滚坡工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬜", ready: true,
    description: "同一块泥：捏成方块更易停在坡上，搓成圆球更容易滚走——形状会改变能不能站住。",
    task: "试一次方块和一次圆球，比较谁停在坡上，并说出为什么。"
  },
  {
    id: "nature/tapirs.html", file: "tapirs.html", title: "貘观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐽", ready: true,
    description: "比较貘、大象和猪。貘的短吻能卷住近处细枝，不是长鼻子，也不是拱土圆盘。",
    task: "点两张不一样的卡，说出谁更像短吻能卷的貘。"
  },
  {
    id: "games/snout-lab.html", file: "snout-lab.html", title: "短吻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一段短吻。软肉弯过去能卷住叶子；硬棍戳一下，叶子滑开。",
    task: "试一次软卷和一次硬戳，比较谁抓得住。"
  },
  {
    id: "nature/narwhals.html", file: "narwhals.html", title: "独角鲸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦄", ready: true,
    description: "比较独角鲸、犀牛和独角兽。独角鲸额头伸出的是一颗左犬齿，能感到水，不是角。",
    task: "点两张不一样的卡，说出谁更像长牙能感到水的独角鲸。"
  },
  {
    id: "games/tusk-lab.html", file: "tusk-lab.html", title: "牙尖工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一根牙。细管开着，水一变就能感到；蜡封住就什么也感不到。",
    task: "试一次开管和一次封管，比较谁感到水。"
  },
  {
    id: "nature/aye-ayes.html", file: "aye-ayes.html", title: "指狐猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "👆", ready: true,
    description: "比较指狐猴、啄木鸟和乌鸦。指狐猴先敲木头再听，再用细中指捞虫，不是鸟。",
    task: "点两张不一样的卡，说出谁更像先敲再捞的指狐猴。"
  },
  {
    id: "games/tap-lab.html", file: "tap-lab.html", title: "敲听工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一块板。敲听能找到空心；捂住耳朵硬戳就会错过。",
    task: "试一次敲听和一次不听硬戳，比较谁找得到。"
  },
  {
    id: "nature/okapis.html", file: "okapis.html", title: "霍加狓观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🟤", ready: true,
    description: "比较霍加狓、斑马和孔雀。霍加狓白纹只在后腿，林影里把轮廓拆开。",
    task: "点两张不一样的卡，说出谁更像后纹拆轮廓的霍加狓。"
  },
  {
    id: "games/stripe-lab.html", file: "stripe-lab.html", title: "后纹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸兽。后纹拆开轮廓；全身都画上纹，整块就露出来。",
    task: "试一次后纹和一次全身纹，比较谁藏得住。"
  },
  {
    id: "nature/axolotls.html", file: "axolotls.html", title: "美西螈观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较美西螈、青蛙和蝉。美西螈一辈子留着外鳃，腿断了还能再长。",
    task: "点两张不一样的卡，说出谁更像外鳃留下、腿能再长的美西螈。"
  },
  {
    id: "games/regen-lab.html", file: "regen-lab.html", title: "再长工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌱", ready: true,
    description: "同一条腿。留下软芽就能再长；把口封死就什么也不长。",
    task: "试一次软芽和一次封口，比较谁长得回。"
  },
  {
    id: "nature/cassowaries.html", file: "cassowaries.html", title: "鹤鸵观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪖", ready: true,
    description: "比较鹤鸵、犀牛和长颈鹿。鹤鸵盔长在头顶，把叶子拨开，眼睛还能看路。",
    task: "点两张不一样的卡，说出谁更像头顶盔拨叶子的鹤鸵。"
  },
  {
    id: "games/casque-lab.html", file: "casque-lab.html", title: "盔突工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪖", ready: true,
    description: "同一只纸盔。戴在头顶，叶子拨开；挪到鼻子，眼前就糊了。",
    task: "试一次头顶和一次鼻子，比较谁看得清路。"
  },
  {
    id: "nature/capybaras.html", file: "capybaras.html", title: "水豚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐹", ready: true,
    description: "比较水豚、海獭和河马。水豚毛稀，身子湿着散热，不是毛里藏气，也不是沉在水底。",
    task: "点两张不一样的卡，说出谁更像毛稀、身子湿着散热的水豚。"
  },
  {
    id: "games/wet-lab.html", file: "wet-lab.html", title: "湿岸工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一只纸兽。毛打湿，热散得走；擦干，整块就露在岸上。",
    task: "试一次打湿和一次擦干，比较谁藏得住。"
  }  ,
  {
    id: "nature/manatees.html", file: "manatees.html", title: "海牛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐋", ready: true,
    description: "比较海牛、鱼和海豹。海牛用肠子里的气调节沉浮，不是鱼鳔，也不是厚脂肪。",
    task: "点两张不一样的卡，说出谁更像肠气沉浮的海牛。"
  }  ,
  {
    id: "games/ballast-lab.html", file: "ballast-lab.html", title: "压载工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫧", ready: true,
    description: "同一只纸兽。肚子里气多就浮，气少就沉。",
    task: "试一次气多和一次气少，比较谁浮得起来。"
  }  ,
  {
    id: "nature/kiwis.html", file: "kiwis.html", title: "几维鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🥝", ready: true,
    description: "比较几维鸟、猫头鹰和翠鸟。几维鸟鼻孔开在喙尖，夜里把喙插进土里闻蚯蚓。",
    task: "点两张不一样的卡，说出谁更像喙尖闻土的几维鸟。"
  }  ,
  {
    id: "games/nare-lab.html", file: "nare-lab.html", title: "喙尖工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👃", ready: true,
    description: "同一根喙。鼻孔在尖上才能在土里闻到；挪到根部就闻不到。",
    task: "试一次尖上和一次根部，比较谁闻得到。"
  }  ,
  {
    id: "nature/tuataras.html", file: "tuataras.html", title: "楔齿蜥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较楔齿蜥和变色龙。楔齿蜥头顶有顶眼，能感到亮暗，不是第三只能拍照的眼睛。",
    task: "点两张不一样的卡，说出谁更像头顶有顶眼的楔齿蜥。"
  }  ,
  {
    id: "games/parietal-lab.html", file: "parietal-lab.html", title: "顶眼光工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "☀️", ready: true,
    description: "同一块头皮窗。开着能感到头顶亮暗；封住就分不清白天晚上。",
    task: "试一次开窗和一次封住，比较谁分得清亮暗。"
  }  ,
  {
    id: "nature/puffins.html", file: "puffins.html", title: "海鹦观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较海鹦、企鹅和翠鸟。海鹦嘴里能同时叼好几条小鱼，靠舌头和上腭的刺卡住。",
    task: "点两张不一样的卡，说出谁更像一口叼好几条鱼的海鹦。"
  }  ,
  {
    id: "nature/walrus.html", file: "walrus.html", title: "海象观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦭", ready: true,
    description: "比较海象、海豹和独角鲸。海象用密须在浑水里摸蛤蜊，长牙用来破冰撑身子。",
    task: "点两张不一样的卡，说出谁更像用触须摸蛤蜊的海象。"
  }  ,
  {
    id: "nature/lyrebirds.html", file: "lyrebirds.html", title: "琴鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🎵", ready: true,
    description: "比较琴鸟和乌鸦。琴鸟靠鸣管肌肉学各种声音，不是回声定位。",
    task: "点两张不一样的卡，说出谁更像会学声的琴鸟。"
  }  ,
  {
    id: "games/mimic-lab.html", file: "mimic-lab.html", title: "学声工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎤", ready: true,
    description: "同一条嗓子。听得够才能学像；听不够就只剩自己的叫声。",
    task: "试一次听够和一次听不够，比较谁学得像。"
  }  ,
  {
    id: "games/carry-lab.html", file: "carry-lab.html", title: "叼鱼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐟", ready: true,
    description: "同一张嘴。刺够才能卡住好几条；刺少就只剩一条。",
    task: "试一次刺够和一次刺少，比较谁叼得住。"
  }  ,
  {
    id: "games/whisker-lab.html", file: "whisker-lab.html", title: "触须工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一排须。须够密才能在浑水摸到壳；拔光就只剩瞎戳。",
    task: "试一次须密和一次拔光，比较谁摸得到。"
  }  ,
  {
    id: "nature/muskoxen.html", file: "muskoxen.html", title: "麝牛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐂", ready: true,
    description: "比较麝牛和野牛。麝牛遇风会挤成圈挡风，不是毛衣够厚就不用挤。",
    task: "点两张不一样的卡，说出谁更像挤圈挡风的麝牛。"
  }  ,
  {
    id: "games/huddle-lab.html", file: "huddle-lab.html", title: "挤圈工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⭕", ready: true,
    description: "同一群纸兽。肩贴上才挡得住风；散开风就钻进来。",
    task: "试一次挤圈和一次散开，比较谁挡得住。"
  }
  ,
  {
    id: "nature/numbats.html", file: "numbats.html", title: "袋食蚁兽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "👅", ready: true,
    description: "比较袋食蚁兽、大食蚁兽和穿山甲。袋食蚁兽白天用细长舌伸进白蚁冢，不是夜里挖开，也不是卷鳞。",
    task: "点两张不一样的卡，说出谁更像白天细舌伸进蚁冢的袋食蚁兽。"
  }  ,
  {
    id: "games/termite-lab.html", file: "termite-lab.html", title: "细舌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕳️", ready: true,
    description: "同一条纸舌。够细够长才伸进蚁道；又粗又短就够不着。",
    task: "试一次细舌和一次粗舌，比较谁伸得进。"
  }
  ,
  {
    id: "nature/moose.html", file: "moose.html", title: "驼鹿观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🫎", ready: true,
    description: "比较驼鹿、犀牛和长颈鹿。驼鹿头上是每年脱落再长的扁掌状骨角，不是一辈子不脱的角蛋白。",
    task: "点两张不一样的卡，说出谁更像每年换扁掌骨角的驼鹿。"
  }  ,
  {
    id: "games/antler-lab.html", file: "antler-lab.html", title: "换角工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦴", ready: true,
    description: "同一对骨角。能脱就脱落；焊死就掉不下来。",
    task: "试一次能脱和一次焊死，比较谁会脱落。"
  }  ,
  {
    id: "nature/secretary-birds.html", file: "secretary-birds.html", title: "秘书鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪶", ready: true,
    description: "比较秘书鸟、鹰和鹤鸵。秘书鸟用又长又直的腿把蛇踩住，不是俯冲抓，也不是刀爪踢。",
    task: "点两张不一样的卡，说出谁更像长腿直踩把蛇踩住的秘书鸟。"
  }  ,
  {
    id: "games/stomp-lab.html", file: "stomp-lab.html", title: "长腿踩工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一条长腿。腿直着才踩得住；腿弯就踩空。",
    task: "试一次直腿和一次弯腿，比较谁踩得住。"
  }
  ,
  {
    id: "nature/flying-squirrels.html", file: "flying-squirrels.html", title: "飞鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪂", ready: true,
    description: "比较飞鼠和鸟。飞鼠张开皮膜往下滑，不是拍翅膀飞上去。",
    task: "点两张不一样的卡，说出谁更像张开皮膜滑下去的飞鼠。"
  }  ,
  {
    id: "games/glide-lab.html", file: "glide-lab.html", title: "皮膜滑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪁", ready: true,
    description: "同一张皮膜。张开才滑得远；收起来就掉下去。",
    task: "试一次膜张开和一次膜收起，比较谁滑得远。"
  }
  ,
  {
    id: "nature/weaver-birds.html", file: "weaver-birds.html", title: "织巢鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪺", ready: true,
    description: "比较织巢鸟和把草堆成一摊的鸟。织巢鸟打结编草才吊得住，不是随便堆。",
    task: "点两张不一样的卡，说出谁更像打结编草的织巢鸟。"
  }  ,
  {
    id: "games/weave-lab.html", file: "weave-lab.html", title: "编巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "同一把草。编紧才吊得住；松堆会掉下来。",
    task: "试一次编紧和一次松堆，比较谁吊得住。"
  }
  ,
  {
    id: "nature/parrotfish.html", file: "parrotfish.html", title: "鹦鹉鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪸", ready: true,
    description: "比较鹦鹉鱼和整块吞的鱼。愈合喙把珊瑚磨成沙，不是整块吞下去。",
    task: "点两张不一样的卡，说出谁更像把珊瑚磨成沙的鹦鹉鱼。"
  }  ,
  {
    id: "games/grind-lab.html", file: "grind-lab.html", title: "磨沙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧂", ready: true,
    description: "同一张愈合喙。磨够变成沙；磨不够留下整块。",
    task: "试一次磨够和一次磨不够，比较谁磨出沙。"
  }
  ,
  {
    id: "nature/archerfish.html", file: "archerfish.html", title: "射水鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "💦", ready: true,
    description: "比较射水鱼和跳上去抓的鱼。射水鱼用水柱把虫打下，不是跳上去咬。",
    task: "点两张不一样的卡，说出谁更像喷水柱打虫的射水鱼。"
  }  ,
  {
    id: "games/spit-lab.html", file: "spit-lab.html", title: "射水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎯", ready: true,
    description: "同一张嘴。喷够虫才掉下水；喷不够水柱够不着。",
    task: "试一次喷够和一次喷不够，比较谁打得下。"
  }
  ,
  {
    id: "nature/pistol-shrimp.html", file: "pistol-shrimp.html", title: "手枪虾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "💥", ready: true,
    description: "比较手枪虾和螃蟹。手枪虾弹螯打出空泡，不是靠夹碎。",
    task: "点两张不一样的卡，说出谁更像弹螯打出空泡的手枪虾。"
  }  ,
  {
    id: "games/snap-lab.html", file: "snap-lab.html", title: "弹螯工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫧", ready: true,
    description: "同一只钳。弹得快空泡炸开；轻捏没有泡。",
    task: "试一次快扣和一次轻捏，比较谁炸出泡。"
  }
  ,
  {
    id: "nature/pufferfish.html", file: "pufferfish.html", title: "河豚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐡", ready: true,
    description: "比较河豚和普通鱼。河豚吞水鼓成球，不是一直这么圆。",
    task: "点两张不一样的卡，说出谁更像吞水鼓成球的河豚。"
  }  ,
  {
    id: "games/inflate-lab.html", file: "inflate-lab.html", title: "鼓球工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚪", ready: true,
    description: "同一条鱼。吞水鼓成球；瘦了才能游走。",
    task: "试一次鼓球和一次瘦身，比较谁鼓成球。"
  }
  ,
  {
    id: "nature/basilisks.html", file: "basilisks.html", title: "双嵴蜥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较双嵴蜥和水黾。双嵴蜥拍得快才踩得住水面，不是站在水膜上。",
    task: "点两张不一样的卡，说出谁更像拍水快跑的双嵴蜥。"
  }  ,
  {
    id: "games/dash-lab.html", file: "dash-lab.html", title: "快跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏃", ready: true,
    description: "同一双脚。拍得快踩得住；拍得慢就沉。",
    task: "试一次快跑和一次慢跑，比较谁踩得住。"
  }
  ,
  {
    id: "nature/jacanas.html", file: "jacanas.html", title: "水雉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪷", ready: true,
    description: "比较水雉和短趾鸟。水雉长趾摊在荷叶上，短趾会踩穿。",
    task: "点两张不一样的卡，说出谁更像长趾走荷叶的水雉。"
  }  ,
  {
    id: "games/lily-lab.html", file: "lily-lab.html", title: "荷叶走工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👣", ready: true,
    description: "同一双脚。长趾走得住；短趾会踩穿。",
    task: "试一次长趾和一次短趾，比较谁走得住。"
  }
  ,
  {
    id: "nature/bowerbirds.html", file: "bowerbirds.html", title: "园丁鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🎨", ready: true,
    description: "比较园丁鸟和织巢鸟。园丁鸟搭展示道，不是产卵巢。",
    task: "点两张不一样的卡，说出谁更像搭展示道的园丁鸟。"
  }  ,
  {
    id: "games/bower-lab.html", file: "bower-lab.html", title: "凉亭工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎀", ready: true,
    description: "同一堆棍。装饰够是两道墙；装饰少是乱杯。",
    task: "试一次装饰够和一次装饰少，比较谁是展示道。"
  }
  ,
  {
    id: "nature/water-striders.html", file: "water-striders.html", title: "水黾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "〰️", ready: true,
    description: "比较水黾和双嵴蜥。水黾疏水脚站在水膜上，不是拍水快跑。",
    task: "点两张不一样的卡，说出谁更像站在水膜上的水黾。"
  }  ,
  {
    id: "games/film-lab.html", file: "film-lab.html", title: "水膜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一双脚。膜够站住；膜破就沉。",
    task: "试一次膜够和一次膜破，比较谁站得住。"
  }
  ,
  {
    id: "nature/leafcutter-ants.html", file: "leafcutter-ants.html", title: "切叶蚁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🍄", ready: true,
    description: "比较切叶蚁和袋食蚁兽。切叶蚁剪叶子去种菌，不是细舌伸进冢。",
    task: "点两张不一样的卡，说出谁更像剪叶种菌的切叶蚁。"
  }  ,
  {
    id: "games/farm-lab.html", file: "farm-lab.html", title: "种菌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍃", ready: true,
    description: "同一队蚂蚁。种够才长出菌园；不够只剩生叶堆。",
    task: "试一次种够和一次生嚼，比较谁有菌园。"
  }
  ,
  {
    id: "nature/fennec-foxes.html", file: "fennec-foxes.html", title: "耳廓狐观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦊", ready: true,
    description: "比较耳廓狐和普通狐狸。耳廓狐大耳朵把热散掉，不是只为了好看。",
    task: "点两张不一样的卡，说出谁更像大耳朵散热器的耳廓狐。"
  }  ,
  {
    id: "games/ear-lab.html", file: "ear-lab.html", title: "大耳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一对耳朵。耳朵大才把热散掉；耳朵小就闷热。",
    task: "试一次耳大和一次耳小，比较谁凉快。"
  }
  ,
  {
    id: "nature/tardigrades.html", file: "tardigrades.html", title: "水熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐻", ready: true,
    description: "比较水熊和普通小虫。水熊干了缩成桶，不是永远不死的魔法。",
    task: "点两张不一样的卡，说出谁更像干了缩成桶的水熊。"
  }  ,
  {
    id: "games/tun-lab.html", file: "tun-lab.html", title: "木桶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪣", ready: true,
    description: "同一只缓步类。干得够才缩成桶；还湿着就继续走。",
    task: "试一次干够和一次还湿，比较谁缩成桶。"
  }
  ,
  {
    id: "nature/pelicans.html", file: "pelicans.html", title: "鹈鹕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪿", ready: true,
    description: "比较鹈鹕和鹭。鹈鹕喉囊兜水再滤鱼，不是尖喙戳一条。",
    task: "点两张不一样的卡，说出谁更像喉囊兜鱼的鹈鹕。"
  }  ,
  {
    id: "games/pouch-lab.html", file: "pouch-lab.html", title: "喉囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👜", ready: true,
    description: "同一张嘴。胀袋兜成网；尖喙戳不中。",
    task: "试一次胀袋和一次尖喙，比较谁兜得住。"
  }
  ,
  {
    id: "nature/nautilus.html", file: "nautilus.html", title: "鹦鹉螺观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐚", ready: true,
    description: "比较鹦鹉螺和乌贼。鹦鹉螺隔间换气才沉浮，不是喷水射走。",
    task: "点两张不一样的卡，说出谁更像隔间换气的鹦鹉螺。"
  }  ,
  {
    id: "games/chamber-lab.html", file: "chamber-lab.html", title: "隔间工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫧", ready: true,
    description: "同一只螺壳。隔间气多就浮；气少就沉。",
    task: "试一次气多和一次气少，比较谁浮得上来。"
  }
  ,
  {
    id: "nature/snowshoe-hares.html", file: "snowshoe-hares.html", title: "雪鞋兔观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐇", ready: true,
    description: "比较雪鞋兔和细脚兔。雪鞋兔大脚摊在雪上才不陷，不是跳得更高。",
    task: "点两张不一样的卡，说出谁更像大脚走雪的雪鞋兔。"
  }  ,
  {
    id: "games/shoe-lab.html", file: "shoe-lab.html", title: "雪鞋工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐾", ready: true,
    description: "同一双掌。大脚摊得住；细脚会陷进去。",
    task: "试一次掌宽和一次掌窄，比较谁走得住。"
  }
  ,
  {
    id: "nature/howler-monkeys.html", file: "howler-monkeys.html", title: "吼猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "📣", ready: true,
    description: "比较吼猴和琴鸟。吼猴空心舌骨碗把吼放大，不是学别人的声音。",
    task: "点两张不一样的卡，说出谁更像空心舌骨吼的吼猴。"
  }  ,
  {
    id: "games/hyoid-lab.html", file: "hyoid-lab.html", title: "舌骨工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔊", ready: true,
    description: "同一只喉骨碗。大碗吼得远；小碗只剩细声。",
    task: "试一次碗大和一次碗小，比较谁吼得远。"
  }
  ,
  {
    id: "nature/thorny-devils.html", file: "thorny-devils.html", title: "刺蜥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较刺蜥和壁虎。刺蜥背上细沟把露送到嘴，不是吸管喝，也不是仙人掌藏水。",
    task: "点两张不一样的卡，说出谁更像沟槽导露的刺蜥。"
  }  ,
  {
    id: "games/wick-lab.html", file: "wick-lab.html", title: "导露工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一只纸刺蜥。沟通了露才到嘴；沟堵了停在背。",
    task: "试一次沟通和一次沟堵，比较谁到得了嘴。"
  }
  ,
  {
    id: "nature/mudskippers.html", file: "mudskippers.html", title: "弹涂鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较弹涂鱼和普通鱼。弹涂鱼用胸鳍撑着走泥，不是只会游，也不是青蛙后腿跳。",
    task: "点两张不一样的卡，说出谁更像胸鳍撑泥的弹涂鱼。"
  }  ,
  {
    id: "games/crawl-lab.html", file: "crawl-lab.html", title: "泥走工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐾", ready: true,
    description: "同一只纸弹涂鱼。撑稳了才走上岸；只会游就困在洼。",
    task: "试一次撑走和一次只会游，比较谁走上岸。"
  }
  ,
  {
    id: "nature/click-beetles.html", file: "click-beetles.html", title: "叩甲观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较叩甲和普通甲虫。叩甲仰面时胸腹一弹才翻过来，不是腿更有劲。",
    task: "点两张不一样的卡，说出谁更像会弹跳翻身的叩甲。"
  }  ,
  {
    id: "games/click-lab.html", file: "click-lab.html", title: "弹跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚡", ready: true,
    description: "同一只纸叩甲。铰链扣上才翻过来；不扣就仰面躺。",
    task: "试一次扣上和一次不扣，比较谁翻过来。"
  }
  ,
  {
    id: "nature/lungfish.html", file: "lungfish.html", title: "肺鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🫧", ready: true,
    description: "比较肺鱼和普通鱼。肺鱼塘干了结茧等雨，不是变成了另一条鱼。",
    task: "点两张不一样的卡，说出谁更像结茧等雨的肺鱼。"
  }  ,
  {
    id: "games/cocoon-lab.html", file: "cocoon-lab.html", title: "黏茧工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪹", ready: true,
    description: "同一条纸肺鱼。结茧才能等雨；不结茧塘干就完。",
    task: "试一次结茧和一次不结，比较谁能等雨。"
  }
  ,
  {
    id: "nature/trapjaw-ants.html", file: "trapjaw-ants.html", title: "巨颚蚁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐜", ready: true,
    description: "比较巨颚蚁和普通蚂蚁。巨颚蚁大颚一弹才跳开，不是腿更长。",
    task: "点两张不一样的卡，说出谁更像大颚一弹就跳开的巨颚蚁。"
  }  ,
  {
    id: "games/snapjaw-lab.html", file: "snapjaw-lab.html", title: "弹颌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💥", ready: true,
    description: "同一对大颚。弹得够才跳开；慢合就走不掉。",
    task: "试一次快弹和一次慢合，比较谁跳开。"
  }
  ,
  {
    id: "nature/chuckwallas.html", file: "chuckwallas.html", title: "石缝鬣蜥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较石缝鬣蜥和河豚。石缝鬣蜥钻进缝里把身子鼓圆卡住，不是在水里鼓成球。",
    task: "点两张不一样的卡，说出谁更像鼓进石缝的鬣蜥。"
  }
  ,
  {
    id: "games/rock-lab.html", file: "rock-lab.html", title: "石缝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸蜥。鼓身卡住；瘦了会滑出。",
    task: "试一次鼓身和一次瘦身，比较谁卡住。"
  }
  ,
  {
    id: "nature/dippers.html", file: "dippers.html", title: "河乌观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较河乌和鸭子。河乌骨头沉才走得了河床，不是浮在水面划。",
    task: "点两张不一样的卡，说出谁更像沉下去走河床的河乌。"
  }
  ,
  {
    id: "games/wade-lab.html", file: "wade-lab.html", title: "走底工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸河乌。沉下去走上河床；浮在水面走不成。",
    task: "试一次沉底和一次上浮，比较谁走上河床。"
  }
  ,
  {
    id: "nature/diving-bell-spiders.html", file: "diving-bell-spiders.html", title: "水蛛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕷️", ready: true,
    description: "比较水蛛和普通蜘蛛。水蛛在水下织气钟，不是到水面换气。",
    task: "点两张不一样的卡，说出谁更像水下织气钟的水蛛。"
  }
  ,
  {
    id: "games/bell-lab.html", file: "bell-lab.html", title: "气钟工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫧", ready: true,
    description: "同一只纸水蛛。气够才成家；气少没泡。",
    task: "试一次气够和一次气少，比较谁成家。"
  }
  ,
  {
    id: "nature/frilled-lizards.html", file: "frilled-lizards.html", title: "伞蜥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较伞蜥和孔雀。伞蜥脖子上的皮领一下子撑开，不是羽毛开屏。",
    task: "点两张不一样的卡，说出谁更像领伞突然打开的伞蜥。"
  }
  ,
  {
    id: "games/frill-lab.html", file: "frill-lab.html", title: "开领工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪭", ready: true,
    description: "同一只纸伞蜥。领开了才吓退；领收着看不出大。",
    task: "试一次开领和一次收领，比较谁看起来变大。"
  }
  ,
  {
    id: "nature/gerenuks.html", file: "gerenuks.html", title: "长颈羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较长颈羚和长颈鹿。长颈羚后腿踮起才够到高叶，不是脖子已经那么长。",
    task: "点两张不一样的卡，说出谁更像后腿踮起够叶的长颈羚。"
  }
  ,
  {
    id: "games/tiptoe-lab.html", file: "tiptoe-lab.html", title: "踮脚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸羚。后腿踮起够得到；四脚只能吃矮草。",
    task: "试一次踮起和一次四脚，比较谁够到高叶。"
  }
  ,
  {
    id: "nature/gibbons.html", file: "gibbons.html", title: "长臂猿观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐒", ready: true,
    description: "比较长臂猿和猴子。长臂猿用长臂吊在枝下荡过去，不是在枝上走。",
    task: "点两张不一样的卡，说出谁更像长臂荡枝的长臂猿。"
  }
  ,
  {
    id: "games/swing-lab.html", file: "swing-lab.html", title: "荡枝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌲", ready: true,
    description: "同一只纸猿。长臂荡过去；走枝会滑掉。",
    task: "试一次荡枝和一次走枝，比较谁过去。"
  }
  ,
  {
    id: "nature/hornbills.html", file: "hornbills.html", title: "犀鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦜", ready: true,
    description: "比较犀鸟和普通洞巢鸟。犀鸟用泥封住巢洞只留一条缝，不是洞开着进出。",
    task: "点两张不一样的卡，说出谁更像泥封只剩缝的犀鸟。"
  }
  ,
  {
    id: "games/mud-lab.html", file: "mud-lab.html", title: "封泥工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧱", ready: true,
    description: "同一只纸巢。泥封只剩缝挡得住；洞开着会钻进来。",
    task: "试一次封泥和一次洞开，比较谁挡得住。"
  }
  ,
  {
    id: "nature/prairie-dogs.html", file: "prairie-dogs.html", title: "草原犬鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦫", ready: true,
    description: "比较草原犬鼠和普通地洞。草原犬鼠把土堆成烟囱才抽得动气，不是洞口平着。",
    task: "点两张不一样的卡，说出谁更像土丘当烟囱的草原犬鼠。"
  }
  ,
  {
    id: "games/vent-lab.html", file: "vent-lab.html", title: "通风工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌬️", ready: true,
    description: "同一座纸丘。堆丘才通风；铲平就闷气。",
    task: "试一次堆丘和一次铲平，比较谁通风。"
  }
  ,
  {
    id: "nature/rattlesnakes.html", file: "rattlesnakes.html", title: "响尾蛇观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐍", ready: true,
    description: "比较响尾蛇和普通蛇。响尾蛇用颊窝在夜里感到热，不是靠回声。",
    task: "点两张不一样的卡，说出谁更像颊窝感热的响尾蛇。"
  }
  ,
  {
    id: "games/pit-lab.html", file: "pit-lab.html", title: "颊窝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌡️", ready: true,
    description: "同一只纸颊窝。窝开夜里找得到热；封住就错过。",
    task: "试一次窝开和一次封住，比较谁找得到热。"
  }
  ,
  {
    id: "nature/remoras.html", file: "remoras.html", title: "印鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较印鱼和并排游的鱼。印鱼头顶吸盘吸着搭车，不是自己并排游。",
    task: "点两张不一样的卡，说出谁更像头顶吸盘搭车的印鱼。"
  }
  ,
  {
    id: "games/disc-lab.html", file: "disc-lab.html", title: "吸盘搭车工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧲", ready: true,
    description: "同一只纸吸盘。吸着才挂得住；并排游会滑掉。",
    task: "试一次吸着和一次并排，比较谁挂得住。"
  }
  ,
  {
    id: "nature/saigas.html", file: "saigas.html", title: "高鼻羚羊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较高鼻羚羊和扁鼻子的羊。高鼻羚羊鼓鼻子挡住土，不是为了更好看。",
    task: "点两张不一样的卡，说出谁更像鼓鼻挡土的高鼻羚羊。"
  }
  ,
  {
    id: "games/dust-lab.html", file: "dust-lab.html", title: "滤尘工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💨", ready: true,
    description: "同一只纸鼻子。鼓鼻挡住土；扁鼻就呛灰。",
    task: "试一次鼓鼻和一次扁鼻，比较谁挡住土。"
  }
  ,
  {
    id: "nature/sidewinders.html", file: "sidewinders.html", title: "侧行响尾蛇观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐍", ready: true,
    description: "比较侧行响尾蛇和贴肚爬的蛇。侧行横甩一圈才不陷，不是直线往前。",
    task: "点两张不一样的卡，说出谁更像横甩不陷的侧行响尾蛇。"
  }
  ,
  {
    id: "games/sandwave-lab.html", file: "sandwave-lab.html", title: "沙波工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏜️", ready: true,
    description: "同一条纸蛇。横甩浮得住；贴肚会陷进去。",
    task: "试一次横甩和一次贴肚，比较谁不陷。"
  }
  ,
  {
    id: "nature/toucans.html", file: "toucans.html", title: "巨嘴鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦜", ready: true,
    description: "比较巨嘴鸟和小嘴鸟。巨嘴鸟大嘴把热散掉，不是只为了夹果子。",
    task: "点两张不一样的卡，说出谁更像大嘴散热的巨嘴鸟。"
  }
  ,
  {
    id: "games/rad-lab.html", file: "rad-lab.html", title: "散热工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌡️", ready: true,
    description: "同一张纸嘴。大嘴才把热散掉；小嘴就闷热。",
    task: "试一次大嘴和一次小嘴，比较谁把热散掉。"
  }
  ,
  {
    id: "nature/velvet-worms.html", file: "velvet-worms.html", title: "栉蚕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐛", ready: true,
    description: "比较栉蚕和普通虫子。栉蚕喷出黏胶网住猎物，不是跑去咬。",
    task: "点两张不一样的卡，说出谁更像喷胶网猎物的栉蚕。"
  }
  ,
  {
    id: "games/goo-lab.html", file: "goo-lab.html", title: "喷胶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧴", ready: true,
    description: "同一只纸栉蚕。喷胶网得住；空跑会漏掉。",
    task: "试一次喷胶和一次空跑，比较谁网得住。"
  }
  ,
  {
    id: "nature/mantis-shrimps.html", file: "mantis-shrimps.html", title: "虾蛄观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦐", ready: true,
    description: "比较虾蛄和普通虾。虾蛄锤臂砸得够快才打出空泡，不是普通钳子。",
    task: "点两张不一样的卡，说出谁更像锤臂砸击的虾蛄。"
  }  ,
  {
    id: "games/smash-lab.html", file: "smash-lab.html", title: "砸击工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔨", ready: true,
    description: "同一只纸虾蛄。锤够快才砸得动；慢捏就没声。",
    task: "试一次快砸和一次慢捏，比较谁砸得动。"
  }
  ,
  {
    id: "nature/anglerfish.html", file: "anglerfish.html", title: "鮟鱇观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🎣", ready: true,
    description: "比较鮟鱇和追猎的鱼。鮟鱇把诱饵垂着，猎物自己过来，不是追着咬。",
    task: "点两张不一样的卡，说出谁更像垂着诱饵的鮟鱇。"
  }  ,
  {
    id: "games/lure-lab.html", file: "lure-lab.html", title: "诱饵工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💡", ready: true,
    description: "同一条纸鮟鱇。钓着才来；追着就跑。",
    task: "试一次垂饵和一次去追，比较谁等到猎物。"
  }
  ,
  {
    id: "nature/cuttlefish.html", file: "cuttlefish.html", title: "乌贼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦑", ready: true,
    description: "比较乌贼和画上去的颜色。乌贼活皮肤才会换色，不是画上去的。",
    task: "点两张不一样的卡，说出谁更像活皮肤换色的乌贼。"
  }  ,
  {
    id: "games/skin-lab.html", file: "skin-lab.html", title: "变色工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎨", ready: true,
    description: "同一只纸乌贼。活皮才换；画上去就不改。",
    task: "试一次活皮和一次画色，比较谁会换。"
  }
  ,
  {
    id: "nature/bombardier-beetles.html", file: "bombardier-beetles.html", title: "喷炮甲观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较喷炮甲和普通甲虫。喷炮甲两室混合才喷热雾，不是一罐现成热水。",
    task: "点两张不一样的卡，说出谁更像两室喷雾的喷炮甲。"
  }  ,
  {
    id: "games/pop-lab.html", file: "pop-lab.html", title: "喷雾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💥", ready: true,
    description: "同一只纸甲虫。两室兑上才喷；单室就滴出来。",
    task: "试一次兑上和一次单室，比较谁喷得出。"
  }
  ,
  {
    id: "nature/caddisflies.html", file: "caddisflies.html", title: "石蛾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪰", ready: true,
    description: "比较石蛾幼虫和光着的幼虫。石蛾自己粘石壳才站得住，不是借来的螺壳。",
    task: "点两张不一样的卡，说出谁更像自己粘石壳的石蛾。"
  }  ,
  {
    id: "games/case-lab.html", file: "case-lab.html", title: "石壳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一条纸幼虫。粘壳才站得住；光身子会被冲走。",
    task: "试一次粘壳和一次光身，比较谁站得住。"
  }
  ,
  {
    id: "nature/fleas.html", file: "fleas.html", title: "跳蚤观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较跳蚤和只用腿跳的虫。跳蚤弹垫攒力才跳得高，不是腿更有劲。",
    task: "点两张不一样的卡，说出谁更像弹垫攒力的跳蚤。"
  }  ,
  {
    id: "games/resilin-lab.html", file: "resilin-lab.html", title: "弹垫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦘", ready: true,
    description: "同一只纸跳蚤。垫够弹才射出去；软垫就蹲着。",
    task: "试一次弹垫和一次软垫，比较谁射得出去。"
  }
  ,
  {
    id: "nature/paper-wasps.html", file: "paper-wasps.html", title: "纸巢蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "比较纸巢蜂和蜜蜂。纸巢蜂嚼木头拌唾液才成纸，不是蜡房。",
    task: "点两张不一样的卡，说出谁更像做纸巢的蜂。"
  }  ,
  {
    id: "games/pulp-lab.html", file: "pulp-lab.html", title: "纸浆工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📄", ready: true,
    description: "同一只纸蜂。湿浆摊得开；干嚼就碎。",
    task: "试一次湿浆和一次干嚼，比较谁摊得开。"
  }
  ,
  {
    id: "nature/moray-eels.html", file: "moray-eels.html", title: "海鳝观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐍", ready: true,
    description: "比较海鳝和普通鳗。海鳝身子打结才扯得动猎物，不是普通吞。",
    task: "点两张不一样的卡，说出谁更像打结吞食的海鳝。"
  }  ,
  {
    id: "games/knot-lab.html", file: "knot-lab.html", title: "打结工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "同一条纸海鳝。结往前推才吞进；打滑就掉。",
    task: "试一次打结和一次打滑，比较谁吞得进。"
  }
  ,
  {
    id: "nature/goblin-sharks.html", file: "goblin-sharks.html", title: "幽灵鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较幽灵鲨和牙床钉死的鲨。幽灵鲨整张嘴弹出去才咬到，不是牙床钉死的。",
    task: "点两张不一样的卡，说出谁更像弹颌的幽灵鲨。"
  }  ,
  {
    id: "games/sling-lab.html", file: "sling-lab.html", title: "弹颌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎯", ready: true,
    description: "同一条纸鲨。颌甩得出去才咬到；钉死就够不着。",
    task: "试一次甩颌和一次钉死，比较谁咬得到。"
  }
  ,
  {
    id: "nature/leafy-seadragons.html", file: "leafy-seadragons.html", title: "叶海龙观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐉", ready: true,
    description: "比较叶海龙和在空地游的鱼。叶子是伪装不是桨，藏进海草才看不见。",
    task: "点两张不一样的卡，说出谁更像伪装成海草的叶海龙。"
  }  ,
  {
    id: "games/camou-lab.html", file: "camou-lab.html", title: "海草伪装工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一条纸海龙。藏进海草才看不见；游到空地就被发现。",
    task: "试一次藏进海草和一次游到空地，比较谁看不见。"
  }
  ,
  {
    id: "nature/horned-lizards.html", file: "horned-lizards.html", title: "角蜥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较角蜥和干瞪眼的蜥。角蜥眼眶有压才喷得出红水，不是毒液。",
    task: "点两张不一样的卡，说出谁更像眼眶喷红水的角蜥。"
  }  ,
  {
    id: "games/blood-lab.html", file: "blood-lab.html", title: "喷血工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一只纸角蜥。眼眶有压才喷得出；干瞪眼就没戏。",
    task: "试一次有压和一次干瞪，比较谁喷得出。"
  }
  ,
  {
    id: "nature/glass-frogs.html", file: "glass-frogs.html", title: "玻璃蛙观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较玻璃蛙和普通绿蛙。玻璃蛙肚子近乎透明才贴得住叶，不是警告色。",
    task: "点两张不一样的卡，说出谁更像透腹的玻璃蛙。"
  }  ,
  {
    id: "games/belly-lab.html", file: "belly-lab.html", title: "透腹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍃", ready: true,
    description: "同一只纸蛙。透腹才融进叶子；不透就被看见。",
    task: "试一次透腹和一次不透，比较谁融进叶子。"
  }
  ,
  {
    id: "nature/antlions.html", file: "antlions.html", title: "蚁狮观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪱", ready: true,
    description: "比较蚁狮和趴在平沙上等的虫。蚁狮挖漏斗坑，猎物才滑下来。",
    task: "点两张不一样的卡，说出谁更像挖漏斗坑的蚁狮。"
  }  ,
  {
    id: "games/pitfall-lab.html", file: "pitfall-lab.html", title: "漏斗坑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕳️", ready: true,
    description: "同一只纸蚁狮。坑够陡才滑；摊平就走掉。",
    task: "试一次陡坑和一次摊平，比较谁滑下来。"
  }
  ,
  {
    id: "nature/springtails.html", file: "springtails.html", title: "跳虫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较跳虫和用腿跳的虫。跳虫腹下叉子一弹才跳，不是腿更有劲。",
    task: "点两张不一样的卡，说出谁更像腹下弹器的跳虫。"
  }  ,
  {
    id: "games/flick-lab.html", file: "flick-lab.html", title: "弹器工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍴", ready: true,
    description: "同一只纸跳虫。叉子松开才弹；锁住就趴着。",
    task: "试一次松开和一次锁住，比较谁弹起来。"
  }
  ,
  {
    id: "nature/four-eyed-fish.html", file: "four-eyed-fish.html", title: "四眼鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "👀", ready: true,
    description: "比较四眼鱼和普通鱼。四眼鱼一只眼分成水上水下，不是真的长了四只眼。",
    task: "点两张不一样的卡，说出谁更像裂瞳的四眼鱼。"
  }  ,
  {
    id: "games/split-lab.html", file: "split-lab.html", title: "裂瞳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一条纸鱼。瞳对上水面才两边都看见；整只眼就瞎一边。",
    task: "试一次对上水面和一次整只眼，比较谁两边都看见。"
  }
  ,
  {
    id: "nature/sawfish.html", file: "sawfish.html", title: "锯鳐观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪚", ready: true,
    description: "比较锯鳐和剑鱼。锯鳐扁吻两边有齿才切开，不是圆矛。",
    task: "点两张不一样的卡，说出谁更像扁吻带齿的锯鳐。"
  }  ,
  {
    id: "games/saw-lab.html", file: "saw-lab.html", title: "锯吻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "➖", ready: true,
    description: "同一条纸锯鳐。带齿扁吻才切得动；钝鼻子就撞一下。",
    task: "试一次带齿和一次钝吻，比较谁切得动。"
  }
  ,
  {
    id: "nature/cleaner-wrasses.html", file: "cleaner-wrasses.html", title: "裂唇鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较裂唇鱼和追着咬的鱼。裂唇鱼停在清洁站才清得掉，追着咬会吓跑。",
    task: "点两张不一样的卡，说出谁更像开清洁站的裂唇鱼。"
  }  ,
  {
    id: "games/station-lab.html", file: "station-lab.html", title: "清洁站工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧼", ready: true,
    description: "同一条纸裂唇鱼。停着啄才清得掉；追着咬就吓跑。",
    task: "试一次停着啄和一次追着咬，比较谁清得掉。"
  }
  ,
  {
    id: "nature/frogfish.html", file: "frogfish.html", title: "躄鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较躄鱼和追猎的鱼。躄鱼长得像海绵，嘴一张才吞进，不是深海发光鮟鱇。",
    task: "点两张不一样的卡，说出谁更像伪装等着的躄鱼。"
  }  ,
  {
    id: "games/gulp-lab.html", file: "gulp-lab.html", title: "吞吸工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "😮", ready: true,
    description: "同一条纸躄鱼。嘴一张才吞进；去追就跑。",
    task: "试一次张嘴和一次去追，比较谁吞得进。"
  }
  ,
  {
    id: "nature/triggerfish.html", file: "triggerfish.html", title: "鳞鲀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐡", ready: true,
    description: "比较鳞鲀和河豚。鳞鲀背棘锁死才卡得住石缝，不是鼓成球。",
    task: "点两张不一样的卡，说出谁更像锁棘的鳞鲀。"
  }  ,
  {
    id: "games/lock-lab.html", file: "lock-lab.html", title: "锁棘工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔒", ready: true,
    description: "同一条纸鳞鲀。棘锁上才卡住；不锁就滑出。",
    task: "试一次锁上和一次不锁，比较谁卡住。"
  }
  ,
  {
    id: "nature/army-ants.html", file: "army-ants.html", title: "行军蚁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐜", ready: true,
    description: "比较行军蚁和各走各的蚂蚁。行军蚁用身体搭桥才过得去，不是自己跳。",
    task: "点两张不一样的卡，说出谁更像搭活桥的行军蚁。"
  }  ,
  {
    id: "games/bridge-lab.html", file: "bridge-lab.html", title: "活桥工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌉", ready: true,
    description: "同一队纸蚁。钩在一起才过沟；各走各的会掉。",
    task: "试一次搭桥和一次各走，比较谁过得去。"
  }
  ,
  {
    id: "nature/weaver-ants.html", file: "weaver-ants.html", title: "织叶蚁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐜", ready: true,
    description: "比较织叶蚁和纸巢蜂。织叶蚁用幼虫吐丝才缝得拢叶子，不是嚼木头。",
    task: "点两张不一样的卡，说出谁更像缝叶子的织叶蚁。"
  }  ,
  {
    id: "games/silk-lab.html", file: "silk-lab.html", title: "缝叶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧵", ready: true,
    description: "同一队纸蚁。有丝才拉得拢；干拽就撕开。",
    task: "试一次有丝和一次干拽，比较谁缝得拢。"
  }
  ,
  {
    id: "nature/praying-mantises.html", file: "praying-mantises.html", title: "螳螂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦗", ready: true,
    description: "比较螳螂和慢慢伸手的虫。螳螂折叠的手臂弹出去才抓住，不是慢伸。",
    task: "点两张不一样的卡，说出谁更像弹臂的螳螂。"
  }  ,
  {
    id: "games/strike-lab.html", file: "strike-lab.html", title: "弹臂工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚡", ready: true,
    description: "同一只纸螳螂。先折再弹才抓到；慢伸就够不着。",
    task: "试一次弹臂和一次慢伸，比较谁抓到。"
  }
  ,
  {
    id: "nature/net-casting-spiders.html", file: "net-casting-spiders.html", title: "投网蛛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕷️", ready: true,
    description: "比较投网蛛和坐等圆网的蜘蛛。投网蛛把网抓在手里往下罩，不是挂着等。",
    task: "点两张不一样的卡，说出谁更像投网的蜘蛛。"
  }  ,
  {
    id: "games/net-lab.html", file: "net-lab.html", title: "投网工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥅", ready: true,
    description: "同一只纸蜘蛛。往下罩才网住；挂着等就漏掉。",
    task: "试一次往下罩和一次挂着等，比较谁网住。"
  }
  ,
  {
    id: "nature/flying-frogs.html", file: "flying-frogs.html", title: "飞蛙观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较飞蛙和普通蛙。飞蛙指间蹼张开才滑得动，不是拍翅膀。",
    task: "点两张不一样的卡，说出谁更像张蹼滑翔的飞蛙。"
  }  ,
  {
    id: "games/flap-lab.html", file: "flap-lab.html", title: "张蹼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪂", ready: true,
    description: "同一只纸飞蛙。蹼张开才滑；收起来就掉。",
    task: "试一次张开和一次收蹼，比较谁滑得动。"
  }
  ,
  {
    id: "nature/vinegaroons.html", file: "vinegaroons.html", title: "鞭蝎观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦂", ready: true,
    description: "比较鞭蝎和毒针蝎。鞭蝎尾巴喷酸雾才吓退，不是毒针。",
    task: "点两张不一样的卡，说出谁更像喷酸雾的鞭蝎。"
  }  ,
  {
    id: "games/acid-lab.html", file: "acid-lab.html", title: "酸雾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌫️", ready: true,
    description: "同一只纸鞭蝎。尾巴有压才喷得出；干甩就没戏。",
    task: "试一次有压和一次干甩，比较谁喷得出。"
  }
  ,
  {
    id: "nature/bolas-spiders.html", file: "bolas-spiders.html", title: "流星球蛛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕷️", ready: true,
    description: "比较流星球蛛和织圆网的蜘蛛。流星球蛛一根丝一滴黏球才甩得中，不是一张网。",
    task: "点两张不一样的卡，说出谁更像甩黏球的蜘蛛。"
  }  ,
  {
    id: "games/bolas-lab.html", file: "bolas-lab.html", title: "黏球工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚪", ready: true,
    description: "同一只纸蜘蛛。丝端有球才粘住；空绳子就挥空。",
    task: "试一次有球和一次空绳，比较谁粘住。"
  }
  ,
  {
    id: "nature/spittlebugs.html", file: "spittlebugs.html", title: "沫蝉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🫧", ready: true,
    description: "比较沫蝉和光着的幼虫。沫蝉吹出泡沫房子才藏得住，不是露水。",
    task: "点两张不一样的卡，说出谁更像住在泡沫里的沫蝉。"
  }  ,
  {
    id: "games/foam-lab.html", file: "foam-lab.html", title: "泡沫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸沫蝉。吹出泡才挡住；光身子就被看见。",
    task: "试一次吹泡和一次光身，比较谁藏得住。"
  }
  ,
  {
    id: "nature/mole-crickets.html", file: "mole-crickets.html", title: "蝼蛄观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦗", ready: true,
    description: "比较蝼蛄和细腿虫。蝼蛄铲子前足才挖得动，不是哺乳类鼹鼠。",
    task: "点两张不一样的卡，说出谁更像铲足挖土的蝼蛄。"
  }  ,
  {
    id: "games/burrow-lab.html", file: "burrow-lab.html", title: "铲足工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⛏️", ready: true,
    description: "同一只纸蝼蛄。铲子足才挖进；细腿就打滑。",
    task: "试一次铲足和一次细腿，比较谁挖得进。"
  }
  ,
  {
    id: "nature/namib-beetles.html", file: "namib-beetles.html", title: "雾甲观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较雾甲和光背甲虫。雾甲头朝下、背上凸点才接到雾，不是荷叶滚走水。",
    task: "点两张不一样的卡，说出谁更像凸点接雾的雾甲。"
  }
  ,
  {
    id: "games/fog-lab.html", file: "fog-lab.html", title: "接雾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌫️", ready: true,
    description: "同一只纸雾甲。凸点才到嘴；光背就被吹走。",
    task: "试一次凸点和一次光背，比较谁到得了嘴。"
  }
  ,
  {
    id: "nature/inchworms.html", file: "inchworms.html", title: "尺蠖观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐛", ready: true,
    description: "比较尺蠖和绷直滑的虫。尺蠖身子弓成一圈、后脚跟上才往前。",
    task: "点两张不一样的卡，说出谁更像弓步走的尺蠖。"
  }  ,
  {
    id: "games/loop-lab.html", file: "loop-lab.html", title: "弓步工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⌒", ready: true,
    description: "同一条纸尺蠖。后脚跟上才走；绷直就滑。",
    task: "试一次弓步和一次绷直，比较谁走得动。"
  }
  ,
  {
    id: "nature/bagworms.html", file: "bagworms.html", title: "袋蛾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "👜", ready: true,
    description: "比较袋蛾和光着的幼虫。袋蛾自己背着房子才挂得住，不是水里的石壳。",
    task: "点两张不一样的卡，说出谁更像背袋的袋蛾。"
  }  ,
  {
    id: "games/bag-lab.html", file: "bag-lab.html", title: "背袋工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "同一条纸幼虫。有袋才挂住；光身子就掉。",
    task: "试一次有袋和一次光身，比较谁挂得住。"
  }
  ,
  {
    id: "nature/leaf-insects.html", file: "leaf-insects.html", title: "叶䗛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🍃", ready: true,
    description: "比较叶䗛和竹节虫。叶䗛身子就是一片叶子，不是树枝。",
    task: "点两张不一样的卡，说出谁更像叶子的叶䗛。"
  }  ,
  {
    id: "games/hide-lab.html", file: "hide-lab.html", title: "藏叶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👁️", ready: true,
    description: "同一只纸叶䗛。贴在叶上才看不见；站在光枝就被发现。",
    task: "试一次贴叶和一次光枝，比较谁看不见。"
  }
  ,
  {
    id: "nature/stick-insects.html", file: "stick-insects.html", title: "竹节虫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪵", ready: true,
    description: "比较竹节虫和乱晃的虫。竹节虫长得像树枝，贴着才瞒得过。",
    task: "点两张不一样的卡，说出谁更像树枝的竹节虫。"
  }  ,
  {
    id: "games/twig-lab.html", file: "twig-lab.html", title: "假枝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👀", ready: true,
    description: "同一只纸竹节虫。贴着树枝才看不见；乱晃就被发现。",
    task: "试一次贴住和一次乱晃，比较谁看不见。"
  }
  ,
  {
    id: "nature/sundews.html", file: "sundews.html", title: "茅膏菜观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "💧", ready: true,
    description: "比较茅膏菜和普通露水。叶毛上的黏珠才粘得住，不是普通露。",
    task: "点两张不一样的卡，说出谁更像黏珠捕虫的茅膏菜。"
  }  ,
  {
    id: "games/dewtrap-lab.html", file: "dewtrap-lab.html", title: "黏珠工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪴", ready: true,
    description: "同一片纸叶。珠够黏才粘住；干毛就滑掉。",
    task: "试一次黏珠和一次干毛，比较谁粘得住。"
  }
  ,
  {
    id: "nature/pitcher-plants.html", file: "pitcher-plants.html", title: "瓶子草观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🫙", ready: true,
    description: "比较瓶子草和茅膏菜。瓶子草滑边的坑才掉得进去，不是黏毛。",
    task: "点两张不一样的卡，说出谁更像瓶坑的瓶子草。"
  }  ,
  {
    id: "games/pitcher-lab.html", file: "pitcher-lab.html", title: "瓶坑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕳️", ready: true,
    description: "同一个纸瓶子。瓶口够滑才掉；干边就爬出来。",
    task: "试一次滑口和一次干边，比较谁掉进去。"
  }
  ,
  {
    id: "nature/lithops.html", file: "lithops.html", title: "生石花观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪨", ready: true,
    description: "比较生石花和仙人掌。生石花长得像石头才瞒得过，不是一身刺。",
    task: "点两张不一样的卡，说出谁更像石头的生石花。"
  }  ,
  {
    id: "games/pebble-lab.html", file: "pebble-lab.html", title: "卵石工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌵", ready: true,
    description: "同一株纸生石花。混在石子里才看不见；放在光沙就被发现。",
    task: "试一次混石和一次光沙，比较谁看不见。"
  }
  ,
  {
    id: "nature/peacock-spiders.html", file: "peacock-spiders.html", title: "孔雀蛛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕷️", ready: true,
    description: "比较孔雀蛛和收着腹瓣的蜘蛛。孔雀蛛腹瓣张开才看得见颜色。",
    task: "点两张不一样的卡，说出谁更像开屏的孔雀蛛。"
  }  ,
  {
    id: "games/dance-lab.html", file: "dance-lab.html", title: "开屏工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎨", ready: true,
    description: "同一只纸蜘蛛。瓣张开才亮；收着就看不出。",
    task: "试一次张开和一次收瓣，比较谁看得见颜色。"
  }
  ,
  {
    id: "nature/whirligigs.html", file: "whirligigs.html", title: "豉甲观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较豉甲和四眼鱼。豉甲在水膜上转，眼睛分成水上水下。",
    task: "点两张不一样的卡，说出谁更像水面裂眼的豉甲。"
  }  ,
  {
    id: "games/twineye-lab.html", file: "twineye-lab.html", title: "水面眼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👁️", ready: true,
    description: "同一只纸豉甲。瞳对上水面才两边都看见；整只眼就瞎一边。",
    task: "试一次对上水面和一次整只眼，比较谁两边都看见。"
  }
  ,
  {
    id: "nature/gliding-ants.html", file: "gliding-ants.html", title: "滑翔蚁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐜", ready: true,
    description: "比较滑翔蚁和直掉的蚂蚁。滑翔蚁掉下去还能拐回树干。",
    task: "点两张不一样的卡，说出谁更像会拐弯的滑翔蚁。"
  }  ,
  {
    id: "games/fall-lab.html", file: "fall-lab.html", title: "转向工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪂", ready: true,
    description: "同一只纸蚁。身子一扭才拐回；直掉就砸地。",
    task: "试一次转向和一次直掉，比较谁拐回树干。"
  }
  ,
  {
    id: "nature/fig-wasps.html", file: "fig-wasps.html", title: "榕小蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "比较榕小蜂和普通蜜蜂。榕小蜂钻进果里才传得上粉。",
    task: "点两张不一样的卡，说出谁更像钻进无花果的小蜂。"
  }  ,
  {
    id: "games/fig-lab.html", file: "fig-lab.html", title: "榕果工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍈", ready: true,
    description: "同一个纸榕果。孔开着才进得去；封死就传不上。",
    task: "试一次开孔和一次封死，比较谁传得上粉。"
  }
  ,
  {
    id: "nature/venus-flytraps.html", file: "venus-flytraps.html", title: "捕蝇草观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪴", ready: true,
    description: "比较捕蝇草和茅膏菜。捕蝇草触毛点两次才合上，不是黏珠。",
    task: "点两张不一样的卡，说出谁更像点两次才合的捕蝇草。"
  }  ,
  {
    id: "games/snaptrap-lab.html", file: "snaptrap-lab.html", title: "夹叶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪤", ready: true,
    description: "同一片纸夹叶。点两次才合；点一次还开着。",
    task: "试一次点两次和一次点一次，比较谁合上。"
  }
  ,
  {
    id: "nature/sensitive-plants.html", file: "sensitive-plants.html", title: "含羞草观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌿", ready: true,
    description: "比较含羞草和缺水蔫的草。含羞草一碰小叶才合上，不是缺水。",
    task: "点两张不一样的卡，说出谁更像一碰就合的含羞草。"
  }  ,
  {
    id: "games/fold-lab.html", file: "fold-lab.html", title: "折叶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👋", ready: true,
    description: "同一株纸含羞草。碰一下才合；不碰就开着。",
    task: "试一次碰和一次不碰，比较谁合上。"
  }
  ,
  {
    id: "nature/portia-spiders.html", file: "portia-spiders.html", title: "拟态跳蛛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕷️", ready: true,
    description: "比较拟态跳蛛和直冲的蜘蛛。拟态跳蛛先绕路才摸得上去。",
    task: "点两张不一样的卡，说出谁更像会绕路的跳蛛。"
  }  ,
  {
    id: "games/plan-lab.html", file: "plan-lab.html", title: "绕路工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🗺️", ready: true,
    description: "同一只纸蜘蛛。绕远路才摸到；直冲就会粘住。",
    task: "试一次绕路和一次直冲，比较谁摸到。"
  }
  ,
  {
    id: "nature/hoatzins.html", file: "hoatzins.html", title: "麝雉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较麝雉雏鸟和普通雏鸟。麝雉翅膀上的爪子才爬得回巢。",
    task: "点两张不一样的卡，说出谁更像翅上有爪的麝雉。"
  }  ,
  {
    id: "games/claw-lab.html", file: "claw-lab.html", title: "翅爪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪝", ready: true,
    description: "同一只纸雏鸟。有爪才爬回；没爪就滑掉。",
    task: "试一次有爪和一次没爪，比较谁爬回巢。"
  }
  ,
  {
    id: "nature/water-boatmen.html", file: "water-boatmen.html", title: "划蝽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🛶", ready: true,
    description: "比较划蝽和仰泳蝽。划蝽后足像桨才划得动，不是站在水膜上。",
    task: "点两张不一样的卡，说出谁更像用桨划的划蝽。"
  }  ,
  {
    id: "games/oar-lab.html", file: "oar-lab.html", title: "划桨工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🚣", ready: true,
    description: "同一只纸划蝽。桨够长才划走；短腿就原地转。",
    task: "试一次长桨和一次短腿，比较谁划得走。"
  }
  ,
  {
    id: "nature/sunbitterns.html", file: "sunbitterns.html", title: "日鳽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较日鳽和合翅的鸟。日鳽翅膀一展才亮出太阳纹。",
    task: "点两张不一样的卡，说出谁更像展翅亮纹的日鳽。"
  }  ,
  {
    id: "games/flash-lab.html", file: "flash-lab.html", title: "闪翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "☀️", ready: true,
    description: "同一只纸日鳽。翅张开才吓退；合上就看不见。",
    task: "试一次张开和一次合上，比较谁看得见太阳纹。"
  }
  ,
  {
    id: "nature/harvestmen.html", file: "harvestmen.html", title: "盲蛛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕷️", ready: true,
    description: "比较盲蛛和蜘蛛。盲蛛身子是一整块、腿特别长，不会织网。",
    task: "点两张不一样的卡，说出谁更像长腿一整块的盲蛛。"
  }  ,
  {
    id: "games/longleg-lab.html", file: "longleg-lab.html", title: "长腿工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸盲蛛。长腿才跨得过；短腿就掉进缝。",
    task: "试一次长腿和一次短腿，比较谁跨得过。"
  }
  ,
  {
    id: "nature/lacewings.html", file: "lacewings.html", title: "草蛉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦋", ready: true,
    description: "比较草蛉幼虫和漂亮成虫。吃蚜虫的是幼虫的颚，不是成虫的纱翅。",
    task: "点两张不一样的卡，说出谁更像捕蚜的草蛉幼虫。"
  }  ,
  {
    id: "games/aphid-lab.html", file: "aphid-lab.html", title: "捕蚜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸幼虫。有颚才吸得到；没颚就够不着。",
    task: "试一次有颚和一次没颚，比较谁吸得到。"
  }
  ,
  {
    id: "nature/bladderworts.html", file: "bladderworts.html", title: "狸藻观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🫧", ready: true,
    description: "比较狸藻和瓶子草。狸藻水下小囊一吸才进去，不是滑边的坑。",
    task: "点两张不一样的卡，说出谁更像水下吸囊的狸藻。"
  }  ,
  {
    id: "games/suck-lab.html", file: "suck-lab.html", title: "吸囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💨", ready: true,
    description: "同一个纸小囊。囊瘪着才吸得动；鼓着就吸不进。",
    task: "试一次瘪囊和一次鼓囊，比较谁吸得进。"
  }
  ,
  {
    id: "nature/shoebills.html", file: "shoebills.html", title: "鲸头鹳观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鲸头鹳和走来走去的鸟。鲸头鹳先站成雕塑才啄得到。",
    task: "点两张不一样的卡，说出谁更像静站的鲸头鹳。"
  }  ,
  {
    id: "games/still-lab.html", file: "still-lab.html", title: "静站工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🗿", ready: true,
    description: "同一只纸鲸头鹳。站够久才啄中；乱动就错过。",
    task: "试一次静站和一次乱动，比较谁啄中。"
  }
  ,
  {
    id: "nature/honeyguides.html", file: "honeyguides.html", title: "响蜜䴕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较响蜜䴕和自己酿蜜的蜂。响蜜䴕带着人找到蜂巢才吃得到蜡。",
    task: "点两张不一样的卡，说出谁更像会带路的响蜜䴕。"
  }  ,
  {
    id: "games/wax-lab.html", file: "wax-lab.html", title: "引路工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍯", ready: true,
    description: "同一只纸鸟。带着走才找得到；自己乱飞就没有蜡。",
    task: "试一次带路和一次乱飞，比较谁找得到蜡。"
  }
  ,
  {
    id: "nature/kakapos.html", file: "kakapos.html", title: "鸮鹦鹉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦜", ready: true,
    description: "比较鸮鹦鹉和会飞去叫的鸟。鸮鹦鹉在土碗里低鸣才传得远。",
    task: "点两张不一样的卡，说出谁更像土碗低鸣的鸮鹦鹉。"
  }  ,
  {
    id: "games/boom-lab.html", file: "boom-lab.html", title: "低鸣工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📢", ready: true,
    description: "同一只纸鸮鹦鹉。碗够深才传远；平地就听不远。",
    task: "试一次土碗和一次平地，比较谁传得远。"
  }
  ,
  {
    id: "nature/frogmouths.html", file: "frogmouths.html", title: "蟆口鸱观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦉", ready: true,
    description: "比较蟆口鸱和鹈鹕。蟆口鸱先装成断枝，再张大嘴兜住，不是喉袋。",
    task: "点两张不一样的卡，说出谁更像装成断枝的蟆口鸱。"
  }  ,
  {
    id: "games/gape-lab.html", file: "gape-lab.html", title: "巨口工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "😮", ready: true,
    description: "同一只纸鸟。嘴张够大才兜住；小嘴就漏掉。",
    task: "试一次张大和一次小嘴，比较谁兜得住。"
  }
  ,
  {
    id: "nature/sandgrouse.html", file: "sandgrouse.html", title: "沙鸡观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪶", ready: true,
    description: "比较沙鸡和油羽鸽子。沙鸡肚皮浸湿才带回水。",
    task: "点两张不一样的卡，说出谁更像把肚皮浸湿的沙鸡。"
  }  ,
  {
    id: "games/soak-lab.html", file: "soak-lab.html", title: "浸腹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一只纸沙鸡。肚皮够湿才带回；油羽就滚走。",
    task: "试一次浸湿和一次油羽，比较谁把水带回。"
  }
  ,
  {
    id: "nature/riflebirds.html", file: "riflebirds.html", title: "风鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较风鸟和普通鸣禽。风鸟把披风张开才看得见那块蓝。",
    task: "点两张不一样的卡，说出谁更像张开披风的风鸟。"
  }  ,
  {
    id: "games/cape-lab.html", file: "cape-lab.html", title: "披风工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧥", ready: true,
    description: "同一只纸风鸟。披风张开才亮；收着就看不出。",
    task: "试一次张开和一次收起，比较谁看得见蓝。"
  }
  ,
  {
    id: "nature/potoos.html", file: "potoos.html", title: "林鸱观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦉", ready: true,
    description: "比较林鸱和一直动的鸟。林鸱先装成断枝才瞒得过。",
    task: "点两张不一样的卡，说出谁更像装成断枝的林鸱。"
  }  ,
  {
    id: "games/pose-lab.html", file: "pose-lab.html", title: "装枝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪵", ready: true,
    description: "同一只纸林鸱。贴着树枝才看不见；一动就被发现。",
    task: "试一次装枝和一次乱动，比较谁看不见。"
  }
  ,
  {
    id: "nature/oilbirds.html", file: "oilbirds.html", title: "油鸱观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦇", ready: true,
    description: "比较油鸱和只用眼看的鸟。油鸱在洞里靠点击回声才飞得动。",
    task: "点两张不一样的卡，说出谁更像会点击的油鸱。"
  }  ,
  {
    id: "games/caveclick-lab.html", file: "caveclick-lab.html", title: "洞穴点击工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔊", ready: true,
    description: "同一只纸油鸱。点击够才找得到路；不响就撞墙。",
    task: "试一次点击和一次不响，比较谁找得到路。"
  }
  ,
  {
    id: "nature/echidnas.html", file: "echidnas.html", title: "针鼹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦔", ready: true,
    description: "比较针鼹和刺猬。针鼹是下蛋的哺乳动物，背上的刺竖起来才防得住。",
    task: "点两张不一样的卡，说出谁更像会下蛋的针鼹。"
  }  ,
  {
    id: "games/spike-lab.html", file: "spike-lab.html", title: "竖刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📌", ready: true,
    description: "同一只纸针鼹。刺竖起才防得住；倒伏就挡不住。",
    task: "试一次竖刺和一次倒伏，比较谁防得住。"
  }
  ,
  {
    id: "nature/fruit-bats.html", file: "fruit-bats.html", title: "果蝠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦇", ready: true,
    description: "比较果蝠和吸血蝠。果蝠用舌头伸进花里才带得走花粉。",
    task: "点两张不一样的卡，说出谁更像传粉的果蝠。"
  }  ,
  {
    id: "games/pollen-lab.html", file: "pollen-lab.html", title: "传粉工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌸", ready: true,
    description: "同一只纸果蝠。舌伸进才沾上粉；闭嘴就带不走。",
    task: "试一次伸舌和一次闭嘴，比较谁带得走粉。"
  }
  ,
  {
    id: "nature/ospreys.html", file: "ospreys.html", title: "鹗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦅", ready: true,
    description: "比较鹗和普通鹰。鹗外趾能转到后面，才抓得住滑鱼。",
    task: "点两张不一样的卡，说出谁更像会转趾的鹗。"
  }  ,
  {
    id: "games/revers-lab.html", file: "revers-lab.html", title: "转趾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔄", ready: true,
    description: "同一只纸鹗。外趾转到后面才抓得住；不转就滑掉。",
    task: "试一次转趾和一次不转，比较谁抓得住。"
  }
  ,
  {
    id: "nature/spoonbills.html", file: "spoonbills.html", title: "琵鹭观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦩", ready: true,
    description: "比较琵鹭和尖喙涉禽。琵鹭扁嘴左右扫才捞得到。",
    task: "点两张不一样的卡，说出谁更像扫着捞的琵鹭。"
  }  ,
  {
    id: "games/sweep-lab.html", file: "sweep-lab.html", title: "扫喙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥄", ready: true,
    description: "同一只纸琵鹭。扁嘴左右扫才捞到；尖喙戳不中。",
    task: "试一次横扫和一次直戳，比较谁捞得到。"
  }
  ,
  {
    id: "nature/anhingas.html", file: "anhingas.html", title: "蛇鹈观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较蛇鹈和鸭子。蛇鹈羽毛会湿透才潜得深，上岸要张开晾。",
    task: "点两张不一样的卡，说出谁更像要晾翅膀的蛇鹈。"
  }  ,
  {
    id: "games/drywing-lab.html", file: "drywing-lab.html", title: "晾翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "☀️", ready: true,
    description: "同一只纸蛇鹈。翅湿透才潜得深；涂油就浮在面。",
    task: "试一次湿翅和一次涂油，比较谁潜得深。"
  }
  ,
  {
    id: "nature/gannets.html", file: "gannets.html", title: "鲣鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鲣鸟和张开拍水。鲣鸟翅贴身冲下去才进得了水。",
    task: "点两张不一样的卡，说出谁更像翅贴身冲水的鲣鸟。"
  }  ,
  {
    id: "games/plunge-lab.html", file: "plunge-lab.html", title: "冲水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸鲣鸟。翅贴紧才进得了水；张开就拍在面上。",
    task: "试一次贴翅和一次张开，比较谁进得了水。"
  }
  ,
  {
    id: "nature/horseshoe-crabs.html", file: "horseshoe-crabs.html", title: "鲎观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦀", ready: true,
    description: "比较鲎和螃蟹。鲎书鳃扇起来才划得动。",
    task: "点两张不一样的卡，说出谁更像把书鳃扇开的鲎。"
  }  ,
  {
    id: "games/bookgills-lab.html", file: "bookgills-lab.html", title: "书鳃工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📖", ready: true,
    description: "同一只纸鲎。书鳃扇开才划得动；合死就划不动。",
    task: "试一次扇开和一次合死，比较谁划得动。"
  }
  ,
  {
    id: "nature/skimmers.html", file: "skimmers.html", title: "剪嘴鸥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "✂️", ready: true,
    description: "比较剪嘴鸥和翠鸟。剪嘴鸥下喙更长贴着水面刮才捞得到。",
    task: "点两张不一样的卡，说出谁更像贴水刮的剪嘴鸥。"
  }  ,
  {
    id: "games/skim-lab.html", file: "skim-lab.html", title: "贴水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✂️", ready: true,
    description: "同一只纸剪嘴鸥。下喙贴水刮才捞得到；抬高去啄就漏掉。",
    task: "试一次贴水和一次抬高，比较谁捞得到。"
  }
  ,
  {
    id: "nature/avocets.html", file: "avocets.html", title: "反嘴鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较反嘴鹬和鹭。反嘴鹬上弯的细嘴左右扫才捞得到。",
    task: "点两张不一样的卡，说出谁更像上弯扫水的反嘴鹬。"
  }  ,
  {
    id: "games/upsweep-lab.html", file: "upsweep-lab.html", title: "上弯工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⤴️", ready: true,
    description: "同一只纸反嘴鹬。上弯细嘴左右扫才捞得到；直戳就漏掉。",
    task: "试一次上弯扫和一次直戳，比较谁捞得到。"
  }
  ,
  {
    id: "nature/oystercatchers.html", file: "oystercatchers.html", title: "蛎鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较蛎鹬和虾蛄。蛎鹬刀一样的红嘴才撬得开贝壳。",
    task: "点两张不一样的卡，说出谁更像用刀嘴撬缝的蛎鹬。"
  }  ,
  {
    id: "games/pry-lab.html", file: "pry-lab.html", title: "撬缝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔪", ready: true,
    description: "同一只纸蛎鹬。刀嘴撬进缝才开得了；去砸就撬不开。",
    task: "试一次撬缝和一次去砸，比较谁开得了。"
  }
  ,
  {
    id: "nature/tropicbirds.html", file: "tropicbirds.html", title: "鹲观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹲和短尾。鹲两根飘带尾才看得见信号。",
    task: "点两张不一样的卡，说出谁更像带飘带的鹲。"
  }  ,
  {
    id: "games/streamer-lab.html", file: "streamer-lab.html", title: "飘带工坊",
    type: "experiment", subject: "physics", age: "5–11", icon: "🎀", ready: true,
    description: "同一只纸鹲。两根飘带才看得见信号；剪短就认不出。",
    task: "试一次飘带和一次剪短，比较谁看得见信号。"
  }  ,
  {
    id: "nature/fulmars.html", file: "fulmars.html", title: "暴风鹱观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较暴风鹱和普通鸥。暴风鹱管鼻才排得出多余的盐。",
    task: "点两张不一样的卡，说出谁更像管鼻的暴风鹱。"
  }  ,
  {
    id: "games/tube-lab.html", file: "tube-lab.html", title: "管鼻工坊",
    type: "experiment", subject: "physics", age: "5–11", icon: "🧂", ready: true,
    description: "同一只纸暴风鹱。管子通了才排得出盐；堵住就咸着。",
    task: "试一次管子通和一次堵住，比较谁排得出盐。"
  }
  ,
  {
    id: "nature/storm-petrels.html", file: "storm-petrels.html", title: "海燕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较海燕和水黾。海燕飞着脚点水面才捞得到。",
    task: "点两张不一样的卡，说出谁更像飞着点水的海燕。"
  }  ,
  {
    id: "games/patter-lab.html", file: "patter-lab.html", title: "点水工坊",
    type: "experiment", subject: "physics", age: "5–11", icon: "👣", ready: true,
    description: "同一只纸海燕。飞着脚点水面才捞得到；翅膀一停就沉。",
    task: "试一次点水和一次停翅，比较谁捞得到。"
  }  ,
  {
    id: "nature/boobies.html", file: "boobies.html", title: "蓝脚鲣鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较蓝脚鲣鸟和收着脚的。蓝脚抬起来才看得见信号。",
    task: "点两张不一样的卡，说出谁更像抬蓝脚的鲣鸟。"
  }  ,
  {
    id: "games/mask-lab.html", file: "mask-lab.html", title: "蓝脚工坊",
    type: "experiment", subject: "physics", age: "5–11", icon: "💙", ready: true,
    description: "同一只纸蓝脚鲣鸟。蓝脚抬起来才看得见信号；收着就藏住。",
    task: "试一次抬脚和一次收脚，比较谁看得见信号。"
  }
  ,
  {
    id: "nature/frigatebirds.html", file: "frigatebirds.html", title: "军舰鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较军舰鸟和瘪着的。红喉囊鼓起来才看得见信号。",
    task: "点两张不一样的卡，说出谁更像鼓起红喉囊的军舰鸟。"
  }  ,
  {
    id: "games/gular-lab.html", file: "gular-lab.html", title: "喉囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎈", ready: true,
    description: "同一只纸军舰鸟。红喉囊鼓起来才看得见信号；瘪着就看不出。",
    task: "试一次鼓起来和一次瘪着，比较谁看得见信号。"
  }
  ,
  {
    id: "nature/platypus.html", file: "platypus.html", title: "鸭嘴兽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦫", ready: true,
    description: "比较鸭嘴兽和用眼看的兽。鸭嘴兽闭着眼用喙摸电场才找得到虾。",
    task: "点两张不一样的卡，说出谁更像闭眼摸电的鸭嘴兽。"
  }  ,
  {
    id: "games/electro-lab.html", file: "electro-lab.html", title: "电场工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚡", ready: true,
    description: "同一只纸鸭嘴兽。喙张开摸电才找得到；闭上喙就摸空。",
    task: "试一次张喙摸电和一次闭喙，比较谁找得到。"
  }
  ,
  {
    id: "nature/star-nosed-moles.html", file: "star-nosed-moles.html", title: "星鼻鼹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "⭐", ready: true,
    description: "比较星鼻鼹和光鼻子的鼹。星鼻鼹鼻子上的肉瓣星才摸得到路。",
    task: "点两张不一样的卡，说出谁更像有星鼻的鼹。"
  }  ,
  {
    id: "games/star-lab.html", file: "star-lab.html", title: "星鼻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👃", ready: true,
    description: "同一只纸星鼻鼹。肉瓣张开才摸得到；光鼻子就撞墙。",
    task: "试一次张开星和一次光鼻，比较谁摸得到。"
  }
  ,
  {
    id: "nature/peregrines.html", file: "peregrines.html", title: "游隼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦅", ready: true,
    description: "比较游隼和翅膀张开的鹰。游隼翅贴身俯冲才收得住速度。",
    task: "点两张不一样的卡，说出谁更像贴翅俯冲的游隼。"
  }  ,
  {
    id: "games/stoop-lab.html", file: "stoop-lab.html", title: "俯冲工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬇️", ready: true,
    description: "同一只纸游隼。翅贴紧才冲得快；张开就拖住。",
    task: "试一次贴翅和一次张开，比较谁冲得快。"
  }
  ,
  {
    id: "nature/barn-owls.html", file: "barn-owls.html", title: "仓鸮观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦉", ready: true,
    description: "比较仓鸮和普通猫头鹰。仓鸮翅前缘细齿才滑得静。",
    task: "点两张不一样的卡，说出谁更像滑得静的仓鸮。"
  }  ,
  {
    id: "games/silent-lab.html", file: "silent-lab.html", title: "静音工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🤫", ready: true,
    description: "同一只纸仓鸮。前缘有齿才静；光滑就呼呼响。",
    task: "试一次细齿和一次光滑，比较谁滑得静。"
  }
  ,
  {
    id: "nature/godwits.html", file: "godwits.html", title: "塍鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较塍鹬和短喙涉禽。塍鹬长喙探进泥里才够得到。",
    task: "点两张不一样的卡，说出谁更像长喙探泥的塍鹬。"
  }  ,
  {
    id: "games/probe-lab.html", file: "probe-lab.html", title: "探泥工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪡", ready: true,
    description: "同一只纸塍鹬。喙够长才探得到；短喙就够不着。",
    task: "试一次长喙和一次短喙，比较谁探得到。"
  }
  ,
  {
    id: "nature/turnstones.html", file: "turnstones.html", title: "翻石鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较翻石鹬和只在面上啄的涉禽。翻石鹬短喙掀石头才找得到。",
    task: "点两张不一样的卡，说出谁更像会掀石头的翻石鹬。"
  }  ,
  {
    id: "games/flip-lab.html", file: "flip-lab.html", title: "掀石工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸翻石鹬。掀开石头才找得到；不掀就啄空。",
    task: "试一次掀石和一次不掀，比较谁找得到。"
  }
  ,
  {
    id: "nature/shearwaters.html", file: "shearwaters.html", title: "鹱观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹱和猛扇翅膀的鸥。鹱硬翅贴着浪坡滑才飞得远。",
    task: "点两张不一样的卡，说出谁更像贴浪滑的鹱。"
  }  ,
  {
    id: "games/dynamic-lab.html", file: "dynamic-lab.html", title: "贴浪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸鹱。翅硬贴浪才滑得远；猛扇就累。",
    task: "试一次贴浪滑和一次猛扇，比较谁飞得远。"
  }
  ,
  {
    id: "nature/swifts.html", file: "swifts.html", title: "雨燕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较雨燕和用泥垒巢的燕。雨燕唾液把巢粘在墙上才掉不下来。",
    task: "点两张不一样的卡，说出谁更像用唾液粘巢的雨燕。"
  }  ,
  {
    id: "games/glue-lab.html", file: "glue-lab.html", title: "唾液巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪺", ready: true,
    description: "同一只纸雨燕。唾液够湿才粘得住；干了就掉。",
    task: "试一次湿粘和一次干掉，比较谁粘得住。"
  }
  ,
  {
    id: "nature/bitterns.html", file: "bitterns.html", title: "苇鳽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较苇鳽和走进空地的涉禽。苇鳽把脖子伸直藏进芦苇才看不见。",
    task: "点两张不一样的卡，说出谁更像藏进芦苇的苇鳽。"
  }  ,
  {
    id: "games/reed-lab.html", file: "reed-lab.html", title: "藏苇工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌾", ready: true,
    description: "同一只纸苇鳽。藏进芦苇才看不见；走到空地就被看见。",
    task: "试一次藏苇和一次走到空地，比较谁看不见。"
  }
  ,
  {
    id: "nature/hoopoes.html", file: "hoopoes.html", title: "戴胜观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较戴胜和普通啄木鸟。戴胜把冠羽张开才看得见信号。",
    task: "点两张不一样的卡，说出谁更像张开冠羽的戴胜。"
  }  ,
  {
    id: "games/crest-lab.html", file: "crest-lab.html", title: "冠羽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👑", ready: true,
    description: "同一只纸戴胜。冠羽张开才看得见；收着就认不出。",
    task: "试一次张开和一次收着，比较谁看得见冠。"
  }
  ,
  {
    id: "nature/oxpeckers.html", file: "oxpeckers.html", title: "牛椋鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较牛椋鸟和乱咬的鸟。牛椋鸟站在背上啄蜱才找得到。",
    task: "点两张不一样的卡，说出谁更像会啄蜱的牛椋鸟。"
  }  ,
  {
    id: "games/tick-lab.html", file: "tick-lab.html", title: "啄蜱工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪲", ready: true,
    description: "同一只纸牛椋鸟。站着啄蜱才找得到；追着咬就找不到。",
    task: "试一次啄蜱和一次追咬，比较谁找得到。"
  }
  ,
  {
    id: "nature/weaverbirds.html", file: "weaverbirds.html", title: "织巢鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较织巢鸟和松散的巢。织巢鸟把结打紧巢才挂得住。",
    task: "点两张不一样的卡，说出谁更像会织巢的织巢鸟。"
  }  ,
  {
    id: "games/nest-lab.html", file: "nest-lab.html", title: "织巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪺", ready: true,
    description: "同一只纸织巢鸟。结打紧才挂得住；松了就掉。",
    task: "试一次打紧和一次松开，比较谁挂得住。"
  }
  ,
  {
    id: "nature/roadrunners.html", file: "roadrunners.html", title: "走鹃观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较走鹃和乱飞的鸟。走鹃贴地快跑才追得到。",
    task: "点两张不一样的卡，说出谁更像贴地跑的走鹃。"
  }  ,
  {
    id: "games/sprint-lab.html", file: "sprint-lab.html", title: "快跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏃", ready: true,
    description: "同一只纸走鹃。贴地跑才追得到；乱飞就浪费。",
    task: "试一次快跑和一次乱飞，比较谁追得到。"
  }
  ,
  {
    id: "nature/cuckoos.html", file: "cuckoos.html", title: "杜鹃观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较杜鹃和自己孵蛋的鸟。杜鹃把蛋放进别人的巢才有人孵。",
    task: "点两张不一样的卡，说出谁更像会寄巢的杜鹃。"
  }  ,
  {
    id: "games/brood-lab.html", file: "brood-lab.html", title: "寄巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥚", ready: true,
    description: "同一只纸杜鹃。蛋放进别人巢才有人孵；自己坐着就没人帮。",
    task: "试一次放进别人巢和一次自己坐，比较谁有人孵。"
  }
  ,
  {
    id: "nature/ibises.html", file: "ibises.html", title: "鹮观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹮和直喙涉禽。鹮下弯的长嘴探进泥里才够得到。",
    task: "点两张不一样的卡，说出谁更像弯喙探泥的鹮。"
  }  ,
  {
    id: "games/curve-lab.html", file: "curve-lab.html", title: "弯喙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪝", ready: true,
    description: "同一只纸鹮。弯喙探泥才够得到；直啄就够不着。",
    task: "试一次弯探和一次直啄，比较谁够得到。"
  }
  ,
  {
    id: "nature/egrets.html", file: "egrets.html", title: "白鹭观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较白鹭和收着羽毛的鹭。白鹭把背上蓑羽披开才看得见信号。",
    task: "点两张不一样的卡，说出谁更像披着蓑羽的白鹭。"
  }  ,
  {
    id: "games/plume-lab.html", file: "plume-lab.html", title: "蓑羽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪶", ready: true,
    description: "同一只纸白鹭。蓑羽披开才看得见；收着就认不出。",
    task: "试一次披开和一次收着，比较谁看得见蓑羽。"
  }
  ,
  {
    id: "nature/herons.html", file: "herons.html", title: "苍鹭观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较苍鹭和一直伸着脖子的鹭。苍鹭先把脖子缩成 S 形再弹出才打得到。",
    task: "点两张不一样的卡，说出谁更像会缩颈的苍鹭。"
  }  ,
  {
    id: "games/coil-lab.html", file: "coil-lab.html", title: "缩颈工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸苍鹭。先缩再打才打得到；一直伸着鱼就跑。",
    task: "试一次缩打和一次直伸，比较谁打得到。"
  }
  ,
  {
    id: "nature/bee-eaters.html", file: "bee-eaters.html", title: "蜂虎观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较蜂虎和整只吞的鸟。蜂虎先把刺搓掉才吃得成。",
    task: "点两张不一样的卡，说出谁更像会搓刺的蜂虎。"
  }  ,
  {
    id: "games/sting-lab.html", file: "sting-lab.html", title: "搓刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐝", ready: true,
    description: "同一只纸蜂虎。先搓掉刺才吃得成；整只吞就被蛰。",
    task: "试一次搓刺和一次整吞，比较谁吃得成。"
  }
  ,
  {
    id: "nature/nightjars.html", file: "nightjars.html", title: "夜鹰观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较夜鹰和走动的鸟。夜鹰贴地不动，枯叶纹才藏得住。",
    task: "点两张不一样的卡，说出谁更像贴地藏着的夜鹰。"
  }  ,
  {
    id: "games/churr-lab.html", file: "churr-lab.html", title: "贴地工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪵", ready: true,
    description: "同一只纸夜鹰。贴地不动才藏得住；走来走去就被看见。",
    task: "试一次贴地和一次走动，比较谁藏得住。"
  }
  ,
  {
    id: "nature/motmots.html", file: "motmots.html", title: "翠鴗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较翠鴗和齐尾的鸟。翠鴗把球拍尾晃着才看得见信号。",
    task: "点两张不一样的卡，说出谁更像有球拍尾的翠鴗。"
  }  ,
  {
    id: "games/racket-lab.html", file: "racket-lab.html", title: "球拍尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎾", ready: true,
    description: "同一只纸翠鴗。球拍尾晃着才看得见；齐尾就认不出。",
    task: "试一次晃拍和一次齐尾，比较谁看得见。"
  }
  ,
  {
    id: "nature/swallows.html", file: "swallows.html", title: "家燕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较家燕和雨燕。家燕用湿泥一口一口贴上墙，巢才贴得住。",
    task: "点两张不一样的卡，说出谁更像会贴泥巢的家燕。"
  }  ,
  {
    id: "games/mudnest-lab.html", file: "mudnest-lab.html", title: "泥巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧱", ready: true,
    description: "同一只纸家燕。泥够湿才贴得住；太干泥块就掉。",
    task: "试一次湿泥和一次干泥，比较谁贴得住。"
  }
  ,
  {
    id: "nature/phalaropes.html", file: "phalaropes.html", title: "瓣蹼鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较瓣蹼鹬和站着的涉禽。瓣蹼鹬转圈搅涡才把小虫旋上来。",
    task: "点两张不一样的卡，说出谁更像会转圈的瓣蹼鹬。"
  }  ,
  {
    id: "games/whirl-lab.html", file: "whirl-lab.html", title: "转涡工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌀", ready: true,
    description: "同一只纸瓣蹼鹬。转圈搅涡才旋得上；站着不动虫沉底。",
    task: "试一次转圈和一次站住，比较谁旋得上。"
  }
  ,
  {
    id: "nature/ostriches.html", file: "ostriches.html", title: "鸵鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鸵鸟和想飞的大鸟。鸵鸟用长腿跑和踢才跑得掉。",
    task: "点两张不一样的卡，说出谁更像会踢跑的鸵鸟。"
  }  ,
  {
    id: "games/kick-lab.html", file: "kick-lab.html", title: "踢跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸鸵鸟。长腿踢跑才跑得掉；扇翅膀飞不起来。",
    task: "试一次踢跑和一次扇飞，比较谁跑得掉。"
  }
  ,
  {
    id: "nature/curlews.html", file: "curlews.html", title: "杓鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较杓鹬和短直喙涉禽。杓鹬镰刀一样的长喙探进弯洞才够得到。",
    task: "点两张不一样的卡，说出谁更像镰喙的杓鹬。"
  }  ,
  {
    id: "games/sickle-lab.html", file: "sickle-lab.html", title: "镰喙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌙", ready: true,
    description: "同一只纸杓鹬。镰喙探洞才够得到；短直喙就够不着。",
    task: "试一次镰探和一次短啄，比较谁够得到。"
  }
  ,
  {
    id: "nature/crossbills.html", file: "crossbills.html", title: "交嘴雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较交嘴雀和直喙小鸟。交嘴雀交叉的嘴才撬得开松果。",
    task: "点两张不一样的卡，说出谁更像交叉喙的交嘴雀。"
  }  ,
  {
    id: "games/twist-lab.html", file: "twist-lab.html", title: "交嘴工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔀", ready: true,
    description: "同一只纸交嘴雀。交叉喙才撬得开；直喙就戳不进。",
    task: "试一次交叉和一次直喙，比较谁撬得出种子。"
  }
  ,
  {
    id: "nature/sandpipers.html", file: "sandpipers.html", title: "鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹬和站着大啄的涉禽。鹬细嘴点着走才啄得到。",
    task: "点两张不一样的卡，说出谁更像点着走的鹬。"
  }  ,
  {
    id: "games/sew-lab.html", file: "sew-lab.html", title: "缝纫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪡", ready: true,
    description: "同一只纸鹬。细嘴点着走才啄得到；站着大啄就啄空。",
    task: "试一次点走和一次大啄，比较谁啄得到。"
  }
  ,
  {
    id: "nature/sanderlings.html", file: "sanderlings.html", title: "三趾鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较三趾鹬和站在浪里的鸟。三趾鹬跟着退浪跑才啄得到。",
    task: "点两张不一样的卡，说出谁更像追浪的三趾鹬。"
  }  ,
  {
    id: "games/surf-lab.html", file: "surf-lab.html", title: "追浪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸三趾鹬。跟着退浪跑才啄得到；站在浪里就被打走。",
    task: "试一次追浪和一次站浪，比较谁啄得到。"
  }
  ,
  {
    id: "nature/rollers.html", file: "rollers.html", title: "佛法僧观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较佛法僧和平飞的蓝鸟。佛法僧一边飞一边翻才看得见蓝。",
    task: "点两张不一样的卡，说出谁更像会翻飞的佛法僧。"
  }  ,
  {
    id: "games/tumble-lab.html", file: "tumble-lab.html", title: "翻飞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔄", ready: true,
    description: "同一只纸佛法僧。一边飞一边翻才看得见；平着飞就认不出。",
    task: "试一次翻飞和一次平飞，比较谁看得见。"
  }
  ,
  {
    id: "nature/rheas.html", file: "rheas.html", title: "美洲鸵观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较美洲鸵和想飞的大鸟。美洲鸵三趾着地跑才跑得掉。",
    task: "点两张不一样的卡，说出谁更像三趾跑的美洲鸵。"
  }  ,
  {
    id: "games/lope-lab.html", file: "lope-lab.html", title: "三趾跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸美洲鸵。三趾快跑才跑得掉；扇翅膀飞不起来。",
    task: "试一次快跑和一次扇飞，比较谁跑得掉。"
  }
  ,
  {
    id: "nature/arctic-terns.html", file: "arctic-terns.html", title: "北极燕鸥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较北极燕鸥和停在一个海边的燕鸥。北极燕鸥一站接一站飞才两边夏天都赶上。",
    task: "点两张不一样的卡，说出谁更像飞两极的北极燕鸥。"
  }  ,
  {
    id: "games/pole-lab.html", file: "pole-lab.html", title: "两极工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧭", ready: true,
    description: "同一只纸北极燕鸥。接着飞才赶得上；停住冬天就到了。",
    task: "试一次接着飞和一次停住，比较谁赶得上。"
  }
  ,
  {
    id: "nature/cormorants.html", file: "cormorants.html", title: "鸬鹚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鸬鹚和收着湿翅的鸟。鸬鹚上岸把翅膀张开晾干，下一次才飞得动。",
    task: "点两张不一样的卡，说出谁更像会晾翅的鸬鹚。"
  }  ,
  {
    id: "games/hangdry-lab.html", file: "hangdry-lab.html", title: "晾翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧥", ready: true,
    description: "同一只纸鸬鹚。上岸晾翅才飞得动；收着湿翅就沉。",
    task: "试一次晾翅和一次收湿，比较谁飞得动。"
  }
  ,
  {
    id: "nature/emus.html", file: "emus.html", title: "鸸鹋观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鸸鹋和想飞的大鸟。鸸鹋靠粗毛腿跑才跑得远。",
    task: "点两张不一样的卡，说出谁更像会跑的鸸鹋。"
  }  ,
  {
    id: "games/pace-lab.html", file: "pace-lab.html", title: "粗毛跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪶", ready: true,
    description: "同一只纸鸸鹋。粗毛腿跑才跑得远；扇翅膀飞不起来。",
    task: "试一次跑和一次扇飞，比较谁跑得远。"
  }
  ,
  {
    id: "nature/knots.html", file: "knots.html", title: "红腹滨鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较红腹滨鹬和单独的鹬。红腹滨鹬挤在大群里才不那么容易被看见。",
    task: "点两张不一样的卡，说出谁更像挤在大群里的红腹滨鹬。"
  }  ,
  {
    id: "games/flock-lab.html", file: "flock-lab.html", title: "大群工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🟠", ready: true,
    description: "同一只纸红腹滨鹬。挤在大群里才躲得过；一只单独站就被看见。",
    task: "试一次入群和一次单独，比较谁躲得过。"
  }
  ,
  {
    id: "nature/woodcocks.html", file: "woodcocks.html", title: "丘鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较丘鹬和贴地不出声的鸟。丘鹬先叫再螺旋飞才看得见。",
    task: "点两张不一样的卡，说出谁更像会螺旋飞的丘鹬。"
  }  ,
  {
    id: "games/peent-lab.html", file: "peent-lab.html", title: "螺旋飞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌀", ready: true,
    description: "同一只纸丘鹬。先叫再螺旋飞才看得见；趴着不出声就没人知道。",
    task: "试一次螺旋和一次趴着，比较谁看得见。"
  }
  ,
  {
    id: "nature/plovers.html", file: "plovers.html", title: "鸻观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鸻和直着跑开的鸟。鸻把一只翅膀垂地装瘸，才把危险从巢边引走。",
    task: "点两张不一样的卡，说出谁更像会装瘸的鸻。"
  }  ,
  {
    id: "games/fake-lab.html", file: "fake-lab.html", title: "假瘸工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🩹", ready: true,
    description: "同一只纸鸻。装瘸才引得走；直着跑开巢就被看见。",
    task: "试一次装瘸和一次直跑，比较谁引得走。"
  }
  ,
  {
    id: "nature/snipes.html", file: "snipes.html", title: "沙锥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较沙锥和用嗓子叫的鸟。沙锥俯冲时尾羽迎风振才听得见嗡嗡。",
    task: "点两张不一样的卡，说出谁更像会振尾的沙锥。"
  }  ,
  {
    id: "games/winnow-lab.html", file: "winnow-lab.html", title: "尾羽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎐", ready: true,
    description: "同一只纸沙锥。尾羽迎风振才听得见；收着尾就没有声音。",
    task: "试一次振尾和一次收尾，比较谁听得见。"
  }
  ,
  {
    id: "nature/stilts.html", file: "stilts.html", title: "长脚鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较长脚鹬和短腿涉禽。长脚鹬那对粉红长腿才走得进深一点的水。",
    task: "点两张不一样的卡，说出谁更像长腿的长脚鹬。"
  }  ,
  {
    id: "games/stilt-lab.html", file: "stilt-lab.html", title: "高跷工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸长脚鹬。腿够长才走得进；太短身子就湿了。",
    task: "试一次长腿和一次短腿，比较谁走得进。"
  }
  ,
  {
    id: "nature/dunlins.html", file: "dunlins.html", title: "黑腹滨鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较黑腹滨鹬和自己乱飞的鹬。黑腹滨鹬跟着大群翻面才一下子换颜色。",
    task: "点两张不一样的卡，说出谁更像会翻面的黑腹滨鹬。"
  }  ,
  {
    id: "games/ripple-lab.html", file: "ripple-lab.html", title: "波纹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸黑腹滨鹬。跟着大群翻面才换得了色；自己乱飞就被看见。",
    task: "试一次跟群和一次乱飞，比较谁换得了色。"
  }
  ,
  {
    id: "nature/bustards.html", file: "bustards.html", title: "鸨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鸨和瘪着脖子的大鸟。鸨把喉囊鼓起来，白才看得见。",
    task: "点两张不一样的卡，说出谁更像鼓着白囊的鸨。"
  }  ,
  {
    id: "games/balloon-lab.html", file: "balloon-lab.html", title: "鼓白囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎈", ready: true,
    description: "同一只纸鸨。喉囊鼓起来才看得见；瘪着就看不出。",
    task: "试一次鼓囊和一次瘪着，比较谁看得见。"
  }
  ,
  {
    id: "nature/nighthawks.html", file: "nighthawks.html", title: "美洲夜鹰观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较美洲夜鹰和贴地藏的夜鹰。美洲夜鹰俯冲时风过翅才听得见轰的一声。",
    task: "点两张不一样的卡，说出谁更像会俯冲轰的美洲夜鹰。"
  }  ,
  {
    id: "games/diveboom-lab.html", file: "diveboom-lab.html", title: "俯冲轰工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💥", ready: true,
    description: "同一只纸美洲夜鹰。俯冲让风过翅才听得见；平着飞就没有轰声。",
    task: "试一次俯冲和一次平飞，比较谁听得见轰。"
  }
  ,
  {
    id: "nature/redshanks.html", file: "redshanks.html", title: "红脚鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较红脚鹬和闷着走的鹬。红脚鹬先大叫再飞，旁边的鸟才听见。",
    task: "点两张不一样的卡，说出谁更像会报警的红脚鹬。"
  }  ,
  {
    id: "games/alarm-lab.html", file: "alarm-lab.html", title: "警报工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📢", ready: true,
    description: "同一只纸红脚鹬。先叫再飞旁边才听见；闷着飞走谁也不知道。",
    task: "试一次先叫和一次闷走，比较谁听得见。"
  }
  ,
  {
    id: "nature/yellowlegs.html", file: "yellowlegs.html", title: "黄脚鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较黄脚鹬和站着不动的涉禽。黄脚鹬身子一点一点才看得清浅水。",
    task: "点两张不一样的卡，说出谁更像会点头的黄脚鹬。"
  }  ,
  {
    id: "games/teeter-lab.html", file: "teeter-lab.html", title: "点头工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "↕️", ready: true,
    description: "同一只纸黄脚鹬。身子一点一点才看得清；站着不动就看不清。",
    task: "试一次点头和一次站住，比较谁看得清。"
  }
  ,
  {
    id: "nature/pratincoles.html", file: "pratincoles.html", title: "燕鸻观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较燕鸻和在泥里啄的鸻。燕鸻飞到空中捉虫才捉得到。",
    task: "点两张不一样的卡，说出谁更像会空中捉虫的燕鸻。"
  }  ,
  {
    id: "games/hawkfly-lab.html", file: "hawkfly-lab.html", title: "空中捉虫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦟", ready: true,
    description: "同一只纸燕鸻。飞到空中捉才捉得到；在泥里啄就啄空。",
    task: "试一次空捉和一次泥啄，比较谁捉得到。"
  }
  ,
  {
    id: "nature/coursers.html", file: "coursers.html", title: "走鸻观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较走鸻和站着等的鸻。走鸻在干地上跑着捉才追得到。",
    task: "点两张不一样的卡，说出谁更像会跑的走鸻。"
  }  ,
  {
    id: "games/cursor-lab.html", file: "cursor-lab.html", title: "干地跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏃", ready: true,
    description: "同一只纸走鸻。干地上跑着捉才追得到；站着等虫就跑了。",
    task: "试一次跑捉和一次站等，比较谁追得到。"
  }
  ,
  {
    id: "nature/thick-knees.html", file: "thick-knees.html", title: "石鸻观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较石鸻和眯着眼的鸟。石鸻黄昏把大眼睛睁着才看得见夜虫。",
    task: "点两张不一样的卡，说出谁更像大眼睛的石鸻。"
  }  ,
  {
    id: "games/glare-lab.html", file: "glare-lab.html", title: "大眼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👀", ready: true,
    description: "同一只纸石鸻。大眼睛睁着才看得见；眯成缝就看不清。",
    task: "试一次睁大和一次眯眼，比较谁看得见。"
  }
  ,
  {
    id: "nature/whimbrels.html", file: "whimbrels.html", title: "中杓鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较中杓鹬和光头顶的涉禽。中杓鹬头顶两条纹才认得出。",
    task: "点两张不一样的卡，说出谁更像有头顶纹的中杓鹬。"
  }  ,
  {
    id: "games/headstripe-lab.html", file: "headstripe-lab.html", title: "头顶纹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸中杓鹬。头顶两条纹才认得出；光顶就认不出。",
    task: "试一次露纹和一次光顶，比较谁认得出。"
  }
  ,
  {
    id: "nature/dowitchers.html", file: "dowitchers.html", title: "半蹼鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较半蹼鹬和慢啄的涉禽。半蹼鹬细嘴密点才啄得到深水虫。",
    task: "点两张不一样的卡，说出谁更像会密点的半蹼鹬。"
  }  ,
  {
    id: "games/stitch-lab.html", file: "stitch-lab.html", title: "密点工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧵", ready: true,
    description: "同一只纸半蹼鹬。细嘴密点才啄得到；慢啄就够不着。",
    task: "试一次密点和一次慢啄，比较谁啄得到。"
  }
  ,
  {
    id: "nature/ruffs.html", file: "ruffs.html", title: "流苏鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较流苏鹬和收着领子的鸟。流苏鹬把颈裙撑开才看得见信号。",
    task: "点两张不一样的卡，说出谁更像撑开颈裙的流苏鹬。"
  }  ,
  {
    id: "games/lek-lab.html", file: "lek-lab.html", title: "颈裙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧣", ready: true,
    description: "同一只纸流苏鹬。颈裙撑开才看得见；收着就认不出。",
    task: "试一次撑开和一次收着，比较谁看得见。"
  }
  ,
  {
    id: "nature/shelducks.html", file: "shelducks.html", title: "麻鸭观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦆", ready: true,
    description: "比较麻鸭和把蛋放在空地上的鸭。麻鸭把蛋放进洞里才藏得住。",
    task: "点两张不一样的卡，说出谁更像会洞巢的麻鸭。"
  }  ,
  {
    id: "games/burrownest-lab.html", file: "burrownest-lab.html", title: "洞巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕳️", ready: true,
    description: "同一只纸麻鸭。蛋放进洞里才藏得住；放在空地上就被看见。",
    task: "试一次进洞和一次空地，比较谁藏得住。"
  }
  ,
  {
    id: "nature/scallops.html", file: "scallops.html", title: "扇贝观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐚", ready: true,
    description: "比较扇贝和贻贝。扇贝两扇壳拍紧，水喷出去才游得走。",
    task: "点两张不一样的卡，说出谁更像会拍壳的扇贝。"
  }  ,
  {
    id: "games/clap-lab.html", file: "clap-lab.html", title: "拍壳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👏", ready: true,
    description: "同一只纸扇贝。两扇壳拍紧才游得走；闭着不动就粘在原地。",
    task: "试一次拍壳和一次闭着，比较谁游得走。"
  }
  ,
  {
    id: "nature/willets.html", file: "willets.html", title: "威氏鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较威氏鹬和收着翅膀的鹬。威氏鹬翅膀张开才看得见黑白带。",
    task: "点两张不一样的卡，说出谁更像会亮翅的威氏鹬。"
  }  ,
  {
    id: "games/wingflash-lab.html", file: "wingflash-lab.html", title: "亮翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬛", ready: true,
    description: "同一只纸威氏鹬。翅膀张开才看得见黑白带；收着就看不出。",
    task: "试一次亮翅和一次收翅，比较谁看得见。"
  }
  ,
  {
    id: "nature/tattlers.html", file: "tattlers.html", title: "灰鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较灰鹬和站到内陆的鸟。灰鹬在浪打的石头上点才啄得到礁缝。",
    task: "点两张不一样的卡，说出谁更像在礁上点的灰鹬。"
  }  ,
  {
    id: "games/bob-lab.html", file: "bob-lab.html", title: "礁石点头工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸灰鹬。在浪打的石头上点才啄得到；站到内陆就没有。",
    task: "试一次点礁和一次内陆，比较谁啄得到。"
  }
  ,
  {
    id: "nature/surfbirds.html", file: "surfbirds.html", title: "冲浪鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较冲浪鸟和去泥滩探的鹬。冲浪鸟在浪洗过的岩架上捡才捡得到。",
    task: "点两张不一样的卡，说出谁更像会捡岩架的冲浪鸟。"
  }  ,
  {
    id: "games/ledge-lab.html", file: "ledge-lab.html", title: "岩架工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸冲浪鸟。在岩架上捡才捡得到；去泥滩探就没有。",
    task: "试一次捡架和一次探泥，比较谁捡得到。"
  }
  ,
  {
    id: "nature/greenshanks.html", file: "greenshanks.html", title: "青脚鹬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较青脚鹬和还站着的鸟。青脚鹬老远就飞才先离开危险。",
    task: "点两张不一样的卡，说出谁更像会早飞的青脚鹬。"
  }  ,
  {
    id: "games/alert-lab.html", file: "alert-lab.html", title: "早飞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🛫", ready: true,
    description: "同一只纸青脚鹬。老远就飞才先离开；还站着危险就到了身边。",
    task: "试一次早飞和一次还站，比较谁先离开。"
  }
  ,
  {
    id: "nature/wolves.html", file: "wolves.html", title: "狼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐺", ready: true,
    description: "比较狼和单独捉的狐狸。狼几只一起围才堵得住。",
    task: "点两张不一样的卡，说出谁更像会围猎的狼。"
  }  ,
  {
    id: "games/pack-lab.html", file: "pack-lab.html", title: "围猎工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫂", ready: true,
    description: "同一只纸狼。几只一起围才堵得住；一只单独冲猎物就跑了。",
    task: "试一次围猎和一次单冲，比较谁堵得住。"
  }
  ,
  {
    id: "nature/hyenas.html", file: "hyenas.html", title: "鬣狗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦴", ready: true,
    description: "比较鬣狗和软牙的兽。鬣狗牙够硬才咬得开骨头。",
    task: "点两张不一样的卡，说出谁更像会咬骨的鬣狗。"
  }  ,
  {
    id: "games/crush-lab.html", file: "crush-lab.html", title: "咬骨工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💪", ready: true,
    description: "同一只纸鬣狗。牙够硬才咬得开；太软就咬不动。",
    task: "试一次硬牙和一次软牙，比较谁咬得开。"
  }
  ,
  {
    id: "nature/raccoons.html", file: "raccoons.html", title: "浣熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦝", ready: true,
    description: "比较浣熊和水獭。浣熊把爪子浸进水里摸才摸得到。",
    task: "点两张不一样的卡，说出谁更像会浸水摸的浣熊。"
  }  ,
  {
    id: "games/douse-lab.html", file: "douse-lab.html", title: "浸水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一只纸浣熊。爪子浸进水里才摸得到；干着抓就抓空。",
    task: "试一次浸水和一次干抓，比较谁摸得到。"
  }
  ,
  {
    id: "nature/mongooses.html", file: "mongooses.html", title: "獴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦦", ready: true,
    description: "比较獴和迎面硬撞的兽。獴先躲开再咬才躲得开。",
    task: "点两张不一样的卡，说出谁更像会躲开的獴。"
  }  ,
  {
    id: "games/dodge-lab.html", file: "dodge-lab.html", title: "躲开工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐍", ready: true,
    description: "同一只纸獴。先躲开再咬才躲得开；迎面硬撞会被咬到。",
    task: "试一次躲开和一次硬撞，比较谁躲得开。"
  }
  ,
  {
    id: "nature/badgers.html", file: "badgers.html", title: "獾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦡", ready: true,
    description: "比较獾和只在地面抓的兽。獾爪子宽，往下挖才挖得出洞。",
    task: "点两张不一样的卡，说出谁更像会挖洞的獾。"
  }  ,
  {
    id: "games/sett-lab.html", file: "sett-lab.html", title: "洞道工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕳️", ready: true,
    description: "同一只纸獾。爪够宽往下挖才挖得出；在地面抓只抓破皮。",
    task: "试一次深挖和一次抓皮，比较谁挖得出。"
  }
  ,
  {
    id: "nature/wolverines.html", file: "wolverines.html", title: "狼獾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐻", ready: true,
    description: "比较狼獾和把肉放在暖处的兽。狼獾把吃剩的埋进冻土才存得住。",
    task: "点两张不一样的卡，说出谁更像会冻藏的狼獾。"
  }  ,
  {
    id: "games/cache-lab.html", file: "cache-lab.html", title: "冻藏工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "❄️", ready: true,
    description: "同一只纸狼獾。埋进冻土才存得住；放在暖处就坏掉。",
    task: "试一次冻埋和一次暖放，比较谁存得住。"
  }
  ,
  {
    id: "nature/weasels.html", file: "weasels.html", title: "黄鼠狼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦡", ready: true,
    description: "比较黄鼠狼和圆身子的兽。黄鼠狼身子细才钻得进洞。",
    task: "点两张不一样的卡，说出谁更像会钻洞的黄鼠狼。"
  }  ,
  {
    id: "games/tunnel-lab.html", file: "tunnel-lab.html", title: "细洞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕳️", ready: true,
    description: "同一只纸黄鼠狼。身子够细才钻得进；太圆就卡在洞口。",
    task: "试一次细钻和一次圆卡，比较谁钻得进。"
  }
  ,
  {
    id: "nature/murres.html", file: "murres.html", title: "海鸦观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较海鸦和圆蛋。海鸦的梨形蛋滚一圈还在崖上。",
    task: "点两张不一样的卡，说出谁更像下梨形蛋的海鸦。"
  }  ,
  {
    id: "games/pear-lab.html", file: "pear-lab.html", title: "梨形蛋工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥚", ready: true,
    description: "同一只纸海鸦。蛋是梨形才留在崖上；圆的就滚下去。",
    task: "试一次梨形和一次圆形，比较谁留在崖上。"
  }
  ,
  {
    id: "nature/dingoes.html", file: "dingoes.html", title: "澳洲野犬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐕", ready: true,
    description: "比较澳洲野犬和乱蹦的狗。澳洲野犬步子稳着跑才跑得远。",
    task: "点两张不一样的卡，说出谁更像会稳跑的澳洲野犬。"
  }  ,
  {
    id: "games/trot-lab.html", file: "trot-lab.html", title: "长跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏃", ready: true,
    description: "同一只纸澳洲野犬。步子稳着跑才跑得远；一步一蹦一会儿就累。",
    task: "试一次稳跑和一次乱蹦，比较谁跑得远。"
  }
  ,
  {
    id: "nature/coyotes.html", file: "coyotes.html", title: "郊狼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐺", ready: true,
    description: "比较郊狼和一声长嚎的狗。郊狼短叫连着传，同伴才听得见在哪。",
    task: "点两张不一样的卡，说出谁更像会短叫的郊狼。"
  }  ,
  {
    id: "games/yip-lab.html", file: "yip-lab.html", title: "短叫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📣", ready: true,
    description: "同一只纸郊狼。短叫连着传才听得见在哪；一声长嚎听不出远近。",
    task: "试一次短叫和一次长嚎，比较谁听得见在哪。"
  }
  ,
  {
    id: "nature/jackals.html", file: "jackals.html", title: "胡狼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐕", ready: true,
    description: "比较胡狼和硬抢的兽。胡狼跟在大兽后面捡剩的才捡得到。",
    task: "点两张不一样的卡，说出谁更像会捡食的胡狼。"
  }  ,
  {
    id: "games/scavenge-lab.html", file: "scavenge-lab.html", title: "捡食工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍖", ready: true,
    description: "同一只纸胡狼。跟在后面捡才捡得到；自己去硬抢抢不到还挨打。",
    task: "试一次跟捡和一次硬抢，比较谁捡得到。"
  }
  ,
  {
    id: "nature/razorbills.html", file: "razorbills.html", title: "刀嘴海雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较刀嘴海雀和只会拍水面的鸟。刀嘴海雀先飞再扎进水才潜得进。",
    task: "点两张不一样的卡，说出谁更像会飞潜的刀嘴海雀。"
  }  ,
  {
    id: "games/flydive-lab.html", file: "flydive-lab.html", title: "飞潜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬇️", ready: true,
    description: "同一只纸刀嘴海雀。先飞再扎才潜得进；只会拍面就进不去。",
    task: "试一次飞潜和一次拍面，比较谁潜得进。"
  }
  ,
  {
    id: "nature/auklets.html", file: "auklets.html", title: "海雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较海雀和光嘴的鸟。海雀夜里把嘴边须张开才捞得到。",
    task: "点两张不一样的卡，说出谁更像有嘴须的海雀。"
  }  ,
  {
    id: "games/rictal-lab.html", file: "rictal-lab.html", title: "嘴须工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌾", ready: true,
    description: "同一只纸海雀。嘴边须张开才捞得到；收着就捞空。",
    task: "试一次张须和一次收须，比较谁捞得到。"
  }
  ,
  {
    id: "nature/coatis.html", file: "coatis.html", title: "长鼻浣熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦝", ready: true,
    description: "比较长鼻浣熊和只用眼睛看的兽。长鼻浣熊把鼻子往土里拱才拱得到虫。",
    task: "点两张不一样的卡，说出谁更像会拱土的长鼻浣熊。"
  }  ,
  {
    id: "games/root-lab.html", file: "root-lab.html", title: "拱土工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👃", ready: true,
    description: "同一只纸长鼻浣熊。鼻子往土里拱才拱得到；只用眼睛看就看不见。",
    task: "试一次拱土和一次干看，比较谁拱得到。"
  }
  ,
  {
    id: "nature/kinkajous.html", file: "kinkajous.html", title: "蜜熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐻", ready: true,
    description: "比较蜜熊和垂着尾巴的兽。蜜熊把尾巴卷住树枝才挂得住。",
    task: "点两张不一样的卡，说出谁更像会卷尾的蜜熊。"
  }  ,
  {
    id: "games/hangtail-lab.html", file: "hangtail-lab.html", title: "卷尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌙", ready: true,
    description: "同一只纸蜜熊。尾巴卷住才挂得住；垂着就掉下去。",
    task: "试一次卷住和一次垂着，比较谁挂得住。"
  }
  ,
  {
    id: "nature/mink.html", file: "mink.html", title: "水貂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦦", ready: true,
    description: "比较水貂和在干地上追的兽。水貂从岸上滑进水才追得到鱼。",
    task: "点两张不一样的卡，说出谁更像会滑水的水貂。"
  }  ,
  {
    id: "games/slide-lab.html", file: "slide-lab.html", title: "滑水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💦", ready: true,
    description: "同一只纸水貂。从岸上滑进水才追得到；在干地上追鱼就跑了。",
    task: "试一次滑进和一次干追，比较谁追得到。"
  }
  ,
  {
    id: "nature/guillemots.html", file: "guillemots.html", title: "海鸠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较海鸠和全黑翅膀的鸟。海鸠翅膀亮出白斑才认得出。",
    task: "点两张不一样的卡，说出谁更像有白斑的海鸠。"
  }  ,
  {
    id: "games/patch-lab.html", file: "patch-lab.html", title: "翅斑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬜", ready: true,
    description: "同一只纸海鸠。翅膀亮出白斑才认得出；全黑就认不出。",
    task: "试一次亮斑和一次全黑，比较谁认得出。"
  }
  ,
  {
    id: "nature/martens.html", file: "martens.html", title: "貂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦡", ready: true,
    description: "比较貂和只在地面跑的兽。貂沿着树干爬才够得到树上的。",
    task: "点两张不一样的卡，说出谁更像会爬树的貂。"
  }  ,
  {
    id: "games/pine-lab.html", file: "pine-lab.html", title: "爬树工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌲", ready: true,
    description: "同一只纸貂。沿着树干爬才够得到；只在地面跑就够不着。",
    task: "试一次爬树和一次跑地，比较谁够得到。"
  }
  ,
  {
    id: "nature/stoats.html", file: "stoats.html", title: "白鼬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐹", ready: true,
    description: "比较白鼬和一直棕色的兽。白鼬冬天换成白毛才在雪地里看不见。",
    task: "点两张不一样的卡，说出谁更像会换白的白鼬。"
  }  ,
  {
    id: "games/ermine-lab.html", file: "ermine-lab.html", title: "换白工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "❄️", ready: true,
    description: "同一只纸白鼬。冬天换成白毛才看不见；一直棕色一下子被看见。",
    task: "试一次换白和一次棕色，比较谁看不见。"
  }
  ,
  {
    id: "nature/civets.html", file: "civets.html", title: "灵猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐱", ready: true,
    description: "比较灵猫和什么也不留的兽。灵猫在树上留下气味才认得出路。",
    task: "点两张不一样的卡，说出谁更像会留香的灵猫。"
  }  ,
  {
    id: "games/musk-lab.html", file: "musk-lab.html", title: "留香工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧴", ready: true,
    description: "同一只纸灵猫。留下气味才认得出路；什么也不留就迷路。",
    task: "试一次留香和一次空白，比较谁认得出路。"
  }
  ,
  {
    id: "nature/fossas.html", file: "fossas.html", title: "隐臀猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐆", ready: true,
    description: "比较隐臀猫和下到地上跑的兽。隐臀猫从这棵树跳到那棵才追得到。",
    task: "点两张不一样的卡，说出谁更像会树跃的隐臀猫。"
  }  ,
  {
    id: "games/leap-lab.html", file: "leap-lab.html", title: "树跃工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌳", ready: true,
    description: "同一只纸隐臀猫。从树上跳过去才追得到；下到地上跑猎物就跑了。",
    task: "试一次树跃和一次下地，比较谁追得到。"
  }
  ,
  {
    id: "nature/genets.html", file: "genets.html", title: "獛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐱", ready: true,
    description: "比较獛和一块颜色的兽。獛身上斑点散开才在树影里看不见。",
    task: "点两张不一样的卡，说出谁更像有斑点的獛。"
  }  ,
  {
    id: "games/genet-lab.html", file: "genet-lab.html", title: "斑点工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔘", ready: true,
    description: "同一只纸獛。斑点散开才看不见；一块颜色一下子被看见。",
    task: "试一次斑点和一次一块色，比较谁看不见。"
  }
  ,
  {
    id: "nature/fishers.html", file: "fishers.html", title: "渔貂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦡", ready: true,
    description: "比较渔貂和只会往上爬的兽。渔貂头朝下爬下来才从树上下得来。",
    task: "点两张不一样的卡，说出谁更像会倒爬的渔貂。"
  }  ,
  {
    id: "games/fisher-lab.html", file: "fisher-lab.html", title: "倒爬工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬇️", ready: true,
    description: "同一只纸渔貂。头朝下爬下来才下得来；只会往上爬就卡在树上。",
    task: "试一次倒爬和一次只上，比较谁下得来。"
  }
  ,
  {
    id: "nature/binturongs.html", file: "binturongs.html", title: "熊狸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐻", ready: true,
    description: "比较熊狸和松手去够的兽。熊狸尾巴卷住再摘才够得到果子。",
    task: "点两张不一样的卡，说出谁更像会卷尾摘果的熊狸。"
  }  ,
  {
    id: "games/fruit-lab.html", file: "fruit-lab.html", title: "卷尾摘果工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍇", ready: true,
    description: "同一只纸熊狸。尾巴卷住再摘才够得到；松手去够就掉下去。",
    task: "试一次卷摘和一次松够，比较谁够得到。"
  }
  ,
  {
    id: "nature/chitons.html", file: "chitons.html", title: "石鳖观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐚", ready: true,
    description: "比较石鳖和蜗牛。石鳖用锉舌一下一下刮，才刮得下绿藻。",
    task: "点两张不一样的卡，说出谁更像会刮藻的石鳖。"
  }  ,
  {
    id: "games/radula-lab.html", file: "radula-lab.html", title: "锉舌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪥", ready: true,
    description: "同一只纸石鳖。锉舌一下一下刮才刮得下；光贴着滑藻还在。",
    task: "试一次刮藻和一次滑过，比较谁刮得下。"
  }
  ,
  {
    id: "nature/hornets.html", file: "hornets.html", title: "胡蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "比较胡蜂和只做格子的纸巢蜂。胡蜂把纸巢一层一层包起来才挡得住雨。",
    task: "点两张不一样的卡，说出谁更像会包巢的胡蜂。"
  }  ,
  {
    id: "games/envelope-lab.html", file: "envelope-lab.html", title: "纸包工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📦", ready: true,
    description: "同一只纸胡蜂。一层一层包起来才挡得住雨；巢敞着雨会漏进去。",
    task: "试一次包上和一次敞着，比较谁挡得住雨。"
  }
  ,
  {
    id: "nature/yellowjackets.html", file: "yellowjackets.html", title: "黄蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "比较黄蜂和挂在树上的蜂。黄蜂常把巢做在地下才藏得住。",
    task: "点两张不一样的卡，说出谁更像做地巢的黄蜂。"
  }  ,
  {
    id: "games/groundnest-lab.html", file: "groundnest-lab.html", title: "地巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕳️", ready: true,
    description: "同一只纸黄蜂。巢做在地下才藏得住；挂在树上一下子被看见。",
    task: "试一次地巢和一次挂树，比较谁藏得住。"
  }
  ,
  {
    id: "nature/potter-wasps.html", file: "potter-wasps.html", title: "陶蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "比较陶蜂和家燕。陶蜂把泥和成一个小罐才立得住。",
    task: "点两张不一样的卡，说出谁更像会做泥罐的陶蜂。"
  }  ,
  {
    id: "games/potter-lab.html", file: "potter-lab.html", title: "泥罐工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏺", ready: true,
    description: "同一只纸陶蜂。泥巴和成罐才立得住；泥太干就散掉。",
    task: "试一次和泥和一次干泥，比较谁立得住。"
  }
  ,
  {
    id: "nature/mason-bees.html", file: "mason-bees.html", title: "壁蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "比较壁蜂和熊蜂。壁蜂用泥把洞隔成一间一间才分得清。",
    task: "点两张不一样的卡，说出谁更像会隔间的壁蜂。"
  }  ,
  {
    id: "games/mason-lab.html", file: "mason-lab.html", title: "泥隔工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧱", ready: true,
    description: "同一只纸壁蜂。用泥把洞隔开才分得清；花粉乱堆就全糊在一起。",
    task: "试一次隔开和一次乱堆，比较谁分得清。"
  }
  ,
  {
    id: "nature/carpenter-bees.html", file: "carpenter-bees.html", title: "木蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "比较木蜂和停在表面上的蜂。木蜂在木头里钻洞巢才藏得住。",
    task: "点两张不一样的卡，说出谁更像会钻木的木蜂。"
  }  ,
  {
    id: "games/carpenter-lab.html", file: "carpenter-lab.html", title: "钻木工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪵", ready: true,
    description: "同一只纸木蜂。在木头里钻洞才藏得住；只停在表面上一下子被看见。",
    task: "试一次钻木和一次停面，比较谁藏得住。"
  }
  ,
  {
    id: "nature/leafcutter-bees.html", file: "leafcutter-bees.html", title: "切叶蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "比较切叶蜂和空巢的蜂。切叶蜂剪圆叶片垫巢卵才躺得稳。",
    task: "点两张不一样的卡，说出谁更像会垫叶的切叶蜂。"
  }  ,
  {
    id: "games/leafcut-lab.html", file: "leafcut-lab.html", title: "叶片工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍃", ready: true,
    description: "同一只纸切叶蜂。剪圆叶片垫巢才躺得稳；什么也不垫卵会滚来滚去。",
    task: "试一次垫叶和一次空巢，比较谁躺得稳。"
  }
  ,
  {
    id: "nature/bumblebees.html", file: "bumblebees.html", title: "熊蜂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐝", ready: true,
    description: "比较熊蜂和不怎么动的蜂。熊蜂翅膀振得够快身子才暖起来。",
    task: "点两张不一样的卡，说出谁更像会振暖的熊蜂。"
  }  ,
  {
    id: "games/buzz-lab.html", file: "buzz-lab.html", title: "振翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌡️", ready: true,
    description: "同一只纸熊蜂。翅膀振得够快才暖起来；不怎么动还是凉的。",
    task: "试一次快振和一次慢振，比较谁暖起来。"
  }
  ,
  {
    id: "nature/auks.html", file: "auks.html", title: "小海雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较小海雀和单独漂的鸟。小海雀挤在大群里飞才不容易被盯住。",
    task: "点两张不一样的卡，说出谁更像会群飞的小海雀。"
  }  ,
  {
    id: "games/dovekie-lab.html", file: "dovekie-lab.html", title: "群飞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸小海雀。挤在大群里才不容易被盯住；一只单独漂一下子被看见。",
    task: "试一次群飞和一次单漂，比较谁不容易被盯住。"
  }
  ,
  {
    id: "nature/damselflies.html", file: "damselflies.html", title: "豆娘观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较豆娘和蜻蜓。豆娘停下时翅膀收拢贴背才认得出。",
    task: "点两张不一样的卡，说出谁更像会收翅的豆娘。"
  }  ,
  {
    id: "games/foldwing-lab.html", file: "foldwing-lab.html", title: "收翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦋", ready: true,
    description: "同一只纸豆娘。翅膀收拢贴背才认得出；平摊着就认成蜻蜓。",
    task: "试一次收翅和一次平摊，比较谁认得出。"
  }
  ,
  {
    id: "nature/mayflies.html", file: "mayflies.html", title: "蜉蝣观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较蜉蝣和一次就完的虫。蜉蝣出水后再蜕一次翅才真正透明。",
    task: "点两张不一样的卡，说出谁更像会再蜕的蜉蝣。"
  }  ,
  {
    id: "games/dun-lab.html", file: "dun-lab.html", title: "蜕衣工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧥", ready: true,
    description: "同一只纸蜉蝣。再蜕一次才是成虫；第一次出来就算完还包着灰衣。",
    task: "试一次再蜕和一次一次完，比较谁翅透明。"
  }
  ,
  {
    id: "nature/stoneflies.html", file: "stoneflies.html", title: "石蝇观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较石蝇稚虫和蜉蝣稚虫。石蝇两根尾巴在石头上爬才认得出。",
    task: "点两张不一样的卡，说出谁更像双尾爬石的石蝇。"
  }  ,
  {
    id: "games/naiad-lab.html", file: "naiad-lab.html", title: "双尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸石蝇。两根尾巴在石头上爬才认得出；三根尾巴在水里游就认成蜉蝣。",
    task: "试一次双尾爬和一次三尾游，比较谁认得出。"
  }
  ,
  {
    id: "nature/midges.html", file: "midges.html", title: "摇蚊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较摇蚊和单独停的虫。摇蚊挤在空中一团飞才找得到同伴。",
    task: "点两张不一样的卡，说出谁更像会舞群的摇蚊。"
  }  ,
  {
    id: "games/swarm-lab.html", file: "swarm-lab.html", title: "舞群工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌀", ready: true,
    description: "同一只纸摇蚊。挤在空中一团飞才找得到同伴；一只单独停谁也看不见谁。",
    task: "试一次舞群和一次单停，比较谁找得到同伴。"
  }
  ,
  {
    id: "nature/dobsonflies.html", file: "dobsonflies.html", title: "齿蛉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较齿蛉幼虫和软嘴的幼虫。齿蛉幼虫大颚夹住才抓得住。",
    task: "点两张不一样的卡，说出谁更像大颚幼虫。"
  }  ,
  {
    id: "games/hellgram-lab.html", file: "hellgram-lab.html", title: "大颚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "钳", ready: true,
    description: "同一只纸齿蛉。幼虫大颚夹住才抓得住；嘴软软的就抓不住。",
    task: "试一次大颚和一次软嘴，比较谁抓得住。"
  }
  ,
  {
    id: "nature/scorpionflies.html", file: "scorpionflies.html", title: "蝎蛉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较蝎蛉和空手追的虫。蝎蛉先挂一份再靠近才靠得近。",
    task: "点两张不一样的卡，说出谁更像会挂礼的蝎蛉。"
  }  ,
  {
    id: "games/hangfly-lab.html", file: "hangfly-lab.html", title: "吊礼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎁", ready: true,
    description: "同一只纸蝎蛉。先挂一份再靠近才靠得近；空手追上去会被赶走。",
    task: "试一次挂礼和一次空手，比较谁靠得近。"
  }
  ,
  {
    id: "nature/ticks.html", file: "ticks.html", title: "蜱观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较蜱和跳蚤。蜱在草尖伸腿等才等得到经过的。",
    task: "点两张不一样的卡，说出谁更像会伸腿等的蜱。"
  }  ,
  {
    id: "games/quest-lab.html", file: "quest-lab.html", title: "伸腿等工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸蜱。在草尖伸腿等才等得到；在路上追追不上。",
    task: "试一次伸等和一次去追，比较谁等得到。"
  }
  ,
  {
    id: "nature/craneflies.html", file: "craneflies.html", title: "大蚊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较大蚊和蚊子。大蚊腿又细又长、停着不叮人才认得出。",
    task: "点两张不一样的卡，说出谁更像长腿的大蚊。"
  }  ,
  {
    id: "games/crane-lab.html", file: "crane-lab.html", title: "长腿工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸大蚊。腿又细又长才认得出不叮人；腿短短的去叮人就认成蚊子。",
    task: "试一次长腿和一次短叮，比较谁认得出。"
  }
  ,
  {
    id: "nature/tree-frogs.html", file: "tree-frogs.html", title: "树蛙观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较树蛙和趾头滑溜的蛙。树蛙趾垫贴住叶子才挂得住。",
    task: "点两张不一样的卡，说出谁更像有趾垫的树蛙。"
  }  ,
  {
    id: "games/toepad-lab.html", file: "toepad-lab.html", title: "趾垫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍃", ready: true,
    description: "同一只纸树蛙。趾垫贴住才挂得住；趾头滑溜溜就滑下去。",
    task: "试一次贴住和一次滑溜，比较谁挂得住。"
  }
  ,
  {
    id: "nature/poison-dart-frogs.html", file: "poison-dart-frogs.html", title: "箭毒蛙观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较箭毒蛙和绿绿藏起来的蛙。箭毒蛙颜色又亮才一眼被看见别碰。",
    task: "点两张不一样的卡，说出谁更像会警告的箭毒蛙。"
  }  ,
  {
    id: "games/warn-lab.html", file: "warn-lab.html", title: "警告色工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚠️", ready: true,
    description: "同一只纸箭毒蛙。颜色又亮才一眼被看见别碰；绿绿藏起来谁也注意不到。",
    task: "试一次亮色和一次藏绿，比较谁一眼被看见。"
  }
  ,
  {
    id: "nature/bullfrogs.html", file: "bullfrogs.html", title: "牛蛙观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较牛蛙和闭着嘴的蛙。牛蛙喉囊鼓起来叫才听得见很远。",
    task: "点两张不一样的卡，说出谁更像会鼓叫的牛蛙。"
  }  ,
  {
    id: "games/croak-lab.html", file: "croak-lab.html", title: "鼓鸣工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📣", ready: true,
    description: "同一只纸牛蛙。喉囊鼓起来才听得见很远；嘴闭着不鼓谁也听不见。",
    task: "试一次鼓叫和一次闭着，比较谁听得见。"
  }
  ,
  {
    id: "nature/toads.html", file: "toads.html", title: "蟾蜍观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较蟾蜍和皮肤光光的蛙。蟾蜍耳后鼓起两团才认得出。",
    task: "点两张不一样的卡，说出谁更像有耳后腺的蟾蜍。"
  }  ,
  {
    id: "games/parotid-lab.html", file: "parotid-lab.html", title: "耳后腺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸蟾蜍。耳后鼓起两团才认得出；皮肤光光的就认成普通蛙。",
    task: "试一次鼓腺和一次光皮，比较谁认得出。"
  }
  ,
  {
    id: "nature/salamanders.html", file: "salamanders.html", title: "蝾螈观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较蝾螈和干鳞的蜥蜴。蝾螈皮肤湿着才透得过气。",
    task: "点两张不一样的卡，说出谁更像湿皮呼吸的蝾螈。"
  }  ,
  {
    id: "games/wetskin-lab.html", file: "wetskin-lab.html", title: "湿皮工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一只纸蝾螈。皮肤湿着才透得过气；皮肤干了就透不过。",
    task: "试一次保湿和一次干掉，比较谁透得过气。"
  }
  ,
  {
    id: "nature/newts.html", file: "newts.html", title: "水螈观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较水螈和一直待在水里的。有的水螈幼年会上岸走一段再回水。",
    task: "点两张不一样的卡，说出谁更像会上岸的水螈。"
  }  ,
  {
    id: "games/eft-lab.html", file: "eft-lab.html", title: "陆幼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🚶", ready: true,
    description: "同一只纸水螈。陆上走一段再回水才认得出这段路；一直待在水里就少了一段。",
    task: "试一次上岸和一次一直水，比较谁认得出这段路。"
  }
  ,
  {
    id: "nature/caecilians.html", file: "caecilians.html", title: "蚓螈观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪱", ready: true,
    description: "比较蚓螈和蛇。蚓螈身上一环一环才认得出是两栖。",
    task: "点两张不一样的卡，说出谁更像有环纹的蚓螈。"
  }  ,
  {
    id: "games/ring-lab.html", file: "ring-lab.html", title: "环纹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⭕", ready: true,
    description: "同一只纸蚓螈。身上一环一环才认得出是两栖；光滑像蛇就认成蛇。",
    task: "试一次环纹和一次光滑，比较谁认得出。"
  }
  ,
  {
    id: "nature/tadpoles.html", file: "tadpoles.html", title: "蝌蚪观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较蝌蚪和用腿走的幼体。蝌蚪用扁尾巴摆着游才游得走。",
    task: "点两张不一样的卡，说出谁更像会摆尾的蝌蚪。"
  }  ,
  {
    id: "games/tail-lab.html", file: "tail-lab.html", title: "摆尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸蝌蚪。用尾巴摆着游才游得走；用腿走会沉在水底。",
    task: "试一次摆尾和一次用腿，比较谁游得走。"
  }
  ,
  {
    id: "nature/barnacles.html", file: "barnacles.html", title: "藤壶观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐚", ready: true,
    description: "比较藤壶和被浪冲走的。藤壶把头上的胶水涂在石头上才待得住。",
    task: "点两张不一样的卡，说出谁更像把头胶住的藤壶。"
  }  ,
  {
    id: "games/cement-lab.html", file: "cement-lab.html", title: "胶头工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧴", ready: true,
    description: "同一只纸藤壶。把头胶住才待得住；没胶住就被浪冲走。",
    task: "试一次胶住和一次没胶，比较谁待得住。"
  }
  ,
  {
    id: "nature/hammerheads.html", file: "hammerheads.html", title: "双髻鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较双髻鲨和眼睛挤在一起的鲨。双髻鲨头横着眼睛分开才两边都看得见。",
    task: "点两张不一样的卡，说出谁更像横头的双髻鲨。"
  }  ,
  {
    id: "games/hammer-lab.html", file: "hammer-lab.html", title: "横头工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔨", ready: true,
    description: "同一只纸双髻鲨。头横着眼睛分开才两边都看得见；挤在一起有一边看不见。",
    task: "试一次横头和一次挤眼，比较谁两边都看得见。"
  }
  ,
  {
    id: "nature/threshers.html", file: "threshers.html", title: "长尾鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较长尾鲨和用鼻子撞的鲨。长尾鲨那根长尾巴甩一下才打晕小鱼。",
    task: "点两张不一样的卡，说出谁更像会甩尾的长尾鲨。"
  }  ,
  {
    id: "games/thresh-lab.html", file: "thresh-lab.html", title: "甩尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "➰", ready: true,
    description: "同一只纸长尾鲨。长尾巴甩一下才打得着；用鼻子去撞会撞空。",
    task: "试一次甩尾和一次撞鼻，比较谁打得着。"
  }
  ,
  {
    id: "nature/whale-sharks.html", file: "whale-sharks.html", title: "鲸鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较鲸鲨和去追一条的鲨。鲸鲨嘴张着往前游才滤到小虾。",
    task: "点两张不一样的卡，说出谁更像会张嘴游的鲸鲨。"
  }  ,
  {
    id: "games/ramfeed-lab.html", file: "ramfeed-lab.html", title: "张嘴游工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍽️", ready: true,
    description: "同一只纸鲸鲨。嘴张着往前游才滤得到；闭嘴去追一条也追不上。",
    task: "试一次张游和一次闭追，比较谁滤得到。"
  }
  ,
  {
    id: "nature/basking-sharks.html", file: "basking-sharks.html", title: "姥鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较姥鲨和潜到深处闭嘴的鲨。姥鲨在水面把嘴张圆才滤到浮游。",
    task: "点两张不一样的卡，说出谁更像水面张嘴的姥鲨。"
  }  ,
  {
    id: "games/bask-lab.html", file: "bask-lab.html", title: "水面张工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⭕", ready: true,
    description: "同一只纸姥鲨。在水面把嘴张圆才滤得到；潜到深处闭嘴就滤不到。",
    task: "试一次水面张和一次深闭，比较谁滤得到。"
  }
  ,
  {
    id: "nature/megamouths.html", file: "megamouths.html", title: "巨口鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较巨口鲨和嘴里黑着的鲨。巨口鲨嘴里亮着小鱼才自己游进来。",
    task: "点两张不一样的卡，说出谁更像嘴里会亮的巨口鲨。"
  }  ,
  {
    id: "games/lamp-lab.html", file: "lamp-lab.html", title: "口灯工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💡", ready: true,
    description: "同一只纸巨口鲨。嘴里亮着才引得来；嘴里黑着什么也不来。",
    task: "试一次口灯和一次口黑，比较谁引得来。"
  }
  ,
  {
    id: "nature/cookiecutters.html", file: "cookiecutters.html", title: "饼干鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较饼干鲨和在表面舔的鲨。饼干鲨吸住转一圈才咬下一小块。",
    task: "点两张不一样的卡，说出谁更像会圆咬的饼干鲨。"
  }  ,
  {
    id: "games/cookie-lab.html", file: "cookie-lab.html", title: "圆咬工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍪", ready: true,
    description: "同一只纸饼干鲨。吸住转一圈才咬得下；在表面舔舔不到。",
    task: "试一次转咬和一次轻舔，比较谁咬得下。"
  }
  ,
  {
    id: "nature/wobbegongs.html", file: "wobbegongs.html", title: "须鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较须鲨和在空沙上游的鲨。须鲨贴在石头上不动才藏得住。",
    task: "点两张不一样的卡，说出谁更像地毯一样的须鲨。"
  }  ,
  {
    id: "games/carpet-lab.html", file: "carpet-lab.html", title: "地毯工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸须鲨。贴在石头上不动才藏得住；在空沙上游一下子被看见。",
    task: "试一次贴藏和一次空游，比较谁藏得住。"
  }
  ,
  {
    id: "nature/nurse-sharks.html", file: "nurse-sharks.html", title: "护士鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较护士鲨和去追着咬的鲨。护士鲨嘴一吸才吸得到洞里的。",
    task: "点两张不一样的卡，说出谁更像会吸的护士鲨。"
  }  ,
  {
    id: "games/slurp-lab.html", file: "slurp-lab.html", title: "吸一口工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥤", ready: true,
    description: "同一只纸护士鲨。嘴一吸才吸得到；去追着咬追不上。",
    task: "试一次吸和一次追咬，比较谁吸得到。"
  }
  ,
  {
    id: "nature/electric-eels.html", file: "electric-eels.html", title: "电鳗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "⚡", ready: true,
    description: "比较电鳗和直接去咬的鳗。电鳗先放电再靠近对方才先软了。",
    task: "点两张不一样的卡，说出谁更像会放电的电鳗。"
  }  ,
  {
    id: "games/volt-lab.html", file: "volt-lab.html", title: "放电工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔋", ready: true,
    description: "同一只纸电鳗。先放电再靠近才用得上；直接去咬自己会被撞开。",
    task: "试一次放电和一次去咬，比较谁用得上。"
  }
  ,
  {
    id: "nature/garden-eels.html", file: "garden-eels.html", title: "花园鳗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "eel", ready: true,
    description: "比较花园鳗和整条游出去的鳗。花园鳗半截身子伸出沙才捞得到漂过的。",
    task: "点两张不一样的卡，说出谁更像花园鳗。"
  }  ,
  {
    id: "games/garden-lab.html", file: "garden-lab.html", title: "沙田工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌱", ready: true,
    description: "同一只纸花园鳗。半截身子伸出沙才捞得到；整条游出去追洞就丢了。",
    task: "试一次伸沙和一次游追，比较谁捞得到。"
  }
  ,
  {
    id: "nature/wolf-eels.html", file: "wolf-eels.html", title: "狼鳗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐍", ready: true,
    description: "比较狼鳗和软牙的鳗。狼鳗牙够硬才咬得开壳。",
    task: "点两张不一样的卡，说出谁更像硬牙的狼鳗。"
  }  ,
  {
    id: "games/bitebone-lab.html", file: "bitebone-lab.html", title: "咬壳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸狼鳗。牙够硬才咬得开；牙软软的就咬不动。",
    task: "试一次硬牙和一次软牙，比较谁咬得开。"
  }
  ,
  {
    id: "nature/ribbon-eels.html", file: "ribbon-eels.html", title: "丝带鳗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐍", ready: true,
    description: "比较丝带鳗和鼻瓣收着的鳗。丝带鳗鼻瓣张开才看得见信号。",
    task: "点两张不一样的卡，说出谁更像张鼻瓣的丝带鳗。"
  }  ,
  {
    id: "games/flare-lab.html", file: "flare-lab.html", title: "鼻瓣工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎀", ready: true,
    description: "同一只纸丝带鳗。鼻瓣张开才看得见；收着就认不出。",
    task: "试一次张开和一次收着，比较谁看得见。"
  }
  ,
  {
    id: "nature/conger-eels.html", file: "conger-eels.html", title: "康吉鳗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐍", ready: true,
    description: "比较康吉鳗和白天游的鳗。康吉鳗夜里出来才找得到吃的。",
    task: "点两张不一样的卡，说出谁更像夜出的康吉鳗。"
  }  ,
  {
    id: "games/night-lab.html", file: "night-lab.html", title: "夜出工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌙", ready: true,
    description: "同一只纸康吉鳗。夜里出来才找得到；大白天游自己被看见。",
    task: "试一次夜出和一次日出，比较谁找得到。"
  }
  ,
  {
    id: "nature/hagfish.html", file: "hagfish.html", title: "盲鳗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "eel", ready: true,
    description: "比较盲鳗和身上干着的鳗。盲鳗黏液挤出来才滑得抓不住。",
    task: "点两张不一样的卡，说出谁更像会挤黏液的盲鳗。"
  }  ,
  {
    id: "games/slimeknot-lab.html", file: "slimeknot-lab.html", title: "黏液工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫧", ready: true,
    description: "同一只纸盲鳗。黏液挤出来才滑得掉；身上干着会被抓住。",
    task: "试一次挤黏和一次干燥，比较谁滑得掉。"
  }
  ,
  {
    id: "nature/lampreys.html", file: "lampreys.html", title: "七鳃鳗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "eel", ready: true,
    description: "比较七鳃鳗和用牙咬一口的鱼。七鳃鳗圆嘴吸住再锉才吸得住。",
    task: "点两张不一样的卡，说出谁更像圆嘴的七鳃鳗。"
  }  ,
  {
    id: "games/rasphole-lab.html", file: "rasphole-lab.html", title: "圆嘴工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⭕", ready: true,
    description: "同一只纸七鳃鳗。圆嘴吸住再锉才吸得住；用牙去咬一口会咬滑。",
    task: "试一次吸锉和一次咬一口，比较谁吸得住。"
  }
  ,
  {
    id: "nature/sturgeons.html", file: "sturgeons.html", title: "鲟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较鲟和用眼睛看的鱼。鲟把须伸进泥里探才探得到底栖。",
    task: "点两张不一样的卡，说出谁更像会须探的鲟。"
  }  ,
  {
    id: "games/barbel-lab.html", file: "barbel-lab.html", title: "须探工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸鲟。须在泥里探才探得到；用眼睛看看不见。",
    task: "试一次须探和一次眼看，比较谁探得到。"
  }
  ,
  {
    id: "nature/crocodiles.html", file: "crocodiles.html", title: "鳄观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐊", ready: true,
    description: "比较鳄和阀开着灌水的。鳄把喉咙门口那一层皮关上，张着嘴也能喘气。",
    task: "点两张不一样的卡，说出谁更像会关阀的鳄。"
  }  ,
  {
    id: "games/valve-lab.html", file: "valve-lab.html", title: "口阀工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🚪", ready: true,
    description: "同一条纸鳄。口盖阀关上才喘得上；阀开着水就灌进喉咙。",
    task: "试一次关上和一次灌水，比较谁喘得上。"
  }
  ,
  {
    id: "nature/boxfish.html", file: "boxfish.html", title: "箱鲀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "📦", ready: true,
    description: "比较箱鲀和软软的鱼。箱鲀身子像硬盒子才咬不动。",
    task: "点两张不一样的卡，说出谁更像硬盒的箱鲀。"
  }  ,
  {
    id: "games/rigidbox-lab.html", file: "rigidbox-lab.html", title: "硬盒工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📦", ready: true,
    description: "同一只纸箱鲀。身子像硬盒子才咬不动；软软的就一下就被咬扁。",
    task: "试一次硬盒和一次软身，比较谁咬不动。"
  }
  ,
  {
    id: "nature/jawfish.html", file: "jawfish.html", title: "颌鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较颌鱼和把蛋吐出来的。颌鱼把蛋含在嘴里才守得住。",
    task: "点两张不一样的卡，说出谁更像会含蛋的颌鱼。"
  }  ,
  {
    id: "games/mouthhold-lab.html", file: "mouthhold-lab.html", title: "含蛋工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥚", ready: true,
    description: "同一只纸颌鱼。蛋含在嘴里才守得住；吐出来就丢了。",
    task: "试一次含着和一次吐出，比较谁守得住。"
  }
  ,
  {
    id: "nature/clownfish.html", file: "clownfish.html", title: "小丑鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐠", ready: true,
    description: "比较小丑鱼和没有黏液的鱼。小丑鱼身上有一层黏液才进得了海葵。",
    task: "点两张不一样的卡，说出谁更像进得了海葵的小丑鱼。"
  }  ,
  {
    id: "games/host-lab.html", file: "host-lab.html", title: "共生工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌸", ready: true,
    description: "同一只纸小丑鱼。身上有一层黏液才进得了海葵；没有黏液会被蜇。",
    task: "试一次有黏和一次没黏，比较谁进得了。"
  }
  ,
  {
    id: "nature/electric-rays.html", file: "electric-rays.html", title: "电鳐观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较电鳐和去咬一口的鱼。电鳐圆盘里放电才先软了对方。",
    task: "点两张不一样的卡，说出谁更像会放电的电鳐。"
  }  ,
  {
    id: "games/discstun-lab.html", file: "discstun-lab.html", title: "圆盘放电工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚡", ready: true,
    description: "同一只纸电鳐。圆盘里放电才先软了对方；去咬一口自己被撞开。",
    task: "试一次放电和一次去咬，比较谁用得上。"
  }
  ,
  {
    id: "nature/honey-badgers.html", file: "honey-badgers.html", title: "蜜獾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦡", ready: true,
    description: "比较蜜獾和皮紧的獾。蜜獾皮厚又松才蜇不进。",
    task: "点两张不一样的卡，说出谁更像皮松的蜜獾。"
  }  ,
  {
    id: "games/raider-lab.html", file: "raider-lab.html", title: "厚皮工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍯", ready: true,
    description: "同一只纸蜜獾。皮厚又松才蜇不进；皮紧就蜇进。",
    task: "试一次松皮和一次紧皮，比较谁蜇不进。"
  }
  ,
  {
    id: "nature/skates.html", file: "skates.html", title: "鳐观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较鳐和散着产的鱼。鳐把角质蛋袋埋在沙里才守得住。",
    task: "点两张不一样的卡，说出谁更像会埋蛋袋的鳐。"
  }  ,
  {
    id: "games/mermaid-lab.html", file: "mermaid-lab.html", title: "钱袋工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👛", ready: true,
    description: "同一只纸鳐。把蛋袋埋进沙里才守得住；散着产就冲走。",
    task: "试一次埋袋和一次散产，比较谁守得住。"
  }
  ,
  {
    id: "nature/lionfish.html", file: "lionfish.html", title: "狮子鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较狮子鱼和鳍收着的鱼。狮子鱼胸鳍张开像扇子才看得见警告。",
    task: "点两张不一样的卡，说出谁更像张扇鳍的狮子鱼。"
  }  ,
  {
    id: "games/lionfan-lab.html", file: "lionfan-lab.html", title: "扇鳍工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪭", ready: true,
    description: "同一只纸狮子鱼。胸鳍张开像扇子才看得见；收着就认不出。",
    task: "试一次张开和一次收着，比较谁看得见。"
  }
  ,
  {
    id: "nature/red-pandas.html", file: "red-pandas.html", title: "小熊猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐼", ready: true,
    description: "比较小熊猫和没有假拇指的动物。小熊猫前爪内侧的假拇指才抓得住竹子。",
    task: "点两张不一样的卡，说出谁更像会抓竹子的小熊猫。"
  }  ,
  {
    id: "games/facewash-lab.html", file: "facewash-lab.html", title: "假拇指工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎋", ready: true,
    description: "同一只纸小熊猫。前爪内侧的假拇指才抓得住；没有就滑掉。",
    task: "试一次假拇指和一次没有，比较谁抓得住。"
  }
  ,
  {
    id: "nature/tarsiers.html", file: "tarsiers.html", title: "眼镜猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐒", ready: true,
    description: "比较眼镜猴和小眼睛的猴。眼镜猴眼睛特别大才看得见夜里的虫。",
    task: "点两张不一样的卡，说出谁更像大眼睛的眼镜猴。"
  }  ,
  {
    id: "games/hugeeye-lab.html", file: "hugeeye-lab.html", title: "大眼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👀", ready: true,
    description: "同一只纸眼镜猴。眼睛特别大才看得见；小眼睛就看不见。",
    task: "试一次大眼和一次小眼，比较谁看得见。"
  }
  ,
  {
    id: "nature/dugongs.html", file: "dugongs.html", title: "儒艮观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐋", ready: true,
    description: "比较儒艮和嘴唇上翻的海牛。儒艮嘴唇下翻才拔得起海草。",
    task: "点两张不一样的卡，说出谁更像会拔草的儒艮。"
  }  ,
  {
    id: "games/graze-lab.html", file: "graze-lab.html", title: "拔草工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸儒艮。嘴唇下翻才拔得起；上翻就拔不起。",
    task: "试一次下翻和一次上翻，比较谁拔得起。"
  }
  ,
  {
    id: "nature/belugas.html", file: "belugas.html", title: "白鲸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐋", ready: true,
    description: "比较白鲸和额头硬着的鲸。白鲸额头那团瓜先变形才发出不同的声。",
    task: "点两张不一样的卡，说出谁更像会变形额瓜的白鲸。"
  }  ,
  {
    id: "games/melon-lab.html", file: "melon-lab.html", title: "额瓜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍈", ready: true,
    description: "同一只纸白鲸。额头那团瓜先变形才发出不同的声；硬着就一种声。",
    task: "试一次变形和一次硬着，比较谁发出不同的声。"
  }
  ,
  {
    id: "nature/dung-beetles.html", file: "dung-beetles.html", title: "蜣螂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较蜣螂和抱着搬的甲虫。蜣螂把粪球推着走才滚得回洞。",
    task: "点两张不一样的卡，说出谁更像会滚球的蜣螂。"
  }  ,
  {
    id: "games/dungball-lab.html", file: "dungball-lab.html", title: "滚球工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🟤", ready: true,
    description: "同一只纸蜣螂。球推着走才滚得回洞；抱着搬就搬不动。",
    task: "试一次推滚和一次抱搬，比较谁滚得回。"
  }
  ,
  {
    id: "nature/sailfish.html", file: "sailfish.html", title: "旗鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较旗鱼和背鳍收着的鱼。旗鱼背鳍竖起来像旗才围得住小鱼。",
    task: "点两张不一样的卡，说出谁更像竖帆的旗鱼。"
  }  ,
  {
    id: "games/dorsail-lab.html", file: "dorsail-lab.html", title: "竖帆工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎏", ready: true,
    description: "同一只纸旗鱼。背鳍竖起来像旗才围得住；收着就散了。",
    task: "试一次竖帆和一次收帆，比较谁围得住。"
  }
  ,
  {
    id: "nature/stonefish.html", file: "stonefish.html", title: "石鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较石鱼和游起来的鱼。石鱼坐在石头上不动才藏得住。",
    task: "点两张不一样的卡，说出谁更像坐等的石鱼。"
  }  ,
  {
    id: "games/sitwait-lab.html", file: "sitwait-lab.html", title: "坐等工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸石鱼。坐在石头上不动才藏得住；游起来一下子被看见。",
    task: "试一次坐等和一次游走，比较谁藏得住。"
  }
  ,
  {
    id: "nature/paddlefish.html", file: "paddlefish.html", title: "匙吻鲟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较匙吻鲟和用眼睛找的鱼。匙吻鲟把扁平长吻伸进浑水里滤才滤得到浮游。",
    task: "点两张不一样的卡，说出谁更像会吻滤的匙吻鲟。"
  }  ,
  {
    id: "games/paddle-lab.html", file: "paddle-lab.html", title: "匙吻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥄", ready: true,
    description: "同一只纸匙吻鲟。长吻伸进浑水里滤才滤得到；用眼睛去找看不见。",
    task: "试一次吻滤和一次眼找，比较谁滤得到。"
  }
  ,
  {
    id: "nature/guitarfish.html", file: "guitarfish.html", title: "吉他鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较吉他鱼和立起来游的鱼。吉他鱼身子平贴沙才碾得开壳。",
    task: "点两张不一样的卡，说出谁更像平贴沙的吉他鱼。"
  }  ,
  {
    id: "games/guitar-lab.html", file: "guitar-lab.html", title: "平躺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎸", ready: true,
    description: "同一只纸吉他鱼。身子平贴沙才碾得开；立起来游就碾不到。",
    task: "试一次平贴和一次立游，比较谁碾得开。"
  }
  ,
  {
    id: "nature/angel-sharks.html", file: "angel-sharks.html", title: "扁鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较扁鲨和在水里追的鲨。扁鲨埋进沙里再弹才咬得到经过的。",
    task: "点两张不一样的卡，说出谁更像会埋沙的扁鲨。"
  }  ,
  {
    id: "games/sandflat-lab.html", file: "sandflat-lab.html", title: "埋沙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏖️", ready: true,
    description: "同一只纸扁鲨。埋进沙里再弹才咬得到；在水里追追不上。",
    task: "试一次埋弹和一次去追，比较谁咬得到。"
  }
  ,
  {
    id: "nature/stingrays.html", file: "stingrays.html", title: "魟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较魟和用嘴去咬的鱼。魟尾巴上的刺竖着对方才先让开。",
    task: "点两张不一样的卡，说出谁更像有尾刺的魟。"
  }  ,
  {
    id: "games/stingtail-lab.html", file: "stingtail-lab.html", title: "尾刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📍", ready: true,
    description: "同一只纸魟。尾巴上的刺竖着才让开；用嘴去咬咬不着。",
    task: "试一次竖刺和一次去咬，比较谁让开。"
  }
  ,
  {
    id: "nature/manta-rays.html", file: "manta-rays.html", title: "蝠鲼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较蝠鲼和直着张嘴冲的鱼。蝠鲼翻一个跟头滤才滤到一圈的。",
    task: "点两张不一样的卡，说出谁更像会翻滚的蝠鲼。"
  }  ,
  {
    id: "games/barrel-lab.html", file: "barrel-lab.html", title: "翻滚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔄", ready: true,
    description: "同一只纸蝠鲼。翻一个跟头滤才滤到一圈；直着张嘴冲只滤到一条线。",
    task: "试一次翻滚和一次直冲，比较谁滤到一圈。"
  }
  ,
  {
    id: "nature/flounders.html", file: "flounders.html", title: "比目鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较比目鱼和一边一只眼睛的鱼。比目鱼两只眼睛搬到同一边躺着也看得见。",
    task: "点两张不一样的卡，说出谁更像会搬眼的比目鱼。"
  }  ,
  {
    id: "games/eyewalk-lab.html", file: "eyewalk-lab.html", title: "搬眼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👀", ready: true,
    description: "同一只纸比目鱼。两只眼睛搬到同一边才看得见；一边一只就有一边埋住。",
    task: "试一次搬眼和一次分边，比较谁看得见。"
  }
  ,
  {
    id: "nature/flying-fish.html", file: "flying-fish.html", title: "飞鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较飞鱼和原地往上跳的鱼。飞鱼先在水面拍着跑才滑得起来。",
    task: "点两张不一样的卡，说出谁更像会助跑的飞鱼。"
  }  ,
  {
    id: "games/taxi-lab.html", file: "taxi-lab.html", title: "助跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🛫", ready: true,
    description: "同一只纸飞鱼。先在水面拍着跑才滑得起来；原地往上跳会掉回水里。",
    task: "试一次助跑和一次原地跳，比较谁滑得起来。"
  }
  ,
  {
    id: "nature/oarfish.html", file: "oarfish.html", title: "皇带鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较皇带鱼和横着游的鱼。皇带鱼身子竖着挂才省力待在那一层。",
    task: "点两张不一样的卡，说出谁更像竖着挂的皇带鱼。"
  }  ,
  {
    id: "games/hangvert-lab.html", file: "hangvert-lab.html", title: "竖挂工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎏", ready: true,
    description: "同一只纸皇带鱼。身子竖着挂才省力；横着游自己往下掉。",
    task: "试一次竖挂和一次横游，比较谁省力。"
  }
  ,
  {
    id: "nature/blobfish.html", file: "blobfish.html", title: "水滴鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较水滴鱼和拿到水面的鱼。水滴鱼在深水压着才有形。",
    task: "点两张不一样的卡，说出谁更像深水里的水滴鱼。"
  }  ,
  {
    id: "games/jellybone-lab.html", file: "jellybone-lab.html", title: "水压工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫧", ready: true,
    description: "同一只纸水滴鱼。深水压着才有形；拿到水面就塌成一摊。",
    task: "试一次深压和一次上浮，比较谁有形。"
  }
  ,
  {
    id: "nature/viperfish.html", file: "viperfish.html", title: "蝰鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较蝰鱼和牙短短的鱼。蝰鱼牙太长合不上才咬得住大的。",
    task: "点两张不一样的卡，说出谁更像长牙的蝰鱼。"
  }  ,
  {
    id: "games/fanggap-lab.html", file: "fanggap-lab.html", title: "长牙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸蝰鱼。牙太长合不上才咬得住；牙短短的会滑掉。",
    task: "试一次长牙和一次短牙，比较谁咬得住。"
  }
  ,
  {
    id: "nature/hatchetfish.html", file: "hatchetfish.html", title: "斧头鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较斧头鱼和背朝上发亮的鱼。斧头鱼肚子朝上发亮从下面才看不见。",
    task: "点两张不一样的卡，说出谁更像腹镜的斧头鱼。"
  }  ,
  {
    id: "games/uplook-lab.html", file: "uplook-lab.html", title: "腹镜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪞", ready: true,
    description: "同一只纸斧头鱼。肚子朝上发亮才看不见；背朝上发亮自己被看见。",
    task: "试一次腹亮和一次背亮，比较谁看不见。"
  }
  ,
  {
    id: "nature/flashlight-fish.html", file: "flashlight-fish.html", title: "闪光鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较闪光鱼和灯盖上的鱼。闪光鱼眼下那盏灯亮着才找得到伴。",
    task: "点两张不一样的卡，说出谁更像会开眼灯的闪光鱼。"
  }  ,
  {
    id: "games/blink-lab.html", file: "blink-lab.html", title: "眼灯工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔦", ready: true,
    description: "同一只纸闪光鱼。眼下那盏灯亮着才找得到；灯盖上对面看不见。",
    task: "试一次开灯和一次盖灯，比较谁找得到。"
  }
  ,
  {
    id: "nature/pearlfish.html", file: "pearlfish.html", title: "珍珠鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较珍珠鱼和头先钻的鱼。珍珠鱼尾巴先钻进海参才藏得进去。",
    task: "点两张不一样的卡，说出谁更像会钻海参的珍珠鱼。"
  }  ,
  {
    id: "games/cucumber-lab.html", file: "cucumber-lab.html", title: "钻参工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥒", ready: true,
    description: "同一只纸珍珠鱼。尾巴先钻进海参才藏得进；头先钻会卡住。",
    task: "试一次尾钻和一次头钻，比较谁藏得进。"
  }
  ,
  {
    id: "nature/shrimpfish.html", file: "shrimpfish.html", title: "虾鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较虾鱼和头朝上游的鱼。虾鱼头朝下站在海草里才藏得住。",
    task: "点两张不一样的卡，说出谁更像倒立的虾鱼。"
  }  ,
  {
    id: "games/headstand-lab.html", file: "headstand-lab.html", title: "倒立工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🙃", ready: true,
    description: "同一只纸虾鱼。头朝下站在海草里才藏得住；头朝上游一下子被看见。",
    task: "试一次倒立和一次正游，比较谁藏得住。"
  }
  ,
  {
    id: "nature/trumpetfish.html", file: "trumpetfish.html", title: "喇叭鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较喇叭鱼和横着游开的鱼。喇叭鱼身子贴着海鞭竖着才藏得住。",
    task: "点两张不一样的卡，说出谁更像竖着藏的喇叭鱼。"
  }  ,
  {
    id: "games/hangstill-lab.html", file: "hangstill-lab.html", title: "竖藏工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎺", ready: true,
    description: "同一只纸喇叭鱼。身子贴着海鞭竖着才藏得住；横着游开自己被看见。",
    task: "试一次竖贴和一次横游，比较谁藏得住。"
  }
  ,
  {
    id: "nature/leaf-fish.html", file: "leaf-fish.html", title: "叶鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较叶鱼和正着游的鱼。叶鱼身子侧着像一片落叶才漂到跟前。",
    task: "点两张不一样的卡，说出谁更像落叶的叶鱼。"
  }  ,
  {
    id: "games/leaflure-lab.html", file: "leaflure-lab.html", title: "漂叶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍃", ready: true,
    description: "同一只纸叶鱼。身子侧着像一片落叶才漂到跟前；正着游一下子被看见。",
    task: "试一次侧漂和一次正游，比较谁漂到跟前。"
  }
  ,
  {
    id: "nature/koalas.html", file: "koalas.html", title: "考拉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐨", ready: true,
    description: "比较考拉和盲肠短的动物。考拉盲肠很长才消化得了桉叶。",
    task: "点两张不一样的卡，说出谁更像会长盲肠的考拉。"
  }  ,
  {
    id: "games/poucheuc-lab.html", file: "poucheuc-lab.html", title: "长盲肠工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸考拉。盲肠很长才消化得了；短了就消化不了。",
    task: "试一次长肠和一次短肠，比较谁消化得了。"
  }
  ,
  {
    id: "nature/lemurs.html", file: "lemurs.html", title: "狐猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐒", ready: true,
    description: "比较狐猴和背对着太阳的猴。狐猴把肚皮对着太阳才暖得快。",
    task: "点两张不一样的卡，说出谁更像晒肚的狐猴。"
  }  ,
  {
    id: "games/sunbath-lab.html", file: "sunbath-lab.html", title: "晒肚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "☀️", ready: true,
    description: "同一只纸狐猴。肚皮对着太阳才暖得快；背对着就暖得慢。",
    task: "试一次晒肚和一次晒背，比较谁暖得快。"
  }
  ,
  {
    id: "nature/lantern-sharks.html", file: "lantern-sharks.html", title: "灯笼鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较灯笼鲨和肚子黑着的鲨。灯笼鲨肚子上的小灯亮着才引得来小虾。",
    task: "点两张不一样的卡，说出谁更像腹灯的灯笼鲨。"
  }  ,
  {
    id: "games/glowdot-lab.html", file: "glowdot-lab.html", title: "腹灯工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💡", ready: true,
    description: "同一只纸灯笼鲨。肚子上的小灯亮着才引得来；黑着什么也不来。",
    task: "试一次腹灯和一次腹黑，比较谁引得来。"
  }
  ,
  {
    id: "nature/catsharks.html", file: "catsharks.html", title: "猫鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较猫鲨和散着产的鲨。猫鲨把蛋袋绑在海藻上才冲不走。",
    task: "点两张不一样的卡，说出谁更像会绑袋的猫鲨。"
  }  ,
  {
    id: "games/weedpurse-lab.html", file: "weedpurse-lab.html", title: "绑袋工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸猫鲨。蛋袋绑在海藻上才冲不走；散着产就冲走。",
    task: "试一次绑藻和一次散产，比较谁冲不走。"
  }
  ,
  {
    id: "nature/sea-lions.html", file: "sea-lions.html", title: "海狮观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦭", ready: true,
    description: "比较海狮和后脚直着的海豹。海狮后脚能转到下面才走得了岸。",
    task: "点两张不一样的卡，说出谁更像会转脚的海狮。"
  }  ,
  {
    id: "games/walkfin-lab.html", file: "walkfin-lab.html", title: "转脚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🚶", ready: true,
    description: "同一只纸海狮。后脚能转到下面才走得了岸；直着就只能爬。",
    task: "试一次转脚和一次直脚，比较谁走得了。"
  }
  ,
  {
    id: "nature/barreleyes.html", file: "barreleyes.html", title: "管眼鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较管眼鱼和眼睛朝前的鱼。管眼鱼管子眼朝上才看得见头上的影子。",
    task: "点两张不一样的卡，说出谁更像管眼朝上的鱼。"
  }  ,
  {
    id: "games/tubeeye-lab.html", file: "tubeeye-lab.html", title: "管眼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔭", ready: true,
    description: "同一只纸管眼鱼。管子眼朝上才看得见；朝前就看不见。",
    task: "试一次朝上和一次朝前，比较谁看得见。"
  }
  ,
  {
    id: "nature/gulper-eels.html", file: "gulper-eels.html", title: "袋口鳗观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较袋口鳗和嘴小小的鱼。袋口鳗嘴张成一个大袋子才装得下比自己大的。",
    task: "点两张不一样的卡，说出谁更像袋嘴的袋口鳗。"
  }  ,
  {
    id: "games/bagmouth-lab.html", file: "bagmouth-lab.html", title: "袋嘴工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👜", ready: true,
    description: "同一只纸袋口鳗。嘴张成一个大袋子才装得下；嘴小小的装不下。",
    task: "试一次袋嘴和一次小嘴，比较谁装得下。"
  }
  ,
  {
    id: "nature/dragonfish.html", file: "dragonfish.html", title: "龙鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较龙鱼和须黑着的鱼。龙鱼下巴那根须亮着小鱼才自己游过来。",
    task: "点两张不一样的卡，说出谁更像须灯的龙鱼。"
  }  ,
  {
    id: "games/barbelglow-lab.html", file: "barbelglow-lab.html", title: "须灯工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💡", ready: true,
    description: "同一只纸龙鱼。下巴那根须亮着才引得来；须黑着什么也不来。",
    task: "试一次须亮和一次须黑，比较谁引得来。"
  }
  ,
  {
    id: "nature/pinecone-fish.html", file: "pinecone-fish.html", title: "松球鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较松球鱼和皮软软的鱼。松球鱼身上一块块硬甲才咬不进。",
    task: "点两张不一样的卡，说出谁更像有甲片的松球鱼。"
  }  ,
  {
    id: "games/armorplate-lab.html", file: "armorplate-lab.html", title: "甲片工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🛡️", ready: true,
    description: "同一只纸松球鱼。身上一块块硬甲才咬不进；皮软软的一下被咬穿。",
    task: "试一次硬甲和一次软皮，比较谁咬不进。"
  }
  ,
  {
    id: "nature/rabbitfish.html", file: "rabbitfish.html", title: "兔子鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较兔子鱼和背棘倒着的鱼。兔子鱼背棘竖着对方才先让开。",
    task: "点两张不一样的卡，说出谁更像竖棘的兔子鱼。"
  }  ,
  {
    id: "games/venomspine-lab.html", file: "venomspine-lab.html", title: "毒棘工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌵", ready: true,
    description: "同一只纸兔子鱼。背棘竖着才让开；倒着自己被咬。",
    task: "试一次竖棘和一次倒棘，比较谁让开。"
  }
  ,
  {
    id: "nature/ratfish.html", file: "ratfish.html", title: "银鲛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较银鲛和用尖牙咬的鱼。银鲛牙板磨着才磨得开壳。",
    task: "点两张不一样的卡，说出谁更像会磨板的银鲛。"
  }  ,
  {
    id: "games/grindplate-lab.html", file: "grindplate-lab.html", title: "磨板工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸银鲛。牙板磨着才磨得开；尖牙去咬咬不动。",
    task: "试一次磨板和一次尖咬，比较谁磨得开。"
  }
  ,
  {
    id: "nature/greenland-sharks.html", file: "greenland-sharks.html", title: "格陵兰鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较格陵兰鲨和游得很快的鲨。格陵兰鲨游得很慢才在冷水里待得住。",
    task: "点两张不一样的卡，说出谁更像会慢游的格陵兰鲨。"
  }  ,
  {
    id: "games/coldslow-lab.html", file: "coldslow-lab.html", title: "慢冷工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧊", ready: true,
    description: "同一只纸格陵兰鲨。游得很慢才待得住；游得很快自己先累垮。",
    task: "试一次慢游和一次快游，比较谁待得住。"
  }
  ,
  {
    id: "nature/batfishes.html", file: "batfishes.html", title: "蝙蝠鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较蝙蝠鱼和用尾巴摆着游的鱼。蝙蝠鱼胸鳍当胳膊走才在沙上走得动。",
    task: "点两张不一样的卡，说出谁更像会臂走的蝙蝠鱼。"
  }  ,
  {
    id: "games/armwalk-lab.html", file: "armwalk-lab.html", title: "臂走工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦾", ready: true,
    description: "同一只纸蝙蝠鱼。胸鳍当胳膊走才走得动；用尾巴摆着游滑来滑去走不了。",
    task: "试一次臂走和一次摆尾，比较谁走得动。"
  }
  ,
  {
    id: "nature/snailfish.html", file: "snailfish.html", title: "黏鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较黏鱼和身子硬邦邦的鱼。黏鱼身子软得像冻才挤得进石缝。",
    task: "点两张不一样的卡，说出谁更像软身子的黏鱼。"
  }  ,
  {
    id: "games/gelbody-lab.html", file: "gelbody-lab.html", title: "软身工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍮", ready: true,
    description: "同一只纸黏鱼。身子软得像冻才挤得进；硬邦邦挤不进。",
    task: "试一次软身和一次硬身，比较谁挤得进。"
  }
  ,
  {
    id: "nature/orcas.html", file: "orcas.html", title: "虎鲸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐋", ready: true,
    description: "比较虎鲸和一头推的鲸。虎鲸几头一起推浪才把冰上的冲下来。",
    task: "点两张不一样的卡，说出谁更像会一起推浪的虎鲸。"
  }  ,
  {
    id: "games/wavewash-lab.html", file: "wavewash-lab.html", title: "推浪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一群纸虎鲸。几头一起推浪才冲得下来；一头推推不动。",
    task: "试一次一起推和一次一头推，比较谁冲得下来。"
  }
  ,
  {
    id: "nature/ladybugs.html", file: "ladybugs.html", title: "瓢虫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐞", ready: true,
    description: "比较瓢虫和腿关节干着的甲虫。瓢虫腿关节渗出黄水才被放下。",
    task: "点两张不一样的卡，说出谁更像会渗黄水的瓢虫。"
  }  ,
  {
    id: "games/reflexbleed-lab.html", file: "reflexbleed-lab.html", title: "黄水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一只纸瓢虫。腿关节渗出黄水才被放下；没有黄水就被吃。",
    task: "试一次渗黄和一次干燥，比较谁被放下。"
  }
  ,
  {
    id: "nature/colugos.html", file: "colugos.html", title: "鼯猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦇", ready: true,
    description: "比较鼯猴和皮收着的动物。鼯猴从脖子到尾巴那一层皮张开才滑得远。",
    task: "点两张不一样的卡，说出谁更像张皮翼的鼯猴。"
  }  ,
  {
    id: "games/skinwing-lab.html", file: "skinwing-lab.html", title: "皮翼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪂", ready: true,
    description: "同一只纸鼯猴。从脖子到尾巴那一层皮张开才滑得远；收着就掉下去。",
    task: "试一次张皮和一次收皮，比较谁滑得远。"
  }
  ,
  {
    id: "nature/lorises.html", file: "lorises.html", title: "懒猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐒", ready: true,
    description: "比较懒猴和快跑的猴。懒猴慢慢走才不被看见。",
    task: "点两张不一样的卡，说出谁更像慢慢走的懒猴。"
  }  ,
  {
    id: "games/slowgrip-lab.html", file: "slowgrip-lab.html", title: "慢走工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐢", ready: true,
    description: "同一只纸懒猴。慢慢走才不被看见；快跑自己被发现。",
    task: "试一次慢走和一次快跑，比较谁不被看见。"
  }
  ,
  {
    id: "nature/frilled-sharks.html", file: "frilled-sharks.html", title: "皱鳃鲨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦈", ready: true,
    description: "比较皱鳃鲨和身子粗直的鲨。皱鳃鲨身子细得像鳗才弯得进深缝。",
    task: "点两张不一样的卡，说出谁更像细身子的皱鳃鲨。"
  }  ,
  {
    id: "games/eelform-lab.html", file: "eelform-lab.html", title: "鳗身工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐍", ready: true,
    description: "同一只纸皱鳃鲨。身子细得像鳗才弯得进；粗直就进不去。",
    task: "试一次细弯和一次粗直，比较谁进得去。"
  }
  ,
  {
    id: "nature/filefish.html", file: "filefish.html", title: "单角鲀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较单角鲀和背棘倒下的鱼。单角鲀第一根背棘竖着卡住才吐不出来。",
    task: "点两张不一样的卡，说出谁更像会卡棘的单角鲀。"
  }  ,
  {
    id: "games/raspfin-lab.html", file: "raspfin-lab.html", title: "棘卡工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📌", ready: true,
    description: "同一只纸单角鲀。第一根背棘竖着卡住才吐不出来；倒下就滑掉。",
    task: "试一次竖卡和一次倒下，比较谁吐不出来。"
  }
  ,
  {
    id: "nature/porcupinefish.html", file: "porcupinefish.html", title: "二齿鲀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐡", ready: true,
    description: "比较二齿鲀和刺贴着的鱼。二齿鲀刺竖起来才咬不进。",
    task: "点两张不一样的卡，说出谁更像竖刺的二齿鲀。"
  }  ,
  {
    id: "games/spineball-lab.html", file: "spineball-lab.html", title: "竖刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📌", ready: true,
    description: "同一只纸二齿鲀。刺竖起来才咬不进；刺贴着就被咬。",
    task: "试一次竖刺和一次贴刺，比较谁咬不进。"
  }
  ,
  {
    id: "nature/cowfish.html", file: "cowfish.html", title: "牛鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较牛鱼和没角的箱鲀。牛鱼头上两只角先顶开才转得过缝。",
    task: "点两张不一样的卡，说出谁更像有头角的牛鱼。"
  }  ,
  {
    id: "games/hornbox-lab.html", file: "hornbox-lab.html", title: "头角工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📦", ready: true,
    description: "同一只纸牛鱼。头上两只角先顶开才转得过缝；没角就卡住。",
    task: "试一次顶角和一次没角，比较谁转得过。"
  }
  ,
  {
    id: "nature/tree-kangaroos.html", file: "tree-kangaroos.html", title: "树袋鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦘", ready: true,
    description: "比较树袋鼠和脚底滑滑的动物。树袋鼠脚底有垫才抓得住树。",
    task: "点两张不一样的卡，说出谁更像会爬树的树袋鼠。"
  }  ,
  {
    id: "games/climbfoot-lab.html", file: "climbfoot-lab.html", title: "爬脚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸树袋鼠。脚底有垫才爬得上去；脚底滑滑的就滑下来。",
    task: "试一次有垫和一次滑脚，比较谁爬得上去。"
  }
  ,
  {
    id: "nature/wallabies.html", file: "wallabies.html", title: "沙袋鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦘", ready: true,
    description: "比较沙袋鼠和四脚跑的动物。沙袋鼠后腿一齐往后跳才一下跳得远。",
    task: "点两张不一样的卡，说出谁更像会后跳的沙袋鼠。"
  }  ,
  {
    id: "games/boxhop-lab.html", file: "boxhop-lab.html", title: "后跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⏭️", ready: true,
    description: "同一只纸沙袋鼠。后腿一齐往后跳才跳得远；四脚轮流跑步子碎。",
    task: "试一次后跳和一次四跑，比较谁跳得远。"
  }
  ,
  {
    id: "nature/tasmanian-devils.html", file: "tasmanian-devils.html", title: "袋獾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "😈", ready: true,
    description: "比较袋獾和嘴张一点点的动物。袋獾嘴张得特别开才咬得动骨头。",
    task: "点两张不一样的卡，说出谁更像会张大嘴的袋獾。"
  }  ,
  {
    id: "games/bonegape-lab.html", file: "bonegape-lab.html", title: "张骨工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦴", ready: true,
    description: "同一只纸袋獾。嘴张得特别开才咬得动；张一点点就咬不动。",
    task: "试一次大张和一次小张，比较谁咬得动。"
  }
  ,
  {
    id: "nature/quolls.html", file: "quolls.html", title: "袋鼬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐾", ready: true,
    description: "比较袋鼬和白天乱跑的动物。袋鼬夜里先看准再扑才扑得到。",
    task: "点两张不一样的卡，说出谁更像会夜扑的袋鼬。"
  }  ,
  {
    id: "games/spotpounce-lab.html", file: "spotpounce-lab.html", title: "夜扑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌙", ready: true,
    description: "同一只纸袋鼬。夜里先看准再扑才扑得到；白天乱跑自己被看见。",
    task: "试一次夜扑和一次日跑，比较谁扑得到。"
  }
  ,
  {
    id: "nature/bilbies.html", file: "bilbies.html", title: "兔耳袋狸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐰", ready: true,
    description: "比较兔耳袋狸和闭着耳乱挖的动物。兔耳袋狸大耳朵听着再挖才挖得到虫。",
    task: "点两张不一样的卡，说出谁更像会长耳听的兔耳袋狸。"
  }  ,
  {
    id: "games/eardig-lab.html", file: "eardig-lab.html", title: "长耳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一只纸兔耳袋狸。大耳朵听着再挖才挖得到；闭着耳乱挖会挖空。",
    task: "试一次听挖和一次乱挖，比较谁挖得到。"
  }
  ,
  {
    id: "nature/potoroos.html", file: "potoroos.html", title: "鼠袋鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦘", ready: true,
    description: "比较鼠袋鼠和随便拱一下的动物。鼠袋鼠鼻子拱到菌才停才找得到地下菌。",
    task: "点两张不一样的卡，说出谁更像会拱菌的鼠袋鼠。"
  }  ,
  {
    id: "games/fungusdig-lab.html", file: "fungusdig-lab.html", title: "拱菌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍄", ready: true,
    description: "同一只纸鼠袋鼠。鼻子拱到菌才停才找得到；随便拱一下会拱空。",
    task: "试一次拱菌和一次乱拱，比较谁找得到。"
  }
  ,
  {
    id: "nature/possums.html", file: "possums.html", title: "负鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐭", ready: true,
    description: "比较负鼠和尾巴垂着的动物。负鼠尾巴卷住树枝才掉不下去。",
    task: "点两张不一样的卡，说出谁更像会卷尾的负鼠。"
  }  ,
  {
    id: "games/tailhook-lab.html", file: "tailhook-lab.html", title: "卷尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪝", ready: true,
    description: "同一只纸负鼠。尾巴卷住树枝才掉不下去；尾巴垂着自己掉下去。",
    task: "试一次卷住和一次垂着，比较谁掉不下去。"
  }
  ,
  {
    id: "nature/stargazers.html", file: "stargazers.html", title: "瞻星鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较瞻星鱼和浮在沙上的鱼。瞻星鱼脸埋在沙里眼睛朝上才等得到经过的。",
    task: "点两张不一样的卡，说出谁更像会埋脸的瞻星鱼。"
  }  ,
  {
    id: "games/buryface-lab.html", file: "buryface-lab.html", title: "埋脸工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⭐", ready: true,
    description: "同一只纸瞻星鱼。脸埋在沙里眼睛朝上才等得到；浮在沙上一下子被看见。",
    task: "试一次埋脸和一次浮着，比较谁等得到。"
  }
  ,
  {
    id: "nature/opahs.html", file: "opahs.html", title: "月鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较月鱼和血冷的鱼。月鱼心里的血先暖着才游得动冷水。",
    task: "点两张不一样的卡，说出谁更像会暖血的月鱼。"
  }  ,
  {
    id: "games/heatblood-lab.html", file: "heatblood-lab.html", title: "暖血工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "❤️", ready: true,
    description: "同一只纸月鱼。心里的血先暖着才游得动；血冷就游不动。",
    task: "试一次暖血和一次冷血，比较谁游得动。"
  }
  ,
  {
    id: "nature/aardvarks.html", file: "aardvarks.html", title: "土豚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐜", ready: true,
    description: "比较土豚和短鼻子的动物。土豚鼻子长长伸进蚁丘才舔得到。",
    task: "点两张不一样的卡，说出谁更像会长鼻的土豚。"
  }  ,
  {
    id: "games/antcone-lab.html", file: "antcone-lab.html", title: "长鼻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👃", ready: true,
    description: "同一只纸土豚。鼻子长长伸进蚁丘才舔得到；短鼻舔不到。",
    task: "试一次长鼻和一次短鼻，比较谁舔得到。"
  }
  ,
  {
    id: "nature/quokkas.html", file: "quokkas.html", title: "短尾袋鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦘", ready: true,
    description: "比较短尾袋鼠和前脚先落地的动物。短尾袋鼠后脚先落地才在岛上跳得稳。",
    task: "点两张不一样的卡，说出谁更像后脚先落地的短尾袋鼠。"
  }  ,
  {
    id: "games/islandhop-lab.html", file: "islandhop-lab.html", title: "后脚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸短尾袋鼠。后脚先落地才跳得稳；前脚先落地就栽。",
    task: "试一次后脚和一次前脚，比较谁跳得稳。"
  }
  ,
  {
    id: "nature/bandicoots.html", file: "bandicoots.html", title: "袋狸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐽", ready: true,
    description: "比较袋狸和用眼睛看的动物。袋狸鼻子拱进土里才找得到虫。",
    task: "点两张不一样的卡，说出谁更像会拱土的袋狸。"
  }  ,
  {
    id: "games/snuffle-lab.html", file: "snuffle-lab.html", title: "拱土工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕳️", ready: true,
    description: "同一只纸袋狸。鼻子拱进土里才找得到；用眼睛看看不见。",
    task: "试一次拱土和一次眼看，比较谁找得到。"
  }
  ,
  {
    id: "nature/scorpions.html", file: "scorpions.html", title: "蝎观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦂", ready: true,
    description: "比较蝎和普通光照的壳。蝎壳被紫光照上才亮起来。",
    task: "点两张不一样的卡，说出谁更像会发荧光的蝎。"
  }  ,
  {
    id: "games/uv-lab.html", file: "uv-lab.html", title: "紫光工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💜", ready: true,
    description: "同一只纸蝎。紫光照上才亮起来；普通光照看不见。",
    task: "试一次紫光和一次白光，比较谁亮起来。"
  }
  ,
  {
    id: "nature/sifakas.html", file: "sifakas.html", title: "跳狐猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐒", ready: true,
    description: "比较跳狐猴和四脚爬的猴。跳狐猴两条后腿一齐侧跳才过得了空地。",
    task: "点两张不一样的卡，说出谁更像会侧跳的跳狐猴。"
  }  ,
  {
    id: "games/sidehop-lab.html", file: "sidehop-lab.html", title: "侧跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "↔️", ready: true,
    description: "同一只纸跳狐猴。两条后腿一齐侧跳才过得了空地；四脚爬就慢。",
    task: "试一次侧跳和一次四爬，比较谁过得了。"
  }
  ,
  {
    id: "nature/galagos.html", file: "galagos.html", title: "丛猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐒", ready: true,
    description: "比较丛猴和慢慢伸腿的猴。丛猴后腿肌腱先攒着再弹才跳得远。",
    task: "点两张不一样的卡，说出谁更像会攒跳的丛猴。"
  }  ,
  {
    id: "games/tendonhop-lab.html", file: "tendonhop-lab.html", title: "攒跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸丛猴。后腿肌腱先攒着再弹才跳得远；慢慢伸就跳不远。",
    task: "试一次攒弹和一次慢伸，比较谁跳得远。"
  }
  ,
  {
    id: "nature/marine-iguanas.html", file: "marine-iguanas.html", title: "海鬣蜥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较海鬣蜥和把盐憋着的蜥蜴。海鬣蜥盐腺打个喷嚏才把海里的盐喷出去。",
    task: "点两张不一样的卡，说出谁更像会打喷嚏排盐的海鬣蜥。"
  }  ,
  {
    id: "games/sneeze-lab.html", file: "sneeze-lab.html", title: "喷嚏工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🤧", ready: true,
    description: "同一只纸海鬣蜥。盐腺打个喷嚏才把盐喷出去；憋着盐脸上就结白霜。",
    task: "试一次喷嚏和一次憋着，比较谁把盐喷出去。"
  }

  ,
  {
    id: "nature/cheetahs.html", file: "cheetahs.html", title: "猎豹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐆", ready: true,
    description: "比较猎豹和把尾巴夹着的猫。猎豹转弯时把长尾巴甩开当舵，才拐得过弯。",
    task: "点两张不一样的卡，说出谁更像会甩尾巴当舵的猎豹。"
  }  ,
  {
    id: "games/rudder-lab.html", file: "rudder-lab.html", title: "甩尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "↩️", ready: true,
    description: "同一只纸猎豹。尾巴甩开当舵才拐得过；夹着尾巴就冲过头。",
    task: "试一次甩尾和一次夹着，比较谁拐得过弯。"
  }

  ,
  {
    id: "nature/dolphins.html", file: "dolphins.html", title: "海豚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐬", ready: true,
    description: "比较海豚和左右摆尾巴的鱼。海豚尾巴上下拍才推得动水。",
    task: "点两张不一样的卡，说出谁更像上下拍尾的海豚。"
  }  ,
  {
    id: "games/fluke-lab.html", file: "fluke-lab.html", title: "尾叶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐟", ready: true,
    description: "同一只纸海豚。尾巴上下拍才推得动；尾巴左右摆就推不动。",
    task: "试一次上下拍和一次左右摆，比较谁推得动。"
  }
  ,
  {
    id: "nature/hyraxes.html", file: "hyraxes.html", title: "蹄兔观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪨", ready: true,
    description: "比较蹄兔和爪子干硬的动物。蹄兔脚底湿湿的肉垫才贴得住石头。",
    task: "点两张不一样的卡，说出谁更像有肉垫的蹄兔。"
  }  ,
  {
    id: "games/moistpad-lab.html", file: "moistpad-lab.html", title: "肉垫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸蹄兔。肉垫湿湿的才贴得住；爪子干硬就滑下去。",
    task: "试一次湿垫和一次干爪，比较谁贴得住。"
  }
  ,
  {
    id: "nature/springboks.html", file: "springboks.html", title: "跳羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较跳羚和贴地往前跑的羚。跳羚四腿伸直往上蹦对面才看得见信号。",
    task: "点两张不一样的卡，说出谁更像会直蹦的跳羚。"
  }  ,
  {
    id: "games/pronk-lab.html", file: "pronk-lab.html", title: "直蹦工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬆️", ready: true,
    description: "同一只纸跳羚。四腿伸直蹦才看得见；贴地往前跑就看不出。",
    task: "试一次直蹦和一次平跑，比较谁看得见。"
  }
  ,
  {
    id: "nature/leatherbacks.html", file: "leatherbacks.html", title: "棱皮龟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐢", ready: true,
    description: "比较棱皮龟和硬格子甲的海龟。棱皮龟软甲有脊才潜得深。",
    task: "点两张不一样的卡，说出谁更像软甲的棱皮龟。"
  }  ,
  {
    id: "games/flexshell-lab.html", file: "flexshell-lab.html", title: "软甲工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸棱皮龟。甲是软的有脊才潜得深；甲是硬格子就潜不深。",
    task: "试一次软甲和一次硬甲，比较谁潜得深。"
  }
  ,
  {
    id: "nature/sun-bears.html", file: "sun-bears.html", title: "马来熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐻", ready: true,
    description: "比较马来熊和舌头短短的熊。马来熊舌头伸进蜂窝才舔得到蜜。",
    task: "点两张不一样的卡，说出谁更像长舌的马来熊。"
  }  ,
  {
    id: "games/honeylap-lab.html", file: "honeylap-lab.html", title: "长舌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍯", ready: true,
    description: "同一只纸马来熊。舌头伸进窝才舔得到；舌头短短的就舔不到。",
    task: "试一次长舌和一次短舌，比较谁舔得到。"
  }
  ,
  {
    id: "nature/weeverfish.html", file: "weeverfish.html", title: "龙膁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较龙膁和整条游在沙上的鱼。龙膁埋进沙只露黑背棘，踩到的才躲开。",
    task: "点两张不一样的卡，说出谁更像会埋沙的龙膁。"
  }  ,
  {
    id: "games/buryfin-lab.html", file: "buryfin-lab.html", title: "埋棘工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚠️", ready: true,
    description: "同一只纸龙膁。埋进沙只露棘才等得到；整条游在沙上一下子被看见。",
    task: "试一次埋沙和一次游着，比较谁等得到。"
  }
  ,
  {
    id: "nature/komodo-dragons.html", file: "komodo-dragons.html", title: "科莫多龙观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较科莫多龙和嘴闭着闻的蜥蜴。科莫多龙叉子舌头舔空气才找得到气味。",
    task: "点两张不一样的卡，说出谁更像会伸叉舌的科莫多龙。"
  }  ,
  {
    id: "games/forktaste-lab.html", file: "forktaste-lab.html", title: "叉舌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👅", ready: true,
    description: "同一只纸科莫多龙。叉子舌头舔空气才找得到；嘴闭着闻就找不到。",
    task: "试一次叉舌和一次闭嘴，比较谁找得到。"
  }
  ,
  {
    id: "nature/ibex.html", file: "ibex.html", title: "北山羊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐐", ready: true,
    description: "比较北山羊和蹄子并着的动物。北山羊分开的蹄子卡住岩石才爬得上去。",
    task: "点两张不一样的卡，说出谁更像会爬山的北山羊。"
  }  ,
  {
    id: "games/cliffhoof-lab.html", file: "cliffhoof-lab.html", title: "悬崖蹄工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸北山羊。蹄分开卡住才爬得上去；蹄并着就滑下去。",
    task: "试一次分开和一次并着，比较谁爬得上去。"
  }
  ,
  {
    id: "nature/gharials.html", file: "gharials.html", title: "恒河鳄观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐊", ready: true,
    description: "比较恒河鳄和宽嘴的鳄鱼。恒河鳄又细又长的嘴才夹得住鱼。",
    task: "点两张不一样的卡，说出谁更像细嘴的恒河鳄。"
  }  ,
  {
    id: "games/narrowjaw-lab.html", file: "narrowjaw-lab.html", title: "细嘴工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎣", ready: true,
    description: "同一只纸恒河鳄。细长嘴夹鱼才夹得住；宽嘴去咬就夹不住。",
    task: "试一次细嘴和一次宽嘴，比较谁夹得住。"
  }
  ,
  {
    id: "nature/cone-snails.html", file: "cone-snails.html", title: "芋螺观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐚", ready: true,
    description: "比较芋螺和用壳去撞的螺。芋螺弹出齿舌做成的小矛才射得到。",
    task: "点两张不一样的卡，说出谁更像会射齿矛的芋螺。"
  }  ,
  {
    id: "games/harpoon-lab.html", file: "harpoon-lab.html", title: "齿矛工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎯", ready: true,
    description: "同一只纸芋螺。弹出齿矛才射得到；用壳去撞就射不到。",
    task: "试一次齿矛和一次撞壳，比较谁射得到。"
  }
  ,
  {
    id: "nature/oryx.html", file: "oryx.html", title: "大羚羊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦄", ready: true,
    description: "比较大羚羊和拼命散热的羚。大羚羊白天让身体热一点，晚上才散得掉。",
    task: "点两张不一样的卡，说出谁更像会蓄热的大羚羊。"
  }  ,
  {
    id: "games/heatkeep-lab.html", file: "heatkeep-lab.html", title: "蓄热工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌡️", ready: true,
    description: "同一只纸大羚羊。身体先热着水还在；拼命散热水就耗光。",
    task: "试一次蓄热和一次散热，比较谁水还在。"
  }
  ,
  {
    id: "nature/pronghorns.html", file: "pronghorns.html", title: "叉角羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较叉角羚和角永不脱的牛。叉角羚每年脱掉角外面那层鞘才长得出新的。",
    task: "点两张不一样的卡，说出谁更像会脱角鞘的叉角羚。"
  }  ,
  {
    id: "games/hornshed-lab.html", file: "hornshed-lab.html", title: "角鞘工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦴", ready: true,
    description: "同一只纸叉角羚。角鞘脱掉才长得出新的；鞘一直套着就长不出。",
    task: "试一次脱鞘和一次套着，比较谁长得出。"
  }
  ,
  {
    id: "nature/sea-urchins.html", file: "sea-urchins.html", title: "海胆观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "⚪", ready: true,
    description: "比较海胆和只靠刺撑着的球。海胆用管足吸住再走才走得动。",
    task: "点两张不一样的卡，说出谁更像会走的海胆。"
  }  ,
  {
    id: "games/urchinwalk-lab.html", file: "urchinwalk-lab.html", title: "管足工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸海胆。管足吸住走才走得动；只靠刺撑着走不动。",
    task: "试一次管足和一次刺撑，比较谁走得动。"
  }
  ,
  {
    id: "nature/storks.html", file: "storks.html", title: "鹳观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹳和追着啄的鸟。鹳先站着不动等鱼游近再刺才刺得到。",
    task: "点两张不一样的卡，说出谁更像会静刺的鹳。"
  }  ,
  {
    id: "games/waitstab-lab.html", file: "waitstab-lab.html", title: "静刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📍", ready: true,
    description: "同一只纸鹳。站住再刺才刺得到；追着啄就搅浑水。",
    task: "试一次静刺和一次追啄，比较谁刺得到。"
  }
  ,
  {
    id: "nature/zebras.html", file: "zebras.html", title: "斑马观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦓", ready: true,
    description: "比较斑马和身上一块色的马。斑马成群跑时条纹晃在一起，咬人的苍蝇才落不准。",
    task: "点两张不一样的卡，说出谁更像条纹晃动的斑马。"
  }  ,
  {
    id: "games/dazzle-lab.html", file: "dazzle-lab.html", title: "条纹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦓", ready: true,
    description: "同一只纸斑马。条纹一起晃蝇才落不准；身上一块色就落得准。",
    task: "试一次条纹和一次一块色，比较谁落不准。"
  }
  ,
  {
    id: "nature/cranes.html", file: "cranes.html", title: "鹤观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦢", ready: true,
    description: "比较鹤和一只自己跳的鸟。两只鹤一起跳、一起叫才对得上舞伴。",
    task: "点两张不一样的卡，说出谁更像会齐舞的鹤。"
  }  ,
  {
    id: "games/unison-lab.html", file: "unison-lab.html", title: "齐舞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💃", ready: true,
    description: "同一对纸鹤。两只一起跳才对得上；一只自己跳对面不理。",
    task: "试一次齐舞和一次单跳，比较谁对得上。"
  }
  ,
  {
    id: "nature/flying-gurnards.html", file: "flying-gurnards.html", title: "飞鲂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较飞鲂和胸鳍收着的鱼。飞鲂把大大的胸鳍张开才滑得出一小段。",
    task: "点两张不一样的卡，说出谁更像张开胸鳍的飞鲂。"
  }  ,
  {
    id: "games/pectspread-lab.html", file: "pectspread-lab.html", title: "胸扇工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪭", ready: true,
    description: "同一只纸飞鲂。胸鳍张开才滑得出；胸鳍收着只会沉。",
    task: "试一次张开和一次收着，比较谁滑得出。"
  }
  ,
  {
    id: "nature/giant-clams.html", file: "giant-clams.html", title: "砗磲观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐚", ready: true,
    description: "比较砗磲和壳一直闭着的蛤。砗磲把外套膜张开对着太阳，里面的小藻才造得出糖。",
    task: "点两张不一样的卡，说出谁更像张开外套膜的砗磲。"
  }  ,
  {
    id: "games/clamsun-lab.html", file: "clamsun-lab.html", title: "外套工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "☀️", ready: true,
    description: "同一只纸砗磲。外套膜张开朝阳才造得出糖；壳一直闭着藻就饿着。",
    task: "试一次张开和一次闭壳，比较谁造得出糖。"
  }
  ,
  {
    id: "nature/nudibranchs.html", file: "nudibranchs.html", title: "海蛞蝓观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌈", ready: true,
    description: "比较海蛞蝓和背上光光的螺。海蛞蝓把刺细胞放到背上的丛里才扎得人。",
    task: "点两张不一样的卡，说出谁更像背上有刺丛的海蛞蝓。"
  }  ,
  {
    id: "games/cerata-lab.html", file: "cerata-lab.html", title: "背丛工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌵", ready: true,
    description: "同一只纸海蛞蝓。背上有刺丛才扎得住人；背上光光就扎不了。",
    task: "试一次背丛和一次光背，比较谁扎得住。"
  }
  ,
  {
    id: "nature/sea-cucumbers.html", file: "sea-cucumbers.html", title: "海参观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🥒", ready: true,
    description: "比较海参和管子留在肚里的动物。海参把身体里的管子喷出去，对方才先被粘住。",
    task: "点两张不一样的卡，说出谁更像会喷肠的海参。"
  }  ,
  {
    id: "games/gutshoot-lab.html", file: "gutshoot-lab.html", title: "喷肠工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💥", ready: true,
    description: "同一只纸海参。管子喷出去对方才被粘住；管子留在肚里就挡不住。",
    task: "试一次喷肠和一次留着，比较谁挡得住。"
  }
  ,
  {
    id: "nature/coelacanths.html", file: "coelacanths.html", title: "腔棘鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较腔棘鱼和薄鳍条的鱼。腔棘鱼肉质鳍像腿一样撑着，才在底上走得动。",
    task: "点两张不一样的卡，说出谁更像有肉鳍的腔棘鱼。"
  }  ,
  {
    id: "games/lobefin-lab.html", file: "lobefin-lab.html", title: "肉鳍工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸腔棘鱼。肉鳍撑着走才走得动；薄鳍条就撑不住。",
    task: "试一次肉鳍和一次薄鳍，比较谁走得动。"
  }
  ,
  {
    id: "nature/polar-bears.html", file: "polar-bears.html", title: "北极熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐻‍❄️", ready: true,
    description: "比较北极熊和脚底光光的熊。北极熊脚底有毛垫才走得了冰。",
    task: "点两张不一样的卡，说出谁更像有毛垫的北极熊。"
  }  ,
  {
    id: "games/pawpad-lab.html", file: "pawpad-lab.html", title: "毛垫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧊", ready: true,
    description: "同一只纸北极熊。脚底有毛垫才走得了冰；脚底光光的就打滑。",
    task: "试一次毛垫和一次光脚，比较谁走得了冰。"
  }
  ,
  {
    id: "nature/snow-leopards.html", file: "snow-leopards.html", title: "雪豹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐆", ready: true,
    description: "比较雪豹和细尾垂着的。雪豹把粗尾搭着走，才掉不下去。",
    task: "点两张不一样的卡，说出谁更像会把粗尾搭着走的雪豹。"
  }
  ,
  {
    id: "games/tailbal-lab.html", file: "tailbal-lab.html", title: "尾舵工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪶", ready: true,
    description: "同一只纸雪豹。粗尾搭着走才掉不下去；细尾垂着就掉下去。",
    task: "试一次搭着和一次垂着，比较谁掉不下去。"
  }
  ,
  {
    id: "nature/bison.html", file: "bison.html", title: "美洲野牛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦬", ready: true,
    description: "比较美洲野牛和鼻子去闻的牛。美洲野牛用头把雪拱开才吃得到草。",
    task: "点两张不一样的卡，说出谁更像会拱雪的美洲野牛。"
  }  ,
  {
    id: "games/headsnow-lab.html", file: "headsnow-lab.html", title: "拱雪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "❄️", ready: true,
    description: "同一只纸美洲野牛。头拱开雪才吃得到草；鼻子去闻就吃不到。",
    task: "试一次拱雪和一次去闻，比较谁吃得到。"
  }
  ,
  {
    id: "nature/warthogs.html", file: "warthogs.html", title: "疣猪观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐗", ready: true,
    description: "比较疣猪和站着拱的猪。疣猪膝盖有垫，跪下来挖才挖得到根。",
    task: "点两张不一样的卡，说出谁更像会跪挖的疣猪。"
  }  ,
  {
    id: "games/kneel-lab.html", file: "kneel-lab.html", title: "跪垫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧎", ready: true,
    description: "同一只纸疣猪。跪下来挖才挖得到根；站着拱就够不着。",
    task: "试一次跪挖和一次站拱，比较谁挖得到。"
  }
  ,
  {
    id: "nature/sloth-bears.html", file: "sloth-bears.html", title: "懒熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐻", ready: true,
    description: "比较懒熊和直接去舔土的熊。懒熊先把土吹开再舔才舔得到白蚁。",
    task: "点两张不一样的卡，说出谁更像会先吹土的懒熊。"
  }  ,
  {
    id: "games/dirtblow-lab.html", file: "dirtblow-lab.html", title: "吹土工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💨", ready: true,
    description: "同一只纸懒熊。先把土吹开再舔才舔得到；直接去舔土嘴里一堆土。",
    task: "试一次先吹和一次直舔，比较谁舔得到。"
  }
  ,
  {
    id: "nature/vampire-bats.html", file: "vampire-bats.html", title: "吸血蝠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦇", ready: true,
    description: "比较吸血蝠和随便咬一口的蝙蝠。吸血蝠鼻子先摸到温热的地方才找得到血。",
    task: "点两张不一样的卡，说出谁更像会找温点的吸血蝠。"
  }  ,
  {
    id: "games/warmspot-lab.html", file: "warmspot-lab.html", title: "温点工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌡️", ready: true,
    description: "同一只纸吸血蝠。先摸到温热的地方才找得到；随便咬一口会咬空。",
    task: "试一次温点和一次乱咬，比较谁找得到。"
  }
  ,
  {
    id: "nature/maned-wolves.html", file: "maned-wolves.html", title: "鬃狼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐺", ready: true,
    description: "比较鬃狼和腿短短的狼。鬃狼腿特别长，高出草才看得见前方。",
    task: "点两张不一样的卡，说出谁更像长腿的鬃狼。"
  }  ,
  {
    id: "games/grassstilt-lab.html", file: "grassstilt-lab.html", title: "长腿工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸鬃狼。长腿高出草才看得见；腿短短的会被草挡住。",
    task: "试一次长腿和一次短腿，比较谁看得见。"
  }
  ,
  {
    id: "nature/aardwolves.html", file: "aardwolves.html", title: "土狼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐺", ready: true,
    description: "比较土狼和硬牙去咬的鬣狗。土狼牙又细又软，去舔白蚁才舔得到。",
    task: "点两张不一样的卡，说出谁更像软牙舔蚁的土狼。"
  }  ,
  {
    id: "games/softlick-lab.html", file: "softlick-lab.html", title: "软舔工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐜", ready: true,
    description: "同一只纸土狼。软牙去舔蚁才舔得到；硬牙去咬会咬空。",
    task: "试一次软舔和一次硬咬，比较谁舔得到。"
  }
  ,
  {
    id: "nature/surgeonfish.html", file: "surgeonfish.html", title: "刺尾鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较刺尾鱼和尾巴软软的鱼。刺尾鱼尾柄那片刀弹开，对方才躲开。",
    task: "点两张不一样的卡，说出谁更像有尾刀的刺尾鱼。"
  }  ,
  {
    id: "games/knifetail-lab.html", file: "knifetail-lab.html", title: "尾刀工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔪", ready: true,
    description: "同一只纸刺尾鱼。尾柄那片刀弹开对方才躲开；刀收着会被咬住。",
    task: "试一次弹刀和一次收着，比较谁躲开。"
  }
  ,
  {
    id: "nature/vultures.html", file: "vultures.html", title: "秃鹫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦅", ready: true,
    description: "比较秃鹫和翅膀扑打的鸟。秃鹫翅膀张开踩着热空气才不费力升高。",
    task: "点两张不一样的卡，说出谁更像会踩热气的秃鹫。"
  }  ,
  {
    id: "games/thermal-lab.html", file: "thermal-lab.html", title: "热气流工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "♨️", ready: true,
    description: "同一只纸秃鹫。翅膀张开踩热气才不费力升高；翅膀扑打会掉下去。",
    task: "试一次踩热气和一次扑打，比较谁升高。"
  }
  ,
  {
    id: "nature/arapaima.html", file: "arapaima.html", title: "巨骨舌鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较巨骨舌鱼和只靠鳃的鱼。巨骨舌鱼把头伸出水面吸一口空气才喘得过。",
    task: "点两张不一样的卡，说出谁更像会吸气的巨骨舌鱼。"
  }  ,
  {
    id: "games/mouthair-lab.html", file: "mouthair-lab.html", title: "水面工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💨", ready: true,
    description: "同一只纸巨骨舌鱼。伸出水面吸气才喘得过；只靠鳃会闷着。",
    task: "试一次吸气和一次靠鳃，比较谁喘得过。"
  }
  ,
  {
    id: "nature/fiddler-crabs.html", file: "fiddler-crabs.html", title: "招潮蟹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦀", ready: true,
    description: "比较招潮蟹和两只螯一样大的蟹。招潮蟹把特别大的螯举起来晃，对面才看得见信号。",
    task: "点两张不一样的卡，说出谁更像举大螯的招潮蟹。"
  }  ,
  {
    id: "games/bigclaw-lab.html", file: "bigclaw-lab.html", title: "大螯工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👋", ready: true,
    description: "同一只纸招潮蟹。大螯举起来晃才看得见；两只一样大就认不出。",
    task: "试一次举螯和一次一样大，比较谁看得见。"
  }
  ,
  {
    id: "nature/condors.html", file: "condors.html", title: "神鹫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦅", ready: true,
    description: "比较神鹫和胃酸淡淡的鸟。神鹫胃酸特别强，骨头才化得掉。",
    task: "点两张不一样的卡，说出谁更像胃酸强的神鹫。"
  }  ,
  {
    id: "games/bonesolve-lab.html", file: "bonesolve-lab.html", title: "溶骨工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦴", ready: true,
    description: "同一只纸神鹫。胃酸够强骨头才化得掉；胃酸淡淡骨头就卡着。",
    task: "试一次强酸和一次淡酸，比较谁化得掉。"
  }
  ,
  {
    id: "nature/gila-monsters.html", file: "gila-monsters.html", title: "希拉毒蜥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较希拉毒蜥和尾巴细细的蜥蜴。希拉毒蜥把脂肪存在尾巴里，好久不吃也撑得住。",
    task: "点两张不一样的卡，说出谁更像肥尾巴的希拉毒蜥。"
  }  ,
  {
    id: "games/tailfat-lab.html", file: "tailfat-lab.html", title: "尾脂工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧈", ready: true,
    description: "同一只纸希拉毒蜥。尾巴存着脂肪才撑得住；尾巴细细的就撑不住。",
    task: "试一次尾脂和一次细尾，比较谁撑得住。"
  }
  ,
  {
    id: "nature/anoles.html", file: "anoles.html", title: "安乐蜥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较安乐蜥和喉下扇收着的蜥蜴。安乐蜥把喉下那片彩扇撑开，对面才看得见信号。",
    task: "点两张不一样的卡，说出谁更像撑开喉扇的安乐蜥。"
  }  ,
  {
    id: "games/dewlap-lab.html", file: "dewlap-lab.html", title: "喉扇工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎏", ready: true,
    description: "同一只纸安乐蜥。喉扇撑开才看得见；扇收着就认不出。",
    task: "试一次撑开和一次收着，比较谁看得见。"
  }
  ,
  {
    id: "nature/hermit-crabs.html", file: "hermit-crabs.html", title: "寄居蟹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦀", ready: true,
    description: "比较寄居蟹和壳长在身上的螺。寄居蟹长大了换一个更大的空螺壳才装得下。",
    task: "点两张不一样的卡，说出谁更像会换壳的寄居蟹。"
  }  ,
  {
    id: "games/shellswap-lab.html", file: "shellswap-lab.html", title: "换壳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐚", ready: true,
    description: "同一只纸寄居蟹。换成大空壳才装得下；旧壳一直套着就挤着。",
    task: "试一次换壳和一次套着，比较谁装得下。"
  }
  ,
  {
    id: "nature/coconut-crabs.html", file: "coconut-crabs.html", title: "椰子蟹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦀", ready: true,
    description: "比较椰子蟹和螯不夹的蟹。椰子蟹大螯夹住树皮再爬才爬得上椰子树。",
    task: "点两张不一样的卡，说出谁更像会爬树的椰子蟹。"
  }  ,
  {
    id: "games/climbnut-lab.html", file: "climbnut-lab.html", title: "爬椰工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥥", ready: true,
    description: "同一只纸椰子蟹。大螯夹住再爬才爬得上；螯不夹就掉下来。",
    task: "试一次夹爬和一次不夹，比较谁爬得上。"
  }
  ,
  {
    id: "nature/peccaries.html", file: "peccaries.html", title: "西貒观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐗", ready: true,
    description: "比较西貒和自己乱跑的猪。西貒背上的味腺擦一下才跟得上同伴。",
    task: "点两张不一样的卡，说出谁更像会留味的西貒。"
  }  ,
  {
    id: "games/herdscent-lab.html", file: "herdscent-lab.html", title: "气味工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👃", ready: true,
    description: "同一只纸西貒。背上的味腺擦一下才跟得上；自己乱跑会跟丢。",
    task: "试一次擦味和一次乱跑，比较谁跟得上。"
  }
  ,
  {
    id: "nature/matamata.html", file: "matamata.html", title: "玛塔龟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐢", ready: true,
    description: "比较玛塔龟和去咬一口的龟。玛塔龟头突然张开一吸，鱼才进来。",
    task: "点两张不一样的卡，说出谁更像会吸的玛塔龟。"
  }  ,
  {
    id: "games/headsuck-lab.html", file: "headsuck-lab.html", title: "吸头工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌀", ready: true,
    description: "同一只纸玛塔龟。头突然张开吸才吸得进；去咬一口鱼就跑了。",
    task: "试一次吸和一次去咬，比较谁吸得进。"
  }
  ,
  {
    id: "nature/gars.html", file: "gars.html", title: "雀鳝观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较雀鳝和短嘴的鱼。雀鳝嘴又细又长，夹住才夹得住鱼。",
    task: "点两张不一样的卡，说出谁更像长嘴的雀鳝。"
  }  ,
  {
    id: "games/longjaw-lab.html", file: "longjaw-lab.html", title: "长嘴工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📏", ready: true,
    description: "同一只纸雀鳝。长嘴夹住才夹得住；短嘴去咬会咬空。",
    task: "试一次长夹和一次短咬，比较谁夹得住。"
  }
  ,
  {
    id: "nature/addax.html", file: "addax.html", title: "旋角羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较旋角羚和蹄子窄窄的羚。旋角羚蹄子又宽又平，沙子上才陷不下去。",
    task: "点两张不一样的卡，说出谁更像宽蹄的旋角羚。"
  }  ,
  {
    id: "games/widehoof-lab.html", file: "widehoof-lab.html", title: "宽蹄工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸旋角羚。宽蹄走沙才陷不下去；窄蹄就陷进去。",
    task: "试一次宽蹄和一次窄蹄，比较谁陷不下去。"
  }
  ,
  {
    id: "nature/pythons.html", file: "pythons.html", title: "蟒观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐍", ready: true,
    description: "比较蟒和只咬一口的蛇。蟒用身子一圈圈缠紧，对方才动不了。",
    task: "点两张不一样的卡，说出谁更像会缠的蟒。"
  }  ,
  {
    id: "games/wrapstill-lab.html", file: "wrapstill-lab.html", title: "缠绕工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "同一只纸蟒。身子缠紧对方才动不了；只咬一口会滑掉。",
    task: "试一次缠紧和一次去咬，比较谁动不了。"
  }
  ,
  {
    id: "nature/kookaburras.html", file: "kookaburras.html", title: "笑翠鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较笑翠鸟和一只自己叫的鸟。一家笑翠鸟一起叫，领地才守得住。",
    task: "点两张不一样的卡，说出谁更像会齐叫的笑翠鸟。"
  }  ,
  {
    id: "games/laugh-lab.html", file: "laugh-lab.html", title: "齐笑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "😂", ready: true,
    description: "同一家纸笑翠鸟。一家一起叫才守得住；一只自己叫对面不理。",
    task: "试一次齐叫和一次单叫，比较谁守得住。"
  }
  ,
  {
    id: "nature/snapping-turtles.html", file: "snapping-turtles.html", title: "鳄龟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐢", ready: true,
    description: "比较鳄龟和舌头停着的龟。鳄龟舌头上那条粉虫子晃，鱼才游过来。",
    task: "点两张不一样的卡，说出谁更像会晃舌虫的鳄龟。"
  }  ,
  {
    id: "games/wormtongue-lab.html", file: "wormtongue-lab.html", title: "舌虫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪱", ready: true,
    description: "同一只纸鳄龟。舌虫晃着鱼才游过来；舌头停着就等不来。",
    task: "试一次晃虫和一次停着，比较谁等得到。"
  }
  ,
  {
    id: "nature/sugar-gliders.html", file: "sugar-gliders.html", title: "蜜袋鼯观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐿️", ready: true,
    description: "比较蜜袋鼯和皮收着的动物。蜜袋鼯把身侧那层皮张开才滑得远。",
    task: "点两张不一样的卡，说出谁更像会滑的蜜袋鼯。"
  }  ,
  {
    id: "games/sugarglide-lab.html", file: "sugarglide-lab.html", title: "皮膜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪁", ready: true,
    description: "同一只纸蜜袋鼯。皮膜张开才滑得远；皮收着就掉下去。",
    task: "试一次张开和一次收着，比较谁滑得远。"
  }
  ,
  {
    id: "nature/bighorns.html", file: "bighorns.html", title: "大角羊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐏", ready: true,
    description: "比较大角羊和头去撞的羊。大角羊两只角撞在一起，力才散得开。",
    task: "点两张不一样的卡，说出谁更像会撞角的大角羊。"
  }  ,
  {
    id: "games/hornclash-lab.html", file: "hornclash-lab.html", title: "撞角工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💥", ready: true,
    description: "同一只纸大角羊。两角撞上力才散得开；头去撞会晕。",
    task: "试一次撞角和一次撞头，比较谁力散得开。"
  }
  ,
  {
    id: "nature/swordfish.html", file: "swordfish.html", title: "剑鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🗡️", ready: true,
    description: "比较剑鱼和用嘴去咬的鱼。剑鱼扁平的长剑先劈开，鱼群才散开。",
    task: "点两张不一样的卡，说出谁更像会劈的剑鱼。"
  }  ,
  {
    id: "games/swordbill-lab.html", file: "swordbill-lab.html", title: "剑吻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚔️", ready: true,
    description: "同一只纸剑鱼。长剑先劈开鱼群才散开；用嘴去咬会扑空。",
    task: "试一次劈开和一次去咬，比较谁散得开。"
  }
  ,
  {
    id: "nature/tarpons.html", file: "tarpons.html", title: "大海鲢观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较大海鲢和一直沉着的鱼。大海鲢滚出水面吸一口空气才喘得过。",
    task: "点两张不一样的卡，说出谁更像会翻出水面的大海鲢。"
  }  ,
  {
    id: "games/surfroll-lab.html", file: "surfroll-lab.html", title: "翻水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔄", ready: true,
    description: "同一只纸大海鲢。滚出水面吸气才喘得过；一直沉着会闷着。",
    task: "试一次翻出和一次沉着，比较谁喘得过。"
  }
  ,
  {
    id: "nature/stag-beetles.html", file: "stag-beetles.html", title: "锹甲观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较锹甲和头去撞的甲虫。锹甲两片大颚顶住，才把对方推开。",
    task: "点两张不一样的卡，说出谁更像有大颚的锹甲。"
  }  ,
  {
    id: "games/jawwrestle-lab.html", file: "jawwrestle-lab.html", title: "大颚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦌", ready: true,
    description: "同一只纸锹甲。大颚顶住才推得开；头去撞自己会摔倒。",
    task: "试一次顶颚和一次撞头，比较谁推得开。"
  }
  ,
  {
    id: "nature/centipedes.html", file: "centipedes.html", title: "蜈蚣观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐛", ready: true,
    description: "比较蜈蚣和后面的脚去踩的虫。蜈蚣最前面那一对脚变成牙，才抓得住。",
    task: "点两张不一样的卡，说出谁更像有毒颚的蜈蚣。"
  }  ,
  {
    id: "games/forcipule-lab.html", file: "forcipule-lab.html", title: "毒颚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸蜈蚣。第一对脚当牙才抓得住；后面的脚去踩会踩空。",
    task: "试一次毒颚和一次后脚，比较谁抓得住。"
  }
  ,
  {
    id: "nature/weevils.html", file: "weevils.html", title: "象甲观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较象甲和用牙咬一口的甲虫。象甲长吻钻进去，才钻得进籽。",
    task: "点两张不一样的卡，说出谁更像会长吻的象甲。"
  }  ,
  {
    id: "games/drillseed-lab.html", file: "drillseed-lab.html", title: "钻籽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌰", ready: true,
    description: "同一只纸象甲。长吻钻进去才钻得进；用牙咬一口会咬滑。",
    task: "试一次钻吻和一次咬一口，比较谁钻得进。"
  }
  ,
  {
    id: "nature/glowworms.html", file: "glowworms.html", title: "发光虫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "✨", ready: true,
    description: "比较发光虫和飞着亮的萤火虫。发光虫吊在洞顶的丝上亮着，飞虫才自己来。",
    task: "点两张不一样的卡，说出谁更像会吊光的发光虫。"
  }  ,
  {
    id: "games/ceilglow-lab.html", file: "ceilglow-lab.html", title: "吊光工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧵", ready: true,
    description: "同一只纸发光虫。丝上亮着飞虫才自己来；灯关着就没人来。",
    task: "试一次亮着和一次关着，比较谁引得来。"
  }
  ,
  {
    id: "nature/chinchillas.html", file: "chinchillas.html", title: "龙猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐭", ready: true,
    description: "比较龙猫和毛湿着不滚的动物。龙猫在细灰里打滚，毛才干得快。",
    task: "点两张不一样的卡，说出谁更像会滚灰的龙猫。"
  }  ,
  {
    id: "games/dustroll-lab.html", file: "dustroll-lab.html", title: "滚灰工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌫️", ready: true,
    description: "同一只纸龙猫。在灰里打滚毛才干得快；毛湿着不滚会粘着。",
    task: "试一次滚灰和一次湿着，比较谁干得快。"
  }
  ,
  {
    id: "nature/bichirs.html", file: "bichirs.html", title: "多鳍鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较多鳍鱼和只靠鳃的鱼。多鳍鱼把头伸出水面，喷孔吸一口空气才喘得过。",
    task: "点两张不一样的卡，说出谁更像会喷孔吸气的多鳍鱼。"
  }  ,
  {
    id: "games/spiracle-lab.html", file: "spiracle-lab.html", title: "喷孔工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💨", ready: true,
    description: "同一只纸多鳍鱼。喷孔吸气才喘得过；只靠鳃会闷着。",
    task: "试一次喷孔和一次靠鳃，比较谁喘得过。"
  }
  ,
  {
    id: "nature/quetzals.html", file: "quetzals.html", title: "凤尾绿咬鹃观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较凤尾绿咬鹃和尾巴卷着的鸟。凤尾绿咬鹃尾巴又长又弯，飞的时候才看得见信号。",
    task: "点两张不一样的卡，说出谁更像长尾的凤尾绿咬鹃。"
  }  ,
  {
    id: "games/tailtrain-lab.html", file: "tailtrain-lab.html", title: "尾帘工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎀", ready: true,
    description: "同一只纸凤尾绿咬鹃。长尾展开飞才看得见；尾巴卷着就认不出。",
    task: "试一次展尾和一次卷着，比较谁看得见。"
  }
  ,
  {
    id: "games/dustbath-lab.html", file: "dustbath-lab.html", title: "滚灰工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌫️", ready: true,
    description: "同一只纸龙猫。灰里打个滚毛才干松；水一浇就贴成缕。",
    task: "试一次滚灰和一次浇水，比较谁毛干松。"
  }
  ,
  {
    id: "nature/marlins.html", file: "marlins.html", title: "枪鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较枪鱼和用嘴去咬的鱼。枪鱼用长吻把鱼群打散才吃得到。",
    task: "点两张不一样的卡，说出谁更像会长吻的枪鱼。"
  }  ,
  {
    id: "games/rostrum-lab.html", file: "rostrum-lab.html", title: "吻枪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🗡️", ready: true,
    description: "同一只纸枪鱼。长吻打散才吃得到；用嘴去咬会扑空。",
    task: "试一次打散和一次去咬，比较谁吃得到。"
  }
  ,
  {
    id: "nature/caracaras.html", file: "caracaras.html", title: "卡拉卡拉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦅", ready: true,
    description: "比较卡拉卡拉和停在天上盯的鸟。卡拉卡拉在地上走着找，才找得到腐肉。",
    task: "点两张不一样的卡，说出谁更像会走着找的卡拉卡拉。"
  }  ,
  {
    id: "games/walkhunt-lab.html", file: "walkhunt-lab.html", title: "走猎工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🚶", ready: true,
    description: "同一只纸卡拉卡拉。地上走着找才找得到；停在天上盯会错过。",
    task: "试一次走找和一次天盯，比较谁找得到。"
  }
  ,
  {
    id: "nature/pikes.html", file: "pikes.html", title: "狗鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较狗鱼和自己去追的鱼。狗鱼身子笔直躺在水草里等，鱼游近才冲得出去。",
    task: "点两张不一样的卡，说出谁更像会躺等的狗鱼。"
  }  ,
  {
    id: "games/liewait-lab.html", file: "liewait-lab.html", title: "躺等工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸狗鱼。躺着等才冲得出去；自己去追会把水搅浑。",
    task: "试一次躺等和一次去追，比较谁冲得出去。"
  }
  ,
  {
    id: "nature/olm.html", file: "olm.html", title: "洞螈观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较洞螈和靠眼睛看的螈。洞螈靠皮肤和水里的振动才找得到路。",
    task: "点两张不一样的卡，说出谁更像会听皮肤的洞螈。"
  }  ,
  {
    id: "games/cavesense-lab.html", file: "cavesense-lab.html", title: "盲感工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一只纸洞螈。皮肤听振动才找得到路；靠眼睛看会撞墙。",
    task: "试一次盲感和一次眼看，比较谁找得到。"
  }
  ,
  {
    id: "nature/millipedes.html", file: "millipedes.html", title: "马陆观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐛", ready: true,
    description: "比较马陆和身子摊开的虫。马陆身子卷成球，甲才挡得住。",
    task: "点两张不一样的卡，说出谁更像会卷球的马陆。"
  }  ,
  {
    id: "games/coilplate-lab.html", file: "coilplate-lab.html", title: "卷甲工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🛡️", ready: true,
    description: "同一只纸马陆。身子卷成球才挡得住；身子摊开会被啄到。",
    task: "试一次卷起和一次摊开，比较谁挡得住。"
  }
  ,
  {
    id: "nature/diving-beetles.html", file: "diving-beetles.html", title: "龙虱观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较龙虱和气泡放掉的甲虫。龙虱屁股带着气泡，才在水下喘得过。",
    task: "点两张不一样的卡，说出谁更像带气泡的龙虱。"
  }  ,
  {
    id: "games/underair-lab.html", file: "underair-lab.html", title: "水下气工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫧", ready: true,
    description: "同一只纸龙虱。屁股带气泡才喘得过；气泡放掉会闷着。",
    task: "试一次带气和一次放掉，比较谁喘得过。"
  }
  ,
  {
    id: "nature/bowfins.html", file: "bowfins.html", title: "弓鳍鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐟", ready: true,
    description: "比较弓鳍鱼和只靠鳃的鱼。弓鳍鱼把鳔当肺吸气，浑水里才喘得过。",
    task: "点两张不一样的卡，说出谁更像会用鳔的弓鳍鱼。"
  }  ,
  {
    id: "games/lungpouch-lab.html", file: "lungpouch-lab.html", title: "气囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫁", ready: true,
    description: "同一只纸弓鳍鱼。鳔当肺吸气才喘得过；只靠鳃会闷着。",
    task: "试一次气囊和一次靠鳃，比较谁喘得过。"
  }
  ,
  {
    id: "nature/trapdoor-spiders.html", file: "trapdoor-spiders.html", title: "活板门蛛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕷️", ready: true,
    description: "比较活板门蛛和盖子大开的蛛。活板门蛛把盖子虚掩着等，才扑得到。",
    task: "点两张不一样的卡，说出谁更像会掩门的活板门蛛。"
  }  ,
  {
    id: "games/lidwait-lab.html", file: "lidwait-lab.html", title: "盖门工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🚪", ready: true,
    description: "同一只纸活板门蛛。盖子虚掩等才扑得到；盖子大开会被看见。",
    task: "试一次虚掩和一次大开，比较谁扑得到。"
  }
  ,
  {
    id: "nature/pillbugs.html", file: "pillbugs.html", title: "鼠妇观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪨", ready: true,
    description: "比较鼠妇和身子摊开的虫。鼠妇卷成小球，才啄不动。",
    task: "点两张不一样的卡，说出谁更像会卷球的鼠妇。"
  }  ,
  {
    id: "games/pillroll-lab.html", file: "pillroll-lab.html", title: "滚球工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚪", ready: true,
    description: "同一只纸鼠妇。卷成小球才啄不动；身子摊开会被啄到。",
    task: "试一次卷球和一次摊开，比较谁啄不动。"
  }
  ,
  {
    id: "nature/sponges.html", file: "sponges.html", title: "海绵观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🧽", ready: true,
    description: "比较海绵和孔堵住的块。海绵小孔吸水、大孔喷出去，才滤得到吃的。",
    task: "点两张不一样的卡，说出谁更像会泵水的海绵。"
  }  ,
  {
    id: "games/porepump-lab.html", file: "porepump-lab.html", title: "泵孔工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一块纸海绵。小孔吸大孔喷才滤得到；孔堵住会饿着。",
    task: "试一次泵水和一次堵住，比较谁滤得到。"
  }
  ,
  {
    id: "nature/comb-jellies.html", file: "comb-jellies.html", title: "栉水母观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪼", ready: true,
    description: "比较栉水母和身子乱抖的胶。栉水母八排栉条划水，才游得动。",
    task: "点两张不一样的卡，说出谁更像会划栉的栉水母。"
  }  ,
  {
    id: "games/rowcomb-lab.html", file: "rowcomb-lab.html", title: "栉条工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌈", ready: true,
    description: "同一只纸栉水母。栉条划水才游得动；身子乱抖会原地转。",
    task: "试一次划栉和一次乱抖，比较谁游得动。"
  }
  ,
  {
    id: "nature/bromeliads.html", file: "bromeliads.html", title: "凤梨科观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌿", ready: true,
    description: "比较凤梨科和叶子摊开的植物。凤梨科叶子抱成小池，才存得住水。",
    task: "点两张不一样的卡，说出谁更像会存水的凤梨科。"
  }  ,
  {
    id: "games/tankwater-lab.html", file: "tankwater-lab.html", title: "叶池工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥣", ready: true,
    description: "同一株纸凤梨科。叶子抱成小池才存得住；叶子摊开水流走。",
    task: "试一次抱池和一次摊开，比较谁存得住。"
  }
  ,
  {
    id: "nature/assassin-bugs.html", file: "assassin-bugs.html", title: "猎蝽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较猎蝽和用牙咬一口的虫。猎蝽把喙扎进去吸，才吸得到。",
    task: "点两张不一样的卡，说出谁更像会扎喙的猎蝽。"
  }  ,
  {
    id: "games/beakstab-lab.html", file: "beakstab-lab.html", title: "喙刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💉", ready: true,
    description: "同一只纸猎蝽。喙扎进去吸才吸得到；用牙咬一口会咬滑。",
    task: "试一次扎喙和一次咬一口，比较谁吸得到。"
  }
  ,
  {
    id: "nature/backswimmers.html", file: "backswimmers.html", title: "仰泳蝽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐛", ready: true,
    description: "比较仰泳蝽和背朝上划的虫。仰泳蝽肚皮朝上划，才划得快。",
    task: "点两张不一样的卡，说出谁更像会仰划的仰泳蝽。"
  }  ,
  {
    id: "games/bellyup-lab.html", file: "bellyup-lab.html", title: "仰划工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔄", ready: true,
    description: "同一只纸仰泳蝽。肚皮朝上划才划得快；背朝上划会划不动。",
    task: "试一次仰划和一次俯划，比较谁划得快。"
  }
  ,
  {
    id: "nature/decorator-crabs.html", file: "decorator-crabs.html", title: "装饰蟹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦀", ready: true,
    description: "比较装饰蟹和背上光光的蟹。装饰蟹把海藻海绵贴在背上，才认不出来。",
    task: "点两张不一样的卡，说出谁更像会装饰的蟹。"
  }  ,
  {
    id: "games/decoback-lab.html", file: "decoback-lab.html", title: "背上工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸装饰蟹。背上贴海藻才认不出；背上光光一下子被看见。",
    task: "试一次贴上和一次光背，比较谁认不出。"
  }
  ,
  {
    id: "nature/rafflesias.html", file: "rafflesias.html", title: "大花草观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌺", ready: true,
    description: "比较大花草和花心没味的花。大花草花心发出腐臭，苍蝇才自己来。",
    task: "点两张不一样的卡，说出谁更像会发臭的大花草。"
  }  ,
  {
    id: "games/flystink-lab.html", file: "flystink-lab.html", title: "腐臭工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪰", ready: true,
    description: "同一朵纸大花草。花心发出腐臭才引得来；花心没味就没人来。",
    task: "试一次发臭和一次没味，比较谁引得来。"
  }
  ,
  {
    id: "nature/welwitschia.html", file: "welwitschia.html", title: "百岁兰观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌿", ready: true,
    description: "比较百岁兰和叶子一片片掉的植物。百岁兰一辈子就两片叶子一直长，才一直遮得住。",
    task: "点两张不一样的卡，说出谁更像两叶的百岁兰。"
  }  ,
  {
    id: "games/twoleaf-lab.html", file: "twoleaf-lab.html", title: "两叶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍃", ready: true,
    description: "同一株纸百岁兰。就两片叶子一直长才遮得住；叶子一片片掉会晒干。",
    task: "试一次两叶和一次掉叶，比较谁遮得住。"
  }
  ,
  {
    id: "nature/baobabs.html", file: "baobabs.html", title: "猴面包树观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌳", ready: true,
    description: "比较猴面包树和树干细细的树。猴面包树树干又肥又能存水，旱季才撑得住。",
    task: "点两张不一样的卡，说出谁更像肥干的猴面包树。"
  }  ,
  {
    id: "games/fatstore-lab.html", file: "fatstore-lab.html", title: "肥干工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一棵纸猴面包树。树干存着水才撑得住；树干细细的撑不住。",
    task: "试一次肥干和一次细干，比较谁撑得住。"
  }
  ,
  {
    id: "nature/christmas-tree-worms.html", file: "christmas-tree-worms.html", title: "圣诞树虫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🎄", ready: true,
    description: "比较圣诞树虫和树留在外面的虫。圣诞树虫两棵树一缩进管子，才躲得过。",
    task: "点两张不一样的卡，说出谁更像会缩的圣诞树虫。"
  }  ,
  {
    id: "games/doubletree-lab.html", file: "doubletree-lab.html", title: "双树工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕳️", ready: true,
    description: "同一只纸圣诞树虫。两棵树一缩进管才躲得过；树留在外面会被咬到。",
    task: "试一次缩进和一次留着，比较谁躲得过。"
  }
  ,
  {
    id: "nature/sequoias.html", file: "sequoias.html", title: "巨杉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌲", ready: true,
    description: "比较巨杉和只靠根吸的树。巨杉叶子从雾里接水，树顶才喝得到。",
    task: "点两张不一样的卡，说出谁更像会接雾的巨杉。"
  }  ,
  {
    id: "games/tallxylem-lab.html", file: "tallxylem-lab.html", title: "雾水工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌫️", ready: true,
    description: "同一棵纸巨杉。叶子从雾里接水树顶才喝得到；只靠根吸到不了那么高。",
    task: "试一次接雾和一次只靠根，比较谁喝得到。"
  }
  ,
  {
    id: "nature/spadefoot-toads.html", file: "spadefoot-toads.html", title: "锄足蟾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐸", ready: true,
    description: "比较锄足蟾和天干着出来的蟾。锄足蟾下雨才从沙里出来产卵，小蝌蚪才赶得及。",
    task: "点两张不一样的卡，说出谁更像会等雨的锄足蟾。"
  }  ,
  {
    id: "games/rainburst-lab.html", file: "rainburst-lab.html", title: "雨出工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌧️", ready: true,
    description: "同一只纸锄足蟾。下雨才出来才赶得及；天干着出来会干死。",
    task: "试一次雨出和一次干出，比较谁赶得及。"
  }
  ,
  {
    id: "nature/brittlestars.html", file: "brittlestars.html", title: "蛇尾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "⭐", ready: true,
    description: "比较蛇尾和腕连着不放的星。蛇尾被抓住时先丢掉那条腕才逃得掉。",
    task: "点两张不一样的卡，说出谁更像会丢腕的蛇尾。"
  }  ,
  {
    id: "games/armdrop-lab.html", file: "armdrop-lab.html", title: "丢腕工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✂️", ready: true,
    description: "同一只纸蛇尾。丢掉那条腕才逃得掉；腕连着不放会被拖走。",
    task: "试一次丢腕和一次连着，比较谁逃得掉。"
  }
  ,
  {
    id: "nature/lobsters.html", file: "lobsters.html", title: "龙虾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦞", ready: true,
    description: "比较龙虾和尾巴不弹的蟹。龙虾尾巴往下一弹才倒着逃得开。",
    task: "点两张不一样的卡，说出谁更像会弹尾的龙虾。"
  }  ,
  {
    id: "games/kicktail-lab.html", file: "kicktail-lab.html", title: "弹尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "↩️", ready: true,
    description: "同一只纸龙虾。尾巴往下一弹才逃得开；尾巴不弹就逃不掉。",
    task: "试一次弹尾和一次不弹，比较谁逃得开。"
  }
  ,
  {
    id: "nature/orchid-mantises.html", file: "orchid-mantises.html", title: "兰花螳螂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌸", ready: true,
    description: "比较兰花螳螂和腿收着的螳螂。兰花螳螂把腿展成花瓣才等得到。",
    task: "点两张不一样的卡，说出谁更像花瓣的兰花螳螂。"
  }  ,
  {
    id: "games/petalwait-lab.html", file: "petalwait-lab.html", title: "花瓣工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪴", ready: true,
    description: "同一只纸兰花螳螂。腿展成花瓣才等得到；腿收着像虫子会被看见。",
    task: "试一次展瓣和一次收着，比较谁等得到。"
  }
  ,
  {
    id: "nature/box-jellies.html", file: "box-jellies.html", title: "箱水母观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪼", ready: true,
    description: "比较箱水母和圆伞乱漂的。箱水母方伞四角垂须，才游得准去扎。",
    task: "点两张不一样的卡，说出谁更像方伞四角垂须的箱水母。"
  }
  ,
  {
    id: "games/cubesting-lab.html", file: "cubesting-lab.html", title: "方伞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "◻️", ready: true,
    description: "同一只纸箱水母。方伞四角垂须才游得准去扎；圆伞乱漂就扎不准。",
    task: "试一次方伞和一次圆伞，比较谁游得准。"
  }
  ,
  {
    id: "nature/hellbenders.html", file: "hellbenders.html", title: "大鲵观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦎", ready: true,
    description: "比较大鲵和皮肤光滑的螈。大鲵皮肤皱皱的、水流过才喘得过。",
    task: "点两张不一样的卡，说出谁更像皱皮的大鲵。"
  }  ,
  {
    id: "games/wrinkleskin-lab.html", file: "wrinkleskin-lab.html", title: "皱皮工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸大鲵。皮肤皱皱的水流过才喘得过；皮肤光滑就闷着。",
    task: "试一次皱皮和一次光滑，比较谁喘得过。"
  }
  ,
  {
    id: "nature/titan-arums.html", file: "titan-arums.html", title: "巨花魔芋观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌺", ready: true,
    description: "比较巨花魔芋和花心凉着的花。巨花魔芋花心先热起来，臭味才散得远。",
    task: "点两张不一样的卡，说出谁更像会发热的巨花魔芋。"
  }  ,
  {
    id: "games/giantbloom-lab.html", file: "giantbloom-lab.html", title: "热臭工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "♨️", ready: true,
    description: "同一株纸巨花魔芋。花心先热起来臭味才散得远；花心凉着虫子闻不到。",
    task: "试一次热心和一次凉心，比较谁散得远。"
  }
  ,
  {
    id: "nature/jumping-spiders.html", file: "jumping-spiders.html", title: "跳蛛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🕷️", ready: true,
    description: "比较跳蛛和闭着眼乱跳的蛛。跳蛛先用两只大眼测距再跳，才跳得准。",
    task: "点两张不一样的卡，说出谁更像会测距的跳蛛。"
  }  ,
  {
    id: "games/pouncejump-lab.html", file: "pouncejump-lab.html", title: "测距工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📏", ready: true,
    description: "同一只纸跳蛛。先测距再跳才跳得准；闭着眼乱跳会跳空。",
    task: "试一次测距和一次乱跳，比较谁跳得准。"
  }
  ,
  {
    id: "nature/man-of-war.html", file: "man-of-war.html", title: "僧帽水母观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "⛵", ready: true,
    description: "比较僧帽水母和气囊瘪了的漂浮物。僧帽水母上面那个气囊鼓着才漂在面上。",
    task: "点两张不一样的卡，说出谁更像鼓囊的僧帽水母。"
  }  ,
  {
    id: "games/gasfloat-lab.html", file: "gasfloat-lab.html", title: "气囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎈", ready: true,
    description: "同一只纸僧帽水母。气囊鼓着才漂在面上；气囊瘪了就沉。",
    task: "试一次鼓囊和一次瘪囊，比较谁漂得住。"
  }
  ,
  {
    id: "nature/resurrection-plants.html", file: "resurrection-plants.html", title: "复苏卷柏观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌿", ready: true,
    description: "比较复苏卷柏和一直卷着的植物。复苏卷柏一浇水叶子打开，又能做糖。",
    task: "点两张不一样的卡，说出谁更像会回潮的复苏卷柏。"
  }  ,
  {
    id: "games/rehydrate-lab.html", file: "rehydrate-lab.html", title: "回潮工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💧", ready: true,
    description: "同一株纸复苏卷柏。一浇水叶子打开才又能做糖；一直卷着就停着。",
    task: "试一次浇水和一次干着，比较谁又能做糖。"
  }
  ,
  {
    id: "nature/strangler-figs.html", file: "strangler-figs.html", title: "绞杀榕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🌳", ready: true,
    description: "比较绞杀榕和气根垂着的树。绞杀榕气根围成筒，才自己站得住。",
    task: "点两张不一样的卡，说出谁更像会围筒的绞杀榕。"
  }  ,
  {
    id: "games/figstrangle-lab.html", file: "figstrangle-lab.html", title: "绞干工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "同一棵纸绞杀榕。气根围成筒才自己站得住；气根垂着不围就还靠别人。",
    task: "试一次围筒和一次垂着，比较谁站得住。"
  }
  ,
  {
    id: "nature/lichens.html", file: "lichens.html", title: "地衣观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪨", ready: true,
    description: "比较地衣和只有一边的壳。地衣是真菌和藻类在一起，石头上也能活。",
    task: "点两张不一样的卡，说出谁更像共生的地衣。"
  }  ,
  {
    id: "games/twolife-lab.html", file: "twolife-lab.html", title: "共生工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🤝", ready: true,
    description: "同一块纸地衣。菌和藻在一起才活得成；只有一边就活不成。",
    task: "试一次在一起和一次分开，比较谁活得成。"
  }
  ,
  {
    id: "nature/earwigs.html", file: "earwigs.html", title: "蠼螋观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较蠼螋和尾钳垂着的虫。蠼螋尾巴那对钳子张开护着，才挡得住。",
    task: "点两张不一样的卡，说出谁更像会张钳的蠼螋。"
  }  ,
  {
    id: "games/pincertail-lab.html", file: "pincertail-lab.html", title: "尾钳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✂️", ready: true,
    description: "同一只纸蠼螋。尾钳张开护着才挡得住；尾钳垂着会被啄到。",
    task: "试一次张开和一次垂着，比较谁挡得住。"
  }
  ,
  {
    id: "nature/katydids.html", file: "katydids.html", title: "螽斯观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦗", ready: true,
    description: "比较螽斯和翅膀不动的虫。螽斯翅膀摩擦出声，对面才听得见。",
    task: "点两张不一样的卡，说出谁更像会唱歌的螽斯。"
  }  ,
  {
    id: "games/leafsong-lab.html", file: "leafsong-lab.html", title: "叶歌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎵", ready: true,
    description: "同一只纸螽斯。翅膀摩擦出声才听得见；翅膀不动就没声。",
    task: "试一次摩擦和一次不动，比较谁听得见。"
  }
  ,
  {
    id: "nature/treehoppers.html", file: "treehoppers.html", title: "角蝉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较角蝉和背上光光的蝉。角蝉背上那块长得像刺，才认成刺。",
    task: "点两张不一样的卡，说出谁更像背上有刺的角蝉。"
  }  ,
  {
    id: "games/thornfake-lab.html", file: "thornfake-lab.html", title: "假刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌵", ready: true,
    description: "同一只纸角蝉。背上那块像刺才认成刺；背上光光会被看见。",
    task: "试一次像刺和一次光背，比较谁认成刺。"
  }
  ,
  {
    id: "nature/vampire-squid.html", file: "vampire-squid.html", title: "幽灵蛸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦑", ready: true,
    description: "比较幽灵蛸和整身乱喷的鱿。幽灵蛸头上那对耳鳍轻轻划，才省力游。",
    task: "点两张不一样的卡，说出谁更像会划耳鳍的幽灵蛸。"
  }  ,
  {
    id: "games/earfins-lab.html", file: "earfins-lab.html", title: "耳鳍工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一只纸幽灵蛸。耳鳍轻轻划才省力游；整身乱喷会累着。",
    task: "试一次耳鳍和一次乱喷，比较谁省力。"
  }
  ,
  {
    id: "nature/dumbo-octopuses.html", file: "dumbo-octopuses.html", title: "小飞象章鱼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐙", ready: true,
    description: "比较小飞象章鱼和腕去划的章鱼。小飞象章鱼耳鳍上下扇，才游得稳。",
    task: "点两张不一样的卡，说出谁更像会扇耳的小飞象章鱼。"
  }  ,
  {
    id: "games/earswim-lab.html", file: "earswim-lab.html", title: "耳游工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一只纸小飞象章鱼。耳鳍上下扇才游得稳；腕去划会翻来翻去。",
    task: "试一次扇耳和一次腕划，比较谁游得稳。"
  }
  ,
  {
    id: "nature/honeypot-ants.html", file: "honeypot-ants.html", title: "蜜罐蚁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐜", ready: true,
    description: "比较蜜罐蚁和肚子瘪着的蚁。蜜罐蚁有的工蚁肚子胀成蜜罐，旱季同伴才舔得到。",
    task: "点两张不一样的卡，说出谁更像胀肚子的蜜罐蚁。"
  }  ,
  {
    id: "games/honeygut-lab.html", file: "honeygut-lab.html", title: "蜜腹工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍯", ready: true,
    description: "同一只纸蜜罐蚁。肚子胀成蜜罐才存得住；肚子瘪着就没得存。",
    task: "试一次胀腹和一次瘪腹，比较谁存得住。"
  }
  ,
  {
    id: "nature/water-scorpions.html", file: "water-scorpions.html", title: "水蝎观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦂", ready: true,
    description: "比较水蝎和管子缩着的。水蝎把尾巴管子伸出水面，才喘得过。",
    task: "点两张不一样的卡，说出谁更像会把尾管伸出水面的水蝎。"
  }
  ,
  {
    id: "games/tailsiphon-lab.html", file: "tailsiphon-lab.html", title: "尾管工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥤", ready: true,
    description: "同一只纸水蝎。尾巴管子伸出水面才喘得过；管子缩着就闷着。",
    task: "试一次伸出和一次缩着，比较谁喘得过。"
  }
  ,
  {
    id: "nature/giant-tube-worms.html", file: "giant-tube-worms.html", title: "巨型管虫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪱", ready: true,
    description: "比较巨型管虫和管子里没有细菌的。管虫靠管内细菌把硫变成糖，才活得下去。",
    task: "点两张不一样的卡，说出谁更像管内有细菌的巨型管虫。"
  }
  ,
  {
    id: "games/nomouth-lab.html", file: "nomouth-lab.html", title: "无嘴工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧪", ready: true,
    description: "同一根纸管虫。管子里有细菌才把硫变成糖；没有细菌就饿着。",
    task: "试一次有细菌和一次没有，比较谁活得下去。"
  }
  ,
  {
    id: "nature/giant-water-bugs.html", file: "giant-water-bugs.html", title: "负子蝽观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪲", ready: true,
    description: "比较负子蝽和只抱着不扎的。负子蝽喙扎进再注入，猎物才软了。",
    task: "点两张不一样的卡，说出谁更像会扎进再注入的负子蝽。"
  }
  ,
  {
    id: "games/toeinject-lab.html", file: "toeinject-lab.html", title: "扎注工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💉", ready: true,
    description: "同一只纸负子蝽。喙扎进再注入才软了；只抱着不扎就挣开了。",
    task: "试一次扎注和一次只抱，比较谁软了。"
  }
  ,
  {
    id: "nature/jerboas.html", file: "jerboas.html", title: "跳鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐭", ready: true,
    description: "比较跳鼠和四脚跑的。跳鼠后腿一下蹦出去，才逃得掉。",
    task: "点两张不一样的卡，说出谁更像后腿一下蹦的跳鼠。"
  }
  ,
  {
    id: "games/nightbound-lab.html", file: "nightbound-lab.html", title: "夜蹦工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌙", ready: true,
    description: "同一只纸跳鼠。后腿一下蹦出去才逃得掉；四脚跑就给抓住。",
    task: "试一次后腿蹦和一次四脚跑，比较谁逃得掉。"
  }
  ,
  {
    id: "nature/naked-mole-rats.html", file: "naked-mole-rats.html", title: "裸鼹鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐀", ready: true,
    description: "比较裸鼹鼠和牙在嘴里的。裸鼹鼠门牙在嘴唇外面，才不会把土吃进去。",
    task: "点两张不一样的卡，说出谁更像门牙露在唇外的裸鼹鼠。"
  }
  ,
  {
    id: "games/incisordig-lab.html", file: "incisordig-lab.html", title: "门牙挖工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸裸鼹鼠。门牙在嘴唇外面才不会把土吃进去；牙在嘴里就塞满土。",
    task: "试一次牙在唇外和一次牙在嘴里，比较谁不吃土。"
  }
  ,
  {
    id: "nature/slime-molds.html", file: "slime-molds.html", title: "黏菌观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🟡", ready: true,
    description: "比较黏菌和分成小点的。黏菌连成一片网，才找得到燕麦。",
    task: "点两张不一样的卡，说出谁更像连成网的黏菌。"
  }
  ,
  {
    id: "games/creepfan-lab.html", file: "creepfan-lab.html", title: "连网工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🕸️", ready: true,
    description: "同一摊纸黏菌。连成一片网才找得到燕麦；分成小点就找不到。",
    task: "试一次连网和一次分点，比较谁找得到。"
  }
  ,
  {
    id: "nature/saiga.html", file: "saiga.html", title: "赛加羚羊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较赛加羚羊和鼻子扁扁的。赛加羚羊鼻子鼓成口袋，才滤得了沙。",
    task: "点两张不一样的卡，说出谁更像鼓鼻的赛加羚羊。"
  }  ,
  {
    id: "games/nosefan-lab.html", file: "nosefan-lab.html", title: "鼓鼻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👃", ready: true,
    description: "同一只纸赛加羚羊。鼻子鼓成口袋才滤得了沙；鼻子扁扁的就呛着。",
    task: "试一次鼓鼻和一次扁鼻，比较谁滤得了沙。"
  }
  ,
  {
    id: "nature/markhor.html", file: "markhor.html", title: "马克霍尔羊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐐", ready: true,
    description: "比较马克霍尔羊和角直直的。马克霍尔羊角拧成螺旋，才顶得住。",
    task: "点两张不一样的卡，说出谁更像螺旋角的马克霍尔羊。"
  }  ,
  {
    id: "games/twisthorn-lab.html", file: "twisthorn-lab.html", title: "螺旋角工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌀", ready: true,
    description: "同一只纸马克霍尔羊。角拧成螺旋才顶得住；角直直的会滑开。",
    task: "试一次螺旋和一次直角，比较谁顶得住。"
  }
  ,
  {
    id: "nature/solenodons.html", file: "solenodons.html", title: "沟齿鼩观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦔", ready: true,
    description: "比较沟齿鼩和牙上没沟的。沟齿鼩牙上那道沟把毒送进去，猎物才软了。",
    task: "点两张不一样的卡，说出谁更像沟牙的沟齿鼩。"
  }  ,
  {
    id: "games/groovevenom-lab.html", file: "groovevenom-lab.html", title: "沟牙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸沟齿鼩。牙上那道沟把毒送进去才软了；牙上没沟就咬不住。",
    task: "试一次沟牙和一次没沟，比较谁软了。"
  }
  ,
  {
    id: "nature/sitatunga.html", file: "sitatunga.html", title: "林羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较林羚和蹄子并着的。林羚蹄子张开，才踩得住沼泽。",
    task: "点两张不一样的卡，说出谁更像张蹄的林羚。"
  }  ,
  {
    id: "games/swamptoe-lab.html", file: "swamptoe-lab.html", title: "张蹄工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸林羚。蹄子张开才踩得住沼泽；蹄子并着就陷下去。",
    task: "试一次张蹄和一次并蹄，比较谁踩得住。"
  }
  ,
  {
    id: "nature/chevrotains.html", file: "chevrotains.html", title: "鼷鹿观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较鼷鹿和没有长牙的。鼷鹿那对长牙戳出去，才挡住。",
    task: "点两张不一样的卡，说出谁更像有长牙的鼷鹿。"
  }  ,
  {
    id: "games/fangdeer-lab.html", file: "fangdeer-lab.html", title: "长牙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸鼷鹿。那对长牙戳出去才挡住；没有长牙会被咬。",
    task: "试一次长牙和一次没牙，比较谁挡住。"
  }
  ,
  {
    id: "nature/clouded-leopards.html", file: "clouded-leopards.html", title: "云豹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐆", ready: true,
    description: "比较云豹和嘴张不大的。云豹嘴张得特别大，才咬得动。",
    task: "点两张不一样的卡，说出谁更像大张口的云豹。"
  }  ,
  {
    id: "games/widegape-lab.html", file: "widegape-lab.html", title: "大张口工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "😮", ready: true,
    description: "同一只纸云豹。嘴张得特别大才咬得动；嘴张不大就咬不动。",
    task: "试一次大张和一次小张，比较谁咬得动。"
  }
  ,
  {
    id: "nature/klipspringers.html", file: "klipspringers.html", title: "岩羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐐", ready: true,
    description: "比较岩羚和蹄掌平放的。岩羚蹄尖立在石头上，才站得住。",
    task: "点两张不一样的卡，说出谁更像蹄尖立着的岩羚。"
  }  ,
  {
    id: "games/hoofpoint-lab.html", file: "hoofpoint-lab.html", title: "蹄尖工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸岩羚。蹄尖立在石头上才站得住；蹄掌平放会滑下去。",
    task: "试一次蹄尖和一次平放，比较谁站得住。"
  }
  ,
  {
    id: "nature/bobtail-squids.html", file: "bobtail-squids.html", title: "耳乌贼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦑", ready: true,
    description: "比较耳乌贼和灯关着的。耳乌贼肚子朝下发光，从下面看才跟月光一样。",
    task: "点两张不一样的卡，说出谁更像肚子朝下发光的耳乌贼。"
  }
  ,
  {
    id: "games/ventglow-lab.html", file: "ventglow-lab.html", title: "腹光工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💡", ready: true,
    description: "同一只纸耳乌贼。肚子朝下发光才从下面看跟月光一样；灯关着就会被看见。",
    task: "试一次腹光和一次关灯，比较谁从下面看不见。"
  }
  ,
  {
    id: "nature/cockroaches.html", file: "cockroaches.html", title: "蟑螂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🪳", ready: true,
    description: "比较蟑螂和尾须没了的。蟑螂尾须先感到风，才逃得掉。",
    task: "点两张不一样的卡，说出谁更像尾须先感风的蟑螂。"
  }
  ,
  {
    id: "games/feelair-lab.html", file: "feelair-lab.html", title: "感风工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💨", ready: true,
    description: "同一只纸蟑螂。尾须先感到风才逃得掉；尾须没了就给按住。",
    task: "试一次有尾须和一次没尾须，比较谁逃得掉。"
  }
  ,
  {
    id: "nature/fireworms.html", file: "fireworms.html", title: "火刺虫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🔥", ready: true,
    description: "比较火刺虫和刚毛躺着的。火刺虫刚毛竖起来，才扎得人。",
    task: "点两张不一样的卡，说出谁更像刚毛竖起来的火刺虫。"
  }
  ,
  {
    id: "games/bristleburn-lab.html", file: "bristleburn-lab.html", title: "刚毛工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📌", ready: true,
    description: "同一只纸火刺虫。刚毛竖起来才扎得人；躺着就扎不了。",
    task: "试一次竖毛和一次躺毛，比较谁扎得人。"
  }
  ,
  {
    id: "nature/kangaroo-rats.html", file: "kangaroo-rats.html", title: "袋鼠鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐹", ready: true,
    description: "比较袋鼠鼠和去找水坑的。袋鼠鼠靠种子里的水，才够用。",
    task: "点两张不一样的卡，说出谁更像靠干籽里的水的袋鼠鼠。"
  }
  ,
  {
    id: "games/dryseed-lab.html", file: "dryseed-lab.html", title: "干籽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌱", ready: true,
    description: "同一只纸袋鼠鼠。种子里的水才够用；去找水坑就会暴露。",
    task: "试一次吃干籽和一次找水坑，比较谁够用。"
  }
  ,
  {
    id: "nature/bongos.html", file: "bongos.html", title: "邦戈羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较邦戈羚和身上一块色的。邦戈羚身上白条跟着树影，才认成树。",
    task: "点两张不一样的卡，说出谁更像白条藏着的邦戈羚。"
  }  ,
  {
    id: "games/stripehide-lab.html", file: "stripehide-lab.html", title: "白条藏工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌲", ready: true,
    description: "同一只纸邦戈羚。身上白条跟着树影才认成树；身上一块色就被看见。",
    task: "试一次白条和一次一块色，比较谁认成树。"
  }
  ,
  {
    id: "nature/servals.html", file: "servals.html", title: "薮猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐱", ready: true,
    description: "比较薮猫和耳朵平贴的。薮猫耳朵上那撮毛竖着听，才听得到草里的。",
    task: "点两张不一样的卡，说出谁更像耳簇竖着的薮猫。"
  }  ,
  {
    id: "games/eartuft-lab.html", file: "eartuft-lab.html", title: "耳簇工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一只纸薮猫。耳朵上那撮毛竖着听才听得到；耳朵平贴就听不见。",
    task: "试一次耳簇和一次平耳，比较谁听得到。"
  }
  ,
  {
    id: "nature/takins.html", file: "takins.html", title: "羚牛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐮", ready: true,
    description: "比较羚牛和毛干干的。羚牛毛上那层油挡住雨，才淋不湿。",
    task: "点两张不一样的卡，说出谁更像油毛的羚牛。"
  }  ,
  {
    id: "games/oilwool-lab.html", file: "oilwool-lab.html", title: "油毛工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌧️", ready: true,
    description: "同一只纸羚牛。毛上那层油挡住雨才淋不湿；毛干干的就湿透。",
    task: "试一次油毛和一次干毛，比较谁淋不湿。"
  }
  ,
  {
    id: "nature/elands.html", file: "elands.html", title: "大羚羊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较大羚羊和角直着撞的。大羚羊角轻轻拧着碰上，才分得清谁大。",
    task: "点两张不一样的卡，说出谁更像拧角的大羚羊。"
  }  ,
  {
    id: "games/spiralhorn-lab.html", file: "spiralhorn-lab.html", title: "拧角工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌀", ready: true,
    description: "同一只纸大羚羊。角轻轻拧着碰上才分得清谁大；角直着撞会顶伤。",
    task: "试一次拧角和一次直撞，比较谁分得清。"
  }
  ,
  {
    id: "nature/jaguars.html", file: "jaguars.html", title: "美洲豹观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐆", ready: true,
    description: "比较美洲豹和身上光光的。美洲豹身上玫瑰斑藏在影里，才扑得到。",
    task: "点两张不一样的卡，说出谁更像玫瑰斑藏着的美洲豹。"
  }  ,
  {
    id: "games/rosettepounce-lab.html", file: "rosettepounce-lab.html", title: "玫瑰斑扑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌸", ready: true,
    description: "同一只纸美洲豹。身上玫瑰斑藏在影里才扑得到；身上光光的就被看见。",
    task: "试一次藏斑和一次光身，比较谁扑得到。"
  }
  ,
  {
    id: "nature/ocelots.html", file: "ocelots.html", title: "豹猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐱", ready: true,
    description: "比较豹猫和大白天跑的。豹猫黄昏才出来走，才不被看见。",
    task: "点两张不一样的卡，说出谁更像黄昏走的豹猫。"
  }  ,
  {
    id: "games/duskroam-lab.html", file: "duskroam-lab.html", title: "黄昏走工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌅", ready: true,
    description: "同一只纸豹猫。黄昏才出来走才不被看见；大白天跑就一下子被看见。",
    task: "试一次黄昏和一次白天，比较谁不被看见。"
  }
  ,
  {
    id: "nature/kudu.html", file: "kudu.html", title: "大羚牛观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较大捻角羚和脖子光光的。大捻角羚脖子那道白人字，对面才认得出自己人。",
    task: "点两张不一样的卡，说出谁更像有白人字的大捻角羚。"
  }  ,
  {
    id: "games/whitechevron-lab.html", file: "whitechevron-lab.html", title: "白人字工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🤍", ready: true,
    description: "同一只纸大捻角羚。脖子那道白人字让对面认出才认得出自己人；脖子光光的就认不出。",
    task: "试一次白人字和一次光脖，比较谁认得出。"
  }
  ,
  {
    id: "nature/caracals.html", file: "caracals.html", title: "狞猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐱", ready: true,
    description: "比较狞猫和耳尖光光的。狞猫耳尖那撮毛跟着转，才听得清方向。",
    task: "点两张不一样的卡，说出谁更像耳尖转的狞猫。"
  }  ,
  {
    id: "games/tuftturn-lab.html", file: "tuftturn-lab.html", title: "耳尖转工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一只纸狞猫。耳尖那撮毛跟着转才听得清方向；耳尖光光的就听不清。",
    task: "试一次耳尖转和一次光耳，比较谁听得清。"
  }
  ,
  {
    id: "nature/nyala.html", file: "nyala.html", title: "尼亚拉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较尼亚拉和身上一块色的。尼亚拉身上白条卷着藏，才认成树影。",
    task: "点两张不一样的卡，说出谁更像白条藏着的尼亚拉。"
  }  ,
  {
    id: "games/stripecurl-lab.html", file: "stripecurl-lab.html", title: "卷条工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌲", ready: true,
    description: "同一只纸尼亚拉。身上白条卷着藏才认成树影；身上一块色就被看见。",
    task: "试一次卷条和一次一块色，比较谁认成树影。"
  }
  ,
  {
    id: "nature/dikdiks.html", file: "dikdiks.html", title: "迪氏羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较迪氏羚和鼻子不喷的。迪氏羚鼻子一喷发出警报，对面才听得见。",
    task: "点两张不一样的卡，说出谁更像会喷鼻的迪氏羚。"
  }  ,
  {
    id: "games/snortalarm-lab.html", file: "snortalarm-lab.html", title: "喷鼻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💨", ready: true,
    description: "同一只纸迪氏羚。鼻子一喷发出警报才听得见；鼻子不喷就听不见。",
    task: "试一次喷鼻和一次不喷，比较谁听得见。"
  }
  ,
  {
    id: "nature/muntjacs.html", file: "muntjacs.html", title: "麂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较麂和不叫也不戳牙的。麂叫一声再把牙戳出去，才挡住。",
    task: "点两张不一样的卡，说出谁更像会吠牙的麂。"
  }  ,
  {
    id: "games/barkfang-lab.html", file: "barkfang-lab.html", title: "吠牙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸麂。叫一声再把牙戳出去才挡住；不叫也不戳牙会被咬。",
    task: "试一次吠牙和一次闷着，比较谁挡住。"
  }
  ,
  {
    id: "nature/gorals.html", file: "gorals.html", title: "斑羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐐", ready: true,
    description: "比较斑羚和毛薄薄的。斑羚毛厚厚的贴着崖，才冻不住。",
    task: "点两张不一样的卡，说出谁更像厚毛的斑羚。"
  }  ,
  {
    id: "games/cliffwool-lab.html", file: "cliffwool-lab.html", title: "崖毛工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧥", ready: true,
    description: "同一只纸斑羚。毛厚厚的贴着崖才冻不住；毛薄薄的就冻着。",
    task: "试一次厚毛和一次薄毛，比较谁冻不住。"
  }
  ,
  {
    id: "nature/serows.html", file: "serows.html", title: "鬣羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐐", ready: true,
    description: "比较鬣羚和脖子光光的。鬣羚脖子那道鬃挡住刺，刺才进不去。",
    task: "点两张不一样的卡，说出谁更像有鬃的鬣羚。"
  }  ,
  {
    id: "games/maneblock-lab.html", file: "maneblock-lab.html", title: "鬃挡工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🛡️", ready: true,
    description: "同一只纸鬣羚。脖子那道鬃挡住刺才进不去；脖子光光的刺会进去。",
    task: "试一次竖鬃和一次光脖，比较谁挡得住。"
  }
  ,
  {
    id: "nature/lynxes.html", file: "lynxes.html", title: "猞猁观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐱", ready: true,
    description: "比较猞猁和脸两侧光光的。猞猁脸两侧那撮毛刷着，才听得清两边。",
    task: "点两张不一样的卡，说出谁更像脸刷的猞猁。"
  }  ,
  {
    id: "games/sidespot-lab.html", file: "sidespot-lab.html", title: "脸刷工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一只纸猞猁。脸两侧那撮毛刷着才听得清两边；脸两侧光光的就听不清。",
    task: "试一次脸刷和一次光脸，比较谁听得清。"
  }
  ,
  {
    id: "nature/bobcats.html", file: "bobcats.html", title: "短尾猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐱", ready: true,
    description: "比较短尾猫和尾巴拖得长的。短尾猫尾巴短短的当舵，灌木里才拐得过。",
    task: "点两张不一样的卡，说出谁更像短尾的短尾猫。"
  }  ,
  {
    id: "games/stubtail-lab.html", file: "stubtail-lab.html", title: "短尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✂️", ready: true,
    description: "同一只纸短尾猫。尾巴短短的当舵才拐得过；尾巴拖得长会缠住。",
    task: "试一次短尾和一次长尾，比较谁拐得过。"
  }
  ,
  {
    id: "nature/pumas.html", file: "pumas.html", title: "美洲狮观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦁", ready: true,
    description: "比较美洲狮和学着吼的。美洲狮后头发出尖叫，对面才听得见。",
    task: "点两张不一样的卡，说出谁更像会尖叫的美洲狮。"
  }  ,
  {
    id: "games/hindscream-lab.html", file: "hindscream-lab.html", title: "后叫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📢", ready: true,
    description: "同一只纸美洲狮。后头发出尖叫才听得见；学着吼吼不出来。",
    task: "试一次尖叫和一次学吼，比较谁听得见。"
  }
  ,
  {
    id: "nature/impala.html", file: "impala.html", title: "黑斑羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较黑斑羚和侧边一块色的。黑斑羚侧边那道黑线闪一下，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像侧闪的黑斑羚。"
  }  ,
  {
    id: "games/sideflash-lab.html", file: "sideflash-lab.html", title: "侧闪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚡", ready: true,
    description: "同一只纸黑斑羚。侧边那道黑线闪一下才看得见；侧边一块色就看不见。",
    task: "试一次侧闪和一次一块色，比较谁看得见。"
  }
  ,
  {
    id: "nature/wildebeest.html", file: "wildebeest.html", title: "牛羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐃", ready: true,
    description: "比较牛羚和各自乱冲的。牛羚排成一列过河，才过得去。",
    task: "点两张不一样的卡，说出谁更像排队过河的牛羚。"
  }  ,
  {
    id: "games/gnuwheel-lab.html", file: "gnuwheel-lab.html", title: "排队过河工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸牛羚。排成一列过河才过得去；各自乱冲会冲散。",
    task: "试一次排队和一次乱冲，比较谁过得去。"
  }
  ,
  {
    id: "nature/hartebeest.html", file: "hartebeest.html", title: "狷羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较狷羚和肩膀矮矮的。狷羚肩膀特别高，才看得见草那边。",
    task: "点两张不一样的卡，说出谁更像高肩的狷羚。"
  }  ,
  {
    id: "games/highwithers-lab.html", file: "highwithers-lab.html", title: "高肩工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📐", ready: true,
    description: "同一只纸狷羚。肩膀特别高才看得见草那边；肩膀矮矮的就看不见。",
    task: "试一次高肩和一次矮肩，比较谁看得见。"
  }
  ,
  {
    id: "nature/gazelles.html", file: "gazelles.html", title: "瞪羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较瞪羚和白臀藏着的。瞪羚白臀闪一下，对面才看得见信号。",
    task: "点两张不一样的卡，说出谁更像臀闪的瞪羚。"
  }  ,
  {
    id: "games/rumflash-lab.html", file: "rumflash-lab.html", title: "臀闪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✨", ready: true,
    description: "同一只纸瞪羚。白臀闪一下才看得见信号；白臀藏着就看不见。",
    task: "试一次臀闪和一次藏着，比较谁看得见。"
  }
  ,
  {
    id: "nature/gerenuk.html", file: "gerenuk.html", title: "长颈羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较长颈羚和四脚够叶子的。长颈羚后腿站起来伸脖子，才够得到叶子。",
    task: "点两张不一样的卡，说出谁更像站伸的长颈羚。"
  }  ,
  {
    id: "games/neckstretch-lab.html", file: "neckstretch-lab.html", title: "站伸工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦒", ready: true,
    description: "同一只纸长颈羚。后腿站起来伸脖子才够得到；四脚够叶子就够不到。",
    task: "试一次站伸和一次四脚，比较谁够得到。"
  }
  ,
  {
    id: "nature/lechwes.html", file: "lechwes.html", title: "驴羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较驴羚和腿短短的。驴羚膝盖以上的长腿踩进洪水，才走得动。",
    task: "点两张不一样的卡，说出谁更像长腿的驴羚。"
  }  ,
  {
    id: "games/floodknee-lab.html", file: "floodknee-lab.html", title: "洪水膝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸驴羚。膝盖以上的长腿踩进洪水才走得动；腿短短的就陷住。",
    task: "试一次长腿和一次短腿，比较谁走得动。"
  }
  ,
  {
    id: "nature/viscachas.html", file: "viscachas.html", title: "兔鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐭", ready: true,
    description: "比较兔鼠和不叫的。兔鼠洞口一声哨，对面才听得见。",
    task: "点两张不一样的卡，说出谁更像会洞哨的兔鼠。"
  }  ,
  {
    id: "games/whistleburrow-lab.html", file: "whistleburrow-lab.html", title: "洞哨工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎵", ready: true,
    description: "同一只纸兔鼠。洞口一声哨才听得见；不叫就听不见。",
    task: "试一次洞哨和一次不叫，比较谁听得见。"
  }
  ,
  {
    id: "nature/giant-pandas.html", file: "giant-pandas.html", title: "大熊猫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐼", ready: true,
    description: "比较大熊猫和没有垫的。大熊猫第六指那块垫卡住竹子，才拿得住。",
    task: "点两张不一样的卡，说出谁更像有垫的大熊猫。"
  }  ,
  {
    id: "games/padthumb-lab.html", file: "padthumb-lab.html", title: "垫拇指工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎋", ready: true,
    description: "同一只纸大熊猫。第六指那块垫卡住竹子才拿得住；没有垫就拿不住。",
    task: "试一次垫卡住和一次没垫，比较谁拿得住。"
  }
  ,
  {
    id: "nature/cuscus.html", file: "cuscus.html", title: "袋貂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐾", ready: true,
    description: "比较袋貂和尾巴垂着的。袋貂尾巴卷住树枝，才掉不下去。",
    task: "点两张不一样的卡，说出谁更像卷尾的袋貂。"
  }  ,
  {
    id: "games/pouchclimb-lab.html", file: "pouchclimb-lab.html", title: "卷尾爬工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "同一只纸袋貂。尾巴卷住树枝才掉不下去；尾巴垂着会掉下去。",
    task: "试一次卷尾和一次垂尾，比较谁掉不下去。"
  }
  ,
  {
    id: "nature/slow-lorises.html", file: "slow-lorises.html", title: "懒猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较懒猴和胳膊不舔的。懒猴胳膊那道槽舔过才有毒，咬一下会麻。",
    task: "点两张不一样的卡，说出谁更像舔槽的懒猴。"
  }  ,
  {
    id: "games/slowlick-lab.html", file: "slowlick-lab.html", title: "臂舔工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👅", ready: true,
    description: "同一只纸懒猴。胳膊那道槽舔过才有毒；胳膊不舔就没有毒。",
    task: "试一次舔槽和一次不舔，比较谁有毒。"
  }
  ,
  {
    id: "nature/tenrecs.html", file: "tenrecs.html", title: "马岛猬观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦔", ready: true,
    description: "比较马岛猬和身子摊开的。马岛猬卷成刺球，才咬不进去。",
    task: "点两张不一样的卡，说出谁更像卷球的马岛猬。"
  }  ,
  {
    id: "games/tenrecball-lab.html", file: "tenrecball-lab.html", title: "卷刺球工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🟠", ready: true,
    description: "同一只纸马岛猬。卷成刺球才咬不进去；身子摊开会被咬到。",
    task: "试一次卷球和一次摊开，比较谁咬不进去。"
  }
  ,
  {
    id: "nature/waterbucks.html", file: "waterbucks.html", title: "水羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较水羚和脖子干干的。水羚脖子那圈油腺抹开，自己人才闻得出。",
    task: "点两张不一样的卡，说出谁更像抹圈的水羚。"
  }  ,
  {
    id: "games/scentring-lab.html", file: "scentring-lab.html", title: "颈圈工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⭕", ready: true,
    description: "同一只纸水羚。脖子那圈油腺抹开才闻得出；脖子干干的就闻不出。",
    task: "试一次抹圈和一次干脖，比较谁闻得出。"
  }
  ,
  {
    id: "nature/thylacines.html", file: "thylacines.html", title: "袋狼观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐺", ready: true,
    description: "比较袋狼和嘴张不大的。袋狼嘴张得特别大才咬得住。已经没有活着的了，只看标本和图。",
    task: "点两张不一样的卡，说出谁更像大张口的袋狼。"
  }  ,
  {
    id: "games/gapehunt-lab.html", file: "gapehunt-lab.html", title: "大张猎工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "😮", ready: true,
    description: "同一只纸袋狼。嘴张得特别大才咬得住；嘴张不大就咬不住。",
    task: "试一次大张和一次小张，比较谁咬得住。"
  }
  ,
  {
    id: "nature/agoutis.html", file: "agoutis.html", title: "刺豚鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐿️", ready: true,
    description: "比较刺豚鼠和全堆在一个洞的。刺豚鼠把种子埋远一点再忘，明年才还能发芽。",
    task: "点两张不一样的卡，说出谁更像会散种的刺豚鼠。"
  }  ,
  {
    id: "games/scatterseed-lab.html", file: "scatterseed-lab.html", title: "散种工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌱", ready: true,
    description: "同一只纸刺豚鼠。种子埋远一点再忘才明年还能发芽；全堆在一个洞会被挖走。",
    task: "试一次散种和一次堆洞，比较谁还能发芽。"
  }
  ,
  {
    id: "nature/pacas.html", file: "pacas.html", title: "无尾刺豚鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐾", ready: true,
    description: "比较无尾刺豚鼠和脸颊一块色的。无尾刺豚鼠脸颊那块白斑对着对面，才认得出自己人。",
    task: "点两张不一样的卡，说出谁更像有颊斑的无尾刺豚鼠。"
  }  ,
  {
    id: "games/cheekspot-lab.html", file: "cheekspot-lab.html", title: "颊斑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⚪", ready: true,
    description: "同一只纸无尾刺豚鼠。脸颊那块白斑对着对面才认得出；脸颊一块色就认不出。",
    task: "试一次颊斑和一次一块色，比较谁认得出。"
  }
  ,
  {
    id: "nature/muskrats.html", file: "muskrats.html", title: "麝鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐭", ready: true,
    description: "比较麝鼠和不抹的。麝鼠屁股那点麝香抹开，自己人才闻得出。",
    task: "点两张不一样的卡，说出谁更像会抹香的麝鼠。"
  }  ,
  {
    id: "games/muskcastor-lab.html", file: "muskcastor-lab.html", title: "麝香工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🧴", ready: true,
    description: "同一只纸麝鼠。屁股那点麝香抹开才闻得出；不抹就闻不出。",
    task: "试一次抹香和一次不抹，比较谁闻得出。"
  }
  ,
  {
    id: "nature/oribi.html", file: "oribi.html", title: "侏羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较侏羚和贴地往前跑的。侏羚四腿伸直蹦一下，对面才看得见信号。",
    task: "点两张不一样的卡，说出谁更像直蹦的侏羚。"
  }  ,
  {
    id: "games/oribibound-lab.html", file: "oribibound-lab.html", title: "直蹦工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬆️", ready: true,
    description: "同一只纸侏羚。四腿伸直蹦一下才看得见信号；贴地往前跑就看不出。",
    task: "试一次直蹦和一次平跑，比较谁看得见。"
  }
  ,
  {
    id: "nature/reedbucks.html", file: "reedbucks.html", title: "芦羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较芦羚和站在空地上的。芦羚身子埋进芦苇，才认不成。",
    task: "点两张不一样的卡，说出谁更像藏在芦苇里的芦羚。"
  }  ,
  {
    id: "games/reedhide-lab.html", file: "reedhide-lab.html", title: "藏芦工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌾", ready: true,
    description: "同一只纸芦羚。身子埋进芦苇才认不成；站在空地上就被看见。",
    task: "试一次藏芦和一次空地，比较谁认不成。"
  }
  ,
  {
    id: "nature/groundhogs.html", file: "groundhogs.html", title: "土拨鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐿️", ready: true,
    description: "比较土拨鼠和不叫的。土拨鼠洞口一声哨，对面才听得见。",
    task: "点两张不一样的卡，说出谁更像会洞哨的土拨鼠。"
  }  ,
  {
    id: "games/groundwhistle-lab.html", file: "groundwhistle-lab.html", title: "洞哨工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎵", ready: true,
    description: "同一只纸土拨鼠。洞口一声哨才听得见；不叫就听不见。",
    task: "试一次洞哨和一次不叫，比较谁听得见。"
  }
  ,
  {
    id: "nature/pikas.html", file: "pikas.html", title: "鼠兔观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐰", ready: true,
    description: "比较鼠兔和堆新鲜草的。鼠兔把草晒干再堆起来，冬天才还有。",
    task: "点两张不一样的卡，说出谁更像会晒干草的鼠兔。"
  }  ,
  {
    id: "games/haypile-lab.html", file: "haypile-lab.html", title: "干草堆工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌾", ready: true,
    description: "同一只纸鼠兔。草晒干再堆起来才冬天还有；堆新鲜的会烂掉。",
    task: "试一次晒干和一次新鲜，比较谁冬天还有。"
  }
  ,
  {
    id: "nature/sperm-whales.html", file: "sperm-whales.html", title: "抹香鲸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐋", ready: true,
    description: "比较抹香鲸和额头扁扁的。抹香鲸额头那块隆点击一下，才听得见回声。",
    task: "点两张不一样的卡，说出谁更像有额隆的抹香鲸。"
  }  ,
  {
    id: "games/melonclick-lab.html", file: "melonclick-lab.html", title: "额隆工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔊", ready: true,
    description: "同一只纸抹香鲸。额头那块隆点击一下才听得见回声；额头扁扁的就听不见。",
    task: "试一次额隆和一次扁额，比较谁听得见。"
  }
  ,
  {
    id: "nature/hamsters.html", file: "hamsters.html", title: "仓鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐹", ready: true,
    description: "比较仓鼠和嘴里含着就地吃的。仓鼠颊囊装满带回洞，才存得住。",
    task: "点两张不一样的卡，说出谁更像会装颊囊的仓鼠。"
  }  ,
  {
    id: "games/hamstercache-lab.html", file: "hamstercache-lab.html", title: "颊囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌰", ready: true,
    description: "同一只纸仓鼠。颊囊装满带回洞才存得住；嘴里含着就地吃就存不住。",
    task: "试一次颊囊和一次就地吃，比较谁存得住。"
  }
  ,
  {
    id: "nature/uakaris.html", file: "uakaris.html", title: "秃猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较秃猴和脸发白的。秃猴血涨上来脸才红，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像涨红的秃猴。"
  }  ,
  {
    id: "games/flush-lab.html", file: "flush-lab.html", title: "涨红工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔴", ready: true,
    description: "同一只纸秃猴。血涨上来脸才红才看得见；脸发白就看不见。",
    task: "试一次涨红和一次发白，比较谁看得见。"
  }
  ,
  {
    id: "nature/humpbacks.html", file: "humpbacks.html", title: "座头鲸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐋", ready: true,
    description: "比较座头鲸和气泡乱喷的。座头鲸气泡围成一圈，才把鱼赶在一起。",
    task: "点两张不一样的卡，说出谁更像会泡网的座头鲸。"
  }  ,
  {
    id: "games/bubblehunt-lab.html", file: "bubblehunt-lab.html", title: "泡网工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🫧", ready: true,
    description: "同一只纸座头鲸。气泡围成一圈才围得住；气泡乱喷鱼就散了。",
    task: "试一次泡网和一次乱喷，比较谁围得住。"
  }
  ,
  {
    id: "nature/marmots.html", file: "marmots.html", title: "旱獭观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐿️", ready: true,
    description: "比较旱獭和不叫的。旱獭洞口一声哨，对面才听得见。",
    task: "点两张不一样的卡，说出谁更像会哨的旱獭。"
  }  ,
  {
    id: "games/marmotwhistle-lab.html", file: "marmotwhistle-lab.html", title: "哨声工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎵", ready: true,
    description: "同一只纸旱獭。洞口一声哨才听得见；不叫就听不见。",
    task: "试一次哨声和一次不叫，比较谁听得见。"
  }
  ,
  {
    id: "nature/moles.html", file: "moles.html", title: "鼹鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐭", ready: true,
    description: "比较鼹鼠和前掌细细的。鼹鼠前掌像铲子往前挖，才挖得动。",
    task: "点两张不一样的卡，说出谁更像铲掌的鼹鼠。"
  }  ,
  {
    id: "games/moletunnel-lab.html", file: "moletunnel-lab.html", title: "铲掌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⛏️", ready: true,
    description: "同一只纸鼹鼠。前掌像铲子往前挖才挖得动；前掌细细的就挖不动。",
    task: "试一次铲掌和一次细掌，比较谁挖得动。"
  }
  ,
  {
    id: "nature/shrews.html", file: "shrews.html", title: "鼩鼱观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐭", ready: true,
    description: "比较鼩鼱和停着不吃的。鼩鼱一直吃才烧得动，才还醒着。",
    task: "点两张不一样的卡，说出谁更像一直吃的鼩鼱。"
  }  ,
  {
    id: "games/shrewburn-lab.html", file: "shrewburn-lab.html", title: "烧能工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔥", ready: true,
    description: "同一只纸鼩鼱。一直吃才烧得动还醒着；停着不吃就停住。",
    task: "试一次一直吃和一次停着，比较谁还醒着。"
  }
  ,
  {
    id: "nature/lemmings.html", file: "lemmings.html", title: "旅鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐭", ready: true,
    description: "比较旅鼠和不会游硬冲的。旅鼠遇上水会游过去，才过得去。",
    task: "点两张不一样的卡，说出谁更像会游的旅鼠。"
  }  ,
  {
    id: "games/lemmingswim-lab.html", file: "lemmingswim-lab.html", title: "会游工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏊", ready: true,
    description: "同一只纸旅鼠。遇上水会游过去才过得去；不会游硬冲就冲散。",
    task: "试一次会游和一次硬冲，比较谁过得去。"
  }
  ,
  {
    id: "nature/siamangs.html", file: "siamangs.html", title: "合趾猿观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦧", ready: true,
    description: "比较合趾猿和喉囊瘪着的。合趾猿喉囊鼓起来，对面才听得见。",
    task: "点两张不一样的卡，说出谁更像鼓囊的合趾猿。"
  }  ,
  {
    id: "games/siamangboom-lab.html", file: "siamangboom-lab.html", title: "喉囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📣", ready: true,
    description: "同一只纸合趾猿。喉囊鼓起来才听得见；喉囊瘪着就听不见。",
    task: "试一次鼓囊和一次瘪着，比较谁听得见。"
  }
  ,
  {
    id: "nature/colobus.html", file: "colobus.html", title: "疣猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较疣猴和用腿跑的。疣猴长臂荡过去，才过得去。",
    task: "点两张不一样的卡，说出谁更像荡臂的疣猴。"
  }  ,
  {
    id: "games/colobusleap-lab.html", file: "colobusleap-lab.html", title: "荡臂工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🤸", ready: true,
    description: "同一只纸疣猴。长臂荡过去才过得去；用腿跑会掉下去。",
    task: "试一次荡臂和一次跑，比较谁过得去。"
  }
  ,
  {
    id: "nature/langurs.html", file: "langurs.html", title: "叶猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较叶猴和当水果一下子咽的。叶猴胃分好几间慢慢化叶子，才化得了。",
    task: "点两张不一样的卡，说出谁更像分胃的叶猴。"
  }  ,
  {
    id: "games/langurleaf-lab.html", file: "langurleaf-lab.html", title: "分胃工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍃", ready: true,
    description: "同一只纸叶猴。胃分好几间慢慢化叶子才化得了；当水果一下子咽就化不了。",
    task: "试一次分胃和一次当水果，比较谁化得了。"
  }
  ,
  {
    id: "nature/pottos.html", file: "pottos.html", title: "树熊猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较树熊猴和松手的。树熊猴手脚抓紧不放，才掉不下去。",
    task: "点两张不一样的卡，说出谁更像抓紧的树熊猴。"
  }  ,
  {
    id: "games/pottohold-lab.html", file: "pottohold-lab.html", title: "抓紧工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✊", ready: true,
    description: "同一只纸树熊猴。手脚抓紧不放才掉不下去；松手会掉下去。",
    task: "试一次抓紧和一次松手，比较谁掉不下去。"
  }
  ,
  {
    id: "nature/proboscis.html", file: "proboscis.html", title: "长鼻猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较长鼻猴和鼻子扁扁的。长鼻猴大鼻子对着对面，才听得见。",
    task: "点两张不一样的卡，说出谁更像大鼻的长鼻猴。"
  }  ,
  {
    id: "games/proboscisnose-lab.html", file: "proboscisnose-lab.html", title: "大鼻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👃", ready: true,
    description: "同一只纸长鼻猴。大鼻子对着对面才听得见；鼻子扁扁的就听不见。",
    task: "试一次大鼻和一次扁鼻，比较谁听得见。"
  }
  ,
  {
    id: "nature/macaques.html", file: "macaques.html", title: "猕猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较猕猴和就地吃的。猕猴颊囊装满带回，才存得住。",
    task: "点两张不一样的卡，说出谁更像装颊囊的猕猴。"
  }  ,
  {
    id: "games/macaquecheek-lab.html", file: "macaquecheek-lab.html", title: "颊囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌰", ready: true,
    description: "同一只纸猕猴。颊囊装满带回才存得住；就地吃就存不住。",
    task: "试一次颊囊和一次就地吃，比较谁存得住。"
  }
  ,
  {
    id: "nature/capuchins.html", file: "capuchins.html", title: "卷尾猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较卷尾猴和空手掰的。卷尾猴石头砸开，才吃得到。",
    task: "点两张不一样的卡，说出谁更像会砸石的卷尾猴。"
  }  ,
  {
    id: "games/capuchinhammer-lab.html", file: "capuchinhammer-lab.html", title: "砸石工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪨", ready: true,
    description: "同一只纸卷尾猴。石头砸开才吃得到；空手掰就吃不到。",
    task: "试一次砸石和一次空手，比较谁吃得到。"
  }
  ,
  {
    id: "nature/marmosets.html", file: "marmosets.html", title: "狨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较狨和用牙咬果的。狨牙刮树皮才出胶，才吃得到。",
    task: "点两张不一样的卡，说出谁更像会刮胶的狨。"
  }  ,
  {
    id: "games/marmosetgum-lab.html", file: "marmosetgum-lab.html", title: "刮胶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌳", ready: true,
    description: "同一只纸狨。牙刮树皮才出胶才吃得到；用牙咬果就吃不到胶。",
    task: "试一次刮胶和一次咬果，比较谁吃得到胶。"
  }  ,
  {
    id: "nature/gerbils.html", file: "gerbils.html", title: "沙鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐹", ready: true,
    description: "比较沙鼠和四脚刨沙的。沙鼠后腿一下蹬出去，才进得了洞。",
    task: "点两张不一样的卡，说出谁更像后腿一蹬进洞的沙鼠。"
  }  ,
  {
    id: "games/gerbildig-lab.html", file: "gerbildig-lab.html", title: "后蹬工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸沙鼠。后腿一下蹬出去才进得了洞；四脚刨沙就被抓住。",
    task: "试一次后蹬和一次四脚刨，比较谁进得了洞。"
  }
  ,
  {
    id: "nature/mandrills.html", file: "mandrills.html", title: "山魈观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较山魈和鼻子一块色的。山魈鼻子那道蓝红对着对面，才认得出谁大。",
    task: "点两张不一样的卡，说出谁更像彩鼻的山魈。"
  }  ,
  {
    id: "games/mandrillnose-lab.html", file: "mandrillnose-lab.html", title: "彩鼻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎨", ready: true,
    description: "同一只纸山魈。鼻子那道蓝红对着对面才认得出谁大；鼻子一块色就认不出。",
    task: "试一次彩鼻和一次一块色，比较谁认得出。"
  }
  ,
  {
    id: "nature/right-whales.html", file: "right-whales.html", title: "露脊鲸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐋", ready: true,
    description: "比较露脊鲸和潜下去乱吞的。露脊鲸嘴张开贴着水面滤，才滤得到。",
    task: "点两张不一样的卡，说出谁更像水面滤的露脊鲸。"
  }  ,
  {
    id: "games/rightskim-lab.html", file: "rightskim-lab.html", title: "水面滤工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌊", ready: true,
    description: "同一只纸露脊鲸。嘴张开贴着水面滤才滤得到；潜下去乱吞就滤不到。",
    task: "试一次水面滤和一次乱吞，比较谁滤得到。"
  }  ,
  {
    id: "nature/bowheads.html", file: "bowheads.html", title: "弓头鲸观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐋", ready: true,
    description: "比较弓头鲸和嘴张不大的。弓头鲸嘴张得特别大把须板张开滤，才滤得到。",
    task: "点两张不一样的卡，说出谁更像巨口滤的弓头鲸。"
  }  ,
  {
    id: "games/bowheadfilter-lab.html", file: "bowheadfilter-lab.html", title: "巨口滤工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪥", ready: true,
    description: "同一只纸弓头鲸。嘴张得特别大把须板张开滤才滤得到；嘴张不大就滤不到。",
    task: "试一次巨口和一次小张，比较谁滤得到。"
  }
  ,
  {
    id: "nature/voles.html", file: "voles.html", title: "田鼠观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐭", ready: true,
    description: "比较田鼠和在草上面跑的。田鼠草下面挖出一条道，鹰才看不见。",
    task: "点两张不一样的卡，说出谁更像走草道的田鼠。"
  }  ,
  {
    id: "games/voletunnel-lab.html", file: "voletunnel-lab.html", title: "草道工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸田鼠。草下面挖出一条道才鹰看不见；在草上面跑一下子被看见。",
    task: "试一次草道和一次草上，比较谁看不见。"
  }  ,
  {
    id: "nature/geladas.html", file: "geladas.html", title: "狮尾狒观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较狮尾狒和嘴闭着的。狮尾狒上唇翻上去露出牙龈，对面才看得见信号。",
    task: "点两张不一样的卡，说出谁更像翻唇的狮尾狒。"
  }  ,
  {
    id: "games/geladagum-lab.html", file: "geladagum-lab.html", title: "翻唇工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "😬", ready: true,
    description: "同一只纸狮尾狒。上唇翻上去露出牙龈才对面看得见信号；嘴闭着就看不见。",
    task: "试一次翻唇和一次闭嘴，比较谁看得见。"
  }
  ,
  {
    id: "nature/sakis.html", file: "sakis.html", title: "僧面猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较僧面猴和牙软软的。僧面猴牙把硬籽咬开，才吃得到。",
    task: "点两张不一样的卡，说出谁更像能咬开硬籽的僧面猴。"
  }  ,
  {
    id: "games/sakiseed-lab.html", file: "sakiseed-lab.html", title: "硬籽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥜", ready: true,
    description: "同一只纸僧面猴。牙把硬籽咬开才吃得到；牙软软的就吃不到。",
    task: "试一次咬开和一次牙软，比较谁吃得到。"
  }
  ,
  {
    id: "nature/titis.html", file: "titis.html", title: "伶猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较伶猴和一只自己叫的。伶猴两只对着唱，对面才听得见自己人。",
    task: "点两张不一样的卡，说出谁更像对唱的伶猴。"
  }  ,
  {
    id: "games/titiduos-lab.html", file: "titiduos-lab.html", title: "对唱工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎵", ready: true,
    description: "同一对纸伶猴。两只对着唱才听得见自己人；一只自己叫就听不见。",
    task: "试一次对唱和一次独唱，比较谁听得见。"
  }
  ,
  {
    id: "nature/guenons.html", file: "guenons.html", title: "长尾猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较长尾猴和脸上一块色的。长尾猴脸上那块彩斑对着对面，才认得出自己人。",
    task: "点两张不一样的卡，说出谁更像有脸斑的长尾猴。"
  }  ,
  {
    id: "games/guenonspot-lab.html", file: "guenonspot-lab.html", title: "脸斑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎨", ready: true,
    description: "同一只纸长尾猴。脸上那块彩斑对着对面才认得出；脸上一块色就认不出。",
    task: "试一次脸斑和一次一块色，比较谁认得出。"
  }
  ,
  {
    id: "nature/squirrel-monkeys.html", file: "squirrel-monkeys.html", title: "松鼠猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较松鼠猴和慢慢爬的。松鼠猴后腿一蹬跳过去，才过得去。",
    task: "点两张不一样的卡，说出谁更像会弹跳的松鼠猴。"
  }  ,
  {
    id: "games/squirrelleap-lab.html", file: "squirrelleap-lab.html", title: "弹跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬆️", ready: true,
    description: "同一只纸松鼠猴。后腿一蹬跳过去才过得去；慢慢爬就过不去。",
    task: "试一次弹跳和一次爬，比较谁过得去。"
  }
  ,
  {
    id: "nature/beira.html", file: "beira.html", title: "贝氏羚观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦌", ready: true,
    description: "比较贝氏羚和耳朵垂着的。贝氏羚大耳朵竖着听，才听得见。",
    task: "点两张不一样的卡，说出谁更像竖耳的贝氏羚。"
  }  ,
  {
    id: "games/beiranose-lab.html", file: "beiranose-lab.html", title: "大耳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👂", ready: true,
    description: "同一只纸贝氏羚。大耳朵竖着听才听得见；耳朵垂着就听不见。",
    task: "试一次竖耳和一次垂耳，比较谁听得见。"
  }
  ,
  {
    id: "nature/drills.html", file: "drills.html", title: "鬼狒观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较鬼狒和脸上一块色的。鬼狒黑脸上那块对着对面，才认得出谁大。",
    task: "点两张不一样的卡，说出谁更像黑脸的鬼狒。"
  }  ,
  {
    id: "games/drillface-lab.html", file: "drillface-lab.html", title: "黑脸工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬛", ready: true,
    description: "同一只纸鬼狒。黑脸上那块对着对面才认得出谁大；脸上一块色就认不出。",
    task: "试一次黑脸和一次一块色，比较谁认得出。"
  }
  ,
  {
    id: "nature/patas.html", file: "patas.html", title: "赤猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较赤猴和往树上爬的。赤猴长腿贴地跑，才跑得过。",
    task: "点两张不一样的卡，说出谁更像长腿跑的赤猴。"
  }  ,
  {
    id: "games/patasrun-lab.html", file: "patasrun-lab.html", title: "长腿跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏃", ready: true,
    description: "同一只纸赤猴。长腿贴地跑才跑得过；往树上爬就跑不过。",
    task: "试一次长跑和一次爬树，比较谁跑得过。"
  }
  ,
  {
    id: "nature/ring-tailed-lemurs.html", file: "ring-tailed-lemurs.html", title: "环尾狐猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较环尾狐猴和尾巴垂着的。环尾狐猴尾巴竖起来那一圈一圈对着对面，才看得见信号。",
    task: "点两张不一样的卡，说出谁更像竖环尾的环尾狐猴。"
  }  ,
  {
    id: "games/lemurring-lab.html", file: "lemurring-lab.html", title: "环尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸环尾狐猴。尾巴竖起来那一圈一圈对着对面才看得见信号；尾巴垂着就看不见。",
    task: "试一次竖尾和一次垂尾，比较谁看得见。"
  }
  ,
  {
    id: "nature/baboons.html", file: "baboons.html", title: "狒狒观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较狒狒和牙藏着的。狒狒那对长牙露出来，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像露牙的狒狒。"
  }  ,
  {
    id: "games/babooncanine-lab.html", file: "babooncanine-lab.html", title: "长牙工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦷", ready: true,
    description: "同一只纸狒狒。那对长牙露出来才看得见；牙藏着就看不见。",
    task: "试一次露牙和一次藏牙，比较谁看得见。"
  }
  ,
  {
    id: "games/sifakadance-lab.html", file: "sifakadance-lab.html", title: "侧跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "↔️", ready: true,
    description: "同一只纸跳狐猴。两条后腿侧着跳才过得去；四脚跑就过不去。",
    task: "试一次侧跳和一次四脚跑，比较谁过得去。"
  }
  ,
  {
    id: "nature/snub-noses.html", file: "snub-noses.html", title: "金丝猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较金丝猴和鼻子朝下的。金丝猴鼻子朝天不进雪，才呛不着。",
    task: "点两张不一样的卡，说出谁更像朝天鼻的金丝猴。"
  }  ,
  {
    id: "games/snubcold-lab.html", file: "snubcold-lab.html", title: "朝天鼻工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👃", ready: true,
    description: "同一只纸金丝猴。鼻子朝天不进雪才呛不着；鼻子朝下就呛着。",
    task: "试一次朝天和一次朝下，比较谁呛不着。"
  }
  ,
  {
    id: "nature/indris.html", file: "indris.html", title: "大狐猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较大狐猴和沿着树干爬的。大狐猴后腿一蹬跳到下一棵，才过得去。",
    task: "点两张不一样的卡，说出谁更像树跃的大狐猴。"
  }  ,
  {
    id: "games/indrileap-lab.html", file: "indrileap-lab.html", title: "树跃工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌳", ready: true,
    description: "同一只纸大狐猴。后腿一蹬跳到下一棵才过得去；沿着树干爬就过不去。",
    task: "试一次树跃和一次爬，比较谁过得去。"
  }
  ,
  {
    id: "nature/tamarins.html", file: "tamarins.html", title: "柽柳猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较柽柳猴和爪子平放的。柽柳猴爪子钩住树枝，才掉不下去。",
    task: "点两张不一样的卡，说出谁更像爪钩的柽柳猴。"
  }  ,
  {
    id: "games/tamarinclaw-lab.html", file: "tamarinclaw-lab.html", title: "爪钩工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪝", ready: true,
    description: "同一只纸柽柳猴。爪子钩住树枝才掉不下去；爪子平放会掉下去。",
    task: "试一次爪钩和一次平放，比较谁掉不下去。"
  }
  ,
  {
    id: "nature/vervets.html", file: "vervets.html", title: "黑长尾猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较黑长尾猴和一种叫声乱叫的。黑长尾猴不同叫声对应不同危险，对面才知道往哪躲。",
    task: "点两张不一样的卡，说出谁更像会三种警报的黑长尾猴。"
  }  ,
  {
    id: "games/vervetalarm-lab.html", file: "vervetalarm-lab.html", title: "三种警报工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📢", ready: true,
    description: "同一只纸黑长尾猴。不同叫声对应不同危险才知道往哪躲；一种叫声乱叫就不知道。",
    task: "试一次三种叫和一次乱叫，比较谁知道往哪躲。"
  }
  ,
  {
    id: "nature/tinamous.html", file: "tinamous.html", title: "䳍观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较䳍和蛋壳毛毛的。䳍蛋壳亮得像上过釉，才认成叶子上的水珠。",
    task: "点两张不一样的卡，说出谁更像亮蛋的䳍。"
  }  ,
  {
    id: "games/tinamouegg-lab.html", file: "tinamouegg-lab.html", title: "亮蛋工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🥚", ready: true,
    description: "同一只纸䳍。蛋壳亮得像上过釉才认成水珠；蛋壳毛毛的就被看见。",
    task: "试一次亮蛋和一次毛蛋，比较谁认成水珠。"
  }
  ,
  {
    id: "nature/seriemas.html", file: "seriemas.html", title: "叫鹤观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较叫鹤和只用嘴啄的。叫鹤叼起来往地上甩打，才弄得动。",
    task: "点两张不一样的卡，说出谁更像会甩打的叫鹤。"
  }  ,
  {
    id: "games/seriemakill-lab.html", file: "seriemakill-lab.html", title: "甩打工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💥", ready: true,
    description: "同一只纸叫鹤。叼起来往地上甩打才弄得动；只用嘴啄就弄不动。",
    task: "试一次甩打和一次只啄，比较谁弄得动。"
  }
  ,
  {
    id: "nature/hamerkops.html", file: "hamerkops.html", title: "锤头鹳观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较锤头鹳和巢摊开没顶的。锤头鹳巢堆得又大又封顶，才挡得住雨。",
    task: "点两张不一样的卡，说出谁更像封顶巢的锤头鹳。"
  }  ,
  {
    id: "games/hamerkopnest-lab.html", file: "hamerkopnest-lab.html", title: "巨巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏠", ready: true,
    description: "同一只纸锤头鹳。巢堆得又大又封顶才挡得住雨；巢摊开没顶就淋湿。",
    task: "试一次封顶和一次摊开，比较谁挡得住。"
  }
  ,
  {
    id: "nature/mouse-lemurs.html", file: "mouse-lemurs.html", title: "鼠狐猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较鼠狐猴和一直醒着跑的。鼠狐猴冷的时候蜷起来少烧，糖才还够用。",
    task: "点两张不一样的卡，说出谁更像会蛰伏的鼠狐猴。"
  }  ,
  {
    id: "games/mousetorpor-lab.html", file: "mousetorpor-lab.html", title: "蛰伏工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "😴", ready: true,
    description: "同一只纸鼠狐猴。冷的时候蜷起来少烧才糖还够用；一直醒着跑糖会用完。",
    task: "试一次蛰伏和一次一直醒，比较谁糖还够用。"
  }
  ,
  {
    id: "nature/bamboo-lemurs.html", file: "bamboo-lemurs.html", title: "竹狐猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较竹狐猴和当甜竹一下子咽的。竹狐猴胃里那套把氰化掉，才吃得下。",
    task: "点两张不一样的卡，说出谁更像会化氰的竹狐猴。"
  }  ,
  {
    id: "games/bamboocyan-lab.html", file: "bamboocyan-lab.html", title: "化氰工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎋", ready: true,
    description: "同一只纸竹狐猴。胃里那套把氰化掉才吃得下；当甜竹一下子咽就吃不下。",
    task: "试一次化氰和一次当甜竹，比较谁吃得下。"
  }
  ,
  {
    id: "nature/olingos.html", file: "olingos.html", title: "尖吻浣熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦝", ready: true,
    description: "比较尖吻浣熊和尾巴垂着的。尖吻浣熊尾巴卷住树枝，才掉不下去。",
    task: "点两张不一样的卡，说出谁更像卷尾的尖吻浣熊。"
  }  ,
  {
    id: "games/olingotail-lab.html", file: "olingotail-lab.html", title: "卷尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "同一只纸尖吻浣熊。尾巴卷住树枝才掉不下去；尾巴垂着会掉下去。",
    task: "试一次卷尾和一次垂尾，比较谁掉不下去。"
  }
  ,
  {
    id: "nature/cacomistles.html", file: "cacomistles.html", title: "蓬尾浣熊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦝", ready: true,
    description: "比较蓬尾浣熊和尾巴夹着的。蓬尾浣熊尾巴那一圈一圈竖着当舵，才拐得过。",
    task: "点两张不一样的卡，说出谁更像竖环尾的蓬尾浣熊。"
  }  ,
  {
    id: "games/cacomistlering-lab.html", file: "cacomistlering-lab.html", title: "环尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸蓬尾浣熊。尾巴那一圈一圈竖着当舵才拐得过；尾巴夹着会冲过头。",
    task: "试一次竖尾和一次夹尾，比较谁拐得过。"
  }
  ,
  {
    id: "nature/angwantibos.html", file: "angwantibos.html", title: "金熊猴观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐵", ready: true,
    description: "比较金熊猴和手指张开的。金熊猴手指扣成一个圈抓紧，才掉不下去。",
    task: "点两张不一样的卡，说出谁更像扣握的金熊猴。"
  }  ,
  {
    id: "games/angwantibogrip-lab.html", file: "angwantibogrip-lab.html", title: "扣握工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✊", ready: true,
    description: "同一只纸金熊猴。手指扣成一个圈抓紧才掉不下去；手指张开会掉下去。",
    task: "试一次扣握和一次张开，比较谁掉不下去。"
  }
  ,
  {
    id: "nature/secretarybirds.html", file: "secretarybirds.html", title: "蛇鹫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较蛇鹫和用嘴去啄的。蛇鹫长腿一下子踩下去，才踩得住。",
    task: "点两张不一样的卡，说出谁更像会踩的蛇鹫。"
  }  ,
  {
    id: "games/snakekick-lab.html", file: "snakekick-lab.html", title: "踏蛇工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦵", ready: true,
    description: "同一只纸蛇鹫。长腿一下子踩下去才踩得住；用嘴去啄就踩不住。",
    task: "试一次踩和一次啄，比较谁踩得住。"
  }
  ,
  {
    id: "games/emufeather-lab.html", file: "emufeather-lab.html", title: "双羽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪶", ready: true,
    description: "同一只纸鸸鹋。一根羽轴上长两片才挡得住晒；一根一根的就晒着。",
    task: "试一次双羽和一次单羽，比较谁挡得住晒。"
  }
  ,
  {
    id: "games/rheatrot-lab.html", file: "rheatrot-lab.html", title: "三趾跑工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸美洲鸵。三个脚趾扒住跑才拐得过；两个脚趾就滑倒。",
    task: "试一次三趾和一次两趾，比较谁拐得过。"
  }
  ,
  {
    id: "games/shoebillwait-lab.html", file: "shoebillwait-lab.html", title: "立定工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⏳", ready: true,
    description: "同一只纸鲸头鹳。一动不动等鱼游近才咬得到；走来走去鱼就跑了。",
    task: "试一次立定和一次走动，比较谁咬得到。"
  }
  ,
  {
    id: "nature/skuas.html", file: "skuas.html", title: "贼鸥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较贼鸥和自己去水面捞的。贼鸥盯着别的鸟嘴里那一口去追，才抢得到。",
    task: "点两张不一样的卡，说出谁更像会追抢的贼鸥。"
  }  ,
  {
    id: "games/skuasneak-lab.html", file: "skuasneak-lab.html", title: "追抢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎯", ready: true,
    description: "同一只纸贼鸥。盯着别的鸟嘴里那一口去追才抢得到；自己去水面捞就抢不到。",
    task: "试一次追抢和一次自捞，比较谁抢得到。"
  }
  ,
  {
    id: "nature/terns.html", file: "terns.html", title: "燕鸥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较燕鸥和贴着水面扫的。燕鸥先悬在空中再一头扎下去，才啄得到。",
    task: "点两张不一样的卡，说出谁更像会悬停的燕鸥。"
  }  ,
  {
    id: "games/terndive-lab.html", file: "terndive-lab.html", title: "悬停工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬇️", ready: true,
    description: "同一只纸燕鸥。先悬在空中再一头扎下去才啄得到；贴着水面扫就啄空。",
    task: "试一次悬停和一次扫水，比较谁啄得到。"
  }
  ,
  {
    id: "nature/rails.html", file: "rails.html", title: "秧鸡观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较秧鸡和身子正着走的。秧鸡身子侧过去从芦苇缝挤，才挤得过。",
    task: "点两张不一样的卡，说出谁更像会侧身的秧鸡。"
  }  ,
  {
    id: "games/railside-lab.html", file: "railside-lab.html", title: "侧身工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌾", ready: true,
    description: "同一只纸秧鸡。身子侧过去从芦苇缝挤才挤得过；身子正着走会卡住。",
    task: "试一次侧身和一次正走，比较谁挤得过。"
  }
  ,
  {
    id: "nature/dovekies.html", file: "dovekies.html", title: "小海雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较小海雀和翅膀收着的。小海雀翅膀在水里划，才潜得下。",
    task: "点两张不一样的卡，说出谁更像会翅划的小海雀。"
  }  ,
  {
    id: "games/dovekiedive-lab.html", file: "dovekiedive-lab.html", title: "翅划工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏊", ready: true,
    description: "同一只纸小海雀。翅膀在水里划才潜得下；翅膀收着就浮着。",
    task: "试一次翅划和一次收翅，比较谁潜得下。"
  }
  ,
  {
    id: "nature/moorhens.html", file: "moorhens.html", title: "黑水鸡观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较黑水鸡和头不动往前冲的。黑水鸡走一步头点一下，才走得稳。",
    task: "点两张不一样的卡，说出谁更像会点头的黑水鸡。"
  }  ,
  {
    id: "games/moorhennod-lab.html", file: "moorhennod-lab.html", title: "点头工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬇️", ready: true,
    description: "同一只纸黑水鸡。走一步头点一下才走得稳；头不动往前冲会栽下去。",
    task: "试一次点头和一次冲，比较谁走得稳。"
  }
  ,
  {
    id: "nature/prions.html", file: "prions.html", title: "鹱燕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹱燕和整口吞的。鹱燕嘴里那排梳子把小虾滤住，才滤得到。",
    task: "点两张不一样的卡，说出谁更像会滤嘴的鹱燕。"
  }  ,
  {
    id: "games/prionfilter-lab.html", file: "prionfilter-lab.html", title: "滤嘴工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪥", ready: true,
    description: "同一只纸鹱燕。嘴里那排梳子把小虾滤住才滤得到；整口吞就滤不到。",
    task: "试一次滤嘴和一次整吞，比较谁滤得到。"
  }
  ,
  {
    id: "nature/gulls.html", file: "gulls.html", title: "鸥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鸥和一直往前飞的。鸥迎着风停在空中看，才看得见水面。",
    task: "点两张不一样的卡，说出谁更像会迎风的鸥。"
  }  ,
  {
    id: "games/gullhover-lab.html", file: "gullhover-lab.html", title: "迎风工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💨", ready: true,
    description: "同一只纸鸥。迎着风停在空中看才看得见水面；一直往前飞就看不清。",
    task: "试一次迎风和一次前飞，比较谁看得见。"
  }
  ,
  {
    id: "nature/crakes.html", file: "crakes.html", title: "田鸡观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较田鸡和身子横着跑的。田鸡身子竖着从缝里走，才挤得过。",
    task: "点两张不一样的卡，说出谁更像会竖走的田鸡。"
  }  ,
  {
    id: "games/crakeside-lab.html", file: "crakeside-lab.html", title: "竖走工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌿", ready: true,
    description: "同一只纸田鸡。身子竖着从缝里走才挤得过；身子横着跑会卡住。",
    task: "试一次竖走和一次横跑，比较谁挤得过。"
  }
  ,
  {
    id: "nature/grebes.html", file: "grebes.html", title: "鸊鷉观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鸊鷉和气还鼓着的。鸊鷉把气挤出去再潜，才潜得下。",
    task: "点两张不一样的卡，说出谁更像会沉潜的鸊鷉。"
  }  ,
  {
    id: "games/grebedive-lab.html", file: "grebedive-lab.html", title: "沉潜工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬇️", ready: true,
    description: "同一只纸鸊鷉。把气挤出去再潜才潜得下；气还鼓着就浮着。",
    task: "试一次挤气和一次鼓着，比较谁潜得下。"
  }
  ,
  {
    id: "nature/loons.html", file: "loons.html", title: "潜鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较潜鸟和脚长在中间的。潜鸟脚长在身子最后面才划得深，才潜得深。",
    task: "点两张不一样的卡，说出谁更像后脚的潜鸟。"
  }  ,
  {
    id: "games/loondive-lab.html", file: "loondive-lab.html", title: "后脚工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸潜鸟。脚长在身子最后面才划得深；脚长在中间就潜不深。",
    task: "试一次后脚和一次中脚，比较谁潜得深。"
  }
  ,
  {
    id: "games/anhingadry-lab.html", file: "anhingadry-lab.html", title: "晾翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪶", ready: true,
    description: "同一只纸蛇鹈。翅膀张开晾干才飞得起来；翅膀一直湿着就飞不起来。",
    task: "试一次晾干和一次湿着，比较谁飞得起来。"
  }
  ,
  {
    id: "games/phalaropespin-lab.html", file: "phalaropespin-lab.html", title: "打转工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌀", ready: true,
    description: "同一只纸瓣蹼鹬。在水上打转转把吃的旋上来才旋得上来；站着等就旋不上来。",
    task: "试一次打转和一次站着，比较谁旋得上来。"
  }
  ,
  {
    id: "games/clawwing-lab.html", file: "clawwing-lab.html", title: "翅爪工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪝", ready: true,
    description: "同一只纸麝雉。翅膀上那两个爪子抓住树枝才掉不下去；爪子没有会掉下去。",
    task: "试一次翅爪和一次没爪，比较谁掉不下去。"
  }
  ,
  {
    id: "nature/coots.html", file: "coots.html", title: "白骨顶观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较白骨顶和脚趾光光的。白骨顶脚趾两边那层皮张开划，才划得动。",
    task: "点两张不一样的卡，说出谁更像瓣蹼的白骨顶。"
  }  ,
  {
    id: "games/cootlobe-lab.html", file: "cootlobe-lab.html", title: "瓣蹼工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸白骨顶。脚趾两边那层皮张开划才划得动；脚趾光光的就划不动。",
    task: "试一次瓣蹼和一次光趾，比较谁划得动。"
  }
  ,
  {
    id: "games/jacanawalk-lab.html", file: "jacanawalk-lab.html", title: "长趾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦶", ready: true,
    description: "同一只纸水雉。脚趾特别长摊在荷叶上才走得住；脚趾短短的就陷下去。",
    task: "试一次长趾和一次短趾，比较谁走得住。"
  }
  ,
  {
    id: "nature/ptarmigans.html", file: "ptarmigans.html", title: "岩雷鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较岩雷鸟和褐羽留着的。岩雷鸟冬天换上白羽，才藏进雪里。",
    task: "点两张不一样的卡，说出谁更像换上白羽的岩雷鸟。"
  }  ,
  {
    id: "games/snowcloak-lab.html", file: "snowcloak-lab.html", title: "雪衣工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "❄️", ready: true,
    description: "同一只纸岩雷鸟。换上白羽才藏进雪里；褐羽留着就被看见。",
    task: "试一次白羽和一次褐羽，比较谁藏得住。"
  }
  ,
  {
    id: "nature/nuthatches.html", file: "nuthatches.html", title: "䴓观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较䴓和只往上爬的。䴓头朝下顺着树走，才吃得到下面的。",
    task: "点两张不一样的卡，说出谁更像倒走的䴓。"
  }  ,
  {
    id: "games/nuthatchwalk-lab.html", file: "nuthatchwalk-lab.html", title: "倒走工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌳", ready: true,
    description: "同一只纸䴓。头朝下顺着树走才吃得到下面的；只能往上爬就吃不到。",
    task: "试一次倒走和一次只往上，比较谁吃得到。"
  }
  ,
  {
    id: "nature/shrikes.html", file: "shrikes.html", title: "伯劳观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较伯劳和叼着不放的。伯劳把吃的钉在刺上，才存得住。",
    task: "点两张不一样的卡，说出谁更像会钉刺的伯劳。"
  }  ,
  {
    id: "games/shrikebush-lab.html", file: "shrikebush-lab.html", title: "钉刺工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📌", ready: true,
    description: "同一只纸伯劳。把吃的钉在刺上才存得住；叼着不放就掉下去。",
    task: "试一次钉刺和一次叼着，比较谁存得住。"
  }
  ,
  {
    id: "games/beeeatercatch-lab.html", file: "beeeatercatch-lab.html", title: "摔蜂工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐝", ready: true,
    description: "同一只纸蜂虎。先把蜂摔几下再吞才刺就没了；直接吞就还扎着。",
    task: "试一次摔蜂和一次直吞，比较谁刺没了。"
  }
  ,
  {
    id: "games/hornbillcasque-lab.html", file: "hornbillcasque-lab.html", title: "盔认工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪖", ready: true,
    description: "同一只纸犀鸟。嘴上那块盔对着对面才认得出；盔没有就认不出。",
    task: "试一次有盔和一次没盔，比较谁认得出。"
  }
  ,
  {
    id: "games/kingfisherdive-lab.html", file: "kingfisherdive-lab.html", title: "瞄准工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎯", ready: true,
    description: "同一只纸翠鸟。先停着看准再扎下去才啄得到；乱扎就啄空。",
    task: "试一次看准和一次乱扎，比较谁啄得到。"
  }
  ,
  {
    id: "games/swiftglue-lab.html", file: "swiftglue-lab.html", title: "唾巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪺", ready: true,
    description: "同一只纸雨燕。用唾液把巢粘在岩壁上才掉不下去；巢不粘就掉下去。",
    task: "试一次粘巢和一次不粘，比较谁掉不下去。"
  }

  ,
  {
    id: "nature/barbets.html", file: "barbets.html", title: "拟啄木观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较拟啄木和嘴去啄虫子的。拟啄木嘴一下一下凿树洞，洞才够深。",
    task: "点两张不一样的卡，说出谁更像会凿洞的拟啄木。"
  }  ,
  {
    id: "games/barbettap-lab.html", file: "barbettap-lab.html", title: "凿洞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔨", ready: true,
    description: "同一只纸拟啄木。嘴一下一下凿树洞才够深；嘴去啄虫子洞太浅。",
    task: "试一次凿洞和一次啄虫，比较谁够深。"
  }
  ,
  {
    id: "nature/wrynecks.html", file: "wrynecks.html", title: "蚁䴕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较蚁䴕和脖子直直的。蚁䴕脖子扭过去伸进洞，才够得到蚁。",
    task: "点两张不一样的卡，说出谁更像会扭颈的蚁䴕。"
  }  ,
  {
    id: "games/wrynecktwist-lab.html", file: "wrynecktwist-lab.html", title: "扭颈工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "↩️", ready: true,
    description: "同一只纸蚁䴕。脖子扭过去伸进洞才够得到蚁；脖子直直的就够不到。",
    task: "试一次扭颈和一次直颈，比较谁够得到。"
  }
  ,
  {
    id: "nature/larks.html", file: "larks.html", title: "百灵观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较百灵和站在地上唱的。百灵停在空中唱，对面才听得见。",
    task: "点两张不一样的卡，说出谁更像会悬唱的百灵。"
  }  ,
  {
    id: "games/larkhover-lab.html", file: "larkhover-lab.html", title: "悬唱工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎵", ready: true,
    description: "同一只纸百灵。停在空中唱才听得见；站在地上唱就听不见。",
    task: "试一次悬唱和一次地唱，比较谁听得见。"
  }
  ,
  {
    id: "nature/jays.html", file: "jays.html", title: "松鸦观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较松鸦和全堆在一个洞的。松鸦籽埋远一点再忘，明年才还能发芽。",
    task: "点两张不一样的卡，说出谁更像会散藏的松鸦。"
  }  ,
  {
    id: "games/jaycache-lab.html", file: "jaycache-lab.html", title: "藏籽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌰", ready: true,
    description: "同一只纸松鸦。籽埋远一点再忘才明年还能发芽；全堆在一个洞会被挖走。",
    task: "试一次散藏和一次堆洞，比较谁还能发芽。"
  }
  ,
  {
    id: "nature/magpies.html", file: "magpies.html", title: "喜鹊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较喜鹊和翅膀夹着的。喜鹊翅膀那块蓝闪一下，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像会闪翅的喜鹊。"
  }  ,
  {
    id: "games/magpieflash-lab.html", file: "magpieflash-lab.html", title: "闪翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✨", ready: true,
    description: "同一只纸喜鹊。翅膀那块蓝闪一下才看得见；翅膀夹着就看不见。",
    task: "试一次闪翅和一次夹翅，比较谁看得见。"
  }
  ,
  {
    id: "nature/starlings.html", file: "starlings.html", title: "椋鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较椋鸟和羽毛不动的。椋鸟羽毛转一下才闪出颜色，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像会转羽的椋鸟。"
  }  ,
  {
    id: "games/starlingirides-lab.html", file: "starlingirides-lab.html", title: "闪光工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌈", ready: true,
    description: "同一只纸椋鸟。羽毛转一下才闪出颜色才看得见；羽毛不动就看不见。",
    task: "试一次转羽和一次不动，比较谁看得见。"
  }
  ,
  {
    id: "nature/wagtails.html", file: "wagtails.html", title: "鹡鸰观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹡鸰和尾巴不动的。鹡鸰尾巴上下摇，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像会摇尾的鹡鸰。"
  }  ,
  {
    id: "games/wagtailyap-lab.html", file: "wagtailyap-lab.html", title: "摇尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸鹡鸰。尾巴上下摇才看得见；尾巴不动就看不见。",
    task: "试一次摇尾和一次停着，比较谁看得见。"
  }
  ,
  {
    id: "nature/wrens.html", file: "wrens.html", title: "鹪鹩观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹪鹩和巢摊开没顶的。鹪鹩巢做成圆圆的有门，才藏得住。",
    task: "点两张不一样的卡，说出谁更像圆巢的鹪鹩。"
  }  ,
  {
    id: "games/wrencavity-lab.html", file: "wrencavity-lab.html", title: "圆巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏠", ready: true,
    description: "同一只纸鹪鹩。巢做成圆圆的有门才藏得住；巢摊开没顶会被看见。",
    task: "试一次圆巢和一次摊开，比较谁藏得住。"
  }
  ,
  {
    id: "nature/tits.html", file: "tits.html", title: "山雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较山雀和全堆在一个洞的。山雀籽藏好几个地方，明年才还找得到。",
    task: "点两张不一样的卡，说出谁更像会散藏的山雀。"
  }  ,
  {
    id: "games/titcache-lab.html", file: "titcache-lab.html", title: "散藏工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌰", ready: true,
    description: "同一只纸山雀。籽藏好几个地方才明年还找得到；全堆在一个洞会被挖走。",
    task: "试一次散藏和一次堆洞，比较谁还找得到。"
  }
  ,
  {
    id: "nature/chickadees.html", file: "chickadees.html", title: "黑帽山雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较黑帽山雀和籽丢在地上的。黑帽山雀籽塞进树皮缝，才还找得到。",
    task: "点两张不一样的卡，说出谁更像会塞皮的黑帽山雀。"
  }  ,
  {
    id: "games/chickadeehide-lab.html", file: "chickadeehide-lab.html", title: "塞皮工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪵", ready: true,
    description: "同一只纸黑帽山雀。籽塞进树皮缝才还找得到；籽丢在地上会被别的吃掉。",
    task: "试一次塞皮和一次丢地，比较谁还找得到。"
  }
  ,
  {
    id: "nature/robins.html", file: "robins.html", title: "知更观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较知更和两只脚轮流走的。知更两只脚并着跳，才停得住看虫。",
    task: "点两张不一样的卡，说出谁更像会并跳的知更。"
  }  ,
  {
    id: "games/robinhop-lab.html", file: "robinhop-lab.html", title: "并跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦘", ready: true,
    description: "同一只纸知更。两只脚并着跳才停得住看虫；两只脚轮流走就看不清。",
    task: "试一次并跳和一次轮走，比较谁停得住。"
  }
  ,
  {
    id: "nature/martins.html", file: "martins.html", title: "毛脚燕观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较毛脚燕和翅膀一直扇的。毛脚燕翅膀张开滑，才飞得远。",
    task: "点两张不一样的卡，说出谁更像会滑翔的毛脚燕。"
  }  ,
  {
    id: "games/martinglide-lab.html", file: "martinglide-lab.html", title: "滑翔工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪁", ready: true,
    description: "同一只纸毛脚燕。翅膀张开滑才飞得远；翅膀一直扇一会儿就累。",
    task: "试一次滑翔和一次死扇，比较谁飞得远。"
  }
  ,
  {
    id: "nature/pipits.html", file: "pipits.html", title: "鹨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹨和两只脚并着跳的。鹨在地上走着找，才找得到籽。",
    task: "点两张不一样的卡，说出谁更像会走找的鹨。"
  }  ,
  {
    id: "games/pipitwalk-lab.html", file: "pipitwalk-lab.html", title: "走找工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🚶", ready: true,
    description: "同一只纸鹨。在地上走着找才找得到籽；两只脚并着跳就看不清。",
    task: "试一次走找和一次并跳，比较谁找得到。"
  }
  ,
  {
    id: "nature/treecreepers.html", file: "treecreepers.html", title: "旋木雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较旋木雀和头朝下往下走的。旋木雀绕着树只往上爬，才吃得到缝里的。",
    task: "点两张不一样的卡，说出谁更像会绕上的旋木雀。"
  }  ,
  {
    id: "games/treecreepup-lab.html", file: "treecreepup-lab.html", title: "绕上工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪵", ready: true,
    description: "同一只纸旋木雀。绕着树只往上爬才吃得到缝里的；头朝下往下走会抓不稳。",
    task: "试一次绕上和一次朝下，比较谁吃得到。"
  }
  ,
  {
    id: "nature/flycatchers.html", file: "flycatchers.html", title: "鹟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹟和一路追着飞的。鹟飞出去捉再飞回来，才捉得到。",
    task: "点两张不一样的卡，说出谁更像会飞出回的鹟。"
  }  ,
  {
    id: "games/flycatchsally-lab.html", file: "flycatchsally-lab.html", title: "飞出工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪰", ready: true,
    description: "同一只纸鹟。飞出去捉再飞回来才捉得到；一路追着飞就捉空。",
    task: "试一次飞出回和一次一路追，比较谁捉得到。"
  }
  ,
  {
    id: "nature/orioles.html", file: "orioles.html", title: "黄鹂观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较黄鹂和巢摊在枝上的。黄鹂巢吊在枝头，风才吹不掉。",
    task: "点两张不一样的卡，说出谁更像会吊巢的黄鹂。"
  }  ,
  {
    id: "games/oriolehang-lab.html", file: "oriolehang-lab.html", title: "吊巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪺", ready: true,
    description: "同一只纸黄鹂。巢吊在枝头才风吹不掉；巢摊在枝上会被吹走。",
    task: "试一次吊巢和一次摊巢，比较谁吹不掉。"
  }
  ,
  {
    id: "nature/vireos.html", file: "vireos.html", title: "绿鹃观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较绿鹃和尖嘴去戳的。绿鹃钩嘴把叶撕开，才找得到虫。",
    task: "点两张不一样的卡，说出谁更像会撕叶的绿鹃。"
  }  ,
  {
    id: "games/vireohook-lab.html", file: "vireohook-lab.html", title: "撕叶工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍃", ready: true,
    description: "同一只纸绿鹃。钩嘴把叶撕开才找得到虫；尖嘴去戳就找不到。",
    task: "试一次撕叶和一次去戳，比较谁找得到。"
  }
  ,
  {
    id: "nature/nightingales.html", file: "nightingales.html", title: "夜莺观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较夜莺和大白天小声唱的。夜莺夜里唱，对面才听得见。",
    task: "点两张不一样的卡，说出谁更像会夜唱的夜莺。"
  }  ,
  {
    id: "games/nightingalesong-lab.html", file: "nightingalesong-lab.html", title: "夜唱工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌙", ready: true,
    description: "同一只纸夜莺。夜里唱才听得见；大白天小声唱就听不见。",
    task: "试一次夜唱和一次白日小声，比较谁听得见。"
  }
  ,
  {
    id: "nature/goldfinches.html", file: "goldfinches.html", title: "金翅观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较金翅和直线飞的。金翅飞的时候一起一伏，对面才跟得上。",
    task: "点两张不一样的卡，说出谁更像会起伏飞的金翅。"
  }  ,
  {
    id: "games/goldfinchwave-lab.html", file: "goldfinchwave-lab.html", title: "起伏工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "〰️", ready: true,
    description: "同一只纸金翅。飞的时候一起一伏才跟得上；直线飞就看不见。",
    task: "试一次起伏和一次直线，比较谁跟得上。"
  }
  ,
  {
    id: "nature/cardinals.html", file: "cardinals.html", title: "主红雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较主红雀和尖嘴去啄的。主红雀又厚又短的嘴碾开籽，才吃得到仁。",
    task: "点两张不一样的卡，说出谁更像会碾籽的主红雀。"
  }  ,
  {
    id: "games/cardinalcone-lab.html", file: "cardinalcone-lab.html", title: "碾籽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌰", ready: true,
    description: "同一只纸主红雀。又厚又短的嘴碾开籽才吃得到仁；尖嘴去啄就碾不开。",
    task: "试一次厚嘴碾和一次尖嘴啄，比较谁吃得到。"
  }
  ,
  {
    id: "nature/mockingbirds.html", file: "mockingbirds.html", title: "嘲鸫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较嘲鸫和只叫一种的。嘲鸫把别人的声音学几段拼起来，对面才听得出。",
    task: "点两张不一样的卡，说出谁更像会学唱的嘲鸫。"
  }  ,
  {
    id: "games/mockingcopy-lab.html", file: "mockingcopy-lab.html", title: "学唱工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🎵", ready: true,
    description: "同一只纸嘲鸫。学几段拼起来才听得出；只叫一种就认不出。",
    task: "试一次学几段和一次只一种，比较谁听得出。"
  }
  ,
  {
    id: "nature/thrushes.html", file: "thrushes.html", title: "鸫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鸫和站着等的。鸫在地上跑着找，才找得到虫。",
    task: "点两张不一样的卡，说出谁更像会跑找的鸫。"
  }  ,
  {
    id: "games/thrushrun-lab.html", file: "thrushrun-lab.html", title: "跑找工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏃", ready: true,
    description: "同一只纸鸫。在地上跑着找才找得到虫；站着等就找不到。",
    task: "试一次跑找和一次站等，比较谁找得到。"
  }
  ,
  {
    id: "nature/waxwings.html", file: "waxwings.html", title: "太平鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较太平鸟和自己吞光的。太平鸟果子传给下一位，大家都吃得到。",
    task: "点两张不一样的卡，说出谁更像会传果的太平鸟。"
  }  ,
  {
    id: "games/waxwingpass-lab.html", file: "waxwingpass-lab.html", title: "传果工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍇", ready: true,
    description: "同一只纸太平鸟。果子传给下一位大家都吃得到；自己吞光别人就没了。",
    task: "试一次传果和一次独吞，比较谁都吃得到。"
  }
  ,
  {
    id: "games/weaverknot-lab.html", file: "weaverknot-lab.html", title: "打结工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪢", ready: true,
    description: "同一只纸织巢鸟。把草打结才巢不散；草只搭着不打结就会散。",
    task: "试一次打结和一次只搭着，比较谁巢不散。"
  }
  ,
  {
    id: "nature/tanagers.html", file: "tanagers.html", title: "唐纳雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较唐纳雀和羽毛不动的。唐纳雀羽毛转一下才闪出颜色，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像会转羽的唐纳雀。"
  }  ,
  {
    id: "games/tanagerflash-lab.html", file: "tanagerflash-lab.html", title: "转羽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌈", ready: true,
    description: "同一只纸唐纳雀。羽毛转一下才闪出颜色才看得见；羽毛不动就看不见。",
    task: "试一次转羽和一次不动，比较谁看得见。"
  }
  ,
  {
    id: "nature/warblers.html", file: "warblers.html", title: "林莺观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较林莺和一路追着飞的。林莺停一下再飞出去，才捉得到虫。",
    task: "点两张不一样的卡，说出谁更像会停再飞的林莺。"
  }  ,
  {
    id: "games/warblerflit-lab.html", file: "warblerflit-lab.html", title: "停飞工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪲", ready: true,
    description: "同一只纸林莺。停一下再飞出去才捉得到虫；一路追着飞就捉空。",
    task: "试一次停再飞和一次一路追，比较谁捉得到。"
  }
  ,
  {
    id: "nature/sparrows.html", file: "sparrows.html", title: "麻雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较麻雀和只用水洗的。麻雀在干土里扑几下，身上小虫才掉。",
    task: "点两张不一样的卡，说出谁更像会尘浴的麻雀。"
  }  ,
  {
    id: "games/sparrowdust-lab.html", file: "sparrowdust-lab.html", title: "尘浴工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏜️", ready: true,
    description: "同一只纸麻雀。在干土里扑几下身上小虫才掉；只用水洗就掉不干净。",
    task: "试一次尘浴和一次只水洗，比较谁虫才掉。"
  }
  ,
  {
    id: "nature/kinglets.html", file: "kinglets.html", title: "戴菊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较戴菊和冠贴着的。戴菊头顶那撮黄绿竖起来，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像会竖冠的戴菊。"
  }  ,
  {
    id: "games/kingletflare-lab.html", file: "kingletflare-lab.html", title: "竖冠工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👑", ready: true,
    description: "同一只纸戴菊。头顶那撮黄绿竖起来才看得见；冠贴着就看不见。",
    task: "试一次竖冠和一次贴冠，比较谁看得见。"
  }
  ,
  {
    id: "nature/towhees.html", file: "towhees.html", title: "红眼雀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较红眼雀和只用嘴啄的。红眼雀两只脚同时往后刨，才翻得到叶子下面的。",
    task: "点两张不一样的卡，说出谁更像会双脚刨的红眼雀。"
  }  ,
  {
    id: "games/towheescratch-lab.html", file: "towheescratch-lab.html", title: "双脚刨工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍂", ready: true,
    description: "同一只纸红眼雀。两只脚同时往后刨才翻得到；只用嘴啄就翻不到。",
    task: "试一次双脚刨和一次只啄，比较谁翻得到。"
  }
  ,
  {
    id: "nature/trogons.html", file: "trogons.html", title: "咬鹃观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较咬鹃和追着飞的。咬鹃倒挂着静等果子，才够得到。",
    task: "点两张不一样的卡，说出谁更像会静等的咬鹃。"
  }  ,
  {
    id: "games/trogonsit-lab.html", file: "trogonsit-lab.html", title: "静等工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍒", ready: true,
    description: "同一只纸咬鹃。倒挂着静等果子才够得到；追着飞就够不着。",
    task: "试一次静等和一次追飞，比较谁够得到。"
  }
  ,
  {
    id: "nature/sunbirds.html", file: "sunbirds.html", title: "太阳鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较太阳鸟和停在枝上的。太阳鸟停在空中对着花，才吸得到蜜。",
    task: "点两张不一样的卡，说出谁更像会悬停的太阳鸟。"
  }  ,
  {
    id: "games/sunbirdhover-lab.html", file: "sunbirdhover-lab.html", title: "悬停工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌸", ready: true,
    description: "同一只纸太阳鸟。停在空中对着花才吸得到蜜；停在枝上就够不着。",
    task: "试一次悬停和一次停枝，比较谁吸得到。"
  }
  ,
  {
    id: "nature/catbirds.html", file: "catbirds.html", title: "猫鹊观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较猫鹊和只叫一种鸟声的。猫鹊叫得像猫，对面才听得出。",
    task: "点两张不一样的卡，说出谁更像会学猫的猫鹊。"
  }  ,
  {
    id: "games/catbirdmew-lab.html", file: "catbirdmew-lab.html", title: "学猫工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐱", ready: true,
    description: "同一只纸猫鹊。叫得像猫才听得出；只叫一种鸟声就认不出。",
    task: "试一次学猫和一次只一种，比较谁听得出。"
  }
  ,
  {
    id: "nature/bulbuls.html", file: "bulbuls.html", title: "鹎观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较鹎和耳后没有红的。鹎耳后那撮红对着对面，才认得出。",
    task: "点两张不一样的卡，说出谁更像有红耳的鹎。"
  }  ,
  {
    id: "games/bulbulcrest-lab.html", file: "bulbulcrest-lab.html", title: "红耳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🔴", ready: true,
    description: "同一只纸鹎。耳后那撮红对着对面才认得出；耳后没有红就认不出。",
    task: "试一次红耳和一次没红，比较谁认得出。"
  }
  ,
  {
    id: "nature/drongos.html", file: "drongos.html", title: "卷尾观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较卷尾和尾巴圆圆的。卷尾尾巴叉开，才转得过来捉虫。",
    task: "点两张不一样的卡，说出谁更像会叉尾的卷尾。"
  }  ,
  {
    id: "games/drongofork-lab.html", file: "drongofork-lab.html", title: "叉尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✂️", ready: true,
    description: "同一只纸卷尾。尾巴叉开才转得过来；尾巴圆圆的就转不过来。",
    task: "试一次叉尾和一次圆尾，比较谁转得过来。"
  }
  ,
  {
    id: "nature/mynas.html", file: "mynas.html", title: "八哥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较八哥和躲进林子的。八哥跟着人走，才捡得到虫。",
    task: "点两张不一样的卡，说出谁更像会跟人的八哥。"
  }  ,
  {
    id: "games/mynawalk-lab.html", file: "mynawalk-lab.html", title: "跟人工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🚶", ready: true,
    description: "同一只纸八哥。跟着人走才捡得到虫；躲进林子就捡不到。",
    task: "试一次跟人和一次躲林，比较谁捡得到。"
  }
  ,
  {
    id: "nature/grackles.html", file: "grackles.html", title: "拟八哥观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较拟八哥和尾巴摊开的。拟八哥尾巴竖成龙骨，才走得稳。",
    task: "点两张不一样的卡，说出谁更像龙骨尾的拟八哥。"
  }  ,
  {
    id: "games/gracklekeel-lab.html", file: "gracklekeel-lab.html", title: "龙骨尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🛶", ready: true,
    description: "同一只纸拟八哥。尾巴竖成龙骨才走得稳；尾巴摊开会晃。",
    task: "试一次龙骨和一次摊开，比较谁走得稳。"
  }
  ,
  {
    id: "nature/meadowlarks.html", file: "meadowlarks.html", title: "草地鹨观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较草地鹨和胸口光光的。草地鹨胸口那道黑V，对面才认得出。",
    task: "点两张不一样的卡，说出谁更像有黑V的草地鹨。"
  }  ,
  {
    id: "games/meadowlarkv-lab.html", file: "meadowlarkv-lab.html", title: "黑V工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "⬛", ready: true,
    description: "同一只纸草地鹨。胸口那道黑V才认得出；胸口光光的就认不出。",
    task: "试一次黑V和一次光胸，比较谁认得出。"
  }
  ,
  {
    id: "nature/oropendolas.html", file: "oropendolas.html", title: "拟椋鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较拟椋鸟和巢做成杯子的。拟椋鸟巢织成袋子吊着，风才吹不掉。",
    task: "点两张不一样的卡，说出谁更像会袋巢的拟椋鸟。"
  }  ,
  {
    id: "games/oropendolawoven-lab.html", file: "oropendolawoven-lab.html", title: "袋巢工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👜", ready: true,
    description: "同一只纸拟椋鸟。巢织成袋子吊着才吹不掉；巢做成杯子会被吹走。",
    task: "试一次袋巢和一次杯巢，比较谁吹不掉。"
  }
  ,
  {
    id: "nature/pittas.html", file: "pittas.html", title: "八色鸫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较八色鸫和在落叶上走的。八色鸫在落叶里双脚跳，才找得到虫。",
    task: "点两张不一样的卡，说出谁更像会落叶跳的八色鸫。"
  }  ,
  {
    id: "games/pittahop-lab.html", file: "pittahop-lab.html", title: "落叶跳工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🍃", ready: true,
    description: "同一只纸八色鸫。在落叶里双脚跳才找得到虫；在落叶上走就找不到。",
    task: "试一次跳找和一次走找，比较谁找得到。"
  }
  ,
  {
    id: "nature/lammergeiers.html", file: "lammergeiers.html", title: "胡兀鹫观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🦅", ready: true,
    description: "比较胡兀鹫和轻轻放地上的。胡兀鹫把骨头从高处摔下去，才摔得开。",
    task: "点两张不一样的卡，说出谁更像会摔骨的胡兀鹫。"
  }  ,
  {
    id: "games/bonedrop-lab.html", file: "bonedrop-lab.html", title: "摔骨工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🦴", ready: true,
    description: "同一只纸胡兀鹫。骨头从高处摔下去才摔得开；轻轻放地上就摔不开。",
    task: "试一次摔高和一次放低，比较谁摔得开。"
  }
  ,
  {
    id: "nature/buntings.html", file: "buntings.html", title: "彩鹀观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较彩鹀和一身灰的。彩鹀繁殖时那身蓝红，对面才认得出。",
    task: "点两张不一样的卡，说出谁更像亮羽的彩鹀。"
  }


  ,
  {
    id: "games/buntingcolor-lab.html", file: "buntingcolor-lab.html", title: "亮羽工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💙", ready: true,
    description: "同一只纸彩鹀。繁殖时那身蓝才认得出；一身灰就认不出。",
    task: "试一次亮羽和一次灰身，比较谁认得出。"
  }
  ,
  {
    id: "nature/honeyeaters.html", file: "honeyeaters.html", title: "吸蜜鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较吸蜜鸟和管子去吸的。吸蜜鸟舌头像刷子，才刷得到花蜜。",
    task: "点两张不一样的卡，说出谁更像会刷舌的吸蜜鸟。"
  }  ,
  {
    id: "games/honeyeaterbrush-lab.html", file: "honeyeaterbrush-lab.html", title: "刷舌工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🌸", ready: true,
    description: "同一只纸吸蜜鸟。舌头像刷子才刷得到花蜜；管子去吸就吸不到。",
    task: "试一次刷舌和一次管吸，比较谁刷得到。"
  }
  ,
  {
    id: "nature/cotingas.html", file: "cotingas.html", title: "伞鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较伞鸟和口袋瘪着的。伞鸟气管那个空口袋鼓起来，才叫得远。",
    task: "点两张不一样的卡，说出谁更像会鼓囊的伞鸟。"
  }  ,
  {
    id: "games/cotingaboom-lab.html", file: "cotingaboom-lab.html", title: "空囊工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "📣", ready: true,
    description: "同一只纸伞鸟。空口袋鼓起来才叫得远；口袋瘪着就叫不远。",
    task: "试一次鼓囊和一次瘪囊，比较谁叫得远。"
  }
  ,
  {
    id: "nature/ovenbirds.html", file: "ovenbirds.html", title: "灶鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较灶鸟和巢摊开没顶的。灶鸟巢做成泥炉有门，才藏得住。",
    task: "点两张不一样的卡，说出谁更像泥炉巢的灶鸟。"
  }  ,
  {
    id: "games/ovenbirddome-lab.html", file: "ovenbirddome-lab.html", title: "泥炉工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🏠", ready: true,
    description: "同一只纸灶鸟。巢做成泥炉有门才藏得住；巢摊开没顶会被看见。",
    task: "试一次泥炉和一次摊开，比较谁藏得住。"
  }
  ,
  {
    id: "nature/woodcreepers.html", file: "woodcreepers.html", title: "砍林鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较砍林鸟和尾巴不撑的。砍林鸟尾巴撑在树干上，才爬得稳。",
    task: "点两张不一样的卡，说出谁更像会撑尾的砍林鸟。"
  }  ,
  {
    id: "games/woodcreepbrace-lab.html", file: "woodcreepbrace-lab.html", title: "撑尾工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🪵", ready: true,
    description: "同一只纸砍林鸟。尾巴撑在树干上才爬得稳；尾巴不撑就滑下去。",
    task: "试一次撑尾和一次不撑，比较谁爬得稳。"
  }
  ,
  {
    id: "nature/fairy-wrens.html", file: "fairy-wrens.html", title: "细尾鹩莺观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较细尾鹩莺和一身褐的。细尾鹩莺繁殖时那身亮蓝，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像亮蓝的细尾鹩莺。"
  }  ,
  {
    id: "games/fairywrenflash-lab.html", file: "fairywrenflash-lab.html", title: "亮蓝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "💙", ready: true,
    description: "同一只纸细尾鹩莺。繁殖时那身亮蓝才看得见；一身褐就看不见。",
    task: "试一次亮蓝和一次褐身，比较谁看得见。"
  }
  ,
  {
    id: "nature/antbirds.html", file: "antbirds.html", title: "蚁鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较蚁鸟和自己乱找的。蚁鸟跟在行军蚁后面，才捡得到吓跑的虫。",
    task: "点两张不一样的卡，说出谁更像会跟蚁的蚁鸟。"
  }  ,
  {
    id: "games/antbirdfollow-lab.html", file: "antbirdfollow-lab.html", title: "跟蚁工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "🐜", ready: true,
    description: "同一只纸蚁鸟。跟在行军蚁后面才捡得到；自己乱找就找不到。",
    task: "试一次跟蚁和一次乱找，比较谁捡得到。"
  }
  ,
  {
    id: "nature/manakins.html", file: "manakins.html", title: "娇鹟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较娇鹟和翅膀不拍的。娇鹟翅膀拍一下，才发出响。",
    task: "点两张不一样的卡，说出谁更像会拍翅的娇鹟。"
  }  ,
  {
    id: "games/manakinsnap-lab.html", file: "manakinsnap-lab.html", title: "拍翅工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "👏", ready: true,
    description: "同一只纸娇鹟。翅膀拍一下才发出响；翅膀不拍就没声。",
    task: "试一次拍翅和一次不拍，比较谁发出响。"
  }
  ,
  {
    id: "nature/birds-of-paradise.html", file: "birds-of-paradise.html", title: "极乐鸟观察站",
    type: "nature", subject: "biology", age: "5–11", icon: "🐦", ready: true,
    description: "比较极乐鸟和丝收着的。极乐鸟把两根长丝张开，对面才看得见。",
    task: "点两张不一样的卡，说出谁更像会张丝的极乐鸟。"
  }
  ,
  {
    id: "games/paradisewire-lab.html", file: "paradisewire-lab.html", title: "亮丝工坊",
    type: "experiment", subject: "physics", age: "6–11", icon: "✨", ready: true,
    description: "同一只纸极乐鸟。两根长丝张开对面才看得见；丝收着就看不见。",
    task: "试一次张丝和一次收丝，比较谁看得见。"
  }

];
