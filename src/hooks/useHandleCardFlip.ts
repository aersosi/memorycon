import { useEffect } from "react";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";

export function useHandleCardMatch(
    flippedCardIndices: number[],
    cardEmojis: string[],
    resetFlipped: () => void
) {
    const dispatch = useGameDispatch();
    const { playersRound } = useGameState();

    useEffect(() => {
        if (flippedCardIndices.length !== 2) return;

        const [i1, i2] = flippedCardIndices;
        const [e1, e2] = [cardEmojis[i1], cardEmojis[i2]];

        if (e1 === e2) {
            dispatch({ type: "PUSH_FOUND_MATCHES", payload: [e1, e2] });
            dispatch({
                type: playersRound.isRoundHuman
                    ? "INCREMENT_HUMAN_POINTS"
                    : "INCREMENT_COMPUTER_POINTS",
                payload: 1,
            });
        }

        const timeout = setTimeout(() => {
            resetFlipped();
            dispatch({ type: "NEXT_ROUND" });
        }, 1000);

        return () => clearTimeout(timeout);
    }, [flippedCardIndices]);
}
