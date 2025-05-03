import React from 'react';
import { TbMessageCode } from "react-icons/tb";
import Link from 'next/link';
import styles from '@/styles/titlebar.module.css'
import { SiTheodinproject } from "react-icons/si";

export default function TitleBar() {
  return (
    <div className={styles.titleBar}>
      <Link href={'/'} className={`${styles.titleLink} ${styles.logo}`}>
        <TbMessageCode /> ChøChøChø
      </Link>
      <Link href={'https://josesx506.github.io/Odin_Project_FS/'} className={`${styles.titleLink} ${styles.odin}`}>
        <SiTheodinproject />
      </Link>
    </div>
  )
}
