import { describe, expect, it, vi, beforeEach } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { AuthProvider } from './AuthProvider'
import { useAuth } from '../hooks/useAuth'
import * as authApi from '../api/auth'
import { makeProfile } from '../test/mocks/fixtures/profile.fixture'

function TestConsumer() {
  const { profile, isAuthenticated, login, logout } = useAuth()

  return (
    <div>
      <p data-testid="status">{isAuthenticated ? 'authenticated' : 'anonymous'}</p>
      <p data-testid="name">{profile?.name ?? 'none'}</p>
      <button
        onClick={() => login({ email: 'jane@stud.noroff.no', password: 'password123' })}
      >
        login
      </button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('logs in, exposes the profile, and persists to localStorage', async () => {
    const profile = makeProfile({ name: 'jane_doe' })
    vi.spyOn(authApi, 'login').mockResolvedValue({
      data: {
        name: profile.name,
        email: profile.email,
        bio: null,
        accessToken: 'token-123',
        venueManager: false,
      },
      meta: {},
    })
    vi.spyOn(authApi, 'createApiKey').mockResolvedValue({
      data: { name: 'key', status: 'ACTIVE', key: 'api-key-123' },
      meta: {},
    })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    expect(screen.getByTestId('status')).toHaveTextContent('anonymous')

    await act(async () => {
      screen.getByText('login').click()
    })

    expect(screen.getByTestId('status')).toHaveTextContent('authenticated')
    expect(screen.getByTestId('name')).toHaveTextContent('jane_doe')
    expect(localStorage.getItem('holidaze:auth')).toContain('jane_doe')
  })

  it('clears state and localStorage on logout', async () => {
    const profile = makeProfile({ name: 'jane_doe' })
    vi.spyOn(authApi, 'login').mockResolvedValue({
      data: {
        name: profile.name,
        email: profile.email,
        bio: null,
        accessToken: 'token-123',
        venueManager: false,
      },
      meta: {},
    })
    vi.spyOn(authApi, 'createApiKey').mockResolvedValue({
      data: { name: 'key', status: 'ACTIVE', key: 'api-key-123' },
      meta: {},
    })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    await act(async () => {
      screen.getByText('login').click()
    })
    await act(async () => {
      screen.getByText('logout').click()
    })

    expect(screen.getByTestId('status')).toHaveTextContent('anonymous')
    expect(localStorage.getItem('holidaze:auth')).toBeNull()
  })
})
