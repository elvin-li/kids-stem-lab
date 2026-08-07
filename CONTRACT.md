# 共享契约（所有页面必须遵守）

## 文件与共享层
- 互动实验：`games/<slug>.html`；自然专题：`nature/<slug>.html`。
- 页面可以且应复用本站共享文件：`assets/css/base.css`、`assets/css/kid.css`、`assets/css/print.css`、`assets/js/progress.js` 以及 `data/explorations.js`。阶段 1 童趣层另提供 `data/playful.js` 与 `assets/js/playful.js`，由页面组渐进接入。共享文件必须是本站相对路径，不得依赖 CDN、远程字体或第三方 JS。
- 全部 28 个页面必须加载三层样式，顺序固定为 `assets/css/base.css` → `assets/css/kid.css` → `assets/css/print.css`（最后一个带 `media="print"`）。`kid.css` 只覆盖变量与外壳，不改各页自身的互动逻辑；漏加会让孩子模式在该页失效。
- 全部 28 个页面必须加载 `manifest.webmanifest` 与 `assets/js/pwa.js`（放在页面脚本末尾）。
- `data/explorations.js` 与 `data/playful.js` 都是 classic script，分别暴露 `window.EXPLORATIONS` 与 `window.PLAYFUL`；不得改成 module 或通过 `fetch()` 读取本地 JSON。
- 19 个实验/自然详情页的固定脚本顺序为 `data/explorations.js` → `assets/js/progress.js` → `data/playful.js` → `assets/js/playful.js`；静态契约会强制检查。其他页面一旦加载 `playful.js`，也必须先加载 `progress.js` 与 `data/playful.js`。没有声明式接入点时，童趣层必须静默且不得影响核心互动。
- 页面自身的交互仍使用原生 JS + Canvas/SVG；可保留页面专属的内联样式和脚本。`Playful` 只负责提示、反馈和保存辅助，不接管页面的核心计算或任务完成判定。

## 固定六项导航
每个页面的导航项目、顺序和文字固定如下，只按当前页面设置一个 `aria-current="page"`：

1. 资源库（`index.html`）
2. 学习路径（`pages/paths.html`）
3. 互动实验（`games/index.html`）
4. 探索（`nature/index.html`）
5. 我的足迹（`pages/progress.html`）
6. 家长指南（`pages/parents.html`）

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
- 19 个详情页都必须有作品表单接入点：每页恰好一个 `data-playful-work-form`，`type` 的 `option value` 只能取 `observation / prediction / drawing / model / explanation / photo-note`。页面不自己写 submit、保存或大小校验，全部交给 `playful.js` 的 `bindWorkForm()`。状态行用 `role="status"` 加 `aria-live="polite"` 宣告结果。
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

## 打印
- 每页在 `base.css` 后以 `media="print"` 加载 `assets/css/print.css`。
- 打印版隐藏导航、按钮、表单、画布及其他仅交互元素，保留标题、原理、家长提问、任务文字、完成状态和必要来源。
- 内容使用浅底深字，避免卡片、图表标题和任务被跨页截断；外部链接打印 URL。不得要求用户先运行脚本才能得到可读打印页。

## 门禁（改完必须全绿）
本项目没有 `package.json`，所有工具直接用 `node tools/<name>.mjs` 跑，零依赖。改动后按顺序跑这十条，退出码必须都是 0：

```
node tools/check-contract.mjs        # 静态契约：导航、作品类型、共享层版本号、Progress 调用
node tools/test-progress.mjs         # Progress v3 API 单测（node:vm 模拟 window/localStorage）
node tools/check-inline-scripts.mjs  # 所有内联 <script> 的语法与 classic script 约束
node tools/test-check-classes.mjs    # check-classes.mjs 自身的回归用例
node tools/check-aria.mjs            # id 唯一性 + aria/label 引用是否落到本页节点
node tools/check-contrast.mjs        # 三套主题的色彩 token 对比度（WCAG 2.1）
node tools/check-headings.mjs        # 每页一个 h1、h1 在最前、标题不跳级
node tools/check-raf.mjs             # 逐帧循环必须能停下来，不许空转烧电
node tools/check-render.mjs          # 标签闭合、重复属性、站内引用、CSS 变量与大括号
node tools/check-theme.mjs           # 页面内联样式里残留的暗色主题写法
```

需要真实 Chrome 的那一条单独跑（没装 Chrome 的机器上如实标注「未运行」，不得当成通过）：

```
node tools/check-rendered-contrast.mjs --mode kid      # 孩子模式：真实层叠下的文字对比度
node tools/check-rendered-contrast.mjs --mode parent   # 家长模式：会露出 data-audience="parent" 的内容
node tools/check-controls.mjs --mode kid               # 触控目标 44×44 + 键盘焦点可见性
node tools/check-controls.mjs --mode parent --width 768
```

