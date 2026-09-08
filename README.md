# Holidaze

A front end for Holidaze, an accommodation booking site, built against the Noroff Holidaze API. Visitors can browse and search venues and view availability; customers can register, log in, book a venue, and manage their upcoming trips; venue managers can register, create and manage their own venues, and view bookings made on them.

## Links

|                          |                                                                          |
| ------------------------ | ------------------------------------------------------------------------ |
| Live demo                | https://holidazev1.netlify.app                                           |
| Repository               | https://github.com/AndrewMoisa/holidaze                                  |
| Design prototype (Figma) | https://www.figma.com/design/5V0P29gY55rW0PbvSocp6I/Holidaze?node-id=0-1 |
| Style guide              |                                                                          |
| Kanban board             | https://github.com/users/AndrewMoisa/projects/3                          |
| Gantt chart              |                                                                          |

## Tech stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS
- React Router
- React Hook Form + Zod for form validation and typed schemas
- react-day-picker + date-fns for availability calendars and booking date ranges
- Vitest, React Testing Library and MSW for unit, component, and integration tests
- Hosted on Netlify

## Getting started

```bash
git clone https://github.com/AndrewMoisa/holidaze.git
cd holidaze
npm install
cp .env.example .env.local
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Available scripts

| Script                  | Description                                                                    |
| ----------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`           | Start the local dev server                                                     |
| `npm run build`         | Type-check and build for production                                            |
| `npm run preview`       | Preview a production build locally                                             |
| `npm run lint`          | Run the linter                                                                 |
| `npm run format`        | Format the codebase with Prettier                                              |
| `npm run test`          | Run the test suite once                                                        |
| `npm run test:watch`    | Run tests in watch mode                                                        |
| `npm run test:coverage` | Run tests with coverage                                                        |
| `npm run images`        | Regenerate the images in `public/images` from the originals in `assets/images` |

## Environment variables

| Variable            | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the Noroff API (`https://v2.api.noroff.dev`) |

## Testing the app

Registering an account requires a `@stud.noroff.no` email address, in line with the Noroff API's rules. Registration lets you choose whether the account is a regular customer or a venue manager. Log in with the same account to book venues (as a customer) or create and manage venues (as a manager) — a single account can only act as one role at a time, matching the account's registered type.

A suggested walkthrough:

1. Open **Venues** in the header to browse and search, then open a venue to see its details and availability.
2. Register a customer account and log in, then book a venue for a free date range.
3. Check the booking under "My bookings".
4. Register a second account as a venue manager, log in, and create a venue.
5. Edit and then delete the venue, and view any bookings made against it.

## Automated tests

The test suite covers pure utilities, form validation, key components, auth state
management, and an MSW-backed integration test for the home page. Run it with
`npm run test`.

## Known limitations

- No payment flow is implemented; bookings are recorded without payment.
- Avatar and venue media are set by URL rather than file upload, matching what the underlying API supports.
- Venue search matches name/description only (the Noroff API doesn't support server-side filtering by date availability or guest count), so date and guest selection happen on each venue's own page rather than in the main search bar.

## Author

Andrei Moisa
