// import {
//   DictionaryTerm,
//   DictionaryMeaning,
//   WordBook,
//   WordItem,
//   Language,
//   MemorizationStatus,
//   WordViewItem,
//   Folder,
//   FolderDetail,
// } from "@luna/types";

// // 📅 날짜 생성 헬퍼
// const now = () => new Date().toISOString();

// // =========================================================
// // 1. 🅰️ DictionaryTerm (질문 / 단어 본체 - 20개)
// // =========================================================
// export const MOCK_TERMS: DictionaryTerm[] = [
//   // [기초 단어]
//   {
//     id: "term-en-apple",
//     word: "apple",
//     language: Language.EN,
//     pronunciation: "[æp.l]",
//     tags: ["과일", "기초"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-en-banana",
//     word: "banana",
//     language: Language.EN,
//     pronunciation: "[bəˈnænə]",
//     tags: ["과일", "기초"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-en-coffee",
//     word: "coffee",
//     language: Language.EN,
//     pronunciation: "[ˈkɔːfi]",
//     tags: ["음료", "생활"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-en-water",
//     word: "water",
//     language: Language.EN,
//     pronunciation: "[ˈwɔːtər]",
//     tags: ["음료", "필수"],
//     createdAt: now(),
//     updatedAt: now(),
//   },

//   // [개발 용어]
//   {
//     id: "term-en-server",
//     word: "server",
//     language: Language.EN,
//     pronunciation: "[ˈsɜːrvər]",
//     tags: ["IT", "백엔드"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-en-client",
//     word: "client",
//     language: Language.EN,
//     pronunciation: "[ˈklaɪənt]",
//     tags: ["IT", "프론트엔드"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-en-bug",
//     word: "bug",
//     language: Language.EN,
//     pronunciation: "[bʌg]",
//     tags: ["IT", "에러"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-en-deploy",
//     word: "deploy",
//     language: Language.EN,
//     pronunciation: "[dɪˈplɔɪ]",
//     tags: ["IT", "DevOps"],
//     createdAt: now(),
//     updatedAt: now(),
//   },

//   // [비즈니스/동사]
//   {
//     id: "term-en-run",
//     word: "run",
//     language: Language.EN,
//     pronunciation: "[rʌn]",
//     tags: ["동사", "다의어"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-en-confirm",
//     word: "confirm",
//     language: Language.EN,
//     pronunciation: "[kənˈfɜːrm]",
//     tags: ["비즈니스"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-en-schedule",
//     word: "schedule",
//     language: Language.EN,
//     pronunciation: "[ˈskedʒuːl]",
//     tags: ["비즈니스"],
//     createdAt: now(),
//     updatedAt: now(),
//   },

//   // [일본어]
//   {
//     id: "term-ja-neko",
//     word: "猫",
//     language: Language.JA,
//     pronunciation: "[neko]",
//     tags: ["동물", "JLPT N5"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-ja-inu",
//     word: "犬",
//     language: Language.JA,
//     pronunciation: "[inu]",
//     tags: ["동물", "JLPT N5"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "term-ja-arigato",
//     word: "ありがとう",
//     language: Language.JA,
//     pronunciation: "[arigatou]",
//     tags: ["인사"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
// ];

// // =========================================================
// // 2. 🅱️ DictionaryMeaning (정답 / 번역 뜻)
// // =========================================================
// export const MOCK_MEANINGS: DictionaryMeaning[] = [
//   // Apple
//   {
//     id: "m-apple-ko",
//     termId: "term-en-apple",
//     language: Language.KO,
//     meaning: "사과",
//     exampleSentence: "One apple a day keeps the doctor away.",
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "m-apple-zh",
//     termId: "term-en-apple",
//     language: Language.ZH,
//     meaning: "苹果",
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   // Banana
//   {
//     id: "m-banana-ko",
//     termId: "term-en-banana",
//     language: Language.KO,
//     meaning: "바나나",
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   // Coffee
//   {
//     id: "m-coffee-ko",
//     termId: "term-en-coffee",
//     language: Language.KO,
//     meaning: "커피",
//     exampleSentence: "I need some coffee.",
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   // Water
//   {
//     id: "m-water-ko",
//     termId: "term-en-water",
//     language: Language.KO,
//     meaning: "물",
//     createdAt: now(),
//     updatedAt: now(),
//   },

