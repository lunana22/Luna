# 해결: `@luna/i18n/next` 임포트 에러 수정

## 배경 (Context)

`WordBookListContainer.tsx`에서 `@luna/i18n/next` 모듈을 찾을 수 없다는 빌드 에러가 발생했습니다. 이는 `@luna/i18n` 패키지에서 해당 경로를 export 하고 있지 않았기 때문입니다.

## 분석 (Investigation)

1.  **의존성 확인**: `packages/features/package.json`에 `@luna/i18n`이 정상적으로 포함되어 있음을 확인했습니다.
2.  **패키지 Exports 확인**: `@luna/i18n/package.json`을 분석한 결과:
    - `./next`라는 통합 entry point가 없었습니다.
    - `./next/routing`과 같은 개별 경로는 존재했습니다.
    - `useParams`는 `@luna/i18n` 커스텀 훅이 아닌 `next/navigation`의 표준 훅을 사용해야 했습니다.

## 해결 방법 (Resolution)

존재하지 않는 `@luna/i18n/next` 경로 대신, 올바른 경로로 임포트를 분리하여 수정했습니다.

### 변경 사항

#### `packages/features/src/wordbook/containers/WordBookListContainer.tsx`

`useRouter`는 `next-intl`을 래핑한 로직이 포함된 `@luna/i18n/next/routing`에서 가져오고, `useParams`는 Next.js 기본 훅을 사용하도록 변경했습니다.

```tsx
"use client";

import { useMemo } from "react";
// [수정된 임포트]
import { useRouter } from "@luna/i18n/next/routing";
import { useParams } from "next/navigation";
import { useGetFileTree } from "@luna/queries";
// ...
```

## 검증 (Verification)

- **빌드**: `pnpm dev` 서버가 에러 없이 정상적으로 실행됩니다.
- **기능**: `WordBookListContainer`에서 라우팅 및 파라미터 수신이 정상적으로 동작함을 확인했습니다.
