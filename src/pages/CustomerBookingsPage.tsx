import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getProfileBookings } from '../api/profiles'
import { deleteBooking } from '../api/bookings'
import { ApiError } from '../api/client'
import type { Booking } from '../types/booking'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { BookingList } from '../components/booking/BookingList'
import { Modal } from '../components/ui/Modal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function CustomerBookingsPage() {
  const { profile } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)
  const [cancelError, setCancelError] = useState<string | null>(null)

  const name = profile?.name

  useDocumentTitle('My bookings')

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

  const handleCancel = (id: string) => {
    setCancelError(null)
    setBookingToCancel(bookings.find((booking) => booking.id === id) ?? null)
  }

  const confirmCancel = async () => {
    if (!bookingToCancel) return

    setIsCancelling(true)
    setCancelError(null)
    try {
      await deleteBooking(bookingToCancel.id)
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingToCancel.id))
      setBookingToCancel(null)
    } catch (err) {
      setCancelError(err instanceof ApiError ? err.message : 'Failed to cancel booking')
    } finally {
      setIsCancelling(false)
    }
  }

  const now = new Date()
  const upcoming = bookings.filter((booking) => new Date(booking.dateTo) >= now)
  const past = bookings.filter((booking) => new Date(booking.dateTo) < now)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="display text-ink-900 text-4xl! font-semibold">My bookings</h1>

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

          <hr className="border-sand-200" />

          <section>
            <h2 className="text-ink-900 mb-3 text-lg font-medium">Past</h2>
            <BookingList bookings={past} emptyMessage="No past bookings." />
          </section>
        </div>
      )}

      {bookingToCancel && (
        <Modal
          title="Cancel this booking?"
          confirmLabel="Cancel booking"
          cancelLabel="Keep it"
          variant="danger"
          isConfirming={isCancelling}
          onConfirm={confirmCancel}
          onCancel={() => setBookingToCancel(null)}
        >
          {cancelError ? (
            <ErrorMessage message={cancelError} />
          ) : (
            `Your stay at ${bookingToCancel.venue?.name ?? 'this venue'} will be released. This cannot be undone.`
          )}
        </Modal>
      )}
    </div>
  )
}
