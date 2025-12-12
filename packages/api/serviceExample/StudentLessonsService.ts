import { ENDPOINTS } from "@learninboard/utils/constants";
import { CancelablePromise } from "../core/CancelablePromise";
import { request } from "../core/request";
import {
  GetLessonDetailResponseDto,
  LessonStatus,
  LessonType,
  PaginatedGetLessonDetailResponseDto,
  TeachersDto,
} from "@learninboard/types";
import { OpenAPI } from "../core/OpenAPI";

class StudentLessonsService {
  public static getLessons(
    lessonStatus?: Array<LessonStatus>,
    lessonType?: Array<LessonType>,
    teacherId?: number,
    isAssignmentSubmitted?: boolean,
    startDateTime?: string,
    endDateTime?: string,
    page: number = 1,
    itemsPerPage: number = 30,
    direction = "asc",
  ): CancelablePromise<PaginatedGetLessonDetailResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.STUDENTS.LESSONS.LIST,
      query: {
        lessonStatus,
        lessonType,
        teacherId,
        isAssignmentSubmitted,
        startDateTime,
        endDateTime,
        page,
        itemsPerPage,
        direction,
      },
    });
  }
  public static getLesson(
    lessonId: number,
  ): CancelablePromise<GetLessonDetailResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.STUDENTS.LESSONS.DETAIL,
      path: {
        lessonId,
      },
    });
  }
  public static getLessonTeachers(): CancelablePromise<TeachersDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.STUDENTS.LESSONS.TEACHERS,
    });
  }
}

export { StudentLessonsService };
