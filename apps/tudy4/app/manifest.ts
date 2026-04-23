import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "tudy4", // 1. 앱 전체 이름 (설치 팝업 등에 표시)
    short_name: "tudy4", // 2. 홈 화면 아이콘 아래에 들어갈 짧은 이름
    description: "tudy4",
    start_url: "/", // 3. 아이콘을 눌렀을 때 처음 열릴 페이지
    display: "standalone", // 4. ⭐ 가장 중요! 브라우저 주소창/뒤로가기 버튼을 없애고 앱처럼 전체 화면으로 실행
    background_color: "#ffffff", // 5. 앱이 켜지는 동안(스플래시 스크린) 배경색
    theme_color: "#000000", // 6. 모바일 상단 상태바 색상 (여기선 검정)
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
