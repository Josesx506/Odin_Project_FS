"use client"

import useProducts from '@/hooks/useProducts'
// import { getProducts } from '@/components/pullJSON'
import React from 'react'

export default function Page() {
  const data = useProducts();

  console.log(data);

  return (
    <div>
      <h1>Test Data</h1>
    </div>
  )
}
