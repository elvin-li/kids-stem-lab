/* 少儿数理启蒙离线缓存。外部科学 API 不在此缓存，页面自行超时并降级。 */
const CACHE = "kids-stem-shell-v6";
const CORE = [
  "./", "./index.html", "./manifest.webmanifest",
  "./assets/css/base.css", "./assets/css/kid.css", "./assets/css/print.css",
  "./assets/js/progress.js", "./assets/js/playful.js", "./assets/js/pwa.js", "./assets/icons/app-icon.svg",
  "./data/explorations.js", "./data/playful.js", "./data/resources.js",
  "./games/index.html", "./games/number-blocks.html", "./games/fraction-lab.html",
  "./games/pattern-machine.html", "./games/symmetry-studio.html", "./games/estimation-station.html",
  "./games/turtle-geometry.html", "./games/gravity-drop.html", "./games/ramp-and-roll.html",
  "./games/light-and-shadow.html", "./games/wave-maker.html",
  "./nature/index.html", "./nature/dinosaurs.html", "./nature/space.html",
  "./nature/ocean.html", "./nature/insects.html", "./nature/earth.html",
  "./nature/weather.html", "./nature/human-body.html",
  "./pages/paths.html", "./pages/parents.html", "./pages/why.html",
  "./pages/kitchen-science.html", "./pages/progress.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
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

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      });
      if (request.mode === "navigate") return network.catch(() => cached || caches.match("./index.html"));
      return cached || network;
    })
  );
});
