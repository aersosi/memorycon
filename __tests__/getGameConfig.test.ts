import { getGameConfig } from "@/lib/config";

describe('getGameConfig', () => {

    describe('Check that all properties exist', () => {
        it('should always return an object with previewTime. turnTime, title, description', () => {
            const easyConfig = getGameConfig(true);
            const hardConfig = getGameConfig(false);

            expect(easyConfig).toHaveProperty('previewTime');
            expect(easyConfig).toHaveProperty('turnTime');
            expect(easyConfig).toHaveProperty('title');
            expect(easyConfig).toHaveProperty('description');

            expect(hardConfig).toHaveProperty('previewTime');
            expect(hardConfig).toHaveProperty('turnTime');
            expect(hardConfig).toHaveProperty('title');
            expect(hardConfig).toHaveProperty('description');
        });
    });

    describe('gameModeEasy === true (Easy Game)', () => {
        it('should return a config with previewTime/turnTime > 0, and ' +
            'title/description string.length between 1 and 256', () => {
            const easyGame = getGameConfig(true);

            expect(typeof easyGame.previewTime).toBe('number');
            expect(easyGame.previewTime).toBeGreaterThan(0);

            expect(typeof easyGame.turnTime).toBe('number');
            expect(easyGame.turnTime).toBeGreaterThan(0);

            expect(typeof easyGame.title).toBe('string');
            expect(easyGame.title.length).toBeGreaterThanOrEqual(1);
            expect(easyGame.title.length).toBeLessThanOrEqual(256);

            expect(typeof easyGame.description).toBe('string');
            expect(easyGame.description.length).toBeGreaterThanOrEqual(1);
            expect(easyGame.description.length).toBeLessThanOrEqual(256);
        });
    });

    describe('gameModeEasy === false (Hard Game)', () => {
        it('should return hard mode configuration', () => {
            const hardGame = getGameConfig(true);

            expect(typeof hardGame.previewTime).toBe('number');
            expect(hardGame.previewTime).toBeGreaterThan(0);

            expect(typeof hardGame.turnTime).toBe('number');
            expect(hardGame.turnTime).toBeGreaterThan(0);

            expect(typeof hardGame.title).toBe('string');
            expect(hardGame.title.length).toBeGreaterThanOrEqual(1);
            expect(hardGame.title.length).toBeLessThanOrEqual(256);

            expect(typeof hardGame.description).toBe('string');
            expect(hardGame.description.length).toBeGreaterThanOrEqual(1);
            expect(hardGame.description.length).toBeLessThanOrEqual(256);
        });
    });
});