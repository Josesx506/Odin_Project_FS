import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <div>
            <Image 
              className={styles.logo}
              src="/contacts-book.svg"
              alt="Book logo"
              width={180}
              height={180}
              priority/>
            <div className={styles.loader}></div>
          </div>
          <div>
            <h1>Contacts</h1>
            <h1>Book</h1>
            <div className={styles.secondary}>
              <code>Review of NextJS router</code>
            </div>
          </div>
        </div>

        <div>
          <ol>
              <li>Understand how routes are setup from <code>/app/pages.js</code></li>
              <li>Created custom 404 page with <code>app/not-found.jsx</code> and setup nav/aside in <code>app/layout.js</code></li>
              <li>Nested routes are created as folders/subfolders within the app directory.</li>
              <li>Navigation between pages is implemented using the <code>Link</code> component.</li>
              <li>Dynamic routes are created as subfolders with square brackets e.g.<code>contacts/[id]</code></li>
              <li>
                Dynamic parameters can be extracted using <code>useParams()</code> hook for client components or 
                <code>const param = await params;</code> and <code>const id = param.id;</code> for server components.
              </li>
              <li>Learnt the hard way that server components can&apos;t pull data from client localForage cache.</li>
          </ol>
        </div>
        
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
