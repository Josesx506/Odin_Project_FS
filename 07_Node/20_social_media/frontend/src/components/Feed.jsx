'use client'

import React, { useEffect, useState } from 'react';
import { axiosApi } from '@/config/axios';

export default function Feed() {
  const [data,setData] = useState();
  // const data = await authFetch('/v1/social');
  useEffect(()=>{
    async function getData() {
      const res = await axiosApi.get('/v1/social')
      if (res.status===200) {
        setData(res.data)
      }
    }
    getData();
  },[])
  // console.log(data)
  return (
    <div>
      Welcome to the user feed {data?.message}
    </div>
  )
}
