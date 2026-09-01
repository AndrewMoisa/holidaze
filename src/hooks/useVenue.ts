import { useEffect, useState } from 'react'
import { getVenue } from '../api/venues'
import { ApiError } from '../api/client'
import type { Venue } from '../types/venue'

export function useVenue(id: string | undefined) {
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
        if (cancelled) return
        setVenue(res.data)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof ApiError ? err.message : 'Failed to load this venue')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [id])

  return { venue, isLoading, error }
}
