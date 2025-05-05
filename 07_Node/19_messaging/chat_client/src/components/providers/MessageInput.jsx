'use client';

import { axiosApi } from '@/config/axios';
import styles from '@/styles/providers/msginput.module.css';
import Form from 'next/form';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { IoIosSend } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import TextareaAutosize from 'react-textarea-autosize';

export default function MessageInput({ id }) {
  const textInputRef = useRef();
  const fileInputRef = useRef(null);
  const submitFormRef = useRef(null);

  function handleIconClick() {
    fileInputRef.current.click();
  };
  function handleSubmitClick() {
    submitFormRef.current.click();
  };

  function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const message = textInputRef.current.value;
    if (message===''||!message) {
      toast.error('Message required');
      return
    }
    
    axiosApi.post(`/v1/chat/conversation/${id}`, 
      JSON.stringify({message}), 
      { headers: { 'Content-Type': 'application/json' },
        withCredentials: true,}
    ).catch((err)=>{
      toast.error(err.message)
    }).finally(()=>{
      textInputRef.current.value = '';
      textInputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    })
  }


  return (
    <Form onSubmit={onSubmit} className={styles.newMsg} >

      <TextareaAutosize className={styles.msgInput} name="msgbody"
        ref={textInputRef} minRows={1} maxRows={4} wrap="soft" />

      <div className={styles.newIcons} >
        <input type="file" style={{ display: 'none' }} ref={fileInputRef} />
        <MdAddPhotoAlternate onClick={handleIconClick} />
      </div>

      <div className={styles.newIcons} >
        <input type='submit' style={{ display: 'none' }} ref={submitFormRef} />
        <IoIosSend onClick={handleSubmitClick} />
      </div>

    </Form>
  )
}
