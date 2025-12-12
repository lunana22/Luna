import { AuthService } from "@learninboard/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginAsPortalRequestDto } from "@learninboard/types";
import { COOKIES_KEY, QUERY_KEY } from "@learninboard/utils/constants";
import Cookies from "js-cookie";
import { useAuthStore } from "@learninboard/stores";
import { useRouter } from "@learninboard/i18n-config/routing";
import { useQueryClient } from "@tanstack/react-query";

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: LoginAsPortalRequestDto) =>
      AuthService.loginWithRoute(body),
    onSuccess: (data) => {
      console.log("login success", data);
      queryClient.invalidateQueries();
      // setHeader("Authorization", `Bearer ${accessToken}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const useLogout = () => {
  const { logout } = useAuthStore.getState();
  const navigate = useRouter();
  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      logout();
      navigate.push("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
const useGetMe = () => {
  const token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
  return useQuery({
    queryKey: QUERY_KEY.AUTH.LOGIN,
    queryFn: () => AuthService.getMe(),
    enabled: !!token,
    retry: false,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
};

const useAuth = () => {
  return {
    loginMutation: useLogin(),
    logoutMutation: useLogout(),
    getMeQuery: useGetMe(),
  };
};
export { useAuth };

// function useSignUp() {
//   return useMutation({
//     mutationFn: postSignup,
//     onSuccess: () => {
//       router.push("/auth/login");
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });
// }

// function useLogin() {
//   return useMutation({
//     mutationFn: postLogin,
//     onSuccess: async ({ accessToken }) => {
//       setHeader("Authorization", `Bearer ${accessToken}`);
//       setSecureStore("accessToken", accessToken);
//       router.push("/");
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });
// }

// function useMe() {
//   const { data, isError } = useQuery({
//     queryKey: ["auth", "get-me"],
//     queryFn: getMe,
//     enabled: !!getSecureStore("accessToken"),
//   });

//   useEffect(() => {
//     if (isError) {
//       removeHeader("Authorization");
//       deleteSecureStore("accessToken");
//     }
//   }, [isError]);

//   return { data };
// }

// function useAuth() {
//   const loginMutation = useLogin();
//   const signUpMutation = useSignUp();
//   const { data } = useMe();
//   return {
//     loginMutation,
//     signUpMutation,
//     auth: {
//       id: data?.id ? data : "",
//     },
//   };
// }

// export default useAuth;
