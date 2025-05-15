'use client';

import { axiosApi } from '@/config/axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PostThumbnailCard from '../cards/PostThumbnailCard';

export default function PostThumbnailScroller() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const controller = new AbortController();
    async function getPostData() {
      setLoading(true)
      try {
        const res = await axiosApi.get('/v1/social/posts', 
          { signal: controller.signal })
        setPosts(res.data)
      } catch(err) {
        if (err?.code !== "ERR_CANCELED") { 
          toast.error(err.message) }
      } finally {
        setLoading(false)
      } 
    }

    getPostData();
    return () => { controller.abort() }
      
  },[])

  if (loading) {
    return <div>posts loading....</div>
  }

  const sclrStyle = {
    display: 'flex',
    flexDirection: 'column',
    // gap: '1em'
  }

  return (
    <div style={sclrStyle}>
      {posts.map((post)=>(
        <PostThumbnailCard key={post.id} post={post} />
      ))}
    </div>
  )
}
