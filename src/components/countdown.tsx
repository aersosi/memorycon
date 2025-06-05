import { useGameState } from "@/contexts/gameContext";
import { useCountdown } from "@/hooks/useCountdown";
import { CountdownProps } from "@/types/props";

export default function Countdown({ initialTime, onTimeOver }: CountdownProps) {
    const gameState = useGameState();
    const timeLeft = useCountdown(initialTime, onTimeOver);

    // Stop countdown if game ends
    if (gameState.isGameEnd) return <>{initialTime}</>;

    return <>{timeLeft}</>;
}