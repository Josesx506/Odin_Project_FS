import Form from 'next/form';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';
import { IoIosSend } from "react-icons/io";
import { ImSpinner3 } from "react-icons/im";
import { MdAddPhotoAlternate } from "react-icons/md";
import TextareaAutosize from 'react-textarea-autosize';
import styles from '@/styles/forms/newpost.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function NewPost() {
  const textInputRef = useRef();
  const fileInputRef = useRef(null);
  const submitFormRef = useRef(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);
  const { userDetails } = useAuth();
  const maxLength = 300;

  function handleIconClick() {
    fileInputRef.current.click();
  };

  function handleSubmitClick() {
    submitFormRef.current.click();
  };
  function handleFileChange(e) {
    setFile(e.target.files[0])
  }

  function handleTextChange(e) {
    e.stopPropagation();
    setText(e.target.value);
  }

  function characterCountClassName() {
    if (text.length >= maxLength) {
      return `${styles.characterCount} ${styles.error}`;
    } else if (text.length >= maxLength * 0.8) {
      return `${styles.characterCount} ${styles.warning}`;
    } else {
      return styles.characterCount;
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    toast.error('You never implement posting')
  }
  
  return (
    <div className={styles.postCntr}>
      <Link href={`/${userDetails.id}`} className={styles.avatarCntr}>
        <Image src={userDetails.gravatar || `https://robohash.org/${userDetails.id}.png`} 
            width={40} height={40} alt={`${userDetails.username} profile photo`} priority />
      </Link>
      <Form onSubmit={onSubmit} className={styles.newPost} >
        <div className={styles.textCounter}>
          <TextareaAutosize className={styles.postInput} name="newpost" onChange={handleTextChange}
            ref={textInputRef} minRows={3} maxRows={6} maxLength={maxLength} wrap="soft" />
          <div className={characterCountClassName()}>
            {text.length}/{maxLength}
          </div>
        </div>

        <div className={styles.actionBtns}>
          <div className={styles.attachments}>
            <div className={styles.newIcons} >
              <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
              <MdAddPhotoAlternate onClick={handleIconClick} />
            </div>
          </div>
          <div className={styles.submitBtn} disabled={processing} onClick={!processing ? handleSubmitClick : undefined} >
            <input type='submit' style={{ display: 'none' }} ref={submitFormRef} /> Post
            {processing ? <ImSpinner3 className={styles.spinner} /> : <IoIosSend />}
          </div>
        </div>
      </Form>
    </div>
  )
}
