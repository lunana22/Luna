/** 사용 예시 */

// import { createStorage } from "./localStorage";
// import { STORAGE_KEY } from "../constants/storageKey";

// // 1) 로컬스토리지에 사용자 토큰 저장 (7일 TTL)
// const userToken = createStorage<string>(STORAGE_KEY.USER_TOKEN, "local", {
//   ttl: 7 * 24 * 60 * 60 * 1000,
// });

// const userFcmToken = createStorage<string>(
//   STORAGE_KEY.USER_FCM_TOKEN,
//   "local",
//   {
//     ttl: 7 * 24 * 60 * 60 * 1000,
//   }
// );

// const sidebarCollapsed = createStorage<boolean>(
//   STORAGE_KEY.SIDEBAR_COLLAPSED,
//   "local",
//   {
//     defaultValue: false,
//   }
// );

// const currentStudentId = createStorage<string | null>(
//   STORAGE_KEY.CURRENT_STUDENT_ID,
//   "local",
//   {
//     defaultValue: null,
//   }
// );

export const storageStore = {
  // userToken,
  // userFcmToken,
  // sidebarCollapsed,
  // currentStudentId,
};
