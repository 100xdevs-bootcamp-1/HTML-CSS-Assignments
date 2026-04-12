const timeLimit = require("../promises/easy/timeLimit");

describe("timeLimit", () => {
  test("resolves if function finishes within time limit", async () => {
    const fn = async (n) => {
      await new Promise((res) => setTimeout(res, 50));
      return n * 2;
    };

    const limitedFn = timeLimit(fn, 100);
    const result = await limitedFn(5);

    expect(result).toBe(10);
  });

  test("rejects with 'Time Limit Exceeded' if function is too slow", async () => {
    const fn = async () => {
      await new Promise((res) => setTimeout(res, 150));
      return "done";
    };

    const limitedFn = timeLimit(fn, 50);

    await expect(limitedFn()).rejects.toBe("Time Limit Exceeded");
  });

  test("passes arguments correctly to the wrapped function", async () => {
    const fn = async (a, b) => {
      await new Promise((res) => setTimeout(res, 30));
      return a + b;
    };

    const limitedFn = timeLimit(fn, 100);
    const result = await limitedFn(3, 7);

    expect(result).toBe(10);
  });
});
