'use client'

import { useRouter } from 'next/navigation';
import { IoArrowBack } from "react-icons/io5";
import styles from '@/styles/cards/usrpgnav.module.css';


export default function UserPageNavCard({ fullname, numPosts }) {
  const router = useRouter();
  return (
    <div className={styles.profileNav}>
      <IoArrowBack className={styles.backBtn} onClick={() => router.back()} />
      <div className={styles.navBody}>
        <h3>{fullname}</h3>
        <div>{numPosts} post{numPosts>0 && 's'}</div>
      </div>
    </div>
  )
}
