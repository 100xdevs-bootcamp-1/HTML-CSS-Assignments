
const findDuplicates = require('../problems/medium/findDuplicates');

describe('findDuplicates', () => {
  test('should return duplicate elements in the array', () => {
    const arr = [10, 20, 30, 10, 40];
    expect(findDuplicates(arr)).toEqual([10]);
  });

  test('should return empty array when there are no duplicates', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(findDuplicates(arr)).toEqual([]);
  });

  test('should handle empty array', () => {
    const arr = [];
    expect(findDuplicates(arr)).toEqual([]);
  });
});
