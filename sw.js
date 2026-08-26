/* Four Strands service worker — cache-first so the app opens offline */
const CACHE = 'four-strands-v2';
const ASSETS = [
  './',
  './index.html',
  './faq.html',
  './privacy.html',
  './thanks.html',
  './404.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(hit =>
      hit || fetch(e.request).then(res => {
        // cache fonts and any same-origin files as they arrive
        if (res.ok && (e.request.url.startsWith(self.location.origin) ||
                       e.request.url.includes('fonts.g'))) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
