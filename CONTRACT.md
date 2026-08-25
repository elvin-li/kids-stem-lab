# 共享契约（所有页面必须遵守）

## 文件与共享层
- 互动实验：`games/<slug>.html`；自然专题：`nature/<slug>.html`。
- 页面可以且应复用本站共享文件：`assets/css/base.css`、`assets/css/kid.css`、`assets/css/print.css`、`assets/js/progress.js` 以及 `data/explorations.js`。阶段 1 童趣层另提供 `data/playful.js` 与 `assets/js/playful.js`，由页面组渐进接入。共享文件必须是本站相对路径，不得依赖 CDN、远程字体或第三方 JS。
- 全部 HTML 页面必须加载三层样式，顺序固定为 `assets/css/base.css` → `assets/css/kid.css` → `assets/css/print.css`（最后一个带 `media="print"`）。`kid.css` 只覆盖变量与外壳，不改各页自身的互动逻辑；漏加会让孩子模式在该页失效。
- 全部 HTML 页面必须加载 `manifest.webmanifest` 与 `assets/js/pwa.js`（放在页面脚本末尾）。
- `data/explorations.js` 与 `data/playful.js` 都是 classic script，分别暴露 `window.EXPLORATIONS` 与 `window.PLAYFUL`；不得改成 module 或通过 `fetch()` 读取本地 JSON。
- 所有实验/自然详情页的固定脚本顺序为 `data/explorations.js` → `assets/js/progress.js` → `data/playful.js` → `assets/js/playful.js`；静态契约会强制检查。权威计数以 `data/explorations.js` 为准，不要在正文里再写死页数。其他页面一旦加载 `playful.js`，也必须先加载 `progress.js` 与 `data/playful.js`。没有声明式接入点时，童趣层必须静默且不得影响核心互动。
- 页面自身的交互仍使用原生 JS + Canvas/SVG；可保留页面专属的内联样式和脚本。`Playful` 只负责提示、反馈和保存辅助，不接管页面的核心计算或任务完成判定。

## 固定七项导航
每个页面的导航项目、顺序和文字固定如下，只按当前页面设置一个 `aria-current="page"`：

1. 资源库（`index.html`）
2. 学习路径（`pages/paths.html`）
3. 互动实验（`games/index.html`）
4. 探索（`nature/index.html`）
5. 我的足迹（`pages/progress.html`）
6. 家长指南（`pages/parents.html`）
7. 医药箱（`pages/medicine-cabinet.html`）

第七项是后加的，理由记在这里免得又被当成越界项删掉：家庭医药箱是医疗速查，和前六项的教学内容不同域，而它恰恰要在「孩子半夜发烧」这种时刻被立刻找到——埋在首页卡片和家长指南下面时，家长在最需要的那一刻点不到。标签用「医药箱」而不是「家庭医药箱」，是为了宽屏那条 `flex-wrap: nowrap; overflow-x: auto` 的导航条不必横滚太多；窄屏（≤782px）本来就换行排开，第七项不会撑破布局。改动范围是全部 HTML 页面的导航块 + `check-contract.mjs` 的 `EXPECTED_NAV` + 本节，三处必须同时改，否则静态契约立刻变红。

子目录页面使用对应的 `../` 相对路径：

```html
<nav class="nav"><div class="nav-in wrap">
  <a class="brand" href="../index.html"><span class="brand-mark">K</span> 少儿数理启蒙</a>
  <div class="row" aria-label="主导航">
    <a class="nav-link" href="../index.html">资源库</a>
    <a class="nav-link" href="../pages/paths.html">学习路径</a>
    <a class="nav-link" href="../games/index.html">互动实验</a>
    <a class="nav-link" href="../nature/index.html">探索</a>
    <a class="nav-link" href="../pages/progress.html">我的足迹</a>
    <a class="nav-link" href="../pages/parents.html">家长指南</a>
    <a class="nav-link" href="../pages/medicine-cabinet.html">医药箱</a>
  </div>
</div></nav>
```

## 可用 CSS 变量与共享 class
- 颜色：`--bg --bg-soft --surface --surface-2 --line --line-soft --ink --ink-mid --ink-dim`。
- 学科色：`--math --sci --phys --code --kit --video --warn --danger`。
- 圆角：`--r-sm --r --r-lg --r-xl`；阴影：`--shadow --shadow-lg --glow`；其他：`--ease --max --mono`。
- 布局与组件：`.wrap .wrap-narrow .stack .row .spread .card .grid .grid-2 .pill* .btn* .chip .input`。
- 任务与反馈：`.task .task-title .task-status .status .live-text`。紧凑的 `.pill`、`.badge` 只作标签，不充当按钮。
- 童趣组件：`.playful-companion .playful-character .playful-sticker .playful-feedback .task-map .task-map-step`。轻纸屑仅作装饰，不能承载完成信息。
- 作品卡与作品表单共用一套 `.work-card` 家族：`.work-card .work-card-title .work-card-meta .work-card-content .work-card-form .work-card-fields .work-card-status`。表单外观完全由 `.work-card` 提供，`.work-card-form` 只负责表单专属间距。已废弃 `.playful-work-form` / `.playful-work-fields` / `.playful-work-status`，页面和样式表都不得再出现这三个类名，也不得在页面 `<style>` 里重复定义 `.work-card*`。

## 孩子模式（data-mode）
- 孩子模式由 `<html data-mode>` 单独驱动：`playful.js` 的 `syncPreferences()` 把 `mode` 偏好写到该属性，`kid.css` 里所有规则都挂在 `html[data-mode="kid"]` 下。Progress 缺席时兜底写 `parent`，属性不会出现空值。
- 只写给家长看的内容用 `data-audience="parent"` 标记，孩子模式下由 `kid.css` 隐藏；只给孩子看的用 `data-audience="kid-only"`，家长模式下隐藏。隐藏是纯展示层行为，不得移除节点，也不得让页面脚本因找不到节点而报错。
- 切换控件用 `data-playful-preference="mode"`，由 `playful.js` 自动接管，页面不需要写绑定逻辑。切换后立即刷新 `<html data-mode>`，并且偏好随 Progress v3 一起导入导出。
- 孩子模式只改字号、配色、触控尺寸与信息密度，不得删掉任务文字、完成状态或无障碍名称。
- 任何使用 `data-audience` 的页面都必须在 `<html>` 上静态写出 `data-mode`（孩子页写 `kid`，只给大人看的文档写 `parent`）。`playful.js` 在 body 末尾才执行，缺少静态默认值会让首屏同时显示孩子层与家长层，闪现学术说明。运行时偏好仍会覆盖这个静态默认值。

## Progress v3 数据与 API
- 唯一当前键为 `kids-stem:progress:v3`。首次读取时按 v3 → v2 → v1 回退并无损迁移；迁移保留旧键，`reset()` 才清理三代键。
- v3 顶层完整结构为 `pages / recent / notes / completions / works / preferences`。贴纸不持久化，由 `completions` 与 `PLAYFUL.pages` 即时派生。
- 既有 API：`visit / get / all / count / note / getNote / complete / getCompletion / exportText / exportJSON / importJSON / reset / available`。
- 新增 API：`getStickers([pageId])`、`validateWork(pageId, work)`、`saveWork(pageId, work)`（后三者也支持单个含 `pageId` 的对象）、`getWorks([pageId])`、`deleteWork(workId)`、`getPreference(name)`、`setPreference(name, value)`。`validateWork()` 只读返回清洗后的真实 UTF-8 字节、总量、数量与失败代码，页面不得另写一套大小规则。
- 作品仅保存受限文本元数据，不保存图片二进制：类型为 `observation / prediction / drawing / model / explanation / photo-note`；最多 60 项，单项 UTF-8 JSON 不超过 12 KiB，合计不超过 96 KiB。标题、正文、ID、页面、日期和导入数据都必须严格清洗。
- 偏好固定为 5 项：`soundEnabled`（默认 `false`）、`motion`（`system/full/reduced`，默认 `system`）、`ageGroup`（`all/4-6/7-9/10-12`，默认 `all`）、`mode`（`parent/kid`，默认 `kid`）、`onlineData`（默认 `false`）。非法值一律回退到默认值，`setPreference()` 对非法值返回 `false` 且不改动已存值。所有读取结果均为防御性副本，存储失败不得伪报成功。
- `onlineData` 为第三方联网开关，默认关闭。未开启时页面不得向 USGS、NASA、iNaturalist、PaleoBioDB 等外部主机发起任何请求，必须直接使用内置数据；开启入口只出现在家长区。

## 页面组渐进接入约定
- 在页面已有的任务区域按需声明 `data-playful-page="games/...html"`，可加入：`data-playful-companion`、`data-playful-sticker`、`data-playful-feedback`、`data-playful-random-task` 与 `data-playful-task-output`。
- 作品表单使用 `data-playful-work-form`，必须提供 `name="type"`、`name="title"`、`name="content"` 三个字段和一个 `data-playful-work-status` 状态行；偏好控件使用 `data-playful-preference="soundEnabled|motion|ageGroup|mode"`。
- 所有实验/自然详情页都必须有作品表单接入点：每页恰好一个 `data-playful-work-form`，`type` 的 `option value` 只能取 `observation / prediction / drawing / model / explanation / photo-note`。页面不自己写 submit、保存或大小校验，全部交给 `playful.js` 的 `bindWorkForm()`。状态行用 `role="status"` 加 `aria-live="polite"` 宣告结果。
- 页面仍自行判断并调用 `Progress.complete()`；童趣层只监听成功后的共享事件并展示贴纸反馈。随机惊喜任务是开放式提示，不代替目录中的正式任务。
- 默认静音；`motion=system` 时跟随 `prefers-reduced-motion`。关闭或减少动效时不生成纸屑，完成文字反馈仍必须存在。

## file:// 与离线约束
1. 从文件管理器直接打开任一 HTML（`file://`）时，核心内容、互动、共享目录和足迹均须可用。
2. 本站本地数据使用 classic script 暴露到 `window`；不得用 `fetch()` 读取本地文件，不得要求 module、构建步骤、服务端路由或 CDN。
3. 可选远程数据失败时必须回退到内置数据；失败不得阻断页面核心内容，也不得产生未处理异常。
4. 所有站内链接和资源引用使用相对路径。不要使用仅在 HTTP 服务下有效的根路径 `/...`。

## PWA 与离线缓存
- `assets/js/pwa.js` 只在 `https:`、`localhost` 或 `127.0.0.1` 下注册 Service Worker；`file://` 下静默跳过，不报错、不输出 console 错误，也不影响任何页面功能。离线缓存是增强能力，注册失败必须静默降级。
- `pwa.js` 通过 `document.currentScript.src` 推算 `sw.js` 与 scope 的位置，因此站点放在子目录部署时同样可用；不得写死根路径。
- `sw.js` 的 `CORE` 清单必须与磁盘上的真实文件一一对应。`install` 阶段用 `cache.addAll(CORE)`，任何一条 404 都会让整个安装失败、离线能力全部丢失，所以新增或改名共享文件时必须同步改 `CORE` 并提升 `CACHE` 版本号。
- 只缓存本站同源静态资源；外部科学 API 不进缓存，由页面自行超时并回退到内置数据。

## 内容与交互要求
1. 界面使用中文，必要的专业术语保留英文原名。
2. 每个实验页必须有：标题、一句话“这在教什么”、可交互画面、3 条给家长的问题，以及简短的“背后的原理”。
3. 每个目录条目有一项清楚、可观察的 `task`。完成表示孩子确实做过该任务，不等同于打开页面；调用 `Progress.complete(id, evidence)` 时可保存一句证据或结果。重复完成更新证据和完成时间，不建立连续打卡、排名或惩罚机制。
4. `Progress.visit()` 只表示访问；笔记与任务完成是独立语义。记录只保存在本机，导入前必须清洗，任何存储异常都应安全降级。
5. 不使用 `alert()`，不留下 console 错误；Canvas 按 `devicePixelRatio` 缩放。

