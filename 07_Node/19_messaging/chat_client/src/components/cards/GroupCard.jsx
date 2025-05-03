import React from 'react'
import { MdGroups } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import styles from '@/styles/cards/groupcard.module.css';
import Link from 'next/link';

export default function GroupCard({ id, convoName, size }) {
  // id is the conversationId
  return (
    <div className={styles.gcardCntr}>
      <div className={styles.gcardIcon}>
        <MdGroups height={'100%'} />
      </div>
      <div className={styles.gcardBody}>
        <h4>{convoName}</h4>
        <div className={styles.gcardDetails}>
          <div>{size} Member{size>1 ?'s':''}</div>
          <Link href={`/chat/${id}`}><IoIosChatboxes /></Link>
        </div>
      </div>
    </div>
  )
}
