import Time from "@/components/time";
import { useGameState } from "@/contexts/gameContext";
import { useRoundStyles } from "@/hooks/useStyles";
import { cn, isRoundHumanString } from "@/lib/utils";

export default function GameHeader() {
    const gameState = useGameState();
    const {textColorRound} = useRoundStyles();
    const playerNameText = isRoundHumanString("Human", "Computer");

    const {playersRound, gameMode} = gameState;
    const {humanPoints, computerPoints} = playersRound;

    const gameModeText = gameMode.isEasy ? "Easy Peasy" : "Go Hard";

    return (
        <header className="flex flex-col gap-4 justify-between">
            <div className="flex gap-8 justify-between items-end">
                <div className="flex gap-4 items-end">
                    <h1 className={cn(`text-4xl font-semibold ${textColorRound}`)}>memorycon</h1>
                    <span className="text-4xl"> | </span>
                    <p className="text-3xl">{gameModeText}</p>
                </div>
                <p className={cn(`text-3xl ${textColorRound}`)}>{playerNameText}</p>
            </div>
            <div className="flex gap-8 justify-between">
                <div className="flex gap-4">
                    <p>Human Points: <span className="font-bold">{humanPoints}</span></p>
                    <p>Computer Points: <span className="font-bold">{computerPoints}</span></p>
                </div>
                <Time/>
            </div>
        </header>
    );
}