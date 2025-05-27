"use client"

import Card from "@/components/card";
import Time from "@/components/time";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { shuffleArray } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Game() {
    const gameState = useGameState();
    const dispatch = useGameDispatch();
    const [cardEmojis, setCardEmojis] = useState([]);
    const [flippedCards, setFlippedEmojis] = useState<string[]>([]);

    const [gameFlips, setGameFlips] = useState(0);
    const [currentFlipCount, setCurrentFlipCount] = useState(0);

    useEffect(() => {
        console.log('GameState:', gameState);
        setCardEmojis(shuffleArray(gameState.allCards))
    }, []);

    const handleGameFlips = () => {
        setCurrentFlipCount((prev) => {
            const newCount = prev + 1;
            if (newCount === 2) {
                setGameFlips((prevFlips) => prevFlips + 1 / 2);
                return 0;
            }
            return newCount;
        });
    };

    const handleFlippedEmojis = (Emoji: string) => {
        setFlippedEmojis((prev) => [...prev, Emoji]);
    };


    // core logic
    useEffect(() => {
        if (flippedCards.length === 2) {
            const [first, second] = flippedCards;
            if (first === second) { // match found

                // Beide Karten in `[foundMatches]`

                dispatch({type: 'PUSH_FOUND_MATCHES', payload: [first, second]});
                console.log('foundMatches:', gameState.foundMatches);

                // punkte erhöhen
                gameState.playersRound.isRoundHuman
                    ? dispatch({type: 'INCREMENT_HUMAN_POINTS', payload: 1})
                    : dispatch({type: 'INCREMENT_COMPUTER_POINTS', payload: 1});

            } else { // no match

                console.log("No match 😢");
            }

            const cleanup = setTimeout(() => {
                dispatch({type: 'NEXT_ROUND'}) // go next round
                setFlippedEmojis([]); // clear already flipped cards
            }, 1000);

            return () => clearTimeout(cleanup);
        }
    }, [flippedCards, gameFlips]);


    return (
        <div className="h-full flex flex-col gap-4">
            <header className="flex flex-col gap-4 justify-between">
                <div className="flex gap-8">
                    <h1 className="text-5xl font-semibold">
                        {gameState.gameMode.isEasy ? "Easy " : "Hard "} memorycon
                    </h1>

                    <Time/>
                </div>
                <div className="flex gap-8">
                    <p>{gameState.playersRound.isRoundHuman ? "Human Round" : "Computer Round"}</p>
                    <p>Flips: {gameFlips}</p>
                    <p>humanPoints: {gameState.playersRound.humanPoints}</p>
                    <p>computerPoints: {gameState.playersRound.computerPoints}</p>
                </div>
            </header>

            <main className="grow grid grid-cols-6 grid-rows-6 gap-4">
                {cardEmojis.map((Emoji: string, i) =>
                    <Card
                        key={i}
                        emoji={Emoji}
                        onFlip={handleGameFlips}
                        onEmoji={(emoji) => handleFlippedEmojis(emoji)}
                    />
                )}
            </main>

            <footer>
                <p className="text-3xl">
                    Lorem: {flippedCards.join(" ")}
                </p>
            </footer>
        </div>
    );
}