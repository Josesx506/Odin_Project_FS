'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import { LeaderBoardProviderSkeleton } from '../Skeletons';

export default function LeaderBoardProvider({ id }) {

  const [loading, setLoading] = useState(true);
  const [boardData, setBoardData] = useState();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/leaderboard/${id}`, { signal: controller.signal })
      .then((resp) => resp.json())
      .then((data) => {
        setBoardData(data.board);
        setLoading(false);
        // if (data.status === 'success') {
        // }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          toast.error(err.message);
        }
      })

    return () => { controller.abort() };
  }, [id])

  return (
    loading ? <LeaderBoardProviderSkeleton /> :
    <div style={{width:'95%', margin: '0 auto'}}>
      {boardData ?
        "Heres the data" :
        <h3 style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh'}}>
          No leaderboard data available for this id
        </h3>
      }
    </div>
  )
}
