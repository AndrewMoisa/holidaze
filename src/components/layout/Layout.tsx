import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Keyed on the path so each navigation replays the fade. */}
      <main key={location.pathname} className="animate-fade-in flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
