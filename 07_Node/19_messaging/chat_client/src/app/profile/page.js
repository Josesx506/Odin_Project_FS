import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ProfilePage from '@/components/pages/ProfilePage'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  )
}
