import Countdown from "@/components/countdown";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";

export default function Time() {
    const gameState = useGameState();
    const dispatch = useGameDispatch();

    const turnTime = gameState.gameMode.isEasy
        ? gameState.gameMode.gameEasy.turnTime
        : gameState.gameMode.gameHard.turnTime;

    const previewCardsTime = gameState.gameMode.isEasy
        ? gameState.gameMode.gameEasy.previewCardsTime
        : gameState.gameMode.gameHard.previewCardsTime;

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
                    />
                </p>
            ) : (
                <p className="flex gap-1">
                    <span>Time: </span>
                    <span className="w-4 text-center">
                        <Countdown
                            key={`round-${gameState.playersRound.isRoundHuman}`}
                            initialTime={turnTime}
                            onTimeOver={handleRoundTimeOver}
                        />
                    </span>
                    <span> Sek.</span>
                </p>
            )}
        </>
    );
}