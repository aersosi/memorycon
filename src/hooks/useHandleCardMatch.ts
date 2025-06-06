import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { useEffect } from "react";

export function useHandleCardMatch(
    flippedCardIndices: number[],
    cardEmojis: string[],
) {
    const dispatch = useGameDispatch();
    const gameState = useGameState();

    useEffect(() => {
        if (gameState.isGameEnd || flippedCardIndices.length !== 2) return;

        const [i1, i2] = flippedCardIndices;
        const [e1, e2] = [cardEmojis[i1], cardEmojis[i2]];

        if (e1 === e2) {
            dispatch({type: "SET_FOUND_MATCHES", payload: [e1, e2]});
            dispatch({
                type: gameState.isRoundHuman
                    ? "INCREMENT_HUMAN_POINTS"
                    : "INCREMENT_COMPUTER_POINTS",
                payload: 1,
            });
        }

        const waitBeforeNextRound = setTimeout(() => {
            dispatch({type: "RESET_FLIPPED"});
            dispatch({type: "NEXT_ROUND"});
        }, 1000);

        return () => clearTimeout(waitBeforeNextRound);
    }, [
        flippedCardIndices,
        cardEmojis,
        dispatch,
        gameState.isRoundHuman,
        gameState.isGameEnd
    ]);
}