import type { LocaleCode } from "./seo";

export interface LocalizedString {
  hr: string;
  en: string;
}

export interface ApartmentImage {
  src: string;
  alt: LocalizedString;
  width: number;
  height: number;
  loading?: "lazy" | "eager";
  fetchpriority?: "high" | "low" | "auto";
}

export interface Amenity {
  id: string;
  label: LocalizedString;
}

export interface Apartment {
  id: string;
  name: LocalizedString;
  area: string;
  address: string;
  locationKey: "center" | "quiet";
  description: LocalizedString;
  amenities: Amenity[];
  images: ApartmentImage[];
}

export interface ApartmentLocationGroup {
  key: "center" | "quiet";
  title: LocalizedString;
  description: LocalizedString;
  map: {
    title: LocalizedString;
    src: string;
    href: string;
    width: number;
    height: number;
  };
  apartmentIds: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  text: LocalizedString;
}

export interface FaqItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: LocalizedString;
}

export function getLocalizedText(value: LocalizedString, locale: LocaleCode): string {
  return value[locale];
}
