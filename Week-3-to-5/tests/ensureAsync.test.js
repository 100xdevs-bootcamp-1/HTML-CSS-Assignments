const ensureAsync = require("../promises/easy/ensureAsync");

describe("ensureAsync", () => {
  test("wraps a synchronous function and returns a promise", async () => {
    const syncFn = (a, b) => a + b;
    const asyncFn = ensureAsync(syncFn);

    const result = asyncFn(2, 3);

    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toBe(5);
  });

  test("works with an already async function", async () => {
    const original = async (n) => n * 2;
    const wrapped = ensureAsync(original);

    await expect(wrapped(4)).resolves.toBe(8);
  });

  test("propagates thrown errors as rejected promises", async () => {
    const syncThrow = () => {
      throw new Error("boom");
    };

    const wrapped = ensureAsync(syncThrow);

    await expect(wrapped()).rejects.toThrow("boom");
  });

  test("preserves arguments correctly", async () => {
    const fn = (...args) => args.join("-");
    const wrapped = ensureAsync(fn);

    await expect(wrapped("a", "b", "c")).resolves.toBe("a-b-c");
  });
});
