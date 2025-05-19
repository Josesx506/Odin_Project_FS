import ProtectRoutes from '@/components/auth/ProtectRoutes';
// import EditProfilePage from '@/components/pages/EditProfilePage';

export default async function page({ params }) {
  const { userId } = await params;
  return (
    <ProtectRoutes>
      <div>Editing user {userId} profile</div>
    </ProtectRoutes>
  )
}