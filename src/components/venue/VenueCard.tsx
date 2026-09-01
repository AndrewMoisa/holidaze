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
      className="border-sand-200 hover:border-brand-300 group overflow-hidden rounded-lg border bg-white transition-colors"
    >
      <div className="bg-sand-100 aspect-[4/3] overflow-hidden">
        <img
          src={image?.url || '/images/no-image-icon.png'}
          alt={image?.alt || venue.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-ink-900 truncate font-medium">{venue.name}</h3>
        {location && <p className="text-ink-900/60 mt-1 truncate text-sm">{location}</p>}
        <p className="text-ink-900 mt-2 text-sm font-medium">
          {formatPrice(venue.price)}{' '}
          <span className="text-ink-900/50 font-normal">/ night</span>
        </p>
      </div>
    </Link>
  )
}
