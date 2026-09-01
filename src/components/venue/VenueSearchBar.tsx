interface VenueSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function VenueSearchBar({ value, onChange }: VenueSearchBarProps) {
  return (
    <div className="rounded-[44px] bg-white p-3 shadow-xl">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="relative flex h-16 rounded-full"
      >
        <div className="from-brand-300 to-brand-500 absolute inset-0 rounded-full bg-gradient-to-r" />

        <div className="relative flex flex-1 items-center rounded-full border-t border-b border-l border-[#c3c3c3] bg-white pl-6">
          <input
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search venues by name, description, or location…"
            aria-label="Search venues"
            className="text-ink-900 placeholder:text-ink-900/40 h-full flex-1 border-0 bg-transparent text-sm outline-none"
          />
        </div>

        <button
          type="submit"
          aria-label="Search"
          className="relative flex w-[88px] shrink-0 items-center justify-center text-white"
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
      </form>
    </div>
  )
}
