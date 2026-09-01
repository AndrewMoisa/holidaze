import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test/test-utils'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('renders venues returned by the API', async () => {
    renderWithProviders(<HomePage />)

    expect((await screen.findAllByText('Seaside Cottage')).length).toBeGreaterThan(0)
    expect((await screen.findAllByText('Mountain Cabin')).length).toBeGreaterThan(0)
  })
})
