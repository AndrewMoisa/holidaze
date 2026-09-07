import { Link, Navigate, useLocation } from 'react-router-dom'
import { LoginForm } from '../components/auth/LoginForm'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname?: string } } | null)?.from
    return <Navigate to={from?.pathname ?? '/'} replace />
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
      <div className="bg-sand-100 rounded-2xl p-8 md:p-10">
        <p className="text-brand-600 text-xs font-semibold tracking-wide uppercase">
          Welcome back
        </p>
        <h1 className="font-display text-ink-900 mt-2 text-3xl font-semibold text-balance">
          Pick up where your last trip left off.
        </h1>
        <p className="text-ink-900/60 mt-3 text-sm">
          Log in to manage bookings, message hosts, and keep browsing venues you've
          saved.
        </p>
      </div>

      <div className="border-sand-200 rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="font-display text-ink-900 text-xl font-semibold">Log in</h2>
        <p className="text-ink-900/60 mt-2 text-sm">
          New to Holidaze?{' '}
          <Link to="/register" className="text-brand-600 underline">
            Create an account
          </Link>
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
