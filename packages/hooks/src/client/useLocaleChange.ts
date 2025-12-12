import { usePathname, useRouter } from "@luna/i18n/routing";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useLocaleChange = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const currentLocale = (params?.locale as string)?.toUpperCase() ?? "KO"; // ex. "ko" → "KO"
  const [selected, setSelected] = useState<"KO" | "EN">(
    currentLocale as "KO" | "EN"
  );

  useEffect(() => {
    const next = (params?.locale as string)?.toUpperCase() ?? "KO";
    setSelected(next as "KO" | "EN");
  }, [params?.locale]);

  const switchLocale = (next: "KO" | "EN") => {
    const locale = next.toLowerCase(); // "ko" | "en"
    const qs = searchParams.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const href = `${pathname}${qs ? `?${qs}` : ""}${hash}`;
    router.replace(href, { locale });
    setSelected(next);
  };

  return { selected, switchLocale };
};
