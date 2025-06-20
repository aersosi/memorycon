"use client"

import GameCard from "@/components/pageGame/gameCard";
import GameEndDialog from "@/components/pageGame/gameEndDialog";
import GameHeader from "@/components/pageGame/gameHeader";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { useComputerTurn } from "@/hooks/useComputerTurn";
import { useGameEnd } from "@/hooks/useGameEnd";
import { useHandleCardMatch } from "@/hooks/useHandleCardMatch";
import { useInitializeGame } from "@/hooks/useInitializeGame";
import { gameConfig } from "@/lib/config";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function GamePage() {
    const gameState = useGameState();
    const dispatch = useGameDispatch();
    const flippedCardIndices = gameState.flippedCardIndices;
    const config = gameConfig(gameState.gameModeEasy);


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

    useEffect(() => {
        document.title = config.description;
    },[config.description]);

    return (
        <div className={`${hidePage} transition-opacity duration-250 flex flex-col items-center justify-between gap-6 lg:gap-12 h-full 2xl:h-3/4 w-full max-w-[1024px] border bg-background/60 rounded-xl p-[var(--clamp-xs-md-16-64)] sm:py-12`}>
            <GameHeader/>
            <main className="grid grid-cols-6 grid-rows-6 gap-2 md:gap-4 grow w-full">
                {cardEmojis.map((emoji, i) => (
                    <GameCard
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
                <Button onClick={handleRestartGame} variant="outline">
                    Zum Anfang
                </Button>
            </footer>
            <GameEndDialog isOpen={dialogOpen} onButton={handleRestartGame}/>
        </div>
    );
}
