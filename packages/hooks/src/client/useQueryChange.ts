import { usePathname, useRouter } from "@learninboard/i18n-config/routing";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface useQueryChangeProps<T extends string> {
  param: string;
  defaultQuery: T;
  validValues?: T[];
}
export const useQueryChange = <T extends string>({
  defaultQuery,
  param,
  validValues,
}: useQueryChangeProps<T>) => {
  const [selectedTab, setSelectedTab] = useState<T>(defaultQuery);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateQuery = (next: T) => {
    setSelectedTab(next);
    const params = new URLSearchParams(searchParams.toString());
    const isDefault = defaultQuery && next === defaultQuery;

    if (!next || isDefault) {
      params.delete(param);
    } else {
      params.set(param, next);
    }

    const queryString = params.toString();
    const href = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(href, { scroll: false });
  };

  useEffect(() => {
    const raw = searchParams.get(param);

    if (!raw) return;

    setSelectedTab(raw as T);

    if (validValues && !validValues.includes(raw as T)) {
      updateQuery(defaultQuery);
      return;
    }
  }, []);

  return { selectedTab, updateQuery };
};
