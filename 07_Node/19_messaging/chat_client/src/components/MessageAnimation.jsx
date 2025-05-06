'use client';

import styles from '@/styles/msganim.module.css';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MessageAnimation() {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messageSequence = [
    { id: 1, text: "Hey there! 👋", sent: false },
    { id: 2, text: "Hi! How are you?", sent: true },
    { id: 3, text: "I'm doing great! Just checking out this new chat app.", sent: false },
    { id: 4, text: "It's pretty awesome, right?", sent: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentMessageIndex < messageSequence.length) {
        setMessages((prev) => [...prev, messageSequence[currentMessageIndex]]);
        setCurrentMessageIndex((prev) => prev + 1);
      } else {
        // Reset animation after a delay
        setTimeout(() => {
          setMessages([]);
          setCurrentMessageIndex(0);
        }, 2000);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [currentMessageIndex]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.chatStatus}>
          <div className={styles.statusDot}></div>
          <h3 style={{color:'white'}}>Chat</h3>
        </div>
        <div className={styles.onlineStatus}>Online</div>
      </div>

      <div className={styles.messagesContainer}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={message.sent ? styles.messageWrapperSent : styles.messageWrapperReceived}
            >
              <div className={message.sent ? styles.messageSent : styles.messageReceived}>
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className={styles.chatInput}>
        <input
          type="text"
          className={styles.messageInput}
          placeholder="Type a message..."
          disabled
        />
        <button disabled className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
}