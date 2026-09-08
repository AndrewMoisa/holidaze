import type { VenueMeta } from '../../types/venue'
import {
  AMENITY_FILTERS,
  GUEST_OPTIONS,
  SORT_OPTIONS,
  type SortKey,
  type VenueFilters,
} from '../../utils/venueFilters'
import { VenueSearchBar } from './VenueSearchBar'

interface VenueFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  sort: SortKey
  onSortChange: (sort: SortKey) => void
  filters: VenueFilters
  onToggleAmenity: (amenity: keyof VenueMeta) => void
  onGuestsChange: (guests: number | null) => void
  onClear: () => void
}

const chipClasses = (active: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-sm font-medium transition-[colors,transform] duration-150 active:scale-[0.97] ${
    active
      ? 'border-brand-600 bg-brand-600 text-white'
      : 'border-sand-400 bg-white text-ink-900/70 hover:border-brand-600 hover:text-ink-900'
  }`

export function VenueFilterBar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  filters,
  onToggleAmenity,
  onGuestsChange,
  onClear,
}: VenueFilterBarProps) {
  const hasFilters = filters.amenities.length > 0 || filters.guests !== null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <VenueSearchBar value={search} onChange={onSearchChange} variant="inline" />
        </div>

        <label htmlFor="sort" className="flex shrink-0 items-center gap-2 text-sm">
          <span className="text-ink-900/70">Sort by</span>
          <select
            id="sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortKey)}
            className="border-sand-400 text-ink-900 h-12 rounded-full border bg-white px-4 text-sm font-medium"
          >
            {(Object.keys(SORT_OPTIONS) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {SORT_OPTIONS[key].label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {AMENITY_FILTERS.map(({ key, label }) => {
          const active = filters.amenities.includes(key)
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => onToggleAmenity(key)}
              className={chipClasses(active)}
            >
              {label}
            </button>
          )
        })}

        <span className="bg-sand-200 mx-1 hidden h-6 w-px sm:block" />

        <label htmlFor="guests-filter" className="flex items-center gap-2 text-sm">
          <span className="text-ink-900/70">Guests</span>
          <select
            id="guests-filter"
            value={filters.guests ?? ''}
            onChange={(event) =>
              onGuestsChange(event.target.value ? Number(event.target.value) : null)
            }
            className="border-sand-400 text-ink-900 rounded-full border bg-white px-3 py-1.5 text-sm font-medium"
          >
            <option value="">Any</option>
            {GUEST_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count}+
              </option>
            ))}
          </select>
        </label>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-brand-600 hover:text-brand-700 ml-1 text-sm font-medium underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
