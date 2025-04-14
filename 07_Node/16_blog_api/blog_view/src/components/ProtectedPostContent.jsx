'use client';

// import RequireAuth from '@/components/RequireAuth';
import ProtectedRoute from "./auth/ProtectedRoute";

export default function ProtectedPostContent({ id }) {
  // allowedPermissions={['view:posts']}
  return (
    <ProtectedRoute>
      <div>Welcome to the post {id} page</div>  
    </ProtectedRoute>
  );
}