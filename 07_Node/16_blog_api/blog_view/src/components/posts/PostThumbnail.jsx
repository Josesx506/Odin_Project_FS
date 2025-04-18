import styles from '@/styles/thumbnail.module.css';
import Link from 'next/link';
import { ViewCommentsBtn } from '../Buttons';
import { dateFormatter } from '@/utils/utils';

export default function PostThumbnail({id, userId, author, authorId,  body, updatedAt, comments, published, title,}) {
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
          <div style={{fontStyle:"italic"}}>{dateFormatter(updatedAt)}</div>
          <ViewCommentsBtn className={`${styles.blogComments} ${styles.scaleBtn}`} postId={id} numComments={comments.length}/>
        </div>
      </div>
    </div>
  )
}
