import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '../../utils/constants'
import { makeVenue } from './fixtures/venue.fixture'

export const handlers = [
  http.get(`${API_BASE_URL}/holidaze/venues`, () => {
    return HttpResponse.json({
      data: [
        makeVenue({ id: 'venue-1', name: 'Seaside Cottage' }),
        makeVenue({ id: 'venue-2', name: 'Mountain Cabin', price: 90, media: null }),
      ],
      meta: {
        isFirstPage: true,
        isLastPage: true,
        currentPage: 1,
        pageCount: 1,
        totalCount: 2,
      },
    })
  }),
]
