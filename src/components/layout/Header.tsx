import { useCallback, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { MobileMenu } from './MobileMenu'

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive ? 'text-brand-700 bg-brand-100' : 'text-ink-900/70 hover:text-brand-700'
  }`

const shortcutClasses =
  'text-ink-900/70 hover:text-brand-700 rounded-md px-3 py-2 text-sm font-medium transition-colors'

export function Header() {
  const { isAuthenticated, profile, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Stable identity: the menu effect keys off it.
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  const browseLinks = [
    { to: '/venues', label: 'Venues' },
    { to: '/#top-rated', label: 'Top rated' },
    { to: '/#budget', label: 'Budget friendly' },
  ]

  return (
    <header className="border-sand-200 bg-sand-50/95 sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:grid md:grid-cols-[auto_1fr_auto]">
        <NavLink to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Holidaze"
            width={531}
            height={96}
            className="h-6 w-auto object-contain"
          />
        </NavLink>

        <nav
          aria-label="Browse"
          className="hidden items-center justify-center gap-6 md:flex"
        >
          {browseLinks.map((link) => (
            <Link key={link.to} to={link.to} className={shortcutClasses}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav
          aria-label="Account"
          className="hidden items-center justify-end gap-1 md:flex"
        >
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
                className="bg-brand-600 hover:bg-brand-700 ml-1 rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors"
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="text-ink-900 hover:bg-sand-100 rounded-lg p-2 transition-colors md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        browseLinks={browseLinks}
        isAuthenticated={isAuthenticated}
        profile={profile}
        onLogout={logout}
      />
    </header>
  )
}
