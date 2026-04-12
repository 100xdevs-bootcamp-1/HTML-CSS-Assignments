const asyncWaterfall = require("../promises/medium/asyncWaterfall");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("asyncWaterfall", () => {
  test("passes result from one task to the next", async () => {
    const tasks = [
      async (val) => val + 1,
      async (val) => val * 2,
      async (val) => val - 3,
    ];

    const result = await asyncWaterfall(tasks, 5);
    expect(result).toBe(9);
  });

  test("runs tasks sequentially (not in parallel)", async () => {
    const order = [];

    const tasks = [
      async (val) => {
        await sleep(20);
        order.push("A");
        return val + 1;
      },
      async (val) => {
        order.push("B");
        return val + 1;
      },
    ];

    await asyncWaterfall(tasks, 0);
    expect(order).toEqual(["A", "B"]);
  });

  test("propagates errors and stops execution", async () => {
    const tasks = [
      async () => 1,
      async () => {
        throw new Error("boom");
      },
      async () => 3,
    ];

    await expect(
      asyncWaterfall(tasks, 0)
    ).rejects.toThrow("boom");
  });

  test("returns initialValue when tasks array is empty", async () => {
    const result = await asyncWaterfall([], 42);
    expect(result).toBe(42);
  });

  test("works with synchronous functions as well", async () => {
    const tasks = [
      (val) => val + 2,
      (val) => val * 3,
    ];

    const result = await asyncWaterfall(tasks, 1);
    expect(result).toBe(9);
  });
});
