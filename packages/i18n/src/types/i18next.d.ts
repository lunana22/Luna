// src/types/i18next.d.ts
import "i18next";
import type { ResourceSchema, DefaultNS } from "../resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: ResourceSchema; // { common: typeof en_common; home: typeof en_home }
  }
}
