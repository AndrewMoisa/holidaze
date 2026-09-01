interface VenueSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function VenueSearchBar({ value, onChange }: VenueSearchBarProps) {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search venues by name or description…"
        aria-label="Search venues"
        className="focus:border-brand-500 focus:ring-brand-500 border-sand-200 w-full rounded-md border bg-white px-4 py-2.5 text-sm outline-none focus:ring-1"
      />
    </div>
  )
}
