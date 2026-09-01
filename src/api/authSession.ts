interface AuthSession {
  accessToken: string | null
  apiKey: string | null
}

let session: AuthSession = { accessToken: null, apiKey: null }
let onUnauthorized: (() => void) | null = null

export function setAuthSession(next: AuthSession) {
  session = next
}

export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {}
  if (session.accessToken) headers.Authorization = `Bearer ${session.accessToken}`
  if (session.apiKey) headers['X-Noroff-API-Key'] = session.apiKey
  return headers
}

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler
}

export function notifyUnauthorized() {
  onUnauthorized?.()
}
