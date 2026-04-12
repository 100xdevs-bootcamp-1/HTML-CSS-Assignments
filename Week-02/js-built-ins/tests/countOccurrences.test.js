
const countOccurrences = require('../problems/easy/countOccurrences');

describe('countOccurrences', () => {
    test('should return correct counts of each element in the array', () => {
        const arr = [10, 20, 30, 10, 40];
        expect(countOccurrences(arr)).toEqual({ 10: 2, 20: 1, 30: 1, 40: 1 });
    });

    test('should handle empty array', () => {
        const arr = [];
        expect(countOccurrences(arr)).toEqual({});
    });

    test('should work with all duplicate elements', () => {
        const arr = [5, 5, 5, 5];
        expect(countOccurrences(arr)).toEqual({ 5: 4 });
    });
});
