import { Link, useParams } from 'react-router-dom'
import { useVenue } from '../hooks/useVenue'
import { useAuth } from '../hooks/useAuth'
import { useSimilarVenues } from '../hooks/useSimilarVenues'
import { VenueGallery } from '../components/venue/VenueGallery'
import { VenueAmenities } from '../components/venue/VenueAmenities'
import { VenueMap } from '../components/venue/VenueMap'
import { AvailabilityRibbon } from '../components/venue/AvailabilityRibbon'
import { VenueRail } from '../components/venue/VenueRail'
import { AvailabilityCalendar } from '../components/booking/AvailabilityCalendar'
import { BookingForm } from '../components/booking/BookingForm'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { formatPrice } from '../utils/currency'
import { getDisabledRanges } from '../utils/date'
import { stripHtml } from '../utils/text'

export function VenueDetailPage() {
  const { id } = useParams()
  const { venue, isLoading, error } = useVenue(id)
  const { isAuthenticated } = useAuth()
  const { venues: similar, isLoading: isLoadingSimilar } = useSimilarVenues(id, 5)

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
  const description = venue.description ? stripHtml(venue.description) : ''
  const { lat, lng } = venue.location
  const hasCoordinates = lat != null && lng != null && (lat !== 0 || lng !== 0)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/venues"
        className="text-ink-900/60 hover:text-brand-600 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 4 6 10l6 6" />
        </svg>
        All venues
      </Link>

      <h1 className="display text-ink-900 mt-4 font-semibold text-balance">
        {venue.name}
      </h1>

      <div className="text-ink-900/70 mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
        {venue.rating != null && venue.rating > 0 && (
          <span className="text-ink-900 flex items-center gap-1.5 font-medium">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="text-sun-400 h-4 w-4 fill-current"
            >
              <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
            </svg>
            {venue.rating.toFixed(1)}
          </span>
        )}
        {location && (
          <span className="flex items-center gap-1.5">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4 shrink-0 fill-current"
            >
              <path d="M10 1.5a6.5 6.5 0 0 0-6.5 6.5c0 4.5 6.5 10.5 6.5 10.5s6.5-6 6.5-10.5A6.5 6.5 0 0 0 10 1.5Zm0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
            </svg>
            {location}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4 shrink-0 fill-current"
          >
            <path d="M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 1.5c-3 0-6.5 1.5-6.5 4.25V17h13v-1.25c0-2.75-3.5-4.25-6.5-4.25Z" />
          </svg>
          Sleeps up to {venue.maxGuests} guests
        </span>
      </div>

      {/*
        Three grid siblings so the source order (gallery → booking → text) is
        what phones and tablets get, while the explicit placement at lg keeps
        the desktop layout: text under the gallery, panel sticky on the right.
      */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2">
          <VenueGallery media={venue.media} venueName={venue.name} />
        </div>

        <aside className="border-sand-200 h-fit rounded-2xl border bg-white p-5 shadow-md lg:sticky lg:top-24 lg:col-start-3 lg:row-span-2 lg:row-start-1">
          <p className="text-brand-600 text-xs font-semibold tracking-wide uppercase">
            Check availability
          </p>
          <p className="font-display text-ink-900 mt-1 text-2xl font-semibold tabular-nums">
            {formatPrice(venue.price)}{' '}
            <span className="text-ink-900/50 font-sans text-sm font-normal">/ night</span>
          </p>

          <div className="border-sand-200 mt-5 border-t pt-5">
            <AvailabilityRibbon bookedRanges={bookedRanges} />
          </div>

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
                className="bg-brand-600 hover:bg-brand-700 mt-4 block rounded-xl px-4 py-2.5 text-center text-sm font-medium text-white transition-colors"
              >
                Log in to book
              </Link>
            </>
          )}
        </aside>

        <div className="space-y-10 lg:col-span-2 lg:col-start-1 lg:row-start-2">
          <section>
            <h2 className="text-ink-900 text-xl font-semibold tracking-tight">
              About this place
            </h2>
            {description ? (
              <p className="text-ink-900/80 mt-3 text-[15px] whitespace-pre-line">
                {description}
              </p>
            ) : (
              <p className="text-ink-900/50 mt-3 text-[15px]">No description provided.</p>
            )}
          </section>

          <section>
            <h2 className="text-ink-900 text-xl font-semibold tracking-tight">
              What this place offers
            </h2>
            <div className="mt-4">
              <VenueAmenities meta={venue.meta} />
            </div>
          </section>

          {hasCoordinates && (
            <section>
              <h2 className="text-ink-900 text-xl font-semibold tracking-tight">
                Where you'll be
              </h2>
              {location && <p className="text-ink-900/60 mt-1 text-[15px]">{location}</p>}
              <div className="mt-4">
                <VenueMap lat={lat} lng={lng} label={venue.name} />
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="-mx-4 mt-6">
        <VenueRail
          title="Similar stays"
          seeAllTo="/venues"
          venues={similar.filter((item) => item.id !== venue.id)}
          isLoading={isLoadingSimilar}
        />
      </div>
    </div>
  )
}
