import StartHeader from "@/components/pageStart/startHeader";
import StartInput from "@/components/pageStart/startInput";
import { Button } from "@/components/ui/button";
import { useGameDispatch } from "@/contexts/gameContext";

export default function StartPage() {
    const dispatch = useGameDispatch();

    const goEasy = () => {
        dispatch({type: 'SET_GAME_EASY', payload: true})
        dispatch({type: 'SHOW_GAME', payload: true})
    }

    const goHard = () => {
        dispatch({type: 'SET_GAME_EASY', payload: false})
        dispatch({type: 'SHOW_GAME', payload: true})
    }

    return (
        <div className="h-full flex flex-col items-center gap-16 p-12">
            <StartHeader/>
            <div className="flex flex-col gap-4 w-full max-w-lg">
                <StartInput></StartInput>

                <Button onClick={goEasy} className="grow">
                    Easy Peasy
                </Button>
                <Button onClick={goHard} className="grow">
                    Go Hard
                </Button>
            </div>
        </div>
    );
}