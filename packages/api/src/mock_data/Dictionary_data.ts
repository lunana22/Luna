import {
  FileNode,
  NodeType,
  StudyItem,
  StudyItemType,
  MemorizationStatus,
  Language,
  StudyViewItem,
  DeckMetadata,
  DictionaryTerm,
  PartOfSpeech,
  CardContent,
  WordContent,
} from "@luna/types";

const now = () => new Date().toISOString();

// =================================================================
// 1. 🗂️ 가짜 파일 시스템 (FileNodes)
// 구조:
// [Root] 📁 개발 지식
//    └─ [Deck] 💾 CS 면접 질문 (카드형)
// [Root] 📁 어학 공부
//    └─ 📁 2024 영어
//       └─ [Deck] 📘 토익 빈출 (단어형)
//       └─ [Deck] 🗣️ 생활 회화 (카드형)
//    └─ [Deck] 🇯🇵 일본어 기초 (단어형)
// =================================================================

export const MOCK_NODES: FileNode[] = [
  // --- 1. 개발 지식 폴더 ---
  {
    id: "folder-dev",
    ownerId: "user-1",
    type: NodeType.FOLDER,
    name: "💻 개발 지식 정복",
    emoji: "💻",
    description: "면접 대비 CS 지식 모음",
    parentId: null, // 최상위
    isPublic: true,
    viewCount: 1540,
    forkCount: 42,
    metadata: { sortOrder: "CUSTOM" },
    children: [], // API 응답 시 채워짐
    createdAt: now(),
    updatedAt: now(),
  },
  // └─ 개발 단어장 (CS 면접)
  {
    id: "deck-cs",
    ownerId: "user-1",
    type: NodeType.DECK,
    name: "Frontend 면접 질문",
    emoji: "⚛️",
    description: "React, Browser, JS 핵심 질문",
    parentId: "folder-dev", // 개발 폴더 안
    isPublic: true,
    viewCount: 800,
    forkCount: 120,
    metadata: {
      defaultSourceLang: Language.EN,
      defaultTargetLang: Language.KO,
      tags: ["CS", "면접", "Frontend"],
    },
    createdAt: now(),
    updatedAt: now(),
  },

  // --- 2. 어학 공부 폴더 ---
  {
    id: "folder-lang",
    ownerId: "user-1",
    type: NodeType.FOLDER,
    name: "🌍 어학 공부",
    emoji: "🌍",
    parentId: null,
    isPublic: false,
    viewCount: 0,
    forkCount: 0,
    metadata: { sortOrder: "NAME" },
    children: [],
    createdAt: now(),
    updatedAt: now(),
  },
  // └─ 2024 영어 폴더 (중첩 폴더 테스트용)
  {
    id: "folder-eng-2024",
    ownerId: "user-1",
    type: NodeType.FOLDER,
    name: "🇺🇸 2024 영어",
    parentId: "folder-lang",
    isPublic: false,
    viewCount: 0,
    forkCount: 0,
    metadata: { sortOrder: "DATE" },
    children: [],
    createdAt: now(),
    updatedAt: now(),
  },
  // └─ └─ 토익 단어장
  {
    id: "deck-toeic",
    ownerId: "user-1",
    type: NodeType.DECK,
    name: "📘 토익 900점 완성",
    parentId: "folder-eng-2024",
    isPublic: true,
    viewCount: 30,
    forkCount: 2,
    metadata: {
      defaultSourceLang: Language.EN,
      defaultTargetLang: Language.KO,
      tags: ["토익", "영어"],
    },
    createdAt: now(),
    updatedAt: now(),
  },
  // └─ └─ 회화 단어장
  {
    id: "deck-talk",
    ownerId: "user-1",
    type: NodeType.DECK,
    name: "🗣️ 미드 표현 모음",
    parentId: "folder-eng-2024",
    isPublic: false,
    viewCount: 5,
    forkCount: 0,
    metadata: {
      defaultSourceLang: Language.EN,
      defaultTargetLang: Language.KO,
      tags: ["회화", "미드"],
    },
    createdAt: now(),
    updatedAt: now(),
  },
  // └─ 일본어 단어장
  {
    id: "deck-jp",
    ownerId: "user-1",
    type: NodeType.DECK,
    name: "🇯🇵 JLPT N3",
    parentId: "folder-lang",
    isPublic: false,
    viewCount: 10,
    forkCount: 0,
    metadata: {
      defaultSourceLang: Language.JA,
      defaultTargetLang: Language.KO,
      tags: ["일본어", "자격증"],
    },
    createdAt: now(),
    updatedAt: now(),
  },
];

