import { useGameState } from "@/contexts/gameContext";
import { useEffect, useRef, useState } from "react";

type CountdownProps = {
    initialTime: number;
    onTimeOver?: () => void;
};

export default function Countdown({ initialTime, onTimeOver}: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // useRef to clear interval across later renders
    const gameState = useGameState();

    useEffect(() => {
        // Wenn gestoppt oder Zeit vorbei, Timer stoppen
        if (gameState.isGameEnd || timeLeft <= 0) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            if (timeLeft === 0 && onTimeOver) {
                onTimeOver();
            }

            return;
        }

        // Start timer
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => Math.max(prev - 1, 0));
            }, 1000);
        }

        // Cleanup
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [timeLeft, onTimeOver, gameState.isGameEnd]);

    return <>{timeLeft}</>;
}
