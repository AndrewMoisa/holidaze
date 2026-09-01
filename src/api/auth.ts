import { apiClient } from './client'
import type { ApiResponse } from '../types/api'
import type {
  ApiKeyResult,
  LoginPayload,
  LoginResult,
  RegisterPayload,
} from '../types/auth'
import type { Profile } from '../types/profile'

export function register(payload: RegisterPayload) {
  return apiClient<ApiResponse<Profile>>('/auth/register', {
    method: 'POST',
    body: payload,
  })
}

export function login(payload: LoginPayload) {
  return apiClient<ApiResponse<LoginResult>>('/auth/login', {
    method: 'POST',
    params: { _holidaze: true },
    body: payload,
  })
}

export function createApiKey() {
  return apiClient<ApiResponse<ApiKeyResult>>('/auth/create-api-key', {
    method: 'POST',
    auth: true,
    body: {},
  })
}
