'use client'

import AsideCardProvider from '@/components/providers/AsideCardProvider';
import MsgsProvider from '@/components/providers/MsgsProvider';
import { fetchUserConversations } from '@/effects/requests';
import styles from '@/styles/pages/chatdetailspage.module.css';
import { useEffect, useState } from 'react';


export default function ChatDetailsPage({ id }) {
  const [chathist, setChatHist] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetchUserConversations( controller,setChatHist,setFriends,setLoading);
    return ()=>{ controller.abort() }
  }, [])

  return (
    <div className={styles.pageContainer}>
      <AsideCardProvider userChats={chathist} userFriends={friends} loading={loading} />
      <MsgsProvider id={id} />
    </div>
  )
}
