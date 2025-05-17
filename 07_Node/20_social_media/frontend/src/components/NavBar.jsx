import Link from 'next/link';
import useBreakpoint from "@/hooks/useBreakpoint";
import { MdHomeFilled, MdOutlinePerson, MdOutlineSearch } from "react-icons/md";
import Logo from './Logo';
import styles from '@/styles/navbar.module.css';
import { MdOutlineEmail } from "react-icons/md";
import { Button } from './Buttons';
import LogoutButton from '@/components/buttons/LogoutButton';
import useAuth from '@/hooks/useAuth';

export default function NavBar() {
  const { userDetails, logout } = useAuth();
  const profileRoute = `/${userDetails.id}`
  const isTablet = useBreakpoint('md');

  return (
    <>
      {isTablet ?
        <div className={styles.navbar}>
          <Logo />
          <div className={styles.linkCntr}>
            <Link className={styles.navLink} href={'/home'}><MdHomeFilled /> <span>Home</span></Link>
            <Link className={styles.navLink} href={'/explore'}><MdOutlineSearch /> <span>Explore</span></Link>
            <Link className={styles.navLink} href={profileRoute}><MdOutlinePerson /> <span>Profile</span></Link>
            <Link className={styles.navLink} href={'#'}><MdOutlineEmail /> <span>Messages</span></Link>
            <Button style={{ fontWeight: 'bold', borderRadius: '2em', padding: '0.5em 3em' }}>Post</Button>
          </div>
          <LogoutButton />
        </div> :
        <div className={styles.mobileNav}>Small navbar</div>
      }
    </>
  )
}
