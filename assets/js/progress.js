/* ========================================================================
   探索足迹 v3 —— 本机、离线、异常安全的共享进度与作品层
   Classic script；不依赖 fetch、module、CDN。贴纸由完成记录即时派生。
   ======================================================================== */
(function (global) {
  "use strict";

  var KEY = "kids-stem:progress:v3";
  var V2_KEY = "kids-stem:progress:v2";
  var V1_KEY = "kids-stem:progress:v1";
  var EVENT_NAME = "kids-stem:progress";
  var MAX_PAGES = 100;
  var MAX_RECENT = 12;
  var MAX_NOTES = 100;
  var MAX_COMPLETIONS = 100;
  var MAX_WORKS = 60;
  var MAX_TITLE = 40;
  var MAX_NOTE = 300;
  var MAX_EVIDENCE = 500;
  var MAX_WORK_TITLE = 80;
  var MAX_WORK_CONTENT = 8000;
  var MAX_WORK_BYTES = 12 * 1024;
  var MAX_WORKS_BYTES = 96 * 1024;
  var MAX_JSON = 256 * 1024;
  var MAX_VISITS = 1000000;
  var WORK_TYPES = ["observation", "prediction", "drawing", "model", "explanation", "photo-note"];
  var PREFERENCE_DEFAULTS = {
    soundEnabled: false,
    motion: "system",
    ageGroup: "all",
    mode: "kid"
  };

  function dict() { return Object.create(null); }

  function blank() {
    return {
      schemaVersion: 3,
      revision: 0,
      updatedAt: null,
      pages: dict(),
      recent: [],
      notes: dict(),
      completions: dict(),
      works: dict(),
      preferences: {
        soundEnabled: PREFERENCE_DEFAULTS.soundEnabled,
        motion: PREFERENCE_DEFAULTS.motion,
        ageGroup: PREFERENCE_DEFAULTS.ageGroup,
        mode: PREFERENCE_DEFAULTS.mode
      }
    };
  }

  function cleanText(value, max) {
    if (typeof value !== "string" && typeof value !== "number") return "";
    return String(value)
      .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "")
      .trim().slice(0, max);
  }

  function fallbackId(id) {
    return /^(games|nature)\/[a-z0-9][a-z0-9._-]*\.html$/i.test(id) && id.indexOf("..") === -1;
  }

  function allowlist() {
    if (!Array.isArray(global.EXPLORATIONS)) return null;
    var allowed = dict();
    global.EXPLORATIONS.slice(0, MAX_PAGES).forEach(function (item) {
      if (!item || typeof item !== "object") return;
      var id = cleanText(item.id, 160);
      if (fallbackId(id)) allowed[id] = true;
    });
    return allowed;
  }

  function cleanId(value) {
    var id = cleanText(value, 160);
    if (!id || !fallbackId(id)) return "";
    var allowed = allowlist();
    return !allowed || allowed[id] ? id : "";
  }

  function cleanWorkId(value) {
    var id = cleanText(value, 64).toLowerCase();
    return /^[a-z0-9][a-z0-9_-]{0,63}$/.test(id) ? id : "";
  }

  function cleanWorkType(value) {
    var type = cleanText(value, 24).toLowerCase();
    return WORK_TYPES.indexOf(type) >= 0 ? type : "";
  }

  function nowISO() {
    try { return new Date().toISOString(); }
    catch (e) { return "1970-01-01T00:00:00.000Z"; }
  }

  function cleanISO(value) {
    if (typeof value !== "string" || value.length > 40 ||
        !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return "";
    var time = Date.parse(value);
    if (!isFinite(time)) return "";
    try { return new Date(time).toISOString(); }
    catch (e) { return ""; }
  }

  function legacyISO(value) {
    var text = cleanText(value, 40);
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return cleanISO(text + "T00:00:00.000Z");
    return cleanISO(text);
  }

  function readJSON(key) {
    try {
      var value = global.localStorage.getItem(key);
      if (!value || value.length > MAX_JSON) return null;
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  function cleanRevision(value) {
    var revision = Number(value);
    return isFinite(revision) && revision >= 0 ? Math.min(Math.floor(revision), 2147483647) : 0;
  }

  function ownObject(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  }

  function preferenceValue(name, value) {
    if (name === "soundEnabled") return typeof value === "boolean" ? value : PREFERENCE_DEFAULTS.soundEnabled;
    if (name === "motion") return ["system", "full", "reduced"].indexOf(value) >= 0 ? value : PREFERENCE_DEFAULTS.motion;
    if (name === "ageGroup") return ["all", "4-6", "7-9", "10-12"].indexOf(value) >= 0 ? value : PREFERENCE_DEFAULTS.ageGroup;
    if (name === "mode") return ["parent", "kid"].indexOf(value) >= 0 ? value : PREFERENCE_DEFAULTS.mode;
    return null;
  }

  function utf8Size(text) {
    var size = 0;
    for (var i = 0; i < text.length; i += 1) {
      var code = text.charCodeAt(i);
      if (code < 0x80) size += 1;
      else if (code < 0x800) size += 2;
      else if (code >= 0xd800 && code <= 0xdbff && i + 1 < text.length &&
               text.charCodeAt(i + 1) >= 0xdc00 && text.charCodeAt(i + 1) <= 0xdfff) {
        size += 4;
        i += 1;
      } else size += 3;
    }
    return size;
  }

  function jsonSize(value) {
    try { return utf8Size(JSON.stringify(value)); }
    catch (e) { return MAX_JSON + 1; }
  }

  /* level: 1=v1, 2=v2, 3=v3 */
  function sanitize(source, level) {
    var out = blank();
    if (!source || typeof source !== "object" || Array.isArray(source)) return out;
    out.revision = level === 1 ? 0 : cleanRevision(source.revision);
    out.updatedAt = level === 1 ? null : (cleanISO(source.updatedAt) || null);

    var pages = ownObject(source.pages);
    Object.keys(pages).slice(0, MAX_PAGES * 4).some(function (rawId) {
      if (Object.keys(out.pages).length >= MAX_PAGES) return true;
      var id = cleanId(rawId);
      var page = pages[rawId];
      if (!id || !page || typeof page !== "object" || Array.isArray(page)) return false;
      var visits = Number(page.n);
      if (!isFinite(visits) || visits < 1) return false;
      var first = level === 1 ? legacyISO(page.first) : cleanISO(page.first);
      var last = level === 1 ? legacyISO(page.last) : cleanISO(page.last);
      var fallback = nowISO();
      out.pages[id] = {
        n: Math.min(Math.floor(visits), MAX_VISITS),
        first: first || last || fallback,
        last: last || first || fallback,
        title: cleanText(page.title, MAX_TITLE)
      };
      return false;
    });

    if (Array.isArray(source.recent)) {
      source.recent.slice(0, MAX_RECENT * 4).forEach(function (rawId) {
        var id = cleanId(rawId);
        if (id && out.pages[id] && out.recent.indexOf(id) === -1 && out.recent.length < MAX_RECENT) out.recent.push(id);
      });
    }

    var notes = ownObject(source.notes);
    Object.keys(notes).slice(0, MAX_NOTES * 4).some(function (rawId) {
      if (Object.keys(out.notes).length >= MAX_NOTES) return true;
      var id = cleanId(rawId);
      var note = notes[rawId];
      if (!id || !out.pages[id] || !note || typeof note !== "object" || Array.isArray(note)) return false;
      var text = cleanText(note.t, MAX_NOTE);
      if (!text) return false;
      out.notes[id] = { t: text, on: (level === 1 ? legacyISO(note.on) : cleanISO(note.on)) || nowISO() };
      return false;
    });

    if (level >= 2) {
      var completions = ownObject(source.completions);
      Object.keys(completions).slice(0, MAX_COMPLETIONS * 4).some(function (rawId) {
        if (Object.keys(out.completions).length >= MAX_COMPLETIONS) return true;
        var id = cleanId(rawId);
        var completion = completions[rawId];
        if (!id || !completion || typeof completion !== "object" || Array.isArray(completion)) return false;
        var at = cleanISO(completion.at);
        if (!at) return false;
        out.completions[id] = { at: at, evidence: cleanText(completion.evidence, MAX_EVIDENCE) };
        return false;
      });
    }

    if (level >= 3) {
      var works = ownObject(source.works);
      var total = 0;
      Object.keys(works).slice(0, MAX_WORKS * 6).some(function (rawWorkId) {
        if (Object.keys(out.works).length >= MAX_WORKS) return true;
        var work = works[rawWorkId];
        var id = cleanWorkId(rawWorkId);
        if (!id || !work || typeof work !== "object" || Array.isArray(work)) return false;
        var pageId = cleanId(work.pageId);
        var type = cleanWorkType(work.type);
        var title = cleanText(work.title, MAX_WORK_TITLE);
        var content = cleanText(work.content, MAX_WORK_CONTENT);
        var createdAt = cleanISO(work.createdAt);
        var updatedAt = cleanISO(work.updatedAt);
        if (!pageId || !type || (!title && !content) || !createdAt || !updatedAt) return false;
        var cleaned = { id: id, pageId: pageId, type: type, title: title, content: content, createdAt: createdAt, updatedAt: updatedAt };
        var size = jsonSize(cleaned);
        if (size > MAX_WORK_BYTES || total + size > MAX_WORKS_BYTES) return false;
        out.works[id] = cleaned;
        total += size;
        return false;
      });

      var preferences = ownObject(source.preferences);
      Object.keys(PREFERENCE_DEFAULTS).forEach(function (name) {
        out.preferences[name] = preferenceValue(name, preferences[name]);
      });
    }
    return out;
  }

  function writeRaw(data) {
    try {
      global.localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function emit(source, data) {
    if (typeof global.dispatchEvent !== "function") return;
    var detail = { source: source, revision: data && typeof data.revision === "number" ? data.revision : null };
    try {
      var event;
      if (typeof global.CustomEvent === "function") event = new global.CustomEvent(EVENT_NAME, { detail: detail });
      else if (global.document && typeof global.document.createEvent === "function") {
        event = global.document.createEvent("CustomEvent");
        event.initCustomEvent(EVENT_NAME, false, false, detail);
      } else return;
      global.dispatchEvent(event);
    } catch (e) { /* 事件能力不足不影响持久化 */ }
  }

  function commit(data, source) {
    data.schemaVersion = 3;
    data.revision = Math.min(cleanRevision(data.revision) + 1, 2147483647);
    data.updatedAt = nowISO();
    if (!writeRaw(data)) return false;
    emit(source, data);
    return true;
  }

  function load() {
    var current = readJSON(KEY);
    if (current && current.schemaVersion === 3) return sanitize(current, 3);

    var previous = readJSON(V2_KEY);
    if (previous && previous.schemaVersion === 2) {
      var fromV2 = sanitize(previous, 2);
      commit(fromV2, "migration");
      return fromV2;
    }

    var legacy = readJSON(V1_KEY);
    if (!legacy || typeof legacy !== "object" || Array.isArray(legacy)) return blank();
    var fromV1 = sanitize(legacy, 1);
    commit(fromV1, "migration");
    return fromV1;
  }

  function copyRecord(record) {
    if (!record) return null;
    var copy = {};
    Object.keys(record).forEach(function (key) { copy[key] = record[key]; });
    return copy;
  }

  function detached(data) {
    try { return JSON.parse(JSON.stringify(data)); }
    catch (e) { return JSON.parse(JSON.stringify(blank())); }
  }

  function generatedWorkId(data) {
    var base = "work-" + Date.now().toString(36) + "-";
    for (var i = 0; i < 20; i += 1) {
      var id = base + Math.floor(Math.random() * 1679616).toString(36);
      if (!data.works[id]) return id;
    }
    return base + Object.keys(data.works).length.toString(36);
  }

  function worksSize(works, exceptId) {
    return Object.keys(works).reduce(function (sum, id) {
      return sum + (id === exceptId ? 0 : jsonSize(works[id]));
    }, 0);
  }

  function playfulSticker(id) {
    var pages = global.PLAYFUL && global.PLAYFUL.pages;
    var page = pages && pages[id];
    var sticker = page && page.sticker;
    if (!sticker || typeof sticker !== "object") return null;
    var stickerId = cleanText(sticker.id, 64).toLowerCase();
    var label = cleanText(sticker.label, 40);
    var emoji = cleanText(sticker.emoji, 8);
    if (!/^[a-z0-9][a-z0-9_-]{0,63}$/.test(stickerId) || !label || !emoji) return null;
    return { id: stickerId, pageId: id, label: label, emoji: emoji };
  }

  function playfulCard(id) {
    var pages = global.PLAYFUL && global.PLAYFUL.pages;
    var page = pages && pages[id];
    var card = page && page.card;
    var sticker = playfulSticker(id);
    if (!sticker || !card || typeof card !== "object" || Array.isArray(card)) return null;
    var series = cleanText(card.series, 30);
    var discovery = cleanText(card.discovery, 140);
    var fact = cleanText(card.fact, 140);
    var next = cleanText(card.next, 140);
    var accent = cleanText(card.accent, 16).toLowerCase();
    if (!series || !discovery || !fact || !next || !/^#[0-9a-f]{6}$/.test(accent)) return null;
    return {
      id: sticker.id, pageId: id, label: sticker.label, emoji: sticker.emoji,
      series: series, discovery: discovery, fact: fact, next: next, accent: accent
    };
  }

  function playfulCardIds() {
    var pages = global.PLAYFUL && global.PLAYFUL.pages;
    if (!pages || typeof pages !== "object" || Array.isArray(pages)) return [];
    var ordered = [];
    if (Array.isArray(global.EXPLORATIONS)) {
      global.EXPLORATIONS.forEach(function (item) {
        var id = item && cleanId(item.id);
        if (id && pages[id] && ordered.indexOf(id) === -1) ordered.push(id);
      });
    }
    Object.keys(pages).forEach(function (rawId) {
      var id = cleanId(rawId);
      if (id && ordered.indexOf(id) === -1) ordered.push(id);
    });
    return ordered;
  }

  function playfulMilestone(item, unlockedCount) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return null;
    var count = Number(item.count);
    var title = cleanText(item.title, 50);
    var message = cleanText(item.message, 180);
    var companionId = cleanText(item.companion, 32).toLowerCase();
    if (!isFinite(count) || count < 1 || Math.floor(count) !== count || !title || !message || !/^[a-z][a-z0-9_-]{0,31}$/.test(companionId)) return null;
    var characters = global.PLAYFUL && Array.isArray(global.PLAYFUL.characters) ? global.PLAYFUL.characters : [];
    var character = null;
    characters.some(function (candidate) {
      if (candidate && candidate.id === companionId) { character = candidate; return true; }
      return false;
    });
    if (!character) return null;
    return {
      count: count, title: title, message: message, unlocked: unlockedCount >= count,
      companion: {
        id: companionId,
        name: cleanText(character.name, 30),
        emoji: cleanText(character.emoji, 8)
      }
    };
  }

  function workCheck(rawId, input) {
    var payload = input;
    var pageId = cleanId(rawId);
    if (arguments.length === 1 && rawId && typeof rawId === "object" && !Array.isArray(rawId)) {
      payload = rawId;
      pageId = cleanId(payload.pageId);
    }
    var result = {
      ok: false, code: "invalid", bytes: 0, maxBytes: MAX_WORK_BYTES,
      totalBytes: 0, maxTotalBytes: MAX_WORKS_BYTES, count: 0, maxCount: MAX_WORKS
    };
    if (!pageId) { result.code = "page"; return result; }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) { result.code = "payload"; return result; }
    var type = cleanWorkType(payload.type);
    var title = cleanText(payload.title, MAX_WORK_TITLE);
    var content = cleanText(payload.content, MAX_WORK_CONTENT);
    if (!type) { result.code = "type"; return result; }
    if (!title && !content) { result.code = "empty"; return result; }

    var data = load();
    var requestedText = cleanText(payload.id, 64);
    var requestedId = cleanWorkId(payload.id);
    if (requestedText && !requestedId) { result.code = "id"; return result; }
    var existing = requestedId ? data.works[requestedId] : null;
    if (requestedId && !existing) { result.code = "missing"; return result; }
    if (existing && existing.pageId !== pageId) { result.code = "page"; return result; }
    result.count = Object.keys(data.works).length;
    if (!existing && result.count >= MAX_WORKS) { result.code = "count"; return result; }

    var timestamp = nowISO();
    var id = existing ? existing.id : generatedWorkId(data);
    var work = {
      id: id, pageId: pageId, type: type, title: title, content: content,
      createdAt: existing ? existing.createdAt : timestamp, updatedAt: timestamp
    };
    result.bytes = jsonSize(work);
    result.totalBytes = worksSize(data.works, id) + result.bytes;
    if (result.bytes > MAX_WORK_BYTES) { result.code = "item-bytes"; return result; }
    if (result.totalBytes > MAX_WORKS_BYTES) { result.code = "total-bytes"; return result; }
    result.ok = true;
    result.code = "ok";
    result.work = work;
    result.data = data;
    return result;
  }

  function publicWorkCheck(result) {
    return {
      ok: result.ok, code: result.code, bytes: result.bytes, maxBytes: result.maxBytes,
      totalBytes: result.totalBytes, maxTotalBytes: result.maxTotalBytes,
      count: result.count, maxCount: result.maxCount
    };
  }

  var Progress = {
    visit: function (rawId, title) {
      var id = cleanId(rawId);
      if (!id) return null;
      var data = load();
      if (!data.pages[id] && Object.keys(data.pages).length >= MAX_PAGES) return null;
      var timestamp = nowISO();
      var page = data.pages[id] || { n: 0, first: timestamp, last: timestamp, title: "" };
      page.n = Math.min((Number(page.n) || 0) + 1, MAX_VISITS);
      page.first = cleanISO(page.first) || timestamp;
      page.last = timestamp;
      var nextTitle = cleanText(title, MAX_TITLE);
      if (nextTitle) page.title = nextTitle;
      data.pages[id] = page;
      data.recent = [id].concat(data.recent.filter(function (item) { return item !== id; })).slice(0, MAX_RECENT);
      if (!commit(data, "visit")) return null;
      return copyRecord(page);
    },

    get: function (rawId) {
      var id = cleanId(rawId);
      return id ? copyRecord(load().pages[id]) : null;
    },

    all: function () { return detached(load()); },
    count: function () { return Object.keys(load().pages).length; },

    note: function (rawId, value) {
      var id = cleanId(rawId);
      if (!id) return false;
      var data = load();
      if (!data.pages[id]) return false;
      var text = cleanText(value, MAX_NOTE);
      if (text) {
        if (!data.notes[id] && Object.keys(data.notes).length >= MAX_NOTES) return false;
        data.notes[id] = { t: text, on: nowISO() };
      } else delete data.notes[id];
      return commit(data, "note");
    },

    getNote: function (rawId) {
      var id = cleanId(rawId);
      return id ? copyRecord(load().notes[id]) : null;
    },

    complete: function (rawId, evidence) {
      var id = cleanId(rawId);
      if (!id) return null;
      var data = load();
      if (!data.completions[id] && Object.keys(data.completions).length >= MAX_COMPLETIONS) return null;
      var completion = { at: nowISO(), evidence: cleanText(evidence, MAX_EVIDENCE) };
      data.completions[id] = completion;
      if (!commit(data, "complete")) return null;
      return copyRecord(completion);
    },

    getCompletion: function (rawId) {
      var id = cleanId(rawId);
      return id ? copyRecord(load().completions[id]) : null;
    },

    getStickers: function (rawId) {
      var only = rawId === undefined || rawId === null ? "" : cleanId(rawId);
      if (rawId !== undefined && rawId !== null && !only) return [];
      var data = load();
      var seen = dict();
      return Object.keys(data.completions).sort(function (a, b) {
        return String(data.completions[b].at).localeCompare(String(data.completions[a].at));
      }).reduce(function (list, id) {
        if (only && id !== only) return list;
        var sticker = playfulSticker(id);
        if (!sticker || seen[sticker.id]) return list;
        seen[sticker.id] = true;
        sticker.unlockedAt = data.completions[id].at;
        list.push(sticker);
        return list;
      }, []);
    },

    getCards: function (rawId) {
      var hasFilter = rawId !== undefined && rawId !== null;
      var only = hasFilter ? cleanId(rawId) : "";
      if (hasFilter && !only) return [];
      var data = load();
      return playfulCardIds().reduce(function (list, id) {
        if (only && id !== only) return list;
        var card = playfulCard(id);
        if (!card) return list;
        var completion = data.completions[id];
        card.unlocked = Boolean(completion);
        card.unlockedAt = completion ? completion.at : null;
        list.push(card);
        return list;
      }, []);
    },

    getMilestones: function () {
      var cards = Progress.getCards();
      var unlockedCount = cards.filter(function (card) { return card.unlocked; }).length;
      var source = global.PLAYFUL && Array.isArray(global.PLAYFUL.milestones) ? global.PLAYFUL.milestones : [];
      return source.map(function (item) { return playfulMilestone(item, unlockedCount); }).filter(Boolean);
    },

    validateWork: function (rawId, input) {
      return publicWorkCheck(arguments.length === 1 ? workCheck(rawId) : workCheck(rawId, input));
    },

    saveWork: function (rawId, input) {
      var checked = arguments.length === 1 ? workCheck(rawId) : workCheck(rawId, input);
      if (!checked.ok) return null;
      checked.data.works[checked.work.id] = checked.work;
      if (!commit(checked.data, "saveWork")) return null;
      return copyRecord(checked.work);
    },

    getWorks: function (rawId) {
      var pageId = rawId === undefined || rawId === null ? "" : cleanId(rawId);
      if (rawId !== undefined && rawId !== null && !pageId) return [];
      var works = load().works;
      return Object.keys(works).map(function (id) { return copyRecord(works[id]); })
        .filter(function (work) { return !pageId || work.pageId === pageId; })
        .sort(function (a, b) { return String(b.updatedAt).localeCompare(String(a.updatedAt)); });
    },

    deleteWork: function (rawWorkId) {
      var id = cleanWorkId(rawWorkId);
      if (!id) return false;
      var data = load();
      if (!data.works[id]) return false;
      delete data.works[id];
      return commit(data, "deleteWork");
    },

    getPreference: function (name) {
      if (!Object.prototype.hasOwnProperty.call(PREFERENCE_DEFAULTS, name)) return null;
      return load().preferences[name];
    },

    setPreference: function (name, value) {
      if (!Object.prototype.hasOwnProperty.call(PREFERENCE_DEFAULTS, name)) return false;
      var cleaned = preferenceValue(name, value);
      if (cleaned === null || (name === "soundEnabled" && typeof value !== "boolean") ||
          (name !== "soundEnabled" && cleaned !== value)) return false;
      var data = load();
      data.preferences[name] = cleaned;
      return commit(data, "preference");
    },

    exportText: function () {
      var data = load();
      var lines = ["我的探索足迹", ""];
      var ids = Object.keys(data.pages).sort(function (a, b) {
        var byDate = String(data.pages[b].last).localeCompare(String(data.pages[a].last));
        return byDate || (data.pages[b].n - data.pages[a].n);
      });
      ids.forEach(function (id) {
        var page = data.pages[id];
        lines.push("· " + (page.title || id) + "　去过 " + page.n + " 次　最近 " + page.last);
        if (data.completions[id]) lines.push("    ✓ 已完成任务（" + data.completions[id].at + "）" + (data.completions[id].evidence ? "：" + data.completions[id].evidence : ""));
        if (data.notes[id]) lines.push("    我的发现：" + data.notes[id].t);
      });
      Object.keys(data.completions).forEach(function (id) {
        if (!data.pages[id]) lines.push("· " + id + "　✓ 已完成任务（" + data.completions[id].at + "）" + (data.completions[id].evidence ? "：" + data.completions[id].evidence : ""));
      });
      var works = Progress.getWorks();
      if (works.length) {
        lines.push("", "我的作品");
        works.forEach(function (work) { lines.push("· " + (work.title || work.type) + "　[" + work.pageId + "]　" + work.updatedAt); });
      }
      if (!ids.length && !Object.keys(data.completions).length && !works.length) lines.push("（还没有记录，去逛逛吧）");
      return lines.join("\n");
    },

    exportJSON: function () { return JSON.stringify(load(), null, 2); },

    importJSON: function (input) {
      try {
        var parsed;
        if (typeof input === "string") {
          if (!input || input.length > MAX_JSON) return false;
          parsed = JSON.parse(input);
        } else {
          var serialized = JSON.stringify(input);
          if (!serialized || serialized.length > MAX_JSON) return false;
          parsed = JSON.parse(serialized);
        }
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed) || parsed.schemaVersion !== 3) return false;
        var cleaned = sanitize(parsed, 3);
        cleaned.revision = load().revision;
        return commit(cleaned, "import");
      } catch (e) {
        return false;
      }
    },

    reset: function () {
      try {
        global.localStorage.removeItem(KEY);
        global.localStorage.removeItem(V2_KEY);
        global.localStorage.removeItem(V1_KEY);
        emit("reset", blank());
        return true;
      } catch (e) {
        return false;
      }
    },

    available: function () {
      try {
        var testKey = KEY + ":test";
        global.localStorage.setItem(testKey, "1");
        global.localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  if (typeof global.addEventListener === "function") {
    global.addEventListener("storage", function (event) {
      if (!event || event.key === KEY || event.key === V2_KEY || event.key === V1_KEY || event.key === null) emit("storage", load());
    });
  }

  global.Progress = Progress;
})(window);
