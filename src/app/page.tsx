"use client"

import GamePage from "@/components/pageGame/gamePage";
import StartPage from "@/components/pageStart/startPage";
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

