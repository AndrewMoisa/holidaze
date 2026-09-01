import { Link, useParams } from 'react-router-dom'
import { useVenue } from '../hooks/useVenue'
import { useAuth } from '../hooks/useAuth'
import { VenueGallery } from '../components/venue/VenueGallery'
import { VenueAmenities } from '../components/venue/VenueAmenities'
import { AvailabilityCalendar } from '../components/booking/AvailabilityCalendar'
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
      <h1 className="text-ink-900 text-2xl font-semibold">{venue.name}</h1>
      {location && <p className="text-ink-900/60 mt-1">{location}</p>}

      <div className="mt-6">
        <VenueGallery media={venue.media} venueName={venue.name} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {venue.description && (
            <p className="text-ink-900/80 whitespace-pre-line">{venue.description}</p>
          )}

          <div className="text-ink-900/70 text-sm">
            Sleeps up to {venue.maxGuests} guests
          </div>

          <VenueAmenities meta={venue.meta} />

          <div>
            <h2 className="text-ink-900 mb-3 text-lg font-medium">Availability</h2>
            <AvailabilityCalendar bookedRanges={bookedRanges} />
          </div>
        </div>

        <aside className="border-sand-200 h-fit rounded-lg border bg-white p-5">
          <p className="text-ink-900 text-xl font-semibold">
            {formatPrice(venue.price)}{' '}
            <span className="text-ink-900/50 text-sm font-normal">/ night</span>
          </p>

          {isAuthenticated ? (
            <p className="text-ink-900/60 mt-4 text-sm">Booking is coming soon.</p>
          ) : (
            <Link
              to="/login"
              state={{ from: { pathname: `/venues/${venue.id}` } }}
              className="bg-brand-600 hover:bg-brand-700 mt-4 block rounded-md px-4 py-2 text-center text-sm font-medium text-white transition-colors"
            >
              Log in to book
            </Link>
          )}
        </aside>
      </div>
    </div>
  )
}
