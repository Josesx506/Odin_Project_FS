'use client'

import { registerUserAction } from '@/actions/auth';
import { ContainedButton } from '@/components/Buttons';
import { FormField } from '@/components/FormField';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import styles from '@/styles/forms.module.css';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Register() {
  const { 
    register, 
    formState: { errors }, 
    watch, reset, 
    submitWithSanitization } = useFormValidation();

  const password = watch("password");
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  // Submit the form with fetch request server action
  const onSubmit = async (sanitizedData) => { 
    try {
      setLoading(true);
      const result = await registerUserAction(sanitizedData);
      if (!result.success) {
        toast.error(result.error);
        reset ();
      } else {
        toast.success('User registered! Redirecting...');
        navigate.push('/signin');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Register</h3>

      <Form className={styles.authForm}  onSubmit={submitWithSanitization(onSubmit)}>

        <FormField name={'username'} label={'Username'} placeholder={'Enter Username'} 
          register={register} rules={validationRules.username} errors={errors} />
        <FormField type={'email'} name={'email'} label={'Email'} placeholder={'Enter Email'} 
          register={register} rules={validationRules.email} errors={errors} />
        <FormField type={'password'} name={'password'} label={'Password'}
          placeholder={'Enter Password'} register={register} rules={validationRules.password} 
          errors={errors} />
        <FormField type={'password'} name={'confirmPassword'} label={'Confirm Password'} 
          placeholder={'Re-enter Password'}  errors={errors}
          register={register} rules={{
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          }} />
        
        <div className={styles.authSubmit}>
          <ContainedButton disabled={loading}>Sign Up</ContainedButton>
        </div>
      </Form>
      
    </div>
  )
}
