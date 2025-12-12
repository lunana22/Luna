// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { WordBook } from "@luna/types";

// // 내 스토어 타입
// interface WorkBookState {
//   workbooks: WordBook[];
//   setWorkBooks: (workbooks: WordBook[]) => void;
// }

// export const useWorkBookStore = create<WorkBookState>()(
//   // ✨ persist로 감싸기 시작
//   persist(
//     (set) => ({
//       workbooks: [],
//       setWorkBooks: (workbooks: WordBook[]) => set({ workbooks }),
//     }),
//     {
//       name: "workbook-storage",
//       storage: createJSONStorage(
//         () =>
//           // 💡 웹이면 localStorage, 앱이면 AsyncStorage 자동 선택되게 분기 처리 가능
//           typeof window !== "undefined" ? localStorage : undefined
//         // typeof window !== 'undefined' ? localStorage : AsyncStorage
//       ),
//     }
//   )
// );
