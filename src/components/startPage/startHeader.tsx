export default function StartHeader() {
    return (
        <header className="flex flex-col gap-16 justify-between">
            <div className="flex flex-col justify-between items-center text-holi-500">
                <p className="text-4xl">Wilkommen zu</p>
                <h1 className="text-7xl font-semibold">memorycon</h1>
            </div>
            <p className="text-center text-balance text-2xl max-w-3/4 mx-auto">
                Wählen Sie einen Schwierigkeitsgrad, um das Spiel zu starten. Wer beginnt, wird zufällig bestimmt.
            </p>
        </header>
    );
}