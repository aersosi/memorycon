"use client"

import { GameState, gameStateInitial } from "@/lib/config";
import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type GameAction =
    | { type: 'INCREMENT_HUMAN_POINTS'; payload: number }
    | { type: 'INCREMENT_COMPUTER_POINTS'; payload: number }
    | { type: 'PUSH_FOUND_MATCHES'; payload: [string, string] }
    | { type: 'NEXT_ROUND' }
    | { type: 'RESET_GAME' }
    | { type: 'GAME_END' }
    | { type: 'PREVIEW_CARDS' };

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'INCREMENT_HUMAN_POINTS':
            return {
                ...state,
                playersRound: {
                    ...state.playersRound,
                    humanPoints: state.playersRound.humanPoints + action.payload,
                },
            };
        case 'INCREMENT_COMPUTER_POINTS':
            return {
                ...state,
                playersRound: {
                    ...state.playersRound,
                    computerPoints: state.playersRound.computerPoints + action.payload,
                },
            };
        case 'PUSH_FOUND_MATCHES':
            return {
                ...state,
                foundMatches: [...state.foundMatches, ...action.payload],
            };
        case 'NEXT_ROUND':
            return {
                ...state,
                playersRound: {
                    ...state.playersRound,
                    isRoundHuman: !state.playersRound.isRoundHuman,
                },
            };
        case 'RESET_GAME':
            return gameStateInitial;
        case 'GAME_END':
            return {
                ...state,
                isGameEnd: true,
            };

        case 'PREVIEW_CARDS':
            return {
                ...state,
                previewCards: false,
            };

        default:
            return state;
    }
}


// 4. Contexts erstellen - diese sind bereits richtig typisiert
const GameStateContext = createContext<GameState | undefined>(undefined);
const GameDispatchContext = createContext<Dispatch<GameAction> | undefined>(undefined);

// 5. Provider-Komponente
export const GameProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(gameReducer, gameStateInitial);

    return (
        <GameStateContext.Provider value={state}>
            <GameDispatchContext.Provider value={dispatch}>
                {children}
            </GameDispatchContext.Provider>
        </GameStateContext.Provider>
    );
};

// 6. Custom Hooks zur Nutzung des Context
export const useGameState = () => {
    const context = useContext(GameStateContext);
    if (context === undefined) {
        throw new Error('useGameState must be used within a GameProvider');
    }
    return context;
};

export const useGameDispatch = () => {
    const context = useContext(GameDispatchContext);
    if (context === undefined) {
        throw new Error('useGameDispatch must be used within a GameProvider');
    }
    return context;
};
