'use client';

import ExtUserCard from '@/components/cards/ExtUserCard';
import { axiosApi } from '@/config/axios';
import styles from '@/styles/genericscroller.module.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ExtUserThumbnailScroller({ filter }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getUserData(signal) {
    setLoading(true)
    const options = filter || 'mixed';
    try {
      const res = await axiosApi.get(`/v1/social/users/${options}?take=30`,
        { signal })
      setUsers(res.data)
    } catch (err) {
      if (err?.code !== "ERR_CANCELED") {
        toast.error(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    getUserData(controller.signal);
    return () => { controller.abort() }
  }, [filter])

  if (loading) {
    return <div>users loading....</div>
  }

  return (
    <div className={styles.scrollbarMain}>
      {users.map((user) => (
        <ExtUserCard key={user.id} {...user} />
      ))}
    </div>
  )
}
