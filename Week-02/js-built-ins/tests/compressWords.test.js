
const compressWords = require('../problems/hard/wordCompression');

describe('Word compression', () => {
    test('should compress consecutive identical words', () => {
        expect(compressWords(["apple", "apple", "banana", "banana", "banana", "cherry", "apple", "apple"])).toEqual(["apple2", "banana3", "cherry", "apple2"]);
    });

    test('should return the same array if no words are repeated', () => {
        expect(compressWords(["apple", "banana", "cherry"])).toEqual(["apple", "banana", "cherry"]);
    });

    test('should handle an array with a single word', () => {
        expect(compressWords(["apple"])).toEqual(["apple"]);
    });

    test('should handle an empty array', () => {
        expect(compressWords([])).toEqual([]);
    });

    test('should compress an array with all identical words', () => {
        expect(compressWords(["apple", "apple", "apple"])).toEqual(["apple3"]);
    });
});
