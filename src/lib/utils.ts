import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Filterfunktion, die maximal zwei gleiche Elemente behält
export const filterToMaxTwo = <T>(array: T[]): T[] => {
    const counts = new Map<T, number>();
    const filtered: T[] = [];

    for (const item of array) {
        const count = counts.get(item) ?? 0;
        if (count < 2) {
            filtered.push(item);
            counts.set(item, count + 1);
        }
    }
    return filtered;
}

export const shuffleArray = <T>(array: T[]): T[] => {
    // Filtere Array auf max 2 Vorkommen pro Element
    const filtered = filterToMaxTwo(array);

    // Shuffle filtered array
    let currentIndex = filtered.length;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [filtered[currentIndex], filtered[randomIndex]] = [filtered[randomIndex], filtered[currentIndex]];
    }

    return filtered;
}

export function findDuplicateEmojiIndex(cardEmojis: string[], availableCards: number[]): [number, number] | null {
    const seen: Record<string, number[]> = {};

    // Collect indices of each emoji in availableCards
    for (const index of availableCards) {
        const emoji = cardEmojis[index];

        // create empty array for new emoji
        if (!(emoji in seen)) seen[emoji] = [];
        // save emoji index
        seen[emoji].push(index);
    }

    // Check collected emojis for duplicates
    for (const emoji in seen) {
        if (seen[emoji].length > 2) {
            console.warn(`More than 2 "${emoji}" found in cardEmojis.`);
            continue;
        }
        // Return indices of the first duplicate pair found
        if (seen[emoji].length === 2) return [seen[emoji][0], seen[emoji][1]];
    }
    return null;
}




