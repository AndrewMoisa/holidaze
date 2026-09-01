import { DayPicker } from 'react-day-picker'

const classNames = {
  months: 'flex flex-wrap gap-6',
  month: 'space-y-2',
  month_caption: 'flex justify-center py-2 text-sm font-medium text-ink-900',
  nav: 'flex items-center justify-between absolute inset-x-0 top-0 px-1',
  button_previous: 'p-1 rounded hover:bg-sand-100 text-ink-900/70 disabled:opacity-30',
  button_next: 'p-1 rounded hover:bg-sand-100 text-ink-900/70 disabled:opacity-30',
  month_grid: 'w-full border-collapse',
  weekdays: 'flex',
  weekday: 'w-9 text-center text-xs font-medium text-ink-900/50',
  week: 'flex w-full mt-1',
  day: 'w-9 h-9 text-center text-sm p-0 relative',
  day_button: 'w-9 h-9 rounded-md text-ink-900',
  today: 'font-semibold',
  disabled: 'text-ink-900/25 line-through',
  outside: 'text-ink-900/25',
}

interface AvailabilityCalendarProps {
  bookedRanges: { from: Date; to: Date }[]
  numberOfMonths?: number
}

export function AvailabilityCalendar({
  bookedRanges,
  numberOfMonths = 2,
}: AvailabilityCalendarProps) {
  return (
    <div>
      <DayPicker
        numberOfMonths={numberOfMonths}
        disabled={[{ before: new Date() }, ...bookedRanges]}
        classNames={classNames}
      />
      <div className="text-ink-900/60 mt-2 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="bg-sand-100 border-sand-200 inline-block h-3 w-3 rounded-sm border" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-ink-900/10 inline-block h-3 w-3 rounded-sm" />
          Unavailable
        </span>
      </div>
    </div>
  )
}
