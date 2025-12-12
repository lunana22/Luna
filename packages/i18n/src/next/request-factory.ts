// packages/i18n-config/src/request-factory.ts
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, supportedLngs } from "../config";
import type { SupportedLocale } from "../messages-manifest";

// 사용처에서 locales/defaultLocale을 넘길 수 있게 옵션 추가
export function makeRequestConfig(
  loadMessages: (locale: string) => Promise<Record<string, unknown>>,
  opts?: { locales?: readonly string[]; defaultLocale?: string }
) {
  const supported = opts?.locales ?? supportedLngs;
  const fallback = opts?.defaultLocale ?? defaultLocale;

  return getRequestConfig(async ({ locale: explicitLocale, requestLocale }) => {
    const requested =
      typeof explicitLocale === "string" && explicitLocale.length > 0
        ? explicitLocale
        : await requestLocale;

    // 1) locale이 없거나 미지원이면 fallback으로 대체
    const safe =
      typeof requested === "string" && supported.includes(requested)
        ? (requested as SupportedLocale)
        : (fallback as SupportedLocale);

    // 2) 메시지 로딩
    const messages = await loadMessages(safe);

    // 3) 반드시 locale을 명시적으로 반환
    return { locale: safe, messages };
  });
}
