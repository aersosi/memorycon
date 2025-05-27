import { useEffect, useState } from "react";

type CountdownProps = {
    initialTime: number
    onTimeOver?: () => void;
}

export default function Countdown({initialTime = 60, onTimeOver}: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
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

