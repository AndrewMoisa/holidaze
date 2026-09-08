import type { Booking } from '../../../types/booking'
import { makeVenue } from './venue.fixture'

export function makeBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    id: 'booking-1',
    dateFrom: '2099-06-01T00:00:00.000Z',
    dateTo: '2099-06-05T00:00:00.000Z',
    guests: 2,
    created: '2026-01-01T00:00:00.000Z',
    updated: '2026-01-01T00:00:00.000Z',
    venue: makeVenue(),
    ...overrides,
  }
}
