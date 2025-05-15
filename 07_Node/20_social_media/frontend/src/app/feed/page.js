
import ProtectRoutes from '@/components/auth/ProtectRoutes';
import FeedPage from '@/components/pages/FeedPage';

export default async function page() {

  return (
    <ProtectRoutes>
      <FeedPage />
    </ProtectRoutes>
  )
}
