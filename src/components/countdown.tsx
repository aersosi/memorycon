import { useEffect, useState, useRef } from "react";

type CountdownProps = {
    initialTime: number;
    onTimeOver?: () => void;
    stopOn?: boolean;
};

export default function Countdown({ initialTime = 60, onTimeOver, stopOn = true }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const prevTimeLeftRef = useRef(timeLeft);

    useEffect(() => {
        if (stopOn || timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [stopOn, timeLeft]);

    useEffect(() => {
        if (prevTimeLeftRef.current > 0 && timeLeft === 0 && onTimeOver) {
            onTimeOver();
        }
        prevTimeLeftRef.current = timeLeft;
    }, [timeLeft, onTimeOver]);

    return <>{timeLeft}</>;
}