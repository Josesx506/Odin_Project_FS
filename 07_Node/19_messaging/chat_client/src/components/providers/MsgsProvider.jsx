'use client';

import MessageNav from '@/components/providers/MessageNav';
import { socket } from '@/config/socket';
import { fetchUserMessages } from '@/effects/requests';
import useAuth from '@/hooks/useAuth';
import styles from '@/styles/providers/messages.module.css';
import { decodeJWT } from '@/utils/common';
import { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import RealTimeMessages from './RealTimeMessages';
import { MsgPrvdrSkeleton } from '@/components/skeletons/ChatSkeleton';

export default function MsgsProvider({ id }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const userId = decodeJWT(accessToken)?.id;

  useEffect(() => {
    const controller = new AbortController();
    // Fetch the initial messages
    fetchUserMessages(id, controller,
      setMessages, setMetadata, setLoading);

    // Realtime connection for new messages
    if (!socket.connected) { //Connect to socket if not already connected
      socket.auth = { token: accessToken };
      socket.connect();
    } else {
      socket.emit('joinConversation', id);
    }

    function onConnect() {
      setIsConnected(true);
      socket.emit('joinConversation', id)
    }

    function onDisconnect() {
      setIsConnected(false);
      socket.emit('leaveConversation', id)
    }

    function onNewMsgEvent(value) {
      setMessages(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newMessage', onNewMsgEvent);

    return () => {
      controller.abort()

      if (socket.connected) {
        socket.emit('leaveConversation', id);
      }
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newMessage', onNewMsgEvent);
    }
  }, [id])

  if (loading) {
    return <MsgPrvdrSkeleton />
  }

  return (
    <div className={styles.msgContainer}>
      <MessageNav id={metadata.otherUserId} name={metadata.convoName}
        image={metadata.image} isGroup={metadata.isGroup} loading={loading} />
      <RealTimeMessages activeUserId={userId} messages={messages} loading={loading} />
      <MessageInput id={id} />
    </div>
  )
}
