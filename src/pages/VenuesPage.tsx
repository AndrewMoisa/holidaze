import { useSearchParams } from 'react-router-dom'
import { useVenues } from '../hooks/useVenues'
import { useDebounce } from '../hooks/useDebounce'
import { VenueSearchBar } from '../components/venue/VenueSearchBar'
import { VenueGrid } from '../components/venue/VenueGrid'
import { Pagination } from '../components/ui/Pagination'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'

export function VenuesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const page = Number(searchParams.get('page') ?? '1')
  const debouncedSearch = useDebounce(search)

  const handleSearchChange = (value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set('q', value)
    } else {
      next.delete('q')
    }
    next.delete('page')
    setSearchParams(next, { replace: true })
  }

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(nextPage))
    setSearchParams(next)
  }

  const { venues, meta, isLoading, error } = useVenues({ q: debouncedSearch, page })

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-ink-900 text-3xl font-semibold">Explore venues</h1>
      <p className="text-ink-900/70 mt-1 text-sm">
        Search by name, description, or location.
      </p>

      <div className="mt-6 max-w-md">
        <VenueSearchBar value={search} onChange={handleSearchChange} variant="inline" />
      </div>

      <div className="mt-8">
        {isLoading && <Spinner label="Loading venues" />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && (
          <>
            <VenueGrid venues={venues} />
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  )
}
