'use client'

import { axiosApi } from '@/config/axios';
import { useEffect, useState } from 'react';
import ContactCardProvider from '../providers/ContactCardProvider';
import styles from '@/styles/pages/chatpage.module.css';

// import useAuth from '@/hooks/useAuth';
// import { decodeJWT } from '@/utils/common';

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { accessToken } = useAuth();
  // const userId = decodeJWT(accessToken).id;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUserConversations() {
      axiosApi.get(`/v1/chat/user-chats`, 
        {signal: controller.signal}).then(
          (res)=>{
            setChats(res.data.conversations)
            setFriends(res.data.friends)
          }
        ).catch((err)=>{ console.log(err) })
        .finally(setLoading(false));
      
    }

    fetchUserConversations();

    return ()=>{ controller.abort() }
  }, [])

  return (
    <div className={styles.mainPage}>
      <ContactCardProvider userChats={chats} userFriends={friends} loading={loading} />
    </div>
  )
}
