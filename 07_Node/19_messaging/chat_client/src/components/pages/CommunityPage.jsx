'use client'

import { axiosApi } from '@/config/axios';
import { useEffect, useState } from 'react';
import CommunityCardProvider from '../providers/CommunityCardProvider';
import GroupCardProvider from '../providers/GroupCardProvider';
import styles from '@/styles/pages/commpage.module.css';

// import useAuth from '@/hooks/useAuth';
// import { decodeJWT } from '@/utils/common';

export default function CommunityPage() {
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [memLoading, setMemLoading] = useState(true);
  const [grpLoading, setGrpLoading] = useState(true);
  // const { accessToken } = useAuth();
  // const userId = decodeJWT(accessToken).id;

  useEffect(() => {
    const controller = new AbortController();

    // Fetch the data in parallel
    async function fetchCommunityMembers() {
      axiosApi.get(`/v1/chat/community`, 
        {signal: controller.signal}).then(
          (res)=>(setMembers(res.data))
        ).catch((err)=>{ console.log(err) })
        .finally(setMemLoading(false));
      
      axiosApi.get(`/v1/chat/groups`, 
        {signal: controller.signal}).then(
          (res)=>(setGroups(res.data))
        ).catch((err)=>{ console.log(err) })
        .finally(setGrpLoading(false));
    }

    fetchCommunityMembers();

    return ()=>{ controller.abort() }
  }, [])

  function handleGroupCreate(newGroup) {
    setGroups(prevGroups => ([...prevGroups, newGroup]))
  }

  return (
    <div className={styles.mainPage}>
      <CommunityCardProvider users={members} loading={memLoading} />
      <GroupCardProvider groups={groups} loading={grpLoading} handleGroupCreate={handleGroupCreate} />
    </div>
  )
}
