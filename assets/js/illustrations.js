/* 少儿数理启蒙 · 共享插图库
   Classic script；支持 file://，暴露 window.ILLUSTRATIONS

   =========================== 这个文件里有什么 ===========================
   1. 配色
      stagePalette(overrides)      深色舞台专用的一份固定配色（光与影、造波池那类
                                   不跟随主题的画布），overrides 覆盖同名键。
      themePalette(spec, onChange) 延迟读取 CSS 变量并在换主题时回调。所有内联脚本
                                   都比 playful.js 早跑，开局快照 getComputedStyle
                                   会把深色主题的值定死，浅色主题下就看不清了。
      shadeHex / fadeHex           把主题色推亮推暗、或配一个半透明版本。

   2. Canvas 绘制助手（第一个参数一律是 ctx，坐标用 CSS 像素）
      redrawGate()                 状态签名没变就跳过这一帧的重绘。
      reducedMotion(onChange)      合并系统设置与偏好面板的「减少动效」结论。
      roundRect / canvasLabel      圆角路径；带底色的读数标签（画布上所有图注都用它）。
      drawKid / drawFeather / drawBall / drawHammer
                                   自由落体、斜坡那几页的实物。
      drawTurtle / drawCube / drawPatternCell / drawCandyBean
                                   海龟、数感积木、规律方块、糖豆。
      drawDeskLamp / drawShadowObject / drawColorLamp
                                   光与影那页的台灯、遮挡物、RGB 混色灯。
      drawDoodleStarter            空画布上的描红范本（画在覆盖层，别烙进作品）。
      gearShape                    齿轮（SVG path 生成）。

   3. SVG 插图目录
      art(name) / renderArt(root)  按名字取成品内联 SVG；file:// 下代替外部图片。
      hasArt / artNames            查询目录。
      tileIcon(id)                 实验目录页的小方图标。
      dinoSilhouette / dinoScaleCompare / dietColor
                                   恐龙剪影与等比身高对比。
      raindrop / raindropPath / legend
                                   雨滴形状与通用图例。

   约定：
   - Canvas 助手不改动传入 ctx 的状态（内部 save/restore 成对）。
   - 颜色尽量从调用页传进来（主题色），写死的十六进制只用于与主题无关的实物固有色。
   - 教育性标注（刻度、图注、单位）一律走 canvasLabel，保证任何背景上都读得清。
   ====================================================================== */
