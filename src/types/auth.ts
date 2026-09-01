import type { MediaItem } from './profile'

export interface RegisterPayload {
  name: string
  email: string
  password: string
  bio?: string
  avatar?: MediaItem
  banner?: MediaItem
  venueManager?: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResult {
  name: string
  email: string
  bio: string | null
  avatar?: MediaItem
  banner?: MediaItem
  accessToken: string
  venueManager?: boolean
}

export interface ApiKeyResult {
  name: string
  status: string
  key: string
}
