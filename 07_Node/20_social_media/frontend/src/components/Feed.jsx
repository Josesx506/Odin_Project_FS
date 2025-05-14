'use server'

import React from 'react';
import authFetch from '@/actions/authFetch';
import axiosApi from '@/config/axios';

export default async function Feed() {
  // const data = await authFetch('/v1/social');
  const data = await axiosApi.get('/v1/social',{withCredentials: true})
  // console.log(data)
  return (
    <div>
      Welcome to the user feed {data?.message}
    </div>
  )
}
