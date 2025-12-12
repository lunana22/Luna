// packages/i18n-config/src/routing.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { defaultLocale, supportedLngs } from "../config";

export const routing = defineRouting({
  locales: supportedLngs,
  defaultLocale,
});

export const { redirect, usePathname, useRouter, Link } =
  createNavigation(routing);
