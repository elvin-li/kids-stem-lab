/* 写实插画图库：全站唯一的 SVG 图形来源。
 *
 * 为什么放在 tools/ 而不是 assets/：
 *   file:// 下浏览器会把 <use href="other.svg#id"> 当跨源请求拦掉，外部 SVG 精灵图
 *   在本站的离线约束下根本不显示。所以图形必须内联在每一页文档里。
 *   为了不让 20 个页面各自维护一份复制品，图形定义只写在这里一处，
 *   由 tools/art-build.mjs 把每页真正用到的 <symbol> 注入到该页的
 *   <!-- ART:START --> / <!-- ART:END --> 之间。改图只改这个文件，然后重跑 build。
 *
 * 约定：
 *   - 每个条目 viewBox 统一为 0 0 120 120，便于在 44px 图标位和 150px 图鉴位共用。
 *   - 背景透明，不画方形底色，这样同一个图形放进圆形吉祥物框也不出戏。
 *   - 细节按「缩到 44px 还认得出」来取舍：先保证轮廓和标志性部件，再加质感。
 *   - 颜色写死在图形里（生物的颜色是它的识别特征，不该跟主题变量一起变）；
 *     只有需要页面换色的图形（伪装台的三只甲虫）才用 var(--art-*, 回退值)。
 */

/* 通用小工具：把重复的笔画写法收敛一下，避免同一段路径抄六遍。 */
const shadow = (cx = 62, cy = 110, rx = 36, ry = 5, o = 0.16) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#2a1c06" opacity="${o}"/>`;

/* 昆虫的腿：股节 → 胫节 → 跗节三段折线，末端带爪。 */
const leg = (d, color, w = 3.4) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

