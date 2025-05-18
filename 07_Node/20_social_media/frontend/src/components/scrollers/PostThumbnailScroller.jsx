'use client';

import PostThumbnailCard from '@/components/cards/PostThumbnailCard';
import NewPost from '@/components/forms/NewPost';
import { axiosApi } from '@/config/axios';
import styles from '@/styles/genericscroller.module.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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

  function handlePostUpload(newPost) {
    setPosts(prevPosts => [ newPost, ...prevPosts ])
  }

  if (loading) {
    return <div>posts loading....</div>
  }

  return (
    <div className={styles.scrollbarMain}>
      <NewPost onPostUpload={handlePostUpload} />
      {posts.map((post)=>(
        <PostThumbnailCard key={post.id} post={post} />
      ))}
    </div>
  )
}
