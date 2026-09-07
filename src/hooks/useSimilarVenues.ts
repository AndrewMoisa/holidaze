import { useEffect, useState } from 'react'
import { getVenues } from '../api/venues'
import type { Venue } from '../types/venue'

export function useSimilarVenues(excludeId: string | undefined, limit = 4) {
  const [venues, setVenues] = useState<Venue[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      try {
        const res = await getVenues({ sort: 'rating', sortOrder: 'desc', limit: limit + 1 })
        if (!cancelled) {
          setVenues(res.data.filter((venue) => venue.id !== excludeId).slice(0, limit))
        }
      } catch {
        // suggestions are non-critical — fail silently
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [excludeId, limit])

  return { venues, isLoading }
}
