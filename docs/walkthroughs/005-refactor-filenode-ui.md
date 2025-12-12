# 리팩토링: FileNode UI 및 FolderDetailContainer

## 개요

이번 리팩토링은 `FolderDetailContainer`의 미리 로드된 데이터 Props를 단순화하고, `FileNode`와의 범용적인 사용성을 반영하기 위해 컴포넌트 이름을 변경하는 작업을 포함합니다.

## 변경 사항

### 1. 컴포넌트 이름 변경

- **`FolderCard` -> `FileNodeCard`**:
  - `FolderCard.tsx` 파일명을 `FileNodeCard.tsx`로 변경했습니다.
  - 컴포넌트 이름을 `FileNodeCard`로 업데이트했습니다.
  - 이 컴포넌트는 이제 리스트 뷰에서 폴더와 단어장(Deck)을 포함한 범용적인 `FileNode` 아이템을 명시적으로 처리합니다.

### 2. FolderDetailContainer 리팩토링

- **Props 단순화**:
  - `preloadedSubFolders`와 `preloadedWordBooks` Props를 제거했습니다.
  - `preloadedChildren: FileNode[]`를 추가했습니다.
- **로직 업데이트**:
  - `preloadedChildren`과 가져온 데이터를 병합했습니다.
  - "폴더"와 "기타 항목(단어장 등)"을 분리하는 로직을 구현했습니다.
  - **정렬**:
    - 폴더는 항상 먼저 표시됩니다 (기존 순서 또는 서버 순서 유지).
    - 기타 항목(단어장)은 `name`을 기준으로 알파벳순 정렬됩니다.
- **렌더링**:
  - 모든 아이템에 `FileNodeCard`를 사용합니다.
  - `node.type`에 따라 클릭 이벤트를 처리합니다.

### 3. WordBookListContainer 업데이트

- `FolderDetailContainer`에 `preloadedChildren` (from `currentFolderNode.children` or `rootFolders`)을 전달하도록 업데이트했습니다.

## 검증

- **빌드**: `@luna/features` 패키지 빌드에 성공했습니다.
- **Lint**: 컴포넌트 import 및 prop 사용과 관련된 모든 Lint 오류를 해결했습니다.
