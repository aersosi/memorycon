import { useEffect } from "react";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { shuffleArray } from "@/lib/utils";

export function useInitializeGame(trigger: number, setEmojis: (emojis: string[]) => void) {
    const { allCards, previewCards } = useGameState();
    const dispatch = useGameDispatch();

    useEffect(() => {
        const randomPlayer = shuffleArray([true, false])[0];
        if (randomPlayer) dispatch({ type: "NEXT_ROUND" });

        setEmojis(shuffleArray([...allCards]));
    }, [trigger, previewCards]);
}
