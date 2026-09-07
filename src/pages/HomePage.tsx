import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useVenueRail } from '../hooks/useVenueRail'
import { VenueSearchBar } from '../components/venue/VenueSearchBar'
import { VenueRail } from '../components/venue/VenueRail'

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
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.hash) return
    const element = document.getElementById(location.hash.slice(1))
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  const handleSearchSubmit = () => {
    navigate(search ? `/venues?q=${encodeURIComponent(search)}` : '/venues')
  }

  const topRated = useVenueRail('rating', 'desc', 5)
  const budget = useVenueRail('price', 'asc', 5)

  return (
    <div>
      <section className="relative">
        <h1 className="sr-only">Find your next stay</h1>
        <img
          src="/images/newhero.jpg"
          alt="Holidaze — book your next dream getaway"
          className="h-56 w-full object-cover sm:h-72 md:h-96"
        />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-xl translate-y-1/2 px-4">
          <VenueSearchBar value={search} onChange={setSearch} onSubmit={handleSearchSubmit} />
        </div>
      </section>

      <div className="h-10 sm:h-12" />

      <VenueRail
        id="top-rated"
        title="Top rated stays"
        venues={topRated.venues}
        isLoading={topRated.isLoading}
      />
      <VenueRail
        id="budget"
        title="Budget friendly stays"
        venues={budget.venues}
        isLoading={budget.isLoading}
      />

      <hr className="border-sand-200 mx-auto max-w-6xl" />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="bg-sun-400 rounded-xl p-6 md:p-8">
          <h2 className="font-display text-ink-900 text-2xl font-semibold">
            Book with confidence
          </h2>
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

      <hr className="border-sand-200 mx-auto max-w-6xl" />

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="font-display text-ink-900 text-2xl font-semibold">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="border-sand-200 group hover:border-brand-200 rounded-2xl border bg-white p-5 shadow-sm transition-colors"
            >
              <summary className="text-ink-900 flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                {faq.q}
                <span className="bg-sun-400/15 text-sun-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform group-open:rotate-180">
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                    <path
                      d="m5 7.5 5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="text-ink-900/70 mt-3 text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
