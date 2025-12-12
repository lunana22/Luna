import { defaultLocale } from "../config";
import { MESSAGES, type SupportedLocale } from "../messages-manifest";
import type { MessagesByLocale } from "../resources";

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale in MESSAGES;
}

function typedKeys<T extends Record<PropertyKey, unknown>>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export async function loadMessages(
  locale: string,
  namespaces?: string[]
): Promise<MessagesByLocale[SupportedLocale]> {
  const safeLocale = isSupportedLocale(locale) ? locale : defaultLocale;
  const table = MESSAGES[safeLocale];

  const wanted =
    namespaces?.filter((ns): ns is keyof typeof table => ns in table) ??
    typedKeys(table);
  const out: Record<string, unknown> = {};

  for (const ns of wanted) {
    const loader = table[ns];
    if (typeof loader !== "function") continue; // 안전장치
    const mod = await loader(); // () => import('정적경로')
    out[ns] = (mod as { default?: unknown }).default ?? mod;
  }
  return out as MessagesByLocale[SupportedLocale];
}
