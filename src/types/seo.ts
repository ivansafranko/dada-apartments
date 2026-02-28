export type LocaleCode = "hr" | "en";

export interface AlternateLocaleLink {
  hreflang: "hr" | "en" | "x-default";
  path: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonicalPath: string;
  locale: LocaleCode;
  ogImage?: string;
  ogType?: "website" | "article";
  robots?: string;
}

export type StructuredDataPayload = Record<string, unknown> | Array<Record<string, unknown>>;
