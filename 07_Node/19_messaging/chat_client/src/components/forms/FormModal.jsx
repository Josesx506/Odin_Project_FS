'use client';

import { ContainedButton } from '@/components/Buttons';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import styles from '@/styles/modal.module.css';
import Form from 'next/form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormField } from './FormField';
import { IoClose } from "react-icons/io5";
import { axiosApi } from '@/config/axios';

export default function FormModal({ updateState, onClose, open = false }) {
  const {
    register, reset,
    formState: { errors },
    submitWithSanitization } = useFormValidation();
  const [loading, setLoading] = useState(false);
  

  const onSubmit = async (sanitizedData) => {
    try {
      setLoading(true);
      const resp = await axiosApi.post("/v1/chat/create-group",
        JSON.stringify(sanitizedData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      updateState(resp.data)
      toast.success('Group Created');
      onClose()
    } catch (err) {
      toast.error(`${err.response.data?.message}` || 'Bad Request')
    } finally {
      reset()
      setLoading(false);
    }
  }

  return (
    <dialog className={styles.modal} open={open}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader} >
          <IoClose onClick={() => {onClose()}} color='red' />
        </div>
        <Form className={styles.modalForm} onSubmit={submitWithSanitization(onSubmit)}>
          <FormField type={'text'} name={'groupname'} label={''} placeholder={'Enter group name'}
            register={register} rules={validationRules.groupName} errors={errors} />
          <div style={{ justifySelf: 'end' }}>
            <ContainedButton disabled={loading}>Create</ContainedButton>
          </div>
        </Form>
      </div>
    </dialog>
  )
}
