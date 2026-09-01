import type { Venue } from '../../types/venue'
import { VenueCard } from './VenueCard'
import { EmptyState } from '../ui/EmptyState'

export function VenueGrid({ venues }: { venues: Venue[] }) {
  if (venues.length === 0) {
    return (
      <EmptyState
        title="No venues found"
        description="Try a different search, or check back later."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  )
}
