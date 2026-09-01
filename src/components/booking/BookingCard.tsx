import { Link } from 'react-router-dom'
import type { Booking } from '../../types/booking'
import { formatDate } from '../../utils/date'
import { Button } from '../ui/Button'

interface BookingCardProps {
  booking: Booking
  onCancel?: (id: string) => void
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const venue = booking.venue
  const image = venue?.media?.[0]

  return (
    <div className="border-sand-200 flex gap-4 rounded-lg border bg-white p-4">
      <img
        src={image?.url || '/images/no-image-icon.png'}
        alt={image?.alt || venue?.name || ''}
        className="bg-sand-100 h-20 w-28 shrink-0 rounded-md object-cover"
      />
      <div className="flex-1">
        {venue ? (
          <Link
            to={`/venues/${venue.id}`}
            className="text-ink-900 hover:text-brand-600 font-medium"
          >
            {venue.name}
          </Link>
        ) : (
          <p className="text-ink-900 font-medium">Venue</p>
        )}
        <p className="text-ink-900/60 mt-1 text-sm">
          {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)} · {booking.guests}{' '}
          guest
          {booking.guests > 1 ? 's' : ''}
        </p>
      </div>
      {onCancel && (
        <Button variant="secondary" onClick={() => onCancel(booking.id)}>
          Cancel
        </Button>
      )}
    </div>
  )
}
