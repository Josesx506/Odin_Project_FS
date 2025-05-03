'use client';

import useAuth from '@/hooks/useAuth';
import styles from '@/styles/navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiWorld } from "react-icons/bi";
import {
  MdChat, MdHomeFilled, MdLogin,
  MdLogout, MdManageAccounts, MdOutlineAddToQueue
} from 'react-icons/md';

export default function Navbar() {
  const { accessToken, logout } = useAuth();

  const pathname = usePathname();

  const onSignout = async () => {
    await logout();
  }

  return (
    <nav className={styles.sidebar}>
      <ul>
        <li className={`${styles.navlistItem} ${pathname === '/' ? styles.active : ''}`}>
          <Link className={styles.navLink} href={"/"}>
            <MdHomeFilled />
            <span>Home</span>
          </Link>
        </li>
        <li className={`${styles.navlistItem} ${pathname === '/chat' ? styles.active : ''}`}>
          <Link className={styles.navLink} href={"/chat"}>
            <MdChat />
            <span>Chats</span>
          </Link>
        </li>
        <li className={`${styles.navlistItem} ${pathname === '/community' ? styles.active : ''}`}>
          <Link className={styles.navLink} href={"/community"}>
            <BiWorld />
            <span>Community</span>
          </Link>
        </li>
        {!accessToken ? (
          <>
            <li className={`${styles.navlistItem} ${pathname === '/signup' ? styles.active : ''}`}>
              <Link className={styles.navLink} href={"/signup"}>
                <MdOutlineAddToQueue />
                <span>Sign Up</span>
              </Link>
            </li>
            <li className={`${styles.navlistItem} ${pathname === '/signin' ? styles.active : ''}`}>
              <Link className={styles.navLink} href={"/signin"}>
                <MdLogin />
                <span>Sign In</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className={`${styles.navlistItem} ${pathname === '/profile' ? styles.active : ''}`}>
              <Link className={styles.navLink} href={"/profile"}>
                <MdManageAccounts />
                <span>Profile</span>
              </Link>
            </li>
            <li className={styles.navlistItem}>
              <Link onClick={onSignout} className={styles.navLink} href={"#"}>
                <MdLogout />
                <span>Signout</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}