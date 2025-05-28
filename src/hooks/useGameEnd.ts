import { useEffect } from "react";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";

export function useGameEnd(setOpen: (v: boolean) => void) {
    const { allCards, foundMatches } = useGameState();
    const dispatch = useGameDispatch();

    useEffect(() => {
        if (foundMatches.length === allCards.length) {
            dispatch({ type: "GAME_END" });
            setOpen(true);
        }
    }, [foundMatches, allCards.length, dispatch, setOpen]);
}