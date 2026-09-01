import { DayPicker } from 'react-day-picker'
import { calendarClassNames } from './calendarClassNames'

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
        classNames={calendarClassNames}
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
