import { Link, useParams } from 'react-router-dom'
import { useVenue } from '../hooks/useVenue'
import { useAuth } from '../hooks/useAuth'
import { VenueGallery } from '../components/venue/VenueGallery'
import { VenueAmenities } from '../components/venue/VenueAmenities'
import { VenueDetailTabs } from '../components/venue/VenueDetailTabs'
import { AvailabilityCalendar } from '../components/booking/AvailabilityCalendar'
import { BookingForm } from '../components/booking/BookingForm'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { formatPrice } from '../utils/currency'
import { getDisabledRanges } from '../utils/date'

export function VenueDetailPage() {
  const { id } = useParams()
  const { venue, isLoading, error } = useVenue(id)
  const { isAuthenticated } = useAuth()

  if (isLoading) return <Spinner label="Loading venue" />
  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ErrorMessage message={error} />
      </div>
    )
  }
  if (!venue) return null

  const location = [venue.location.city, venue.location.country]
    .filter(Boolean)
    .join(', ')
  const bookedRanges = getDisabledRanges(venue.bookings ?? [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-ink-900 text-3xl font-semibold">{venue.name}</h1>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        {location && (
          <p className="text-ink-900/60 flex items-center gap-1">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0 fill-current">
              <path d="M10 1.5a6.5 6.5 0 0 0-6.5 6.5c0 4.5 6.5 10.5 6.5 10.5s6.5-6 6.5-10.5A6.5 6.5 0 0 0 10 1.5Zm0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
            </svg>
            {location}
          </p>
        )}
        {venue.rating != null && venue.rating > 0 && (
          <span className="bg-sun-400/15 text-sun-600 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
              <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
            </svg>
            {venue.rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2">
          <VenueGallery media={venue.media} venueName={venue.name} />
        </div>

        <aside className="border-sand-200 h-fit overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="bg-sun-400 h-1.5 w-full" />
          <div className="p-5">
            <p className="text-brand-600 text-xs font-semibold tracking-wide uppercase">
              Check availability
            </p>
            <p className="font-display text-ink-900 mt-1 text-2xl font-semibold">
              {formatPrice(venue.price)}{' '}
              <span className="text-ink-900/50 font-sans text-sm font-normal">
                / night
              </span>
            </p>

            {isAuthenticated ? (
              <div className="mt-4">
                <BookingForm venue={venue} bookedRanges={bookedRanges} />
              </div>
            ) : (
              <>
                <div className="mt-4">
                  <AvailabilityCalendar bookedRanges={bookedRanges} numberOfMonths={1} />
                </div>
                <Link
                  to="/login"
                  state={{ from: { pathname: `/venues/${venue.id}` } }}
                  className="bg-brand-600 hover:bg-brand-700 mt-4 block rounded-xl px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
                >
                  Log in to book
                </Link>
              </>
            )}
          </div>
        </aside>
      </div>

      <div className="mt-8 space-y-6">
        <VenueDetailTabs venue={venue} />

        <div className="text-ink-900/70 flex items-center gap-1.5 text-sm">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0 fill-current">
            <path d="M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 1.5c-3 0-6.5 1.5-6.5 4.25V17h13v-1.25c0-2.75-3.5-4.25-6.5-4.25Z" />
          </svg>
          Sleeps up to {venue.maxGuests} guests
        </div>

        <VenueAmenities meta={venue.meta} />
      </div>
    </div>
  )
}
