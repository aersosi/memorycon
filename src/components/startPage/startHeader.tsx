import { cn } from "@/lib/utils";

export default function StartHeader() {
    return (
        <header className="flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-0 justify-between items-center">
                <p className={cn(`text-3xl`)}>Wilkommen zu</p>
                <h1 className={cn(`text-7xl font-semibold text-holi-500`)}>memorycon</h1>
            </div>
            <div className="flex gap-8 justify-between">
                {/*<div className="flex gap-4">*/}
                {/*    <p>Human Points: <span className="font-bold">Lorem</span></p>*/}
                {/*    <p>Computer Points: <span className="font-bold">Lorem</span></p>*/}
                {/*</div>*/}

                Schreiben Sie ihren Namen, oder lassen das feld frei
                und wählen Sie einen Schwierigkeitsgrad
            </div>
        </header>
    );
}