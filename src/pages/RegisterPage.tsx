import { Link, Navigate } from 'react-router-dom'
import { RegisterForm } from '../components/auth/RegisterForm'
import { useAuth } from '../hooks/useAuth'

export function RegisterPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-ink-900 text-2xl font-semibold">Sign up</h1>
      <p className="text-ink-900/60 mt-2">
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
  )
}
