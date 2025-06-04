export type GameState = {
    // Game Data
    allCards: string[];
    foundMatches: string[];
    flippedCardIndices: number[];

    // Game Status
    isGameEnd: boolean;
    previewCards: boolean;
    showGame: boolean;
    gameModeEasy: boolean;

    // Player Data
    isRoundHuman: boolean;
    humanName: string;
    humanPoints: number;
    computerPoints: number;
};

export const gameConfig = (gameModeEasy: boolean) => ({
    previewTime: gameModeEasy ? 10 : 5,
    turnTime: gameModeEasy ? 10 : 5,
    title: gameModeEasy ? "Easy Peasy" : "Go Hard",
    description: gameModeEasy ? "memorycon easy game" : "memorycon hard game",
});

export const gameStateInitial: GameState = {
    // Game Data
    allCards: [
        "🧠", "🧠",
        "🦆", "🦆",
        // "💰", "💰", "🌻", "🌻",
        // "🌝", "🌝", "🔥", "🔥", "🍉", "🍉", "💎", "💎", "🚀", "🚀",
        // "🕹️", "🕹️", "⚔️", "⚔️", "🛒", "🛒", "❤️", "❤️", "❓", "❓", "🔔", "🔔", "🏴‍☠️", "🏴‍☠️", "🕶️", "🕶️", "🧯", "🧯"
    ],
    foundMatches: [],
    flippedCardIndices: [],

    // Game Status
    isGameEnd: false,
    previewCards: true,
    showGame: false,
    gameModeEasy: true,

    // Player Data
    isRoundHuman: true,
    humanName: "Human",
    humanPoints: 0,
    computerPoints: 0,
}