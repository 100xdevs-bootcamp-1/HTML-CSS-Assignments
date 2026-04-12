const promiseAny = require("../promises/easy/promiseAny");

describe("promiseAny", () => {
  test("resolves with the first fulfilled promise", async () => {
    const p1 = Promise.reject("err1");
    const p2 = new Promise((res) => setTimeout(() => res("ok"), 50));
    const p3 = new Promise((res) => setTimeout(() => res("late"), 100));

    const result = await promiseAny([p1, p2, p3]);
    expect(result).toBe("ok");
  });

  test("rejects if all promises reject", async () => {
    const p1 = Promise.reject("err1");
    const p2 = Promise.reject("err2");

    await expect(promiseAny([p1, p2]))
      .rejects.toThrow("All promises were rejected");
  });

  test("handles non-promise values as fulfilled", async () => {
    const result = await promiseAny([Promise.reject("err"), 42]);
    expect(result).toBe(42);
  });

  test("rejects on empty iterable", async () => {
    await expect(promiseAny([]))
      .rejects.toThrow("Empty iterable");
  });
});
