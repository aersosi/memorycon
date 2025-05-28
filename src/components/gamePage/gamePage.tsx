"use client"

import Card from "@/components/card";
import GameEndDialog from "@/components/gamePage/gameEndDialog";
import GameHeader from "@/components/gamePage/gameHeader";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { shuffleArray } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function GamePage() {
    const gameState = useGameState();
    const dispatch = useGameDispatch();

    const [cardEmojis, setCardEmojis] = useState<string[]>([]);
    const [flippedCardIndices, setFlippedCardIndices] = useState<number[]>([]);

    useEffect(() => {
        console.log('GameState:', gameState); // todo: delete log
        setCardEmojis(shuffleArray([...gameState.allCards]));
    }, []);

    const handleCardFlip = (cardIndex: number) => {

        // todo: if hard-mode and computerturn return on 4
        if (flippedCardIndices.length >= 2) return;

        // Ignore if game is in preview mode or if card is already flipped or found
        if (gameState.previewCards ||
            flippedCardIndices.includes(cardIndex) ||
            gameState.foundMatches.includes(cardEmojis[cardIndex])) {
            return;
        }
        setFlippedCardIndices(prev => [...prev, cardIndex]);
    };

    // Core game logic
    useEffect(() => {
        if (flippedCardIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedCardIndices;
            const firstEmoji = cardEmojis[firstIndex];
            const secondEmoji = cardEmojis[secondIndex];

            if (firstEmoji === secondEmoji) {
                // Add to found matches
                dispatch({type: 'PUSH_FOUND_MATCHES', payload: [firstEmoji, secondEmoji]});

                // Give points to current player
                if (gameState.playersRound.isRoundHuman) {
                    dispatch({type: 'INCREMENT_HUMAN_POINTS', payload: 1});
                } else {
                    dispatch({type: 'INCREMENT_COMPUTER_POINTS', payload: 1});
                }
            }

            // Clear flipped cards and switch turns after delay
            const cleanup = setTimeout(() => {
                setFlippedCardIndices([]);
                dispatch({type: 'NEXT_ROUND'});
            }, 1000);

            return () => clearTimeout(cleanup);
        }
    }, [flippedCardIndices, cardEmojis, dispatch, gameState.playersRound.isRoundHuman]);

    // Computer's turn logic
    useEffect(() => {

        if (!gameState.playersRound.isRoundHuman) {
            const computerTurnTimeout = setTimeout(() => {
                // 1. Finde alle Indizes von Karten, die noch nicht aufgedeckt wurden.
                const availableCardIndices = cardEmojis
                    .map((emoji, index) => {
                        if (gameState.foundMatches.includes(emoji)) return null;
                        return index;
                    }); // Entferne Null-Werte

                if (availableCardIndices.length >= 2) {
                    const shuffledIndices = shuffleArray(availableCardIndices);
                    const firstIndexToFlip = shuffledIndices[0];
                    const secondIndexToFlip = shuffledIndices[1];

                    const firstFlip = setTimeout(() => {
                        handleCardFlip(firstIndexToFlip);
                    }, 500);
                    const secondFlip = setTimeout(() => {
                        handleCardFlip(secondIndexToFlip);
                    }, 1000);

                    return () => {
                        clearTimeout(firstFlip)
                        clearTimeout(secondFlip)
                    };
                }
            }, 1000);
            return () => clearTimeout(computerTurnTimeout);
        }
    }, [gameState.playersRound.isRoundHuman, cardEmojis, gameState.foundMatches, handleCardFlip]);

    const [gameEndDialogOpen, setGameEndDialogOpen] = useState(false);


    // game end
    useEffect(() => {
        // wenn alle karten umgedreht dialog öffnen
        if (gameState.foundMatches.length === gameState.allCards.length) {
            dispatch({type: 'GAME_END'});
            setGameEndDialogOpen(true);
        }

        // timer abstellen
        // punkte in modal
        // neues spiel starten
        // turning vom computer abstellen todo: turning soll nur wenn gameState.isGameEnd === false
        // todo: die karten sind immer gleich, nicht richtig geshuffelt
        //  vielleicht muss man bewusst shuffeln?
        // todo: der fucking computer flippt manchmal nur eine Karte
        // todo: manchmal ist das game einfach vorbei, wenn nicht alle karten aufgedeckt sind


    }, [gameState.foundMatches]);

    const handleRestartGame = () => {
        setGameEndDialogOpen(false);
        const restartGame = setTimeout(() => {
            dispatch({type: 'RESET_GAME'});
        }, 1000);

        return () => clearTimeout(restartGame);
    }

    return (
        <div className="h-full flex flex-col gap-4">
            <GameHeader/>

            <main className="grow grid grid-cols-6 grid-rows-6 gap-4">
                {cardEmojis.map((emoji: string, i) =>
                    <Card
                        key={i}
                        emoji={emoji}
                        isFlipped={flippedCardIndices.includes(i)}
                        isFound={gameState.foundMatches.includes(emoji)}
                        isPreview={gameState.previewCards}
                        onFlip={() => handleCardFlip(i)}
                    />
                )}
            </main>

            <footer>
                <p className="text-3xl">
                    Flipped: {flippedCardIndices.map(i => cardEmojis[i]).join(" ")}
                </p>
            </footer>

            <GameEndDialog isOpen={gameEndDialogOpen} onButton={handleRestartGame}/>
        </div>
    );
}