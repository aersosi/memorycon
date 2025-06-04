import { useRoundHumanString, useWinnerString } from "@/hooks/useStrings";

export const useRoundStyles = () => {
    // return tailwind colors based on if it's humans/computers turn
    return {
        textColorRound: useRoundHumanString("text-holi-200", "text-amber-200"),
        bgColorRound: useRoundHumanString("bg-holi-500", "bg-amber-400"),
    };
};

export const useWinnerStyles = () => {
    // return tailwind colors based on if human/computer is the winner
    return {
        textColorWinner: useWinnerString("text-holi-200", "text-amber-200", ""),
        bgColorRoundWinner: useWinnerString("bg-holi-500", "bg-amber-400", ""),
    };
};