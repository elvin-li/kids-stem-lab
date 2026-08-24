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

  /** Canvas：锤子 */
  function drawHammer(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    var handleGrad = ctx.createLinearGradient(x - 3, y, x + 3, y - r * 2.2);
    handleGrad.addColorStop(0, "#92400e");
    handleGrad.addColorStop(1, "#d97706");
    ctx.fillStyle = handleGrad;
    roundRect(ctx, x - 2.5, y - r * 2.2, 5, r * 2.2, 2);
    ctx.fill();
    var headGrad = ctx.createLinearGradient(x - r, y - r * 2.9, x + r, y - r * 2);
    headGrad.addColorStop(0, color || "#71717a");
    headGrad.addColorStop(0.5, "#a1a1aa");
    headGrad.addColorStop(1, "#52525b");
    ctx.fillStyle = headGrad;
    roundRect(ctx, x - r, y - r * 2.9, r * 2, r * 0.85, 3);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    roundRect(ctx, x - r * 0.7, y - r * 2.75, r * 0.5, r * 0.25, 1);
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
    ctx.font = "700 14px sans-serif";
    ctx.fillStyle = "#7d6b52";
    ctx.textAlign = "center";
    ctx.fillText("在这里画", w / 2, h * 0.1);
    var cx = w * 0.14, cy = h * 0.22;
    ["#1f6fd0", "#0f8a4d", "#d81b73"].forEach(function (col, i) {
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(cx + i * 22, cy, 9, 0, Math.PI * 2);
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
    "turtle-geometry": '<svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="26" rx="14" ry="11" fill="#059669"/><ellipse cx="34" cy="24" rx="6" ry="5" fill="#34d399"/><circle cx="36" cy="22" r="1.5" fill="#0f172a"/><path d="M10 26 Q6 24 8 20" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/></svg>',
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
    shadeHex: shadeHex
  };
})();
