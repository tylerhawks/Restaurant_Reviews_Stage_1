// Adds eventlisterner to serviceWorker to install the cache
  self.addEventListener('install', function(e) {

      e.waitUntil(
          caches.open('v1').then(function(cache) {
          //creating cache
              return cache.addAll([
                './',
                './index.html',
                './css/styles.css',
                './js/dbhelper.js',
                './js/main.js',
                './js/restaurant_info.js',
                './data/restaurants.json',
                './img/1.jpg',
                './img/2.jpg',
                './img/3.jpg',
                './img/4.jpg',
                './img/5.jpg',
                './img/6.jpg',
                './img/7.jpg',
                './img/8.jpg',
                './img/9.jpg',
                './img/10.jpg',
              ]);
          })
      );
  });
// Fetches cache data when network is unavailable
  self.addEventListener('fetch', function(e) {
      e.respondWith(
          caches.match(e.request).then(function(response) {
            if (response) {

              return response;
            }
            else {

              return fetch(e.request)
              .then(function(response) {
                  const clonedResponse = response.clone();
                  caches.open('v1').then(function(cache) {
                      cache.put(e.request, clonedResponse);
                  })
                  return response;
              })
              .catch(function(err) {
                  console.error(err);
              });
            }
        })
      );
  });
