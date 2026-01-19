const CACHE_NAME = 'ninky-v2.2.1';
const STATIC_CACHE_URLS = [
  './index.html',
  './ninky-manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

// Service Worker のインストール
self.addEventListener('install', event => {
  console.log('[Ninky Service Worker] インストール中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Ninky Service Worker] ファイルをキャッシュ中...');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[Ninky Service Worker] インストール完了');
        return self.skipWaiting();
      })
  );
});

// Service Worker のアクティベート
self.addEventListener('activate', event => {
  console.log('[Ninky Service Worker] アクティベート中...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[Ninky Service Worker] 古いキャッシュを削除:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Ninky Service Worker] アクティベート完了');
        return self.clients.claim();
      })
  );
});

// リクエストのインターセプト（オフライン対応）
self.addEventListener('fetch', event => {
  // ネットワーク優先戦略（常に最新データを取得）
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // レスポンスが正常な場合、キャッシュに保存
        if (response.ok && event.request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // ネットワークエラー時はキャッシュから返す
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              console.log('[Ninky Service Worker] キャッシュから返却:', event.request.url);
              return cachedResponse;
            }
            // キャッシュもない場合はオフラインページまたはエラー
            return new Response('オフラインです。ネットワーク接続を確認してください。', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
              })
            });
          });
      })
  );
});

// メッセージリスナー（PWA更新通知用）
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Ninky Service Worker] 即座にアクティベート');
    self.skipWaiting();
  }
});
