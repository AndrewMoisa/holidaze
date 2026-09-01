import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getVenue } from '../api/venues'
import { ApiError } from '../api/client'
import type { Venue } from '../types/venue'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { EmptyState } from '../components/ui/EmptyState'
import { formatDate } from '../utils/date'

export function ManagerVenueBookingsPage() {
  const { id } = useParams()
  const { profile } = useAuth()

  const [venue, setVenue] = useState<Venue | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await getVenue(id as string, { owner: true, bookings: true })
        if (!cancelled) setVenue(res.data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Failed to load bookings')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [id])

  if (isLoading) return <Spinner label="Loading bookings" />

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <ErrorMessage message={error} />
      </div>
    )
  }

  if (!venue) return null

  if (venue.owner && profile && venue.owner.name !== profile.name) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <ErrorMessage message="You don't have permission to view bookings for this venue." />
      </div>
    )
  }

  const bookings = venue.bookings ?? []

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/manager/venues" className="text-brand-600 text-sm underline">
        &larr; Back to my venues
      </Link>
      <h1 className="text-ink-900 mt-2 text-2xl font-semibold">
        Bookings for {venue.name}
      </h1>

      {bookings.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No bookings yet" />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border-sand-200 flex items-center justify-between rounded-lg border bg-white p-4"
            >
              <div>
                <p className="text-ink-900 font-medium">{booking.customer.name}</p>
                <p className="text-ink-900/60 mt-1 text-sm">
                  {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)} ·{' '}
                  {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
