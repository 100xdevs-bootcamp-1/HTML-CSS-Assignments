const createIdempotentExecutor = require("../promises/medium/createIdempotentExecutor");

describe("createIdempotentExecutor", () => {
  test("runs the task only once for the same key", async () => {
    const run = createIdempotentExecutor();
    const fn = jest.fn(async () => "ok");

    const p1 = run("A", fn);
    const p2 = run("A", fn);

    const [r1, r2] = await Promise.all([p1, p2]);

    expect(r1).toBe("ok");
    expect(r2).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("allows re-execution after the first run completes", async () => {
    const run = createIdempotentExecutor();
    let calls = 0;

    const fn = async () => {
      calls++;
      return calls;
    };

    const r1 = await run("B", fn);
    const r2 = await run("B", fn);

    expect(r1).toBe(1);
    expect(r2).toBe(2);
  });

  test("cleans up inFlight even when task fails", async () => {
    const run = createIdempotentExecutor();
    let calls = 0;

    const fn = async () => {
      calls++;
      throw new Error("fail");
    };

    await expect(run("C", fn)).rejects.toThrow("fail");
    await expect(run("C", fn)).rejects.toThrow("fail");

    expect(calls).toBe(2);
  });
});
