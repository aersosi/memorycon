import { useGameDispatch, useGameState } from "@/contexts/gameContext";
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

    // Handle preview mode timing
    useEffect(() => {
        if (isPreview) {
            const previewTime = gameState.gameMode.isEasy
                ? gameState.gameMode.gameEasy.previewCardsTime
                : gameState.gameMode.gameHard.previewCardsTime;

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
            className={`relative overflow-hidden perspective transition-opacity cursor-pointer
                ${isPreview && "pointer-events-none"}
                ${isFound && "pointer-events-none opacity-10"}
                ${!gameState.playersRound.isRoundHuman && "pointer-events-none"}
            `}
            onClick={handleClick}
        >
            <CardSide
                className={` 
                ${isEmojiVisible && "[transform:rotateY(180deg)]"}
                ${gameState.playersRound.isRoundHuman ? "bg-holi-500" : "bg-amber-500"}
                `}
            />
            <CardSide className={`bg-holi-50 ${!isEmojiVisible && "[transform:rotateY(180deg)]"}`}>
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