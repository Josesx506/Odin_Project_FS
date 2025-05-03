import React from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CommunityPage from '@/components/pages/CommunityPage';

export default function page() {
  return (
    <ProtectedRoute>
      <CommunityPage />
    </ProtectedRoute>
  )
}
