'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PostProvider from '@/components/posts/PostProvider';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AllPostsPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const onSignout = async () => {
    await logout();
    router.push('/');
  }

  return (
    <ProtectedRoute>
      <div style={{display:'grid', gap:'1em'}}>
        <h2>Welcome to the Posts page</h2> 
        <PostProvider />
        <button style={{width:'fit-content', justifySelf:'center'}} onClick={onSignout} >Signout</button>
      </div>
    </ProtectedRoute>
  )
}
