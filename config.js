/* =========================================================
   대시보드 설정 파일 (사람마다 다른 값만 모아 둔 곳)
   - 내 대시보드를 따로 만들 때는 이 파일만 내 값으로 바꾸면 돼요.
     index.html 은 고치지 않아도 됩니다. (방법: MY_DASHBOARD_GUIDE.md)
   - 원본 저장소에서 새 기능을 받아 와도(Sync fork) 이 파일은 내 값 그대로 남아요.
   - 여기 값은 비밀번호가 아니라 "어느 Firebase 프로젝트인지" 알려주는 주소 같은 값이라
     공개돼도 괜찮아요. 데이터는 Firebase 보안 규칙(firestore.rules)이 지켜요.
   ========================================================= */
window.DASHBOARD_CONFIG = {
  // Firebase 웹 앱 설정값 (Firebase 콘솔 → 프로젝트 설정 → 내 앱 → firebaseConfig)
  // 클라우드 동기화를 쓰지 않으려면 firebase: null 로 두세요. (이 브라우저에만 저장)
  firebase: {
    apiKey: "AIzaSyBMIvYxEAjXpMv7zMsHdzYj_aE3_SNCQbI",
    authDomain: "mydashboard-8ae08.firebaseapp.com",
    projectId: "mydashboard-8ae08",
    storageBucket: "mydashboard-8ae08.firebasestorage.app",
    messagingSenderId: "896073492796",
    appId: "1:896073492796:web:97aa6fcf11cfed1cb09639"
  }
};
