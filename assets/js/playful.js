/* ========================================================================
   共享童趣 UI v1 —— 声明式、渐进增强，不接管页面的核心计算
   可选 data-* 接入；页面没有接入点时保持静默。
   ======================================================================== */
(function (global) {
  "use strict";

  var initialized = false;
  var motionMediaBound = false;
  var characterById = Object.create(null);
  var knownCardIds = Object.create(null);
  var cardDialog = null;
  var cardReturnFocus = null;

  function config() { return global.PLAYFUL && typeof global.PLAYFUL === "object" ? global.PLAYFUL : null; }
  function progress() { return global.Progress && typeof global.Progress === "object" ? global.Progress : null; }
  function copy(value) {
    if (!value) return null;
    try { return JSON.parse(JSON.stringify(value)); } catch (e) { return null; }
  }
  function rebuildCharacters() {
    characterById = Object.create(null);
    var data = config();
    if (!data || !Array.isArray(data.characters)) return;
    data.characters.forEach(function (item) { if (item && item.id) characterById[item.id] = item; });
  }
  function page(rawId) {
    var data = config();
    var item = data && data.pages && data.pages[String(rawId || "")];
    return copy(item);
  }
  function pageIdFrom(node) {
    var current = node;
    while (current && current.getAttribute) {
      var id = current.getAttribute("data-playful-page");
      if (id) return id;
      current = current.parentNode;
    }
    if (global.document && global.document.body) {
      var bodyId = global.document.body.getAttribute("data-playful-page");
      if (bodyId) return bodyId;
    }
    try {
      var match = global.location && global.location.pathname.match(/\/(games|nature)\/([^/]+\.html)$/i);
      return match ? match[1] + "/" + match[2] : "";
    } catch (e) { return ""; }
  }
  function getPreference(name) {
    var store = progress();
    if (store && typeof store.getPreference === "function") return store.getPreference(name);
    if (name === "soundEnabled") return false;
    if (name === "motion") return "system";
    if (name === "ageGroup") return "all";
    if (name === "mode") return "kid";
    return null;
  }
  function setPreference(name, value) {
    var store = progress();
    return Boolean(store && typeof store.setPreference === "function" && store.setPreference(name, value));
  }
  function tone() {
    var data = config();
    var tones = data && data.ageTones;
    var age = getPreference("ageGroup") || "all";
    return copy(tones && (tones[age] || tones.all));
  }
  function companion(rawId) {
    var item = page(rawId);
    if (!item) return null;
    if (!characterById[item.companion]) rebuildCharacters();
    var character = characterById[item.companion];
    if (!character) return null;
    var result = copy(character);
    result.tone = tone();
    return result;
  }
  function randomTask(rawId, random) {
    var item = page(rawId);
    if (!item || !Array.isArray(item.surprises) || !item.surprises.length) return null;
    var chooser = typeof random === "function" ? random : Math.random;
    var number;
    try { number = Number(chooser()); } catch (e) { number = 0; }
    if (!isFinite(number)) number = 0;
    number = Math.max(0, Math.min(0.999999, number));
    var task = item.surprises[Math.floor(number * item.surprises.length)];
    var voice = tone();
    return { pageId: rawId, text: String(task), lead: voice ? voice.lead : "试试看" };
  }
  function motionReduced() {
    var preference = getPreference("motion");
    if (preference === "reduced") return true;
    if (preference === "full") return false;
    try { return Boolean(global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function onlineAllowed() {
    return getPreference("onlineData") === true;
  }
  function syncMotion() {
    if (!global.document || !global.document.documentElement) return;
    var preference = getPreference("motion") || "system";
    global.document.documentElement.setAttribute("data-playful-motion-preference", preference);
    global.document.documentElement.setAttribute("data-playful-motion", motionReduced() ? "reduced" : "full");
  }
  function sticker(rawId) {
    var store = progress();
    if (!store || typeof store.getStickers !== "function") return null;
    var stickers = store.getStickers(rawId);
    return stickers && stickers.length ? copy(stickers[0]) : null;
  }
  function card(rawId) {
    var store = progress();
    if (!store || typeof store.getCards !== "function") return null;
    var cards = store.getCards(rawId);
    return cards && cards.length ? copy(cards[0]) : null;
  }
  function rememberUnlockedCards(reset) {
    var store = progress();
    if (reset) knownCardIds = Object.create(null);
    if (!store || typeof store.getCards !== "function") return [];
    var newlyUnlocked = [];
    store.getCards().forEach(function (item) {
      if (!item.unlocked) return;
      if (!knownCardIds[item.id]) newlyUnlocked.push(item);
      knownCardIds[item.id] = true;
    });
    return newlyUnlocked;
  }
  function albumHref() {
    var nested = false;
    try {
      nested = /\/(games|nature|pages)\/[^/]*$/i.test(String((global.location && global.location.pathname) || ""));
    } catch (e) { nested = false; }
    var rel = (nested ? "../pages/" : "pages/") + "progress.html?view=cards#collectionPanel";
    try { return new URL(rel, global.location.href).href; }
    catch (e) { return rel; }
  }
  function closeCardDialog() {
    if (!cardDialog) return;
    if (typeof cardDialog.close === "function" && cardDialog.open) cardDialog.close();
    else {
      cardDialog.hidden = true;
      cardDialog.removeAttribute("data-open");
    }
    if (cardReturnFocus && typeof cardReturnFocus.focus === "function") cardReturnFocus.focus();
    cardReturnFocus = null;
  }
  function ensureCardDialog() {
    if (cardDialog || !global.document || !global.document.body) return cardDialog;
    var supportsDialog = typeof global.HTMLDialogElement === "function";
    cardDialog = global.document.createElement(supportsDialog ? "dialog" : "div");
    cardDialog.className = "reward-dialog";
    cardDialog.id = "playfulRewardDialog";
    if (!supportsDialog) {
      cardDialog.hidden = true;
      cardDialog.setAttribute("role", "dialog");
      cardDialog.setAttribute("aria-modal", "true");
    }
    cardDialog.setAttribute("aria-labelledby", "rewardDialogTitle");
    cardDialog.innerHTML = '<div class="reward-card" data-reward-card>' +
      '<button class="reward-close" type="button" aria-label="关闭收藏卡">×</button>' +
      '<div class="reward-card-head"><span class="reward-card-emoji" aria-hidden="true"></span><div><span class="reward-card-series"></span><h2 id="rewardDialogTitle"></h2></div></div>' +
      '<div class="reward-card-section"><b>我的发现</b><p data-reward-discovery></p></div>' +
      '<div class="reward-card-section"><b>知识小卡</b><p data-reward-fact></p></div>' +
      '<div class="reward-card-section reward-card-next"><b>下一次试试</b><p data-reward-next></p></div>' +
      '<div class="reward-card-actions"><a class="btn btn-primary" data-reward-album>收进卡册</a><button class="btn btn-ghost" type="button" data-reward-continue>继续玩</button></div>' +
      '</div>';
    cardDialog.querySelector(".reward-close").addEventListener("click", closeCardDialog);
    cardDialog.querySelector("[data-reward-continue]").addEventListener("click", closeCardDialog);
    cardDialog.querySelector("[data-reward-album]").href = albumHref();
    cardDialog.addEventListener("cancel", function (event) { event.preventDefault(); closeCardDialog(); });
    if (!supportsDialog) cardDialog.addEventListener("click", function (event) { if (event.target === cardDialog) closeCardDialog(); });
    global.document.body.appendChild(cardDialog);
    return cardDialog;
  }
  function showCard(rawId, trigger) {
    var item = card(rawId);
    if (!item || !item.unlocked || !global.document) return null;
    var dialog = ensureCardDialog();
    if (!dialog) return null;
    cardReturnFocus = trigger || global.document.activeElement;
    var face = dialog.querySelector("[data-reward-card]");
    face.style.setProperty("--card-accent", item.accent);
    text(dialog.querySelector(".reward-card-emoji"), item.emoji);
    text(dialog.querySelector(".reward-card-series"), item.series + " · 新收藏卡");
    text(dialog.querySelector("#rewardDialogTitle"), item.label);
    text(dialog.querySelector("[data-reward-discovery]"), item.discovery);
    text(dialog.querySelector("[data-reward-fact]"), item.fact);
    text(dialog.querySelector("[data-reward-next]"), item.next);
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.hidden = false;
      dialog.setAttribute("data-open", "true");
      dialog.querySelector(".reward-close").focus();
    }
    return item;
  }
  function text(node, value) { if (node) node.textContent = value; }

  /* ======================================================================
     插画场景引擎：把「一句说明」换成「一幅看得懂的画」
     - 纯内联 SVG，颜色全部走 CSS class（见 base.css 第 3 节），file:// 可用。
     - 场景只是舞台与气氛，绝不承载任务信息；信息仍由文字与状态宣告。
     - 页面两种用法：
         声明式  <div data-playful-scene="meadow" data-playful-scene-emoji="🐞"></div>
         命令式  node.appendChild(Playful.scene("ocean", { emoji: "🐋" }))
     ====================================================================== */
  var SVG_NS = "http://www.w3.org/2000/svg";
  var SCENE_W = 320;
  var SCENE_H = 180;

  function svgNode(name, attrs) {
    if (!global.document || !global.document.createElementNS) return null;
    var node = global.document.createElementNS(SVG_NS, name);
    if (attrs) Object.keys(attrs).forEach(function (key) { node.setAttribute(key, String(attrs[key])); });
    return node;
  }
  function svgText(value, attrs) {
    var node = svgNode("text", attrs);
    if (node) node.textContent = value;
    return node;
  }
  function addAll(parent, children) {
    children.forEach(function (child) { if (child) parent.appendChild(child); });
    return parent;
  }
  function sceneGroup(attrs, children) {
    var group = svgNode("g", attrs);
    return group ? addAll(group, children || []) : null;
  }
  /* --- 可复用画元 --- */
  function skyBand(cls) { return svgNode("rect", { "class": cls || "pf-sky", x: 0, y: 0, width: SCENE_W, height: SCENE_H }); }
  function sunAt(cx, cy, r, withRays) {
    var parts = [svgNode("circle", { "class": "pf-sun", cx: cx, cy: cy, r: r })];
    if (withRays) {
      for (var i = 0; i < 8; i += 1) {
        var angle = (Math.PI * 2 * i) / 8;
        parts.push(svgNode("line", {
          "class": "pf-sun-ray",
          x1: (cx + Math.cos(angle) * (r + 5)).toFixed(1),
          y1: (cy + Math.sin(angle) * (r + 5)).toFixed(1),
          x2: (cx + Math.cos(angle) * (r + 13)).toFixed(1),
          y2: (cy + Math.sin(angle) * (r + 13)).toFixed(1)
        }));
      }
    }
    return sceneGroup(null, parts);
  }
  function cloudAt(cx, cy, scale, soft) {
    var cls = soft ? "pf-cloud-soft" : "pf-cloud";
    return sceneGroup({ transform: "translate(" + cx + " " + cy + ") scale(" + scale + ")" }, [
      svgNode("ellipse", { "class": cls, cx: -18, cy: 4, rx: 20, ry: 12 }),
      svgNode("ellipse", { "class": cls, cx: 2, cy: -4, rx: 24, ry: 16 }),
      svgNode("ellipse", { "class": cls, cx: 22, cy: 5, rx: 18, ry: 11 })
    ]);
  }
  function starsAt(count, seedOffset) {
    var parts = [];
    for (var i = 0; i < count; i += 1) {
      /* 固定伪随机：同一场景每次渲染位置一致，避免闪烁感 */
      var t = i * 2.399963 + (seedOffset || 0);
      var x = 12 + ((Math.sin(t) * 0.5 + 0.5) * (SCENE_W - 24));
      var y = 8 + ((Math.cos(t * 1.7) * 0.5 + 0.5) * (SCENE_H * 0.58));
      parts.push(svgNode("circle", {
        "class": "pf-star pf-twinkle",
        cx: x.toFixed(1),
        cy: y.toFixed(1),
        r: (1.3 + (i % 3) * 0.7).toFixed(1),
        style: "animation-delay:" + ((i % 7) * 0.4).toFixed(1) + "s"
      }));
    }
    return sceneGroup(null, parts);
  }
  function hillPair() {
    return sceneGroup(null, [
      svgNode("path", { "class": "pf-hill-a", d: "M-12 180 Q68 96 168 134 T332 108 L332 180 Z" }),
      svgNode("path", { "class": "pf-hill-b", d: "M-12 180 Q92 132 190 156 T332 142 L332 180 Z" })
    ]);
  }
  function plantAt(x, baseY, scale) {
    return sceneGroup({ transform: "translate(" + x + " " + baseY + ") scale(" + (scale || 1) + ")" }, [
      svgNode("path", { "class": "pf-plant", d: "M0 0 q-11 -9 -12 -22 q13 2 12 22 z" }),
      svgNode("path", { "class": "pf-plant", d: "M0 0 q11 -10 13 -24 q-14 3 -13 24 z" }),
      svgNode("path", { "class": "pf-plant", d: "M0 0 q-2 -16 1 -28 q4 13 1 28 z" })
    ]);
  }
  function treeAt(x, baseY, scale) {
    return sceneGroup({ transform: "translate(" + x + " " + baseY + ") scale(" + (scale || 1) + ")" }, [
      svgNode("rect", { "class": "pf-trunk", x: -4, y: -26, width: 8, height: 26, rx: 3 }),
      svgNode("circle", { "class": "pf-plant", cx: 0, cy: -38, r: 19 }),
      svgNode("circle", { "class": "pf-plant", cx: -14, cy: -28, r: 13 }),
      svgNode("circle", { "class": "pf-plant", cx: 14, cy: -29, r: 12 })
    ]);
  }
  function waveLine(y, amp, cls) {
    /* 上下交替的二次贝塞尔，画出真正起伏的波纹而不是一排扇贝 */
    var d = "M-10 " + y;
    var up = true;
    for (var x = -10; x <= SCENE_W + 10; x += 24) {
      d += " q12 " + (up ? -amp : amp) + " 24 0";
      up = !up;
    }
    return svgNode("path", { "class": cls || "pf-wave", d: d });
  }
  function bubblesAt(spec) {
    return sceneGroup(null, spec.map(function (item) {
      return svgNode("circle", { "class": "pf-bubble", cx: item[0], cy: item[1], r: item[2] });
    }));
  }
  function figureAt(emoji, x, y, size, cls) {
    if (!emoji) return null;
    return svgText(emoji, {
      "class": cls || "pf-figure",
      x: x, y: y,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      "font-size": size || 62
    });
  }

  /* --- 场景配方：每个返回一组画元，中心留给主角 emoji --- */
  var SCENES = {
    meadow: { desc: "草地上有太阳、云朵、小山和青草", build: function () {
      return [skyBand(), sunAt(272, 34, 19, true), sceneGroup({ "class": "pf-drift" }, [cloudAt(62, 40, 1), cloudAt(140, 26, .7, true)]),
        hillPair(), plantAt(30, 176, 1.1), plantAt(74, 180, .9), plantAt(258, 178, 1), plantAt(296, 174, .8)];
    } },
    sky: { desc: "天空里有太阳、大云朵和几滴雨", build: function () {
      return [skyBand(), sunAt(262, 40, 20, true), sceneGroup({ "class": "pf-drift" }, [cloudAt(96, 46, 1.35), cloudAt(200, 32, .8, true)]),
        sceneGroup(null, [[104, 74], [124, 82], [144, 74], [84, 82]].map(function (p) {
          return svgNode("path", { "class": "pf-outline", d: "M" + p[0] + " " + p[1] + " l0 16" });
        })), hillPair()];
    } },
    rainbow: { desc: "云朵后面挂着一道彩虹", build: function () {
      var arcs = [];
      ["var(--danger)", "var(--warn)", "var(--kit)", "var(--sci)", "var(--math)", "var(--phys)"].forEach(function (color, i) {
        arcs.push(svgNode("path", {
          d: "M46 172 a" + (114 - i * 13) + " " + (114 - i * 13) + " 0 0 1 " + ((114 - i * 13) * 2) + " 0",
          fill: "none", stroke: color, "stroke-width": 11, opacity: .78
        }));
      });
      return [skyBand()].concat(arcs, [cloudAt(44, 168, 1.1), cloudAt(276, 166, 1.1), sunAt(286, 32, 16, true)]);
    } },
    ocean: { desc: "海面上有太阳、云和一层层波浪", build: function () {
      return [skyBand(), sunAt(268, 32, 18, true), sceneGroup({ "class": "pf-drift" }, [cloudAt(66, 34, .95)]),
        svgNode("path", { "class": "pf-water", d: "M0 104 H320 V180 H0 Z" }),
        waveLine(108, 9), waveLine(128, 7), waveLine(150, 6)];
    } },
    deepsea: { desc: "深海里越往下越暗，有气泡和一束光", build: function () {
      return [svgNode("rect", { "class": "pf-water", x: 0, y: 0, width: SCENE_W, height: 70 }),
        svgNode("rect", { "class": "pf-water-deep", x: 0, y: 62, width: SCENE_W, height: 118 }),
        svgNode("path", { "class": "pf-bubble", d: "M118 0 L152 0 L188 180 L96 180 Z", opacity: .22 }),
        bubblesAt([[44, 132, 5], [58, 104, 3.5], [40, 82, 2.6], [268, 124, 4.5], [282, 96, 3], [258, 70, 2.4]]),
        plantAt(24, 180, 1.5), plantAt(300, 180, 1.3)];
    } },
    space: { desc: "黑色的太空里有星星和一颗带环的行星", build: function () {
      return [skyBand("pf-sky-deep"), starsAt(26, 0.6),
        sceneGroup({ transform: "translate(258 44)" }, [
          svgNode("circle", { "class": "pf-moon", cx: 0, cy: 0, r: 21 }),
          svgNode("ellipse", { "class": "pf-outline", cx: 0, cy: 0, rx: 34, ry: 11, transform: "rotate(-18)" })
        ]),
        svgNode("path", { "class": "pf-hill-b", d: "M-12 180 Q80 146 176 164 T332 152 L332 180 Z" })];
    } },
    night: { desc: "夜晚的天空有月亮、星星和黑色的小山", build: function () {
      return [skyBand("pf-sky-deep"), starsAt(20, 1.2),
        svgNode("circle", { "class": "pf-moon", cx: 264, cy: 38, r: 20 }),
        svgNode("circle", { "class": "pf-sky-deep", cx: 254, cy: 32, r: 17 }),
        hillPair()];
    } },
    lab: { desc: "实验台上摆着烧瓶和工具，墙上有一块小架子", build: function () {
      return [skyBand(), svgNode("rect", { "class": "pf-bench", x: 0, y: 132, width: SCENE_W, height: 48 }),
        svgNode("rect", { "class": "pf-bench", x: 210, y: 40, width: 92, height: 8, rx: 4 }),
        sceneGroup(null, [
          svgNode("path", { "class": "pf-flask", d: "M36 132 L58 132 L52 104 L42 104 Z" }),
          svgNode("rect", { "class": "pf-flask", x: 68, y: 100, width: 20, height: 32, rx: 5 }),
          svgNode("circle", { "class": "pf-bubble", cx: 47, cy: 120, r: 3 }),
          svgNode("circle", { "class": "pf-bubble", cx: 78, cy: 112, r: 2.6 })
        ]),
        svgNode("path", { "class": "pf-outline", d: "M242 40 v-14 M262 40 v-20 M282 40 v-11" })];
    } },
    strata: { desc: "地面切开后能看到一层一层不同颜色的岩层", build: function () {
      return [skyBand(), svgNode("path", { "class": "pf-hill-a", d: "M0 62 Q80 40 168 58 T320 48 L320 74 H0 Z" }),
        svgNode("rect", { "class": "pf-strata-1", x: 0, y: 72, width: SCENE_W, height: 26 }),
        svgNode("rect", { "class": "pf-strata-2", x: 0, y: 98, width: SCENE_W, height: 26 }),
        svgNode("rect", { "class": "pf-strata-3", x: 0, y: 124, width: SCENE_W, height: 28 }),
        svgNode("rect", { "class": "pf-strata-4", x: 0, y: 152, width: SCENE_W, height: 28 }),
        svgNode("path", { "class": "pf-outline", d: "M0 72 H320 M0 98 H320 M0 124 H320 M0 152 H320" })];
    } },
    jungle: { desc: "树林里有大树、树叶和洒下来的阳光", build: function () {
      return [skyBand(), sunAt(280, 28, 15, false), treeAt(38, 168, 1.15), treeAt(286, 172, 1),
        svgNode("path", { "class": "pf-hill-b", d: "M-12 180 Q96 148 196 164 T332 156 L332 180 Z" }),
        plantAt(112, 180, .9), plantAt(228, 178, .85)];
    } },
    body: { desc: "暖色背景上有一条跳动的心跳线", build: function () {
      return [skyBand(), svgNode("path", { "class": "pf-outline", "stroke-width": 4,
        d: "M8 120 H92 l12 -34 l14 62 l14 -50 l12 22 H312" }),
        bubblesAt([[46, 46, 12], [268, 52, 15], [150, 34, 9]])];
    } },
    workshop: { desc: "工作台后面挂着一块打孔板和几件工具", build: function () {
      var dots = [];
      for (var r = 0; r < 4; r += 1) for (var c = 0; c < 12; c += 1) {
        dots.push(svgNode("circle", { "class": "pf-bubble", cx: 32 + c * 22, cy: 26 + r * 20, r: 2.6 }));
      }
      return [skyBand()].concat([sceneGroup(null, dots),
        svgNode("rect", { "class": "pf-bench", x: 0, y: 138, width: SCENE_W, height: 42 }),
        svgNode("path", { "class": "pf-outline", d: "M28 138 v-26 M28 112 h16 M282 138 v-30 M274 108 h18" })]);
    } },
    snow: { desc: "下雪的天空和白色的小山", build: function () {
      var flakes = [];
      for (var i = 0; i < 16; i += 1) {
        var t = i * 1.86;
        flakes.push(svgNode("circle", { "class": "pf-cloud pf-twinkle",
          cx: (14 + (Math.sin(t) * 0.5 + 0.5) * (SCENE_W - 28)).toFixed(1),
          cy: (12 + (Math.cos(t * 1.4) * 0.5 + 0.5) * 110).toFixed(1),
          r: (2 + (i % 3)).toFixed(1),
          style: "animation-delay:" + ((i % 5) * 0.5).toFixed(1) + "s" }));
      }
      return [skyBand(), sceneGroup({ "class": "pf-drift" }, [cloudAt(88, 34, 1.2), cloudAt(226, 28, .9, true)])]
        .concat([sceneGroup(null, flakes), hillPair()]);
    } },
    ramp: { desc: "一条斜坡从高处滑到平地", build: function () {
      return [skyBand(), sunAt(276, 30, 17, true), cloudAt(70, 32, .85, true),
        svgNode("path", { "class": "pf-hill-b", d: "M0 60 L150 138 H320 V180 H0 Z" }),
        svgNode("path", { "class": "pf-outline", "stroke-dasharray": "7 8", d: "M14 66 L150 140 H306" }),
        svgNode("rect", { "class": "pf-ground", x: 0, y: 162, width: SCENE_W, height: 18 })];
    } },
    spotlight: { desc: "一束光从左上打过来，在地上留下影子", build: function () {
      return [skyBand("pf-sky-deep"),
        svgNode("path", { "class": "pf-sun", d: "M22 22 L300 96 L300 148 L22 52 Z", opacity: .26 }),
        svgNode("circle", { "class": "pf-sun", cx: 26, cy: 34, r: 15 }),
        svgNode("ellipse", { "class": "pf-hill-b", cx: 210, cy: 160, rx: 74, ry: 15 }),
        svgNode("rect", { "class": "pf-ground", x: 0, y: 166, width: SCENE_W, height: 14 })];
    } },
    grid: { desc: "一张方格纸，中间画着横竖两条主轴", build: function () {
      var lines = [];
      for (var x = 20; x < SCENE_W; x += 20) lines.push(svgNode("line", { "class": "pf-outline", "stroke-width": 1, opacity: .5, x1: x, y1: 0, x2: x, y2: SCENE_H }));
      for (var y = 20; y < SCENE_H; y += 20) lines.push(svgNode("line", { "class": "pf-outline", "stroke-width": 1, opacity: .5, x1: 0, y1: y, x2: SCENE_W, y2: y }));
      return [skyBand()].concat([sceneGroup(null, lines),
        svgNode("path", { "class": "pf-outline", "stroke-width": 3, d: "M0 90 H320 M160 0 V180" })]);
    } },
    waves: { desc: "水面上一列一列的波纹向外传开", build: function () {
      return [skyBand(), waveLine(48, 12), waveLine(78, 10), waveLine(108, 8), waveLine(138, 6),
        svgNode("circle", { "class": "pf-bubble", cx: 40, cy: 92, r: 9 })];
    } }
  };

  function sceneNames() { return Object.keys(SCENES); }

  function scene(name, options) {
    if (!global.document || !global.document.createElementNS) return null;
    var key = String(name || "meadow");
    var recipe = SCENES[key] || SCENES.meadow;
    var config2 = options || {};
    var svg = svgNode("svg", {
      "class": "pf-scene" + (config2.className ? " " + config2.className : ""),
      viewBox: "0 0 " + SCENE_W + " " + SCENE_H,
      preserveAspectRatio: "xMidYMid slice",
      focusable: "false"
    });
    if (!svg) return null;
    if (config2.tone) svg.style.setProperty("--tone", config2.tone);
    /* 纯装饰的场景对读屏隐藏；需要被念出来的场景给 role="img" 和标题。 */
    if (config2.decorative === true) {
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("role", "presentation");
    } else {
      svg.setAttribute("role", "img");
      var titleNode = svgNode("title");
      titleNode.textContent = config2.title || "一幅插画";
      var descNode = svgNode("desc");
      descNode.textContent = config2.desc || (recipe.desc + (config2.emoji ? "，中间是主角图形" : ""));
      svg.appendChild(titleNode);
      svg.appendChild(descNode);
    }
    addAll(svg, recipe.build());
    (config2.props || []).forEach(function (prop) {
      svg.appendChild(figureAt(prop.emoji, prop.x, prop.y, prop.size || 30, "pf-figure-sm"));
    });
    if (config2.emoji) {
      svg.appendChild(figureAt(config2.emoji, config2.emojiX || 160, config2.emojiY || 96, config2.emojiSize || 64));
    }
    return svg;
  }

  /* 声明式接入：data-playful-scene="meadow" 就够了，其余属性都可选。 */
  function paintScene(node) {
    if (!node || node.getAttribute("data-playful-scene-painted") === "true") return null;
    var built = scene(node.getAttribute("data-playful-scene"), {
      emoji: node.getAttribute("data-playful-scene-emoji") || "",
      emojiSize: Number(node.getAttribute("data-playful-scene-emoji-size")) || 0,
      title: node.getAttribute("data-playful-scene-title") || "",
      desc: node.getAttribute("data-playful-scene-desc") || "",
      tone: node.getAttribute("data-playful-scene-tone") || "",
      decorative: node.getAttribute("data-playful-scene-decorative") === "true"
    });
    if (!built) return null;
    node.classList.add("pf-scene-holder");
    node.setAttribute("data-playful-scene-painted", "true");
    if (node.firstChild) node.insertBefore(built, node.firstChild);
    else node.appendChild(built);
    return built;
  }

  function findOutput(button) {
    var selector = button.getAttribute("data-playful-random-task");
    if (selector && selector !== "true") {
      try { return global.document.querySelector(selector); } catch (e) { /* 使用邻近输出 */ }
    }
    var scope = button.closest ? button.closest("[data-playful-page]") : button.parentNode;
    return scope && scope.querySelector ? scope.querySelector("[data-playful-task-output]") : null;
  }
  function renderCompanion(node) {
    var friend = companion(pageIdFrom(node));
    if (!friend) return;
    node.classList.add("playful-companion");
    var rendered = friend.id + ":" + (getPreference("ageGroup") || "all");
    if (node.getAttribute("data-playful-rendered") === rendered) return;
    node.textContent = "";
    var avatar = global.document.createElement("span");
    avatar.className = "playful-character";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = friend.emoji;
    var bubble = global.document.createElement("span");
    bubble.className = "playful-companion-bubble";
    var strong = global.document.createElement("strong");
    strong.textContent = friend.name + " · " + friend.role;
    var message = global.document.createElement("span");
    message.textContent = friend.motto + (friend.tone ? " " + friend.tone.detail : "");
    bubble.appendChild(strong);
    bubble.appendChild(message);
    node.appendChild(avatar);
    node.appendChild(bubble);
    node.setAttribute("data-playful-rendered", rendered);
  }
  function openCardFromBadge(node) {
    if (node.getAttribute("data-earned") !== "true") return;
    showCard(pageIdFrom(node), node);
  }
  function bindCardBadge(node) {
    if (node.getAttribute("data-playful-bound") === "card-badge") return;
    node.setAttribute("data-playful-bound", "card-badge");
    node.addEventListener("click", function () { openCardFromBadge(node); });
    node.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openCardFromBadge(node);
    });
  }
  function renderSticker(node) {
    var pageId = pageIdFrom(node);
    var earned = sticker(pageId);
    node.classList.add("playful-sticker");
    node.setAttribute("data-earned", earned ? "true" : "false");
    if (earned) {
      node.textContent = earned.emoji + " " + earned.label + " · 查看收藏卡";
      node.setAttribute("aria-label", "查看已解锁收藏卡：" + earned.label);
      node.setAttribute("role", "button");
      node.setAttribute("tabindex", "0");
      bindCardBadge(node);
    } else {
      var item = page(pageId);
      node.textContent = item && item.sticker ? "○ 完成任务解锁“" + item.sticker.label + "”" : "○ 完成任务解锁收藏卡";
      node.setAttribute("aria-label", "收藏卡尚未解锁");
      node.removeAttribute("role");
      node.removeAttribute("tabindex");
    }
  }
  function confetti(target) {
    if (!target || motionReduced() || !global.document) return;
    var layer = global.document.createElement("span");
    layer.className = "playful-confetti";
    layer.setAttribute("aria-hidden", "true");
    ["◆", "●", "▲", "★", "■", "●"].forEach(function (shape, index) {
      var bit = global.document.createElement("i");
      bit.textContent = shape;
      bit.style.setProperty("--i", index);
      layer.appendChild(bit);
    });
    target.appendChild(layer);
    global.setTimeout(function () { if (layer.parentNode) layer.parentNode.removeChild(layer); }, 900);
  }
  function completionFeedback(rawId, target) {
    var earned = sticker(rawId);
    if (!earned) return null;
    if (target) {
      target.classList.add("playful-feedback");
      target.setAttribute("role", "status");
      target.setAttribute("aria-live", "polite");
      target.textContent = earned.emoji + " 新收藏卡“" + earned.label + "”已收进卡册";
      confetti(target);
    }
    return earned;
  }
  function validateWork(rawId, payload) {
    var store = progress();
    if (!store || typeof store.validateWork !== "function") return null;
    return arguments.length === 1 ? store.validateWork(rawId) : store.validateWork(rawId, payload);
  }
  function saveWork(rawId, payload) {
    var store = progress();
    if (!store || typeof store.saveWork !== "function") return null;
    return arguments.length === 1 ? store.saveWork(rawId) : store.saveWork(rawId, payload);
  }
  function workError(check) {
    if (!check) return "这次没有保存，请检查内容或本机存储。";
    if (check.code === "item-bytes") return "作品约 " + (check.bytes / 1024).toFixed(1) + " KiB，超过单项 " + (check.maxBytes / 1024).toFixed(0) + " KiB 上限；请缩短文字后再保存。";
    if (check.code === "total-bytes") return "作品总量将达到约 " + (check.totalBytes / 1024).toFixed(1) + " KiB，超过 " + (check.maxTotalBytes / 1024).toFixed(0) + " KiB 上限；请先删除不需要的作品。";
    if (check.code === "count") return "作品册已有 " + check.count + " 件，达到 " + check.maxCount + " 件上限；请先删除不需要的作品。";
    if (check.code === "empty") return "请填写作品标题或正文。";
    if (check.code === "type") return "请选择有效的作品类型。";
    if (check.code === "missing") return "原作品已不存在，请刷新页面后重新保存。";
    if (check.code === "page") return "作品来源页面无效，未保存。";
    return "作品内容不符合保存规则，请检查后重试。";
  }
  function formValue(form, names) {
    for (var i = 0; i < names.length; i += 1) {
      var field = form.querySelector("[name='" + names[i] + "'],[data-work-" + names[i] + "]");
      if (field) return field.value;
    }
    return "";
  }
  function bindWorkForm(form) {
    if (form.getAttribute("data-playful-bound") === "work") return;
    form.setAttribute("data-playful-bound", "work");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var pageId = pageIdFrom(form);
      var payload = {
        id: formValue(form, ["id"]) || form.getAttribute("data-playful-work-id") || "",
        type: formValue(form, ["type", "workType"]),
        title: formValue(form, ["title"]),
        content: formValue(form, ["content"])
      };
      var check = validateWork(pageId, payload);
      var result = check && check.ok ? saveWork(pageId, payload) : null;
      if (result && result.id) form.setAttribute("data-playful-work-id", result.id);
      var status = form.querySelector("[data-playful-work-status]");
      if (status) {
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        text(status, result ? "作品已保存在这台设备上。" : (check && check.ok ? "内容校验已通过，但本机存储写入失败；请检查存储权限。" : workError(check)));
      }
      if (result) form.dispatchEvent(new CustomEvent("playful:worksaved", { bubbles: true, detail: copy(result) }));
    });
  }
  function bindPreference(control) {
    if (control.getAttribute("data-playful-bound") === "preference") return;
    var name = control.getAttribute("data-playful-preference");
    control.setAttribute("data-playful-bound", "preference");
    control.addEventListener("change", function () {
      var previous = getPreference(name);
      var value = control.type === "checkbox" ? control.checked : control.value;
      var saved = setPreference(name, value);
      if (!saved) {
        if (control.type === "checkbox") control.checked = Boolean(previous);
        else if (previous !== null) control.value = previous;
      }
      syncPreferences(global.document);
      control.dispatchEvent(new CustomEvent("playful:preference", {
        bubbles: true,
        detail: { name: name, value: value, saved: saved }
      }));
    });
  }
  function ensureModeSwitch() {
    if (!global.document || global.document.querySelector('[data-playful-preference="mode"]')) return;
    var nav = global.document.querySelector(".nav .nav-in");
    if (!nav) return;
    var label = global.document.createElement("label");
    label.className = "mode-switch no-print";
    label.setAttribute("for", "playfulModeSwitch");
    label.innerHTML = '<span aria-hidden="true">🧸</span><span>显示模式</span>' +
      '<select class="input" id="playfulModeSwitch" data-playful-preference="mode" aria-label="显示模式">' +
      '<option value="kid">孩子模式</option><option value="parent">家长模式</option></select>';
    nav.appendChild(label);
  }
  function bindKidChoice(button) {
    if (button.getAttribute("data-playful-bound") === "kid-choice") return;
    button.setAttribute("data-playful-bound", "kid-choice");
    if (!button.hasAttribute("aria-pressed")) button.setAttribute("aria-pressed", "false");
    /* 先认 data-kid-choice-group，再退回 .kid-choice 容器。
       顺序很重要：closest() 从元素自身开始找，而选项按钮上常常也带着
       .kid-choice 类（symmetry-studio 的数对称轴那组就是），合并成
       "[data-kid-choice-group],.kid-choice" 会先命中按钮自己，
       choices 只剩一个元素，方向键导航就静默失效了。 */
    function choicesFor() {
      var group = button.closest ? button.closest("[data-kid-choice-group]") : null;
      if (!group && button.parentNode && button.parentNode.closest) group = button.parentNode.closest(".kid-choice");
      return group ? nodes(group, "[data-kid-choice]") : [button];
    }
    function choose() {
      choicesFor().forEach(function (item) { item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
      button.dispatchEvent(new CustomEvent("playful:choice", {
        bubbles: true,
        detail: { value: button.getAttribute("data-value") || button.textContent.trim() }
      }));
    }
    button.addEventListener("click", choose);
    button.addEventListener("keydown", function (event) {
      if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].indexOf(event.key) < 0) return;
      var choices = choicesFor();
      if (choices.length < 2) return;
      var index = choices.indexOf(button);
      if (event.key === "Home") index = 0;
      else if (event.key === "End") index = choices.length - 1;
      else if (event.key === "ArrowRight" || event.key === "ArrowDown") index = (index + 1) % choices.length;
      else index = (index + choices.length - 1) % choices.length;
      event.preventDefault();
      choices[index].focus();
      choices[index].click();
    });
  }
  /* 猜一猜卡：收下猜测 → 揭示页面写好的答案 → 广播 playful:predict。
     「怎么演示这个答案」留给页面自己接线（把滑块推到某个值、切换模式、
     重新起跑），所以共享层不碰页面的核心计算，也不参与任务完成判定。
     选中态和方向键导航直接复用 bindKidChoice，这里不再写一套选择逻辑。 */
  function bindPredict(card) {
    if (card.getAttribute("data-playful-bound") === "predict") return;
    card.setAttribute("data-playful-bound", "predict");
    var answer = card.querySelector("[data-kid-predict-answer]");
    var verify = card.querySelector("[data-kid-predict-verify]");
    if (answer) {
      answer.setAttribute("role", "status");
      answer.setAttribute("aria-live", "polite");
    }
    function label(node) { return node ? String(node.textContent || "").trim() : ""; }
    function say(mark, sentence) {
      if (!answer) return;
      answer.textContent = "";
      if (mark) {
        var icon = global.document.createElement("span");
        icon.className = "kid-predict-mark";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = mark;
        answer.appendChild(icon);
      }
      /* 读屏只念这段文字，上面那个符号是纯装饰。 */
      answer.appendChild(global.document.createTextNode(sentence));
    }
    if (verify) verify.addEventListener("click", function () {
      var picked = card.querySelector('[data-kid-choice][aria-pressed="true"]');
      if (!picked) {
        card.removeAttribute("data-kid-predict-state");
        say("", card.getAttribute("data-kid-predict-hint") || "先选一个你猜的答案，再点这个按钮。");
        var first = card.querySelector("[data-kid-choice]");
        if (first && first.focus) first.focus();
        return;
      }
      var truth = card.querySelector("[data-kid-predict-correct]");
      var right = picked.hasAttribute("data-kid-predict-correct");
      var explain = card.getAttribute("data-kid-predict-explain") || "";
      /* 猜错不是失败：只说清「你押的」和「结果」的差别，不出现叉号或扣分。 */
      var sentence = right
        ? "猜对了：" + label(picked) + "。" + explain
        : "你猜的是「" + label(picked) + "」，结果是「" + label(truth) + "」。" + explain;
      card.setAttribute("data-kid-predict-state", right ? "right" : "wrong");
      say(right ? "🎉" : "💡", sentence);
      card.dispatchEvent(new CustomEvent("playful:predict", {
        bubbles: true,
        detail: {
          pageId: pageIdFrom(card),
          value: picked.getAttribute("data-value") || label(picked),
          label: label(picked),
          correct: right
        }
      }));
    });
    /* 换一个猜测就把上一轮的结论收回去，避免答案和选中项对不上。 */
    nodes(card, "[data-kid-choice]").forEach(function (pick) {
      pick.addEventListener("click", function () {
        if (card.getAttribute("data-kid-predict-state")) {
          card.removeAttribute("data-kid-predict-state");
          say("", card.getAttribute("data-kid-predict-again") || "押好了，点下面的按钮试试看。");
        }
      });
    });
  }
  function hashHue(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) % 360;
  }
  function distinguishRepeatPhotos(root) {
    if (!root || !root.querySelectorAll) return;
    try {
      if (global.location && /\/nature\/beetles\.html$/i.test(global.location.pathname)) return;
    } catch (e) { /* file: 或无 location 时仍处理其它页 */ }
    nodes(root, ".kid-figure-grid").forEach(function (grid) {
      var counts = Object.create(null);
      var imgs = grid.querySelectorAll(".kid-figure-art img.photo-real");
      for (var c = 0; c < imgs.length; c++) {
        var src0 = String(imgs[c].getAttribute("src") || "").replace(/[?#].*$/, "");
        if (!src0) continue;
        counts[src0] = (counts[src0] || 0) + 1;
      }
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        var art = img.parentNode;
        if (!art || !art.classList || !art.classList.contains("kid-figure-art")) continue;
        if (art.classList.contains("atlas-ban")) continue;
        var btn = art.parentNode;
        var gn = btn && btn.getAttribute ? btn.getAttribute("data-gn") : "";
        var pl = btn && btn.getAttribute ? btn.getAttribute("data-pl-atlas") : "";
        if (gn === "lotus" || gn === "wick" || gn === "oilmagic") continue;
        if (pl === "lotus" || pl === "magic" || pl === "dryok") continue;
        var key = String(img.getAttribute("src") || "").replace(/[?#].*$/, "");
        if (!key || counts[key] < 2) continue;
        art.classList.add("atlas-same");
      }
      var arts = grid.querySelectorAll(".kid-figure-art.atlas-same");
      for (var a = 0; a < arts.length; a++) {
        var tagged = arts[a];
        var photo = tagged.querySelector && tagged.querySelector("img.photo-real");
        var src = photo ? String(photo.getAttribute("src") || "") : "";
        var host = tagged.parentNode;
        var capEl = host && host.querySelector ? host.querySelector(".kid-figure-cap") : null;
        var cap = capEl ? String(capEl.textContent || "") : "";
        var slot = (host && host.getAttribute ? (host.getAttribute("data-gn") || host.getAttribute("data-pl-atlas") || "") : "") + cap + String(a);
        var hue = hashHue(src + slot);
        tagged.style.setProperty("--atlas-hue", hue + "deg");
        tagged.style.setProperty("--atlas-pos", (15 + (hue % 70)) + "% " + (12 + ((hue >>> 3) % 76)) + "%");
      }
    });
  }
  function nodes(root, selector) {
    var list = [];
    if (!root) return list;
    if (root.matches && root.matches(selector)) list.push(root);
    if (root.querySelectorAll) Array.prototype.push.apply(list, root.querySelectorAll(selector));
    return list;
  }
  function syncPreferences(root) {
    if (!global.document) return false;
    root = root || global.document;
    nodes(root, "[data-playful-preference]").forEach(function (control) {
      var value = getPreference(control.getAttribute("data-playful-preference"));
      if (control.type === "checkbox") control.checked = Boolean(value);
      else if (value !== null) control.value = value;
    });
    if (global.document.documentElement) {
      global.document.documentElement.setAttribute("data-playful-age", getPreference("ageGroup") || "all");
      global.document.documentElement.setAttribute("data-mode", getPreference("mode") || "kid");
    }
    nodes(global.document, "[data-playful-companion]").forEach(renderCompanion);
    syncMotion();
    return true;
  }
  function enhance(root) {
    if (!global.document || !config()) return false;
    root = root || global.document;
    ensureModeSwitch();
    nodes(root, "[data-playful-scene]").forEach(paintScene);
    nodes(root, "[data-playful-companion]").forEach(renderCompanion);
    nodes(root, "[data-playful-sticker]").forEach(renderSticker);
    nodes(root, "[data-kid-choice]").forEach(bindKidChoice);
    /* 必须排在 bindKidChoice 之后：选项按钮上两者都挂 click，
       先让共享选中态落地，再由猜一猜卡回收上一轮的结论。 */
    nodes(root, "[data-kid-predict]").forEach(bindPredict);
    nodes(root, "[data-playful-random-task]").forEach(function (button) {
      if (button.getAttribute("data-playful-bound") === "task") return;
      button.setAttribute("data-playful-bound", "task");
      button.addEventListener("click", function () {
        var challenge = randomTask(pageIdFrom(button));
        var output = findOutput(button);
        if (challenge && output) {
          output.setAttribute("role", "status");
          output.setAttribute("aria-live", "polite");
          text(output, challenge.lead + "：" + challenge.text);
        }
      });
    });
    nodes(root, "[data-playful-work-form]").forEach(bindWorkForm);
    nodes(root, "[data-playful-preference]").forEach(bindPreference);
    syncPreferences(global.document);
    return true;
  }
  function init(root) {
    rebuildCharacters();
    var scope = root || global.document;
    distinguishRepeatPhotos(scope);
    var result = enhance(scope);
    if (!initialized && typeof global.addEventListener === "function") {
      initialized = true;
      rememberUnlockedCards();
      global.addEventListener("kids-stem:progress", function (event) {
        if (!global.document) return;
        syncPreferences(global.document);
        nodes(global.document, "[data-playful-sticker]").forEach(renderSticker);
        var source = event && event.detail ? event.detail.source : "";
        if (source === "reset") rememberUnlockedCards(true);
        else if (source === "import") rememberUnlockedCards(true);
        if (source === "complete") {
          var newlyUnlocked = [];
          var store = progress();
          if (store && typeof store.getCards === "function") {
            store.getCards().forEach(function (item) {
              if (item.unlocked && !knownCardIds[item.id]) {
                knownCardIds[item.id] = true;
                newlyUnlocked.push(item);
              }
            });
          }
          nodes(global.document, "[data-playful-feedback]").forEach(function (node) { completionFeedback(pageIdFrom(node), node); });
          if (newlyUnlocked.length) showCard(newlyUnlocked[0].pageId, global.document.activeElement);
        }
      });
      try {
        var query = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)");
        if (query && query.addEventListener) query.addEventListener("change", syncMotion);
        else if (query && query.addListener) query.addListener(syncMotion);
      } catch (e) { /* 媒体查询不可用时保留当前状态 */ }
    }
    return result;
  }

  /* 图形量表：把数值变成看得见的长短，页面仍需自己写出数字文本。 */
  function setMeter(node, value, max) {
    if (!node) return 0;
    var top = Number(max);
    if (!isFinite(top) || top <= 0) top = 1;
    var ratio = Number(value) / top;
    if (!isFinite(ratio)) ratio = 0;
    ratio = Math.max(0, Math.min(1, ratio));
    var fill = node.classList && node.classList.contains("kid-meter-fill") ? node : (node.querySelector && node.querySelector(".kid-meter-fill"));
    if (fill) fill.style.setProperty("--fill", (ratio * 100).toFixed(1) + "%");
    return ratio;
  }

  global.Playful = {
    init: init,
    page: page,
    companion: companion,
    tone: tone,
    randomTask: randomTask,
    getSticker: sticker,
    getCard: card,
    showCard: showCard,
    completionFeedback: completionFeedback,
    scene: scene,
    paintScene: paintScene,
    sceneNames: sceneNames,
    confetti: confetti,
    setMeter: setMeter,
    saveWork: saveWork,
    validateWork: validateWork,
    getPreference: getPreference,
    setPreference: setPreference,
    motionReduced: motionReduced,
    onlineAllowed: onlineAllowed,
    syncPreferences: syncPreferences
  };

  if (global.document) {
    if (global.document.readyState === "loading") global.document.addEventListener("DOMContentLoaded", function () { init(global.document); });
    else init(global.document);
  }
})(window);
