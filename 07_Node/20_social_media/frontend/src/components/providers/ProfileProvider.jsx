'use client';
import PostThumbnailCard from '@/components/cards/PostThumbnailCard';
import UserPageDetailsCard from "@/components/cards/UserPageDetailsCard";
import { axiosApi } from "@/config/axios";
import styles from '@/styles/genericscroller.module.css';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileProvider({ userId }) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const controller = new AbortController;

    async function fetchData(signal) {
      setLoading(true);
      axiosApi.get(`/v1/social/users/${userId}`)
        .then((res) => { setProfile(res.data) })
        .catch((err) => toast.error(err.message || 'Profile data fetch failed'))
      axiosApi.get(`/v1/social/users/${userId}/posts`)
        .then((res) => { setPosts(res.data.posts) })
        .catch((err) => toast.error(err.message || 'Post data fetch failed'))
      setLoading(false);
    }

    fetchData(controller.signal);
    return () => { controller.abort() };
  }, [userId])

  if (loading) {
    return <div>User profile loading</div>
  }

  const emptyPosts = <div style={{ textAlign: 'center' }}>No Posts Found. Create  a new post.</div>


  return (
    <div className={styles.doubleScroller}>
      <UserPageDetailsCard {...profile} />
      <div className={styles.innerScroller}>
        {posts ?
          posts.map((post) => (
            <PostThumbnailCard key={post.id} post={post} />
          )) :
          emptyPosts}
      </div>
    </div>
  )
}
