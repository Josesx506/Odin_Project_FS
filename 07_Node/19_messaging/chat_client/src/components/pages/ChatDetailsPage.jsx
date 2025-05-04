'use client'

import { fetchUserConversations } from '@/app/effects/requests';
import AsideCardProvider from '@/components/providers/AsideCardProvider';
import MsgsProvider from '@/components/providers/MsgsProvider';
import styles from '@/styles/pages/chatdetailspage.module.css';
import { useEffect, useState } from 'react';

// import useAuth from '@/hooks/useAuth';
// import { decodeJWT } from '@/utils/common';

export default function ChatDetailsPage({ id }) {
  const [messages, setMessages] = useState([]);
  const [chathist, setChatHist] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  // const { accessToken } = useAuth();
  // const userId = decodeJWT(accessToken).id;

  useEffect(() => {
    const controller = new AbortController();

    fetchUserConversations(
      controller,setChatHist,
      setFriends,setLoading);
    
    return ()=>{ controller.abort() }
  }, [])//id

  return (
    <div className={styles.pageContainer}>
      <AsideCardProvider userChats={chathist} userFriends={friends} loading={loading} />
      <MsgsProvider  />
    </div>
  )
}
