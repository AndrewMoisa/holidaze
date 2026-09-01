import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { createVenue, getVenue, updateVenue, type VenuePayload } from '../api/venues'
import { ApiError } from '../api/client'
import { VenueForm } from '../components/venue/VenueForm'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import type { VenueFormValues } from '../utils/schemas/venue.schema'
import type { Venue } from '../types/venue'

interface ManagerVenueFormPageProps {
  mode: 'create' | 'edit'
}

function venueToFormValues(venue: Venue): VenueFormValues {
  return {
    name: venue.name,
    description: venue.description ?? '',
    price: venue.price,
    maxGuests: venue.maxGuests,
    rating: venue.rating ?? 0,
    media: venue.media?.map((item) => ({ url: item.url, alt: item.alt ?? '' })) ?? [],
    wifi: venue.meta.wifi,
    parking: venue.meta.parking,
    breakfast: venue.meta.breakfast,
    pets: venue.meta.pets,
    address: venue.location.address ?? '',
    city: venue.location.city ?? '',
    zip: venue.location.zip ?? '',
    country: venue.location.country ?? '',
    continent: venue.location.continent ?? '',
  }
}

function toVenuePayload(values: VenueFormValues): VenuePayload {
  return {
    name: values.name,
    description: values.description,
    price: values.price,
    maxGuests: values.maxGuests,
    rating: values.rating,
    media: values.media.filter((item) => item.url),
    meta: {
      wifi: values.wifi,
      parking: values.parking,
      breakfast: values.breakfast,
      pets: values.pets,
    },
    location: {
      address: values.address || undefined,
      city: values.city || undefined,
      zip: values.zip || undefined,
      country: values.country || undefined,
      continent: values.continent || undefined,
    },
  }
}

export function ManagerVenueFormPage({ mode }: ManagerVenueFormPageProps) {
  const { id } = useParams()
  const { profile } = useAuth()
  const navigate = useNavigate()

  const [venue, setVenue] = useState<Venue | null>(null)
  const [isLoading, setIsLoading] = useState(mode === 'edit')
  const [loadError, setLoadError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (mode !== 'edit' || !id) return

    let cancelled = false

    async function load() {
      setIsLoading(true)
      setLoadError(null)
      try {
        const res = await getVenue(id as string, { owner: true })
        if (!cancelled) setVenue(res.data)
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof ApiError ? err.message : 'Failed to load venue')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [mode, id])

  const handleSubmit = async (values: VenueFormValues) => {
    setSubmitError(null)
    const payload = toVenuePayload(values)

    try {
      if (mode === 'create') {
        const res = await createVenue(payload)
        navigate(`/venues/${res.data.id}`)
      } else if (id) {
        await updateVenue(id, payload)
        navigate(`/venues/${id}`)
      }
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'Failed to save venue')
      throw err
    }
  }

  if (mode === 'edit' && isLoading) return <Spinner label="Loading venue" />

  if (mode === 'edit' && loadError) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <ErrorMessage message={loadError} />
      </div>
    )
  }

  if (mode === 'edit' && venue?.owner && profile && venue.owner.name !== profile.name) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <ErrorMessage message="You don't have permission to edit this venue." />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-ink-900 text-2xl font-semibold">
        {mode === 'create' ? 'Create venue' : 'Edit venue'}
      </h1>
      <div className="mt-6">
        <VenueForm
          defaultValues={venue ? venueToFormValues(venue) : undefined}
          onSubmit={handleSubmit}
          submitLabel={mode === 'create' ? 'Create venue' : 'Save changes'}
          formError={submitError}
        />
      </div>
    </div>
  )
}
