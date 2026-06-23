self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('mit-v1').then(function(cache) {
                                return cache.addAll(["./index.html", "./manifest.json", "./assets/icon-192.png", "./assets/icon-512.png"])
        })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
  caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
  })
);

});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.filter(function(n) { return n !== 'mit-v1'; }).map(function(n) { return caches.delete(n); }))
    })
  );
});

