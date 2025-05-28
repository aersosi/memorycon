import { useRoundHumanString, useWinnerString } from "@/hooks/useStrings";

export const useRoundStyles = () => {
    return {
        textColorRound: useRoundHumanString("text-holi-500", "text-amber-500"),
        bgColorRound: useRoundHumanString("bg-holi-500", "bg-amber-500"),
    };
};

export const useWinnerStyles = () => {
    return {
        textColorWinner: useWinnerString("text-holi-500", "text-amber-500", ""),
        bgColorRoundWinner: useWinnerString("bg-holi-500", "bg-amber-500", ""),
    };
};