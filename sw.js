const CACHE_NAME = 'logbuch-v2.1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './config.js',
  './date-logic.js',
  './signature-pad.js',
  './signature-modal.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
