import {
  MESSAGES,
  type SupportedLocale,
  type NamespaceOf,
} from "./messages-manifest";

export const supportedLngs = Object.keys(
  MESSAGES
) as readonly SupportedLocale[];
export type AppLng = SupportedLocale;

export const defaultLocale: SupportedLocale = "ko";
export const defaultNS: NamespaceOf<typeof defaultLocale> = "common";
export const namespaces = Object.keys(MESSAGES[defaultLocale]) as NamespaceOf<
  typeof defaultLocale
>[];
// import type { LocalePrefix } from "next-intl/routing";
export const localePrefix = "as-needed" as const;

export type DefaultLocale = typeof defaultLocale;
export type NamespaceList = typeof namespaces;

// export const i18nOptions = {
//   fallbackLng: "en" as const,
//   supportedLngs,
//   defaultNS,
//   ns: namespaces,
//   interpolation: { escapeValue: false },
// } as const;
