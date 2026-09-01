import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getProfileBookings } from '../api/profiles'
import { deleteBooking } from '../api/bookings'
import { ApiError } from '../api/client'
import type { Booking } from '../types/booking'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { BookingList } from '../components/booking/BookingList'

export function CustomerBookingsPage() {
  const { profile } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const name = profile?.name

  useEffect(() => {
    if (!name) return

    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await getProfileBookings(name as string, { venue: true })
        if (!cancelled) setBookings(res.data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Failed to load your bookings')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [name])

  const handleCancel = async (id: string) => {
    if (!window.confirm('Cancel this booking?')) return

    try {
      await deleteBooking(id)
      setBookings((prev) => prev.filter((booking) => booking.id !== id))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to cancel booking')
    }
  }

  const now = new Date()
  const upcoming = bookings.filter((booking) => new Date(booking.dateTo) >= now)
  const past = bookings.filter((booking) => new Date(booking.dateTo) < now)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-ink-900 text-2xl font-semibold">My bookings</h1>

      {isLoading && <Spinner label="Loading your bookings" />}
      {!isLoading && error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <div className="mt-6 space-y-8">
          <section>
            <h2 className="text-ink-900 mb-3 text-lg font-medium">Upcoming</h2>
            <BookingList
              bookings={upcoming}
              onCancel={handleCancel}
              emptyMessage="No upcoming bookings."
            />
          </section>

          <section>
            <h2 className="text-ink-900 mb-3 text-lg font-medium">Past</h2>
            <BookingList bookings={past} emptyMessage="No past bookings." />
          </section>
        </div>
      )}
    </div>
  )
}
