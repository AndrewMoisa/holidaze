/**
 * Bookings are calendar days, not instants. The API stores them as ISO
 * timestamps, so they are written at UTC midnight and read back as the same
 * calendar day in the local timezone — otherwise a stay picked in Oslo is
 * saved (and shown) as starting the day before.
 */

/** Local calendar day of a picked date, as UTC midnight, for sending to the API. */
export function toApiDate(date: Date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  ).toISOString()
}

/** The API's UTC calendar day, as a local Date the calendar can compare. */
export function parseApiDate(iso: string) {
  const date = new Date(iso)
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

export function formatDate(iso: string) {
  return parseApiDate(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getDisabledRanges(bookings: { dateFrom: string; dateTo: string }[]) {
  return bookings.map((booking) => ({
    from: parseApiDate(booking.dateFrom),
    to: parseApiDate(booking.dateTo),
  }))
}

export function nightsBetween(from: Date, to: Date) {
  return Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
}
