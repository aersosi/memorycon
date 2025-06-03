import { useGameState } from "@/contexts/gameContext";
import { useSimpleCountdown } from "@/hooks/useSimpleCountdown";

type CountdownProps = {
    initialTime: number;
    onTimeOver?: () => void;
};

export default function Countdown({ initialTime, onTimeOver }: CountdownProps) {
    const gameState = useGameState();
    const timeLeft = useSimpleCountdown(initialTime, onTimeOver);

    // Stop countdown if game ends
    if (gameState.isGameEnd) return <>{initialTime}</>;

    return <>{timeLeft}</>;
}