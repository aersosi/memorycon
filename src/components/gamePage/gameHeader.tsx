import Time from "@/components/time";
import { useGameState } from "@/contexts/gameContext";

export default function GameHeader() {
    const gameState = useGameState();

    return (
        <header className="flex flex-col gap-4 justify-between">
            <div className="flex gap-8 justify-between items-end">
                <div className="flex gap-4 items-end">
                    <h1 className={`text-4xl font-semibold ${gameState.playersRound.isRoundHuman ? "text-holi-500" : "text-amber-500"}`}>
                        memorycon
                    </h1>
                    <p className="text-3xl">
                        {gameState.gameMode.isEasy ? "Easy Peasy" : "Go Hard"}
                    </p>
                </div>
                <p className={`text-3xl ${gameState.playersRound.isRoundHuman ? "text-holi-500" : "text-amber-500"}`}>
                    {gameState.playersRound.isRoundHuman ? "Human" : "Computer"}
                </p>
            </div>
            <div className="flex gap-8 justify-between">
                <div className="flex gap-4">
                    <p>Human Points: <span className="font-bold">{gameState.playersRound.humanPoints}</span></p>
                    <p>Computer Points: <span className="font-bold">{gameState.playersRound.computerPoints}</span>
                    </p>
                </div>
                <Time/>
            </div>
        </header>
    );
}