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

  /** Canvas：羽毛 */
  function drawFeather(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.translate(x, y);
    ctx.rotate(-0.45);
    var grad = ctx.createLinearGradient(-r * 0.3, -r, r * 0.3, r);
    grad.addColorStop(0, color || "#e2e8f0");
    grad.addColorStop(0.5, "#f8fafc");
    grad.addColorStop(1, color || "#cbd5e1");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, -r * 1.1);
    ctx.quadraticCurveTo(r * 0.55, -r * 0.2, r * 0.35, r * 0.9);
    ctx.quadraticCurveTo(0, r * 1.15, -r * 0.35, r * 0.9);
    ctx.quadraticCurveTo(-r * 0.55, -r * 0.2, 0, -r * 1.1);
    ctx.fill();
    for (var i = -0.8; i <= 0.9; i += 0.25) {
      ctx.strokeStyle = "rgba(100,116,139," + (0.15 + Math.abs(i) * 0.08) + ")";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.9 + i * r * 0.5);
      ctx.lineTo(r * 0.28 * (1 - Math.abs(i) * 0.3), -r * 0.3 + i * r * 0.35);
      ctx.stroke();
    }
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1.4;
    ctx.globalAlpha = (alpha == null ? 1 : alpha) * 0.7;
    ctx.beginPath();
    ctx.moveTo(0, -r * 1.05);
    ctx.lineTo(0, r * 1.1);
    ctx.stroke();
    ctx.restore();
  }

  /** Canvas：皮球（带缝线，便于辨认旋转） */
  function drawBall(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    var cy = y - r;
    var grad = ctx.createRadialGradient(x - r * 0.35, cy - r * 0.35, r * 0.08, x, cy, r);
    grad.addColorStop(0, "#fffef8");
    grad.addColorStop(0.22, color || "#f97316");
    grad.addColorStop(1, "#9a3412");
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

  /** Canvas：锤子。y 是物体底部；总高保持在 2r，和皮球一致，
      否则在起始高度上锤头会被画布顶边切掉，只剩一根橙色木棍。 */
  function drawHammer(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    var handleGrad = ctx.createLinearGradient(x - 3, y, x + 3, y - r * 1.55);
    handleGrad.addColorStop(0, "#92400e");
    handleGrad.addColorStop(1, "#d97706");
    ctx.fillStyle = handleGrad;
    roundRect(ctx, x - Math.max(1.8, r * 0.16), y - r * 1.55, Math.max(3.6, r * 0.32), r * 1.55, 2);
    ctx.fill();
    var headGrad = ctx.createLinearGradient(x - r * 0.9, y - r * 2, x + r * 0.9, y - r * 1.38);
    headGrad.addColorStop(0, color || "#71717a");
    headGrad.addColorStop(0.5, "#a1a1aa");
    headGrad.addColorStop(1, "#52525b");
    ctx.fillStyle = headGrad;
    roundRect(ctx, x - r * 0.9, y - r * 2, r * 1.8, r * 0.62, 3);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    roundRect(ctx, x - r * 0.62, y - r * 1.9, r * 0.45, r * 0.18, 1);
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
    var rad = Math.max(3, s * 0.22);
    var top = shadeHex(main, 0.22);
    var side = shadeHex(main, -0.32);
    ctx.save();
    if (opts.shadow) {
      ctx.shadowColor = "rgba(0,0,0,.45)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 5;
    }
    var g = ctx.createLinearGradient(x, y, x, y + s);
    g.addColorStop(0, top);
    g.addColorStop(1, side);
    roundRect(ctx, x, y, s, s, rad);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
    roundRect(ctx, x + 1.5, y + 1.5, s - 3, s * 0.34, Math.max(2, s * 0.16));
    ctx.fillStyle = "rgba(255,255,255,.24)";
    ctx.fill();
    roundRect(ctx, x + 0.5, y + 0.5, s - 1, s - 1, rad);
    ctx.strokeStyle = "rgba(8,16,31,.55)";
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
    version: 1,
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
    artNames: names
  };
})();
