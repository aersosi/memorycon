import { useEffect } from "react";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { shuffleArray } from "@/lib/utils";

export function useInitializeGame(trigger: number, setEmojis: (emojis: string[]) => void) {
    const { allCards } = useGameState();
    const dispatch = useGameDispatch();

    useEffect(() => {
        if (Math.random() < 0.5) dispatch({type: "NEXT_ROUND"});
        setEmojis(shuffleArray([...allCards]));
    }, [trigger]);
}
