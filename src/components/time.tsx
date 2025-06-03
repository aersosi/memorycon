import Countdown from "@/components/countdown";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";

export default function Time() {
    const gameState = useGameState();
    const dispatch = useGameDispatch();

    const {playersRound, gameMode} = gameState;
    const {gameEasy, gameHard} = gameMode;
    const turnTime = gameMode.isEasy ? gameEasy.turnTime : gameHard.turnTime;
    const previewCardsTime = gameMode.isEasy ? gameEasy.previewCardsTime : gameHard.previewCardsTime;

    const nextRound = () => {
        dispatch({ type: "RESET_FLIPPED" });
        dispatch({type: 'NEXT_ROUND'})
    }

    const endCardPreview = () => {
        dispatch({type: 'END_PREVIEW'}) // end card preview
    }

    return (
        <>
            {gameState.previewCards ? (
                <p>
                    <span>Vorschauzeit: </span>
                    <Countdown
                        key="preview"
                        initialTime={previewCardsTime}
                        onTimeOver={endCardPreview}
                    />
                </p>
            ) : (
                <p className="flex gap-1">
                    <span>Rundenzeit: </span>
                    <span className="w-7 text-center">
                        <Countdown
                            key={`${playersRound.isRoundHuman}`}
                            initialTime={turnTime}
                            onTimeOver={nextRound}
                        />
                    </span>
                    <span> Sek.</span>
                </p>
            )}
        </>
    );
}