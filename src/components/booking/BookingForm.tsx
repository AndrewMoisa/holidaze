import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { DayPicker, type DateRange } from 'react-day-picker'
import { createBooking } from '../../api/bookings'
import { ApiError } from '../../api/client'
import { Button } from '../ui/Button'
import { ErrorMessage } from '../ui/ErrorMessage'
import { formatPrice } from '../../utils/currency'
import { calendarClassNames } from './calendarClassNames'
import type { Venue } from '../../types/venue'

interface BookingFormProps {
  venue: Venue
  bookedRanges: { from: Date; to: Date }[]
}

function nightsBetween(from: Date, to: Date) {
  return Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
}

export function BookingForm({ venue, bookedRanges }: BookingFormProps) {
  const navigate = useNavigate()
  const [range, setRange] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nights = range?.from && range?.to ? nightsBetween(range.from, range.to) : 0

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!range?.from || !range?.to) {
      setError('Select a check-in and check-out date.')
      return
    }
    if (guests < 1 || guests > venue.maxGuests) {
      setError(`Guests must be between 1 and ${venue.maxGuests}.`)
      return
    }

    setIsSubmitting(true)
    try {
      await createBooking({
        dateFrom: range.from.toISOString(),
        dateTo: range.to.toISOString(),
        guests,
        venueId: venue.id,
      })
      navigate('/my-bookings')
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to create booking. Try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage message={error} />}

      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        excludeDisabled
        min={2}
        numberOfMonths={2}
        disabled={[{ before: new Date() }, ...bookedRanges]}
        classNames={calendarClassNames}
      />

      <div>
        <label htmlFor="guests" className="text-ink-900 mb-1 block text-sm font-medium">
          Guests
        </label>
        <input
          id="guests"
          type="number"
          min={1}
          max={venue.maxGuests}
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          className="focus:border-brand-500 focus:ring-brand-500 border-sand-200 w-24 rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-1"
        />
      </div>

      {nights > 0 && (
        <p className="text-ink-900/70 text-sm">
          {nights} night{nights > 1 ? 's' : ''} · {formatPrice(venue.price * nights)}{' '}
          total
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Booking…' : 'Book now'}
      </Button>
    </form>
  )
}
