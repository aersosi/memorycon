"use client"

import Card from "@/components/card";
import { config } from "@/lib/config";
import { shuffleArray } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
    const isEasy = true;

    const [cardSymbols, setCardSymbols] = useState([]);
    const [flippedSymbols, setFlippedSymbols] = useState<string[]>([]);

    const [gameFlips, setGameFlips] = useState(0);
    const [currentFlipCount, setCurrentFlipCount] = useState(0);
    const [isMatch, setIsMatch] = useState(false);

    useEffect(() => {
        setCardSymbols(shuffleArray(config.cardSymbols))
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

    const handleFlippedSymbols = (symbol: string) => {
        setFlippedSymbols((prev) => [...prev, symbol]);
    };

    useEffect(() => {
        if (flippedSymbols.length === 2) {
            const [first, second] = flippedSymbols;

            if (first === second) {
                console.log("Match! 🎉");
                setIsMatch(true)
            } else {
                console.log("No match 😢");
            }

            setTimeout(() => {
                setFlippedSymbols([]);
            }, 1000);
        }
    }, [flippedSymbols]);


    return (
        <div className="h-full flex flex-col gap-4">
            <header className="flex gap-4 justify-between items-end">
                <h1 className="text-5xl font-semibold text-hollisticon-50">
                    memorycon
                </h1>
                <p className="text-3xl text-hollisticon-50">Flips: {gameFlips}</p>
            </header>

            <main className="grow grid grid-cols-6 grid-rows-6 gap-4">
                {cardSymbols.map((symbol: string, i) =>
                    <Card
                        key={i}
                        symbol={symbol}
                        isEasy={isEasy}
                        onFlip={handleGameFlips}
                        onSymbol={(symbol) => handleFlippedSymbols(symbol)}
                        isMatch={isMatch}
                    />
                )}
            </main>

            <footer>
                <p className="text-3xl text-hollisticon-50">Lorem: {flippedSymbols}</p>
            </footer>
        </div>
    );
}