import styles from '@/styles/cards/usercard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { RiUserUnfollowLine } from "react-icons/ri";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";

export default function UserCard({ id, name, image, bio, isFriend, followsYou }) {
  
  let friendship;
  if (isFriend) {
    friendship =
      <Link className={styles.status} href={'#'}>
        <span>Unfollow</span>&nbsp;
        <RiUserUnfollowLine color='red' />
      </Link>
  } else if (followsYou && !isFriend) {
    friendship = 
      <Link className={styles.status} href={'#'}>
        <span>Following</span>&nbsp;
        <SlUserFollowing color='green' />
      </Link>
  } else {
    friendship = 
      <Link className={styles.status} href={'#'}>
        <span>Follow</span>&nbsp;
        <SlUserFollow color='blue' />
      </Link>
  }

  return (
    <div className={styles.ucardCntr}>
      <div className={styles.ucardAvatar}>
        <Image className={styles.ucardImg} 
          src={image || 'https://robohash.org/22.png'} 
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
