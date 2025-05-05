import React from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ChatDetailsPage from '@/components/pages/ChatDetailsPage';

export default async function page({ params }) {
  const { id } = await params;

  return (
    <ProtectedRoute>
        <ChatDetailsPage id={id} />
    </ProtectedRoute>
  )
}
