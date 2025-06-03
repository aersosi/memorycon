import { useRoundStyles } from "@/hooks/useStyles";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { getGameConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export type CardProps = {
    emoji: string,
    isFlipped: boolean,
    isFound: boolean,
    isPreview: boolean,
    onFlip: () => void,
};

export default function Card({emoji, isFlipped, isFound, isPreview, onFlip}: CardProps) {
    const gameState = useGameState();
    const dispatch = useGameDispatch();
    const config = getGameConfig(gameState.gameMode.isEasy);

    const { bgColorRound } = useRoundStyles();

    // Handle preview mode timing
    useEffect(() => {
        if (isPreview) {
            const previewTime = config.previewTime;

            const timer = setTimeout(() => {
                dispatch({type: 'END_PREVIEW'});
            }, previewTime * 1000);

            return () => clearTimeout(timer);
        }
    }, [isPreview, gameState.gameMode, dispatch]);

    const isEmojiVisible = isPreview || isFlipped || isFound;

    const handleClick = () => {
        if (isPreview || isFound || isFlipped) return; // Card is not clickable
        onFlip();
    };

    return (
        <div
            className={cn(`relative overflow-hidden perspective cursor-pointer
                        transition-opacity duration-250 delay-250 
                ${isPreview && "pointer-events-none"}
                ${isFound && "pointer-events-none opacity-10"}
                ${isFound && "pointer-events-none"}
                ${!gameState.playersRound.isRoundHuman && "pointer-events-none"}
            `)}
            onClick={handleClick}
        >
            <CardSide
                className={cn(` 
                ${isEmojiVisible && "[transform:rotateY(180deg)]"}
                ${bgColorRound}
                `)}
            />
            <CardSide className={cn(`bg-white ${!isEmojiVisible && "[transform:rotateY(180deg)]"}`)}>
                {emoji}
            </CardSide>
        </div>
    );
}

type CardSideProps = {
    className?: string;
    children?: React.ReactNode;
};

export function CardSide({className = "", children}: CardSideProps) {
    return (
        <div className={`rounded-md absolute inset-0 flex justify-center items-center text-4xl 
                transition-all duration-500 backface-hidden [transform-style:preserve-3d] ${className}`}
        >
            {children}
        </div>
    );
}

