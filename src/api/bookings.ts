import { apiClient } from './client'
import type { ApiResponse } from '../types/api'
import type { Booking } from '../types/booking'

export interface BookingPayload {
  dateFrom: string
  dateTo: string
  guests: number
  venueId: string
}

export interface UpdateBookingPayload {
  dateFrom?: string
  dateTo?: string
  guests?: number
}

export function getBooking(
  id: string,
  query: { customer?: boolean; venue?: boolean } = {},
) {
  return apiClient<ApiResponse<Booking>>(`/holidaze/bookings/${id}`, {
    auth: true,
    params: { _customer: query.customer, _venue: query.venue },
  })
}

export function createBooking(payload: BookingPayload) {
  return apiClient<ApiResponse<Booking>>('/holidaze/bookings', {
    method: 'POST',
    auth: true,
    params: { _venue: true },
    body: payload,
  })
}

export function updateBooking(id: string, payload: UpdateBookingPayload) {
  return apiClient<ApiResponse<Booking>>(`/holidaze/bookings/${id}`, {
    method: 'PUT',
    auth: true,
    body: payload,
  })
}

export function deleteBooking(id: string) {
  return apiClient<void>(`/holidaze/bookings/${id}`, { method: 'DELETE', auth: true })
}
