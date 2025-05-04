'use client';

import styles from '@/styles/providers/contact.module.css';
import { ContactCard, ConversationCard } from '../cards/ContactCard';
import { IoMdAddCircleOutline } from "react-icons/io";
import { useMemo, useState } from 'react';

export default function ContactCardProvider({ userChats, userFriends, loading }) {
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
    return <div>...loading</div>
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageAside}>
        <h2 className={styles.asideTitle}>
          Chats <IoMdAddCircleOutline />
        </h2>
        <div className={styles.asideSearch}>
          <input type='search' placeholder='Search' value={query} onChange={onChange}></input>
        </div>

        {query === "" ?


          <div className={styles.asideScroll}>
            {userChats.map((userChat) => (
              <ConversationCard key={userChat.id} {...userChat} />
            ))}
          </div> :


          <div className={styles.asideScroll}>
            {filteredFriends.map((userFriend) => (
              <ContactCard key={userFriend.id} {...userFriend} />
            ))}
          </div>
        }
      </div>
      <div className={styles.pageDetails}>
      </div>
    </div>
  )
}
