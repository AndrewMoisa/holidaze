import { useEffect, useState } from 'react'
import { getVenues } from '../api/venues'
import type { Venue } from '../types/venue'

export function useVenueRail(sort: string, sortOrder: 'asc' | 'desc', limit: number) {
  const [venues, setVenues] = useState<Venue[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      try {
        const res = await getVenues({ sort, sortOrder, limit })
        if (!cancelled) setVenues(res.data)
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
