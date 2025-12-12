"use client";
import { QueryClient } from "@tanstack/react-query";

let browserClient: QueryClient | null = null;

export function getQueryClient() {
  // HMR/리렌더 대응: 브라우저에서 단일 인스턴스 유지
  if (!browserClient) {
    browserClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 30,
          refetchOnWindowFocus: false,
          retry: 3,
        },
      },
    });
  }
  return browserClient;
}
