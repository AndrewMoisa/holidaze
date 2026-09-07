import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useManagerVenues } from '../hooks/useManagerVenues'
import { deleteVenue } from '../api/venues'
import { ApiError } from '../api/client'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { EmptyState } from '../components/ui/EmptyState'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { formatPrice } from '../utils/currency'
import type { Venue } from '../types/venue'

export function ManagerVenuesPage() {
  const { profile } = useAuth()
  const { venues, setVenues, isLoading, error } = useManagerVenues(profile?.name)
  const [venueToDelete, setVenueToDelete] = useState<Venue | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!venueToDelete) return

    setIsDeleting(true)
    setDeleteError(null)
    try {
      await deleteVenue(venueToDelete.id)
      setVenues((prev) => prev.filter((venue) => venue.id !== venueToDelete.id))
      setVenueToDelete(null)
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : 'Failed to delete venue')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="display text-ink-900 text-4xl! font-semibold">My venues</h1>
        <Link
          to="/manager/venues/new"
          className="bg-brand-600 hover:bg-brand-700 rounded-xl px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          Create venue
        </Link>
      </div>

      {isLoading && <Spinner label="Loading your venues" />}
      {!isLoading && error && <ErrorMessage message={error} />}

      {!isLoading &&
        !error &&
        (venues.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="You haven't created any venues yet"
              description="Create your first venue to start accepting bookings."
            />
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="border-sand-200 flex items-center gap-4 rounded-2xl border bg-white p-4"
              >
                <img
                  src={venue.media?.[0]?.url || '/images/no-image-icon.png'}
                  alt={venue.media?.[0]?.alt || venue.name}
                  className="bg-sand-100 h-16 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <Link
                    to={`/venues/${venue.id}`}
                    className="text-ink-900 hover:text-brand-600 -my-0.5 inline-block py-0.5 font-medium"
                  >
                    {venue.name}
                  </Link>
                  <div className="mt-1.5 flex items-center gap-2">
                    <p className="text-ink-900/60 text-sm">
                      {formatPrice(venue.price)} / night
                    </p>
                    <span className="bg-brand-100 text-brand-700 rounded-full px-2.5 py-0.5 text-xs font-medium">
                      {venue.bookings?.length ?? 0} booking
                      {venue.bookings?.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/manager/venues/${venue.id}/bookings`}
                    className="border-sand-200 text-ink-900 hover:bg-sand-100 rounded-xl border px-3 py-1.5 text-sm transition-colors"
                  >
                    Bookings
                  </Link>
                  <Link
                    to={`/manager/venues/${venue.id}/edit`}
                    className="border-sand-200 text-ink-900 hover:bg-sand-100 rounded-xl border px-3 py-1.5 text-sm transition-colors"
                  >
                    Edit
                  </Link>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => setVenueToDelete(venue)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}

      {venueToDelete && (
        <Modal
          title={`Delete "${venueToDelete.name}"?`}
          confirmLabel="Delete"
          variant="danger"
          isConfirming={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setVenueToDelete(null)}
        >
          {deleteError ? (
            <ErrorMessage message={deleteError} />
          ) : (
            'This cannot be undone.'
          )}
        </Modal>
      )}
    </div>
  )
}
