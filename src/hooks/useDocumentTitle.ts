import { useEffect } from 'react'

const SITE_NAME = 'Holidaze'

// Pass undefined while a page is still loading its data — the tab falls back to
// the plain site name rather than flashing a placeholder.
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME
  }, [title])
}
