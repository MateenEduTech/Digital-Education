/**
 * IdeaSpark – Service Worker
 * Offline caching for full PWA functionality
 * Author: Mateen Yousuf, Teacher – School Education Department, J&K
 * Aligned with NEP 2020 & NCF 2023
 */

const CACHE_NAME = 'ideaspark-v1.0.0';

const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './author.jpg',
  './conceptual-background.html',
  './user-manual.html',
];

// ── INSTALL: cache all essential files ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
      .catch(err => console.log('[SW] Cache error:', err))
  );
});

// ── ACTIVATE: remove old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── FETCH: cache-first, then network ──
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') return response;
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            return response;
          })
          .catch(() => caches.match('./index.html'));
      })
  );
});
