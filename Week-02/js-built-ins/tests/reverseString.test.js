
const reve = require('../problems/easy/reverseString');

describe('String reversal function', () => {
    test('should reverse a regular string', () => {
        expect(reve('hello')).toBe('olleh');
    });

    test('should reverse a string with spaces', () => {
        expect(reve('hello world')).toBe('dlrow olleh');
    });

    test('should return the same string for a single character', () => {
        expect(reve('a')).toBe('a');
    });

    test('should return an empty string if input is empty', () => {
        expect(reve('')).toBe('');
    });
});
