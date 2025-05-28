import Time from "@/components/time";
import { useGameState } from "@/contexts/gameContext";
import { useRoundHumanString } from "@/hooks/useStrings";
import { useRoundStyles } from "@/hooks/useStyles";
import { cn } from "@/lib/utils";

export default function GameHeader() {
    const gameState = useGameState();
    const {textColorRound} = useRoundStyles();
    const playerNameText = useRoundHumanString(gameState.playersRound.humanName, "Computer");

    const {playersRound, gameMode} = gameState;
    const {humanPoints, computerPoints, humanName} = playersRound;

    const gameModeText = gameMode.isEasy ? "Easy Peasy" : "Go Hard";

    return (
        <header className="flex flex-col gap-4 justify-between text-xl">
            <div className="flex gap-8 justify-between items-end">
                <div className="flex gap-4 items-end">
                    <h1 className={cn(`text-4xl font-semibold ${textColorRound}`)}>memorycon</h1>
                    <span className="text-4xl opacity-50"> | </span>
                    <p className="text-3xl opacity-50">{gameModeText}</p>
                </div>
                <p className={cn(`text-3xl ${textColorRound}`)}>{playerNameText}</p>
            </div>
            <div className="flex gap-8 justify-between">
                <div className="flex gap-4">
                    <p>{humanName}: <span className="font-bold">{humanPoints}</span></p>
                    <p>Computer: <span className="font-bold">{computerPoints}</span></p>
                </div>
                <Time/>
            </div>
        </header>
    );
}