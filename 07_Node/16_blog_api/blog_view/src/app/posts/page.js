'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PostProvider from '@/components/posts/PostProvider';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AllPostsPage() {
  // const refresh = useRefreshToken();
  const { logout } = useAuth();
  const router = useRouter();
  const onSignout = async () => {
    await logout();
    router.push('/');
  }

  return (
    <ProtectedRoute>
      <h3>Welcome to the posts page</h3> 
      <div>
        <PostProvider />
      </div>
      <button onClick={onSignout} >Signout</button>
    </ProtectedRoute>
    // 
    // 
  )
}