- `tools/check-classes.mjs` 是类名双向审计：**markup 里用到的每个 class，必须在这一页实际生效的样式层（共享层 + 本页 `<style>`）里有规则，或被 JS 引用**。判定按页算生效层，不取全站并集——`.qa` 只写在 fraction-lab 和 dinosaurs 的局部 `<style>` 里，全站并集会放过 weather 上那 5 个裸折叠块。
  - exit 1：既无 CSS 规则也无 JS 引用，是真缺陷（改名只改了一边）。
  - exit 0 的提示：纯 JS 钩子（正常写法）、无人使用的局部 CSS（死代码，值得清理但不阻断）。
- `tools/test-check-classes.mjs` 用回滚验证证明上面这条断言有效：它临时把已修好的 8 处缺陷改回原状，确认审计会变红并点名具体 class，再还原。
- `tools/check-render.mjs` 抓「浏览器会静默吞掉、但孩子一眼看得出不对」的结构性缺陷：容器标签不闭合或错嵌套（少一个 `</div>` 会把后面整块吸进上一个容器）、同一元素上重复的 `class`/`id`（只有第一个生效，第二组样式静默丢失）、站内 `href`/`src` 指向不存在的文件或本页不存在的锚点、CSS `url()` 找不到文件、`<use href="#x">` 找不到目标、`<img>` 缺 `alt`、CSS 大括号不平衡、以及**没有回退值的未定义 `var(--x)`**。最后这条是最隐蔽的一类：`var()` 替换失败会让整条声明在计算值阶段失效退回 `unset`，元素连共享层给的底色一起丢掉。查询串（`?v=15`、`?kind=math`）是本站正常写法，只校验去掉查询串后的真实文件。共享 JS 用 `setProperty("--x", …)` 在运行时写的变量算已定义（`--i` 给纸屑错帧、`--fill` 给进度条）。
- `tools/check-theme.mjs` 抓「浅色主题下残留的暗色主题写法」。默认主题是浅色，暗色只由 `<html data-theme="dark">` 可选启用，但页面 `<style>` 里还留着一批当年为暗底写的字面量，`check-contrast.mjs` 只算三套主题的 token × token，看不到这些硬编码值。判定范围有意收窄到「不需要知道层叠和 DOM 就能确定」的情形，因为没有浏览器就拿不到真实 backdrop，猜祖先只会制造噪音：
  - **同一条规则里的 `color` + `background`**：把背景分别合成到纯白和纯黑上，两种极端都不达标才算错（正文 4.5、WCAG 大字 3.0）；只有一种不达标说明结论依赖祖先，降级成提示。ocean 的 `.zone .who span` 是后者——它的 10% 白底压在 JS 写的深色分区上，白字其实完全可读。
  - **写死的暗色画布色当背景**：用「低饱和 + 很暗」判别（`#0b0f1a` `#161d33` `#08101f` 在内，而 `--math #1b64c8`、`--sci #0b7a45` 这类高饱和品牌色不在），alpha ≥ .5 时算错（此时 backdrop 无关），更透明的降级成「浅底上变成灰蒙版」提示。
  - **提示项**：为暗底写的近白高光描边（浅底上等于没画）、近白文字（需人工确认它确实落在深色场景里）。
  - 确实需要深色的舞台写进 `ALLOW` 并注明理由（影子剧场幕布、夜空/星空/深海画布、地球与地震的深蓝 SVG 面板等），工具会把匹配不到规则的过期条目列出来提醒清理。
  - `games/number-blocks.html`、`games/turtle-geometry.html` 由其他线程持有，工具单列不阻断。
- `tools/check-rendered-contrast.mjs` 用本机 Chrome 读 `getComputedStyle`，按**真实层叠和 DOM** 逐个文字节点算对比度。它抓的是前两个色彩工具都抓不到的一类：**文字色和背景色来自不同规则、由继承和层叠拼出来的组合**。这类最容易出错，因为改一条规则不会提示你另一条被盖掉了。已经踩过的三次都是同一个形状：
  - `base.css` 的 `p { color: var(--ink-mid) }` 有选择器权重，会盖掉容器上设的浅色继承值 —— light-and-shadow 的深色幕布、earth 的彩色地层，段落都因此变成深底深字。给容器设 `color` 时，必须同时用**更高权重**的选择器覆盖 `p`（`.theater-hero p`）或显式 `color: inherit`（`.stratum p`）。
  - 同一个 token 既当小号粗体文字（需 4.5）又当大色块（只需 3.0）时，`check-contrast.mjs` 按 3.0 判会放过它。孩子模式的学科色和浅色主题的 `--warn` / `--code` 都是这样漏掉的。
  - 页面级 `:root` 覆盖（`parents.html` / `paths.html` / `kitchen-science.html` 各有一套纸色调色板）`check-contrast.mjs` 完全看不到，只有真实渲染才量得到。
  - 判定细节：SVG 文字读 `fill` 而不是 `color`；底色用 `elementsFromPoint` 命中测试，能看到压在文字下面的兄弟 `<rect>`（ocean 的 `.ocx-z3`）；行内元素取第一个 client rect 而不是整体 bounding box（换行后中心点会落到行间空隙）；纯 emoji 跳过（彩色字形不受 fill 控制）；多层半透明按 source-over 预乘累积到画布白底。压在渐变或背景图上的文字取不到准确底色，单独计数为「未判定」，不算通过。
