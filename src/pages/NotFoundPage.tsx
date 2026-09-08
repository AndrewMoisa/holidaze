import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="display text-ink-900 text-4xl! font-semibold">Page not found</h1>
      <p className="text-ink-900/60 mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/venues" className="text-brand-600 mt-4 inline-block underline">
        Back to venues
      </Link>
    </div>
  )
}
