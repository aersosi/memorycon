import Countdown from "@/components/countdown";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";

export default function Time() {
    const gameState = useGameState();
    const dispatch = useGameDispatch();

    const {playersRound, gameMode, isGameEnd} = gameState;
    const {gameEasy, gameHard} = gameMode;
    const turnTime = gameEasy ? gameEasy.turnTime : gameHard.turnTime;
    const previewCardsTime = gameEasy ? gameEasy.previewCardsTime : gameHard.previewCardsTime;

    const handleRoundTimeOver = () => {
        dispatch({type: 'NEXT_ROUND'}) // go to next round
    }

    const handlePreviewTimeOver = () => {
        dispatch({type: 'END_PREVIEW'}) // end card preview
    }

    return (
        <>
            {gameState.previewCards ? (
                <p>
                    <span>Preview Cards: </span>
                    <Countdown
                        key="preview"
                        initialTime={previewCardsTime}
                        onTimeOver={handlePreviewTimeOver}
                        stopOn={false}
                    />
                </p>
            ) : (
                <p className="flex gap-1">
                    <span>Time: </span>
                    <span className="w-4 text-center">
                        <Countdown
                            key={`${playersRound.isRoundHuman}`}
                            initialTime={turnTime}
                            onTimeOver={handleRoundTimeOver}
                            stopOn={isGameEnd} // stop on GameEnd
                        />
                    </span>
                    <span> Sek.</span>
                </p>
            )}
        </>
    );
}