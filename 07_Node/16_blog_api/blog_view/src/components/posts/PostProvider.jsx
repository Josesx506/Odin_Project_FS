'use client'

import { axiosApi } from '@/api/axios';
import styles from "@/app/page.module.css";
import { PostThumbnailSkeleton } from "@/components/posts/PostSkeleton";
import useAuth from '@/hooks/useAuth';
import { decodeJWT } from '@/utils/utils';
import { useEffect, useState } from 'react';
import PostThumbnail from './PostThumbnail';


export default function PostProvider() {
  const [posts, setPosts] = useState([]);
  const { accessToken } = useAuth();
  const userId = decodeJWT(accessToken).id;
  
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

  if (posts.length === 0) {
    return <PostThumbnailSkeleton cards={7} />;
  }

  return (
    <div className={styles.main}>
      {posts.map(post => 
        <PostThumbnail  key={post.id} userId={userId} {...post} />)}
    </div>
  )
}
