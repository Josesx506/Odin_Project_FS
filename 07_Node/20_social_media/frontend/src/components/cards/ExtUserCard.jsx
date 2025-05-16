'use client';

import { Button } from '@/components/Buttons';
import useFollowing from '@/hooks/useFollowing';
import styles from '@/styles/cards/extusrcd.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export default function FollowUserCard({ id, fullname, username, gravatar, bio, followsYou }) {
    const { followUser, unfollowUser, followingStates, checkFollowStatus } = useFollowing();
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const controller = new AbortController();
      checkFollowStatus(id, setLoading);
      return () => controller.abort();
    }, []);

    const isFollowing = useMemo(() => {
      return followingStates[id];
    }, [followingStates[id]]);


  async function onAddFollower(e) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const success = await followUser(id);
      if (success) {
        toast.success('Following');
      }
    } catch(err) {
      toast.error(`${err?.response?.data?.message}` || 'Bad Request')
    } finally {
      setLoading(false);
    }
  }

  async function onRemoveFollower(e) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const success = await unfollowUser(id);
      if (success) {
        toast.success('Unfollowed');
        // refetch();
      }
    } catch(err) {
      toast.error(`${err?.response?.data?.message}` || 'Bad Request')
    } finally {
      setLoading(false);
    }
  }

  function checkFriendShip(){
    const btnStyle = {
      height:'fit-content', borderRadius: '1em', padding: '0.35em 0.5em',
      fontSize: '0.9rem', fontWeight: 'bold'
    }
    if (isFollowing) {
      return (
        <Button style={btnStyle} onClick={onRemoveFollower} aria-disabled={loading}>
          <span>Unfollow</span>&nbsp;
        </Button>)
    }
    if (followsYou && !isFollowing) {
      return (
        <Button style={btnStyle} onClick={onAddFollower} aria-disabled={loading}>
          <span>Follow Back</span>&nbsp;
        </Button>)
    } else {
      return (
        <Button style={btnStyle} onClick={onAddFollower} aria-disabled={loading}>
          <span>Follow</span>&nbsp;
        </Button>)
    }
  }
  const friendship = checkFriendShip();

  return (
    <div className={styles.cardCntr}>
      <Link href={`/${id}`}  className={styles.avatar}>
        <Image src={gravatar || `https://robohash.org/${id}.png`}
          width={40} height={40} alt={`${username} profile photo`} />
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <div className={styles.names}>
            <Link href={`/${id}`} className={styles.fullname}>{fullname}</Link>
            <div className={styles.username}>@{username}</div>
          </div>
          <div className={styles.flwBtn}>{friendship}</div>
        </div>
        <div>{bio}</div>
      </div>
    </div>
  )
}
