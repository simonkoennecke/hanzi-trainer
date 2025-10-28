self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('hanzi-cache-v1').then(cache => {
      return cache.addAll([
        '/hanzi-trainer/',
        '/hanzi-trainer/index.html',
        '/hanzi-trainer/manifest.json',
        '/hanzi-trainer/characters.json',
        '/hanzi-trainer/default-training-sets.json',
        '/hanzi-trainer/fuse-index.json',
        // Do not hardcode asset filenames; cache them on fetch
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== 'hanzi-cache-v1').map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Adjust for base path
  const basePath = '/hanzi-trainer';
  // Check for assets folder and .js/.css files under base path
  if (url.pathname.startsWith(basePath + '/assets/') && (url.pathname.endsWith('.js') || url.pathname.endsWith('.css'))) {
    event.respondWith(
      caches.open('hanzi-cache-v1').then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    // Try to match with and without basePath for navigation requests
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response;
        // Try matching with basePath if not found
        const baseRequest = new Request(basePath + url.pathname, event.request);
        return caches.match(baseRequest).then(baseResponse => {
          return baseResponse || fetch(event.request);
        });
      })
    );
  }
});
