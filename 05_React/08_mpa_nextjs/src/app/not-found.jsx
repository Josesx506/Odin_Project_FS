"use client"

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import "../styles/errors.css"

export default function Custom404() {
  const router = useRouter();
  const delay = 3;
  const [count, setCount] = useState(delay);

  // automatically redirect to the homepage after 3 secs
  useEffect(() => {
    const key = setInterval(() => {
      setCount(cnt => cnt -1)
    }, 1000);

    const timeout = setTimeout(()=> {
        router.push("/");
    }, delay*1000);

    // clean up function
    return () => {
      clearInterval(key);
      clearTimeout(timeout);
    };
  },[])
  
  return (
    <div className='notFound'>
      <h1 className='notFound__title'>Ooopps........</h1>
      <h2 className='notFound__subtitle'>That page could not be found</h2>
      <p className='notFound__message'>Go back to the <Link href="/" style={{fontWeight:"bold"}}>Homepage</Link></p>
      <p className='notFound__message'>Redirecting to Homepage in {count}...</p>
    </div>
  );
}
