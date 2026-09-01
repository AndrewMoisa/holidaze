import type { Booking } from './booking'
import type { Venue } from './venue'

export interface MediaItem {
  url: string
  alt: string
}

export interface ProfileCore {
  name: string
  email: string
  bio?: string | null
  avatar?: MediaItem
  banner?: MediaItem
}

export interface Profile extends ProfileCore {
  venueManager?: boolean
  venues?: Venue[]
  bookings?: Booking[]
  _count?: { venues?: number; bookings?: number }
}
