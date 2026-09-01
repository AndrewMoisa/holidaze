import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test/test-utils'
import { LoginForm } from './LoginForm'
import * as authApi from '../../api/auth'
import { makeProfile } from '../../test/mocks/fixtures/profile.fixture'

describe('LoginForm', () => {
  it('shows a validation error when submitted empty', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
  })

  it('calls the login API with the entered credentials on valid submit', async () => {
    const profile = makeProfile({ name: 'jane_doe' })
    const loginSpy = vi.spyOn(authApi, 'login').mockResolvedValue({
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

    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.type(screen.getByLabelText(/email/i), 'jane_doe@stud.noroff.no')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    await vi.waitFor(() => {
      expect(loginSpy).toHaveBeenCalledWith({
        email: 'jane_doe@stud.noroff.no',
        password: 'password123',
      })
    })
  })
})
