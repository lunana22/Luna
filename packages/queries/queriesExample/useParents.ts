import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ParentsService } from "@learninboard/api";
import { QUERY_KEY } from "@learninboard/utils/constants";
import { useEffect } from "react";

export const useGetMyChildren = () => {
  return useQuery({
    queryKey: [QUERY_KEY.PARENTS.MY_CHILDREN],
    queryFn: () => ParentsService.getMyChildren(),
  });
};

export const useGetStudentProfileByParent = (
  studentId: string | null | undefined,
  enabled: boolean,
) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.PARENTS.STUDENT(studentId)],
    queryFn: () => ParentsService.getStudentProfileByParent(),
    enabled,
  });
  useEffect(() => {
    if (query.isSuccess) {
      console.log("invalidateQueries");
      queryClient.invalidateQueries();
    }
  }, [query.isSuccess, query.data]);
  return query;
};
