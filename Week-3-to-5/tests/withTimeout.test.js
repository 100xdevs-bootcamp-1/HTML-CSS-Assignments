const withTimeout = require("../promises/medium/withTimeout");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("withTimeout", () => {
  test("resolves if promise settles before timeout", async () => {
    const promise = sleep(20).then(() => "done");

    const result = await withTimeout(promise, 50);

    expect(result).toBe("done");
  });

  test("rejects with Timeout if promise takes too long", async () => {
    const promise = sleep(50).then(() => "late");

    await expect(
      withTimeout(promise, 10)
    ).rejects.toThrow("Timeout");
  });

  test("rejects immediately if promise rejects before timeout", async () => {
    const promise = Promise.reject(new Error("boom"));

    await expect(
      withTimeout(promise, 50)
    ).rejects.toThrow("boom");
  });

  test("timeout does not swallow original resolution after rejection", async () => {
    const promise = sleep(30).then(() => "eventual");

    await expect(
      withTimeout(promise, 10)
    ).rejects.toThrow("Timeout");
  });
});
