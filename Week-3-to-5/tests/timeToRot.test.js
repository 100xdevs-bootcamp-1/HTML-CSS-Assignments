const timeToRot = require("../promises/medium/timeToRot");

describe("Rotting Oranges Grid Monitor", () => {
  test("handles multiple rotten starting points", async () => {
    const grid = [
      [2, 1, 0],
      [0, 1, 0], 
      [0, 1, 2]  
    ];
    const result = await timeToRot(grid);
    expect(result).toBe(2);
  });

  test("returns correct time for full rot", async () => {
    const grid = [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1]
    ];
    const result = await timeToRot(grid);
    expect(result).toBe(4);
  });

  test("returns -1 if some oranges can never rot", async () => {
    const grid = [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1] 
    ];
    const result = await timeToRot(grid);
    expect(result).toBe(-1);
  });

  test("returns 0 if there are no fresh oranges", async () => {
    const grid = [[0, 2]];
    const result = await timeToRot(grid);
    expect(result).toBe(0);
  });
});