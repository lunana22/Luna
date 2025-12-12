import { clientConfig } from "@learninboard/utils";
import type { ApiRequestOptions } from "./ApiRequestOptions";
import { COOKIES_KEY } from "@learninboard/utils/constants";
import Cookies from "js-cookie";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: "include" | "omit" | "same-origin";
  TOKEN?: string | Resolver<string>;
  USERNAME?: string | Resolver<string>;
  PASSWORD?: string | Resolver<string>;
  HEADERS?: Headers | Resolver<Headers>;
  ENCODE_PATH?: (path: string) => string;
};

export const OpenAPI: OpenAPIConfig = {
  BASE: getBaseUrl(),
  VERSION: "1.0.0",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN: async () => Cookies.get(COOKIES_KEY.ACCESS_TOKEN) ?? "",
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // 브라우저 환경
    if (window.location.hostname.includes("admin")) {
      return clientConfig.adminApiUrl;
    }
    return clientConfig.apiUrl;
  }

  // 서버 환경 (예: 도메인 기반 분기)
  const host = clientConfig.deployHost ?? "";
  if (host.includes("admin")) {
    return clientConfig.adminApiUrl;
  }
  return clientConfig.apiUrl;
}
