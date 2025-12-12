# PWA 설정 가이드 (PWA Setup Walkthrough)

`apps/vocabulary_book` 애플리케이션에 `@ducanh2912/next-pwa` 라이브러리를 사용하여 PWA(Progressive Web App) 기능을 성공적으로 추가했습니다.

## 변경 사항 (Changes Implemented)

### 1. 설정 (Configuration)

- **`package.json`**: `@ducanh2912/next-pwa` 의존성을 추가하고, `build` 스크립트를 `--webpack` 옵션을 사용하도록 수정했습니다 (이 PWA 플러그인은 현재 Webpack을 필요로 합니다).
- **`next.config.ts`**: Next.js 설정을 `withPWA`로 감싸서 서비스 워커 생성 기능을 활성화했습니다.
- **`.gitignore`**: PWA가 자동으로 생성하는 파일들(`sw.js`, `workbox-*.js`)을 git 추적에서 제외했습니다.

### 2. 애플리케이션 파일 (Application Files)

- **`app/manifest.ts`**: `manifest.json` 파일을 동적으로 생성하는 코드를 작성했습니다. (사용자가 각 설정의 의미를 이해하기 쉽게 주석을 추가했습니다.)
- **`app/layout.tsx`**: PWA 테마 색상을 설정하기 위해 `viewport` 메타데이터를 추가했습니다. (뷰포트 설정의 의미에 대한 주석이 추가되었습니다.)
- **`public/icons`**: 사용자가 제공한 참고 이미지를 바탕으로 생성한 '귀여운 구름' 스타일의 3D 아이콘(`icon-192x192.png`, `icon-512x512.png`)을 적용했습니다.

## 검증 (Verification)

- `apps/tudy4` 경로에서 `pnpm dev` 또는 `pnpm build`를 실행합니다.
- 빌드 과정에서 `public/sw.js` 파일이 정상적으로 생성되는지 확인했습니다.
- 빌드 결과물은 `.next` 폴더에 생성됩니다.
- `apps/tudy4` 전체 빌드(`pnpm build`)가 오류 없이 성공함을 확인했습니다. (폰트 경로 문제 해결 완료)

## 다음 단계 (Next Steps)

- `public/icons` 폴더의 임시 아이콘을 실제 브랜드 아이콘으로 교체해야 합니다 (현재는 '귀여운 구름' 아이콘 적용됨).
