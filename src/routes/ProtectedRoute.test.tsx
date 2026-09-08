import { afterEach, describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import { clearAuth, renderWithProviders, screen, seedAuth } from '../test/test-utils'
import { ProtectedRoute } from './ProtectedRoute'

const tree = (
  <Routes>
    <Route path="/login" element={<p>Login page</p>} />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <p>Profile page</p>
        </ProtectedRoute>
      }
    />
  </Routes>
)

describe('ProtectedRoute', () => {
  afterEach(clearAuth)

  it('redirects a signed-out visitor to the login page', () => {
    renderWithProviders(tree, { route: '/profile' })

    expect(screen.getByText('Login page')).toBeInTheDocument()
    expect(screen.queryByText('Profile page')).not.toBeInTheDocument()
  })

  it('renders the guarded page for a signed-in user', () => {
    seedAuth()
    renderWithProviders(tree, { route: '/profile' })

    expect(screen.getByText('Profile page')).toBeInTheDocument()
  })
})
