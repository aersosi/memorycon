import { useEffect } from "react";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { shuffleArray } from "@/lib/utils";

export function useInitializeGame(shuffleTrigger: number, setCardEmojis: (emojis: string[]) => void) {
    // initialize game with
    const { allCards } = useGameState();
    const dispatch = useGameDispatch();

    useEffect(() => {
        if (Math.random() < 0.5) dispatch({type: "NEXT_ROUND"}); // 50% chance computer starts, not human
        setCardEmojis(shuffleArray([...allCards])); // shuffle emojis and push into UI
    }, [shuffleTrigger, allCards, dispatch, setCardEmojis]);
}
