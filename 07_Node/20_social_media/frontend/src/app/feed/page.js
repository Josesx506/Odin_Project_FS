
import ProtectRoutes from '@/components/auth/ProtectRoutes';
import Feed from '@/components/Feed';

export default async function page() {

  return (
    <ProtectRoutes>
      <Feed />
    </ProtectRoutes>
  )
}
