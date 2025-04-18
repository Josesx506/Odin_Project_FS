
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PostDetailProvider from '@/components/posts/PostDetailProvider';
import { PostDetailSkeleton } from '@/components/posts/PostSkeleton';


export default async function SinglePostPage({ params }) {
  const { id } = await params;
  
  return (
    <ProtectedRoute loader={<PostDetailSkeleton />}>
      <PostDetailProvider id={id} />
    </ProtectedRoute>
  ) 
}
