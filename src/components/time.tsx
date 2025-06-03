import Countdown from "@/components/countdown";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { getGameConfig } from "@/lib/config";
import { useCallback } from "react";

export default function Time() {
    const {previewCards, isRoundHuman, gameModeEasy} = useGameState();
    const dispatch = useGameDispatch();
    const config = getGameConfig(gameModeEasy);

    const handleTimeOver = useCallback(() => {
        if (previewCards) {
            dispatch({type: 'END_PREVIEW'});
        } else {
            dispatch({type: 'NEXT_ROUND'});
        }
    }, [previewCards, dispatch]);

    const timeLimit = previewCards ? config.previewTime : config.turnTime;
    const label = previewCards ? "Vorschau" : "Rundenzeit";

    return (
        <p className="flex gap-1">
            <span>{label}: </span>
            <span className="w-7 text-center">
        <Countdown
            key={`${previewCards}-${isRoundHuman}`}
            initialTime={timeLimit}
            onTimeOver={handleTimeOver}
        />
      </span>
            {!previewCards && <span> Sek.</span>}
        </p>
    );
}