window.ILLUSTRATIONS = (function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  /* 恐龙学名 → 侧视剪影。
     每属画在自己的 `0 0 w 100` 盒子里：地面固定在 y=100，最高点在 y≈0，
     `hipY` 是臀高所在的 y。盒子宽度按 全长÷全高 定，所以把盒子映射到真实的
     「全长 × 全高」矩形时不会被拉扁。这三个数配合 dinoScaleCompare()，
     才能让孩子和恐龙落在同一把尺子上——旧版是把每一属都塞进同一个 200×100
     的框里，梁龙和甲龙于是画得一样长，臀高倍数也对不上图。 */
  var DINO_ART = {
    /* 霸王龙的招牌是「大头 + 粗脖子 + 两指小手」。旧图把尾巴到吻端削成一整根
       楔子，没有脖子也没有下颌，认出来的多半是鳄鱼；现在头、颈、躯干各自成形。
       高度按 1 m ≈ 20.4 单位：臀部背线 3.7 m（y=24），腹线 2.2 m，髋关节 2.4 m。 */
    "Tyrannosaurus rex": {
      w: 250, hipY: 24, diet: "carn",
      leg: [
        { d: "M140 46 L157 66", w: 15, back: true },
        { d: "M157 66 L142 84", w: 10, back: true },
        { d: "M142 84 L161 95", w: 7, back: true },
        { d: "M150 47 L169 68", w: 18 },
        { d: "M169 68 L153 86", w: 12 },
        { d: "M153 86 L174 97", w: 8 }
      ],
      /* 尾巴两条边收到同一点：断成一截平口会看着像被截肢 */
      tail: "M4 38 C34 31 70 26 104 25 L106 53 C72 49 34 43 4 38 Z",
      body: "M96 27 C120 20 150 19 176 24 C188 26 196 29 202 33 L199 46 C187 52 170 56 148 56 C124 56 104 50 94 42 C88 37 89 30 96 27 Z",
      neck: "M187 30 C191 19 199 9 211 4 L228 17 C217 22 207 30 201 42 Z",
      head: "M205 17 C211 6 226 1 240 4 C248 6 251 12 249 19 C247 25 240 30 228 31 C216 31 206 26 203 21 Z",
      teeth: "M212 25 l2.6 6 2.4-5 M221 28 l2.6 6.4 2.4-5.4 M230 29 l2.6 6.4 2.4-5.4 M239 28 l2.4 5.6 2.4-5",
      arm: "M197 39 L205 49 L211 51",
      claw: "M211 51 L218 52 M211 52 L216 57",
      foot: "M164 96 L182 96 M154 95 L146 98",
      eye: [230, 15, 3],
      mouth: "M207 23 C218 27 232 29 246 25"
    },
    /* 三角龙的看点是颈盾、两支眉角和鹦鹉一样的喙。旧图把颈盾画成一只压在头上的
       浅色气球，角还从盾上横穿过去，整只像顶着篮球的乌龟。
       现在颈盾是立在头骨后方的盾牌，头骨从盾前伸出来，两支眉角朝前上方。 */
    "Triceratops horridus": {
      w: 273, hipY: 12, diet: "herb",
      leg: [
        { d: "M96 56 L92 100", w: 17, back: true },
        { d: "M174 54 L178 100", w: 15, back: true },
        { d: "M70 58 L62 100", w: 21 },
        { d: "M156 56 L158 100", w: 18 }
      ],
      tail: "M4 43 C18 38 38 33 58 30 L60 54 C38 52 18 48 4 43 Z",
      frill: "M204 45 C195 24 206 6 227 3 C245 1 255 12 253 27 C251 41 240 51 228 53 Z",
      /* 三角龙的肩比臀略高（那颗两米半的头骨要有支撑），背线因此从尾往肩缓缓抬，
         不是一整条平顶面包 */
      body: "M46 40 C52 20 80 13 110 13 C140 13 166 8 186 8 C202 9 210 18 212 30 C216 42 206 52 186 57 C152 64 90 63 58 55 C44 51 41 47 46 40 Z",
      neck: "M198 26 C206 28 213 32 219 37 L214 49 C207 45 200 41 194 39 Z",
      head: "M223 31 C242 31 260 37 270 45 C273 48 270 53 264 53 C250 53 232 48 223 43 Z",
      horn: "M234 33 C248 26 262 17 271 11 M240 41 C252 34 264 26 272 20 M262 45 C264 39 266 35 269 32",
      beak: "M266 44 C272 44 274 48 271 52 C268 54 264 52 263 49 Z",
      foot: "M52 99 L74 99 M148 99 L168 99",
      eye: [232, 39, 2.8]
    },
    /* 剑龙背上两排骨板是最该认出来的东西。旧图把它们画成六个悬空的橙色三角，
       像一排火苗；而且腿短到肚子贴地，整只像一只穿刺的西瓜。
       现在骨板是风筝形、两排交错，最高一枚 20 单位≈0.68 m（正文说「超过 60 厘米」），
       背线在臀部拱到最高，后腿 1.1 m 明显长过前腿 0.9 m。 */
    "Stegosaurus stenops": {
      w: 205, hipY: 21, diet: "herb",
      leg: [
        { d: "M98 66 L94 100", w: 13, back: true },
        { d: "M148 72 L152 100", w: 9, back: true },
        { d: "M78 68 L70 100", w: 16 },
        { d: "M136 74 L136 100", w: 11 }
      ],
      tail: "M4 42 C20 42 42 43 66 46 L68 70 C44 64 20 53 4 42 Z",
      body: "M60 56 C64 30 86 20 110 21 C136 22 152 34 158 52 C163 66 152 76 128 80 C100 84 74 78 62 70 C56 65 56 60 60 56 Z",
      neck: "M150 42 C158 51 167 59 176 63 L172 76 C161 71 154 63 148 55 Z",
      head: "M171 62 C181 60 193 64 199 70 C202 74 198 79 192 78 C183 76 174 71 170 67 Z",
      /* [中心x, 底边y, 半宽, 高]：底边压进背线 2 单位，骨板才像长在背上而不是飘着 */
      plates: [
        [52, 47, 5, 10], [66, 44, 6, 13],
        [80, 30, 8, 17], [94, 24, 9, 19], [108, 22, 10, 20],
        [122, 23, 9, 18], [136, 30, 8, 15], [148, 40, 6, 11]
      ],
      /* 四支尾刺长在尾巴末端而不是臀部，前后错开成两对 */
      spike: "M12 44 L2 22 L20 42 Z M22 46 L12 21 L30 44 Z M6 47 L1 31 L14 45 Z M32 48 L22 25 L40 46 Z",
      foot: "M62 99 L80 99 M128 99 L144 99",
      eye: [186, 68, 2.4]
    },
    /* 腕龙的看点是「前肢比后肢长、肩比臀高」，正文也这么写。
       所以前腿 2.8 m、后腿 2.2 m，肩部背线 y=43、臀部背线 y=55，
       背整体朝头的方向抬起来；脖子从肩前方陡起，头顶到 9.5 m 左右。 */
    "Brachiosaurus altithorax": {
      w: 215, hipY: 55, diet: "herb",
      leg: [
        { d: "M124 70 L128 100", w: 8, back: true },
        { d: "M96 76 L98 100", w: 7, back: true },
        { d: "M112 71 L108 100", w: 9 },
        { d: "M82 77 L78 100", w: 8 }
      ],
      tail: "M4 66 C24 61 46 59 70 59 L72 75 C48 73 24 70 4 66 Z",
      neck: "M131 51 C145 37 165 20 189 10 L198 23 C176 33 158 47 146 63 Z",
      body: "M70 60 C74 52 92 46 114 44 C132 43 142 47 144 55 C146 64 138 70 120 74 C98 79 78 76 72 70 C68 66 68 63 70 60 Z",
      head: "M187 13 C195 4 208 4 212 11 C215 16 210 21 202 21 C195 21 189 17 187 14 Z",
      crown: "M197 6 C201 2 206 3 207 7 C204 6 200 6 197 8 Z",
      foot: "M72 99 L88 99 M102 99 L118 99",
      eye: [203, 13, 2.6]
    },
    /* 梁龙的尾巴（约 14 m）比脖子（约 6.5 m）长一倍多，臀比肩高，
       躯干因此坐在偏右侧。旧图的腿只有 14 单位≈0.67 m，肚子几乎拖在地上；
       现在后腿 2.5 m、前腿 2.2 m，躯干只留 1.8 m 深，才是真正的柱腿体型。 */
    "Diplodocus carnegii": {
      w: 540, hipY: 12, diet: "herb",
      leg: [
        { d: "M330 48 L334 100", w: 16, back: true },
        { d: "M398 54 L402 100", w: 14, back: true },
        { d: "M306 50 L300 100", w: 19 },
        { d: "M378 55 L380 100", w: 17 }
      ],
      /* 梁龙的尾巴离地举着，不是拖在地上：尾端停在 y=50（约 2.4 m 高），
         从臀部到尾尖两条边收成一根鞭子。 */
      tail: "M4 50 C70 46 160 38 240 32 C275 30 295 30 303 31 L303 57 C292 55 272 53 240 52 C160 50 70 52 4 50 Z",
      neck: "M404 20 C438 10 478 3 518 4 L520 18 C484 18 448 26 414 42 Z",
      body: "M290 38 C296 20 320 12 350 12 C382 12 404 20 411 34 C416 44 407 50 386 52 C354 55 312 54 296 48 C288 44 287 42 290 38 Z",
      head: "M510 7 C522 2 535 4 538 11 C540 16 535 20 527 20 C518 20 512 15 510 12 Z",
      foot: "M292 99 L316 99 M370 99 L392 99",
      eye: [529, 10, 3]
    },
    /* 异特龙和霸王龙旧图是同一条楔子，孩子分不出来。真正的差别：
       异特龙头骨只有 0.9 m（霸王龙 1.5 m）、眼睛上方有一对泪骨角冠、
       前肢长得多且有三只钩爪、整体更瘦。这三处都画出来才认得出。 */
    "Allosaurus fragilis": {
      w: 250, hipY: 21, diet: "carn",
      leg: [
        { d: "M138 45 L155 65", w: 12, back: true },
        { d: "M155 65 L140 83", w: 8, back: true },
        { d: "M140 83 L158 94", w: 6, back: true },
        { d: "M148 47 L166 67", w: 15 },
        { d: "M166 67 L150 85", w: 10 },
        { d: "M150 85 L170 96", w: 7 }
      ],
      tail: "M4 35 C33 28 66 24 100 22 L102 50 C68 46 34 41 4 35 Z",
      body: "M94 25 C118 17 148 16 174 20 C186 22 194 25 200 29 L197 43 C185 49 168 52 146 52 C122 52 102 47 92 39 C86 34 87 29 94 25 Z",
      neck: "M186 27 C190 15 201 6 215 3 L227 18 C214 22 204 30 199 43 Z",
      head: "M211 15 C219 7 233 4 244 9 C250 12 251 17 248 21 C244 26 233 29 223 28 C214 27 209 22 209 18 Z",
      teeth: "M216 22 l2.2 5 2-4.4 M224 25 l2.2 5.4 2-4.6 M232 26 l2.2 5.4 2-4.6 M240 25 l2 4.8 2-4.2",
      horn: "M226 10 L229 4 L233 10 M236 10 L240 5 L243 11",
      arm: "M194 38 L206 50 L215 56",
      claw: "M215 56 L224 58 M215 57 L222 63 M214 58 L219 65",
      foot: "M160 95 L178 95 M150 94 L143 97",
      eye: [232, 16, 2.8],
      mouth: "M212 21 C222 25 234 27 246 23"
    },
    /* 棘龙的三个标志：背上近 2 m 高的帆、又长又窄的鳄鱼吻、又深又扁的尾。
       旧图的吻短而圆，帆是半透明的粉色扇贝；现在帆里画出一根根神经棘，
       吻拉长到 1.7 m 只有 0.7 m 深，尾巴做成竖立的桨状鳍。 */
    "Spinosaurus aegyptiacus": {
      w: 260, hipY: 31, diet: "carn",
      leg: [
        { d: "M100 60 L111 74", w: 10, back: true },
        { d: "M111 74 L103 86", w: 7, back: true },
        { d: "M103 86 L115 95", w: 6, back: true },
        { d: "M110 62 L122 77", w: 12 },
        { d: "M122 77 L112 89", w: 9 },
        { d: "M112 89 L126 97", w: 7 }
      ],
      /* 又深又扁的桨状尾：2020 年报道的尾部化石又高又扁，所以侧视是一整片桨，
         中间不该收成鱼那样的分叉尾鳍。 */
      tail: "M10 44 C10 36 20 36 28 44 C46 60 82 70 124 74 L126 90 C84 90 44 84 22 74 C12 69 10 56 10 44 Z",
      sail: "M70 60 C74 26 96 6 130 4 C166 2 190 20 198 44 C176 34 148 30 118 33 C96 36 78 46 70 60 Z",
      spine: "M84 50 L91 20 M104 41 L108 13 M126 35 L128 8 M148 33 L152 9 M170 36 L177 15",
      body: "M56 66 C70 48 100 34 140 31 C176 28 204 33 218 42 L215 57 C200 51 176 49 150 52 C118 56 84 67 60 78 C50 82 48 74 56 66 Z",
      neck: "M196 37 C204 33 213 35 219 41 L215 54 C207 49 200 47 195 48 Z",
      head: "M212 40 C230 37 249 42 258 48 C261 51 259 56 253 56 C239 55 222 50 212 46 Z",
      teeth: "M220 47 l1.8 4.6 1.8-4 M228 49 l1.8 4.8 1.8-4.2 M236 51 l1.8 4.8 1.8-4.2 M244 52 l1.8 4.6 1.8-4",
      crest: "M220 40 C223 35 227 34 229 36 C226 37 223 39 221 42 Z",
      arm: "M200 51 L212 63 L221 68",
      claw: "M221 68 L230 70 M221 69 L228 75",
      foot: "M116 96 L134 96 M106 95 L99 98",
      eye: [220, 42, 2.6],
      mouth: "M214 47 C228 51 244 55 256 53"
    },
    /* 甲龙是一辆低趴的装甲车：躯干只占体长一半，剩下的一半是尾巴和尾锤。
       背上一排骨突、体侧一排尖刺，腿短到几乎缩在裙边里。
       尖刺改成实心三角——旧版的细线在卡片尺寸下细到看不见。 */
    "Ankylosaurus magniventris": {
      w: 433, hipY: 8, diet: "herb",
      leg: [
        { d: "M232 62 L228 100", w: 20, back: true },
        { d: "M336 60 L340 100", w: 20, back: true },
        { d: "M204 64 L198 100", w: 24 },
        { d: "M358 60 L362 100", w: 23 }
      ],
      club: "M14 50 C14 40 26 34 38 38 C52 42 60 52 58 62 C56 73 40 77 26 73 C16 69 14 60 14 50 Z",
      /* 尾巴从臀部往尾锤逐渐收细，末端才像一根握把接着一颗锤头；
         握把要伸进锤头里，否则锤头看着是一颗掉在地上的球 */
      tail: "M44 52 C88 48 132 50 176 52 L178 76 C132 74 88 70 44 66 Z",
      body: "M166 44 C170 24 200 11 250 8 C310 5 356 11 383 24 C398 32 402 44 394 52 C384 60 356 64 306 65 C240 66 190 60 172 52 C164 48 163 47 166 44 Z",
      head: "M378 35 C396 29 416 33 425 43 C430 50 425 59 415 60 C401 61 384 53 378 45 Z",
      armor: "M196 38 q12 -12 24 -1 M238 24 q12 -12 24 -1 M284 17 q12 -12 24 -1 M330 20 q12 -12 24 -1 M368 30 q11 -11 22 -1",
      horn: "M390 35 C394 29 398 26 403 26 M386 47 C391 43 397 41 402 42",
      /* 体侧甲片贴在裙边上，不悬在肚子底下——垂到腹线以下会被看成一排短腿 */
      scute: "M198 54 L180 64 L202 62 Z M252 58 L238 70 L258 65 Z M308 58 L300 72 L322 64 Z M352 56 L364 70 L368 60 Z",
      foot: "M186 99 L216 99 M348 99 L376 99",
      eye: [400, 45, 3]
    },
    /* 伶盗龙那一整张卡都在讲「它有羽毛，不是鳞片皮肤」，旧图却只在背上插了
       一排细线，看起来像刺猬。现在两处羽毛都用实心羽片画：前肢一排飞羽组成翅，
       尾端一把扇形尾羽；第二趾抬起来带一枚镰刀爪，姿势是蹲伏的鸟形。 */
    "Velociraptor mongoliensis": {
      w: 308, hipY: 23, diet: "carn",
      leg: [
        { d: "M154 46 L172 63", w: 7, back: true },
        { d: "M172 63 L157 80", w: 5, back: true },
        { d: "M157 80 L176 94", w: 4, back: true },
        { d: "M164 47 L184 65", w: 9 },
        { d: "M184 65 L167 82", w: 6 },
        { d: "M167 82 L188 96", w: 5 }
      ],
      tail: "M4 34 C34 32 78 34 126 38 L128 56 C80 52 34 46 4 42 Z",
      body: "M120 34 C136 25 160 23 182 27 C200 30 210 34 214 38 L211 51 C200 56 184 59 164 58 C142 57 124 50 118 44 C114 40 115 37 120 34 Z",
      neck: "M205 35 C209 22 226 11 244 7 L253 22 C236 26 222 35 214 47 Z",
      head: "M240 13 C252 5 272 3 288 8 C298 11 302 16 299 21 C295 26 280 28 266 26 C252 24 242 19 240 16 Z",
      /* [根x, 根y, 尖x, 尖y, 羽片宽]：翅是一排飞羽，尾端是一把扇形尾羽 */
      wing: [
        [234, 55, 190, 82, 7], [235, 55, 202, 88, 7], [234, 53, 214, 91, 7],
        [231, 51, 226, 90, 6], [227, 49, 237, 85, 6]
      ],
      fan: [
        [26, 38, 6, 26, 7], [24, 39, 4, 33, 7], [22, 41, 3, 41, 7],
        [22, 44, 4, 50, 7], [24, 46, 7, 58, 7]
      ],
      /* 背上的绒羽是柔软的一层，不是刺：短、宽、彼此叠着 */
      ruff: [
        [152, 32, 146, 21, 6], [168, 29, 163, 18, 6], [184, 28, 180, 17, 6],
        [200, 30, 199, 19, 6], [214, 34, 216, 23, 5]
      ],
      arm: "M206 40 L222 51 L235 56",
      claw: "M188 95 C196 91 200 85 198 78",
      foot: "M180 95 L196 95",
      eye: [278, 14, 3],
      mouth: "M246 19 C260 23 276 25 296 22"
    },
    /* 副栉龙的头冠是一根向后上方伸出的空心管，比头骨本身还长；旧图把它画成
       一团压在头顶的浅色圆块，和三角龙的颈盾长得一样。现在冠是一根锥形管，
       从眼睛上方一直伸到脖子后面，还画出鸭子一样的宽扁喙。
       w 从 293 收到 278：按 全长 9.5 m ÷ 全高 3.41 m，原来横向被拉宽了 5%。 */
    "Parasaurolophus walkeri": {
      w: 278, hipY: 18, diet: "herb",
      leg: [
        { d: "M142 56 L138 100", w: 15, back: true },
        { d: "M212 60 L216 100", w: 9, back: true },
        { d: "M122 58 L114 100", w: 18 },
        { d: "M198 62 L200 100", w: 11 }
      ],
      tail: "M4 48 C30 40 66 33 100 31 L104 64 C68 62 32 56 4 48 Z",
      crest: "M238 30 C220 18 200 8 182 5 C174 4 170 12 178 18 C194 28 214 38 230 43 Z",
      body: "M96 34 C104 20 130 15 164 16 C194 17 214 23 222 34 C228 44 220 53 202 57 C170 63 124 60 106 51 C98 46 92 42 96 34 Z",
      neck: "M214 28 C222 30 230 34 238 38 L234 50 C226 46 218 42 210 40 Z",
      head: "M230 34 C244 32 256 36 262 42 C266 46 262 51 256 51 C246 51 234 45 228 40 Z",
      beak: "M254 39 C264 38 269 43 266 49 C262 52 254 50 252 46 Z",
      foot: "M106 99 L128 99 M192 99 L210 99",
      eye: [240, 38, 2.6]
    }
  };

  /* 固定深色画布的配色。
     kid.css 会把 --ink / --line / 学科色整套翻成浅色主题，但少数画布（例如落体舞台）
     的底色是写死的深色，直接读主题变量会在孩子模式下画出浅线浅字，几乎看不见。
     这类画布统一取这份与主题无关的深底配色。 */
  var STAGE_DARK = {
    bg: "#0b0f1a", surface: "#1d2540",
    ink: "#eef2ff", mid: "#b6c0e0", dim: "#8e99bd",
    line: "#3a456e", soft: "#293252",
    math: "#6ea8fe", sci: "#4ade80", phys: "#a78bfa", code: "#fb923c",
    warn: "#fbbf24", danger: "#f87171", kit: "#f472b6"
  };

  /** 取一份深色画布配色的副本；overrides 里的键会覆盖同名颜色。 */
  function stagePalette(overrides) {
    var out = {};
    Object.keys(STAGE_DARK).forEach(function (k) { out[k] = STAGE_DARK[k]; });
    Object.keys(overrides || {}).forEach(function (k) { out[k] = overrides[k]; });
    return out;
  }

  /**
   * 跟随主题的画布配色。
   *
   * 各实验页的内联脚本在 playful.js 之前执行，那一刻 <html> 上还没有 data-mode，
   * kid.css 的整套变量都还没生效，此时直接读 --ink / --math 只会拿到 base.css 的
   * 深色值。孩子模式是浅底页面，于是画布上就出现浅色字压浅色底、几乎看不见的情况。
   *
   * 这个 helper 把读取推迟到主题稳定之后，并在孩子／家长模式互相切换时自动重读，
   * 因此适用于「背景透明、颜色应当跟着页面主题走」的画布。
   * 底色写死成深色的画布请改用 stagePalette()。
   *
   * @param {Object} spec     形如 { ink: ["--ink", "#eef2ff"] }：键名 → [CSS 变量, 兜底色]
   * @param {Function} [onChange]  颜色真的变了之后调用，通常传页面的重绘函数
   * @returns {Object} 会被就地刷新的配色对象；页面可以一直持有同一个引用
   */
  function themePalette(spec, onChange) {
    var out = {};
    var keys = Object.keys(spec || {});

    function read() {
      var cs = getComputedStyle(document.documentElement);
      var changed = false;
      keys.forEach(function (k) {
        var raw = cs.getPropertyValue(spec[k][0]);
        var value = (raw && raw.trim()) || spec[k][1];
        if (out[k] !== value) { out[k] = value; changed = true; }
      });
      return changed;
    }

    function refresh() { if (read() && typeof onChange === "function") onChange(); }

    read();
    // 样式表可能还在路上：等文档就绪后再确认一次
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", refresh);
    window.addEventListener("load", refresh);
    // playful.js 设置 data-mode、以及用户手动切换模式，都会走到这里
    if (window.MutationObserver) {
      new MutationObserver(refresh).observe(document.documentElement, {
        attributes: true, attributeFilter: ["data-mode"]
      });
    }
    return out;
  }

  function svgEl(name, attrs, text) {
    var el = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (text != null) el.textContent = text;
    return el;
  }

  /* 站点是浅色底，原来的 #ef4444 / #22c55e / #f59e0b 当填充还行，
     一旦拿去写图注就只有 3:1 上下。整体压深一档，填充和文字共用一个色。 */
  function dietColor(diet) {
    return diet === "carn" ? "#bf2c1c" : diet === "herb" ? "#137a4a" : "#a86612";
  }

  function round1(n) { return Math.round(n * 10) / 10; }

  /** 一枚羽片：从 (bx,by) 长到 (tx,ty)。
      两侧弧度故意不对称——真羽毛的羽片一边宽一边窄，画成对称的尖椭圆会被看成叶子。 */
  function featherPath(bx, by, tx, ty, wid) {
    var dx = tx - bx, dy = ty - by;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / len, ny = dx / len;
    return "M" + round1(bx) + " " + round1(by) +
      " Q" + round1(bx + dx * 0.44 + nx * wid) + " " + round1(by + dy * 0.44 + ny * wid) +
      " " + round1(tx) + " " + round1(ty) +
      " Q" + round1(bx + dx * 0.52 - nx * wid * 0.6) + " " + round1(by + dy * 0.52 - ny * wid * 0.6) +
      " " + round1(bx) + " " + round1(by) + "Z";
  }

  /** 一枚风筝形骨板：底边贴着背线，往上收成圆钝的尖。 */
  function platePath(cx, baseY, halfW, h) {
    return "M" + (cx - halfW) + " " + baseY +
      " C" + round1(cx - halfW * 0.92) + " " + round1(baseY - h * 0.52) +
      " " + round1(cx - halfW * 0.44) + " " + (baseY - h) + " " + cx + " " + (baseY - h) +
      " C" + round1(cx + halfW * 0.5) + " " + (baseY - h) +
      " " + round1(cx + halfW * 0.96) + " " + round1(baseY - h * 0.46) +
      " " + (cx + halfW) + " " + baseY + "Z";
  }

  /** 画一属恐龙的剪影到 `0 0 w 100` 的局部坐标里。 */
  function dinoSilhouette(art, col) {
    var g = svgEl("g", {
      fill: col, "fill-opacity": "0.9",
      stroke: col, "stroke-width": "1.4", "stroke-linejoin": "round"
    });
    function stroked(d, w, o) {
      return svgEl("path", {
        d: d, fill: "none", stroke: col, "stroke-width": w,
        "stroke-linecap": "round", "stroke-linejoin": "round",
        "stroke-opacity": o == null ? "1" : o
      });
    }
    /* 帆、颈盾、头冠、骨板都长在体廓之外，统一用「同色调浅一档」的语言：
       孩子一眼能看出这是身体上多出来的结构，而不是另一只动物。 */
    var tint = shadeHex(col, 0.5);
    var edge = shadeHex(col, -0.2);
    function tinted(d) {
      return svgEl("path", { d: d, fill: tint, "fill-opacity": "0.96", stroke: edge, "stroke-width": 1.2 });
    }
    function feathers(list, opacity) {
      var fan = svgEl("g", { fill: tint, "fill-opacity": String(opacity), stroke: edge, "stroke-width": 1 });
      list.forEach(function (f) {
        fan.appendChild(svgEl("path", { d: featherPath(f[0], f[1], f[2], f[3], f[4]) }));
      });
      return fan;
    }
    /* 远侧的腿先画、压暗一档：剪影里唯一能表达前后关系的就是明度。 */
    var far = shadeHex(col, -0.34);
    (art.leg || []).forEach(function (leg) {
      if (!leg.back) return;
      g.appendChild(svgEl("path", {
        d: leg.d, fill: "none", stroke: far, "stroke-width": leg.w,
        "stroke-linecap": "round", "stroke-linejoin": "round"
      }));
    });
    /* 体廓之外的结构先画，底边随后被躯干盖住，才像长在身上。 */
    if (art.sail) g.appendChild(tinted(art.sail));
    if (art.frill) g.appendChild(tinted(art.frill));
    if (art.crest) g.appendChild(tinted(art.crest));
    if (art.plates) art.plates.forEach(function (p) { g.appendChild(tinted(platePath(p[0], p[1], p[2], p[3]))); });
    if (art.fan) g.appendChild(feathers(art.fan, 0.9));
    if (art.ruff) g.appendChild(feathers(art.ruff, 0.75));
    if (art.spine) {
      g.appendChild(svgEl("path", {
        d: art.spine, fill: "none", stroke: edge,
        "stroke-width": 2.6, "stroke-linecap": "round", "stroke-opacity": ".8"
      }));
    }
    if (art.tail) g.appendChild(svgEl("path", { d: art.tail }));
    if (art.neck) g.appendChild(svgEl("path", { d: art.neck }));
    if (art.club) g.appendChild(svgEl("path", { d: art.club }));
    if (art.body) g.appendChild(svgEl("path", { d: art.body }));
    if (art.head) g.appendChild(svgEl("path", { d: art.head }));
    if (art.beak) g.appendChild(svgEl("path", { d: art.beak, fill: tint, stroke: edge, "stroke-width": 1.2 }));
    if (art.crown) g.appendChild(svgEl("path", { d: art.crown, fill: tint, stroke: edge, "stroke-width": 1 }));
    if (art.armor) {
      g.appendChild(svgEl("path", {
        d: art.armor, fill: "none", stroke: tint,
        "stroke-width": 4, "stroke-linecap": "round"
      }));
    }
    /* spike 是长在体廓之外、看得出是「武器」的骨刺（剑龙尾刺），用浅一档的骨色；
       scute 是嵌在皮肤里的甲片（甲龙体侧），必须和身体同色，否则会被看成
       另外贴上去的叶子。 */
    if (art.spike) g.appendChild(svgEl("path", { d: art.spike, fill: tint, stroke: edge, "stroke-width": 1.2 }));
    if (art.scute) g.appendChild(svgEl("path", { d: art.scute, fill: col, "fill-opacity": "0.9", stroke: edge, "stroke-width": 1.2 }));
    if (art.horn) g.appendChild(stroked(art.horn, 4, 1));
    if (art.arm) g.appendChild(stroked(art.arm, 4, 1));
    if (art.claw) g.appendChild(stroked(art.claw, 2, 1));
    if (art.wing) g.appendChild(feathers(art.wing, 0.92));
    (art.leg || []).forEach(function (leg) {
      if (!leg.back) g.appendChild(stroked(leg.d, leg.w, 1));
    });
    if (art.foot) g.appendChild(stroked(art.foot, 5, 1));
    if (art.mouth) g.appendChild(stroked(art.mouth, 1.6, 0.45));
    if (art.teeth) {
      g.appendChild(svgEl("path", { d: art.teeth, fill: "#fdf6e6", stroke: edge, "stroke-width": 0.6 }));
    }
    if (art.eye) {
      g.appendChild(svgEl("circle", { cx: art.eye[0], cy: art.eye[1], r: art.eye[2], fill: "#fdf8ef", stroke: "none" }));
      g.appendChild(svgEl("circle", { cx: art.eye[0], cy: art.eye[1], r: art.eye[2] * 0.45, fill: "#1b1208", stroke: "none" }));
    }
    return g;
  }

  /** 等比身高对比：孩子和恐龙画在同一把尺子上，返回 `.silo` 容器。
      场景坐标 1 单位 = 1 厘米，所以孩子多高、恐龙多长多高，量出来都是真的。 */
  function dinoScaleCompare(d, kidCm, opts) {
    opts = opts || {};
    var art = DINO_ART[d.sci] || DINO_ART["Tyrannosaurus rex"];
    var col = opts.color || dietColor(d.diet);

    var hipCm = d.hip * 100;
    /* 全高由臀高和剪影里的臀线位置反推，两者永远自洽。 */
    var beastH = hipCm * 100 / (100 - art.hipY);
    var beastL = d.len * 100;

    var kidW = kidCm * 0.32;
    var gap = Math.max(24, kidCm * 0.22);
    var pad = Math.max(10, kidCm * 0.07);
    var sceneW = pad + kidW + gap + beastL + pad;
    var sceneH = Math.max(kidCm, beastH) * 1.05;
    var ground = sceneH;
    /* 虚线的疏密按场景宽度走，梁龙那种 27 米宽的场景才不会糊成实线；
       线宽交给 non-scaling-stroke——同样的 hair 值在梁龙卡上只有 0.3 像素，
       地面线和身高线会整条消失。 */
    var dash = sceneW / 70;

    var wrap = document.createElement("div");
    wrap.className = "silo";

    /* 恐龙有几个孩子高：整数倍身高各画一道横线，数横线就是答案 */
    var rungs = Math.min(6, Math.floor(beastH / kidCm));

    var svg = svgEl("svg", {
      class: "silo-svg",
      viewBox: "0 0 " + Math.round(sceneW) + " " + Math.round(sceneH),
      preserveAspectRatio: "xMidYMax meet",
      role: "img",
      "aria-label": d.n + " 与 " + kidCm + " 厘米高的孩子等比对比：臀高约 " +
        d.hip + " 米（孩子身高的 " + (hipCm / kidCm).toFixed(1) + " 倍），全长约 " + d.len + " 米" +
        (rungs >= 1 ? "。横向虚线每一道等于一个孩子的身高，共 " + rungs + " 道" : "")
    });

    /* 孩子身高参考线：横穿整个场景，一眼能数出恐龙有几个孩子高 */
    for (var k = 1; k <= Math.max(1, rungs); k++) {
      svg.appendChild(svgEl("line", {
        x1: 0, y1: ground - k * kidCm, x2: sceneW, y2: ground - k * kidCm,
        stroke: "currentColor", "stroke-opacity": k === 1 ? ".3" : ".17",
        "stroke-width": k === 1 ? 1.4 : 1, "vector-effect": "non-scaling-stroke",
        "stroke-dasharray": round1(dash * 1.4) + " " + round1(dash)
      }));
    }
    /* 臀高线只画在恐龙身上那一段 */
    var beastX = pad + kidW + gap;
    svg.appendChild(svgEl("line", {
      x1: beastX, y1: ground - hipCm, x2: beastX + beastL, y2: ground - hipCm,
      stroke: col, "stroke-opacity": ".55",
      "stroke-width": 1.4, "vector-effect": "non-scaling-stroke",
      "stroke-dasharray": round1(dash * 0.8) + " " + round1(dash * 0.8)
    }));

    /* 孩子的图形画在 0..32 × 0..100 的盒子里，横竖用同一个比例。
       旧版横向按 kidW/40、纵向按 kidCm/100 缩放，两者差 20%，
       圆脑袋于是被压成鸡蛋，四肢线宽还跟着方向变。 */
    var kid = svgEl("g", {
      transform: "translate(" + pad + "," + ground + ") scale(" +
        (kidCm / 100) + ") translate(0,-100)"
    });
    kid.innerHTML =
      '<circle cx="16" cy="11" r="10" fill="#5f6d85"/>' +
      '<path d="M8 24 Q16 19 24 24 L22 62 Q16 66 10 62 Z" fill="#41506a"/>' +
      '<path d="M10 61 L7 99 M22 61 L25 99" stroke="#41506a" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M9 34 L3 52 M23 34 L29 48" stroke="#41506a" stroke-width="5" stroke-linecap="round"/>';
    svg.appendChild(kid);

    var beast = svgEl("g", {
      transform: "translate(" + beastX + "," + ground + ") scale(" +
        (beastL / art.w) + "," + (beastH / 100) + ") translate(0,-100)"
    });
    beast.appendChild(dinoSilhouette(art, col));
    svg.appendChild(beast);

    svg.appendChild(svgEl("line", {
      x1: 0, y1: ground - 1, x2: sceneW, y2: ground - 1,
      stroke: "currentColor", "stroke-opacity": ".5",
      "stroke-width": 2, "vector-effect": "non-scaling-stroke"
    }));

    wrap.appendChild(svg);

    var kt = document.createElement("div");
    kt.className = "kid-t";
    kt.textContent = "孩子 " + kidCm + " cm";
    wrap.appendChild(kt);

    var bt = document.createElement("div");
    bt.className = "beast-t";
    bt.style.color = col;
    bt.textContent = "臀高 " + d.hip + " m · 全长 " + d.len + " m";
    wrap.appendChild(bt);
    return wrap;
  }

  /** Canvas：儿童友好小人物 */
  function drawKid(ctx, x, bottomY, heightPx, colors) {
    colors = colors || {};
    var skin = colors.skin || "#94a3b8";
    var cloth = colors.cloth || "#64748b";
    var h = heightPx;
    var headR = h * 0.12;
    var cx = x;
    ctx.save();
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.arc(cx, bottomY - h + headR, headR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = cloth;
    ctx.beginPath();
    ctx.moveTo(cx - h * 0.14, bottomY - h + headR * 2);
    ctx.quadraticCurveTo(cx, bottomY - h * 0.55, cx + h * 0.14, bottomY - h + headR * 2);
    ctx.lineTo(cx + h * 0.12, bottomY - h * 0.28);
    ctx.quadraticCurveTo(cx, bottomY - h * 0.22, cx - h * 0.12, bottomY - h * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = cloth;
    ctx.lineWidth = Math.max(2, h * 0.04);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx - h * 0.1, bottomY - h * 0.5);
    ctx.lineTo(cx - h * 0.18, bottomY - h * 0.38);
    ctx.moveTo(cx + h * 0.1, bottomY - h * 0.5);
    ctx.lineTo(cx + h * 0.2, bottomY - h * 0.35);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - h * 0.06, bottomY - h * 0.28);
    ctx.lineTo(cx - h * 0.08, bottomY);
    ctx.moveTo(cx + h * 0.06, bottomY - h * 0.28);
    ctx.lineTo(cx + h * 0.08, bottomY);
    ctx.stroke();
    ctx.restore();
  }

  /** Canvas：羽毛。
      y 是物体底部、总高约 2r，和 drawBall / drawHammer 对齐，同一组物体落地时底边才会齐平。
      color 只给羽片上一点淡色：羽片主体必须接近白色，否则一片纯色的尖椭圆会被看成树叶。
      两侧羽片一宽一窄（真羽毛就是不对称的），加上羽枝斜纹和底部光秃的羽根，
      这三样是让孩子一眼认出「羽毛」的关键。 */
  function drawFeather(ctx, x, y, r, color, alpha) {
    var tint = color || "#cbd5e1";
    var pale = shadeHex(tint, 0.78);
    var deep = shadeHex(tint, 0.42);
    var tipY = -r * 1.02, quillY = r * 1.12, vaneEnd = r * 0.52;
    var wide = 0.42, narrow = 0.27;   // 后缘宽、前缘窄

    function vane(side, w) {
      ctx.beginPath();
      ctx.moveTo(0, tipY);
      ctx.bezierCurveTo(side * w * r * 0.72, -r * 0.5, side * w * r, r * 0.02, side * w * r * 0.66, r * 0.36);
      ctx.quadraticCurveTo(side * w * r * 0.34, vaneEnd, 0, vaneEnd);
      ctx.closePath();
    }

    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.translate(x, y - r);
    ctx.rotate(-0.42);

    var grad = ctx.createLinearGradient(0, tipY, 0, vaneEnd);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.5, pale);
    grad.addColorStop(1, deep);
    ctx.fillStyle = grad;
    vane(1, wide); ctx.fill();
    ctx.fillStyle = pale;
    vane(-1, narrow); ctx.fill();

    // 羽枝：从羽轴斜着指向羽尖，越靠近根部越短
    ctx.strokeStyle = "rgba(71,85,105,.42)";
    ctx.lineWidth = Math.max(0.6, r * 0.045);
    ctx.beginPath();
    for (var t = -0.86; t < 0.46; t += 0.13) {
      var reach = 1 - Math.abs(t) * 0.28;
      ctx.moveTo(0, t * r);
      ctx.lineTo(wide * r * 0.82 * reach, (t - 0.17) * r);
      ctx.moveTo(0, t * r);
      ctx.lineTo(-narrow * r * 0.82 * reach, (t - 0.15) * r);
    }
    ctx.stroke();

    // 羽轴 + 底部光秃的羽根
    ctx.strokeStyle = "#64748b";
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(1, r * 0.09);
    ctx.beginPath();
    ctx.moveTo(0, tipY);
    ctx.lineTo(0, quillY);
    ctx.stroke();
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = Math.max(0.6, r * 0.05);
    ctx.beginPath();
    ctx.moveTo(0, tipY + r * 0.06);
    ctx.lineTo(0, vaneEnd);
    ctx.stroke();
    ctx.restore();
  }

  /** Canvas：皮球（带缝线，便于辨认旋转） */
  function drawBall(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    var cy = y - r;
    /* 暗边由传入的球色推导，不能写死成深橙：换成蓝球时会套上一圈橙边。 */
    var grad = ctx.createRadialGradient(x - r * 0.35, cy - r * 0.35, r * 0.08, x, cy, r);
    grad.addColorStop(0, "#fffef8");
    grad.addColorStop(0.22, color || "#f97316");
    grad.addColorStop(1, shadeHex(color || "#f97316", -0.48));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.14)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = Math.max(0.8, r * 0.07);
    ctx.beginPath();
    ctx.arc(x, cy, r * 0.92, -0.35, Math.PI + 0.35);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, cy - r * 0.92);
    ctx.lineTo(x, cy + r * 0.92);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.beginPath();
    ctx.arc(x - r * 0.32, cy - r * 0.38, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /** Canvas：地质锤（Apollo 15 落体实验里用的就是这一把）。
      y 是物体底部；总高保持在 2r，和皮球一致，否则在起始高度上锤头会被画布顶边切掉，
      只剩一根光杆。color 给手柄——锤头必须是钢灰色，染成学科色就不像金属了。
      一头方、一头收成凿刃，是让它区别于「圆头槌」的关键。 */
  function drawHammer(ctx, x, y, r, color, alpha) {
    var grip = color || "#d97706";
    var headTop = y - r * 2, headH = r * 0.66;
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;

    var handleGrad = ctx.createLinearGradient(x - r * 0.2, 0, x + r * 0.2, 0);
    handleGrad.addColorStop(0, shadeHex(grip, -0.4));
    handleGrad.addColorStop(0.45, grip);
    handleGrad.addColorStop(1, shadeHex(grip, -0.28));
    ctx.fillStyle = handleGrad;
    roundRect(ctx, x - Math.max(1.9, r * 0.17), headTop + headH * 0.5, Math.max(3.8, r * 0.34), r * 1.5, 2);
    ctx.fill();
    // 握把处的防滑环
    ctx.fillStyle = "rgba(15,23,42,.35)";
    ctx.fillRect(x - Math.max(1.9, r * 0.17), y - r * 0.5, Math.max(3.8, r * 0.34), Math.max(1.4, r * 0.09));
    ctx.fillRect(x - Math.max(1.9, r * 0.17), y - r * 0.28, Math.max(3.8, r * 0.34), Math.max(1.4, r * 0.09));

    var headGrad = ctx.createLinearGradient(0, headTop, 0, headTop + headH);
    headGrad.addColorStop(0, "#d4d4d8");
    headGrad.addColorStop(0.45, "#9ca3af");
    headGrad.addColorStop(1, "#52525b");
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.moveTo(x - r * 0.95, headTop);
    ctx.lineTo(x + r * 0.55, headTop);
    ctx.lineTo(x + r * 1.0, headTop + headH * 0.32);   // 凿刃：收窄成一条边
    ctx.lineTo(x + r * 1.0, headTop + headH * 0.68);
    ctx.lineTo(x + r * 0.55, headTop + headH);
    ctx.lineTo(x - r * 0.95, headTop + headH);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(15,23,42,.45)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.32)";
    roundRect(ctx, x - r * 0.82, headTop + headH * 0.16, r * 1.1, Math.max(1.6, headH * 0.2), 1);
    ctx.fill();
    ctx.restore();
  }

  /** 该不该减少动效。
      playful.js 把结论写在 <html data-playful-motion="reduced|full"> 上，它已经
      把系统设置和家长在偏好面板里的强制选择合并过了。各页原先只查
      matchMedia，于是在偏好面板里点「减少动效」时，页面动效照跑不误。
      传 onChange 就会在偏好或系统设置变化时回调，参数是新的布尔值。
      返回一个函数，随时调用取当前值。 */
  function reducedMotion(onChange) {
    var root = document.documentElement;
    var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    function read() {
      var attr = root.getAttribute("data-playful-motion");
      if (attr === "reduced") return true;
      if (attr === "full") return false;
      return !!(mq && mq.matches);
    }
    if (onChange) {
      var cur = read();
      var fire = function () {
        var next = read();
        if (next !== cur) { cur = next; onChange(next); }
      };
      if (window.MutationObserver) {
        new MutationObserver(fire).observe(root, {
          attributes: true, attributeFilter: ["data-playful-motion"]
        });
      }
      if (mq) {
        if (mq.addEventListener) mq.addEventListener("change", fire);
        else if (mq.addListener) mq.addListener(fire);
      }
    }
    return read;
  }

  /** 重绘闸门。画面没变就别重画。
      这些实验页大多挂着一个 requestAnimationFrame 长循环，可它们大部分时间
      是静止的——没人拖滑块的时候，每秒 60 次整幅重绘纯属白烧电。
      用法：每帧把所有影响画面的量拼成一个字符串交给它；和上一帧一样就返回
      false，跳过绘制。动画确实在跑的那些帧传 force=true 直接放行。
      比在几十个改状态的地方逐个补 invalidate() 稳：漏一处就是一块不刷新的
      画布，而签名是从状态本身算出来的，漏不了。 */
  function redrawGate() {
    var last = null;
    return function (sig, force) {
      if (sig === last && !force) return false;
      last = sig;
      return true;
    };
  }

  /** Canvas：圆角矩形路径。只建路径，填充和描边留给调用方。 */
  function roundRect(ctx, x, y, w, h, rad) {
    rad = Math.max(0, Math.min(rad, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  }

  /** Canvas：带底色的小标签，画布上所有读数、图注、刻度说明都走这里。
      舞台上永远有东西压在字底下——网格线、笔画、光斑、糖豆——裸写文字在某些
      背景上必然读不清，所以先垫一层药丸再落字。
      各页原本各写了一份几乎一样的实现（light-and-shadow 的 pillText、
      turtle-geometry 的 tag、symmetry-studio 的 pill），统一到这里。

      opts:
        size/weight/font  字号、字重、字族（默认 12 / 700 / sans-serif）
        color             文字色
        bg                药丸底色（默认半透明深色）
        border            描边色，配合 borderWidth
        align             x 表示左边缘 'left' / 中心 'center' / 右边缘 'right'
        padX/padY         内边距，决定药丸尺寸
        radius            圆角，默认取高度一半和 9 里较小的
        clampW/clampH     给定画布尺寸时把药丸收进边界，避免被裁掉
      返回实际落笔的方框 {x,y,w,h}，方便调用方接着排下一个标签。 */
  function canvasLabel(ctx, text, x, y, opts) {
    opts = opts || {};
    var size = opts.size || 12;
    var padX = opts.padX == null ? 7 : opts.padX;
    var padY = opts.padY == null ? 4 : opts.padY;
    ctx.save();
    ctx.font = (opts.weight || 700) + " " + size + "px " + (opts.font || "sans-serif");
    var w = ctx.measureText(text).width + padX * 2;
    var h = size + padY * 2;
    var left = opts.align === "center" ? x - w / 2 : opts.align === "right" ? x - w : x;
    var top = y - h / 2;
    if (opts.clampW) left = Math.max(4, Math.min(opts.clampW - w - 4, left));
    if (opts.clampH) top = Math.max(4, Math.min(opts.clampH - h - 4, top));
    roundRect(ctx, left, top, w, h, opts.radius == null ? Math.min(h / 2, 9) : opts.radius);
    ctx.fillStyle = opts.bg || "rgba(8,12,22,.78)";
    ctx.fill();
    if (opts.border) {
      ctx.strokeStyle = opts.border;
      ctx.lineWidth = opts.borderWidth || 1.4;
      ctx.stroke();
    }
    ctx.fillStyle = opts.color || "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, left + padX, top + h / 2 + 0.5);
    ctx.restore();
    return { x: left, y: top, w: w, h: h };
  }

  /** Canvas：海龟（壳纹 + 头尾，孩子一眼能认） */
  function drawTurtle(ctx, x, y, size, heading, colors) {
    colors = colors || {};
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(heading || 0);
    var s = size || 16;
    var shell = colors.shell || "#059669";
    var shellDark = colors.shellStroke || "#047857";
    ctx.fillStyle = colors.limb || "#10b981";
    [[-0.48, -0.58], [-0.48, 0.58], [0.28, -0.68], [0.28, 0.68]].forEach(function (p) {
      ctx.beginPath();
      ctx.ellipse(p[0] * s, p[1] * s, s * 0.24, s * 0.15, p[1] < 0 ? -0.45 : 0.45, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = shellDark;
    ctx.beginPath();
    ctx.ellipse(-s * 0.72, 0, s * 0.22, s * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();
    var shellGrad = ctx.createRadialGradient(-s * 0.2, -s * 0.15, s * 0.1, 0, 0, s);
    shellGrad.addColorStop(0, "#34d399");
    shellGrad.addColorStop(0.55, shell);
    shellGrad.addColorStop(1, shellDark);
    ctx.fillStyle = shellGrad;
    ctx.strokeStyle = shellDark;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.92, s * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.38)";
    ctx.lineWidth = 1;
    [[0, 0, s * 0.55], [-0.32, -0.22, s * 0.22], [0.32, -0.22, s * 0.22], [-0.32, 0.22, s * 0.22], [0.32, 0.22, s * 0.22]].forEach(function (h) {
      ctx.beginPath();
      ctx.arc(h[0] * s, h[1] * s, h[2], 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.fillStyle = colors.head || "#34d399";
    ctx.strokeStyle = shellDark;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(s * 0.98, 0, s * 0.38, s * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(s * 1.08, -s * 0.09, s * 0.07, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s * 1.1, -s * 0.11, s * 0.025, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /** Canvas：糖豆（估算站） */
  function drawCandyBean(ctx, x, y, r, color, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle || 0);
    var grad = ctx.createRadialGradient(-r * 0.28, -r * 0.28, r * 0.08, 0, 0, r);
    grad.addColorStop(0, "#fff");
    grad.addColorStop(0.35, color || "#f472b6");
    grad.addColorStop(1, shadeHex(color || "#f472b6", -0.35));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, r, r * 0.78, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.beginPath();
    ctx.ellipse(-r * 0.28, -r * 0.28, r * 0.22, r * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /** 把 #rrggbb 往白（amt>0）或往黑（amt<0）推一档，返回 rgb() 字符串。 */
  function shadeHex(hex, amt) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(hex).trim());
    if (!m) return hex;
    function f(v) {
      v = parseInt(v, 16);
      return Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    }
    return "rgb(" + f(m[1]) + "," + f(m[2]) + "," + f(m[3]) + ")";
  }

  /** 给主题色配一个半透明版本。写死 rgba(...) 的淡色在浅色主题下会糊掉，
      从 CSS 变量取到的色再配 alpha，深浅两套主题的对比度才跟着走。

      认三种写法：#abc、#aabbcc，以及 CSS 变量里常见的 rgb()/rgba()。
      认不出来就原样返回——宁可不透明，也别把颜色算成 NaN 变成一片黑。 */
  function fadeHex(color, alpha) {
    var a = Math.max(0, Math.min(1, alpha));
    var text = String(color).trim();
    var short = /^#([a-f\d])([a-f\d])([a-f\d])$/i.exec(text);
    if (short) text = "#" + short[1] + short[1] + short[2] + short[2] + short[3] + short[3];
    var hex = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(text);
    if (hex) {
      return "rgba(" + parseInt(hex[1], 16) + "," + parseInt(hex[2], 16) + "," +
        parseInt(hex[3], 16) + "," + a + ")";
    }
    var rgb = /^rgba?\(([^)]+)\)$/i.exec(text);
    if (rgb) {
      var parts = rgb[1].split(",");
      if (parts.length >= 3) {
        return "rgba(" + parts[0].trim() + "," + parts[1].trim() + "," + parts[2].trim() + "," + a + ")";
      }
    }
    return color;
  }

  /** Canvas：3D 数感积木 */
  function drawCube(ctx, x, y, s, main, opts) {
    opts = opts || {};
    /* 圆角原来给到边长的 22%，再压一条覆盖上部三分之一的高光条，
       两下加起来看着像个鼠标而不是积木。收小圆角、把高光改成沿上边的一道窄光，
       再补一圈内亮外暗的倒角，才有实心方块的厚度感。 */
    var rad = Math.max(2, s * 0.15);
    var top = shadeHex(main, 0.26);
    var side = shadeHex(main, -0.3);
    ctx.save();
    if (opts.shadow) {
      ctx.shadowColor = "rgba(0,0,0,.45)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 5;
    }
    var g = ctx.createLinearGradient(x, y, x + s * 0.35, y + s);
    g.addColorStop(0, top);
    g.addColorStop(0.55, main);
    g.addColorStop(1, side);
    roundRect(ctx, x, y, s, s, rad);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
    // 上边一道窄高光 + 下边一道暗边＝倒角
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, x + 0.5, y + 0.5, s - 1, s - 1, rad);
    ctx.clip();
    ctx.strokeStyle = "rgba(255,255,255,.5)";
    ctx.lineWidth = Math.max(1, s * 0.08);
    ctx.beginPath();
    ctx.moveTo(x + rad, y + ctx.lineWidth / 2);
    ctx.lineTo(x + s - rad, y + ctx.lineWidth / 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(0,0,0,.22)";
    ctx.beginPath();
    ctx.moveTo(x + rad, y + s - ctx.lineWidth / 2);
    ctx.lineTo(x + s - rad, y + s - ctx.lineWidth / 2);
    ctx.stroke();
    ctx.restore();
    roundRect(ctx, x + 0.5, y + 0.5, s - 1, s - 1, rad);
    ctx.strokeStyle = "rgba(8,16,31,.42)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  /** Canvas：规律图形方块（带 3D 高光） */
  function drawPatternCell(ctx, gx, gy, cell, gap, fill, isTarget) {
    var w = cell - gap * 2;
    /* 顶部高光原来写死成浅蓝／浅黄两种，传进来的 fill 只影响底色。
       于是把新长出来的方块标成第三种颜色时，上半截还是蓝的。
       改成从 fill 派生，任何颜色都能得到同一套立体感。 */
    var base = fill || (isTarget ? "#fbbf24" : "#6ea8fe");
    var grad = ctx.createLinearGradient(gx, gy, gx, gy + w);
    grad.addColorStop(0, shadeHex(base, 0.36));
    grad.addColorStop(1, base);
    ctx.fillStyle = grad;
    ctx.fillRect(gx + gap, gy + gap, w, w);
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.fillRect(gx + gap + 1, gy + gap + 1, w - 2, Math.max(2, w * 0.28));
    ctx.strokeStyle = isTarget ? "rgba(180,83,9,.65)" : "rgba(11,15,26,.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(gx + gap + 0.5, gy + gap + 0.5, w - 1, w - 1);
  }

  /** Canvas：台灯（光与影） */
  function drawDeskLamp(ctx, lx, ly, halfR) {
    ctx.save();
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lx, ly + halfR + 4);
    ctx.lineTo(lx, ly + halfR + 22);
    ctx.stroke();
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.ellipse(lx, ly + halfR + 24, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.moveTo(lx - Math.max(10, halfR + 6), ly - halfR);
    ctx.quadraticCurveTo(lx, ly - halfR - 14, lx + Math.max(10, halfR + 6), ly - halfR);
    ctx.lineTo(lx + halfR + 4, ly + halfR);
    ctx.lineTo(lx - halfR - 4, ly + halfR);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#92400e";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    var glow = ctx.createRadialGradient(lx, ly, 0, lx, ly, Math.max(26, halfR + 26));
    glow.addColorStop(0, "rgba(255,250,220,.95)");
    glow.addColorStop(1, "rgba(255,240,180,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(lx, ly, Math.max(26, halfR + 26), 0, Math.PI * 2);
    ctx.fill();
    if (halfR > 2) {
      ctx.strokeStyle = "rgba(255,240,180,.85)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(lx, ly - halfR);
      ctx.lineTo(lx, ly + halfR);
      ctx.stroke();
    }
    ctx.fillStyle = "#fff8d8";
    ctx.beginPath();
    ctx.arc(lx, ly, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#0b0f1a";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  /** Canvas：遮挡物（纸板剪影） */
  function drawShadowObject(ctx, ox, objTopY, floorY, objH) {
    var objW = 18;
    ctx.save();
    ctx.fillStyle = "#5b6b95";
    ctx.strokeStyle = "#6ea8fe";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ox - objW * 0.45, floorY);
    ctx.lineTo(ox - objW * 0.35, objTopY + 8);
    ctx.lineTo(ox, objTopY);
    ctx.lineTo(ox + objW * 0.35, objTopY + 8);
    ctx.lineTo(ox + objW * 0.45, floorY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(ox - 3, objTopY + 4, 6, floorY - objTopY - 8);
    ctx.font = "700 9px monospace";
    ctx.fillStyle = "#eef2ff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("物", ox, (objTopY + floorY) / 2);
    ctx.font = "700 11px monospace";
    ctx.fillStyle = "#6ea8fe";
    ctx.textBaseline = "bottom";
    ctx.fillText((objH != null ? objH.toFixed(2) : "?") + "m", ox, objTopY - 5);
    ctx.restore();
  }

  /** Canvas：RGB 混色灯 */
  function drawColorLamp(ctx, L) {
    var c = L.col;
    ctx.save();
    ctx.fillStyle = "rgba(30,35,50,0.92)";
    ctx.beginPath();
    ctx.arc(L.x, L.y + 10, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#0b0f1a";
    ctx.lineWidth = 2;
    ctx.stroke();
    var bulb = ctx.createRadialGradient(L.x - 2, L.y - 2, 1, L.x, L.y, 9);
    bulb.addColorStop(0, "rgba(" + c.join(",") + "," + (0.55 + 0.4 * L.I).toFixed(2) + ")");
    bulb.addColorStop(1, "rgba(" + c.join(",") + "," + (0.2 + 0.5 * L.I).toFixed(2) + ")");
    ctx.fillStyle = bulb;
    ctx.beginPath();
    ctx.arc(L.x, L.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#0b0f1a";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = "800 12px sans-serif";
    ctx.fillStyle = "#0b0f1a";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(L.name, L.x, L.y + 0.5);
    ctx.font = "700 10px monospace";
    ctx.fillStyle = "rgba(238,242,255,.9)";
    ctx.textBaseline = "top";
    ctx.fillText(Math.round(L.I * 100) + "%", L.x, L.y + 13);
    ctx.restore();
  }

  /** Canvas：空画布上的描红范本。
      画一只虚线怪兽，把「3 笔 + 3 色 + 1 印章」的任务拆成三处可以照着描的轮廓。
      opts 传主题色（ink/line/math/sci/kit/warn/font），不传就用浅色主题的默认值。
      注意：这是范本，应当画在覆盖层上，别烙进作品位图里。 */
  function drawDoodleStarter(ctx, w, h, opts) {
    opts = opts || {};
    var ink = opts.ink || "#4a3a28";
    var font = opts.font || "sans-serif";
    var hues = [opts.math || "#1f6fd0", opts.sci || "#0f8a4d", opts.kit || "#d81b73"];
    var accent = opts.warn || "#b7791f";
    var cx = w / 2, cy = h * 0.56;
    // 留出上方的标题行、下方的提示条，以及右上角的印章位
    var R = Math.min(w * 0.23, h * 0.29);
    var bw = R * 1.7, bh = R * 1.85;
    var stampX = cx + bw * 0.78, stampY = cy - bh * 0.58, stampR = R * 0.28;
    /* 图形按画布比例缩放，字号却是绝对值：手机上的方画布只有三百多像素宽，
       15px 的标题会横穿整块画布，撞上右上角的印章位。让字号跟着宽度走。 */
    var capFs = Math.max(11, Math.min(15, Math.round(w / 50)));
    var lblFs = Math.max(9, Math.min(12, Math.round(w / 62)));
    var badgeR = Math.max(9, Math.min(13, Math.round(w / 70)));

    function dashed(color, width) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width || 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.setLineDash([9, 8]);
    }
    /* 序号牌：这一处该画第几笔。左侧的牌子把字写在圆的左边，免得压到怪兽轮廓。
       lead 给出要指的那个点：牌子放不到轮廓边上时（嘴巴在身体里，牌子只能挂到
       身体外面），补一根引线，不然孩子不知道「3」说的是哪一笔。 */
    function badge(n, x, y, label, color, side, lead) {
      ctx.save();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      if (lead) {
        var dx = lead[0] - x, dy = lead[1] - y;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        ctx.beginPath();
        ctx.moveTo(x + dx / len * (badgeR + 2), y + dy / len * (badgeR + 2));
        ctx.lineTo(lead[0], lead[1]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([3, 3]);
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }
      ctx.beginPath();
      ctx.arc(x, y, badgeR, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 " + (badgeR + 1) + "px " + font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(n), x, y + 0.5);
      ctx.fillStyle = color;
      ctx.font = "800 " + lblFs + "px " + font;
      ctx.textAlign = side === "left" ? "right" : "left";
      ctx.fillText(label, x + (side === "left" ? -(badgeR + 5) : badgeR + 5), y);
      ctx.restore();
    }

    ctx.save();
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.75;

    // ① 身体：一个圆角方块 + 两只角
    dashed(hues[0]);
    roundRect(ctx, cx - bw / 2, cy - bh / 2, bw, bh, R * 0.55);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - bw * 0.26, cy - bh / 2 + 4);
    ctx.lineTo(cx - bw * 0.33, cy - bh / 2 - R * 0.4);
    ctx.lineTo(cx - bw * 0.08, cy - bh / 2 + 2);
    ctx.moveTo(cx + bw * 0.26, cy - bh / 2 + 4);
    ctx.lineTo(cx + bw * 0.33, cy - bh / 2 - R * 0.4);
    ctx.lineTo(cx + bw * 0.08, cy - bh / 2 + 2);
    ctx.stroke();

    // ② 眼睛
    dashed(hues[1], 2.6);
    ctx.beginPath();
    ctx.arc(cx - R * 0.42, cy - R * 0.34, R * 0.25, 0, Math.PI * 2);
    ctx.moveTo(cx + R * 0.67, cy - R * 0.34);
    ctx.arc(cx + R * 0.42, cy - R * 0.34, R * 0.25, 0, Math.PI * 2);
    ctx.stroke();

    // ③ 锯齿嘴
    dashed(hues[2], 2.8);
    ctx.beginPath();
    var mx = cx - R * 0.55, my = cy + R * 0.42, seg = R * 1.1 / 4, i;
    ctx.moveTo(mx, my);
    for (i = 1; i <= 4; i++) ctx.lineTo(mx + seg * i, my + (i % 2 ? R * 0.24 : 0));
    ctx.stroke();

    // 印章位：任务要求的那一个印章，指明可以盖在哪
    ctx.globalAlpha = 0.7;
    dashed(accent, 2.4);
    ctx.beginPath();
    ctx.arc(stampX, stampY, stampR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    ctx.fillStyle = accent;
    ctx.font = "800 " + lblFs + "px " + font;
    ctx.textAlign = "center";
    ctx.fillText("★ 盖这里", stampX, stampY - stampR - lblFs);

    badge(1, cx - bw / 2 - badgeR - 3, cy + bh * 0.22, "身体", hues[0], "left");
    badge(2, cx + bw / 2 + badgeR + 3, cy - R * 0.34, "眼睛", hues[1]);
    badge(3, cx - bw * 0.40, cy + bh / 2 + badgeR + 9, "嘴巴", hues[2], "left",
      [mx + seg * 0.5, my + R * 0.12]);

    ctx.fillStyle = ink;
    ctx.font = "800 " + capFs + "px " + font;
    ctx.textAlign = "center";
    ctx.fillText("照着虚线描三笔，换三种颜色", cx, Math.max(capFs, cy - bh / 2 - R * 0.62));
    ctx.restore();
  }

  /** 目录页 SVG 图标（学科实验） */
  var TILE_ICONS = {
    "number-blocks": '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="22" width="14" height="14" rx="3" fill="#d97706"/><rect x="22" y="22" width="14" height="14" rx="3" fill="#fbbf24"/><rect x="14" y="8" width="14" height="14" rx="3" fill="#fcd34d"/><text x="13" y="19" font-size="9" fill="#78350f" font-weight="700">10</text></svg>',
    "fraction-lab": '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="18" fill="#fecaca" stroke="#dc2626" stroke-width="2"/><path d="M24 6 L24 42 M6 24 L42 24" stroke="#dc2626" stroke-width="2"/><text x="16" y="20" font-size="8" fill="#991b1b">1/2</text></svg>',
    "gravity-drop": '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 8 Q18 20 16 32" fill="#e2e8f0" stroke="#64748b"/><rect x="28" y="10" width="10" height="6" rx="2" fill="#71717a"/><line x1="33" y1="16" x2="33" y2="28" stroke="#92400e" stroke-width="3"/><circle cx="33" cy="34" r="5" fill="#f97316"/></svg>',
    "pattern-machine": '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="28" width="10" height="10" rx="2" fill="#6ea8fe"/><rect x="18" y="20" width="10" height="10" rx="2" fill="#6ea8fe"/><rect x="28" y="12" width="10" height="10" rx="2" fill="#6ea8fe"/><circle cx="38" cy="10" r="6" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/></svg>',
    "symmetry-studio": '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16" fill="none" stroke="#6ea8fe" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M24 8 L24 40 M8 24 L40 24" stroke="#94a3b8" stroke-width="1"/><path d="M24 14 L30 24 L24 34 L18 24 Z" fill="#a78bfa" opacity=".85"/></svg>',
    "estimation-station": '<svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="14" cy="28" rx="6" ry="5" fill="#f472b6"/><ellipse cx="26" cy="22" rx="6" ry="5" fill="#38bdf8"/><ellipse cx="34" cy="30" rx="6" ry="5" fill="#fbbf24"/><rect x="6" y="34" width="36" height="6" rx="2" fill="#64748b" opacity=".5"/></svg>',
    /* 只有壳和头时这个图标会被看成一条鱼，四条腿是海龟的辨识点。 */
    "turtle-geometry": '<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="#10b981"><ellipse cx="12" cy="18" rx="5" ry="3.2" transform="rotate(-30 12 18)"/><ellipse cx="12" cy="34" rx="5" ry="3.2" transform="rotate(30 12 34)"/><ellipse cx="32" cy="17" rx="4.6" ry="3" transform="rotate(30 32 17)"/><ellipse cx="32" cy="35" rx="4.6" ry="3" transform="rotate(-30 32 35)"/></g><ellipse cx="22" cy="26" rx="14" ry="11" fill="#059669"/><circle cx="22" cy="26" r="6.5" fill="none" stroke="#047857" stroke-width="1.4"/><ellipse cx="37" cy="24" rx="5.5" ry="4.4" fill="#34d399"/><circle cx="39" cy="22.5" r="1.4" fill="#0f172a"/><path d="M8 28 Q4 26 6 22" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/></svg>',
    "doodle-pad": '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="10" width="36" height="28" rx="4" fill="#fffdf8" stroke="#d68a00"/><circle cx="16" cy="22" r="4" fill="#1f6fd0"/><circle cx="26" cy="18" r="4" fill="#d81b73"/><path d="M14 32 Q24 22 34 30" fill="none" stroke="#6b4f36" stroke-width="3" stroke-linecap="round"/></svg>',
    /* 速度箭头的箭头尖要自己画：marker-end 引用的 <marker> 从没定义过，
       浏览器按规范直接忽略，留下的只是一截 6px 的黄色光杆。 */
    "ramp-and-roll": '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 38 L38 38 L8 14 Z" fill="#a78bfa" opacity=".45" stroke="#7c3aed" stroke-width="2"/><circle cx="32" cy="32" r="6" fill="#6ea8fe" stroke="#1e40af"/><path d="M32 26 L32 18" stroke="#fbbf24" stroke-width="2"/><path d="M32 14 L28.5 20 L35.5 20 Z" fill="#fbbf24"/></svg>',
    "light-and-shadow": '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 28 L8 38 L12 38" stroke="#64748b" stroke-width="2"/><path d="M8 28 Q8 18 16 16 L22 28 Z" fill="#fbbf24"/><rect x="26" y="20" width="6" height="18" fill="#5b6b95"/><rect x="34" y="12" width="8" height="26" fill="#334155" opacity=".6"/></svg>',
    "wave-maker": '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 28 Q12 18 20 28 T36 28" fill="none" stroke="#6ea8fe" stroke-width="2.5"/><path d="M4 34 Q12 24 20 34 T36 34" fill="none" stroke="#f472b6" stroke-width="2" opacity=".7"/><circle cx="24" cy="38" r="3" fill="#7ee7ff"/></svg>',
    "dinosaurs": '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 34 Q14 22 28 20 L38 18 Q44 18 46 24 L42 30 Q36 32 28 32 L8 36 Z" fill="#22c55e"/><circle cx="40" cy="22" r="4" fill="#22c55e"/><path d="M28 20 L26 10 L30 8 L32 18" fill="#16a34a"/></svg>',
    "human-body": '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="10" r="6" fill="#94a3b8"/><path d="M16 18 Q24 16 32 18 L30 36 Q24 38 18 36 Z" fill="#64748b"/><path d="M20 24 Q24 20 28 24 L26 30 Q24 32 22 30 Z" fill="#fb7185"/></svg>',
    "space": '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#6ea8fe"/><circle cx="10" cy="14" r="3" fill="#fbbf24"/><circle cx="38" cy="32" r="5" fill="#f97316"/><circle cx="36" cy="12" r="2" fill="#e2e8f0"/></svg>'
  };

  function tileIcon(id) {
    return TILE_ICONS[id] || "";
  }

  /* ================= 卡片插图目录 =================
     上面那些是给 Canvas 用的绘制助手；这一段是成品内联 SVG 插图，
     供专题页的图位在离线 / file:// 下代替单个 emoji 占位。 */

  var CATALOG = {};
  var seq = 0;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function def(name, spec) { CATALOG[name] = spec; }

  /* ---------------- 场景底色 ---------------- */

  /* 海水：上层底色 + 一条起伏的深色水体，给卡片一点纵深。 */
  function sea(top, deep, extra) {
    return '<rect width="160" height="90" fill="' + top + '"/>' +
      '<path d="M0 50 C26 42 48 56 76 49 C106 41 134 55 160 47 L160 90 L0 90Z" fill="' + deep + '"/>' +
      (extra || "");
  }

  /* 阳光层的斜射光柱。 */
  var SUNRAYS =
    '<g fill="#ffffff" opacity=".16">' +
    '<path d="M26 -4 L44 -4 L16 94 L-4 94Z"/>' +
    '<path d="M70 -4 L82 -4 L58 94 L46 94Z"/>' +
    '<path d="M124 -4 L144 -4 L114 94 L94 94Z"/>' +
    '</g>';

  function bubbles(list, fill) {
    var out = '<g fill="' + (fill || "#ffffff") + '" opacity=".38">';
    for (var i = 0; i < list.length; i++) {
      out += '<circle cx="' + list[i][0] + '" cy="' + list[i][1] + '" r="' + list[i][2] + '"/>';
    }
    return out + "</g>";
  }

  /* 花园：天空 + 草地，配一片叶子。 */
  function garden(sky, ground, extra) {
    return '<rect width="160" height="90" fill="' + sky + '"/>' +
      '<path d="M0 64 C28 56 52 72 82 65 C112 58 138 72 160 64 L160 90 L0 90Z" fill="' + ground + '"/>' +
      (extra || "");
  }

  var LEAF =
    '<g opacity=".55">' +
    '<path d="M-6 78 C14 58 40 56 54 66 C40 82 14 88 -6 78Z" fill="#8dc06a"/>' +
    '<path d="M-6 78 C16 72 38 70 54 66" stroke="#6fa64f" stroke-width="1.6" fill="none"/>' +
    '<path d="M150 20 C132 10 116 16 112 28 C126 34 144 32 150 20Z" fill="#9ecb78"/>' +
    "</g>";

  /* ---------------- 海洋生物 ---------------- */

  def("ocean/blue-whale", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "蓝鲸插图",
    desc: "一头蓝灰色的蓝鲸在阳光层游动，背上喷出水柱，腹部有一道道褶沟。",
    bg: sea("#a9dcf3", "#7cc4e4", SUNRAYS + bubbles([[132, 20, 3], [142, 32, 2], [126, 40, 2.2]])),
    art:
      '<g fill="#ffffff" opacity=".75">' +
      '<path d="M22 28 C17 19 21 10 26 5 C26 14 26 21 29 28Z"/>' +
      '<path d="M31 28 C31 20 35 13 40 9 C36 17 35 22 36 28Z"/>' +
      "</g>" +
      '<path d="M10 50 C12 33 42 25 80 29 C106 32 124 40 136 48 C124 56 106 64 80 67 C42 71 12 67 10 50Z" fill="#4a86bd"/>' +
      '<path d="M136 48 C144 41 152 33 157 28 C152 40 152 56 157 69 C152 64 144 56 136 48Z" fill="#3a6d9e"/>' +
      '<path d="M100 32 L110 21 L115 35Z" fill="#3a6d9e"/>' +
      '<path d="M13 55 C36 67 70 69 102 60 C72 70 36 69 13 58Z" fill="#d6ebf6"/>' +
      '<g stroke="#8fbdda" stroke-width="1.5" stroke-linecap="round" fill="none">' +
      '<path d="M24 57 L26 65"/><path d="M32 59 L34 67"/><path d="M40 60 L42 68"/>' +
      '<path d="M48 61 L50 69"/><path d="M56 61 L58 69"/><path d="M64 61 L66 69"/>' +
      "</g>" +
      '<path d="M48 62 C52 74 62 79 70 77 C61 74 54 68 52 61Z" fill="#3a6d9e"/>' +
      '<path d="M10 53 C22 58 38 61 54 62" stroke="#2f5f8a" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
      '<circle cx="24" cy="45" r="2.6" fill="#12303f"/>'
  });

  def("ocean/clownfish", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "小丑鱼插图",
    desc: "橙色的小丑鱼身上有三条带黑边的白色条纹，身下是紫红色的海葵触手。",
    bg: sea("#9fd9f2", "#74c0e2", SUNRAYS + bubbles([[20, 18, 2.4], [30, 30, 1.8]])),
    art:
      '<g fill="#d081b8" opacity=".9">' +
      '<path d="M6 90 C4 74 10 66 18 66 C26 66 30 76 28 90Z"/>' +
      '<path d="M28 90 C26 72 34 62 43 63 C52 64 54 76 52 90Z"/>' +
      '<path d="M52 90 C52 76 58 68 66 69 C74 70 76 80 74 90Z"/>' +
      '<path d="M112 90 C110 74 118 66 126 67 C134 68 136 78 134 90Z"/>' +
      '<path d="M134 90 C134 78 140 71 148 72 C156 73 158 82 156 90Z"/>' +
      "</g>" +
      '<path d="M74 24 C86 15 102 15 110 22 C99 22 87 24 79 28Z" fill="#e8761c"/>' +
      '<path d="M72 62 C76 72 86 76 93 73 C84 71 78 67 76 61Z" fill="#e8761c"/>' +
      '<ellipse cx="78" cy="45" rx="44" ry="20" fill="#f2892b"/>' +
      '<path d="M118 45 C130 36 142 29 150 26 C144 38 144 52 150 64 C142 61 130 54 118 45Z" fill="#ea7a1c"/>' +
      '<g fill="#fdf6ec" stroke="#2b2118" stroke-width="2.4" stroke-linejoin="round">' +
      '<path d="M56 29 C51 38 51 52 56 61 C61 62 65 62 69 61 C64 51 64 39 69 30 C65 28 60 28 56 29Z"/>' +
      '<path d="M88 26 C84 37 84 53 88 64 C93 65 97 64 101 63 C96 52 96 38 101 27 C97 26 92 25 88 26Z"/>' +
      '<path d="M114 34 C112 41 112 49 114 56 L120 55 C118 48 118 42 120 35Z"/>' +
      "</g>" +
      '<circle cx="45" cy="42" r="5" fill="#fdf6ec"/>' +
      '<circle cx="44" cy="42" r="2.8" fill="#241a12"/>' +
      '<path d="M36 49 C40 52 44 53 48 53" stroke="#c2611a" stroke-width="2" stroke-linecap="round" fill="none"/>'
  });

  def("ocean/sea-turtle", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "绿海龟插图",
    desc: "一只绿海龟从上方看去，背甲上有一块块盾片，四只桨状的脚在划水。",
    bg: sea("#93d2ee", "#63b6dc", SUNRAYS + bubbles([[136, 22, 2.6], [146, 34, 1.8]])),
    art:
      '<path d="M52 24 C40 10 22 6 14 13 C23 20 36 28 47 33Z" fill="#4f9c79"/>' +
      '<path d="M52 66 C40 80 22 84 14 77 C23 70 36 62 47 57Z" fill="#4f9c79"/>' +
      '<path d="M112 28 C122 18 136 16 141 22 C133 27 123 33 116 37Z" fill="#4f9c79"/>' +
      '<path d="M112 62 C122 72 136 74 141 68 C133 63 123 57 116 53Z" fill="#4f9c79"/>' +
      '<path d="M40 45 C30 39 20 40 15 46 C20 52 30 53 40 48Z" fill="#59a984"/>' +
      '<circle cx="24" cy="43" r="2.4" fill="#123528"/>' +
      '<ellipse cx="82" cy="45" rx="42" ry="30" fill="#3f8f6d"/>' +
      '<g fill="none" stroke="#2d6a51" stroke-width="2.4" stroke-linejoin="round">' +
      '<path d="M82 17 L96 26 L96 44 L82 53 L68 44 L68 26Z"/>' +
      '<path d="M82 53 L96 62 L82 73 L68 62Z"/>' +
      '<path d="M68 26 L52 22 L46 38 L54 47 L68 44Z"/>' +
      '<path d="M96 26 L112 22 L118 38 L110 47 L96 44Z"/>' +
      '<path d="M54 47 L52 62 L68 62"/><path d="M110 47 L112 62 L96 62"/>' +
      "</g>" +
      '<ellipse cx="82" cy="45" rx="42" ry="30" fill="none" stroke="#2d6a51" stroke-width="3"/>'
  });

  def("ocean/whale-shark", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "鲸鲨插图",
    desc: "灰蓝色的鲸鲨张着又宽又扁的嘴，背上排着一格格白色斑点。",
    bg: sea("#7fc4e6", "#4e9fca", SUNRAYS + bubbles([[18, 22, 2.2], [26, 12, 1.6]])),
    art:
      '<path d="M8 44 C8 30 30 21 62 23 C92 25 116 33 133 44 C116 55 92 63 62 65 C30 67 8 58 8 44Z" fill="#54798f"/>' +
      '<path d="M133 44 C142 37 151 29 157 25 C151 37 151 51 157 64 C151 60 142 52 133 44Z" fill="#456678"/>' +
      '<path d="M92 26 L103 12 L110 30Z" fill="#456678"/>' +
      '<path d="M56 60 C58 74 70 80 79 78 C69 74 62 68 60 59Z" fill="#456678"/>' +
      '<path d="M8 38 C18 40 30 42 44 44 C30 47 18 49 8 51Z" fill="#2c4756"/>' +
      '<g fill="#e9f3f7">' +
      '<circle cx="46" cy="32" r="2.2"/><circle cx="62" cy="29" r="2.2"/><circle cx="78" cy="30" r="2.2"/>' +
      '<circle cx="94" cy="33" r="2.2"/><circle cx="110" cy="38" r="2.2"/>' +
      '<circle cx="54" cy="42" r="2.2"/><circle cx="70" cy="40" r="2.2"/><circle cx="86" cy="41" r="2.2"/>' +
      '<circle cx="102" cy="45" r="2.2"/><circle cx="118" cy="47" r="2.2"/>' +
      '<circle cx="46" cy="53" r="2.2"/><circle cx="62" cy="52" r="2.2"/><circle cx="78" cy="53" r="2.2"/>' +
      '<circle cx="94" cy="55" r="2.2"/><circle cx="110" cy="55" r="2.2"/>' +
      "</g>" +
      '<g stroke="#3c5b6c" stroke-width="1.6" stroke-linecap="round" fill="none">' +
      '<path d="M30 48 L28 58"/><path d="M37 50 L35 60"/><path d="M44 51 L42 61"/>' +
      "</g>" +
      '<circle cx="22" cy="36" r="2.6" fill="#16303e"/>'
  });

  def("ocean/moon-jelly", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "月亮水母插图",
    desc: "半透明的月亮水母，圆钟形伞体上有四个粉色马蹄形环，下面拖着细长触手。",
    bg: sea("#63a9cf", "#39749c", bubbles([[24, 66, 2.4], [136, 58, 2], [30, 30, 1.6]])),
    art:
      '<g stroke="#dcecf7" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85">' +
      '<path d="M58 48 C54 62 58 76 52 88"/><path d="M68 50 C66 64 70 78 64 90"/>' +
      '<path d="M80 51 C80 66 82 78 78 90"/><path d="M92 50 C94 64 90 78 96 90"/>' +
      '<path d="M102 48 C106 62 102 76 108 88"/>' +
      "</g>" +
      '<g fill="#eaf5fb" opacity=".92">' +
      '<path d="M70 46 C64 62 68 76 62 86 C74 80 76 62 78 47Z"/>' +
      '<path d="M90 46 C96 62 92 76 98 86 C86 80 84 62 82 47Z"/>' +
      "</g>" +
      '<path d="M34 50 C34 28 54 14 80 14 C106 14 126 28 126 50 C114 46 106 52 96 50 C88 48 84 54 76 52 C66 49 50 46 34 50Z" fill="#e4f1fa" opacity=".93"/>' +
      '<path d="M34 50 C34 28 54 14 80 14 C106 14 126 28 126 50" fill="none" stroke="#b9d8ec" stroke-width="2.4"/>' +
      '<g fill="none" stroke="#eda8c6" stroke-width="4" stroke-linecap="round">' +
      '<path d="M62 34 C56 40 56 48 62 52"/><path d="M98 34 C104 40 104 48 98 52"/>' +
      '<path d="M74 26 C68 30 66 36 68 42"/><path d="M86 26 C92 30 94 36 92 42"/>' +
      "</g>" +
      '<g fill="#ffffff" opacity=".6">' +
      '<path d="M48 34 C54 26 62 21 70 19 C60 24 52 30 48 34Z"/>' +
      "</g>"
  });

  def("ocean/sperm-whale", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "抹香鲸插图",
    desc: "抹香鲸有一颗又大又方的头，下颌又细又长，正朝着黑暗的深处下潜。",
    bg: sea("#2e5f85", "#173d5c", bubbles([[130, 18, 2.6], [140, 30, 1.8], [122, 34, 1.6]])),
    art:
      '<path d="M6 32 C6 23 15 19 27 19 C49 19 71 26 93 34 C113 41 129 46 141 50 C127 57 109 63 89 67 C67 71 44 73 26 71 C13 69 6 62 6 52Z" fill="#5c5d66"/>' +
      '<path d="M141 50 C148 43 155 35 158 30 C154 42 154 58 158 71 C154 66 148 58 141 50Z" fill="#4a4b53"/>' +
      '<path d="M97 36 C103 27 112 28 116 37 C121 31 128 33 131 41 C135 37 139 39 141 44 L141 50 C126 45 111 40 97 38Z" fill="#4a4b53"/>' +
      '<path d="M9 58 C31 63 55 66 79 66" stroke="#3a3b43" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
      '<path d="M52 66 C56 78 68 84 77 82 C66 78 58 72 56 65Z" fill="#4a4b53"/>' +
      '<g stroke="#70717a" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".55">' +
      '<path d="M14 34 C20 36 26 37 32 37"/><path d="M13 42 C20 44 27 45 34 45"/><path d="M14 50 C21 52 28 53 35 53"/>' +
      "</g>" +
      '<circle cx="28" cy="54" r="2.6" fill="#1e1f26"/>' +
      '<g fill="#eaf2f8" opacity=".8">' +
      '<path d="M14 21 C8 14 2 9 -5 6 C3 8 10 13 17 19Z"/>' +
      '<path d="M17 19 C13 11 11 4 11 -3 C16 4 19 11 21 18Z"/>' +
      "</g>"
  });

  def("ocean/giant-squid", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "大王乌贼插图",
    desc: "暗红色的大王乌贼睁着一只很大的眼睛，八条腕和两条更长的触手向下张开。",
    bg: sea("#123a56", "#08202f", bubbles([[24, 20, 2.2], [136, 26, 1.8]])),
    art:
      /* 短腕左右各四条才是八条；两条带端锤的长触手另算。 */
      '<g stroke="#b8443d" stroke-width="5" fill="none" stroke-linecap="round">' +
      '<path d="M78 62 C64 70 46 74 28 72"/><path d="M80 64 C70 76 54 84 36 86"/>' +
      '<path d="M82 65 C74 77 62 86 48 89"/>' +
      '<path d="M84 66 C80 78 72 88 62 90"/><path d="M90 66 C92 78 90 86 86 90"/>' +
      '<path d="M93 65 C98 77 103 85 108 88"/>' +
      '<path d="M96 64 C104 74 116 82 130 84"/><path d="M98 61 C110 66 126 68 142 66"/>' +
      "</g>" +
      '<g stroke="#a03c36" stroke-width="3" fill="none" stroke-linecap="round">' +
      '<path d="M82 64 C66 80 40 88 12 86"/><path d="M94 64 C112 78 136 86 158 84"/>' +
      "</g>" +
      '<g fill="#a03c36">' +
      '<ellipse cx="14" cy="85" rx="8" ry="4.5" transform="rotate(-12 14 85)"/>' +
      '<ellipse cx="156" cy="83" rx="8" ry="4.5" transform="rotate(12 156 83)"/>' +
      "</g>" +
      '<path d="M88 6 C104 10 114 18 111 26 C104 21 95 16 88 13Z" fill="#c04c44"/>' +
      '<path d="M88 6 C72 10 62 18 65 26 C72 21 81 16 88 13Z" fill="#c04c44"/>' +
      '<path d="M88 8 C104 22 110 40 105 53 C97 62 79 62 71 53 C66 40 72 22 88 8Z" fill="#c0453f"/>' +
      '<ellipse cx="88" cy="58" rx="18" ry="11" fill="#cf5a4e"/>' +
      '<circle cx="75" cy="56" r="7" fill="#f4e3c9"/>' +
      '<circle cx="74" cy="56" r="3.8" fill="#1d120e"/>' +
      '<g fill="#e07d6f" opacity=".5">' +
      '<ellipse cx="88" cy="26" rx="7" ry="12"/>' +
      "</g>"
  });

  def("ocean/anglerfish", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "鮟鱇鱼插图",
    desc: "深海鮟鱇鱼张着满是尖牙的大嘴，头顶垂下一盏发光的小灯笼照亮周围。",
    bg: sea("#0a1f30", "#04121d", ""),
    art:
      '<circle cx="28" cy="16" r="26" fill="#ffe89a" opacity=".13"/>' +
      '<circle cx="28" cy="16" r="15" fill="#ffe89a" opacity=".22"/>' +
      '<path d="M98 46 C112 38 128 31 142 27 C136 40 136 54 142 69 C128 63 112 55 98 48Z" fill="#241b2f"/>' +
      '<path d="M30 26 L78 46 L30 66Z" fill="#0f0a17"/>' +
      '<path d="M104 46 C104 23 86 10 64 12 C50 13 39 19 33 27 L78 46 L33 65 C39 73 50 79 64 80 C86 82 104 69 104 46Z" fill="#2b2137"/>' +
      '<g fill="#f4ecd8">' +
      '<path d="M36 28 L43 31 L37 40Z"/><path d="M45 32 L52 35 L46 44Z"/>' +
      '<path d="M54 36 L61 39 L55 47Z"/><path d="M63 40 L70 43 L64 49Z"/>' +
      '<path d="M36 64 L43 61 L37 52Z"/><path d="M45 60 L52 57 L46 48Z"/>' +
      '<path d="M54 56 L61 53 L55 45Z"/><path d="M63 52 L70 49 L64 43Z"/>' +
      "</g>" +
      '<path d="M88 15 C97 11 105 14 108 21 C101 18 94 16 88 19Z" fill="#241b2f"/>' +
      '<path d="M80 74 C83 84 91 89 98 87 C90 83 85 79 83 73Z" fill="#241b2f"/>' +
      '<path d="M66 16 C56 3 40 3 30 12" stroke="#4b4054" stroke-width="3.4" stroke-linecap="round" fill="none"/>' +
      '<circle cx="28" cy="14" r="7" fill="#ffe89a"/>' +
      '<circle cx="26" cy="12" r="2.4" fill="#fffdf2"/>' +
      '<circle cx="55" cy="25" r="4.4" fill="#f2ead6"/>' +
      '<circle cx="54" cy="25" r="2.2" fill="#161020"/>' +
      '<path d="M70 22 C80 20 90 22 97 27" stroke="#453a55" stroke-width="2.4" stroke-linecap="round" fill="none"/>'
  });

  def("ocean/colossal-squid", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "大王酸浆鱿插图",
    desc: "大王酸浆鱿身体粗壮，触手上带着能转动的钩子，眼睛比拳头还大。",
    bg: sea("#132a44", "#071626", bubbles([[136, 18, 2], [20, 28, 1.8]])),
    art:
      /* 和大王乌贼同款：短腕左右各四条共八条，长触手两条。 */
      '<g stroke="#9c5b8e" stroke-width="6" fill="none" stroke-linecap="round">' +
      '<path d="M76 64 C60 72 42 76 24 74"/><path d="M80 66 C70 78 54 86 38 88"/>' +
      '<path d="M83 67 C75 79 64 88 52 90"/>' +
      '<path d="M86 68 C82 80 74 88 66 90"/><path d="M92 68 C94 80 92 88 90 90"/>' +
      '<path d="M95 67 C100 79 105 87 112 90"/>' +
      '<path d="M98 66 C106 76 118 84 132 86"/><path d="M100 62 C112 68 128 70 144 68"/>' +
      "</g>" +
      '<g stroke="#84497a" stroke-width="4" fill="none" stroke-linecap="round">' +
      '<path d="M82 66 C64 82 38 90 10 88"/><path d="M96 66 C114 80 138 88 158 86"/>' +
      "</g>" +
      '<g stroke="#f0dcc4" stroke-width="1.8" fill="none" stroke-linecap="round">' +
      '<path d="M16 84 L12 80"/><path d="M22 86 L18 82"/><path d="M28 88 L24 84"/>' +
      '<path d="M144 82 L148 78"/><path d="M150 84 L154 80"/>' +
      "</g>" +
      '<path d="M88 4 C106 8 118 18 114 27 C106 21 96 15 88 12Z" fill="#a95c9b"/>' +
      '<path d="M88 4 C70 8 58 18 62 27 C70 21 80 15 88 12Z" fill="#a95c9b"/>' +
      '<path d="M88 6 C108 22 116 42 110 55 C101 65 79 65 70 55 C64 42 70 22 88 6Z" fill="#8e5286"/>' +
      '<ellipse cx="88" cy="60" rx="20" ry="12" fill="#a1618f"/>' +
      '<circle cx="72" cy="58" r="9" fill="#f6e9d2"/>' +
      '<circle cx="71" cy="58" r="5" fill="#1b0f18"/>' +
      '<circle cx="69" cy="55" r="1.6" fill="#ffffff"/>' +
      '<g fill="#a1618f" opacity=".55"><ellipse cx="88" cy="28" rx="8" ry="14"/></g>'
  });

  def("ocean/snailfish", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "深海狮子鱼插图",
    desc: "淡粉色的深海狮子鱼身体像果冻一样半透明，尾巴细细地拖在最深的海沟里。",
    bg: sea("#08161f", "#030b12", bubbles([[26, 22, 1.6], [34, 14, 1.2]], "#9fd9ea")),
    art:
      '<path d="M14 46 C14 32 29 24 47 25 C65 26 81 35 97 45 C111 53 127 59 141 62 C127 64 110 62 96 57 C82 63 64 66 46 64 C28 62 14 56 14 46Z" fill="#f0d3da" opacity=".9"/>' +
      '<path d="M14 46 C14 32 29 24 47 25 C65 26 81 35 97 45 C111 53 127 59 141 62 C127 64 110 62 96 57 C82 63 64 66 46 64 C28 62 14 56 14 46Z" fill="none" stroke="#ffffff" stroke-width="1.6" opacity=".45"/>' +
      '<path d="M40 30 C56 28 74 36 92 47 C74 42 56 36 40 34Z" fill="#ffffff" opacity=".28"/>' +
      '<ellipse cx="40" cy="50" rx="14" ry="8" fill="#d9adb8" opacity=".65"/>' +
      '<path d="M30 40 C34 36 40 35 45 37" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" opacity=".6"/>' +
      '<circle cx="26" cy="44" r="3" fill="#7d5a63"/>' +
      '<circle cx="25" cy="43" r="1.1" fill="#ffffff" opacity=".8"/>' +
      '<path d="M14 50 C20 54 28 56 36 56" stroke="#cfa2ae" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
      '<path d="M44 62 C48 70 56 74 62 73 C54 70 49 66 47 61Z" fill="#e7c3cc" opacity=".85"/>'
  });

  /* ---------------- 昆虫与近亲 ---------------- */

  def("insects/honeybee", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "西方蜜蜂插图",
    desc: "一只蜜蜂张着透明的翅膀，黄黑相间的腹部和毛茸茸的胸部都看得很清楚。",
    bg: garden("#eaf6dc", "#cfe8b4", LEAF),
    art:
      '<defs><clipPath id="beeAbd{{U}}"><ellipse cx="99" cy="50" rx="28" ry="18"/></clipPath></defs>' +
      '<g fill="#e4f0f8" opacity=".85" stroke="#b6d0e2" stroke-width="1.4">' +
      '<ellipse cx="82" cy="24" rx="23" ry="10" transform="rotate(-20 82 24)"/>' +
      '<ellipse cx="99" cy="28" rx="17" ry="8" transform="rotate(-8 99 28)"/>' +
      "</g>" +
      '<g clip-path="url(#beeAbd{{U}})">' +
      '<ellipse cx="99" cy="50" rx="28" ry="18" fill="#f0b429"/>' +
      '<rect x="86" y="30" width="9" height="40" fill="#33261a"/>' +
      '<rect x="104" y="30" width="9" height="40" fill="#33261a"/>' +
      '<rect x="120" y="30" width="8" height="40" fill="#33261a"/>' +
      "</g>" +
      '<path d="M127 50 L138 50" stroke="#33261a" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="64" cy="48" rx="18" ry="16" fill="#8a5a2b"/>' +
      '<ellipse cx="64" cy="48" rx="18" ry="16" fill="none" stroke="#b58248" stroke-width="3" stroke-dasharray="2 3"/>' +
      '<g stroke="#33261a" stroke-width="2.8" fill="none" stroke-linecap="round">' +
      '<path d="M56 62 C54 71 50 77 44 81"/><path d="M68 63 C68 73 66 79 62 83"/><path d="M82 62 C85 72 85 78 83 83"/>' +
      "</g>" +
      '<circle cx="42" cy="46" r="12.5" fill="#33261a"/>' +
      '<ellipse cx="37" cy="44" rx="4.2" ry="6.2" fill="#6f5e48"/>' +
      '<g stroke="#33261a" stroke-width="2.4" fill="none" stroke-linecap="round">' +
      '<path d="M35 36 C29 28 25 24 18 22"/><path d="M44 34 C42 25 40 21 36 15"/>' +
      "</g>"
  });

  def("insects/monarch", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "帝王蝶插图",
    desc: "帝王蝶展开橙色的翅膀，翅脉是黑色的，边缘排着一圈白色小点。",
    bg: garden("#f2f7e2", "#d8ecba", LEAF),
    art: (function () {
      var wing =
        '<path d="M78 42 C66 20 46 8 30 12 C17 15 14 32 24 43 C35 54 60 51 78 42Z" fill="#e8761f" stroke="#2b1a10" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M78 48 C64 58 46 70 33 68 C22 66 20 53 30 47 C43 40 63 41 78 48Z" fill="#dd6318" stroke="#2b1a10" stroke-width="3" stroke-linejoin="round"/>' +
        '<g stroke="#2b1a10" stroke-width="2" fill="none" stroke-linecap="round">' +
        '<path d="M76 42 L34 20"/><path d="M76 43 L26 30"/><path d="M76 45 L24 42"/>' +
        '<path d="M76 50 L32 54"/><path d="M76 51 L36 64"/>' +
        "</g>" +
        '<g fill="#fdf7e8">' +
        '<circle cx="27" cy="17" r="2.2"/><circle cx="19" cy="25" r="2.2"/><circle cx="17" cy="35" r="2.2"/>' +
        '<circle cx="22" cy="44" r="2.2"/><circle cx="26" cy="52" r="2.2"/><circle cx="30" cy="62" r="2.2"/>' +
        '<circle cx="40" cy="68" r="2.2"/>' +
        "</g>";
      return "<g>" + wing + "</g>" +
        '<g transform="translate(160,0) scale(-1,1)">' + wing + "</g>" +
        '<ellipse cx="80" cy="50" rx="5" ry="21" fill="#2b1a10"/>' +
        '<g fill="#fdf7e8"><circle cx="80" cy="42" r="1.6"/><circle cx="80" cy="52" r="1.6"/><circle cx="80" cy="62" r="1.6"/></g>' +
        '<circle cx="80" cy="27" r="6" fill="#2b1a10"/>' +
        '<g stroke="#2b1a10" stroke-width="2.4" fill="none" stroke-linecap="round">' +
        '<path d="M77 23 C72 15 68 11 63 9"/><path d="M83 23 C88 15 92 11 97 9"/>' +
        "</g>" +
        '<g fill="#2b1a10"><circle cx="62" cy="8" r="3"/><circle cx="98" cy="8" r="3"/></g>';
    })()
  });

  def("insects/ant", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "蚂蚁插图",
    desc: "一只蚂蚁的头、胸、腹三段分得很清楚，六条腿撑在地上，触角是折弯的。",
    bg: garden("#f4f2e0", "#ddd9b6",
      '<g fill="#c9c39a" opacity=".7"><ellipse cx="30" cy="80" rx="20" ry="5"/><ellipse cx="130" cy="84" rx="24" ry="6"/></g>'),
    art:
      '<g stroke="#5d2c15" stroke-width="2.8" fill="none" stroke-linecap="round">' +
      '<path d="M58 44 C50 32 44 26 34 22"/><path d="M62 52 C56 64 50 72 40 78"/>' +
      '<path d="M72 42 C70 30 68 24 62 18"/><path d="M74 54 C74 66 72 74 66 80"/>' +
      '<path d="M84 44 C90 33 96 27 106 23"/><path d="M84 53 C90 65 96 73 106 79"/>' +
      "</g>" +
      '<ellipse cx="108" cy="47" rx="24" ry="17" fill="#6e3319"/>' +
      '<ellipse cx="102" cy="42" rx="10" ry="6" fill="#8c4626" opacity=".7"/>' +
      '<rect x="78" y="43" width="10" height="7" rx="3.5" fill="#8a4523"/>' +
      '<ellipse cx="68" cy="46" rx="14" ry="11" fill="#8a4523"/>' +
      '<ellipse cx="36" cy="43" rx="15" ry="13" fill="#7a3b1f"/>' +
      '<circle cx="30" cy="39" r="3.4" fill="#241009"/>' +
      '<g stroke="#7a3b1f" stroke-width="2.8" fill="none" stroke-linecap="round">' +
      '<path d="M28 34 L18 26 L20 14"/><path d="M38 31 L34 20 L42 11"/>' +
      "</g>" +
      '<g stroke="#5d2c15" stroke-width="2.6" fill="none" stroke-linecap="round">' +
      '<path d="M24 46 C18 48 14 47 11 44"/><path d="M25 50 C19 54 15 55 11 53"/>' +
      "</g>"
  });

  def("insects/ladybug", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "瓢虫插图",
    desc: "红色的瓢虫从上面看是一个圆顶，鞘翅中间有一道缝，两边各有几个黑点。",
    bg: garden("#e8f6d8", "#c6e5a6", LEAF),
    art:
      '<g stroke="#241713" stroke-width="2.8" fill="none" stroke-linecap="round">' +
      '<path d="M62 26 C56 16 48 12 40 12"/><path d="M60 46 C50 44 42 44 34 46"/><path d="M62 66 C56 76 48 80 40 80"/>' +
      '<path d="M104 24 C110 14 118 10 126 10"/><path d="M110 46 C120 44 128 44 136 46"/><path d="M104 68 C110 78 118 82 126 82"/>' +
      "</g>" +
      '<circle cx="86" cy="46" r="31" fill="#d93a2b"/>' +
      '<path d="M56 40 C56 30 64 24 72 24 L74 68 C64 68 56 60 56 50Z" fill="#241713"/>' +
      '<g fill="#f6efe4"><circle cx="62" cy="38" r="3.4"/><circle cx="62" cy="54" r="3.4"/></g>' +
      '<path d="M86 15 L86 77" stroke="#241713" stroke-width="3.4"/>' +
      '<g fill="#241713">' +
      '<circle cx="74" cy="32" r="5.6"/><circle cx="72" cy="52" r="5"/><circle cx="80" cy="66" r="4.4"/>' +
      '<circle cx="98" cy="32" r="5.6"/><circle cx="100" cy="52" r="5"/><circle cx="92" cy="66" r="4.4"/>' +
      "</g>" +
      '<path d="M66 28 C74 22 84 19 94 20" stroke="#f28b7d" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/>' +
      '<g stroke="#241713" stroke-width="2.4" fill="none" stroke-linecap="round">' +
      '<path d="M60 30 C54 22 50 18 44 16"/><path d="M60 62 C54 70 50 74 44 76"/>' +
      "</g>"
  });

  def("insects/cricket", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "蟋蟀插图",
    desc: "蟋蟀有很长的触角和一对粗壮的后腿，背上折着两片会互相摩擦发声的翅膀。",
    bg: garden("#eef4dd", "#cfe3ad",
      '<g stroke="#9dc078" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8">' +
      '<path d="M18 90 C16 74 20 62 26 54"/><path d="M140 90 C142 74 138 62 132 54"/>' +
      "</g>"),
    art:
      '<g stroke="#5b4a22" stroke-width="2.6" fill="none" stroke-linecap="round">' +
      '<path d="M56 58 C52 70 46 78 38 82"/><path d="M74 60 C74 72 70 80 64 84"/>' +
      "</g>" +
      '<path d="M92 44 C108 38 122 48 120 62 C116 72 102 73 94 64Z" fill="#6b5a2f"/>' +
      '<path d="M118 60 C128 66 138 72 146 80" stroke="#6b5a2f" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<g stroke="#6b5a2f" stroke-width="2.6" fill="none" stroke-linecap="round">' +
      '<path d="M146 80 L156 78"/><path d="M146 80 L152 88"/>' +
      "</g>" +
      '<ellipse cx="80" cy="48" rx="34" ry="15" fill="#7d6b3a"/>' +
      '<path d="M56 39 C78 32 102 37 112 48 C100 57 74 59 56 52Z" fill="#907c46"/>' +
      '<g stroke="#6b5a2f" stroke-width="1.6" fill="none" stroke-linecap="round">' +
      '<path d="M62 41 C78 38 96 41 106 47"/><path d="M62 46 C78 44 96 46 108 50"/><path d="M64 51 C80 50 96 51 106 53"/>' +
      "</g>" +
      '<path d="M108 44 C118 42 126 44 130 48 C124 50 116 50 110 49Z" fill="#6b5a2f"/>' +
      '<ellipse cx="42" cy="44" rx="13" ry="12" fill="#6b5a2f"/>' +
      '<circle cx="36" cy="40" r="3.2" fill="#231b09"/>' +
      '<g stroke="#4f411d" stroke-width="2" fill="none" stroke-linecap="round">' +
      '<path d="M34 36 C24 26 16 18 4 12"/><path d="M36 46 C24 44 14 40 2 32"/>' +
      "</g>"
  });

  def("insects/firefly", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "萤火虫插图",
    desc: "夜色里一只萤火虫的腹部发出黄绿色的冷光，把周围照亮了一小圈。",
    bg: '<rect width="160" height="90" fill="#1c2a3f"/>' +
      '<path d="M0 62 C28 54 52 70 82 63 C112 56 138 70 160 62 L160 90 L0 90Z" fill="#14202f"/>' +
      '<g fill="#f6f0b8" opacity=".55"><circle cx="26" cy="18" r="1.6"/><circle cx="48" cy="10" r="1.2"/><circle cx="140" cy="16" r="1.4"/><circle cx="120" cy="8" r="1"/></g>',
    art:
      '<circle cx="126" cy="50" r="32" fill="#f7e58a" opacity=".15"/>' +
      '<circle cx="126" cy="50" r="21" fill="#f7e58a" opacity=".25"/>' +
      '<g fill="#dfe9f2" opacity=".4" stroke="#b9cfe2" stroke-width="1.2">' +
      '<ellipse cx="86" cy="28" rx="26" ry="9" transform="rotate(-14 86 28)"/>' +
      "</g>" +
      '<ellipse cx="124" cy="50" rx="16" ry="11" fill="#f6e37c"/>' +
      '<ellipse cx="128" cy="50" rx="9" ry="7" fill="#fdf8cf"/>' +
      '<g stroke="#3a2418" stroke-width="2.6" fill="none" stroke-linecap="round">' +
      '<path d="M62 58 C58 68 52 75 44 79"/><path d="M80 61 C80 71 77 78 71 82"/>' +
      '<path d="M98 60 C100 70 99 77 95 82"/>' +
      "</g>" +
      '<path d="M62 34 C90 28 114 34 122 46 C114 58 90 62 62 56Z" fill="#4a3b2a"/>' +
      '<path d="M62 45 L121 45" stroke="#2f251a" stroke-width="2.2"/>' +
      '<g stroke="#5f4c36" stroke-width="1.6" fill="none" stroke-linecap="round">' +
      '<path d="M70 38 C88 34 104 37 114 43"/><path d="M70 52 C88 55 104 52 114 47"/>' +
      "</g>" +
      '<path d="M46 32 C60 29 70 33 70 45 C70 57 60 61 46 58 C37 54 37 36 46 32Z" fill="#d4602f"/>' +
      '<ellipse cx="55" cy="45" rx="4.5" ry="7" fill="#3a2418"/>' +
      '<ellipse cx="36" cy="45" rx="9" ry="8" fill="#3a2418"/>' +
      '<circle cx="31" cy="42" r="2.2" fill="#7c6a52"/>' +
      '<g stroke="#3a2418" stroke-width="2.2" fill="none" stroke-linecap="round">' +
      '<path d="M30 39 C22 32 16 28 8 26"/><path d="M31 51 C24 56 19 61 15 68"/>' +
      "</g>"
  });

  def("insects/mantis", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "螳螂插图",
    desc: "绿色的螳螂立起一对带刺的前足，三角形的头转过来正看着你。",
    bg: garden("#e9f6db", "#c8e5a5", LEAF),
    art:
      '<path d="M96 50 C112 55 124 64 130 76" stroke="#6fae4a" stroke-width="17" stroke-linecap="round" fill="none"/>' +
      '<path d="M52 44 C68 42 84 46 96 52" stroke="#5f9c3e" stroke-width="13" stroke-linecap="round" fill="none"/>' +
      '<path d="M90 42 C110 42 126 54 132 68 C116 64 100 56 90 50Z" fill="#83c25b" opacity=".92"/>' +
      '<path d="M92 44 C110 46 124 56 130 66" stroke="#6aa845" stroke-width="1.8" fill="none"/>' +
      '<g stroke="#5f9c3e" stroke-width="3" fill="none" stroke-linecap="round">' +
      '<path d="M74 52 C72 64 68 72 60 78"/><path d="M88 54 C90 66 88 74 82 80"/>' +
      "</g>" +
      '<g fill="none" stroke="#5f9c3e" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M56 48 L42 62"/><path d="M56 44 L44 58"/>' +
      "</g>" +
      '<g fill="none" stroke="#5f9c3e" stroke-width="6" stroke-linecap="round">' +
      '<path d="M42 62 L64 70"/><path d="M44 58 L64 66"/>' +
      "</g>" +
      '<g stroke="#3f7a26" stroke-width="1.8" stroke-linecap="round">' +
      '<path d="M48 64 L46 70"/><path d="M54 66 L52 72"/><path d="M60 68 L58 74"/>' +
      "</g>" +
      '<path d="M28 30 C40 26 52 30 52 40 C52 50 40 54 28 50 C21 46 21 34 28 30Z" fill="#6fae4a"/>' +
      '<circle cx="30" cy="35" r="6.5" fill="#9ed67a"/>' +
      '<circle cx="30" cy="35" r="2.2" fill="#20340f"/>' +
      '<circle cx="34" cy="47" r="5" fill="#9ed67a"/>' +
      '<circle cx="34" cy="47" r="1.8" fill="#20340f"/>' +
      '<g stroke="#5f9c3e" stroke-width="2.2" fill="none" stroke-linecap="round">' +
      '<path d="M28 28 C22 18 18 12 10 8"/><path d="M38 26 C36 16 34 10 30 4"/>' +
      "</g>"
  });

  def("insects/spider", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "蜘蛛插图",
    desc: "蜘蛛有八条腿和前后两段身体，背景是一张放射状的蛛网。",
    bg: garden("#e7efd9", "#cbdcb0",
      '<g stroke="#ffffff" stroke-width="1.3" fill="none" opacity=".75">' +
      '<path d="M80 46 L10 -6"/><path d="M80 46 L80 -10"/><path d="M80 46 L150 -6"/>' +
      '<path d="M80 46 L4 32"/><path d="M80 46 L156 32"/>' +
      '<path d="M22 6 C50 18 110 18 138 6"/><path d="M14 20 C46 34 114 34 146 20"/>' +
      '<path d="M8 34 C44 50 116 50 152 34"/>' +
      "</g>"),
    art:
      '<g stroke="#3f3126" stroke-width="3.4" fill="none" stroke-linecap="round">' +
      '<path d="M62 42 C48 30 34 22 18 18"/><path d="M62 46 C46 40 30 36 12 34"/>' +
      '<path d="M62 52 C46 54 30 58 14 64"/><path d="M64 56 C50 64 38 72 26 82"/>' +
      '<path d="M76 40 C82 28 92 18 106 12"/><path d="M80 44 C92 36 108 30 126 28"/>' +
      '<path d="M80 54 C94 56 110 60 126 66"/><path d="M78 58 C88 68 100 76 114 82"/>' +
      "</g>" +
      '<ellipse cx="96" cy="49" rx="25" ry="21" fill="#4b3a2e"/>' +
      '<g fill="#c9b28c" opacity=".85">' +
      '<path d="M96 32 L102 42 L96 50 L90 42Z"/>' +
      '<path d="M96 54 L101 61 L96 67 L91 61Z"/>' +
      '<circle cx="80" cy="46" r="3"/><circle cx="112" cy="46" r="3"/>' +
      "</g>" +
      '<ellipse cx="66" cy="47" rx="15" ry="13" fill="#5c4838"/>' +
      '<g fill="#241a12">' +
      '<circle cx="57" cy="42" r="2.6"/><circle cx="63" cy="40" r="2"/>' +
      '<circle cx="56" cy="49" r="2.2"/><circle cx="62" cy="51" r="1.8"/>' +
      "</g>" +
      '<g stroke="#3f3126" stroke-width="2.4" fill="none" stroke-linecap="round">' +
      '<path d="M53 46 C48 48 44 50 41 54"/>' +
      "</g>"
  });

  def("insects/stag-beetle", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "欧洲深山锹甲插图",
    desc: "锹甲有一对像鹿角一样的大上颚，背上是一层发亮的深褐色鞘翅。",
    bg: garden("#f0eddb", "#d7cfa8",
      '<g fill="#bfb489" opacity=".7"><rect x="0" y="72" width="160" height="6" rx="3"/><rect x="20" y="82" width="120" height="5" rx="2.5"/></g>'),
    art:
      '<g fill="none" stroke="#6b3f21" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M40 38 C26 26 16 26 8 34"/><path d="M40 58 C26 70 16 70 8 62"/>' +
      "</g>" +
      '<g fill="none" stroke="#6b3f21" stroke-width="3.4" stroke-linecap="round">' +
      '<path d="M26 30 L24 20"/><path d="M18 30 L12 22"/>' +
      '<path d="M26 66 L24 76"/><path d="M18 66 L12 74"/>' +
      "</g>" +
      /* 俯视图：左右各三条腿才是六条。上排的后腿是下排 M92 那条沿身体中线（y=48）的镜像。 */
      '<g stroke="#4a2b16" stroke-width="3" fill="none" stroke-linecap="round">' +
      '<path d="M58 62 C54 72 48 78 40 82"/><path d="M74 64 C72 74 68 80 62 84"/><path d="M92 64 C94 74 94 80 90 84"/>' +
      '<path d="M58 34 C54 24 48 18 40 14"/><path d="M74 32 C72 22 68 16 62 12"/><path d="M92 32 C94 22 94 16 90 12"/>' +
      "</g>" +
      '<rect x="36" y="38" width="20" height="20" rx="6" fill="#6b3f21"/>' +
      '<rect x="52" y="31" width="24" height="34" rx="9" fill="#7a4826"/>' +
      '<path d="M74 30 C104 30 126 39 132 48 C126 57 104 66 74 66Z" fill="#5d3418"/>' +
      '<path d="M74 47 L131 47" stroke="#3d2110" stroke-width="2.6"/>' +
      '<path d="M84 36 C102 34 116 38 124 43" stroke="#8b5b34" stroke-width="3" stroke-linecap="round" fill="none" opacity=".8"/>' +
      '<path d="M84 60 C102 62 116 58 124 53" stroke="#8b5b34" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".55"/>' +
      '<g fill="#2c1809"><circle cx="41" cy="42" r="2.4"/><circle cx="41" cy="54" r="2.4"/></g>'
  });

  def("insects/bumblebee", {
    viewBox: "0 0 160 90", fit: "xMidYMid slice",
    title: "熊蜂插图",
    desc: "圆滚滚的熊蜂身上有黑黄相间的绒毛，抱着一朵花高频振动抖花粉。",
    bg: garden("#f3f7de", "#d6ebb4",
      '<g><path d="M18 90 C16 76 20 66 26 60" stroke="#8fb96b" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<g fill="#f0a8c4"><circle cx="20" cy="52" r="7"/><circle cx="32" cy="54" r="7"/><circle cx="26" cy="44" r="7"/><circle cx="26" cy="62" r="7"/></g>' +
      '<circle cx="26" cy="53" r="4.6" fill="#f6d564"/></g>'),
    art:
      '<defs><clipPath id="bumbleAbd{{U}}"><ellipse cx="100" cy="50" rx="30" ry="24"/></clipPath></defs>' +
      '<g fill="#e6f0f8" opacity=".8" stroke="#bcd4e6" stroke-width="1.4">' +
      '<ellipse cx="86" cy="22" rx="22" ry="9" transform="rotate(-22 86 22)"/>' +
      '<ellipse cx="102" cy="26" rx="16" ry="7" transform="rotate(-10 102 26)"/>' +
      "</g>" +
      '<g clip-path="url(#bumbleAbd{{U}})">' +
      '<ellipse cx="100" cy="50" rx="30" ry="24" fill="#f5c53c"/>' +
      '<rect x="88" y="22" width="14" height="56" fill="#2e2419"/>' +
      '<rect x="112" y="22" width="14" height="56" fill="#2e2419"/>' +
      "</g>" +
      '<ellipse cx="100" cy="50" rx="30" ry="24" fill="none" stroke="#fff3c4" stroke-width="3" stroke-dasharray="1 4" stroke-linecap="round" opacity=".8"/>' +
      '<ellipse cx="66" cy="48" rx="21" ry="20" fill="#2e2419"/>' +
      '<ellipse cx="66" cy="48" rx="21" ry="20" fill="none" stroke="#6b5a44" stroke-width="3.4" stroke-dasharray="1 4" stroke-linecap="round"/>' +
      '<ellipse cx="62" cy="40" rx="14" ry="7" fill="#f5c53c" opacity=".9"/>' +
      '<circle cx="44" cy="48" r="13" fill="#2e2419"/>' +
      '<ellipse cx="39" cy="46" rx="4" ry="6" fill="#6b5a44"/>' +
      '<g stroke="#2e2419" stroke-width="2.6" fill="none" stroke-linecap="round">' +
      '<path d="M37 39 C31 32 27 28 20 26"/><path d="M46 36 C44 28 43 24 40 18"/>' +
      "</g>" +
      '<g stroke="#2e2419" stroke-width="3" fill="none" stroke-linecap="round">' +
      '<path d="M56 65 C52 74 46 80 38 83"/><path d="M72 68 C72 78 70 84 66 88"/><path d="M88 70 C90 78 90 84 88 88"/>' +
      "</g>"
  });

  /* ---------------- 行星 ---------------- */

  /* 统一的行星画法：圆面 + 被裁进圆里的表面特征 + 右侧晨昏线阴影。 */
  function planet(base, features, options) {
    var opt = options || {};
    var r = opt.r || 44;
    return '<defs><clipPath id="pl{{U}}"><circle cx="60" cy="60" r="' + r + '"/></clipPath></defs>' +
      (opt.behind || "") +
      '<circle cx="60" cy="60" r="' + r + '" fill="' + base + '"/>' +
      '<g clip-path="url(#pl{{U}})">' + features + "</g>" +
      (opt.front || "") +
      '<path d="M60 ' + (60 - r) + " A" + r + " " + r + " 0 0 1 60 " + (60 + r) +
      " A" + (r * 0.5) + " " + r + ' 0 0 0 60 ' + (60 - r) + 'Z" fill="#0a1122" opacity=".17"/>';
  }

  function defPlanet(name, spec) {
    def("planets/" + name, {
      viewBox: "0 0 120 120", fit: "xMidYMid meet",
      title: spec.title, desc: spec.desc, bg: "", art: spec.art
    });
  }

  defPlanet("mercury", {
    title: "水星示意图",
    desc: "灰褐色的水星表面布满大大小小的陨石坑。",
    art: planet("#9a9186",
      '<g fill="#837b71">' +
      '<circle cx="40" cy="42" r="11"/><circle cx="72" cy="36" r="7"/><circle cx="84" cy="66" r="9"/>' +
      '<circle cx="46" cy="80" r="8"/><circle cx="62" cy="58" r="5"/><circle cx="26" cy="64" r="6"/>' +
      "</g>" +
      '<g fill="#b0a89d">' +
      '<circle cx="40" cy="40" r="8"/><circle cx="84" cy="64" r="6"/><circle cx="46" cy="78" r="5"/>' +
      "</g>")
  });

  defPlanet("venus", {
    title: "金星示意图",
    desc: "金星被浓厚的黄白色云层整个裹住，看不到地面。",
    art: planet("#e0bb74",
      '<g fill="#f3ddb0" opacity=".85">' +
      '<path d="M6 34 C34 26 62 40 88 32 C104 27 114 30 120 34 L120 44 C104 50 80 42 58 48 C36 54 16 48 6 44Z"/>' +
      '<path d="M0 66 C24 58 48 72 74 66 C96 61 110 66 120 70 L120 78 C104 84 82 76 60 82 C38 88 14 82 0 76Z"/>' +
      "</g>" +
      '<g fill="#cda257" opacity=".55">' +
      '<path d="M0 54 C28 48 54 60 82 54 C102 50 114 54 120 58 L120 62 C106 58 96 56 78 60 C52 66 24 58 0 62Z"/>' +
      "</g>")
  });

  defPlanet("earth", {
    title: "地球示意图",
    desc: "蓝色的海洋、绿色的大陆和白色的云带，两极是白色的冰盖。",
    art: planet("#3d7fc0",
      '<g fill="#4f9a55">' +
      '<path d="M20 44 C30 32 46 30 55 37 C64 44 59 56 48 60 C36 64 23 57 20 44Z"/>' +
      '<path d="M60 72 C68 63 84 63 90 72 C97 82 90 96 77 96 C64 96 55 83 60 72Z"/>' +
      '<path d="M76 24 C91 20 106 29 106 41 C106 52 93 56 85 50 C76 43 70 30 76 24Z"/>' +
      '<path d="M96 66 C106 62 116 66 118 74 C112 78 102 76 96 72Z"/>' +
      "</g>" +
      '<g fill="#eaf4f8" opacity=".9">' +
      '<ellipse cx="60" cy="16" rx="34" ry="9"/><ellipse cx="60" cy="104" rx="28" ry="8"/>' +
      "</g>" +
      '<g stroke="#e6f2f9" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55">' +
      '<path d="M12 62 C28 56 42 66 56 62"/><path d="M70 84 C84 80 96 86 110 82"/>' +
      "</g>")
  });

  defPlanet("mars", {
    title: "火星示意图",
    desc: "锈红色的火星，表面有深色的沙区和一道长长的峡谷，极地有白色冰帽。",
    art: planet("#c0603a",
      '<g fill="#9d4930" opacity=".9">' +
      '<path d="M18 50 C30 42 46 44 54 52 C48 62 30 64 18 58Z"/>' +
      '<path d="M74 40 C88 34 102 40 104 50 C94 56 80 52 74 46Z"/>' +
      '<path d="M50 78 C64 72 82 76 90 84 C78 92 58 90 50 84Z"/>' +
      "</g>" +
      '<path d="M14 66 C40 62 70 66 100 62" stroke="#8a3d27" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<g fill="#f2ece2"><ellipse cx="60" cy="18" rx="19" ry="7"/><ellipse cx="60" cy="103" rx="14" ry="6"/></g>' +
      '<circle cx="36" cy="36" r="6" fill="#a9522f"/>')
  });

  defPlanet("jupiter", {
    title: "木星示意图",
    desc: "木星有一条条深浅相间的云带，右下方是那颗著名的大红斑。",
    art: planet("#d9a76f",
      '<g>' +
      '<rect x="0" y="20" width="120" height="11" fill="#c58f57"/>' +
      '<rect x="0" y="38" width="120" height="8" fill="#f0d9b3"/>' +
      '<rect x="0" y="50" width="120" height="10" fill="#c08a52"/>' +
      '<rect x="0" y="64" width="120" height="9" fill="#ecd2a8"/>' +
      '<rect x="0" y="78" width="120" height="11" fill="#bb8450"/>' +
      '<rect x="0" y="94" width="120" height="9" fill="#e4c79c"/>' +
      '<ellipse cx="78" cy="70" rx="15" ry="8" fill="#b5563a"/>' +
      '<ellipse cx="78" cy="70" rx="8" ry="4" fill="#c9694a"/>' +
      '<path d="M0 32 C24 28 40 36 62 33 C84 30 104 36 120 33 L120 38 L0 38Z" fill="#d3a271" opacity=".8"/>' +
      "</g>")
  });

  defPlanet("saturn", {
    title: "土星示意图",
    desc: "土星被一圈明亮的光环围着，环从行星后面绕到前面来。",
    art: planet("#e0cd9a",
      '<g>' +
      '<rect x="0" y="26" width="120" height="8" fill="#cdb782"/>' +
      '<rect x="0" y="44" width="120" height="7" fill="#f0e2bd"/>' +
      '<rect x="0" y="58" width="120" height="9" fill="#cfb984"/>' +
      '<rect x="0" y="74" width="120" height="7" fill="#eddfb8"/>' +
      "</g>",
      {
        r: 32,
        behind:
          '<g fill="none" stroke="#d8c391" stroke-linecap="butt" transform="rotate(-16 60 60)">' +
          '<path d="M4 60 A56 15 0 0 1 116 60" stroke-width="7"/>' +
          '<path d="M16 60 A44 11 0 0 1 104 60" stroke-width="4" stroke-opacity=".75"/>' +
          "</g>",
        front:
          '<g fill="none" stroke="#e3d0a4" stroke-linecap="butt" transform="rotate(-16 60 60)">' +
          '<path d="M4 60 A56 15 0 0 0 116 60" stroke-width="7"/>' +
          '<path d="M16 60 A44 11 0 0 0 104 60" stroke-width="4" stroke-opacity=".75"/>' +
          "</g>"
      })
  });

  defPlanet("uranus", {
    title: "天王星示意图",
    desc: "淡青色的天王星几乎没有花纹，细细的光环几乎是竖着的。",
    art: planet("#93d3dd",
      '<g opacity=".55">' +
      '<rect x="0" y="34" width="120" height="7" fill="#a9dee6"/>' +
      '<rect x="0" y="56" width="120" height="8" fill="#83c7d3"/>' +
      '<rect x="0" y="78" width="120" height="7" fill="#a9dee6"/>' +
      "</g>",
      {
        r: 38,
        behind:
          '<path d="M60 10 A13 50 0 0 1 60 110" fill="none" stroke="#c6ecf1" stroke-width="3.4" opacity=".8"/>',
        front:
          '<path d="M60 10 A13 50 0 0 0 60 110" fill="none" stroke="#d8f2f6" stroke-width="3.4" opacity=".9"/>'
      })
  });

  defPlanet("neptune", {
    title: "海王星示意图",
    desc: "深蓝色的海王星上有几道白色的高速云带和一个较暗的风暴斑。",
    art: planet("#3f63c8",
      '<g>' +
      '<rect x="0" y="28" width="120" height="8" fill="#3555ab"/>' +
      '<rect x="0" y="62" width="120" height="10" fill="#33529f"/>' +
      '<rect x="0" y="88" width="120" height="7" fill="#3a5cb4"/>' +
      '<ellipse cx="46" cy="50" rx="14" ry="8" fill="#26407f"/>' +
      '<g stroke="#e9f1ff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75">' +
      '<path d="M14 42 C30 38 44 44 58 40"/><path d="M62 78 C76 74 90 80 106 76"/>' +
      "</g>" +
      "</g>")
  });

  /* ---------------- 天气 ---------------- */

  def("weather/sun", {
    viewBox: "0 0 100 100", fit: "xMidYMid meet",
    title: "太阳",
    desc: "一轮带着放射光芒的太阳。",
    bg: "",
    art:
      '<g stroke="#f2b23c" stroke-width="7" stroke-linecap="round">' +
      '<path d="M50 6 L50 18"/><path d="M50 82 L50 94"/><path d="M6 50 L18 50"/><path d="M82 50 L94 50"/>' +
      '<path d="M19 19 L28 28"/><path d="M72 72 L81 81"/><path d="M81 19 L72 28"/><path d="M28 72 L19 81"/>' +
      "</g>" +
      '<circle cx="50" cy="50" r="25" fill="#f8c455"/>' +
      '<circle cx="50" cy="50" r="25" fill="none" stroke="#eda92c" stroke-width="3"/>' +
      '<circle cx="42" cy="42" r="7" fill="#fde59a" opacity=".8"/>'
  });

  def("weather/cloud", {
    viewBox: "0 0 100 100", fit: "xMidYMid meet",
    title: "云",
    desc: "一朵蓬松的白云。",
    bg: "",
    art:
      '<g fill="#f4f8fc" stroke="#c3d6e6" stroke-width="3" stroke-linejoin="round">' +
      '<path d="M24 70 C13 70 6 62 8 53 C10 45 18 40 26 42 C28 28 41 20 54 24 C64 27 70 35 71 44 C82 42 90 49 90 58 C90 66 83 70 74 70Z"/>' +
      "</g>" +
      '<path d="M26 58 C32 52 42 50 50 53" stroke="#dceaf5" stroke-width="4" stroke-linecap="round" fill="none"/>'
  });

  def("weather/rain", {
    viewBox: "0 0 100 100", fit: "xMidYMid meet",
    title: "下雨的云",
    desc: "一朵灰色的云下面落着几滴雨。",
    bg: "",
    art:
      '<g fill="#e3ebf3" stroke="#a8bfd2" stroke-width="3" stroke-linejoin="round">' +
      '<path d="M24 58 C13 58 6 50 8 41 C10 33 18 28 26 30 C28 16 41 8 54 12 C64 15 70 23 71 32 C82 30 90 37 90 46 C90 54 83 58 74 58Z"/>' +
      "</g>" +
      '<g fill="#5aa9de">' +
      '<path d="M30 68 C34 74 36 78 36 81 C36 85 33 88 30 88 C27 88 24 85 24 81 C24 78 26 74 30 68Z"/>' +
      '<path d="M50 72 C54 78 56 82 56 85 C56 89 53 92 50 92 C47 92 44 89 44 85 C44 82 46 78 50 72Z"/>' +
      '<path d="M70 68 C74 74 76 78 76 81 C76 85 73 88 70 88 C67 88 64 85 64 81 C64 78 66 74 70 68Z"/>' +
      "</g>"
  });

  def("weather/lightning", {
    viewBox: "0 0 100 100", fit: "xMidYMid meet",
    title: "闪电",
    desc: "一朵深色的雷雨云下面劈出一道黄色闪电。",
    bg: "",
    art:
      '<g fill="#b9c7d6" stroke="#8ba0b5" stroke-width="3" stroke-linejoin="round">' +
      '<path d="M24 56 C13 56 6 48 8 39 C10 31 18 26 26 28 C28 14 41 6 54 10 C64 13 70 21 71 30 C82 28 90 35 90 44 C90 52 83 56 74 56Z"/>' +
      "</g>" +
      '<path d="M54 58 L34 84 L48 84 L40 98 L68 70 L52 70 L62 58Z" fill="#f6c445" stroke="#dfa622" stroke-width="2.6" stroke-linejoin="round"/>'
  });

  def("weather/vapor", {
    viewBox: "0 0 100 100", fit: "xMidYMid meet",
    title: "水汽上升",
    desc: "水面被晒热，水汽顺着弯曲的箭头往上飘。",
    bg: "",
    art:
      '<path d="M4 76 C22 70 38 82 56 76 C74 70 88 80 96 76 L96 96 L4 96Z" fill="#5aa9de"/>' +
      '<path d="M4 82 C22 76 38 88 56 82 C74 76 88 86 96 82" stroke="#8fcbef" stroke-width="3" fill="none"/>' +
      '<g stroke="#9fd0ee" stroke-width="6" fill="none" stroke-linecap="round">' +
      '<path d="M28 66 C20 54 34 46 26 32"/><path d="M52 62 C44 50 58 42 50 26"/><path d="M76 66 C68 54 82 46 74 34"/>' +
      "</g>" +
      '<g fill="#9fd0ee">' +
      '<path d="M26 22 L20 34 L32 34Z"/><path d="M50 16 L44 28 L56 28Z"/><path d="M74 24 L68 36 L80 36Z"/>' +
      "</g>"
  });

  /* ---------------- 向导角色头像 ----------------
     各专题页的“角色邀请”原来用单个 emoji，字体缺字时会退化成方框，
     而且同一个角色在不同系统上长相完全不同。这里给每个角色一张固定的头像。 */

  function defGuide(name, spec) {
    def("guide/" + name, {
      viewBox: "0 0 64 64", fit: "xMidYMid meet",
      title: spec.title, desc: spec.desc, bg: "", art: spec.art
    });
  }

  /* 两只黑眼珠加高光，所有角色共用一套画法，表情才不会各画各的。 */
  function eyes(lx, rx, y, r, ink) {
    var dark = ink || "#22160c";
    return '<circle cx="' + lx + '" cy="' + y + '" r="' + r + '" fill="' + dark + '"/>' +
      '<circle cx="' + rx + '" cy="' + y + '" r="' + r + '" fill="' + dark + '"/>' +
      '<circle cx="' + (lx + r * 0.35) + '" cy="' + (y - r * 0.35) + '" r="' + (r * 0.32) + '" fill="#ffffff"/>' +
      '<circle cx="' + (rx + r * 0.35) + '" cy="' + (y - r * 0.35) + '" r="' + (r * 0.32) + '" fill="#ffffff"/>';
  }

  /* 果果（记录伙伴）和这里的向导是同一只狐狸，脸只画一次，
     两处共用同一段路径，免得同一个角色在站内长出两张脸。 */
  var FOX_FACE =
    '<path d="M13 24 L11 5 L27 14Z" fill="#d9752c"/><path d="M51 24 L53 5 L37 14Z" fill="#d9752c"/>' +
    '<path d="M16.5 21.5 L15.5 11 L24 16Z" fill="#f7cba6"/><path d="M47.5 21.5 L48.5 11 L40 16Z" fill="#f7cba6"/>' +
    '<path d="M32 11 C46 11 55 21 55 32 C55 45 45 55 32 55 C19 55 9 45 9 32 C9 21 18 11 32 11Z" fill="#ef8b3c"/>' +
    '<path d="M32 29 C41 29 47 35 47 42 C47 50 40 56 32 56 C24 56 17 50 17 42 C17 35 23 29 32 29Z" fill="#fdf4e8"/>' +
    eyes(24, 40, 31, 3.4) +
    '<path d="M32 37 C35 37 37 39 37 41 C37 43.5 34.5 45 32 45 C29.5 45 27 43.5 27 41 C27 39 29 37 32 37Z" fill="#3a2415"/>' +
    '<path d="M32 45 L32 48 M32 48 C29 48 27 46.5 26 45 M32 48 C35 48 37 46.5 38 45" stroke="#3a2415" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
    '<g stroke="#c9773a" stroke-width="1.4" stroke-linecap="round" opacity=".8">' +
    '<path d="M18 40 L10 38"/><path d="M18 44 L10 45"/><path d="M46 40 L54 38"/><path d="M46 44 L54 45"/></g>';

  defGuide("fox", {
    title: "小狐探探",
    desc: "一只橙色小狐狸探出头，白色的脸颊和黑亮的眼睛正看着你。",
    art: FOX_FACE
  });

  defGuide("cloud-detective", {
    title: "云朵侦探波波",
    desc: "一朵白云长着眼睛和笑脸，旁边举着一只放大镜。",
    art:
      '<path d="M19 47 C10 47 4 41 5 33 C6 26 13 22 19 24 C21 12 32 6 42 10 C50 13 54 20 55 27 C61 27 64 32 63 38 C62 44 57 47 51 47Z" fill="#f7fbff" stroke="#9db8cd" stroke-width="2.4" stroke-linejoin="round"/>' +
      eyes(26, 40, 31, 3.6, "#31465a") +
      '<path d="M26 39 C29 43 37 43 40 39" stroke="#31465a" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
      '<g fill="#f0a3b4" opacity=".65"><ellipse cx="19" cy="38" rx="4" ry="2.6"/><ellipse cx="47" cy="38" rx="4" ry="2.6"/></g>' +
      '<g fill="none" stroke="#4b7ea8" stroke-width="3" stroke-linecap="round">' +
      '<circle cx="49" cy="49" r="7" fill="#cfe8f8" fill-opacity=".75"/><path d="M54 54 L61 61"/></g>'
  });

  defGuide("octopus", {
    title: "章鱼探长",
    desc: "一只紫色的章鱼鼓着大眼睛，八条触手往下伸展。",
    art:
      /* 前排六条 + 后排露头两条，正好八条数得清。 */
      '<g fill="#7b4da6">' +
      '<path d="M17 43 C14 50 13 56 15 60 C17 57 18 52 20 47Z"/>' +
      '<path d="M47 43 C50 50 51 56 49 60 C47 57 46 52 44 47Z"/>' +
      "</g>" +
      '<g fill="#8d5bbd">' +
      '<path d="M13 40 C8 47 6 54 8 59 C11 58 13 53 16 48Z"/><path d="M22 44 C19 52 18 58 20 61 C23 59 24 53 26 48Z"/>' +
      '<path d="M42 44 C45 52 46 58 44 61 C41 59 40 53 38 48Z"/><path d="M51 40 C56 47 58 54 56 59 C53 58 51 53 48 48Z"/>' +
      '<path d="M29 46 C27 54 27 59 29 62 C31 59 31 54 32 47Z"/>' +
      '<path d="M35 46 C37 54 37 59 35 62 C33 59 33 54 32 47Z"/>' +
      "</g>" +
      '<path d="M32 8 C45 8 54 18 54 30 C54 41 45 48 32 48 C19 48 10 41 10 30 C10 18 19 8 32 8Z" fill="#a06fd0"/>' +
      '<path d="M32 10 C42 10 48 16 49 23 C42 19 24 19 15 24 C16 16 22 10 32 10Z" fill="#b98ede" opacity=".8"/>' +
      '<circle cx="23" cy="29" r="7.5" fill="#fdf7ff"/><circle cx="41" cy="29" r="7.5" fill="#fdf7ff"/>' +
      eyes(24, 42, 30, 3.6, "#2c1740") +
      '<path d="M27 40 C30 43 34 43 37 40" stroke="#5c3184" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
      '<g fill="#c79ae8" opacity=".8"><circle cx="13" cy="52" r="1.8"/><circle cx="22" cy="55" r="1.8"/><circle cx="42" cy="55" r="1.8"/><circle cx="51" cy="52" r="1.8"/></g>'
  });

  defGuide("ant", {
    title: "蚂蚁队长",
    desc: "一只红褐色的蚂蚁，头、胸、腹三节分明，六条腿撑在地上，头上有两根触角。",
    art:
      '<g stroke="#7a3d1c" stroke-width="2.4" stroke-linecap="round" fill="none">' +
      '<path d="M22 34 L12 28 L7 32"/><path d="M22 38 L11 42 L7 48"/><path d="M26 40 L22 50 L18 55"/>' +
      '<path d="M40 34 L50 30 L55 34"/><path d="M40 39 L51 43 L55 49"/><path d="M36 41 L40 51 L44 56"/>' +
      "</g>" +
      '<g stroke="#8d4720" stroke-width="2.2" stroke-linecap="round" fill="none">' +
      '<path d="M25 17 C22 10 18 7 14 6"/><path d="M35 17 C38 10 42 7 46 6"/></g>' +
      '<circle cx="14" cy="6" r="2.4" fill="#8d4720"/><circle cx="46" cy="6" r="2.4" fill="#8d4720"/>' +
      '<ellipse cx="44" cy="42" rx="14" ry="11" fill="#a8542a"/>' +
      '<ellipse cx="29" cy="35" rx="8" ry="7.5" fill="#954923"/>' +
      '<ellipse cx="30" cy="22" rx="11" ry="9.5" fill="#b25c2f"/>' +
      eyes(26, 35, 21, 2.8, "#2b1408") +
      '<path d="M27 27 C29 29 32 29 34 27" stroke="#5e2c12" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
      '<path d="M36 40 C42 36 50 38 54 44" stroke="#8d4720" stroke-width="1.6" fill="none" opacity=".55"/>'
  });

  defGuide("dino", {
    title: "小恐龙化石迷",
    desc: "一只绿色的长脖子小恐龙侧身站着，背上有一排三角骨板，尾巴伸向身后。",
    art:
      '<path d="M2 52 C8 51 14 48 21 44 L25 52Z" fill="#2f8d51"/>' +
      '<path d="M34 40 C34 28 38 18 45 11 L55 17 C50 24 46 32 45 42Z" fill="#3fa963"/>' +
      '<ellipse cx="27" cy="42" rx="18" ry="12" fill="#42b168"/>' +
      '<path d="M11 47 C17 52 37 52 43 46 C40 52 33 55 27 55 C20 55 14 52 11 47Z" fill="#b6e6c6" opacity=".75"/>' +
      '<g fill="#2f8d51"><path d="M13 34 L10 26 L18 31Z"/><path d="M22 30 L20 21 L28 27Z"/><path d="M31 29 L30 20 L37 26Z"/></g>' +
      '<rect x="17" y="50" width="9" height="12" rx="4.5" fill="#369055"/><rect x="31" y="50" width="9" height="12" rx="4.5" fill="#3fa963"/>' +
      '<path d="M43 6 C53 4 62 8 62 14 C62 19 56 22 49 21 C42 20 39 12 43 6Z" fill="#4bbb70"/>' +
      '<path d="M55 18 C58 19 61 19 62.5 18" stroke="#25733f" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
      '<circle cx="53" cy="12" r="4" fill="#fdfdf6"/><circle cx="54" cy="12" r="2.2" fill="#1c3a26"/>' +
      '<circle cx="55" cy="11" r="0.9" fill="#ffffff"/>' +
      '<g fill="#2f8d51" opacity=".45"><circle cx="24" cy="40" r="2"/><circle cx="32" cy="43" r="2"/><circle cx="17" cy="43" r="2"/></g>'
  });

  defGuide("astronaut", {
    title: "小小宇航员",
    desc: "戴着白色头盔的宇航员，面罩上映着一颗蓝色的星球。",
    art:
      '<circle cx="32" cy="32" r="24" fill="#e8eef6" stroke="#b3c2d4" stroke-width="2.5"/>' +
      '<path d="M8 34 L2 34 A3 3 0 0 1 2 28 L8 28Z" fill="#c3d0de"/><path d="M56 34 L62 34 A3 3 0 0 0 62 28 L56 28Z" fill="#c3d0de"/>' +
      '<path d="M32 15 C44 15 52 23 52 32 C52 41 44 47 32 47 C20 47 12 41 12 32 C12 23 20 15 32 15Z" fill="#1d2b46"/>' +
      '<path d="M32 17 C41 17 47 22 49 27 C40 23 24 23 15 27 C17 22 23 17 32 17Z" fill="#5f7fae" opacity=".55"/>' +
      '<circle cx="40" cy="36" r="6" fill="#4d94dd"/><ellipse cx="40" cy="36" rx="9" ry="2.6" fill="none" stroke="#a8cff2" stroke-width="1.4"/>' +
      '<g fill="#ffffff"><circle cx="21" cy="30" r="1.6"/><circle cx="26" cy="38" r="1.2"/><circle cx="47" cy="26" r="1.3"/></g>'
  });

  defGuide("geologist", {
    title: "地质小队长",
    desc: "戴着黄色安全帽的小队长扛着一把地质锤。",
    art:
      '<path d="M14 34 C14 22 22 14 32 14 C42 14 50 22 50 34Z" fill="#f2b134"/>' +
      '<path d="M9 34 L55 34 A3 3 0 0 1 55 39 L9 39 A3 3 0 0 1 9 34Z" fill="#d9982a"/>' +
      '<path d="M30 14 C31 20 31 28 30 34 L34 34 C35 28 35 20 34 14Z" fill="#ffd784"/>' +
      '<path d="M32 39 C41 39 48 45 48 55 L16 55 C16 45 23 39 32 39Z" fill="#f6d9bd"/>' +
      eyes(26, 38, 46, 2.8, "#3b2a1c") +
      '<path d="M27 51 C29.5 53.5 34.5 53.5 37 51" stroke="#a8663c" stroke-width="2" stroke-linecap="round" fill="none"/>' +
      '<g><path d="M50 26 L58 52" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M43 24 L59 20 L60 27 L44 30Z" fill="#7c8894"/></g>'
  });

  defGuide("heart", {
    title: "心跳博士",
    desc: "一颗红色的心脏笑着，旁边是一条心电图折线。",
    art:
      '<path d="M32 55 C14 43 6 34 6 24 C6 15 13 9 21 9 C26 9 30 12 32 16 C34 12 38 9 43 9 C51 9 58 15 58 24 C58 34 50 43 32 55Z" fill="#e35d6a"/>' +
      '<path d="M21 12 C15 12 10 16 10 22 C10 26 12 30 15 34 C11 27 12 17 21 15Z" fill="#f79aa3" opacity=".85"/>' +
      eyes(24, 40, 26, 3.4, "#5b1620") +
      '<path d="M25 35 C28 39 36 39 39 35" stroke="#5b1620" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
      '<path d="M4 44 L14 44 L18 36 L23 50 L27 44 L34 44" stroke="#fff1f2" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".9"/>'
  });

  /* ---------------- 通用小图标 ----------------
     句子里、按钮上、小标题前的 emoji 换成这一组。统一 48×48，
     线条粗细一致，缩到 1em 时还能认出来。 */

  function defIcon(name, title, desc, art) {
    def("ui/" + name, {
      viewBox: "0 0 48 48", fit: "xMidYMid meet",
      title: title, desc: desc, bg: "", art: art
    });
  }

  defIcon("question", "问号", "一个圆形徽章里画着问号。",
    '<circle cx="24" cy="24" r="20" fill="#f7d97e"/><circle cx="24" cy="24" r="20" fill="none" stroke="#d69a1e" stroke-width="2.5"/>' +
    '<path d="M17 19 A7 7 0 1 1 24 27 L24 31" fill="none" stroke="#6b4708" stroke-width="4.2" stroke-linecap="round"/>' +
    '<circle cx="24" cy="37" r="2.8" fill="#6b4708"/>');

  defIcon("eye", "观察", "一只睁开的眼睛，瞳孔里有高光。",
    '<path d="M3 24 C10 13 17 8 24 8 C31 8 38 13 45 24 C38 35 31 40 24 40 C17 40 10 35 3 24Z" fill="#e8f2fb" stroke="#3b6f9e" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<circle cx="24" cy="24" r="9" fill="#3d7cb8"/><circle cx="24" cy="24" r="4" fill="#16273a"/>' +
    '<circle cx="27" cy="20.5" r="2.2" fill="#ffffff"/>');

  defIcon("milk", "一杯牛奶", "一只玻璃杯里盛着大半杯牛奶，奶面比杯口低一截。",
    '<path d="M12 6 L36 6 L33 42 A4 4 0 0 1 29 46 L19 46 A4 4 0 0 1 15 42Z" fill="#dcecf7" stroke="#5f819a" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M14.2 18 L33.8 18 L31.4 41.6 A2.6 2.6 0 0 1 28.8 44 L19.2 44 A2.6 2.6 0 0 1 16.6 41.6Z" fill="#f6efdd"/>' +
    '<path d="M14.2 18 C19 14.6 27 20.4 33.8 18 L33.5 21.8 C27 24.4 19 18.6 13.9 21.8Z" fill="#e4d8bc"/>' +
    '<path d="M19.5 26 L18.6 40" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>' +
    '<path d="M17 9 L16 15" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" opacity=".9"/>');

  defIcon("magnifier", "放大镜", "一只带手柄的放大镜。",
    '<circle cx="21" cy="21" r="13" fill="#d6ecfa" stroke="#3b6f9e" stroke-width="3.4"/>' +
    '<path d="M15 17 C16 13 18 11 22 10" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
    '<path d="M31 31 L42 42" stroke="#8b5a2b" stroke-width="5" stroke-linecap="round"/>');

  defIcon("ruler", "量尺", "一把带刻度的黄色量尺。",
    '<path d="M4 30 L30 4 L44 18 L18 44Z" fill="#f6d68a" stroke="#c48f22" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<g stroke="#a8761a" stroke-width="2" stroke-linecap="round">' +
    '<path d="M11 27 L16 32"/><path d="M17 21 L25 29"/><path d="M23 15 L28 20"/><path d="M29 9 L37 17"/></g>');

  defIcon("footprint", "恐龙脚印", "泥地上一个三趾的恐龙脚印，三根脚趾分开、趾尖有爪痕。",
    '<g fill="#8b5e3c">' +
    '<path d="M12 28 L36 28 C38 33 37 41 32 44 C27 47 21 47 16 44 C11 41 10 33 12 28Z"/>' +
    '<path d="M24 9 C28 9 31 12 31 17 L30 31 L18 31 L17 17 C17 12 20 9 24 9Z"/>' +
    '<path d="M6 19 C9 16 13 17 15 21 L19 32 L11 35 L7 27 C5 24 4 21 6 19Z"/>' +
    '<path d="M42 19 C44 21 43 24 41 27 L37 35 L29 32 L33 21 C35 17 39 16 42 19Z"/>' +
    "</g>" +
    '<g fill="#5b3a20"><path d="M24 4 L28 12 L20 12Z"/><path d="M3 14 L12 17 L7 23Z"/><path d="M45 14 L41 23 L36 17Z"/></g>' +
    '<path d="M13 47 C19 45 29 45 35 47" stroke="#c9b08f" stroke-width="3" stroke-linecap="round" fill="none"/>');

  defIcon("tooth", "牙齿", "一颗白色的臼齿，下面有两条牙根。",
    '<path d="M10 16 C10 8 17 4 24 8 C31 4 38 8 38 16 C38 24 34 28 33 35 C32 41 30 44 28 44 C26 44 25 40 24 34 C23 40 22 44 20 44 C18 44 16 41 15 35 C14 28 10 24 10 16Z" fill="#fdfdf7" stroke="#7f7c6c" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M15 20 C19 23 29 23 33 20" stroke="#c8c5b3" stroke-width="2" fill="none"/>' +
    '<path d="M16 12 C17 9 20 8 23 9" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round" fill="none"/>');

  defIcon("bone", "骨头", "一根两端带圆头的骨头。",
    '<path d="M13 20 A6 6 0 1 1 19 14 L29 24 A6 6 0 1 1 35 30 A6 6 0 1 1 29 36 L19 26 A6 6 0 1 1 13 20Z" fill="#f6f1e2" stroke="#8f8672" stroke-width="2.6" stroke-linejoin="round"/>');

  defIcon("runner", "奔跑", "一个正在奔跑的小人。",
    '<circle cx="31" cy="10" r="5.5" fill="#3f6fa8"/>' +
    '<path d="M28 18 L20 27 L11 25" stroke="#3f6fa8" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
    '<path d="M28 18 L34 26 L42 22" stroke="#3f6fa8" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
    '<path d="M27 24 L24 34 L14 41" stroke="#e07a2f" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
    '<path d="M30 27 L36 34 L35 44" stroke="#e07a2f" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>');

  defIcon("telescope", "望远镜", "一台架在三脚架上的望远镜指向天空。",
    '<path d="M9 33 L34 12 L41 20 L16 41Z" fill="#6f83a4" stroke="#3f4d66" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M33 11 L43 19 L39 24 L29 16Z" fill="#9aabc6"/>' +
    '<path d="M20 33 L20 45 M20 33 L11 45 M20 33 L30 45" stroke="#8b5a2b" stroke-width="3" stroke-linecap="round"/>' +
    '<g fill="#f6d68a"><circle cx="42" cy="7" r="2.4"/><circle cx="33" cy="4" r="1.6"/></g>');

  defIcon("satellite", "卫星", "一颗带两片太阳能板的卫星。",
    '<rect x="19" y="18" width="12" height="14" rx="2.5" fill="#c8d3e2" stroke="#5a6b84" stroke-width="2"/>' +
    '<rect x="2" y="19" width="14" height="11" rx="1.6" fill="#4d7fbe" stroke="#2f5a8e" stroke-width="1.8"/>' +
    '<rect x="34" y="19" width="14" height="11" rx="1.6" fill="#4d7fbe" stroke="#2f5a8e" stroke-width="1.8"/>' +
    '<path d="M25 18 L25 10" stroke="#5a6b84" stroke-width="2.4"/>' +
    '<path d="M17 10 A9 9 0 0 1 33 10Z" fill="#e2e9f3" stroke="#5a6b84" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M25 32 L25 42" stroke="#5a6b84" stroke-width="2.4"/><circle cx="25" cy="43" r="2.6" fill="#f6d68a"/>');

  defIcon("globe", "地球", "一颗画着经纬线和大陆的蓝色地球。",
    '<circle cx="24" cy="24" r="19" fill="#4d94dd"/>' +
    '<g fill="#57ab63"><path d="M11 17 C16 11 24 11 28 16 C31 21 26 26 20 26 C14 26 10 22 11 17Z"/>' +
    '<path d="M28 30 C32 26 39 27 41 32 C43 38 37 43 31 41 C26 39 25 33 28 30Z"/></g>' +
    '<g fill="none" stroke="#e4f0fa" stroke-width="1.8" opacity=".85">' +
    '<circle cx="24" cy="24" r="19"/><ellipse cx="24" cy="24" rx="8.5" ry="19"/><path d="M5 24 L43 24"/><path d="M9 14 L39 14"/><path d="M9 34 L39 34"/></g>');

  defIcon("clipboard", "记录板", "一块夹着记录纸的写字板。",
    '<rect x="9" y="7" width="30" height="37" rx="4" fill="#f6efdd" stroke="#a8956c" stroke-width="2.4"/>' +
    '<rect x="17" y="3" width="14" height="8" rx="3" fill="#b7a173" stroke="#8a7551" stroke-width="2"/>' +
    '<g stroke="#a8956c" stroke-width="2.4" stroke-linecap="round"><path d="M16 20 L32 20"/><path d="M16 27 L32 27"/><path d="M16 34 L26 34"/></g>');

  defIcon("thermometer", "温度计", "一支带红色液柱的温度计。",
    '<path d="M19 10 A5 5 0 0 1 29 10 L29 28 A8 8 0 1 1 19 28Z" fill="#f4f7fa" stroke="#7f8fa3" stroke-width="2.4"/>' +
    '<circle cx="24" cy="35" r="6" fill="#e05252"/><rect x="21.5" y="18" width="5" height="16" fill="#e05252"/>' +
    '<g stroke="#7f8fa3" stroke-width="1.8" stroke-linecap="round"><path d="M31 15 L36 15"/><path d="M31 20 L36 20"/><path d="M31 25 L36 25"/></g>');

  defIcon("fishing", "钓竿", "一根钓竿垂着鱼线和鱼钩。",
    '<path d="M6 42 L34 8" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M34 8 L38 26" stroke="#8ba7bd" stroke-width="1.8" fill="none"/>' +
    '<path d="M38 26 C42 30 40 36 35 36 C31 36 30 32 33 31" fill="none" stroke="#6b7a8c" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M14 32 C17 30 19 32 18 35" stroke="#8b5a2b" stroke-width="3" stroke-linecap="round" fill="none"/>');

  defIcon("leaf", "叶子", "一片带叶脉的绿叶。",
    '<path d="M8 40 C8 20 22 7 41 7 C41 26 28 40 8 40Z" fill="#6fae52"/>' +
    '<path d="M8 40 C18 30 30 18 41 7" stroke="#3f7a30" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
    '<g stroke="#3f7a30" stroke-width="1.6" stroke-linecap="round" opacity=".75">' +
    '<path d="M17 31 L16 22"/><path d="M24 24 L23 15"/><path d="M31 17 L30 10"/>' +
    '<path d="M17 31 L26 30"/><path d="M24 24 L33 23"/></g>');

  defIcon("sparkle", "亮点", "一颗四角闪光。",
    '<path d="M24 3 C26 16 32 22 45 24 C32 26 26 32 24 45 C22 32 16 26 3 24 C16 22 22 16 24 3Z" fill="#f6c445"/>' +
    '<path d="M39 6 C40 11 41 12 46 13 C41 14 40 15 39 20 C38 15 37 14 32 13 C37 12 38 11 39 6Z" fill="#fbe08a"/>');

  /* 人体页的三个器官小图标。和页面里的大解剖图共用配色：
     脑紫、肺蓝、血红，同一个器官在两处不会变色。 */

  defIcon("brain", "大脑", "一个侧面看的大脑，表面有一道道沟回，下面连着脑干。",
    '<path d="M17 8 C11 8 7 12 7 17 C4 19 3 23 5 26 C3 29 5 34 9 35 C11 39 16 41 20 39 L28 39 C33 41 38 38 39 34 C43 32 44 27 41 24 C43 20 41 15 36 14 C34 9 29 6 24 8 C22 7 19 7 17 8Z" fill="#a888dd"/>' +
    '<g stroke="#6d4ba3" stroke-width="1.8" stroke-linecap="round" fill="none" opacity=".8">' +
    '<path d="M24 9 C24 16 24 30 24 39"/><path d="M13 13 C17 16 16 21 12 23"/>' +
    '<path d="M35 15 C31 18 32 23 36 25"/><path d="M11 29 C15 30 18 33 18 37"/>' +
    '<path d="M37 30 C33 31 30 33 30 37"/></g>' +
    '<path d="M21 39 L21 45 L27 45 L27 39Z" fill="#8f6bcb"/>');

  defIcon("lungs", "肺", "一对粉蓝色的肺，中间是气管和支气管。",
    '<path d="M22 6 L26 6 L26 20 L22 20Z" fill="#8ba7bd"/>' +
    '<path d="M24 19 L14 24 M24 19 L34 24" stroke="#8ba7bd" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M15 21 C9 24 6 32 7 39 C7.6 43 11 45 15 44 C19 43 21 39 21 34 L21 24 C21 21 18 20 15 21Z" fill="#9ed3ea"/>' +
    '<path d="M33 21 C39 24 42 32 41 39 C40.4 43 37 45 33 44 C29 43 27 39 27 34 L27 24 C27 21 30 20 33 21Z" fill="#9ed3ea"/>' +
    '<g stroke="#4f8fae" stroke-width="1.5" stroke-linecap="round" fill="none" opacity=".75">' +
    '<path d="M16 27 C13 30 12 35 13 40"/><path d="M32 27 C35 30 36 35 35 40"/></g>');

  defIcon("blood-cell", "红细胞", "三个中间凹陷的红色圆盘状红细胞。",
    '<g fill="#d2453c"><ellipse cx="18" cy="20" rx="13" ry="11"/><ellipse cx="33" cy="33" rx="10.5" ry="9"/></g>' +
    '<g fill="#a92e28"><ellipse cx="18" cy="20" rx="5.5" ry="4.4"/><ellipse cx="33" cy="33" rx="4.4" ry="3.6"/></g>' +
    '<ellipse cx="12" cy="37" rx="7.5" ry="6.4" fill="#e5675e"/>' +
    '<ellipse cx="12" cy="37" rx="3.1" ry="2.5" fill="#bd3a33"/>' +
    '<path d="M9 14 C11 11 15 9 19 9" stroke="#f3a09a" stroke-width="2.6" stroke-linecap="round" fill="none"/>');

  /* 下面五枚是海洋深度标尺上的地标图标。都朝下潜的方向画（头朝下、船头朝下），
     竖着排在标尺上时视线才是一路往下走的。 */

  defIcon("freediver", "自由潜水员", "一个只戴面镜和脚蹼的潜水员头朝下往深处潜。",
    '<circle cx="24" cy="9" r="5.2" fill="#e9b489"/>' +
    '<path d="M18.6 7.6 L29.4 7.6 L29.4 10.4 A5.4 5.4 0 0 1 18.6 10.4Z" fill="#8fd3ef" opacity=".9" stroke="#2f6f8f" stroke-width="1.4"/>' +
    '<path d="M24 14 C28 14 30 17 30 21 L29 31 L19 31 L18 21 C18 17 20 14 24 14Z" fill="#2f6f8f"/>' +
    '<path d="M20 17 L11 26" stroke="#e9b489" stroke-width="3.6" stroke-linecap="round"/>' +
    '<path d="M28 17 L37 26" stroke="#e9b489" stroke-width="3.6" stroke-linecap="round"/>' +
    '<path d="M21 31 L20 40" stroke="#e9b489" stroke-width="3.6" stroke-linecap="round"/>' +
    '<path d="M27 31 L28 40" stroke="#e9b489" stroke-width="3.6" stroke-linecap="round"/>' +
    '<g fill="#f2a03c"><path d="M16 39 L24 41 L20 47Z"/><path d="M32 39 L24 41 L28 47Z"/></g>');

  defIcon("scuba", "水肺潜水员", "一个背着气瓶、戴调节器的潜水员头朝下往深处潜，身后冒出一串气泡。",
    '<rect x="30" y="12" width="9" height="17" rx="4.5" fill="#c8823c" stroke="#8a541d" stroke-width="1.6"/>' +
    '<circle cx="24" cy="9" r="5.2" fill="#e9b489"/>' +
    '<path d="M18.6 7.4 L29.4 7.4 L29.4 10.6 A5.4 5.4 0 0 1 18.6 10.6Z" fill="#8fd3ef" opacity=".9" stroke="#2f6f8f" stroke-width="1.4"/>' +
    '<path d="M24 14 C28.4 14 30.6 17 30.6 21.4 L29.4 32 L18.6 32 L17.4 21.4 C17.4 17 19.6 14 24 14Z" fill="#26506b"/>' +
    '<path d="M18.4 17 L9 25" stroke="#e9b489" stroke-width="3.6" stroke-linecap="round"/>' +
    '<path d="M20.6 32 L19.4 40" stroke="#26506b" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M27.4 32 L28.6 40" stroke="#26506b" stroke-width="4" stroke-linecap="round"/>' +
    '<g fill="#f2a03c"><path d="M15 39 L23 41 L19 47Z"/><path d="M33 39 L25 41 L29 47Z"/></g>' +
    '<g fill="#bfe6f5" opacity=".85"><circle cx="12" cy="12" r="3"/><circle cx="7" cy="5" r="2"/><circle cx="16" cy="4" r="1.4"/></g>');

  defIcon("shipwreck", "沉船残骸", "一艘船头朝下斜插在海底泥沙里的破船，桅杆断成两截。",
    '<path d="M2 40 C12 36 26 36 46 40 L46 46 L2 46Z" fill="#7d6a4f" opacity=".55"/>' +
    '<path d="M6 22 L34 12 L41 32 C33 41 19 43 11 39Z" fill="#6d5433" stroke="#42301a" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M12 24 L36 16" stroke="#42301a" stroke-width="1.8"/>' +
    '<path d="M20 30 L39 23" stroke="#42301a" stroke-width="1.8"/>' +
    '<path d="M24 15 L18 3" stroke="#42301a" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M33 22 L44 14" stroke="#42301a" stroke-width="2.6" stroke-linecap="round"/>' +
    '<g fill="#1c2f45"><circle cx="17" cy="27" r="2.4"/><circle cx="25" cy="24" r="2.4"/></g>');

  defIcon("whale", "下潜的抹香鲸", "一头抹香鲸头朝下往深处潜：又大又方的头在最下面，尾鳍在最上面张成 V 形。",
    '<g fill="#4a4b53"><path d="M23 11 C17 8 11 5 5 2 C7 8 11 12 17 14Z"/>' +
    '<path d="M25 11 C31 8 37 5 43 2 C41 8 37 12 31 14Z"/>' +
    '<path d="M12 30 C8 32 5 35 3 39 C7 38 10 36 13 34Z"/></g>' +
    '<path d="M12 41 C12 44 14 46 17 46 L31 46 C34 46 36 44 36 41 L36 33 C36 24 33 15 29 8 L19 8 C15 15 12 24 12 33Z" fill="#5c5d66"/>' +
    '<path d="M13 39 C19 41 29 41 35 39" stroke="#3a3b43" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
    '<g stroke="#7c7d86" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".55">' +
    '<path d="M17 18 C16 24 16 30 16 35"/><path d="M23 17 C22 23 22 30 22 36"/></g>' +
    '<circle cx="16" cy="34" r="1.9" fill="#1b1c22"/>');

  defIcon("mountain", "山峰", "一座带积雪峰顶的深色山峰。",
    '<path d="M2 43 L18 12 L28 29 L33 21 L46 43Z" fill="#6c7f96" stroke="#3d4b5e" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M18 12 L11 25 C14 23 16 25 19 24 C21 23 23 25 25 24Z" fill="#f2f7fb"/>' +
    '<path d="M33 21 L29 28 C31 27 33 28 35 27Z" fill="#f2f7fb"/>' +
    '<path d="M2 43 L46 43" stroke="#3d4b5e" stroke-width="2" stroke-linecap="round"/>');

  defIcon("submersible", "深潜器", "一台带观察窗、探照灯和推进器的载人深潜器。",
    '<path d="M9 24 C9 16 16 11 25 11 C34 11 41 16 41 24 C41 32 34 37 25 37 C16 37 9 32 9 24Z" fill="#f2c14b" stroke="#8a6410" stroke-width="2.2"/>' +
    '<circle cx="34" cy="24" r="6.5" fill="#bfe6f5" stroke="#2f6f8f" stroke-width="2"/>' +
    '<circle cx="32" cy="21.5" r="2" fill="#ffffff" opacity=".9"/>' +
    '<rect x="17" y="4" width="7" height="8" rx="2" fill="#c9d3de" stroke="#5a6b84" stroke-width="1.8"/>' +
    '<path d="M9 20 L2 16 L2 32 L9 28Z" fill="#c9d3de" stroke="#5a6b84" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M14 37 L12 44 M32 36 L34 44" stroke="#5a6b84" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M41 21 L47 18 L47 30 L41 27Z" fill="#fff3c4" opacity=".85"/>');

  defIcon("palette", "调色盘", "一块画家的调色盘，上面挤了四团颜料，右上角插着一支画笔。",
    '<path d="M22 5 C34 5 44 13 44 24 C44 31 39 33 34 33 L30 33 C27 33 25 35 25 38 C25 41 23 43 20 43 C11 43 4 35 4 25 C4 13 11 5 22 5Z" fill="#f6efdd" stroke="#a8844c" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<g><circle cx="14" cy="16" r="3.6" fill="#d1495b"/><circle cx="24" cy="12" r="3.6" fill="#f0a02a"/>' +
    '<circle cx="34" cy="18" r="3.6" fill="#3f8fd0"/><circle cx="13" cy="29" r="3.6" fill="#57ab63"/></g>' +
    '<g transform="rotate(28 38 30)"><rect x="35" y="14" width="6" height="16" rx="2.4" fill="#b07a3f"/>' +
    '<rect x="34" y="29" width="8" height="5" rx="1.6" fill="#9aa5b1"/>' +
    '<path d="M34.6 34 L41.4 34 L39.6 43 L36.4 43Z" fill="#7c4dbe"/></g>');

  defIcon("stairs", "台阶", "三级往上走的台阶，一支箭头沿着台阶一级一级往上。",
    '<path d="M4 44 L4 34 L18 34 L18 24 L32 24 L32 14 L46 14 L46 44Z" fill="#e3ece7" stroke="#54756a" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<g stroke="#2f6f5c" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
    '<path d="M9 30 L13 30 L13 20 L27 20 L27 10 L38 10"/><path d="M33 5 L39 10 L33 15"/></g>');

  defIcon("tablet", "屏幕", "一块竖着的平板电脑，屏幕上有一个正在画的图形。",
    '<rect x="10" y="4" width="28" height="40" rx="4" fill="#e9edf2" stroke="#5a6b84" stroke-width="2.6"/>' +
    '<rect x="13.5" y="9" width="21" height="27" rx="2" fill="#ffffff"/>' +
    '<path d="M17 30 L22 21 L26 27 L30 17 L32 30Z" fill="#8fc0ec"/>' +
    '<path d="M17 30 L32 30" stroke="#3f6f96" stroke-width="1.8" stroke-linecap="round"/>' +
    '<circle cx="24" cy="40" r="2" fill="#8b98ad"/>');

  defIcon("cup", "先停一停", "一只冒着热气的杯子，提醒先离开桌子喝口水。",
    '<g stroke="#c98a2c" stroke-width="2.2" stroke-linecap="round" fill="none" opacity=".85">' +
    '<path d="M18 12 C15 9 21 7 18 4"/><path d="M26 12 C23 9 29 7 26 4"/></g>' +
    '<path d="M8 18 L34 18 L32 38 A6 6 0 0 1 26 43 L16 43 A6 6 0 0 1 10 38Z" fill="#f6efdd" stroke="#8a6a3a" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M34 22 A7 7 0 0 1 34 34" fill="none" stroke="#8a6a3a" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M11 24 L31.4 24" stroke="#c9a86a" stroke-width="2.2"/>');

  defIcon("alert", "警示", "一个黄色三角警示牌，中间是一个感叹号。",
    '<path d="M24 5 L45 42 A2.6 2.6 0 0 1 42.6 46 L5.4 46 A2.6 2.6 0 0 1 3 42 Z" fill="#f7d97e" stroke="#a8761a" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M24 18 L24 32" stroke="#6b4708" stroke-width="4.2" stroke-linecap="round"/>' +
    '<circle cx="24" cy="39" r="2.6" fill="#6b4708"/>');

  defIcon("medal", "奖章", "一枚挂着缎带的圆形奖章，中间刻着一颗星。",
    '<path d="M15 4 L23 22 L17 26 L9 8Z" fill="#7f9ec4"/><path d="M33 4 L25 22 L31 26 L39 8Z" fill="#5f80ab"/>' +
    '<circle cx="24" cy="33" r="13.5" fill="#f2c14b" stroke="#a9761a" stroke-width="2.6"/>' +
    '<path d="M24 25 L26.4 30.6 L32.4 31.2 L27.8 35.2 L29.2 41.2 L24 38 L18.8 41.2 L20.2 35.2 L15.6 31.2 L21.6 30.6Z" fill="#fff3c4" stroke="#a9761a" stroke-width="1.2" stroke-linejoin="round"/>');

  defIcon("bowl", "饭桌", "一只盛着饭的碗，旁边斜插着一双筷子，热气往上飘。",
    '<g stroke="#c98a2c" stroke-width="2" stroke-linecap="round" fill="none" opacity=".8">' +
    '<path d="M20 12 C17 9 23 7 20 4"/><path d="M28 12 C25 9 31 7 28 4"/></g>' +
    '<path d="M35 6 L43 8 L26 26" stroke="#b07a3f" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
    '<path d="M6 24 L42 24 C40 34 33 41 24 41 C15 41 8 34 6 24Z" fill="#f6efdd" stroke="#8a6a3a" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M12 24 C16 20 32 20 36 24Z" fill="#ffffff" stroke="#8a6a3a" stroke-width="2"/>' +
    '<path d="M10 43 L38 43" stroke="#8a6a3a" stroke-width="2.6" stroke-linecap="round"/>');

  defIcon("lock", "未解锁", "一把合上的挂锁，锁梁扣着锁身，中间有一个钥匙孔。",
    '<path d="M15 22 L15 16 A9 9 0 0 1 33 16 L33 22" fill="none" stroke="#8a9a92" stroke-width="4.6" stroke-linecap="round"/>' +
    '<rect x="9" y="21" width="30" height="23" rx="5" fill="#e7ece8" stroke="#8a9a92" stroke-width="2.6"/>' +
    '<circle cx="24" cy="30" r="3.6" fill="#7b8a82"/><path d="M24 31 L24 38" stroke="#7b8a82" stroke-width="3.4" stroke-linecap="round"/>');

  /* 四门学科各一枚，配色沿用 base.css 的 --phys / --math / --sci：
     厨房科学那 30 张卡片以前只靠一颗彩色文字药丸区分学科，扫一眼分不出来。 */
  defIcon("magnet", "物理", "一块马蹄形磁铁，两端一红一蓝。",
    '<path d="M11 38 L11 25 A13 13 0 0 1 37 25 L37 38" fill="none" stroke="#7c6fa6" stroke-width="13" stroke-linejoin="round"/>' +
    '<path d="M4.5 33 L17.5 33 L17.5 45 L4.5 45Z" fill="#d1495b"/>' +
    '<path d="M30.5 33 L43.5 33 L43.5 45 L30.5 45Z" fill="#3f7cc0"/>' +
    '<path d="M11 25 A13 13 0 0 1 24 12" fill="none" stroke="#a99cd0" stroke-width="3.4" stroke-linecap="round"/>');

  defIcon("abacus", "数学", "一副算盘，两根横杆上串着可以拨动的算珠。",
    '<rect x="4" y="8" width="40" height="32" rx="5" fill="none" stroke="#8b5a2b" stroke-width="3.6"/>' +
    '<g stroke="#c9a877" stroke-width="2.6"><path d="M4 19 L44 19"/><path d="M4 31 L44 31"/></g>' +
    '<g fill="#3f7cc0"><circle cx="13" cy="19" r="6"/><circle cx="25" cy="19" r="6"/></g>' +
    '<g fill="#e08a2c"><circle cx="13" cy="31" r="6"/></g>' +
    '<g fill="#d9c6a5"><circle cx="37" cy="19" r="6"/><circle cx="25" cy="31" r="6"/><circle cx="37" cy="31" r="6"/></g>');

  defIcon("flask", "化学", "一只锥形瓶，瓶里的绿色液体正冒着气泡。",
    '<path d="M19 5 L29 5 L29 19 L41 39 A4 4 0 0 1 37.5 45 L10.5 45 A4 4 0 0 1 7 39 L19 19Z" fill="#eef6f1" stroke="#3f7663" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M14.4 29 L33.6 29 L41 39 A4 4 0 0 1 37.5 45 L10.5 45 A4 4 0 0 1 7 39Z" fill="#79c49a"/>' +
    '<g fill="#ffffff" opacity=".85"><circle cx="18" cy="36" r="2.6"/><circle cx="26" cy="40" r="1.8"/><circle cx="31" cy="34" r="2"/></g>' +
    '<path d="M17 5 L31 5" stroke="#3f7663" stroke-width="3.4" stroke-linecap="round"/>' +
    '<g fill="none" stroke="#8fb9a5" stroke-width="2" stroke-linecap="round"><path d="M23 24 C20 21 26 18 23 14"/></g>');

  defIcon("sprout", "生物", "一棵刚破土的小苗，两片子叶朝两边张开。",
    '<path d="M4 36 C14 31 34 31 44 36 L44 46 L4 46Z" fill="#b98a5a"/>' +
    '<path d="M24 42 L24 20" stroke="#3f7f42" stroke-width="4.4" stroke-linecap="round"/>' +
    '<path d="M24 28 C24 17 16 10 5 10 C5 21 13 28 24 28Z" fill="#79bf5c" stroke="#3f7f42" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M24 23 C24 12 32 5 43 5 C43 16 35 23 24 23Z" fill="#5da84a" stroke="#3f7f42" stroke-width="1.6" stroke-linejoin="round"/>');

  /* 收藏按钮上的 ☆/★ 是文字符号：字体缺字时会退成方框，
     两个状态的粗细也随字体变，索性换成同一副轮廓的空心/实心两版。 */
  defIcon("star", "未收藏", "一颗空心的五角星轮廓。",
    '<path d="M24 6 L30.2 18.8 L44 20.8 L34 30.6 L36.4 44.4 L24 37.9 L11.6 44.4 L14 30.6 L4 20.8 L17.8 18.8Z" ' +
    'fill="none" stroke="#a8935f" stroke-width="3.2" stroke-linejoin="round"/>');

  defIcon("star-on", "已收藏", "一颗填满金色的五角星。",
    '<path d="M24 6 L30.2 18.8 L44 20.8 L34 30.6 L36.4 44.4 L24 37.9 L11.6 44.4 L14 30.6 L4 20.8 L17.8 18.8Z" ' +
    'fill="#f2c14b" stroke="#a9761a" stroke-width="3.2" stroke-linejoin="round"/>');

  defIcon("clock", "用时", "一只圆形挂钟，指针指向十点十分。",
    '<circle cx="24" cy="25" r="18" fill="#f7f4ea" stroke="#8a7a5c" stroke-width="2.8"/>' +
    '<g stroke="#c2b291" stroke-width="2.2" stroke-linecap="round">' +
    '<path d="M24 9 L24 12"/><path d="M24 38 L24 41"/><path d="M8 25 L11 25"/><path d="M37 25 L40 25"/></g>' +
    /* 十点十分：长针指 2（十分），短针过 10 一点点，两针张成对称的 V。 */
    '<path d="M24 25 L32.7 20" stroke="#4a3f2a" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M24 25 L17.4 20.4" stroke="#4a3f2a" stroke-width="3.2" stroke-linecap="round"/>' +
    '<circle cx="24" cy="25" r="2.4" fill="#4a3f2a"/>');

  defIcon("speech", "对话", "一个圆角对话气泡，里面有三个点。",
    '<path d="M8 8 L40 8 A5 5 0 0 1 45 13 L45 31 A5 5 0 0 1 40 36 L22 36 L12 44 L13 36 L8 36 A5 5 0 0 1 3 31 L3 13 A5 5 0 0 1 8 8Z" ' +
    'fill="#e8f1fb" stroke="#3f6f9e" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<g fill="#3f6f9e"><circle cx="15" cy="22" r="3"/><circle cx="24" cy="22" r="3"/><circle cx="33" cy="22" r="3"/></g>');

  defIcon("map", "地图", "一张折叠的地图，上面有一条虚线路线和一个终点标记。",
    '<path d="M3 12 L17 7 L31 12 L45 7 L45 38 L31 43 L17 38 L3 43Z" fill="#f2efe0" stroke="#7f8a6a" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<g stroke="#c3cbb0" stroke-width="1.8"><path d="M17 7 L17 38"/><path d="M31 12 L31 43"/></g>' +
    '<path d="M9 34 C14 28 14 22 20 19 C26 16 30 22 36 16" fill="none" stroke="#c9682f" stroke-width="2.4" stroke-dasharray="4 3.5" stroke-linecap="round"/>' +
    '<path d="M36 8 C40 8 43 11 43 15 C43 20 36 26 36 26 C36 26 29 20 29 15 C29 11 32 8 36 8Z" fill="#d1495b"/>' +
    '<circle cx="36" cy="15" r="3" fill="#fff1f2"/>');

  defIcon("compass", "指南针", "一枚圆形指南针，红蓝双色的指针斜指向东北。",
    '<circle cx="24" cy="24" r="19" fill="#eef3f6" stroke="#4a6272" stroke-width="2.8"/>' +
    '<g stroke="#9fb2be" stroke-width="2" stroke-linecap="round">' +
    '<path d="M24 7 L24 11"/><path d="M24 37 L24 41"/><path d="M7 24 L11 24"/><path d="M37 24 L41 24"/></g>' +
    '<path d="M34 14 L27 27 L14 34 L21 21Z" fill="#d1495b"/>' +
    '<path d="M14 34 L21 21 L27 27Z" fill="#e8eef2" stroke="#4a6272" stroke-width="1.2" stroke-linejoin="round"/>' +
    '<circle cx="24" cy="24" r="2.6" fill="#4a6272"/>');

  defIcon("teddy", "孩子模式", "一只小熊的正脸，两只圆耳朵，鼻子是一个深色的小三角。",
    '<g fill="#c98a52" stroke="#8a5a2b" stroke-width="2.4">' +
    '<circle cx="11" cy="13" r="7.5"/><circle cx="37" cy="13" r="7.5"/>' +
    '<path d="M24 8 C34 8 42 16 42 26 C42 36 34 43 24 43 C14 43 6 36 6 26 C6 16 14 8 24 8Z"/></g>' +
    '<g fill="#f0cba3"><circle cx="11" cy="13" r="3.4"/><circle cx="37" cy="13" r="3.4"/></g>' +
    '<path d="M24 26 C31 26 35 29 35 33 C35 38 30 41 24 41 C18 41 13 38 13 33 C13 29 17 26 24 26Z" fill="#f0cba3"/>' +
    '<g fill="#4a3323"><circle cx="17" cy="23" r="2.6"/><circle cx="31" cy="23" r="2.6"/>' +
    '<path d="M20.5 30 L27.5 30 L24 34Z"/></g>' +
    '<path d="M24 34 L24 37" stroke="#4a3323" stroke-width="2" stroke-linecap="round"/>');

  defIcon("droplet", "水滴", "一颗水滴，左上角有一点高光。",
    '<path d="M24 4 C33 16 40 24 40 31 A16 16 0 0 1 8 31 C8 24 15 16 24 4Z" fill="#6fb7e8" stroke="#2f6f9e" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<path d="M17 30 C17 24 19 21 22 18" stroke="#e6f4ff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".9"/>');

  /* ---------------- 探索目录页的故事图 ----------------
     原来这一格是四个绝对定位的 emoji（☀️☁️🦊🍃）摞在一条 SVG 小路上：
     emoji 长相随系统字体变，缺字时还会退成方框，而那只狐狸和页面上方
     guide/fox 头像明明是同一个角色，却是两张完全不同的脸。 */
  def("scene/nature-trail", {
    /* 图位在宽屏是竖的、窄屏是横的，用 slice 铺满并把画面锚在底部：
       裁掉的永远是上面那片天，狐狸、小路和叶子这些主体一直在。 */
    viewBox: "0 0 420 420", fit: "xMidYMax slice", safe: 1,
    title: "小狐沿着小路找线索",
    desc: "一只橙色小狐狸站在金色小路的起点，路一直通向远处的山坡。天上有太阳和一朵云，路边长着一片大叶子，路上有两个标着线索的圆点。",
    bg: '<defs><linearGradient id="{{U}}sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#b6dcf6"/><stop offset="100%" stop-color="#edf7ff"/></linearGradient></defs>' +
      '<rect width="420" height="420" fill="url(#{{U}}sky)"/>',
    art:
      /* 太阳与云 */
      '<g><circle cx="348" cy="62" r="21" fill="#f8cd4e"/>' +
      '<g stroke="#f8cd4e" stroke-width="4.5" stroke-linecap="round">' +
      '<path d="M348 30 v-9"/><path d="M348 94 v9"/><path d="M316 62 h-9"/><path d="M380 62 h9"/>' +
      '<path d="M325 39 l-6-6"/><path d="M371 85 l6 6"/><path d="M371 39 l6-6"/><path d="M325 85 l-6 6"/></g></g>' +
      '<path d="M68 128 C56 128 50 121 52 113 C54 106 61 103 67 105 C69 94 80 88 90 92 C97 95 101 101 102 108 C110 107 115 112 114 119 C113 125 108 128 102 128Z" fill="#fdfeff" stroke="#c3d8e6" stroke-width="2.4" stroke-linejoin="round"/>' +
      /* 远山与草地 */
      '<path d="M0 274 C50 240 96 254 140 238 C186 222 232 246 280 235 C330 224 380 244 420 231 L420 294 L0 294Z" fill="#a4d29b"/>' +
      '<path d="M0 270 C70 252 130 276 200 266 C270 256 340 272 420 260 L420 420 L0 420Z" fill="#7cc06f"/>' +
      /* 小路：底色一条、虚线一条，走向和下面两个线索点对齐 */
      '<path d="M-10 412 C60 374 90 398 150 370 C215 340 262 358 330 330 C370 314 400 312 432 310" fill="none" stroke="#efc45c" stroke-width="32" stroke-linecap="round"/>' +
      '<path d="M-10 412 C60 374 90 398 150 370 C215 340 262 358 330 330 C370 314 400 312 432 310" fill="none" stroke="#fff5d2" stroke-width="3" stroke-linecap="round" stroke-dasharray="10 14"/>' +
      '<circle cx="176" cy="360" r="8" fill="#3d7fd6" stroke="#fff" stroke-width="2.4"/>' +
      '<circle cx="316" cy="336" r="8" fill="#2f8d54" stroke="#fff" stroke-width="2.4"/>' +
      /* 路边的大叶子，叶脉画出来才是「叶脉像小路」那条线索 */
      '<g transform="translate(312 348) rotate(-14)">' +
      '<path d="M0 34 C0 12 14 -2 38 -2 C38 22 24 34 0 34Z" fill="#69ac4e"/>' +
      '<path d="M0 34 C11 24 26 10 38 -2" stroke="#3b7530" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
      '<g stroke="#3b7530" stroke-width="1.6" stroke-linecap="round" opacity=".8">' +
      '<path d="M9 26 L8 17"/><path d="M17 18 L16 9"/><path d="M25 11 L24 4"/>' +
      '<path d="M9 26 L18 25"/><path d="M17 18 L27 17"/></g></g>' +
      /* 小狐探探：侧身站在路口，配色和 guide/fox 头像一致 */
      '<g transform="translate(66 332)">' +
      '<path d="M8 36 C-10 32 -18 16 -8 4 C-2 14 8 22 20 28Z" fill="#ef8b3c"/>' +
      '<path d="M-8 4 C-14 -3 -11 -11 -3 -8 C2 -6 2 2 -6 6Z" fill="#fdf4e8"/>' +
      '<path d="M12 30 C12 17 23 9 39 9 C53 9 62 16 63 26 C64 36 56 43 41 44 C25 45 13 39 12 30Z" fill="#ef8b3c"/>' +
      '<g stroke="#cf7529" stroke-width="5.5" stroke-linecap="round"><path d="M20 42 L19 54"/><path d="M33 44 L32 55"/><path d="M49 42 L51 54"/><path d="M58 39 L61 51"/></g>' +
      '<path d="M53 8 L50 -5 L63 2Z" fill="#d9752c"/><path d="M70 4 L76 -8 L78 6Z" fill="#d9752c"/>' +
      '<path d="M55 6.5 L54 -1 L60 2.5Z" fill="#f7cba6"/><path d="M71.5 4.5 L74.5 -2.5 L75.5 5.5Z" fill="#f7cba6"/>' +
      '<path d="M52 16 C52 6 60 0 69 0 C79 0 86 7 86 17 C86 26 78 32 69 32 C59 32 52 25 52 16Z" fill="#ef8b3c"/>' +
      '<path d="M70 18 C79 18 88 21 91 26 C93 30 88 33 82 32 C75 31 70 25 70 21Z" fill="#fdf4e8"/>' +
      '<circle cx="66" cy="13" r="2.8" fill="#3a2415"/><circle cx="66.9" cy="12.1" r=".9" fill="#fff"/>' +
      '<path d="M91 26 C94 26 95 28 94 30 C93 32 90 32 89 30Z" fill="#3a2415"/>' +
      '<g stroke="#cf7529" stroke-width="1.4" stroke-linecap="round" opacity=".8">' +
      '<path d="M78 24 L88 21"/><path d="M78 28 L88 29"/></g></g>'
  });

  /* ---------------- 厨房科学首屏：硬币上的水包 ----------------
     「今天就能做」原来只有三行文字步骤，孩子看不到要观察的到底是什么。
     画成剖面图才说得清关键：水面高过硬币边缘还不流下来，鼓起的那一段
     就是表面张力。鼓起高度按真实比例给（约硬币直径的五分之一），
     不夸张成半个球。 */
  def("scene/coin-dome", {
    viewBox: "0 0 420 240", fit: "xMidYMid meet",
    title: "硬币上的水包（剖面）",
    desc: "从侧面看：一枚硬币平放在毛巾上，硬币上盛着的水高过了硬币边缘，鼓成一个扁扁的包还没有流下来。上方一支滴管正落下一滴水。左边的小卡片写着先猜 15 滴、实际 24 滴。",
    bg: '<rect width="420" height="240" fill="#f7fbf8"/>',
    art:
      /* 桌面与毛巾：告诉孩子这实验要垫东西 */
      '<path d="M0 208 L420 208" stroke="#cfd9d1" stroke-width="2"/>' +
      '<path d="M46 190 L374 190 A6 6 0 0 1 374 208 L46 208 A6 6 0 0 1 46 190Z" fill="#e8ded0" stroke="#c8b9a4" stroke-width="1.8"/>' +
      '<g stroke="#d3c4ad" stroke-width="1.6" stroke-linecap="round">' +
      '<path d="M92 193 L92 205"/><path d="M148 193 L148 205"/><path d="M272 193 L272 205"/><path d="M328 193 L328 205"/></g>' +
      /* 硬币：侧视只有薄薄一条，边缘的滚花是它能「兜住」水的地方 */
      '<path d="M132 178 L268 178 A4 4 0 0 1 268 190 L132 190 A4 4 0 0 1 132 178Z" fill="#cdd3d8" stroke="#8d979f" stroke-width="1.8"/>' +
      '<path d="M136 181 L264 181" stroke="#eef1f3" stroke-width="2" stroke-linecap="round"/>' +
      '<g stroke="#a8b1b8" stroke-width="1.4"><path d="M136 185 L136 189"/><path d="M262 185 L262 189"/></g>' +
      /* 水包：两侧被硬币边缘钉住，顶上是一段圆弧 */
      '<path d="M132 178 C132 156 154 150 200 150 C246 150 268 156 268 178Z" fill="#8ec9ea" opacity=".92"/>' +
      '<path d="M132 178 C132 156 154 150 200 150 C246 150 268 156 268 178" fill="none" stroke="#3f88b5" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="M152 170 C156 160 168 155 184 154" fill="none" stroke="#eaf6fd" stroke-width="4" stroke-linecap="round" opacity=".85"/>' +
      /* 参考线与鼓起高度：没有这条线，「鼓起来」就无从比较 */
      '<path d="M84 178 L288 178" stroke="#6b8f7f" stroke-width="1.6" stroke-dasharray="7 6"/>' +
      '<path d="M104 150 L104 178" stroke="#2f6f5c" stroke-width="2"/>' +
      '<path d="M100 154 L104 148 L108 154Z" fill="#2f6f5c"/><path d="M100 174 L104 180 L108 174Z" fill="#2f6f5c"/>' +
      '<text x="98" y="157" font-size="13" font-weight="700" fill="#2f6f5c" text-anchor="end">鼓起</text>' +
      '<text x="98" y="172" font-size="12" fill="#5c6b64" text-anchor="end">≈5 mm</text>' +
      /* 滴管与正在落下的那一滴 */
      '<path d="M186 26 A14 15 0 0 1 214 26 L214 40 L186 40Z" fill="#dbe7ef" stroke="#7c8f9c" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M190 40 L210 40 L210 96 L204 112 L196 112 L190 96Z" fill="#eef4f8" stroke="#7c8f9c" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M193 62 L207 62 L207 96 L202.5 108 L197.5 108 L193 96Z" fill="#8ec9ea"/>' +
      '<path d="M200 120 C206 129 211 134 211 139 A11 11 0 0 1 189 139 C189 134 194 129 200 120Z" fill="#8ec9ea" stroke="#3f88b5" stroke-width="2"/>' +
      '<path d="M196 140 C194 135 196 131 199 128" fill="none" stroke="#eaf6fd" stroke-width="2.6" stroke-linecap="round"/>' +
      /* 先猜 / 实际：这一页所有实验都要求先写预测，首屏就把这件事画出来 */
      '<path d="M26 24 L172 24 A10 10 0 0 1 182 34 L182 100 A10 10 0 0 1 172 110 L26 110 A10 10 0 0 1 16 100 L16 34 A10 10 0 0 1 26 24Z" fill="#fffdf8" stroke="#bdd2c4" stroke-width="2"/>' +
      '<text x="30" y="46" font-size="12" font-weight="700" fill="#667a72">先猜</text>' +
      '<text x="30" y="70" font-size="21" font-weight="800" fill="#405b51">15 滴</text>' +
      '<text x="108" y="46" font-size="12" font-weight="700" fill="#667a72">实际</text>' +
      '<text x="108" y="70" font-size="21" font-weight="800" fill="#2f6f5c">24 滴</text>' +
      '<path d="M30 82 L168 82" stroke="#e2e8e1" stroke-width="1.6"/>' +
      '<text x="30" y="99" font-size="12" fill="#667a72">猜少了 9 滴，把它记下来</text>' +
      /* 名词标注：中文说人话，术语保留英文 */
      '<path d="M292 158 L270 166" stroke="#93621f" stroke-width="1.8" stroke-linecap="round"/>' +
      '<circle cx="270" cy="166" r="3" fill="#93621f"/>' +
      '<text x="296" y="126" font-size="15" font-weight="800" fill="#7a5417">表面张力</text>' +
      '<text x="296" y="143" font-size="12" font-weight="700" fill="#93621f">surface tension</text>' +
      '<text x="296" y="164" font-size="12.5" fill="#5c6b64">水分子手拉手，</text>' +
      '<text x="296" y="181" font-size="12.5" fill="#5c6b64">把水面兜成一个包</text>' +
            '<text x="200" y="228" font-size="12" fill="#667a72" text-anchor="middle">桌面垫一条毛巾，溢出来也不怕</text>'
  });

  /* ---------------- 离线时顶替远程照片的星空图 ---------------- 
     太空页的「今天的天文图」和照片墙都要联网才有内容，断网时原来只剩一行
     「未联网」的灰字或一个 emoji。这张星云是内置的，离线打开也有东西可看。 */
  def("space/nebula", {
    viewBox: "0 0 160 100", fit: "xMidYMid slice", safe: 1,
    title: "猎户座大星云示意图",
    desc: "深蓝色的夜空里有一团粉紫色的发光气体云，云中散布着几颗明亮的新生恒星，周围点缀着远处的星点。",
    bg: '<defs>' +
      '<radialGradient id="{{U}}sky" cx="42%" cy="46%" r="78%">' +
      '<stop offset="0%" stop-color="#1d2a52"/><stop offset="100%" stop-color="#080c1c"/></radialGradient>' +
      /* 气体没有边界，硬边画出来只会像三个套在一起的椭圆色块 */
      '<filter id="{{U}}b1" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>' +
      '<filter id="{{U}}b2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>' +
      '<filter id="{{U}}b3" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.4"/></filter>' +
      '<filter id="{{U}}b4" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.8"/></filter>' +
      "</defs>" +
      '<rect width="160" height="100" fill="url(#{{U}}sky)"/>',
    art:
      /* 星云主体：外层冷紫、中层洋红、内层暖粉，越往核心越亮 */
      '<path d="M18 66 C14 44 30 24 56 18 C86 11 118 20 134 40 C148 58 142 82 118 90 C92 99 46 94 26 82 C20 78 19 72 18 66Z" fill="#5b3480" opacity=".62" filter="url(#{{U}}b1)"/>' +
      '<path d="M34 62 C32 46 48 32 70 29 C94 26 116 36 122 52 C127 66 118 79 98 83 C74 88 46 80 36 70 C34 68 34 65 34 62Z" fill="#a63d84" opacity=".62" filter="url(#{{U}}b2)"/>' +
      '<path d="M50 58 C50 47 60 39 74 38 C90 37 102 44 104 54 C106 64 97 72 82 73 C66 74 52 68 50 58Z" fill="#e0708f" opacity=".66" filter="url(#{{U}}b3)"/>' +
      '<path d="M64 55 C64 48 71 44 79 44 C88 44 94 49 94 55 C94 62 87 66 79 66 C70 66 64 61 64 55Z" fill="#ffd9c0" opacity=".7" filter="url(#{{U}}b3)"/>' +
      /* 暗尘带：真星云都有这么一条挡光的尘埃，少了它就只是一团糖果色 */
      '<path d="M26 84 C52 70 78 74 104 62 C118 56 128 47 136 36 L143 45 C133 57 121 66 107 72 C81 84 54 80 32 92Z" fill="#0c1226" opacity=".62" filter="url(#{{U}}b2)"/>' +
      /* 云里正在诞生的三颗亮星：十字光芒是望远镜的衍射尖，孩子最认得这个符号 */
      '<g fill="#ffd9a8" opacity=".8" filter="url(#{{U}}b4)">' +
      '<circle cx="74" cy="51" r="6"/><circle cx="92" cy="65" r="4"/><circle cx="58" cy="67" r="3.4"/></g>' +
      '<g stroke="#fff8e6" stroke-linecap="round" fill="none">' +
      '<g stroke-width="1.5"><path d="M74 42 v18 M65 51 h18"/></g>' +
      '<g stroke-width="1.1" opacity=".9"><path d="M92 58 v14 M85 65 h14"/><path d="M58 61 v12 M52 67 h12"/></g>' +
      "</g>" +
      '<g fill="#fffdf5"><circle cx="74" cy="51" r="2.8"/><circle cx="92" cy="65" r="2"/><circle cx="58" cy="67" r="1.7"/></g>' +
      /* 背景恒星：大小和亮度都要拉开，一样亮就成了均匀撒开的白点阵 */
      '<g fill="#eaf1ff">' +
      '<circle cx="14" cy="18" r="1.5"/><circle cx="112" cy="18" r="1.4"/><circle cx="150" cy="34" r="1.3"/>' +
      '<circle cx="72" cy="95" r="1.3"/>' +
      '<g opacity=".7"><circle cx="52" cy="17" r="1.1"/><circle cx="136" cy="10" r="1"/>' +
      '<circle cx="132" cy="86" r="1.1"/><circle cx="16" cy="78" r="1.1"/></g>' +
      '<g opacity=".45"><circle cx="34" cy="10" r=".9"/><circle cx="88" cy="12" r=".9"/>' +
      '<circle cx="146" cy="66" r=".9"/><circle cx="108" cy="94" r=".9"/><circle cx="42" cy="90" r=".9"/>' +
      '<circle cx="8" cy="48" r=".9"/><circle cx="26" cy="34" r=".8"/><circle cx="120" cy="30" r=".7"/>' +
      '<circle cx="64" cy="8" r=".7"/><circle cx="98" cy="86" r=".7"/></g>' +
      "</g>"
  });

  /* ---------------- 昆虫变态发育各阶段 ---------------- */

  function defLife(name, title, desc, art) {
    def("life/" + name, {
      viewBox: "0 0 48 48", fit: "xMidYMid meet",
      title: title, desc: desc, bg: "", art: art
    });
  }

  defLife("egg", "卵", "叶片上贴着三粒米粒大小的白色虫卵。",
    '<path d="M3 36 C10 24 26 20 45 24 C38 36 20 42 3 36Z" fill="#6fae52"/>' +
    '<path d="M3 36 C16 32 32 27 45 24" stroke="#3f7a30" stroke-width="2" fill="none"/>' +
    '<g fill="#fdf8e6" stroke="#cdbf95" stroke-width="1.4">' +
    '<ellipse cx="16" cy="28" rx="4" ry="5.2"/><ellipse cx="25" cy="25" rx="4" ry="5.2"/><ellipse cx="34" cy="24" rx="4" ry="5.2"/></g>');

  defLife("larva", "幼虫", "一条绿色的毛毛虫，身体一节一节，正在啃叶子。",
    '<path d="M2 40 C8 30 22 26 40 30 C34 40 18 44 2 40Z" fill="#6fae52" opacity=".7"/>' +
    '<g fill="#8fc45c" stroke="#5b8f38" stroke-width="1.6">' +
    '<circle cx="10" cy="26" r="6"/><circle cx="19" cy="25" r="6.4"/><circle cx="28" cy="26" r="6"/><circle cx="36" cy="28" r="5.2"/></g>' +
    '<circle cx="41" cy="27" r="5.6" fill="#c9dd6e" stroke="#5b8f38" stroke-width="1.6"/>' +
    '<circle cx="43" cy="25.5" r="1.6" fill="#233318"/>' +
    '<g stroke="#5b8f38" stroke-width="1.6" stroke-linecap="round"><path d="M43 21 L46 17"/><path d="M39 21 L38 16"/></g>' +
    '<g stroke="#5b8f38" stroke-width="1.8" stroke-linecap="round"><path d="M10 32 L9 37"/><path d="M19 32 L19 37"/><path d="M28 32 L29 37"/></g>');

  defLife("pupa", "蛹", "一枚棕色的蛹用丝挂在树枝上，外壳有一圈圈纹路。",
    '<path d="M6 8 L42 8" stroke="#8b5a2b" stroke-width="3.4" stroke-linecap="round"/>' +
    '<path d="M24 9 L24 14" stroke="#cdbf95" stroke-width="2"/>' +
    '<path d="M24 13 C33 13 37 21 36 30 C35 39 30 45 24 45 C18 45 13 39 12 30 C11 21 15 13 24 13Z" fill="#b07b3e" stroke="#7d5324" stroke-width="2"/>' +
    '<g stroke="#7d5324" stroke-width="1.4" fill="none" opacity=".8">' +
    '<path d="M14 24 C19 26 29 26 34 24"/><path d="M13 30 C19 32 29 32 35 30"/><path d="M14 36 C19 38 29 38 34 36"/></g>' +
    '<path d="M18 18 C20 15 24 14 27 15" stroke="#d8a96a" stroke-width="2.4" stroke-linecap="round" fill="none"/>');

  defLife("adult", "成虫", "一只橙黑相间的蝴蝶张开双翅。",
    '<g fill="#e8862c" stroke="#5a3210" stroke-width="1.8" stroke-linejoin="round">' +
    '<path d="M23 22 C16 10 6 8 3 14 C0 20 8 26 22 27Z"/><path d="M25 22 C32 10 42 8 45 14 C48 20 40 26 26 27Z"/>' +
    '<path d="M23 27 C16 32 10 40 14 44 C19 48 23 39 24 30Z"/><path d="M25 27 C32 32 38 40 34 44 C29 48 25 39 24 30Z"/></g>' +
    '<g fill="#fdf1dc"><circle cx="12" cy="17" r="2.2"/><circle cx="36" cy="17" r="2.2"/><circle cx="17" cy="39" r="1.8"/><circle cx="31" cy="39" r="1.8"/></g>' +
    '<ellipse cx="24" cy="28" rx="2.6" ry="12" fill="#33251a"/>' +
    '<g stroke="#33251a" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M23 17 C21 12 18 9 15 8"/><path d="M25 17 C27 12 30 9 33 8"/></g>');

  defLife("nymph", "若虫", "一只没有翅膀的小若虫，六条腿分列两侧，外形已经很像成虫。",
    /* 正面视角两侧都看得见，腿要一侧三条共六条（和放大镜舞台一致）。 */
    '<g stroke="#4d7a3a" stroke-width="2" stroke-linecap="round" fill="none">' +
    '<path d="M17 27 L8 23 L4 27"/><path d="M16 32 L6 32 L2 36"/><path d="M18 37 L10 41 L7 46"/>' +
    '<path d="M31 27 L40 23 L44 27"/><path d="M32 32 L42 32 L46 36"/><path d="M30 37 L38 41 L41 46"/></g>' +
    '<ellipse cx="24" cy="33" rx="9" ry="11" fill="#7cb35c"/>' +
    '<ellipse cx="24" cy="20" rx="7.5" ry="6.5" fill="#8fc45c"/>' +
    '<circle cx="21" cy="19" r="2" fill="#22341a"/><circle cx="27" cy="19" r="2" fill="#22341a"/>' +
    '<g stroke="#4d7a3a" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M20 15 C18 10 15 8 12 7"/><path d="M28 15 C30 10 33 8 36 7"/></g>' +
    '<path d="M18 27 C21 25 27 25 30 27" stroke="#4d7a3a" stroke-width="1.6" fill="none" opacity=".7"/>');

  /* ---------------- 雨滴 ----------------
     真实雨滴不是眼泪形：小滴接近球形，大滴被下方空气托扁成汉堡形。
     天气页要按直径实时换形状，所以这里给的是函数而不是固定图。 */

  /* 半椭圆用一段三次贝塞尔近似时，控制点要拉到 4/3 倍半径上。 */
  function raindropPath(mm) {
    var d = Math.max(0.1, Math.min(6, Number(mm) || 0.1));
    /* 0.8 mm 以下基本是球；越往上被下方空气顶得越扁，底面还会凹进去。 */
    var flat = Math.min(1, Math.max(0, (d - 0.8) / 4.2));
    var rx = 15 + flat * 12;
    var ry = 15 - flat * 6;
    var cy = 24 + flat * 2.5;
    var dimple = flat * ry * 0.85;
    var n = function (value) { return Math.round(value * 100) / 100; };
    return "M" + n(24 - rx) + " " + n(cy) +
      " C" + n(24 - rx) + " " + n(cy - ry * 1.34) + " " + n(24 + rx) + " " + n(cy - ry * 1.34) + " " + n(24 + rx) + " " + n(cy) +
      " C" + n(24 + rx) + " " + n(cy + ry * 0.95) + " " + n(24 + rx * 0.5) + " " + n(cy + ry) + " 24 " + n(cy + ry - dimple) +
      " C" + n(24 - rx * 0.5) + " " + n(cy + ry) + " " + n(24 - rx) + " " + n(cy + ry * 0.95) + " " + n(24 - rx) + " " + n(cy) + "Z";
  }

  /* 按直径画一颗雨滴；超过 5 mm 时画成正在破碎的两小滴。 */
  function raindrop(mm, options) {
    var opts = options || {};
    var d = Math.max(0.1, Math.min(6, Number(mm) || 0.1));
    var label = opts.label || ("直径约 " + d.toFixed(1) + " 毫米的雨滴");
    var flat = Math.min(1, Math.max(0, (d - 0.8) / 4.2));
    var body = d > 5
      ? '<g fill="#3f8fd0" stroke="#26638f" stroke-width="2">' +
        '<ellipse cx="13" cy="27" rx="10" ry="7.5"/><ellipse cx="34" cy="21" rx="8" ry="6"/>' +
        '<circle cx="27" cy="37" r="3.4"/><circle cx="41" cy="34" r="2.4"/></g>' +
        '<g fill="#bfe3f8" opacity=".85"><ellipse cx="10" cy="24" rx="3" ry="1.9"/><ellipse cx="32" cy="19" rx="2.4" ry="1.5"/></g>'
      : '<path d="' + raindropPath(d) + '" fill="#3f8fd0" stroke="#26638f" stroke-width="2"/>' +
        '<ellipse cx="' + (24 - (15 + flat * 12) * 0.42) + '" cy="' + (24 - (15 - flat * 6) * 0.45) +
        '" rx="' + (3.2 + flat * 1.6) + '" ry="' + (2.2 - flat * 0.7) +
        '" fill="#cfeaf9" opacity=".9" transform="rotate(-22 18 18)"/>';
    var head = '<svg xmlns="http://www.w3.org/2000/svg" class="illus illus-raindrop" viewBox="0 0 48 48" ' +
      'preserveAspectRatio="xMidYMid meet" focusable="false"';
    if (opts.decorative === true) return head + ' aria-hidden="true">' + body + "</svg>";
    return head + ' role="img"><title>' + esc(label) + "</title>" + body + "</svg>";
  }

  /* ---------------- 图例 ----------------
     示意图一旦用颜色区分含义，就必须写出每种颜色代表什么。
     各页原来各写各的 HTML，这里统一成一份结构和 .illus-legend 样式。 */

  function legend(items, options) {
    var list = Array.isArray(items) ? items : [];
    if (!list.length) return "";
    var opts = options || {};
    var out = '<ul class="illus-legend' + (opts.className ? " " + esc(opts.className) : "") + '"';
    out += opts.label ? ' aria-label="' + esc(opts.label) + '">' : ">";
    for (var i = 0; i < list.length; i++) {
      var item = list[i] || {};
      var shape = item.shape === "line" || item.shape === "dot" ? item.shape : "block";
      out += "<li><span class=\"illus-legend-swatch is-" + shape + '" style="background:' + esc(item.color || "currentColor") +
        '" aria-hidden="true"></span><span class="illus-legend-text">' + esc(item.label || "") + "</span>";
      if (item.note) out += '<span class="illus-legend-note">' + esc(item.note) + "</span>";
      out += "</li>";
    }
    return out + "</ul>";
  }

  /* ================= 目录卡片场景 =================
     `card/<slug>` 是目录页图位专用的一族插图，和上面按物种画的 `ocean/*`、`insects/*`
     不同：每张都画「这一页在干什么」，而不是一个孤立的对象，所以恐龙卡里有地层和化石，
     光影卡里有灯、物体和影子三者的几何关系。

     统一规格（改动或新增时必须照做，否则会在窄卡片里被裁到）：
     - viewBox 固定 `0 0 160 110`，fit 为 slice，safe 取 0.86；
     - 关键内容画在 x∈[16,144]、y∈[10,100] 之内，`safeArea()` 会把它压进各种宽高比都可见的范围；
     - 背景铺满整块 160×110，被裁掉也看不出来；
     - 渐变、clipPath 等需要 id 的地方一律写 `{{U}}` 占位，`markup()` 会替换成本次渲染唯一的后缀。 */

  var CARD_BOX = "0 0 160 110";

  function defCard(slug, spec) {
    def("card/" + slug, {
      viewBox: CARD_BOX,
      fit: "xMidYMid slice",
      safe: 0.86,
      title: spec.title,
      desc: spec.desc,
      bg: spec.bg,
      art: spec.art
    });
  }

  /** 卡片天空：从上到下的两段渐变，铺满整个 160×110。 */
  function cardSky(top, bottom) {
    return '<defs><linearGradient id="sky{{U}}" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bottom + '"/>' +
      "</linearGradient></defs>" +
      '<rect width="160" height="110" fill="url(#sky{{U}})"/>';
  }

  /** 卡片地面：一条起伏的地平线，y 为地平线高度。 */
  function cardGround(color, y) {
    return '<path d="M0 ' + y + " C30 " + (y - 6) + " 58 " + (y + 5) + " 86 " + y +
      " C114 " + (y - 5) + " 138 " + (y + 4) + " 160 " + (y - 2) +
      ' L160 110 L0 110Z" fill="' + color + '"/>';
  }

  /* ---------------- 互动实验卡 ---------------- */

  defCard("number-blocks", {
    title: "数感积木插图",
    desc: "十格阵里放了 7 块方积木，还空着 3 格；右边立着一根十连条，说明 7 再加 3 就是一个十。",
    bg: cardSky("#fff6e2", "#ffe6bd"),
    art: (function () {
      var out = '<rect x="16" y="26" width="98" height="60" rx="9" fill="#fffdf6" stroke="#e0a33c" stroke-width="2.4"/>';
      for (var i = 0; i < 10; i++) {
        var col = i % 5, row = i < 5 ? 0 : 1;
        var x = 21 + col * 18.5, y = 33 + row * 24;
        if (i < 7) {
          out += '<rect x="' + x + '" y="' + y + '" width="16" height="18" rx="3.4" fill="#4d86d6"/>' +
            '<rect x="' + x + '" y="' + y + '" width="16" height="6" rx="3" fill="#7fb0ef"/>';
        } else {
          out += '<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="14" height="16" rx="3" fill="#fdf0d6" stroke="#e0a33c" stroke-width="1.6" stroke-dasharray="3 3"/>';
        }
      }
      /* 中线把 10 格分成 5 + 5，这是十格阵最核心的结构提示。 */
      out += '<path d="M65 30 L65 82" stroke="#c8862a" stroke-width="1.8" stroke-dasharray="4 3"/>';
      out += '<text x="18" y="20" font-size="12" font-weight="700" fill="#8a5a10">已有 7</text>';
      out += '<text x="66" y="20" font-size="12" font-weight="700" fill="#c2410c">还差 3</text>';
      /* 右侧十连条：10 个一摞起来就是「一个十」。 */
      out += '<rect x="120" y="26" width="17" height="60" rx="4" fill="#f0a02a" stroke="#a35f0d" stroke-width="2"/>';
      for (var s = 1; s < 10; s++) {
        out += '<path d="M120 ' + (26 + s * 6) + ' L137 ' + (26 + s * 6) + '" stroke="#a35f0d" stroke-width="1.1"/>';
      }
      out += '<text x="120" y="20" font-size="12" font-weight="700" fill="#8a5a10">10</text>';
      out += '<text x="40" y="100" font-size="11" font-weight="700" fill="#8a5a10">满十换一条</text>';
      return out;
    })()
  });

  defCard("fraction-lab", {
    title: "分数实验台插图",
    desc: "左边的饼图涂了二分之一，右边的饼图把同样的半边切成两个四分之一，中间一个等号说明它们一样大。",
    bg: cardSky("#fff1f4", "#ffdde5"),
    /* 右边那两个四分之一必须挨在一起、并且落在和左图同一侧的半边上：
       涂成对角的两块面积虽然也是 2/4，但看上去和左边的半圆对不上，
       这张卡要讲的恰恰是「它们是同一块地方」。
       扇形一定要把圆心写进路径里。只写「弧 + Z」封出来的是弓形，
       直边是弦不是半径，涂出来是两个尖角三角形，四分之一就不成立了。 */
    art:
      '<circle cx="42" cy="50" r="27" fill="#fff8f9" stroke="#c02a52" stroke-width="2.6"/>' +
      '<path d="M42 23 A27 27 0 0 1 42 77 Z" fill="#e8567f"/>' +
      '<path d="M42 23 L42 77" stroke="#c02a52" stroke-width="2.2"/>' +
      '<text x="30" y="99" font-size="15" font-weight="700" fill="#a51b42">1/2</text>' +
      '<text x="72" y="58" font-size="18" font-weight="700" fill="#8a5a10">=</text>' +
      '<circle cx="120" cy="50" r="27" fill="#fff8f9" stroke="#c02a52" stroke-width="2.6"/>' +
      '<path d="M120 50 L120 23 A27 27 0 0 1 147 50 Z" fill="#e8567f"/>' +
      '<path d="M120 50 L147 50 A27 27 0 0 1 120 77 Z" fill="#e8567f"/>' +
      '<path d="M120 23 L120 77 M93 50 L147 50" stroke="#c02a52" stroke-width="2.2"/>' +
      '<text x="106" y="99" font-size="15" font-weight="700" fill="#a51b42">2/4</text>'
  });

  defCard("pattern-machine", {
    title: "规律机器插图",
    desc: "四根柱子一根比一根高，高度依次是 1、2、3、4 格，虚线的第五根打着问号，等着被预测。",
    bg: cardSky("#eef3ff", "#dbe6ff"),
    art: (function () {
      var out = '<path d="M14 92 L150 92" stroke="#7b8bb8" stroke-width="2"/>';
      var heights = [16, 30, 44, 58];
      for (var i = 0; i < heights.length; i++) {
        var x = 22 + i * 24, h = heights[i];
        out += '<rect x="' + x + '" y="' + (92 - h) + '" width="17" height="' + h + '" rx="3" fill="#4d86d6"/>' +
          '<rect x="' + x + '" y="' + (92 - h) + '" width="17" height="5" rx="2.5" fill="#7fb0ef"/>';
      }
      out += '<rect x="118" y="20" width="17" height="72" rx="3" fill="none" stroke="#4d86d6" stroke-width="2.2" stroke-dasharray="5 4"/>' +
        '<text x="121" y="15" font-size="15" font-weight="700" fill="#2b56a8">?</text>';
      /* 顶点连成的直线就是「每次加同样多」的可视化。 */
      out += '<path d="M30 76 L54 62 L78 48 L102 34 L126 20" fill="none" stroke="#e07b1f" stroke-width="2.4" stroke-dasharray="6 4" stroke-linecap="round"/>';
      out += '<g fill="#e07b1f"><circle cx="30" cy="76" r="3"/><circle cx="54" cy="62" r="3"/><circle cx="78" cy="48" r="3"/><circle cx="102" cy="34" r="3"/></g>';
      out += '<text x="24" y="20" font-size="12" font-weight="700" fill="#2b56a8">每次都多 1 格</text>';
      return out;
    })()
  });

  defCard("symmetry-studio", {
    title: "对称工作室插图",
    desc: "一条竖直虚线是对称轴，左右两边的图案完全镜像，连三个彩色圆点的位置都一一对应。",
    bg: cardSky("#f4efff", "#e2d8fb"),
    art: (function () {
      /* 半只蝴蝶镜像成整只：对称轴两侧每个花纹到轴的距离相同。 */
      var half =
        '<path d="M78 46 C68 22 48 14 36 20 C24 26 26 42 40 48 C28 54 26 70 38 76 C50 82 70 68 78 52Z" fill="#8b6de0" stroke="#4b3a86" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<circle cx="48" cy="32" r="5.6" fill="#ffd24a"/>' +
        '<circle cx="42" cy="62" r="4.4" fill="#41c7a4"/>' +
        '<circle cx="60" cy="54" r="3.6" fill="#ff7aa8"/>';
      return half +
        '<g transform="translate(160,0) scale(-1,1)">' + half + "</g>" +
        '<ellipse cx="80" cy="52" rx="4.6" ry="22" fill="#3a2c68"/>' +
        '<circle cx="80" cy="26" r="5.4" fill="#3a2c68"/>' +
        '<path d="M77 22 C72 14 68 11 63 10 M83 22 C88 14 92 11 97 10" fill="none" stroke="#3a2c68" stroke-width="2.2" stroke-linecap="round"/>' +
        '<path d="M80 16 L80 92" stroke="#4b3a86" stroke-width="2.2" stroke-dasharray="6 5"/>' +
        '<g stroke="#4b3a86" stroke-width="1.4" stroke-dasharray="3 3">' +
        '<path d="M48 32 L112 32"/><path d="M42 62 L118 62"/>' +
        "</g>" +
        '<text x="50" y="103" font-size="12" font-weight="700" fill="#4b3a86">对折能重合</text>';
    })()
  });

  defCard("estimation-station", {
    title: "估算站插图",
    desc: "玻璃罐里装着十五颗彩色糖豆，其中五颗被一个虚线圈单独框出来：数清这一圈，再看整罐大约是三圈。",
    bg: cardSky("#fffaf0", "#ffeccd"),
    art: (function () {
      var jar = '<path d="M44 34 L116 34 L112 96 Q80 102 48 96Z" fill="#eaf6fb" opacity=".85" stroke="#7fa8bd" stroke-width="2.4"/>' +
        '<rect x="40" y="26" width="80" height="9" rx="4" fill="#c98a3e"/>';
      var beans = "";
      /* 前 5 颗聚成被圈住的那一撮，其余 10 颗散在圈外：图上写的数一定要数得出来。
         旧版的圈画在糖豆堆中间，圈里其实只有 6 颗，标签却写 10——照着图数的孩子
         第一步就对不上。现在 5 + 10 = 15，和贴纸「estimate-eye」的 5 → ≈15 同一套账。 */
      var spots = [
        [56, 48, "#ff7aa8"], [70, 45, "#4d86d6"], [84, 48, "#ffc233"], [62, 57, "#8b6de0"], [77, 56, "#ff9147"],
        [100, 44, "#41c7a4"], [106, 58, "#4d86d6"], [54, 68, "#ffc233"], [63, 71, "#41c7a4"], [81, 71, "#ff7aa8"],
        [96, 70, "#8b6de0"], [58, 84, "#ff9147"], [74, 86, "#4d86d6"], [90, 85, "#ffc233"], [104, 80, "#41c7a4"]
      ];
      for (var i = 0; i < spots.length; i++) {
        beans += '<ellipse cx="' + spots[i][0] + '" cy="' + spots[i][1] + '" rx="6.4" ry="5" fill="' + spots[i][2] + '"/>' +
          '<ellipse cx="' + (spots[i][0] - 1.8) + '" cy="' + (spots[i][1] - 1.6) + '" rx="2.2" ry="1.5" fill="#ffffff" opacity=".55"/>';
      }
      /* 先框出一小撮当「一份」，再看整罐是几份，这就是估算的分块策略。 */
      var group = '<ellipse cx="70" cy="51" rx="23" ry="13" fill="none" stroke="#c2410c" stroke-width="2.2" stroke-dasharray="5 4"/>' +
        '<text x="42" y="20" font-size="12" font-weight="700" fill="#c2410c">先数一圈 5 颗</text>';
      return jar + beans + group;
    })()
  });

  defCard("turtle-geometry", {
    title: "海龟几何插图",
    desc: "一只小海龟沿着方形路径爬行，走过的边是实线，没走的是虚线，拐角上标着 90 度。",
    bg: cardSky("#eafaf1", "#cdeedd"),
    art: (function () {
      var grid = '<g stroke="#a9d9c1" stroke-width="1">';
      for (var i = 1; i < 8; i++) grid += '<path d="M' + (i * 20) + ' 0 L' + (i * 20) + ' 110"/>';
      for (var j = 1; j < 6; j++) grid += '<path d="M0 ' + (j * 20) + ' L160 ' + (j * 20) + '"/>';
      grid += "</g>";
      return grid +
        '<path d="M44 84 L44 30 L116 30" fill="none" stroke="#1a8f66" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M116 30 L116 84 L44 84" fill="none" stroke="#1a8f66" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/>' +
        '<path d="M44 44 A14 14 0 0 1 58 30" fill="none" stroke="#c2410c" stroke-width="2.2"/>' +
        '<text x="49" y="26" font-size="11" font-weight="700" fill="#c2410c">90°</text>' +
        '<g><ellipse cx="112" cy="16" rx="7" ry="5.5" fill="#37c98f"/>' +
        '<ellipse cx="116" cy="30" rx="15" ry="12" fill="#1a8f66"/>' +
        '<circle cx="116" cy="30" r="6.5" fill="none" stroke="#0f6c4c" stroke-width="1.6"/>' +
        '<ellipse cx="131" cy="27" rx="6.5" ry="5" fill="#37c98f"/>' +
        '<circle cx="133" cy="25.6" r="1.6" fill="#0b2b20"/>' +
        '<path d="M102 34 Q96 32 97 27" fill="none" stroke="#37c98f" stroke-width="3" stroke-linecap="round"/></g>' +
        '<text x="34" y="102" font-size="12" font-weight="700" fill="#0f6c4c">前进 · 右转 · 重复</text>';
    })()
  });

  defCard("doodle-pad", {
    title: "彩虹小画室插图",
    desc: "一张画纸上有三道不同颜色的笔触，旁边摆着一排颜料点和一支画笔。",
    bg: cardSky("#fff7ec", "#ffe8cf"),
    art:
      '<rect x="20" y="12" width="120" height="70" rx="8" fill="#fffdf7" stroke="#d68a00" stroke-width="2.4"/>' +
      '<path d="M32 66 C44 38 60 38 70 56 C80 74 96 72 108 48" fill="none" stroke="#1f6fd0" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M38 34 C56 24 78 26 96 32" fill="none" stroke="#d81b73" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M104 66 C114 58 122 60 128 68" fill="none" stroke="#0f8a4d" stroke-width="5" stroke-linecap="round"/>' +
      '<g><circle cx="34" cy="94" r="6.4" fill="#e11d48"/><circle cx="52" cy="94" r="6.4" fill="#f59e0b"/>' +
      '<circle cx="70" cy="94" r="6.4" fill="#16a34a"/><circle cx="88" cy="94" r="6.4" fill="#2563eb"/>' +
      '<circle cx="106" cy="94" r="6.4" fill="#7c3aed"/></g>' +
      '<g transform="rotate(26 128 88)"><rect x="124" y="70" width="8" height="24" rx="3" fill="#8a5a2b"/>' +
      '<path d="M124 94 L132 94 L128 104Z" fill="#d81b73"/></g>'
  });

  defCard("gravity-drop", {
    title: "自由落体插图",
    desc: "抽掉空气的玻璃管里，锤子和羽毛并排下落，三条虚线说明同一时刻它们始终在同一高度。",
    bg: cardSky("#e9edfb", "#ccd6f4"),
    art: (function () {
      /* 三个时刻的位置：每一刻锤子和羽毛的中心都压在同一条虚线上（一起落），
         而相邻两条虚线的间距按 3 : 5 拉开，也就是落的距离正比于时间的平方。
         两个形状原先各自从传入的 y 开始画，锤子重心偏上、羽毛偏下，
         明明该齐平的两样东西差了小十个像素，这张卡最要紧的一句话就废了。
         所以改成传中心高度，两边各自从中心往外排。 */
      var HALF = 12.5;                       // 两个形状都做成 25 高，中心在正中
      function hammer(cy, op) {
        var y = cy - HALF;
        return '<g opacity="' + op + '"><rect x="47" y="' + y + '" width="18" height="8" rx="2.4" fill="#6b7280"/>' +
          '<rect x="53.5" y="' + (y + 6) + '" width="5" height="19" rx="2" fill="#a2703c"/></g>';
      }
      function feather(cy, op) {
        var y = cy - HALF;
        var out = '<g opacity="' + op + '"><path d="M105 ' + y + " C96 " + (y + 12) + " 99 " + (y + 21) +
          " 105 " + (y + 25) + " C112 " + (y + 19) + " 114 " + (y + 9) + " 105 " + y +
          'Z" fill="#f2f6fd" stroke="#7b8bb8" stroke-width="1.6"/>' +
          '<path d="M105 ' + (y + 3) + " L105 " + (y + 23) + '" stroke="#7b8bb8" stroke-width="1.3"/>';
        // 几根羽枝：没有它们这个轮廓更像一片叶子
        for (var b = 0; b < 3; b++) {
          var by = y + 8 + b * 5;
          out += '<path d="M105 ' + by + " L100.5 " + (by + 3.4) + " M105 " + by + " L109.5 " + (by + 3.4) +
            '" stroke="#7b8bb8" stroke-width="1"/>';
        }
        return out + "</g>";
      }
      var levels = [35, 54.5, 87];           // 中心高度：间距 19.5 : 32.5 = 3 : 5
      var out = '<text x="34" y="17" font-size="12" font-weight="700" fill="#c2410c">抽掉空气以后</text>' +
        '<rect x="34" y="22" width="90" height="78" rx="8" fill="#dbe6fb" opacity=".75" stroke="#7b8bb8" stroke-width="2.4"/>';
      out += '<g stroke="#c2410c" stroke-width="1.5" stroke-dasharray="5 4">';
      for (var i = 0; i < levels.length; i++) {
        out += '<path d="M37 ' + levels[i] + " L121 " + levels[i] + '"/>';
      }
      // 第几秒的标号挪到管子外面：压在管壁上时和玻璃边框糊成一团
      out += "</g>" + '<g fill="#c2410c" font-size="10" font-weight="700" text-anchor="middle">';
      for (var j = 0; j < levels.length; j++) {
        out += '<text x="133" y="' + (levels[j] + 3.5) + '">' + (j + 1) + "</text>";
      }
      out += "</g>";
      var ops = [".32", ".58", "1"];
      for (var k = 0; k < levels.length; k++) {
        out += hammer(levels[k], ops[k]) + feather(levels[k], ops[k]);
      }
      return out;
    })()
  });

  defCard("ramp-and-roll", {
    title: "斜坡滚球插图",
    desc: "小球从斜坡顶端滚下，坡脚标着 27 度，地面刻度标出第 1 到第 4 秒的位置，间隔一格比一格宽，说明球越滚越快。",
    bg: cardSky("#f2eeff", "#ddd4fa"),
    art: (function () {
      var out = '<path d="M22 78 L126 78 L22 26Z" fill="#a08bea" opacity=".45" stroke="#6b4fd0" stroke-width="2.6" stroke-linejoin="round"/>';
      out += '<path d="M22 78 L140 78" stroke="#4b3a86" stroke-width="2.6"/>';
      /* 坡度角在坡脚，也就是斜边和地面相交的那个顶点（126,78）；左下角是直角。
         弧从地面上的 (100,78) 起，逆着地面转到斜边上，正好把这个锐角圈出来。
         斜边从 (126,78) 指向 (22,26)，斜率 52/104，反正切 26.6°，就是标的 27°。 */
      out += '<path d="M100 78 A26 26 0 0 1 102.7 66.4" fill="none" stroke="#c2410c" stroke-width="2"/>';
      out += '<text x="97" y="76" text-anchor="end" font-size="10" font-weight="700" fill="#c2410c">27°</text>';
      /* 虚线是球心走过的路：坡面上的点沿法线抬高一个球半径（8.5×(0.447,−0.894)
         ≈ 右 3.8、上 7.6），不能直接拿坡面上的点当球心，那样球是埋在坡里的。 */
      out += '<g fill="none" stroke="#6b4fd0" stroke-width="2" stroke-dasharray="4 4"><path d="M39.8 25.4 L107.8 59.4"/></g>';
      /* 刻度间距越来越大 = 每秒走得越来越远，也就是在加速。 */
      var xs = [36, 52, 76, 108];
      for (var i = 0; i < xs.length; i++) {
        out += '<path d="M' + xs[i] + ' 78 L' + xs[i] + ' 86" stroke="#4b3a86" stroke-width="2"/>';
      }
      // 数字压在各自的刻度线正上方，左对齐时会整体偏到刻度左边去
      out += '<g font-size="11" font-weight="700" fill="#4b3a86" text-anchor="middle">';
      for (var n = 0; n < xs.length; n++) {
        out += '<text x="' + xs[n] + '" y="99">' + (n + 1) + "</text>";
      }
      out += '</g><text x="122" y="99" font-size="11" font-weight="700" fill="#4b3a86">秒</text>';
      // 两个球都坐在坡面上，球心按法线抬高一个半径，见上面那条虚线的说明
      out += '<circle cx="107.8" cy="59.4" r="8.5" fill="#4d86d6" opacity=".35"/>';
      out += '<circle cx="39.8" cy="25.4" r="8.5" fill="#4d86d6" stroke="#1e3f80" stroke-width="2"/>' +
        '<circle cx="36.8" cy="22.4" r="2.6" fill="#ffffff" opacity=".7"/>';
      return out;
    })()
  });

  defCard("light-and-shadow", {
    title: "光与影插图",
    desc: "台灯照向一根小柱子，两条光线分别擦过柱顶和柱脚，正好圈出地上那块影子的两端。",
    bg: cardSky("#fff8e4", "#ffe9b8"),
    /* 这张图的几何是真的：灯泡在 (46,26)，柱子占 x 88–94、顶端 y=58、脚落在地面 y=82。
       从灯泡穿过柱顶远角 (94,58) 的那条光线，延长下去正好在 (130,82) 落地——
       影子就从柱脚 94 铺到 130，一格不多。原先灯泡比柱顶还低，按那个位置光线
       只会往上跑、影子该爬到墙上去，地上那块影子是凭空画的。 */
    art:
      // 被照亮的那片光锥，先铺底
      '<path d="M46 26 L154 44 L154 82 L66 82Z" fill="#ffd24a" opacity=".45"/>' +
      '<path d="M0 82 L160 82" stroke="#b98a2e" stroke-width="2.4"/>' +
      // 影子：柱脚到落地点，上界就是擦过柱顶的那条光线
      '<path d="M94 82 L130 82 L94 58Z" fill="#6b5a33" opacity=".5"/>' +
      '<g stroke="#c98a3e" stroke-width="1.5" stroke-dasharray="4 4">' +
      '<path d="M46 26 L130 82"/><path d="M46 26 L94 82"/>' +
      "</g>" +
      '<rect x="88" y="58" width="6" height="24" rx="2" fill="#5b6b95"/>' +
      '<text x="91" y="52" text-anchor="middle" font-size="9" font-weight="700" fill="#8a5a10">挡光的</text>' +
      '<path d="M30 82 L30 34" stroke="#6b7280" stroke-width="3.4"/>' +
      '<path d="M22 82 L38 82" stroke="#6b7280" stroke-width="3.4" stroke-linecap="round"/>' +
      '<path d="M30 34 Q30 18 46 16 L54 32 Q40 38 30 34Z" fill="#ffc233" stroke="#b98a2e" stroke-width="2"/>' +
      '<circle cx="46" cy="26" r="4" fill="#fff6cf"/>' +
      '<text x="20" y="98" font-size="12" font-weight="700" fill="#8a5a10">灯</text>' +
      '<text x="100" y="98" font-size="12" font-weight="700" fill="#8a5a10">影子</text>'
  });

  defCard("wave-maker", {
    title: "造波机插图",
    desc: "一条蓝色的波浪，双箭头分别标出一个波长和振幅，下面还有一条更密的浅色波做对比。",
    bg: cardSky("#e8f6ff", "#c8e6fb"),
    art:
      '<path d="M12 50 L148 50" stroke="#5b7fae" stroke-width="1.4" stroke-dasharray="4 4"/>' +
      '<path d="M12 50 C24 18 40 18 52 50 C64 82 80 82 92 50 C104 18 120 18 132 50" fill="none" stroke="#1f6fd0" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M12 88 C20 76 28 76 36 88 C44 100 52 100 60 88 C68 76 76 76 84 88 C92 100 100 100 108 88 C116 76 124 76 132 88" fill="none" stroke="#7ec8f0" stroke-width="3" stroke-linecap="round"/>' +
      '<g stroke="#c2410c" stroke-width="2">' +
      '<path d="M32 22 L32 12"/><path d="M112 22 L112 12"/><path d="M32 17 L112 17"/>' +
      '<path d="M32 17 L38 13 M32 17 L38 21 M112 17 L106 13 M112 17 L106 21"/>' +
      "</g>" +
      '<text x="52" y="10" font-size="11" font-weight="700" fill="#c2410c">一个波长</text>' +
      '<g stroke="#0f8a4d" stroke-width="2">' +
      '<path d="M142 22 L142 50"/><path d="M142 22 L138 28 M142 22 L146 28 M142 50 L138 44 M142 50 L146 44"/>' +
      "</g>" +
      '<text x="112" y="62" font-size="11" font-weight="700" fill="#0f8a4d">振幅</text>'
  });

  /* ---------------- 自然专题卡 ---------------- */

  defCard("nature-dinosaurs", {
    title: "恐龙与化石插图",
    desc: "一只霸王龙站在长着蕨类的地面上，脚下的岩层里埋着一具白色的骨骼化石，远处有火山。",
    bg: cardSky("#ffe7c4", "#ffd39a") +
      '<path d="M0 62 L26 34 L44 50 L60 30 L84 62Z" fill="#c98a63" opacity=".55"/>' +
      cardGround("#9fbe74", 64),
    art: (function () {
      /* 地层：从上到下三层沉积岩，化石埋在中间那层，说明「越深越老」。 */
      var strata = '<path d="M0 78 L160 74 L160 110 L0 110Z" fill="#c9a878"/>' +
        '<path d="M0 90 L160 86 L160 110 L0 110Z" fill="#ab8a5e"/>' +
        '<path d="M0 100 L160 97 L160 110 L0 110Z" fill="#8d7049"/>' +
        '<g stroke="#f4ead8" stroke-width="2.6" stroke-linecap="round" fill="none">' +
        '<path d="M96 92 L128 90"/><path d="M100 92 L98 98"/><path d="M108 91 L107 98"/>' +
        '<path d="M116 91 L116 98"/><path d="M124 90 L126 97"/>' +
        "</g>" +
        '<circle cx="132" cy="89" r="4" fill="#f4ead8"/>';
      /* 霸王龙用双足直立的姿态：粗后腿承重、长尾巴在身后配平、前肢很短。 */
      var rex =
        '<path d="M96 44 C104 36 118 34 128 40 C136 45 134 55 126 57 L112 57 C104 56 98 51 96 44Z" fill="#3f8f4e"/>' +
        '<path d="M112 52 C118 55 126 55 132 53 L132 56 C124 58 116 57 112 56Z" fill="#f4ead8"/>' +
        '<circle cx="120" cy="43" r="2.2" fill="#0d2a15"/>' +
        '<path d="M60 40 C74 34 90 36 100 46 C104 52 100 60 92 62 C80 64 68 60 60 52Z" fill="#3f8f4e"/>' +
        '<path d="M62 46 C46 50 30 58 18 70 L24 74 C36 64 50 58 64 56Z" fill="#347a42"/>' +
        '<path d="M92 60 L86 68 L80 66" fill="none" stroke="#2c6636" stroke-width="2.6" stroke-linecap="round"/>' +
        '<path d="M82 60 C84 70 82 78 76 84 L70 82 C74 76 76 68 74 60Z" fill="#2c6636"/>' +
        '<path d="M76 84 L64 86" stroke="#2c6636" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M70 58 C74 68 74 76 70 82 L64 80 C66 74 66 66 64 58Z" fill="#3f8f4e"/>' +
        '<path d="M70 82 L58 84" stroke="#3f8f4e" stroke-width="4" stroke-linecap="round"/>';
      var fern = '<g stroke="#2f6b3c" stroke-width="2.4" fill="none" stroke-linecap="round">' +
        '<path d="M28 76 C24 66 26 58 32 52"/><path d="M28 68 L22 64 M29 62 L23 58 M31 56 L26 52"/>' +
        '<path d="M28 68 L34 64 M29 62 L35 58 M31 56 L36 52"/>' +
        "</g>";
      return strata + fern + rex;
    })()
  });

  defCard("nature-space", {
    title: "太空站插图",
    desc: "星空里从左到右排着太阳、地球和月亮、带光环的土星，一枚小火箭正飞过。",
    bg: '<rect width="160" height="110" fill="#141a3a"/>' +
      '<g fill="#ffffff">' +
      '<circle cx="18" cy="18" r="1.3"/><circle cx="52" cy="12" r="1"/><circle cx="88" cy="20" r="1.4"/>' +
      '<circle cx="126" cy="14" r="1"/><circle cx="150" cy="34" r="1.2"/><circle cx="12" cy="60" r="1"/>' +
      '<circle cx="70" cy="96" r="1.2"/><circle cx="104" cy="102" r="1"/><circle cx="142" cy="88" r="1.3"/>' +
      "</g>",
    art:
      '<defs><radialGradient id="sun{{U}}"><stop offset="0" stop-color="#fff3c4"/><stop offset="1" stop-color="#f59e0b"/></radialGradient>' +
      '<clipPath id="terra{{U}}"><circle cx="74" cy="54" r="17"/></clipPath></defs>' +
      '<circle cx="16" cy="56" r="24" fill="url(#sun{{U}})"/>' +
      '<circle cx="74" cy="54" r="17" fill="#2b6fc0"/>' +
      '<g clip-path="url(#terra{{U}})" fill="#4aa96c">' +
      '<path d="M60 44 C66 40 74 42 76 48 C70 54 62 52 60 44Z"/>' +
      '<path d="M72 62 C78 56 88 58 90 66 C84 72 74 70 72 62Z"/>' +
      "</g>" +
      '<circle cx="74" cy="54" r="17" fill="none" stroke="#9ed0f5" stroke-width="1.6" opacity=".8"/>' +
      '<circle cx="100" cy="34" r="5.5" fill="#cfd6e6"/>' +
      '<circle cx="98" cy="32.5" r="1.6" fill="#a7b1c6"/><circle cx="102" cy="36" r="1.2" fill="#a7b1c6"/>' +
      '<path d="M74 54 m-26 0 a26 26 0 0 1 26 -26" fill="none" stroke="#7f8bb0" stroke-width="1.2" stroke-dasharray="3 4"/>' +
      '<g transform="rotate(-18 130 62)">' +
      '<ellipse cx="130" cy="62" rx="15" ry="14" fill="#e0b167"/>' +
      '<ellipse cx="130" cy="62" rx="27" ry="7" fill="none" stroke="#f3d9a4" stroke-width="4"/>' +
      "</g>" +
      '<g transform="rotate(28 54 84)">' +
      '<path d="M48 84 L60 84 L66 90 L60 96 L48 96Z" fill="#e6ecf6"/>' +
      '<path d="M48 84 L42 78 L42 102 L48 96Z" fill="#d1495b"/>' +
      '<circle cx="57" cy="90" r="3" fill="#4d86d6"/>' +
      "</g>"
  });

  defCard("nature-ocean", {
    title: "海底世界插图",
    desc: "海水从上到下分成三层：阳光层有小鱼，中层游着一头鲸，漆黑的深层里鮟鱇鱼提着会发光的小灯。",
    bg: '<rect width="160" height="110" fill="#63c1e8"/>' +
      '<rect y="38" width="160" height="34" fill="#2a7fb8"/>' +
      '<rect y="72" width="160" height="38" fill="#0d2f52"/>' +
      '<g fill="#ffffff" opacity=".16"><path d="M20 0 L36 0 L14 38 L0 38Z"/><path d="M78 0 L88 0 L66 38 L56 38Z"/><path d="M130 0 L148 0 L122 38 L106 38Z"/></g>',
    art:
      '<g fill="#ffd24a"><path d="M26 20 C32 14 42 14 48 20 C42 26 32 26 26 20Z"/><path d="M26 20 L20 15 L20 25Z"/></g>' +
      '<g fill="#ff9147"><path d="M108 16 C114 11 122 11 128 16 C122 21 114 21 108 16Z"/><path d="M108 16 L103 12 L103 20Z"/></g>' +
      '<path d="M22 56 C28 44 52 40 78 44 C96 47 110 52 120 58 C110 64 96 68 78 70 C52 73 28 68 22 56Z" fill="#123c66"/>' +
      '<path d="M120 58 C128 52 136 46 141 42 C136 52 136 64 141 74 C136 70 128 64 120 58Z" fill="#0e3157"/>' +
      '<path d="M78 44 L88 34 L92 46Z" fill="#0e3157"/>' +
      '<circle cx="34" cy="54" r="1.8" fill="#e6f4ff"/>' +
      '<g stroke="#1a4e7d" stroke-width="1.4" fill="none"><path d="M34 62 L70 66"/><path d="M36 66 L70 69"/></g>' +
      '<g><ellipse cx="96" cy="92" rx="17" ry="13" fill="#12283f"/>' +
      '<path d="M79 92 L86 84 L86 100Z" fill="#0b1d2e"/>' +
      '<path d="M96 79 C92 72 96 68 100 66" fill="none" stroke="#12283f" stroke-width="2.4"/>' +
      '<circle cx="100" cy="64" r="4.6" fill="#ffe58a"/>' +
      '<circle cx="100" cy="64" r="9" fill="#ffe58a" opacity=".28"/>' +
      '<path d="M84 92 L92 88 L92 96Z" fill="#fdf6e3"/>' +
      '<circle cx="102" cy="88" r="1.8" fill="#fdf6e3"/></g>' +
      '<text x="24" y="20" font-size="11" font-weight="700" fill="#0d3a5c">阳光层</text>' +
      '<text x="24" y="100" font-size="11" font-weight="700" fill="#9fc6e2">深海</text>'
  });

  defCard("nature-insects", {
    title: "虫子放大镜插图",
    desc: "放大镜下的一朵花上停着蜜蜂，六条腿和两对翅膀都数得清，旁边还有一只瓢虫。",
    bg: cardSky("#f0f9df", "#d6edb6") + cardGround("#a8ce7a", 82),
    art:
      '<g stroke="#4f8f3a" stroke-width="3" fill="none" stroke-linecap="round"><path d="M52 88 L52 58"/></g>' +
      '<g fill="#ff8fb0"><circle cx="44" cy="52" r="8"/><circle cx="60" cy="52" r="8"/><circle cx="52" cy="44" r="8"/><circle cx="52" cy="60" r="8"/></g>' +
      '<circle cx="52" cy="52" r="5.4" fill="#ffd24a"/>' +
      /* 描述承诺「六条腿和两对翅膀都数得清」：远侧的一对翅和三条腿画在身体后面、
         颜色略浅，近远各半——翅前后各两片共两对，腿一侧三条共六条。 */
      '<g><g fill="#cfe2f0" opacity=".85" stroke="#a3c2d8" stroke-width="1.2">' +
      '<ellipse cx="48" cy="30" rx="10" ry="5" transform="rotate(-52 48 30)"/>' +
      '<ellipse cx="63" cy="32" rx="8" ry="4.4" transform="rotate(14 63 32)"/>' +
      "</g>" +
      '<ellipse cx="52" cy="36" rx="11" ry="6" fill="#e4f0f8" opacity=".85" stroke="#b6d0e2" stroke-width="1.2" transform="rotate(-22 52 36)"/>' +
      '<ellipse cx="60" cy="36" rx="9" ry="5" fill="#e4f0f8" opacity=".85" stroke="#b6d0e2" stroke-width="1.2" transform="rotate(-6 60 36)"/>' +
      '<g stroke="#5c4a38" stroke-width="1.6" fill="none" stroke-linecap="round">' +
      '<path d="M50 47 L44 53"/><path d="M55 48 L51 55"/><path d="M61 47 L58 54"/></g>' +
      '<ellipse cx="58" cy="44" rx="10" ry="7" fill="#f0b429"/>' +
      '<rect x="53" y="37" width="3.4" height="14" fill="#33261a" transform="rotate(-8 55 44)"/>' +
      '<rect x="60" y="37" width="3.4" height="14" fill="#33261a" transform="rotate(-8 62 44)"/>' +
      '<circle cx="45" cy="42" r="4.6" fill="#33261a"/>' +
      '<g stroke="#33261a" stroke-width="1.6" fill="none" stroke-linecap="round">' +
      '<path d="M42 38 C38 33 36 31 33 30"/><path d="M46 37 C45 32 44 30 42 27"/>' +
      '<path d="M50 48 L47 54"/><path d="M56 49 L55 56"/><path d="M62 48 L64 55"/></g></g>' +
      '<circle cx="52" cy="48" r="34" fill="none" stroke="#7b6a4f" stroke-width="4"/>' +
      '<circle cx="52" cy="48" r="34" fill="#ffffff" opacity=".08"/>' +
      '<path d="M76 72 L96 94" stroke="#7b6a4f" stroke-width="8" stroke-linecap="round"/>' +
      '<g transform="translate(118 66)">' +
      '<ellipse cx="0" cy="0" rx="13" ry="11" fill="#d1495b"/>' +
      '<path d="M0 -11 L0 11" stroke="#2b1a10" stroke-width="1.8"/>' +
      '<g fill="#2b1a10"><circle cx="-6" cy="-4" r="2.2"/><circle cx="6" cy="-3" r="2.2"/><circle cx="-5" cy="5" r="2"/><circle cx="6" cy="5" r="2"/></g>' +
      '<ellipse cx="-13" cy="-4" rx="5" ry="4.4" fill="#2b1a10"/>' +
      "</g>"
  });

  defCard("nature-earth", {
    title: "地球与地震插图",
    desc: "切开的地球露出地壳、地幔、外核和内核四层，右边一条断层裂开，地震波一圈圈传出去。",
    bg: cardSky("#e8eefc", "#cfd9f2"),
    art:
      '<defs><clipPath id="half{{U}}"><rect x="0" y="0" width="98" height="110"/></clipPath></defs>' +
      '<g><circle cx="98" cy="56" r="34" fill="#3f7b46"/>' +
      '<g clip-path="url(#half{{U}})">' +
      '<circle cx="98" cy="56" r="34" fill="#8d6b45"/>' +
      '<circle cx="98" cy="56" r="28" fill="#d1603c"/>' +
      '<circle cx="98" cy="56" r="17" fill="#f0913a"/>' +
      '<circle cx="98" cy="56" r="8" fill="#ffe17a"/>' +
      "</g>" +
      '<circle cx="98" cy="56" r="34" fill="none" stroke="#2c4a6e" stroke-width="2"/>' +
      '<path d="M98 22 L98 90" stroke="#2c4a6e" stroke-width="1.6" stroke-dasharray="4 3"/>' +
      "</g>" +
      /* 四条引线沿同一条半径依次落在地壳、地幔、外核、内核四层上，
         终点到球心的距离分别取 31 / 22 / 12 / 4，正好落在各层色带的中间。 */
      '<g stroke="#2c4a6e" stroke-width="1.2" fill="none">' +
      '<path d="M67 56 L48 24"/><path d="M76 56 L48 44"/><path d="M86 56 L48 62"/><path d="M94 56 L48 80"/>' +
      "</g>" +
      '<g fill="#2c4a6e"><circle cx="67" cy="56" r="2"/><circle cx="76" cy="56" r="2"/><circle cx="86" cy="56" r="2"/><circle cx="94" cy="56" r="2"/></g>' +
      '<g font-size="11" font-weight="700" fill="#2c4a6e">' +
      '<text x="20" y="24">地壳</text><text x="20" y="46">地幔</text><text x="20" y="66">外核</text><text x="20" y="84">内核</text>' +
      "</g>" +
      '<g fill="none" stroke="#c2410c" stroke-width="2.2">' +
      '<path d="M118 34 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0"/>' +
      '<path d="M118 34 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0" opacity=".6"/>' +
      '<path d="M118 34 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0" opacity=".32"/>' +
      "</g>" +
      '<path d="M112 28 L118 36 L114 40 L122 46" fill="none" stroke="#7a1f0f" stroke-width="3" stroke-linecap="round"/>' +
      '<text x="46" y="102" font-size="11" font-weight="700" fill="#c2410c">震波一圈圈传开</text>'
  });

  defCard("nature-weather", {
    title: "天气工坊插图",
    desc: "水循环：太阳晒热海面，水汽上升变成云，云在山上下雨，雨水又流回海里。",
    bg: cardSky("#bfe4fa", "#e7f4fd"),
    art:
      '<circle cx="34" cy="26" r="13" fill="#ffc233"/>' +
      '<g stroke="#ffc233" stroke-width="2.6" stroke-linecap="round">' +
      '<path d="M34 8 L34 3"/><path d="M16 26 L11 26"/><path d="M20 12 L17 9"/><path d="M48 12 L51 9"/><path d="M20 40 L17 43"/>' +
      "</g>" +
      '<path d="M0 86 C24 80 46 92 70 86 C94 80 118 92 160 84 L160 110 L0 110Z" fill="#3f8fc4"/>' +
      '<path d="M118 88 L146 42 L160 66 L160 88Z" fill="#8a9a6d"/>' +
      '<path d="M146 42 L152 52 L140 52Z" fill="#f2f6f8"/>' +
      '<g fill="#f7fbfe" stroke="#a9c3d6" stroke-width="1.6">' +
      '<ellipse cx="82" cy="30" rx="24" ry="14"/><ellipse cx="62" cy="36" rx="16" ry="10"/><ellipse cx="104" cy="36" rx="15" ry="10"/>' +
      "</g>" +
      '<g fill="#4a9fd6"><path d="M70 50 L67 60 L73 58Z"/><path d="M84 52 L81 63 L87 61Z"/><path d="M98 50 L95 60 L101 58Z"/></g>' +
      '<g stroke="#2f7fb5" stroke-width="2.4" fill="none" stroke-linecap="round">' +
      '<path d="M52 80 C46 66 56 58 52 48"/><path d="M52 48 L48 54 M52 48 L57 53"/>' +
      "</g>" +
      '<text x="18" y="72" font-size="11" font-weight="700" fill="#1e5f8c">蒸发</text>' +
      '<text x="76" y="74" font-size="11" font-weight="700" fill="#1e5f8c">降水</text>' +
      '<g stroke="#2f7fb5" stroke-width="2.2" fill="none" stroke-linecap="round">' +
      '<path d="M132 74 C120 78 112 82 104 84"/><path d="M104 84 L110 82 M104 84 L110 87"/>' +
      "</g>"
  });

  defCard("nature-human-body", {
    title: "人体机器插图",
    desc: "胸腔里画着一颗心脏和左右两片肺，旁边一条心电图线在跳动。",
    bg: cardSky("#fff0f2", "#ffdde3"),
    art:
      '<path d="M56 16 C42 22 36 40 38 60 C40 78 48 92 60 98 L96 98 C108 92 116 78 118 60 C120 40 114 22 100 16Z" fill="#ffd9c9" opacity=".7"/>' +
      '<g fill="#bfe3f4" stroke="#6ea9c9" stroke-width="1.8">' +
      '<path d="M70 34 C58 36 50 48 50 62 C50 74 56 82 64 84 C70 80 72 66 72 52Z"/>' +
      '<path d="M86 34 C98 36 106 48 106 62 C106 74 100 82 92 84 C86 80 84 66 84 52Z"/>' +
      "</g>" +
      '<g stroke="#6ea9c9" stroke-width="1.4" fill="none">' +
      '<path d="M64 46 L58 52 M64 56 L56 62 M92 46 L98 52 M92 56 L100 62"/>' +
      "</g>" +
      '<path d="M78 30 L78 42 M78 34 L70 40 M78 34 L86 40" stroke="#c96a8a" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M78 76 C68 68 62 60 62 52 C62 45 68 41 74 44 C76 45 77 47 78 49 C79 47 80 45 82 44 C88 41 94 45 94 52 C94 60 88 68 78 76Z" fill="#e0455f"/>' +
      '<path d="M70 52 C74 56 78 58 84 56" fill="none" stroke="#ffb1bd" stroke-width="2" stroke-linecap="round"/>' +
      '<g stroke="#c02a52" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M18 96 L34 96 L39 86 L45 104 L50 96 L112 96 L117 86 L123 104 L128 96 L142 96"/>' +
      "</g>" +
      '<text x="104" y="26" font-size="12" font-weight="700" fill="#a51b42">心 · 肺</text>'
  });

  /* ================= 首页大入口 =================
     `portal/<slug>` 给孩子首页那四张大图卡用。和 `card/*` 不同，这四块图位又宽又扁，
     用 slice 会把主体裁掉大半，所以统一 `meet` + 透明底：卡片自己的底色就是背景，
     插画只负责主体，viewBox 固定 `0 0 120 90`。 */

  function defPortal(slug, spec) {
    def("portal/" + slug, {
      viewBox: "0 0 120 90", fit: "xMidYMid meet",
      title: spec.title, desc: spec.desc, bg: "", art: spec.art
    });
  }

  defPortal("continue", {
    title: "继续上次的探索",
    desc: "一枚小火箭沿着虚线轨迹往上飞，尾巴喷着火焰。",
    art:
      '<path d="M14 82 C30 74 40 58 46 42" fill="none" stroke="#9db6e8" stroke-width="4" stroke-dasharray="7 7" stroke-linecap="round"/>' +
      '<g transform="rotate(38 66 44)">' +
      '<path d="M66 16 C78 26 82 42 82 56 L50 56 C50 42 54 26 66 16Z" fill="#eef3fc" stroke="#5b7fae" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<circle cx="66" cy="38" r="8" fill="#6ea8fe" stroke="#2b56a8" stroke-width="2.6"/>' +
      '<path d="M50 50 L38 68 L50 64Z" fill="#d1495b"/><path d="M82 50 L94 68 L82 64Z" fill="#d1495b"/>' +
      '<path d="M50 56 L82 56 L78 66 L54 66Z" fill="#c9d6ea" stroke="#5b7fae" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<path d="M60 66 C60 78 64 84 66 88 C68 84 72 78 72 66Z" fill="#f6a623"/>' +
      '<path d="M63 68 C63 76 65 80 66 83 C67 80 69 76 69 68Z" fill="#f4d35e"/>' +
      "</g>" +
      '<g fill="#ffd24a"><circle cx="100" cy="20" r="3.4"/><circle cx="108" cy="36" r="2.2"/><circle cx="24" cy="26" r="2.6"/></g>'
  });

  defPortal("experiments", {
    title: "互动实验",
    desc: "一个冒着气泡的锥形瓶，旁边放着一把量尺和一个齿轮。",
    art:
      '<path d="M52 12 L74 12 L74 34 L92 74 C94 80 90 84 84 84 L42 84 C36 84 32 80 34 74 L52 34Z" fill="#e7f3fb" stroke="#3f6f96" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M42 58 L84 58 L90 74 C92 79 88 82 83 82 L43 82 C38 82 34 79 36 74Z" fill="#3ec9a7"/>' +
      '<g fill="#ffffff" opacity=".75"><circle cx="52" cy="70" r="4"/><circle cx="66" cy="66" r="3"/><circle cx="76" cy="72" r="2.4"/></g>' +
      '<rect x="48" y="8" width="30" height="7" rx="3.5" fill="#9fb4c9"/>' +
      '<g fill="#3ec9a7"><circle cx="84" cy="30" r="4"/><circle cx="94" cy="44" r="3"/><circle cx="88" cy="16" r="2.4"/></g>' +
      '<g transform="rotate(-16 20 62)">' +
      '<rect x="6" y="52" width="28" height="30" rx="4" fill="#f6c445" stroke="#b98a2e" stroke-width="2.4"/>' +
      '<g stroke="#b98a2e" stroke-width="2"><path d="M12 52 L12 60"/><path d="M20 52 L20 64"/><path d="M28 52 L28 60"/></g>' +
      "</g>" +
      /* 描述里点名的那个齿轮：放在瓶子右下角，配卫星/深潜器同款金属灰。 */
      gearShape(104, 70, 9, 8, "#c9d3de", "#5a6b84")
  });

  defPortal("nature", {
    title: "去自然里看看",
    desc: "一片带叶脉的绿叶上停着一只瓢虫，旁边冒出一株小苗。",
    art:
      '<path d="M20 76 C20 42 46 18 84 16 C88 52 66 78 32 80Z" fill="#5aa64f"/>' +
      '<path d="M20 76 C40 58 62 40 84 16" fill="none" stroke="#eaf6dc" stroke-width="3" stroke-linecap="round"/>' +
      '<g stroke="#eaf6dc" stroke-width="2.2" fill="none" stroke-linecap="round">' +
      '<path d="M38 60 C42 52 44 44 44 36"/><path d="M52 48 C56 42 58 34 58 26"/><path d="M30 68 C32 62 32 56 30 50"/>' +
      "</g>" +
      '<path d="M14 84 C14 70 18 60 26 54" fill="none" stroke="#3f7b46" stroke-width="4" stroke-linecap="round"/>' +
      '<g transform="translate(84 58)">' +
      '<ellipse cx="0" cy="0" rx="15" ry="13" fill="#d1495b"/>' +
      '<path d="M0 -13 L0 13" stroke="#2b1a10" stroke-width="2"/>' +
      '<g fill="#2b1a10"><circle cx="-7" cy="-5" r="2.6"/><circle cx="7" cy="-4" r="2.6"/><circle cx="-6" cy="6" r="2.4"/><circle cx="7" cy="6" r="2.4"/></g>' +
      '<ellipse cx="-15" cy="-5" rx="6" ry="5" fill="#2b1a10"/>' +
      '<g stroke="#2b1a10" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M-19 -10 L-24 -15"/><path d="M-16 -11 L-18 -18"/></g>' +
      "</g>"
  });

  defPortal("album", {
    title: "我的卡册",
    desc: "三张叠在一起的收集卡，最上面那张画着一只小章鱼和一颗星星。",
    art:
      '<g transform="rotate(-12 40 50)"><rect x="18" y="20" width="46" height="62" rx="7" fill="#fdf1f6" stroke="#c2477e" stroke-width="2.6"/></g>' +
      '<g transform="rotate(-4 52 48)"><rect x="30" y="16" width="46" height="62" rx="7" fill="#fef6fa" stroke="#c2477e" stroke-width="2.6"/></g>' +
      '<rect x="42" y="12" width="50" height="66" rx="8" fill="#ffffff" stroke="#c2477e" stroke-width="3"/>' +
      '<g transform="translate(67 44)">' +
      '<ellipse cx="0" cy="-6" rx="15" ry="14" fill="#a06ce0"/>' +
      '<g fill="#2b1a10"><circle cx="-5" cy="-8" r="2.6"/><circle cx="5" cy="-8" r="2.6"/></g>' +
      '<path d="M-4 -1 Q0 3 4 -1" fill="none" stroke="#2b1a10" stroke-width="1.8" stroke-linecap="round"/>' +
      '<g stroke="#a06ce0" stroke-width="4" fill="none" stroke-linecap="round">' +
      '<path d="M-11 6 C-13 12 -14 16 -12 20"/><path d="M-4 8 C-5 14 -5 18 -3 22"/>' +
      '<path d="M4 8 C5 14 5 18 3 22"/><path d="M11 6 C13 12 14 16 12 20"/>' +
      "</g></g>" +
      '<path d="M84 20 L86 26 L92 26 L87 30 L89 36 L84 32 L79 36 L81 30 L76 26 L82 26Z" fill="#f6c445"/>' +
      '<path d="M50 66 L52 71 L57 71 L53 74 L55 79 L50 76 L45 79 L47 74 L43 71 L48 71Z" fill="#f6c445"/>'
  });

  /* ================= 装置插图 =================
     不是「一张卡片」而是页面主体里的一台机器/仪器，所以不套 CARD_BOX 的规格：
     viewBox 按装置自身比例写，fit 用 meet（宁可留白也不能把机器裁一半）。 */

  /** 齿轮：外圈按 teeth 均分出方齿，中间是轴孔。半径 r 指齿根圆。 */
  function gearShape(cx, cy, r, teeth, fill, stroke) {
    var tw = r * 0.34, th = r * 0.48;
    var out = '<g fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.1" stroke-linejoin="round">';
    for (var i = 0; i < teeth; i++) {
      out += '<rect x="' + (cx - tw / 2).toFixed(1) + '" y="' + (cy - r - th * 0.5).toFixed(1) +
        '" width="' + tw.toFixed(1) + '" height="' + (th * 1.1).toFixed(1) +
        '" rx="' + (tw * 0.28).toFixed(1) + '" transform="rotate(' +
        ((360 / teeth) * i).toFixed(1) + " " + cx + " " + cy + ')"/>';
    }
    return out + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r.toFixed(1) + '"/></g>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.3).toFixed(1) + '" fill="' + stroke + '"/>';
  }

  /* 规律机器：数字从上面的漏斗掉进去，机身里的齿轮按藏起来的规则算一遍，
     再从下面的出料口送出来。窗口里的问号就是这一页要孩子破解的东西。
     颜色写死成中调金属色，浅色的孩子模式和深色的家长模式下都站得住。 */
  def("machine/function-box", {
    viewBox: "0 0 120 106",
    fit: "xMidYMid meet",
    title: "神秘规则机器",
    desc: "一台铁皮机器：顶上的漏斗接住喂进去的数字，机身窗口里是一个问号和两枚咬合的齿轮，底部的出料口把算好的数字送出来。",
    art:
      // 漏斗：进料口
      '<path d="M22 5 L98 5 L76 26 L44 26Z" fill="#8b97b8" stroke="#333c5c" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<path d="M22 5 L98 5 L92 11 L28 11Z" fill="#a9b4d1"/>' +
      '<rect x="48" y="24" width="24" height="8" fill="#6d7897" stroke="#333c5c" stroke-width="2"/>' +
      // 机身
      '<rect x="8" y="30" width="104" height="54" rx="11" fill="#4c5779" stroke="#333c5c" stroke-width="2.4"/>' +
      '<rect x="12" y="34" width="96" height="15" rx="7" fill="#5f6c8e"/>' +
      // 观察窗与问号
      '<rect x="18" y="42" width="44" height="34" rx="8" fill="#141c33" stroke="#333c5c" stroke-width="2"/>' +
      '<text x="40" y="68" text-anchor="middle" font-size="27" font-weight="800" fill="#f6bd48">?</text>' +
      // 咬合的两枚齿轮：大的带小的，说明「一步接一步地算」
      gearShape(84, 54, 13, 9, "#f0a13a", "#8a5410") +
      gearShape(98, 72, 8, 8, "#7ec8f0", "#1d5878") +
      // 指示灯
      '<g stroke="#333c5c" stroke-width="1.1">' +
      '<circle cx="70" cy="80" r="3" fill="#4ade80"/>' +
      '<circle cx="80" cy="80" r="3" fill="#fbbf24"/>' +
      '<circle cx="90" cy="80" r="3" fill="#f87171"/>' +
      "</g>" +
      // 铆钉
      '<g fill="#8b97b8">' +
      '<circle cx="15" cy="37" r="1.8"/><circle cx="15" cy="77" r="1.8"/>' +
      '<circle cx="105" cy="37" r="1.8"/><circle cx="105" cy="77" r="1.8"/>' +
      "</g>" +
      // 出料口
      '<path d="M44 82 L76 82 L69 101 L51 101Z" fill="#6d7897" stroke="#333c5c" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<path d="M51 101 L69 101 L67 105 L53 105Z" fill="#333c5c"/>'
  });

  /* ================= 学习路径的年龄横幅 =================
     `route/<slug>` 是学习路径页四张年龄卡的图位：一张 96×56 的横幅，
     画的是这个阶段「在做什么样的数学」，而不是一个抽象图标。
     颜色写死，因为这一页自己覆盖了一套浅色变量。 */

  function defRoute(slug, spec) {
    def("route/" + slug, {
      viewBox: "0 0 96 56",
      fit: "xMidYMid meet",
      title: spec.title,
      desc: spec.desc,
      art: spec.art
    });
  }

  defRoute("count", {
    title: "玩数量",
    desc: "三块积木摞成一列，旁边是三颗一一对应的圆点和数字 1、2、3。",
    art:
      '<g stroke="#2f5a4d" stroke-width="1.6" stroke-linejoin="round">' +
      '<rect x="10" y="34" width="18" height="14" rx="3" fill="#7fb0ef"/>' +
      '<rect x="10" y="21" width="18" height="14" rx="3" fill="#9ec8f5"/>' +
      '<rect x="10" y="8" width="18" height="14" rx="3" fill="#c6e0fb"/>' +
      "</g>" +
      '<g fill="#e08a3c">' +
      '<circle cx="44" cy="15" r="5"/><circle cx="44" cy="28" r="5"/><circle cx="44" cy="41" r="5"/>' +
      "</g>" +
      '<g fill="#2f5a4d" font-size="12" font-weight="800" font-family="monospace">' +
      '<text x="58" y="19">1</text><text x="58" y="32">2</text><text x="58" y="45">3</text>' +
      "</g>" +
      '<g stroke="#8aa79d" stroke-width="1.2" stroke-dasharray="2 2">' +
      '<path d="M28 15 L39 15"/><path d="M28 28 L39 28"/><path d="M28 41 L39 41"/>' +
      "</g>"
  });

  defRoute("relate", {
    title: "画关系",
    desc: "一条长条被分成两段，两段各标着一个数，下方的大括号标出合起来的总数。",
    art:
      '<rect x="8" y="12" width="46" height="17" rx="4" fill="#69b394" stroke="#2f5a4d" stroke-width="1.6"/>' +
      '<rect x="54" y="12" width="30" height="17" rx="4" fill="#f0c268" stroke="#2f5a4d" stroke-width="1.6"/>' +
      '<text x="28" y="25" text-anchor="middle" font-size="11" font-weight="800" fill="#12332a" font-family="monospace">6</text>' +
      '<text x="69" y="25" text-anchor="middle" font-size="11" font-weight="800" fill="#4a3208" font-family="monospace">4</text>' +
      '<path d="M8 34 L8 39 L44 39 L44 43 L48 39 L84 39 L84 34" fill="none" stroke="#2f5a4d" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<text x="46" y="54" text-anchor="middle" font-size="11" font-weight="800" fill="#2f5a4d" font-family="monospace">10</text>'
  });

  defRoute("solve", {
    title: "找办法",
    desc: "一张小迷宫，虚线从左下角的起点绕过墙壁，一路走到右上角的星星。",
    art:
      '<rect x="7" y="6" width="82" height="44" rx="5" fill="#f3f7f4" stroke="#2f5a4d" stroke-width="1.6"/>' +
      '<g stroke="#a4736f" stroke-width="3" stroke-linecap="round">' +
      '<path d="M24 6 L24 32"/><path d="M41 50 L41 22"/><path d="M58 6 L58 34"/><path d="M75 50 L75 24"/>' +
      "</g>" +
      '<path d="M15 44 L15 38 L32 38 L32 14 L49 14 L49 42 L66 42 L66 16 L82 16" fill="none" stroke="#377866" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round"/>' +
      '<circle cx="15" cy="44" r="3.4" fill="#377866"/>' +
      '<path d="M82 9 L84 14 L89 14 L85 17 L86 22 L82 19 L78 22 L79 17 L75 14 L80 14Z" fill="#e0a33c"/>'
  });

  defRoute("reason", {
    title: "讲理由",
    desc: "两张写着已知条件的卡片指向下方的结论，结论前面是数学里表示「所以」的三点符号。",
    art:
      '<g stroke="#2f5a4d" stroke-width="1.5">' +
      '<rect x="6" y="5" width="36" height="16" rx="4" fill="#dbe7fa"/>' +
      '<rect x="52" y="5" width="38" height="16" rx="4" fill="#dbe7fa"/>' +
      '<rect x="20" y="36" width="56" height="17" rx="4" fill="#cdeade"/>' +
      "</g>" +
      '<g fill="#2f5a4d" font-family="monospace" font-weight="800">' +
      '<text x="24" y="17" text-anchor="middle" font-size="10">已知</text>' +
      '<text x="71" y="17" text-anchor="middle" font-size="10">已知</text>' +
      '<text x="55" y="49" text-anchor="middle" font-size="10">结论</text>' +
      "</g>" +
      '<g stroke="#8aa79d" stroke-width="1.6" fill="none" stroke-linecap="round">' +
      '<path d="M30 21 L38 33"/><path d="M68 21 L58 33"/>' +
      "</g>" +
      '<g fill="#c2410c"><circle cx="31" cy="41" r="1.9"/><circle cx="27" cy="48" r="1.9"/><circle cx="35" cy="48" r="1.9"/></g>'
  });

  /* ================= 四位伙伴 =================
     妙妙 / 波波 / 果果 / 星星 在每一页的「伙伴提示」里露脸，原来是 🐱🐳🦊🐰 四个 emoji：
     同一个伙伴在安卓、iOS、Windows 上是三张完全不同的脸，缺字时还会退成方框。
     这里按 data/playful.js 里各自的角色画固定头像，规格与 guide/* 一致（64×64、meet、透明底），
     由 .playful-character 自己的圆底衬着。 */

  function defFriend(id, spec) {
    def("friend/" + id, {
      viewBox: "0 0 64 64", fit: "xMidYMid meet",
      title: spec.title, desc: spec.desc, bg: "", art: spec.art
    });
  }

  defFriend("miao", {
    title: "妙妙",
    desc: "一只粉色的小猫歪着头，耳朵尖尖，旁边浮着一个问号，因为它总是先提问。",
    art:
      '<path d="M13 30 L10 8 L28 17Z" fill="#f0a3c6"/><path d="M45 29 L52 9 L36 16Z" fill="#f0a3c6"/>' +
      '<path d="M15.5 26 L14 14 L23.5 18.5Z" fill="#fbd7e6"/><path d="M44 25.5 L48.5 14.5 L39 18Z" fill="#fbd7e6"/>' +
      '<path d="M30 14 C43 14 52 23 52 34 C52 46 43 55 30 55 C17 55 8 46 8 34 C8 23 17 14 30 14Z" fill="#f7b7d2"/>' +
      '<path d="M30 32 C39 32 45 38 45 45 C45 51 38 56 30 56 C22 56 15 51 15 45 C15 38 21 32 30 32Z" fill="#fff2f7"/>' +
      eyes(22, 38, 33, 3.4, "#4a1f36") +
      '<path d="M30 39 L27 42.5 L33 42.5Z" fill="#c2547f"/>' +
      '<path d="M30 42.5 L30 45 M30 45 C27.5 45 26 44 25 42.8 M30 45 C32.5 45 34 44 35 42.8" stroke="#c2547f" stroke-width="1.7" stroke-linecap="round" fill="none"/>' +
      '<g stroke="#e58bb2" stroke-width="1.4" stroke-linecap="round" opacity=".9">' +
      '<path d="M16 41 L6 39"/><path d="M16 45 L6 47"/><path d="M44 41 L54 39"/><path d="M44 45 L54 47"/></g>' +
      '<circle cx="53" cy="52" r="9" fill="#fff5fa" stroke="#d76ba0" stroke-width="2"/>' +
      '<path d="M50 49.5 A3.2 3.2 0 1 1 53 53.5 L53 55" fill="none" stroke="#c2547f" stroke-width="2.2" stroke-linecap="round"/>' +
      '<circle cx="53" cy="58" r="1.3" fill="#c2547f"/>'
  });

  /* 侧面的鲸：头钝、身体前粗后细，尾鳍向上翻成两片。
     画成竖直展开的一把扇子就成了一条鱼，所以波波和深海贴纸共用这一段轮廓。
     坐标写在 64×64 里，贴纸用 transform 放大后再上色。 */
  function whaleSide(main, deep, belly, ink) {
    return '<path d="M20 47 C22 53 26 57 31 58 C28 53 27 49 27 45Z" fill="' + deep + '"/>' +
      '<path d="M48 34 C54 30 58 22 58 14 C52 18 46 25 44 31Z" fill="' + deep + '"/>' +
      '<path d="M49 39 C55 39 60 37 63 33 C60 42 54 46 47 46Z" fill="' + deep + '"/>' +
      '<path d="M8 34 C8 22 20 15 33 16 C43 17 51 23 54 31 C56 36 55 42 51 46 C43 53 26 54 16 47 C11 43 8 39 8 34Z" fill="' + main + '"/>' +
      '<path d="M12 40 C22 49 42 50 52 43 C46 51 26 53 15 47 C13.5 45 12.5 42.5 12 40Z" fill="' + belly + '"/>' +
      '<circle cx="20" cy="31" r="3.4" fill="' + ink + '"/><circle cx="21.2" cy="29.8" r="1.1" fill="#ffffff"/>';
  }

  defFriend("bo", {
    title: "波波",
    desc: "一头青蓝色的小鲸鱼侧着身子，头顶喷出一小股水柱，正安静地看着水里的变化。",
    art:
      whaleSide("#57c2dc", "#3fa8c4", "#dff4fa", "#123a4a") +
      '<g stroke="#a7dcec" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".9">' +
      '<path d="M16 44 L18 49"/><path d="M23 47 L24 52"/><path d="M30 48 L31 53"/></g>' +
      '<path d="M14 37 C17 39 21 39 24 37" stroke="#1d6a83" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
      '<g stroke="#8fd7ea" stroke-width="2.6" stroke-linecap="round" fill="none">' +
      '<path d="M26 15 C24 10 22 7 20 5"/><path d="M28 14 C29 9 29 6 29 3"/><path d="M31 15 C34 11 36 8 38 6"/></g>'
  });

  defFriend("guo", {
    title: "果果",
    desc: "记录伙伴果果，一只橙色小狐狸叼着一支铅笔，随时把发现写下来。",
    art:
      FOX_FACE +
      '<g transform="rotate(-24 46 52)">' +
      '<rect x="38" y="49" width="24" height="6" rx="1.4" fill="#f2c14e" stroke="#a9761a" stroke-width="1.4"/>' +
      '<path d="M38 49 L32 52 L38 55Z" fill="#f6e0b8" stroke="#a9761a" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M34.4 50.8 L32 52 L34.4 53.2Z" fill="#3a2415"/>' +
      '<rect x="58" y="49" width="4" height="6" rx="1.2" fill="#e58bb2"/></g>'
  });

  defFriend("xing", {
    title: "星星",
    desc: "一只紫色的小兔子竖着长耳朵，额头旁边亮着一颗小星星，喜欢把道理讲清楚。",
    art:
      '<path d="M20 26 C16 18 15 10 18 5 C23 6 26 13 27 22Z" fill="#b79cf0"/>' +
      '<path d="M44 26 C48 18 49 10 46 5 C41 6 38 13 37 22Z" fill="#b79cf0"/>' +
      '<path d="M21 24 C18.5 18 18 12 19.5 9 C22 11 24 16 24.5 22Z" fill="#e6dcfb"/>' +
      '<path d="M43 24 C45.5 18 46 12 44.5 9 C42 11 40 16 39.5 22Z" fill="#e6dcfb"/>' +
      '<path d="M32 18 C44 18 53 26 53 36 C53 47 44 55 32 55 C20 55 11 47 11 36 C11 26 20 18 32 18Z" fill="#c4aef5"/>' +
      '<path d="M32 34 C40 34 46 39 46 45 C46 51 40 56 32 56 C24 56 18 51 18 45 C18 39 24 34 32 34Z" fill="#f7f3ff"/>' +
      eyes(24, 40, 35, 3.4, "#3b2a63") +
      '<path d="M32 41 C34.4 41 36 42.4 36 44 C36 46 34 47.2 32 47.2 C30 47.2 28 46 28 44 C28 42.4 29.6 41 32 41Z" fill="#8b5fd6"/>' +
      '<path d="M32 47.2 L32 50 M32 50 C29.6 50 28 49 27 47.8 M32 50 C34.4 50 36 49 37 47.8" stroke="#8b5fd6" stroke-width="1.7" stroke-linecap="round" fill="none"/>' +
      '<g fill="#e9a3c4" opacity=".7"><ellipse cx="19" cy="43" rx="4" ry="2.6"/><ellipse cx="45" cy="43" rx="4" ry="2.6"/></g>' +
      '<path d="M53 8 L55.4 15 L62.5 15 L56.8 19.4 L59 26.4 L53 22 L47 26.4 L49.2 19.4 L43.5 15 L50.6 15Z" fill="#f6c445"/>'
  });

  /* ================= 收藏卡贴纸 =================
     卡册里每张卡原来只有一个放大到 6.8rem 的 emoji：字体缺字会变成方框，
     同一张卡在不同系统上长相不同，放大后边缘也糊。这里给 18 张卡各画一枚贴纸。

     统一规格（新增时照做）：
     - viewBox 固定 `0 0 120 120`，fit 用 meet（图位是方的，主体不能被裁）；
     - 外圈波浪边、底色和虚线内环由 defSticker 按主色统一生成，各张只写中间的图案；
     - 图案画在以 (60,60) 为心、半径 38 的圆里，超出这个范围会压到波浪边上。 */

  function n1(value) { return Math.round(value * 10) / 10; }

  /** 贴纸的模切波浪边：把半径 r 的圆均分成 teeth 段，每段向外鼓出 bump。 */
  function scallop(cx, cy, r, teeth, bump) {
    var step = (Math.PI * 2) / teeth;
    function at(radius, angle) {
      return n1(cx + radius * Math.cos(angle)) + " " + n1(cy + radius * Math.sin(angle));
    }
    var out = "M" + at(r, -Math.PI / 2);
    for (var i = 0; i < teeth; i++) {
      var a = -Math.PI / 2 + step * i;
      out += " Q" + at(r + bump * 1.4, a + step / 2) + " " + at(r, a + step);
    }
    return out + "Z";
  }

  function defSticker(id, spec) {
    def("sticker/" + id, {
      viewBox: "0 0 120 120",
      fit: "xMidYMid meet",
      title: spec.title + "收藏卡",
      desc: spec.desc,
      bg:
        '<path d="' + scallop(60, 60, 52, 18, 3.4) + '" fill="#fffdf7" stroke="' + spec.accent + '" stroke-width="3"/>' +
        '<circle cx="60" cy="60" r="45" fill="' + fadeHex(spec.accent, 0.13) + '"/>' +
        '<circle cx="60" cy="60" r="45" fill="none" stroke="' + fadeHex(spec.accent, 0.5) +
        '" stroke-width="1.6" stroke-dasharray="3 4"/>',
      art: spec.art
    });
  }

  defSticker("ten-builder", {
    title: "凑十建筑师", accent: "#d97706",
    desc: "一个十格阵里砌好了 7 块砖，还空着 3 格；上面写着 7+3=10。",
    art: (function () {
      var out = '<text x="60" y="38" text-anchor="middle" font-size="15" font-weight="800" fill="#8a5a10" font-family="monospace">7+3=10</text>' +
        '<rect x="22" y="44" width="76" height="34" rx="5" fill="#fffdf6" stroke="#b06f13" stroke-width="2.4"/>';
      for (var i = 0; i < 10; i++) {
        var x = 25 + (i % 5) * 14.2, y = i < 5 ? 46.5 : 62.1;
        if (i < 7) {
          out += '<rect x="' + x + '" y="' + y + '" width="12.4" height="13.4" rx="2.4" fill="#d97706"/>' +
            '<rect x="' + x + '" y="' + y + '" width="12.4" height="4.6" rx="2.2" fill="#f2ac4b"/>';
        } else {
          out += '<rect x="' + (x + 0.8) + '" y="' + (y + 0.8) + '" width="10.8" height="11.8" rx="2" fill="none" stroke="#c98a2c" stroke-width="1.6" stroke-dasharray="3 3"/>';
        }
      }
      /* 十格阵的分组线：上下各五格，这条线才是「一眼看出多少」的依据。 */
      return out + '<path d="M22 61 L98 61" stroke="#b06f13" stroke-width="1.8"/>';
    })()
  });

  defSticker("fraction-chef", {
    title: "分数主厨", accent: "#dc2626",
    desc: "一张切成四块的披萨，对角的两块放了香肠，下面写着 2/4 = 1/2。",
    art:
      '<circle cx="60" cy="54" r="29" fill="#e0a458"/>' +
      '<circle cx="60" cy="54" r="25" fill="#f7d489"/>' +
      '<path d="M60 54 L85 54 A25 25 0 0 0 60 29Z" fill="#e2563f"/>' +
      '<path d="M60 54 L35 54 A25 25 0 0 0 60 79Z" fill="#e2563f"/>' +
      '<g fill="#a3241a"><circle cx="72" cy="42" r="3.6"/><circle cx="49" cy="66" r="3.6"/><circle cx="66" cy="36" r="2.6"/><circle cx="54" cy="72" r="2.6"/></g>' +
      '<g stroke="#b45309" stroke-width="2.2" stroke-linecap="round"><path d="M35 54 L85 54"/><path d="M60 29 L60 79"/></g>' +
      '<text x="60" y="99" text-anchor="middle" font-size="15" font-weight="800" fill="#a51b42" font-family="monospace">2/4 = 1/2</text>'
  });

  defSticker("rule-detective", {
    title: "规律侦探", accent: "#7c3aed",
    desc: "三根一次比一次高的柱子排成一列，第四根还是虚线，放大镜正对着它上面的问号。",
    art:
      '<path d="M22 82 L98 82" stroke="#4c1d95" stroke-width="2.6" stroke-linecap="round"/>' +
      '<g fill="#a78bfa">' +
      '<rect x="26" y="68" width="13" height="14" rx="2.5"/>' +
      '<rect x="44" y="58" width="13" height="24" rx="2.5" fill="#8b5cf6"/>' +
      '<rect x="62" y="48" width="13" height="34" rx="2.5" fill="#7c3aed"/></g>' +
      '<rect x="80" y="38" width="13" height="44" rx="2.5" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="4 3"/>' +
      '<circle cx="79" cy="44" r="14" fill="#ffffff" fill-opacity=".72" stroke="#4c1d95" stroke-width="3"/>' +
      '<path d="M89 54 L97 62" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>' +
      '<text x="79" y="51" text-anchor="middle" font-size="19" font-weight="800" fill="#4c1d95">?</text>'
  });

  defSticker("symmetry-artist", {
    title: "对称艺术家", accent: "#2563eb",
    desc: "一片六角雪花，中间一条虚线是它的对称轴，两边完全一样。",
    art: (function () {
      var out = '<path d="M60 18 L60 102" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5 4"/>';
      for (var k = 0; k < 6; k++) {
        out += '<g transform="rotate(' + (k * 60) + ' 60 60)">' +
          '<path d="M60 60 L60 26" stroke="#2563eb" stroke-width="3.4" stroke-linecap="round"/>' +
          '<path d="M60 36 L52 29 M60 36 L68 29" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
          '<path d="M60 47 L54 42 M60 47 L66 42" stroke="#60a5fa" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
          "</g>";
      }
      return out + '<circle cx="60" cy="60" r="5.5" fill="#1d4ed8"/>';
    })()
  });

  defSticker("estimate-eye", {
    title: "估算慧眼", accent: "#db2777",
    desc: "一罐糖豆，虚线框先圈出一小堆 5 颗，再照这一堆估出整罐大约 15 颗。",
    art: (function () {
      /* 糖豆排成整齐的方阵就成了「数得清」，估算的前提恰恰是数不清：
         位置和角度都错开，只有被虚线圈住的那一小堆是可数的基准。 */
      var grouped = [[46, 52, -14], [56, 49, 8], [66, 53, -6], [76, 50, 16], [51, 58, 22]];
      var loose = [[44, 65, 10], [55, 62, -18], [65, 67, 6], [76, 63, -10],
        [47, 74, -8], [59, 72, 16], [70, 75, -14], [79, 71, 4], [52, 80, 12]];
      var out = '<rect x="45" y="29" width="30" height="9" rx="4" fill="#f9a8d4" stroke="#9d174d" stroke-width="2.2"/>' +
        '<path d="M36 44 C36 40 41 38 60 38 C79 38 84 40 84 44 L84 82 A8 8 0 0 1 76 90 L44 90 A8 8 0 0 1 36 82Z" ' +
        'fill="#ffffff" fill-opacity=".72" stroke="#9d174d" stroke-width="2.6" stroke-linejoin="round"/>';
      function bean(spot, fill) {
        return '<ellipse cx="' + spot[0] + '" cy="' + spot[1] + '" rx="5" ry="3.8" fill="' + fill +
          '" transform="rotate(' + spot[2] + " " + spot[0] + " " + spot[1] + ')"/>';
      }
      var i;
      for (i = 0; i < grouped.length; i++) out += bean(grouped[i], "#db2777");
      for (i = 0; i < loose.length; i++) out += bean(loose[i], "#f472b6");
      return out +
        '<rect x="39" y="43" width="44" height="20" rx="6" fill="none" stroke="#831843" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<text x="86" y="52" font-size="12" font-weight="800" fill="#9d174d" font-family="monospace">5</text>' +
        '<rect x="41" y="79" width="38" height="15" rx="7.5" fill="#ffffff" stroke="#9d174d" stroke-width="2"/>' +
        '<text x="60" y="90" text-anchor="middle" font-size="12" font-weight="800" fill="#9d174d" font-family="monospace">≈ 15</text>';
    })()
  });

  defSticker("turtle-coder", {
    title: "海龟指挥家", accent: "#059669",
    desc: "一只小海龟沿着虚线正方形走，每个角上标着要转的 90 度。",
    art:
      '<rect x="36" y="38" width="48" height="44" rx="2" fill="none" stroke="#047857" stroke-width="3" stroke-dasharray="6 5"/>' +
      '<text x="60" y="32" text-anchor="middle" font-size="13" font-weight="800" fill="#065f46" font-family="monospace">90°</text>' +
      '<path d="M74 38 A10 10 0 0 1 84 48" fill="none" stroke="#f59e0b" stroke-width="2.6"/>' +
      '<path d="M84 48 L80.6 44.6 M84 48 L87.4 44.6" stroke="#f59e0b" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
      '<g fill="#34d399" stroke="#065f46" stroke-width="1.4">' +
      '<ellipse cx="48" cy="72" rx="6" ry="4" transform="rotate(-30 48 72)"/>' +
      '<ellipse cx="48" cy="90" rx="6" ry="4" transform="rotate(30 48 90)"/>' +
      '<ellipse cx="70" cy="72" rx="6" ry="4" transform="rotate(30 70 72)"/>' +
      '<ellipse cx="70" cy="90" rx="6" ry="4" transform="rotate(-30 70 90)"/></g>' +
      '<path d="M42 81 C38 79 36 82 40 84Z" fill="#34d399" stroke="#065f46" stroke-width="1.4"/>' +
      '<ellipse cx="59" cy="81" rx="16" ry="13" fill="#047857" stroke="#065f46" stroke-width="1.8"/>' +
      '<g fill="#10b981"><circle cx="59" cy="81" r="5.6"/>' +
      '<ellipse cx="59" cy="71.5" rx="4.6" ry="3"/><ellipse cx="59" cy="90.5" rx="4.6" ry="3"/>' +
      '<ellipse cx="47.5" cy="81" rx="3" ry="4.6"/><ellipse cx="70.5" cy="81" rx="3" ry="4.6"/></g>' +
      '<ellipse cx="78" cy="77" rx="7" ry="5.6" fill="#34d399" stroke="#065f46" stroke-width="1.4"/>' +
      '<circle cx="81" cy="75.5" r="1.7" fill="#0f172a"/>'
  });

  defSticker("rainbow-artist", {
    title: "彩虹故事家", accent: "#be185d",
    desc: "一把画笔正刷出四道彩虹，红橙绿蓝一层套一层。",
    art:
      '<g fill="none" stroke-linecap="round" stroke-width="8">' +
      '<path d="M26 86 A34 34 0 0 1 94 86" stroke="#e11d48"/>' +
      '<path d="M32 86 A28 28 0 0 1 88 86" stroke="#f59e0b"/>' +
      '<path d="M38 86 A22 22 0 0 1 82 86" stroke="#22c55e"/>' +
      '<path d="M44 86 A16 16 0 0 1 76 86" stroke="#3b82f6"/></g>' +
      '<path d="M24 86 L96 86" stroke="#be185d" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g transform="rotate(32 60 46)">' +
      '<rect x="55.5" y="14" width="9" height="21" rx="4" fill="#b07a3f"/>' +
      '<rect x="53.5" y="33" width="13" height="8" rx="2" fill="#9aa5b1"/>' +
      '<path d="M54.5 41 L65.5 41 L63 52 L57 52Z" fill="#be185d"/></g>'
  });

  defSticker("gravity-observer", {
    title: "落体观察员", accent: "#6366f1",
    desc: "羽毛和小球从同一条虚线同时放手，此刻还并排落在同一高度，下面是地面。",
    art:
      /* 两样东西必须画在同一高度：这枚贴纸讲的就是「真空里一起落地」，
         一旦一高一低，图上说的话和卡片背面的结论正好相反。 */
      '<path d="M28 34 L92 34" stroke="#6366f1" stroke-width="2" stroke-dasharray="5 4"/>' +
      '<g fill="#4338ca"><circle cx="42" cy="34" r="2.6"/><circle cx="80" cy="34" r="2.6"/></g>' +
      '<g stroke="#a5b4fc" stroke-width="2.6" stroke-dasharray="4 6" stroke-linecap="round">' +
      '<path d="M42 38 L42 84"/><path d="M80 38 L80 84"/></g>' +
      '<path d="M26 88 L94 88" stroke="#4338ca" stroke-width="3.4" stroke-linecap="round"/>' +
      '<g transform="rotate(-16 42 60)">' +
      /* 羽毛的辨识点是羽轴从羽片下端伸出来的那一小截，少了它就只是一片叶子。 */
      '<path d="M43.4 60 L44.6 84" stroke="#6366f1" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M42 42 C53 52 53 66 44 75 C35 66 32 52 42 42Z" fill="#eef2ff" stroke="#6366f1" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="M42.6 45 L43.6 74" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>' +
      '<g stroke="#a5b4fc" stroke-width="1.6" stroke-linecap="round">' +
      '<path d="M42.7 52 L36.5 57"/><path d="M42.8 60 L35.5 65"/><path d="M42.9 68 L37 72"/>' +
      '<path d="M42.7 52 L48.9 57"/><path d="M42.8 60 L50.1 65"/><path d="M42.9 68 L48.8 72"/></g></g>' +
      '<circle cx="80" cy="60" r="12" fill="#6366f1"/>' +
      '<circle cx="76" cy="56" r="3.6" fill="#c7d2fe" opacity=".85"/>'
  });

  defSticker("ramp-engineer", {
    title: "斜坡工程师", accent: "#b45309",
    desc: "一个斜坡上滚着小球，坡底标出了坡度角，箭头指着球会往哪边加速。",
    art:
      '<path d="M28 84 L92 84 L28 44Z" fill="#fcd9a3" stroke="#92400e" stroke-width="2.8" stroke-linejoin="round"/>' +
      '<path d="M28 62 L60 62" stroke="#c98a2c" stroke-width="1.8" stroke-dasharray="4 4"/>' +
      '<path d="M74 84 A18 18 0 0 0 78.5 72.4" fill="none" stroke="#92400e" stroke-width="2.2"/>' +
      '<circle cx="55" cy="56" r="9" fill="#4d86d6" stroke="#1e40af" stroke-width="2.4"/>' +
      '<circle cx="52" cy="53" r="2.8" fill="#bfdbfe" opacity=".9"/>' +
      '<g stroke="#b45309" stroke-width="3" stroke-linecap="round" fill="none">' +
      '<path d="M66 68 L74 73"/><path d="M74 73 L69.6 73.6"/><path d="M74 73 L72.4 69"/></g>' +
      '<path d="M24 88 L96 88" stroke="#92400e" stroke-width="2.4" stroke-linecap="round"/>'
  });

  defSticker("shadow-director", {
    title: "影子导演", accent: "#ca8a04",
    desc: "灯泡的两条光线擦过小方块的上下边，在右边的白墙上圈出一块更大的影子。",
    art:
      '<g stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="5 4" fill="none">' +
      '<path d="M30 60 L82 44"/><path d="M30 60 L82 80"/></g>' +
      '<rect x="80" y="28" width="11" height="62" rx="2" fill="#faf8f4" stroke="#a8a29e" stroke-width="2.2"/>' +
      '<rect x="80" y="44" width="11" height="36" fill="#4b4643"/>' +
      '<rect x="55" y="52" width="11" height="18" rx="2" fill="#b45309" stroke="#78350f" stroke-width="2"/>' +
      '<circle cx="30" cy="60" r="9" fill="#fde047" stroke="#a16207" stroke-width="2.4"/>' +
      '<g stroke="#eab308" stroke-width="2.2" stroke-linecap="round">' +
      '<path d="M30 46 L30 41"/><path d="M18 60 L13 60"/><path d="M21 51 L17.5 47.5"/><path d="M21 69 L17.5 72.5"/></g>'
  });

  defSticker("wave-listener", {
    title: "波浪倾听者", accent: "#0891b2",
    desc: "两列波上下排开，加在一起后波峰变得更高，这就是相长叠加。",
    art:
      '<g fill="none" stroke-linecap="round">' +
      '<path d="M30 40 Q37.5 31 45 40 T60 40 T75 40 T90 40" stroke="#0891b2" stroke-width="3"/>' +
      '<path d="M30 60 Q37.5 51 45 60 T60 60 T75 60 T90 60" stroke="#f472b6" stroke-width="3"/>' +
      '<path d="M30 84 Q37.5 66 45 84 T60 84 T75 84 T90 84" stroke="#164e63" stroke-width="4"/></g>' +
      '<g fill="#155e75" font-size="14" font-weight="800" font-family="monospace">' +
      '<text x="24" y="55" text-anchor="middle">+</text><text x="24" y="76" text-anchor="middle">=</text></g>' +
      '<path d="M28 70 L92 70" stroke="#a5b4c4" stroke-width="1.4"/>'
  });

  defSticker("fossil-sleuth", {
    title: "化石推理员", accent: "#15803d",
    desc: "地层剖面里埋着一具恐龙化石：头骨、脊椎和肋骨都还连在原来的位置上。",
    art:
      '<path d="M26 50 L94 50 L94 66 L26 66Z" fill="#d9b382"/>' +
      '<path d="M26 66 L94 66 L94 82 L26 82Z" fill="#bf9760"/>' +
      '<path d="M26 82 L94 82 L94 90 L26 90Z" fill="#9c7745"/>' +
      '<g stroke="#a8834f" stroke-width="1.4" opacity=".7"><path d="M26 58 L94 58"/><path d="M26 74 L94 74"/></g>' +
      '<g fill="#4a7f3a"><path d="M32 50 C33 45 35 43 37 42 C36 45 36 48 37 50Z"/>' +
      '<path d="M40 50 C41 46 43 44 45 43 C44 46 44 48 45 50Z"/><path d="M84 50 C85 45 87 43 89 42 C88 45 88 48 89 50Z"/></g>' +
      /* 化石要能被认出是「谁」的骨头：侧面的长吻头骨加一排牙，
         后面接三节带棘突的脊椎，比一堆白色碎块更像一具躺在原位的骨架。 */
      '<g fill="#fdfaf0" stroke="#6b5227" stroke-width="1.5" stroke-linejoin="round">' +
      '<path d="M30 71 C30 66 34 62 41 62 C48 62 54 65 57 70 L70 74 L70 78 L56 78 C52 81 43 82 36 80 C32 79 30 75 30 71Z"/>' +
      '<path d="M62 71 L70 68 L74 71 L69 74Z"/>' +
      '<circle cx="40" cy="69" r="3" fill="#6b5227" stroke="none"/>' +
      '<g fill="#6b5227" stroke="none"><path d="M46 78 L48.6 82 L51.2 78Z"/><path d="M53 78 L55.6 82 L58.2 78Z"/>' +
      '<path d="M60 78 L62.6 81.4 L65.2 78Z"/></g>' +
      '<path d="M76 66 L80 61 L84 66 L80 71Z"/><path d="M82 72 L86 67 L90 72 L86 77Z"/></g>' +
      '<g stroke="#fdfaf0" stroke-width="3.6" stroke-linecap="round" fill="none">' +
      '<path d="M72 72 L78 70"/><path d="M80 74 L84 73"/></g>'
  });

  defSticker("planet-navigator", {
    title: "行星领航员", accent: "#6d28d9",
    desc: "一颗带光环的紫色行星，旁边一颗小卫星沿虚线轨道绕行，背景撒着星星。",
    art:
      '<g fill="#faf5ff"><circle cx="30" cy="34" r="2.4"/><circle cx="92" cy="82" r="2"/>' +
      '<circle cx="36" cy="86" r="1.6"/><circle cx="86" cy="30" r="1.6"/></g>' +
      '<g transform="rotate(-18 58 58)">' +
      '<ellipse cx="58" cy="58" rx="38" ry="12" fill="none" stroke="#a78bfa" stroke-width="5"/></g>' +
      '<circle cx="58" cy="58" r="23" fill="#7c3aed"/>' +
      '<path d="M35 58 A23 23 0 0 1 81 58Z" fill="#8b5cf6"/>' +
      '<g fill="#a78bfa" opacity=".85"><ellipse cx="58" cy="48" rx="20" ry="4"/><ellipse cx="58" cy="66" rx="21" ry="4.4"/></g>' +
      '<circle cx="48" cy="50" r="4.6" fill="#6d28d9" opacity=".8"/>' +
      '<g transform="rotate(-18 58 58)">' +
      '<path d="M20 58 A38 12 0 0 0 96 58" fill="none" stroke="#c4b5fd" stroke-width="5"/></g>' +
      '<circle cx="90" cy="44" r="6" fill="#e9d5ff" stroke="#6d28d9" stroke-width="1.8"/>' +
      '<circle cx="88.4" cy="42.6" r="1.5" fill="#c4b5fd"/>'
  });

  defSticker("deep-sea-scout", {
    title: "深海观察员", accent: "#0369a1",
    desc: "海水从上到下越来越暗，一头鲸在深处游过，左边的刻度标出越潜越深。",
    art:
      '<defs><linearGradient id="deep{{U}}" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#7dd3fc"/><stop offset="0.5" stop-color="#0e6ba8"/>' +
      '<stop offset="1" stop-color="#0b2a45"/></linearGradient></defs>' +
      '<circle cx="60" cy="60" r="44" fill="url(#deep{{U}})"/>' +
      '<g stroke="#e0f2fe" stroke-width="2" stroke-linecap="round" opacity=".8">' +
      '<path d="M22 44 L30 44"/><path d="M20 60 L28 60"/><path d="M22 76 L30 76"/></g>' +
      '<g fill="#e0f2fe" opacity=".55"><circle cx="74" cy="34" r="3"/><circle cx="82" cy="26" r="2"/><circle cx="66" cy="28" r="1.6"/></g>' +
      '<g transform="translate(60 66) scale(1.25) translate(-32 -34)">' +
      whaleSide("#dbeafe", "#bfdbfe", "#93c5fd", "#0b2a45") +
      '<path d="M14 37 C17 39 21 39 24 37" stroke="#0b2a45" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".7"/>' +
      "</g>"
  });

  defSticker("bug-friend", {
    title: "昆虫好朋友", accent: "#ea580c",
    desc: "一只俯视的瓢虫，头、胸、腹分明，六条腿都长在胸部两侧。",
    art:
      '<g stroke="#2b1a10" stroke-width="3" stroke-linecap="round" fill="none">' +
      '<path d="M40 54 L26 46"/><path d="M38 64 L22 64"/><path d="M40 74 L26 84"/>' +
      '<path d="M80 54 L94 46"/><path d="M82 64 L98 64"/><path d="M80 74 L94 84"/></g>' +
      '<g stroke="#2b1a10" stroke-width="2.6" stroke-linecap="round" fill="none">' +
      '<path d="M52 34 C48 26 44 22 39 20"/><path d="M68 34 C72 26 76 22 81 20"/></g>' +
      '<circle cx="38" cy="19" r="3" fill="#2b1a10"/><circle cx="82" cy="19" r="3" fill="#2b1a10"/>' +
      '<ellipse cx="60" cy="68" rx="25" ry="24" fill="#e04a2f"/>' +
      '<path d="M35 68 A25 24 0 0 1 85 68Z" fill="#f2603f"/>' +
      '<path d="M60 44 L60 92" stroke="#2b1a10" stroke-width="3"/>' +
      '<g fill="#2b1a10"><circle cx="47" cy="60" r="5"/><circle cx="73" cy="60" r="5"/>' +
      '<circle cx="45" cy="76" r="4.2"/><circle cx="75" cy="76" r="4.2"/>' +
      '<circle cx="60" cy="86" r="3.6"/></g>' +
      '<ellipse cx="60" cy="40" rx="14" ry="10" fill="#2b1a10"/>' +
      '<g fill="#fdfdf7"><circle cx="53" cy="38" r="3"/><circle cx="67" cy="38" r="3"/></g>' +
      '<g fill="#2b1a10"><circle cx="53.8" cy="38.6" r="1.4"/><circle cx="67.8" cy="38.6" r="1.4"/></g>'
  });

  defSticker("earth-reader", {
    title: "地球读图员", accent: "#0f766e",
    desc: "地球上标着一颗震中星，三圈波纹向外扩散，下面是记录仪画出的地震波形。",
    art:
      '<circle cx="60" cy="50" r="23" fill="#3b82c4"/>' +
      '<g fill="#4ca86a"><path d="M45 38 C51 32 60 33 63 39 C66 45 59 50 52 49 C46 48 43 43 45 38Z"/>' +
      '<path d="M62 58 C67 54 74 56 75 61 C76 67 69 70 64 67 C60 65 59 60 62 58Z"/></g>' +
      '<g fill="none" stroke="#dbeafe" stroke-width="1.4" opacity=".8">' +
      '<circle cx="60" cy="50" r="23"/><ellipse cx="60" cy="50" rx="10" ry="23"/><path d="M37 50 L83 50"/></g>' +
      /* 描述说「三圈波纹向外扩散」：三道弧同心（圆心约 63.5,39），半径 9/15/21 一圈圈往外。 */
      '<g fill="none" stroke="#f59e0b" stroke-width="2.2" opacity=".95">' +
      '<path d="M64 30 A9 9 0 0 1 72.6 38.6"/><path d="M62 24 A15 15 0 0 1 78.4 40.4"/>' +
      '<path d="M59.1 18.5 A21 21 0 0 1 84 43.4"/></g>' +
      '<path d="M70 28 L72.6 34.4 L79.4 34.8 L74.2 39.2 L75.8 45.8 L70 42.2 L64.2 45.8 L65.8 39.2 L60.6 34.8 L67.4 34.4Z" fill="#f59e0b" stroke="#b45309" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M32 88 L96 88" stroke="#5b7d78" stroke-width="1.4"/>' +
      '<path d="M32 88 L42 88 L46 82 L50 94 L54 86 L60 88 L64 79 L70 97 L74 88 L88 88" fill="none" stroke="#0f766e" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>'
  });

  defSticker("cloud-reporter", {
    title: "云朵观察员", accent: "#0284c7",
    desc: "太阳从云后露出半边，云底下落着三滴雨。",
    art:
      '<circle cx="40" cy="40" r="12" fill="#fbbf24"/>' +
      '<g stroke="#f59e0b" stroke-width="2.6" stroke-linecap="round">' +
      '<path d="M40 22 L40 26"/><path d="M25 40 L21 40"/><path d="M28 28 L25 25"/><path d="M28 52 L25 55"/></g>' +
      '<path d="M44 74 C36 74 30 68 31 61 C32 55 38 51 44 53 C46 42 57 36 66 40 C73 43 77 49 78 55 C85 55 89 60 88 66 C87 71 82 74 77 74Z" fill="#ffffff" stroke="#5b93b8" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<g fill="#38bdf8" stroke="#0284c7" stroke-width="1.6">' +
      '<path d="M46 80 C49 85 51 88 51 90.5 A5 5 0 0 1 41 90.5 C41 88 43 85 46 80Z"/>' +
      '<path d="M60 84 C63 89 65 92 65 94.5 A5 5 0 0 1 55 94.5 C55 92 57 89 60 84Z"/>' +
      '<path d="M74 80 C77 85 79 88 79 90.5 A5 5 0 0 1 69 90.5 C69 88 71 85 74 80Z"/></g>'
  });

  defSticker("body-researcher", {
    title: "身体研究员", accent: "#e11d48",
    desc: "一颗心脏上画着心电图折线，右下角的秒表说明测量要记时间。",
    art:
      '<path d="M60 90 C36 74 24 62 24 48 C24 38 32 30 42 30 C50 30 56 35 60 41 C64 35 70 30 78 30 C88 30 96 38 96 48 C96 62 84 74 60 90Z" fill="#e11d48"/>' +
      '<path d="M42 33 C34 33 28 39 28 47 C28 52 30 57 34 62 C29 54 30 40 42 37Z" fill="#f79aa3" opacity=".85"/>' +
      '<path d="M28 58 L42 58 L47 47 L54 71 L59 58 L74 58" fill="none" stroke="#fff1f2" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="74" cy="58" r="3.4" fill="#fff1f2"/>' +
      '<g transform="translate(80 78)">' +
      '<circle cx="0" cy="0" r="13" fill="#fdf2f4" stroke="#9f1239" stroke-width="2.4"/>' +
      '<path d="M-4 -14 L4 -14" stroke="#9f1239" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M0 0 L0 -8 M0 0 L6 3" stroke="#9f1239" stroke-width="2.2" stroke-linecap="round"/></g>'
  });

  /* ---------------- 对外 API ---------------- */

  function cssName(name) { return String(name).replace(/[^a-z0-9]+/gi, "-"); }

  function has(name) { return Object.prototype.hasOwnProperty.call(CATALOG, name); }

  /* 卡片图位的宽高比由布局决定，slice 会裁掉溢出的一边。背景是纯色块，裁掉看不出来；
     主体一旦贴边，腿、触角、尾鳍就会被切断。这里把主体整体缩到中间的安全区，
     让任何常见宽高比下都不会切到关键部位。 */
  function safeArea(art, viewBox, scale) {
    var box = String(viewBox).split(/\s+/);
    var cx = (Number(box[0]) + Number(box[2])) / 2;
    var cy = (Number(box[1]) + Number(box[3])) / 2;
    return '<g transform="translate(' + cx + " " + cy + ") scale(" + scale +
      ") translate(" + (-cx) + " " + (-cy) + ')">' + art + "</g>";
  }

  function markup(name, options) {
    if (!has(name)) return "";
    var spec = CATALOG[name];
    var opts = options || {};
    var uid = "ix" + (++seq);
    /* bare：只要主体，不要那张卡自带的底色。图鉴卡里的深海底色是必要的，
       但同一张图放到别处的场景里（例如海面到海沟的剖面图）时，
       那块底色会变成一个贴在水里的深色方框，像把照片裱起来挂上去。
       去掉底色就得同时换成 meet：slice 是按「反正有底色兜着」裁的。 */
    var bare = opts.bare === true;
    var fit = opts.fit || (bare ? "xMidYMid meet" : (spec.fit || "xMidYMid meet"));
    var art = spec.art || "";
    if (/slice/.test(fit)) art = safeArea(art, spec.viewBox, spec.safe || 0.78);
    var body = String((bare ? "" : spec.bg || "") + art).replace(/\{\{U\}\}/g, uid);
    var decorative = opts.decorative === true;
    var cls = "illus illus-" + cssName(name) + (opts.className ? " " + opts.className : "");
    var open = '<svg xmlns="http://www.w3.org/2000/svg" class="' + esc(cls) +
      '" viewBox="' + esc(spec.viewBox) +
      '" preserveAspectRatio="' + esc(fit) + '" focusable="false"';
    var head;
    if (decorative) {
      head = open + ' aria-hidden="true">';
      return head + body + "</svg>";
    }
    var label = opts.label != null ? opts.label : spec.title;
    var desc = opts.desc != null ? opts.desc : spec.desc;
    head = open + ' role="img">';
    return head +
      "<title>" + esc(label) + "</title>" +
      (desc ? "<desc>" + esc(desc) + "</desc>" : "") +
      body + "</svg>";
  }

  /* 把插图写进容器；容器原有内容（例如 emoji 占位）会被替换掉。 */
  function render(target, name, options) {
    var el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el || !has(name)) return false;
    var html = markup(name, options);
    if (!html) return false;
    el.textContent = "";
    el.insertAdjacentHTML("beforeend", html);
    return true;
  }

  function names() {
    var out = [];
    for (var key in CATALOG) {
      if (Object.prototype.hasOwnProperty.call(CATALOG, key)) out.push(key);
    }
    return out.sort();
  }

  return {
    version: 2,
    stagePalette: stagePalette,
    themePalette: themePalette,
    dinoScaleCompare: dinoScaleCompare,
    drawKid: drawKid,
    drawFeather: drawFeather,
    drawBall: drawBall,
    drawHammer: drawHammer,
    drawTurtle: drawTurtle,
    drawCandyBean: drawCandyBean,
    drawCube: drawCube,
    drawPatternCell: drawPatternCell,
    drawDeskLamp: drawDeskLamp,
    drawShadowObject: drawShadowObject,
    drawColorLamp: drawColorLamp,
    drawDoodleStarter: drawDoodleStarter,
    roundRect: roundRect,
    canvasLabel: canvasLabel,
    redrawGate: redrawGate,
    reducedMotion: reducedMotion,
    tileIcon: tileIcon,
    dietColor: dietColor,
    shadeHex: shadeHex,
    fadeHex: fadeHex,
    hasArt: has,
    art: markup,
    renderArt: render,
    artNames: names,
    raindrop: raindrop,
    raindropPath: raindropPath,
    legend: legend
  };
})();
