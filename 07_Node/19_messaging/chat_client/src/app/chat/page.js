import React from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ChatPage from '@/components/pages/ChatPage';

export default function page() {
  return (
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  )
}
