'use client';

import { gameMoveAction } from "@/app/actions/playGame";
import Clicker from "@/components/Clicker";
import styles from "@/style/game.module.css";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { GameProviderSkeleton } from "../Skeletons";

export default function GameProvider({ id }) {

  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState();
  const [coords, setCoords] = useState(null);
  const [foundTargets, setFoundTargets] = useState(new Set());
  const [foundBBoxes, setFoundBBoxes] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/game/${id}`, { signal: controller.signal })
      .then((resp) => resp.json())
      .then((data) => {
        setGameData(data.game);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          toast.error(err.message);
        }
      })

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

  async function activeClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const targetName = e.target.textContent;
    console.log(coords.normX, coords.normY);
    try {
      const resp = await gameMoveAction(id, targetName, coords.normX, coords.normY);
      if (resp.status === 'success') {
        toast.success(resp.message)
        setFoundTargets((prev) => new Set(prev).add(targetName));
        const foundBbox = resp.boundingBox;
        foundBbox.id = crypto.randomUUID();
        setFoundBBoxes((prev) => [...prev, foundBbox])
      }
      else { toast.error(resp.message) };
    }
    catch (err) { toast.error(resp.message) }
    finally { setCoords(null) }
  }

  async function disabledClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setCoords(null);
  }

  return (
    loading ? <GameProviderSkeleton /> :
      <div className={styles.gameContainer}>
        <div className={styles.gameTargetsContainer}>

          {/* Target Thumbnail Icons */}
          {gameData.targets.map((icon, iIdx) => {
            const found = foundTargets.has(icon.name);
            return (
              <div key={iIdx + 5} className={styles.targetThumbnail}>
                <div className={`${styles.targetImgContainer} ${found ? styles.completedThumb : ''}`}>
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

          {foundBBoxes.length>0 && 
           foundBBoxes.map((box) => (
            <div key={box.id} className={styles.boundingBox} 
              style={{top:`${box.top}%`,left:`${box.left}%`,width:`${box.width}%`,height:`${box.height}%`}}></div>
           ))
          }

          {coords &&
            <div className={styles.itemsContainer}
              style={{ top: `${coords.y}px`, left: `${coords.x + 16}px` }}>
              {/* Target Clickable icons */}
              {gameData.targets.map((icon, iIdx) => {
                const found = foundTargets.has(icon.name);
                return (
                  <div key={iIdx} onClick={found ? disabledClick : activeClick}
                    className={`${styles.itemButton} ${found ? styles.completed : ''}`}>
                    {icon.name}
                  </div>)
              })}
            </div>
          }
        </div>
      </div>
  )
}
