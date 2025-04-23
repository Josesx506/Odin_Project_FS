'use client';

import { useState, useEffect } from "react";
import NextImage from "next/image";
import Clicker from "@/components/Clicker";
import styles from "@/style/game.module.css"
import { GameProviderSkeleton } from "./Skeletons";

export default function GameProvider({ id }) {

  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState();
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/game/${id}`, { signal: controller.signal })
      .then((resp) => resp.json())
      .then((data) => {
        setGameData(data.game);
        setLoading(false);
      })
      .catch((err) => toast.error(err.message))

    return () => { controller.abort() };
  }, [id])


  const getClickCoords = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const normX = Number(((x / rect.width) * 100).toFixed(2));
    const normY = Number(((y / rect.height) * 100).toFixed(2));
    return [x, y, normX, normY];
  };

  const addCircle = (event) => {
    const [x, y, normX, normY] = getClickCoords(event);
    setCoords({ x, y, normX, normY });
  };

  async function clickedIcon(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target);
    console.log(id,coords.x,coords.y,coords.normX,coords.normY);
    setCoords(null);
  }

  return (
    loading ? <GameProviderSkeleton /> :
    <div className={styles.gameContainer}>
    <div className={styles.gameTargetsContainer}>
      {gameData.targets.map((icon, iIdx) => {
            return (
              <div key={iIdx+5} className={styles.targetThumbnail}>
                <div className={styles.targetImgContainer}>
                <NextImage src={icon.url} alt="target image thumbail"
                  width={60} height={60} priority
                  className={styles.targetImg}
                />
                </div>
                <div>{icon.name}</div>
              </div>)
          })}
    </div>
    <div onClick={addCircle} className={styles.gameImgContainer} >
      <NextImage src={gameData.url} alt="image with hidden objects puzzle"
        width={gameData.width} height={gameData.height} priority
        className={styles.gameImg}
      />
      <svg className={styles.clickSvg} preserveAspectRatio="xMidYMid meet">
        {coords && <Clicker x={coords.x} y={coords.y} />}
      </svg>
      {coords &&
        <div className={styles.itemsContainer} 
          style={{ top: `${coords.y}px`, left: `${coords.x + 16}px` }}>
          {gameData.targets.map((icon, iIdx) => {
            return (
              <div key={iIdx} onClick={clickedIcon} className={styles.itemButton}>
                {icon.name}
              </div>)
          })}
        </div>
      }
    </div>
    </div>
  )
}