// =================================================================
// 2. 📚 가짜 사전 데이터 (Dictionary)
// - WORD 타입 아이템들이 참조할 데이터
// =================================================================
export const MOCK_DICTIONARY: Record<string, DictionaryTerm> = {
  // 영어
  "t-abrupt": {
    id: "t-abrupt",
    word: "Abrupt",
    pronunciation: "[əˈbrʌpt]",
    language: Language.EN,
    createdAt: now(),
    updatedAt: now(),
    meanings: [
      {
        id: "t-abrupt-1",
        termId: "t-abrupt",
        meaning: "갑작스러운",
        language: Language.KO,
        partOfSpeech: PartOfSpeech.NOUN,
        createdAt: now(),
        updatedAt: now(),
      },
    ],
  },
  "t-benevolent": {
    id: "t-benevolent",
    word: "Benevolent",
    pronunciation: "[bəˈnevələnt]",
    language: Language.EN,
    createdAt: now(),
    updatedAt: now(),
    meanings: [
      {
        id: "t-benevolent-1",
        termId: "t-benevolent",
        meaning: "자애로운",
        language: Language.KO,
        partOfSpeech: PartOfSpeech.NOUN,
        createdAt: now(),
        updatedAt: now(),
      },
    ],
  },
  "t-candid": {
    id: "t-candid",
    word: "Candid",
    pronunciation: "[ˈkændɪd]",
    language: Language.EN,
    createdAt: now(),
    updatedAt: now(),
    meanings: [
      {
        id: "t-candid-1",
        termId: "t-candid",
        meaning: "솔직한",
        language: Language.KO,
        partOfSpeech: PartOfSpeech.NOUN,
        createdAt: now(),
        updatedAt: now(),
      },
    ],
  },
  "t-diligent": {
    id: "t-diligent",
    word: "Diligent",
    pronunciation: "[ˈdɪlɪdʒənt]",
    language: Language.EN,
    createdAt: now(),
    updatedAt: now(),
    meanings: [
      {
        id: "t-diligent-1",
        termId: "t-diligent",
        meaning: "근면한",
        language: Language.KO,
        partOfSpeech: PartOfSpeech.NOUN,
        createdAt: now(),
        updatedAt: now(),
      },
    ],
  },
  "t-eloquent": {
    id: "t-eloquent",
    word: "Eloquent",
    pronunciation: "[ˈeləkwənt]",
    language: Language.EN,
    createdAt: now(),
    updatedAt: now(),
    meanings: [
      {
        id: "t-eloquent-1",
        termId: "t-eloquent",
        meaning: "웅변을 잘하는",
        language: Language.KO,
        partOfSpeech: PartOfSpeech.NOUN,
        createdAt: now(),
        updatedAt: now(),
      },
    ],
  },

  // 일본어
  "t-neko": {
    id: "t-neko",
    word: "猫",
    language: Language.JA,
    pronunciation: "[neko]",
    createdAt: now(),
    updatedAt: now(),
    meanings: [
      {
        id: "t-neko-1",
        termId: "t-neko",
        meaning: "고양이",
        language: Language.KO,
        partOfSpeech: PartOfSpeech.NOUN,
        createdAt: now(),
        updatedAt: now(),
      },
    ],
  },
  "t-gakusei": {
    id: "t-gakusei",
    word: "学生",
    language: Language.JA,
    pronunciation: "[gakusei]",
    createdAt: now(),
    updatedAt: now(),
    meanings: [
      {
        id: "t-gakusei-1",
        termId: "t-gakusei",
        meaning: "학생",
        language: Language.KO,
        partOfSpeech: PartOfSpeech.NOUN,
        createdAt: now(),
        updatedAt: now(),
      },
    ],
  },
};

