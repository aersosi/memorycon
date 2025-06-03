export type GameState = {
    allCards: string[];
    foundMatches: string[];
    flippedCardIndices: number[];
    isGameEnd: boolean;
    previewCards: boolean;
    playersRound: {
        isRoundHuman: boolean;
        humanName: string;
        humanPoints: number;
        computerPoints: number;
    };
    showGame: boolean;
    gameMode: {
        isEasy: boolean;
    };
};

export const getGameConfig = (isEasy: boolean) => ({
    previewTime: isEasy ? 10 : 2,
    turnTime: isEasy ? 10 : 5,
    title: isEasy ? "Easy Peasy" : "Go Hard",
    description: isEasy ? "memorycon easy game" : "memorycon hard game",
});

export const gameStateInitial: GameState = {
    allCards: [
        "🧠", "🧠",
        "🦆", "🦆",
        "💰", "💰", "🌻", "🌻",
        // "🌝", "🌝", "🔥", "🔥", "🍉", "🍉", "💎", "💎", "🚀", "🚀",
        // "🕹️", "🕹️", "⚔️", "⚔️", "🛒", "🛒", "❤️", "❤️", "❓", "❓", "🔔", "🔔", "🏴‍☠️", "🏴‍☠️", "🕶️", "🕶️", "🧯", "🧯"
    ],
    foundMatches: [],
    isGameEnd: false,
    flippedCardIndices: [],
    previewCards: true,
    playersRound: {
        isRoundHuman: true,
        humanName: "Human",
        humanPoints: 0,
        computerPoints: 0,
    },
    showGame: false,
    gameMode: {
        isEasy: true,
    }
}