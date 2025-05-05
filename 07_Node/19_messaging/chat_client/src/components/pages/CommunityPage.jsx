'use client'

import { fetchCommunityMembers } from '@/effects/requests';
import styles from '@/styles/pages/commpage.module.css';
import { useEffect, useState } from 'react';
import CommunityCardProvider from '../providers/CommunityCardProvider';
import GroupCardProvider from '../providers/GroupCardProvider';


export default function CommunityPage() {
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [memLoading, setMemLoading] = useState(true);
  const [grpLoading, setGrpLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchCommunityMembers(controller,
      setMembers,setGroups,setMemLoading,setGrpLoading
    );

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
