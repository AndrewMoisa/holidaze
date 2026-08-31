import { NavLink } from 'react-router-dom'

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive ? 'text-brand-700 bg-brand-100' : 'text-ink-900/70 hover:text-brand-700'
  }`

export function Header() {
  return (
    <header className="border-sand-200 bg-sand-50/95 sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center">
          <img src="/images/logo.png" alt="Holidaze" className="h-6 w-auto object-contain" />
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/" className={navLinkClasses} end>
            Venues
          </NavLink>
          <NavLink to="/login" className={navLinkClasses}>
            Log in
          </NavLink>
          <NavLink to="/register" className={navLinkClasses}>
            Sign up
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
