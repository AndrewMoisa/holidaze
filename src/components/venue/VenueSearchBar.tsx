import type { FormEvent } from 'react'

interface VenueSearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  /** 'hero' sits inside the hero photo. 'inline' sits in normal page flow. */
  variant?: 'hero' | 'inline'
}

const searchIcon = (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="m18 18-4.35-4.35"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

export function VenueSearchBar({
  value,
  onChange,
  onSubmit,
  variant = 'hero',
}: VenueSearchBarProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit?.()
  }

  if (variant === 'inline') {
    return (
      <form
        onSubmit={handleSubmit}
        className="border-sand-200 focus-within:border-brand-400 focus-within:outline-brand-500 flex h-12 items-center rounded-full border bg-white pl-5 shadow-sm transition-colors duration-150 focus-within:outline-2 focus-within:outline-offset-2"
      >
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
          className="bg-brand-600 hover:bg-brand-700 mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-150"
        >
          {searchIcon}
        </button>
      </form>
    )
  }

  // Set into the photo rather than floating above it: dark glass so the text
  // stays legible wherever the image is light.
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-deep-900 focus-within:outline-sun-400 sm:bg-deep-900/45 flex h-14 items-center gap-2 border-t border-white/20 pr-2 pl-4 focus-within:outline-2 focus-within:-outline-offset-2 sm:h-16 sm:gap-3 sm:rounded-t-2xl sm:border-x sm:pl-6 sm:backdrop-blur-md lg:h-20 lg:pr-3 lg:pl-7"
    >
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Where are you going?"
        aria-label="Search venues"
        className="h-full flex-1 border-0 bg-transparent text-base text-white outline-none placeholder:text-white/60 lg:text-lg"
      />
      <button
        type="submit"
        className="bg-sun-400 text-deep-900 hover:bg-sun-400/90 flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-semibold transition-colors duration-150 sm:h-11 sm:px-5 lg:h-13 lg:px-6 lg:text-base"
      >
        {searchIcon}
        <span className="hidden sm:inline">Search</span>
        <span className="sr-only sm:hidden">Search</span>
      </button>
    </form>
  )
}