## 无障碍
- 页面有可见的键盘焦点和“跳到主要内容”链接；所有原生或自制控件均可用键盘操作。
- 每个控件有可访问名称（可见 `<label>`、`aria-label` 或 `aria-labelledby`），状态变化用文字并在需要时通过 `aria-live`/`role="status"` 宣告。
- 不只依靠颜色、位置、动画或声音表达状态；完成状态同时显示明确文字。
- 主要触控目标至少 `44 × 44px`；紧凑标签不是控件。遵守 `prefers-reduced-motion`，关闭非必要动画和平滑滚动。
- 页面自己用 JS 读动效状态时，必须优先读站内偏好（`Playful.motionReduced()`），系统媒体查询只作为共享层就绪前的兜底；并监听 `playful:preference` 事件，家长改动效后不需要刷新页面。

## 断行与中文排版
中文每个字之间都是合法断点，所以「断行落在哪个字之间」在浏览器看来永远是对的——**这一整类缺陷不会让任何门禁变红，只会让人读起来别扭**。此前没有任何工具看过它；`verify.mjs` 只问有没有横向溢出，`check-rendered-contrast.mjs` 只量颜色，`check-print.mjs` 只看纸上有没有丢内容。三条硬要求：

- **数字与单位之间不得留半角空格。** `U+0020` 在 UAX #14 里是**无条件断行机会**，浏览器一定会在那里断，于是「139 万 km」的数字停在行尾、单位孤零零跳到下一行；窄栅格里最明显。实测被拆开的有 `130 万`、`384,400 km`、`24 月龄`、`28.5 吨`、`10000 米`。写成 `&nbsp;`（或 JS 里的 `"\u00a0"`）。**CSS 侧没有任何属性能救这件事**：`text-wrap` 管末行长度，`overflow-wrap` 管溢出时的应急断点，都不改变「空格处可断」这个事实。门禁是 `check-nbsp-units.mjs`，带 `--fix`。
  - **动态一侧同样在门禁范围内**：它把内联 `<script>` 的字符串字面量单独扫一遍——既认 `"3 万"` 这种整词，也认本站最常见的 `times + " 次"` 后缀拼接形状（单位和数字不在同一个字面量里，只按整词找一个都抓不到）。JS 侧统一替换成 `"\u00a0"` 而不是 `&nbsp;`：走 `textContent` 时 `&nbsp;` 只是六个字面字符。这个盲区当年真实存在过：静态 HTML 修完后，还有约 25 个页面的内联脚本里躺着几百处普通空格拼接（早期这里只点名了 3 个文件，语义评审 2026-08-11 第 2、3 条把实际规模数了出来），交互一次就把修好的排版写回坏的。`nature/beetles.html` 是最值得记的一例：静态 HTML 里改成了 `28.5&nbsp;<small>吨</small>`，但 `liftBig.innerHTML` 那两行还在写带普通空格的版本——静态与动态两份必须一起改（`innerHTML` 路线上写 `&nbsp;` 也对，`textContent` 路线上必须写 `"\u00a0"`）。有意豁免两类：只进 aria 名称的文案（读屏不折行，NBSP 只是噪音）、turtle-geometry 写进 `<textarea>` 的 DSL 程序源码（那里的空格是语法分隔符，换成 NBSP 会把示例程序变成语法错误）。
  - **可断空白不只字面 U+0020**：源码里数字和单位之间换了行、或夹着制表符，在浏览器里同样可断，门禁按「一段可折叠空白」匹配（语义评审 2026-08-11 第 4 条）。`<title>` 不参与折行，不在判定范围内，也不要往里塞 `&nbsp;`——不做实体解码的抓取方会看到字面量。
  - 跨标签边界仍扫不到：`28.5 <small>吨</small>` 的空格在文本节点末尾、单位在子元素里，正则匹配不到，只能人工加。
- **防孤字靠 `text-wrap`，挂在 `body` 上靠继承。** `body { text-wrap: pretty }` 避免末行过短，`h1–h4` 用 `balance` 把短标题各行拉匀，`button/.btn/.chip/label/legend` 也用 `balance`（`pretty` 对「体积更快」会给出「体积更」+「快」，`balance` 给出「体积」+「更快」）。第一版只写了 `p, li, dd, td, th…` 这串标签选择器，结果 space.html 还剩 15 处孤字——那些文字装在 `<span class="kid-figure-sub">`、`<b>` 里，一个都没匹配上；`text-wrap` 本来就是可继承属性，挂在 `body` 上才是它该待的地方。**`print.css` 的 `orphans`/`widows` 解决不了这件事**：那两个属性管的是跨页时首末页各留几行，管不到一行里留几个字。
  - **`text-wrap: <style>` 是简写，会顺带把 `text-wrap-mode` 重置成 `wrap`**（语义评审 2026-08-11 第 9 条）。`white-space: nowrap` 同样展开出 `text-wrap-mode: nowrap`，于是 `button, .btn, .chip, label, legend { text-wrap: balance }` 排在 `.pill { white-space: nowrap }` 之后时，一个同时带 `pill` 和 `chip` 的元素会被**静默解除 nowrap**——两条规则权重相同，后写的赢。今天全站没有元素同时命中这两类选择器，所以没有受害者，但这条耦合是真实存在的：以后要给「既是紧凑标签又要 balance」的元素写样式，用 longhand `text-wrap-style: balance`，别用简写。
- **短控件标签不换行。** 三五个字的按钮标签断开没有任何好处。`games/pattern-machine.html` 的 `.rail-choice` 是典型：`flex:1 1 92px` 减去 42px 图标和 8px 间距，文字轨道只剩约 42px，正好卡在「正方形」的宽度上折成「正方」+「形」；给标签加 `white-space: nowrap` 之后，flex 项的 min-content 下限会自动把按钮撑到放得下整个词，不会溢出。导航里的站名同理（`.brand` 已加 `nowrap`，否则 768px 下会掉出一个孤零零的「蒙」）。
- **中文正文用 `overflow-wrap: break-word`，不要用 `anywhere`。** 两者都只在「否则就要溢出」时才启用应急断点，但 `anywhere` 的应急断点**参与 min-content 计算**，元素最小宽度会变成「最宽的那一个字」；配合 `minmax(min(262px,100%),1fr)` 这类由内容定宽的栅格加 `min-width: 0`，列就被允许塌到一字宽，出现「一字一行」。`break-word` 不参与内在尺寸计算，而对中文正文来说两者的断行能力毫无差别。**真正需要 `anywhere` 的只有长 URL**（`med.css` 里只剩 `.srcs a` 一处）。
- **给中文限宽不要用 `ch`。** `ch` 量的是数字 `0` 的推进宽度，在中文字体里约等于半个汉字，`max-width: 36ch` 实际只有 18 个汉字左右，比看起来窄一半。`nature/space.html` 的 `.hero-question` 就因此稳定折出一个两三字的第二行，改成 `20em` 才对得上「一行 20 字」的意图。
- **不要用 `<br>` 当句子分隔。** 每句本来就会按宽度自动折行，再叠一次硬断行、配上 `text-align:center`，会得到一个行长忽长忽短的居中块。改成各自成 `<p>`，语义也对（space.html 页脚原先三句挤在一个段落里）。
- 审计工具是 `tools/check-wrap.mjs`（要 Chrome，**不进 run-gates**，判定带审美成分，适合改排版时手动跑并对比前后）。它用 `Range` 逐字符量真实行盒，报三类：数量词组被拆、末行孤字、一字一行。写它的过程中踩到两个坑，都会制造假阳性，照着改反而会把对的改坏：
  - **必须按「块容器」量，不能按文字节点量。** 一个段落里夹着 `<b>`、`<a>` 时文字被切成好几个节点，而它们同属一个行盒序列；按节点量会把「，比如每年 8 月的」这种被内联标签切出来的中间片段的末行，当成整段的末行，报出一堆根本不存在的孤字。
  - **换行信号必须用 x 坐标回退，不能用 `top` 变化。** `<strong class="lift-big">28.5<small>吨</small></strong>` 里那个 `.9rem` 的「吨」待在 `2.5rem` 的行盒里，基线对齐后 `top` 天然和大字不同，于是「同一行的两种字号」被误判成两行。文字换行时 x 一定回到行首（居中、右对齐也一样会回退），这个信号对字号差异免疫。
  - 另外加了宽度守卫：容器窄到放不下两个字时「每行一个字」是必然结果，多半是还没布局完或被折叠的元素，报出来只会往清单里掺噪音。

## 打印
- 每页在 `base.css` 后以 `media="print"` 加载 `assets/css/print.css`。
- 打印版隐藏导航、按钮、表单、画布及其他仅交互元素，保留标题、原理、家长提问、任务文字、完成状态和必要来源。
- 内容使用浅底深字，避免卡片、图表标题和任务被跨页截断；外部链接打印 URL。不得要求用户先运行脚本才能得到可读打印页。

## 门禁（改完必须全绿）
本项目没有 `package.json`，所有工具直接用 `node tools/<name>.mjs` 跑，零依赖。

**日常入口是跑批器**，它按依赖分组并行，不用手敲二十几条命令：

```
node tools/run-gates.mjs                 # 全部：静态并行 → 变异独占 → Chrome 受控
node tools/run-gates.mjs --only static   # 只跑不需要 Chrome 的（约 4 秒，改完代码先跑这个）
node tools/run-gates.mjs --list          # 只看分组，不跑
node tools/run-gates.mjs --chrome-jobs 2 # 已忽略：共享 Chrome lease 强制全局串行，大于 1 不会真并发
```

为什么不能一股脑全并发——三组的约束完全不同：

- **静态组**（`check-*` 加不碰工作区的 `test-*`，以 `run-gates.mjs --list` 为准）纯 Node、只读工作区文件，互不干扰，放开并行，墙钟约 4 秒。`test-chrome-lifecycle.mjs` 也在这一组：它验的是 Chrome launcher 生命周期合同（清理、stop 幂等、信号协议），但「Chrome」由 node 假扮、临时目录都在系统临时目录下，不需要真浏览器也不碰工作区——`check-no-downloads.mjs` 的词法检查防不住删掉 `stopChrome`/`finally` 这类行为回归，这条行为级测试才防得住（语义评审 2026-08-11 Chrome launcher 第 5 条）。
- **自检组**（14 条 `test-check-*.mjs`）都会临时往工作区写东西，**一律独占串行**，不能和别的门禁同时跑：两个自检同时跑，各自的「基线」就是对方注入的缺陷，结论全废；静态门禁这时候在读文件，会读到注入的缺陷报假红。按「临时写的是什么」分成三种，风险差别很大：
  - **改写真实源文件再还原**（6 条：`test-check-classes` / `test-check-content` / `test-check-kid-mode` / `test-check-offline` / `test-check-completion` / `test-check-medicine-cabinet`）。**多人／多线程同时改工作区时要格外小心**：流程是「读原文 → 注入 → 写回原文」，如果别人在这个窗口里改了同一个文件，写回会把对方的改动覆盖掉。已经真实发生过一次：`test-check-offline` 报「sw.js 没还原干净」，实际是变异窗口内另一个会话也写了 `sw.js`。夹具 7 条（theme / render / raf / aria / headings / inline-scripts / contract）与对比度沙箱不进 `run-gates` 的 MUTATING，仍按发布前清单手跑。
  - **自建临时夹具页**（6 条：`test-check-theme` / `test-check-render` / `test-check-raf` / `test-check-headings` / `test-check-inline-scripts` / `test-check-contract`，往 `pages/_*-fixture.html` 写各种坏写法，跑完删，启动时先清残留）。它**不会丢掉别人的改动**，这是它比上一种强的地方；但夹具是一个真实存在的页面，**`check-contract.mjs` 会因为它缺 pwa.js、缺导航而变红**（实测如此），所以照样不能和别的门禁并行。`test-check-aria` 也用夹具，只是它走单页模式。
  - **整个搬去仓库外的沙箱**（1 条：`test-check-contrast`）——把 `check-contrast.mjs` 复制到系统临时目录的 `<tmp>/tools/` 下，它的 `ROOT` 是按脚本所在目录的上一级算的，于是会去读 `<tmp>/assets/css/` 里的夹具 CSS。**这一种完全不碰工作区，是三者里唯一真正可以和别的门禁并行的**。新写自检时优先照这个模式做：条件是被测工具的输入都能通过 `ROOT` 重定向。
