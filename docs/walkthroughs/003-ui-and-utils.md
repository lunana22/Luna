# Luna 모노레포 구조조정 워크스루

`luna` 디렉토리 구조를 재조정하고 공유 패키지들을 추가했습니다.

## 변경 사항

### 디렉토리 이동

기존 모노레포 파일들을 `luna/workspace/`로 이동했습니다.

```
luna/
├── docs/
│   └── walkthroughs/   # 워크스루 문서 저장소
│       └── 001-setup.md # 초기 설정 워크스루
└── workspace/          # 실제 모노레포 워크스페이스
    ├── apps/
    ├── packages/
    │   ├── api/            # API 클라이언트
    │   ├── assets/         # 공유 에셋
    │   ├── design-system/  # 디자인 시스템 (토큰, 테마)
    │   ├── hooks/          # 공통 React Hooks
    │   ├── i18n/           # 다국어 처리
    │   ├── queries/        # React Query Hooks
    │   ├── stores/         # 전역 상태 관리
    │   ├── tsconfig/       # 공통 TypeScript 설정
    │   ├── types/          # 공통 타입 정의
    │   ├── ui/             # UI 컴포넌트 라이브러리
    │   │   ├── src/
    │   │   │   ├── atoms/      # Atomic 컴포넌트
    │   │   │   │   └── Button.tsx # 버튼 컴포넌트
    │   │   │   ├── components/ # 복합 컴포넌트
    │   │   │   ├── client.ts   # 클라이언트 컴포넌트 엔트리
    │   │   │   ├── server.ts   # 서버 컴포넌트 엔트리
    │   │   │   └── index.css   # 메인 스타일시트
    │   │   ├── package.json
    │   │   └── tsup.config.ts
    │   └── utils/          # 유틸리티 함수
    ├── package.json
    └── pnpm-workspace.yaml
```

### 추가된 패키지

요청하신 다음 패키지들을 `packages/`에 추가했습니다:

- `@luna/api`
- `@luna/design-system`
- `@luna/hooks`
- `@luna/i18n`
- `@luna/queries`
- `@luna/stores`
- `@luna/tsconfig`
- `@luna/types`
- `@luna/ui`
- `@luna/utils`

### UI 패키지 설정

`@luna/ui` 패키지는 다음과 같이 설정되었습니다:

- **Entry Points**:
  - `client`: `src/client.ts` (Client Components)
  - `server`: `src/server.ts` (Server Components)
  - `styles`: `src/index.css`
- **Structure**: `src/atoms`와 `src/components`로 구분.
- **Build**: `tsup` (JS/DTS) + `tailwindcss` CLI (CSS).
- **TypeScript**: `@luna/tsconfig`를 확장하여 설정 완료.
- **Components**: `Button` atom 구현 완료.
- **Utils**: `cn` 유틸리티를 `@luna/utils`로 이동하여 공통 사용.
  - `package.json`: `exports` 순서를 조정하여 타입 인식 개선.
  - `devDependencies`에 `@luna/tsconfig`를 추가하여 `tsconfig.json`에서 패키지 경로로 참조 가능하도록 수정.

## 검증 결과

- `luna/workspace/packages` 내에 모든 패키지 디렉토리가 생성되었음을 확인했습니다.
- 각 패키지에 기본 `package.json`이 생성되었습니다.
- `@luna/ui`의 구조와 설정이 올바르게 적용되었습니다.
- `Button` 컴포넌트가 정상적으로 빌드됨을 확인했습니다.

## 다음 단계

- 모노레포 작업은 `luna/workspace` 디렉토리 내에서 수행해야 합니다.
- `luna/workspace`에서 `pnpm install`을 실행하여 의존성을 설치하세요.
