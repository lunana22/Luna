import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const DEFAULT_LOCALE = "ko";

export const useAdminLocaleCheck = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = segments[0] || DEFAULT_LOCALE;

    if (currentLocale !== DEFAULT_LOCALE) {
      const restPath = segments.slice(1).join("/");
      const newUrl = `/${DEFAULT_LOCALE}${restPath ? `/${restPath}` : ""}`;
      router.push(newUrl);
    }
  }, [pathname, router]);
};
