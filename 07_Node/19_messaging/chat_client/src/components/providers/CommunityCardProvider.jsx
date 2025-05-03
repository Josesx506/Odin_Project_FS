import React from 'react'
import UserCard from '../cards/UserCard';
import styles from '@/styles/providers/comm.module.css'

export default function CommunityCardProvider({ users, loading}) {
  if (loading) {
    return <div>...loading</div>
  }

  return (
    <div className={styles.scrollContainer}>
      <h3 className={styles.scrollTitle}>Members</h3>
      <div className={styles.scrollMain}>
        {users.map((user)=>(
            <UserCard key={user.id} {...user} />
        ))}
      </div>
    </div>
  )
}
