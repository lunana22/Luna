import { createSharedI18nMiddleware } from "@luna/i18n/next/middleware-factory";
import type { NextRequest } from "next/server";

const i18n = createSharedI18nMiddleware();

export function middleware(request: NextRequest) {
  return i18n(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