export const ART = {

  /* ======================================================================
     甲虫馆
     ====================================================================== */

  /* 独角仙 Trypoxylus dichotomus — 侧视。
     侧视是有意的：这个物种的识别特征是那根向前上方伸出、末端分四叉的头角，
     俯视会把角压成一个短点，正是原来那个 🦏 认不出来的同一个毛病。 */
  'beetle-rhino': `
    <linearGradient id="ag-rh-shell" x1=".1" y1="0" x2=".45" y2="1">
      <stop offset="0" stop-color="#8b5620"/><stop offset=".38" stop-color="#5a300e"/><stop offset="1" stop-color="#24 12 03"/>
    </linearGradient>
    <linearGradient id="ag-rh-pro" x1="0" y1="0" x2=".4" y2="1">
      <stop offset="0" stop-color="#67390f"/><stop offset="1" stop-color="#1f1003"/>
    </linearGradient>
    <linearGradient id="ag-rh-horn" x1=".9" y1="1" x2=".1" y2="0">
      <stop offset="0" stop-color="#3a1e06"/><stop offset=".5" stop-color="#5c3410"/><stop offset="1" stop-color="#2c1604"/>
    </linearGradient>
    <!-- 它挂在树干上：树皮既是栖息地信息，也给腿一个落点 -->
    <path d="M0 100 C22 96 46 98 70 101 C90 104 106 103 120 99 L120 120 L0 120 Z" fill="#8a5f34"/>
    <g fill="none" stroke="#6a4522" stroke-width="2" stroke-linecap="round" opacity=".8">
      <path d="M4 108 C28 104 52 106 76 109 C94 111 108 110 120 107"/>
      <path d="M8 116 C32 112 56 114 80 117"/>
    </g>
    ${shadow(76, 102, 30, 4, 0.22)}
    <!-- 远侧的三条腿压暗，做出前后层次 -->
    <g opacity=".5">
      ${leg('M58 84 C51 90 45 95 41 100', '#170c02', 3.4)}
      ${leg('M74 90 C72 95 70 99 68 103', '#170c02', 3.4)}
      ${leg('M94 88 C99 93 103 97 106 101', '#170c02', 3.4)}
    </g>
    <!-- 鞘翅：一整片光滑硬壳，侧面看长明显大于高 -->
    <path d="M62 62 C70 49 92 44 105 54 C115 62 117 78 109 88 C99 99 74 99 65 89 C58 82 57 70 62 62 Z"
          fill="url(#ag-rh-shell)"/>
    <path d="M62 62 C70 49 92 44 105 54 C115 62 117 78 109 88 C99 99 74 99 65 89 C58 82 57 70 62 62 Z"
          fill="none" stroke="#180b01" stroke-width="2.2"/>
    <!-- 腹端与鞘翅下缘 -->
    <path d="M70 93 C84 98 101 95 110 86" fill="none" stroke="#180b01" stroke-width="1.6" opacity=".6"/>
    <!-- 镜面反射：独角仙最直观的质感就是「亮得像上过漆」 -->
    <path d="M70 62 C80 52 96 50 106 57" fill="none" stroke="#ffe9c0" stroke-width="4.5" stroke-linecap="round" opacity=".5"/>
    <ellipse cx="80" cy="60" rx="8" ry="3.2" fill="#fff6e2" opacity=".5" transform="rotate(-24 80 60)"/>
    <ellipse cx="103" cy="76" rx="3" ry="8" fill="#ffe9c0" opacity=".22"/>
    <!-- 前胸背板：比鞘翅暗一档，后缘留一道亮边，否则整只虫会糊成一个褐色团 -->
    <path d="M64 66 C61 54 55 49 50 53 C44 58 43 72 46 81 C49 89 58 92 65 88 Z"
          fill="url(#ag-rh-pro)" stroke="#150a01" stroke-width="2"/>
    <path d="M64 67 C61 74 61 82 64 88" fill="none" stroke="#c08b45" stroke-width="2" opacity=".55"/>
    <path d="M58 56 C54 63 53 78 57 87" fill="none" stroke="#b07c35" stroke-width="1.8" opacity=".45"/>
    <!-- 胸角：短、粗、末端二叉，从前胸背板前缘伸出，明显比头角短 -->
    <path d="M60 61 C54 57 48 55 43 54 L42 60 C48 62 54 65 60 69 Z" fill="#33 1a 05"/>
    <path d="M60 61 C54 57 48 55 43 54 L42 60 C48 62 54 65 60 69 Z" fill="#331a05" stroke="#140a01" stroke-width="1.4"/>
    <path d="M43 54 L36 51 M42 59 L35 59" stroke="#331a05" stroke-width="3.4" stroke-linecap="round"/>
    <!-- 头 -->
    <path d="M51 74 C44 72 37 76 36 82 C35 88 41 92 47 91 C51 90 53 86 52 81 Z"
          fill="#221002" stroke="#100701" stroke-width="1.8"/>
    <circle cx="42" cy="81" r="2.4" fill="#080401"/>
    <circle cx="41.2" cy="80.2" r="0.9" fill="#caa168" opacity=".85"/>
    <!-- 头角：这一页的主角。基部粗，向前上方弯出一条长弧，
         先分两叉、每叉再分一次，共四个尖 —— 少了这一步就退化成「一根刺」。 -->
    <path d="M45 76 C34 66 26 51 21 36 L27 33 C33 48 43 63 55 74 Z" fill="url(#ag-rh-horn)"/>
    <path d="M45 76 C34 66 26 51 21 36 L27 33 C33 48 43 63 55 74 Z" fill="none" stroke="#150a01" stroke-width="1.6"/>
    ${leg('M22.5 36 C18 31 14 28 10 26', '#42230a', 5)}
    ${leg('M25.5 34 C26 28 28 23 31 20', '#42230a', 5)}
    ${leg('M10.5 26.5 L4 24', '#4d290c', 3)}
    ${leg('M10.5 26.5 L8 19', '#4d290c', 3)}
    ${leg('M30.5 20.5 L27 14', '#4d290c', 3)}
    ${leg('M30.5 20.5 L37 18', '#4d290c', 3)}
    <!-- 角面上的一道反光，说明它是硬角质而不是毛 -->
    ${leg('M43 72 C34 63 27 51 23 39', '#c89150', 2)}
    <!-- 近侧三条腿：股节粗、胫节带刺、末端一对钩爪抓住树皮 -->
    ${leg('M54 88 C48 93 42 97 36 99', '#2b1605', 4.6)}
    ${leg('M36 99 L30 102', '#2b1605', 3.2)}
    ${leg('M30 102 L26 100 M30 102 L27 105', '#2b1605', 2.2)}
    ${leg('M70 92 C68 97 65 102 61 105', '#2b1605', 4.6)}
    ${leg('M61 105 L55 107', '#2b1605', 3.2)}
    ${leg('M93 90 C99 95 104 99 109 101', '#2b1605', 4.6)}
    ${leg('M109 101 L114 104', '#2b1605', 3.2)}
    <!-- 前足胫节的锯齿 -->
    ${leg('M45 96 L41 94 M42 99 L38 97', '#2b1605', 2)}
  `,

  /* 瓢虫 Coccinella septempunctata — 俯视。
     俯视是有意的：七星瓢虫的识别特征是斑点排布和前胸背板上的两块白斑。 */
  'beetle-ladybird': `
    <radialGradient id="ag-lb-red" cx=".34" cy=".26" r=".85">
      <stop offset="0" stop-color="#f4614a"/><stop offset=".55" stop-color="#d92d1e"/><stop offset="1" stop-color="#9c1409"/>
    </radialGradient>
    <!-- 叶面：给它一个停靠的地方，红壳在绿底上更像实物 -->
    <path d="M6 96 C22 78 52 70 84 76 C102 79 114 88 116 100 C96 112 40 114 6 96 Z" fill="#5aa63a" opacity=".55"/>
    <path d="M10 97 C34 88 66 84 100 92" fill="none" stroke="#3f7d26" stroke-width="1.6" opacity=".6"/>
    ${shadow(60, 102, 30, 5, 0.2)}
    <!-- 六条短步行足 -->
    <g stroke="#191207" stroke-width="3.2" stroke-linecap="round" fill="none">
      <path d="M40 44 C32 40 26 36 22 31"/><path d="M80 44 C88 40 94 36 98 31"/>
      <path d="M32 68 C23 68 16 68 10 66"/><path d="M88 68 C97 68 104 68 110 66"/>
      <path d="M38 88 C31 93 26 98 22 104"/><path d="M82 88 C89 93 94 98 98 104"/>
    </g>
    <!-- 头：黑色，两侧各一块白颊斑 -->
    <path d="M50 26 C50 18 54 13 60 13 C66 13 70 18 70 26 Z" fill="#15100a"/>
    <circle cx="54" cy="21" r="2.6" fill="#f3ead4"/><circle cx="66" cy="21" r="2.6" fill="#f3ead4"/>
    <path d="M54 15 C50 10 46 8 42 8" fill="none" stroke="#15100a" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M66 15 C70 10 74 8 78 8" fill="none" stroke="#15100a" stroke-width="2.4" stroke-linecap="round"/>
    <!-- 前胸背板：黑底 + 两块奶白方斑，这是瓢虫最容易被忽略的识别点 -->
    <path d="M43 40 C43 29 50 23 60 23 C70 23 77 29 77 40 Z" fill="#15100a"/>
    <path d="M47 33 C49 29 52 27 55 27 L55 39 L46 39 Z" fill="#f3ead4"/>
    <path d="M73 33 C71 29 68 27 65 27 L65 39 L74 39 Z" fill="#f3ead4"/>
    <!-- 两片鞘翅：分开画，中缝才是真的缝 -->
    <path d="M60 38 C41 38 27 52 27 70 C27 88 42 100 60 100 Z" fill="url(#ag-lb-red)"/>
    <path d="M60 38 C79 38 93 52 93 70 C93 88 78 100 60 100 Z" fill="url(#ag-lb-red)"/>
    <path d="M60 38 L60 100" stroke="#7c0f06" stroke-width="1.8"/>
    <path d="M60 38 C41 38 27 52 27 70 C27 88 42 100 60 100 C78 100 93 88 93 70 C93 52 79 38 60 38 Z"
          fill="none" stroke="#6d0d05" stroke-width="2"/>
    <!-- 七个黑斑：中缝上共用一个，左右各三 -->
    <g fill="#15100a">
      <circle cx="60" cy="46" r="5.2"/>
      <circle cx="43" cy="58" r="5.6"/><circle cx="36" cy="76" r="5"/><circle cx="52" cy="87" r="4.4"/>
      <circle cx="77" cy="58" r="5.6"/><circle cx="84" cy="76" r="5"/><circle cx="68" cy="87" r="4.4"/>
    </g>
    <!-- 圆顶硬壳的镜面高光 -->
    <path d="M36 58 C40 48 48 42 56 41" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".38"/>
    <ellipse cx="44" cy="52" rx="5" ry="3" fill="#fff" opacity=".3" transform="rotate(-38 44 52)"/>
  `,

  /* 屎壳郎（蜣螂）Scarabaeidae — 侧视，正在推粪球。
     识别特征是「宽扁带齿的前足 + 一个球」，只画虫不画球就少了一半信息。 */
  'beetle-dung': `
    <linearGradient id="ag-dg-shell" x1="0" y1="0" x2=".3" y2="1">
      <stop offset="0" stop-color="#4c4a52"/><stop offset=".5" stop-color="#26242c"/><stop offset="1" stop-color="#0f0e13"/>
    </linearGradient>
    <radialGradient id="ag-dg-ball" cx=".34" cy=".3" r=".82">
      <stop offset="0" stop-color="#a08661"/><stop offset=".6" stop-color="#6f5837"/><stop offset="1" stop-color="#453521"/>
    </radialGradient>
    <!-- 沙地与球滚过的浅沟 -->
    <path d="M0 104 C24 98 44 100 64 103 C86 106 104 105 120 101 L120 120 L0 120 Z" fill="#d9c188" opacity=".55"/>
    <path d="M6 106 C26 101 46 103 66 106" fill="none" stroke="#b39a63" stroke-width="2" opacity=".7"/>
    ${shadow(64, 106, 30, 4, 0.18)}
    <!-- 粪球：比虫还大，这是这个物种最出名的一件事 -->
    <circle cx="29" cy="76" r="24" fill="url(#ag-dg-ball)"/>
    <g fill="#3b2c19" opacity=".45">
      <circle cx="21" cy="68" r="2.6"/><circle cx="34" cy="64" r="2"/><circle cx="38" cy="80" r="2.4"/>
      <circle cx="24" cy="86" r="2.2"/><circle cx="30" cy="76" r="1.6"/><circle cx="15" cy="80" r="1.8"/>
    </g>
    <ellipse cx="21" cy="66" rx="6" ry="4" fill="#fff" opacity=".16" transform="rotate(-30 21 66)"/>
    <!-- 远侧腿 -->
    <g opacity=".5">
      ${leg('M70 88 C68 96 66 102 63 107', '#0d0c11', 3)}
      ${leg('M92 86 C97 94 101 100 104 105', '#0d0c11', 3)}
    </g>
    <!-- 鞘翅：黑亮、结实，常沾泥 -->
    <path d="M63 58 C77 49 97 51 105 63 C111 73 108 88 96 92 C82 97 68 93 63 85 C59 77 59 64 63 58 Z"
          fill="url(#ag-dg-shell)" stroke="#08070a" stroke-width="2"/>
    <path d="M72 55 C84 49 97 52 104 62" fill="none" stroke="#cfd6e6" stroke-width="3.4" stroke-linecap="round" opacity=".4"/>
    <!-- 鞘翅纵纹 -->
    <g fill="none" stroke="#07060a" stroke-width="1.2" opacity=".55">
      <path d="M70 60 C76 70 78 82 76 91"/><path d="M80 56 C86 68 88 80 87 91"/><path d="M90 55 C96 66 98 78 97 89"/>
    </g>
    <!-- 沾在壳上的泥点 -->
    <g fill="#7a6136" opacity=".55"><circle cx="74" cy="72" r="2.2"/><circle cx="88" cy="66" r="1.8"/><circle cx="83" cy="84" r="2"/></g>
    <!-- 前胸背板 -->
    <path d="M63 62 C58 53 52 52 48 57 C44 63 44 76 48 82 C52 88 59 88 63 84 Z"
          fill="#22202a" stroke="#08070a" stroke-width="1.8"/>
    <!-- 头 + 铲状唇基：前缘一排齿，用来切开和铲起 -->
    <path d="M49 70 C42 68 34 72 32 79 C30 86 36 91 44 90 C49 89 51 84 50 78 Z"
          fill="#191821" stroke="#08070a" stroke-width="1.8"/>
    <path d="M32 79 L26 76 M31 83 L25 82 M32 87 L27 88" stroke="#191821" stroke-width="3" stroke-linecap="round"/>
    <circle cx="40" cy="78" r="2" fill="#050508"/>
    <!-- 前足：宽扁带齿，撑在球上。这是「挖掘足」的教学重点 -->
    <path d="M52 84 C46 88 40 92 34 94 L32 100 C40 99 48 95 54 90 Z" fill="#1b1a23" stroke="#08070a" stroke-width="1.6"/>
    <path d="M40 92 L38 97 M34 94 L33 99 M46 89 L45 94" stroke="#08070a" stroke-width="1.6" stroke-linecap="round"/>
    <!-- 中后足：撐地发力 -->
    ${leg('M68 90 C66 98 63 104 59 109', '#14131a', 4.2)}
    ${leg('M59 109 L53 111', '#14131a', 2.8)}
    ${leg('M90 89 C96 96 101 102 106 106', '#14131a', 4.2)}
    ${leg('M106 106 L111 109', '#14131a', 2.8)}
  `,

  /* 天牛 Anoplophora — 俯视。识别特征是比身体还长的分节触角和白斑。 */
  'beetle-longhorn': `
    <linearGradient id="ag-lh-shell" x1=".1" y1="0" x2=".9" y2="1">
      <stop offset="0" stop-color="#3b3a42"/><stop offset=".5" stop-color="#1c1b22"/><stop offset="1" stop-color="#0c0b10"/>
    </linearGradient>
    <!-- 树皮：只在四角留一点纵向木纹作质感，中间留白给触角轮廓 -->
    <g opacity=".13" stroke="#8a6236" fill="none" stroke-width="7" stroke-linecap="round">
      <path d="M7 4 C11 26 10 46 6 66"/><path d="M113 4 C109 26 110 46 114 66"/>
      <path d="M18 88 C20 102 19 112 16 118"/><path d="M102 88 C100 102 101 112 104 118"/>
    </g>
    <!-- 极长的分节触角：黑白相间、向后甩过身体，比身体还长。这是天牛的招牌。
         左右不对称是故意的：完全镜像会看成一个笼子，不像活虫。 -->
    <g fill="none" stroke="#17161c" stroke-width="4" stroke-linecap="round">
      <path d="M53 20 C37 10 19 12 10 26 C4 36 5 52 12 62"/>
      <path d="M67 20 C85 13 104 20 112 36 C117 47 114 60 108 68"/>
    </g>
    <g fill="none" stroke="#cfd3de" stroke-width="3.4" stroke-linecap="butt"
       stroke-dasharray="3 11" stroke-dashoffset="7">
      <path d="M53 20 C37 10 19 12 10 26 C4 36 5 52 12 62"/>
      <path d="M67 20 C85 13 104 20 112 36 C117 47 114 60 108 68"/>
    </g>
    ${shadow(60, 111, 26, 4.5)}
    <!-- 六条粗壮的足，基部有淡蓝白粉被 -->
    <g stroke="#1a191f" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M46 46 C36 44 28 46 22 52"/><path d="M74 46 C84 44 92 46 98 52"/>
      <path d="M43 66 C32 68 24 74 19 82"/><path d="M77 66 C88 68 96 74 101 82"/>
      <path d="M45 86 C36 92 30 100 27 108"/><path d="M75 86 C84 92 90 100 93 108"/>
    </g>
    <!-- 头 -->
    <path d="M52 18 C52 12 55 9 60 9 C65 9 68 12 68 18 L68 26 L52 26 Z" fill="#1a191f"/>
    <circle cx="54" cy="20" r="2.4" fill="#050508"/><circle cx="66" cy="20" r="2.4" fill="#050508"/>
    <!-- 前胸背板：两侧各一根侧刺 -->
    <path d="M47 28 C47 24 52 22 60 22 C68 22 73 24 73 28 L75 40 L45 40 Z" fill="#22212a" stroke="#0b0a0f" stroke-width="1.6"/>
    <path d="M45 32 L38 34 M75 32 L82 34" stroke="#22212a" stroke-width="4" stroke-linecap="round"/>
    <!-- 两片长条鞘翅：肩部最宽，向后收 -->
    <path d="M60 39 C46 39 40 52 40 72 C40 94 48 107 60 107 Z" fill="url(#ag-lh-shell)"/>
    <path d="M60 39 C74 39 80 52 80 72 C80 94 72 107 60 107 Z" fill="url(#ag-lh-shell)"/>
    <path d="M60 39 L60 107" stroke="#000" stroke-width="1.6" opacity=".8"/>
    <path d="M60 39 C46 39 40 52 40 72 C40 94 48 107 60 107 C72 107 80 94 80 72 C80 52 74 39 60 39 Z"
          fill="none" stroke="#08070b" stroke-width="2"/>
    <!-- 肩部的颗粒感 -->
    <g fill="#3d3c46" opacity=".8"><circle cx="47" cy="46" r="1.6"/><circle cx="73" cy="46" r="1.6"/><circle cx="52" cy="43" r="1.2"/><circle cx="68" cy="43" r="1.2"/></g>
    <!-- 不规则白斑：星天牛的标志 -->
    <g fill="#e8ecf5" opacity=".92">
      <ellipse cx="48" cy="55" rx="4.2" ry="3.2"/><ellipse cx="72" cy="57" rx="3.6" ry="2.8"/>
      <ellipse cx="45" cy="72" rx="3.8" ry="3"/><ellipse cx="75" cy="70" rx="4.2" ry="3.2"/>
      <ellipse cx="53" cy="83" rx="3.4" ry="2.6"/><ellipse cx="68" cy="85" rx="3.8" ry="2.8"/>
      <ellipse cx="50" cy="97" rx="2.8" ry="2.2"/><ellipse cx="70" cy="97" rx="2.6" ry="2"/>
      <ellipse cx="57" cy="64" rx="2.4" ry="1.9"/><ellipse cx="63" cy="76" rx="2.4" ry="1.9"/>
    </g>
    <!-- 长条硬壳的高光 -->
    <path d="M45 50 C42 62 42 80 45 94" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".22"/>
  `,

  /* 萤火虫 Lampyridae — 俯视，腹端发光。
     发光器要真的「发光」：暗底 + 多层光晕，而不是一个 ✨。 */
  'beetle-firefly': `
    <radialGradient id="ag-ff-glow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#f6ffb0" stop-opacity=".95"/>
      <stop offset=".35" stop-color="#d8f75c" stop-opacity=".72"/>
      <stop offset=".7" stop-color="#9ade2a" stop-opacity=".28"/>
      <stop offset="1" stop-color="#6cb81a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ag-ff-night" cx=".5" cy=".62" r=".58">
      <stop offset="0" stop-color="#16281f" stop-opacity=".5"/>
      <stop offset="1" stop-color="#16281f" stop-opacity="0"/>
    </radialGradient>
    <!-- 夜色只压在发光器周围，让冷光有对比又不把整张卡变黑 -->
    <ellipse cx="60" cy="86" rx="52" ry="34" fill="url(#ag-ff-night)"/>
    <ellipse cx="60" cy="96" rx="40" ry="26" fill="url(#ag-ff-glow)"/>
    <!-- 六条细足 -->
    <g stroke="#2c2418" stroke-width="2.6" stroke-linecap="round" fill="none">
      <path d="M48 40 C40 37 34 33 30 28"/><path d="M72 40 C80 37 86 33 90 28"/>
      <path d="M45 58 C36 58 29 60 24 64"/><path d="M75 58 C84 58 91 60 96 64"/>
      <path d="M47 74 C39 78 33 84 30 90"/><path d="M73 74 C81 78 87 84 90 90"/>
    </g>
    <!-- 触角：短丝状 -->
    <path d="M55 20 C50 13 44 9 38 7" fill="none" stroke="#2c2418" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M65 20 C70 13 76 9 82 7" fill="none" stroke="#2c2418" stroke-width="2.4" stroke-linecap="round"/>
    <!-- 头缩在前胸背板下面，只露一点 -->
    <path d="M53 20 C53 15 56 12 60 12 C64 12 67 15 67 20 Z" fill="#241d12"/>
    <!-- 前胸背板：橙红色的盾，中间一块暗斑。萤火虫最容易辨认的部位 -->
    <path d="M43 34 C43 24 50 18 60 18 C70 18 77 24 77 34 L77 40 L43 40 Z" fill="#e08a3c" stroke="#a4571b" stroke-width="1.6"/>
    <ellipse cx="60" cy="30" rx="7" ry="8" fill="#3b2a14" opacity=".85"/>
    <!-- 鞘翅：软、偏暗褐，两侧有淡色边 -->
    <path d="M60 38 C47 38 42 52 42 72 C42 90 50 100 60 100 Z" fill="#54452e"/>
    <path d="M60 38 C73 38 78 52 78 72 C78 90 70 100 60 100 Z" fill="#4b3d28"/>
    <path d="M44 48 C41 62 41 82 45 95" fill="none" stroke="#d9c79a" stroke-width="3.2" stroke-linecap="round" opacity=".85"/>
    <path d="M76 48 C79 62 79 82 75 95" fill="none" stroke="#d9c79a" stroke-width="3.2" stroke-linecap="round" opacity=".85"/>
    <path d="M60 38 L60 100" stroke="#2b2317" stroke-width="1.6"/>
    <path d="M60 38 C47 38 42 52 42 72 C42 90 50 100 60 100 C70 100 78 90 78 72 C78 52 73 38 60 38 Z"
          fill="none" stroke="#2b2317" stroke-width="1.8"/>
    <!-- 腹端发光器：亮心 + 两层光晕 -->
    <ellipse cx="60" cy="100" rx="15" ry="11" fill="url(#ag-ff-glow)"/>
    <path d="M50 96 C50 92 54 90 60 90 C66 90 70 92 70 96 C70 102 66 106 60 106 C54 106 50 102 50 96 Z"
          fill="#e9f89a" stroke="#b7d642" stroke-width="1.4"/>
    <ellipse cx="60" cy="97" rx="6" ry="4.4" fill="#fdffe4"/>
  `,

  /* 龙虱 Dytiscidae — 俯视，水下。识别特征是流线型 + 黄边 + 带缘毛的游泳后足。 */
  'beetle-diving': `
    <linearGradient id="ag-dv-shell" x1=".2" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="#4d5a26"/><stop offset=".55" stop-color="#2f3a14"/><stop offset="1" stop-color="#1a2109"/>
    </linearGradient>
    <linearGradient id="ag-dv-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8fd3ea" stop-opacity=".45"/><stop offset="1" stop-color="#3f92b8" stop-opacity=".3"/>
    </linearGradient>
    <!-- 水：用柔和的椭圆而不是整块方底，放进图鉴卡时不会像贴了一枚 app 图标 -->
    <ellipse cx="60" cy="62" rx="58" ry="56" fill="url(#ag-dv-water)"/>
    <g fill="none" stroke="#4d9fbe" stroke-width="1.6" opacity=".55">
      <circle cx="20" cy="26" r="4"/><circle cx="29" cy="15" r="2.6"/><circle cx="100" cy="32" r="3.4"/>
      <circle cx="93" cy="19" r="2.2"/><circle cx="17" cy="92" r="2.8"/><circle cx="103" cy="88" r="2.2"/>
    </g>
    <!-- 后足：扁平的桨，边上一排缘毛 -->
    <g>
      <path d="M44 76 C34 84 24 94 18 104" fill="none" stroke="#6b5a22" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M76 76 C86 84 96 94 102 104" fill="none" stroke="#6b5a22" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M26 92 C20 98 16 104 14 110 C22 110 30 104 34 98 Z" fill="#8a7429" opacity=".9"/>
      <path d="M94 92 C100 98 104 104 106 110 C98 110 90 104 86 98 Z" fill="#8a7429" opacity=".9"/>
      <g stroke="#4f4214" stroke-width="1.4" stroke-linecap="round">
        <path d="M27 95 L21 98 M30 99 L24 103 M33 103 L28 107 M22 92 L16 94"/>
        <path d="M93 95 L99 98 M90 99 L96 103 M87 103 L92 107 M98 92 L104 94"/>
      </g>
    </g>
    <!-- 中足与前足 -->
    <g stroke="#6b5a22" stroke-width="3.6" stroke-linecap="round" fill="none">
      <path d="M42 58 C32 58 24 60 18 64"/><path d="M78 58 C88 58 96 60 102 64"/>
      <path d="M46 42 C38 36 32 30 28 24"/><path d="M74 42 C82 36 88 30 92 24"/>
    </g>
    ${shadow(60, 112, 24, 4, 0.12)}
    <!-- 身体：泪滴形，前宽后尖，整圈黄边 -->
    <path d="M60 16 C42 18 30 36 30 60 C30 86 44 106 60 108 C76 106 90 86 90 60 C90 36 78 18 60 16 Z"
          fill="#d6bf4e"/>
    <path d="M60 21 C45 23 35 39 35 60 C35 84 47 101 60 103 C73 101 85 84 85 60 C85 39 75 23 60 21 Z"
          fill="url(#ag-dv-shell)"/>
    <!-- 前胸背板与头：前端有一条淡色横带 -->
    <path d="M42 34 C48 27 54 24 60 24 C66 24 72 27 78 34 L76 40 L44 40 Z" fill="#3c4a1b" stroke="#1c2409" stroke-width="1.4"/>
    <path d="M45 30 C50 26 55 24 60 24 C65 24 70 26 75 30" fill="none" stroke="#d6bf4e" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="52" cy="30" r="2.2" fill="#12180a"/><circle cx="68" cy="30" r="2.2" fill="#12180a"/>
    <!-- 中缝与纵纹 -->
    <path d="M60 41 L60 102" stroke="#141a08" stroke-width="1.6" opacity=".85"/>
    <g fill="none" stroke="#141a08" stroke-width="1" opacity=".45">
      <path d="M50 46 C46 62 47 84 53 98"/><path d="M70 46 C74 62 73 84 67 98"/>
    </g>
    <!-- 流线型硬壳的长条高光 -->
    <path d="M44 44 C40 60 41 80 47 94" fill="none" stroke="#eafbc9" stroke-width="3" stroke-linecap="round" opacity=".35"/>
    <!-- 鞘翅下存的那口空气：银亮的一小片 -->
    <ellipse cx="60" cy="96" rx="9" ry="5" fill="#f2ffff" opacity=".6"/>
    <ellipse cx="60" cy="95" rx="4.4" ry="2.4" fill="#fff" opacity=".85"/>
  `,

  /* 通用甲虫（俯视）：伪装台用，颜色由页面通过 --art-a / --art-b 换。
     形状保持写实，这样「换背景后谁不见了」比较的是颜色而不是形状。 */
  'beetle-plain': `
    ${shadow(60, 110, 24, 4, 0.14)}
    <g stroke="var(--art-b, #3a2109)" stroke-width="3.4" stroke-linecap="round" fill="none">
      <path d="M44 44 C35 40 28 35 24 29"/><path d="M76 44 C85 40 92 35 96 29"/>
      <path d="M41 66 C31 66 23 68 17 72"/><path d="M79 66 C89 66 97 68 103 72"/>
      <path d="M44 86 C36 92 30 99 27 106"/><path d="M76 86 C84 92 90 99 93 106"/>
    </g>
    <path d="M54 18 C50 12 45 9 40 8" fill="none" stroke="var(--art-b, #3a2109)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M66 18 C70 12 75 9 80 8" fill="none" stroke="var(--art-b, #3a2109)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M52 20 C52 14 55 11 60 11 C65 11 68 14 68 20 L68 28 L52 28 Z" fill="var(--art-b, #3a2109)"/>
    <path d="M45 30 C45 24 51 21 60 21 C69 21 75 24 75 30 L77 42 L43 42 Z" fill="var(--art-b, #3a2109)"/>
    <path d="M60 40 C45 40 38 54 38 72 C38 92 47 104 60 104 Z" fill="var(--art-a, #7c4a12)"/>
    <path d="M60 40 C75 40 82 54 82 72 C82 92 73 104 60 104 Z" fill="var(--art-a, #7c4a12)"/>
    <path d="M60 40 L60 104" stroke="var(--art-b, #3a2109)" stroke-width="1.8"/>
    <path d="M60 40 C45 40 38 54 38 72 C38 92 47 104 60 104 C73 104 82 92 82 72 C82 54 75 40 60 40 Z"
          fill="none" stroke="var(--art-b, #3a2109)" stroke-width="2"/>
    <g fill="none" stroke="var(--art-b, #3a2109)" stroke-width="1" opacity=".4">
      <path d="M49 48 C45 62 46 84 51 97"/><path d="M71 48 C75 62 74 84 69 97"/>
    </g>
    <path d="M44 50 C41 64 41 82 45 95" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".26"/>
  `,

  /* 甲虫幼虫：白胖 C 形 + 褐色头壳。花盆里挖到的就是这个。 */
  'beetle-larva': `
    <linearGradient id="ag-lv-body" x1="0" y1="0" x2=".4" y2="1">
      <stop offset="0" stop-color="#fdf6e4"/><stop offset=".6" stop-color="#f0dfbd"/><stop offset="1" stop-color="#d8c294"/>
    </linearGradient>
    <!-- 腐叶土 -->
    <path d="M0 96 C20 90 40 94 60 98 C82 102 102 100 120 94 L120 120 L0 120 Z" fill="#6b4d2c" opacity=".5"/>
    <g fill="#4d3720" opacity=".5"><circle cx="18" cy="106" r="3"/><circle cx="46" cy="112" r="2.4"/><circle cx="88" cy="108" r="3.4"/></g>
    <!-- C 形身体：十来个体节，越往后越细 -->
    <path d="M74 24 C48 24 28 42 28 62 C28 84 46 98 66 98 C82 98 94 90 98 78
             C92 82 82 86 72 86 C56 86 44 76 44 62 C44 48 56 38 74 38 Z"
          fill="url(#ag-lv-body)" stroke="#c3a878" stroke-width="2"/>
    <g fill="none" stroke="#cdb488" stroke-width="1.8" opacity=".9">
      <path d="M56 27 C52 34 50 40 51 46"/><path d="M44 34 C40 42 38 48 39 54"/>
      <path d="M34 48 C31 56 31 62 33 68"/><path d="M34 74 C36 80 40 85 45 88"/>
      <path d="M48 84 C52 88 58 91 64 92"/><path d="M66 26 C63 32 62 38 63 43"/>
    </g>
    <!-- 气门：体侧一列小孔，正是「甲虫怎么呼吸」那张卡要讲的东西 -->
    <g fill="#b08c55" opacity=".8">
      <circle cx="56" cy="31" r="1.6"/><circle cx="45" cy="38" r="1.6"/><circle cx="36" cy="50" r="1.6"/>
      <circle cx="35" cy="70" r="1.6"/><circle cx="44" cy="83" r="1.6"/><circle cx="56" cy="90" r="1.6"/>
    </g>
    <!-- 头壳：褐色、硬，带一对小颚 -->
    <path d="M74 22 C86 22 94 28 94 36 C94 44 86 50 76 49 C70 48 66 42 67 34 C68 27 70 22 74 22 Z"
          fill="#9a6b2f" stroke="#6e4718" stroke-width="2"/>
    <circle cx="84" cy="32" r="2.2" fill="#3b2409"/>
    <path d="M92 42 L100 46 M92 46 L99 51" stroke="#6e4718" stroke-width="3" stroke-linecap="round"/>
    <!-- 三对短胸足，全挤在身体前段 -->
    <g stroke="#c9ab77" stroke-width="3.4" stroke-linecap="round" fill="none">
      <path d="M68 46 C66 53 63 58 59 61"/><path d="M58 40 C54 46 51 51 47 54"/><path d="M50 36 C45 41 42 45 38 48"/>
    </g>
  `
};

