// 공용 React Query 옵션 유틸
import type { UseQueryOptions } from "@tanstack/react-query";

export type CustomQueryOptions<TQueryFnData, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, Error, TData>,
  "queryKey" | "queryFn"
>;
