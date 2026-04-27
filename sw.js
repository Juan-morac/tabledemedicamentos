const CACHE='guia-ev-hcfb-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./assets/logo.png','./tablas-medicamentos-hcfb.pdf','./medicamentos-data.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
