import '@testing-library/jest-dom'
import { act, render, screen } from "@testing-library/react";
import Countdown from "@/components/countdown";
import { useGameState } from '@/contexts/gameContext';

jest.mock('@/contexts/gameContext', () => ({
    useGameState: jest.fn(),
}));

jest.useFakeTimers();

describe('Countdown component', () => {
    it('renders timeLeft if game is not over', () => {
        (useGameState as jest.Mock).mockReturnValue({ isGameEnd: false });
        render(<Countdown initialTime={5} />);

        expect(screen.getByText('5')).toBeInTheDocument();
        act(() => jest.advanceTimersByTime(1000))
        expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('renders initialTime if game is over', () => {
        (useGameState as jest.Mock).mockReturnValue({ isGameEnd: true });
        render(<Countdown initialTime={99} />);

        expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('calls onTimeOver when time is up', () => {
        const onTimeOver = jest.fn();
        (useGameState as jest.Mock).mockReturnValue({ isGameEnd: false });

        render(<Countdown initialTime={1} onTimeOver={onTimeOver} />);
        act(() => jest.advanceTimersByTime(1000))
        expect(onTimeOver).toHaveBeenCalled();
    });
});
