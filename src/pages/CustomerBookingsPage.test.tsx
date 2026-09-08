import { afterEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { clearAuth, renderWithProviders, screen, seedAuth, within } from '../test/test-utils'
import { CustomerBookingsPage } from './CustomerBookingsPage'

describe('CustomerBookingsPage', () => {
  afterEach(clearAuth)

  it('splits bookings into upcoming and past by their end date', async () => {
    seedAuth({ name: 'jane_doe' })
    renderWithProviders(<CustomerBookingsPage />)

    expect(await screen.findByRole('heading', { name: 'Upcoming' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Past' })).toBeInTheDocument()

    // Only the upcoming booking is cancellable, so there is exactly one button.
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(1)
  })

  it('cancels an upcoming booking after confirmation', async () => {
    const user = userEvent.setup()
    seedAuth({ name: 'jane_doe' })
    renderWithProviders(<CustomerBookingsPage />)

    await user.click(await screen.findByRole('button', { name: 'Cancel' }))

    const dialog = screen.getByRole('dialog', { name: 'Cancel this booking?' })
    await user.click(within(dialog).getByRole('button', { name: 'Cancel booking' }))

    expect(await screen.findByText('No upcoming bookings.')).toBeInTheDocument()
  })
})
