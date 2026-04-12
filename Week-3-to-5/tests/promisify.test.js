const promisify = require("../promises/easy/promisify");

describe("promisify Utility", () => {
  test("resolves when the original function succeeds", async () => {
    const slowSquare = (n, cb) => {
      setTimeout(() => cb(null, n * n), 10);
    };

    const promisedSquare = promisify(slowSquare);
    const result = await promisedSquare(5);

    expect(result).toBe(25);
  });

  test("rejects when the original function returns an error", async () => {
    const failFunc = (cb) => {
      setTimeout(() => cb(new Error("Operation Failed")), 10);
    };

    const promisedFail = promisify(failFunc);

    await expect(promisedFail()).rejects.toThrow("Operation Failed");
  });

  test("works with multiple arguments", async () => {
    const multiply = (a, b, cb) => {
      cb(null, a * b);
    };

    const promisedMultiply = promisify(multiply);
    const result = await promisedMultiply(3, 4);

    expect(result).toBe(12);
  });
});