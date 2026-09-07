import type { VenueMeta } from '../types/venue'

export const SORT_OPTIONS = {
  newest: { label: 'Newest', sort: 'created', sortOrder: 'desc' },
  'price-asc': { label: 'Price: low to high', sort: 'price', sortOrder: 'asc' },
  'price-desc': { label: 'Price: high to low', sort: 'price', sortOrder: 'desc' },
  rating: { label: 'Top rated', sort: 'rating', sortOrder: 'desc' },
} as const

export type SortKey = keyof typeof SORT_OPTIONS

export const AMENITY_FILTERS: { key: keyof VenueMeta; label: string }[] = [
  { key: 'wifi', label: 'Wifi' },
  { key: 'parking', label: 'Parking' },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'pets', label: 'Pets' },
]

export const GUEST_OPTIONS = [1, 2, 4, 6, 8]

export interface VenueFilters {
  amenities: (keyof VenueMeta)[]
  guests: number | null
}
