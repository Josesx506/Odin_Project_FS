'use client';

import { useEffect, useState } from "react";
import BlogThumbnail from "./BlogThumbnail";
import styles from "@/app/page.module.css";
import axsapi from "@/api/axios";

export default function FreeLandingPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      try {
        const resp = await axsapi.get(`${process.env.NEXT_PUBLIC_EXPRESSURL}/v1/freemium`, { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, 
          signal: controller.signal,
        })
        setPosts(resp.data.posts)
      } catch(err) {
        console.error(err)
      }
    }
    getData();

    return () => {controller.abort()};
  }, [])

  return (
    <div className={styles.main}>
      {posts.map(post=> {
        return <BlogThumbnail key={post.id} {...post} />
      })}
    </div>
  )
}
