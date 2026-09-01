import { useState } from 'react'
import { useVenues } from '../hooks/useVenues'
import { useDebounce } from '../hooks/useDebounce'
import { VenueSearchBar } from '../components/venue/VenueSearchBar'
import { VenueGrid } from '../components/venue/VenueGrid'
import { Pagination } from '../components/ui/Pagination'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'

export function HomePage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const { venues, meta, isLoading, error } = useVenues({ q: debouncedSearch, page })

  return (
    <div>
      <section className="from-brand-700 to-brand-500 bg-gradient-to-br">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Find your next stay
          </h1>
          <p className="text-sand-50 mt-2 max-w-md">
            Browse venues from hosts around the world and book your next trip.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="max-w-md">
          <VenueSearchBar value={search} onChange={handleSearchChange} />
        </div>

        <div className="mt-6">
          {isLoading && <Spinner label="Loading venues" />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <>
              <VenueGrid venues={venues} />
              <Pagination meta={meta} onPageChange={setPage} />
            </>
          )}
        </div>
      </section>
    </div>
  )
}
