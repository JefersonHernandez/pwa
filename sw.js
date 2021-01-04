const staticCache = "static-cache";
const dynmicCache = "dinamic-cache";
const assets = [
    "/",
    "/index.html",
    "/pages/acerca.html",
    "/pages/sitios.html",
    "/js/app.js",
    "/js/ui.js",
    "/css/bulma.min.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/manifest.json",
    "/pages/fallback.html",
    "https://bulma.io/images/bulma-logo.png",
    "/img/icons/icon_48.png",
    "/img/icons/icon_72.png",
    "/img/icons/icon_96.png",
    "/img/icons/icon_144.png",
    "/img/icons/icon_192.png",
    "/img/icons/icon_512.png",
    "/js/db.js"
]
//install proccess
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(staticCache)
            .then(cache => {
                cache.addAll(assets);
            })
    );

});

//activate proccess
self.addEventListener("activate", e => {
    console.log("sw activated");
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches
        .match(e.request)
        .then(staticRes => {
            return staticRes || fetch(e.request)
            .then(dynamicRes => {
                return caches.open(dynmicCache)
                .then(cache => {
                    cache.put(e.request.url, dynamicRes.clone());
                    return dynamicRes;
                })
            })
        })
        .catch(err => {
            caches.match("/pages/fallback.html");
        })
    )
})
