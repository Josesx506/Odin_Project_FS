'use client';

import { axiosApi } from '@/config/axios';
import styles from '@/styles/cards/whotoflw.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import FollowUserCard from './FollowUserCard';

export default function WhoToFollow() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function getNonFollowers() {
      setLoading(true);
      try {
        const res = await axiosApi.get('/v1/social/users/non-followers', {
          signal: controller.signal
        })
        setUsers(res.data);
      } catch (err) {
        if (err?.code !== "ERR_CANCELED") {
          toast.error(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    getNonFollowers();
    return () => { controller.abort() }
  }, [])

  if (loading) {
    return <div>Nonfollowers loading...</div>
  }

  return (
    <div className={styles.mainCntr}>
      <h3 className={styles.header}>Who to follow</h3>
      <div>
        {users.map((user) => (
          <FollowUserCard key={user.id} {...user} followsYou={false} />
        ))}
      </div>
      <Link className={styles.more} href={`/explore?filter=non-followers`}>Show more</Link>
    </div>
  )
}