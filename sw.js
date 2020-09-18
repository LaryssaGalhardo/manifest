//Declarar as variaveis / constantes necesarias para atuacao do nosso service worker
var CACHE_NAME = 'fofo-cache-v1';
var urlsToCache = [
    'css/fofo.css',
    'css/bootstrap.css',
    'js/bootstrap.js',
    'js/jquery-3.4.1.js',

];
self.addEventListener('install', function(event) {
        //parametrizar as etapas da instalação do nosso cache no dispositivo
        event.waitUntil(
            caches.open(CACHE_NAME).then(function(cache) {
                console.log('cache aberto')
                return cache.addAll(urlsToCache)
            })
        )
    })
    // Aqui definimios nosso evento fetch e, em event.respondWith(), passamos uma promessa de caches.match(). 
    // Esse método examina a solicitação e encontra todos os resultados armazenados em qualquer um dos caches criados pelo service worker.
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request)
        })
    )
})