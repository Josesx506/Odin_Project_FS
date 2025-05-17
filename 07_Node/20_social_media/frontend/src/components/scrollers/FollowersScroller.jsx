'use client';

import ExtUserCard from '@/components/cards/ExtUserCard';
import UserPageNavCard from '@/components/cards/UserPageNavCard';
import { axiosApi } from '@/config/axios';
import styles from '@/styles/genericscroller.module.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function FollowersScroller({ userId }) {
  const [followers, setFollowers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getFollowerData(signal) {
    setLoading(true)
    try {
      const res = await axiosApi.get(`/v1/social/users/${userId}/followers?take=30`,
        { signal })
      setFollowers(res.data.followers);
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
    getFollowerData(controller.signal);
    return () => { controller.abort() }
  }, [userId])

  if (loading) {
    return <div>followers loading....</div>
  }

  const emptyFollowers =
    <div style={{ textAlign: 'center', marginTop: '1em' }}>No Interactions Found. Visit the explore page.</div>

  return (
    <div className={styles.scrollbarMain}>
      {user && <UserPageNavCard title={user.fullname} subtitle={`@${user.username.toLowerCase()}`} />}
      {followers.length !== 0 ?
        followers.map((follower) => (
          <ExtUserCard key={follower.id} {...follower} />
        )) :
        emptyFollowers
      }
    </div>
  )
}
