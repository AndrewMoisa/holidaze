import type { Venue } from '../../types/venue'
import { VenueCard } from './VenueCard'
import { Spinner } from '../ui/Spinner'

interface VenueRailProps {
  id?: string
  title: string
  venues: Venue[]
  isLoading: boolean
}

export function VenueRail({ id, title, venues, isLoading }: VenueRailProps) {
  if (!isLoading && venues.length === 0) return null

  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-8">
      <h2 className="text-ink-900 text-xl font-semibold">{title}</h2>
      <div className="mt-4">
        {isLoading ? (
          <Spinner label={`Loading ${title}`} />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
