import React from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function page() {
  return (
    <ProtectedRoute>
      <div>
        Welcome to chats
      </div>
    </ProtectedRoute>
  )
}
