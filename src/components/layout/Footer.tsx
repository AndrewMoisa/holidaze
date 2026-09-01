import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-sand-200 border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-ink-900 text-sm font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
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
            <li>
              <Link to="/login" className="text-ink-900/60 hover:text-brand-600">
                Log in
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-ink-900 text-sm font-semibold">About</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="text-ink-900/60">Noroff front-end capstone project</li>
            <li className="text-ink-900/60">
              Built with React, TypeScript &amp; Tailwind
            </li>
          </ul>
        </div>

        <div>
          <p className="text-ink-900 text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/AndrewMoisa/holidaze"
                target="_blank"
                rel="noreferrer"
                className="text-ink-900/60 hover:text-brand-600 flex items-center gap-2"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                View source on GitHub
              </a>
            </li>
          </ul>
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
