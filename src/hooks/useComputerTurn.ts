import { useEffect } from "react";
import { useGameState } from "@/contexts/gameContext";
import { findDuplicates, shuffleArray } from "@/lib/utils";

export function useComputerTurn(
    handleCardFlip: (index: number) => void,
    cardEmojis: string[],
    flippedCardIndices: number[]
) {
    const gameState = useGameState();
    const {isRoundHuman, foundMatches, gameModeEasy, previewCards} = gameState;

    useEffect(() => {
        if (gameState.isGameEnd || isRoundHuman || flippedCardIndices.length > 0) return;

        const delaySecondCardFlip = setTimeout(() => {
            const availableCards = cardEmojis
                .map((emoji, i) => (foundMatches.includes(emoji) ? null : i))
                .filter((i): i is number => i !== null);

            const duplicatePair = Math.random() < 0.5 // 50% chance auf gleiche Karten
                ? findDuplicates(cardEmojis, availableCards) ?? []
                : shuffleArray(availableCards);

            const [first, second] = gameModeEasy // easy game = 100% random
                ? shuffleArray(availableCards)
                : duplicatePair;

            handleCardFlip(first);
            setTimeout(() => handleCardFlip(second), 500);
        }, 1000);

        return () => clearTimeout(delaySecondCardFlip);
    }, [gameState.isGameEnd, isRoundHuman, cardEmojis, foundMatches, flippedCardIndices, gameModeEasy, previewCards, handleCardFlip]);
}


