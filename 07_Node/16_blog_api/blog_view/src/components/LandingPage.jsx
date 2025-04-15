'use client';

import { axiosApi } from "@/api/axios";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import PostThumbnail from "./posts/PostThumbnail";

export default function FreeLandingPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      try {
        const resp = await axiosApi.get(`${process.env.NEXT_PUBLIC_EXPRESSURL}/v1/freemium`, { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, 
          signal: controller.signal,
        })
        setPosts(resp.data.posts)
      } catch(err) {
        // console.error(err)
      }
    }
    getData();

    return () => {controller.abort()};
  }, [])

  return (
    <div className={styles.main}>
      {posts.map(post=> {
        return <PostThumbnail key={post.id} {...post} />
      })}
    </div>
  )
}