- **Chrome 组**（13 条）每条都起一个 headless Chrome，`check-offline.mjs` 还额外带 HTTP 服务器。默认串行，跑前先清残留进程。
  - **这一组会报假失败，务必先判断错误性质再动手改页面。** 报错文本是 `Runtime.evaluate 超时` / `Target.createTarget 超时` / `Chrome WebSocket 已关闭` / `Session with given id not found` / `Failed to open a new tab` 的，都是基础设施问题，不是页面缺陷——判据很硬：真缺陷会给出具体数值（某个文字节点的对比度、某个控件的尺寸），基础设施问题只有超时和掉线。实测同一份代码连跑三次，报错分别落在 `med-fever`、`design-system`、`symmetry-studio` 三个不同页面上，而**单独跑那一页都是干净通过的**；`verify.mjs` 也出现过「验证器中途死掉、把后面的页面连带标红」。
  - ⚠️ **「带具体数值」不再是真缺陷的充分证据——存在一种数值具体、可复现、但仍是基础设施问题的假失败。** 负载高时 `Emulation.setDeviceMetricsOverride` 会对个别导航悄悄退化：布局宽度和媒体查询仍按模拟的 375px 算，但 **vw 单位（含 `clamp()` 里的 vw）按外层窗口 `--window-size=1280,900` 解析**。于是 `clamp(1.5rem,…,1.9rem)` 的标题、`clamp(280px,48vw,520px)` 的舞台 min-height 全部取到桌面端的值，主操作条被推出首屏。这种失败极具欺骗性：数值具体（`top 973px`）、跨两轮完整门禁完全一致（坏掉时的布局是确定的）、只有一部分页面中招（按导航逐次随机触发）、同一子模板的页面聚簇出相同数值（17 页全是 973px 就是这么来的——静态各为 711/733/757 的页面坏掉后都变成 973）。**甄别办法：单独打开那一页用同样的视口量一遍（`tools/_fold-measure.mjs`），静态值和门禁值对不上就是测量环境坏了**。一轮 331 项「E2E 失败」里约 220 项是这一种。`test-trail-e2e.mjs` 已加固：每页测量前用 100vw 探针核对视口模拟是否真的生效，失效则重新广播 override 并重导航重试，三次仍失效记一条点名「基础设施问题」的失败并跳过该页断言，不拿错误数值冒充页面缺陷。给别的按 vw/视口断言的 Chrome 工具加类似断言时可照抄这个探针。**还有第二种数值具体、可复现、但是页面缺陷的形状**：`100vw` 已是 375，但 `innerWidth` 被撑到更大（如 digestion 曾是 399）——移动端布局视口会跟着 `scrollWidth` 走，根因是横向溢出（例如图鉴格里塞了西里尔长词 `желудок` 顶破大字号 `.kid-figure-art`）。探针若只报「基础设施」会误导；现已把「vw 贴近目标 + 伴有横向溢出 + innerWidth 被撑大」单独判为页面溢出失败。
  - 根因是机器负载，不是工具设计：一个长驻 Chrome 要连开全部 HTML 页面的 target，负载高的时候会整个死掉，之后每个 `createTarget` 都超时、报错级联。查过一次现场：`load average 10.5`，吃 CPU 的是 `duetexpertd`（70%）、IDE 的 renderer（50%）、`WindowServer`（49%）和 `ScreensharingAgent`（22%），**没有本仓库留下的僵尸 Chrome**。所以遇到这类报错的正确反应是「等机器闲一点再串行重跑」，而不是去改页面。
  - 两道工具已经按「错误分级 + 重启」加固过，做法可以照抄到别的 Chrome 类工具上：
    - `check-rendered-contrast.mjs`：把单页审计抽成函数，基础设施类错误换一个全新 target 重试一次。能救掉孤立的偶发超时。
    - `check-controls.mjs`：更彻底。原来 `Target.createTarget` 写在单页 `try` **外面**，它一失败异常就逃出整个循环、进程直接死掉，**前面已经跑完的页面结果全部丢失**（实测跑到第 26 页撞上 `Failed to open a new tab`，前 25 页的结论一起没了）。现在建 target 也纳入保护，并且遇到这类错误时**整个换一个 Chrome 再重试**（换端口、换 profile；旧 profile 的锁文件会让新实例起不来）。改完之后同一台机器上从「第 3 页就死」变成 39 页全过。
    - 只换 target 不换浏览器是不够的：这类错误多半意味着旧实例已经死了，在死实例上重试拿不到任何结果。
  - 跑崩或被中止时会在系统临时目录留下 `controls-chrome-*` / `pixelproof-*` 之类的 Chrome profile，每个 3–5MB。清理办法：`find "$TMPDIR" -maxdepth 1 -type d -name 'controls-chrome-*' -not -newermt '-10 minutes' -exec rm -rf {} +`（`-not -newermt` 是为了别删掉正在跑的那一轮）。
  - **中止 `run-gates` 的信号协议**（语义评审 2026-08-11 Chrome launcher 第 1、2 条之后的行为）：第一次 Ctrl-C/SIGTERM 只做三件事——置 cancellation 状态（此后不再启动任何新门禁）、给正在跑的门禁转发 SIGTERM、**一直等它们真实 close**（chrome-lifecycle 保证 close 时 Chrome 已真实 exit、profile 已删，每 10 秒打一行等待进度）。**不要看到它没立刻退出就再按**：第二次信号是「明确放弃等待」，会 SIGKILL 兜底退出，可能留下孤儿 Chrome/profile（清理命令见上一条）。原先的固定 6 秒预算会截断仍在清理的 launcher、提前释放 lease，已废除。

下面这份清单是分组的展开，也可以单条手动跑。改动后退出码必须都是 0：

```
node tools/check-contract.mjs        # 静态契约：导航、作品类型、共享层版本号、Progress 调用
node tools/test-progress.mjs         # Progress v3 API 单测（node:vm 模拟 window/localStorage）
node tools/check-inline-scripts.mjs  # 所有内联 <script> 的语法与 classic script 约束
node tools/check-aria.mjs            # id 唯一性 + aria/label 引用是否落到本页节点
node tools/check-contrast.mjs        # 两套主题的色彩 token 对比度（WCAG 2.1）
node tools/check-headings.mjs        # 每页一个 h1、h1 在最前、标题不跳级
node tools/check-raf.mjs             # 逐帧循环必须能停下来，不许空转烧电
node tools/check-render.mjs          # 标签闭合、重复属性、站内引用、CSS 变量与大括号
node tools/check-theme.mjs           # 页面内联样式里残留的暗色主题写法
node tools/check-content.mjs         # 实验页五件套、动效偏好来源、画布 dPR
node tools/check-medicine-cabinet.mjs # 医药箱：红旗段靠前、来源可追回官方、免责声明、无毫克数、离线登记与入口可达
node tools/check-nbsp-units.mjs      # 数字与单位之间不得留可断的半角空格（--fix 可自动修）
```
自检组要独占串行（上面「自检组」那一条说明了为什么），按风险从低到高：
```
node tools/test-check-contrast.mjs   # 仓库外沙箱，完全不碰工作区
node tools/test-check-theme.mjs      # 临时夹具页 pages/_theme-fixture.html
node tools/test-check-render.mjs     # 临时夹具页 pages/_render-fixture.html
node tools/test-check-raf.mjs        # 临时夹具页 pages/_raf-fixture.html
node tools/test-check-aria.mjs       # 临时夹具页 pages/_aria-fixture.html
node tools/test-check-headings.mjs   # 临时夹具页 pages/_headings-fixture.html
node tools/test-check-inline-scripts.mjs  # 临时夹具页 pages/_inline-fixture.html
node tools/test-check-contract.mjs   # 临时夹具页 pages/_contract-fixture.html
node tools/test-check-classes.mjs    # 改写真实源文件再还原
node tools/test-check-content.mjs    # 改写真实源文件再还原
node tools/test-check-medicine-cabinet.mjs  # 改写真实源文件再还原（条数随页面增长，见其自身输出）
```

下面这几条**有意不进 `run-gates`**，理由各不相同，但都不是「不重要」：

```
node tools/check-sources.mjs          # 医药箱来源链接是否真的打得开（要联网）
node tools/check-wrap.mjs             # 中文断行：拆词 / 孤字 / 一字一行（要 Chrome，判定带审美成分）
node tools/bump-shell-version.mjs     # 提升离线壳版本并同步全部 HTML 的 ?v=（--check 只核对）
node tools/_print-overflow.mjs        # A4 打印宽度下表格是否被裁（要 Chrome）
node tools/_med-style-snapshot.mjs    # 医药箱计算样式快照，用于证明重构前后逐元素等价
```

- `check-sources.mjs` **要联网**，放进 `run-gates` 会让没网的机器整片红，那种门禁很快就会被忽略。它把结果分成「可达 / 需人工确认 / 已失效 / 无法验证」四档，**只有 404 和 410 判为失败**——`healthychildren.org` 与 `merckmanuals.com` 都有反爬，对无头请求经常直接回 403，而同一个地址在浏览器里完全正常。把 403 当死链去「修」，只会把本来正确的官方链接改坏。这条真抓出过 6 条 404：Merck 的路径是凭记忆拼的，`bone-and-joint-disorders-in-children`、`skin-problems-in-infants-and-children`、`acute-otitis-media`、`sore-throat` 等全都不存在（真实路径分别是 `bone-disorders-in-children/overview-of-bone-disorders-in-children`、`symptoms-in-infants-and-children/rashes-in-children`、`middle-ear-disorders/otitis-media-acute`、`mouth-and-throat-disorders/throat-infection`）。**一个 404 的来源比没有来源更糟**：读者点过去打不开，会开始怀疑整页的可信度，却无法判断是哪一条结论没有依据。
  - **「需人工确认」这一档专门抓「重定向后路径变了」**（语义评审 2026-08-11 第 7 条）：一条拼错的路径被站点 301 到栏目首页或站点根、再回 200，最终状态码完全正常，早先会被判成「可达」——而那正是这条门禁要抓的形状。只换域名写法或补尾斜杠的不算；落到站点根或搜索页的会额外标注「疑似失效」。它不改退出码（需要人开浏览器看落点），但不再计入「可达」。
  - 请求侧按主机分片：同一主机严格串行、相邻请求之间退让 600ms，不同主机之间才并行——别把对方站点当压测目标（第一版只写了这句注释没写实现，语义评审第 8 条）。
- `bump-shell-version.mjs` 是给「改完共享层」用的。改动 `assets/css/*.css`、`assets/js/*.js`、`data/*.js`、`assets/icons/app-icon.svg` 之后必须**同时**提升 `sw.js` 的 `CACHE` 并把全部 HTML 与 `manifest.webmanifest` 的 `?v=` 跟上。漏做的后果是静默的：装过 Service Worker 的设备继续从缓存拿旧文件，而开发机上（无 SW 或强制刷新）一切正常，改动「看起来生效了」。手工改全部 HTML 文件、靠 `check-contract.mjs` 兜底，说明这本来就该是一条命令。提交前用 `--check`。
  - `--check` 除了「已有锚等于壳版本」「每个文件至少一个锚」，还查**「该有锚而没有」**（语义评审 2026-08-11 第 6 条）：`VERSIONABLE` 清单（四个共享 CSS、三个共享 JS、`data/*.js`、`app-icon.svg`）里的资源被引用时必须带 `?v=`。此前 `print.css`、`data/explorations.js`、`data/resources.js`、`app-icon.svg` 的引用一直没有锚也无人兜底，而它们都在 `sw.js` CORE 里、都落在部署配置的 `/assets/` 或 `/data/` 30 天缓存下——改了文件，装过缓存的设备最长 30 天拿不到新版。现在四类引用已全部补锚，`check-contract.mjs` 的强制清单也跟着扩了（`print.css` 进 mandatory，`data/*.js` 与 `app-icon.svg` 进 optional，引用即强制）。版本锚的权威判据是 `check-contract.mjs` 里 `mandatoryShellResources` / `optionalShellResources` 两个数组——曾有一条从未参与判定、却长得像判据的 `VERSIONED_SHARED` 正则误导过人（语义评审第 5 条记录了实测：只改它门禁照样全绿），已删除。
