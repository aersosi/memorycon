import { useRoundHumanString, useWinnerString } from "@/hooks/useStrings";

export const useRoundStyles = () => {
    // return tailwind colors based on if it's humans/computers turn
    return {
        textColorRound: useRoundHumanString("text-holi-500", "text-amber-500"),
        bgColorRound: useRoundHumanString("bg-holi-500", "bg-amber-500"),
    };
};

export const useWinnerStyles = () => {
    // return tailwind colors based on if humans/computer is the winner
    return {
        textColorWinner: useWinnerString("text-holi-500", "text-amber-500", ""),
        bgColorRoundWinner: useWinnerString("bg-holi-500", "bg-amber-500", ""),
    };
};