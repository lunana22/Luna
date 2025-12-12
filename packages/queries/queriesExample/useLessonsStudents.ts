import { useQuery } from "@tanstack/react-query";
import { StudentLessonsService } from "@learninboard/api";
import { QUERY_KEY } from "@learninboard/utils/constants";
import {
  FindStudentTutoringLessonSchedulesRequest,
  PaginatedGetLessonDetailResponseDto,
  TeachersDto,
} from "@learninboard/types";
import { CustomQueryOptions } from "../lib/types";

// queryKey 타입 추출
// type LessonsQueryKey = ReturnType<(typeof QUERY_KEY.STUDENTS)["LESSONS"]>;
// type HomeworkLessonsQueryKey = ReturnType<
//   (typeof QUERY_KEY.STUDENTS)["HOMEWORK_LESSONS"]
// >;

export const useGetLessons = <TData = PaginatedGetLessonDetailResponseDto>(
  request: FindStudentTutoringLessonSchedulesRequest,
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
    paginationDto,
  } = request;

  return useQuery<PaginatedGetLessonDetailResponseDto, Error, TData>({
    queryKey: queryKey || [
      QUERY_KEY.STUDENTS.LESSONS(startDateTime, endDateTime),
    ],
    queryFn: () =>
      StudentLessonsService.getLessons(
        lessonStatus,
        lessonType,
        teacherId,
        isAssignmentSubmitted,
        startDateTime,
        endDateTime,
        paginationDto.page,
        paginationDto.itemsPerPage,
      ),
    ...options,
  });
};

export const useGetHomeworkLessons = <
  TData = PaginatedGetLessonDetailResponseDto,
>(
  request: FindStudentTutoringLessonSchedulesRequest,
  options?: CustomQueryOptions<PaginatedGetLessonDetailResponseDto, TData>,
) => {
  const {
    lessonStatus,
    lessonType,
    teacherId,
    isAssignmentSubmitted,
    startDateTime,
    endDateTime,
    paginationDto,
  } = request;

  return useQuery<PaginatedGetLessonDetailResponseDto, Error, TData>({
    queryKey: [
      QUERY_KEY.STUDENTS.HOMEWORK_LESSONS(
        isAssignmentSubmitted,
        teacherId ?? "",
        paginationDto.page,
        paginationDto.itemsPerPage,
      ),
    ],
    queryFn: () =>
      StudentLessonsService.getLessons(
        lessonStatus,
        lessonType,
        teacherId,
        isAssignmentSubmitted,
        startDateTime,
        endDateTime,
        paginationDto.page,
        paginationDto.itemsPerPage,
      ),
    ...options,
  });
};

export const useFindStudentTutoringLessonScheduleTutors = <TData = TeachersDto>(
  options?: CustomQueryOptions<TeachersDto, TData>,
) => {
  return useQuery<TeachersDto, Error, TData>({
    queryKey: [QUERY_KEY.STUDENTS.TEACHERS],
    queryFn: () => StudentLessonsService.getLessonTeachers(),
    ...options,
  });
};
