'use client';

import { axiosApi } from '@/config/axios';
import styles from '@/styles/cards/usercard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RiUserUnfollowLine } from "react-icons/ri";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";

export default function UserCard({ id, name, image, bio, isFriend, followsYou }) {
  const [loading, setLoading] = useState(false);
  const [friend, setFriend] = useState(isFriend);
  const [follower, setFollower] = useState(followsYou);

  async function onAddFriend(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const res = await axiosApi.get(`/v1/chat/add-friend?targetId=${id}`);
      setFriend(true);
      toast.success('Connected')
    } catch(err) {
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
      const res = await axiosApi.get(`/v1/chat/remove-friend?targetId=${id}`);
      setFriend(false);
      toast.success('Unfollowed')
    } catch(err) {
      console.log(err)
      toast.error(`${err.response.data?.message}` || 'Bad Request')
    } finally {
      setLoading(false)
    }
  }

  function onclick(e) {
    e.preventDefault();
    e.stopPropagation();
    toast.success('User follows you');
  }
  
  function checkFriendShip(){
    if (friend) {
      return (
        <Link onClick={onRemoveFriend} aria-disabled={loading} className={styles.status} href={'#'}>
          <span>Unfollow</span>&nbsp;
          <RiUserUnfollowLine color='red' />
        </Link>)
    }
    if (follower && !friend) {
      return (
        <Link onClick={onclick} aria-disabled={loading} className={styles.status} href={'#'}>
          <span>Follows you</span>&nbsp;
          <SlUserFollowing color='green' />
        </Link>)
    } else {
      return (
        <Link onClick={onAddFriend} aria-disabled={loading} className={styles.status} href={'#'}>
          <span>Follow</span>&nbsp;
          <SlUserFollow color='blue' />
        </Link>)
    }
  }
  const friendship = checkFriendShip();

  return (
    <div className={styles.ucardCntr}>
      <div className={styles.ucardAvatar}>
        <Image className={styles.ucardImg} 
          src={image || `https://robohash.org/${id}.png`} 
          width={60} height={60} alt={`${name} avatar`} />
      </div>
      <div className={styles.ucardBody}>
        <h4>{name}</h4>
        <div>{bio}</div>
        <>{friendship}</>
      </div>
    </div>
  )
}
