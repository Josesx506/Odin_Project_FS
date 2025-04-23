import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Welcome to Wheres Waldo
        <div style={{display:'flex', gap:"1em"}}>
          <Link style={{textDecoration:'underline'}} href={'./addImage'}>Add Image</Link>
          <Link style={{textDecoration:'underline'}} href={'./game'}>Play Game</Link>
          <Link style={{textDecoration:'underline'}} href={'./leaderboard'}>Leader Board</Link>
        </div>
      </main>
    </div>
  );
}
