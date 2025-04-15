'use client'
import { useEffect, useState } from 'react';
import { axiosApi } from '@/api/axios';
import BlogThumbnail from '../BlogThumbnail';


export default function PostProvider() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const controller = new AbortController();
    async function fetchPosts() {
      try {
        const res = await axiosApi.get('/v1/basic/posts', {signal: controller.signal})
        setPosts(res.data)
      } catch(err) {}
    }
    fetchPosts();
    return ()=>{
        controller.abort();
    }
  }, [])

  return (
    posts.map(post => 
      <BlogThumbnail  key={post.id} {...post} />)
  )
}