//   // Server
//   {
//     id: "m-server-ko",
//     termId: "term-en-server",
//     language: Language.KO,
//     meaning: "서버 (제공자)",
//     exampleSentence: "Server is down.",
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   // Client
//   {
//     id: "m-client-ko",
//     termId: "term-en-client",
//     language: Language.KO,
//     meaning: "클라이언트 (고객/사용자)",
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   // Bug
//   {
//     id: "m-bug-ko",
//     termId: "term-en-bug",
//     language: Language.KO,
//     meaning: "벌레",
//     createdAt: now(),
//     updatedAt: now(),
//   }, // IT용어지만 사전엔 벌레로 등록된 상황 가정
//   // Deploy
//   {
//     id: "m-deploy-ko",
//     termId: "term-en-deploy",
//     language: Language.KO,
//     meaning: "배치하다",
//     createdAt: now(),
//     updatedAt: now(),
//   }, // IT용어지만 사전엔 배치하다로 등록됨

//   // Run
//   {
//     id: "m-run-ko",
//     termId: "term-en-run",
//     language: Language.KO,
//     meaning: "달리다",
//     exampleSentence: "He runs fast.",
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   // Confirm
//   {
//     id: "m-confirm-ko",
//     termId: "term-en-confirm",
//     language: Language.KO,
//     meaning: "확인하다",
//     createdAt: now(),
//     updatedAt: now(),
//   },

//   // 일본어 뜻
//   {
//     id: "m-neko-ko",
//     termId: "term-ja-neko",
//     language: Language.KO,
//     meaning: "고양이",
//     exampleSentence: "猫がいます (고양이가 있습니다)",
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "m-inu-ko",
//     termId: "term-ja-inu",
//     language: Language.KO,
//     meaning: "개 (강아지)",
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "m-arigato-ko",
//     termId: "term-ja-arigato",
//     language: Language.KO,
//     meaning: "고마워",
//     createdAt: now(),
//     updatedAt: now(),
//   },
// ];

// // =========================================================
// // 3. 🗂️ 폴더 (MOCK_FOLDERS)
// // =========================================================
// export const MOCK_FOLDERS: Folder[] = [
//   {
//     id: "folder-dev",
//     ownerId: "user-1",
//     name: "개발 공부 💻",
//     emoji: "⌨️",
//     parentId: null,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "folder-lang",
//     ownerId: "user-1",
//     name: "어학 자격증 🌍",
//     emoji: "🏆",
//     parentId: null,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "folder-hobby",
//     ownerId: "user-1",
//     name: "취미 생활 🎨",
//     emoji: "🎸",
//     parentId: null,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "folder-empty",
//     ownerId: "user-1",
//     name: "새 폴더 (비어있음)",
//     emoji: "📁",
//     parentId: null,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "folder-lang-sub",
//     ownerId: "user-1",
//     name: "어학 자격증 하위 폴더 🏆",
//     emoji: "🏆",
//     parentId: "folder-lang",
//     createdAt: now(),
//     updatedAt: now(),
//   },
// ];

// // =========================================================
// // 4. 📂 단어장 (MOCK_WORD_BOOKS)
// // =========================================================
// export const MOCK_WORD_BOOKS: WordBook[] = [
//   // [Folder: 개발 공부]
//   {
//     id: "book-frontend",
//     folderId: "folder-dev",
//     ownerId: "user-1",
//     title: "프론트엔드 면접 질문",
//     description: "React, Browser, CSS 관련 용어 정리",
//     isPublic: true,
//     viewCount: 1240,
//     defaultSourceLang: Language.EN,
//     defaultTargetLang: Language.KO,
//     category: ["개발", "면접", "React"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "book-cs101",
//     folderId: "folder-dev",
//     ownerId: "user-1",
//     title: "CS 전공 기초",
//     description: "운영체제, 네트워크 핵심 요약",
//     isPublic: false,
//     viewCount: 10,
//     defaultSourceLang: Language.EN,
//     defaultTargetLang: Language.KO,
//     category: ["CS", "대학교"],
//     createdAt: now(),
//     updatedAt: now(),
//   },

//   // [Folder: 어학 자격증]
//   {
//     id: "book-toeic-rc",
//     folderId: "folder-lang",
//     ownerId: "user-1",
//     title: "토익 RC 빈출 단어",
//     description: "해커스 노랭이 챕터 1-5",
//     isPublic: true,
//     viewCount: 532,
//     defaultSourceLang: Language.EN,
//     defaultTargetLang: Language.KO,
//     category: ["토익", "영어"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "book-jlpt-n3",
//     folderId: "folder-lang",
//     ownerId: "user-1",
//     title: "JLPT N3 필수 어휘",
//     description: "청해 대비용 단어장",
//     isPublic: true,
//     viewCount: 88,
//     defaultSourceLang: Language.JA,
//     defaultTargetLang: Language.KO,
//     category: ["일본어", "JLPT"],
//     createdAt: now(),
//     updatedAt: now(),
//   },

