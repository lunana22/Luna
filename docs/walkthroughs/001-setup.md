# Luna 모노레포 설정 워크스루

요청하신 대로 `luna` 모노레포 구조 설정을 완료했습니다.

## 변경 사항

### 디렉토리 구조

`luna/` 내에 다음과 같은 디렉토리 구조를 생성했습니다:

```
luna/
├── apps/               # 애플리케이션 디렉토리 (React, Next.js 등)
├── packages/           # 공유 패키지 디렉토리
│   └── assets/         # 공유 에셋 패키지
├── package.json        # 루트 설정 파일
└── pnpm-workspace.yaml # 워크스페이스 설정 파일
```

### 설정 내용

- **pnpm**: 패키지 매니저로 `pnpm`을 설정했습니다.
- **Workspace**: `pnpm-workspace.yaml`에 `apps/*`와 `packages/*`를 포함하도록 설정했습니다.
- **Assets**: `@luna/assets`를 위한 기본 `package.json`을 생성했습니다.
- **Husky**: 생략.

## 검증 결과

### 디렉토리 확인

모든 디렉토리와 파일이 올바르게 생성되었음을 확인했습니다:

- `luna/apps` 존재 확인.
- `luna/packages/assets` 및 `package.json` 존재 확인.
- `luna/package.json` 및 `luna/pnpm-workspace.yaml` 설정 확인.

## 다음 단계

이제 `apps/`에 애플리케이션을 추가하고 `packages/`에 공유 코드를 추가할 수 있습니다.
의존성을 설치하려면 루트 `workspace` 디렉토리에서 `pnpm install`을 실행하세요.
