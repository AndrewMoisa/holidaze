import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Venue } from '../../types/venue'
import { formatPrice } from '../../utils/currency'
import { VenueImage } from '../ui/VenueImage'

/** `index` drives the stagger when cards appear in a revealed grid or rail. */
export function VenueCard({ venue, index = 0 }: { venue: Venue; index?: number }) {
  const image = venue.media?.[0]
  const location = [venue.location.city, venue.location.country]
    .filter(Boolean)
    .join(', ')
  const stays = venue._count?.bookings ?? 0

  return (
    <Link
      to={`/venues/${venue.id}`}
      data-stagger
      style={{ '--i': index } as CSSProperties}
      className="border-sand-200 hover:border-brand-300 group ease-out-soft flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="bg-sand-100 relative aspect-[4/3] overflow-hidden">
        <VenueImage
          src={image?.url}
          alt={image?.alt || venue.name}
          loading="lazy"
          className="ease-out-soft h-full w-full object-cover transition-transform duration-250 group-hover:scale-104"
        />
        {venue.rating != null && venue.rating > 0 && (
          <span className="text-ink-900 absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold shadow">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="text-sun-400 h-3.5 w-3.5 fill-current"
            >
              <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
            </svg>
            {venue.rating.toFixed(1)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-ink-900 truncate font-medium">{venue.name}</h3>
        {/* Rendered even when empty so prices stay on one baseline across a row. */}
        <p className="text-ink-900/60 mt-1 h-5 truncate text-sm">
          {location || '\u00A0'}
        </p>
        <div className="mt-auto flex items-baseline justify-between gap-2 pt-2">
          <p className="font-display text-ink-900 text-base font-semibold tabular-nums">
            {formatPrice(venue.price)}{' '}
            <span className="text-ink-900/50 font-sans text-sm font-normal">/ night</span>
          </p>
          {stays > 0 && (
            <p className="text-ink-900/45 hidden shrink-0 text-xs tabular-nums sm:block">
              {stays} stay{stays === 1 ? '' : 's'}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
