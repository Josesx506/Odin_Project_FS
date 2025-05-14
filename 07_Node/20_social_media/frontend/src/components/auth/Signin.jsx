'use client';

import { getGitHubOAuth } from "@/actions/authSignIn";
import useAuth from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, exchangeOTPForToken } = useAuth();
  const [loading, setLoading] = useState(false);

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
    } else {
      console.log('github skipped')
    }
  }, [])


  
  async function onClick() {
    const route = await getGitHubOAuth();
    window.location.assign(route);
  }

  return (
    <div>
      <button onClick={onClick}>Github login</button>

    </div>
  )
}
