import ProtectedRoute from '@/components/auth/ProtectedRoute';

import React from 'react'

export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <div>No post available, write a new post</div>
      </ProtectedRoute>
    </div>
  )
}
