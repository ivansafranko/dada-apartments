import type { LocaleCode } from "./seo";

export interface SeoCopy {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface LocaleStrings {
  code: LocaleCode;
  htmlLang: string;
  languageLabel: string;
  skipToContent: string;
  nav: {
    home: string;
    about: string;
    apartments: string;
    book: string;
    contact: string;
    menu: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    bullets: string[];
    cta: string;
  };
  about: {
    title: string;
    subtitle: string;
    cards: Array<{ title: string; text: string }>;
  };
  apartments: {
    title: string;
    subtitle: string;
  };
  process: {
    title: string;
    subtitle: string;
    steps: Array<{ title: string; text: string }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    labels: {
      name: string;
      email: string;
      checkin: string;
      checkout: string;
      message: string;
      submit: string;
      loading: string;
    };
    placeholders: {
      name: string;
      email: string;
      message: string;
    };
    info: {
      phone: string;
      email: string;
      location: string;
    };
    validation: {
      required: string;
      submitError: string;
      successTitle: string;
      successText: string;
    };
  };
  book: {
    title: string;
    intro: string;
    loadWidget: string;
    fallbackTitle: string;
    fallbackText: string;
    fallbackCta: string;
  };
  landing: {
    kicker: string;
    title: string;
    intro: string;
    cards: Array<{ title: string; text: string }>;
    locationTitle: string;
    locationIntro: string;
    locationCards: Array<{ title: string; text: string }>;
    faqTitle: string;
    faq: Array<{ question: string; answer: string }>;
    cta: string;
  };
  thankYou: {
    title: string;
    text: string;
    homeCta: string;
    bookCta: string;
  };
  notFound: {
    title: string;
    text: string;
    homeCta: string;
  };
  footer: {
    text: string;
    copyright: string;
  };
  seo: {
    home: SeoCopy;
    book: SeoCopy;
    landing: SeoCopy;
    thankYou: SeoCopy;
    notFound: SeoCopy;
  };
}
