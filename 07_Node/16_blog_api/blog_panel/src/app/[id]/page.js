'use client';

import CommentThumbnail from '@/components/Comment';
import { blogPosts } from '@/components/data';
import styles from '@/styles/blogPage.module.css';
import Form from 'next/form';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useRef } from 'react';


export default function BlogPostPage() {
  const { id } =  useParams();
  const newCommentRef = useRef("");

  const post = blogPosts.filter((post)=>post.id===Number(id))[0];

  function toggleNew(e) {
    e.preventDefault();
    newCommentRef.current.value = "";
  }

  function postNewComment(e) {
    e.preventDefault();
    const commentValue = newCommentRef.current.value;
    const path = `/${id}/comments/new`;
    console.log("Executing fetch request for ", commentValue);
    newCommentRef.current.value = "";
  }

  function postDeleteBlog(e) {
    e.preventDefault();
    const path = `/${id}`;
    console.log("Executing delete request for ", path);
  }
  
  if (!post) {
    return notFound();
  }

  return (
    <div className={styles.editPost}>
      {/* View Post */}
      <div className={styles.postView}>
        <h2>{post.title}</h2>
        <div>{post.body}</div>
        <div className={styles.actionBtns}>
          <button type='submit'>
            <Link href={`/${id}/edit`}>Edit</Link>
          </button>
          <button style={{color: "red"}} onClick={postDeleteBlog} type='submit'>Delete</button>
        </div>
      </div>

      {/* Handle Comments */}
      <div className={styles.commentCntr}>
        <h4 id='comments'>Comments</h4>

        {/* Create new Comment */}
        <Form >
          <div className={styles.newCmtInput}>
            <label htmlFor="commentBody"></label>
            <textarea ref={newCommentRef} rows={2} name="commentBody" id="commentBody" 
              placeholder='What are your thoughts?'></textarea>
          </div>
          <div className={styles.actionBtns}>
            <button onClick={toggleNew}>Cancel</button>
            <button onClick={postNewComment} type='submit'>Respond</button>
          </div>
        </Form>

        {/* Edit Existing Comments */}
        {
          post.comments.length===0 ? 
          <div>Comments unavailable for this post</div> : 
          post.comments.map((comment)=>{
            return <CommentThumbnail key={comment.id} postId={id} 
                    id={comment.id} username={comment.username} 
                    comment={comment.comment} />
          })
        }
      </div>
    </div>
  )
}