//   // [Root Level] (폴더 없음)
//   {
//     id: "book-daily",
//     folderId: null, // Root
//     ownerId: "user-1",
//     title: "매일매일 영단어",
//     description: "생활 속에서 모르는 단어 기록",
//     isPublic: false,
//     viewCount: 0,
//     defaultSourceLang: Language.EN,
//     defaultTargetLang: Language.KO,
//     category: ["일상"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "book-empty-test",
//     folderId: null,
//     ownerId: "user-1",
//     title: "아직 단어가 없는 단어장",
//     description: "Empty State 테스트용",
//     isPublic: false,
//     viewCount: 0,
//     defaultSourceLang: Language.EN,
//     defaultTargetLang: Language.KO,
//     category: ["테스트"],
//     createdAt: now(),
//     updatedAt: now(),
//   },
// ];

// // =========================================================
// // 5. 🔗 WordItem (내 단어 연결)
// // =========================================================
// export const MOCK_WORD_ITEMS: WordItem[] = [
//   // --- [책: 프론트엔드 면접] (개발 용어 + 커스텀 뜻) ---
//   {
//     id: "item-fe-1",
//     wordBookId: "book-frontend",
//     termId: "term-en-server",
//     status: MemorizationStatus.MEMORIZED,
//     createdAt: now(),
//     updatedAt: now(),
//     // 커스텀 뜻: 사전엔 "제공자"라고 되어있지만, 개발 맥락으로 수정
//     customMeanings: { [Language.KO]: "서버 (백엔드 API)" },
//   },
//   {
//     id: "item-fe-2",
//     wordBookId: "book-frontend",
//     termId: "term-en-client",
//     status: MemorizationStatus.MEMORIZED,
//     createdAt: now(),
//     updatedAt: now(),
//     customMeanings: { [Language.KO]: "클라이언트 (브라우저/앱)" },
//   },
//   {
//     id: "item-fe-3",
//     wordBookId: "book-frontend",
//     termId: "term-en-bug",
//     status: MemorizationStatus.CONFUSED,
//     createdAt: now(),
//     updatedAt: now(),
//     customMeanings: { [Language.KO]: "버그 (기능 오류)" },
//   },
//   {
//     id: "item-fe-4",
//     wordBookId: "book-frontend",
//     termId: "term-en-deploy",
//     status: MemorizationStatus.UNKNOWN,
//     createdAt: now(),
//     updatedAt: now(),
//     customMeanings: { [Language.KO]: "배포하다 (Vercel에 올리기)" },
//   },

//   // --- [책: 토익 RC] (일반 영어) ---
//   {
//     id: "item-toeic-1",
//     wordBookId: "book-toeic-rc",
//     termId: "term-en-confirm",
//     status: MemorizationStatus.MEMORIZED,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "item-toeic-2",
//     wordBookId: "book-toeic-rc",
//     termId: "term-en-schedule",
//     status: MemorizationStatus.CONFUSED,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "item-toeic-3",
//     wordBookId: "book-toeic-rc",
//     termId: "term-en-run",
//     status: MemorizationStatus.UNKNOWN,
//     createdAt: now(),
//     updatedAt: now(),
//     customMeanings: { [Language.KO]: "운영하다 (회사를)" },
//   }, // Run을 '달리다'가 아닌 '운영하다'로 외움

//   // --- [책: 매일매일 영단어] (기초 단어들) ---
//   {
//     id: "item-daily-1",
//     wordBookId: "book-daily",
//     termId: "term-en-apple",
//     status: MemorizationStatus.MEMORIZED,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "item-daily-2",
//     wordBookId: "book-daily",
//     termId: "term-en-banana",
//     status: MemorizationStatus.MEMORIZED,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "item-daily-3",
//     wordBookId: "book-daily",
//     termId: "term-en-coffee",
//     status: MemorizationStatus.MEMORIZED,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "item-daily-4",
//     wordBookId: "book-daily",
//     termId: "term-en-water",
//     status: MemorizationStatus.CONFUSED,
//     createdAt: now(),
//     updatedAt: now(),
//   },

