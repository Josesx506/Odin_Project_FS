import styles from '@/styles/providers/chat.module.css';
import AsideCardProvider from './AsideCardProvider';

export default function ChatsProvider({ userChats, userFriends, loading }) {

  return (
    <div className={styles.pageContainer}>
      <AsideCardProvider userChats={userChats} userFriends={userFriends} loading={loading} />
      <div className={styles.pageDetails}>
      </div>
    </div>
  )
}
