import React from 'react'
import Image from 'next/image';
import styles from '@/styles/cards/messagecard.module.css';

export default function MessageCard({ activeUserId, authorId, name, body, authorimage, msgimage, createdAt }) {
  const author = Number(activeUserId) === Number(authorId);

  const dateParse = new Date(createdAt);
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }
  let timeString = dateParse.toLocaleTimeString('en-US', timeOptions);

  return (
    <div className={author ? styles.dmContainerAuthor : styles.dmContainer}>
      <div className={styles.dmIcon}>
        <Image className={styles.dmAvatar} src={authorimage || `https://robohash.org/${authorId}.png`}
          width={30} height={30} alt={`${name} avatar`} />
      </div>
      <div className={styles.dmBody}>
        <div className={styles.dmBodyTitle}>
          <div className={styles.authorName}>{name}</div>
          <div className={styles.time}>{timeString}</div>
        </div>
        <div className={styles.dmBodyContent}>
          <div className={styles.msgImage}>
            {msgimage && <img src={msgimage} alt={`chat image`} />}
          </div>
          <div className={styles.msgBody}>
            {body}
          </div>
        </div>
      </div>
    </div>
  )
}
