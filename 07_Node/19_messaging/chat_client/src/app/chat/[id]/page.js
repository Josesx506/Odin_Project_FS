import React from 'react'
import ChatDetailsPage from '@/components/pages/ChatDetailsPage';

export default async function page({ params }) {
  const { id } = await params;
  return (
    <ChatDetailsPage id={id} />
  )
}
