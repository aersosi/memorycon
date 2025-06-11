import StartInput from "@/components/pageStart/startInput";
import { Button } from "@/components/ui/button";
import { useGameDispatch } from "@/contexts/gameContext";
import { useEffect } from "react";

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

    useEffect(() => {
        document.title = 'memorycon';
    }, []);

    return (
        <div className="flex flex-col items-center justify-between gap-6 sm:gap-12 h-full sm:h-auto w-full max-w-[720px] border bg-background/60 rounded-xl p-[var(--16-64)] sm:py-12">
            <header className="flex flex-col justify-between items-center w-full">
                <h2 className="text-h2-font-size-fluid ">Willkommen zu</h2>
                <h1 className="text-h1-font-size-fluid leading-h1-fluid le ading-8 font-semibold">memorycon</h1>
            </header>

            <div className="grid gap-3 w-full">
                <StartInput/>
            </div>

            <p className="text-center text-balance text-lg font-semibold w-full">
                Wählen Sie einen Schwierigkeitsgrad, um das Spiel zu beginnen. <br/>
                Welcher Spieler beginnt, wird zufällig bestimmt.
            </p>
            <div className="flex flex-col gap-4 w-full pb-4">
                <Button onClick={goEasy} className="grow" variant="outline">
                    Easy Peasy
                </Button>
                <Button onClick={goHard} className="grow" variant="outline">
                    Go Hard
                </Button>
            </div>
        </div>
    );
}