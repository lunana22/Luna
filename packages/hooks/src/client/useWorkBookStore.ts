// // import { useQuery } from "@tanstack/react-query";
// import { useWorkBookStore } from "@luna/stores"; // 아까 만든 Zustand
// import { useGetWorkBooks } from "@luna/queries";

// export const useWordBooks = (userId?: string | null) => {
//   // 1. 로컬 스토리지 데이터 가져오기 (Zustand)
//   const localWordBooks = useWorkBookStore((state) => state.workbooks);
//   const { data: serverWordBooks, isLoading } = useGetWorkBooks(
//     {
//       enabled: !!userId,
//     },
//     [userId]
//   );

//   // 로그인 상태라면 서버 데이터를, 아니면 로컬 데이터를 리턴
//   if (userId) {
//     return {
//       data: serverWordBooks || [],
//       isLoading,
//       isGuest: false,
//     };
//   }

//   return {
//     data: localWordBooks,
//     isLoading: false,
//     isGuest: true,
//   };
// };
