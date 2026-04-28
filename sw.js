const CACHE = 'guia-ev-hcfb-v6-concentracion-max-20260428';
const ASSETS = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  './assets/logo.png',
  './pdfs/antimicrobianos.pdf',
  './pdfs/medicamentos sedoanalgesia FINAL.pdf',
  './pdfs/TABLA DROGAS VASOACTIVAS nueva version.pdf'
];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('message', event => { if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.mode === 'navigate' || req.url.endsWith('/index.html') || req.url.endsWith('/data.js')) {
    event.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(cache => cache.put(req, copy)); return res; }).catch(() => caches.match(req).then(cached => cached || caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