- **这几条的手动触发时机固定如下（发布前清单），不进跑批不等于永远不跑**（语义评审 2026-08-11 第 10 条）：
  - `check-sources.mjs`：新增或修改医药箱来源链接后必跑；每次对外发布/部署前跑一次；长期不动也建议隔一两个月体检一次（对方站点会改版）。
  - `check-wrap.mjs`：改过正文文案、标题、按钮标签，或动过 `base.css` / `kid.css` 的字号、栅格、宽度后手动跑一次，对比改动前后的输出（判定带审美成分，报告要人读）。
  - `bump-shell-version.mjs --check`：每次提交前跑；改完共享层则先跑不带 `--check` 的同步再提交。
  - `_print-overflow.mjs`：医药箱新增页面或加宽表格后跑。

需要真实 Chrome 的那一条单独跑（没装 Chrome 的机器上如实标注「未运行」，不得当成通过）：

```
node tools/check-rendered-contrast.mjs --mode kid      # 孩子模式：真实层叠下的文字对比度
node tools/check-rendered-contrast.mjs --mode parent   # 家长模式：会露出 data-audience="parent" 的内容
node tools/check-privacy.mjs                          # 默认不联网：关闭 onlineData 时不得有请求离开设备
node tools/check-print.mjs                            # 打印版：藏交互、留原理与提问、不依赖脚本
node tools/check-kid-mode.mjs                         # 孩子模式不得丢任务、完成状态与无障碍名称
node tools/test-check-kid-mode.mjs                    # check-kid-mode.mjs 自身的回归用例
node tools/check-offline.mjs                          # SW 装得上、CORE 全进缓存、断网后页面照常可用
node tools/test-check-offline.mjs                     # check-offline.mjs 自身的回归用例
node tools/check-completion.mjs                       # 打开页面只算访问，不得自动产生完成
node tools/test-check-completion.mjs                  # check-completion.mjs 自身的回归用例
node tools/check-rendered-contrast.mjs --print --mode parent   # 打印稿：白纸上还读不读得出来
node tools/check-controls.mjs --mode kid               # 触控目标 44×44 + 键盘焦点可见性
node tools/check-controls.mjs --mode parent --width 768
```

- `tools/check-classes.mjs` 是类名双向审计：**markup 里用到的每个 class，必须在这一页实际生效的样式层（共享层 + 本页 `<style>`）里有规则，或被 JS 引用**。判定按页算生效层，不取全站并集——`.qa` 只写在 fraction-lab 和 dinosaurs 的局部 `<style>` 里，全站并集会放过 weather 上那 5 个裸折叠块。
  - exit 1：既无 CSS 规则也无 JS 引用，是真缺陷（改名只改了一边）。
  - exit 0 的提示：纯 JS 钩子（正常写法）、无人使用的局部 CSS（死代码，值得清理但不阻断）。
  - **那份「死代码」清单是给人照着删的，所以它误报的代价比漏报高得多**：删掉一条还在用的规则是静默破坏——少一条 `color` 或 `fill` 未必跨过任何对比度阈值，全部门禁照样绿，坏掉的只有孩子看到的那张图。清单曾经有三类假阳性，都已修掉并由 `test-check-classes.mjs` 守住：
    - **带前导空格的拼接**。追加 class 最惯用的写法是 `el.className = "rmark" + (m.hi ? " hi" : "")`（ocean），而判断「这串像不像裸 class 列表」的正则原本要求以字符开头，`" hi"` 直接不匹配，于是 `.hi` 被当成死代码。修法是先 `trim` 再判，**不要放宽字符集**——放宽会让这个集合过度收集，反过来把真缺陷掩盖成 JS 钩子。
    - **内联脚本里的转义序列让扫描器整行失明**（三类里后果最重）。提取字符串的正则原本把反斜杠排除在字符串体外，于是 `"\n"` 整个匹配不上；匹配失败后引擎前移一格，会把 `"\n"` 的**收尾引号**当成下一个字符串的开引号，从此「字符串」和「代码」的角色整行错位。本站内联脚本都压缩成单行长句，所以行内早一点出现一个 `"\n"`，后面所有字符串里的类名就全部失明。真踩到的一例：why.html 里 `lines.join("\n")` 排在 `classList.add("print-eval")` 之前，`.print-eval` 因此被列为死代码——照着删就拆掉了「只打印评估表」这个功能，而那条规则只在 `@media print` 里生效，屏幕上的审计根本看不见它。修法是在字符串体里放行 `\\.`。
    - **前缀 + 变量拼出来的类名**，文本扫描原理上看不见。index.html 里 `dot.className = "subj-dot d-" + r.subject`，完整类名 `d-math` / `d-science` / `d-coding` / `d-kits` / `d-video` 一个都不在源码里出现；删掉这五条，46 张资源卡的学科色圆点会集体失色，而 `check-contrast` 只看 token 组合、`check-rendered-contrast` 量的是文字对背景，一个纯装饰的圆点没有文字，两道门禁都不会响。现在死代码那一侧会收集「以 `xxx-"` 紧跟 `+` 的形状」当前缀白名单。注意**这个放宽只用在死代码判定，没有掺进 `anyJs`**：掺进去会让「markup 用了但哪里都没有规则」的真缺陷被当成钩子放过。
  - **清单本身还分两段，别看错**：输出里「纯 JS 钩子（无样式规则，属正常写法）」和「无人使用的局部 CSS（死代码）」两段格式一模一样，都是 `页面 → .class`。按行格式抓会把钩子那段也吞进来——`.space-check` 就这样被误当成待删候选，而它是 space.html 里真实存在的复选框，JS 用 `querySelectorAll(".space-check:checked")` 数它。钩子本来就没有 CSS 规则、删无可删，但清单里混进活的类名会误导人。工具侧已按小节标题过滤。
  - **判「这条规则是不是死的」要连复合选择器一起算**：`.half-pick.ok`、`.rr-tabs .kid-tile`、`.oc-picks .kid-figure-art > svg` 这些里面都提到了还活着的 class（`.ok` / `.kid-tile` / `.kid-figure-art`），但只要**锚点那一半**（`.half-pick` / `.rr-tabs` / `.oc-picks`）永不存在，整条选择器就永远匹配不到，一样是死的。自动删除器对这种会保守地留下来，需要人工确认锚点确实是死的之后再删。反过来 `.age-tiers, .zone-tiers, .adapt-cards { … }` 这种**选择器列表**必须只摘掉死的那一半，不能整条删——paths.html 的 `.week-list, .task-map` 就是这个形状。
  - 照清单删之前先过三道，缺一道都可能静默弄坏插画：`tools/_dead-class-audit.mjs` 逐条分「安全 / 要人看 / 状态类」（全仓踪迹、前缀拼接嫌疑、`-on`/`-lit`/`-locked` 这类只在交互时施加的状态名）；`tools/_orphan-check.mjs` 在真浏览器里数 `querySelectorAll('.x').length`，两种 `data-mode` 各一次，**必须掺一个已知还活着的 class 当反向对照**——第一版没掺，结果「把所有可见按钮点一遍」的脚本把页面点塌了（paths.html 从 909 个节点掉到 691 个），静态 markup 里的 `.sig`、`.track` 也跟着零命中，看起来全绿其实什么都没证明；现在载入态和交互后各数一次取最大值，并用节点总数判断 DOM 是否塌了。`tools/_pixel-proof.mjs` 做整页截图哈希对照，但它对共享层的并发改动没有免疫力——另一个会话改一次 `assets/css/base.css`，每页截图都会变，结论就被污染，所以它只适合确认自己一个人在改的时候用。
- 本会话给此前完全没有自检的 6 道门禁补了回归用例：`test-check-theme` / `test-check-contrast` / `test-check-render` / `test-check-raf` / `test-check-aria` / `test-check-headings`，都用夹具、不改真实源文件。六条都刻意同时验「该红的红」和「该绿的绿」，因为这些审计几乎都有分档（阻断 vs 提示），只验一半会让分档悄悄退化成一刀切或者一律放过：
  - `check-theme`：深底深字、写死的暗色色块要阻断；**隐形描边只进提示清单、不阻断**（有些地方确实压在 JS 写的深色分区上）；高饱和品牌色 `var(--math)` 不能被「暗色色块」那条误伤。另有一条只读交叉验证：独立按花括号配对算一遍 `base.css` 的 `:root`，和工具报的「浅色 token N 个」比对，并断言这个数严格小于全文自定义属性总数——否则这条断言没有区分度。分界一旦退化成「吃到文件末尾」，token 数会从 39 涨到 44，背景合成基准跟着错，A/B 两类判定全部失真。
  - `check-contrast`：正文 4.5、按钮文字 4.5、大字/图形 3.0 三档都要能拦住，同时**一个 3.4:1 的学科色必须是绿的**——没有这一条，有人把阈值统一提到 4.5 也不会有人发现，而那会逼着把整套品牌色改暗。另外验了 token 缺失不被静默跳过（工具内部对取不到的 token 有 `continue`，少写一个会让那一整组组合凭空消失、结果照样绿），以及 kid.css 的覆盖层确实叠在 `:root` 之上并参与判定。写这类用例时注意 `--accent: var(--math)`：动 `--math` 会连带把按钮底色调浅，按钮那一组会先红，测不到本来想测的东西——用 `--sci` 这类没有别名的。
  - `check-render`：10 类会让页面显示错掉的缺陷（未定义 `var()`、容器不闭合、重复属性、站内链接与锚点失效、`img src` / CSS `url()` 找不到文件、`<use href>` 无目标、`img` 缺 `alt`、大括号不平衡）都要变红**并点名位置**；`svg` 既无 `viewBox` 也无尺寸只报不拦。基线那一条同时兼任「不误报」：带回退值的未定义 `var()`、本页真实存在的锚点、已存在的站内页都不该被点名。
  - `check-raf`：永久循环要拦，三类合法停机写法（条件排帧的行首写法与单行写法、`rafId`+`cancel`、单次排帧）都不能误报，而「同一行上有个与排帧无关的 `if`、之后无条件排帧」必须仍然拦住——最后这条是给判定放宽加的护栏，没有它，放宽就等于一律放过。
  - `check-aria`：重复 id 与四种断掉的引用（`aria-labelledby` / `aria-describedby` / `label[for]` / `aria-controls`）都要变红**并点名具体 id**；`role="img"` 的 svg 缺名只报不拦（装饰图整棵子树 `aria-hidden` 就不该有名称，工具无法从静态 markup 分辨内容图和装饰图）。
  - `check-headings`：缺 `h1`、多个 `h1`、`h1` 不在源码最前、向下跳级都要拦；**往回跳（h3 → h2）不能报**——没有这一条，这道门禁可以靠「层级只准递增」通过，那会逼着每个章节结尾造假标题。
  - `check-inline-scripts`：语法错误、`import` / `export`、顶层 `await` 都要拦；**async 函数体内的 `await` 和 `for await` 不能误报**——本站好几页的可选联网逻辑就是这么写的，用正则找 `await` 的实现会误伤它们，逼人白改成 `.then` 链。这道门禁用 `node:vm` 的 `Script` 只编译不执行，靠的是真正的解析器，所以这两条天然成立。
  - `check-contract`：导航七项的文字与 href、共享层 `?v=` 与离线壳版本一致、`pwa.js` 必须加载、skip-link、恰好一个 `aria-current`、`data/playful.js` 排在 `assets/js/playful.js` 之前、控件要有可访问名称——八条都要拦。夹具的版本号从 `sw.js` 的 `CACHE` 名里动态读，和工具自己取 `shellVersion` 同源，否则别人一提缓存版本这个测试就废了。**作品表单那一组断言（`WORK_TYPES` 白名单、状态行、不得自写 `saveWork`）只对详情页生效，目前未覆盖**，原因和补法写在 `test-check-contract.mjs` 源码里——别以为它已经被守住了。
  - 顺带一说，那个最小合规夹具本身就是「一个新页面的最低要求」清单，比散落在本文件各处的描述更好照抄：见 `test-check-contract.mjs` 里的 `parts`。
  - **写自检时，凡是「工具里有一份权威定义」的东西都要从工具里读出来，不要抄一份到测试里。** 抄一份的下场是隔一天就废：`test-check-contract.mjs` 第一版把导航六项抄进夹具，随后站里加了「医药箱」第七项，`EXPECTED_NAV` 变成七项，基线立刻变红——而那不是缺陷，是测试没跟上。现在夹具的导航是解析 `check-contract.mjs` 的 `EXPECTED_NAV` 生成的（`href` 是相对仓库根的，夹具在 `pages/` 下要换算），共享层版本号是读 `sw.js` 的 `CACHE` 名。同理，变异用例里也别写死具体的导航文字，用 `NAV[1].label` 这种取法。
