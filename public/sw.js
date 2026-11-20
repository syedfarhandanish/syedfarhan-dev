/* SFD portfolio service worker — offline support without extra dependencies.
 * Pages: network first, cached copy when offline, /offline as last resort.
 * Build assets (/_next/static, fonts, icons): cache first (they are content-hashed).
 * Images: stale-while-revalidate. API and RSC requests always go to the network.
 * Bump VERSION to drop old caches on the next visit.
 */
const VERSION = 'v1';
const PAGES = `sfd-pages-${VERSION}`;
const ASSETS = `sfd-assets-${VERSION}`;
const IMAGES = `sfd-images-${VERSION}`;
const PRECACHE = ['/', '/offline', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('sfd-') && !k.endsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_vercel/')) return;
  if (req.headers.get('RSC') || url.searchParams.has('_rsc')) return;

  // Page navigations
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          if (res.ok) {
            const copy = res.clone();
            caches.open(PAGES).then((c) => c.put(req, copy).then(() => trim(PAGES, 30)));
          }
          return res;
        } catch {
          const cached = (await caches.match(req, { ignoreSearch: true })) || (await caches.match('/offline'));
          return cached || Response.error();
        }
      })(),
    );
    return;
  }

  // Immutable build assets, fonts and icons
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/') || /\.(woff2?|ttf)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(ASSETS).then((c) => c.put(req, copy));
            }
            return res;
          }),
      ),
    );
    return;
  }

  // Images (optimised or static)
  if (url.pathname.startsWith('/_next/image') || /\.(png|jpe?g|webp|avif|svg|gif)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGES).then(async (cache) => {
        const hit = await cache.match(req);
        const network = fetch(req)
          .then((res) => {
            if (res.ok) cache.put(req, res.clone()).then(() => trim(IMAGES, 80));
            return res;
          })
          .catch(() => hit || Response.error());
        return hit || network;
      }),
    );
  }
});