/* ======================================================================
   虫子放大镜（昆虫与近亲）
   这一组的画法都保留「头—胸—腹三段 + 六条腿长在胸部」的可数性：
   页面要教孩子数腿和数体段，写实不能把这两件事糊掉。
   ====================================================================== */

/* 蚂蚁：识别特征是肘状（折一下的）触角和极细的腰。 */
ART['ant'] = `
  <linearGradient id="ag-an-body" x1=".2" y1="0" x2=".8" y2="1">
    <stop offset="0" stop-color="#a4532a"/><stop offset=".55" stop-color="#6d3116"/><stop offset="1" stop-color="#38180a"/>
  </linearGradient>
  ${shadow(60, 112, 26, 4, 0.14)}
  <!-- 六条细长的腿，全部长在中间那一段（胸） -->
  <g fill="none" stroke="#3d1d0c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48 46 L26 30 L12 38"/><path d="M46 58 L20 58 L6 68"/><path d="M48 68 L24 82 L14 96"/>
    <path d="M72 46 L94 30 L108 38"/><path d="M74 58 L100 58 L114 68"/><path d="M72 68 L96 82 L106 96"/>
  </g>
  <!-- 肘状触角：先斜向外，再折向前上方 -->
  <g fill="none" stroke="#3d1d0c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M52 22 L36 14 L30 2"/><path d="M68 22 L84 14 L90 2"/>
  </g>
  <!-- 腹（后体）：饱满的水滴，最大的一段 -->
  <path d="M60 70 C46 70 38 82 38 94 C38 106 48 114 60 114 C72 114 82 106 82 94 C82 82 74 70 60 70 Z"
        fill="url(#ag-an-body)" stroke="#2b1207" stroke-width="2"/>
  <g fill="none" stroke="#2b1207" stroke-width="1.4" opacity=".45">
    <path d="M42 86 C52 90 68 90 78 86"/><path d="M40 96 C51 101 69 101 80 96"/><path d="M44 106 C52 109 68 109 76 106"/>
  </g>
  <!-- 细腰：蚂蚁与其他昆虫最好认的差别 -->
  <path d="M55 62 L65 62 L64 72 L56 72 Z" fill="#4a2210" stroke="#2b1207" stroke-width="1.6"/>
  <!-- 胸（中体）：腿都从这里出来 -->
  <path d="M60 36 C50 36 45 44 46 54 C47 62 53 66 60 66 C67 66 73 62 74 54 C75 44 70 36 60 36 Z"
        fill="url(#ag-an-body)" stroke="#2b1207" stroke-width="2"/>
  <!-- 头：略呈心形，一对大颚 -->
  <path d="M60 8 C48 8 41 16 41 26 C41 34 49 40 60 40 C71 40 79 34 79 26 C79 16 72 8 60 8 Z"
        fill="#8a4522" stroke="#2b1207" stroke-width="2"/>
  <ellipse cx="49" cy="22" rx="4" ry="5" fill="#1b0c04"/><ellipse cx="71" cy="22" rx="4" ry="5" fill="#1b0c04"/>
  <ellipse cx="48" cy="20" rx="1.4" ry="1.8" fill="#e0c39a" opacity=".8"/>
  <path d="M52 38 C48 44 44 47 40 48 M68 38 C72 44 76 47 80 48" fill="none" stroke="#2b1207" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M52 14 C56 18 64 18 68 14" fill="none" stroke="#c98352" stroke-width="2" opacity=".5"/>
`;

