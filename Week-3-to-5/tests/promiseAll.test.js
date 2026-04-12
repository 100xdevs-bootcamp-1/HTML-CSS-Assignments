const promiseAll = require("../promises/easy/promiseAll");

describe("promiseAll", () => {
  test("resolves with values in correct order", async () => {
    const p1 = new Promise((res) => setTimeout(() => res(1), 100));
    const p2 = new Promise((res) => setTimeout(() => res(2), 50));
    const p3 = new Promise((res) => setTimeout(() => res(3), 10));

    const result = await promiseAll([p1, p2, p3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test("handles non-promise values", async () => {
    const result = await promiseAll([1, Promise.resolve(2), 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test("rejects immediately when any promise rejects", async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.reject("error");
    const p3 = Promise.resolve(3);

    await expect(promiseAll([p1, p2, p3])).rejects.toBe("error");
  });

  test("resolves to empty array for empty input", async () => {
    const result = await promiseAll([]);
    expect(result).toEqual([]);
  });

  test("rejects if input is not an array", async () => {
    await expect(promiseAll("not an array")).rejects.toThrow(TypeError);
  });
});
