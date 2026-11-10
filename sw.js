// Network-first: always pick up the newest index.html when online, fall back to cache offline.
// Core files are pre-cached at install so the app opens offline after the first visit.
var C = 'fppc-v5';
var CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(C).then(function(c){ return c.addAll(CORE); }).catch(function(){}).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k !== C; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var r = e.request;
  if(r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;   // never touch Apps Script calls
  e.respondWith(fetch(r).then(function(res){
    var copy = res.clone(); caches.open(C).then(function(c){ c.put(r, copy); }); return res;
  }).catch(function(){ return caches.match(r).then(function(m){ return m || caches.match('index.html'); }); }));
});
