import styles from '@/styles/thumbnail.module.css';
import Link from 'next/link';
import { DeletePostBtn, EditPostBtn, ViewCommentsBtn } from './Buttons';
import { dateFormatter } from '@/utils/dateFormatter';

export default function BlogThumbnail({id, author, authorId,  body, createdAt, comments, published, title,}) {
  return (
    <div>
      <div className={styles.author}>
        <span>Written by</span> <Link href={`/author/${authorId}`}>{author}</Link>
      </div>
      <Link className={styles.thumbnailTitle} href={`/posts/${id}`}>
        <h3>{title}</h3>
      </Link>
      <div className={styles.thumbnailBody}>{body}</div>
      
      <div className={styles.thumbnailFooter}>
        <div className={styles.footerInfo}>
          <div style={{fontStyle:"italic"}}>{dateFormatter(createdAt)}</div>
          <ViewCommentsBtn className={`${styles.blogComments} ${styles.scaleBtn}`} postId={id} numComments={comments.length}/>
        </div>
        <div className={styles.footerInfo}>
          <EditPostBtn postId={id} published={published} className={styles.scaleBtn} onClick={()=>{`/posts/${id}/edit`}}/> 
          <DeletePostBtn postId={id} className={styles.scaleBtn} onClick={()=>{`/posts/${id}/delete`}}/>
        </div>
      </div>
    </div>
  )
}
