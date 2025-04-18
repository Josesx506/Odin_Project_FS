'use client';

import { AuthenticatedLandingPage, FreeLandingPage } from "@/components/LandingPage";
import { PostThumbnailSkeleton } from "@/components/posts/PostSkeleton";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { loading, accessToken } = useAuth();
  
  if (loading) {
    return <PostThumbnailSkeleton cards={5} />;
  }
  
  return (
    <>
    { accessToken ? <AuthenticatedLandingPage /> : <FreeLandingPage />}
    </>
  );
}
