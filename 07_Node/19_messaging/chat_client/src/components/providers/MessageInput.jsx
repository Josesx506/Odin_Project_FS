'use client';

import { axiosApi } from '@/config/axios';
import { supabaseBucket, supabaseClient } from "@/config/supabase";
import styles from '@/styles/providers/msginput.module.css';
import Form from 'next/form';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosSend } from "react-icons/io";
import { ImSpinner3 } from "react-icons/im";
import { MdAddPhotoAlternate } from "react-icons/md";
import TextareaAutosize from 'react-textarea-autosize';

export default function MessageInput({ id }) {
  const textInputRef = useRef();
  const fileInputRef = useRef(null);
  const submitFormRef = useRef(null);
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  function handleIconClick() {
    fileInputRef.current.click();
  };
  function handleSubmitClick() {
    submitFormRef.current.click();
  };
  function handleFileChange(e) {
    setFile(e.target.files[0])
  }

  async function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setProcessing(true);
    
    try {
      const message = textInputRef.current.value;
      if ((message === '' || !message) && !file) {
        toast.error('Message or image required');
        return
      }

      // Define empty value for uploads
      let uploadurl;

      if (file) { //  Upload the file to supabase if a file is included
        const fileExt = file.name.split(".").pop();
        const cleanName = file.name.replace(`.${fileExt}`, '');
        const filePath = `${cleanName}-${crypto.randomUUID()}.${fileExt}`;

        let { data, error } = await supabaseClient.storage.from(supabaseBucket).upload(filePath, file);

        if (error) {
          throw error;
        }
        toast.success("File uploaded successfully")

        const { data: url } = await supabaseClient.storage.from(supabaseBucket).getPublicUrl(filePath);
        uploadurl = url.publicUrl;
      }


      const publish = await axiosApi.post(`/v1/chat/conversation/${id}`,
        JSON.stringify({ message, uploadurl }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
    } catch (err) {
      toast.error(err.message)
    } finally {
      setFile(null);
      setProcessing(false);
      textInputRef.current.value = '';
      textInputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }


  return (
    <Form onSubmit={onSubmit} className={styles.newMsg} >

      <TextareaAutosize className={styles.msgInput} name="msgbody"
        ref={textInputRef} minRows={1} maxRows={4} wrap="soft" />

      <div className={styles.newIcons} >
        <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
        <MdAddPhotoAlternate onClick={handleIconClick} />
      </div>

      <div className={styles.newIcons} disabled={processing} onClick={!processing ? handleSubmitClick : undefined} >
        <input type='submit' style={{ display: 'none' }} ref={submitFormRef} />
        {processing ? <ImSpinner3 className={styles.spinner} /> : <IoIosSend />}
      </div>

    </Form>
  )
}
