import { useGameState } from "@/contexts/gameContext";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shuffleArray = <T>(array: T[]): T[] => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export const isRoundHumanString = (stringHuman: string, stringComputer: string) => {
    const gameState = useGameState();
    return gameState.playersRound.isRoundHuman ? stringHuman : stringComputer
}

export const isWinnerString = (humanText: string, computerText: string, drawText: string) => {
    const gameState = useGameState();
    const {humanPoints, computerPoints} = gameState.playersRound;

    if (humanPoints > computerPoints) return humanText;     // human wins
    if (humanPoints < computerPoints) return computerText;  // computer wins
    return drawText;                                        // draw
};