/* 蝴蝶（黑脉金斑蝶配色）：橙底 + 黑脉 + 黑边白点，是最容易被认出的一种蝶。 */
ART['butterfly'] = `
  <linearGradient id="ag-bf-wing" x1=".2" y1="0" x2=".8" y2="1">
    <stop offset="0" stop-color="#ff9b3d"/><stop offset=".6" stop-color="#ef6c14"/><stop offset="1" stop-color="#c14e08"/>
  </linearGradient>
  ${shadow(60, 114, 22, 3.5, 0.1)}
  <!-- 后翅（先画，被前翅压住一部分） -->
  <path d="M56 62 C40 66 20 76 14 92 C10 104 22 110 36 106 C48 102 54 88 57 74 Z"
        fill="url(#ag-bf-wing)" stroke="#241408" stroke-width="2.6"/>
  <path d="M64 62 C80 66 100 76 106 92 C110 104 98 110 84 106 C72 102 66 88 63 74 Z"
        fill="url(#ag-bf-wing)" stroke="#241408" stroke-width="2.6"/>
  <!-- 前翅：三角形，外缘一条黑带 -->
  <path d="M56 56 C44 30 26 12 14 12 C4 12 4 30 12 48 C20 64 40 66 56 64 Z"
        fill="url(#ag-bf-wing)" stroke="#241408" stroke-width="2.6"/>
  <path d="M64 56 C76 30 94 12 106 12 C116 12 116 30 108 48 C100 64 80 66 64 64 Z"
        fill="url(#ag-bf-wing)" stroke="#241408" stroke-width="2.6"/>
  <!-- 黑脉：翅上的脉络，蝶翅最显眼的图案 -->
  <g fill="none" stroke="#241408" stroke-width="2.2" opacity=".9">
    <path d="M54 58 C40 46 26 30 16 18"/><path d="M54 60 C40 52 24 42 10 34"/><path d="M55 62 C42 60 24 56 8 54"/>
    <path d="M66 58 C80 46 94 30 104 18"/><path d="M66 60 C80 52 96 42 110 34"/><path d="M65 62 C78 60 96 56 112 54"/>
    <path d="M57 70 C48 78 34 88 22 96"/><path d="M57 76 C50 86 40 96 32 102"/>
    <path d="M63 70 C72 78 86 88 98 96"/><path d="M63 76 C70 86 80 96 88 102"/>
  </g>
  <!-- 黑色外缘 + 一排白点 -->
  <path d="M14 12 C4 12 4 30 12 48 C7 44 2 30 4 20 C5 14 9 12 14 12 Z" fill="#241408"/>
  <path d="M106 12 C116 12 116 30 108 48 C113 44 118 30 116 20 C115 14 111 12 106 12 Z" fill="#241408"/>
  <path d="M14 92 C10 104 22 110 36 106 C24 108 16 104 16 96 Z" fill="#241408"/>
  <path d="M106 92 C110 104 98 110 84 106 C96 108 104 104 104 96 Z" fill="#241408"/>
  <g fill="#fff8ec">
    <circle cx="8" cy="24" r="2"/><circle cx="9" cy="34" r="2"/><circle cx="12" cy="43" r="1.8"/>
    <circle cx="112" cy="24" r="2"/><circle cx="111" cy="34" r="2"/><circle cx="108" cy="43" r="1.8"/>
    <circle cx="20" cy="100" r="1.8"/><circle cx="29" cy="104" r="1.8"/>
    <circle cx="100" cy="100" r="1.8"/><circle cx="91" cy="104" r="1.8"/>
  </g>
  <!-- 六条细足，都长在胸部 -->
  <g fill="none" stroke="#241408" stroke-width="2.4" stroke-linecap="round">
    <path d="M55 66 L46 78 L40 84"/><path d="M57 70 L52 84 L48 92"/>
    <path d="M65 66 L74 78 L80 84"/><path d="M63 70 L68 84 L72 92"/>
  </g>
  <!-- 身体：胸部毛绒、腹部分节 -->
  <path d="M60 66 C56 66 54 74 54 86 C54 98 57 106 60 106 C63 106 66 98 66 86 C66 74 64 66 60 66 Z"
        fill="#2e1a0c" stroke="#150a04" stroke-width="1.6"/>
  <g stroke="#6b4a2c" stroke-width="1.4" opacity=".8">
    <path d="M55 76 L65 76"/><path d="M55 84 L65 84"/><path d="M56 92 L64 92"/><path d="M57 99 L63 99"/>
  </g>
  <ellipse cx="60" cy="58" rx="8" ry="11" fill="#3b2410" stroke="#150a04" stroke-width="1.6"/>
  <ellipse cx="60" cy="45" rx="7" ry="6.5" fill="#2e1a0c" stroke="#150a04" stroke-width="1.6"/>
  <circle cx="56" cy="44" r="2.4" fill="#0d0603"/><circle cx="64" cy="44" r="2.4" fill="#0d0603"/>
  <!-- 棒状触角：末端有小球，这是「蝶」而不是「蛾」的判据 -->
  <path d="M56 40 C50 30 44 22 40 18" fill="none" stroke="#241408" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M64 40 C70 30 76 22 80 18" fill="none" stroke="#241408" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="39" cy="17" r="3.4" fill="#241408"/><circle cx="81" cy="17" r="3.4" fill="#241408"/>
  <!-- 卷起来的虹吸式口器 -->
  <path d="M60 51 C56 56 55 61 58 62 C61 63 62 59 60 57" fill="none" stroke="#241408" stroke-width="1.8" stroke-linecap="round"/>
`;

/* 蜜蜂：毛绒的胸、黑黄相间的腹、两对膜翅，后腿带花粉团。 */
ART['bee'] = `
  <linearGradient id="ag-be-abdo" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f7c948"/><stop offset="1" stop-color="#c98a12"/>
  </linearGradient>
  <linearGradient id="ag-be-wing" x1=".5" y1="0" x2=".2" y2="1">
    <stop offset="0" stop-color="#fbfdff" stop-opacity=".92"/><stop offset="1" stop-color="#cfe2f0" stop-opacity=".72"/>
  </linearGradient>
  ${shadow(60, 114, 22, 3.5, 0.1)}
  <!-- 两对膜翅：前翅大、后翅小，带细翅脉 -->
  <path d="M54 48 C36 34 12 34 8 48 C4 62 28 68 52 62 Z" fill="url(#ag-be-wing)" stroke="#8fadc4" stroke-width="1.8"/>
  <path d="M66 48 C84 34 108 34 112 48 C116 62 92 68 68 62 Z" fill="url(#ag-be-wing)" stroke="#8fadc4" stroke-width="1.8"/>
  <path d="M54 60 C40 56 22 60 20 70 C18 80 38 80 54 70 Z" fill="url(#ag-be-wing)" stroke="#8fadc4" stroke-width="1.6"/>
  <path d="M66 60 C80 56 98 60 100 70 C102 80 82 80 66 70 Z" fill="url(#ag-be-wing)" stroke="#8fadc4" stroke-width="1.6"/>
  <g fill="none" stroke="#8fadc4" stroke-width="1.1" opacity=".8">
    <path d="M50 56 C36 48 20 46 12 50"/><path d="M50 60 C38 56 22 56 14 58"/>
    <path d="M70 56 C84 48 100 46 108 50"/><path d="M70 60 C82 56 98 56 106 58"/>
  </g>
  <!-- 六条足；后足上带一团花粉 -->
  <g fill="none" stroke="#3d2a0a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M52 48 L38 40 L30 44"/><path d="M52 58 L36 60 L28 68"/><path d="M54 68 L40 82 L34 94"/>
    <path d="M68 48 L82 40 L90 44"/><path d="M68 58 L84 60 L92 68"/><path d="M66 68 L80 82 L86 94"/>
  </g>
  <ellipse cx="37" cy="86" rx="7" ry="6" fill="#e8b428" stroke="#a37a10" stroke-width="1.6"/>
  <ellipse cx="83" cy="86" rx="7" ry="6" fill="#e8b428" stroke="#a37a10" stroke-width="1.6"/>
  <!-- 腹部：黑黄相间的环带 -->
  <path d="M60 64 C50 64 44 74 44 88 C44 102 51 112 60 112 C69 112 76 102 76 88 C76 74 70 64 60 64 Z"
        fill="url(#ag-be-abdo)" stroke="#2b1d04" stroke-width="2"/>
  <path d="M45 76 C51 79 69 79 75 76 L74 84 C68 81 52 81 46 84 Z" fill="#241a06"/>
  <path d="M45.5 90 C52 93 68 93 74.5 90 L73 98 C67 95 53 95 47 98 Z" fill="#241a06"/>
  <path d="M50 104 C55 106 65 106 70 104 L66 110 C63 111 57 111 54 110 Z" fill="#241a06"/>
  <!-- 尾端的螫针 -->
  <path d="M60 112 L60 118" stroke="#241a06" stroke-width="2.4" stroke-linecap="round"/>
  <!-- 胸部：毛绒质感用一圈短毛表现 -->
  <ellipse cx="60" cy="52" rx="16" ry="15" fill="#a9701c" stroke="#2b1d04" stroke-width="2"/>
  <g stroke="#e6b45a" stroke-width="2" stroke-linecap="round" opacity=".85">
    <path d="M48 46 L43 42"/><path d="M50 58 L44 61"/><path d="M60 38 L60 33"/><path d="M70 46 L75 42"/>
    <path d="M70 58 L76 61"/><path d="M54 41 L50 36"/><path d="M66 41 L70 36"/><path d="M60 66 L60 70"/>
  </g>
  <!-- 头：一对大复眼 -->
  <path d="M60 20 C50 20 44 26 44 34 C44 42 51 47 60 47 C69 47 76 42 76 34 C76 26 70 20 60 20 Z"
        fill="#2b1d04" stroke="#160f02" stroke-width="1.8"/>
  <ellipse cx="49" cy="32" rx="5" ry="8" fill="#1a1206"/><ellipse cx="71" cy="32" rx="5" ry="8" fill="#1a1206"/>
  <ellipse cx="47.6" cy="29" rx="1.6" ry="2.4" fill="#c9b183" opacity=".75"/>
  <ellipse cx="69.6" cy="29" rx="1.6" ry="2.4" fill="#c9b183" opacity=".75"/>
  <path d="M54 18 C48 12 42 8 37 7" fill="none" stroke="#241a06" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M66 18 C72 12 78 8 83 7" fill="none" stroke="#241a06" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M60 46 L60 52" stroke="#160f02" stroke-width="2.4" stroke-linecap="round"/>
`;

