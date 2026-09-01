import type { Profile } from '../types/profile'

const STORAGE_KEY = 'holidaze:auth'

export interface StoredAuth {
  profile: Profile
  accessToken: string
  apiKey: string
}

export function loadStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredAuth) : null
  } catch {
    return null
  }
}

export function saveStoredAuth(value: StoredAuth) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // ignore storage failures (private browsing, quota, etc.)
  }
}

export function clearStoredAuth() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore storage failures
  }
}
