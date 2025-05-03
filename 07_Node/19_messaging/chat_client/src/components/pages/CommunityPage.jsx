'use client'
import { axiosApi } from '@/config/axios';
import useAuth from '@/hooks/useAuth';
import { decodeJWT } from '@/utils/common';
import { useEffect, useState } from 'react';
import CommunityCardProvider from '../providers/CommunityCardProvider';

export default function CommunityPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const userId = decodeJWT(accessToken).id;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCommunityMembers() {
      try {
        const res = await axiosApi.get(`/v1/chat/community`, 
            {signal: controller.signal})
        setMembers(res.data);
      } catch(err) {
        if (err.response?.status === 404) {
          setError('not-found');
        } else {
          setError('other-error');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCommunityMembers();

    return ()=>{ controller.abort() }
  }, [])

  return (
    <div>
      <CommunityCardProvider userId={userId} users={members} loading={loading} />
    </div>
  )
}
