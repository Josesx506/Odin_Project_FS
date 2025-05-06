import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ChatDetailsPage from '@/components/pages/ChatDetailsPage';
import { ChatDetailSkeleton } from '@/components/skeletons/ChatSkeleton';

export default async function page({ params }) {
  const { id } = await params;

  return (
    <ProtectedRoute loader={<ChatDetailSkeleton />}>
        <ChatDetailsPage id={id} />
    </ProtectedRoute>
  )
}
