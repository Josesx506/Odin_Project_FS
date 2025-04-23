'use client';

import GameThumbnail from '@/components/GameThumbnail';
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { GameThumbnailSkeleton } from '@/components/Skeletons';

const containerStyle = {
  display: 'flex',
  gap: '0.8em',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-start',
}

export default function LandingPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/game', { signal: controller.signal })
      .then((resp) => resp.json())
      .then((data) => {
        setGames(data.imgs);
        setLoading(false);
      })
      .catch((err) => toast.error(err.message))

    return () => { controller.abort() };
  }, [])

  return (
    <div style={containerStyle}>
      {loading ? GameThumbnailSkeleton({cards:3}) :
        games.map((game) => {
          console.log(game._id,game.url)
          return <GameThumbnail key={game._id} title={game.title} imgSrc={game.url} link={`/game/${game._id}`} />
        })}
    </div>
  )
}
