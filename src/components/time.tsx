import Countdown from "@/components/countdown";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { getGameConfig } from "@/lib/config";
import { useCallback } from "react";

export default function Time() {
    const gameState = useGameState();
    const dispatch = useGameDispatch();
    const config = getGameConfig(gameState.gameMode.isEasy);

    const handleTimeOver = useCallback(() => {
        if (gameState.previewCards) {
            dispatch({ type: 'END_PREVIEW' });
        } else {
            dispatch({ type: 'NEXT_ROUND' });
        }
    }, [gameState.previewCards, dispatch]);

    const timeLimit = gameState.previewCards ? config.previewTime : config.turnTime;
    const label = gameState.previewCards ? "Vorschau" : "Rundenzeit";

    return (
        <p className="flex gap-1">
            <span>{label}: </span>
            <span className="w-7 text-center">
        <Countdown
            key={`${gameState.previewCards}-${gameState.playersRound.isRoundHuman}`}
            initialTime={timeLimit}
            onTimeOver={handleTimeOver}
        />
      </span>
            {!gameState.previewCards && <span> Sek.</span>}
        </p>
    );
}