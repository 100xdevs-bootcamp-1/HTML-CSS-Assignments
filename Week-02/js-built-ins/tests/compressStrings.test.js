const compression = require('../problems/medium/stringCompression');

describe('String compression', () => {
    test('should compress consecutive characters with counts', () => {
        expect(compression("aaabbbbcccvvmm")).toBe("a3b4c3v2m2");
    });

    test('should return the same string if no characters are repeated', () => {
        expect(compression("abcd")).toBe("abcd");
    });

    test('should handle a single character string', () => {
        expect(compression("a")).toBe("a");
    });

    test('should handle an empty string', () => {
        expect(compression("")).toBe("");
    });

    test('should compress partial repetitions', () => {
        expect(compression("aaabbcc")).toBe("a3b2c2");
    });

    test('should handle strings with mixed characters', () => {
        expect(compression("aaAAa")).toBe("a2A2a");
    });
});
