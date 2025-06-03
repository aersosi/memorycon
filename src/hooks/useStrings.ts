import { useGameState } from "@/contexts/gameContext";

export function useRoundHumanString(stringHuman: string, stringComputer: string) {
    // returns a string based on if it's humans/computers turn

    const gameState = useGameState();
    return gameState.playersRound.isRoundHuman ? stringHuman : stringComputer
}

export function useWinnerString(humanText: string, computerText: string, drawText: string) {
    // return a string based on if humans/computer/both are the winner
    const gameState = useGameState();
    const {humanPoints, computerPoints} = gameState.playersRound;

    if (humanPoints > computerPoints) return humanText;     // human wins
    if (humanPoints < computerPoints) return computerText;  // computer wins
    return drawText;                                        // draw
}