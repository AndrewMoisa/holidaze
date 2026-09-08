import { useSearchParams } from 'react-router-dom'
import { useVenues } from '../hooks/useVenues'
import { useDebounce } from '../hooks/useDebounce'
import { VenueFilterBar } from '../components/venue/VenueFilterBar'
import { AMENITY_FILTERS, SORT_OPTIONS, type SortKey } from '../utils/venueFilters'
import { VenueGrid, VenueGridSkeleton } from '../components/venue/VenueGrid'
import { Pagination } from '../components/ui/Pagination'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import type { VenueMeta } from '../types/venue'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const isSortKey = (value: string): value is SortKey => value in SORT_OPTIONS

export function VenuesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const page = Number(searchParams.get('page') ?? '1')
  const sortParam = searchParams.get('sort') ?? 'newest'
  const sortKey: SortKey = isSortKey(sortParam) ? sortParam : 'newest'
  const guestsParam = searchParams.get('guests')
  const guests = guestsParam ? Number(guestsParam) : null
  const amenities = AMENITY_FILTERS.map(({ key }) => key).filter(
    (key) => searchParams.get(key) === '1',
  )
  const debouncedSearch = useDebounce(search)

  useDocumentTitle('Venues')

  const updateParams = (
    mutate: (params: URLSearchParams) => void,
    options: { replace?: boolean } = {},
  ) => {
    const next = new URLSearchParams(searchParams)
    mutate(next)
    next.delete('page')
    setSearchParams(next, options)
  }

  const handleSearchChange = (value: string) =>
    updateParams(
      (next) => {
        if (value) {
          next.set('q', value)
        } else {
          next.delete('q')
        }
      },
      { replace: true },
    )

  const handleSortChange = (value: SortKey) =>
    updateParams((next) => {
      if (value === 'newest') {
        next.delete('sort')
      } else {
        next.set('sort', value)
      }
    })

  const handleToggleAmenity = (amenity: keyof VenueMeta) =>
    updateParams((next) => {
      if (next.get(amenity) === '1') {
        next.delete(amenity)
      } else {
        next.set(amenity, '1')
      }
    })

  const handleGuestsChange = (value: number | null) =>
    updateParams((next) => {
      if (value) {
        next.set('guests', String(value))
      } else {
        next.delete('guests')
      }
    })

  const handleClearFilters = () =>
    updateParams((next) => {
      AMENITY_FILTERS.forEach(({ key }) => next.delete(key))
      next.delete('guests')
    })

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(nextPage))
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { venues, meta, isLoading, error } = useVenues({
    q: debouncedSearch,
    page,
    ...SORT_OPTIONS[sortKey],
  })

  // The API filters by neither amenities nor guest count, so those narrow the
  // page of results already loaded.
  const visibleVenues = venues.filter(
    (venue) =>
      amenities.every((amenity) => venue.meta[amenity]) &&
      (guests === null || venue.maxGuests >= guests),
  )
  const isNarrowed = visibleVenues.length !== venues.length

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="display text-ink-900 font-semibold text-balance">
        Stay somewhere worth the trip
      </h1>
      <p className="text-ink-900/70 mt-5 max-w-xl text-base">
        Search by name, description, or location — then narrow it down.
      </p>

      <div className="mt-8">
        <VenueFilterBar
          search={search}
          onSearchChange={handleSearchChange}
          sort={sortKey}
          onSortChange={handleSortChange}
          filters={{ amenities, guests }}
          onToggleAmenity={handleToggleAmenity}
          onGuestsChange={handleGuestsChange}
          onClear={handleClearFilters}
        />
      </div>

      <div className="mt-8">
        {isLoading && <VenueGridSkeleton />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && (
          <>
            <p className="text-ink-900/60 mb-4 text-sm" aria-live="polite">
              {isNarrowed
                ? `${visibleVenues.length} of ${venues.length} on this page match your filters`
                : `${meta.totalCount ?? venues.length} venue${
                    (meta.totalCount ?? venues.length) === 1 ? '' : 's'
                  }${search ? ` for “${search}”` : ''}`}
            </p>
            <VenueGrid
              venues={visibleVenues}
              emptyTitle={isNarrowed ? 'Nothing on this page matches' : 'No venues found'}
              emptyDescription={
                isNarrowed
                  ? 'Try clearing a filter, or move to the next page.'
                  : 'Try a different search, or check back later.'
              }
            />
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  )
}
