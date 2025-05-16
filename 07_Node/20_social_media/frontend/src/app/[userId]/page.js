import ProtectRoutes from '@/components/auth/ProtectRoutes';

export default async function page({ params }) {
  const { userId } = await params;
  return (
    <ProtectRoutes>
      <div>This is user page {userId}</div>
    </ProtectRoutes>
  )
}
