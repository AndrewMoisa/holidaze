import { useEffect, useRef, useState } from 'react'

type RevealState = 'ready' | 'pending' | 'shown'

const canObserve = () => typeof IntersectionObserver !== 'undefined'

/**
 * Reveals an element the first time it scrolls into view.
 *
 * The hidden 'pending' state is only ever used when IntersectionObserver
 * exists, so content is never left invisible on a browser that would not
 * fire the callback. Setting it during the initial render (rather than in
 * the effect) avoids painting the element visible and then hiding it.
 */
export function useInView<T extends HTMLElement>(rootMargin = '0px 0px -10% 0px') {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState>(() =>
    canObserve() ? 'pending' : 'ready',
  )

  useEffect(() => {
    const element = ref.current
    if (!element || !canObserve()) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setState('shown')
        observer.disconnect()
      },
      { rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, reveal: state === 'ready' ? undefined : state }
}
