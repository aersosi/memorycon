import StartHeader from "@/components/startPage/startHeader";
import StartInput from "@/components/startPage/startInput";
import { Button } from "@/components/ui/button";
import { useGameDispatch, useGameState } from "@/contexts/gameContext";

export default function StartPage() {
    const dispatch = useGameDispatch();
    const gameState = useGameState();

    const goEasy = () => {
        dispatch({type: 'SET_GAME_MODE', payload: true})
        dispatch({type: 'SHOW_GAME', payload: true})
    }

    const goHard = () => {
        dispatch({type: 'SET_GAME_MODE', payload: false})
        dispatch({type: 'SHOW_GAME', payload: true})
    }

    return (
        <div className="h-full flex flex-col items-center gap-16 p-12">
            <StartHeader/>
            <div className="flex flex-col gap-4 w-full max-w-lg">
                <StartInput></StartInput>

                <Button onClick={goEasy} className="grow">
                    {gameState.gameMode.gameEasy.title}
                </Button>
                <Button onClick={goHard} className="grow">
                    {gameState.gameMode.gameHard.title}
                </Button>
            </div>
        </div>
    );
}