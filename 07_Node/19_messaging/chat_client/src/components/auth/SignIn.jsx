'use client'

import { ContainedButton } from '@/components/Buttons';
import { FormField } from '@/components/forms/FormField';
import useAuth from '@/hooks/useAuth';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import styles from '@/styles/forms.module.css';
import Form from 'next/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function SignIn() {
  // Hooks
  const {
    register, reset,
    formState: { errors },
    submitWithSanitization } = useFormValidation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Submit the form with fetch request server action
  const onSubmit = async (sanitizedData) => {
    try {
      setLoading(true);
      await login(sanitizedData)
      toast.success('Logged in! Redirecting...')
      router.push('/community');
    } catch (err) {
      toast.error('Login failed. Please try again.')
      reset()
    } finally {
      setLoading(false);
    }
  }

  async function guestSignIn(e) {
    e.preventDefault();
    e.stopPropagation();

    const user = { email: "ply1@acodyssey.com",
      password: process.env.NEXT_PUBLIC_GUESTPSWD,
    };

    try {
      setLoading(true);
      await login(user)
      toast.success('Guest Login! Redirecting...')
      router.push('/community');
    } catch (err) {
      toast.error('Login failed. Please try again.')
      reset()
    } finally {
      setLoading(false);
    }
  }



  return (
    <div>
      <div className={styles.authContainer}>
        <div className={styles.authFormContainer}>
          <h3>Sign In</h3>

          <Form className={styles.authForm} onSubmit={submitWithSanitization(onSubmit)}>

            <FormField type={'email'} name={'email'} label={'Email'} placeholder={'Enter your email'}
              register={register} rules={validationRules.email} errors={errors} />
            <FormField type={'password'} name={'password'} label={'Password'}
              placeholder={'Enter your password'} register={register}
              rules={{ required: 'Password is required' }} errors={errors} />

            <div className={styles.authSubmit}>
              <ContainedButton disabled={loading}>Sign In</ContainedButton>
              <ContainedButton onClick={guestSignIn} disabled={loading}>Sign In as Guest</ContainedButton>
            </div>
          </Form>
        </div>
        <div className={styles.authLinksContainer}>
          <div className={styles.authLink}>New Here?  <Link href={'/signup'}>Sign up</Link></div>
        </div>
      </div>

    </div>
  )
}
