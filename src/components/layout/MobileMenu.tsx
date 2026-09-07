import { useEffect, useRef, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import type { Profile } from '../../types/profile'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  browseLinks: { to: string; label: string }[]
  isAuthenticated: boolean
  profile: Profile | null
  onLogout: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled])'

export function MobileMenu({
  isOpen,
  onClose,
  browseLinks,
  isAuthenticated,
  profile,
  onLogout,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const panel = panelRef.current
    const returnFocusTo = document.activeElement as HTMLElement | null

    closeButtonRef.current?.focus()
    // The page behind the overlay must not scroll with it.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panel) return

      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      returnFocusTo?.focus()
    }
  }, [isOpen, onClose])

  const accountLinks = isAuthenticated
    ? [
        ...(profile?.venueManager ? [{ to: '/manager/venues', label: 'My venues' }] : []),
        { to: '/my-bookings', label: 'My bookings' },
        { to: '/profile', label: profile?.name ?? 'Profile' },
      ]
    : [{ to: '/login', label: 'Log in' }]

  return createPortal(
    <div
      ref={panelRef}
      id="mobile-menu"
      data-state={isOpen ? 'open' : 'closed'}
      aria-hidden={!isOpen}
      className={`menu-overlay bg-deep-900 fixed inset-0 z-50 flex flex-col md:hidden ${
        isOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" onClick={onClose} className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Holidaze"
            width={531}
            height={96}
            className="h-6 w-auto object-contain"
          />
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-lg p-2 text-white transition-colors duration-150 hover:bg-white/10"
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
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-8 px-6 pb-16">
        <ul className="flex flex-col gap-4">
          {browseLinks.map((link, index) => (
            <li key={link.to} data-stagger style={{ '--i': index } as CSSProperties}>
              <Link
                to={link.to}
                onClick={onClose}
                className="menu-link text-4xl font-semibold text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          data-stagger
          style={{ '--i': browseLinks.length } as CSSProperties}
          className="border-t border-white/15 pt-8"
        >
          <ul className="flex flex-col gap-4">
            {accountLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="text-brand-200 text-lg font-medium transition-colors duration-150 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                onClose()
                onLogout()
              }}
              className="text-brand-200 mt-4 text-lg font-medium transition-colors duration-150 hover:text-white"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/register"
              onClick={onClose}
              className="bg-sun-400 text-deep-900 mt-6 inline-block rounded-full px-6 py-3 text-base font-semibold transition-colors duration-150 hover:bg-white"
            >
              Sign up
            </Link>
          )}
        </div>
      </nav>
    </div>,
    document.body,
  )
}
