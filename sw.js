//Declarar as variaveis / constantes necesarias para atuacao do nosso service worker
var CACHE_NAME = 'fofo-cache-v1'
var urlsToCache = [
    'css/fofo.css',
    'css/bootstrap.css',
    'js/bootstrap.js',
    'js/jquery-3.4.1.js',
]

self.addEventListener('fetch', function(event){
    //Paremetrizar as etapas de instalacao do nosso cache no dispositivo
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('Cache aberto...')
            return cache.addAll(urlsToCache)
        })
    )

})

self.addEventListener('fetch', function(event){
     event.respondWitch(
         caches.match(event.request)
         .then(function(response){
             if(response) {
                 return response
             }
             return fatch(event.request)
         })
     )
})