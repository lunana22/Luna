import type {
  GetLessonDetailResponseDto,
  LessonStatus,
  LessonType,
  PaginatedGetLessonDetailResponseDto,
  TeachersDto,
} from "@learninboard/types";

import { ENDPOINTS } from "@learninboard/utils/constants";
import { CancelablePromise } from "../core/CancelablePromise";
import { parentsRequest } from "../core/parentsRequest";

class ParentsLessonsService {
  public static getStudentLessons(
    lessonStatus?: Array<LessonStatus>,
    lessonType?: Array<LessonType>,
    teacherId?: number,
    isAssignmentSubmitted?: boolean,
    startDateTime?: string,
    endDateTime?: string,
    hasDailyReport?: boolean,
    page: number = 1,
    itemsPerPage: number = 30,
    direction = "asc",
  ): CancelablePromise<PaginatedGetLessonDetailResponseDto> {
    return parentsRequest({
      method: "GET",
      url: ENDPOINTS.PARENTS.STUDENTS.LESSONS.LIST,
      query: {
        lessonStatus,
        lessonType,
        teacherId,
        isAssignmentSubmitted,
        startDateTime,
        endDateTime,
        hasDailyReport,
        page,
        itemsPerPage,
        direction,
      },
    });
  }
  public static getStudentLesson(
    studentId: string,
    lessonId: number,
  ): CancelablePromise<GetLessonDetailResponseDto> {
    return parentsRequest({
      method: "GET",
      url: ENDPOINTS.PARENTS.STUDENTS.LESSONS.DETAIL,
      path: {
        studentId,
        lessonId,
      },
    });
  }

  public static getLessonTeachers(): CancelablePromise<TeachersDto> {
    return parentsRequest({
      method: "GET",
      url: ENDPOINTS.PARENTS.STUDENTS.LESSONS.TEACHERS,
    });
  }
}

export { ParentsLessonsService };
