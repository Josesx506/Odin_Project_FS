'use client';

import ExtUserCard from '@/components/cards/ExtUserCard';
import UserPageNavCard from '@/components/cards/UserPageNavCard';
import { axiosApi } from '@/config/axios';
import styles from '@/styles/genericscroller.module.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function FollowingScroller({ userId }) {
  const [following, setFollowing] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getFollowingData(signal) {
    setLoading(true)
    try {
      const res = await axiosApi.get(`/v1/social/users/${userId}/following?take=30`,
        { signal })
      setFollowing(res.data.following);
      setUser(res.data.user);
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
    getFollowingData(controller.signal);
    return () => { controller.abort() }
  }, [userId])

  if (loading) {
    return <div>following loading....</div>
  }

  const emptyFollowing =
    <div style={{ textAlign: 'center', marginTop: '1em' }}>No Interactions Found. Visit the explore page.</div>

  return (
    <div className={styles.scrollbarMain}>
      {user && <UserPageNavCard title={user.fullname} subtitle={`@${user.username.toLowerCase()}`} />}
      {following.length !== 0 ? following.map((following) => (
        <ExtUserCard key={following.id} {...following} />
      )) :
        emptyFollowing}
    </div>
  )
}
