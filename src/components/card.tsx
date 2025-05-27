import { useGameState } from "@/contexts/gameContext";
import { useEffect, useState } from "react";

export type CardProps = {
    emoji: string;
    onFlip: () => void;
    onEmoji: (value: string) => void;
};

export default function Card({emoji, onFlip, onEmoji}: CardProps) {
    const gameState = useGameState();

    const [isEmojiVisible, setIsEmojiVisible] = useState(true);
    const [isCardHidden, setIsCardHidden] = useState(false);

    useEffect(() => {

        // wenn emoji sich in foundMatches befindet, diese Karten ausblenden
        if (gameState.foundMatches.includes(emoji)) {
            setIsCardHidden(true);
        }

        if (gameState.previewCards) {
            const previewCardsTime = gameState.gameMode.isEasy
                ? gameState.gameMode.gameEasy.previewCardsTime
                : gameState.gameMode.gameHard.previewCardsTime;

            const previewCards = setTimeout(() => {
                setIsEmojiVisible(false);
            }, previewCardsTime * 1000);

            return () => clearTimeout(previewCards);
        }
    }, [isEmojiVisible]);

    const handleClick = () => {
        setIsEmojiVisible(!isEmojiVisible)
        onFlip();
        onEmoji(emoji);
    }

    return (
        <div
            className={`relative overflow-hidden perspective transition-opacity
            ${gameState.previewCards ? "pointer-events-none" : ""}
            ${isCardHidden ? "pointer-events-none opacity-10" : ""}
        `}
            onClick={handleClick}>
            <CardSide className={`bg-holi-500 ${isEmojiVisible ? "[transform:rotateY(180deg)]" : ""}`}/>
            <CardSide className={`bg-holi-50 ${isEmojiVisible ? "" : "[transform:rotateY(180deg)]"}`}>
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
        <div
            className={`rounded-md absolute inset-0 flex justify-center items-center text-4xl transition-all duration-500 backface-hidden [transform-style:preserve-3d] ${className}`}
        >
            {children}
        </div>
    );
}
