import Image from 'next/image';
import styles from '@/styles/cards/authorcard.module.css'

export default function AuthorCard({id, fullname, username, gravatar}) {
  return (
    <div className={styles.acdtlsCntr}>
      <div className={styles.acdtlsImgCntr}>
        <Image src={gravatar || `https://robohash.org/${id}.png`} 
            width={60} height={60} alt={`${username} profile photo`} />
      </div>
      <div className={styles.acdtlsNameCntr}>
        <div className={styles.fullname}>{fullname}</div>
        <div className={styles.username}>@{username}</div>
      </div>
    </div>
  )
}
