const everyAsync = require("../promises/medium/everyAsync");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("everyAsync", () => {
  test("resolves true when all predicates resolve true", async () => {
    const predicate = async (n) => {
      await sleep(5);
      return n > 0;
    };

    const result = await everyAsync([1, 2, 3], predicate);
    expect(result).toBe(true);
  });

  test("short-circuits and returns false on first failure", async () => {
    const calls = [];

    const predicate = async (n) => {
      calls.push(n);
      return n !== 2;
    };

    const result = await everyAsync([1, 2, 3, 4], predicate);

    expect(result).toBe(false);
    expect(calls).toEqual([1, 2]); 
  });

  test("works with synchronous predicates", async () => {
    const predicate = (n) => n < 5;

    const result = await everyAsync([1, 2, 3, 4], predicate);
    expect(result).toBe(true);
  });

  test("returns true for an empty array", async () => {
    const predicate = jest.fn();

    const result = await everyAsync([], predicate);

    expect(result).toBe(true);
    expect(predicate).not.toHaveBeenCalled();
  });

  test("rejects if predicate throws", async () => {
    const predicate = async (n) => {
      if (n === 2) throw new Error("boom");
      return true;
    };

    await expect(
      everyAsync([1, 2, 3], predicate)
    ).rejects.toThrow("boom");
  });
});