// =================================================================
// 3. 📄 가짜 학습 아이템들 (StudyItems)
// =================================================================

export const MOCK_ITEMS: StudyItem[] = [
  // ------------------------------------------------------
  // [Deck: 토익 900점] - 주로 WORD 타입
  // ------------------------------------------------------
  {
    id: "item-1",
    nodeId: "deck-toeic",
    type: StudyItemType.DICTIONARY_WORD,
    content: { termId: "t-abrupt" },
    status: MemorizationStatus.MEMORIZED,
    correctCount: 10,
    wrongCount: 2,
    isPinned: false,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "item-2",
    nodeId: "deck-toeic",
    type: StudyItemType.DICTIONARY_WORD,
    content: {
      termId: "t-benevolent",
      customMeanings: { KO: "자비로운 (Custom)" },
    },
    status: MemorizationStatus.CONFUSED,
    correctCount: 2,
    wrongCount: 5,
    isPinned: true,
    memo: "철자가 너무 헷갈림 b-e-n-e...",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "item-3",
    nodeId: "deck-toeic",
    type: StudyItemType.DICTIONARY_WORD,
    content: { termId: "t-candid" },
    status: MemorizationStatus.UNKNOWN,
    correctCount: 0,
    wrongCount: 0,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "item-4",
    nodeId: "deck-toeic",
    type: StudyItemType.DICTIONARY_WORD,
    content: { termId: "t-diligent" },
    status: MemorizationStatus.MEMORIZED,
    correctCount: 15,
    wrongCount: 1,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "item-5",
    nodeId: "deck-toeic",
    type: StudyItemType.DICTIONARY_WORD,
    content: { termId: "t-eloquent" },
    status: MemorizationStatus.CONFUSED,
    correctCount: 3,
    wrongCount: 3,
    createdAt: now(),
    updatedAt: now(),
  },

  // ------------------------------------------------------
  // [Deck: CS 면접] - 전부 CARD 타입 (직접 입력)
  // ------------------------------------------------------
  {
    id: "item-cs-1",
    nodeId: "deck-cs",
    type: StudyItemType.SIMPLE_CARD,
    content: {
      front: "브라우저 렌더링 과정을 설명하시오.",
      back: "DOM 트리 생성 -> CSSOM 생성 -> Render 트리 -> Layout -> Paint",
      hint: "D-C-R-L-P",
    },
    status: MemorizationStatus.MEMORIZED,
    correctCount: 5,
    wrongCount: 0,
    isPinned: true,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "item-cs-2",
    nodeId: "deck-cs",
    type: StudyItemType.SIMPLE_CARD,
    content: {
      front: "GET과 POST의 차이점은?",
      back: "GET은 조회(Idempotent), POST는 생성/변경(Non-idempotent). GET은 URL에 데이터 노출, POST는 Body에 담음.",
    },
    status: MemorizationStatus.CONFUSED,
    correctCount: 1,
    wrongCount: 2,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "item-cs-3",
    nodeId: "deck-cs",
    type: StudyItemType.SIMPLE_CARD,
    content: {
      front: "Hoisting(호이스팅)이란?",
      back: "변수 및 함수 선언문이 스코프의 최상단으로 끌어올려진 것처럼 동작하는 현상.",
    },
    status: MemorizationStatus.UNKNOWN,
    correctCount: 0,
    wrongCount: 0,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "item-cs-4",
    nodeId: "deck-cs",
    type: StudyItemType.SIMPLE_CARD,
    content: {
      front: "React의 Virtual DOM이란?",
      back: "실제 DOM을 조작하기 전, 메모리 상에 가상 DOM을 그려보고 변경된 부분만 실제 DOM에 반영하는 기술.",
    },
    status: MemorizationStatus.MEMORIZED,
    correctCount: 8,
    wrongCount: 1,
    createdAt: now(),
    updatedAt: now(),
  },

  // ------------------------------------------------------
  // [Deck: 미드 표현] - CARD 타입 (영어지만 사전에 없는 문장)
  // ------------------------------------------------------
  {
    id: "item-talk-1",
    nodeId: "deck-talk",
    type: StudyItemType.SIMPLE_CARD,
    content: {
      front: "Rain check?",
      back: "다음에 할까? (약속 미룰 때)",
      hint: "비 올 때 받는 표",
    },
    status: MemorizationStatus.UNKNOWN,
    correctCount: 0,
    wrongCount: 0,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "item-talk-2",
    nodeId: "deck-talk",
    type: StudyItemType.SIMPLE_CARD,
    content: {
      front: "Let's call it a day.",
      back: "오늘은 여기까지 하자. (퇴근할 때)",
    },
    status: MemorizationStatus.CONFUSED,
    correctCount: 1,
    wrongCount: 1,
    createdAt: now(),
    updatedAt: now(),
  },

  // ------------------------------------------------------
  // [Deck: 일본어] - WORD 타입
  // ------------------------------------------------------
  {
    id: "item-jp-1",
    nodeId: "deck-jp",
    type: StudyItemType.DICTIONARY_WORD,
    content: { termId: "t-neko" },
    status: MemorizationStatus.MEMORIZED,
    correctCount: 3,
    wrongCount: 0,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "item-jp-2",
    nodeId: "deck-jp",
    type: StudyItemType.DICTIONARY_WORD,
    content: { termId: "t-gakusei" },
    status: MemorizationStatus.UNKNOWN,
    correctCount: 0,
    wrongCount: 0,
    createdAt: now(),
    updatedAt: now(),
  },
];

