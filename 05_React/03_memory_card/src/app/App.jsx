"use client"

import React, { useState } from 'react'
import "@/styles/App.css"

export default function App({setStartGame, setNumCards}) {
    // const [difficulty, setDifficulty] = useState("Easy");

    function handleClick(e) {
        e.preventDefault();
        setNumCards(e.target.getAttribute("data-key"));
        setStartGame(true);
    }

    return (
        <div className="app-difficulty">
            <button key="easy" data-key="6" onClick={handleClick}>Easy</button>
            <button key="medium" data-key="12" onClick={handleClick}>Medium</button>
            <button key="hard" data-key="18" onClick={handleClick}>Hard</button>
        </div>
    )
}
