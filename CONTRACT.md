# 共享契约（所有页面必须遵守）

## 文件位置
- 互动实验：`games/<slug>.html`
- 每个文件必须是**单文件自包含**：只依赖 `../assets/css/base.css`，不得引入任何外部 CDN、字体、JS 库。纯原生 JS + Canvas/SVG。

## 页头（每页必须一致）
```html
<link rel="stylesheet" href="../assets/css/base.css">
```
导航结构（照抄，改 aria-current）：
```html
<nav class="nav"><div class="nav-in wrap">
  <a class="brand" href="../index.html"><span class="brand-mark">K</span> 少儿数理启蒙</a>
  <div class="row">
    <a class="nav-link" href="../index.html">资源库</a>
    <a class="nav-link" href="../pages/paths.html">学习路径</a>
    <a class="nav-link" href="../games/index.html">互动实验</a>
    <a class="nav-link" href="../pages/parents.html">家长指南</a>
  </div>
</div></nav>
```

## 可用 CSS 变量（只用这些，不要自定义颜色）
颜色：--bg --bg-soft --surface --surface-2 --line --line-soft --ink --ink-mid --ink-dim
学科色：--math(蓝) --sci(绿) --phys(紫) --code(橙) --kit(粉) --video(青) --warn --danger
圆角：--r-sm --r --r-lg --r-xl ；阴影：--shadow --shadow-lg --glow ；--ease --max --mono

## 可用 class
.wrap .wrap-narrow .stack .row .spread .card .grid .grid-2 .pill .pill-math/.pill-sci/.pill-phys/.pill-code/.pill-kit/.pill-video
.btn .btn-primary .btn-ghost .btn-sm .chip .input

## 硬性要求
1. 语言：界面中文，专业术语保留英文原名。
2. 每个实验页必须有：标题、一句话「这在教什么」、**给家长的提问脚本**（3 条可以问孩子的问题）、可交互画面、以及「背后的原理」简短说明。
3. 无障碍：所有控件有 `<label>` 或 `aria-label`；键盘可操作；不要只靠颜色传达信息。
4. 响应式：手机（375px）到桌面都可用。Canvas 用 devicePixelRatio 缩放，不要模糊。
5. 不要用 alert()。不要有 console 报错。
6. 代码要能直接在浏览器打开就跑（file:// 协议也要能跑，所以不要 fetch 本地 JSON）。
