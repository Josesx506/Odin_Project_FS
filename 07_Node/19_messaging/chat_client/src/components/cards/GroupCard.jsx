'use client';

import React, { useState } from 'react'
import { MdGroups } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import styles from '@/styles/cards/groupcard.module.css';
import { axiosApi } from '@/config/axios';
import toast from 'react-hot-toast';

export default function GroupCard({ id, convoName, size }) {
  // id is the conversationId
  const [grpSize, setGrpSize] = useState(size);

  async function joinGroup(e) {
    e.preventDefault();
    e.stopPropagation();

    try{
      const resp = await axiosApi.get(`/v1/chat/join-group/${id}`)
      setGrpSize(resp.data?.grpSize);
      toast.success('Request Approved')
    } catch(err) {
      toast.error(err.message || 'Request failed')
    }
  }
  
  return (
    <div className={styles.gcardCntr}>
      <div className={styles.gcardIcon}>
        <MdGroups height={'100%'} />
      </div>
      <div className={styles.gcardBody}>
        <h4>{convoName}</h4>
        <div className={styles.gcardDetails}>
          <div>{grpSize} Member{grpSize>1 ?'s':''}</div>
          <IoPersonAdd onClick={joinGroup} />
        </div>
      </div>
    </div>
  )
}
