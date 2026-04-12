const withCleanup = require("../promises/medium/withCleanup");

describe("withCleanup", () => {
  test("runs cleanup after successful execution", async () => {
    const fn = jest.fn(async () => "result");
    const cleanup = jest.fn(async () => {});

    const wrapped = withCleanup(fn, cleanup);
    const result = await wrapped();

    expect(result).toBe("result");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  test("runs cleanup even if function throws", async () => {
    const fn = jest.fn(async () => {
      throw new Error("fail");
    });
    const cleanup = jest.fn(async () => {});

    const wrapped = withCleanup(fn, cleanup);

    await expect(wrapped()).rejects.toThrow("fail");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
