// 'use client';

// import CommentThumbnail from '@/components/Comment';
// import { blogPosts } from '@/components/data';
// import styles from '@/styles/blogPage.module.css';
// import Form from 'next/form';
// import { notFound, useParams } from 'next/navigation';
// import { useRef } from 'react';


// export default function BlogPostPage() {
//   const { id } =  useParams();
//   const newCommentRef = useRef("");
//   const blogTitleRef = useRef("");
//   const blogBodyRef = useRef("");

//   const post = blogPosts.filter((post)=>post.id===Number(id))[0];

//   function toggleNew(e) {
//     e.preventDefault();
//     newCommentRef.current.value = "";
//   }

//   function postUpdatedBlog(e) {
//     e.preventDefault();
//     const titleValue = blogTitleRef.current.value;
//     const bodyValue = blogBodyRef.current.value;
//     const path = `/${id}`;
//     console.log("Executing `patch` fetch request for ", path);
//   }

//   function postPublishBlog(e) {
//     e.preventDefault();
//     const titleValue = blogTitleRef.current.value;
//     const bodyValue = blogBodyRef.current.value;
//     const path = `/${id}/publish`;
//     console.log("Executing `post` fetch request for ", path);
//     blogTitleRef.current.value = "";
//     blogBodyRef.current.value = "";
//   }

//   function postNewComment(e) {
//     e.preventDefault();
//     const commentValue = newCommentRef.current.value;
//     const path = `/${id}/comments/new`;
//     console.log("Executing `post` fetch request for ", commentValue);
//     newCommentRef.current.value = "";
//   }
  
//   if (!post) {
//     return notFound();
//   }

//   return (
//     <div className={styles.editPost}>
//       {/* Edit Post */}
//       <Form className={styles.postForm}>
//         <div>
//           <label htmlFor='postTitle'></label>
//           <input ref={blogTitleRef} id='postTitle' name='postTitle' defaultValue={post.title}></input>
//         </div>
//         <div>
//           <label htmlFor='postBody'></label>
//           <textarea ref={blogBodyRef} id='postBody' rows={20} name='postBody' defaultValue={post.body}></textarea>
//         </div>
//         <div className={styles.actionBtns}>
//           <button onClick={postUpdatedBlog} type='submit'>Save</button>
//           <button onClick={postPublishBlog} disabled={post.status==='published'} type='submit'>
//             {post.status==='draft' ? 'Publish' : 'Update'}
//           </button>
//         </div>
//       </Form>

//       {/* Handle Comments */}
//       <div className={styles.commentCntr}>
//         <h4>Comments</h4>

//         {/* Create new Comment */}
//         <Form >
//           <div className={styles.newCmtInput}>
//             <label htmlFor="commentBody"></label>
//             <textarea ref={newCommentRef} rows={2} name="commentBody" id="commentBody" 
//               placeholder='What are your thoughts?'></textarea>
//           </div>
//           <div className={styles.actionBtns}>
//             <button onClick={toggleNew}>Cancel</button>
//             <button onClick={postNewComment} type='submit'>Respond</button>
//           </div>
//         </Form>

//         {/* Edit Existing Comments */}
//         {
//           post.comments.length===0 ? 
//           <div>Comments unavailable for this post</div> : 
//           post.comments.map((comment)=>{
//             return <CommentThumbnail key={comment.id} postId={id} 
//                     id={comment.id} username={comment.username} 
//                     comment={comment.comment} modify={true} />
//           })
//         }
//       </div>
//     </div>
//   )
// }


import React from 'react'

export default async function page({params}) {
  const { id } = await params;
  return (
    <div>
      This is post {id} edit page
    </div>
  )
}
