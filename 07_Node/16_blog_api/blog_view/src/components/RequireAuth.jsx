'use client';

import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

function RequireAuth({ children, allowedPermissions = [] }) {
  const { auth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user has required role
    const hasRequiredRole = auth?.permissions?.some(perm => 
      allowedPermissions.includes(perm)
    );
    
    if (hasRequiredRole) {
      // User has required role, do nothing
      return;
    } else if (auth?.user) {
      // User is logged in but doesn't have required role
      router.push(`/unauthorized?from=${pathname}`);
    } else {
      // User is not logged in
      router.push(`/signin?from=${pathname}`);
    }
  }, [auth, allowedPermissions, router, pathname]);

  // If user has required role, render children
  if (auth?.permissions?.some(perm => allowedPermissions.includes(perm))) {
    return children;
  }
  
  // Return null or loader while redirecting
  return null;
};

export default RequireAuth;