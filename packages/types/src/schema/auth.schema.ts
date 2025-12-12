import * as yup from "yup";

//TODO: 로케일링 추가
import { useTranslations } from "next-intl";

export const loginSchema = () => {
  const t = useTranslations("auth");
  return yup.object({
    email: yup
      .string()
      .required(t("login.email.validation.1"))
      .email(t("login.email.validation.2"))
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("login.email.validation.2"),
      ),
    password: yup.string().min(6, t("login.password.validation.1")),
  });
};

export type LoginSchema = ReturnType<typeof loginSchema>;
