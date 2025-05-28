import GamePage from "@/components/gamePage/gamePage";
import { GameProvider } from "@/contexts/gameContext"

export default function Home() {
    return (
        <GameProvider>
            <GamePage />
        </GameProvider>
    );
}