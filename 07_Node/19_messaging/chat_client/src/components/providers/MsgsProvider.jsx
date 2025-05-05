'use client'
import React, { useState, useEffect } from 'react'
import styles from '@/styles/providers/messages.module.css';
import MessageInput from './MessageInput';
import MessageNav from '@/components/providers/MessageNav';
import { fetchUserMessages } from '@/effects/requests';
import useAuth from '@/hooks/useAuth';
import { decodeJWT } from '@/utils/common';

export default function MsgsProvider( { id } ) {
  const [messages, setMessages] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const userId = decodeJWT(accessToken)?.id;

  useEffect(() => {
    const controller = new AbortController();
    fetchUserMessages(id, controller, setMessages, setMetadata, setLoading);
    return () => { controller.abort() }
  }, [id])

  if (loading) {
    return <div>...loading</div>
  }

  return (
    <div className={styles.msgContainer}>
      <MessageNav id={metadata.otherUserId} name={metadata.convoName}
        image={metadata.image} isGroup={metadata.isGroup} loading={loading}  />
      <div>Message 1</div>
      <MessageInput />
    </div>
  )
}
