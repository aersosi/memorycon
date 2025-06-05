import { useEffect } from "react";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";

export function useGameEnd(handleGameEnd: (isOpen: boolean) => void) {
    const gameState = useGameState();
    const { allCards, foundMatches } = gameState;
    const dispatch = useGameDispatch();

    useEffect(() => {
        const allCardsFlipped = foundMatches.length === allCards.length;
        if (!gameState.isGameEnd && allCardsFlipped) {
            dispatch({ type: "GAME_END" });
            handleGameEnd(true);
        }
    }, [foundMatches, allCards.length, gameState.isGameEnd, dispatch, handleGameEnd]);
}
