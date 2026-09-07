import { describe, expect, it } from 'vitest'
import {
  formatDate,
  getDisabledRanges,
  nightsBetween,
  parseApiDate,
  toApiDate,
} from './date'

describe('formatDate', () => {
  it('formats an ISO date string into a readable date', () => {
    expect(formatDate('2026-06-01T00:00:00.000Z')).toContain('2026')
  })
})

describe('toApiDate', () => {
  it('sends the picked calendar day as UTC midnight', () => {
    expect(toApiDate(new Date(2026, 5, 1))).toBe('2026-06-01T00:00:00.000Z')
  })

  it('round-trips a picked date back to the same calendar day', () => {
    const picked = new Date(2026, 5, 1)
    const returned = parseApiDate(toApiDate(picked))

    expect(returned.getFullYear()).toBe(2026)
    expect(returned.getMonth()).toBe(5)
    expect(returned.getDate()).toBe(1)
  })
})

describe('getDisabledRanges', () => {
  it('maps bookings to from/to Date ranges on the local calendar day', () => {
    const ranges = getDisabledRanges([
      { dateFrom: '2026-06-01T00:00:00.000Z', dateTo: '2026-06-05T00:00:00.000Z' },
      { dateFrom: '2026-07-10T00:00:00.000Z', dateTo: '2026-07-12T00:00:00.000Z' },
    ])

    expect(ranges).toHaveLength(2)
    expect(ranges[0].from).toBeInstanceOf(Date)
    expect(ranges[0].to.getDate()).toBe(5)
    expect(ranges[1].from.getMonth()).toBe(6) // July, 0-indexed
  })

  it('returns an empty array for no bookings', () => {
    expect(getDisabledRanges([])).toEqual([])
  })
})

describe('nightsBetween', () => {
  it('counts nights, not days', () => {
    expect(nightsBetween(new Date(2026, 5, 1), new Date(2026, 5, 3))).toBe(2)
  })
})
