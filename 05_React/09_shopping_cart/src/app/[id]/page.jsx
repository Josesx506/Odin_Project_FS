import React from 'react'

export default async function Pages({ params, searchParams }) {
  const urlParams = await params;
  const id = urlParams.id;

  return (
    <div>
      <h1>ID:{id}</h1>
    </div>
  )
}
