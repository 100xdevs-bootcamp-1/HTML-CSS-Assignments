
const nonrepeat = require('../problems/medium/non-repeat');

describe('nonrepeat', () => {
    test('should return the first non-repeating character', () => {
        expect(nonrepeat('abcab')).toBe('c');
    });

    test('should return the first non-repeating character when it is at the end', () => {
        expect(nonrepeat('aabbc')).toBe('c');
    });

    test('should return null if all characters are repeating', () => {
        expect(nonrepeat('aabb')).toBeNull();
    });

    test('should return the first character if all characters are unique', () => {
        expect(nonrepeat('abcdef')).toBe('a');
    });

    test('should return null for an empty string', () => {
        expect(nonrepeat('')).toBeNull();
    });

    test('should handle a single character string', () => {
        expect(nonrepeat('z')).toBe('z');
    });

    test('should handle strings with spaces and special characters', () => {
        expect(nonrepeat('a b a')).toBe('b');
        expect(nonrepeat('a!b@c#d$a')).toBe('!');
    });
});
