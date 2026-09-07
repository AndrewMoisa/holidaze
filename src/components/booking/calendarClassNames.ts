import type { ClassNames } from 'react-day-picker'

/**
 * Selection colours live on the day cell, so the button inside must stay
 * transparent and inherit its colour — otherwise it paints over the range.
 */
export const calendarClassNames: Partial<ClassNames> = {
  months: 'relative flex flex-wrap gap-6',
  month: 'space-y-2',
  month_caption:
    'flex justify-center py-2 font-display text-base font-semibold text-ink-900',
  nav: 'flex items-center justify-between absolute inset-x-0 top-0 px-1',
  button_previous: 'p-1 rounded hover:bg-sand-100 text-ink-900/70 disabled:opacity-30',
  button_next: 'p-1 rounded hover:bg-sand-100 text-ink-900/70 disabled:opacity-30',
  month_grid: 'w-full border-collapse',
  weekdays: 'flex',
  weekday: 'w-10 text-center text-xs font-medium text-ink-900/50',
  week: 'flex w-full mt-1',
  day: 'w-10 h-10 text-center text-sm p-0 relative',
  day_button:
    'w-10 h-10 rounded-md text-inherit bg-transparent transition-colors hover:bg-brand-100/70 disabled:cursor-not-allowed disabled:hover:bg-transparent',
  today: 'font-semibold',
  disabled: 'text-ink-900/30 line-through',
  outside: 'text-ink-900/25',
  // no background here: it applies to every day in a range and would fight
  // range_middle, whose class has no higher specificity
  selected: 'rounded-md',
  range_start: 'bg-sun-400 text-white rounded-md',
  range_end: 'bg-sun-400 text-white rounded-md',
  range_middle: 'bg-brand-100 text-brand-700 rounded-none',
}
