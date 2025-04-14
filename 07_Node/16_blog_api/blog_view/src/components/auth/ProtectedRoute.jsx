'use client'
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { accessToken } = useAuth();
  const router = useRouter();
  console.log(accessToken);

  if (!accessToken) {
    router.push('/signin')
    return null
  }

  return children
}