import { useEffect, useState } from "react";

type CountdownProps = {
    initialTime: number
    onTimeOver?: () => void;
    stopOn?: boolean;
}

export default function Countdown({initialTime = 60, onTimeOver, stopOn = true}: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (stopOn) return;

        if (timeLeft === 0) {
            if (onTimeOver) onTimeOver();
            return
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return <>{timeLeft}</>;
}

