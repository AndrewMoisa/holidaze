import type { ProfileCore } from './profile'
import type { Venue } from './venue'

export interface Booking {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  venue?: Omit<Venue, 'bookings'>
  customer?: ProfileCore
}
