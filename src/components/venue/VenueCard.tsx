import { Link } from 'react-router-dom'
import type { Venue } from '../../types/venue'
import { formatPrice } from '../../utils/currency'

export function VenueCard({ venue }: { venue: Venue }) {
  const image = venue.media?.[0]
  const location = [venue.location.city, venue.location.country]
    .filter(Boolean)
    .join(', ')

  return (
    <Link
      to={`/venues/${venue.id}`}
      className="border-sand-200 hover:border-brand-300 group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="bg-sand-100 relative aspect-[4/3] overflow-hidden">
        <img
          src={image?.url || '/images/no-image-icon.png'}
          alt={image?.alt || venue.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {venue.rating != null && venue.rating > 0 && (
          <span className="text-ink-900 absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold shadow">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="text-sun-400 h-3.5 w-3.5 fill-current">
              <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
            </svg>
            {venue.rating.toFixed(1)}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-ink-900 truncate font-medium">{venue.name}</h3>
        {location && <p className="text-ink-900/60 mt-1 truncate text-sm">{location}</p>}
        <p className="font-display text-ink-900 mt-2 text-base font-semibold">
          {formatPrice(venue.price)}{' '}
          <span className="text-ink-900/50 font-sans text-sm font-normal">/ night</span>
        </p>
      </div>
    </Link>
  )
}
