import { useEffect, useState, type CSSProperties } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useVenueRail } from '../hooks/useVenueRail'
import { VenueSearchBar } from '../components/venue/VenueSearchBar'
import { VenueRail } from '../components/venue/VenueRail'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useInView } from '../hooks/useInView'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const PROMISES = [
  'Every venue is listed by a registered host and reviewable before you book.',
  "See real availability up front, so you never book a date that's already taken.",
  'Manage or cancel any upcoming booking yourself, anytime, from your dashboard.',
]

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
  const reducedMotion = useReducedMotion()
  const { ref: promisesRef, reveal: promisesReveal } = useInView<HTMLElement>()
  const { ref: faqRef, reveal: faqReveal } = useInView<HTMLElement>()

  useDocumentTitle()

  useEffect(() => {
    if (!location.hash) return
    const element = document.getElementById(location.hash.slice(1))
    element?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [location.hash, reducedMotion])

  const handleSearchSubmit = () => {
    navigate(search ? `/venues?q=${encodeURIComponent(search)}` : '/venues')
  }

  const topRated = useVenueRail('rating', 'desc', 5)
  const budget = useVenueRail('price', 'asc', 5)

  return (
    <div>
      {/* Clipped: the entrance animation scales the image past the viewport. */}
      <section className="relative overflow-hidden">
        <h1 className="sr-only">Find your next stay</h1>
        <picture>
          <source
            media="(max-width: 639px)"
            type="image/webp"
            sizes="100vw"
            srcSet="/images/hero-mobile-720.webp 720w, /images/hero-mobile-1080.webp 1080w"
          />
          <source
            media="(max-width: 639px)"
            sizes="100vw"
            srcSet="/images/hero-mobile-720.jpg 720w, /images/hero-mobile-1080.jpg 1080w"
          />
          <source
            type="image/webp"
            sizes="100vw"
            srcSet="/images/hero-960.webp 960w, /images/hero-1440.webp 1440w, /images/hero-1920.webp 1920w, /images/hero-2560.webp 2560w"
          />
          <img
            src="/images/hero-1440.jpg"
            sizes="100vw"
            srcSet="/images/hero-960.jpg 960w, /images/hero-1440.jpg 1440w, /images/hero-1920.jpg 1920w, /images/hero-2560.jpg 2560w"
            alt="Holidaze — unlock exclusive deals on flights, hotels and vacation packages"
            width={3840}
            height={1118}
            fetchPriority="high"
            className="animate-settle h-auto w-full"
          />
        </picture>

        {/* Keeps the search legible wherever the photo runs bright. */}
        <div
          aria-hidden="true"
          className="from-deep-900/60 pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t to-transparent sm:block"
        />

        {/* Overlaid from sm up; below that it sits flush under the photo,
            because the mobile crop carries text all the way to its edge. */}
        <div
          className="animate-rise sm:absolute sm:inset-x-0 sm:bottom-0 sm:mx-auto sm:max-w-6xl sm:px-4"
          style={{ animationDelay: '120ms' }}
        >
          <VenueSearchBar
            value={search}
            onChange={setSearch}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </section>

      <VenueRail
        id="top-rated"
        title="Top rated stays"
        seeAllTo="/venues"
        venues={topRated.venues}
        isLoading={topRated.isLoading}
      />
      <VenueRail
        id="budget"
        title="Budget friendly stays"
        seeAllTo="/venues"
        venues={budget.venues}
        isLoading={budget.isLoading}
      />

      <section
        ref={promisesRef}
        data-reveal={promisesReveal}
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <div
          data-stagger
          className="border-sand-200 rounded-2xl border bg-white p-6 md:p-10"
        >
          <h2 className="text-ink-900 text-xl font-semibold tracking-tight">
            Book with confidence
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {PROMISES.map((promise) => (
              <li key={promise} className="text-ink-900/80 flex items-start gap-3">
                <span className="bg-sun-400/20 text-sun-600 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="m4 10.5 4 4 8-9" />
                  </svg>
                </span>
                <span className="text-[15px]">{promise}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        ref={faqRef}
        data-reveal={faqReveal}
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-10">
          <div data-stagger>
            <h2 className="text-ink-900 text-xl font-semibold tracking-tight text-balance">
              Frequently asked questions
            </h2>
            <p className="text-ink-900/70 mt-2 text-[15px]">
              Everything you need before your first booking.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <details
                key={faq.q}
                data-stagger
                style={{ [`--i`]: index + 1 } as CSSProperties}
                className="border-sand-200 group hover:border-brand-300 accordion rounded-2xl border bg-white p-5 transition-colors duration-150"
              >
                <summary className="text-ink-900 flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">
                  {faq.q}
                  <span className="bg-sand-100 text-ink-900/70 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform group-open:rotate-180">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-3.5 w-3.5"
                    >
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
                <p className="text-ink-900/70 mt-3 text-[15px]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
