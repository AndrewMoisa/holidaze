import { useParams } from 'react-router-dom'

interface ManagerVenueFormPageProps {
  mode: 'create' | 'edit'
}

export function ManagerVenueFormPage({ mode }: ManagerVenueFormPageProps) {
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-ink-900 text-2xl font-semibold">
        {mode === 'create' ? 'Create venue' : `Edit venue ${id}`}
      </h1>
      <p className="text-ink-900/60 mt-2">Venue form coming soon.</p>
    </div>
  )
}
