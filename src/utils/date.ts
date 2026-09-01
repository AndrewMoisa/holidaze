export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getDisabledRanges(bookings: { dateFrom: string; dateTo: string }[]) {
  return bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }))
}
