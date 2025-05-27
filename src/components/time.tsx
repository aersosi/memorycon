import Countdown from "@/components/countdown";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { useEffect } from "react";

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
        dispatch({type: 'NEXT_ROUND'}) // go next round
    }

    useEffect(() => {
        console.log(gameState.previewCards);
    }, [gameState.previewCards]);

    return (
        <>
            {gameState.previewCards ?
                <p>
                    <span>Preview Cards: </span>
                    <Countdown initialTime={previewCardsTime}/>
                </p> :
                <p>
                    <span>Round: </span>
                    <Countdown initialTime={turnTime} onTimeOver={handleRoundTimeOver}/>
                </p>
            }

        </>
    );
}

