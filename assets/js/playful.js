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
  /* 共享插图是可选依赖：页面没引 illustrations.js（或插图库里还没这张）时，
     这些位置继续显示 data/playful.js 里的 emoji，不影响任何功能。 */
  function artInto(node, name, fallback) {
    if (!node) return false;
    var lib = global.ILLUSTRATIONS;
    var html = lib && typeof lib.art === "function" && lib.hasArt(name)
      ? lib.art(name, { decorative: true }) : "";
    node.textContent = "";
    if (!html) {
      if (fallback != null) node.textContent = fallback;
      return false;
    }
    node.insertAdjacentHTML("beforeend", html);
    return true;
  }
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
    try { return new URL("../pages/progress.html?view=cards#collectionPanel", global.location.href).href; }
    catch (e) { return "../pages/progress.html?view=cards#collectionPanel"; }
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
    artInto(dialog.querySelector(".reward-card-emoji"), "sticker/" + item.id, item.emoji);
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
    artInto(avatar, "friend/" + friend.id, friend.emoji);
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
      node.textContent = "";
      var mark = global.document.createElement("span");
      mark.className = "playful-sticker-mark";
      mark.setAttribute("aria-hidden", "true");
      artInto(mark, "sticker/" + earned.id, earned.emoji);
      node.appendChild(mark);
      node.appendChild(global.document.createTextNode(earned.label + " · 查看收藏卡"));
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
    function choicesFor() {
      var group = button.closest ? button.closest("[data-kid-choice-group],.kid-choice") : null;
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
      var mode = getPreference("mode") || "kid";
      var before = global.document.documentElement.getAttribute("data-mode");
      global.document.documentElement.setAttribute("data-mode", mode);
      if (before && before !== mode) announceLayoutChange();
    }
    nodes(global.document, "[data-playful-companion]").forEach(renderCompanion);
    syncMotion();
    return true;
  }
  /* 切换孩子/家长模式会改字号、内边距和画布的 max-height，也就是真的改了可用尺寸。
     各页的画布本来只在 window resize 时重新按 devicePixelRatio 定尺寸，
     不补这一下，切完模式画布会一直按旧尺寸拉伸显示。等一帧是为了让新样式先生效。 */
  function announceLayoutChange() {
    if (typeof global.dispatchEvent !== "function" || typeof global.Event !== "function") return;
    var fire = function () {
      try { global.dispatchEvent(new global.Event("resize")); } catch (err) { /* 环境不支持就算了 */ }
    };
    if (typeof global.requestAnimationFrame === "function") global.requestAnimationFrame(fire);
    else fire();
  }
  function enhance(root) {
    if (!global.document || !config()) return false;
    root = root || global.document;
    ensureModeSwitch();
    nodes(root, "[data-playful-companion]").forEach(renderCompanion);
    nodes(root, "[data-playful-sticker]").forEach(renderSticker);
    nodes(root, "[data-kid-choice]").forEach(bindKidChoice);
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
    var result = enhance(root || global.document);
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
    saveWork: saveWork,
    validateWork: validateWork,
    getPreference: getPreference,
    setPreference: setPreference,
    motionReduced: motionReduced,
    syncPreferences: syncPreferences
  };

  if (global.document) {
    if (global.document.readyState === "loading") global.document.addEventListener("DOMContentLoaded", function () { init(global.document); });
    else init(global.document);
  }
})(window);
