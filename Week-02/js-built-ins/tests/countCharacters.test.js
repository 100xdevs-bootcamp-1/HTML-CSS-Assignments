
const countCharacters = require('../problems/easy/countCharacters');

describe('Character counting function', () => {
    test('should count the occurrences of each character', () => {
        expect(countCharacters("hello")).toEqual({ h: 1, e: 1, l: 2, o: 1 });
    });

    test('should handle a string with multiple repeated characters', () => {
        expect(countCharacters("aaaabbbcccc")).toEqual({ a: 4, b: 3, c: 4 });
    });

    test('should count unique characters in a string', () => {
        expect(countCharacters("abcdef")).toEqual({ a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 });
    });

    test('should count characters in a string with one type of character', () => {
        expect(countCharacters("aaa")).toEqual({ a: 3 });
    });

    test('should return an empty object for an empty string', () => {
        expect(countCharacters("")).toEqual({});
    });
});
