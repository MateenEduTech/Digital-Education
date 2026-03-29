// =====================================================
// SERVICE WORKER - Coding Fundamentals Trainer PWA
// Handles offline caching for full offline support
// =====================================================

const CACHE_NAME = 'coding-trainer-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './author.jpg',
  './conceptual-background.html',
  './user-manual.html'
];

// Install event - cache all essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Caching files...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(err => {
      console.log('Cache failed for some files, continuing...', err);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise fetch from network
      return fetch(event.request).then(networkResponse => {
        // Cache the new response for future offline use
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed and not in cache - show offline page
        return new Response('<h1>Offline</h1><p>This content is not available offline yet.</p>', {
          headers: { 'Content-Type': 'text/html' }
        });
      });
    })
  );
});
