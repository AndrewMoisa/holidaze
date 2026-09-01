interface VenueSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function VenueSearchBar({ value, onChange }: VenueSearchBarProps) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="from-brand-300 to-brand-500 rounded-full bg-gradient-to-r p-[3px] shadow-xl"
    >
      <div className="flex h-16 items-center rounded-full bg-white pr-1.5 pl-6">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search venues by name, description, or location…"
          aria-label="Search venues"
          className="text-ink-900 placeholder:text-ink-900/40 h-full flex-1 border-0 bg-transparent text-sm outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="from-brand-300 to-brand-500 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r text-white"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="m18 18-4.35-4.35"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
