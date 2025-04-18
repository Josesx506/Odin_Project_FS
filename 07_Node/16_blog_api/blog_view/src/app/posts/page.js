'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PostProvider from '@/components/posts/PostProvider';
import { PostThumbnailSkeleton } from '@/components/posts/PostSkeleton';

export default function AllPostsPage() {


  return (
    <ProtectedRoute loader={<PostThumbnailSkeleton cards={7} />}>
      <div style={{display:'grid', gap:'2em', width: '93%', margin:'0 auto'}}>
        <h2>Welcome to the Articles page</h2> 
        <PostProvider />
      </div>
    </ProtectedRoute>
  )
}
