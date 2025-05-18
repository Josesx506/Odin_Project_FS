'use client';

import NewComment from '@/components/forms/NewComment';
import PostDetailCard from '@/components/cards/PostDetailCard';
import UserPageNavCard from "@/components/cards/UserPageNavCard";
import { axiosApi } from '@/config/axios';
import styles from '@/styles/genericscroller.module.css';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import CommentThumbnailCard from '@/components/cards/CommentThumbnailCard';

export default function PostProvider({ postId }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [postAuthor, setPostAuthor] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const controller = new AbortController;
    async function getPostDetails(postId, signal) {
      try {
        const res = await axiosApi.get(`/v1/social/posts/${postId}`, { signal });
        setPostAuthor(res.data.author);
        setPost(res.data.post);
        setComments(res.data.comments);
      } catch (err) {
        if (err?.code !== "ERR_CANCELED") {
          toast.error(err.message);
        }
      } finally {
        setLoading(false)
      }
    }

    getPostDetails(postId, controller.signal)
    return () => { controller.abort() }
  }, [postId])

  if (loading) {
    return <div>post details loading ...</div>
  }

  const emptyComments = <div style={{ textAlign: 'center' }}>No Comments Found. Reply this post.</div>

  return (
    <div className={styles.doubleScroller}>
      <div>
        <UserPageNavCard title={'Post'} />
        <PostDetailCard post={post} postAuthor={postAuthor} />
        <NewComment />
      </div>
      <div className={styles.innerScroller}>
        {comments && comments.length>0 ?
          comments.map((comment) => (
            <CommentThumbnailCard key={comment.id} comment={comment} />
          )) :
          emptyComments}
      </div>
    </div>
  )
}
