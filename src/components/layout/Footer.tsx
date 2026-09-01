import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-sand-200 border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-ink-900 font-semibold">Holidaze</p>
          <p className="text-ink-900/60 mt-2 text-sm">
            A booking platform connecting travelers with venues around the world.
          </p>
        </div>

        <div>
          <p className="text-ink-900 text-sm font-medium">Explore</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link to="/" className="text-ink-900/60 hover:text-brand-600">
                Venues
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-ink-900/60 hover:text-brand-600">
                Become a venue manager
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-ink-900 text-sm font-medium">About this project</p>
          <p className="text-ink-900/60 mt-2 text-sm">
            Built as a Noroff front-end capstone project.
          </p>
        </div>
      </div>

      <div className="border-sand-200 border-t px-4 py-4">
        <p className="text-ink-900/50 mx-auto max-w-6xl text-sm">
          &copy; {new Date().getFullYear()} Holidaze
        </p>
      </div>
    </footer>
  )
}