//   // --- [책: JLPT N3] (일본어) ---
//   {
//     id: "item-jlpt-1",
//     wordBookId: "book-jlpt-n3",
//     termId: "term-ja-neko",
//     status: MemorizationStatus.MEMORIZED,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "item-jlpt-2",
//     wordBookId: "book-jlpt-n3",
//     termId: "term-ja-inu",
//     status: MemorizationStatus.UNKNOWN,
//     createdAt: now(),
//     updatedAt: now(),
//   },
//   {
//     id: "item-jlpt-3",
//     wordBookId: "book-jlpt-n3",
//     termId: "term-ja-arigato",
//     status: MemorizationStatus.MEMORIZED,
//     createdAt: now(),
//     updatedAt: now(),
//   },
// ];

// // =========================================================
// // ⚡ Logic: 조인해서 UI용 데이터 만들기
// // =========================================================

// // // 1. 모든 폴더 가져오기
// // export const getFolders = async () => {
// //   return new Promise<Folder[]>((resolve) => {
// //     setTimeout(() => resolve(MOCK_FOLDERS), 300);
// //   });
// // };

// // // 2. 최상위(Root) 폴더만 가져오기
// // export const getRootFolders = async () => {
// //   return new Promise<Folder[]>((resolve) => {
// //     setTimeout(() => {
// //       // 🟢 핵심: parentId가 null인 것만 필터링!
// //       const rootFolders = MOCK_FOLDERS.filter((f) => !f.parentId);
// //       resolve(rootFolders);
// //     }, 300);
// //   });
// // };

// // // 3. 특정 폴더 안에 있는 단어장만 가져오기
// // export const getBooksInFolder = async (folderId: string) => {
// //   return new Promise<WordBook[]>((resolve) => {
// //     setTimeout(() => {
// //       const books = MOCK_WORD_BOOKS.filter((b) => b.folderId === folderId);
// //       resolve(books);
// //     }, 300);
// //   });
// // };

// // // 4. 폴더 없는(최상위) 단어장만 가져오기
// // export const getRootBooks = async () => {
// //   return new Promise<WordBook[]>((resolve) => {
// //     setTimeout(() => {
// //       const books = MOCK_WORD_BOOKS.filter((b) => !b.folderId);
// //       resolve(books);
// //     }, 300);
// //   });
// // };

// // // 5. 특정 폴더 1개 상세 정보 가져오기
// // export const getFolderDetail = async (folderId: string) => {
// //   return new Promise<Folder | undefined>((resolve) => {
// //     setTimeout(() => {
// //       const folder = MOCK_FOLDERS.find((f) => f.id === folderId);
// //       resolve(folder);
// //     }, 300);
// //   });
// // };

// // // 6. 특정 폴더의 하위 폴더들 가져오기 (Depth N 지원)
// // export const getSubFolders = async (parentId: string) => {
// //   return new Promise<Folder[]>((resolve) => {
// //     setTimeout(() => {
// //       const folders = MOCK_FOLDERS.filter((f) => f.parentId === parentId);
// //       resolve(folders);
// //     }, 300);
// //   });
// // };

// // /**
// //  * 🗄️ (보너스) 루트에 있는 '폴더 없는 단어장'들만 가져오기
// //  * - 트리에 포함되지 않은, 최상위 단어장들을 보여줄 때 사용
// //  */
// // export const getRootBooks = async (): Promise<WordBook[]> => {
// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       resolve(MOCK_WORD_BOOKS.filter((b) => b.folderId === null));
// //     }, 200);
// //   });
// // };

// /**
//  * 📚 내 모든 단어장 가져오기 (폴더 구분 없이 전체 조회)
//  * - 용도: 대시보드, 전체 검색, 최근 학습한 단어장 리스트
//  */
// export const getAllMyWordBooks = async (): Promise<WordBook[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // 실제 앱에서는 로그인한 사용자 ID(예: 'user-1')로 필터링
//       const myBooks = MOCK_WORD_BOOKS.filter((b) => b.ownerId === "user-1");

//       // (선택사항) 최신순 정렬 등을 여기서 처리할 수도 있음
//       // myBooks.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

//       resolve(myBooks);
//     }, 300);
//   });
// };

// /**
//  * 📚 특정 단어장의 단어들 가져오기
//  * - 용도: 단어장 상세 화면, 단어장 내 학습 화면
//  */
// export const getWordsInBookWithJoin = async (bookId: string) => {
//   return new Promise<WordViewItem[] | []>((resolve) => {
//     setTimeout(() => {
//       // 1. 단어장 정보 (TargetLang 확인용)
//       const book = MOCK_WORD_BOOKS.find((b) => b.id === bookId);
//       if (!book) return resolve([]);

//       // 2. 내 아이템 필터링
//       const myItems = MOCK_WORD_ITEMS.filter(
//         (item) => item.wordBookId === bookId
//       );