// =========================================================
// 1. 🌳 폴더/파일 시스템 로직 (Finder System)
// =========================================================

/**
 * 🌲 전체 파일 트리 가져오기 (사이드바용)
 * - 재귀적으로(Recursive) 자식 노드들을 찾아 'children' 배열에 채워 넣습니다.
 */
export const getFileTree = async (userId: string): Promise<FileNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 🏗️ 재귀 함수: 부모 ID를 받아서 자식들(폴더+단어장)을 다 찾아옴
      const buildTree = (parentId: string | null): FileNode[] => {
        // 1. 현재 레벨의 모든 노드 찾기 (폴더든 단어장이든 상관없음!)
        const directChildren = MOCK_NODES.filter(
          (node) => node.parentId === parentId && node.ownerId === userId
        );

        // 2. 각 자식 노드 순회
        return directChildren.map((child) => {
          // 📁 폴더인 경우에만 재귀적으로 더 깊이 들어감 (단어장은 자식이 없음)
          if (child.type === NodeType.FOLDER) {
            return {
              ...child,
              children: buildTree(child.id), // 내 자식들을 찾아와라!
            };
          }
          // 📘 단어장인 경우 그냥 리턴
          return child;
        });
      };

      // Root(null)부터 시작
      resolve(buildTree(null));
    }, 300);
  });
};

/**
 * 📂 특정 폴더 내부 파일들 가져오기 (메인 Finder 화면용)
 * - 재귀 없이, 딱 해당 폴더의 '직계 자식'만 가져옵니다.
 */
export const getFolderContents = async (folderId: string | null) => {
  return new Promise<{
    currentNode?: FileNode; // 현재 폴더 정보 (제목 등 표시용)
    children: FileNode[]; // 안에 들어있는 파일들 (폴더 + 단어장)
  }>((resolve) => {
    setTimeout(() => {
      // 1. 현재 폴더 정보 (Root면 없음)
      const currentNode = folderId
        ? MOCK_NODES.find((n) => n.id === folderId)
        : undefined;

      // 2. 직계 자식들 찾기
      // 이제 wordbooks, subFolders 따로 찾을 필요 없음. 그냥 parentId만 맞으면 됨!
      const children = MOCK_NODES.filter(
        (n) => n.parentId === (folderId || null)
      );

      // (선택) 여기서 metadata.sortOrder에 따라 정렬 로직 추가 가능
      // children.sort(...)

      resolve({ currentNode, children });
    }, 200);
  });
};

// =========================================================
// 2. 🃏 학습 아이템 로직 (Polymorphic Item Mapper)
// =========================================================

