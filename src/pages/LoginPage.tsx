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
    <div className="flex min-h-[calc(100vh-4rem)] items-center px-4 py-12">
      <div className="mx-auto grid w-full max-w-4xl items-stretch gap-8 md:grid-cols-2">
        <div className="bg-sand-100 flex flex-col justify-center rounded-2xl p-8 md:p-10">
          <p className="text-brand-600 text-xs font-semibold tracking-wide uppercase">
            Welcome back
          </p>
          <h1 className="display text-ink-900 mt-3 font-semibold text-balance">
            Pick up where your last trip left off.
          </h1>
          <p className="text-ink-900/70 mt-4 text-[15px]">
            Log in to manage bookings, message hosts, and keep browsing venues you've
            saved.
          </p>
        </div>

        <div className="border-sand-200 flex flex-col justify-center rounded-2xl border bg-white p-8 shadow-md">
          <h2 className="text-ink-900 text-xl font-semibold tracking-tight">Log in</h2>
          <p className="text-ink-900/60 mt-2 text-[15px]">
            New to Holidaze?{' '}
            <Link to="/register" className="text-brand-600 font-medium underline">
              Create an account
            </Link>
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
