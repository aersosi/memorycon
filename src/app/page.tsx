import Game from "@/app/game";
import { GameProvider } from "@/contexts/gameContext"

export default function Home() {
    return (
        <GameProvider>
            <Game />
        </GameProvider>
    );
}