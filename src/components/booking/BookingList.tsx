import type { Booking } from '../../types/booking'
import { BookingCard } from './BookingCard'
import { EmptyState } from '../ui/EmptyState'

interface BookingListProps {
  bookings: Booking[]
  emptyMessage: string
  onCancel?: (id: string) => void
}

export function BookingList({ bookings, emptyMessage, onCancel }: BookingListProps) {
  if (bookings.length === 0) return <EmptyState title={emptyMessage} />

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  )
}
