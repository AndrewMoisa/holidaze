import { afterEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { clearAuth, renderWithProviders, screen, seedAuth, within } from '../test/test-utils'
import { ManagerVenuesPage } from './ManagerVenuesPage'

describe('ManagerVenuesPage', () => {
  afterEach(clearAuth)

  it("lists the manager's venues with their booking count", async () => {
    seedAuth({ name: 'jane_doe', venueManager: true })
    renderWithProviders(<ManagerVenuesPage />)

    expect(await screen.findByText('Seaside Cottage')).toBeInTheDocument()
    expect(screen.getByText('1 booking')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Create venue' })).toBeInTheDocument()
  })

  it('asks for confirmation before deleting, then removes the row', async () => {
    const user = userEvent.setup()
    seedAuth({ name: 'jane_doe', venueManager: true })
    renderWithProviders(<ManagerVenuesPage />)

    await user.click(await screen.findByRole('button', { name: 'Delete' }))

    const dialog = screen.getByRole('dialog', { name: 'Delete "Seaside Cottage"?' })
    await user.click(within(dialog).getByRole('button', { name: 'Delete' }))

    expect(await screen.findByText("You haven't created any venues yet")).toBeInTheDocument()
    expect(screen.queryByText('Seaside Cottage')).not.toBeInTheDocument()
  })

  it('keeps the venue when the confirmation is dismissed', async () => {
    const user = userEvent.setup()
    seedAuth({ name: 'jane_doe', venueManager: true })
    renderWithProviders(<ManagerVenuesPage />)

    await user.click(await screen.findByRole('button', { name: 'Delete' }))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByText('Seaside Cottage')).toBeInTheDocument()
  })
})
