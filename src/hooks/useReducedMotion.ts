import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const isSupported = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'

function subscribe(onChange: () => void) {
  if (!isSupported()) return () => {}

  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

/**
 * CSS covers most of the motion, but JS-driven movement (smooth scrolling)
 * has to opt out on its own. Falls back to "motion is fine" where
 * matchMedia is unavailable.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => (isSupported() ? window.matchMedia(QUERY).matches : false),
    () => false,
  )
}
