"use client"

import { useState } from "react";
import App from "./App";
import Game from "./Game";
import styles from "./page.module.css";

export default function Home() {
  const [startGame, setStartGame] = useState(false);
  const [numCards, setNumCards] = useState(0);

  function handleClick(e) {
    e.preventDefault();
    setStartGame(false);
  }


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 >Pokémon Memory Card</h1>
        <div className={styles.instructions}>Avoid clicking on the same card twice</div>
        <div className={styles.reset__game}>
          <button onClick={handleClick}>New Game</button>
        </div>
        {!startGame && <App setStartGame={setStartGame} setNumCards={setNumCards} />}
        {startGame && <Game numCards={numCards} />}
      </main>
      <footer className={styles.footer}>
        <div>Empty Footer</div>
      </footer>
    </div>
  );
}
