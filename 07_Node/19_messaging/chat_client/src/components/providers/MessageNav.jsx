import styles from '@/styles/providers/msgnav.module.css';
import { IoCaretBackOutline } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import Image from 'next/image';
import Link from 'next/link';

export default function MessageNav({ id, name, image, isGroup, loading }) {

  if (loading) {
    return  <div>...loading</div>
  }

  const img = isGroup ?
    <MdGroups height={'100%'} /> :
    <Image className={styles.msgNavImg}
      src={image || `https://robohash.org/${id}.png`}
      width={40} height={40} alt={`${name} avatar`} />
    

  return (
    <div className={styles.msgNavContainer}>
      <Link className={styles.msgNavBack} href={'/chat'}>
        <IoCaretBackOutline height={'100%'} />
      </Link>
      <div className={styles.msgNavNameBar}>
        <div className={styles.msgNavIcon}>{img}</div>
        <h4 className={styles.msgNavName}>{name}</h4>
      </div>
    </div>
  )
}
