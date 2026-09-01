import { useState } from 'react'
import { useVenues } from '../hooks/useVenues'
import { useVenueRail } from '../hooks/useVenueRail'
import { useDebounce } from '../hooks/useDebounce'
import { VenueSearchBar } from '../components/venue/VenueSearchBar'
import { VenueGrid } from '../components/venue/VenueGrid'
import { VenueRail } from '../components/venue/VenueRail'
import { Pagination } from '../components/ui/Pagination'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'

const FAQS = [
  {
    q: 'How do I book a venue?',
    a: 'Create a free account, browse or search for a venue, pick your dates on its availability calendar, and confirm your booking.',
  },
  {
    q: 'What email do I need to register?',
    a: 'Registration requires a stud.noroff.no (or noroff.no) email address.',
  },
  {
    q: 'Can I list my own venue?',
    a: 'Yes — register as a venue manager and you can create, edit, and remove your own venues from your dashboard.',
  },
  {
    q: 'Can I cancel a booking?',
    a: 'Yes. Open "My bookings" and cancel any upcoming reservation.',
  },
  {
    q: 'How do I update my profile photo?',
    a: 'Go to your profile page and set a new avatar using an image URL.',
  },
]

export function HomePage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const { venues, meta, isLoading, error } = useVenues({ q: debouncedSearch, page })
  const topRated = useVenueRail('rating', 'desc', 5)
  const budget = useVenueRail('price', 'asc', 5)

  return (
    <div>
      <section className="relative pb-12">
        <h1 className="sr-only">Find your next stay</h1>
        <img
          src="/images/newhero.jpg"
          alt="Holidaze — book your next dream getaway"
          className="h-56 w-full object-cover sm:h-72 md:h-96"
        />
      </section>

      <div className="mx-auto -mt-10 max-w-2xl px-4 md:-mt-12">
        <div className="rounded-xl bg-white p-3 shadow-lg">
          <VenueSearchBar value={search} onChange={handleSearchChange} />
        </div>
      </div>

      <VenueRail
        title="Top rated stays"
        venues={topRated.venues}
        isLoading={topRated.isLoading}
      />
      <VenueRail
        title="Budget friendly stays"
        venues={budget.venues}
        isLoading={budget.isLoading}
      />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-xl bg-amber-400 p-6 md:p-8">
          <h2 className="text-ink-900 text-xl font-semibold">Book with confidence</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="text-ink-900 flex items-start gap-2.5">
              <span className="bg-brand-600 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                ✓
              </span>
              Every venue is listed by a registered host and reviewable before you book.
            </li>
            <li className="text-ink-900 flex items-start gap-2.5">
              <span className="bg-brand-600 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                ✓
              </span>
              See real availability up front, so you never book a date that's already
              taken.
            </li>
            <li className="text-ink-900 flex items-start gap-2.5">
              <span className="bg-brand-600 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                ✓
              </span>
              Manage or cancel any upcoming booking yourself, anytime, from your
              dashboard.
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-ink-900 text-xl font-semibold">Explore venues</h2>

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

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-ink-900 text-xl font-semibold">Frequently asked questions</h2>
        <div className="border-sand-200 divide-sand-200 mt-4 divide-y rounded-lg border bg-white">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group p-4">
              <summary className="text-ink-900 flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                {faq.q}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-ink-900/40 h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                >
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="text-ink-900/70 mt-2 text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
