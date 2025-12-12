import { ParentsLessonsService } from "@learninboard/api";
import {
  FindParentsTutoringLessonSchedulesRequest,
  GetLessonDetailResponseDto,
  PaginatedGetLessonDetailResponseDto,
  TeachersDto,
} from "@learninboard/types";
import { QUERY_KEY } from "@learninboard/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { CustomQueryOptions } from "../lib/types";

const useGetLessonsParents = <TData = PaginatedGetLessonDetailResponseDto>(
  studentId: string,
  request: FindParentsTutoringLessonSchedulesRequest,
  options?: CustomQueryOptions<PaginatedGetLessonDetailResponseDto, TData>,
  queryKey?: readonly unknown[],
) => {
  const {
    lessonStatus,
    lessonType,
    teacherId,
    isAssignmentSubmitted,
    startDateTime,
    endDateTime,
    hasDailyReport,
    paginationDto,
  } = request;

  return useQuery<PaginatedGetLessonDetailResponseDto, Error, TData>({
    queryKey: queryKey || [
      QUERY_KEY.PARENTS.LESSONS.LIST(studentId, startDateTime, endDateTime),
    ],
    queryFn: () =>
      ParentsLessonsService.getStudentLessons(
        lessonStatus,
        lessonType,
        teacherId,
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

const useGetHomeworkLessonsParents = <
  TData = PaginatedGetLessonDetailResponseDto,
>(
  studentId: string,
  request: FindParentsTutoringLessonSchedulesRequest,
  options?: CustomQueryOptions<PaginatedGetLessonDetailResponseDto, TData>,
) => {
  const {
    lessonStatus,
    lessonType,
    teacherId,
    isAssignmentSubmitted,
    startDateTime,
    endDateTime,
    hasDailyReport,
    paginationDto,
  } = request;
  return useQuery<PaginatedGetLessonDetailResponseDto, Error, TData>({
    queryKey: [
      QUERY_KEY.PARENTS.HOMEWORK_LESSONS.LIST(
        studentId,
        isAssignmentSubmitted,
        teacherId ?? "",
        paginationDto.page,
        paginationDto.itemsPerPage,
      ),
    ],
    queryFn: () =>
      ParentsLessonsService.getStudentLessons(
        lessonStatus,
        lessonType,
        teacherId,
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

const useGetLessonParents = <TData = GetLessonDetailResponseDto>(
  studentId: string,
  lessonId: number,
  options?: CustomQueryOptions<GetLessonDetailResponseDto, TData>,
) => {
  return useQuery<GetLessonDetailResponseDto, Error, TData>({
    queryKey: [QUERY_KEY.PARENTS.LESSONS.DETAIL(studentId, lessonId)],
    queryFn: () => ParentsLessonsService.getStudentLesson(studentId, lessonId),
    ...options,
  });
};

const useGetLastClassFeedbackParents = <
  TData = PaginatedGetLessonDetailResponseDto,
>(
  studentId: string,
  request: FindParentsTutoringLessonSchedulesRequest,
  options?: CustomQueryOptions<PaginatedGetLessonDetailResponseDto, TData>,
) => {
  const {
    lessonStatus,
    lessonType,
    teacherId,
    isAssignmentSubmitted,
    startDateTime,
    endDateTime,
    hasDailyReport,
    paginationDto,
  } = request;

  return useQuery<PaginatedGetLessonDetailResponseDto, Error, TData>({
    queryKey: [
      QUERY_KEY.PARENTS.LAST_CLASS_FEEDBACK.LIST(studentId, !!hasDailyReport),
    ],
    queryFn: () =>
      ParentsLessonsService.getStudentLessons(
        lessonStatus,
        lessonType,
        teacherId,
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

const useFindParentsStudentTutoringLessonScheduleTutors = <TData = TeachersDto>(
  options?: CustomQueryOptions<TeachersDto, TData>,
) => {
  return useQuery<TeachersDto, Error, TData>({
    queryKey: [QUERY_KEY.PARENTS.LESSONS.TEACHERS],
    queryFn: () => ParentsLessonsService.getLessonTeachers(),
    ...options,
  });
};

export {
  useGetLessonsParents,
  useGetLessonParents,
  useGetHomeworkLessonsParents,
  useGetLastClassFeedbackParents,
  useFindParentsStudentTutoringLessonScheduleTutors,
};
