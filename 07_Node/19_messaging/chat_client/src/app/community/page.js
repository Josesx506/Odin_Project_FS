import React from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CommunityPage from '@/components/pages/CommunityPage';
import CommunitySkeleton from '@/components/skeletons/CommunitySkeleton';

export default function page() {
  return (
    <ProtectedRoute loader={<CommunitySkeleton />}>
      <CommunityPage />
    </ProtectedRoute>
  )
}
