"use client"

import GamePage from "@/pages/game/gamePage";
import StartPage from "@/pages/start/startPage";
import { GameProvider, useGameState } from "@/contexts/gameContext"

export default function Home() {
    return (
        <GameProvider>
            <GamePages/>
        </GameProvider>
    );
}

function GamePages() {
    const {showGame} = useGameState();

    return (
        <>
            {!showGame && <StartPage/>}
            {showGame && <GamePage/>}
        </>
    );
}

