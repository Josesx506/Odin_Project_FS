import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`${styles.page}`}>
      <main className={styles.main}>
        <div>Welcome {process.env.EXPRESS_URL}</div>
        <Link href={"/signup"}>Sign Up User</Link>
        <Link href={"/signup-author"}>Sign Up Author</Link>
        <Link href={"/signin"}>Sign In</Link>
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </main>
      <footer className={styles.footer}>
        <div>This is a footer</div>
      </footer>
    </div>
  );
}
