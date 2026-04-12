const promiseRace = require("../promises/easy/promiseRace");

describe("promiseRace", () => {
  test("resolves with the fastest resolved promise", async () => {
    const p1 = new Promise((res) => setTimeout(() => res(1), 100));
    const p2 = new Promise((res) => setTimeout(() => res(2), 50));

    const result = await promiseRace([p1, p2]);
    expect(result).toBe(2);
  });

  test("rejects if the fastest promise rejects", async () => {
    const p1 = new Promise((_, rej) => setTimeout(() => rej("error"), 50));
    const p2 = new Promise((res) => setTimeout(() => res(10), 100));

    await expect(promiseRace([p1, p2])).rejects.toBe("error");
  });

  test("handles non-promise values using Promise.resolve", async () => {
    const result = await promiseRace([42, Promise.resolve(100)]);
    expect(result).toBe(42);
  });

  test("stays pending for empty iterable", async () => {
    const race = promiseRace([]);

    const timeout = new Promise((res) => setTimeout(res, 100, "timeout"));
    const result = await Promise.race([race, timeout]);

    expect(result).toBe("timeout");
  });
});
