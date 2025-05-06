'use client';

import { ContainedButton } from '@/components/Buttons';
import styles from '@/styles/providers/group.module.css';
import { useState } from 'react';
import { BiSolidMessageAdd } from "react-icons/bi";
import GroupCard from '../cards/GroupCard';
import FormModal from '../forms/FormModal';
import { GroupSkeletons } from '@/components/skeletons/CommunitySkeleton';

export default function GroupCardProvider({ groups, loading, handleGroupCreate }) {
  const [openModal, setOpenModal] = useState(false);

  function toggleModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpenModal(!openModal);
  }

  if (loading) {
    return <GroupSkeletons />
  }

  return (
    <div className={styles.scrollContainer}>
      <h3 className={styles.scrollTitle}>Groups</h3>
      <div className={styles.createGroup}>
        <ContainedButton onClick={toggleModal} disabled={loading}>
          Create New Group &nbsp; <BiSolidMessageAdd />
        </ContainedButton>

      </div>
      {groups.length === 0 ? <h4 className={styles.unavailable}>No groups available, create a new group</h4> :
        <div className={styles.scrollMain}>
          {groups.map((group) => (
            <GroupCard key={group.id} {...group} />
          ))}
        </div>
      }
      <FormModal updateState={handleGroupCreate} open={openModal} onClose={toggleModal} />
    </div>
  )
}
