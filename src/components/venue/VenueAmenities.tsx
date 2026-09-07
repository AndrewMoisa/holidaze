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
          className="bg-sun-400/15 text-sun-600 rounded-full px-3 py-1 text-sm font-medium"
        >
          {LABELS[key]}
        </li>
      ))}
    </ul>
  )
}
