'use client';
import { useEffect } from "react";
import styles from "./page.module.css";
import { getGitHubRoute } from "@/actions/authSignIn";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  async function onClick() {
    const route = await getGitHubRoute();
    window.location.assign(route);
  }
  
  return (
    <div className={styles.page}>
      <main>
        <div>Welcome to social media</div>
        <button onClick={onClick}>Github login</button>
        </main>
    </div>
  );
}
