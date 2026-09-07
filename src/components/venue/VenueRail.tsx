import { Link } from 'react-router-dom'
import type { Venue } from '../../types/venue'
import { VenueCard } from './VenueCard'
import { VenueCardSkeleton } from './VenueCardSkeleton'
import { useInView } from '../../hooks/useInView'

interface VenueRailProps {
  id?: string
  title: string
  /** Optional link to a fuller listing, shown beside the title. */
  seeAllTo?: string
  venues: Venue[]
  isLoading: boolean
}

const RAIL_CLASSES = 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'

export function VenueRail({ id, title, seeAllTo, venues, isLoading }: VenueRailProps) {
  const { ref, reveal } = useInView<HTMLElement>()

  if (!isLoading && venues.length === 0) return null

  return (
    <section
      id={id}
      ref={ref}
      data-reveal={reveal}
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-8"
    >
      <div data-stagger className="flex items-baseline justify-between gap-4">
        <h2 className="text-ink-900 text-xl font-semibold tracking-tight">{title}</h2>
        {seeAllTo && (
          <Link
            to={seeAllTo}
            className="text-brand-600 hover:text-brand-700 -my-1 py-1 text-sm font-medium transition-colors duration-150"
          >
            See all
          </Link>
        )}
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className={RAIL_CLASSES} role="status" aria-label={`Loading ${title}`}>
            {Array.from({ length: 5 }, (_, index) => (
              <VenueCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className={RAIL_CLASSES}>
            {venues.map((venue, index) => (
              <VenueCard key={venue.id} venue={venue} index={index + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
