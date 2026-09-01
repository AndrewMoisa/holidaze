import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive ? 'text-brand-700 bg-brand-100' : 'text-ink-900/70 hover:text-brand-700'
  }`

const shortcutClasses =
  'text-ink-900/70 hover:text-brand-700 text-sm font-medium transition-colors'

export function Header() {
  const { isAuthenticated, profile, logout } = useAuth()

  return (
    <header className="border-sand-200 bg-sand-50/95 sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3">
        <NavLink to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Holidaze"
            className="h-6 w-auto object-contain"
          />
        </NavLink>

        <nav className="hidden items-center justify-center gap-6 md:flex">
          <Link to="/" className={shortcutClasses}>
            Venues
          </Link>
          <Link to="/#top-rated" className={shortcutClasses}>
            Top rated
          </Link>
          <Link to="/#budget" className={shortcutClasses}>
            Budget friendly
          </Link>
        </nav>

        <nav className="flex items-center justify-end gap-1">
          {isAuthenticated && profile?.venueManager && (
            <NavLink to="/manager/venues" className={navLinkClasses}>
              My venues
            </NavLink>
          )}

          {isAuthenticated && (
            <NavLink to="/my-bookings" className={navLinkClasses}>
              My bookings
            </NavLink>
          )}

          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className={navLinkClasses}>
                {profile?.name}
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="text-ink-900/70 hover:text-brand-700 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClasses}>
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className="from-brand-300 to-brand-500 ml-1 rounded-2xl bg-gradient-to-r px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
