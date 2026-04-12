const makeCancellable = require("../cpu-io/medium/makeCancellable");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("makeCancellable", () => {
  test("resolves when promise resolves normally", async () => {
    const controller = new AbortController();

    const promise = sleep(20).then(() => "ok");
    const result = await makeCancellable(promise, controller.signal);

    expect(result).toBe("ok");
  });

  test("rejects immediately if signal is already aborted", async () => {
    const controller = new AbortController();
    controller.abort();

    const promise = Promise.resolve("should not resolve");

    await expect(
      makeCancellable(promise, controller.signal)
    ).rejects.toThrow("Aborted");
  });

  test("rejects if aborted while promise is pending", async () => {
    const controller = new AbortController();

    const promise = sleep(50).then(() => "late");
    const wrapped = makeCancellable(promise, controller.signal);

    setTimeout(() => {
      controller.abort();
    }, 10);

    await expect(wrapped).rejects.toThrow("Aborted");
  });

  test("propagates original promise rejection if not aborted", async () => {
    const controller = new AbortController();

    const promise = Promise.reject(new Error("boom"));

    await expect(
      makeCancellable(promise, controller.signal)
    ).rejects.toThrow("boom");
  });

  test("abort wins over late resolution", async () => {
    const controller = new AbortController();

    const promise = sleep(30).then(() => "done");
    const wrapped = makeCancellable(promise, controller.signal);

    setTimeout(() => {
      controller.abort();
    }, 5);

    await expect(wrapped).rejects.toThrow("Aborted");
  });
});