- `tools/test-check-classes.mjs` 用回滚验证证明上面这条断言有效：它临时把已修好的 8 处缺陷改回原状，确认审计会变红并点名具体 class，再还原。另有 3 组假阳性回归（上面那三类），每组都做双向验证——既要求当前代码下不误报，也要求把那种写法回滚掉之后该 class 确实重新进入清单，否则「不误报」可能只是因为清单整个没输出。
- `tools/check-render.mjs` 抓「浏览器会静默吞掉、但孩子一眼看得出不对」的结构性缺陷：容器标签不闭合或错嵌套（少一个 `</div>` 会把后面整块吸进上一个容器）、同一元素上重复的 `class`/`id`（只有第一个生效，第二组样式静默丢失）、站内 `href`/`src` 指向不存在的文件或本页不存在的锚点、CSS `url()` 找不到文件、`<use href="#x">` 找不到目标、`<img>` 缺 `alt`、CSS 大括号不平衡、以及**没有回退值的未定义 `var(--x)`**。最后这条是最隐蔽的一类：`var()` 替换失败会让整条声明在计算值阶段失效退回 `unset`，元素连共享层给的底色一起丢掉。查询串（`?v=15`、`?kind=math`）是本站正常写法，只校验去掉查询串后的真实文件。共享 JS 用 `setProperty("--x", …)` 在运行时写的变量算已定义（`--i` 给纸屑错帧、`--fill` 给进度条）。
- `tools/check-theme.mjs` 抓「浅色主题下残留的暗色主题写法」。屏幕上只有浅色主题（外加 `kid.css` 的 `html[data-mode="kid"]` 童趣调色板）；那套 `html[data-theme="dark"]` 已因不可达而删除，但页面 `<style>` 里还留着一批当年为它写的字面量，`check-contrast.mjs` 只算两套主题的 token × token，看不到这些硬编码值。判定范围有意收窄到「不需要知道层叠和 DOM 就能确定」的情形，因为没有浏览器就拿不到真实 backdrop，猜祖先只会制造噪音：
  - **同一条规则里的 `color` + `background`**：把背景分别合成到纯白和纯黑上，两种极端都不达标才算错（正文 4.5、WCAG 大字 3.0）；只有一种不达标说明结论依赖祖先，降级成提示。ocean 的 `.zone .who span` 是后者——它的 10% 白底压在 JS 写的深色分区上，白字其实完全可读。
  - **写死的暗色画布色当背景**：用「低饱和 + 很暗」判别（`#0b0f1a` `#161d33` `#08101f` 在内，而 `--math #1b64c8`、`--sci #0b7a45` 这类高饱和品牌色不在），alpha ≥ .5 时算错（此时 backdrop 无关），更透明的降级成「浅底上变成灰蒙版」提示。
  - **提示项**：为暗底写的近白高光描边（浅底上等于没画）、近白文字（需人工确认它确实落在深色场景里）。
  - 确实需要深色的舞台写进 `ALLOW` 并注明理由（影子剧场幕布、夜空/星空/深海画布、地球与地震的深蓝 SVG 面板等），工具会把匹配不到规则的过期条目列出来提醒清理。
- `tools/check-rendered-contrast.mjs` 用本机 Chrome 读 `getComputedStyle`，按**真实层叠和 DOM** 逐个文字节点算对比度。它抓的是前两个色彩工具都抓不到的一类：**文字色和背景色来自不同规则、由继承和层叠拼出来的组合**。这类最容易出错，因为改一条规则不会提示你另一条被盖掉了。已经踩过的三次都是同一个形状：
  - `base.css` 的 `p { color: var(--ink-mid) }` 有选择器权重，会盖掉容器上设的浅色继承值 —— light-and-shadow 的深色幕布、earth 的彩色地层，段落都因此变成深底深字。给容器设 `color` 时，必须同时用**更高权重**的选择器覆盖 `p`（`.theater-hero p`）或显式 `color: inherit`（`.stratum p`）。
  - 同一个 token 既当小号粗体文字（需 4.5）又当大色块（只需 3.0）时，`check-contrast.mjs` 按 3.0 判会放过它。孩子模式的学科色和浅色主题的 `--warn` / `--code` 都是这样漏掉的。
  - 页面级 `:root` 覆盖（`parents.html` / `paths.html` / `kitchen-science.html` 各有一套纸色调色板）`check-contrast.mjs` 完全看不到，只有真实渲染才量得到。
  - 判定细节：SVG 文字读 `fill` 而不是 `color`；行内元素取第一个 client rect 而不是整体 bounding box（换行后中心点会落到行间空隙）；纯 emoji 跳过（彩色字形不受 fill 控制）；多层半透明按 source-over 预乘累积到画布白底。压在渐变或背景图上的文字取不到准确底色，单独计数为「未判定」，不算通过。
  - **`<line>` 不算衬底。** 直线永远没有内部，`fill` 一个像素都不会画，可它的 computed fill 默认仍是 `rgb(0,0,0)`；而刻度线、坐标轴恰恰爱贴着数字标签。早先把 `line` 留在「会上色的 SVG 形状」集合里，命中栈里一有它，标签就被记成「压在纯黑上」——两个方向都错：angle-lab 的「180」被误报成 1.61:1 的假红，而更多贴着线的浅色标签因为「对黑对比度很高」拿到假绿，把十几处真实的 4.0–4.5:1 边缘缺陷整批遮住了。把 `line` 从集合里拿掉后这批缺陷才第一次露头（echo/scale/volume 的 ink-mid 压粉板、fossils 的坑内标签低到 1.4:1），已逐页修复。`polyline` 保留：它的内部可以被 fill 填充。
  - **采样前先关掉整页 transition/animation。** playful.js 在 body 末尾按偏好翻 `data-mode`，审计把它兜底翻回目标模式时，`a { transition: color .18s }` 会让文字色在过渡窗口里停在旧模式的值，而 background 不在过渡清单里、瞬间就换——量出来是「孩子模式的字压家长模式的底」这种现实中不存在的组合（skip-link 的 `#402d1c` 压 `#1b64c8` = 2.3 假红，连续两轮全量都复现在 games/nature 两个 index 上）。审计量的是稳态，不是过渡帧。
  - **SVG 里的衬底形状必须按「绘制顺序 + 几何包含」自己找，不能只靠 `elementsFromPoint`**：命中测试会跳过 `pointer-events:none` 的元素，而本站插画舞台普遍带这个属性。只靠命中测试会量到更下面的 CSS 背景，把「浅色文字压在深色天空上」误判成「压在浅底上」——我据此改错过三处（weather 的 `#4f5a68` 风暴天空、dinosaurs 的 `#123a5c` 夜空、ocean 全部 `.diagram` 的 `#0b2545` 衬底），把本来对的浅色标注改成了深色，反而从 8.5:1 掉到 2.7:1。圆和椭圆还要按方程判包含，只看 bbox 会把四个角算进去（ocean 潜水器图的「耐压球」压的是一个 `<circle>`）。
  - `--print` 按打印稿判定：把媒体切成 `print` 让 `print.css` 参与层叠，并且**只把 CSS 背景当作不输出、SVG 形状的 `fill` 仍然算**。因为 Chrome 打印对话框里「背景图形」默认关闭，CSS 背景（含渐变、含 JS 写的内联 `background`）不会印，而 SVG 的 `fill` 是内容，照样印。首次跑出来有 107 处白纸白字，其中 43 处正好 1.00:1 —— 屏幕上有意做成深色的场景（深海分层表、地层清单、影子剧场、船舷、色板芯片、徽章）在纸上整块消失。修法见 `print.css` 末尾那段，以及「插画的衬底应该画成 SVG `<rect>`、而不是只写 CSS `background`」这条经验：写成 SVG 内容，屏幕和纸上才一致。
- `tools/check-controls.mjs` 验证无障碍一节里此前没有任何工具把关的两条硬要求：**触控目标至少 44×44** 与 **键盘焦点必须可见**。对小孩子这不是形式条款——手指精度不够，30px 的按钮会反复点空，孩子会以为页面坏了。
  - 触控目标按**真实点击区域**量，不是元素自己的盒子：勾选框/单选框自身的方块只有 13–22px，但点包着它的 `<label>` 同样能激活，所以取两者并集（本站 `.space-check-row` 就有 `min-height:48px`）。量错对象会把一批本来合规的表单全报成不合格。
  - 排在正文一句话里的链接按 WCAG 2.5.5 豁免，单独计数。判据是「父元素里除了这个链接还有实际文字」，不是父标签白名单——页脚的来源链接直接挂在 `<footer>` 下、没有 `<p>` 包裹。
  - 焦点可见性用 `Input.dispatchKeyEvent` 发**真实 Tab 键**，而不是 `el.focus()`：`:focus-visible` 只在键盘交互启发式命中时才生效，用 JS 调 `focus()` 常常不触发，测出来的是假象。每页抽查 24 个控件（`--focus-sample` 可调）。
  - 必须多视口跑。760–900px 这一段最容易出事：单列断点之上、三列又放不开，`light-and-shadow` 的 `.task-fields` 就在 768px 把 `select` 挤成 30px 宽。栅格轨道要给 `minmax(min(100%,…),…)` 下限，光靠 `min-width:0` 会让它塌掉。
