import styles from "./page.module.css";
import Hidden from "@/images/Hidden_People.jpg"

import GameProvider from "@/components/GameProvider";

export default function Home() {

  let items = [{ 'name': "Waldo" }, { 'name': 'Wally' }];
  const url = "https://res.cloudinary.com/dwb3wrscb/image/upload/v1745279687/hidden_pictures_t56hlf.png"

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameProvider id={1} imgSrc={url} items={items} />
      </main>
    </div>
  );
}
