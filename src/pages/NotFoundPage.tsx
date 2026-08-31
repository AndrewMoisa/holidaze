import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="text-ink-900 text-2xl font-semibold">Page not found</h1>
      <p className="text-ink-900/60 mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-brand-600 mt-4 inline-block underline">
        Back to venues
      </Link>
    </div>
  )
}
