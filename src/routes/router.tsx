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

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/venues/:id', element: <VenueDetailPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/my-bookings', element: <CustomerBookingsPage /> },
      { path: '/manager/venues', element: <ManagerVenuesPage /> },
      { path: '/manager/venues/new', element: <ManagerVenueFormPage mode="create" /> },
      { path: '/manager/venues/:id/edit', element: <ManagerVenueFormPage mode="edit" /> },
      { path: '/manager/venues/:id/bookings', element: <ManagerVenueBookingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
