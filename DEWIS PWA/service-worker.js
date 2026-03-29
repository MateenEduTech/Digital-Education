// DEWIS – Dropout Early Warning Intelligence System
// Offline-First Service Worker
// Author: Mateen Yousuf – School Education Department, J&K
// Aligned: NEP 2020 | NCF 2023 | PARAKH | Samagra Shiksha | FLN Mission

const CACHE = 'dewis-v1.0';
const OFFLINE = './index.html';

const PRECACHE = [
  './', './index.html', './manifest.json', './author.jpg',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap',
];

self.addEventListener('install', e => {
  console.log('[DEWIS SW] Installing Early Warning System...');
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Offline-first fetch
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200) return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => e.request.mode === 'navigate' ? caches.match(OFFLINE) : undefined);
    })
  );
});

// Background sync for risk data and case logs
self.addEventListener('sync', e => {
  if (e.tag === 'sync-risk-data')  e.waitUntil(syncRiskData());
  if (e.tag === 'sync-case-logs')  e.waitUntil(syncCaseLogs());
  if (e.tag === 'sync-interventions') e.waitUntil(syncInterventions());
});

async function syncRiskData() {
  // Production: POST /risk-evaluate with local student data
  console.log('[DEWIS SW] Syncing risk profile data to backend...');
}
async function syncCaseLogs() {
  // Production: POST /student-case with intervention logs
  console.log('[DEWIS SW] Syncing case management logs...');
}
async function syncInterventions() {
  // Production: POST /intervention completion status
  console.log('[DEWIS SW] Syncing intervention completion records...');
}

// Critical alert push notifications
self.addEventListener('push', e => {
  const d = e.data?.json() || {};
  const urgency = d.level === 'crit' ? '🚨 CRITICAL ALERT' : '⚠️ RISK ALERT';
  e.waitUntil(
    self.registration.showNotification(d.title || urgency, {
      body: d.body || 'A student has crossed the critical risk threshold. Immediate intervention required.',
      icon: './manifest.json',
      tag: 'dewis-alert-' + (d.studentId || 'general'),
      renotify: true,
      vibrate: [300, 100, 300, 100, 300],
      data: { url: './' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || './'));
});

console.log('[DEWIS SW] Early Warning Intelligence System ONLINE ✅ — No student left behind.');
