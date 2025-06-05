import { useGameState } from "@/contexts/gameContext";

export function useRoundHumanString(stringHuman: string, stringComputer: string) {
    // returns a string based on if it's humans/computers round
    const { isRoundHuman } = useGameState();

    return isRoundHuman ? stringHuman : stringComputer;
}

export function useWinnerString(humanText: string, computerText: string, drawText: string) {
    // return a string based on if humans/computer/both are the winner
    const { humanPoints, computerPoints } = useGameState();

    if (humanPoints > computerPoints) return humanText;     // human wins
    if (humanPoints < computerPoints) return computerText;  // computer wins
    return drawText;                                        // draw
}