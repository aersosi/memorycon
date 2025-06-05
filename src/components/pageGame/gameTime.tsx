import Countdown from "@/components/countdown";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { useRoundStyles } from "@/hooks/useStyles";
import { gameConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

export default function GameTime() {
    const {previewCards, isRoundHuman, gameModeEasy, flippedCardIndices, isGameEnd} = useGameState();
    const dispatch = useGameDispatch();
    const config = gameConfig(gameModeEasy);
    const {textColorRound} = useRoundStyles();

    const handleTimeOver = useCallback(() => {
        if (previewCards) {
            dispatch({type: 'END_PREVIEW'});
        } else {
            if (flippedCardIndices.length === 1) {
                dispatch({type: 'RESET_FLIPPED'});
            }
            if (!isGameEnd) dispatch({type: 'NEXT_ROUND'});
        }
    }, [previewCards, flippedCardIndices.length, dispatch, isGameEnd]);

    const timeLimit = previewCards ? config.previewTime : config.turnTime;
    const label = previewCards ? "Vorschau" : "Rundenzeit";

    return (
        <p className="flex gap-1">
            <span className={cn(`${textColorRound}`)}>{label}: </span>
            <span className="w-7 text-center font-semibold">
                <Countdown
                    key={`${previewCards}-${isRoundHuman}`}
                    initialTime={timeLimit}
                    onTimeOver={handleTimeOver}
                />
            </span>
            <span className={cn(`${textColorRound}`)}> Sek.</span>
        </p>
    );
}