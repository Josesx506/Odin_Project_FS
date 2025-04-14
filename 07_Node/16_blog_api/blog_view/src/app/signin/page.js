'use client'

import { signUserInAction } from '@/actions/auth';
import { ContainedButton } from '@/components/Buttons';
import { FormField } from '@/components/FormField';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import styles from '@/styles/forms.module.css';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function SignInPage() {
  const { register, formState: { errors }, 
    submitWithSanitization, reset } = useFormValidation();

  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  // Submit the form with fetch request server action
  const onSubmit = async (sanitizedData) => { 
    try {
      setLoading(true);
      const result = await signUserInAction(sanitizedData);
      console.log(result)
      if (!result.success) {
        toast.error(result.error);
        reset();
      } else {
        toast.success('Logged In! Redirecting...');
        localStorage.setItem('token', result.token);
        // navigate.push('/posts');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Sign In</h3>

      <Form className={styles.authForm}  onSubmit={submitWithSanitization(onSubmit)}>

        <FormField type={'email'} name={'email'} label={'Email'} placeholder={'Enter your email'} 
          register={register} rules={validationRules.email} errors={errors} />
        <FormField type={'password'} name={'password'} label={'Password'}
          placeholder={'Enter your password'} register={register} 
          rules={{ required: 'Password is required' }} errors={errors} />
        
        <div className={styles.authSubmit}>
          <ContainedButton disabled={loading}>Sign In</ContainedButton>
        </div>
      </Form>
      
    </div>
  )
}
