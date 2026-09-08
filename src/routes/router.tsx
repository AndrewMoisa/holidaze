/* eslint-disable react-refresh/only-export-components -- route manifest: the lazy page wrappers below are not HMR boundaries */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { ProtectedRoute } from './ProtectedRoute'
import { ManagerRoute } from './ManagerRoute'

// Route-level splitting: the venue-manager screens and the booking calendar
// pull in react-day-picker and the venue form, which a visitor never needs.
const HomePage = lazy(() =>
  import('../pages/HomePage').then((m) => ({ default: m.HomePage })),
)
const VenuesPage = lazy(() =>
  import('../pages/VenuesPage').then((m) => ({ default: m.VenuesPage })),
)
const VenueDetailPage = lazy(() =>
  import('../pages/VenueDetailPage').then((m) => ({ default: m.VenueDetailPage })),
)
const LoginPage = lazy(() =>
  import('../pages/LoginPage').then((m) => ({ default: m.LoginPage })),
)
const RegisterPage = lazy(() =>
  import('../pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
)
const ProfilePage = lazy(() =>
  import('../pages/ProfilePage').then((m) => ({ default: m.ProfilePage })),
)
const CustomerBookingsPage = lazy(() =>
  import('../pages/CustomerBookingsPage').then((m) => ({
    default: m.CustomerBookingsPage,
  })),
)
const ManagerVenuesPage = lazy(() =>
  import('../pages/ManagerVenuesPage').then((m) => ({ default: m.ManagerVenuesPage })),
)
const ManagerVenueFormPage = lazy(() =>
  import('../pages/ManagerVenueFormPage').then((m) => ({
    default: m.ManagerVenueFormPage,
  })),
)
const ManagerVenueBookingsPage = lazy(() =>
  import('../pages/ManagerVenueBookingsPage').then((m) => ({
    default: m.ManagerVenueBookingsPage,
  })),
)
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/venues', element: <VenuesPage /> },
      { path: '/venues/:id', element: <VenueDetailPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my-bookings',
        element: (
          <ProtectedRoute>
            <CustomerBookingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/manager/venues',
        element: (
          <ManagerRoute>
            <ManagerVenuesPage />
          </ManagerRoute>
        ),
      },
      {
        path: '/manager/venues/new',
        element: (
          <ManagerRoute>
            <ManagerVenueFormPage mode="create" />
          </ManagerRoute>
        ),
      },
      {
        path: '/manager/venues/:id/edit',
        element: (
          <ManagerRoute>
            <ManagerVenueFormPage mode="edit" />
          </ManagerRoute>
        ),
      },
      {
        path: '/manager/venues/:id/bookings',
        element: (
          <ManagerRoute>
            <ManagerVenueBookingsPage />
          </ManagerRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
