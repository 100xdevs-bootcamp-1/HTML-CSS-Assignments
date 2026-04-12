const ioWithTimeout = require("../cpu-io/easy/ioWithTimeout");

describe("ioWithTimeout", () => {
  test("resolves when I/O completes within time limit", async () => {
    const ioFn = async () => {
      await new Promise(res => setTimeout(res, 50));
      return "data";
    };

    const result = await ioWithTimeout(ioFn, 100);
    expect(result).toBe("data");
  });

  test("rejects with Timeout when I/O is too slow", async () => {
    const ioFn = async () => {
      await new Promise(res => setTimeout(res, 100));
      return "late data";
    };

    await expect(ioWithTimeout(ioFn, 50))
      .rejects.toBe("Timeout");
  });
});
