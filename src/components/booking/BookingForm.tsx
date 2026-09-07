import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { DayPicker, type DateRange } from 'react-day-picker'
import { isSameDay } from 'date-fns'
import { createBooking } from '../../api/bookings'
import { ApiError } from '../../api/client'
import { Button } from '../ui/Button'
import { ErrorMessage } from '../ui/ErrorMessage'
import { formatPrice } from '../../utils/currency'
import { nightsBetween, toApiDate } from '../../utils/date'
import { calendarClassNames } from './calendarClassNames'
import type { Venue } from '../../types/venue'

interface BookingFormProps {
  venue: Venue
  bookedRanges: { from: Date; to: Date }[]
}

const formatDay = (date: Date) =>
  date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

export function BookingForm({ venue, bookedRanges }: BookingFormProps) {
  const navigate = useNavigate()
  const [range, setRange] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nights = range?.from && range?.to ? nightsBetween(range.from, range.to) : 0

  /**
   * `excludeDisabled` drops a range that spans booked nights and silently
   * restarts it from the clicked day, which reads as the calendar ignoring the
   * click — so that case is called out instead.
   */
  const handleSelect = (next: DateRange | undefined, triggerDate: Date) => {
    const wasChoosingCheckout = Boolean(range?.from && !range.to)
    const restarted = Boolean(next?.from && !next.to)

    if (
      wasChoosingCheckout &&
      restarted &&
      range?.from &&
      !isSameDay(triggerDate, range.from)
    ) {
      setNotice('Those dates cover nights that are already booked — pick another range.')
    } else {
      setNotice(null)
    }

    setError(null)
    setRange(next)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!range?.from || !range?.to) {
      setError('Select a check-in and check-out date.')
      return
    }
    if (nights < 1) {
      setError('A booking needs at least one night.')
      return
    }
    if (!Number.isInteger(guests) || guests < 1 || guests > venue.maxGuests) {
      setError(`Guests must be between 1 and ${venue.maxGuests}.`)
      return
    }

    setIsSubmitting(true)
    try {
      await createBooking({
        dateFrom: toApiDate(range.from),
        dateTo: toApiDate(range.to),
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

      <div className="border-sand-200 grid grid-cols-2 overflow-hidden rounded-xl border">
        <div className="border-sand-200 border-r px-3 py-2">
          <p className="text-ink-900/50 text-xs font-medium tracking-wide uppercase">
            Check-in
          </p>
          <p className="text-ink-900 mt-0.5 text-sm font-medium">
            {range?.from ? formatDay(range.from) : 'Add date'}
          </p>
        </div>
        <div className="px-3 py-2">
          <p className="text-ink-900/50 text-xs font-medium tracking-wide uppercase">
            Check-out
          </p>
          <p className="text-ink-900 mt-0.5 text-sm font-medium">
            {range?.to ? formatDay(range.to) : 'Add date'}
          </p>
        </div>
      </div>

      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        excludeDisabled
        resetOnSelect
        min={1}
        numberOfMonths={1}
        disabled={[{ before: new Date() }, ...bookedRanges]}
        classNames={calendarClassNames}
      />

      {notice && (
        <p role="status" className="text-sun-600 text-sm">
          {notice}
        </p>
      )}

      {range?.from && (
        <button
          type="button"
          onClick={() => {
            setRange(undefined)
            setNotice(null)
          }}
          className="text-ink-900/60 hover:text-brand-600 text-sm font-medium underline"
        >
          Clear dates
        </button>
      )}

      <div>
        <label htmlFor="guests" className="text-ink-900 mb-1 block text-sm font-medium">
          Guests
        </label>
        <select
          id="guests"
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          className="focus:border-brand-500 focus:ring-brand-500 border-sand-200 rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-1"
        >
          {Array.from({ length: venue.maxGuests }, (_, index) => index + 1).map(
            (count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ),
          )}
        </select>
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
