const CACHE_NAME = "app-shell-v1";
const RUNTIME_CACHE = "runtime-cache";

const APP_SHELL = [
  "/",
  "/index.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activated");
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((res) => res || fetch(req))
    );
    return;
  }

  const url = req.url;

  if (url.includes("rickandmortyapi.com/api")) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(async (cache) => {
        try {
          const response = await fetch(req);
          cache.put(req, response.clone());
          return response;
        } catch {
          return cache.match(req);
        }
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
