import { Button } from '@/components/Buttons';
import MessageAnimation from '@/components/MessageAnimation';
import styles from '@/styles/pages/home.module.css';
import Link from 'next/link';
import { TbBrandNextjs } from "react-icons/tb";
import { SiExpress, SiSocketdotio } from "react-icons/si";
import { SlSocialGithub } from "react-icons/sl";

export default function HomePage() {
  return (
    <div className={styles.homeCntr} >
      <div className={styles.textCntr}>
        <h1 className="heading">
          Connect <span style={{color:'#737373'}}>Instantly</span>
        </h1>
        <p className={styles.description}>
          A lightweight, real-time, chat application built for seamless communication.
        </p>
        <p className={styles.description}>
          Built with <TbBrandNextjs style={{width:'1.7em', height:'1.7em'}} />extJS, <SiExpress />press, and Socket.i<SiSocketdotio style={{width:'0.7em', height:'0.7em'}} />
        </p>
        <div className={styles.buttonGroup}>
          <Button >
            <Link href={'/community'}>Get Started</Link>
          </Button>
          <Button variant="outline">
            <Link className={styles.githubLink} href={'https://github.com/Josesx506/Odin_Project_FS/tree/main/07_Node/19_messaging'}>
              <SlSocialGithub /> <span>View on Github</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className={styles.demoContainer}>
        <MessageAnimation />
      </div>
    </div>
  )
}
