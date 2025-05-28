import { isRoundHumanString, isWinnerString } from "@/lib/utils";

export const useRoundStyles = () => {
    return {
        textColorRound: isRoundHumanString("text-holi-500", "text-amber-500"),
        bgColorRound: isRoundHumanString("bg-holi-500", "bg-amber-500"),
    };
};

export const useWinnerStyles = () => {
    return {
        textColorWinner: isWinnerString("text-holi-500", "text-amber-500", ""),
        bgColorRoundWinner: isWinnerString("bg-holi-500", "bg-amber-500", ""),
    };
};