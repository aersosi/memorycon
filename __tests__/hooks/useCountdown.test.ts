import { renderHook, act } from '@testing-library/react';
import { useCountdown } from '@/hooks/useCountdown';

jest.useFakeTimers();

describe('useCountdown', () => {
    it('counts down every second', () => {
        const { result } = renderHook(() => useCountdown(3));

        expect(result.current).toBe(3);

        act(() => jest.advanceTimersByTime(1000));
        expect(result.current).toBe(2);

        act(() => jest.advanceTimersByTime(1000));
        expect(result.current).toBe(1);

        act(() => jest.advanceTimersByTime(1000));
        expect(result.current).toBe(0);
    });

    it('calls onComplete at 0', () => {
        const onComplete = jest.fn();
        renderHook(() => useCountdown(1, onComplete));

        act(() => jest.advanceTimersByTime(1000));
        expect(onComplete).toHaveBeenCalled();
    });
});
