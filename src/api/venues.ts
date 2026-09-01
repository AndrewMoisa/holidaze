import { apiClient } from './client'
import type { ApiResponse } from '../types/api'
import type { Venue, VenueMeta, VenueLocation } from '../types/venue'

export interface VenuesQuery {
  page?: number
  limit?: number
  sort?: string
  sortOrder?: 'asc' | 'desc'
  owner?: boolean
  bookings?: boolean
}

function venuesParams(query: VenuesQuery = {}) {
  return {
    page: query.page,
    limit: query.limit,
    sort: query.sort,
    sortOrder: query.sortOrder,
    _owner: query.owner,
    _bookings: query.bookings,
  }
}

export function getVenues(query: VenuesQuery = {}) {
  return apiClient<ApiResponse<Venue[]>>('/holidaze/venues', {
    params: venuesParams(query),
  })
}

export function searchVenues(q: string, query: VenuesQuery = {}) {
  return apiClient<ApiResponse<Venue[]>>('/holidaze/venues/search', {
    params: { q, ...venuesParams(query) },
  })
}

export function getVenue(
  id: string,
  query: { owner?: boolean; bookings?: boolean } = {},
) {
  return apiClient<ApiResponse<Venue>>(`/holidaze/venues/${id}`, {
    params: { _owner: query.owner, _bookings: query.bookings },
  })
}

export interface VenuePayload {
  name: string
  description: string
  media?: { url: string; alt?: string }[]
  price: number
  maxGuests: number
  rating?: number
  meta?: Partial<VenueMeta>
  location?: Partial<VenueLocation>
}

export function createVenue(payload: VenuePayload) {
  return apiClient<ApiResponse<Venue>>('/holidaze/venues', {
    method: 'POST',
    auth: true,
    body: payload,
  })
}

export function updateVenue(id: string, payload: Partial<VenuePayload>) {
  return apiClient<ApiResponse<Venue>>(`/holidaze/venues/${id}`, {
    method: 'PUT',
    auth: true,
    body: payload,
  })
}

export function deleteVenue(id: string) {
  return apiClient<void>(`/holidaze/venues/${id}`, { method: 'DELETE', auth: true })
}
