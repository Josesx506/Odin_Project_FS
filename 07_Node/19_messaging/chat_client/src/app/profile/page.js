import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ProfilePage from '@/components/pages/ProfilePage';
import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';

export default function page() {
  return (
    <ProtectedRoute loader={<ProfileSkeleton />}>
      <ProfilePage />
    </ProtectedRoute>
  )
}
