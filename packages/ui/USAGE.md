# 🎨 UI 패키지 사용 가이드

이 패키지는 프로젝트 전반에서 사용되는 UI 컴포넌트들을 관리합니다.
컴포넌트의 **재사용 범위**와 **의존성**에 따라 아래 3가지 디렉토리로 구분합니다.

## 📂 디렉토리 구조

```text
packages/ui/src/
├── core/             # (Atomic) 디자인 시스템의 최소 단위 (버튼, 텍스트, 아이콘)
├── common/           # (Molecules) Core를 조립한 범용 컴포넌트 (모달, 캘린더)
└── features/         # (Organisms) 특정 도메인 로직이 포함된 UI (단어 카드, 정답 입력)
```

1. 🧱 Core (Base / Primitives)
   정의: 디자인 시스템의 가장 기초가 되는 뼈대입니다.

특징:

다른 컴포넌트(common, features)에 의존하지 않습니다.

비즈니스 로직(API 호출 등)이 절대 없어야 합니다.

오직 props로 스타일(variant)과 내용(children)만 받습니다.

예시: Button, Input, Badge, Spinner, Typography

2. 🧩 Common (Composites)
   정의: core 컴포넌트들을 조립하여 만든, 프로젝트 전반에서 쓰이는 UI입니다.

특징:

특정 도메인(단어장, 쇼핑몰 등)에 종속되지 않아야 합니다.

"단어장 앱"에서도 쓰고 "관리자 페이지"에서도 쓸 수 있어야 합니다.

예시: Modal, Pagination, Calendar, SearchInput

3. 💼 Features (Domain UI)
   정의: 특정 비즈니스 기능(단어장, 테스트 등)을 수행하기 위한 완성형 UI 덩어리입니다.

특징:

core와 common을 자유롭게 import해서 사용합니다.

데이터 Fetching 로직(React Query 등)은 포함하지 않습니다. (이건 apps에서 처리)

필요한 데이터는 오직 Props로만 받습니다. (Presentational Component)

예시: WordListItem (단어장용), TestTimer (시험용), ResultChart (결과용)

⚠️ 개발 원칙
의존성 방향: core → common → features (역방향 참조 금지 🚫)

순수성: 이곳(packages/ui)의 모든 컴포넌트는 데이터를 직접 부르지 않습니다. 데이터는 부모(apps)가 내려줘야 합니다.

스타일링: Tailwind CSS를 기본으로 사용합니다.
