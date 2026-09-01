import { useEffect, useState } from 'react'
import { getProfileVenues } from '../api/profiles'
import { ApiError } from '../api/client'
import type { Venue } from '../types/venue'

export function useManagerVenues(name: string | undefined) {
  const [venues, setVenues] = useState<Venue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!name) return

    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await getProfileVenues(name as string, { bookings: true })
        if (!cancelled) setVenues(res.data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Failed to load your venues')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [name])

  return { venues, setVenues, isLoading, error }
}
