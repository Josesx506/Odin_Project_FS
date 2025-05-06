'use client';

import styles from '@/styles/providers/chataside.module.css';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { ContactCard, ConversationCard } from '../cards/ContactCard';
import { AsideSkeleton } from '../skeletons/ChatSkeleton';

export default function AsideCardProvider({ userChats, userFriends, loading }) {
  const [query, setQuery] = useState("");

  // Filter the list of friends without changing state
  const filteredFriends = useMemo(() => {
    return userFriends.filter(friend => {
      return friend.name.toLowerCase().includes(query.toLowerCase())
    }
    )
  }, [userFriends, query])

  function onChange(e) {
    e.preventDefault();
    e.stopPropagation();
    setQuery(e.target.value)
  }

  if (loading) {
    return <AsideSkeleton />
  }

  let behaviour;
  if (userChats.length === 0 && filteredFriends.length === 0) {

    behaviour = (<div className={styles.asideScroll}>
      <div className={styles.unavailable}>
        No chats available join a group or follow existing users on our <Link href={'/community'} >community</Link> page.
      </div>
      <div>Find connections and start conversations with existing friends using the search bar</div>
    </div>)

  } else if (userChats.length === 0 && filteredFriends.length > 0) {
    behaviour = (query === "" ? 
      <div className={styles.asideScroll}>
        <div className={styles.unavailable}>
          No chats available join a group or follow existing users on our <Link href={'/community'} >community</Link> page.
        </div>
        <div>Find connections and start conversations with existing friends using the search bar</div>
      </div> : 

      <div className={styles.asideScroll}>
        {filteredFriends.length>0 ? filteredFriends.map((userFriend) => (
          <ContactCard key={userFriend.id} {...userFriend} />
        )) : <div style={{fontStyle:'oblique'}}>No Results</div>}
      </div>
    )
  } else {
    behaviour = (query === "" ?
      <div className={styles.asideScroll}>
        {userChats.map((userChat) => (
          <ConversationCard key={userChat.id} {...userChat} />
        ))}
      </div> :

      <div className={styles.asideScroll}>
        {filteredFriends.length>0 ? filteredFriends.map((userFriend) => (
          <ContactCard key={userFriend.id} {...userFriend} />
        )) : <div style={{fontStyle:'oblique'}}>No Results</div>}
      </div>
    )
  }

  return (
    <div className={styles.pageAside}>
      <h2 className={styles.asideTitle}>
        Chats <IoMdAddCircleOutline />
      </h2>
      <div className={styles.asideSearch}>
        <input type='search' placeholder='Search' value={query} onChange={onChange}></input>
      </div>
      {behaviour}
    </div>
  )
}
