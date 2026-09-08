import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Spinner } from '../ui/Spinner'

export function Layout() {
  const location = useLocation()

  // Each route starts at the top; without this, opening a venue from halfway
  // down the list lands mid-page.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="skip-link bg-brand-600 rounded-lg px-4 py-2 text-sm font-medium text-white"
      >
        Skip to content
      </a>
      <Header />
      {/* Keyed on the path so each navigation replays the fade. */}
      <main
        id="main"
        key={location.pathname}
        tabIndex={-1}
        className="animate-fade-in flex-1"
      >
        {/* Routes are code-split, so the first visit to a page needs a boundary. */}
        <Suspense fallback={<Spinner label="Loading page" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
