
const getUniqueElements = require('../problems/hard/uniqueElements');

describe('getUniqueElements', () => {
    test('should return unique elements from an array with duplicates', () => {
        const arr = [10, 20, 30, 10, 40];
        expect(getUniqueElements(arr)).toEqual([10, 20, 30, 40]);
    });

    test('should return the same array if all elements are unique', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(getUniqueElements(arr)).toEqual([1, 2, 3, 4, 5]);
    });

    test('should return a single element array if all elements are the same', () => {
        const arr = [5, 5, 5, 5];
        expect(getUniqueElements(arr)).toEqual([5]);
    });

    test('should return an empty array if input is empty', () => {
        const arr = [];
        expect(getUniqueElements(arr)).toEqual([]);
    });

    test('should handle arrays with different data types', () => {
        const arr = [1, '1', 1, 2, '2', '2'];
        expect(getUniqueElements(arr)).toEqual([1, '1', 2, '2']);
    });
});
