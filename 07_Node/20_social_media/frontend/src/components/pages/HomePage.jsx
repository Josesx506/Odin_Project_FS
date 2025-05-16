'use client'

import NavBar from '../NavBar';
import PostThumbnailScroller from '../scrollers/PostThumbnailScroller';
import styles from '@/styles/pagelayout.module.css'

export default function HomePage() {

  return (
    <div className={styles.main}>
      <NavBar />
      <PostThumbnailScroller />
    </div>
  )
}
