import type { Venue } from '../../types/venue'
import { VenueCard } from './VenueCard'
import { VenueCardSkeleton } from './VenueCardSkeleton'
import { EmptyState } from '../ui/EmptyState'

const GRID_CLASSES = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'

interface VenueGridProps {
  venues: Venue[]
  emptyTitle?: string
  emptyDescription?: string
}

export function VenueGrid({
  venues,
  emptyTitle = 'No venues found',
  emptyDescription = 'Try a different search, or clear your filters.',
}: VenueGridProps) {
  if (venues.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className={GRID_CLASSES}>
      {venues.map((venue, index) => (
        <VenueCard key={venue.id} venue={venue} index={index} />
      ))}
    </div>
  )
}

/** Placeholder grid that holds the same layout while venues load. */
export function VenueGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={GRID_CLASSES} role="status" aria-label="Loading venues">
      {Array.from({ length: count }, (_, index) => (
        <VenueCardSkeleton key={index} />
      ))}
    </div>
  )
}
