import { useWinnerStyles } from "@/hooks/useStyles";
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
import { cn, isWinnerString } from "@/lib/utils";

type GameEndDialogProps = {
    isOpen?: boolean,
    onButton?: () => void
}

export default function GameEndDialog({isOpen, onButton,}: GameEndDialogProps) {
    const gameState = useGameState();
    const { textColorWinner } = useWinnerStyles();

    const {humanPoints, computerPoints} = gameState.playersRound;
    const title = isWinnerString("Du hast gewonnen!", "Du hast verloren!", "Gleichstand!");
    const bodyCopy = isWinnerString("😍", "😭", "😑");

    return (
        <Dialog open={isOpen} onOpenChange={onButton}>
            <DialogContent hideClose>
                <DialogHeader>
                    <DialogTitle className={cn(`text-3xl text-center ${textColorWinner}`)}>{title}</DialogTitle>
                </DialogHeader>

                <div className="flex justify-center gap-4 text-xl py-2">
                    <p>Deine Punkte: {humanPoints}</p>
                    <p>Computer Punkte: {computerPoints}</p>
                </div>
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

