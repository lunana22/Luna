// src/i18n/resources.ts
import type { MessageManifest, NamespaceOf } from "./messages-manifest";
import type { DefaultLocale } from "./config";

type ExtractLoaderPayload<T> = T extends () => Promise<infer R>
  ? Awaited<R> extends { default: infer U }
    ? U
    : Awaited<R>
  : never;

type Manifest = MessageManifest;

export type MessagesByLocale = {
  [Locale in keyof Manifest]: {
    [Namespace in keyof Manifest[Locale]]: ExtractLoaderPayload<
      Manifest[Locale][Namespace]
    >;
  };
};

export type BaseLocale = DefaultLocale;
export type DefaultNS = NamespaceOf<BaseLocale>;
export type ResourceSchema = MessagesByLocale[BaseLocale];
