'use client';

import React, { useState } from 'react'
import styles from '@/styles/navbar.module.css';
import Link from 'next/link';
import { MdHomeFilled, MdManageAccounts, MdChat, MdLogin, MdLogout } from 'react-icons/md';
import { BiWorld } from "react-icons/bi";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Navigation items with their paths
  const navItems = [
    { icon: <MdHomeFilled />, text: 'Home', path: '/' },
    { icon: <MdManageAccounts />, text: 'Profile', path: '/#' },
    { icon: <BiWorld />, text: 'Global', path: '/#' },
    { icon: <MdChat />, text: 'Chats', path: '/#' },
    { icon: <MdLogin />, text: 'Sign In', path: '/#' },
    { icon: <MdLogout />, text: 'Signout', path: '/#' }
  ];

  return (
    <nav className={styles.sidebar}>
      <ul>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`${styles.navlistItem} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <Link className={styles.navLink} href={item.path}>
              {item.icon}
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}