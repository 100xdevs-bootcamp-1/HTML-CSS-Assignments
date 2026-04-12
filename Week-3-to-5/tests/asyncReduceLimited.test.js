const asyncReduceLimited = require("../promises/medium/asyncReduceLimited");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("asyncReduceLimited", () => {
  test("processes items with async function and reduces result", async () => {
    const input = [1, 2, 3, 4];

    const result = await asyncReduceLimited(
      input,
      2,
      async (n) => {
        await sleep(10);
        return n * 2;
      },
      (acc, val) => acc + val,
      0
    );

    expect(result).toBe(20); 
  });

  test("preserves order before reducing", async () => {
    const input = [1, 2, 3];

    const processedOrder = [];

    const result = await asyncReduceLimited(
      input,
      2,
      async (n) => {
        await sleep(30 - n * 5);
        processedOrder.push(n);
        return n;
      },
      (acc, val) => acc.concat(val),
      []
    );

    expect(result).toEqual([1, 2, 3]);
    expect(processedOrder.sort()).toEqual([1, 2, 3]); 
  });

  test("never exceeds concurrency limit during processing", async () => {
    let running = 0;
    let maxSeen = 0;

    const input = [1, 2, 3, 4, 5];

    await asyncReduceLimited(
      input,
      2,
      async () => {
        running++;
        maxSeen = Math.max(maxSeen, running);
        await sleep(20);
        running--;
        return 1;
      },
      (acc, val) => acc + val,
      0
    );

    expect(maxSeen).toBeLessThanOrEqual(2);
  });

  test("handles empty array", async () => {
    const result = await asyncReduceLimited(
      [],
      2,
      async () => 1,
      (acc, val) => acc + val,
      10
    );

    expect(result).toBe(10);
  });

  test("rejects if asyncProcessFn throws", async () => {
    const input = [1, 2, 3];

    await expect(
      asyncReduceLimited(
        input,
        2,
        async (n) => {
          if (n === 2) throw new Error("boom");
          return n;
        },
        (acc, val) => acc + val,
        0
      )
    ).rejects.toThrow("boom");
  });
});
