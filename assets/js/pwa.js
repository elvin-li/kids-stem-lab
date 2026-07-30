/* HTTP(S) 下启用离线应用；file:// 便携模式不注册 Service Worker。 */
(function (global) {
  "use strict";
  if (!(global.location.protocol === "https:" || global.location.hostname === "localhost" || global.location.hostname === "127.0.0.1")) return;
  if (!("serviceWorker" in global.navigator)) return;

  var script = global.document.currentScript;
  if (!script || !script.src) return;
  var worker = new URL("../../sw.js", script.src);
  var scope = new URL("../../", script.src);

  global.addEventListener("load", function () {
    global.navigator.serviceWorker.register(worker.href, { scope: scope.pathname }).catch(function () {
      /* PWA 是增强能力，注册失败不能影响核心页面。 */
    });
  });
})(window);
