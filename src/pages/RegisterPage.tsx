import { Link, Navigate } from 'react-router-dom'
import { RegisterForm } from '../components/auth/RegisterForm'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function RegisterPage() {
  const { isAuthenticated } = useAuth()

  useDocumentTitle('Sign up')

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center px-4 py-12">
      <div className="mx-auto grid w-full max-w-4xl items-stretch gap-8 md:grid-cols-2">
        <div className="bg-sand-100 flex flex-col justify-center rounded-2xl p-8 md:p-10">
          <p className="text-brand-600 text-xs font-semibold tracking-wide uppercase">
            Join Holidaze
          </p>
          <h1 className="display text-ink-900 mt-3 font-semibold text-balance">
            List a venue, or find your next stay.
          </h1>
          <p className="text-ink-900/70 mt-4 text-[15px]">
            Sign up as a guest to start booking, or check "venue manager" to list and
            manage your own place instead.
          </p>
        </div>

        <div className="border-sand-200 flex flex-col justify-center rounded-2xl border bg-white p-8 shadow-md">
          <h2 className="text-ink-900 text-xl font-semibold tracking-tight">Sign up</h2>
          <p className="text-ink-900/70 mt-2 text-[15px]">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-medium underline">
              Log in
            </Link>
          </p>
          <p className="text-ink-900/70 mt-1 text-sm">
            Registration requires a stud.noroff.no email address.
          </p>
          <div className="mt-6">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
