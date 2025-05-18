import LogoutButton from '@/components/buttons/LogoutButton';
import useAuth from '@/hooks/useAuth';
import useBreakpoint from "@/hooks/useBreakpoint";
import styles from '@/styles/navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdHomeFilled, MdLogout, MdOutlineEmail, MdOutlinePerson, MdOutlineSearch } from "react-icons/md";
import { Button } from './Buttons';
import Logo from './Logo';

export default function NavBar() {
  const { userDetails, logout } = useAuth();

  const isTablet = useBreakpoint('md');
  const pathname = usePathname();

  const profileRoute = `/${userDetails.id}`;

  const onSignout = async () => {
    await logout();
  }

  return (
    <>
      {isTablet ?
        <div className={styles.navbar}>
          <Logo />
          <div className={styles.linkCntr}>
            <Link className={`${styles.navLink} ${pathname === '/home' ? styles.active : ''}`} href={'/home'}>
              <MdHomeFilled /> <span>Home</span>
            </Link>
            <Link className={`${styles.navLink} ${pathname === '/explore' ? styles.active : ''}`} href={'/explore'}>
              <MdOutlineSearch /> <span>Explore</span>
            </Link>
            <Link className={`${styles.navLink} ${pathname === profileRoute ? styles.active : ''}`} href={profileRoute}>
              <MdOutlinePerson /> <span>Profile</span></Link>
            <Link className={`${styles.navLink} ${pathname === '/messages' ? styles.active : ''}`} href={'#'}>
              <MdOutlineEmail /> <span>Messages</span>
            </Link>
            <Button style={{ fontWeight: 'bold', borderRadius: '2em', padding: '0.5em 3em' }}>Post</Button>
          </div>
          <LogoutButton />
        </div> :
        <div className={styles.mobileNav}>
          <Link className={`${styles.mobNavLink} ${pathname === '/home' ? styles.active : ''}`} href={'/home'}>
            <MdHomeFilled />
          </Link>
          <Link className={`${styles.mobNavLink} ${pathname === '/explore' ? styles.active : ''}`} href={'/explore'}>
            <MdOutlineSearch />
          </Link>
          <Link className={`${styles.mobNavLink} ${pathname === profileRoute ? styles.active : ''}`} href={profileRoute}>
            <MdOutlinePerson />
          </Link>
          <Link className={`${styles.mobNavLink} ${pathname === '/messages' ? styles.active : ''}`} href={'#'}>
            <MdOutlineEmail />
          </Link>
          <Link className={styles.mobNavLink} href={'#'} onClick={onSignout}>
            <MdLogout />
          </Link>
        </div>
      }
    </>
  )
}
