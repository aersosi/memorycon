import { useState, useEffect } from 'react';

export function useCountdown(duration: number, onComplete?: () => void) {
    const [startTime] = useState(() => Date.now());
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeLeft = Math.max(0, duration - Math.floor((now - startTime) / 1000));

    useEffect(() => {
        if (timeLeft === 0 && onComplete) {
            onComplete();
        }
    }, [timeLeft, onComplete]);

    return timeLeft;
}