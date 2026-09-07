import { useState } from 'react'
import type { Venue } from '../../types/venue'
import { useSimilarVenues } from '../../hooks/useSimilarVenues'
import { VenueGrid } from './VenueGrid'
import { Spinner } from '../ui/Spinner'

const TABS = ['Information', 'View on map', 'Suggestions'] as const
type Tab = (typeof TABS)[number]

const tabClasses = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
    active
      ? 'border-brand-600 text-brand-600 bg-brand-50'
      : 'border-sand-200 text-ink-900/70 hover:bg-sand-100'
  }`

export function VenueDetailTabs({ venue }: { venue: Venue }) {
  const [tab, setTab] = useState<Tab>('Information')
  const { venues: similar, isLoading: isLoadingSimilar } = useSimilarVenues(venue.id, 4)

  return (
    <div>
      <div role="tablist" aria-label="Venue details" className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={tabClasses(tab === t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        className="border-sand-200 mt-3 rounded-2xl border bg-white p-5 shadow-sm"
      >
        {tab === 'Information' &&
          (venue.description ? (
            <p className="text-ink-900/80 whitespace-pre-line">{venue.description}</p>
          ) : (
            <p className="text-ink-900/50 text-sm">No description provided.</p>
          ))}

        {tab === 'View on map' && (
          <div className="bg-sand-100 flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="text-ink-900/30 h-8 w-8 fill-current"
            >
              <path d="M10 1.5a6.5 6.5 0 0 0-6.5 6.5c0 4.5 6.5 10.5 6.5 10.5s6.5-6 6.5-10.5A6.5 6.5 0 0 0 10 1.5Zm0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
            </svg>
            <p className="text-ink-900/50 text-sm">Map view coming soon</p>
          </div>
        )}

        {tab === 'Suggestions' &&
          (isLoadingSimilar ? (
            <Spinner label="Loading suggestions" />
          ) : (
            <VenueGrid venues={similar} />
          ))}
      </div>
    </div>
  )
}
