interface VenueSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function VenueSearchBar({ value, onChange }: VenueSearchBarProps) {
  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="text-ink-900/40 pointer-events-none absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2"
      >
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="m18 18-4.35-4.35"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search venues by name or description…"
        aria-label="Search venues"
        className="focus:border-brand-500 focus:ring-brand-500 border-sand-200 w-full rounded-lg border bg-white py-3 pr-4 pl-10 text-sm outline-none focus:ring-1"
      />
    </div>
  )
}
