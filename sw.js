/* =========================================================
   오프라인 도우미 (서비스 워커)
   - 홈 화면 앱(PWA)으로 쓸 때, 인터넷이 끊겨도 대시보드가 열리도록
     화면 파일과 Firebase 도구를 기기에 보관해 둡니다.
   - 화면 파일(index.html)은 "인터넷 먼저, 안 되면 보관본" 방식이라
     새 버전을 올리면 다음에 열 때 바로 반영돼요.
   - 데이터는 여기서 다루지 않아요. (데이터는 브라우저 저장소와 Firestore가 담당)
   - 보관 내용을 바꿨다면 아래 CACHE 이름의 숫자를 올려 주세요.
   ========================================================= */
const CACHE = "command-center-v2";
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./fonts/pretendard/pretendardvariable-dynamic-subset.css",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-180.png"
];
// 버전이 고정된 Firebase 도구 파일 (내용이 바뀌지 않으므로 보관본을 먼저 사용)
const FIREBASE_SDK = "https://www.gstatic.com/firebasejs/12.19.0/";

// 설치: 화면 파일 미리 보관
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

// 새 버전이 켜지면 예전 보관본 지우기
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Firebase 도구: 보관본 먼저, 없으면 받아서 보관
  if (request.url.startsWith(FIREBASE_SDK)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 이 사이트의 파일만 다룸 (구글 로그인, Firestore, 구글 캘린더 요청은 건드리지 않음)
  if (url.origin !== self.location.origin) return;

  // 화면(페이지): 인터넷 먼저 → 실패하면 보관본
  if (request.mode === "navigate" || url.pathname.endsWith(".html")) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // 그 밖의 파일(아이콘 등): 보관본 먼저
  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE);
    cache.put(request, response.clone());
  }
  return response;
}
