"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    // Save the attempted location for redirect after login
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return <>{children}</>
}
