const WORKBOOK = {
  /**
   * 소유한 모든 단어장
   */
  ALL: ["workbook", "root-books"],
  /**
   * 단어장 -> 단어 목록 조회
   */
  DETAIL: (bookId: string) => ["workbook", "detail", bookId],
};

const FOLDER = {
  /**
   * 전체 폴더 트리 조회
   */
  TREE: () => ["folder", "tree"],
  /**
   * 선택한 폴더 -> 폴더 내용 조회
   */
  DETAIL: (folderId: string) => ["folder", "detail", folderId],
};
// const PARENTS = {
//   MY_CHILDREN: ["parents", "my-children"],
//   STUDENT: (studentId: string) => ["parents", "student", studentId],
//   LESSONS: {
//     LIST: (studentId: string, startDateTime: string, endDateTime: string) => [
//       "parents",
//       "lessons",
//       studentId,
//       startDateTime,
//       endDateTime,
//     ],
//     DETAIL: (studentId: string, lessonId: number) => [
//       "parents",
//       "lessons",
//       studentId,
//       lessonId,
//     ],
//     TEACHERS: ["students", "lessons", "parents-teachers"],
//   },
//   HOMEWORK_LESSONS: {
//     LIST: (
//       studentId: string,
//       isAssignmentSubmitted: boolean,
//       teacherId: string | number,
//       page: number,
//       itemsPerPage: number
//     ) => [
//       "parents",
//       "homework-lessons",
//       studentId,
//       isAssignmentSubmitted,
//       teacherId,
//       page,
//       itemsPerPage,
//     ],
//   },
//   LAST_CLASS_FEEDBACK: {
//     LIST: (studentId: string, hasDailyReport: boolean) => [
//       "parents",
//       "last-class-feedback",
//       studentId,
//       hasDailyReport,
//     ],
//   },
// };

// const STUDENTS = {
//   LESSONS: (startDateTime: string, endDateTime: string) => [
//     "students",
//     "lessons",
//     startDateTime,
//     endDateTime,
//   ],
//   HOMEWORK_LESSONS: (
//     isAssignmentSubmitted: boolean,
//     teacherId: string | number,
//     page: number,
//     itemsPerPage: number
//   ) => [
//     "students",
//     "homework-lessons",
//     isAssignmentSubmitted,
//     teacherId,
//     page,
//     itemsPerPage,
//   ],
//   TEACHERS: ["students", "lessons", "students-teachers"],
// };

// const CONTENTS = {
//   BLOG: ["contents", "blog"],
//   YOUTUBE: ["contents", "youtube"],
// };

// const TEACHERS = {
//   LESSONS: {
//     LIST: (lessonStatus: Array<string>) => [
//       "teachers",
//       "lessons",
//       lessonStatus,
//     ],
//     TODAY: ["teachers", "lessons", "today"],
//     DAILY_REPORT: (hasDailyReport: boolean) => [
//       "teachers",
//       "lessons",
//       "daily-report",
//       hasDailyReport,
//     ],
//     TEACHERS: ["teachers", "lessons", "students"],
//   },
//   HOMEWORK_LESSONS: {
//     LIST: (
//       studentId: string | number,
//       isAssignmentSubmitted: boolean,
//       page: number,
//       itemsPerPage: number
//     ) => [
//       "teachers",
//       "homework-lessons",
//       studentId,
//       isAssignmentSubmitted,
//       page,
//       itemsPerPage,
//     ],
//   },
//   LESSON: (lessonId: number) => ["teachers", "lesson", lessonId],
//   PAYROLLS: {
//     MONTHLY_LIST: ["teachers", "payrolls", "monthly-list"],
//     DETAIL: (teacherMonthlyPayrollId: number) => [
//       "teachers",
//       "payrolls",
//       "monthly-list",
//       teacherMonthlyPayrollId,
//     ],
//   },
//   RESCHEDULE_USAGE: ["teachers", "reschedule-usage"],
// };

const FILE_NODE = {
  /**
   * 전체 파일 트리 조회
   */
  TREE: ["file-node", "tree"],
  /**
   * 선택한 폴더 -> 폴더 내용 조회
   */
  FOLDER_CONTENTS: (folderId: string | null) => [
    "file-node",
    "folder-contents",
    folderId,
  ],
  /**
   * 내 모든 단어장 가져오기
   */
  ALL_MY_DECKS: (userId: string) => ["file-node", "all-my-decks", userId],
};

const STUDY_ITEM = {
  /**
   * 특정 단어장(Deck) 안의 아이템들 가져오기
   */
  IN_DECK: (deckId: string) => ["study-item", "in-deck", deckId],
};

export const QUERY_KEY = {
  WORKBOOK,
  FOLDER,
  FILE_NODE,
  STUDY_ITEM,
};
