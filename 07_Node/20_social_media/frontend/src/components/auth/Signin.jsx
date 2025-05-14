'use client';

import { getGitHubOAuth, getGuestPassword } from "@/utils/getEnvs";
import { ContainedButton } from '@/components/Buttons';
import { FormField } from '@/components/forms/FormField';
import useAuth from '@/hooks/useAuth';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import styles from '@/styles/forms.module.css';
import Form from 'next/form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaGithub } from "react-icons/fa";


export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, reset,
    formState: { errors },
    submitWithSanitization } = useFormValidation();
  const { login, exchangeOTPForToken } = useAuth();
  const [loading, setLoading] = useState(false);


  // Catch redirect url from OAuth login
  useEffect(() => {
    const otp = searchParams.get('otp');

    async function getGithubAccessToken(otp) {
      try {
        setLoading(true);
        await exchangeOTPForToken(otp);
        toast.success('Logged in! Redirecting...')
        router.push('/feed');
      } catch (err) {
        toast.error('Login failed. Please try again.')
        reset()
      } finally {
        setLoading(false);
      }
    }

    if (otp) {
      getGithubAccessToken(otp);
    }
  }, [])

  // Submit the form with fetch request server action
  const onSubmit = async (sanitizedData) => {
    try {
      setLoading(true);
      await login(sanitizedData)
      toast.success('Logged in! Redirecting...')
      router.push('/feed');
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

    const user = { email: "jjjj@odin.com",
      password: await getGuestPassword(),
    };

    try {
      setLoading(true);
      await login(user)
      toast.success('Guest Login! Redirecting...')
      router.push('/feed');
    } catch (err) {
      toast.error('Login failed. Please try again.')
      reset()
    } finally {
      setLoading(false);
    }
  }


  // Github login
  async function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const route = await getGitHubOAuth();
    window.location.assign(route);
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

            <div className={styles.authSubmit}>
              <div style={{textAlign:'center',color:'rgba(0,0,0,.5'}}>---- or ----</div>
              <ContainedButton onClick={onClick} disabled={loading}><FaGithub /> &nbsp; Github login</ContainedButton>
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