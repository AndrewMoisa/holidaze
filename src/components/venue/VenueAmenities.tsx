import type { ReactNode } from 'react'
import type { VenueMeta } from '../../types/venue'

const icon = (path: ReactNode) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-ink-900/70 h-4.5 w-4.5 shrink-0"
  >
    {path}
  </svg>
)

const AMENITIES: Record<keyof VenueMeta, { label: string; icon: ReactNode }> = {
  wifi: {
    label: 'Wifi',
    icon: icon(
      <>
        <path d="M2.5 7.5a11 11 0 0 1 15 0M5.5 10.7a7 7 0 0 1 9 0M8.3 13.9a3 3 0 0 1 3.4 0" />
        <path d="M10 17h.01" />
      </>,
    ),
  },
  parking: {
    label: 'Parking',
    icon: icon(
      <>
        <rect x="3" y="3" width="14" height="14" rx="3" />
        <path d="M8 14V6h2.8a2.6 2.6 0 0 1 0 5.2H8" />
      </>,
    ),
  },
  breakfast: {
    label: 'Breakfast',
    icon: icon(
      <>
        <path d="M3 8h11a3 3 0 0 1 0 6h-1" />
        <path d="M3 8v4a4 4 0 0 0 4 4h3a4 4 0 0 0 4-4" />
        <path d="M6 3v2M9.5 3v2" />
      </>,
    ),
  },
  pets: {
    label: 'Pets allowed',
    icon: icon(
      <>
        <circle cx="6" cy="7" r="1.6" />
        <circle cx="10" cy="5.5" r="1.6" />
        <circle cx="14" cy="7" r="1.6" />
        <path d="M10 10c-2.2 0-4 1.7-4 3.6C6 15.4 7.4 16.5 10 16.5s4-1.1 4-2.9c0-1.9-1.8-3.6-4-3.6Z" />
      </>,
    ),
  },
}

export function VenueAmenities({ meta }: { meta: VenueMeta }) {
  const entries = (Object.keys(AMENITIES) as (keyof VenueMeta)[]).filter(
    (key) => meta[key],
  )

  if (entries.length === 0) return null

  return (
    <ul className="grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map((key) => (
        <li key={key} className="text-ink-900 flex items-center gap-3 text-[15px]">
          {AMENITIES[key].icon}
          {AMENITIES[key].label}
        </li>
      ))}
    </ul>
  )
}
