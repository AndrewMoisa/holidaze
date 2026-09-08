// Falls back to the public Noroff API so a missing build-time env var can't
// silently ship a site where every request throws on an invalid URL.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://v2.api.noroff.dev'

export const EMAIL_REGEX = /^[\w\-.]+@(stud\.)?noroff\.no$/i
export const NAME_REGEX = /^[\w]+$/
export const MIN_PASSWORD_LENGTH = 8
export const MAX_NAME_LENGTH = 20
