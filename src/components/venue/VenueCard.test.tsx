import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { VenueCard } from './VenueCard'
import { makeVenue } from '../../test/mocks/fixtures/venue.fixture'

function renderCard(overrides: Parameters<typeof makeVenue>[0] = {}) {
  return render(
    <MemoryRouter>
      <VenueCard venue={makeVenue(overrides)} />
    </MemoryRouter>,
  )
}

describe('VenueCard', () => {
  it('renders the venue name, location, and price', () => {
    renderCard({ name: 'Seaside Cottage', price: 150 })

    expect(screen.getByText('Seaside Cottage')).toBeInTheDocument()
    expect(screen.getByText('Bergen, Norway')).toBeInTheDocument()
    expect(screen.getByText('$150')).toBeInTheDocument()
  })

  it('links to the venue detail page', () => {
    renderCard({ id: 'abc-123' })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/venues/abc-123')
  })

  it('falls back to a placeholder image when the venue has no media', () => {
    renderCard({ media: null, name: 'No Photo Venue' })
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/images/no-image-icon.png')
  })
})
