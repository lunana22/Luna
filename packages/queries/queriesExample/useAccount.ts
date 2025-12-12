import { AccountService } from "@learninboard/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@learninboard/utils/constants";
import { AnyMeDto, UserRole } from "@learninboard/types";

const useGetMe = (role: UserRole | "PENDING", enabled: boolean) => {
  return useQuery<AnyMeDto>({
    queryKey: [QUERY_KEY.AUTH.ME, role],
    queryFn: async () => {
      const fn =
        role === UserRole.PARENT
          ? AccountService.getParentMe
          : role === UserRole.STUDENT
            ? AccountService.getStudentMe
            : AccountService.getTeacherMe;
      return fn() as unknown as Promise<AnyMeDto>; // toPromise() 써도 됨
    },
    retry: false,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    enabled,
  });
};
const useAccount = () => {
  return {
    useGetMe,
  };
};
export { useAccount };
