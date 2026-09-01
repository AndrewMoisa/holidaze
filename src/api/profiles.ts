import { apiClient } from './client'
import type { ApiResponse } from '../types/api'
import type { Profile } from '../types/profile'
import type { Venue } from '../types/venue'
import type { Booking } from '../types/booking'
import type { VenuesQuery } from './venues'

export function getProfile(
  name: string,
  query: { venues?: boolean; bookings?: boolean } = {},
) {
  return apiClient<ApiResponse<Profile>>(
    `/holidaze/profiles/${encodeURIComponent(name)}`,
    {
      auth: true,
      params: { _venues: query.venues, _bookings: query.bookings },
    },
  )
}

export interface UpdateProfilePayload {
  bio?: string
  avatar?: { url: string; alt?: string }
  banner?: { url: string; alt?: string }
  venueManager?: boolean
}

export function updateProfile(name: string, payload: UpdateProfilePayload) {
  return apiClient<ApiResponse<Profile>>(
    `/holidaze/profiles/${encodeURIComponent(name)}`,
    {
      method: 'PUT',
      auth: true,
      body: payload,
    },
  )
}

export function getProfileVenues(name: string, query: VenuesQuery = {}) {
  return apiClient<ApiResponse<Venue[]>>(
    `/holidaze/profiles/${encodeURIComponent(name)}/venues`,
    {
      auth: true,
      params: {
        page: query.page,
        limit: query.limit,
        sort: query.sort,
        sortOrder: query.sortOrder,
        _owner: query.owner,
        _bookings: query.bookings,
      },
    },
  )
}

export function getProfileBookings(
  name: string,
  query: { customer?: boolean; venue?: boolean } = {},
) {
  return apiClient<ApiResponse<Booking[]>>(
    `/holidaze/profiles/${encodeURIComponent(name)}/bookings`,
    { auth: true, params: { _customer: query.customer, _venue: query.venue } },
  )
}
