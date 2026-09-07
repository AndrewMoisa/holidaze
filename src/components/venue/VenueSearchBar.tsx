import type { FormEvent } from 'react'

interface VenueSearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  /** 'hero' floats over a photo backdrop (default). 'inline' sits in normal page flow. */
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

  const input = (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search venues by name, description, or location…"
      aria-label="Search venues"
      className="text-ink-900 placeholder:text-ink-900/40 h-full flex-1 border-0 bg-transparent text-sm outline-none"
    />
  )

  if (variant === 'inline') {
    return (
      <form
        onSubmit={handleSubmit}
        className="border-sand-200 focus-within:border-brand-400 flex h-12 items-center rounded-full border bg-white pl-5 shadow-sm transition-colors"
      >
        {input}
        <button
          type="submit"
          aria-label="Search"
          className="bg-brand-600 hover:bg-brand-700 mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors"
        >
          {searchIcon}
        </button>
      </form>
    )
  }

  return (
    <div className="rounded-[44px] bg-white p-3 shadow-xl">
      <form onSubmit={handleSubmit} className="relative flex h-16 rounded-full">
        <div className="from-brand-300 to-brand-500 absolute inset-0 rounded-full bg-gradient-to-r" />

        <div className="relative flex flex-1 items-center rounded-full border-t border-b border-l border-[#c3c3c3] bg-white pl-6">
          {input}
        </div>

        <button
          type="submit"
          aria-label="Search"
          className="relative flex w-[88px] shrink-0 items-center justify-center text-white"
        >
          {searchIcon}
        </button>
      </form>
    </div>
  )
}