- `tools/check-controls.mjs` 验证无障碍一节里此前没有任何工具把关的两条硬要求：**触控目标至少 44×44** 与 **键盘焦点必须可见**。对小孩子这不是形式条款——手指精度不够，30px 的按钮会反复点空，孩子会以为页面坏了。
  - 触控目标按**真实点击区域**量，不是元素自己的盒子：勾选框/单选框自身的方块只有 13–22px，但点包着它的 `<label>` 同样能激活，所以取两者并集（本站 `.space-check-row` 就有 `min-height:48px`）。量错对象会把一批本来合规的表单全报成不合格。
  - 排在正文一句话里的链接按 WCAG 2.5.5 豁免，单独计数。判据是「父元素里除了这个链接还有实际文字」，不是父标签白名单——页脚的来源链接直接挂在 `<footer>` 下、没有 `<p>` 包裹。
  - 焦点可见性用 `Input.dispatchKeyEvent` 发**真实 Tab 键**，而不是 `el.focus()`：`:focus-visible` 只在键盘交互启发式命中时才生效，用 JS 调 `focus()` 常常不触发，测出来的是假象。每页抽查 24 个控件（`--focus-sample` 可调）。
  - 必须多视口跑。760–900px 这一段最容易出事：单列断点之上、三列又放不开，`light-and-shadow` 的 `.task-fields` 就在 768px 把 `select` 挤成 30px 宽。栅格轨道要给 `minmax(min(100%,…),…)` 下限，光靠 `min-width:0` 会让它塌掉。
  - `games/number-blocks.html`、`games/turtle-geometry.html` 由其他线程持有，工具单列不阻断。
- **`data-theme="dark"` 目前是不可达的死代码**：全站没有任何 HTML 或 JS 设置它，Progress 的 5 项固定偏好里也没有主题项。强行打开会看到大量「深色 `--ink` 压在页面硬编码的浅色底上」——因为浅色主题迁移后页面把底色写死成了浅色。它只被 `check-contrast.mjs` 的 token 表覆盖着，实际用户到不了。要么补齐要么删掉，先记在这里。
- `tools/check-contrast.mjs` 直接解析 `base.css` `:root`、`html[data-theme="dark"]` 与 `kid.css` `html[data-mode="kid"]` 三套 token，按 WCAG 2.1 相对亮度算 138 组前景×背景。正文文本阈值 4.5、大字/图形 3.0、`--on-accent` on `--accent` 按按钮文字 4.5 判。不需要浏览器，可进门禁；`pages/design-system.html` 那张实测表是运行时校验，两者互补。
- `tools/check-headings.mjs` 按文档顺序检查标题：每页恰好一个 `h1`、`h1` 必须是第一个标题、相邻标题不得跳级（h1→h3）。视觉顺序和源码顺序冲突时改 CSS `order`，不要为了排版把 `h1` 挪到 `h2` 后面——human-body 的 hero 就是这样处理的。`games/number-blocks.html` 由其他线程持有，工具会单独列出但不阻断。
- `tools/check-raf.mjs` 盯的是「递归排帧」的 `requestAnimationFrame`：回调里又排下一帧的循环，必须有停机手段——要么记下 `rafId` 并有 `cancelAnimationFrame`，要么排帧语句被条件包住（`if (running || settle > 0) { rafId = rAF(loop); } else { rafId = 0; }`）。这是电量问题：孩子在平板上把球停下、手离开屏幕后，永久循环仍会每秒重画 60 次。唤醒用捕获阶段的 `document` 事件委托（`pointerdown/move/up/cancel/leave`、`input`、`change`、`click`、`keydown`）调 `requestDraw()`，不必逐个改几十个控件处理器；`resize()` 走 `ResizeObserver`、不在事件委托覆盖范围内，必须自己调一次 `requestDraw()`。启动也走 `requestDraw()` 而不是裸 `rAF`，否则首帧待执行时 `rafId` 仍是 0，一次交互就会重复排帧。参考实现：`games/gravity-drop.html`、`games/wave-maker.html`。单次排帧（回调里不再排下一帧，例如 human-body 只为下一帧改个 attribute）不算循环。`games/number-blocks.html`、`games/turtle-geometry.html` 由其他线程持有，工具单列不阻断。
- `tools/test-playful-e2e.mjs`、`tools/test-trail-e2e.mjs`、`tools/verify.mjs` 需要真实 Chrome（CDP）。没有安装 Chrome/Chromium 的机器上跑不了，应如实标注「未运行」，不得当成通过。
