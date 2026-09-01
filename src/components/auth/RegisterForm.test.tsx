import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test/test-utils'
import { RegisterForm } from './RegisterForm'

describe('RegisterForm', () => {
  it('rejects a non-noroff email address', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterForm />)

    await user.type(screen.getByLabelText(/username/i), 'jane_doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@gmail.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(await screen.findByText(/stud\.noroff\.no/i)).toBeInTheDocument()
  })

  it('rejects a name containing punctuation', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterForm />)

    await user.type(screen.getByLabelText(/username/i), 'jane doe!')
    await user.type(screen.getByLabelText(/email/i), 'jane@stud.noroff.no')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(
      await screen.findByText(/letters, numbers, and underscores/i),
    ).toBeInTheDocument()
  })
})
