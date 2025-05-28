import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shuffleArray = <T>(array: T[]): T[] => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export function findDuplicates(cardEmojis: string[], availableCards: number[]): [number, number] | null {
    const seen: Record<string, number> = {};

    for (const index of availableCards) {
        const emoji = cardEmojis[index];
        if (emoji in seen) {
            return [seen[emoji], index];
        } else {
            seen[emoji] = index;
        }
    }

    return null;
}


