import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ProtectedRoute } from './ProtectedRoute'

export function ManagerRoute({ children }: { children: ReactNode }) {
  const { profile } = useAuth()

  return (
    <ProtectedRoute>
      {profile?.venueManager ? children : <Navigate to="/" replace />}
    </ProtectedRoute>
  )
}
