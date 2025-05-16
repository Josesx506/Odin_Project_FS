import React from 'react';
import ProtectRoutes from '@/components/auth/ProtectRoutes';

export default async function page({ params }) {
  const { id } = await params;
  return (
    <ProtectRoutes>
      <div>This is feed page {id}</div>
    </ProtectRoutes>
  )
}
