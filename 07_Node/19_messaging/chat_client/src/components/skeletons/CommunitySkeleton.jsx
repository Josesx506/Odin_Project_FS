import styles from '@/components/skeletons/skeleton.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CCSkeleton, GCSkeleton } from '@/components/skeletons/CardSkeletons';


function MemberSkeletons({ cards = 6 }) {
  return (
    <div className={styles.memgrpSkl}>
      <h3 style={{ margin: '0 auto' }}>
        <Skeleton height={'1.2rem'} width={'100px'} />
      </h3>
      <div className={styles.scrollStyle}>
        {Array(cards).fill(null).map((item, index) => {
          return <CCSkeleton key={index} />
        })}
      </div>
    </div>
  )
}

function GroupSkeletons({ cards = 6 }) {
  return (
    <div className={styles.memgrpSkl}>
      <h3 style={{ margin: '0 auto' }}><Skeleton height={'1.2rem'} width={'70px'} /></h3>
      <h3 style={{ margin: '0 auto' }}><Skeleton height={'1.2rem'} width={'100px'} /></h3>
      <div className={styles.scrollStyle}>
        {Array(cards).fill(null).map((item, index) => {
          return <GCSkeleton contact={false} key={index} />
        })}
      </div>
    </div>
  )
}



export default function CommunitySkeleton() {
  return (
    <div className={styles.communitySkl}>
      <MemberSkeletons />
      <GroupSkeletons />
    </div>
  )
}

export { GroupSkeletons, MemberSkeletons };
