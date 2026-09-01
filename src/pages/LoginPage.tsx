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
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-ink-900 text-2xl font-semibold">Log in</h1>
      <p className="text-ink-900/60 mt-2">
        New to Holidaze?{' '}
        <Link to="/register" className="text-brand-600 underline">
          Create an account
        </Link>
      </p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  )
}