//       // 3. 데이터 조인 (Term + Meaning + Custom)
//       const joinedData = myItems
//         .map((item): WordViewItem | null => {
//           // A. Term(질문) 찾기
//           const term = MOCK_TERMS.find((t) => t.id === item.termId);
//           if (!term) return null;

//           // B. Meaning(정답) 찾기 - 단어장 타겟 언어 기준
//           const dictEntry = MOCK_MEANINGS.find(
//             (m) => m.termId === term.id && m.language === book.defaultTargetLang
//           );

//           // C. 커스텀 뜻 조회 (Record 방식)
//           // ✨ "현재 단어장 언어(KO)"에 맞는 커스텀 뜻이 있는지 확인
//           const myCustomMeaning = item.customMeanings?.[book.defaultTargetLang];

//           // D. 최종 보여줄 뜻 결정 (우선순위: 커스텀 > 사전 > 없음)
//           const displayMeaning =
//             myCustomMeaning ?? dictEntry?.meaning ?? "(뜻 데이터 없음)";

//           return {
//             itemId: item.id,
//             termId: term.id,
//             word: term.word, // 화면 표시: Apple
//             meaning: displayMeaning, // 화면 표시: 사과 or 핑궈 or 작동하다
//             pronunciation: term.pronunciation,
//             exampleSentence: dictEntry?.exampleSentence,
//             status: item.status,
//             tags: term.tags,
//           };
//         })
//         .filter((item): item is WordViewItem => item !== null);

//       resolve(joinedData);
//     }, 500); // 로딩 시뮬레이션
//   });
// };

// // =========================================================
// // ⚡ Logic: DB 데이터를 FolderDetail 트리로 변환
// // =========================================================

// /**
//  * 🌳 전체 폴더 구조를 트리 형태로 반환 (사이드바 메뉴용)
//  * - DB의 Flat한 데이터를 재귀적으로 조립하여 FolderDetail[]로 만듭니다.
//  */
// export const getFolderTree = async (): Promise<FolderDetail[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // 재귀(Recursive) 함수: 특정 부모 ID를 가진 폴더들을 찾아 트리를 만듦
//       const buildTree = (currentParentId: string | null): FolderDetail[] => {
//         // 1. 현재 레벨의 폴더 찾기
//         const childrenFolders = MOCK_FOLDERS.filter(
//           (f) => f.parentId === currentParentId
//         );

//         // 2. FolderDetail 형태로 변환 (map)
//         return childrenFolders.map((folder) => {
//           // 해당 폴더에 속한 단어장 찾기
//           const myBooks = MOCK_WORD_BOOKS.filter(
//             (b) => b.folderId === folder.id
//           );

//           // ✨ 재귀 호출: 내 자식 폴더들도 똑같이 빌드함
//           const mySubFolders = buildTree(folder.id);

//           return {
//             ...folder, // 기존 Folder 속성 (id, name, parentId...)
//             wordbooks: myBooks, // 📘 단어장 리스트 채우기
//             subFolders: mySubFolders, // 📂 하위 폴더 리스트 채우기
//           };
//         });
//       };

//       // 루트(null)부터 시작해서 트리 생성
//       const rootTree = buildTree(null);
//       resolve(rootTree);
//     }, 300); // 로딩 시뮬레이션
//   });
// };

// // =========================================================
// // ⚡ [추가] 특정 폴더 내부(메인 화면 리스트용) 데이터 가져오기
// // =========================================================
// export const getFolderContents = async (folderId: string | null) => {
//   return new Promise<{
//     currentFolder?: Folder; // 현재 폴더 정보 (이름, 이모지 등)
//     subFolders: Folder[]; // 하위 폴더들
//     wordbooks: WordBook[]; // 포함된 단어장들
//   }>((resolve) => {
//     setTimeout(() => {
//       // 1. 현재 폴더 정보 (루트면 undefined)
//       const currentFolder = folderId
//         ? MOCK_FOLDERS.find((f) => f.id === folderId)
//         : undefined;

//       // 2. 하위 폴더들 (parentId가 일치하는 것)
//       const subFolders = MOCK_FOLDERS.filter(
//         (f) => f.parentId === (folderId || null)
//       );

//       // 3. 포함된 단어장들 (folderId가 일치하는 것)
//       const wordbooks = MOCK_WORD_BOOKS.filter(
//         (b) => b.folderId === (folderId || null)
//       );

//       resolve({ currentFolder, subFolders, wordbooks });
//     }, 300);
//   });
// };
