import { gameStateInitial } from '@/lib/config';
import { ReactNode } from "react";

export const useGameState = jest.fn(() => gameStateInitial);
export const useGameDispatch = jest.fn(() => jest.fn());
export const GameProvider = ({ children }: { children: ReactNode }) => <div>{children}</div>;