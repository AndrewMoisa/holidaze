import { createContext } from 'react'
import type { Profile } from '../types/profile'
import type { LoginPayload, RegisterPayload } from '../types/auth'

export interface AuthContextValue {
  profile: Profile | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
  updateAvatar: (url: string, alt?: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
