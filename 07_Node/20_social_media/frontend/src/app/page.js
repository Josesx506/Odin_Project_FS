'use client';
import { useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Home() {
  const router = useRouter();


  
  return (
    <div className={styles.page}>
      <main>
        <div>Welcome to social media</div>
        <button><Link href={'/signin'}>Sign In</Link></button>
        </main>
    </div>
  );
}
