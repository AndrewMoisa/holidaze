import type { CSSProperties } from 'react'
import { useInView } from '../../hooks/useInView'

const NIGHTS = 30

interface AvailabilityRibbonProps {
  bookedRanges: { from: Date; to: Date }[]
}

function startOfToday() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

const shortDate = (date: Date) =>
  date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

/**
 * The next 30 nights at a glance. Reuses the ranges already computed for the
 * booking calendar, so this costs no extra request.
 */
export function AvailabilityRibbon({ bookedRanges }: AvailabilityRibbonProps) {
  const { ref, reveal } = useInView<HTMLDivElement>('0px')
  const start = startOfToday()

  const nights = Array.from({ length: NIGHTS }, (_, offset) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset)
    const isBooked = bookedRanges.some((range) => date >= range.from && date <= range.to)
    return { date, isBooked }
  })

  const freeCount = nights.filter((night) => !night.isBooked).length
  const lastNight = nights[nights.length - 1].date

  return (
    <div ref={ref} data-reveal={reveal}>
      <p className="text-ink-900 text-[15px]">
        <span className="font-display text-2xl font-semibold tabular-nums">
          {freeCount}
        </span>{' '}
        of the next {NIGHTS} nights free
      </p>

      <div className="mt-3 flex h-10 items-end gap-[3px]" aria-hidden="true">
        {nights.map((night, index) => (
          <span
            key={night.date.toISOString()}
            data-grow
            style={{ '--i': index } as CSSProperties}
            className={`flex-1 origin-bottom rounded-full ${
              night.isBooked ? 'bg-brand-700 h-full' : 'bg-brand-200 h-1/2'
            }`}
          />
        ))}
      </div>

      <div className="text-ink-900/70 mt-2 flex items-center justify-between text-xs">
        <span>{shortDate(start)}</span>
        <span>{shortDate(lastNight)}</span>
      </div>

      <p className="sr-only">
        {freeCount} of the next {NIGHTS} nights are available, from {shortDate(start)} to{' '}
        {shortDate(lastNight)}.
      </p>
    </div>
  )
}
