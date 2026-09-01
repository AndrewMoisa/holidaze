import type { ProfileCore, MediaItem } from './profile'

export interface VenueMeta {
  wifi: boolean
  parking: boolean
  breakfast: boolean
  pets: boolean
}

export interface VenueLocation {
  address: string | null
  city: string | null
  zip: string | null
  country: string | null
  continent: string | null
  lat: number | null
  lng: number | null
}

export interface VenueBookingSummary {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  customer: ProfileCore
}

export interface Venue {
  id: string
  name: string
  description: string | null
  media: MediaItem[] | null
  price: number
  maxGuests: number
  rating: number | null
  created: string
  updated: string
  meta: VenueMeta
  location: VenueLocation
  owner?: ProfileCore
  bookings?: VenueBookingSummary[]
  _count?: { bookings?: number }
}
