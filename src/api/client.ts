import { API_BASE_URL } from '../utils/constants'
import type { ApiErrorBody } from '../types/api'
import { getAuthHeaders, notifyUnauthorized } from './authSession'

export class ApiError extends Error {
  status: number
  errors: { message: string }[]

  constructor(message: string, status: number, errors: { message: string }[] = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

type QueryValue = string | number | boolean | undefined

interface RequestOptions extends Omit<RequestInit, 'body'> {
  auth?: boolean
  params?: Record<string, QueryValue>
  body?: unknown
}

function buildUrl(path: string, params?: Record<string, QueryValue>) {
  const url = new URL(API_BASE_URL + path)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
    }
  }
  return url.toString()
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { auth, params, body, headers, ...rest } = options

  const res = await fetch(buildUrl(path, params), {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? getAuthHeaders() : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const json = await res.json().catch(() => null)

  if (!res.ok) {
    const errorBody = json as ApiErrorBody | null
    if (res.status === 401) notifyUnauthorized()
    throw new ApiError(
      errorBody?.errors?.[0]?.message ?? 'Something went wrong',
      res.status,
      errorBody?.errors ?? [],
    )
  }

  return json as T
}
