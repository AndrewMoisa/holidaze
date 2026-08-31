import { useParams } from 'react-router-dom'

export function VenueDetailPage() {
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-ink-900 text-2xl font-semibold">Venue {id}</h1>
      <p className="text-ink-900/60 mt-2">Venue details and availability coming soon.</p>
    </div>
  )
}
