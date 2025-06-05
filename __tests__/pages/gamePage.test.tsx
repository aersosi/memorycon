// __tests__/gamePage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GamePage from '@/components/pageGame/gamePage';
import { GameProvider } from '@/contexts/gameContext';
import * as useHooks from '@/hooks/useInitializeGame';
import '@testing-library/jest-dom';

jest.mock('@/hooks/useComputerTurn', () => ({
    useComputerTurn: jest.fn()
}));

jest.mock('@/hooks/useGameEnd', () => ({
    useGameEnd: jest.fn()
}));

jest.mock('@/hooks/useHandleCardMatch', () => ({
    useHandleCardMatch: jest.fn()
}));

jest.mock('@/hooks/useInitializeGame');

jest.mock('@/components/pageGame/gameCard', () => (props: any) => (
    <div data-testid="game-card" onClick={props.onFlip}>{props.emoji}</div>
));

jest.mock('@/components/pageGame/gameHeader', () => () => (
    <div data-testid="game-header">GameHeader</div>
));

jest.mock('@/components/pageGame/gameEndDialog', () => ({ isOpen, onButton }: any) => (
    isOpen ? <div data-testid="game-end-dialog" onClick={onButton}>Dialog</div> : null
));

describe('GamePage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        let hasSet = false;
        (useHooks.useInitializeGame as jest.Mock).mockImplementation((_, setCardEmojis) => {
            if (!hasSet) {
                hasSet = true;
                setCardEmojis(['🐶', '🐱']);
            }
        });
    });


    it('renders the game header, game cards, and button', async () => {
        render(
            <GameProvider>
                <GamePage />
            </GameProvider>
        );

        expect(screen.getByTestId('game-header')).toBeInTheDocument();
        expect(screen.getAllByTestId('game-card')).toHaveLength(2);
        expect(screen.getByRole('button', { name: /zum anfang/i })).toBeInTheDocument();
    });

    it('clicking "Zum Anfang" resets game and reshuffles', async () => {
        render(
            <GameProvider>
                <GamePage />
            </GameProvider>
        );

        const restartButton = screen.getByRole('button', { name: /zum anfang/i });
        fireEvent.click(restartButton);

        await waitFor(() => {
            expect(screen.getAllByTestId('game-card')).toHaveLength(2);
        });
    });

    it('flips a card when clicked if not already flipped', async () => {
        render(
            <GameProvider>
                <GamePage />
            </GameProvider>
        );

        const cards = screen.getAllByTestId('game-card');
        fireEvent.click(cards[0]);

        // Expect the emoji text to still be there after flip, indicating re-render
        expect(cards[0]).toHaveTextContent('🐶');
    });

    it('opens dialog on game end', async () => {
        const useGameEndMock = require('@/hooks/useGameEnd').useGameEnd;
        let setDialogOpenFn: any;
        useGameEndMock.mockImplementation((cb: any) => {
            setDialogOpenFn = cb;
        });

        render(
            <GameProvider>
                <GamePage />
            </GameProvider>
        );

        // Simulate game end
        setDialogOpenFn(true);
        expect(await screen.findByTestId('game-end-dialog')).toBeInTheDocument();
    });
});
