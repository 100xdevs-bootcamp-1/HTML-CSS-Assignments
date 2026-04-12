
const reverseInteger = require('../problems/medium/reverseInteger');

describe('reverseInteger', () => {
    test('should reverse a positive integer', () => {
        expect(reverseInteger(12345)).toBe(54321);
    });

    test('should reverse a negative integer', () => {
        expect(reverseInteger(-9876)).toBe(-6789);
    });

    test('should handle integers ending with zeros', () => {
        expect(reverseInteger(1200)).toBe(21);
    });

    test('should handle zero correctly', () => {
        expect(reverseInteger(0)).toBe(0);
    });

    test('should handle single-digit numbers', () => {
        expect(reverseInteger(5)).toBe(5);
        expect(reverseInteger(-3)).toBe(-3);
    });
});
