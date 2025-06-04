"use client"

import { GameState, gameStateInitial } from "@/lib/config";
import { duplicateUniqueElements, filterToMaxTwo } from "@/lib/utils";
import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

type GameAction =
    | { type: 'SET_HUMAN_NAME'; payload: string }
    | { type: 'INCREMENT_HUMAN_POINTS'; payload: number }
    | { type: 'INCREMENT_COMPUTER_POINTS'; payload: number }
    | { type: 'SET_FOUND_MATCHES'; payload: [string, string] }
    | { type: 'SHOW_GAME'; payload: boolean }
    | { type: 'SET_GAME_EASY'; payload: boolean }
    | { type: 'FLIP_CARD'; payload: number }
    | { type: 'RESET_FLIPPED' }
    | { type: 'END_PREVIEW' }
    | { type: 'NEXT_ROUND' }
    | { type: 'GAME_END' }
    | { type: 'RESET_GAME' };

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'SET_HUMAN_NAME':
            return {
                ...state,
                humanName: action.payload,
            };
        case 'INCREMENT_HUMAN_POINTS':
            return {
                ...state,
                humanPoints: state.humanPoints + action.payload,

            };

        case 'INCREMENT_COMPUTER_POINTS':
            return {
                ...state,
                computerPoints: state.computerPoints + action.payload,

            };

        case 'SET_FOUND_MATCHES':
            return {
                ...state,
                foundMatches: [...state.foundMatches, ...action.payload],
            };

        case 'SHOW_GAME':
            return {
                ...state,
                showGame: action.payload,
            };

        case 'SET_GAME_EASY':
            return {
                ...state,
                gameModeEasy: action.payload,
            };

        case 'FLIP_CARD':
            return {
                ...state,
                flippedCardIndices: [...state.flippedCardIndices, action.payload],
            };

        case 'RESET_FLIPPED':
            return {
                ...state,
                flippedCardIndices: [],
            };

        case 'END_PREVIEW':
            return {
                ...state,
                previewCards: false,
            };

        case 'NEXT_ROUND':
            return {
                ...state,
                isRoundHuman: !state.isRoundHuman,
            };

        case 'GAME_END':
            return {
                ...state,
                isGameEnd: true,
            };

        case 'RESET_GAME':
            return gameStateInitial;

        default:
            return state;
    }
}

const GameStateContext = createContext<GameState | undefined>(undefined);
const GameDispatchContext = createContext<Dispatch<GameAction> | undefined>(undefined);

export const GameProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(gameReducer, gameStateInitial);

    // make sure allCards array has the right elements
    const maxTwoElements = filterToMaxTwo(state.allCards);
    const noSingleElements = duplicateUniqueElements(maxTwoElements);
    state.allCards = noSingleElements;

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