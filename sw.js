/* 少儿数理启蒙离线缓存。外部科学 API 不在此缓存，页面自行超时并降级。 */
const CACHE = "kids-stem-shell-v74";
const SHELL_VERSION = Number(CACHE.slice(CACHE.lastIndexOf("-v") + 2));
const CORE = [
  "./", "./index.html", "./manifest.webmanifest",
  "./assets/css/base.css", "./assets/css/kid.css", "./assets/css/print.css",
  "./assets/js/progress.js", "./assets/js/playful.js", "./assets/js/pwa.js",
  "./assets/js/illustrations.js", "./assets/icons/app-icon.svg",
  "./data/explorations.js", "./data/playful.js", "./data/resources.js",
  "./games/index.html", "./games/number-blocks.html", "./games/fraction-lab.html",
  "./games/pattern-machine.html", "./games/symmetry-studio.html", "./games/estimation-station.html",
  "./games/turtle-geometry.html", "./games/gravity-drop.html", "./games/ramp-and-roll.html",
  "./games/light-and-shadow.html", "./games/wave-maker.html", "./games/doodle-pad.html",
  "./nature/index.html", "./nature/dinosaurs.html", "./nature/space.html",
  "./nature/ocean.html", "./nature/insects.html", "./nature/earth.html",
  "./nature/weather.html", "./nature/human-body.html",
  "./pages/paths.html", "./pages/parents.html", "./pages/why.html",
  "./pages/kitchen-science.html", "./pages/progress.html", "./pages/design-system.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => Promise.all(CORE.map((url) => cache.add(new Request(url, { cache: "reload" })))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(new Request(request, { cache: "reload" }))
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            const canonical = new Request(url.origin + url.pathname);
            event.waitUntil(caches.open(CACHE).then((cache) => cache.put(canonical, copy)));
          }
          return response;
        })
        .catch(() => caches.match(url.origin + url.pathname, { ignoreSearch: true })
          .then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          const canonical = new Request(url.origin + url.pathname);
          event.waitUntil(caches.open(CACHE).then((cache) => cache.put(canonical, copy)));
        }
        return response;
      });
      /* 请求的 ?v= 比本壳还新，只发生在一个窗口里：升级刚部署、导航（网络优先）
         已经拿到了新 HTML，可旧 SW 还在掌管子资源——新 SW 要等 load 后的注册检查
         才安装，skipWaiting/clients.claim 也救不回这个已经开始渲染的页面。此时照旧
         cached||network 会把上一版的 CSS/JS 配给新 HTML 用满整个页面周期（共享的
         kid.css、playful.js 与页面结构是成对改的）。这一刻网络必然通着——新 HTML
         本身刚从网络来——所以改走网络优先；真断网（比如上次部署后新 HTML 被运行时
         缓存收进了旧壳、SW 升级却没装完）再退回旧缓存，不比原来差。 */
      const assetVersion = Number(url.searchParams.get("v")) || 0;
      if (assetVersion > SHELL_VERSION) {
        return network.catch(() => cached);
      }
      return cached || network;
    })
  );
});
