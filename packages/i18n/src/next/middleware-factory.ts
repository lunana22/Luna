// packages/i18n-config/src/middleware-factory.ts
import createMiddleware from "next-intl/middleware";
import type { LocalePrefix } from "next-intl/routing";

export interface MiddlewareOptions {
  locales: readonly string[];
  defaultLocale: string;
  localePrefix?: LocalePrefix; // 'always' | 'as-needed' 등
}

import type { NextRequest, NextResponse } from "next/server";
import { defaultLocale, supportedLngs, localePrefix } from "../config";

export function makeI18nMiddleware(
  opts: MiddlewareOptions
): (req: NextRequest) => NextResponse {
  const { locales, defaultLocale, localePrefix } = opts;
  return createMiddleware({ locales, defaultLocale, localePrefix });
}

export function createSharedI18nMiddleware(): (
  req: NextRequest
) => NextResponse {
  return createMiddleware({
    locales: supportedLngs,
    defaultLocale,
    localePrefix,
  });
}
