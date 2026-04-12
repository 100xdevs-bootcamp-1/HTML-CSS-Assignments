const findDistributedMedian = require("../promises/hard/findDistributedMedian");

const createMockServer = (arr) => ({
  get: jest.fn(async (i) => arr[i]),
  length: jest.fn(async () => arr.length)
});

describe("Distributed Median Finder", () => {
  test("finds median of two odd-length arrays", async () => {
    const sA = createMockServer([1, 3, 8]);
    const sB = createMockServer([7, 9, 11]);
    
    const result = await findDistributedMedian(sA, sB);
    expect(result).toBe(7.5);
   
    expect(sA.get.mock.calls.length + sB.get.mock.calls.length).toBeLessThan(6);
  });

  test("handles arrays of different sizes", async () => {
    const sA = createMockServer([1, 2]);
    const sB = createMockServer([3, 4, 5, 6, 7]);
    
    const result = await findDistributedMedian(sA, sB);
    expect(result).toBe(4);
  });
});