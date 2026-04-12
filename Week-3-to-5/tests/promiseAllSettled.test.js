const promiseAllSettled = require("../promises/medium/promiseAllSettled");

describe("promiseAllSettled", () => {
  test("resolves fulfilled and rejected promises", async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject("error"),
      Promise.resolve(3),
    ];

    const result = await promiseAllSettled(promises);

    expect(result).toEqual([
      { status: "fulfilled", value: 1 },
      { status: "rejected", reason: "error" },
      { status: "fulfilled", value: 3 },
    ]);
  });

  test("handles non-promise values", async () => {
    const promises = [1, Promise.resolve(2), "test"];

    const result = await promiseAllSettled(promises);

    expect(result).toEqual([
      { status: "fulfilled", value: 1 },
      { status: "fulfilled", value: 2 },
      { status: "fulfilled", value: "test" },
    ]);
  });

  test("waits for all promises to settle", async () => {
    const slowResolve = new Promise(res => setTimeout(() => res("slow"), 30));
    const fastReject = new Promise((_, rej) => setTimeout(() => rej("fail"), 10));

    const result = await promiseAllSettled([slowResolve, fastReject]);

    expect(result[0]).toEqual({ status: "fulfilled", value: "slow" });
    expect(result[1]).toEqual({ status: "rejected", reason: "fail" });
  });
});
