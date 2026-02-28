import { CONTACT, SITE, SOCIALS } from "@/data/site";
import type { LocaleCode } from "@/types/seo";

function absolute(path: string): string {
  return new URL(path, SITE.url).toString();
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    url: SITE.url,
    logo: absolute("/icon.svg"),
    email: CONTACT.email,
    telephone: CONTACT.phone,
    sameAs: [SOCIALS.facebook]
  };
}

export function buildWebsiteSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.legalName,
    url: absolute(path)
  };
}

export function buildLodgingSchema(locale: LocaleCode) {
  const description =
    locale === "hr"
      ? "Apartmani i soba u Krapinskim Toplicama s WiFi-jem i parkingom."
      : "Apartments and room in Krapinske Toplice with WiFi and parking.";

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: SITE.legalName,
    url: SITE.url,
    image: absolute(SITE.defaultOgImage),
    description,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ul. Antuna Mihanovića 3H",
      addressLocality: "Krapinske Toplice",
      postalCode: "49217",
      addressCountry: "HR"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "9.6",
      bestRating: "10",
      ratingCount: "25"
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Parking" },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning" }
    ]
  };
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path)
    }))
  };
}
