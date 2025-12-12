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

## 검증 결과

- `luna/workspace/packages` 내에 모든 패키지 디렉토리가 생성되었음을 확인했습니다.
- 각 패키지에 기본 `package.json`이 생성되었습니다.

## 다음 단계

- 모노레포 작업은 `luna/workspace` 디렉토리 내에서 수행해야 합니다.
- `luna/workspace`에서 `pnpm install`을 실행하여 의존성을 설치하세요.
