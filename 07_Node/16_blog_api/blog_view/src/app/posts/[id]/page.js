import ProtectedPostContent from '@/components/ProtectedPostContent';


export default async function SinglePostPage({ params }) {
  const { id } = await params;
  
  return <ProtectedPostContent id={id} />;
}
