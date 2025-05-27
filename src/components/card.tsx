import { useEffect, useState } from "react";
import { config } from "@/lib/config";

export type CardProps = {
    symbol: string;
    isEasy: boolean;
    onFlip: () => void;
    onSymbol: (value: string) => void;
    isMatch: boolean;
};

export default function Card({symbol, isEasy, onFlip, onSymbol, isMatch}: CardProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = isEasy
            ? config.gameMode.easy.isVisibleTime
            : config.gameMode.hard.isVisibleTime;

        const flipCards = setTimeout(() => {
            setIsVisible(false);
        }, timeout);

        return () => clearTimeout(flipCards);
    }, []);

    useEffect(() => {
        if (isMatch) {
            // todo:
        } else {
            // flip cards back
            setIsVisible(false)
        }

    }, [isMatch]);

    const handleClick = () => {
        setIsVisible(!isVisible)
        onFlip();
        onSymbol(symbol);
    }

    return (
        <div className="relative overflow-hidden perspective" onClick={handleClick}>
            <CardSide className={`bg-holi-500 ${isVisible ? "[transform:rotateY(180deg)]" : ""}`}/>
            <CardSide className={`bg-holi-50 ${isVisible ? "" : "[transform:rotateY(180deg)]"}`}>
                {symbol}
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
