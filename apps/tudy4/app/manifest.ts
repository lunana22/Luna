import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vocabulary Book", // 1. 앱 전체 이름 (설치 팝업 등에 표시)
    short_name: "VocabBook", // 2. 홈 화면 아이콘 아래에 들어갈 짧은 이름
    description: "Managed vocabulary learning application",
    start_url: "/", // 3. 아이콘을 눌렀을 때 처음 열릴 페이지
    display: "standalone", // 4. ⭐ 가장 중요! 브라우저 주소창/뒤로가기 버튼을 없애고 앱처럼 전체 화면으로 실행
    background_color: "#ffffff", // 5. 앱이 켜지는 동안(스플래시 스크린) 배경색
    theme_color: "#000000", // 6. 모바일 상단 상태바 색상 (여기선 검정)
    icons: [
      // 7. 홈 화면에 추가될 때 사용할 아이콘들
      {
        src: "/icons/icon-192x192.png", // (안드로이드/iOS가 상황에 맞춰 골라 씀)
        sizes: "192x192",
        type: "image/png",
      },
      // ... 512x512 등 큰 사이즈도 필요
    ],
  };
}
