import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '../../utils/constants'
import { makeVenue } from './fixtures/venue.fixture'
import { makeBooking } from './fixtures/booking.fixture'
import { makeProfile } from './fixtures/profile.fixture'

const meta = (overrides = {}) => ({
  isFirstPage: true,
  isLastPage: true,
  currentPage: 1,
  previousPage: null,
  nextPage: null,
  pageCount: 1,
  totalCount: 2,
  ...overrides,
})

export const venueList = [
  makeVenue({ id: 'venue-1', name: 'Seaside Cottage' }),
  makeVenue({ id: 'venue-2', name: 'Mountain Cabin', price: 90, media: null }),
]

/**
 * Covers every endpoint the app actually calls. setupTests runs MSW with
 * onUnhandledRequest: 'error', so anything missing here fails the suite
 * rather than silently hitting the network.
 */
export const handlers = [
  // --- auth
  http.post(`${API_BASE_URL}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as { name: string; email: string }
    return HttpResponse.json({
      data: makeProfile({ name: body.name, email: body.email }),
      meta: {},
    })
  }),
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string }
    return HttpResponse.json({
      data: {
        ...makeProfile({ email: body.email }),
        accessToken: 'test-access-token',
      },
      meta: {},
    })
  }),
  http.post(`${API_BASE_URL}/auth/create-api-key`, () =>
    HttpResponse.json({ data: { key: 'test-api-key' }, meta: {} }),
  ),

  // --- venues
  http.get(`${API_BASE_URL}/holidaze/venues/search`, ({ request }) => {
    const q = new URL(request.url).searchParams.get('q')?.toLowerCase() ?? ''
    const matched = venueList.filter((v) => v.name.toLowerCase().includes(q))
    return HttpResponse.json({
      data: matched,
      meta: meta({ totalCount: matched.length }),
    })
  }),
  http.get(`${API_BASE_URL}/holidaze/venues/:id`, ({ params }) => {
    const venue = venueList.find((v) => v.id === params.id)
    if (!venue) {
      return HttpResponse.json(
        { errors: [{ message: 'No venue with such ID' }], status: 'Not Found', statusCode: 404 },
        { status: 404 },
      )
    }
    return HttpResponse.json({ data: { ...venue, bookings: [] }, meta: {} })
  }),
  http.get(`${API_BASE_URL}/holidaze/venues`, () =>
    HttpResponse.json({ data: venueList, meta: meta() }),
  ),
  http.post(`${API_BASE_URL}/holidaze/venues`, async ({ request }) => {
    const body = (await request.json()) as { name: string }
    return HttpResponse.json({
      data: makeVenue({ id: 'venue-new', name: body.name }),
      meta: {},
    })
  }),
  http.put(`${API_BASE_URL}/holidaze/venues/:id`, async ({ params, request }) => {
    const body = (await request.json()) as { name: string }
    return HttpResponse.json({
      data: makeVenue({ id: String(params.id), name: body.name }),
      meta: {},
    })
  }),
  http.delete(`${API_BASE_URL}/holidaze/venues/:id`, () => new HttpResponse(null, { status: 204 })),

  // --- bookings
  http.post(`${API_BASE_URL}/holidaze/bookings`, async ({ request }) => {
    const body = (await request.json()) as {
      dateFrom: string
      dateTo: string
      guests: number
    }
    return HttpResponse.json({ data: makeBooking(body), meta: {} })
  }),
  http.delete(`${API_BASE_URL}/holidaze/bookings/:id`, () => new HttpResponse(null, { status: 204 })),

  // --- profiles
  http.put(`${API_BASE_URL}/holidaze/profiles/:name`, async ({ params, request }) => {
    const body = (await request.json()) as { avatar?: { url: string; alt?: string } }
    return HttpResponse.json({
      data: makeProfile({
        name: String(params.name),
        avatar: body.avatar ? { url: body.avatar.url, alt: body.avatar.alt ?? '' } : undefined,
      }),
      meta: {},
    })
  }),
  http.get(`${API_BASE_URL}/holidaze/profiles/:name/venues`, () =>
    HttpResponse.json({
      data: [{ ...venueList[0], bookings: [makeBooking()] }],
      meta: meta({ totalCount: 1 }),
    }),
  ),
  http.get(`${API_BASE_URL}/holidaze/profiles/:name/bookings`, () =>
    HttpResponse.json({
      data: [
        makeBooking({ id: 'booking-upcoming' }),
        makeBooking({
          id: 'booking-past',
          dateFrom: '2020-01-01T00:00:00.000Z',
          dateTo: '2020-01-05T00:00:00.000Z',
        }),
      ],
      meta: meta({ totalCount: 2 }),
    }),
  ),
]
