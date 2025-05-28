import { useGameState } from "@/contexts/gameContext";

export const useRoundHumanString = (stringHuman: string, stringComputer: string) => {
    const gameState = useGameState();
    return gameState.playersRound.isRoundHuman ? stringHuman : stringComputer
}

export const useWinnerString = (humanText: string, computerText: string, drawText: string) => {
    const gameState = useGameState();
    const {humanPoints, computerPoints} = gameState.playersRound;

    if (humanPoints > computerPoints) return humanText;     // human wins
    if (humanPoints < computerPoints) return computerText;  // computer wins
    return drawText;                                        // draw
};