import { useEffect, useState } from 'react'
import { getVenues } from '../api/venues'
import type { Venue } from '../types/venue'

/**
 * Seeded listings include placeholder entries with a price of 0 and no photo.
 * Those are dropped here so the curated rails lead with real venues; entries
 * without media are only used to top the rail up when nothing better is left.
 */
function curate(venues: Venue[], limit: number) {
  const priced = venues.filter((venue) => venue.price > 0)
  const withMedia = priced.filter((venue) => (venue.media?.length ?? 0) > 0)
  const rest = priced.filter((venue) => (venue.media?.length ?? 0) === 0)

  return [...withMedia, ...rest].slice(0, limit)
}

export function useVenueRail(sort: string, sortOrder: 'asc' | 'desc', limit: number) {
  const [venues, setVenues] = useState<Venue[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      try {
        // Over-fetch so there is enough left to show after filtering.
        const res = await getVenues({ sort, sortOrder, limit: limit * 4 })
        if (!cancelled) setVenues(curate(res.data, limit))
      } catch {
        // curated rails fail silently — the main explore section below still works
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [sort, sortOrder, limit])

  return { venues, isLoading }
}
