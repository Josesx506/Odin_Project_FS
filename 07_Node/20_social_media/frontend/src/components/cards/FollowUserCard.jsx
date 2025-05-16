import { Button } from '@/components/Buttons';
import { axiosApi } from '@/config/axios';
import styles from '@/styles/cards/flwusrcd.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { RiUserUnfollowLine } from "react-icons/ri";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function FollowUserCard({ id, fullname, username, gravatar, isFriend, followsYou }) {
  const [loading, setLoading] = useState(false);
  const [friend, setFriend] = useState(isFriend);
  const [follower, setFollower] = useState(followsYou);


  async function onAddFriend(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const res = await axiosApi.get(`/v1/social/users/follow?targetId=${id}`);
      setFriend(true);
      toast.success('Following')
    } catch (err) {
      toast.error(`${err.response.data?.message}` || 'Bad Request')
    } finally {
      setLoading(false)
    }
  }

  async function onRemoveFriend(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const res = await axiosApi.get(`/v1/social/users/unfollow?targetId=${id}`);
      setFriend(false);
      toast.success('Unfollowed')
    } catch (err) {
      console.log(err)
      toast.error(`${err.response.data?.message}` || 'Bad Request')
    } finally {
      setLoading(false)
    }
  }

  function checkFriendShip(){
    const btnStyle = {
      height:'fit-content', borderRadius: '1em', padding: '0.35em 0.5em',
      fontSize: '0.9rem', fontWeight: 'bold'
    }
    if (friend) {
      return (
        <Button style={btnStyle} onClick={onRemoveFriend} aria-disabled={loading}>
          <span>Unfollow</span>&nbsp;
        </Button>)
    }
    if (follower && !friend) {
      return (
        <Button style={btnStyle} onClick={onAddFriend} aria-disabled={loading}>
          <span>Follow Back</span>&nbsp;
        </Button>)
    } else {
      return (
        <Button style={btnStyle} onClick={onAddFriend} aria-disabled={loading}>
          <span>Follow</span>&nbsp;
        </Button>)
    }
  }
  const friendship = checkFriendShip();


  return (
    <div className={styles.cardCntr}>
      <div className={styles.avatar}>
        <Image src={gravatar || `https://robohash.org/${id}.png`}
          width={40} height={40} alt={`${username} profile photo`} />
      </div>
      <div className={styles.names}>
        <Link href={`/${id}`} className={styles.fullname}>{fullname}</Link>
        <div className={styles.username}>@{username}</div>
      </div>
      <div className={styles.flwBtn}>{friendship}</div>
    </div>
  )
}
