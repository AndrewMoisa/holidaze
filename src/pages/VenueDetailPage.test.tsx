import { afterEach, describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import { clearAuth, renderWithProviders, screen, seedAuth } from '../test/test-utils'
import { VenueDetailPage } from './VenueDetailPage'

const tree = (
  <Routes>
    <Route path="/venues/:id" element={<VenueDetailPage />} />
  </Routes>
)

describe('VenueDetailPage', () => {
  afterEach(clearAuth)

  it('renders the venue loaded from its id in the url', async () => {
    renderWithProviders(tree, { route: '/venues/venue-1' })

    expect(await screen.findByRole('heading', { name: 'Seaside Cottage' })).toBeInTheDocument()
    expect(screen.getByText(/Sleeps up to 4 guests/)).toBeInTheDocument()
  })

  it('offers a login link instead of the booking form when signed out', async () => {
    renderWithProviders(tree, { route: '/venues/venue-1' })

    expect(await screen.findByRole('link', { name: 'Log in to book' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Book now' })).not.toBeInTheDocument()
  })

  it('shows the booking form to a signed-in customer', async () => {
    seedAuth({ name: 'jane_doe' })
    renderWithProviders(tree, { route: '/venues/venue-1' })

    expect(await screen.findByRole('button', { name: 'Book now' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Log in to book' })).not.toBeInTheDocument()
  })

  it('surfaces an error when the venue does not exist', async () => {
    renderWithProviders(tree, { route: '/venues/missing' })

    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })
})
