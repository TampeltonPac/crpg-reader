const C='crpg-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const q=e.request;
  // Nur eigene Dateien behandeln; Blogger-Feeds, Bilder und Videos gehen direkt ans Netz.
  if(q.method!=='GET'||new URL(q.url).origin!==location.origin)return;
  e.respondWith(fetch(q).then(r=>{
    if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(q,k))}
    return r;
  }).catch(()=>caches.match(q).then(m=>m||(q.mode==='navigate'?caches.match('index.html'):Response.error()))));
});