- **`data-theme="dark"` 已删除（原为不可达死代码）**。当初它是一整套 `html[data-theme="dark"]` token 覆盖加 `body::before` 氛围光，但全站没有任何 HTML 或 JS 设置过这个属性，Progress 的固定偏好里也没有主题项，用户到不了。它还不是无害的：`check-contrast.mjs` 当年三套主题一律阻断，深色专属的 `--on-accent` on `--accent-deep` = 5.01 长期是全站最紧的几组之一，等于让一套没人看得见的调色板反过来约束浅色主题的选色余地。删除时一并处理了四处连带引用：`check-contrast.mjs` 三套主题改两套（138 → 92 组）、`check-rendered-contrast.mjs` 去掉 `--theme` 开关、`check-theme.mjs` 把 `:root` 块的结束分界从「`indexOf('html[data-theme="dark"]')`」换成花括号配对（原写法在删掉那条规则后会返回 -1 并退回 `css.length`，把 base.css 从 `:root` 到文件末尾全部当成 token 块解析，静默污染整张表），以及本文件这几条描述。**要恢复夜间阅读不要把那段 CSS 贴回来**：需要同时补 Progress 的主题偏好项、`playful.js` 的 `syncPreferences()` 同步、家长区开关，还要处理 8 个页面级 `:root` 纸色覆盖和约 147 处写死的浅色背景字面量，并给 `check-rendered-contrast` / `check-controls` / `check-print` 各加一种主题模式。
- `tools/check-contrast.mjs` 直接解析 `base.css` `:root` 与 `kid.css` `html[data-mode="kid"]` 两套 token，按 WCAG 2.1 相对亮度算 92 组前景×背景。正文文本阈值 4.5、大字/图形 3.0、`--on-accent` on `--accent` 按按钮文字 4.5 判。不需要浏览器，可进门禁；`pages/design-system.html` 那张实测表是运行时校验，两者互补。
- `tools/check-headings.mjs` 按文档顺序检查标题：每页恰好一个 `h1`、`h1` 必须是第一个标题、相邻标题不得跳级（h1→h3）。视觉顺序和源码顺序冲突时改 CSS `order`，不要为了排版把 `h1` 挪到 `h2` 后面——human-body 的 hero 就是这样处理的。
- `tools/check-raf.mjs` 盯的是「递归排帧」的 `requestAnimationFrame`：回调里又排下一帧的循环，必须有停机手段——要么记下 `rafId` 并有 `cancelAnimationFrame`，要么排帧语句被条件包住（`if (running || settle > 0) { rafId = rAF(loop); } else { rafId = 0; }`）。这是电量问题：孩子在平板上把球停下、手离开屏幕后，永久循环仍会每秒重画 60 次。唤醒用捕获阶段的 `document` 事件委托（`pointerdown/move/up/cancel/leave`、`input`、`change`、`click`、`keydown`）调 `requestDraw()`，不必逐个改几十个控件处理器；`resize()` 走 `ResizeObserver`、不在事件委托覆盖范围内，必须自己调一次 `requestDraw()`。启动也走 `requestDraw()` 而不是裸 `rAF`，否则首帧待执行时 `rafId` 仍是 0，一次交互就会重复排帧。参考实现：`games/gravity-drop.html`、`games/wave-maker.html`。单次排帧（回调里不再排下一帧，例如 human-body 只为下一帧改个 attribute）不算循环。
  - **判定是纯文本启发式，容易被排版影响，这一点要当心**：7 个含递归 rAF 的页面里有 5 页（light-and-shadow / number-blocks / ramp-and-roll / turtle-geometry / wave-maker）根本没有 `cancelAnimationFrame`，完全靠「条件排帧」这一条过关。原来识别条件排帧的正则带 `^` 锚点、要求整行以 `if` 开头，于是照本工具报错建议写、但把循环体压在一行里的代码会被误报成永久循环——而本站有几页的内联脚本本来就是压缩成单行的。已去掉锚点，改判「同一行上 `if (...)` 出现在 `requestAnimationFrame` 之前，且两者之间没有 `;` `{` `}`」（后一半是必要的，否则 `if (x) { foo(); } rAF(loop);` 这种「if 与排帧无关」的写法会被误当成有守卫）。改动前后对现有 7 页逐页比对，判定完全一致。`test-check-raf.mjs` 里那条「整个循环体压在一行」的用例就是这处修复的回归守卫。
- `tools/check-completion.mjs` 验「内容与交互要求」第 3、4 条：**完成表示孩子确实做过该任务，不等同于打开页面**；`Progress.visit()` 只表示访问，笔记与完成是独立语义。这是整个足迹体系的地基：如果哪一页在载入时就顺手 complete 了自己，家长在「我的足迹」里看到的「做过」全是假的——而这种错误不报异常、不改页面外观，只会让记录慢慢变成一堆没有意义的对勾。所有实验/自然详情页各自判定完成条件，判定逻辑写在各页脚本里，此前没有任何工具核对触发时机。做法是全新 localStorage 载入后**什么都不点**，然后断言：完成、笔记、作品、贴纸全为空，而**访问必须已记录**。
  - 最后那一条是这道审计的自检，不是附加要求：只有「访问记好了、完成还是空的」同时成立，才能证明确实是语义分清了，而不是 Progress 压根没跑起来、所以什么都为空。`test-check-completion.mjs` 因此有两条变异——注入一次载入即 `complete()`，以及拿掉 `visit()`——两条都必须变红。
  - 写变异测试时注意注入位置：页面自己那段主脚本在 `<head>` 里就跑了，那时 `window.Progress` 还不存在（共享层在 body 末尾才加载），往那里注入 `Progress.complete()` 只会抛 ReferenceError 打断后半段脚本，并不会写下完成记录。要注入到 `progress.js` 之后。反过来说，这也解释了为什么各页的主脚本必须把所有 Progress 调用都推迟到事件处理器里。
- **「不建立连续打卡、排名或惩罚机制」这条只静态扫 `data/playful.js`，不要扩到页面内联脚本。** 试过：按 `金币|排行|连胜|倒计时|coin|leaderboard|streak|countdown` 扫页面脚本，零真阳性、三处误报——estimation-station 的「倒计时」在一句「减少动效时不做倒计时补间」的注释里、`coin` 是量厚度用的硬币；kitchen-science 的 `coin` 是浮沉实验的硬币形状；why.html 的「连胜」出现在批评「孩子在追逐连胜而不是理解」的评估文字里。契约禁的是机制，而 `coin` 在一个科学站点里本来就是实物名。会对正当内容喊狼来了的门禁比没有门禁更糟，它会训练人忽略告警。
- `tools/check-offline.mjs` 是「装到平板上、没网也能玩」这个承诺的**唯一端到端验证**。此前只有 `check-contract.mjs` 静态核对过 CORE 清单在磁盘上存不存在——那证明不了 Service Worker 真的装上了、缓存真的写进去了、断网后页面真的还打得开。这条链上任何一环断掉都是静默的：注册失败被 `.catch()` 吞掉（契约要求如此，免得 `file://` 下报错），install 阶段任一条目失败会让**整个**缓存为空，而有网时完全看不出区别——直到孩子在车上、在飞机上打开它，一片空白。工具自带一个零依赖静态 HTTP 服务器（Service Worker 要安全上下文，`file://` 拿不到，必须走 `127.0.0.1`），判五条：
  - SW 能注册并进入 `activated`，scope 落在站点目录，注册的脚本确实是 `sw.js`。
  - 缓存名与 `sw.js` 的 `CACHE` 常量一致，且 CORE 里每一条都真的在缓存里——逐条核而不是看总数，因为 install 是 `Promise.all` 逐条 `cache.add`，任一失败即全空。`CORE` 里的 `"./"` 是导航兜底入口、不是磁盘文件，核对时排除。
  - **把 HTTP 服务器关掉**再加上 `Network.emulateNetworkConditions({offline:true})`，然后逐页打开首页、一个实验页、一个自然页和足迹页：标题在、共享样式真的生效（量 `.nav` 的 computed `position`）、`Progress` 与 `Playful` 可用。关服务器是为了杜绝「其实还是走了网络」的假通过。
  - 断网时访问一个没缓存过的路径，导航兜底要回到首页而不是浏览器错误页。
  - **这条审计的时序坑最多，三处都踩过，都表现为「离线能力坏了」的假红：**
    - `navigator.serviceWorker.ready` 一有 active worker 就 resolve，但那一刻 `state` 可能还停在 `activating`。要轮询等它落到 `activated`。
    - 缓存装好、worker 也 activated，**不等于当前页已被接管**。首次注册的那一次导航通常还是「无控制者」（`sw.js` 里有 `clients.claim()`，但接管发生在 activate 之后，时序上不保证赶得上）。此时断网，请求绕过 SW 直奔网络，四个页面全部拿到浏览器错误页。要等 `navigator.serviceWorker.controller` 出现，等不到就再导航一次。
    - 即使以上都满足，**第一次断网导航仍会偶发拿到错误页**（和断网模拟刚生效抢时序），四次里约一次。所以每页导航重试一次。这不是掩盖缺陷：缓存里有没有这一页是上一步逐条核过的确定事实，同一份缓存、同样的断网状态下第二次能成功就说明 SW 供得上，真供不上时两次都会失败。加上重试后连续五次稳定通过。
  - `file://` 下不得注册 SW，也不得留下 console 错误。这一步要在页内加超时竞速：`getRegistrations()` 在 `file://` 这种不透明源上可能既不 resolve 也不 reject，`try/catch` 抓不到「挂住」，`awaitPromise` 会一直等到 CDP 超时把整轮审计弄废——第一版就这样间歇性挂掉，是 `test-check-offline.mjs` 的基线跑把它暴露出来的。
- `tools/test-check-offline.mjs` 往 CORE 里塞一条不存在的文件，确认审计变红（缓存缺失 + 四个页面断网打不开 + 兜底失效，共 6 条报错），再逐字节还原 `sw.js`。
- **这些 Chrome 工具的假失败长什么样**，踩过三种，都会伪装成页面缺陷：
  - **并行跑**。同时开多个 Chrome 实例（尤其 `check-offline.mjs` 还自带 HTTP 服务器）会把资源打满，报 `Target.createTarget 超时`、`Failed to open a new tab`、`Session with given id not found`。一个页面接一个页面全红，但换成单独跑就全绿——整片同时失败基本就是这个原因。
  - **残留进程**。上一轮的 Chrome 没退干净，下一轮抢不到资源。跑之前先 `pkill -f remote-debugging-port` 更稳。
  - ⚠️ **但 `pkill` 本身就是并行时最危险的动作**：它不区分「残留的」和「正在被别人用的」。后台挂着 `run-gates.mjs --only chrome` 时在前台截图、量布局，顺手 pkill 一下，就会把门禁正在用的浏览器一起杀掉——表现为 `Chrome WebSocket 已关闭`，而且整轮不会打出汇总行，看起来像卡死。本次会话就这样白跑了一轮 18 分钟的 Chrome 组。规矩是：**要么等它跑完，要么这段时间只做不碰浏览器的活**（静态门禁、读代码、改文本）。
  - **读到正在被写入的文件**。多人／多线程同时改工作区时，审计可能载入到半成品，报出的缺陷在下一秒就不存在了。判断依据是**节点数或字数对不上**：`check-kid-mode.mjs` 曾报 fraction-lab「孩子模式看不到完成状态」，节点数 703；单独重跑是 697、全绿——文件当时正被改写。报缺陷前先重跑一次确认，别急着改代码。
- `tools/check-kid-mode.mjs` 验本文件「孩子模式」一节那两条：「不得删掉任务文字、完成状态或无障碍名称」和「隐藏是纯展示层行为，不得移除节点，也不得让页面脚本因找不到节点而报错」。孩子模式是默认值，而它靠一条 `html[data-mode="kid"] [data-audience="parent"] { display:none }` 大面积收内容——只要有人为了让界面清爽，顺手给任务块或状态行加上 `data-audience="parent"`，孩子就再也看不到「这一页要我做什么」和「我做完了没有」，而这两件事恰恰是完成语义的全部依据。这类改动在屏幕上看起来更干净，评审时很难发现；同一个陷阱刚在打印版上真实发生过一次。判定走 `parent → kid → parent` 三次切换，用页面自带的共享偏好控件、不刷新页面，测的就是家长真实操作的那条路径：
  - 孩子模式必须看得见至少一处 `.task-status`/`.status`；整个任务区被收进家长层的话这里就红。
  - 每一处可见状态行都必须待在一个「有名字的分区」里（`aria-labelledby` / `aria-label`，兜底取最近的可见标题），那个名字就是孩子看到的任务陈述。**不按「标题里有没有『任务』二字」判**——那是嗅词汇，各页措辞本来就不同，而且有的页面把任务直接写在状态行里（gravity-drop 的「保持高度和重力不变，再完成另一种空气条件」就是任务本身）。第一版就是按词判的，把 doodle-pad、gravity-drop、wave-maker 三个其实交代得很清楚的页面误报成缺任务。
  - 切到孩子模式不得减少 DOM 节点数，切回来要恢复；孩子与家长模式下都不得有可见控件缺无障碍名称；两次切换全程不得有 console 错误或未捕获异常。
  - 输出会逐页写出孩子实际看到的「任务标签 → 状态」，可以直接当一份人工复核清单读。