/**
 * 📘 특정 단어장(Deck) 안의 아이템들 가져오기 (상세 화면용)
 * - WORD 타입: 사전 데이터 조인 + 언어 설정에 따른 앞뒤 전환
 * - CARD 타입: 그냥 그대로 보여줌
 */
export const getStudyItemsInDeck = async (
  deckId: string
): Promise<StudyViewItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. 단어장 메타데이터 가져오기 (언어 설정 확인용)
      const deckNode = MOCK_NODES.find((n) => n.id === deckId);
      if (!deckNode || deckNode.type !== NodeType.DECK) return resolve([]);

      // ⚠️ 중요: 타입 단언 (Metadata가 DeckMetadata라고 확신)
      const metadata = deckNode.metadata as DeckMetadata;
      const targetLang = metadata.defaultTargetLang || "KO"; // 기본 타겟 언어

      // 2. 이 단어장에 속한 아이템들 찾기
      const rawItems = MOCK_ITEMS.filter((item) => item.nodeId === deckId);

      // 3. 뷰 모델(StudyCardView)로 변환 (Mapper)
      const viewItems = rawItems
        .map((item): StudyViewItem | null => {
          // 🅰️ [WORD 타입] 사전 데이터와 결합
          if (item.type === StudyItemType.DICTIONARY_WORD) {
            const content = item.content as WordContent; // 타입 가드 필요하지만 일단 간략히
            const term = MOCK_DICTIONARY[content.termId];

            if (!term) return null; // 사전에 없는 경우 방어

            // 커스텀 뜻이 있으면 그거 쓰고, 없으면 사전 뜻(타겟 언어) 사용
            const customMeaning = content.customMeanings?.[targetLang];
            const dictMeaning = term.meanings?.find(
              (m: any) => m.language === targetLang
            )?.meaning;
            const finalMeaning = customMeaning || dictMeaning || "(뜻 없음)";

            // 🔄 언어 설정에 따른 앞/뒤 배치 (EN->KO vs KO->EN)
            // 여기서는 예시로 그냥 Source(Word) -> Target(Meaning) 순서로 둠
            return {
              itemId: item.id,
              type: StudyItemType.DICTIONARY_WORD,
              front: term.word, // 앞면: Apple
              back: finalMeaning, // 뒷면: 사과
              pronunciation: term.pronunciation,
              status: item.status,
              tags: metadata.tags,
            };
          }

          // 🅱️ [CARD 타입] 그냥 보여줌
          if (item.type === StudyItemType.SIMPLE_CARD) {
            const content = item.content as CardContent;
            return {
              itemId: item.id,
              type: StudyItemType.SIMPLE_CARD,
              front: content.front, // 앞면: 질문
              back: content.back, // 뒷면: 정답
              example: content.hint, // 힌트를 예문 위치에 매핑 (선택사항)
              status: item.status,
              tags: metadata.tags,
            };
          }

          return null;
        })
        .filter((i): i is StudyViewItem => i !== null); // null 제거

      resolve(viewItems);
    }, 400);
  });
};

/**
 * 📚 내 모든 단어장 가져오기 (Flat List)
 * - 폴더 구조 무시하고, 내가 가진 'DECK' 타입만 전부 조회
 * - 용도: 대시보드, 최근 학습한 목록, 퀵 서치(Quick Search)
 */
export const getAllMyDecks = async (userId: string): Promise<FileNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. 필터링: 내꺼(ownerId) + 단어장타입(DECK)
      const myDecks = MOCK_NODES.filter(
        (node) => node.ownerId === userId && node.type === NodeType.DECK
      );

      // 2. (선택사항) 정렬: 최근 수정된 순서 (updatedAt DESC)
      // 학습 앱에서는 보통 최근에 공부한 게 맨 위에 뜨는 게 국룰입니다.
      myDecks.sort((a, b) => {
        const dateA = new Date(a.updatedAt || 0).getTime();
        const dateB = new Date(b.updatedAt || 0).getTime();
        return dateB - dateA; // 내림차순
      });

      resolve(myDecks);
    }, 300);
  });
};
