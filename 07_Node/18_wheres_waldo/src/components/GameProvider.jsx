'use client';

import { useState } from "react";
import NextImage from "next/image";
import Clicker from "@/components/Clicker";
import styles from "@/style/game.module.css"

export default function GameProvider({ id, imgSrc, items, }) {
  const [coords, setCoords] = useState(null);

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
    <div
      onClick={addCircle}
      className={styles.gameContainer}
    >
      <NextImage src={imgSrc} alt="image with hidden objects puzzle"
        width={1920} height={1080} priority
        className={styles.gameImg}
      />
      <svg className={styles.clickSvg} preserveAspectRatio="xMidYMid meet">
        {coords && <Clicker x={coords.x} y={coords.y} />}
      </svg>
      {coords &&
        <div className={styles.itemsContainer} 
          style={{ top: `${coords.y}px`, left: `${coords.x + 16}px` }}>
          {items.length > 0 && items.map((icon, iIdx) => {
            return (
              <div key={iIdx} onClick={clickedIcon} className={styles.itemButton}>
                {icon.name}
              </div>)
          })}
        </div>
      }
    </div>
  )
}
