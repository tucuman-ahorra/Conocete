/* Service worker: deja la app disponible sin conexión una vez cargada. */
var VERSION = "conocete-v1";
var ARCHIVOS = ["./", "index.html", "estilos.css", "config.js", "motor.js", "graficos.js", "ui-base.js", "ui-preguntas.js",
  "ui-resultados.js", "compartir.js", "ui.js", "icono.svg", "manifest.webmanifest",
  "datos-bigfive.js", "textos-bigfive.js", "datos-intereses.js", "textos-intereses.js", "datos-estilo.js", "textos-estilo.js",
  "datos-valores.js", "textos-valores.js", "datos-ie.js", "textos-ie.js"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ARCHIVOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(function (r) {
    var copia = r.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copia); }); return r;
  }).catch(function () { return caches.match(e.request); }));
});
