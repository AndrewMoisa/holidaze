import type { VenueMeta } from '../../types/venue'

const LABELS: Record<keyof VenueMeta, string> = {
  wifi: 'Wifi',
  parking: 'Parking',
  breakfast: 'Breakfast',
  pets: 'Pets allowed',
}

export function VenueAmenities({ meta }: { meta: VenueMeta }) {
  const entries = (Object.keys(LABELS) as (keyof VenueMeta)[]).filter((key) => meta[key])

  if (entries.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-2">
      {entries.map((key) => (
        <li
          key={key}
          className="border-sand-200 text-ink-900/80 rounded-full border bg-white px-3 py-1 text-sm"
        >
          {LABELS[key]}
        </li>
      ))}
    </ul>
  )
}
