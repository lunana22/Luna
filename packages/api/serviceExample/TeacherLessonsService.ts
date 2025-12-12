import { ENDPOINTS } from "@learninboard/utils/constants";
import { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request } from "../core/request";
import {
  GetLessonDetailResponseDto,
  LessonStatus,
  GetLessonDateTimeUpdatableCountResponseDto,
  TeacherMonthlyPayrollResponseDto,
  PaginatedGetLessonDetailResponseDto,
  LessonType,
  StudentsDto,
} from "@learninboard/types";

class TeacherLessonsService {
  public static getLessons(
    lessonStatus?: Array<LessonStatus>,
    lessonType?: Array<LessonType>,
    studentId?: number,
    isAssignmentSubmitted?: boolean,
    startDateTime?: string,
    endDateTime?: string,
    hasDailyReport?: boolean,
    page: number = 1,
    itemsPerPage: number = 30,
    direction = "asc",
  ): CancelablePromise<PaginatedGetLessonDetailResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.TEACHERS.LESSONS.LIST,
      query: {
        lessonStatus,
        lessonType,
        studentId,
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
  public static getLesson(
    lessonId: number,
  ): CancelablePromise<GetLessonDetailResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.TEACHERS.LESSONS.DETAIL,
      path: {
        lessonId,
      },
    });
  }

  public static getRescheduleUsage(): CancelablePromise<GetLessonDateTimeUpdatableCountResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.TEACHERS.LESSONS.RESCHEDULE_USAGE,
    });
  }

  public static getMonthlyPayrolls(): CancelablePromise<TeacherMonthlyPayrollResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.TEACHERS.PAYROLLS.MONTHLY_LIST,
    });
  }
  public static getMonthlyPayroll(
    teacherMonthlyPayrollId: number,
  ): CancelablePromise<TeacherMonthlyPayrollResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.TEACHERS.PAYROLLS.DETAIL,
      path: {
        teacherMonthlyPayrollId: teacherMonthlyPayrollId,
      },
    });
  }

  public static getLessonStudents(): CancelablePromise<StudentsDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.TEACHERS.LESSONS.STUDENTS,
    });
  }
}

export { TeacherLessonsService };
