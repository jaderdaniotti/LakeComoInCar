// Service Worker vuoto
// Questo file esiste solo per evitare errori 404 nella console
// Al momento non implementa funzionalità PWA

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
});