/* 蜘蛛（园蛛）：8 条腿、2 段身体、8 只小眼。页面用它跟昆虫作对照。 */
ART['spider'] = `
  <radialGradient id="ag-sp-abdo" cx=".36" cy=".3" r=".8">
    <stop offset="0" stop-color="#c9a06a"/><stop offset=".55" stop-color="#8a5f33"/><stop offset="1" stop-color="#4a2f16"/>
  </radialGradient>
  <!-- 一角蛛网，说明这是蜘蛛而不是别的八足虫 -->
  <g fill="none" stroke="#a9b6c2" stroke-width="1.2" opacity=".55">
    <path d="M2 4 L58 56 M60 2 L60 40 M118 4 L64 56 M2 60 L44 60 M118 60 L78 60"/>
    <path d="M20 4 C34 18 40 34 40 52"/><path d="M100 4 C86 18 80 34 80 52"/>
    <path d="M8 14 C26 20 44 30 56 44"/><path d="M112 14 C94 20 76 30 64 44"/>
  </g>
  ${shadow(60, 114, 24, 4, 0.12)}
  <!-- 八条腿：四对，每条分三段并带刺毛。数得清是关键。 -->
  <g fill="none" stroke="#3b2513" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M50 52 L26 30 L8 36"/><path d="M50 60 L20 50 L2 60"/>
    <path d="M52 68 L24 74 L8 88"/><path d="M56 76 L36 92 L28 108"/>
    <path d="M70 52 L94 30 L112 36"/><path d="M70 60 L100 50 L118 60"/>
    <path d="M68 68 L96 74 L112 88"/><path d="M64 76 L84 92 L92 108"/>
  </g>
  <g stroke="#3b2513" stroke-width="1.6" stroke-linecap="round">
    <path d="M38 42 L34 38 M32 47 L27 44 M36 72 L32 76 M46 86 L42 90"/>
    <path d="M82 42 L86 38 M88 47 L93 44 M84 72 L88 76 M74 86 L78 90"/>
  </g>
  <!-- 腹部：又大又圆，带叶状花纹 -->
  <path d="M60 62 C44 62 34 76 34 92 C34 106 46 116 60 116 C74 116 86 106 86 92 C86 76 76 62 60 62 Z"
        fill="url(#ag-sp-abdo)" stroke="#301d0c" stroke-width="2"/>
  <path d="M60 68 C54 76 52 86 54 96 C56 106 60 110 60 110 C60 110 64 106 66 96 C68 86 66 76 60 68 Z"
        fill="#f2e2c2" opacity=".75"/>
  <g fill="#3b2513" opacity=".7">
    <circle cx="48" cy="84" r="2"/><circle cx="72" cy="84" r="2"/><circle cx="46" cy="98" r="1.8"/>
    <circle cx="74" cy="98" r="1.8"/><circle cx="60" cy="80" r="1.8"/>
  </g>
  <!-- 头胸部：8 条腿全长在这一段 -->
  <path d="M60 34 C49 34 42 42 42 52 C42 62 50 68 60 68 C70 68 78 62 78 52 C78 42 71 34 60 34 Z"
        fill="#7a5228" stroke="#301d0c" stroke-width="2"/>
  <!-- 八只小眼：两排 -->
  <g fill="#150c04">
    <circle cx="52" cy="42" r="2.2"/><circle cx="57" cy="40" r="2.4"/><circle cx="63" cy="40" r="2.4"/><circle cx="68" cy="42" r="2.2"/>
    <circle cx="54" cy="47" r="1.6"/><circle cx="59" cy="46" r="1.6"/><circle cx="61" cy="46" r="1.6"/><circle cx="66" cy="47" r="1.6"/>
  </g>
  <!-- 螯肢与触肢 -->
  <path d="M54 54 C52 60 52 64 54 66 M66 54 C68 60 68 64 66 66" fill="none" stroke="#301d0c" stroke-width="3" stroke-linecap="round"/>
  <path d="M46 50 C40 54 36 58 34 62" fill="none" stroke="#3b2513" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M74 50 C80 54 84 58 86 62" fill="none" stroke="#3b2513" stroke-width="3.4" stroke-linecap="round"/>
`;

/* 蜻蜓：巨大的复眼、极细长的分节腹部、四片带密翅脉的长翅。 */
ART['dragonfly'] = `
  <linearGradient id="ag-df-abdo" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2fa8c8"/><stop offset=".6" stop-color="#1c6f8c"/><stop offset="1" stop-color="#123f52"/>
  </linearGradient>
  <linearGradient id="ag-df-wing" x1=".5" y1="0" x2=".1" y2="1">
    <stop offset="0" stop-color="#fdffff" stop-opacity=".9"/><stop offset="1" stop-color="#cfe8f2" stop-opacity=".62"/>
  </linearGradient>
  ${shadow(60, 116, 18, 3, 0.1)}
  <!-- 四片长翅：前后各一对，形状不同 -->
  <path d="M54 40 C38 24 12 16 6 26 C0 38 26 50 52 52 Z" fill="url(#ag-df-wing)" stroke="#7fa9bd" stroke-width="1.7"/>
  <path d="M54 52 C38 48 12 52 8 64 C4 76 30 70 54 60 Z" fill="url(#ag-df-wing)" stroke="#7fa9bd" stroke-width="1.7"/>
  <path d="M66 40 C82 24 108 16 114 26 C120 38 94 50 68 52 Z" fill="url(#ag-df-wing)" stroke="#7fa9bd" stroke-width="1.7"/>
  <path d="M66 52 C82 48 108 52 112 64 C116 76 90 70 66 60 Z" fill="url(#ag-df-wing)" stroke="#7fa9bd" stroke-width="1.7"/>
  <!-- 翅脉：蜻蜓的翅是网格状的，密而规则 -->
  <g fill="none" stroke="#7fa9bd" stroke-width=".9" opacity=".85">
    <path d="M50 44 C34 34 16 26 8 26"/><path d="M50 48 C34 42 16 36 7 32"/><path d="M28 30 C30 38 32 44 34 50"/><path d="M16 28 C18 34 20 40 22 46"/>
    <path d="M50 56 C34 52 16 54 9 62"/><path d="M28 52 C28 58 29 63 30 67"/><path d="M16 55 C16 60 17 64 18 68"/>
    <path d="M70 44 C86 34 104 26 112 26"/><path d="M70 48 C86 42 104 36 113 32"/><path d="M92 30 C90 38 88 44 86 50"/><path d="M104 28 C102 34 100 40 98 46"/>
    <path d="M70 56 C86 52 104 54 111 62"/><path d="M92 52 C92 58 91 63 90 67"/><path d="M104 55 C104 60 103 64 102 68"/>
  </g>
  <!-- 六条短足，抓握式，全部朝前 -->
  <g fill="none" stroke="#123f52" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M54 50 L44 58 L38 60"/><path d="M55 56 L47 66 L42 70"/><path d="M57 60 L52 72 L49 78"/>
    <path d="M66 50 L76 58 L82 60"/><path d="M65 56 L73 66 L78 70"/><path d="M63 60 L68 72 L71 78"/>
  </g>
  <!-- 腹部：细长分节，一直伸到画面下缘 -->
  <path d="M55 58 L65 58 L63 112 C63 116 57 116 57 112 Z" fill="url(#ag-df-abdo)" stroke="#0e3040" stroke-width="1.8"/>
  <g stroke="#0e3040" stroke-width="1.4" opacity=".75">
    <path d="M55.6 66 L64.4 66"/><path d="M56 74 L64 74"/><path d="M56.2 82 L63.8 82"/>
    <path d="M56.5 90 L63.5 90"/><path d="M56.8 98 L63.2 98"/><path d="M57 106 L63 106"/>
  </g>
  <path d="M58 62 L58 108" stroke="#7fd6ea" stroke-width="1.6" opacity=".45"/>
  <!-- 胸部：短而结实 -->
  <path d="M60 34 C52 34 48 42 48 50 C48 58 53 62 60 62 C67 62 72 58 72 50 C72 42 68 34 60 34 Z"
        fill="#1f7a95" stroke="#0e3040" stroke-width="2"/>
  <path d="M53 40 C52 48 53 56 56 60" fill="none" stroke="#8ee0f2" stroke-width="2" opacity=".5"/>
  <!-- 头：几乎全被两只巨大的复眼占满，这是蜻蜓最好认的地方 -->
  <path d="M42 22 C42 12 50 6 60 6 C70 6 78 12 78 22 C78 32 70 38 60 38 C50 38 42 32 42 22 Z"
        fill="#1c5e75" stroke="#0e3040" stroke-width="2"/>
  <ellipse cx="50" cy="20" rx="10" ry="12" fill="#2ea6c6"/><ellipse cx="70" cy="20" rx="10" ry="12" fill="#2ea6c6"/>
  <g fill="#8fe3f5" opacity=".55"><ellipse cx="46" cy="15" rx="3.4" ry="4.4"/><ellipse cx="66" cy="15" rx="3.4" ry="4.4"/></g>
  <g fill="#0e3040" opacity=".3">
    <path d="M42 20 L78 20 M44 26 L76 26 M46 13 L74 13" stroke="#0e3040" stroke-width=".8" fill="none"/>
  </g>
  <path d="M54 36 C54 40 66 40 66 36" fill="#0e3040"/>
`;

