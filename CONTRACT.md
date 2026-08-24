# 共享契约（所有页面必须遵守）

## 文件与共享层
- 互动实验：`games/<slug>.html`；自然专题：`nature/<slug>.html`。
- 页面可以且应复用本站共享文件：`assets/css/base.css`、`assets/css/kid.css`、`assets/css/print.css`、`assets/js/progress.js` 以及 `data/explorations.js`。阶段 1 童趣层另提供 `data/playful.js` 与 `assets/js/playful.js`，由页面组渐进接入。共享文件必须是本站相对路径，不得依赖 CDN、远程字体或第三方 JS。
- 全部 27 个页面必须加载三层样式，顺序固定为 `assets/css/base.css` → `assets/css/kid.css` → `assets/css/print.css`（最后一个带 `media="print"`）。`kid.css` 只覆盖变量与外壳，不改各页自身的互动逻辑；漏加会让孩子模式在该页失效。
- 全部 27 个页面必须加载 `manifest.webmanifest` 与 `assets/js/pwa.js`（放在页面脚本末尾）。
- `data/explorations.js` 与 `data/playful.js` 都是 classic script，分别暴露 `window.EXPLORATIONS` 与 `window.PLAYFUL`；不得改成 module 或通过 `fetch()` 读取本地 JSON。
- 18 个实验/自然详情页的固定脚本顺序为 `data/explorations.js` → `assets/js/progress.js` → `data/playful.js` → `assets/js/playful.js`；静态契约会强制检查。其他页面一旦加载 `playful.js`，也必须先加载 `progress.js` 与 `data/playful.js`。没有声明式接入点时，童趣层必须静默且不得影响核心互动。
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
- 孩子模式由 `<html data-mode>` 单独驱动：`playful.js` 的 `syncPreferences()` 把 `mode` 偏好写到该属性，`kid.css` 里所有规则都挂在 `html[data-mode="kid"]` 下。Progress 缺席时兜底写 `kid`，属性不会出现空值。
- 只写给家长看的内容用 `data-audience="parent"` 标记，孩子模式下由 `kid.css` 隐藏；只给孩子看的用 `data-audience="kid-only"`，家长模式下隐藏。隐藏是纯展示层行为，不得移除节点，也不得让页面脚本因找不到节点而报错。
- 切换控件用 `data-playful-preference="mode"`，由 `playful.js` 自动接管，页面不需要写绑定逻辑。切换后立即刷新 `<html data-mode>`，并且偏好随 Progress v3 一起导入导出。
- 孩子模式只改字号、配色、触控尺寸与信息密度，不得删掉任务文字、完成状态或无障碍名称。

## Progress v3 数据与 API
- 唯一当前键为 `kids-stem:progress:v3`。首次读取时按 v3 → v2 → v1 回退并无损迁移；迁移保留旧键，`reset()` 才清理三代键。
- v3 顶层完整结构为 `pages / recent / notes / completions / works / preferences`。贴纸不持久化，由 `completions` 与 `PLAYFUL.pages` 即时派生。
- 既有 API：`visit / get / all / count / note / getNote / complete / getCompletion / exportText / exportJSON / importJSON / reset / available`。
- 新增 API：`getStickers([pageId])`、`validateWork(pageId, work)`、`saveWork(pageId, work)`（后三者也支持单个含 `pageId` 的对象）、`getWorks([pageId])`、`deleteWork(workId)`、`getPreference(name)`、`setPreference(name, value)`。`validateWork()` 只读返回清洗后的真实 UTF-8 字节、总量、数量与失败代码，页面不得另写一套大小规则。
- 作品仅保存受限文本元数据，不保存图片二进制：类型为 `observation / prediction / drawing / model / explanation / photo-note`；最多 60 项，单项 UTF-8 JSON 不超过 12 KiB，合计不超过 96 KiB。标题、正文、ID、页面、日期和导入数据都必须严格清洗。
- 偏好固定为 4 项：`soundEnabled`（默认 `false`）、`motion`（`system/full/reduced`，默认 `system`）、`ageGroup`（`all/4-6/7-9/10-12`，默认 `all`）、`mode`（`parent/kid`，默认 `kid`，新设备孩子优先）。非法值一律回退到默认值，`setPreference()` 对非法值返回 `false` 且不改动已存值。所有读取结果均为防御性副本，存储失败不得伪报成功。

## 页面组渐进接入约定
- 在页面已有的任务区域按需声明 `data-playful-page="games/...html"`，可加入：`data-playful-companion`、`data-playful-sticker`、`data-playful-feedback`、`data-playful-random-task` 与 `data-playful-task-output`。
- 作品表单使用 `data-playful-work-form`，必须提供 `name="type"`、`name="title"`、`name="content"` 三个字段和一个 `data-playful-work-status` 状态行；偏好控件使用 `data-playful-preference="soundEnabled|motion|ageGroup|mode"`。
- 18 个详情页都必须有作品表单接入点：每页恰好一个 `data-playful-work-form`，`type` 的 `option value` 只能取 `observation / prediction / drawing / model / explanation / photo-note`。页面不自己写 submit、保存或大小校验，全部交给 `playful.js` 的 `bindWorkForm()`。状态行用 `role="status"` 加 `aria-live="polite"` 宣告结果。
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

## 打印
- 每页在 `base.css` 后以 `media="print"` 加载 `assets/css/print.css`。
- 打印版隐藏导航、按钮、表单、画布及其他仅交互元素，保留标题、原理、家长提问、任务文字、完成状态和必要来源。
- 内容使用浅底深字，避免卡片、图表标题和任务被跨页截断；外部链接打印 URL。不得要求用户先运行脚本才能得到可读打印页。
