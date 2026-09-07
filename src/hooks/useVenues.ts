import { useEffect, useState } from 'react'
import { getVenues, searchVenues } from '../api/venues'
import { ApiError } from '../api/client'
import type { ApiMeta } from '../types/api'
import type { Venue } from '../types/venue'

interface UseVenuesOptions {
  q?: string
  page?: number
  limit?: number
  sort?: string
  sortOrder?: 'asc' | 'desc'
}

export function useVenues({
  q,
  page = 1,
  limit = 12,
  sort = 'created',
  sortOrder = 'desc',
}: UseVenuesOptions) {
  const [venues, setVenues] = useState<Venue[]>([])
  const [meta, setMeta] = useState<ApiMeta>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const query = { page, limit, sort, sortOrder }
        const res = q ? await searchVenues(q, query) : await getVenues(query)

        if (cancelled) return
        setVenues(res.data)
        setMeta(res.meta)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof ApiError ? err.message : 'Failed to load venues')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [q, page, limit, sort, sortOrder])

  return { venues, meta, isLoading, error }
}