/* 毛虫（幼虫）：分节的绿身体 + 腹足，是「完全变态」第二步的样子。 */
ART['caterpillar'] = `
  <linearGradient id="ag-ct-body" x1="0" y1="0" x2=".3" y2="1">
    <stop offset="0" stop-color="#9ede54"/><stop offset=".55" stop-color="#6bb32e"/><stop offset="1" stop-color="#3f7a15"/>
  </linearGradient>
  <!-- 一片被啃过的叶子 -->
  <path d="M4 92 C24 74 60 68 96 76 C112 80 118 88 116 98 C92 110 36 112 4 92 Z" fill="#4f9c2e" opacity=".55"/>
  <path d="M10 94 C36 84 70 82 104 90" fill="none" stroke="#36701c" stroke-width="1.6" opacity=".6"/>
  <path d="M74 74 C82 70 88 72 90 78 C84 80 78 79 74 74 Z" fill="#fffaf0" opacity=".5"/>
  ${shadow(60, 96, 34, 4, 0.14)}
  <!-- 腹足：一对一对的小吸盘脚 -->
  <g fill="#4a8a1c">
    <ellipse cx="30" cy="90" rx="4" ry="5"/><ellipse cx="44" cy="92" rx="4" ry="5"/>
    <ellipse cx="58" cy="92" rx="4" ry="5"/><ellipse cx="72" cy="90" rx="4" ry="5"/><ellipse cx="86" cy="86" rx="4" ry="5"/>
  </g>
  <!-- 身体：一节一节的圆环，越往后越细 -->
  <path d="M22 74 C22 62 30 56 40 56 L86 56 C96 56 102 63 102 72 C102 82 94 88 84 88 L40 88 C30 88 22 84 22 74 Z"
        fill="url(#ag-ct-body)" stroke="#2f5c10" stroke-width="2"/>
  <g fill="none" stroke="#2f5c10" stroke-width="1.8" opacity=".55">
    <path d="M38 57 C34 66 34 78 38 87"/><path d="M52 56 C48 66 48 78 52 88"/>
    <path d="M66 56 C62 66 62 78 66 88"/><path d="M80 56 C76 66 76 78 80 88"/>
  </g>
  <!-- 体侧的气门与背上的斑纹 -->
  <g fill="#2f5c10" opacity=".7">
    <circle cx="45" cy="80" r="2"/><circle cx="59" cy="80" r="2"/><circle cx="73" cy="80" r="2"/><circle cx="87" cy="78" r="2"/>
  </g>
  <g fill="#f4e06a" opacity=".85">
    <ellipse cx="45" cy="63" rx="4.5" ry="3"/><ellipse cx="59" cy="62" rx="4.5" ry="3"/>
    <ellipse cx="73" cy="62" rx="4.5" ry="3"/><ellipse cx="87" cy="64" rx="4" ry="2.6"/>
  </g>
  <!-- 背上的刚毛 -->
  <g stroke="#2f5c10" stroke-width="1.6" stroke-linecap="round">
    <path d="M40 56 L37 46"/><path d="M54 55 L52 45"/><path d="M68 55 L67 45"/><path d="M82 56 L83 46"/>
  </g>
  <!-- 头壳：褐色、比身体硬 -->
  <circle cx="22" cy="72" r="16" fill="#8a5a22" stroke="#4f3110" stroke-width="2"/>
  <circle cx="16" cy="67" r="3.2" fill="#201204"/><circle cx="15" cy="66" r="1.1" fill="#f0dcb4" opacity=".8"/>
  <circle cx="24" cy="65" r="3.2" fill="#201204"/><circle cx="23" cy="64" r="1.1" fill="#f0dcb4" opacity=".8"/>
  <path d="M12 80 C16 84 24 84 28 80" fill="none" stroke="#4f3110" stroke-width="2.2" stroke-linecap="round"/>
  <!-- 三对真正的胸足 -->
  <g fill="none" stroke="#2f5c10" stroke-width="2.6" stroke-linecap="round">
    <path d="M34 86 L31 94"/><path d="M40 87 L38 95"/><path d="M27 84 L23 92"/>
  </g>
`;

/* 蛹（蝶蛹）：挂在枝上的一枚蛹，带金色缘线。完全变态第三步。 */
ART['pupa'] = `
  <linearGradient id="ag-pp-body" x1=".2" y1="0" x2=".8" y2="1">
    <stop offset="0" stop-color="#a8d86b"/><stop offset=".55" stop-color="#6fae38"/><stop offset="1" stop-color="#3f7318"/>
  </linearGradient>
  <!-- 枝条 -->
  <path d="M2 18 C30 12 70 14 118 22" fill="none" stroke="#7a5527" stroke-width="9" stroke-linecap="round"/>
  <path d="M2 18 C30 12 70 14 118 22" fill="none" stroke="#a4762f" stroke-width="3.4" stroke-linecap="round" opacity=".6"/>
  <!-- 丝垫与悬挂点 -->
  <path d="M60 22 L60 32" stroke="#e8dcbf" stroke-width="3" stroke-linecap="round"/>
  <path d="M52 26 C56 30 64 30 68 26" fill="none" stroke="#e8dcbf" stroke-width="2" stroke-linecap="round"/>
  <!-- 蛹体：上宽下尖，中间一道折角 -->
  <path d="M60 30 C46 32 38 44 38 60 C38 78 48 96 60 106 C72 96 82 78 82 60 C82 44 74 32 60 30 Z"
        fill="url(#ag-pp-body)" stroke="#2f5c10" stroke-width="2"/>
  <path d="M39 56 C48 62 72 62 81 56" fill="none" stroke="#2f5c10" stroke-width="2" opacity=".5"/>
  <!-- 里面已经成形的翅与腹节的轮廓 -->
  <g fill="none" stroke="#2f5c10" stroke-width="1.6" opacity=".45">
    <path d="M52 38 C46 48 45 60 48 70"/><path d="M68 38 C74 48 75 60 72 70"/>
    <path d="M46 76 C54 80 66 80 74 76"/><path d="M50 86 C56 89 64 89 70 86"/><path d="M54 95 C58 97 62 97 66 95"/>
  </g>
  <!-- 金色缘线：真实蝶蛹上那圈会反光的小金点 -->
  <g fill="#f3cf52">
    <circle cx="42" cy="55" r="2"/><circle cx="49" cy="58" r="1.8"/><circle cx="60" cy="59" r="2"/>
    <circle cx="71" cy="58" r="1.8"/><circle cx="78" cy="55" r="2"/>
  </g>
  <path d="M45 40 C42 50 41 60 43 70" fill="none" stroke="#e9f7c6" stroke-width="3" stroke-linecap="round" opacity=".45"/>
`;

/* 卵：叶背上一小丛珍珠色的卵，完全变态第一步。 */
ART['insect-eggs'] = `
  <radialGradient id="ag-eg-egg" cx=".35" cy=".28" r=".8">
    <stop offset="0" stop-color="#fffdf5"/><stop offset=".6" stop-color="#f3e6c8"/><stop offset="1" stop-color="#cdb98d"/>
  </radialGradient>
  <!-- 叶背：主脉在中间 -->
  <path d="M8 96 C14 52 44 20 96 14 C104 46 88 88 34 104 C22 106 12 102 8 96 Z" fill="#5aa63a"/>
  <path d="M10 95 C28 70 58 40 95 15" fill="none" stroke="#3d7d26" stroke-width="3" stroke-linecap="round"/>
  <g fill="none" stroke="#3d7d26" stroke-width="1.6" opacity=".7">
    <path d="M26 84 C34 76 40 64 42 52"/><path d="M42 66 C52 58 60 46 64 34"/><path d="M58 50 C68 42 76 32 80 24"/>
  </g>
  ${shadow(62, 82, 22, 4, 0.12)}
  <!-- 一丛卵：椭球、顶端有小尖，表面带纵棱 -->
  <g stroke="#a89468" stroke-width="1.4">
    <ellipse cx="46" cy="70" rx="7" ry="9" fill="url(#ag-eg-egg)"/>
    <ellipse cx="60" cy="66" rx="7.5" ry="9.5" fill="url(#ag-eg-egg)"/>
    <ellipse cx="74" cy="68" rx="7" ry="9" fill="url(#ag-eg-egg)"/>
    <ellipse cx="53" cy="82" rx="6.5" ry="8.5" fill="url(#ag-eg-egg)"/>
    <ellipse cx="67" cy="81" rx="6.5" ry="8.5" fill="url(#ag-eg-egg)"/>
    <ellipse cx="60" cy="52" rx="6" ry="7.5" fill="url(#ag-eg-egg)"/>
  </g>
  <g fill="none" stroke="#bda878" stroke-width=".9" opacity=".9">
    <path d="M46 62 L46 79 M42 64 L42 76 M50 64 L50 76"/>
    <path d="M60 57 L60 75 M56 59 L56 73 M64 59 L64 73"/>
    <path d="M74 60 L74 77 M70 62 L70 74 M78 62 L78 74"/>
  </g>
  <g fill="#fffef8" opacity=".8">
    <ellipse cx="43" cy="65" rx="1.8" ry="2.6"/><ellipse cx="57" cy="61" rx="2" ry="2.8"/>
    <ellipse cx="71" cy="63" rx="1.8" ry="2.6"/><ellipse cx="58" cy="48" rx="1.6" ry="2.2"/>
  </g>
`;

/* ======================================================================
   太空图鉴
   球体的立体感靠三层叠出来：底色渐变（含临边昏暗）→ 表面特征（被圆盘裁剪）
   → 明暗界线阴影。只用一个纯色圆是画不出「一颗星球」的。
   页面自己负责星空底和星点，所以这里的图形背景保持透明。
   ====================================================================== */

/* 恒星与行星共用的阴影层：光从左上来，右下压暗。 */
const limb = (id, r = 40) => `
  <radialGradient id="${id}" cx=".33" cy=".28" r=".92">
    <stop offset=".45" stop-color="#000" stop-opacity="0"/>
    <stop offset=".82" stop-color="#000" stop-opacity=".22"/>
    <stop offset="1" stop-color="#000" stop-opacity=".62"/>
  </radialGradient>
  <circle cx="60" cy="60" r="${r}" fill="url(#${id})"/>`;

ART['sun'] = `
  <radialGradient id="ag-su-core" cx=".42" cy=".38" r=".7">
    <stop offset="0" stop-color="#fffbe8"/><stop offset=".35" stop-color="#ffe066"/>
    <stop offset=".78" stop-color="#ffa514"/><stop offset="1" stop-color="#e2650a"/>
  </radialGradient>
  <radialGradient id="ag-su-corona" cx=".5" cy=".5" r=".5">
    <stop offset=".58" stop-color="#ffb527" stop-opacity=".55"/>
    <stop offset=".78" stop-color="#ff8a1e" stop-opacity=".26"/>
    <stop offset="1" stop-color="#ff6a10" stop-opacity="0"/>
  </radialGradient>
  <clipPath id="ag-su-clip"><circle cx="60" cy="60" r="35"/></clipPath>
  <!-- 日冕：外面那层散开的光，不是几根直线 -->
  <circle cx="60" cy="60" r="58" fill="url(#ag-su-corona)"/>
  <!-- 日珥：边缘窜出去的火舌 -->
  <g fill="#ff8c1a" opacity=".8">
    <path d="M60 26 C56 16 62 8 70 6 C66 14 68 20 64 26 Z"/>
    <path d="M91 42 C100 36 108 40 110 46 C102 44 96 48 92 47 Z"/>
    <path d="M31 74 C22 78 14 74 12 68 C20 70 26 66 30 68 Z"/>
    <path d="M60 94 C62 104 56 111 48 113 C53 105 51 99 55 94 Z"/>
  </g>
  <circle cx="60" cy="60" r="35" fill="url(#ag-su-core)"/>
  <g clip-path="url(#ag-su-clip)">
    <!-- 米粒组织：表面不是光滑的，是一颗颗对流单元 -->
    <g fill="#fff3bd" opacity=".3">
      <circle cx="42" cy="42" r="6"/><circle cx="56" cy="34" r="5"/><circle cx="72" cy="44" r="5.5"/>
      <circle cx="38" cy="60" r="5"/><circle cx="80" cy="62" r="4.5"/><circle cx="50" cy="76" r="5.5"/>
      <circle cx="68" cy="82" r="5"/><circle cx="60" cy="56" r="6"/>
    </g>
    <g fill="#e07a0c" opacity=".28">
      <circle cx="48" cy="34" r="4"/><circle cx="66" cy="36" r="3.4"/><circle cx="34" cy="52" r="3.6"/>
      <circle cx="84" cy="52" r="3.4"/><circle cx="42" cy="84" r="3.6"/><circle cx="78" cy="76" r="3.4"/>
    </g>
    <!-- 黑子：中间本影深、外圈半影浅，不是一个纯色圆点 -->
    <g>
      <ellipse cx="47" cy="52" rx="9" ry="6.5" fill="#c2540a" opacity=".75" transform="rotate(-18 47 52)"/>
      <ellipse cx="47" cy="52" rx="4.6" ry="3.2" fill="#5d2603" transform="rotate(-18 47 52)"/>
      <ellipse cx="73" cy="72" rx="6.5" ry="4.6" fill="#c2540a" opacity=".7" transform="rotate(14 73 72)"/>
      <ellipse cx="73" cy="72" rx="3.2" ry="2.2" fill="#5d2603" transform="rotate(14 73 72)"/>
      <ellipse cx="62" cy="38" rx="4" ry="2.8" fill="#c2540a" opacity=".55"/>
    </g>
  </g>
  <circle cx="60" cy="60" r="35" fill="none" stroke="#ffd166" stroke-width="1.6" opacity=".7"/>
`;

