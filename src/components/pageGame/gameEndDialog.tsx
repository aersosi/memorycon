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
                    <DialogTitle className="text-3xl text-center">{title}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-1 text-xl py-2 flex-wrap">
                    <p><span className="text-primary">Deine Punkte: </span>{humanPoints}</p>
                    <p><span className="text-amber-200">Computer Punkte: </span>{computerPoints}</p>
                </div>
                <p className="text-7xl py-6 text-center">
                    {bodyCopy}
                </p>
                <DialogFooter>
                    <DialogClose asChild className="mx-auto">
                        <Button type="button" variant="outline">
                            Nochmal Spielen!
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

