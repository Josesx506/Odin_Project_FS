'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/styles/blog.module.css';
import ViewCommentsBtn, {EditPostBtn, DeletePostBtn} from './Buttons';
import deleteBlogPost from '@/actions/blog';

export default function BlogThumbnail({id, author, title, status, body, date, comments}) {

  async function postDeleteBlog(e) {
    e.preventDefault();
    const result = await deleteBlogPost(id);
    if (result.success) {
      // Do something
    } else {
      // Do something else
    }
  }

  return (
    <div className={styles.blogThumbnail}>
      <div className={styles.author}><span>Written by</span> {author}</div>
      <Link className={styles.thumbnailTitle} href={`/${id}`}><h3>{title}</h3></Link>
      
      <div className={styles.thumbnailBody}>
        {/* First 2 sentences only */}
        {body.split('. ').slice(0, 2).join('. ')}.
      </div>
      
      <div className={styles.thumbnailFooter}>
        <div className={styles.footerInfo}>
          <div style={{fontStyle:"italic"}}>{date}</div>
          <ViewCommentsBtn className={`${styles.blogComments} ${styles.scaleBtn}`} commentId={id} numComments={comments.length}/>
        </div>
        <div className={styles.footerInfo}>
          <EditPostBtn postId={id} status={status} className={styles.scaleBtn} href={`/${id}/edit`}/> 
          {/* Incomplete functionality */}
          <button className={styles.scaleBtn} onClick={postDeleteBlog}>
            <DeletePostBtn postId={id} href={'#'}/>
          </button>
        </div>
      </div>
    </div>
  )
}
