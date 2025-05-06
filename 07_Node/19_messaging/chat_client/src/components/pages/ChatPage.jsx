'use client'

import { fetchUserConversations } from '@/effects/requests';
import ChatsProvider from '@/components/providers/ChatsProvider';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    
    fetchUserConversations(controller,
      setChats,setFriends,setLoading);

    return ()=>{ controller.abort() }
  }, [])

  return (
    <div>
      <ChatsProvider userChats={chats} userFriends={friends} loading={loading} />
    </div>
  )
}
