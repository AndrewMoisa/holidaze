/* eslint-disable react-refresh/only-export-components -- test helper module, not part of the app's HMR boundary */
import type { ReactElement, ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import { makeProfile } from './mocks/fixtures/profile.fixture'
import type { Profile } from '../types/profile'

interface Options extends Omit<RenderOptions, 'wrapper'> {
  /** Initial history entries, for components that read route params. */
  route?: string
}

export function renderWithProviders(ui: ReactElement, options: Options = {}) {
  const { route = '/', ...rest } = options

  function AllProviders({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>{children}</AuthProvider>
      </MemoryRouter>
    )
  }

  return render(ui, { wrapper: AllProviders, ...rest })
}

/**
 * AuthProvider hydrates from localStorage in its state initialiser, so seeding
 * the key before render is enough to start a test signed in.
 */
export function seedAuth(overrides: Partial<Profile> = {}) {
  const profile = makeProfile(overrides)
  localStorage.setItem(
    'holidaze:auth',
    JSON.stringify({ profile, accessToken: 'test-token', apiKey: 'test-key' }),
  )
  return profile
}

export function clearAuth() {
  localStorage.clear()
}

export * from '@testing-library/react'
