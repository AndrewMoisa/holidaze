import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { HomePage } from '../pages/HomePage'
import { VenueDetailPage } from '../pages/VenueDetailPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ProfilePage } from '../pages/ProfilePage'
import { CustomerBookingsPage } from '../pages/CustomerBookingsPage'
import { ManagerVenuesPage } from '../pages/ManagerVenuesPage'
import { ManagerVenueFormPage } from '../pages/ManagerVenueFormPage'
import { ManagerVenueBookingsPage } from '../pages/ManagerVenueBookingsPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProtectedRoute } from './ProtectedRoute'
import { ManagerRoute } from './ManagerRoute'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
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
