import { Link } from 'react-router-dom'

const linkClasses =
  'text-brand-100/75 hover:text-white inline-block py-1 text-[15px] transition-colors duration-150'

export function Footer() {
  return (
    <footer className="bg-deep-900 mt-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-start gap-3 lg:pr-8">
          <img
            src="/images/logo.png"
            alt="Holidaze"
            width={531}
            height={96}
            className="h-6 w-auto object-contain"
          />
          <p className="text-brand-100/70 text-[15px]">
            Find a place to stay, or list your own — booked in a couple of clicks.
          </p>
        </div>

        <div className="flex flex-col items-start gap-1">
          <p className="text-base font-medium text-white">Explore</p>
          <ul className="mt-2 flex flex-col gap-2">
            <li>
              <Link to="/venues" className={linkClasses}>
                Venues
              </Link>
            </li>
            <li>
              <Link to="/register" className={linkClasses}>
                Become a venue manager
              </Link>
            </li>
            <li>
              <Link to="/login" className={linkClasses}>
                Log in
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-1">
          <p className="text-base font-medium text-white">About</p>
          <ul className="text-brand-100/70 mt-2 flex flex-col gap-2 text-[15px]">
            <li>Noroff front-end capstone project</li>
            <li>Built with React, TypeScript &amp; Tailwind</li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-1">
          <p className="text-base font-medium text-white">Contact</p>
          <ul className="mt-2 flex flex-col gap-3">
            <li>
              <a
                href="https://github.com/AndrewMoisa/holidaze"
                target="_blank"
                rel="noreferrer"
                className={`${linkClasses} flex items-center gap-3`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 fill-current"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                </span>
                View source on GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <p className="text-brand-100/50 mx-auto max-w-6xl text-sm">
          &copy; {new Date().getFullYear()} Holidaze
        </p>
      </div>
    </footer>
  )
}
