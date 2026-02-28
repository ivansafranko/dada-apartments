import type {
  Apartment,
  ApartmentLocationGroup,
  Testimonial
} from "@/types/content";

const mapCenter =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.0289129845037!2d15.831762975468017!3d46.09040109144145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765eb9828676d4d%3A0x848bf332d3551885!2sZgrada%20Dragutina%20Plahutara%2C%20Ul.%20Antuna%20Mihanovi%C4%87a%203H%2C%2049217%2C%20Krapinske%20Toplice!5e0!3m2!1shr!2shr!4v1751223494281!5m2!1shr!2shr";

const mapQuiet =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d197.8715242868565!2d15.83724928014023!3d46.0959862113964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765eb9077ffbfdf%3A0xa4754b0be498c038!2sUl.%20Ksavera%20%C5%A0andora%20%C4%90alskog%202%2C%2049217%2C%20Krapinske%20Toplice!5e0!3m2!1shr!2shr!4v1751223581443!5m2!1shr!2shr";

const mapCenterHref = "https://maps.google.com/?q=Ul.+Antuna+Mihanovi%C4%87a+3H,+Krapinske+Toplice";
const mapQuietHref = "https://maps.google.com/?q=Ul.+Ksavera+%C5%A0andora+%C4%90alskog+2,+Krapinske+Toplice";

export const HERO_IMAGE = {
  src: "/images/dada-apartments-krapinske-toplice-hero.avif",
  width: 1000,
  height: 600,
  alt: {
    hr: "Apartmani Dada u Krapinskim Toplicama",
    en: "Apartmani Dada in Krapinske Toplice"
  }
};

