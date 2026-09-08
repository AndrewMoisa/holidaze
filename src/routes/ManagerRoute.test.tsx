import { afterEach, describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import { clearAuth, renderWithProviders, screen, seedAuth } from '../test/test-utils'
import { ManagerRoute } from './ManagerRoute'

const tree = (
  <Routes>
    <Route path="/" element={<p>Home page</p>} />
    <Route path="/login" element={<p>Login page</p>} />
    <Route
      path="/manager/venues"
      element={
        <ManagerRoute>
          <p>Manager dashboard</p>
        </ManagerRoute>
      }
    />
  </Routes>
)

describe('ManagerRoute', () => {
  afterEach(clearAuth)

  it('sends a signed-out visitor to the login page', () => {
    renderWithProviders(tree, { route: '/manager/venues' })

    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('bounces a customer back to the home page', () => {
    seedAuth({ venueManager: false })
    renderWithProviders(tree, { route: '/manager/venues' })

    expect(screen.getByText('Home page')).toBeInTheDocument()
    expect(screen.queryByText('Manager dashboard')).not.toBeInTheDocument()
  })

  it('lets a venue manager through', () => {
    seedAuth({ venueManager: true })
    renderWithProviders(tree, { route: '/manager/venues' })

    expect(screen.getByText('Manager dashboard')).toBeInTheDocument()
  })
})
