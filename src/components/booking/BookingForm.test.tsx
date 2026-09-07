import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test/test-utils'
import { BookingForm } from './BookingForm'
import { makeVenue } from '../../test/mocks/fixtures/venue.fixture'
import * as bookingsApi from '../../api/bookings'

// A fixed "today" keeps the day numbers below inside one future month.
const TODAY = new Date(2026, 5, 1)

function renderForm(bookedRanges: { from: Date; to: Date }[] = []) {
  return renderWithProviders(
    <BookingForm
      venue={makeVenue({ id: 'venue-1', price: 100 })}
      bookedRanges={bookedRanges}
    />,
  )
}

const day = (label: string) =>
  screen.getByRole('button', { name: new RegExp(`June ${label}, 2026`) })

describe('BookingForm', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(TODAY)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows a single-night stay', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderForm()

    await user.click(day('10th'))
    await user.click(day('11th'))

    expect(await screen.findByText(/1 night/)).toBeInTheDocument()
    expect(screen.getByText(/\$100 total/)).toBeInTheDocument()
  })

  it('books the selected calendar days, not the UTC-shifted ones', async () => {
    const createSpy = vi
      .spyOn(bookingsApi, 'createBooking')
      .mockResolvedValue({ data: {}, meta: {} } as never)
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderForm()

    await user.click(day('10th'))
    await user.click(day('12th'))
    await user.click(screen.getByRole('button', { name: /book now/i }))

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        dateFrom: '2026-06-10T00:00:00.000Z',
        dateTo: '2026-06-12T00:00:00.000Z',
        guests: 1,
        venueId: 'venue-1',
      }),
    )
  })

  it('explains why a range spanning booked nights is rejected', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderForm([{ from: new Date(2026, 5, 15), to: new Date(2026, 5, 17) }])

    await user.click(day('12th'))
    await user.click(day('20th'))

    expect(await screen.findByText(/already booked/i)).toBeInTheDocument()
  })
})