- `tools/test-check-kid-mode.mjs` 注入「把任务区整块标成 `data-audience="parent"`」这一最现实的误改，确认审计变红并点名，再逐字节还原。选页面要注意：**wave-maker 不能用**——它孩子模式下有两处状态行，藏掉一处另一处还在，孩子仍然看得到进度，审计不报警是对的，不是漏报。
- `tools/check-print.mjs` 用真实浏览器把媒体切成 `print`，逐页看**打印出来到底长什么样**。此前只有「有没有以 `media="print"` 引入 print.css」被检查过，纸上的结果没有任何工具看过。这个场景在本站不是附属功能：整个项目的立场就是别把孩子一直按在屏幕前，把「背后的原理」和「给家长的问题」打出来带到饭桌上聊，是设计里的一环。它按契约「打印」一节判四条：交互外壳（`.nav`/`button`/`canvas`/`form`/`input`/`select`/跳转链接）必须隐藏；标题、原理、家长提问、任务文字、完成状态必须仍然可见；可见文字对白纸的对比度 ≥ 4.5；**禁用 JavaScript 再打印一遍，上面这些仍须成立**（契约明写不得要求先运行脚本，只要标题或原理是 JS 注入的就会中招）。内容判定取「打印媒体下真实可见的文字」再查关键内容在不在——按选择器判会被各页不同的类名绕过。「原理」只对 `games/` 判字面词，`nature/` 用问题式表述，和 `check-content.mjs` 同一口径。这道审计一次抓出三类真缺陷：
  - **家长层在纸上整块消失**（19 个详情页全中，最严重的一条）。`kid.css` 那条 `html[data-mode="kid"] [data-audience="parent"] { display: none !important }` 没有媒体限定，打印时同样命中，而 Progress 的 `mode` 默认就是 `kid`——所以家长在默认状态下打印任何一页，拿到的纸上既没有「背后的原理」也没有「给家长的问题」，恰恰是契约要求必须保留、家长也最想带走的两样。修在 print.css：打印媒体里放开家长层，用 `display: revert` 让元素回到 UA 默认值，别写死 `block` 把行内标记撑成一行一个。
  - **放开家长层会顺带把交互控件也放出来**。`html[data-mode="kid"] [data-audience="parent"]` 的特异度 (0,2,1) 高过通用的 `button, form { display:none !important }` (0,0,1)，两条都带 `!important` 时前者赢，于是 13 个页面的作品表单外壳和 turtle-geometry 的「回到起点重画」按钮跑到了纸上。补一条 `:is(form, button, input, select, textarea, canvas, video, iframe, .no-print, [data-print="hide"])` 把特异度提到 (0,3,1) 重新压回去。
  - **print.css 的整套调色板在默认状态下等于没写**。它写在 `:root`（0,1,0），而 kid.css 的孩子调色板挂在 `html[data-mode="kid"]`（0,1,1），特异度更高，后加载也压不过。后果最明显的是 `--on-accent`：kid.css 定为 `#ffffff`，于是序号圆点、A/B 结果字母这类「深底白字」在纸上变成白纸白字（Chrome 打印默认不输出背景色，本文件也声明了 `print-color-adjust: economy` 主动省墨），ramp-and-roll 的三步序号 1/2/3 和 A/B 就是这样整块消失的，工具量到 1:1。修法是给 print.css 的 `:root` 逐条加 `!important`——自定义属性支持它，让纸上的调色板真正说话。
- `tools/check-privacy.mjs` 用真实浏览器验「`onlineData` 默认关闭时不得向外部主机发起任何请求」。这是儿童软件的隐私底线：孩子点开一页，不该在家长没同意的情况下让第三方主机看到这台设备的存在。`check-contract.mjs` 只能静态确认页面里出现了 `Playful.onlineAllowed()` 和那个开关，**它没法知道每一条 fetch 路径都真的走了门禁**——少一个分支就会真的把请求发出去，静态检查看不见。所以这里：
  - 全新 profile 载入，先断言 `Playful.getPreference("onlineData")` 确实是 `false`；默认值本身错了后面都不用谈。没加载共享层的纯文档页跳过这一项，但下面那条照判。
  - 关闭态下**逐个点击页面上可见的 `<button>`**，再把 `<select>` 各拨一次。多数联网路径是交互触发的（space 的照片墙要先点一颗行星，dinosaurs 的化石列表要先选一种恐龙），只 load 不点会漏掉它们。全程监听 `Network.requestWillBeSent`，任何非 `file:` 的请求都算违规——**图片也算**，外部主机的 `<img src>` 一样会暴露设备。不点 `<a>`：那会导航走，后面的观察就换了页面。
  - 再把开关打开、重复同样的交互，把这一轮的外部请求数**只报告不判定**。机器可能本来就没网，而 `requestWillBeSent` 在请求发起时就触发，所以为 0 也可能只是没点到那个控件。它的作用是让人看到「开关拨上去以后确实有东西想出去」，不至于把功能写死成永久离线还以为自己合规。
  - 每页开独立 target 并把整页包在 `try` 里：某一页卡住只标成「结论不可信」，绝不中断整轮。第一版就踩过这个坑——一次 `Runtime.evaluate` 超时让后面 16 个页面被静默跳过，输出看着像全绿。CDP 超时因此放到 60s：遍历点击本身只要一两秒，但个别控件会触发原生 `<dialog>` 的 `showModal()` 或一段动画链。
- `tools/check-content.mjs` 补的是本文件里**写了要求、但长期没有任何工具验**的三条。三条都真实漏过一次，所以才建了这道门禁：
  - **实验页五件套**（「内容与交互要求」第 2 条）：`games/` 下每个实验页都要有一句「这在教什么」、可交互画面（`canvas` 或带 `viewBox` 的内联 SVG）、≥3 条给家长的问题、简短的「背后的原理」。漏过的是 wave-maker——它把「这在教什么」写成了家长折叠块里的「学习目标」，孩子和家长在页面上都看不到这一页在教什么。判定范围**只到 `games/`**：契约那条写的是「每个实验页」，而 `nature/` 是自然专题，用的是问题式表述（`space.html` 的「为什么不会直直掉下去？」就是它的原理段），套同一把尺子只会制造噪音。「给家长的问题」的标签各页写法差别很大（`给家长的 3 个问题` / `陪伴追问` / `陪玩时可以这样问` …），所以按关键词族匹配标签、再数它后面最近那个列表里的 `li`，取全页最大值。
  - **动效偏好来源**（「无障碍」最后一条）：内联 JS 只要读了 `prefers-reduced-motion`，就必须同时读 `Playful.motionReduced()`。漏过的是 pattern-machine——它在载入时取了一次 `matchMedia` 快照，家长在足迹页拨的「减少动效」对那一页完全无效，连改系统设置也要刷新。对动效敏感的孩子这不是形式条款：开关拨了却照样动，家长会以为开关坏了。正确写法是**每次调用时求值**的函数（`function motionOff()`），既拿到最新偏好，也不依赖 `playful.js` 是否已经加载完——页面内联脚本可能先于共享层执行。
  - **画布 dPR**（「内容与交互要求」第 5 条）：有 `<canvas>` 的页面，内联 JS 里必须出现 `devicePixelRatio`。这一页大半内容就是那块画布，糊了等于内容糊了。
  - 三条都是静态判定，不启浏览器，可进门禁。后两条是「有没有读对来源」的存在性判定，不保证每个调用点都用对了，真实行为仍要靠浏览器验证；这道门禁挡的是整类遗漏。工具会剥掉 HTML 注释——注释里提到 `devicePixelRatio` 或「这在教什么」不算实现（`check-contract.mjs` 就因为不剥注释，把注释里写的一个标签名当成过真控件）。
- `tools/test-check-content.mjs` 用回滚验证证明上面那条断言有效：临时把 5 处缺陷改回原状（含 wave-maker 与 pattern-machine 两处真实漏过的），确认审计会变红并点名具体页面与断言，再逐字节还原。变异点要求在目标文件里恰好出现 1 次，否则报「无法做精确变异」而不是悄悄改错地方。
- `tools/test-playful-e2e.mjs`、`tools/test-trail-e2e.mjs`、`tools/verify.mjs` 需要真实 Chrome（CDP）。没有安装 Chrome/Chromium 的机器上跑不了，应如实标注「未运行」，不得当成通过。

## 家庭医药箱分区（`pages/medicine-cabinet.html` + `pages/med-*.html`）

这是一册面向家长的医疗速查，把美国儿科学会（AAP / HealthyChildren.org）、《默沙东诊疗手册》、美国 CDC 与美国心脏协会的公开材料整理成中文：总览页 `pages/medicine-cabinet.html`，加一组专题页：`med-fever` / `med-breathing` / `med-tummy` / `med-skin` / `med-eczema` / `med-rash-illness` / `med-infection-bites` / `med-urinary` / `med-bone-injury` / `med-development` / `med-dosing` / `med-firstaid` / `med-safety` / `med-caregiver` / `med-newborn` / `med-sleep` / `med-nutrition` / `med-allergy` / `med-eent` / `med-vaccine`（页数会增长，权威计数以 `check-medicine-cabinet.mjs` 的输出为准，不要在正文里再写死数字）。它和站内其他页面遵守同一份共享契约（三层样式、PWA 接线、固定七项导航、无障碍、打印），但有几条只属于它的约定，写在这里免得后来的人「修」错方向。

  **`med-safety` 与 `med-caregiver` 是这一册里唯一两页「不讲治病」的内容，别当成跑题删掉。** `med-safety` 讲意外伤害预防（窒息、溺水、中毒、跌落、烧烫伤、车内、纽扣电池与磁珠），理由是伤害本身就是幼儿最主要的死亡与致残原因，而此前整册只有事后的 `med-firstaid`——一册家庭医疗参考只写「出事之后怎么办」是不完整的；AAP 为此专门做了面向家长的 TIPP 材料。`med-caregiver` 讲婴儿哭闹与照护者状态，理由更直接：摇晃婴儿造成的头部损伤几乎总是发生在一个疲惫到极点的大人面对哭不停的孩子的那一刻，而 AAP 的预防建议核心就是一句反直觉的话——**把孩子放到安全的婴儿床里、离开房间十到十五分钟，是官方推荐的保护动作，不是失职**；同一页还写了 AAP 建议在 1／2／4／6 月龄儿保用验证过的量表筛查产后抑郁，因为照护者的状态直接决定安全睡眠、喂药核对、洗澡看护这些事会不会被将就掉。这两页都不给量表、不给剂量，红旗段里明确写了「有伤害自己或孩子的念头」时先把孩子放到安全处再立刻求助。

  拆分粒度按「家长在紧急时会怎么找」定，不按医学分科。所以湿疹从 `med-skin` 里独立出来单开一页（洗澡、保湿、外用激素强弱与部位、湿包疗法、继发感染、忌口误区，足够撑起一页，而挤在皮肤页里只能给一张卡）；而泌尿、骨骼外伤、发育行为、皮肤感染与叮咬这几页覆盖的是此前整册的空白——发热查不出原因时要想到查尿、不肯用一整条肢体要当天看、发育倒退不能等下次体检、动物咬伤破皮必须就医，这些都是「不知道该翻哪一页」时最容易错过的。

