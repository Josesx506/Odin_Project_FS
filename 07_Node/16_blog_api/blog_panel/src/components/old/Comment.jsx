'use client';

import React, { useState, useRef } from 'react'
import styles from '@/styles/comment.module.css';
import {EditPostBtn, DeletePostBtn} from './Buttons';
import Form from 'next/form';

export default function CommentThumbnail({ postId, id, username, comment, modify=false }) {
  const [editComment, setEditComment] = useState(false);
  const editCommentRef = useRef(comment);

  function toggleEdit(e) {
    e.preventDefault();
    setEditComment(!editComment);
  }

  function postEditComment(e) {
    e.preventDefault();
    const commentValue = editCommentRef.current.value;
    const path = `/${postId}/comments/${id}?edit=true`;
    console.log("Executing fetch request for ", path, commentValue);
    setEditComment(!editComment);
  }

  function postDeleteComment(e) {
    e.preventDefault();
    const path = `/${postId}/comments/${id}`;
    console.log("Executing delete request for ", path);
  }

  return editComment ? (
        <div className={styles.commentThumbnail}>
          <div className={styles.commentUser}> {username}</div>
          <div className={styles.commentBody}>
            <Form>
              <div className={styles.editCmtInput}>
                <label htmlFor="commentBody"></label>
                <textarea ref={editCommentRef} rows={2} name="commentBody" id="commentBody" defaultValue={comment}></textarea>
              </div>
              <div className={styles.editCmtActions}>
                <button onClick={toggleEdit}>Cancel</button>
                <button onClick={postEditComment} type='submit'>Submit</button>
              </div>
            </Form>
          </div>
        </div>
    ) : (
        <div className={styles.commentThumbnail}>
          <div className={styles.commentUser}> {username}</div>
          <div className={styles.commentBody}>
            {comment}
          </div>
          {modify && 
            <div className={styles.commentActions}>
              <button className={styles.scaleBtn} onClick={toggleEdit}>
                <EditPostBtn postId={id} status='published' href={'#'}/> 
              </button>
              <button className={styles.scaleBtn} onClick={postDeleteComment}>
                <DeletePostBtn postId={id} className={styles.scaleBtn} href={'#'}/>
              </button>
            </div>
          }
        </div>
    )
}
