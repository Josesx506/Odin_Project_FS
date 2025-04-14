'use client';

// import RequireAuth from '@/components/RequireAuth';
// import useRefreshToken from '@/hooks/useRefreshToken';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PostProvider from '@/components/posts/PostProvider';

export default function AllPostsPage() {
  // const refresh = useRefreshToken();

  return (
    <>
    
    <h3>Welcome to the posts page</h3> 
     <PostProvider />
    </>
    // <ProtectedRoute>
    // </ProtectedRoute>
  )
}
