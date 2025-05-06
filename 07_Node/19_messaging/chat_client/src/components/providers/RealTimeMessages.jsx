'use client'
import { useRef, useEffect } from 'react';
import MessageCard from '@/components/cards/MessageCard';
import styles from '@/styles/providers/realtimemsg.module.css';

export default function RealTimeMessages({ activeUserId, messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.rtmScroller} >
      {messages.map((msg)=>(
        <MessageCard key={msg.id} activeUserId={activeUserId} {...msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
