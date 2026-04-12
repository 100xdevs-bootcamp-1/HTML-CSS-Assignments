const { countVowels } = require('../problems/easy/countVowels');

describe('Count Vowels in a String', () => {
    test('should return 3 vowels for "Hello World"', () => {
        expect(countVowels('Hello World')).toBe(3);
    });

    test('should return 7 vowels for "This is a test sentence"', () => {
        expect(countVowels('This is a test sentence')).toBe(7);
    });

    test('should return 0 vowels for an empty string', () => {
        expect(countVowels('')).toBe(0);
    });

    test('should return 5 vowels for "Beautiful"', () => {
        expect(countVowels('Beautiful')).toBe(5);
    });

    test('should return 2 vowels for "Programming"', () => {
        expect(countVowels('Programming')).toBe(3); // Adjust to the correct number of vowels
    });
});
