import ProtectRoutes from '@/components/auth/ProtectRoutes';

export default async function page({ params }) {
  const { postId } = await params;
  return (
    <ProtectRoutes>
      <div>This is feed page {postId}</div>
    </ProtectRoutes>
  )
}
