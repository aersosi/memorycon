"use client"

import Card from "@/components/card";
import GameEndDialog from "@/components/gameEndDialog";
import GameHeader from "@/components/gamePage/gameHeader";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { useComputerTurn } from "@/hooks/useComputerTurn";
import { useGameEnd } from "@/hooks/useGameEnd";
import { useHandleCardMatch } from "@/hooks/useHandleCardMatch";
import { useInitializeGame } from "@/hooks/useInitializeGame";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";

export default function GamePage() {
    const gameState = useGameState();
    const dispatch = useGameDispatch();
    const flippedCardIndices = gameState.flippedCardIndices;

    const [cardEmojis, setCardEmojis] = useState<string[]>([]);
    const [shuffleTrigger, setShuffleTrigger] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pageHidden, setPageHidden] = useState(false);

    const handleCardFlip = useCallback((index: number) => {
        if (gameState.previewCards ||
            flippedCardIndices.includes(index) ||
            gameState.foundMatches.includes(cardEmojis[index]) ||
            flippedCardIndices.length >= 2
        ) return;

        dispatch({type: "FLIP_CARD", payload: index});
    }, [dispatch, flippedCardIndices, gameState.previewCards, gameState.foundMatches, cardEmojis]);

    const handleRestartGame = () => {
        setDialogOpen(false);
        setPageHidden(true);

        dispatch({type: "RESET_GAME"});
        setShuffleTrigger(prev => prev + 1); // trigger Emoji reshuffle
    };

    const handleGameEnd = (setOpen: boolean) => {
        setDialogOpen(setOpen)
    }

    const hidePage = pageHidden && "opacity-0"

    useInitializeGame(shuffleTrigger, setCardEmojis);
    useHandleCardMatch(flippedCardIndices, cardEmojis);
    useComputerTurn(handleCardFlip, cardEmojis, flippedCardIndices);
    useGameEnd(handleGameEnd);

    return (
        <div className={`${hidePage} transition-opacity duration-250 h-full flex flex-col gap-4 p-12`}>
            <GameHeader/>
            <main className="grid grid-cols-6 grid-rows-6 gap-4 grow">
                {cardEmojis.map((emoji, i) => (
                    <Card
                        key={i}
                        emoji={emoji}
                        isFound={gameState.foundMatches.includes(emoji)}
                        isFlipped={flippedCardIndices.includes(i)}
                        isPreview={gameState.previewCards}
                        onFlip={() => handleCardFlip(i)}
                    />
                ))}
            </main>
            <footer className="flex">
                <Button onClick={handleRestartGame} variant="outline" className="w-1/2 mx-auto">
                    Zum Anfang
                </Button>
            </footer>

            <GameEndDialog isOpen={dialogOpen} onButton={handleRestartGame}/>
        </div>
    );
}
