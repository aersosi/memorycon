import { useRoundStyles } from "@/hooks/useStyles";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { gameConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { CardProps, CardSideProps } from "@/types/props";
import { useEffect } from "react";

export default function GameCard({emoji, isFlipped, isFound, isPreview, onFlip}: CardProps) {
    const gameState = useGameState();
    const dispatch = useGameDispatch();
    const config = gameConfig(gameState.gameModeEasy);

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
    }, [isPreview, gameState.gameModeEasy, dispatch, config.previewTime]);

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
                ${!gameState.isRoundHuman && "pointer-events-none"}
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

export function CardSide({className = "", children}: CardSideProps) {
    return (
        <div className={`rounded-md absolute inset-0 flex justify-center items-center text-h2-font-size-fluid leading-h2-fluid
                transition-all duration-500 backface-hidden [transform-style:preserve-3d] ${className}`}
        >
            {children}
        </div>
    );
}

