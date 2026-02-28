import type { LocaleCode } from "@/types/seo";

type PageKey = "home" | "book" | "landing";

interface LocaleRouteMap {
  home: string;
  book: string;
  landing: string;
}

const ROUTES: Record<LocaleCode, LocaleRouteMap> = {
  hr: {
    home: "/",
    book: "/book-now",
    landing: "/apartmani-krapinske-toplice"
  },
  en: {
    home: "/en/",
    book: "/en/book-now",
    landing: "/en/apartmani-krapinske-toplice"
  }
};

export function getRoute(locale: LocaleCode, page: PageKey): string {
  return ROUTES[locale][page];
}

export function getSwitchRoute(locale: LocaleCode, page: PageKey): string {
  return locale === "hr" ? ROUTES.en[page] : ROUTES.hr[page];
}

export function getAnchoredHomeRoute(locale: LocaleCode, anchor: string): string {
  const base = getRoute(locale, "home");
  const normalized = anchor.startsWith("#") ? anchor : `#${anchor}`;
  return `${base}${normalized}`;
}
