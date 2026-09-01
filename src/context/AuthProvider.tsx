import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import * as authApi from '../api/auth'
import * as profilesApi from '../api/profiles'
import { setAuthSession, setUnauthorizedHandler } from '../api/authSession'
import { clearStoredAuth, loadStoredAuth, saveStoredAuth } from '../utils/storage'
import type { Profile } from '../types/profile'
import type { LoginPayload, RegisterPayload } from '../types/auth'
import { AuthContext, type AuthContextValue } from './AuthContext'

function hydrateSession(): Profile | null {
  const stored = loadStoredAuth()
  if (!stored) return null
  setAuthSession({ accessToken: stored.accessToken, apiKey: stored.apiKey })
  return stored.profile
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(() => hydrateSession())

  const logout = useCallback(() => {
    setAuthSession({ accessToken: null, apiKey: null })
    clearStoredAuth()
    setProfile(null)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(logout)
    return () => setUnauthorizedHandler(null)
  }, [logout])

  const login = useCallback(async (payload: LoginPayload) => {
    const { data } = await authApi.login(payload)

    setAuthSession({ accessToken: data.accessToken, apiKey: null })
    const { data: apiKeyData } = await authApi.createApiKey()
    setAuthSession({ accessToken: data.accessToken, apiKey: apiKeyData.key })

    const nextProfile: Profile = {
      name: data.name,
      email: data.email,
      bio: data.bio,
      avatar: data.avatar,
      banner: data.banner,
      venueManager: data.venueManager,
    }

    saveStoredAuth({
      profile: nextProfile,
      accessToken: data.accessToken,
      apiKey: apiKeyData.key,
    })
    setProfile(nextProfile)
  }, [])

  const register = useCallback(
    async (payload: RegisterPayload) => {
      await authApi.register(payload)
      await login({ email: payload.email, password: payload.password })
    },
    [login],
  )

  const updateAvatar = useCallback(
    async (url: string, alt = '') => {
      if (!profile) return
      const { data } = await profilesApi.updateProfile(profile.name, {
        avatar: { url, alt },
      })
      const nextProfile = { ...profile, avatar: data.avatar }
      const stored = loadStoredAuth()
      if (stored) saveStoredAuth({ ...stored, profile: nextProfile })
      setProfile(nextProfile)
    },
    [profile],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      profile,
      isAuthenticated: profile !== null,
      login,
      register,
      logout,
      updateAvatar,
    }),
    [profile, login, register, logout, updateAvatar],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
