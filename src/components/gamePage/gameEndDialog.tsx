import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGameState } from "@/contexts/gameContext";

type GameEndDialogProps = {
    isOpen?: boolean,
    onButton?: () => void
}

export default function GameEndDialog({isOpen, onButton,}: GameEndDialogProps) {
    const gameState = useGameState();

    const winnerText = (humanText: string, computerText: string, drawText: string) => {
        const {humanPoints, computerPoints} = gameState.playersRound;
        if (humanPoints > computerPoints) return humanText;     // human wins
        if (humanPoints < computerPoints) return computerText;  // computer wins
        return drawText;                                        // draw
    };

    const title = winnerText(
        "Du hast gewonnen!",
        "Du hast verloren!",
        "Gleichstand!",
    )

    const bodyCopy = winnerText(
        "😍",
        "😭",
        "😑",
    )

    return (
        <Dialog open={isOpen} onOpenChange={onButton}>
            <DialogContent hideClose>
                <DialogHeader>
                    <DialogTitle className="text-3xl text-center">{title}</DialogTitle>
                </DialogHeader>

                <p className="text-7xl py-6 text-center">
                    {bodyCopy}
                </p>

                <DialogFooter>
                    <DialogClose asChild className="w-1/2 mx-auto">
                        <Button type="button">
                            Nochmal Spielen!
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

