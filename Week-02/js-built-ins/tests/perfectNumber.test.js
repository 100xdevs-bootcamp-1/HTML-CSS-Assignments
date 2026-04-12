
const { isPerfectNumber } = require('../problems/medium/isPerfectNumber');

describe('Perfect Number Checker', () => {
    test('should return true for 6 (Perfect Number)', () => {
        expect(isPerfectNumber(6)).toBe(true);
    });

    test('should return true for 28 (Perfect Number)', () => {
        expect(isPerfectNumber(28)).toBe(true);
    });

    test('should return false for 12 (Not a Perfect Number)', () => {
        expect(isPerfectNumber(12)).toBe(false);
    });

    test('should return false for 1 (Not a Perfect Number)', () => {
        expect(isPerfectNumber(1)).toBe(false);
    });

    test('should return false for 15 (Not a Perfect Number)', () => {
        expect(isPerfectNumber(15)).toBe(false);
    });
});
