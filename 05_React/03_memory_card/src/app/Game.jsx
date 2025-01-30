"use client"

import React, { useState, useEffect } from 'react'
import Card from '@/components/Card';
import "@/styles/Game.css"
import Win from '@/components/Win';

/**
 * Fisher-Yates shuffling algorithm 
 * https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
 * @param {*} array 
 * @returns 
 */
function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return (array);
}

export default function Game({ numCards}) {

    const [pokeData, setPokeData] = useState([]);
    const [clickedPokemon, setClickedPokemon] = useState([]);
    const [currScore, setCurrScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [endGame, setEndGame] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        // Randomize the offset to retrieve pokemon
        const totalPokemon = 500; 
        const maxOffset = totalPokemon - numCards; 
        const randomOffset = Math.floor(Math.random() * maxOffset);

        const url = `https://pokeapi.co/api/v2/pokemon?limit=${numCards}&offset=${randomOffset}`;
        
        const fetchPokemon = async () => {
            try {
                const res = await fetch(url, { signal: controller.signal });
                const data = await res.json();

                // Fetch image URLs for each Pokémon
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const pokeRes = await fetch(pokemon.url);
                        const pokeData = await pokeRes.json();
                        return {
                            id: pokeData.id,
                            name: pokemon.name,
                            image: pokeData.sprites.front_default, // Get Pokémon image
                        };
                    })
                );

                setPokeData(pokemonDetails);
                console.log("Card data downloaded successfully!!");
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            }
        };

        fetchPokemon();
        
        return () => {
            controller.abort();
        }
    }, [numCards])

    // game logic
    function handleClick(e,name) {
        e.preventDefault();
        if (clickedPokemon.length === 0) {
            setClickedPokemon([...clickedPokemon, name]);
        } else if (highScore+1 === pokeData.length-1) {
            setCurrScore((prevScore) => prevScore + 1);  // Update current score
            if (highScore <= currScore) {setHighScore((prevScore) => prevScore + 1);}   // Update high score
            setEndGame(true);
        } else {
            if (!clickedPokemon.includes(name)) {
                setCurrScore((prevScore) => prevScore + 1);  // Update current score
                if (highScore <= currScore) {setHighScore((prevScore) => prevScore + 1);}   // Update high score
                setClickedPokemon([...clickedPokemon, name]);         // Update clicked list
            } else {
                setCurrScore(0);
                setClickedPokemon([]);
            }
        }
        // console.log(clickedPokemon,name);
    }
    
    return (
        <div className="game">
            <div className="game-scorecard">
                <div>Current Score: {currScore}</div>
                <div>Highest Score: {highScore}</div>
            </div>
            <div className="game-card-cntr">
                {pokeData && !endGame && shuffleArray(pokeData).map(pokemon => {
                    return <Card key={pokemon.id} imgUrl={pokemon.image} name={pokemon.name} handleClick={handleClick}/>
                })}
            </div>
            {endGame && <Win />}
        </div>
    )
}
