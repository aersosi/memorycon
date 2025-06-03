"use client"

import { GameState, gameStateInitial } from "@/lib/config";
import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type GameAction =
    | { type: 'SET_HUMAN_NAME'; payload: string }
    | { type: 'INCREMENT_HUMAN_POINTS'; payload: number }
    | { type: 'INCREMENT_COMPUTER_POINTS'; payload: number }
    | { type: 'PUSH_FOUND_MATCHES'; payload: [string, string] }
    | { type: 'SHOW_GAME'; payload: boolean }
    | { type: 'SET_GAME_MODE'; payload: boolean }
    | { type: 'RESET_FLIPPED' }
    | { type: 'FLIP_CARD'; payload: number }
    | { type: 'NEXT_ROUND' }
    | { type: 'RESET_GAME' }
    | { type: 'GAME_END' }
    | { type: 'END_PREVIEW' };

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'SET_HUMAN_NAME':
            return {
                ...state,
                playersRound: {
                    ...state.playersRound,
                    humanName: action.payload,
                },
            };
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

        case 'SHOW_GAME':
            return {
                ...state,
                gameMode: {
                    ...state.gameMode,
                    showGame: action.payload,
                },
            };

        case 'SET_GAME_MODE':
            return {
                ...state,
                gameMode: {
                    ...state.gameMode,
                    isEasy: action.payload,
                },
            };

        case 'RESET_FLIPPED':
            return {
                ...state,
                flippedCardIndices: [],
            };

        case 'FLIP_CARD':
            return {
                ...state,
                flippedCardIndices: [...state.flippedCardIndices, action.payload],
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

        case 'END_PREVIEW':
            return {
                ...state,
                previewCards: false,
            };

        default:
            return state;
    }
}

const GameStateContext = createContext<GameState | undefined>(undefined);
const GameDispatchContext = createContext<Dispatch<GameAction> | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(gameReducer, gameStateInitial);

    return (
        <GameStateContext.Provider value={state}>
            <GameDispatchContext.Provider value={dispatch}>
                {children}
            </GameDispatchContext.Provider>
        </GameStateContext.Provider>
    );
};

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