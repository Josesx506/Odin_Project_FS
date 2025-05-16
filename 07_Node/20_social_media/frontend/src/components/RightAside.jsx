import SearchBar from "@/components/forms/SearchBar";
import useBreakpoint from "@/hooks/useBreakpoint";
import styles from '@/styles/rightaside.module.css';
import WhoToFollow from "./cards/WhoToFollow";

export default function RightAside() {
  const isDesktop = useBreakpoint('lg');

  return (
    <>
      {isDesktop &&
        <div className={styles.rightAside}>
          <SearchBar />
          <WhoToFollow />
        </div>}
    </>
  )
}
