import verifyAccessToken from '@/actions/verifyJWT';
import { redirect } from 'next/navigation';

export default async function ProtectRoutes({ children }) {
  const user = await verifyAccessToken();

  if (!user) {
    redirect('/');
  }

  return children
}