- **它在导航里是第七项「医药箱」。** 这一项是有意加的，理由见「固定七项导航」那一节；`check-contract.mjs` 的 `EXPECTED_NAV` 逐字节比对导航，所以增删导航必须同时改那个数组、全部 HTML 页面的导航块和契约正文。除导航之外还有两个入口：首页「选之前先读」的卡片和 `pages/parents.html` 结尾。**不要把这些页面搬到 `games/` 或 `nature/` 下**——那两个目录下的非 index 页会被判定成「详情页」，随之要满足唯一探索目录条目、`data/explorations.js` 注册、作品表单、贴纸与伙伴接入点、`kid-hero-scene`、`Progress.complete()` 等约二十条要求，而这些对一册医疗参考资料毫无意义。
- **共享外壳样式在 `assets/css/med.css`，不要再往页面 `<style>` 里抄。** 加载顺序是 `base.css → kid.css → med.css → print.css`（最后一个带 `media="print"`）：夹在 `kid.css` 之后才能覆盖孩子模式外壳，排在 `print.css` 之前才不会夺走打印稿的最终决定权（`check-contract.mjs` 只校验 base < kid < print 的相对次序，插在中间不违反契约）。抽取的动因是数字：抽之前 19 页各带约 58 行内联样式，**其中 39 行在 19 页里逐字节相同**，1114 行里约 700 行是纯复制；抽完剩 80 行页面独有。复制本身不算错，代价是「改一处要记得改十九处」——打印防跨页那条规则就是活例子，它先只写进了后一批 11 页，8 个早期页面漏掉了，而漏掉的那 8 页在屏幕上完全看不出区别。留在页面 `<style>` 里的应当只有该页独有的东西：`.med-tbl { min-width: … }`（各页列数不同）、`.cond-card` 的 `--tone` 回退色、总览页的 `.med-grid` / `.med-card` / `.filter-row` / `.count-line` / `.principles`，以及 `med-fever` 的月龄分档、`med-dosing` 与 `med-tummy` 的核对清单这类局部组件。
  - **`med.css` 必须进 `sw.js` 的 `CORE`，也必须带 `?v=` 版本锚。** 版本锚的真正判据是 `check-contract.mjs` 里的 `mandatoryShellResources` / `optionalShellResources` 两个数组（曾有一条从未参与判定、却长得像判据的 `VERSIONED_SHARED` 正则——只改它不会让检查生效，实测把一页的 `med.css?v` 改错门禁照样全绿——已删除）。归到 optional 是因为只有医药箱册加载它，`referenced` 守卫会让其余页面跳过；一旦引用就必须带对版本，否则提升 `CACHE` 时其余共享层都换了新串、只有 `med.css` 继续供旧样式，而这种错是静默的。
  - **这类「结果必须完全不变」的重构，用 `tools/_med-style-snapshot.mjs` 证明，别靠门禁全绿。** 现有门禁证明不了等价：`check-classes` 只问「这个 class 有没有规则」，不问规则内容；`check-rendered-contrast` 只看颜色，量不到 `padding`、`gap`、`grid` 轨道；`verify.mjs` 只看有没有横向溢出。漏掉一条 `gap` 或抽错一个 `min-width`，全部门禁照样绿，坏掉的只有排版。该工具逐元素记录 19 页 × 3 视口 × 2 种 `data-mode` 的 computed style 并严格比对（本次抽取结果为 0 处差异）。选它而不是 `_pixel-proof.mjs`，是因为截图哈希对共享层的并发改动没有免疫力——别人改一次 `base.css`，每页截图都变；计算样式只要 CSS 等价就必须逐字节相同。**它的 `after` 模式不得清空输出目录**：第一版那么写，把不可再生的 `before.json` 一起删掉了，只能靠临时保存的原始 `<style>` 重建基线才补回来。
- **`<html data-mode="parent">`，且不加载 `playful.js` / `progress.js`。** 和 `pages/parents.html`、`pages/design-system.html` 同一路子，因此每页有 6 处版本锚（`base.css`、`kid.css`、`med.css`、`print.css`、`pwa.js`、`app-icon.svg`）。原因是 Progress 的 `mode` 默认值是 `kid`，而 `kid.css` 那条 `html[data-mode="kid"] [data-audience="parent"] { display:none }` 会大面积收内容——按孩子页写，整册医疗内容会在首屏被收走。这也是为什么这些页面**不使用 `data-audience`**：整页都是给家长看的，没有需要分层的东西。
- **`check-print.mjs` / `check-kid-mode.mjs` / `check-completion.mjs` 的默认范围不包含它们，这是对的，不要去「修」。** 这三条断言的是详情页语义（任务文字、给家长的问题、完成状态行、`Progress.visit()` 与 `complete()` 的时机），文档页没有任务。`run-gates.mjs` 调它们时不传页面参数，所以套件保持绿色；只有手动把 `pages/med-*.html` 喂进去才会看到「打印版没有任务文字」「没有『给家长的问题』」这类报错。**那不是缺陷，不要为了让它变绿而往医疗页里塞假的任务文案。** 打印版真正要守的几条已经另有把关：`check-rendered-contrast.mjs --print` 量到打印稿零「未判定」，而 `check-print.mjs` 自己的通用断言（交互元素不泄漏到纸上、`h1` 可见、禁用脚本后可见字数不变）在这些页面上是通过的——禁用 JavaScript 前后字数完全相同，正是「不得要求用户先运行脚本才能得到可读打印页」那一条。
- **内容必须静态优先。** 症状筛选、月龄分档、脱水体征清单、喂药六项核对都只是增强：所有条目在无脚本时全部可见，脚本只做高亮、过滤和汇总。医疗内容不能藏在需要点击才展开的地方——家长可能正抱着哭闹的孩子单手看这一页，也可能是打印出来贴在冰箱上。
- **勾选状态只留在内存。** 脱水清单和核对清单都不写 `Progress`、不写 `localStorage`、不联网，刷新即清空，并在页面上写明这一点。理由和 `nature/human-body.html` 把身体数值留在内存里一致：健康数据不进本站的任何持久化存储。`check-privacy.mjs` 逐页核过关闭态外部请求为 0。
- **卡片必须用实底覆盖 `.card` 的渐变。** `base.css` 的 `.card` 是 `linear-gradient(180deg, var(--surface), var(--bg-soft))`，渐变上的文字 `check-rendered-contrast.mjs` 只能记成「未判定」，而未判定**不算通过**——最初总览页有 16 处、med-breathing 44 处、med-skin 51 处文字因此量不到。改法是给卡片写 `background: var(--surface)`，但选择器权重必须压过 `kid.css` 的 `html[data-mode="kid"] .card`（0,2,1）：裸 `.med-card`（0,1,0）在家长模式下生效、切到孩子模式就又变回渐变，量出来仍是「未判定」。现用三个类的写法（`.med-grid .card.med-card`、`.cond .card.cond-card`，0,3,0）无条件取胜。
- **内容规则。** 每页固定顺序：红旗信号（`.flag`，浅底深字加左粗边，打印时靠边框和深色文字仍可读）→ 家庭护理 → 明确的「不要做」→ 就医时怎么说 → 来源列表 → 免责声明。**不写具体毫克数**：剂量取决于体重和药品浓度，写死的数字可能在读者手里那一瓶上就是错的，`med-dosing` 把这条当正文讲了一遍。来源以美国医疗环境为背景，急救电话按中国 120 标注并在页面上说明这一差异。新增或改写任何一页时，医学结论不得在「改写压缩以符合授权要求」的过程中被改变。
- **打印时红旗段不得被分页切开**，规则写在共享的 `assets/css/print.css` 末尾，不要再往每页的 `<style>` 里抄一遍。`.flag` / `.duo > div` / `.cond > .cond-card` 用 `break-inside: avoid`，`.med-tbl caption` 用 `break-after: avoid`，并在打印媒体里解除 `.tbl-wrap` 的横滚（`overflow: visible` + `min-width: 0`）——屏幕上宽表靠横滚容纳，**纸上没有滚动条，超出的那一截既不换行也不缩小，直接被裁掉，而屏幕上的任何审计都看不到**。这几个类名只出现在本册页面里，所以放在共享层不会影响其余页面，而好处是新增速查页自动继承；早先只有后一批 11 页各自写了 `@media print`，8 个早期页面漏掉了，这正是「每页复制一遍」迟早会发生的结果。`break-inside: avoid` 只在块本身放得进一页时才有意义，所以配套加了 `tools/_print-overflow.mjs`：把媒体切成 `print`、视口设成 A4 可印宽 688px，逐页量 `.tbl-wrap` 的 `scrollWidth - clientWidth`、文档横向溢出，以及各块高度。实测 19 页均为 0 裁切、没有任何块超过一页高。
- **新增速查页时要做四件事**：加进 `sw.js` 的 `CORE`（离线壳要能预缓存）、在总览页「按症状找」里加卡片和过滤标签（`data-sym` 的取值即标签的 `data-pick`）、和相邻主题互相加分流链接（皮肤与出疹这两页尤其需要，家长看到疹子并不知道该开哪一页）、把版本锚对齐当前 `CACHE` 版本号。
  - **分流链接要双向数一遍，别只数出链。** 新页很容易只「链出去」而没人「链进来」：湿疹、泌尿、骨骼外伤、发育行为、皮肤感染叮咬这五页刚加完时，除总览页之外**零个旧页链到它们**——家长在皮肤页看着湿疹那张卡，走不到湿疹专页。同一次统计还暴露出 `med-vaccine` 的入链是 0，它从加进来起就只能从总览页到达。一条命令就能查：`for f in pages/med-*.html; do grep -l "href=\"$(basename $f)\"" pages/med-*.html | grep -v "$f" | wc -l; done`。另外别忘了给 `test-check-medicine-cabinet.mjs` 分一条变异到新页上，理由见下。总览页的页数不要再硬编码进正文——那句「显示全部 N 页」只是无脚本兜底，脚本会在载入时按真实卡片数重算。
- **上面这些规则由 `tools/check-medicine-cabinet.mjs` 把关**，不再只是约定：它逐页核红旗段是否存在且排在正文前半、`.srcs` 来源是否都落在官方白名单（healthychildren.org / aap.org / merckmanuals.com / cdc.gov / medlineplus.gov / heart.org / nih.gov / who.int）且用 https、`.disc` 里有没有「不构成医疗建议」、有没有出现具体毫克数或按体重的剂量公式、是否登记进 `sw.js` 的 `CORE`、总览页有没有链到它、`data-mode` 是不是 `parent` 且没接 `playful.js`、正文里有没有本地急救电话 120、以及剥掉脚本后正文字数是否仍然足够（医疗页必须静态可读）。
- `tools/test-check-medicine-cabinet.mjs` 逐条反向验证上面每一条断言真的会变红并点名到具体页面，然后逐字节还原并用 md5 核对（条数随页面增长，跑一次看它自己打印的「共 N 条」，别在文档里写死）。**加新页时要把断言重新分派到新页上一次**：变异点全落在旧文件上的话，新页可以整页缺来源、缺免责声明、缺红旗段而门禁照样绿——这不是假设，而是这套用例最容易退化的方向，所以后一批页（湿疹、泌尿、骨骼外伤、发育行为、皮肤感染叮咬）各自都分到了一条。**它抓出过两条死断言，值得记下来免得再犯**：（一）免责声明原本按全页搜「不构成医疗建议」，而页脚也有这句话，删掉整段 `.disc` 照样通过——判定必须收在 `.disc` 区块**内部**；（二）毫克数原本写成 `/(mg|毫克)\b/`，但 `\b` 按 `[A-Za-z0-9_]` 判边界，「毫克」后面跟中文句号时两侧都不是词字符、边界不成立，于是「250 毫克」被静默放过——`\b` 只能贴在拉丁字母的 `mg` 后面。同一轮还暴露出两个变异点自身选得不对（拿有两个 `.flag` 的页面去验「缺少 `.flag`」、拿整页有两处 120 的页面去验「120 被删」），所以变异点必须落在**目标特征全页只出现一次**的文件上。
