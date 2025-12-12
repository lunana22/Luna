import { ELearninBoardService } from "@learninboard/api";
import { useRouter } from "@learninboard/i18n-config/routing";
import { useMutation } from "@tanstack/react-query";
export const useElearninboardLoginAsStudent = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => ELearninBoardService.LoginAsStudent(),
    onError: (error) => {
      router.push("/dashboard");
    },
  });
};
