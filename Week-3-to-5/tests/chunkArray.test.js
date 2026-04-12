const chunkArray = require("../cpu-io/easy/chunkArray");

describe("chunkArray", () => {
  test("should split an array into chunks of size 2", () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("should handle chunk size larger than array length", () => {
    expect(chunkArray([1, 2, 3], 10)).toEqual([[1, 2, 3]]);
  });

  test("should return empty array for empty input", () => {
    expect(chunkArray([], 2)).toEqual([]);
  });

  test("should return empty array if size is 0 or negative", () => {
    expect(chunkArray([1, 2, 3], 0)).toEqual([]);
    expect(chunkArray([1, 2, 3], -1)).toEqual([]);
  });

  test("should handle chunk size of 1", () => {
    expect(chunkArray([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  test("should handle array length as perfect multiple of chunk size", () => {
    expect(chunkArray([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test("should handle mixed types in the array", () => {
    const input = [1, "a", { b: 1 }, null];
    expect(chunkArray(input, 2)).toEqual([
      [1, "a"],
      [{ b: 1 }, null],
    ]);
  });

  test("should handle large arrays", () => {
    const largeArray = new Array(100).fill(0);
    const result = chunkArray(largeArray, 10);
    expect(result.length).toBe(10);
    expect(result[0].length).toBe(10);
  });

  test("should return empty array if input is null or not an array", () => {
    expect(chunkArray(null, 2)).toEqual([]);
    expect(chunkArray(undefined, 2)).toEqual([]);
  });
});
