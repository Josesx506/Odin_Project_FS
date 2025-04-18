import styles from '@/styles/skeleton.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function PostThumbnailSkeleton({ cards }) {
  return (
    Array(cards).fill(null).map((item, index) => {
      return (
        <div key={index} className={styles.blogThumbSkeleton}>
          <div className={styles.blogThumbAuthor}>
            <Skeleton />
          </div>

          <div className={styles.blogThumbTitle}>
            <h3><Skeleton /></h3>
          </div>
          <div className={styles.blogThumbBody}>
            <Skeleton count={2} />
          </div>

          <div className={styles.blogThumbFooter}>
            <div style={{ flex: 1 }}><Skeleton /></div>
            <div style={{ flex: 1 }}><Skeleton width='30%' /></div>
          </div>
        </div>)
    })
  )
}


export default function PostDetailSkeleton() {
  return (
    <div className={styles.detailPostCommentSkeleton}>
      <div className={styles.detailPostSkeleton}>
        <h2 className={styles.detailPTitleSkl}>
          <Skeleton width='60%' />
        </h2>
        <div className={styles.detailPDetailSkl}>
          <div className={styles.detailPAuthorSkl}>
            <Skeleton style={{ flex: 1, padding: '0.2rem' }} circle width={'1.5rem'} height={'1.5rem'} />
            <h3 style={{ flex: 1 }}>
            <Skeleton width='30%' />
            </h3>
          </div>
          <div style={{ flex: 0.15, minWidth: '80px' }}>
            <Skeleton />
          </div>
        </div>
        <div>
          <Skeleton count={5} />
        </div>
      </div>

      <div className={styles.detailCommentSkeleton}>
        <h4 id='comments'>Comments</h4>
        <Skeleton count={2} style={{marginBottom: '0.5rem'}} />
      </div>
    </div>
  )
}


export  { PostThumbnailSkeleton, PostDetailSkeleton }