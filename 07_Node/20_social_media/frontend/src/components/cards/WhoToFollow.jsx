import React, { useEffect, useState } from 'react';
import { axiosApi } from '@/config/axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import FollowUserCard from './FollowUserCard';
import styles from '@/styles/cards/whotoflw.module.css'

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
          <FollowUserCard key={user.id} {...user} isFriend={false} followsYou={false} />
        ))}
      </div>
      <Link className={styles.more} href={`/explore?non-followers`}>Show more</Link>
    </div>
  )
}