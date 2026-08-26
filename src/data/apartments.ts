export type Apartment = {
  id: 1 | 2 | 3 | 4;
  nameKey: `apt${1 | 2 | 3 | 4}-name`;
  sizeM2: number;
  address: string;
  rating: number;
  bookingUrl: string;
  amenities: string[];
  images: Array<{
    src: `/images/${string}`;
    alt: string;
  }>;
};

export type ApartmentLocation = {
  id: 1 | 2;
  titleKey: `location${1 | 2}-title`;
  highlightsTitleKey: `location${1 | 2}-highlights-title`;
  highlightsTextKey: `location${1 | 2}-highlights-text`;
  mapTitle: string;
  mapEmbedUrl: string;
  apartmentIds: Apartment['id'][];
};

const image = (src: `/images/${string}`, alt: string) => ({ src, alt });

export const apartments: Apartment[] = [
  {
    id: 1,
    nameKey: 'apt1-name',
    sizeM2: 50,
    address: 'Ul. Antuna Mihanovića 3H, Krapinske Toplice',
    rating: 9.8,
    bookingUrl: 'https://www.booking.com/Share-fJ7Rpz',
    amenities: [
      'amenity-bedroom1',
      'amenity-bathroom1',
      'amenity-kitchen',
      'amenity-wifi',
      'amenity-tv',
      'amenity-air-conditioning',
      'amenity-balcony',
      'amenity-parking',
    ],
    images: [
      image('/images/apartments/apartment-1/dada-apartment-1-bedroom-001.webp', 'Luxurious bedroom in Dada Apartment 1'),
      image('/images/apartments/apartment-1/dada-apartment-1-interior-overview-001.webp', 'Spacious interior overview of Dada Apartment 1'),
      image('/images/apartments/apartment-1/dada-apartment-1-living-room-001.webp', 'Comfortable living room in Dada Apartment 1'),
      image('/images/apartments/apartment-1/dada-apartment-1-balcony-001.webp', 'Balcony with scenic view in Dada Apartment 1'),
      image('/images/apartments/apartment-1/dada-apartment-1-bathroom-001.webp', 'Modern bathroom in Dada Apartment 1'),
    ],
  },
  {
    id: 2,
    nameKey: 'apt2-name',
    sizeM2: 70,
    address: 'Ul. Antuna Mihanovića 3H, Krapinske Toplice',
    rating: 9.8,
    bookingUrl: 'https://www.booking.com/Share-fJ7Rpz',
    amenities: [
      'amenity-bedrooms2',
      'amenity-bathrooms2',
      'amenity-full-kitchen',
      'amenity-wifi',
      'amenity-tv',
      'amenity-air-conditioning',
      'amenity-balcony',
      'amenity-parking',
    ],
    images: [
      image('/images/apartments/apartment-2/dada-apartment-2-living-room-001.webp', 'Spacious living and dining area in Dada Apartment 2'),
      image('/images/apartments/apartment-2/dada-apartment-2-bunk-beds-001.webp', 'Cozy bunk beds room in Dada Apartment 2'),
      image('/images/apartments/apartment-2/dada-apartment-2-balcony-001.webp', 'Balcony with nature view in Dada Apartment 2'),
      image('/images/apartments/apartment-2/dada-apartment-2-bathroom-001.webp', 'Well-equipped bathroom in Dada Apartment 2'),
      image('/images/apartments/apartment-2/dada-apartment-2-bedroom-001.webp', 'Master bedroom in Dada Apartment 2'),
    ],
  },
  {
    id: 3,
    nameKey: 'apt3-name',
    sizeM2: 25,
    address: 'Ul. Ksavera Šandora Đalskog 2, Krapinske Toplice',
    rating: 9.3,
    bookingUrl: 'https://www.booking.com/Share-6Vfy4a',
    amenities: [
      'amenity-bathroom1',
      'amenity-kitchenette',
      'amenity-wifi',
      'amenity-tv',
      'amenity-balcony',
      'amenity-air-conditioning',
      'amenity-parking',
    ],
    images: [
      image('/images/apartments/apartment-3/studio-safranko-bedroom-001.webp', 'Comfortable bedroom in Studio Šafranko'),
      image('/images/apartments/apartment-3/studio-safranko-living-room-001.webp', 'Inviting living room in Studio Šafranko'),
      image('/images/apartments/apartment-3/studio-safranko-bathroom-001.webp', 'Clean bathroom in Studio Šafranko'),
      image('/images/apartments/apartment-3/studio-safranko-kitchen-001.webp', 'Compact kitchen and dining area in Studio Šafranko'),
      image('/images/apartments/apartment-3/studio-safranko-balcony-001.webp', 'Private balcony in Studio Šafranko'),
    ],
  },
  {
    id: 4,
    nameKey: 'apt4-name',
    sizeM2: 17,
    address: 'Ul. Ksavera Šandora Đalskog 2, Krapinske Toplice',
    rating: 9.3,
    bookingUrl: 'https://www.booking.com/Share-6Vfy4a',
    amenities: ['amenity-bathroom1', 'amenity-tv', 'amenity-wifi', 'amenity-wardrobe', 'amenity-skylight', 'amenity-parking'],
    images: [
      image('/images/apartments/apartment-4/soba-safranko-bedroom-001.webp', 'Comfortable bedroom in Soba Šafranko'),
      image('/images/apartments/apartment-4/soba-safranko-living-area-001.webp', 'Cozy living area in Soba Šafranko'),
      image('/images/apartments/apartment-4/soba-safranko-bathroom-entrance-001.webp', 'Bathroom entrance in Soba Šafranko'),
      image('/images/apartments/apartment-4/soba-safranko-bathroom-001.webp', 'Compact bathroom in Soba Šafranko'),
    ],
  },
];

export const locations: ApartmentLocation[] = [
  {
    id: 1,
    titleKey: 'location1-title',
    highlightsTitleKey: 'location1-highlights-title',
    highlightsTextKey: 'location1-highlights-text',
    mapTitle: 'Map showing location of Dada Apartment 1',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.0289129845037!2d15.831762975468017!3d46.09040109144145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765eb9828676d4d%3A0x848bf332d3551885!2sZgrada%20Dragutina%20Plahutara%2C%20Ul.%20Antuna%20Mihanovi%C4%87a%203H%2C%2049217%2C%20Krapinske%20Toplice!5e0!3m2!1shr!2shr!4v1751223494281!5m2!1shr!2shr',
    apartmentIds: [1, 2],
  },
  {
    id: 2,
    titleKey: 'location2-title',
    highlightsTitleKey: 'location2-highlights-title',
    highlightsTextKey: 'location2-highlights-text',
    mapTitle: 'Map showing location of Soba Šafranko',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d197.8715242868565!2d15.83724928014023!3d46.0959862113964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765eb9077ffbfdf%3A0xa4754b0be498c038!2sUl.%20Ksavera%20%C5%A0andora%20%C4%90alskog%202%2C%2049217%2C%20Krapinske%20Toplice!5e0!3m2!1shr!2shr!4v1751223581443!5m2!1shr!2shr',
    apartmentIds: [3, 4],
  },
];
