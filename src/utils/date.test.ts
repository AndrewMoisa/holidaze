import { describe, expect, it } from 'vitest'
import { formatDate, getDisabledRanges } from './date'

describe('formatDate', () => {
  it('formats an ISO date string into a readable date', () => {
    expect(formatDate('2026-06-01T00:00:00.000Z')).toContain('2026')
  })
})

describe('getDisabledRanges', () => {
  it('maps bookings to from/to Date ranges', () => {
    const ranges = getDisabledRanges([
      { dateFrom: '2026-06-01T00:00:00.000Z', dateTo: '2026-06-05T00:00:00.000Z' },
      { dateFrom: '2026-07-10T00:00:00.000Z', dateTo: '2026-07-12T00:00:00.000Z' },
    ])

    expect(ranges).toHaveLength(2)
    expect(ranges[0].from).toBeInstanceOf(Date)
    expect(ranges[0].to.getUTCDate()).toBe(5)
    expect(ranges[1].from.getUTCMonth()).toBe(6) // July, 0-indexed
  })

  it('returns an empty array for no bookings', () => {
    expect(getDisabledRanges([])).toEqual([])
  })
})
