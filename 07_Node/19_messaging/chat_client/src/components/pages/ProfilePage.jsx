'use client';

import { ContainedButton } from '@/components/Buttons';
import { FormField } from '@/components/forms/FormField';
import { axiosApi } from '@/config/axios';
import { fetchUserProfile } from '@/effects/requests';
import useAuth from '@/hooks/useAuth';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import styles from '@/styles/pages/profile.module.css';
import { decodeJWT } from '@/utils/common';
import Form from 'next/form';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';

export default function ProfilePage() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useFormValidation();
  const { accessToken } = useAuth();
  const userId = decodeJWT(accessToken)?.id;

  useEffect(() => {
    const controller = new AbortController();

    fetchUserProfile(controller, setUserData, setLoading);
    
  }, []);

  async function onSubmit(data) {
    const controller = new AbortController();
    const old = userData.user;
    if (data.name === old.name && data.email == old.email 
      && data.image === old.image && data.bio === old.bio) {
      toast.error('No edits detected');
      return
    }
    setLoading(true);

    data.id = userId;
    try {
      const resp = await axiosApi.post("/v1/chat/update-user-profile",
        JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        signal: controller.signal
      }
      )
      toast.success(resp.data.message);
      // Udate the user data
      setUserData({
        user: {
          name: data.name, bio: data.bio,
          email: data.email, image: data.image
        }
      })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  
  if (loading) {
    return <ProfileSkeleton />
  }

  return (
    <div className={styles.profileCntr}>
      <div className={styles.profileImg}>
        <Image 
          src={userData.user.image || `https://robohash.org/${userId}.png`}
          width={120} height={120} alt={`${userData.user.name} avatar`} />
      </div>
      <Form className={styles.profileForm} onSubmit={handleSubmit(onSubmit)}>
        <FormField name={'name'} label={'Name'} placeholder={'First and Last Name'}
          register={register} rules={validationRules.name} errors={errors} defaultValue={userData.user.name} />
        <FormField type={'email'} name={'email'} label={'Email'} placeholder={'Update your email'}
          register={register} rules={validationRules.email} errors={errors} defaultValue={userData.user.email} />
        <FormField type={'url'} name={'image'} label={'Profile Image url'} placeholder={'https://example.com'}
          register={register} rules={validationRules.url} errors={errors} defaultValue={userData.user.image} />
        <FormField type={'textarea'} name={'bio'} label={'Bio'} placeholder={'I like to ....'} rows={2}
          register={register} rules={validationRules.bio} errors={errors} defaultValue={userData.user.bio} />

        <div className={styles.updateProfile}>
          <ContainedButton disabled={loading}>Update Profile</ContainedButton>
        </div>
      </Form>
    </div>
  )
}
