import type { Venue } from '../../../types/venue'

export function makeVenue(overrides: Partial<Venue> = {}): Venue {
  return {
    id: 'venue-1',
    name: 'Seaside Cottage',
    description: 'A cozy cottage by the sea.',
    media: [{ url: 'https://example.com/cottage.jpg', alt: 'Seaside Cottage' }],
    price: 150,
    maxGuests: 4,
    rating: 4.5,
    created: '2026-01-01T00:00:00.000Z',
    updated: '2026-01-01T00:00:00.000Z',
    meta: { wifi: true, parking: false, breakfast: false, pets: true },
    location: {
      address: null,
      city: 'Bergen',
      zip: null,
      country: 'Norway',
      continent: null,
      lat: null,
      lng: null,
    },
    ...overrides,
  }
}
