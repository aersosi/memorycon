import { useWinnerString } from "@/hooks/useStrings";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { useGameState } from "@/contexts/gameContext";
import { GameEndDialogProps } from "@/types/props";

export default function GameEndDialog({isOpen, onButton,}: GameEndDialogProps) {
    const {humanPoints, computerPoints} = useGameState();

    const title = useWinnerString("Du hast gewonnen!", "Du hast verloren!", "Gleichstand!");
    const bodyCopy = useWinnerString("😍", "😭", "😑");

    return (
        <Dialog open={isOpen} onOpenChange={onButton}>
            <DialogContent hideClose>
                <DialogHeader>
                    <DialogTitle className="text-3xl text-center text-accent">{title}</DialogTitle>
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
                        <Button type="button" variant="outline">
                            Nochmal Spielen!
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

