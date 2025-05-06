import { GCSkeleton } from '@/components/skeletons/CardSkeletons';
import styles from '@/components/skeletons/skeleton.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function AsideSkeleton({ cards = 6 }) {
  return (
    <div className={styles.asideSkl}>
      <div style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{ flex: 1 }}><Skeleton height={'1.7rem'} width={'70px'} /></h2>
        <Skeleton style={{ flex: 1 }} circle width={'1.3rem'} height={'1.3rem'} />
      </div>
      <div><Skeleton height={'1.7rem'} /></div>
      <div className={styles.asideScroll}>
        {Array(cards).fill(null).map((item, index) => {
          return <GCSkeleton contact={false} key={index} />
        })}
      </div>
    </div>
  )
}

function ChatSkeleton() {
  return (
    <div className={styles.chatSkl}>
      <AsideSkeleton />
      <div className={styles.emptyChatDetails}></div>
    </div>
  )
}

function MsgPrvdrSkeleton() {
  return (
    <div className={styles.msgProvider}>
      <div style={{padding: '0.3em 0.5em', backgroundColor: 'white', border: '1px solid darkgray'}}>
        <Skeleton style={{ flex: 1, marginLeft:'2.5em' }} circle width={'40px'} height={'40px'} />
      </div>
      <div></div>
      <div style={{backgroundColor: 'lightgray',padding: '0.2em 0.3em'}}>
        <Skeleton height={'1.2rem'} />
      </div>
    </div>
  )
}

function ChatDetailSkeleton() {
  return (
    <div className={styles.chatDetailSkl}>
      <AsideSkeleton />
      <MsgPrvdrSkeleton />
    </div>
  )
}


export { AsideSkeleton, MsgPrvdrSkeleton, ChatSkeleton, ChatDetailSkeleton };
