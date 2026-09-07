import { Link, Navigate } from 'react-router-dom'
import { RegisterForm } from '../components/auth/RegisterForm'
import { useAuth } from '../hooks/useAuth'

export function RegisterPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="mx-auto grid max-w-4xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
      <div className="bg-sand-100 rounded-2xl p-8 md:p-10">
        <p className="text-brand-600 text-xs font-semibold tracking-wide uppercase">
          Join Holidaze
        </p>
        <h1 className="font-display text-ink-900 mt-2 text-3xl font-semibold text-balance">
          List a venue, or find your next stay.
        </h1>
        <p className="text-ink-900/60 mt-3 text-sm">
          Sign up as a guest to start booking, or check "venue manager" to list and
          manage your own place instead.
        </p>
      </div>

      <div className="border-sand-200 rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="font-display text-ink-900 text-xl font-semibold">Sign up</h2>
        <p className="text-ink-900/60 mt-2 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 underline">
            Log in
          </Link>
        </p>
        <p className="text-ink-900/50 mt-1 text-sm">
          Registration requires a stud.noroff.no email address.
        </p>
        <div className="mt-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
