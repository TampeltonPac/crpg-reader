const C='crpg-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k))}
    return r;
  }).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));
});
