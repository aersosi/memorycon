export type GameState = {
    allCards: string[];
    foundMatches: string[];
    isGameEnd: boolean;
    previewCards: boolean;
    playersRound: {
        isRoundHuman: boolean;
        humanName: string;
        humanPoints: number;
        computerPoints: number;
    };
    gameMode: {
        showGame: boolean;
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
        humanName: "Human",
        humanPoints: 0,
        computerPoints: 0,
    },
    gameMode: {
        showGame: false,
        isEasy: true,
        gameEasy: {
            title: "Easy Peasy",
            description: "memorycon easy game",
            previewCardsTime: 10,
            turnTime: 10
        },
        gameHard: {
            title: "Go Hard",
            description: "memorycon hard game",
            previewCardsTime: 5,
            turnTime: 5
        }
    }
}