ART['mercury'] = `
  <radialGradient id="ag-me-base" cx=".34" cy=".3" r=".8">
    <stop offset="0" stop-color="#d5cfc6"/><stop offset=".6" stop-color="#a49c92"/><stop offset="1" stop-color="#6d675f"/>
  </radialGradient>
  <clipPath id="ag-me-clip"><circle cx="60" cy="60" r="40"/></clipPath>
  <circle cx="60" cy="60" r="40" fill="url(#ag-me-base)"/>
  <g clip-path="url(#ag-me-clip)">
    <!-- 撞击坑：一圈亮的坑缘 + 里面的暗坑底，密密麻麻。水星最大的特征就是「全是坑」 -->
    <g fill="#8b847a" opacity=".85">
      <circle cx="45" cy="42" r="11"/><circle cx="74" cy="52" r="8"/><circle cx="52" cy="72" r="9"/>
      <circle cx="78" cy="80" r="6"/><circle cx="33" cy="60" r="6"/><circle cx="64" cy="34" r="5"/>
      <circle cx="40" cy="86" r="5"/><circle cx="88" cy="64" r="4.5"/><circle cx="62" cy="92" r="4"/>
      <circle cx="26" cy="44" r="3.6"/><circle cx="70" cy="66" r="3.4"/><circle cx="55" cy="55" r="4"/>
    </g>
    <g fill="none" stroke="#e0dad1" stroke-width="1.5" opacity=".55">
      <circle cx="45" cy="42" r="11"/><circle cx="74" cy="52" r="8"/><circle cx="52" cy="72" r="9"/>
      <circle cx="78" cy="80" r="6"/><circle cx="33" cy="60" r="6"/><circle cx="64" cy="34" r="5"/>
      <circle cx="40" cy="86" r="5"/><circle cx="88" cy="64" r="4.5"/>
    </g>
    <g fill="#5f5952" opacity=".5">
      <circle cx="45" cy="43" r="6"/><circle cx="74" cy="53" r="4.4"/><circle cx="52" cy="73" r="5"/><circle cx="33" cy="61" r="3.2"/>
    </g>
    <!-- 皱脊：水星冷却收缩时挤出来的长坎 -->
    <g fill="none" stroke="#7d766d" stroke-width="2" opacity=".6">
      <path d="M24 72 C38 78 56 82 76 78"/><path d="M30 34 C44 28 62 26 80 30"/>
    </g>
  </g>
  ${limb('ag-me-sh')}
`;

ART['venus'] = `
  <radialGradient id="ag-ve-base" cx=".34" cy=".3" r=".82">
    <stop offset="0" stop-color="#fff4d6"/><stop offset=".55" stop-color="#e8c887"/><stop offset="1" stop-color="#a8813d"/>
  </radialGradient>
  <clipPath id="ag-ve-clip"><circle cx="60" cy="60" r="40"/></clipPath>
  <!-- 大气比星球本体大一圈：金星整颗被厚云裹着，看不到地面 -->
  <circle cx="60" cy="60" r="44" fill="#f3dda8" opacity=".3"/>
  <circle cx="60" cy="60" r="40" fill="url(#ag-ve-base)"/>
  <g clip-path="url(#ag-ve-clip)">
    <!-- 云带：向一侧倾斜的 Y 形涡旋，是金星云顶的真实样子 -->
    <g fill="none" stroke="#fff8e4" stroke-width="6" stroke-linecap="round" opacity=".45">
      <path d="M20 42 C38 34 62 34 84 42"/><path d="M22 56 C42 50 66 52 92 60"/>
      <path d="M24 72 C44 68 68 72 90 80"/><path d="M32 88 C50 86 70 90 84 96"/>
    </g>
    <g fill="none" stroke="#c9a25c" stroke-width="4" stroke-linecap="round" opacity=".45">
      <path d="M20 48 C40 42 64 44 88 52"/><path d="M22 64 C44 60 68 64 92 72"/><path d="M28 80 C48 78 70 82 86 88"/>
    </g>
    <path d="M52 24 C56 40 54 56 44 68 C56 62 64 48 62 24 Z" fill="#fff8e4" opacity=".3"/>
  </g>
  ${limb('ag-ve-sh')}
`;

ART['earth'] = `
  <radialGradient id="ag-ea-ocean" cx=".34" cy=".3" r=".82">
    <stop offset="0" stop-color="#5fb3e8"/><stop offset=".55" stop-color="#1d6fbd"/><stop offset="1" stop-color="#0a3a75"/>
  </radialGradient>
  <radialGradient id="ag-ea-air" cx=".5" cy=".5" r=".5">
    <stop offset=".88" stop-color="#8fd0ff" stop-opacity="0"/>
    <stop offset=".96" stop-color="#8fd0ff" stop-opacity=".55"/>
    <stop offset="1" stop-color="#8fd0ff" stop-opacity="0"/>
  </radialGradient>
  <clipPath id="ag-ea-clip"><circle cx="60" cy="60" r="40"/></clipPath>
  <circle cx="60" cy="60" r="40" fill="url(#ag-ea-ocean)"/>
  <g clip-path="url(#ag-ea-clip)">
    <!-- 陆地：这一面看到的是非洲＋欧亚，左缘露出一点美洲。
         轮廓按真实大陆画（非洲上宽下尖、阿拉伯半岛的楔形、印度的倒三角），
         而不是随手点几块绿斑 —— 认不认得出「这是地球」全靠这几笔。 -->
    <g fill="#3d8a41">
      <path d="M52 47 C60 44 70 45 76 49 C80 53 79 60 76 64 C73 69 70 74 68 80
               C66 87 63 92 60 93 C57 90 56 84 55 78 C53 71 49 63 49 56 C49 51 50 48 52 47 Z"/>
      <path d="M52 39 C58 35 66 35 72 37 C70 41 64 43 58 43 C54 43 52 41 52 39 Z"/>
      <path d="M64 31 C76 27 92 28 100 34 C96 39 88 42 80 43 C74 44 68 41 64 37 Z"/>
      <path d="M78 47 C84 46 88 49 88 54 C84 56 80 54 78 51 Z"/>
      <path d="M88 49 C93 50 96 54 95 59 C92 65 89 68 87 69 C85 63 85 54 88 49 Z"/>
      <path d="M26 38 C33 36 37 41 37 47 C36 53 32 57 29 60 C25 54 23 44 26 38 Z"/>
      <path d="M30 66 C36 66 39 72 38 80 C37 89 33 96 30 99 C26 92 25 74 30 66 Z"/>
      <path d="M92 78 C98 78 101 83 100 88 C95 89 91 85 90 81 Z"/>
    </g>
    <!-- 沙漠与高原：撒哈拉、阿拉伯和中亚是黄的，陆地不是一块纯绿 -->
    <g fill="#c9a758">
      <path d="M52 47 C60 44 70 45 76 49 C78 52 78 55 76 57 C68 57 58 54 52 51 Z" opacity=".85"/>
      <path d="M78 47 C84 46 88 49 88 54 C84 55 80 53 78 50 Z" opacity=".85"/>
      <path d="M68 32 C80 29 92 31 99 35 C92 39 80 40 70 37 Z" opacity=".5"/>
    </g>
    <!-- 极地冰盖 -->
    <path d="M20 26 C34 18 86 18 100 26 C84 32 36 32 20 26 Z" fill="#f2fbff" opacity=".9"/>
    <path d="M26 96 C40 90 80 90 94 96 C80 102 40 102 26 96 Z" fill="#f2fbff" opacity=".85"/>
    <!-- 云系：几条旋着的细云带。云是薄的，画厚了会把大陆整块盖掉。 -->
    <g fill="none" stroke="#fdffff" stroke-linecap="round">
      <path d="M22 54 C32 47 46 47 54 52" stroke-width="4" opacity=".45"/>
      <path d="M64 68 C76 63 90 65 96 71" stroke-width="4.5" opacity=".42"/>
      <path d="M36 81 C46 76 58 78 64 84" stroke-width="4" opacity=".42"/>
      <path d="M70 40 C80 36 92 38 97 43" stroke-width="3.4" opacity=".38"/>
      <path d="M24 68 C32 65 40 67 44 71" stroke-width="3" opacity=".38"/>
      <path d="M46 90 C56 86 68 88 74 92" stroke-width="3" opacity=".32"/>
    </g>
    <!-- 一个温带气旋的旋涡：地球最有生气的细节 -->
    <path d="M33 44 C41 40 47 44 45 50 C43 54 37 54 35 51" fill="none" stroke="#fdffff" stroke-width="3.2" stroke-linecap="round" opacity=".5"/>
  </g>
  ${limb('ag-ea-sh')}
  <!-- 大气层：临边那一圈蓝色薄光 -->
  <circle cx="60" cy="60" r="42" fill="url(#ag-ea-air)"/>
`;

ART['moon'] = `
  <radialGradient id="ag-mo-base" cx=".34" cy=".3" r=".8">
    <stop offset="0" stop-color="#e6e2d9"/><stop offset=".6" stop-color="#b7b2a8"/><stop offset="1" stop-color="#7c776e"/>
  </radialGradient>
  <clipPath id="ag-mo-clip"><circle cx="60" cy="60" r="40"/></clipPath>
  <circle cx="60" cy="60" r="40" fill="url(#ag-mo-base)"/>
  <g clip-path="url(#ag-mo-clip)">
    <!-- 月海：肉眼看到的那些暗斑，是古老的玄武岩平原，不是坑 -->
    <g fill="#8e897f" opacity=".8">
      <path d="M40 34 C54 30 66 34 68 44 C70 54 60 60 48 58 C36 56 32 44 40 34 Z"/>
      <path d="M70 30 C80 28 88 32 88 40 C86 46 78 48 72 44 C68 40 66 34 70 30 Z"/>
      <path d="M34 62 C44 60 52 64 52 70 C50 76 40 78 34 74 C30 70 30 64 34 62 Z"/>
      <path d="M72 58 C80 56 86 60 86 66 C82 70 76 70 72 66 Z"/>
    </g>
    <!-- 撞击坑 + 第谷坑的辐射亮纹 -->
    <g fill="#9d978c"><circle cx="56" cy="88" r="7"/><circle cx="78" cy="78" r="5"/><circle cx="30" cy="46" r="4.4"/><circle cx="64" cy="70" r="4"/><circle cx="44" cy="80" r="3.4"/></g>
    <g fill="none" stroke="#eae5db" stroke-width="1.6" opacity=".7">
      <circle cx="56" cy="88" r="7"/><circle cx="78" cy="78" r="5"/><circle cx="30" cy="46" r="4.4"/><circle cx="64" cy="70" r="4"/>
    </g>
    <g stroke="#efeae0" stroke-width="1.6" opacity=".45" stroke-linecap="round">
      <path d="M56 81 L52 66"/><path d="M63 84 L76 74"/><path d="M49 84 L36 76"/><path d="M56 95 L58 106"/><path d="M50 92 L40 100"/>
    </g>
    <g fill="#6f6a62" opacity=".45"><circle cx="56" cy="88" r="3.4"/><circle cx="78" cy="78" r="2.6"/><circle cx="30" cy="46" r="2.2"/></g>
  </g>
  ${limb('ag-mo-sh')}
`;

