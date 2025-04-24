import styles from "./page.module.css";
import Link from "next/link";
import LandingPage from "@/components/HomePage";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Hidden Phøtø Tag</h2>
        <LandingPage />
        <div style={{display:'flex', gap:"1em"}}>
          <Link style={{textDecoration:'underline'}} href={'./addImage'}>Add Image</Link>
          <Link style={{textDecoration:'underline'}} href={'./game'}>Play Game</Link>
          <Link style={{textDecoration:'underline'}} href={'./leaderboard'}>Leader Board</Link>
        </div>
      </main>
    </div>
  );
}
