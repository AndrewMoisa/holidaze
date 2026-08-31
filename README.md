# Holidaze

A front end for Holidaze, an accommodation booking site, built against the Noroff Holidaze API. Visitors can browse and search venues and view availability; customers can register, log in, book a venue, and manage their upcoming trips; venue managers can register, create and manage their own venues, and view bookings made on them.

## Links

|                          |       |
| ------------------------ | ----- |
| Live demo                | _TBD_ |
| Repository               | _TBD_ |
| Design prototype (Figma) | _TBD_ |
| Style guide              | _TBD_ |
| Kanban board             | _TBD_ |
| Gantt chart              | _TBD_ |

## Tech stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS
- React Router
- React Hook Form + Zod for form validation
- react-day-picker + date-fns for availability calendars
- Vitest, React Testing Library and MSW for testing
- Hosted on Netlify

## Getting started

```bash
git clone <repo-url>
cd holidaze
npm install
cp .env.example .env.local
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Available scripts

| Script                  | Description                         |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | Start the local dev server          |
| `npm run build`         | Type-check and build for production |
| `npm run preview`       | Preview a production build locally  |
| `npm run lint`          | Run the linter                      |
| `npm run format`        | Format the codebase with Prettier   |
| `npm run test`          | Run the test suite once             |
| `npm run test:watch`    | Run tests in watch mode             |
| `npm run test:coverage` | Run tests with coverage             |

## Environment variables

| Variable            | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the Noroff API (`https://v2.api.noroff.dev`) |

## Testing the app

Registering an account requires a `@stud.noroff.no` email address, in line with the Noroff API's rules. Registration lets you choose whether the account is a regular customer or a venue manager. Log in with the same account to book venues (as a customer) or create and manage venues (as a manager) — a single account can only act as one role at a time, matching the account's registered type.

A suggested walkthrough:

1. Browse venues on the home page and open one to see its details and availability.
2. Register a customer account and log in, then book a venue for a free date range.
3. Check the booking under "My bookings".
4. Register a second account as a venue manager, log in, and create a venue.
5. Edit and then delete the venue, and view any bookings made against it.

## Known limitations

- No payment flow is implemented; bookings are recorded without payment.
- Avatar and venue media are set by URL rather than file upload, matching what the underlying API supports.

## Author

_Your name here_
