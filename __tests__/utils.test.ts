import { filterToMaxTwo, findDuplicateEmojiIndex, shuffleArray } from "@/lib/utils";


describe('filterToMaxTwo', () => {
    it('should handle mixed types correctly', () => {
        const input = [1, '🐶', 1, '🐶', true, true, true];
        const expected = [1, '🐶', 1, '🐶', true, true];
        expect(filterToMaxTwo(input)).toEqual(expect.arrayContaining(expected));
        expect(filterToMaxTwo(input).length).toBe(6);
    });

    it('should return empty array for empty input', () => {
        const input: string[] = [];
        expect(filterToMaxTwo(input)).toEqual([]);
    });

    it('should return same array if no duplicates', () => {
        const input = ['x', 'y', 'z'];
        const expected = ['x', 'y', 'z'];
        expect(filterToMaxTwo(input)).toEqual(expected);
    });
});


describe('shuffleArray', () => {
    it('should shuffle the array while preserving all elements and types', () => {
        const originalArr = [1, '🐶', true, { foo: 'bar' }, null, undefined, [1, 2], Symbol('s')];
        const copy = [...originalArr];

        const result = shuffleArray(copy);

        // same length
        expect(result).toHaveLength(originalArr.length);

        // same elements
        originalArr.forEach(item => {
            expect(result).toContain(item);
        });

        // one element in the mixed array is in a different position than in the original
        const isShuffled = result.some((val, idx) => val !== originalArr[idx]);

        // if array.length is <= 1 we allow it to be shuffled
        const isTriviallyShuffled = originalArr.length > 1 ? isShuffled : true;

        expect(isTriviallyShuffled).toBe(true);
    });
});

describe('findDuplicateEmojiIndex', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        (console.warn as jest.Mock).mockRestore();
    });

    it('should return indices of the first duplicate emoji in availableCards', () => {
        const cardEmojis = ['🐶', '🐱', '🐶'];
        const availableCards = [0, 1, 2];
        const result = findDuplicateEmojiIndex(cardEmojis, availableCards);
        expect(result).toEqual([0, 2]);
        expect(console.warn).not.toHaveBeenCalled();
    });

    it('should return null if no duplicates are found', () => {
        const cardEmojis = ['🐶', '🐱', '🐭'];
        const availableCards = [0, 1, 2];
        const result = findDuplicateEmojiIndex(cardEmojis, availableCards);
        expect(result).toBeNull();
        expect(console.warn).not.toHaveBeenCalled();
    });

    it('should warn and ignore emojis with more than 2 duplicates', () => {
        const cardEmojis = ['🐶', '🐶', '🐶', '🐱', '🐱'];
        const availableCards = [0, 1, 2, 3, 4];
        const result = findDuplicateEmojiIndex(cardEmojis, availableCards);
        // 🐶 wird ignoriert wegen 3x, 🐱 wird gefunden
        expect(result).toEqual([3, 4]);
        expect(console.warn).toHaveBeenCalledWith('More than 2 "🐶" found in cardEmojis.');
    });

    it('should continue searching after ignoring emoji with >2 duplicates', () => {
        const cardEmojis = ['🐶', '🐶', '🐶', '🐱', '🐭', '🐭'];
        const availableCards = [0, 1, 2, 3, 4, 5];
        const result = findDuplicateEmojiIndex(cardEmojis, availableCards);
        // 🐶 ignoriert, 🐭 gefunden als Duplikat
        expect(result).toEqual([4, 5]);
        expect(console.warn).toHaveBeenCalledWith('More than 2 "🐶" found in cardEmojis.');
    });

    it('should return null if no duplicates after ignoring >2 duplicates emojis', () => {
        const cardEmojis = ['🐶', '🐶', '🐶', '🐱'];
        const availableCards = [0, 1, 2, 3];
        const result = findDuplicateEmojiIndex(cardEmojis, availableCards);
        // 🐶 ignoriert, kein anderer Duplikat
        expect(result).toBeNull();
        expect(console.warn).toHaveBeenCalledWith('More than 2 "🐶" found in cardEmojis.');
    });

    it('should return null for empty availableCards', () => {
        const cardEmojis = ['🐶', '🐱'];
        const availableCards: number[] = [];
        const result = findDuplicateEmojiIndex(cardEmojis, availableCards);
        expect(result).toBeNull();
        expect(console.warn).not.toHaveBeenCalled();
    });

    it('should ignore duplicates outside availableCards', () => {
        const cardEmojis = ['🐶', '🐱', '🐶'];
        const availableCards = [1]; // nur 🐱
        const result = findDuplicateEmojiIndex(cardEmojis, availableCards);
        expect(result).toBeNull();
        expect(console.warn).not.toHaveBeenCalled();
    });
});