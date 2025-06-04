import Time from "@/components/time";
import { useGameState } from "@/contexts/gameContext";
import { useRoundHumanString } from "@/hooks/useStrings";
import { useRoundStyles } from "@/hooks/useStyles";
import { gameConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function GameHeader() {
    const gameState = useGameState();
    const {humanPoints, computerPoints, humanName, gameModeEasy} = gameState;
    const config = gameConfig(gameModeEasy);

    const {textColorRound} = useRoundStyles();
    const playerNameText = useRoundHumanString(humanName, "Computer");
    const gameModeText = config.title;

    return (
        <header className="flex flex-col gap-4 justify-between text-xl w-full">
            <div className="flex gap-8 justify-between items-end">
                <h1 className={cn(`text-4xl font-semibold`)}>memorycon</h1>
                <p className={cn(`text-3xl ${textColorRound}`)}>{playerNameText} ist dran</p>
            </div>
            <div className="flex gap-4 justify-between w-full">
                <p className="">
                    <span className={cn(`${textColorRound}`)}>Modus: </span>
                    <span className="font-semibold">{gameModeText}</span>
                </p>

                <div className="flex gap-6">
                    <p>
                        <span className={cn(`${textColorRound}`)}>{humanName}: </span>
                        <span className="font-semibold">{humanPoints}</span>
                    </p>
                    <p>
                        <span className={cn(`${textColorRound}`)}>Computer: </span>
                        <span className="font-semibold">{computerPoints}</span>
                    </p>
                </div>

                <Time/>
            </div>
        </header>
    );
}