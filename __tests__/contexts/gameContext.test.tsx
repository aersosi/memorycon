// __tests__/gameContext.test.tsx
import React from 'react';
import { render, act } from '@testing-library/react';
import {
    GameProvider,
    useGameDispatch,
    useGameState
} from '@/contexts/gameContext';
import { gameStateInitial } from '@/lib/config';

// Helper component to test context
function TestComponent({ action }: { action: any }) {
    const dispatch = useGameDispatch();
    const state = useGameState();

    React.useEffect(() => {
        dispatch(action);
    }, [dispatch]);

    return <pre>{JSON.stringify(state)}</pre>;
}

describe('gameContext reducer', () => {
    it('SET_HUMAN_NAME sets humanName', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'SET_HUMAN_NAME', payload: 'Alice' }} />
            </GameProvider>
        );
        expect(getByText(/Alice/)).toBeInTheDocument();
    });

    it('INCREMENT_HUMAN_POINTS adds to humanPoints', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'INCREMENT_HUMAN_POINTS', payload: 3 }} />
            </GameProvider>
        );
        expect(getByText(/"humanPoints":3/)).toBeInTheDocument();
    });

    it('INCREMENT_COMPUTER_POINTS adds to computerPoints', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'INCREMENT_COMPUTER_POINTS', payload: 2 }} />
            </GameProvider>
        );
        expect(getByText(/"computerPoints":2/)).toBeInTheDocument();
    });

    it('SET_FOUND_MATCHES appends matches', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'SET_FOUND_MATCHES', payload: ['🐶', '🐶'] }} />
            </GameProvider>
        );
        expect(getByText(/"foundMatches":\["🐶","🐶"\]/)).toBeInTheDocument();
    });

    it('SHOW_GAME sets showGame', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'SHOW_GAME', payload: true }} />
            </GameProvider>
        );
        expect(getByText(/"showGame":true/)).toBeInTheDocument();
    });

    it('SET_GAME_EASY sets gameModeEasy', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'SET_GAME_EASY', payload: true }} />
            </GameProvider>
        );
        expect(getByText(/"gameModeEasy":true/)).toBeInTheDocument();
    });

    it('FLIP_CARD adds index to flippedCardIndices', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'FLIP_CARD', payload: 1 }} />
            </GameProvider>
        );
        expect(getByText(/"flippedCardIndices":\[1\]/)).toBeInTheDocument();
    });

    it('RESET_FLIPPED resets flippedCardIndices', () => {
        const WithFlipAndReset = () => {
            const dispatch = useGameDispatch();
            const state = useGameState();

            React.useEffect(() => {
                dispatch({ type: 'FLIP_CARD', payload: 1 });
                dispatch({ type: 'RESET_FLIPPED' });
            }, [dispatch]);

            return <pre>{JSON.stringify(state)}</pre>;
        };

        const { getByText } = render(<GameProvider><WithFlipAndReset /></GameProvider>);
        expect(getByText(/"flippedCardIndices":\[\]/)).toBeInTheDocument();
    });

    it('END_PREVIEW sets previewCards to false', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'END_PREVIEW' }} />
            </GameProvider>
        );
        expect(getByText(/"previewCards":false/)).toBeInTheDocument();
    });

    it('NEXT_ROUND toggles isRoundHuman', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'NEXT_ROUND' }} />
            </GameProvider>
        );
        expect(getByText(/"isRoundHuman":false/)).toBeInTheDocument();
    });

    it('GAME_END sets isGameEnd true', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'GAME_END' }} />
            </GameProvider>
        );
        expect(getByText(/"isGameEnd":true/)).toBeInTheDocument();
    });

    it('RESET_GAME resets to initial state', () => {
        const { getByText } = render(
            <GameProvider>
                <TestComponent action={{ type: 'RESET_GAME' }} />
            </GameProvider>
        );
        expect(getByText(JSON.stringify(gameStateInitial))).toBeInTheDocument();
    });
});
