import { useQuery } from "@tanstack/react-query";
import {
  FindTeacherTutoringLessonSchedulesRequest,
  PaginatedGetLessonDetailResponseDto,
  StudentsDto,
  TeacherMonthlyPayrollResponseDto,
} from "@learninboard/types";
import { CustomQueryOptions } from "../lib/types";
import { QUERY_KEY } from "@learninboard/utils/constants";
import { TeacherLessonsService } from "@learninboard/api";

export const useGetLessonsTeacher = <
  TData = PaginatedGetLessonDetailResponseDto,
>(
  request: FindTeacherTutoringLessonSchedulesRequest,
  options?: CustomQueryOptions<PaginatedGetLessonDetailResponseDto, TData>,
  queryKey?: readonly unknown[],
) => {
  const {
    lessonStatus,
    lessonType,
    studentId,
    isAssignmentSubmitted,
    startDateTime,
    endDateTime,
    hasDailyReport,
    paginationDto,
  } = request;

  return useQuery<PaginatedGetLessonDetailResponseDto, Error, TData>({
    queryKey: queryKey || [QUERY_KEY.TEACHERS.LESSONS.LIST(lessonStatus)],
    queryFn: () =>
      TeacherLessonsService.getLessons(
        lessonStatus,
        lessonType,
        studentId,
        isAssignmentSubmitted,
        startDateTime,
        endDateTime,
        hasDailyReport,
        paginationDto.page,
        paginationDto.itemsPerPage,
      ),
    ...options,
  });
};

export const useGetHomeworkLessonsTeacher = <
  TData = PaginatedGetLessonDetailResponseDto,
>(
  request: FindTeacherTutoringLessonSchedulesRequest,
  options?: CustomQueryOptions<PaginatedGetLessonDetailResponseDto, TData>,
) => {
  const {
    lessonStatus,
    lessonType,
    studentId,
    isAssignmentSubmitted,
    startDateTime,
    endDateTime,
    hasDailyReport,
    paginationDto,
  } = request;

  return useQuery<PaginatedGetLessonDetailResponseDto, Error, TData>({
    queryKey: [
      QUERY_KEY.TEACHERS.HOMEWORK_LESSONS.LIST(
        studentId,
        isAssignmentSubmitted,
        paginationDto.page,
        paginationDto.itemsPerPage,
      ),
    ],
    queryFn: () =>
      TeacherLessonsService.getLessons(
        lessonStatus,
        lessonType,
        studentId,
        isAssignmentSubmitted,
        startDateTime,
        endDateTime,
        hasDailyReport,
        paginationDto.page,
        paginationDto.itemsPerPage,
      ),
    ...options,
  });
};

export const useGetLessonsTodayTeacher = <
  TData = PaginatedGetLessonDetailResponseDto,
>(
  request: FindTeacherTutoringLessonSchedulesRequest,
  options?: CustomQueryOptions<PaginatedGetLessonDetailResponseDto, TData>,
) => {
  const {
    lessonStatus,
    lessonType,
    studentId,
    isAssignmentSubmitted,
    startDateTime,
    endDateTime,
    hasDailyReport,
    paginationDto,
  } = request;

  return useQuery<PaginatedGetLessonDetailResponseDto, Error, TData>({
    queryKey: [QUERY_KEY.TEACHERS.LESSONS.TODAY],
    queryFn: () =>
      TeacherLessonsService.getLessons(
        lessonStatus,
        lessonType,
        studentId,
        isAssignmentSubmitted,
        startDateTime,
        endDateTime,
        hasDailyReport,
        paginationDto.page,
        paginationDto.itemsPerPage,
      ),
    ...options,
  });
};

export const useGetUnwrittenDayilyReportTeacher = <
  TData = PaginatedGetLessonDetailResponseDto,
>(
  request: FindTeacherTutoringLessonSchedulesRequest,
  options?: CustomQueryOptions<PaginatedGetLessonDetailResponseDto, TData>,
) => {
  const {
    lessonStatus,
    lessonType,
    studentId,
    isAssignmentSubmitted,
    startDateTime,
    endDateTime,
    hasDailyReport,
    paginationDto,
  } = request;

  return useQuery<PaginatedGetLessonDetailResponseDto, Error, TData>({
    queryKey: [QUERY_KEY.TEACHERS.LESSONS.DAILY_REPORT(hasDailyReport)],
    queryFn: () =>
      TeacherLessonsService.getLessons(
        lessonStatus,
        lessonType,
        studentId,
        isAssignmentSubmitted,
        startDateTime,
        endDateTime,
        hasDailyReport,
        paginationDto.page,
        paginationDto.itemsPerPage,
      ),
    ...options,
  });
};

export const useGetMonthlyPayrollsTeacher = <
  TData = TeacherMonthlyPayrollResponseDto,
>(
  options?: CustomQueryOptions<TeacherMonthlyPayrollResponseDto, TData>,
) => {
  return useQuery<TeacherMonthlyPayrollResponseDto, Error, TData>({
    queryKey: [QUERY_KEY.TEACHERS.PAYROLLS.MONTHLY_LIST],
    queryFn: () => TeacherLessonsService.getMonthlyPayrolls(),
    ...options,
  });
};

export const useFindTeacherTutoringLessonScheduleStudents = <
  TData = StudentsDto,
>(
  options?: CustomQueryOptions<StudentsDto, TData>,
) => {
  return useQuery<StudentsDto, Error, TData>({
    queryKey: [QUERY_KEY.TEACHERS.LESSONS.TEACHERS],
    queryFn: () => TeacherLessonsService.getLessonStudents(),
    ...options,
  });
};
