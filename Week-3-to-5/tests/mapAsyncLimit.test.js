const mapAsyncLimit = require("../promises/medium/mapAsyncLimit");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("mapAsyncLimit", () => {
  test("maps values asynchronously with limited concurrency", async () => {
    const input = [1, 2, 3, 4];

    const result = await mapAsyncLimit(input, 2, async (n) => {
      await sleep(10);
      return n * 2;
    });

    expect(result).toEqual([2, 4, 6, 8]);
  });

  test("preserves input order", async () => {
    const input = [1, 2, 3];

    const result = await mapAsyncLimit(input, 2, async (n) => {
      await sleep(30 - n * 5); 
      return n;
    });

    expect(result).toEqual([1, 2, 3]);
  });

  test("never exceeds concurrency limit", async () => {
    let running = 0;
    let maxSeen = 0;

    const input = [1, 2, 3, 4, 5];

    await mapAsyncLimit(input, 2, async () => {
      running++;
      maxSeen = Math.max(maxSeen, running);
      await sleep(20);
      running--;
    });

    expect(maxSeen).toBeLessThanOrEqual(2);
  });

  test("rejects if asyncFn throws", async () => {
    const input = [1, 2, 3];

    await expect(
      mapAsyncLimit(input, 2, async (n) => {
        if (n === 2) throw new Error("boom");
        return n;
      })
    ).rejects.toThrow("boom");
  });
});
