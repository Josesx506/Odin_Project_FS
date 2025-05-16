import Link from 'next/link';
import { MdHomeFilled, MdOutlinePerson, MdOutlineSearch } from "react-icons/md";
import Logo from './Logo';
import styles from '@/styles/navbar.module.css';
import { MdOutlineEmail } from "react-icons/md";
import { Button } from './Buttons';
import LogoutButton from '@/components/buttons/LogoutButton';

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <Logo />
      <div className={styles.linkCntr}>
        <Link className={styles.navLink} href={'#'}><MdHomeFilled /> <span>Home</span></Link>
        <Link className={styles.navLink} href={'#'}><MdOutlineSearch /> <span>Explore</span></Link>
        <Link className={styles.navLink} href={'#'}><MdOutlinePerson /> <span>Profile</span></Link>
        <Link className={styles.navLink} href={'#'}><MdOutlineEmail /> <span>Messages</span></Link>
        <Button style={{fontWeight: 'bold', borderRadius: '2em', padding: '0.5em 3em'}}>Post</Button>
      </div>
      <LogoutButton />
    </div>
  )
}
