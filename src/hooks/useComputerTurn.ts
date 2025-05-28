import { useEffect } from "react";
import { useGameState } from "@/contexts/gameContext";
import { shuffleArray } from "@/lib/utils";

export function useComputerTurn(
    handleCardFlip: (index: number) => void,
    cardEmojis: string[],
    flippedCardIndices: number[]
) {
    const { playersRound, foundMatches } = useGameState();

    useEffect(() => {
        if (playersRound.isRoundHuman || flippedCardIndices.length > 0) return;

        const timeout = setTimeout(() => {
            const available = cardEmojis
                .map((emoji, i) => (foundMatches.includes(emoji) ? null : i))
                .filter((i): i is number => i !== null);

            const [first, second] = shuffleArray(available);
            handleCardFlip(first);
            setTimeout(() => handleCardFlip(second), 500);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [playersRound.isRoundHuman, cardEmojis, foundMatches]);
}
