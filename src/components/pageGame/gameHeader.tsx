import GameTime from "@/components/pageGame/gameTime";
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
        <header className="flex flex-col gap justify-between text-xl w-full">
            <div className="flex gap-x-4 justify-between items-end flex-wrap">
                <h1 className="hidden sm:block text-h2-font-size-fluid font-semibold">memorycon</h1>
                <h1 className="flex gap-4 justify-between w-full sm:hidden text-h2-font-size-fluid font-semibold">
                    <span>memorycon</span>
                    <span className="font-normal opacity-50">{gameModeText}</span>
                </h1>
                <p className={`w-full sm:w-fit text-h2-font-size-fluid ${textColorRound}`}>{playerNameText} ist dran</p>
            </div>
            <div className="flex gap-x-4 justify-between w-full flex-wrap">
                <p className="hidden sm:inline">
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

                <GameTime/>
            </div>
        </header>
    );
}