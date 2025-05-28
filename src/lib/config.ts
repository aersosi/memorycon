export type GameState = {
    allCards: string[];
    foundMatches: string[];
    isGameEnd: boolean;
    previewCards: boolean;
    playersRound: {
        isRoundHuman: boolean;
        humanPoints: number;
        computerPoints: number;
    };
    gameMode: {
        isEasy: boolean;
        gameEasy: {
            title: string;
            description: string;
            previewCardsTime: number;
            turnTime: number;
        };
        gameHard: {
            title: string;
            description: string;
            previewCardsTime: number;
            turnTime: number;
        };
    };
};

export const gameStateInitial: GameState = {
    allCards: [
        "🧠", "🧠", "🦆", "🦆",
        // "💰", "💰", "🌻", "🌻",
        // "🌝", "🌝", "🔥", "🔥", "🍉", "🍉", "💎", "💎", "🚀", "🚀",
        // "🕹️", "🕹️", "⚔️", "⚔️", "🛒", "🛒", "❤️", "❤️", "❓", "❓", "🔔", "🔔", "🏴‍☠️", "🏴‍☠️", "🕶️", "🕶️", "🧯", "🧯"
    ],
    foundMatches: [],
    isGameEnd: false,
    previewCards: true,
    playersRound: {
        isRoundHuman: true,
        humanPoints: 0,
        computerPoints: 0,
    },
    gameMode: {
        isEasy: true,
        gameEasy: {
            title: "Easy Peasy",
            description: "memorycon easy game",
            previewCardsTime: 3,
            turnTime: 10
        },
        gameHard: {
            title: "Go Hard",
            description: "memorycon hard game",
            previewCardsTime: 1,
            turnTime: 5
        }
    }
}