ART['mars'] = `
  <radialGradient id="ag-ma-base" cx=".34" cy=".3" r=".82">
    <stop offset="0" stop-color="#e8a06a"/><stop offset=".55" stop-color="#c05f2c"/><stop offset="1" stop-color="#7a3312"/>
  </radialGradient>
  <clipPath id="ag-ma-clip"><circle cx="60" cy="60" r="40"/></clipPath>
  <circle cx="60" cy="60" r="40" fill="url(#ag-ma-base)"/>
  <g clip-path="url(#ag-ma-clip)">
    <!-- 暗区：望远镜里看到的那些深色斑（如大瑟提斯），是被风吹净的岩石 -->
    <g fill="#8a3f18" opacity=".8">
      <path d="M62 34 C74 32 84 40 82 52 C80 62 70 66 62 60 C56 54 54 40 62 34 Z"/>
      <path d="M28 56 C38 52 48 56 48 64 C46 72 36 74 30 70 C26 66 24 60 28 56 Z"/>
      <path d="M66 74 C76 72 86 76 86 82 C82 88 72 88 66 82 Z"/>
    </g>
    <!-- 水手号峡谷：一条横贯的大裂谷 -->
    <path d="M30 66 C48 72 70 72 90 66" fill="none" stroke="#6d2f0f" stroke-width="3.4" stroke-linecap="round" opacity=".7"/>
    <!-- 奥林帕斯山：一座带凹口的巨型火山 -->
    <g><circle cx="40" cy="44" r="7" fill="#d98a52" opacity=".9"/><circle cx="40" cy="44" r="2.8" fill="#8a3f18" opacity=".8"/></g>
    <!-- 极冠：白色的干冰＋水冰帽 -->
    <path d="M40 24 C50 19 74 19 84 25 C72 30 50 30 40 24 Z" fill="#f6fbff" opacity=".92"/>
    <path d="M46 97 C54 93 70 93 78 97 C70 101 54 101 46 97 Z" fill="#f6fbff" opacity=".6"/>
    <!-- 沙尘：淡淡的黄雾 -->
    <g fill="#e6b483" opacity=".28"><ellipse cx="55" cy="86" rx="24" ry="8"/><ellipse cx="70" cy="46" rx="16" ry="6"/></g>
  </g>
  ${limb('ag-ma-sh')}
`;

ART['jupiter'] = `
  <radialGradient id="ag-ju-base" cx=".34" cy=".3" r=".85">
    <stop offset="0" stop-color="#f5dfc0"/><stop offset=".6" stop-color="#d9ae7c"/><stop offset="1" stop-color="#8f6338"/>
  </radialGradient>
  <clipPath id="ag-ju-clip"><circle cx="60" cy="60" r="40"/></clipPath>
  <circle cx="60" cy="60" r="40" fill="url(#ag-ju-base)"/>
  <g clip-path="url(#ag-ju-clip)">
    <!-- 条纹：一条条平行的带与区，边界有湍流的扭动，不是等宽色块 -->
    <path d="M18 34 C40 28 82 30 102 36 C82 42 40 42 18 40 Z" fill="#b07e4c" opacity=".8"/>
    <path d="M16 46 C40 41 84 43 104 48 C82 54 38 53 16 51 Z" fill="#a06d3c" opacity=".85"/>
    <path d="M16 58 C40 54 82 55 104 60 C82 65 38 64 16 63 Z" fill="#c69a68" opacity=".7"/>
    <path d="M16 70 C38 65 84 67 104 72 C82 78 38 77 16 75 Z" fill="#a06d3c" opacity=".8"/>
    <path d="M20 82 C42 78 80 80 100 85 C80 90 40 89 20 87 Z" fill="#b07e4c" opacity=".75"/>
    <path d="M24 92 C44 89 76 90 94 94 C76 98 42 97 24 95 Z" fill="#8f6338" opacity=".6"/>
    <path d="M22 24 C42 20 78 21 98 26 C78 30 42 29 22 27 Z" fill="#8f6338" opacity=".5"/>
    <!-- 带内湍流 -->
    <g fill="none" stroke="#f7e6cc" stroke-width="2" opacity=".45" stroke-linecap="round">
      <path d="M24 44 C34 40 44 46 54 42 C64 38 74 44 86 41"/>
      <path d="M22 68 C32 64 44 70 56 66 C66 62 78 68 90 65"/>
      <path d="M28 88 C38 84 50 90 62 86 C72 83 82 88 92 86"/>
    </g>
    <!-- 大红斑：一个逆时针的巨型风暴，外面还有一圈尾流 -->
    <ellipse cx="70" cy="72" rx="15" ry="9" fill="#c9704a" opacity=".5"/>
    <ellipse cx="70" cy="72" rx="11" ry="6.4" fill="#c2482a"/>
    <ellipse cx="70" cy="72" rx="6" ry="3.4" fill="#e0653f"/>
    <ellipse cx="68" cy="71" rx="2.4" ry="1.4" fill="#f3a583" opacity=".8"/>
  </g>
  ${limb('ag-ju-sh')}
`;

ART['saturn'] = `
  <radialGradient id="ag-sa-base" cx=".34" cy=".3" r=".85">
    <stop offset="0" stop-color="#f6e7c4"/><stop offset=".6" stop-color="#d8bd84"/><stop offset="1" stop-color="#8f7640"/>
  </radialGradient>
  <linearGradient id="ag-sa-ring" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#8f7c52" stop-opacity=".55"/><stop offset=".3" stop-color="#e8d6a8"/>
    <stop offset=".7" stop-color="#e8d6a8"/><stop offset="1" stop-color="#8f7c52" stop-opacity=".55"/>
  </linearGradient>
  <clipPath id="ag-sa-clip"><circle cx="60" cy="58" r="32"/></clipPath>
  <!-- 环的后半段先画（被球体挡住一部分），这样环才是「穿过」球而不是「贴在」球上 -->
  <g transform="rotate(-17 60 58)">
    <ellipse cx="60" cy="58" rx="55" ry="15" fill="none" stroke="url(#ag-sa-ring)" stroke-width="9"/>
    <ellipse cx="60" cy="58" rx="55" ry="15" fill="none" stroke="#6d5c38" stroke-width="1.2" opacity=".5"/>
    <ellipse cx="60" cy="58" rx="46" ry="12.4" fill="none" stroke="#c9b483" stroke-width="4" opacity=".85"/>
  </g>
  <circle cx="60" cy="58" r="32" fill="url(#ag-sa-base)"/>
  <g clip-path="url(#ag-sa-clip)">
    <path d="M26 42 C42 38 78 39 94 44 C78 48 42 48 26 46 Z" fill="#bfa268" opacity=".7"/>
    <path d="M24 54 C42 50 78 51 96 56 C78 60 42 60 24 58 Z" fill="#ad9153" opacity=".7"/>
    <path d="M26 68 C42 64 78 65 94 70 C78 74 42 74 26 72 Z" fill="#bfa268" opacity=".65"/>
    <path d="M32 80 C46 77 74 78 88 82 C74 86 46 86 32 84 Z" fill="#ad9153" opacity=".55"/>
    <path d="M30 30 C44 27 76 28 90 32 C76 35 44 35 30 33 Z" fill="#9c8347" opacity=".45"/>
    <!-- 环在球面上投下的影子 -->
    <path d="M22 62 C42 70 80 70 100 60 L100 68 C80 78 40 78 22 70 Z" fill="#5c4a26" opacity=".26"/>
  </g>
  ${limb('ag-sa-sh', 32)}
  <!-- 环的前半段：盖在球体前面，并留出卡西尼缝 -->
  <g transform="rotate(-17 60 58)">
    <path d="M5 58 A55 15 0 0 0 115 58 L115 58 A55 15 0 0 0 5 58 Z" fill="none"/>
    <path d="M6 60.5 A55 15 0 0 0 114 60.5" fill="none" stroke="url(#ag-sa-ring)" stroke-width="9"/>
    <path d="M14 60 A46 12.4 0 0 0 106 60" fill="none" stroke="#c9b483" stroke-width="4" opacity=".9"/>
    <path d="M6 60.5 A55 15 0 0 0 114 60.5" fill="none" stroke="#f2e6c6" stroke-width="1.6" opacity=".6"/>
  </g>
`;

ART['uranus'] = `
  <radialGradient id="ag-ur-base" cx=".34" cy=".3" r=".85">
    <stop offset="0" stop-color="#d6f6f7"/><stop offset=".6" stop-color="#8fd6dd"/><stop offset="1" stop-color="#3f8f9c"/>
  </radialGradient>
  <clipPath id="ag-ur-clip"><circle cx="60" cy="60" r="38"/></clipPath>
  <!-- 天王星躺着转，所以它的环几乎是竖着的一圈细线，而不是土星那种宽盘 -->
  <g transform="rotate(9 60 60)">
    <ellipse cx="60" cy="60" rx="13" ry="53" fill="none" stroke="#9ed6dd" stroke-width="1.8" opacity=".65"/>
    <ellipse cx="60" cy="60" rx="9" ry="46" fill="none" stroke="#8ac6ce" stroke-width="1.1" opacity=".45"/>
  </g>
  <circle cx="60" cy="60" r="38" fill="url(#ag-ur-base)"/>
  <g clip-path="url(#ag-ur-clip)">
    <!-- 极淡的带纹：天王星几乎没花纹，这一点本身就是它的特征 -->
    <g fill="#a9e6ea" opacity=".35">
      <ellipse cx="60" cy="42" rx="36" ry="6"/><ellipse cx="60" cy="60" rx="37" ry="6"/><ellipse cx="60" cy="78" rx="34" ry="6"/>
    </g>
    <ellipse cx="46" cy="46" rx="12" ry="9" fill="#eafcfd" opacity=".3" transform="rotate(-24 46 46)"/>
  </g>
  ${limb('ag-ur-sh', 38)}
  <!-- 环的近侧半圈压在球体前面，环才是穿过球而不是套在球外 -->
  <g transform="rotate(9 60 60)">
    <path d="M60 7 A13 53 0 0 0 60 113" fill="none" stroke="#bfeaf0" stroke-width="1.8" opacity=".9"/>
    <path d="M60 14 A9 46 0 0 0 60 106" fill="none" stroke="#a6d8e0" stroke-width="1.1" opacity=".65"/>
  </g>
`;

ART['neptune'] = `
  <radialGradient id="ag-ne-base" cx=".34" cy=".3" r=".85">
    <stop offset="0" stop-color="#6f9dff"/><stop offset=".55" stop-color="#2d55d8"/><stop offset="1" stop-color="#14267a"/>
  </radialGradient>
  <clipPath id="ag-ne-clip"><circle cx="60" cy="60" r="38"/></clipPath>
  <circle cx="60" cy="60" r="38" fill="url(#ag-ne-base)"/>
  <g clip-path="url(#ag-ne-clip)">
    <g fill="#4a75e8" opacity=".55">
      <ellipse cx="60" cy="40" rx="36" ry="7"/><ellipse cx="60" cy="60" rx="37" ry="7"/><ellipse cx="60" cy="80" rx="33" ry="7"/>
    </g>
    <!-- 大暗斑：和木星大红斑同类的巨型风暴 -->
    <ellipse cx="48" cy="52" rx="13" ry="8" fill="#16265f" opacity=".75" transform="rotate(-12 48 52)"/>
    <ellipse cx="48" cy="52" rx="7" ry="4.2" fill="#101c4a" transform="rotate(-12 48 52)"/>
    <!-- 高空的白色甲烷卷云：海王星风最猛，云被拉成长条 -->
    <g fill="#eaf2ff" opacity=".7">
      <path d="M26 68 C40 63 62 64 74 70 C60 74 38 74 26 68 Z"/>
      <path d="M56 84 C68 80 84 82 92 86 C82 90 66 89 56 84 Z" opacity=".8"/>
      <path d="M40 38 C50 34 66 35 74 39 C64 42 48 42 40 38 Z" opacity=".6"/>
    </g>
    <g fill="none" stroke="#eaf2ff" stroke-width="2" opacity=".45" stroke-linecap="round">
      <path d="M24 76 C38 72 56 74 68 78"/><path d="M34 46 C46 42 62 43 72 47"/>
    </g>
  </g>
  ${limb('ag-ne-sh', 38)}
`;

export const VIEWBOX = '0 0 120 120';
