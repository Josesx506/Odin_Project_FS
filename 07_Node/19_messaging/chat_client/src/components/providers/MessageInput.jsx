'use client';

import styles from '@/styles/providers/msginput.module.css';
import Form from 'next/form';
import { useRef } from 'react';
import { IoIosSend } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import TextareaAutosize from 'react-textarea-autosize';

export default function MessageInput({ id }) {
  const textInputRef = useRef();
  const fileInputRef = useRef(null);
  const submitFormRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const handleSubmitClick = () => {
    submitFormRef.current.click();
  };
  
  return (
    <Form className={styles.newMsg} >

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
