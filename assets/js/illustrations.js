/* 少儿数理启蒙 · 共享插图库
   Classic script；支持 file://，暴露 window.ILLUSTRATIONS */
window.ILLUSTRATIONS = (function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  /** 恐龙学名 → 剪影 path 数据（侧视，viewBox 0 0 200 100，基准线 y=88） */
  var DINO_PATHS = {
    "Tyrannosaurus rex": {
      body: "M8 72 Q18 58 42 52 L78 48 Q98 44 118 50 L142 58 Q158 62 168 70 L178 78 Q186 82 192 88 L8 88 Z",
      head: "M142 50 Q158 38 172 34 Q182 32 188 40 Q192 48 186 56 L168 58 Q152 56 142 50 Z",
      leg: "M52 88 L48 88 L44 72 M118 88 L122 88 L128 72",
      arm: "M98 58 L92 64 L88 62",
      detail: "carn"
    },
    "Triceratops horridus": {
      body: "M12 78 Q28 62 58 56 L108 54 Q138 56 158 68 L172 78 L8 88 Z",
      head: "M158 68 Q172 52 188 48 Q198 46 196 58 Q194 68 182 72 L168 74 Q160 72 158 68 Z",
      frill: "M152 60 Q168 42 192 44 Q188 56 176 64 Q164 68 152 60 Z",
      horn: "M180 52 L188 38 M172 54 L166 42 M192 56 L202 48",
      leg: "M48 88 L46 88 L42 72 M130 88 L134 88 L138 72",
      detail: "herb"
    },
    "Stegosaurus stenops": {
      body: "M18 74 Q38 60 72 58 L128 60 Q152 62 168 72 L8 88 Z",
      plates: "M52 42 L56 28 L60 42 M72 38 L76 22 L80 38 M92 40 L96 24 L100 40 M112 42 L116 26 L120 42",
      tail: "M168 72 Q188 68 196 62 L198 70 Q190 76 172 78 Z",
      leg: "M42 88 L40 88 L36 70 M118 88 L122 88 L126 70",
      detail: "herb"
    },
    "Brachiosaurus altithorax": {
      body: "M28 78 Q52 68 88 66 L128 68 Q148 70 162 76 L8 88 Z",
      neck: "M128 68 Q138 52 142 32 Q144 18 148 8 Q152 4 156 10 Q158 22 154 38 Q150 54 142 66",
      head: "M148 8 Q158 4 164 10 Q168 16 162 22 L152 20 Q148 14 148 8 Z",
      leg: "M48 88 L44 88 L38 68 M138 88 L142 88 L148 68",
      detail: "herb"
    },
    "Diplodocus carnegii": {
      body: "M22 76 Q48 66 88 64 L148 66 Q172 68 188 74 L8 88 Z",
      neck: "M148 66 Q156 48 160 28 Q162 14 166 6 Q170 2 174 8 Q176 20 172 36 Q168 52 158 64",
      tail: "M188 74 Q196 70 200 64 L200 72 Q194 78 184 80 Z",
      leg: "M52 88 L48 88 L44 70 M148 88 L152 88 L158 70",
      detail: "herb"
    },
    "Allosaurus fragilis": {
      body: "M10 74 Q24 58 52 52 L98 50 Q128 52 152 62 L170 72 L8 88 Z",
      head: "M152 62 Q168 48 182 44 Q192 42 194 52 Q192 62 180 66 L162 64 Q154 64 152 62 Z",
      leg: "M44 88 L42 88 L38 70 M118 88 L122 88 L128 70",
      detail: "carn"
    },
    "Spinosaurus aegyptiacus": {
      body: "M14 76 Q32 62 68 58 L118 56 Q148 58 168 68 L8 88 Z",
      sail: "M88 56 L92 18 L96 56 M104 54 L108 12 L112 54 M120 56 L124 20 L128 56 M136 58 L140 24 L144 58",
      snout: "M168 68 Q182 64 192 60 L194 66 Q186 70 172 72 Z",
      leg: "M48 88 L46 88 L42 70 M128 88 L132 88 L136 70",
      detail: "carn"
    },
    "Ankylosaurus magniventris": {
      body: "M16 78 Q36 64 72 60 L128 62 Q158 66 176 74 L8 88 Z",
      armor: "M48 62 Q72 54 96 58 Q120 54 144 58 Q160 62 168 68",
      club: "M176 74 Q188 70 196 62 Q200 68 198 76 Q192 82 178 80 Z",
      leg: "M42 88 L40 88 L36 72 M118 88 L122 88 L126 72",
      detail: "herb"
    },
    "Velociraptor mongoliensis": {
      body: "M24 78 Q48 66 88 64 L128 66 Q148 68 158 74 L8 88 Z",
      head: "M128 66 Q142 58 154 54 Q162 52 164 58 Q162 64 152 66 L138 66 Q130 66 128 66 Z",
      tail: "M158 74 Q172 68 184 60 L186 66 Q174 74 160 78 Z",
      feathers: "M100 64 L96 58 L104 62 M112 62 L108 54 L116 60",
      leg: "M52 88 L50 88 L46 74 M118 88 L122 88 L126 74",
      detail: "carn"
    },
    "Parasaurolophus walkeri": {
      body: "M18 76 Q38 64 72 60 L118 58 Q148 60 164 68 L8 88 Z",
      crest: "M118 58 Q124 42 128 18 Q130 8 134 6 Q138 8 140 18 Q142 36 138 52 L128 58 Z",
      leg: "M44 88 L42 88 L38 70 M128 88 L132 88 L136 70",
      detail: "herb"
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

  function dietColor(diet) {
    return diet === "carn" ? "#ef4444" : diet === "herb" ? "#22c55e" : "#f59e0b";
  }

  /** 等比身高对比：返回 DOM 元素（.silo 容器） */
  function dinoScaleCompare(d, kidCm, opts) {
    opts = opts || {};
    var beastCm = d.hip * 100;
    var maxPx = opts.maxPx || 104;
    var tall = Math.max(kidCm, beastCm);
    var pxPerCm = maxPx / tall;
    var kidPx = kidCm * pxPerCm;
    var beastPx = beastCm * pxPerCm;
    var col = opts.color || dietColor(d.diet);

    var wrap = document.createElement("div");
    wrap.className = "silo";

    /* 孩子剪影 SVG */
    var kidBox = document.createElement("div");
    kidBox.className = "kid";
    kidBox.style.width = Math.max(28, kidPx * 0.38) + "px";
    kidBox.style.height = kidPx + "px";
    var kidSvg = svgEl("svg", {
      viewBox: "0 0 40 100",
      width: "100%",
      height: "100%",
      "aria-hidden": "true",
      role: "presentation"
    });
    kidSvg.innerHTML =
      '<circle cx="20" cy="12" r="10" fill="#94a3b8"/>' +
      '<path d="M12 24 Q20 20 28 24 L26 68 Q20 72 14 68 Z" fill="#64748b"/>' +
      '<path d="M14 68 L10 88 M26 68 L30 88" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M12 38 L6 52 M28 38 L34 48" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>';
    kidBox.appendChild(kidSvg);
    var kt = document.createElement("div");
    kt.className = "kid-t";
    kt.textContent = kidCm + "cm";
    kidBox.appendChild(kt);
    wrap.appendChild(kidBox);

    /* 恐龙 SVG 剪影 */
    var paths = DINO_PATHS[d.sci] || DINO_PATHS["Tyrannosaurus rex"];
    var beast = document.createElement("div");
    beast.className = "beast";
    beast.style.flex = "1 1 auto";
    beast.style.height = beastPx + "px";
    beast.style.display = "flex";
    beast.style.alignItems = "flex-end";

    var dSvg = svgEl("svg", {
      viewBox: "0 0 200 100",
      width: "100%",
      height: beastPx + "px",
      role: "img",
      "aria-label": d.n + " 侧视剪影，臀高约 " + d.hip + " 米"
    });
    var g = svgEl("g", { fill: col, "fill-opacity": "0.88", stroke: col, "stroke-width": "1.5", "stroke-linejoin": "round" });
    if (paths.body) g.appendChild(svgEl("path", { d: paths.body }));
    if (paths.neck) g.appendChild(svgEl("path", { d: paths.neck, "fill-opacity": "0.82" }));
    if (paths.head) g.appendChild(svgEl("path", { d: paths.head }));
    if (paths.frill) g.appendChild(svgEl("path", { d: paths.frill, "fill-opacity": "0.75" }));
    if (paths.plates) {
      paths.plates.split(" M").forEach(function (seg, i) {
        if (!seg) return;
        var pd = (i === 0 ? seg : "M" + seg);
        g.appendChild(svgEl("path", { d: pd, fill: "#eab308", "fill-opacity": "0.9" }));
      });
    }
    if (paths.sail) {
      paths.sail.split(" M").forEach(function (seg, i) {
        if (!seg) return;
        g.appendChild(svgEl("path", { d: (i === 0 ? seg : "M" + seg), fill: "#dc2626", "fill-opacity": "0.85" }));
      });
    }
    if (paths.crest) g.appendChild(svgEl("path", { d: paths.crest, fill: "#f97316", "fill-opacity": "0.9" }));
    if (paths.tail) g.appendChild(svgEl("path", { d: paths.tail, "fill-opacity": "0.7" }));
    if (paths.club) g.appendChild(svgEl("path", { d: paths.club, fill: "#78716c" }));
    if (paths.snout) g.appendChild(svgEl("path", { d: paths.snout }));
    if (paths.horn) {
      g.appendChild(svgEl("path", { d: paths.horn, fill: "none", stroke: "#fef3c7", "stroke-width": "3", "stroke-linecap": "round" }));
    }
    if (paths.arm) {
      g.appendChild(svgEl("path", { d: paths.arm, fill: "none", stroke: col, "stroke-width": "2.5", "stroke-linecap": "round" }));
    }
    if (paths.feathers) {
      g.appendChild(svgEl("path", { d: paths.feathers, fill: "none", stroke: "#fcd34d", "stroke-width": "2" }));
    }
    if (paths.leg) {
      g.appendChild(svgEl("path", { d: paths.leg, fill: "none", stroke: col, "stroke-width": "4", "stroke-linecap": "round" }));
    }
    dSvg.appendChild(g);
    beast.appendChild(dSvg);

    var bt = document.createElement("div");
    bt.className = "beast-t";
    bt.style.color = col;
    bt.textContent = "臀高 " + d.hip + "m · 全长 " + d.len + "m";
    beast.appendChild(bt);
    wrap.appendChild(beast);
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

  function roundRect(ctx, x, y, w, h, rad) {
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
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

  function shadeHex(hex, amt) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(hex).trim());
    if (!m) return hex;
    function f(v) {
      v = parseInt(v, 16);
      return Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    }
    return "rgb(" + f(m[1]) + "," + f(m[2]) + "," + f(m[3]) + ")";
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
    var grad = ctx.createLinearGradient(gx, gy, gx, gy + w);
    grad.addColorStop(0, isTarget ? "#fde68a" : "#93c5fd");
    grad.addColorStop(1, fill || (isTarget ? "#fbbf24" : "#6ea8fe"));
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

  /** Canvas：彩虹画室起始提示 */
  function drawDoodleStarter(ctx, w, h) {
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = "#d68a00";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(w * 0.08, h * 0.12, w * 0.84, h * 0.76);
    ctx.setLineDash([]);
    /* 提示语跟着虚线框用 0.22 的话只剩一团灰影，反而像画脏了。 */
    ctx.globalAlpha = 0.55;
    ctx.font = "700 14px sans-serif";
    ctx.fillStyle = "#7d6b52";
    ctx.textAlign = "center";
    ctx.fillText("在这里画", w / 2, h * 0.1);
    var cx = w * 0.14, cy = h * 0.22;
    ["#1f6fd0", "#0f8a4d", "#d81b73"].forEach(function (col, i) {
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = col;
      ctx.beginPath();
      /* 间距 22、半径 9 时三个点几乎相切，缩略下来只剩一道彩色横条。 */
      ctx.arc(cx + i * 28, cy, 9, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = "#6b4f36";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(w * 0.72, h * 0.68);
    ctx.quadraticCurveTo(w * 0.78, h * 0.55, w * 0.85, h * 0.62);
    ctx.stroke();
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
    "ramp-and-roll": '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 38 L38 38 L8 14 Z" fill="#a78bfa" opacity=".45" stroke="#7c3aed" stroke-width="2"/><circle cx="32" cy="32" r="6" fill="#6ea8fe" stroke="#1e40af"/><path d="M32 26 L32 20" stroke="#fbbf24" stroke-width="2" marker-end="url(#a)"/></svg>',
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
      '<g stroke="#b8443d" stroke-width="5" fill="none" stroke-linecap="round">' +
      '<path d="M78 62 C64 70 46 74 28 72"/><path d="M80 64 C70 76 54 84 36 86"/>' +
      '<path d="M84 66 C80 78 72 88 62 90"/><path d="M90 66 C92 78 90 86 86 90"/>' +
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
      '<g stroke="#9c5b8e" stroke-width="6" fill="none" stroke-linecap="round">' +
      '<path d="M76 64 C60 72 42 76 24 74"/><path d="M80 66 C70 78 54 86 38 88"/>' +
      '<path d="M86 68 C82 80 74 88 66 90"/><path d="M92 68 C94 80 92 88 90 90"/>' +
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
      '<g stroke="#4a2b16" stroke-width="3" fill="none" stroke-linecap="round">' +
      '<path d="M58 62 C54 72 48 78 40 82"/><path d="M74 64 C72 74 68 80 62 84"/><path d="M92 64 C94 74 94 80 90 84"/>' +
      '<path d="M58 34 C54 24 48 18 40 14"/><path d="M74 32 C72 22 68 16 62 12"/>' +
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

  defGuide("fox", {
    title: "小狐探探",
    desc: "一只橙色小狐狸探出头，白色的脸颊和黑亮的眼睛正看着你。",
    art:
      '<path d="M13 24 L11 5 L27 14Z" fill="#d9752c"/><path d="M51 24 L53 5 L37 14Z" fill="#d9752c"/>' +
      '<path d="M16.5 21.5 L15.5 11 L24 16Z" fill="#f7cba6"/><path d="M47.5 21.5 L48.5 11 L40 16Z" fill="#f7cba6"/>' +
      '<path d="M32 11 C46 11 55 21 55 32 C55 45 45 55 32 55 C19 55 9 45 9 32 C9 21 18 11 32 11Z" fill="#ef8b3c"/>' +
      '<path d="M32 29 C41 29 47 35 47 42 C47 50 40 56 32 56 C24 56 17 50 17 42 C17 35 23 29 32 29Z" fill="#fdf4e8"/>' +
      eyes(24, 40, 31, 3.4) +
      '<path d="M32 37 C35 37 37 39 37 41 C37 43.5 34.5 45 32 45 C29.5 45 27 43.5 27 41 C27 39 29 37 32 37Z" fill="#3a2415"/>' +
      '<path d="M32 45 L32 48 M32 48 C29 48 27 46.5 26 45 M32 48 C35 48 37 46.5 38 45" stroke="#3a2415" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
      '<g stroke="#c9773a" stroke-width="1.4" stroke-linecap="round" opacity=".8">' +
      '<path d="M18 40 L10 38"/><path d="M18 44 L10 45"/><path d="M46 40 L54 38"/><path d="M46 44 L54 45"/></g>'
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
      '<g fill="#8d5bbd">' +
      '<path d="M13 40 C8 47 6 54 8 59 C11 58 13 53 16 48Z"/><path d="M22 44 C19 52 18 58 20 61 C23 59 24 53 26 48Z"/>' +
      '<path d="M42 44 C45 52 46 58 44 61 C41 59 40 53 38 48Z"/><path d="M51 40 C56 47 58 54 56 59 C53 58 51 53 48 48Z"/>' +
      '<path d="M32 46 C31 54 31 59 32 62 C33 59 33 54 34 46Z"/>' +
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

  defLife("nymph", "若虫", "一只没有翅膀的小若虫，外形已经很像成虫。",
    '<g stroke="#4d7a3a" stroke-width="2" stroke-linecap="round" fill="none">' +
    '<path d="M17 28 L8 24 L4 28"/><path d="M17 32 L8 36 L5 41"/><path d="M31 28 L40 24 L44 28"/><path d="M31 33 L40 37 L43 42"/></g>' +
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
    desc: "左边的饼图涂了二分之一，右边的饼图涂了四分之二，中间一个等号说明它们一样大。",
    bg: cardSky("#fff1f4", "#ffdde5"),
    art:
      '<circle cx="42" cy="50" r="27" fill="#fff8f9" stroke="#c02a52" stroke-width="2.6"/>' +
      '<path d="M42 23 A27 27 0 0 1 42 77 Z" fill="#e8567f"/>' +
      '<path d="M42 23 L42 77" stroke="#c02a52" stroke-width="2.2"/>' +
      '<text x="30" y="99" font-size="15" font-weight="700" fill="#a51b42">1/2</text>' +
      '<text x="72" y="58" font-size="18" font-weight="700" fill="#8a5a10">=</text>' +
      '<circle cx="120" cy="50" r="27" fill="#fff8f9" stroke="#c02a52" stroke-width="2.6"/>' +
      '<path d="M120 23 A27 27 0 0 1 147 50 Z" fill="#e8567f"/>' +
      '<path d="M120 77 A27 27 0 0 1 93 50 Z" fill="#e8567f"/>' +
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
    desc: "玻璃罐里装着一堆彩色糖豆，其中十颗被一个虚线圈单独框出来，作为估算整罐数量的参照。",
    bg: cardSky("#fffaf0", "#ffeccd"),
    art: (function () {
      var jar = '<path d="M44 34 L116 34 L112 96 Q80 102 48 96Z" fill="#eaf6fb" opacity=".85" stroke="#7fa8bd" stroke-width="2.4"/>' +
        '<rect x="40" y="26" width="80" height="9" rx="4" fill="#c98a3e"/>';
      var beans = "";
      var spots = [
        [58, 48, "#ff7aa8"], [76, 44, "#4d86d6"], [94, 49, "#ffc233"], [106, 58, "#41c7a4"],
        [56, 62, "#8b6de0"], [72, 60, "#ff9147"], [90, 65, "#ff7aa8"], [104, 74, "#4d86d6"],
        [54, 76, "#ffc233"], [70, 76, "#41c7a4"], [86, 80, "#8b6de0"], [100, 88, "#ff9147"],
        [60, 90, "#4d86d6"], [76, 92, "#ffc233"], [92, 92, "#41c7a4"]
      ];
      for (var i = 0; i < spots.length; i++) {
        beans += '<ellipse cx="' + spots[i][0] + '" cy="' + spots[i][1] + '" rx="6.4" ry="5" fill="' + spots[i][2] + '"/>' +
          '<ellipse cx="' + (spots[i][0] - 1.8) + '" cy="' + (spots[i][1] - 1.6) + '" rx="2.2" ry="1.5" fill="#ffffff" opacity=".55"/>';
      }
      /* 先框出一小撮当「一份」，再看整罐是几份，这就是估算的分块策略。 */
      var group = '<ellipse cx="76" cy="53" rx="30" ry="17" fill="none" stroke="#c2410c" stroke-width="2.2" stroke-dasharray="5 4"/>' +
        '<text x="42" y="20" font-size="12" font-weight="700" fill="#c2410c">先数一圈 10 颗</text>';
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
      /* 三个时刻的位置：每一刻锤子和羽毛都在同一条虚线上（一起落），
         而相邻两条虚线的间距越来越大（越落越快）。 */
      function hammer(y, op) {
        return '<g opacity="' + op + '"><rect x="47" y="' + y + '" width="18" height="8" rx="2.4" fill="#6b7280"/>' +
          '<rect x="53.5" y="' + (y + 6) + '" width="5" height="17" rx="2" fill="#a2703c"/></g>';
      }
      function feather(y, op) {
        return '<g opacity="' + op + '"><path d="M105 ' + y + " C96 " + (y + 12) + " 99 " + (y + 21) + " 105 " + (y + 25) +
          " C112 " + (y + 19) + " 114 " + (y + 9) + " 105 " + y + 'Z" fill="#f2f6fd" stroke="#7b8bb8" stroke-width="1.6"/>' +
          '<path d="M105 ' + (y + 3) + " L105 " + (y + 23) + '" stroke="#7b8bb8" stroke-width="1.3"/></g>';
      }
      return '<text x="34" y="19" font-size="12" font-weight="700" fill="#c2410c">抽掉空气以后</text>' +
        '<rect x="34" y="24" width="94" height="74" rx="8" fill="#dbe6fb" opacity=".75" stroke="#7b8bb8" stroke-width="2.4"/>' +
        '<g stroke="#c2410c" stroke-width="1.5" stroke-dasharray="5 4">' +
        '<path d="M36 34 L126 34"/><path d="M36 52 L126 52"/><path d="M36 80 L126 80"/>' +
        "</g>" +
        '<g fill="#c2410c" font-size="9" font-weight="700">' +
        '<text x="118" y="32">1</text><text x="118" y="50">2</text><text x="118" y="78">3</text>' +
        "</g>" +
        hammer(28, ".3") + feather(28, ".3") +
        hammer(46, ".55") + feather(46, ".55") +
        hammer(74, "1") + feather(74, "1");
    })()
  });

  defCard("ramp-and-roll", {
    title: "斜坡滚球插图",
    desc: "小球从斜坡顶端滚下，斜坡底角标着角度，地面上的等距刻度显示球越滚越快。",
    bg: cardSky("#f2eeff", "#ddd4fa"),
    art: (function () {
      var out = '<path d="M22 78 L126 78 L22 26Z" fill="#a08bea" opacity=".45" stroke="#6b4fd0" stroke-width="2.6" stroke-linejoin="round"/>';
      out += '<path d="M22 78 L140 78" stroke="#4b3a86" stroke-width="2.6"/>';
      /* 底角的弧线 + 度数，是「坡越陡越快」这条结论的自变量。 */
      out += '<path d="M46 78 A24 24 0 0 0 46 66" fill="none" stroke="#c2410c" stroke-width="2"/>';
      out += '<text x="48" y="74" font-size="11" font-weight="700" fill="#c2410c">27°</text>';
      out += '<g fill="none" stroke="#6b4fd0" stroke-width="2" stroke-dasharray="4 4"><path d="M34 37 L96 68"/></g>';
      /* 刻度间距越来越大 = 每秒走得越来越远，也就是在加速。 */
      var xs = [36, 52, 76, 108];
      for (var i = 0; i < xs.length; i++) {
        out += '<path d="M' + xs[i] + ' 78 L' + xs[i] + ' 86" stroke="#4b3a86" stroke-width="2"/>';
      }
      out += '<text x="32" y="99" font-size="11" font-weight="700" fill="#4b3a86">1</text>' +
        '<text x="48" y="99" font-size="11" font-weight="700" fill="#4b3a86">2</text>' +
        '<text x="72" y="99" font-size="11" font-weight="700" fill="#4b3a86">3</text>' +
        '<text x="102" y="99" font-size="11" font-weight="700" fill="#4b3a86">4 秒</text>';
      out += '<circle cx="32" cy="33" r="8.5" fill="#4d86d6" stroke="#1e3f80" stroke-width="2"/>' +
        '<circle cx="29" cy="30" r="2.6" fill="#ffffff" opacity=".7"/>';
      out += '<circle cx="100" cy="70" r="8.5" fill="#4d86d6" opacity=".35"/>';
      return out;
    })()
  });

  defCard("light-and-shadow", {
    title: "光与影插图",
    desc: "台灯照向一根立柱，两条光线画出影子的边界，灯越近影子越长。",
    bg: cardSky("#fff8e4", "#ffe9b8"),
    art:
      '<path d="M0 82 L160 82" stroke="#b98a2e" stroke-width="2.4"/>' +
      /* 两条从灯泡出发、擦过物体顶端和底端的光线，正好圈出影子的长度。 */
      '<path d="M40 44 L92 30 L142 68 L92 46Z" fill="#ffd24a" opacity=".5"/>' +
      '<path d="M40 44 L142 68" stroke="#e0a33c" stroke-width="1.5" stroke-dasharray="4 4"/>' +
      '<path d="M92 30 L138 82" stroke="#c98a3e" stroke-width="1.5" stroke-dasharray="4 4"/>' +
      '<path d="M92 30 L138 82 L92 82Z" fill="#6b5a33" opacity=".5"/>' +
      '<rect x="86" y="30" width="10" height="52" rx="3" fill="#5b6b95"/>' +
      '<path d="M30 82 L30 50" stroke="#6b7280" stroke-width="3.4"/>' +
      '<path d="M22 82 L38 82" stroke="#6b7280" stroke-width="3.4" stroke-linecap="round"/>' +
      '<path d="M30 50 Q30 34 46 32 L54 48 Q40 54 30 50Z" fill="#ffc233" stroke="#b98a2e" stroke-width="2"/>' +
      '<circle cx="46" cy="42" r="4" fill="#fff6cf"/>' +
      '<text x="20" y="98" font-size="12" font-weight="700" fill="#8a5a10">灯</text>' +
      '<text x="94" y="98" font-size="12" font-weight="700" fill="#8a5a10">影子</text>'
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
      '<g><ellipse cx="52" cy="36" rx="11" ry="6" fill="#e4f0f8" opacity=".85" stroke="#b6d0e2" stroke-width="1.2" transform="rotate(-22 52 36)"/>' +
      '<ellipse cx="60" cy="36" rx="9" ry="5" fill="#e4f0f8" opacity=".85" stroke="#b6d0e2" stroke-width="1.2" transform="rotate(-6 60 36)"/>' +
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
      "</g>"
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
    var fit = spec.fit || "xMidYMid meet";
    var art = spec.art || "";
    if (/slice/.test(fit)) art = safeArea(art, spec.viewBox, spec.safe || 0.78);
    var body = String((spec.bg || "") + art).replace(/\{\{U\}\}/g, uid);
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
    tileIcon: tileIcon,
    dietColor: dietColor,
    shadeHex: shadeHex,
    hasArt: has,
    art: markup,
    renderArt: render,
    artNames: names,
    raindrop: raindrop,
    raindropPath: raindropPath,
    legend: legend
  };
})();
