'use client';

import styles from '@/styles/cards/contactcard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { MdGroups } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { axiosApi } from '@/config/axios';
import { useState } from 'react';

export function ConversationCard({ id, name, image, isGroup, message, otherUserId }) {
  const img = !isGroup ?
    <Image className={styles.ccardImg}
      src={image || `https://robohash.org/${otherUserId}.png`}
      width={60} height={60} alt={`${name} avatar`} /> :
    <MdGroups height={'100%'} />


  return (
    <Link href={`/chat/${id}`} className={styles.ccardCntr}>
      <div className={styles.ccardIcon}>
        {img}
      </div>
      <div className={styles.ccardBody}>
        <h4>{name}</h4>
        <div>{message || 'Continue conversation'}</div>
      </div>
    </Link>
  )
}


export function ContactCard({ id, name, image }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  

  async function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true)
    const controller = new AbortController();
    try {
      const res = await axiosApi.get(`/v1/chat/create-convo?targetId=${id}`, 
        {signal: controller.signal})
      if (res.status === 200 && res.data?.url) {
        router.push(res.data.url);
      }
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Link onClick={onClick} href={'#'} className={styles.ccardCntr} aria-disabled={loading}>
      <div className={styles.ccardIcon}>
        <Image className={styles.ccardImg}
          src={image || `https://robohash.org/${id}.png`}
          width={60} height={60} alt={`${name} avatar`} />
      </div>
      <div className={styles.ccardBody}>
        <h4>{name}</h4>
        <div>{'Start a new conversation'}</div>
      </div>
    </Link>
  )
}