export const APARTMENTS: Apartment[] = [
  {
    id: "apt1",
    name: {
      hr: "Dada Apartman 1 (50m²)",
      en: "Dada Apartment 1 (50m²)"
    },
    area: "50m²",
    address: "Ul. Antuna Mihanovića 3H, Krapinske Toplice",
    locationKey: "center",
    description: {
      hr: "Moderan apartman u centru grada, nekoliko minuta hoda od Aquae Vivae.",
      en: "Modern apartment in the town center, a few minutes on foot from Aquae Vivae."
    },
    amenities: [
      { id: "bedrooms", label: { hr: "1 spavaća soba", en: "1 bedroom" } },
      { id: "bathroom", label: { hr: "1 kupaonica", en: "1 bathroom" } },
      { id: "kitchen", label: { hr: "Kuhinja", en: "Kitchen" } },
      { id: "wifi", label: { hr: "WiFi", en: "WiFi" } },
      { id: "parking", label: { hr: "Parking", en: "Parking" } }
    ],
    images: [
      {
        src: "/images/apartments/apartment-1/dada-apartment-1-bedroom-001.avif",
        alt: {
          hr: "Spavaća soba u Dada apartmanu 1",
          en: "Bedroom in Dada Apartment 1"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-1/dada-apartment-1-interior-overview-001.avif",
        alt: {
          hr: "Interijer Dada apartmana 1",
          en: "Interior of Dada Apartment 1"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-1/dada-apartment-1-living-room-001.avif",
        alt: {
          hr: "Dnevni boravak Dada apartmana 1",
          en: "Living room of Dada Apartment 1"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-1/dada-apartment-1-balcony-001.avif",
        alt: {
          hr: "Balkon Dada apartmana 1",
          en: "Balcony of Dada Apartment 1"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-1/dada-apartment-1-bathroom-001.avif",
        alt: {
          hr: "Kupaonica Dada apartmana 1",
          en: "Bathroom of Dada Apartment 1"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      }
    ]
  },
  {
    id: "apt2",
    name: {
      hr: "Dada Apartman 2 (70m²)",
      en: "Dada Apartment 2 (70m²)"
    },
    area: "70m²",
    address: "Ul. Antuna Mihanovića 3H, Krapinske Toplice",
    locationKey: "center",
    description: {
      hr: "Prostran obiteljski apartman sa svim potrebnim sadržajima.",
      en: "Spacious family apartment with all key amenities."
    },
    amenities: [
      { id: "bedrooms", label: { hr: "2 spavaće sobe", en: "2 bedrooms" } },
      { id: "bathroom", label: { hr: "1 kupaonica", en: "1 bathroom" } },
      { id: "kitchen", label: { hr: "Potpuna kuhinja", en: "Full kitchen" } },
      { id: "wifi", label: { hr: "WiFi", en: "WiFi" } },
      { id: "parking", label: { hr: "Parking", en: "Parking" } }
    ],
    images: [
      {
        src: "/images/apartments/apartment-2/dada-apartment-2-living-room-001.avif",
        alt: {
          hr: "Dnevni boravak Dada apartmana 2",
          en: "Living room of Dada Apartment 2"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-2/dada-apartment-2-bunk-beds-001.avif",
        alt: {
          hr: "Soba s krevetima na kat u Dada apartmanu 2",
          en: "Bunk bed room in Dada Apartment 2"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-2/dada-apartment-2-balcony-001.avif",
        alt: {
          hr: "Balkon Dada apartmana 2",
          en: "Balcony of Dada Apartment 2"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-2/dada-apartment-2-bathroom-001.avif",
        alt: {
          hr: "Kupaonica Dada apartmana 2",
          en: "Bathroom of Dada Apartment 2"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-2/dada-apartment-2-bedroom-001.avif",
        alt: {
          hr: "Spavaća soba Dada apartmana 2",
          en: "Bedroom in Dada Apartment 2"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      }
    ]
  },
  {
    id: "apt3",
    name: {
      hr: "Studio Apartman Šafranko (25m²)",
      en: "Studio Apartment Safranko (25m²)"
    },
    area: "25m²",
    address: "Ul. Ksavera Šandora Đalskog 2, Krapinske Toplice",
    locationKey: "quiet",
    description: {
      hr: "Studio opcija u mirnijoj zoni blizu bolnice i klinike.",
      en: "Studio option in a quieter area near the hospital and clinic."
    },
    amenities: [
      { id: "studio", label: { hr: "Studio", en: "Studio" } },
      { id: "bathroom", label: { hr: "1 kupaonica", en: "1 bathroom" } },
      { id: "kitchenette", label: { hr: "Kuhinjica", en: "Kitchenette" } },
      { id: "wifi", label: { hr: "WiFi", en: "WiFi" } },
      { id: "parking", label: { hr: "Parking", en: "Parking" } }
    ],
    images: [
      {
        src: "/images/apartments/apartment-3/studio-safranko-bedroom-001.avif",
        alt: {
          hr: "Spavaći prostor studio apartmana Šafranko",
          en: "Sleeping area of Studio Apartment Safranko"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-3/studio-safranko-living-room-001.avif",
        alt: {
          hr: "Dnevni prostor studio apartmana Šafranko",
          en: "Living area of Studio Apartment Safranko"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-3/studio-safranko-bathroom-001.avif",
        alt: {
          hr: "Kupaonica studio apartmana Šafranko",
          en: "Bathroom of Studio Apartment Safranko"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-3/studio-safranko-kitchen-001.avif",
        alt: {
          hr: "Kuhinja studio apartmana Šafranko",
          en: "Kitchen in Studio Apartment Safranko"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-3/studio-safranko-balcony-001.avif",
        alt: {
          hr: "Balkon studio apartmana Šafranko",
          en: "Balcony of Studio Apartment Safranko"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      }
    ]
  },
  {
    id: "apt4",
    name: {
      hr: "Soba Šafranko (17m²)",
      en: "Safranko Room (17m²)"
    },
    area: "17m²",
    address: "Ul. Ksavera Šandora Đalskog 2, Krapinske Toplice",
    locationKey: "quiet",
    description: {
      hr: "Udobna soba za kraći ili poslovni boravak.",
      en: "Comfortable room for shorter or business stays."
    },
    amenities: [
      { id: "room", label: { hr: "Soba", en: "Room" } },
      { id: "bathroom", label: { hr: "1 kupaonica", en: "1 bathroom" } },
      { id: "wifi", label: { hr: "WiFi", en: "WiFi" } },
      { id: "tv", label: { hr: "TV", en: "TV" } },
      { id: "parking", label: { hr: "Parking", en: "Parking" } }
    ],
    images: [
      {
        src: "/images/apartments/apartment-4/soba-safranko-bedroom-001.avif",
        alt: {
          hr: "Spavaća soba sobe Šafranko",
          en: "Bedroom in Safranko Room"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-4/soba-safranko-living-area-001.avif",
        alt: {
          hr: "Dnevni prostor sobe Šafranko",
          en: "Living area in Safranko Room"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-4/soba-safranko-bathroom-entrance-001.avif",
        alt: {
          hr: "Ulaz kupaonice sobe Šafranko",
          en: "Bathroom entrance in Safranko Room"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      },
      {
        src: "/images/apartments/apartment-4/soba-safranko-bathroom-001.avif",
        alt: {
          hr: "Kupaonica sobe Šafranko",
          en: "Bathroom in Safranko Room"
        },
        width: 420,
        height: 280,
        loading: "lazy"
      }
    ]
  }
];

export const APARTMENT_LOCATIONS: ApartmentLocationGroup[] = [
  {
    key: "center",
    title: {
      hr: "Lokacija u centru grada",
      en: "City Center Location"
    },
    description: {
      hr: "Vrhunska lokacija u centru grada, nekoliko minuta hoda od Aquae Vivae.",
      en: "Prime city-center location just minutes from Aquae Vivae."
    },
    map: {
      title: {
        hr: "Karta lokacije apartmana u centru",
        en: "Map for city-center apartments"
      },
      src: mapCenter,
      href: mapCenterHref,
      width: 600,
      height: 300
    },
    apartmentIds: ["apt1", "apt2"]
  },
  {
    key: "quiet",
    title: {
      hr: "Centar grada - blizu bolnice",
      en: "City Center - Near Hospital"
    },
    description: {
      hr: "Mirnija zona u blizini bolnice i klinike Magdalena.",
      en: "A quieter area close to the rehabilitation hospital and Magdalena clinic."
    },
    map: {
      title: {
        hr: "Karta lokacije studija i sobe",
        en: "Map for studio and room location"
      },
      src: mapQuiet,
      href: mapQuietHref,
      width: 600,
      height: 300
    },
    apartmentIds: ["apt3", "apt4"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Jana",
    text: {
      hr: "Sve je bilo čisto, ugodno i odlično organizirano. Vlasnik je bio vrlo ljubazan.",
      en: "Everything was clean, comfortable, and very well organized. The host was very kind."
    }
  },
  {
    id: "t2",
    author: "Tamara",
    text: {
      hr: "Odlična lokacija i vrlo uredan apartman. Rado bismo se vratili.",
      en: "Great location and very tidy apartment. We would happily come back."
    }
  },
  {
    id: "t3",
    author: "Darko",
    text: {
      hr: "Udobno, mirno i blizu svega što nam je trebalo tijekom boravka.",
      en: "Comfortable, peaceful, and close to everything we needed during our stay."
    }
  }
];
