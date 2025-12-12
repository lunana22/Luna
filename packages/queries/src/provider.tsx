"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./lib/query-client";

export default function QueryProviders({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 필요 시 devtools */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
