const CACHE_NAME = 'sw-cache-v2'; // Update the cache name for versioning
const urlsToCache = [
    '/index.html',
    '/css/styling.css',
    '/main.js',
    '/image/newPwaFirst.png',
    '/image/newPWALogo.png',
];

// Install event: Cache the files
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate event: Clear old caches if there's a version change
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME]; // Add the current cache to the whitelist
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Delete old caches that are not in the whitelist
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event: Cache-first, with a network fallback and cache update
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Return the cached response if found, else fetch from the network
            return response || fetch(event.request).then(function(fetchResponse) {
                return caches.open(CACHE_NAME).then(function(cache) {
                    // Update the cache with the network response
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(function() {
            // Handle errors, possibly return a fallback resource like an offline page
            return caches.match('/index.html');
        })
    );
});
