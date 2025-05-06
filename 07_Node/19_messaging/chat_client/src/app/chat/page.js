import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ChatPage from '@/components/pages/ChatPage';
import { ChatSkeleton } from '@/components/skeletons/ChatSkeleton';

export default function page() {
  return (
    <ProtectedRoute loader={<ChatSkeleton />}>
      <ChatPage />
    </ProtectedRoute>
  )
}
