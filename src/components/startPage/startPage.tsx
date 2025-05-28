"use client"

import StartHeader from "@/components/startPage/startHeader";
import StartInput from "@/components/startPage/startInput";
import { Button } from "@/components/ui/button";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { useEffect } from "react";

export default function StartPage() {
    const dispatch = useGameDispatch();
    const gameState = useGameState();

    const goEasy = () => {
        dispatch({type: 'SET_GAME_MODE', payload: true})
    }

    const goHard = () => {
        dispatch({type: 'SET_GAME_MODE', payload: false})
    }

    useEffect(() => {
        const gameModeSet = gameState.gameMode.isEasy
        console.log(gameModeSet)
    }, [goEasy, goHard]);

    return (
        <div className="h-full flex flex-col gap-4 p-12">
            <StartHeader/>
            {/*<StartInput></StartInput>*/}

            <div className="flex gap-4 border">
                <Button onClick={goEasy}>
                    {gameState.gameMode.gameEasy.title}
                </Button>
                <Button onClick={goHard}>
                    {gameState.gameMode.gameHard.title}
                </Button>
            </div>
        </div>

    );
}