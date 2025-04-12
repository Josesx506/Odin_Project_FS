import Image from "next/image";
import styles from "./page.module.css";
import { blogPosts } from "@/components/data";
import BlogThumbnail from "@/components/Blog";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {blogPosts.length===0 ? 
         <div>No postst available, write a new post</div> :
         blogPosts.map((blog)=>{
          return <BlogThumbnail key={blog.id} {...blog} />
        })
        }
      </main>
      <footer className={styles.footer}>
        <div>This is the footer</div>
      </footer>
    </div>
  );
}
